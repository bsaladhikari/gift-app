# Amazon Integration Guide for LuxegiftAI

## Current Implementation
✅ Amazon Associates affiliate links with real ASINs
✅ Product data structure with ratings, reviews, features
✅ Affiliate disclosure compliance
✅ Professional product cards with Amazon branding

## Next Steps for Full Integration

### 1. Update Your Associates ID
Replace `your-associate-id-20` in `/lib/amazon-products.ts` with your actual Amazon Associates ID.

### 2. Get Real Product Images
- Use Amazon's Product Advertising API for official images
- Or manually curate high-quality product images
- Store in `/public/products/` directory

### 3. Amazon Product Advertising API Integration
This section is for future reference only.
\`\`\`typescript
// Example API integration (requires approval)
import { ProductAdvertisingAPIv1 } from 'paapi5-nodejs-sdk';

const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
// defaultClient.accessKey = process.env.AMAZON_ACCESS_KEY;
// defaultClient.secretKey = process.env.AMAZON_SECRET_KEY;
defaultClient.host = "webservices.amazon.com";
defaultClient.region = "us-east-1";

const api = new ProductAdvertisingAPIv1.DefaultApi();

// Search for products
const searchRequest = {
  Keywords: "coffee maker",
  SearchIndex: "All",
  ItemCount: 10,
  PartnerTag: "your-associate-id-20",
  PartnerType: "Associates",
  Marketplace: "www.amazon.com"
};
\`\`\`

### 4. Alternative: Third-Party APIs
Consider using services like:
- RapidAPI Amazon Product Search
- Rainforest API
- ScrapingBee Amazon API

### 5. Manual Curation Process
For immediate implementation:
1. Browse Amazon for relevant products
2. Copy ASINs from product URLs
3. Update the `amazonProducts` array
4. Use Amazon's SiteStripe for affiliate links

### 6. Compliance Requirements
✅ Affiliate disclosure on all pages
✅ Proper attribution to Amazon
✅ Terms of service compliance
- Add privacy policy updates for affiliate tracking
- Include cookie consent for affiliate cookies

## Manual Integration Setup (No API Required)
\`\`\`env
# Only needed for manual integration:
AMAZON_ASSOCIATE_ID=your-associate-id-20
\`\`\`

## Testing Your Integration
1. Replace the associate ID in the code
2. Test affiliate links work correctly
3. Verify commission tracking in Associates dashboard
4. Monitor click-through rates and conversions
