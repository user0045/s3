import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Save, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const ContentUploadForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: "",
    type: "movie",
    genres: [] as string[],
    duration: "",
    rating: "",
    status: "draft",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    trailerUrl: "",
    releaseYear: new Date().getFullYear(),
    director: "",
    writer: "",
    cast: [] as string[],
    tags: [] as string[],
    episodes: null as number | null
  });

  const [newGenre, setNewGenre] = useState("");
  const [newCastMember, setNewCastMember] = useState("");
  const [newTag, setNewTag] = useState("");

  const createContentMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('/api/content', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({
        title: "Success",
        description: "Content created successfully!"
      });
      // Reset form
      setFormData({
        title: "",
        type: "movie",
        genres: [],
        duration: "",
        rating: "",
        status: "draft",
        description: "",
        thumbnailUrl: "",
        videoUrl: "",
        trailerUrl: "",
        releaseYear: new Date().getFullYear(),
        director: "",
        writer: "",
        cast: [],
        tags: [],
        episodes: null
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create content",
        variant: "destructive"
      });
    }
  });

  const handleInputChange = (field: string, value: any) => {
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

  const addCastMember = () => {
    if (newCastMember.trim() && !formData.cast.includes(newCastMember.trim())) {
      setFormData(prev => ({
        ...prev,
        cast: [...prev.cast, newCastMember.trim()]
      }));
      setNewCastMember("");
    }
  };

  const removeCastMember = (memberToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      cast: prev.cast.filter(member => member !== memberToRemove)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

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
      duration: formData.duration || null,
      rating: formData.rating,
      status: formData.status,
      description: formData.description || null,
      thumbnailUrl: formData.thumbnailUrl || null,
      videoUrl: formData.videoUrl || null,
      trailerUrl: formData.trailerUrl || null,
      releaseYear: formData.releaseYear,
      director: formData.director || null,
      writer: formData.writer || null,
      cast: formData.cast.length > 0 ? formData.cast : null,
      tags: formData.tags.length > 0 ? formData.tags : null,
      episodes: formData.type === "tv_show" ? formData.episodes : null
    };

    createContentMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Content
        </CardTitle>
        <CardDescription>
          Add new movies or TV shows to your streaming platform
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
              placeholder="Enter content title"
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Content Type *</Label>
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

          {/* Duration & Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 2h 30m"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating *</Label>
              <Select 
                value={formData.rating} 
                onValueChange={(value) => handleInputChange("rating", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="PG">PG</SelectItem>
                  <SelectItem value="PG-13">PG-13</SelectItem>
                  <SelectItem value="R">R</SelectItem>
                  <SelectItem value="NC-17">NC-17</SelectItem>
                  <SelectItem value="TV-Y">TV-Y</SelectItem>
                  <SelectItem value="TV-Y7">TV-Y7</SelectItem>
                  <SelectItem value="TV-G">TV-G</SelectItem>
                  <SelectItem value="TV-PG">TV-PG</SelectItem>
                  <SelectItem value="TV-14">TV-14</SelectItem>
                  <SelectItem value="TV-MA">TV-MA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status & Release Year */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="releaseYear">Release Year</Label>
              <Input
                id="releaseYear"
                type="number"
                min="1900"
                max="2030"
                value={formData.releaseYear}
                onChange={(e) => handleInputChange("releaseYear", parseInt(e.target.value) || new Date().getFullYear())}
                placeholder="2024"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter content description"
              rows={4}
            />
          </div>

          {/* Director & Writer */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="director">Director</Label>
              <Input
                id="director"
                value={formData.director}
                onChange={(e) => handleInputChange("director", e.target.value)}
                placeholder="Director name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="writer">Writer</Label>
              <Input
                id="writer"
                value={formData.writer}
                onChange={(e) => handleInputChange("writer", e.target.value)}
                placeholder="Writer name"
              />
            </div>
          </div>

          {/* Cast */}
          <div className="space-y-2">
            <Label>Cast</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newCastMember}
                onChange={(e) => setNewCastMember(e.target.value)}
                placeholder="Add cast member"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCastMember();
                  }
                }}
              />
              <Button type="button" onClick={addCastMember} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.cast.map((member, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {member}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeCastMember(member)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="default" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* URLs */}
          <div className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                type="url"
                value={formData.videoUrl}
                onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                placeholder="https://example.com/video.mp4"
              />
            </div>
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
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button 
              type="submit" 
              disabled={createContentMutation.isPending}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {createContentMutation.isPending ? "Creating..." : "Create Content"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentUploadForm;