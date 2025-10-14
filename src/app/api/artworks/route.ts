import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all artworks
export async function GET() {
  try {
    const artworks = await db.artwork.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: artworks
    });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch artworks'
    }, { status: 500 });
  }
}

// POST new artwork
export async function POST(request: NextRequest) {
  try {
    const { title, description, category, imageUrl, price } = await request.json();

    if (!title || !description || !category || !imageUrl) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }

    const artwork = await db.artwork.create({
      data: {
        title,
        description,
        category,
        imageUrl,
        price: price || null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Artwork created successfully',
      data: artwork
    });
  } catch (error) {
    console.error('Error creating artwork:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create artwork'
    }, { status: 500 });
  }
}