import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST() {
  try {
    // Sample artworks to seed the database
    const sampleArtworks = [
      {
        title: "Ethereal Dreams",
        description: "A mesmerizing exploration of consciousness and reality, blending abstract forms with vibrant colors to create a dreamlike atmosphere that challenges perception and invites deep contemplation.",
        category: "Digital Art",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$250"
      },
      {
        title: "Urban Symphony",
        description: "The rhythm of city life captured in a symphony of geometric patterns and bold strokes, representing the harmony found in urban chaos and the beauty of metropolitan landscapes.",
        category: "Mixed Media",
        imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$350"
      },
      {
        title: "Nature's Whisper",
        description: "Delicate interpretations of natural forms, where organic shapes meet abstract expression to reveal the subtle voices of the natural world and its hidden mysteries.",
        category: "Watercolor",
        imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3a803d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$200"
      },
      {
        title: "Cosmic Dance",
        description: "An exploration of celestial movements and cosmic energies, rendered through dynamic compositions that capture the infinite dance of the universe and its stellar phenomena.",
        category: "Digital Art",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$400"
      },
      {
        title: "Emotional Landscapes",
        description: "Internal worlds externalized through color and form, creating landscapes that mirror the complexity of human emotions and psychological experiences.",
        category: "Abstract",
        imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$300"
      },
      {
        title: "Silent Echoes",
        description: "A contemplative piece exploring the spaces between sound and silence, using subtle gradients and flowing forms to represent the invisible vibrations of quiet moments.",
        category: "Digital Painting",
        imageUrl: "https://images.unsplash.com/photo-1579532586947-3e52e229058b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$320"
      }
    ];

    // Clear existing artworks
    await db.artwork.deleteMany({});

    // Insert sample artworks
    for (const artwork of sampleArtworks) {
      await db.artwork.create({
        data: artwork
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${sampleArtworks.length} artworks`
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to seed database'
    }, { status: 500 });
  }
}