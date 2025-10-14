'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Edit, 
  LogOut, 
  Palette,
  Eye,
  X
} from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewArtwork, setViewArtwork] = useState<Artwork | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchArtworks();
  }, [router]);

  const fetchArtworks = async () => {
    try {
      const response = await fetch('/api/artworks');
      const data = await response.json();
      
      if (data.success) {
        setArtworks(data.data);
      }
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setMessage('Failed to fetch artworks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      let imageUrl = '';

      if (selectedFile) {
        // In a real app, upload to a service like Cloudinary or AWS S3
        // For demo purposes, we'll use a placeholder URL
        imageUrl = `https://picsum.photos/seed/${Date.now()}/800/600.jpg`;
      } else {
        setMessage('Please select an image');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/artworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrl,
          price: formData.price || null
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Artwork uploaded successfully!');
        setFormData({ title: '', description: '', category: '', price: '' });
        setSelectedFile(null);
        setPreviewUrl('');
        setIsDialogOpen(false);
        fetchArtworks();
      } else {
        setMessage(data.message || 'Failed to upload artwork');
      }
    } catch (error) {
      console.error('Error uploading artwork:', error);
      setMessage('Failed to upload artwork');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artwork?')) return;

    try {
      const response = await fetch(`/api/artworks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Artwork deleted successfully');
        fetchArtworks();
      } else {
        setMessage('Failed to delete artwork');
      }
    } catch (error) {
      console.error('Error deleting artwork:', error);
      setMessage('Failed to delete artwork');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Palette className="w-8 h-8 text-amber-600" />
                <h1 className="text-2xl font-serif text-slate-900 dark:text-white">
                  Admin Dashboard
                </h1>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                Ace S Portfolio
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                View Site
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message Alert */}
        {message && (
          <Alert className={`mb-6 ${
            message.includes('success') 
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
              : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
          }`}>
            <AlertDescription className={
              message.includes('success') 
                ? 'text-green-800 dark:text-green-300' 
                : 'text-red-800 dark:text-red-300'
            }>
              {message}
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Artworks</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{artworks.length}</p>
                </div>
                <ImageIcon className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {artworks.filter(a => a.isActive).length}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Categories</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {[...new Set(artworks.map(a => a.category))].length}
                  </p>
                </div>
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-serif text-slate-900 dark:text-white">
                Upload New Artwork
              </CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Artwork
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-serif text-slate-900 dark:text-white">
                      Upload New Artwork
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Title *
                        </Label>
                        <Input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="Artwork title"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Category *
                        </Label>
                        <Input
                          type="text"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="e.g., Digital Art, Painting"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-slate-700 dark:text-white resize-none"
                        placeholder="Describe your artwork..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Price (optional)
                      </Label>
                      <Input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., $250"
                      />
                    </div>

                    <div>
                      <Label htmlFor="image" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Image *
                      </Label>
                      <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:border-amber-500 transition-colors">
                        <input
                          type="file"
                          id="image"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <label htmlFor="image" className="cursor-pointer">
                          {previewUrl ? (
                            <div className="space-y-4">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg mx-auto"
                              />
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Click to change image
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                              <div>
                                <p className="text-slate-600 dark:text-slate-300">
                                  Click to upload or drag and drop
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Uploading...' : 'Upload Artwork'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        {/* Artworks Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-serif text-slate-900 dark:text-white">
              Manage Artworks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {artworks.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  No artworks uploaded yet
                </p>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload First Artwork
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artworks.map((artwork) => (
                  <Card key={artwork.id} className="overflow-hidden">
                    <div className="aspect-w-4 aspect-h-3">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                            {artwork.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {artwork.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                          {artwork.description}
                        </p>
                        {artwork.price && (
                          <p className="text-amber-600 dark:text-amber-400 font-semibold">
                            {artwork.price}
                          </p>
                        )}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setViewArtwork(artwork)}
                            className="flex-1"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(artwork.id)}
                            className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* View Artwork Modal */}
      {viewArtwork && (
        <Dialog open={!!viewArtwork} onOpenChange={() => setViewArtwork(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-2xl font-serif text-slate-900 dark:text-white">
                  {viewArtwork.title}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewArtwork(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={viewArtwork.imageUrl}
                alt={viewArtwork.title}
                className="w-full rounded-lg shadow-lg"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {viewArtwork.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {viewArtwork.title}
                  </h3>
                  {viewArtwork.price && (
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-4">
                      {viewArtwork.price}
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Description
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {viewArtwork.description}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}