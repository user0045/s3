
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Content {
  id: string;
  title: string;
  type: "Movie" | "TV Show";
  genre: string;
  duration: string;
  rating: string;
  status: "Published" | "Draft";
  views: string;
  description?: string;
  thumbnail_url?: string;
  video_url?: string;
  trailer_url?: string;
  release_year?: number;
}

interface ContentEditFormProps {
  contentId: string;
  onCancel: () => void;
  onSave: () => void;
}

const ContentEditForm = ({ contentId, onCancel, onSave }: ContentEditFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('id', contentId)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive"
        });
        return;
      }

      // Cast the type field to ensure it matches our Content interface
      const typedData = {
        ...data,
        type: data.type as "Movie" | "TV Show", 
        status: data.status as "Published" | "Draft"
      };

      setFormData(typedData);
      setIsLoading(false);
    };

    fetchContent();
  }, [contentId, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const { error } = await supabase
      .from('content')
      .update({
        title: formData.title,
        type: formData.type,
        genre: formData.genre,
        duration: formData.duration,
        rating: formData.rating,
        status: formData.status,
        views: formData.views,
        description: formData.description,
        thumbnail_url: formData.thumbnail_url,
        video_url: formData.video_url,
        trailer_url: formData.trailer_url,
        release_year: formData.release_year,
        updated_at: new Date().toISOString()
      })
      .eq('id', contentId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Content updated successfully!"
    });
    
    onSave();
  };

  const handleInputChange = (field: keyof Content, value: string | number) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!formData) {
    return <div>Content not found</div>;
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Edit Content</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "Movie" | "TV Show") => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="TV Show">TV Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleInputChange("genre", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "Published" | "Draft") => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="views">Views</Label>
              <Input
                id="views"
                value={formData.views}
                onChange={(e) => handleInputChange("views", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="release_year">Release Year</Label>
              <Input
                id="release_year"
                type="number"
                value={formData.release_year || ""}
                onChange={(e) => handleInputChange("release_year", parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
              <Input
                id="thumbnail_url"
                type="url"
                value={formData.thumbnail_url || ""}
                onChange={(e) => handleInputChange("thumbnail_url", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_url">Video URL</Label>
              <Input
                id="video_url"
                type="url"
                value={formData.video_url || ""}
                onChange={(e) => handleInputChange("video_url", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trailer_url">Trailer URL</Label>
              <Input
                id="trailer_url"
                type="url"
                value={formData.trailer_url || ""}
                onChange={(e) => handleInputChange("trailer_url", e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentEditForm;
