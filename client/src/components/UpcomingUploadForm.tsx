import { useState } from "react";
import { Calendar, Save, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface UpcomingUploadFormProps {
  onSuccess?: () => void;
}

const UpcomingUploadForm = ({ onSuccess }: UpcomingUploadFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    genres: [] as string[],
    episodes: null as number | null,
    releaseDate: "",
    description: "",
    thumbnailUrl: "",
    trailerUrl: "",
    sectionOrder: 0
  });
  
  const [newGenre, setNewGenre] = useState("");

  const handleInputChange = (field: string, value: string | number | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addGenre = () => {
    if (newGenre.trim() && !formData.genres.includes(newGenre.trim())) {
      setFormData(prev => ({
        ...prev,
        genres: [...prev.genres, newGenre.trim()]
      }));
      setNewGenre("");
    }
  };

  const removeGenre = (genreToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.filter(genre => genre !== genreToRemove)
    }));
  };

  const createUpcomingContentMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('/api/upcoming-content', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/upcoming-content'] });
      toast({
        title: "Success",
        description: "Upcoming content created successfully!"
      });
      // Reset form
      setFormData({
        title: "",
        type: "",
        genres: [],
        episodes: null,
        releaseDate: "",
        description: "",
        thumbnailUrl: "",
        trailerUrl: "",
        sectionOrder: 0
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create upcoming content",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.genres.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one genre",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === "tv_show" && (!formData.episodes || formData.episodes <= 0)) {
      toast({
        title: "Error",
        description: "Please enter the number of episodes for TV shows",
        variant: "destructive"
      });
      return;
    }

    const data = {
      title: formData.title,
      type: formData.type,
      genres: formData.genres,
      episodes: formData.type === "tv_show" ? formData.episodes : null,
      releaseDate: new Date(formData.releaseDate).toISOString(),
      description: formData.description,
      thumbnailUrl: formData.thumbnailUrl || null,
      trailerUrl: formData.trailerUrl || null,
      sectionOrder: formData.sectionOrder
    };

    createUpcomingContentMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Add Upcoming Content
        </CardTitle>
        <CardDescription>
          Add new upcoming movies or TV shows to be displayed in the upcoming section
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => handleInputChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="movie">Movie</SelectItem>
                <SelectItem value="tv_show">TV Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Episodes (only for TV shows) */}
          {formData.type === "tv_show" && (
            <div className="space-y-2">
              <Label htmlFor="episodes">Number of Episodes *</Label>
              <Input
                id="episodes"
                type="number"
                min="1"
                value={formData.episodes?.toString() || ""}
                onChange={(e) => handleInputChange("episodes", parseInt(e.target.value) || null)}
                placeholder="Enter number of episodes"
                required
              />
            </div>
          )}

          {/* Genres */}
          <div className="space-y-2">
            <Label>Genres *</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                placeholder="Add genre"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addGenre();
                  }
                }}
              />
              <Button type="button" onClick={addGenre} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.genres.map((genre, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {genre}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeGenre(genre)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Release Date */}
          <div className="space-y-2">
            <Label htmlFor="releaseDate">Release Date *</Label>
            <Input
              id="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={(e) => handleInputChange("releaseDate", e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter description"
              rows={4}
              required
            />
          </div>

          {/* Thumbnail URL */}
          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
            <Input
              id="thumbnailUrl"
              type="url"
              value={formData.thumbnailUrl}
              onChange={(e) => handleInputChange("thumbnailUrl", e.target.value)}
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>

          {/* Trailer URL */}
          <div className="space-y-2">
            <Label htmlFor="trailerUrl">Trailer URL</Label>
            <Input
              id="trailerUrl"
              type="url"
              value={formData.trailerUrl}
              onChange={(e) => handleInputChange("trailerUrl", e.target.value)}
              placeholder="https://example.com/trailer.mp4"
            />
          </div>

          {/* Section Order */}
          <div className="space-y-2">
            <Label htmlFor="sectionOrder">Section Order</Label>
            <Input
              id="sectionOrder"
              type="number"
              min="0"
              value={formData.sectionOrder}
              onChange={(e) => handleInputChange("sectionOrder", parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button 
              type="submit" 
              disabled={createUpcomingContentMutation.isPending}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {createUpcomingContentMutation.isPending ? "Creating..." : "Create Content"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpcomingUploadForm;