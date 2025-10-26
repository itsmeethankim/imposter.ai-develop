# 🚀 App Store Deployment Guide

## Overview
This guide covers everything you need to deploy your social deduction game to the iOS App Store and Google Play Store safely and securely.

---

## ✅ Security Status Check

### **GOOD NEWS: Your API is Already Secure! ✨**

- ✅ OpenAI API key is stored server-side in Supabase environment variables
- ✅ All API calls go through your backend (Supabase Edge Functions)
- ✅ No API keys are exposed in the frontend code
- ✅ CORS is properly configured

### **Areas That Need Attention Before Launch:**

1. **Payment Processing** - Currently mock implementation
2. **User Authentication** - Not implemented yet
3. **Content Moderation** - Community categories need review system
4. **Database Security** - Need Row Level Security policies
5. **Privacy & Legal** - Need privacy policy and terms of service

---

## 🔒 Pre-Launch Security Checklist

### 1. Fix Mock Subscription System

**Current Issue:**
- Subscription status is stored in localStorage only
- No real payment processing
- Easy to bypass paywall

**Required Actions:**

#### **For iOS (Apple In-App Purchases):**
1. **Set up Apple Developer Account** ($99/year)
   - Sign up at https://developer.apple.com
   
2. **Configure In-App Purchase in App Store Connect:**
   - Create subscription product: `premium_monthly`
   - Price: $4.99/month
   - Set up auto-renewable subscription group
   
3. **Integrate RevenueCat (Recommended):**
   ```bash
   npm install @revenuecat/purchases-capacitor
   ```
   - RevenueCat handles Apple/Google subscriptions
   - Provides receipt validation
   - Server-side verification
   - https://www.revenuecat.com

#### **For Android (Google Play Billing):**
1. **Google Play Console Account** ($25 one-time)
2. **Configure subscription:**
   - Product ID: `premium_monthly`
   - Price: $4.99/month

#### **Backend Integration Required:**
You'll need to add subscription verification endpoints:

```typescript
// /supabase/functions/server/index.tsx

// Verify subscription receipt
app.post('/make-server-be273801/verify-subscription', async (c) => {
  const { receiptData, platform } = await c.req.json();
  
  // Verify with Apple/Google
  // Store subscription status in database
  // Return subscription status
});

// Check subscription status
app.get('/make-server-be273801/subscription-status', async (c) => {
  const userId = c.req.header('user-id');
  // Query database for subscription status
  // Return current status
});
```

---

### 2. Implement User Authentication

**Current Issue:**
- No user accounts
- No way to track subscriptions per user
- Community categories have no ownership

**Required Implementation:**

#### **Use Supabase Auth (Already integrated!):**

1. **Add sign-up/login screens:**
   - Email/password authentication
   - Social login (Google, Apple) - recommended for better UX
   
2. **Update backend to require auth:**
   ```typescript
   // Middleware to verify user
   app.use('/make-server-be273801/protected/*', async (c, next) => {
     const token = c.req.header('Authorization')?.replace('Bearer ', '');
     const supabase = createClient(
       Deno.env.get('SUPABASE_URL')!,
       Deno.env.get('SUPABASE_ANON_KEY')!
     );
     
     const { data: { user }, error } = await supabase.auth.getUser(token);
     if (error || !user) {
       return c.json({ error: 'Unauthorized' }, 401);
     }
     
     c.set('userId', user.id);
     await next();
   });
   ```

3. **Associate subscriptions with users:**
   - Create `user_subscriptions` table in Supabase
   - Store subscription status, expiry date, platform

4. **For Apple Sign In:**
   - Required if using Apple In-App Purchases
   - Configure in Apple Developer Console
   - https://developer.apple.com/sign-in-with-apple/

---

### 3. Secure Community Categories System

**Current Issues:**
- Anyone can publish categories
- No content moderation
- Potential for inappropriate content

**Required Actions:**

#### **Database Security (Row Level Security):**

```sql
-- Enable RLS on community categories table
ALTER TABLE community_categories ENABLE ROW LEVEL SECURITY;

-- Users can only modify their own categories
CREATE POLICY "Users can insert own categories"
ON community_categories
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories"
ON community_categories
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories"
ON community_categories
FOR DELETE
USING (auth.uid() = user_id);

-- Everyone can view published categories
CREATE POLICY "Anyone can view published categories"
ON community_categories
FOR SELECT
USING (status = 'published');
```

#### **Content Moderation System:**

**Option 1: Manual Review (Recommended for Launch)**
- Add `status` field: `pending`, `approved`, `rejected`
- New categories start as `pending`
- You manually review and approve
- Build simple admin panel

**Option 2: Automated + Manual**
- Use OpenAI Moderation API to auto-flag
- Manual review for flagged content
- Add reporting system for users

**Implementation:**
```typescript
// Add to server
app.post('/make-server-be273801/submit-category', async (c) => {
  const { category, words } = await c.req.json();
  
  // Check for inappropriate content
  const moderation = await checkContentModeration(category.name, words);
  
  const status = moderation.flagged ? 'pending' : 'approved';
  
  // Save to database with status
  await kv.set(`category:${categoryId}`, {
    ...category,
    status,
    createdAt: new Date().toISOString()
  });
});

async function checkContentModeration(text: string, words: string[]) {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  const response = await fetch('https://api.openai.com/v1/moderations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: `${text} ${words.join(' ')}`
    })
  });
  
  const data = await response.json();
  return data.results[0];
}
```

---

### 4. Database Security - Row Level Security

**Check your current database setup:**

1. **Log into Supabase Dashboard:**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Enable RLS on all tables:**
   ```sql
   -- For kv_store table
   ALTER TABLE kv_store_be273801 ENABLE ROW LEVEL SECURITY;
   
   -- For community categories (if separate table)
   ALTER TABLE community_categories ENABLE ROW LEVEL SECURITY;
   
   -- For user_subscriptions
   ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
   ```

3. **Create appropriate policies** (see examples above)

---

### 5. Privacy Policy & Terms of Service

**REQUIRED for App Store approval:**

#### **What to include in Privacy Policy:**
- What data you collect (names, emails, game stats)
- How you use it (game functionality, subscriptions)
- Third-party services (Supabase, OpenAI, RevenueCat)
- Data retention and deletion rights
- Contact information

#### **What to include in Terms of Service:**
- Subscription terms and cancellation policy
- User-generated content rules
- Prohibited conduct
- Intellectual property rights
- Limitation of liability

#### **Tools to generate these:**
- https://www.termsfeed.com (paid but comprehensive)
- https://app-privacy-policy-generator.firebaseapp.com (free)
- Consult with a lawyer (recommended for paid apps)

#### **Where to add in app:**
- Add links in settings screen
- Display during sign-up
- Host on a public URL (required by Apple)

---

## 📱 Native App Build Process

### Prerequisites

1. **Install Capacitor CLI** (if not already):
   ```bash
   npm install -g @capacitor/cli
   ```

2. **Your `capacitor.config.ts` looks good!** ✅

### Build for iOS

1. **Add iOS platform:**
   ```bash
   npx cap add ios
   ```

2. **Build your web app:**
   ```bash
   npm run build
   ```

3. **Sync to iOS:**
   ```bash
   npx cap sync ios
   ```

4. **Open in Xcode:**
   ```bash
   npx cap open ios
   ```

5. **In Xcode:**
   - Set your Team (Apple Developer Account)
   - Configure Bundle Identifier (e.g., `com.yourcompany.imposter-game`)
   - Add app icons (1024x1024 required)
   - Configure capabilities (In-App Purchase, Sign in with Apple)
   - Set version and build number
   - Configure launch screen

6. **Test on device:**
   - Connect iPhone via USB
   - Select your device in Xcode
   - Click Run

7. **Archive for App Store:**
   - Product → Archive
   - Upload to App Store Connect
   - Fill out app information
   - Submit for review

### Build for Android

1. **Add Android platform:**
   ```bash
   npx cap add android
   ```

2. **Build web app:**
   ```bash
   npm run build
   ```

3. **Sync to Android:**
   ```bash
   npx cap sync android
   ```

4. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

5. **In Android Studio:**
   - Set application ID (e.g., `com.yourcompany.imposter_game`)
   - Configure signing keys for release
   - Add app icons (all sizes)
   - Update version in `build.gradle`
   - Configure permissions in `AndroidManifest.xml`

6. **Generate signed APK/AAB:**
   - Build → Generate Signed Bundle/APK
   - Create keystore (SAVE THIS SECURELY!)
   - Build release AAB

7. **Upload to Google Play Console:**
   - Create app listing
   - Upload AAB
   - Fill out store listing
   - Submit for review

---

## 🎨 App Store Assets Required

### iOS App Store:

1. **App Icon:** 1024x1024px (no transparency, no rounded corners)
2. **Screenshots:**
   - iPhone 6.9" (latest): 2 minimum, 10 maximum
   - iPhone 6.7": 2 minimum
   - iPhone 6.5": 2 minimum
   - iPad Pro 12.9" (optional)

3. **App Preview Videos** (optional but recommended)
4. **App Description** (max 4000 chars)
5. **Keywords** (100 chars max, comma-separated)
6. **Support URL**
7. **Marketing URL** (optional)
8. **Promotional text** (170 chars)

### Google Play Store:

1. **App Icon:** 512x512px (PNG, 32-bit)
2. **Feature Graphic:** 1024x500px (required)
3. **Screenshots:**
   - Phone: 2 minimum, 8 maximum
   - 7-inch tablet: 2 minimum (optional)
   - 10-inch tablet: 2 minimum (optional)

4. **Short Description** (80 chars)
5. **Full Description** (4000 chars)
6. **Promotional Video** (YouTube link, optional)

---

## 🚦 Pre-Launch Testing Checklist

### Functionality Testing:
- ☐ Test on multiple iOS devices (iPhone 14, 15, SE)
- ☐ Test on multiple Android devices (Samsung, Pixel)
- ☐ Test subscription flow end-to-end
- ☐ Test offline behavior
- ☐ Test all game modes with different player counts
- ☐ Test AI category generation (with and without OpenAI key)
- ☐ Test community categories system
- ☐ Test sound system

### Security Testing:
- ☐ Verify no API keys in frontend code
- ☐ Test with network inspector to ensure no sensitive data leaks
- ☐ Verify subscription can't be bypassed
- ☐ Test RLS policies work correctly
- ☐ Test content moderation catches inappropriate content

### Performance Testing:
- ☐ App loads in < 3 seconds
- ☐ Animations are smooth (60fps)
- ☐ No memory leaks during extended play
- ☐ Battery consumption is reasonable

### Compliance Testing:
- ☐ Privacy policy is accessible
- ☐ Terms of service is accessible
- ☐ Subscription cancellation is clearly explained
- ☐ Data deletion request process exists
- ☐ Age rating is appropriate (likely 4+ or PEGI 3)

---

## 💰 Cost Breakdown

### One-Time Costs:
- Apple Developer Account: $99/year
- Google Play Developer Account: $25 (lifetime)
- Lawyer for T&C/Privacy Policy: $500-2000 (optional)
- App icons/graphics design: $100-500 (or DIY)

### Monthly Costs:
- Supabase: Free tier OK for start, Pro $25/month for scale
- OpenAI API: ~$5-20/month (depends on usage)
- RevenueCat: Free up to $2.5k MRR, then 1% of revenue
- Domain for website (privacy policy hosting): ~$10/year

### Revenue Share:
- Apple App Store: 30% (15% for < $1M/year via Small Business Program)
- Google Play Store: 30% (15% for first $1M/year)
- RevenueCat: 1% (if using their Billing)

**Example:** If you get 100 subscribers at $4.99/month:
- Gross revenue: $499/month
- After Apple/Google (15%): $424/month
- After RevenueCat (1%): $419/month
- Infrastructure costs: ~$30/month
- **Net profit: ~$389/month**

---

## 🎯 Launch Roadmap

### Phase 1: Essential Security (BEFORE LAUNCH)
**Timeline: 1-2 weeks**
1. Implement user authentication with Supabase Auth
2. Set up real payment processing (RevenueCat)
3. Enable Row Level Security on database
4. Add content moderation for community categories
5. Create privacy policy and terms of service
6. Test everything thoroughly

### Phase 2: Native App Setup
**Timeline: 1-2 weeks**
1. Configure iOS project in Xcode
2. Configure Android project in Android Studio
3. Design app icons and screenshots
4. Test on physical devices
5. Set up TestFlight for beta testing (iOS)
6. Set up internal testing on Google Play

### Phase 3: Beta Testing
**Timeline: 2-4 weeks**
1. Invite 10-20 beta testers
2. Gather feedback
3. Fix critical bugs
4. Optimize performance
5. Refine onboarding flow

### Phase 4: App Store Submission
**Timeline: 1-2 weeks review time**
1. Submit to App Store
2. Submit to Google Play
3. Wait for review
4. Address any rejection issues
5. Get approved! 🎉

### Phase 5: Soft Launch
**Timeline: 2-4 weeks**
1. Release in 1-2 countries first
2. Monitor crash reports
3. Monitor user feedback
4. Fix any issues
5. Optimize subscription conversion

### Phase 6: Global Launch
**Timeline: Ongoing**
1. Release worldwide
2. Marketing push
3. Monitor metrics
4. Iterate based on feedback
5. Add new features

---

## 🔍 App Store Review Guidelines Compliance

### Common Rejection Reasons to Avoid:

#### iOS:
- ❌ Privacy policy not accessible or missing
- ❌ Subscription terms not clear
- ❌ App crashes or bugs
- ❌ Using private APIs
- ❌ Misleading screenshots
- ❌ Inappropriate content
- ❌ Kids category without proper privacy compliance

#### Android:
- ❌ Permissions not justified
- ❌ Crashes on certain devices
- ❌ Misleading app description
- ❌ Inappropriate content
- ❌ Subscription not using Google Play Billing

### Tips for Approval:
1. **Test extensively** - No crashes!
2. **Clear description** - Accurately describe gameplay
3. **Age rating** - Be honest (likely 12+ due to online interaction)
4. **Parental controls** - Consider adding if targeting younger players
5. **Content moderation** - Have a plan for inappropriate user content
6. **Subscription clarity** - Very clear about pricing and cancellation

---

## 📊 Post-Launch Monitoring

### Essential Tools to Implement:

1. **Analytics:** 
   - Google Analytics for Firebase (free)
   - or Mixpanel (free tier available)
   - Track: Daily active users, retention, subscription conversion

2. **Crash Reporting:**
   - Sentry (free tier: 5k events/month)
   - or Firebase Crashlytics (free)

3. **Performance Monitoring:**
   - Firebase Performance Monitoring (free)
   - Monitor: App start time, API response times

4. **Revenue Analytics:**
   - RevenueCat dashboard
   - App Store Connect analytics
   - Google Play Console analytics

### Key Metrics to Watch:

- **DAU/MAU** (Daily/Monthly Active Users)
- **Retention:** Day 1, Day 7, Day 30
- **Subscription conversion rate** (target: 2-5%)
- **Churn rate** (target: < 5%/month)
- **Crash-free sessions** (target: > 99.5%)
- **Average session length**
- **Sessions per user**

---

## 🆘 Getting Help

### When You Need Support:

1. **Supabase Issues:**
   - Discord: https://discord.supabase.com
   - Docs: https://supabase.com/docs

2. **Capacitor Issues:**
   - Forum: https://forum.ionicframework.com
   - Discord: https://ionic.link/discord
   - Docs: https://capacitorjs.com/docs

3. **App Store Submission:**
   - Apple Developer Forums
   - App Store Connect Support

4. **Google Play:**
   - Google Play Console Support
   - Android Developers Discord

5. **Payment Processing:**
   - RevenueCat Support: support@revenuecat.com
   - Discord: https://discord.gg/revenuecat

---

## ✅ Final Checklist Before Submitting

### Code & Security:
- ☐ No API keys in frontend code
- ☐ All API calls through backend
- ☐ Row Level Security enabled
- ☐ User authentication working
- ☐ Real payment processing integrated
- ☐ Content moderation active

### Legal:
- ☐ Privacy policy published and linked
- ☐ Terms of service published and linked
- ☐ Age rating determined
- ☐ Content rating questionnaire completed

### Assets:
- ☐ App icon created (all sizes)
- ☐ Screenshots created (all required sizes)
- ☐ App description written
- ☐ Keywords researched
- ☐ Support email set up

### Testing:
- ☐ Tested on multiple iOS devices
- ☐ Tested on multiple Android devices
- ☐ No crashes in normal usage
- ☐ Subscription flow tested end-to-end
- ☐ Beta testing completed

### App Store Setup:
- ☐ Apple Developer account active
- ☐ Google Play Developer account active
- ☐ App Store Connect listing complete
- ☐ Google Play Console listing complete
- ☐ Tax forms submitted (if applicable)
- ☐ Bank account for payouts connected

---

## 🎉 You're Ready!

Once you've completed this checklist, you're ready to launch! Remember:

1. **Start small** - Soft launch in one country first
2. **Monitor closely** - Watch for crashes and user feedback
3. **Iterate quickly** - Fix issues as they come up
4. **Be patient** - Growing a user base takes time
5. **Have fun!** - You built something cool! 🚀

Good luck with your launch! 🎲
