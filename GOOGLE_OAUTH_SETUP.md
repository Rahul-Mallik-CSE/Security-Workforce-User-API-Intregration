<!-- @format -->

# Google OAuth Setup Guide

## Installation Completed ✅

The following has been implemented:

### 1. Package Installed

- `@react-oauth/google` - Official Google OAuth library for React

### 2. Files Created/Modified

#### Created:

- `GoogleOAuthProvider.tsx` - Wrapper component for Google OAuth
- `.env.local.example` - Environment variables template

#### Modified:

- `authAPI.tsx` - Added `googleAuth` mutation and exported `useGoogleAuthMutation`
- `layout.tsx` - Added GoogleOAuthProvider wrapper
- `SignInForm.tsx` - Integrated Google Sign-In functionality
- `SignUpForm.tsx` - Integrated Google Sign-Up functionality

### 3. Setup Instructions

#### Step 1: Get Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Configure OAuth consent screen
6. Create OAuth 2.0 Client ID (Web application)
7. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production domain
8. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - Your production domain
9. Copy the Client ID

#### Step 2: Configure Environment Variables

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
```

Replace `your-google-client-id-here.apps.googleusercontent.com` with your actual Google Client ID.

#### Step 3: Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

### 4. How It Works

#### Sign In Flow:

1. User clicks "Log in with Google" button
2. Google OAuth popup opens
3. User authenticates with Google
4. Google returns an access token
5. Frontend sends the token to backend API: `POST /api/auth/google/`
6. Backend validates token and returns user data with access token
7. Frontend saves tokens and redirects to dashboard

#### Sign Up Flow:

Same as Sign In - the backend determines if it's a new user or existing user based on the Google account.

### 5. API Integration

The implementation sends the following to your backend:

```json
{
  "id_token": "google-access-token-here",
  "user_type": "company"
}
```

**Note:** The library uses `access_token` from Google, which is sent as `id_token` to your backend API.

### 6. Features Implemented

✅ Google Sign-In button with loading state
✅ Google Sign-Up button with loading state
✅ Error handling and toast notifications
✅ Automatic token storage (localStorage + cookies)
✅ Automatic redirect after successful authentication
✅ Referral token support in sign-up flow
✅ User type set to "company" by default

### 7. Testing

1. Make sure your `.env.local` file has the correct Google Client ID
2. Restart the dev server
3. Go to sign-in or sign-up page
4. Click the Google button
5. Complete Google authentication
6. You should be redirected to the dashboard

### 8. Troubleshooting

**Issue:** "Invalid Client ID" error

- **Solution:** Check that your `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is correct in `.env.local`

**Issue:** Google popup doesn't open

- **Solution:** Check browser popup blocker settings

**Issue:** "Redirect URI mismatch" error

- **Solution:** Add your current domain to authorized redirect URIs in Google Cloud Console

**Issue:** Backend returns error

- **Solution:** Check that your backend API is properly configured to handle Google authentication

### 9. Security Notes

- Never commit `.env.local` to version control
- The Google Client ID can be public (it's safe to expose in frontend)
- The actual authentication is validated on the backend
- Tokens are stored in both localStorage and httpOnly cookies for security

---

## Next Steps

1. Create `.env.local` file with your Google Client ID
2. Test the Google Sign-In/Sign-Up flow
3. Verify backend API integration
4. Test error scenarios
5. Deploy and update Google Cloud Console with production URLs
