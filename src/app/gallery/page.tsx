'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, ShoppingCart, Mail, Eye } from 'lucide-react';
import { Menu } from 'lucide-react';

interface Artwork {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price?: string;
}

export default function Gallery() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [fullSizePreview, setFullSizePreview] = useState<Artwork | null>(null);

  useEffect(() => {
    // Fetch artworks from API
    const fetchArtworks = async () => {
      try {
        const response = await fetch('/api/artworks');
        const data = await response.json();
        
        if (data.success) {
          setArtworks(data.data);
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
        // Fallback to sample data if API fails
        const sampleArtworks: Artwork[] = [
          {
            id: "1",
            title: "Ethereal Dreams",
            description: "A mesmerizing exploration of consciousness and reality, blending abstract forms with vibrant colors to create a dreamlike atmosphere that challenges perception and invites deep contemplation.",
            category: "Digital Art",
            imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "$250"
          },
          {
            id: "2",
            title: "Urban Symphony",
            description: "The rhythm of city life captured in a symphony of geometric patterns and bold strokes, representing the harmony found in urban chaos and the beauty of metropolitan landscapes.",
            category: "Mixed Media",
            imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "$350"
          },
          {
            id: "3",
            title: "Nature's Whisper",
            description: "Delicate interpretations of natural forms, where organic shapes meet abstract expression to reveal the subtle voices of the natural world and its hidden mysteries.",
            category: "Watercolor",
            imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3a803d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "$200"
          },
          {
            id: "4",
            title: "Cosmic Dance",
            description: "An exploration of celestial movements and cosmic energies, rendered through dynamic compositions that capture the infinite dance of the universe and its stellar phenomena.",
            category: "Digital Art",
            imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "$400"
          },
          {
            id: "5",
            title: "Emotional Landscapes",
            description: "Internal worlds externalized through color and form, creating landscapes that mirror the complexity of human emotions and psychological experiences.",
            category: "Abstract",
            imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "$300"
          },
          {
            id: "6",
            title: "Temporal Fragments",
            description: "Time captured in fragmented moments, where past, present, and future converge in a single visual narrative that challenges linear perception of reality.",
            category: "Mixed Media",
            imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "$275"
          },
          {
            id: "7",
            title: "Silent Echoes",
            description: "A contemplative piece exploring the spaces between sound and silence, using subtle gradients and flowing forms to represent the invisible vibrations of quiet moments.",
            category: "Digital Painting",
            imageUrl: "https://images.unsplash.com/photo-1579532586947-3e52e229058b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "$320"
          },
          {
            id: "8",
            title: "Fragments of Memory",
            description: "A nostalgic journey through fragmented recollections, where each brushstroke represents a piece of a larger story waiting to be discovered and understood.",
            category: "Oil Painting",
            imageUrl: "https://images.unsplash.com/photo-1587563871167-1ee9c631d8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "$450"
          },
          {
            id: "9",
            title: "Digital Metamorphosis",
            description: "The transformation of traditional artistic techniques into the digital realm, showcasing how technology can enhance and expand creative possibilities.",
            category: "Digital Art",
            imageUrl: "https://images.unsplash.com/photo-1563089145-599587d0e61c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            price: "$380"
          }
        ];
        setArtworks(sampleArtworks);
      }
    };

    fetchArtworks();
  }, []);

  const handlePurchase = () => {
    setShowPurchaseModal(true);
  };

  const handleContactPurchase = () => {
    setShowPurchaseModal(false);
    setSelectedArtwork(null);
    // Redirect to contact page or open contact form
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-serif text-slate-900 dark:text-white">
                Ace S
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Home
                </Link>
                <Link href="/gallery" className="text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Gallery
                </Link>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-900 dark:text-white"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400">
                Home
              </Link>
              <Link href="/gallery" className="block px-3 py-2 text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400">
                Gallery
              </Link>
              <Link href="/about" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Header */}
      <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white mb-4">
          Art Gallery
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Explore my collection of artistic works, each piece a unique expression of creativity and imagination.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div 
                className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-slate-800"
                onClick={() => setFullSizePreview(artwork)}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-slate-900">
                    {artwork.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-3">
                    <Eye className="w-6 h-6 text-slate-900 dark:text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-2">
                  {artwork.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
                  {artwork.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">
                    {artwork.price}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArtwork(artwork);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Artwork Detail Modal */}
      <Dialog open={!!selectedArtwork && !showPurchaseModal} onOpenChange={() => setSelectedArtwork(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedArtwork && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-slate-900 dark:text-white">
                  {selectedArtwork.title}
                </DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {selectedArtwork.category}
                    </Badge>
                    <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-2">
                      {selectedArtwork.title}
                    </h3>
                    <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-4">
                      {selectedArtwork.price}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      About this piece
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedArtwork.description}
                    </p>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handlePurchase}
                      className="bg-amber-600 hover:bg-amber-700 text-white flex-1"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Purchase
                    </Button>
                    <Link href="/contact">
                      <Button variant="outline" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Inquire
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Purchase Modal */}
      <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif text-slate-900 dark:text-white">
              Thank you for your interest!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We appreciate your interest in "{selectedArtwork?.title}". To proceed with your purchase, please contact us directly.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleContactPurchase}
                className="bg-amber-600 hover:bg-amber-700 text-white flex-1"
              >
                Contact for Purchase
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Size Preview Modal */}
      <Dialog open={!!fullSizePreview} onOpenChange={() => setFullSizePreview(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0">
          {fullSizePreview && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFullSizePreview(null)}
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-slate-900 rounded-full"
              >
                <X className="w-6 h-6" />
              </Button>
              <img
                src={fullSizePreview.imageUrl}
                alt={fullSizePreview.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="bg-white dark:bg-slate-800 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {fullSizePreview.category}
                    </Badge>
                    <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-2">
                      {fullSizePreview.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {fullSizePreview.description}
                    </p>
                    {fullSizePreview.price && (
                      <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
                        {fullSizePreview.price}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setSelectedArtwork(fullSizePreview);
                        setFullSizePreview(null);
                        handlePurchase();
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Purchase
                    </Button>
                    <Link href="/contact">
                      <Button variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Inquire
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-serif mb-2">Ace S</h3>
              <p className="text-slate-400">Digital Artist & Creative</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                Behance
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                ArtStation
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>&copy; 2025 Ace S. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}