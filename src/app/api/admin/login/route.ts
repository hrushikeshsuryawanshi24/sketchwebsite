// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/lib/db';

// export async function POST(request: NextRequest) {
//   try {
//     const { username, password } = await request.json();

//     // Simple authentication - in production, use proper password hashing
//     if (username === 'admin' && password === 'admin123') {
//       // Create or find admin user
//       let adminUser = await db.user.findFirst({
//         where: { email: 'admin@acesart.com' }
//       });

//       if (!adminUser) {
//         adminUser = await db.user.create({
//           data: {
//             email: 'admin@acesart.com',
//             name: 'Admin',
//             role: 'admin'
//           }
//         });
//       }

//       // Generate a simple token (in production, use JWT)
//       const token = Buffer.from(`${adminUser.id}:${Date.now()}`).toString('base64');

//       return NextResponse.json({
//         success: true,
//         message: 'Login successful',
//         token,
//         user: {
//           id: adminUser.id,
//           email: adminUser.email,
//           name: adminUser.name,
//           role: adminUser.role
//         }
//       });
//     }

//     return NextResponse.json({
//       success: false,
//       message: 'Invalid username or password'
//     }, { status: 401 });

//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({
//       success: false,
//       message: 'Internal server error'
//     }, { status: 500 });
//   }
// }


//without db connection to avoid errors

import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/lib/db'; // ❌ Temporarily disabled to prevent DB connection errors

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // ✅ Simple authentication for now
    if (username === 'admin' && password === 'admin123') {
      // --------------------------------------------
      // The following DB code is commented out temporarily:
      //
      // let adminUser = await db.user.findFirst({
      //   where: { email: 'admin@acesart.com' }
      // });
      //
      // if (!adminUser) {
      //   adminUser = await db.user.create({
      //     data: {
      //       email: 'admin@acesart.com',
      //       name: 'Admin',
      //       role: 'admin'
      //     }
      //   });
      // }
      // --------------------------------------------

      // ✅ Use static admin user for now
      const adminUser = {
        id: 1,
        email: 'admin@acesart.com',
        name: 'Admin',
        role: 'admin'
      };

      // ✅ Generate a simple token (for demo)
      const token = Buffer.from(`${adminUser.id}:${Date.now()}`).toString('base64');

      return NextResponse.json({
        success: true,
        message: 'Login successful',
        token,
        user: adminUser
      });
    }

    // ❌ Wrong credentials
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
