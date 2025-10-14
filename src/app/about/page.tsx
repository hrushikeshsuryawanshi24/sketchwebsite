'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Palette, Brush, Camera, Heart } from 'lucide-react';

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <Link href="/gallery" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Gallery
                </Link>
                <Link href="/about" className="text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
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
              <Link href="/gallery" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400">
                Gallery
              </Link>
              <Link href="/about" className="block px-3 py-2 text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-900/10 dark:to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 dark:text-white mb-6">
            About the Artist
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover the creative mind behind the canvas and the stories that inspire each brushstroke.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Profile Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Ace S - Artist Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-4 rounded-xl shadow-lg">
              <Palette className="w-8 h-8" />
            </div>
          </div>

          {/* Artist Bio */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-serif text-slate-900 dark:text-white mb-4">
                Ace S
              </h2>
              <p className="text-lg text-amber-600 dark:text-amber-400 font-medium mb-4">
                Digital Artist & Creative Visionary
              </p>
            </div>

            <div className="prose prose-lg text-slate-600 dark:text-slate-300 space-y-4">
              <p>
                Welcome to my world of artistic expression. I'm Ace S, a passionate digital artist who finds inspiration in the intersection of technology, nature, and human emotion. My journey as an artist began over a decade ago, driven by an insatiable curiosity to capture the ephemeral moments that define our existence.
              </p>
              
              <p>
                My artistic philosophy revolves around the concept of "emotional resonance" – creating works that not only capture the eye but also touch the soul. Through a careful blend of color theory, composition, and digital innovation, I strive to create pieces that serve as windows into alternate realities and emotional landscapes.
              </p>

              <p>
                Each artwork in my collection represents a unique story, a moment frozen in time that invites viewers to explore their own interpretations and connections. Whether working with abstract forms, natural elements, or urban landscapes, my goal remains constant: to create art that speaks beyond language and cultural boundaries.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1">
                Digital Art
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1">
                Mixed Media
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1">
                Abstract
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1">
                Contemporary
              </Badge>
            </div>
          </div>
        </div>

        {/* Artistic Approach */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 mb-20">
          <h3 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-8 text-center">
            My Creative Process
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brush className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Inspiration
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                Drawing from nature, emotions, and the digital landscape to find unique perspectives and creative sparks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Creation
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                Transforming ideas into visual reality through digital tools, traditional techniques, and experimental approaches.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Connection
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                Sharing art that resonates emotionally, creating meaningful connections between the work and its viewers.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements & Exhibitions */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-8">
            Recognition & Exhibitions
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                2024
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Solo Exhibition - "Digital Dreams" Gallery, New York
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                2023
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Featured Artist - Contemporary Art Fair, London
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                2023
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Best Digital Art - International Creative Awards
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                2022
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Group Exhibition - "Future Visions" Gallery, Tokyo
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-serif mb-4">
            Let's Create Something Beautiful Together
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Whether you're looking to commission a piece, collaborate on a project, or simply want to connect about art, I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery">
              <Button size="lg" variant="secondary" className="bg-white text-amber-600 hover:bg-slate-100 px-8 py-3">
                View My Work
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>

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