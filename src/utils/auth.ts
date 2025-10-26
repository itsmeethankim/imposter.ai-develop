/**
 * Authentication utilities for managing user sessions
 */

import { createClient } from './supabase';
import { projectId, publicAnonKey } from './supabase/info';

export type UserSession = {
  userId: string;
  accessToken: string;
  email: string;
};

export type SubscriptionData = {
  userId: string;
  status: 'free' | 'premium';
  gamesPlayed: number;
  createdAt: string;
  updatedAt?: string;
  premiumSince?: string;
  lastPlayedAt?: string;
};

export type EntitlementRecord = {
  identifier: string;
  productId: string | null;
  expiresDate: string | null;
  purchaseDate: string | null;
};

export type EntitlementsResponse = {
  hasPremium: boolean;
  entitlements: EntitlementRecord[];
  fetchedAt?: string;
};

/**
 * Ensure we have a Supabase session (anonymous if necessary)
 */
export async function ensureAnonymousSession(): Promise<UserSession | null> {
  try {
    const supabase = createClient();
    const { data: { session: existingSession } } = await supabase.auth.getSession();

    if (existingSession) {
      return {
        userId: existingSession.user.id,
        accessToken: existingSession.access_token,
        email: existingSession.user.email || ''
      };
    }

    const { data, error } = await supabase.auth.signInAnonymously();
    if (error || !data.session) {
      console.error('Error creating anonymous session:', error);
      return null;
    }

    return {
      userId: data.session.user.id,
      accessToken: data.session.access_token,
      email: data.session.user.email || ''
    };
  } catch (error) {
    console.error('Error ensuring anonymous session:', error);
    return null;
  }
}

/**
 * Get current session from Supabase
 */
export async function getCurrentSession(): Promise<UserSession | null> {
  try {
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    return {
      userId: session.user.id,
      accessToken: session.access_token,
      email: session.user.email || ''
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

/**
 * Fetch RevenueCat entitlements via Supabase Edge Function
 */
export async function fetchEntitlements(accessToken: string): Promise<EntitlementsResponse | null> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/entitlements`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Failed to fetch entitlements:', errorBody);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching entitlements:', error);
    return null;
  }
}

/**
 * Get subscription status from backend
 */
export async function getSubscriptionStatus(accessToken: string): Promise<SubscriptionData | null> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-be273801/subscription-status`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get subscription status');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error getting subscription status:', error);
    return null;
  }
}

/**
 * Update subscription status (for mock upgrade - in production, integrate with payment processor)
 */
export async function updateSubscription(
  accessToken: string,
  status: 'free' | 'premium'
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-be273801/update-subscription`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update subscription');
    }

    return true;

  } catch (error) {
    console.error('Error updating subscription:', error);
    return false;
  }
}

/**
 * Increment games played counter
 */
export async function incrementGamesPlayed(accessToken: string): Promise<number> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-be273801/increment-games`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to increment games');
    }

    const data = await response.json();
    return data.gamesPlayed;

  } catch (error) {
    console.error('Error incrementing games:', error);
    return 0;
  }
}
