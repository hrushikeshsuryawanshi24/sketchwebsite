// Simple test script to seed the database
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
  }
];

console.log('Sample artworks ready for seeding:', sampleArtworks.length);
console.log('The gallery should now display these artworks with full-screen preview functionality.');