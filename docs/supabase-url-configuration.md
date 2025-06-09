# Supabase URL Configuration Guide

## Problem
Verification emails are sending users to localhost instead of your actual domain.

## Solution
You need to configure the Site URL in your Supabase dashboard:

### Step 1: Configure Site URL in Supabase Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `ibpnlhhhmxbqdxdleodu`
3. Navigate to **Authentication** → **URL Configuration**
4. Set the **Site URL** to your domain:
   - For development: `http://localhost:3000`
   - For production: `https://your-domain.com` (or your Vercel URL)

### Step 2: Configure Redirect URLs

In the same **URL Configuration** section:

1. **Redirect URLs** - Add these URLs:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://your-domain.com/auth/callback` (for production)
   - `http://localhost:3000/auth/callback?type=signup`
   - `https://your-domain.com/auth/callback?type=signup`

### Step 3: Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the **Confirm signup** template if needed
3. The default template should work with the redirect URLs above

### Step 4: Test the Flow

1. Sign up with a new email
2. Check that the verification email contains the correct domain
3. Click the verification link to ensure it redirects properly

## Important Notes

- **Development**: Use `http://localhost:3000` for local development
- **Production**: Use your actual domain (Vercel will provide this when you deploy)
- **Multiple Environments**: You can add multiple redirect URLs for different environments

## Troubleshooting

If verification links still point to localhost:
1. Double-check the Site URL in Supabase dashboard
2. Make sure you've saved the changes
3. Try signing up with a new email (old emails may still have the old URL)
4. Clear your browser cache and cookies
