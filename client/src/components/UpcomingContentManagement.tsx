
import { useState } from "react";
import { Calendar, Edit, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import UpcomingUploadForm from "./UpcomingUploadForm";
import UpcomingEditForm from "./UpcomingEditForm";

interface UpcomingContent {
  id: string;
  title: string;
  genres: string[];
  episodes: number | null;
  release_date: string;
  description: string;
  type: "movie" | "tv";
  thumbnail_url: string | null;
  trailer_url: string | null;
  section_order: number;
}

const UpcomingContentManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: upcomingContent = [], isLoading } = useQuery({
    queryKey: ['upcoming-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('upcoming_content')
        .select('*')
        .order('section_order', { ascending: true });
      
      if (error) throw error;
      return data as UpcomingContent[];
    }
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('upcoming_content')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete upcoming content",
        variant: "destructive"
      });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['upcoming-content'] });
    
    toast({
      title: "Success",
      description: "Upcoming content deleted successfully!"
    });
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = () => {
    setEditingId(null);
    queryClient.invalidateQueries({ queryKey: ['upcoming-content'] });
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    queryClient.invalidateQueries({ queryKey: ['upcoming-content'] });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (showAddForm) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Add Upcoming Content</h2>
          <Button
            variant="outline"
            onClick={() => setShowAddForm(false)}
          >
            Back to Management
          </Button>
        </div>
        <UpcomingUploadForm onSuccess={handleAddSuccess} />
      </div>
    );
  }

  if (editingId) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Edit Upcoming Content</h2>
          <Button
            variant="outline"
            onClick={handleCancelEdit}
          >
            Back to Management
          </Button>
        </div>
        <UpcomingEditForm
          contentId={editingId}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Content Management
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage all upcoming movies and TV shows ({upcomingContent.length}/20)
            </CardDescription>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {upcomingContent.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No upcoming content found.</p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Content
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Genres</TableHead>
                <TableHead>Episodes</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingContent.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <Badge variant="outline" className="border-primary text-primary">
                      {content.section_order}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{content.title}</TableCell>
                  <TableCell>
                    <Badge variant={content.type === "movie" ? "default" : "secondary"}>
                      {content.type === "movie" ? "Movie" : "TV Show"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {content.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="outline" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                      {content.genres.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{content.genres.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {content.type === "tv" && content.episodes ? (
                      <Badge variant="secondary">{content.episodes} eps</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(content.release_date)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(content.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(content.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingContentManagement;
