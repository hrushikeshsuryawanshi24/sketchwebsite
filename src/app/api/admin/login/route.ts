import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Simple authentication - in production, use proper password hashing
    if (username === 'admin' && password === 'admin123') {
      // Create or find admin user
      let adminUser = await db.user.findFirst({
        where: { email: 'admin@acesart.com' }
      });

      if (!adminUser) {
        adminUser = await db.user.create({
          data: {
            email: 'admin@acesart.com',
            name: 'Admin',
            role: 'admin'
          }
        });
      }

      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${adminUser.id}:${Date.now()}`).toString('base64');

      return NextResponse.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role
        }
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid username or password'
    }, { status: 401 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}