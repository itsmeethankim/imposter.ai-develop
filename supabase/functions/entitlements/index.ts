import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const serviceRoleKey =
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const revenueCatSecret =
  Deno.env.get('REVENUECAT_SECRET_KEY') ?? '';

if (!supabaseUrl || !serviceRoleKey) {
  console.warn(
    '[entitlements] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing.',
  );
}

if (!revenueCatSecret) {
  console.warn('[entitlements] REVENUECAT_SECRET_KEY missing.');
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
const app = new Hono();

app.use('*', cors());

type RevenueCatEntitlement = {
  product_identifier?: string;
  expires_date?: string | null;
  purchase_date?: string;
};

app.get('/', async (c) => {
  const authHeader = c.req.header('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const jwt = authHeader.replace('Bearer', '').trim();
  if (!jwt) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const { data: userData, error: userError } =
      await supabaseAdmin.auth.getUser(jwt);

    if (userError || !userData?.user) {
      console.error('[entitlements] auth error', userError);
      return c.json({ error: 'Invalid token' }, 401);
    }

    const appUserId = userData.user.id;

    if (!revenueCatSecret) {
      return c.json(
        { error: 'RevenueCat secret is not configured' },
        500,
      );
    }

    const rcResponse = await fetch(
      `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(
        appUserId,
      )}`,
      {
        headers: {
          Authorization: `Bearer ${revenueCatSecret}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const rcJson = await rcResponse.json();

    if (!rcResponse.ok) {
      console.error(
        '[entitlements] RevenueCat error',
        rcResponse.status,
        rcJson,
      );
      return c.json(
        {
          error:
            rcJson?.message ||
            'Failed to fetch RevenueCat entitlements',
        },
        rcResponse.status,
      );
    }

    const entitlements =
      rcJson?.subscriber?.entitlements ?? {};

    const now = Date.now();

    const active = Object.entries<RevenueCatEntitlement>(
      entitlements,
    )
      .filter(([, value]) => {
        if (!value) return false;
        if (!value.expires_date) return true;
        const expiresDate = Date.parse(value.expires_date);
        return !Number.isNaN(expiresDate) && expiresDate > now;
      })
      .map(([identifier, value]) => ({
        identifier,
        productId: value.product_identifier ?? null,
        expiresDate: value.expires_date ?? null,
        purchaseDate: value.purchase_date ?? null,
      }));

    return c.json({
      hasPremium: active.length > 0,
      entitlements: active,
      subscriber: {
        appUserId,
        originalAppUserId:
          rcJson?.subscriber?.original_app_user_id ?? null,
      },
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[entitlements] unexpected error', error);
    return c.json(
      { error: 'Unexpected error fetching entitlements' },
      500,
    );
  }
});

Deno.serve(app.fetch);
