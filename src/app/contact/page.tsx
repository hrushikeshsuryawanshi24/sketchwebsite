'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Menu, X, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import Artstation from '@/components/ui/artstation';
import Behance from '@/components/ui/behance';

export default function Contact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      
      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1000);
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
                <Link href="/gallery" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Gallery
                </Link>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
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
              <Link href="/about" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400">
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
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            I'd love to hear from you! Whether you're interested in purchasing artwork, commissioning a piece, or just want to connect about art.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-white dark:bg-slate-800 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-6">
                  Send Me a Message
                </h2>
                
                {submitMessage && (
                  <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-800 dark:text-green-300">{submitMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Name *
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-slate-700 dark:text-white resize-none"
                      placeholder="Tell me about your project, inquiry, or just say hello..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-white dark:bg-slate-800 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                      <p className="text-slate-900 dark:text-white font-medium">hello@acesart.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Phone</p>
                      <p className="text-slate-900 dark:text-white font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Studio</p>
                      <p className="text-slate-900 dark:text-white font-medium">New York, NY</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-white dark:bg-slate-800 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-6">
                  Follow My Work
                </h2>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Stay updated with my latest creations, behind-the-scenes content, and artistic journey through social media.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a
                    href="#"
                    className="flex items-center justify-center space-x-2 p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
                  >
                    <Instagram className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400">Instagram</span>
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center space-x-2 p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
                  >
                    <Behance className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400">Behance</span>
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center space-x-2 p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
                  >
                    <Artstation className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400">ArtStation</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif mb-4">
                  Studio Hours
                </h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </p>
                </div>
                <p className="mt-4 text-sm text-white/80">
                  Response time for inquiries is typically within 24-48 hours.
                </p>
              </CardContent>
            </Card>
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