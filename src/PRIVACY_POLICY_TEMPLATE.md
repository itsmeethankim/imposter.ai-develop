# Privacy Policy Template

**Use this template for your App Store submission. Host it on a public URL (GitHub Pages, your website, etc.)**

---

# Privacy Policy for [Your Game Name]

**Last Updated:** October 18, 2025

## Overview

[Your Game Name] ("we", "our", or "the app") is committed to protecting your privacy. This policy explains how we handle information in our social deduction party game.

## Information We DON'T Collect

We believe in privacy by design. We **DO NOT** collect, store, or transmit:

- ❌ Personal information (name, email, phone number)
- ❌ User accounts or profiles
- ❌ Location data
- ❌ Contact lists
- ❌ Photos or camera access
- ❌ Microphone data
- ❌ Any identifiable user information

## Information Stored on Your Device

All game data is stored **locally on your device only** using browser localStorage:

- ✅ Game preferences and settings
- ✅ Subscription status (if you purchase premium)
- ✅ Custom categories you create
- ✅ Games played count
- ✅ AI generation usage count

**This data never leaves your device** and is only accessible to you.

## Third-Party Services

### OpenAI API (AI Features)

When you use AI-powered features (custom category generation, hint generation):

- We send your category name to OpenAI's API to generate game content
- **No personal information is sent** - only the game-related text you provide
- This data is processed according to [OpenAI's Privacy Policy](https://openai.com/policies/privacy-policy)
- We use IP-based rate limiting to prevent abuse (IP addresses are not stored long-term)

### Supabase (Backend Infrastructure)

Our backend server uses Supabase for:

- Temporary rate limiting (to prevent API abuse)
- No user data is stored in our database
- Used only for app functionality

## AI Generation Rate Limiting

To prevent abuse and control costs:

- We limit AI-powered category generation to 50 per device per day
- Server-side rate limiting: 20 AI generations per IP address per day
- IP addresses are used only for rate limiting and are not stored permanently
- These limits reset daily at midnight

## Children's Privacy

Our app does not knowingly collect information from children under 13. The app is designed as a party game suitable for all ages (4+). No user accounts or personal information are required.

## In-App Purchases

If you purchase a premium subscription ($4.99/month):

- Payment is processed by Apple App Store / Google Play Store
- We only store your subscription status **locally on your device**
- We do not have access to your payment information
- Subscription management is handled through your app store account

## Data Security

Since all data is stored locally on your device:

- You have full control over your data
- Deleting the app removes all data
- No cloud backups or syncing (your data stays on your device)
- No risk of data breaches from our servers (we don't store user data)

## Your Rights

You have the right to:

- ✅ Delete all app data by uninstalling the app
- ✅ Clear app data through your device settings
- ✅ Use the app without providing any personal information
- ✅ Opt out of AI features (use preset categories instead)

## Changes to This Policy

We may update this policy occasionally. We'll notify you of significant changes through the app or app store updates.

## Contact Us

If you have questions about this privacy policy or our practices:

- Email: [your-email@example.com]
- App Store Support: [link to your support page]

## Compliance

This app complies with:

- ✅ GDPR (General Data Protection Regulation)
- ✅ CCPA (California Consumer Privacy Act)
- ✅ COPPA (Children's Online Privacy Protection Act)
- ✅ Apple App Store Privacy Requirements
- ✅ Google Play Store Privacy Requirements

We achieve compliance by **not collecting any personal data** and storing all information locally on your device.

---

## Summary (TL;DR)

- 🔒 **Zero personal data collection**
- 📱 **Everything stored on your device only**
- 🤖 **AI features use OpenAI API** (we send only game content, not personal info)
- 💳 **Payments handled by App Store/Play Store** (we never see your payment info)
- 🗑️ **Delete app = delete all data**

**Your privacy is our priority. We can't access your data because we don't collect it.**

---

**Version:** 1.0  
**Effective Date:** October 18, 2025  
**App Version:** 1.0.0

---

## Implementation Instructions

1. **Customize** this template with your app name and contact email
2. **Host** on a public URL:
   - GitHub Pages (free)
   - Your own website
   - Simple HTML hosting service
3. **Add URL** to App Store Connect:
   - Required field during app submission
   - Also add to app settings screen (optional but recommended)
4. **Update** version number when making changes

**Example URLs:**
- `https://yourdomain.com/privacy-policy`
- `https://yourapp.github.io/privacy`
- `https://yourgame.com/privacy.html`
