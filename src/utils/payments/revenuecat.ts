import { Purchases } from '@revenuecat/purchases-capacitor';

const PUBLIC_KEY =
  import.meta.env.VITE_REVENUECAT_PUBLIC_KEY?.trim();

const APP_USER_STORAGE_KEY = 'revenuecat_app_user_id';

let configurePromise: Promise<void> | null = null;

export function getOrCreateRevenueCatAppUserId(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  let stored = localStorage.getItem(APP_USER_STORAGE_KEY);
  if (stored) {
    return stored;
  }

  const newId =
    (window.crypto?.randomUUID?.() ??
      `anonymous-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`) + '-rc';

  localStorage.setItem(APP_USER_STORAGE_KEY, newId);
  return newId;
}

export async function ensureRevenueCatConfigured(
  appUserId: string,
): Promise<void> {
  if (!PUBLIC_KEY) {
    console.warn(
      '[RevenueCat] VITE_REVENUECAT_PUBLIC_KEY is missing.',
    );
    return;
  }

  if (configurePromise) {
    return configurePromise;
  }

  configurePromise = Purchases.configure({
    apiKey: PUBLIC_KEY,
    appUserID: appUserId,
  }).catch((error) => {
    configurePromise = null;
    console.error('[RevenueCat] configure failed', error);
    throw error;
  });

  return configurePromise;
}

type PurchaseResult = {
  success: boolean;
  cancelled?: boolean;
  error?: string;
};

export async function purchaseDefaultPackage(): Promise<PurchaseResult> {
  try {
    const offerings = await Purchases.getOfferings();
    const availablePackages =
      offerings.current?.availablePackages ?? [];

    const selectedPackage = availablePackages[0];

    if (!selectedPackage) {
      return {
        success: false,
        error: 'Purchase options are not available yet. Please try again shortly.',
      };
    }

    const { customerInfo } = await Purchases.purchasePackage(
      selectedPackage,
    );

    const hasActive =
      Object.keys(customerInfo.entitlements.active ?? {})
        .length > 0;

    return { success: hasActive };
  } catch (error: any) {
    if (error?.userCancelled) {
      return { success: false, cancelled: true };
    }

    console.error('[RevenueCat] purchase failed', error);
    return {
      success: false,
      error:
        error?.message ||
        'Purchase failed. Please try again or contact support.',
    };
  }
}

export async function restoreCustomerPurchases(): Promise<PurchaseResult> {
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    const hasActive =
      Object.keys(customerInfo.entitlements.active ?? {})
        .length > 0;

    return {
      success: hasActive,
      error: hasActive
        ? undefined
        : 'No previous purchases were found for this account.',
    };
  } catch (error: any) {
    console.error('[RevenueCat] restore failed', error);
    return {
      success: false,
      error:
        error?.message ||
        'Unable to restore purchases right now. Please try again later.',
    };
  }
}
