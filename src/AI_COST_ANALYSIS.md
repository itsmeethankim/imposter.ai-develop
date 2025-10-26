# 💰 OpenAI API Cost Analysis

**Date:** October 18, 2025  
**Model:** GPT-4o-mini  
**Purpose:** Understand and predict AI-related costs

---

## 📊 GPT-4o-mini Pricing (October 2024)

| Token Type | Price |
|------------|-------|
| Input | $0.150 per 1M tokens |
| Output | $0.600 per 1M tokens |

**Conversion:**
- Input: $0.00000015 per token
- Output: $0.0000006 per token

---

## 🔢 Cost Per API Call

### 1. Custom Category Generation (50 words)

**Typical Prompt (Input):**
```
Generate exactly 50 unique words for a social deduction game category called "Space Travel".

Requirements:
- Words should be specific, recognizable items/concepts that fit the category
- Each word should be distinct and not too similar to others
- Words should be appropriate for a party game
- Return a JSON object with a "words" property containing an array of strings
- Format: {"words": ["word1", "word2", "word3", ...]}

Category: Space Travel
```

**Estimated Tokens:**
- Prompt template: ~180 tokens
- Category name: ~5-20 tokens
- **Total Input: ~200 tokens**

**Typical Response (Output):**
```json
{
  "words": [
    "Rocket", "Astronaut", "Satellite", "Mars", "Jupiter",
    "Galaxy", "Nebula", "Meteor", "Comet", "Black Hole",
    // ... 40 more words
  ]
}
```

**Estimated Tokens:**
- 50 words × 2 tokens average = 100 tokens
- JSON formatting: ~50 tokens
- **Total Output: ~150 tokens**

**Cost Calculation:**
```
Input:  200 tokens × $0.00000015 = $0.00003
Output: 150 tokens × $0.0000006  = $0.00009
Total:                             $0.00012 per category
```

**Rounded: ~$0.00012 per custom category generated**

---

### 2. Hint Generation (Imposter Hint)

**Typical Prompt (Input):**
```
You are generating a hint for a social deduction game where one player (the Imposter) 
doesn't know the secret word but needs to blend in.

The secret word that all innocent players received is: "Pizza"
The category is: "Foods"

Generate a SINGLE subtle hint word or short phrase (1-3 words max) that:
- Is related to "Pizza" but NOT too obvious
- Helps the imposter participate without giving away they don't know the word
- Is NOT the word itself or a direct synonym
- Is contextual and thematic

Return ONLY a JSON object with a "hint" property containing the hint as a string.
Format: {"hint": "your hint here"}
```

**Estimated Tokens:**
- Prompt template: ~180 tokens
- Word: ~5 tokens
- Category name: ~5 tokens
- **Total Input: ~190 tokens**

**Typical Response (Output):**
```json
{
  "hint": "Italian Dish"
}
```

**Estimated Tokens:**
- Hint (1-3 words): ~5 tokens
- JSON formatting: ~10 tokens
- **Total Output: ~15 tokens**

**Cost Calculation:**
```
Input:  190 tokens × $0.00000015 = $0.0000285
Output:  15 tokens × $0.0000006  = $0.000009
Total:                             $0.0000375 per hint
```

**Rounded: ~$0.00004 per hint generated**

---

## 📈 Usage Scenarios

### Scenario 1: Light User (1-2 games/week)

**Monthly Usage:**
- Creates 2 custom categories: 2 × $0.00012 = $0.00024
- Plays 8 games with hints: 8 × $0.00004 = $0.00032
- **Total: ~$0.00056/month** (less than 1 cent)

---

### Scenario 2: Regular User (5-10 games/week)

**Monthly Usage:**
- Creates 5 custom categories: 5 × $0.00012 = $0.0006
- Plays 30 games with hints: 30 × $0.00004 = $0.0012
- **Total: ~$0.0018/month** (less than 1 cent)

---

### Scenario 3: Heavy User (Maxed Out Rate Limits)

**Daily Usage (Hit All Limits):**
- 20 custom categories: 20 × $0.00012 = $0.0024
- 100 hint generations: 100 × $0.00004 = $0.004
- **Daily Total: ~$0.0064/day**
- **Monthly Total: ~$0.19/month** (19 cents)

**Note:** This is ONE IP address hitting maximum limits every day for 30 days.

---

### Scenario 4: Viral Launch (1,000 Active Users/Day)

**Assumptions:**
- 30% create 1 custom category/day: 300 × $0.00012 = $0.036
- 70% play 3 games/day with hints: 2,100 × $0.00004 = $0.084
- **Daily Total: ~$0.12/day**
- **Monthly Total: ~$3.60/month**

**Very affordable for 1,000 daily active users!**

---

## 🚨 Worst-Case Abuse Scenarios

### Scenario A: 100 Malicious IPs Maxing Out Limits

**Daily Cost:**
- 100 IPs × 20 category generations = 2,000 calls
- 100 IPs × 100 hint generations = 10,000 calls
- Category cost: 2,000 × $0.00012 = $0.24
- Hint cost: 10,000 × $0.00004 = $0.40
- **Total: $0.64/day** ($19.20/month)

**Mitigation:**
✅ Already implemented with server-side rate limiting  
✅ Would be obvious in logs (same IPs hammering endpoints)  
✅ Easy to block specific IPs if needed

---

### Scenario B: 1,000 Malicious IPs Maxing Out Limits

**This is extremely unlikely but let's calculate:**

**Daily Cost:**
- 1,000 IPs × 20 category generations = 20,000 calls
- 1,000 IPs × 100 hint generations = 100,000 calls
- Category cost: 20,000 × $0.00012 = $2.40
- Hint cost: 100,000 × $0.00004 = $4.00
- **Total: $6.40/day** ($192/month)

**Reality Check:**
- ❌ Requires coordinated botnet attack
- ❌ Would be immediately obvious in logs
- ❌ Very unlikely for a party game app
- ✅ Still cheaper than most API services!

**Mitigation:**
- Set OpenAI spending limit to $10/day in dashboard
- Add IP blocking for suspicious patterns
- Consider CAPTCHA if this ever happens

---

## 💡 Cost Optimization Strategies

### 1. **Caching Popular Categories** (Future Enhancement)

**Idea:** Cache AI-generated results for common category names

```typescript
// Pseudocode
const cache = {
  "Space Travel": ["Rocket", "Astronaut", ...],
  "Ocean Life": ["Whale", "Coral", ...]
};

if (cache[categoryName]) {
  return cache[categoryName]; // Free!
} else {
  const words = await callOpenAI(categoryName);
  cache[categoryName] = words; // Cache for next time
  return words;
}
```

**Potential Savings:** 50-70% reduction in category API calls

---

### 2. **Smart Fallbacks** (Already Implemented)

**Current Implementation:**
✅ If OpenAI fails, use category-based fallback hints  
✅ If OpenAI quota exceeded, gracefully degrade

**Benefit:** $0 cost when API unavailable, still works!

---

### 3. **Pre-Generated Category Packs** (Future)

**Idea:** Pre-generate 100 popular categories and include in app

**Cost:**
- One-time: 100 categories × $0.00012 = $0.012 (1 cent!)
- Ongoing: $0 for users selecting these categories

**Benefit:** 
- Zero ongoing API costs for common categories
- Faster user experience (no API wait time)

---

### 4. **Adjustable Rate Limits** (Easy to Implement)

**Current:** 
- 20 categories/day per IP
- 100 hints/day per IP

**Future Tuning:**
Based on actual usage, you could adjust to:
- 10 categories/day per IP (50% cost reduction)
- 50 hints/day per IP (50% cost reduction)

**Monitoring:** Watch first month's usage patterns

---

## 📊 Revenue vs. Cost Analysis

### Freemium Model ROI

**Premium Subscription:** $4.99/month

**Cost per Premium User (Heavy Usage):**
- API costs: ~$0.19/month (max rate limits)
- **Profit margin: $4.80/month (96%)**

**Cost per Free User (Light Usage):**
- API costs: ~$0.001/month (a tenth of a penny)
- **Extremely sustainable**

### Break-Even Analysis

**Question:** How many users can you support with $100/month OpenAI budget?

**Assumption:** Average user (5 games/week, 1 category/month)
- Cost per user: ~$0.002/month

**Answer:** 50,000 active users/month on $100 budget

**Your rate limits cap at:**
- If 1,000 IPs max out: ~$192/month
- Still very affordable!

---

## 🎯 Cost Monitoring Strategy

### Set Up Billing Alerts

**OpenAI Dashboard:**
1. Go to: https://platform.openai.com/account/billing/limits
2. Set soft limit: $10/day
3. Set hard limit: $20/day (emergency shutoff)
4. Enable email alerts at:
   - $5/day (warning)
   - $10/day (attention needed)
   - $15/day (critical)

### Weekly Monitoring (First Month)

**Check every Monday:**
- [ ] OpenAI usage dashboard
- [ ] Supabase function invocation count
- [ ] Top IP addresses by request count
- [ ] Total spend vs. projection

**Questions to Ask:**
1. Are costs trending as expected?
2. Any single IP making excessive requests?
3. Is the average cost per user reasonable?
4. Any unusual patterns in logs?

### Monthly Review

**Calculate:**
- Total OpenAI spend for month
- Number of active users (estimate from game plays)
- Cost per user
- ROI on premium subscriptions

**Adjust:**
- Rate limits if needed
- Consider caching if costs high
- Block any abusive IPs

---

## 🔮 Projected Costs (6-Month Forecast)

### Conservative Launch (100 DAU)

| Month | Daily Users | Daily Cost | Monthly Cost |
|-------|-------------|------------|--------------|
| 1 | 100 | $0.15 | $4.50 |
| 2 | 200 | $0.30 | $9.00 |
| 3 | 500 | $0.75 | $22.50 |
| 4 | 1,000 | $1.50 | $45.00 |
| 5 | 1,500 | $2.25 | $67.50 |
| 6 | 2,000 | $3.00 | $90.00 |

**6-Month Total: ~$239**

---

### Optimistic Launch (1,000 DAU)

| Month | Daily Users | Daily Cost | Monthly Cost |
|-------|-------------|------------|--------------|
| 1 | 1,000 | $1.50 | $45.00 |
| 2 | 2,000 | $3.00 | $90.00 |
| 3 | 5,000 | $7.50 | $225.00 |
| 4 | 10,000 | $15.00 | $450.00 |
| 5 | 15,000 | $22.50 | $675.00 |
| 6 | 20,000 | $30.00 | $900.00 |

**6-Month Total: ~$2,385**

**Revenue Projection (1% convert to premium):**
- Month 6: 20,000 users × 1% × $4.99 = $999/month
- Profit after AI costs: $999 - $900 = $99/month
- **Plus one-time App Store revenue**

---

## 💸 Cost Control Mechanisms

### Already Implemented ✅

1. **Server-Side Rate Limiting**
   - 20 category generations/day per IP
   - 100 hint generations/day per IP
   - Automatic daily reset

2. **Input Validation**
   - Category name: Max 100 characters
   - Word count: Max 100 words per request
   - Prevents excessive token usage

3. **Graceful Degradation**
   - Falls back to non-AI generation if quota exceeded
   - App continues working without OpenAI

4. **Client-Side Feedback**
   - Shows "50 generations remaining" to users
   - Discourages excessive usage

### Future Enhancements (If Needed)

1. **Dynamic Rate Limiting**
   - Lower limits if costs spike
   - Increase limits during off-peak hours

2. **Caching Layer**
   - Store popular category results
   - Serve from cache instead of API

3. **Premium-Only AI Features**
   - Make AI generation premium-only
   - Free users get preset categories only
   - Reduces costs while incentivizing upgrades

4. **CAPTCHA for AI Requests**
   - Prevent automated abuse
   - Only if bot activity detected

---

## 📋 Cost Monitoring Checklist

### Daily (First Week):
- [ ] Check OpenAI usage dashboard
- [ ] Review total spend
- [ ] Look for unusual patterns

### Weekly (First Month):
- [ ] Calculate cost per user
- [ ] Check rate limit effectiveness
- [ ] Review top IP addresses
- [ ] Verify alerts are working

### Monthly (Ongoing):
- [ ] Monthly cost review
- [ ] Adjust rate limits if needed
- [ ] Plan for scaling costs
- [ ] Optimize based on usage patterns

---

## ✅ Cost Analysis Summary

### Key Takeaways:

1. **Per-User Costs Are Tiny**
   - Regular user: ~$0.002/month (1/5 of a penny!)
   - Heavy user: ~$0.19/month (19 cents)
   - Very sustainable model

2. **Rate Limiting Works**
   - Max cost per IP: ~$0.0064/day
   - Even 1,000 abusive IPs: only $192/month
   - Extremely unlikely to happen

3. **Revenue >>> Costs**
   - Premium user: $4.99/month revenue
   - Max AI cost: $0.19/month
   - Profit margin: 96%

4. **Scaling Is Affordable**
   - 1,000 users: ~$3.60/month
   - 10,000 users: ~$36/month
   - 100,000 users: ~$360/month
   - Linear scaling with usage

### Recommendations:

✅ **Set OpenAI hard limit: $20/day** ($600/month max)  
✅ **Monitor weekly for first month**  
✅ **Enable billing alerts at $5, $10, $15/day**  
✅ **Consider caching if costs exceed $100/month**  

---

## 🎉 Final Verdict

**Your AI costs are VERY manageable!**

Even in worst-case abuse scenarios, costs are:
- Predictable (rate limited)
- Affordable (pennies per user)
- Scalable (linear with usage)
- Profitable (huge margins on premium)

**Launch with confidence!** The rate limiting you've implemented provides excellent cost protection while keeping the AI features accessible to users.

---

**Next Steps:**
1. ✅ Set up OpenAI billing alerts ($5, $10, $20/day)
2. ✅ Monitor usage for first week
3. ✅ Review costs monthly
4. 🚀 Launch!

---

**Last Updated:** October 18, 2025  
**Model:** GPT-4o-mini pricing  
**Status:** ✅ COST-EFFECTIVE & SAFE TO LAUNCH
