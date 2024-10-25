'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@smartleadmagnet/ui/components/ui/input';
import { Card } from '@smartleadmagnet/ui/components/ui/card';
import { Button } from '@smartleadmagnet/ui/components/ui/button';
import { Spinner } from '@smartleadmagnet/ui/components/ui/spinner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@smartleadmagnet/ui/components/ui/dialog';

interface Result {
  websiteData: {
    title: string;
    description: string;
    bodyText: string;
  };
  suggestedMagnet: {
    title: string;
    description: string;
  };
}

export default function MagnetSuggestionForm({ user }: { user: any }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      if (!user) {
        setShowLoginModal(true);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/suggest-magnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch magnet suggestion');
      }

      const data = await response.json();
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('An error occurred while fetching the magnet suggestion.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    router.push('/login');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-5xl items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-10 px-4">
        <Input
          type="url"
          placeholder="Enter Your Website URL"
          className="w-full px-4 py-3 sm:px-8 sm:py-8 text-lg sm:text-2xl rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="px-6 py-4 sm:px-10 sm:py-8 text-lg sm:text-xl font-bold rounded-xl bg-cyan-500 text-white hover:bg-cyan-900 shadow-md"
          disabled={loading}
        >
          {loading ? <Spinner className="w-6 h-6" /> : 'Search'}
        </Button>
      </form>

      {error && (
        <Card className="p-4 border rounded-lg shadow-lg bg-red-100 text-red-700 mb-6">
          {error}
        </Card>
      )}

      {result && (
        <div className="grid grid-cols-1 gap-6 w-full max-w-5xl px-4">
          <Card className="p-4 border rounded-lg shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Website Data</h3>
            <p><strong>Title:</strong> {result.websiteData.title}</p>
            <p><strong>Description:</strong> {result.websiteData.description}</p>
            <p><strong>Body Text (excerpt):</strong> {result.websiteData.bodyText}</p>
          </Card>

          <Card className="p-4 border rounded-lg shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Suggested Lead Magnet</h3>
            <p><strong>Title:</strong> {result.suggestedMagnet.title}</p>
            <p><strong>Description:</strong> {result.suggestedMagnet.description}</p>
          </Card>
        </div>
      )}

      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to use this feature. Would you like to log in now?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowLoginModal(false)}>Cancel</Button>
            <Button onClick={handleLogin}>Log In</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
