# Admin Setup Guide for LuxegiftAI

This guide explains how to set up admin users for the LuxegiftAI application so they can access the admin panel and manage products.

## Prerequisites

1. ✅ All Supabase tables created (run scripts 01-08)
2. ✅ User has signed up for an account in the app
3. ✅ Access to Supabase Dashboard

## Making Someone an Admin

### Method 1: Supabase Dashboard (Easiest)

1. **Go to Supabase Dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Sign in to your account
   - Select your LuxegiftAI project

2. **Navigate to Table Editor**
   - Click on "Table Editor" in the left sidebar
   - Select the "profiles" table

3. **Find the User**
   - Look for the user by their email address
   - You can use the search/filter functionality

4. **Update Admin Status**
   - Click on the `is_admin` cell for that user
   - Change the value from `false` to `true`
   - Press Enter or click the checkmark to save

### Method 2: SQL Editor

1. **Go to SQL Editor**
   - In your Supabase Dashboard
   - Click "SQL Editor" in the left sidebar

2. **Run Admin Update Query**
   \`\`\`sql
   UPDATE public.profiles 
   SET is_admin = true 
   WHERE email = 'admin@example.com';
   \`\`\`
   
   Replace `admin@example.com` with the actual email address.

3. **Verify the Update**
   \`\`\`sql
   SELECT email, is_admin 
   FROM public.profiles 
   WHERE is_admin = true;
   \`\`\`

### Method 3: Multiple Admins at Once

If you need to make multiple users admin:

\`\`\`sql
UPDATE public.profiles 
SET is_admin = true 
WHERE email IN (
  'admin1@example.com',
  'admin2@example.com',
  'admin3@example.com'
);
\`\`\`

## Verifying Admin Access

### Check in Database
\`\`\`sql
SELECT 
  email, 
  full_name, 
  is_admin, 
  created_at 
FROM public.profiles 
WHERE is_admin = true;
\`\`\`

### Test Admin Login

1. **Sign in to the app** with the admin user account
2. **Navigate to `/admin`** in your browser
3. **Verify access** - you should see the admin panel

If you get redirected or see an error, the admin flag might not be set correctly.

## Admin Panel Features

Once logged in as admin, users can access `/admin` to:

### ✅ Product Management
- **Add new products** with full details
- **Edit existing products** 
- **Delete products**
- **Set product priority** for search ranking

### ✅ Matching Criteria
- **Set occasions** (Birthday, Christmas, etc.)
- **Define relationships** (Friend, Parent, etc.)
- **Choose interests** (Technology, Fitness, etc.)
- **Set price ranges** (Under $25, $25-50, etc.)
- **Add personality traits** (Practical, Creative, etc.)

### ✅ Product Details
- Title and description
- Price and display price
- Category and retailer
- Product URL for purchases
- Features list
- Rating and review count

## Security Notes

### 🔒 Admin Protection
- Admin panel is protected by authentication
- Only users with `is_admin = true` can access
- Row Level Security (RLS) enforces admin-only access
- Non-admin users are redirected to sign-in

### 🔒 Database Security
- Admin status can only be changed via database
- No UI exists for users to make themselves admin
- RLS policies prevent unauthorized access

## Troubleshooting

### Problem: Can't access admin panel
**Solutions:**
1. Verify user is signed in
2. Check `is_admin` flag in database
3. Clear browser cache and cookies
4. Try signing out and back in

### Problem: Admin flag not saving
**Solutions:**
1. Check database permissions
2. Verify RLS policies are correct
3. Run the admin functionality script again

### Problem: User not found in profiles table
**Solutions:**
1. User needs to sign up first
2. Check if profile was created automatically
3. Manually create profile if needed:
   \`\`\`sql
   INSERT INTO public.profiles (id, email, full_name, is_admin)
   VALUES (
     'user-uuid-here',
     'admin@example.com',
     'Admin Name',
     true
   );
   \`\`\`

## Next Steps After Setting Up Admin

1. **Add Initial Products**
   - Start with 10-20 diverse products
   - Cover different categories and price ranges
   - Set proper matching criteria

2. **Test User Flow**
   - Create test user account
   - Go through preferences → results
   - Verify products are showing correctly

3. **Refine Matching**
   - Adjust product criteria based on results
   - Add more specific interests/traits
   - Fine-tune priority scores

## Quick Reference

### Admin User Checklist
- [ ] User has signed up in the app
- [ ] User exists in profiles table
- [ ] `is_admin` set to `true`
- [ ] User can access `/admin` page
- [ ] User can add/edit products

### Database Tables for Admin
- `profiles` - User admin status
- `products` - Product catalog
- `user_preferences` - User search criteria

### Key URLs
- Admin Panel: `/admin`
- User Preferences: `/preferences`
- Results Page: `/results`

This setup ensures secure admin access while maintaining a smooth user experience for both admins and regular users.
