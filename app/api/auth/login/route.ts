import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'zamtos79@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'upE9^r$D}xsC=86';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email ve şifre gereklidir' },
        { status: 400 }
      );
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Giriş başarılı',
          user: {
            email: email,
            role: 'admin'
          }
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Email veya şifre hatalı' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}

