import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_GITHUB_USERNAME = process.env.ALLOWED_GITHUB_USERNAME || 'HIMURAw';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23liEjw5oqTnpkv0Hu';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '56df35c80cfb8e058cff71e7b2e310ca843f6d03';

export async function GET(request: NextRequest) {
  try {
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
      console.error('GitHub OAuth not configured. Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET');
      return NextResponse.redirect(
        `${request.nextUrl.origin}/admin/login?error=github_not_configured`
      );
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      // Redirect URI'yi oluştur
      const origin = request.nextUrl.origin;
      const redirectUri = `${origin}/api/auth/github`;
      const state = Math.random().toString(36).substring(7);
      const scope = 'read:user user:email';
      
      // Debug için log - hangi URL kullanılıyor görelim
      console.log('=== GitHub OAuth Debug ===');
      console.log('Origin:', origin);
      console.log('Redirect URI:', redirectUri);
      console.log('Client ID:', GITHUB_CLIENT_ID);
      console.log('========================');
      
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
      
      console.log('Full GitHub Auth URL:', githubAuthUrl);
      
      const response = NextResponse.redirect(githubAuthUrl);
      response.cookies.set('github_oauth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 600
      });
      
      return response;
    }

    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
      return NextResponse.redirect(
        `${request.nextUrl.origin}/admin/login?error=github_not_configured`
      );
    }

    const storedState = request.cookies.get('github_oauth_state')?.value;
    if (state !== storedState) {
      return NextResponse.redirect(
        `${request.nextUrl.origin}/admin/login?error=invalid_state`
      );
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.redirect(
        `${request.nextUrl.origin}/admin/login?error=token_error`
      );
    }

    const accessToken = tokenData.access_token;

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const userData = await userResponse.json();

    if (!userData.login) {
      return NextResponse.redirect(
        `${request.nextUrl.origin}/admin/login?error=user_fetch_failed`
      );
    }

    if (userData.login.toLowerCase() !== ALLOWED_GITHUB_USERNAME.toLowerCase()) {
      return NextResponse.redirect(
        `${request.nextUrl.origin}/admin/login?error=unauthorized_user`
      );
    }

    const response = NextResponse.redirect(`${request.nextUrl.origin}/admin`);
    
    // State cookie'sini temizle
    response.cookies.delete('github_oauth_state');
    
    response.cookies.set('admin_authenticated', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return NextResponse.redirect(
      `${request.nextUrl.origin}/admin/login?error=oauth_error`
    );
  }
}

