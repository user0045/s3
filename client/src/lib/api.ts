
import { supabase } from "@/integrations/supabase/client";

// API endpoints to match existing queryClient usage
export const apiEndpoints = {
  '/api/content': async () => {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      title: item.title,
      type: item.type,
      genres: [item.genre], // Convert single genre to array for consistency
      genre: item.genre,
      duration: item.duration,
      rating: item.rating,
      status: item.status,
      views: item.views,
      createdAt: item.created_at,
      description: item.description,
      releaseYear: item.release_year,
      thumbnailUrl: item.thumbnail_url,
      videoUrl: item.video_url,
      trailerUrl: item.trailer_url
    }));
  },

  '/api/upcoming-content': async () => {
    const { data, error } = await supabase
      .from('upcoming_content')
      .select('*')
      .order('section_order', { ascending: true });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      title: item.title,
      type: item.type,
      genres: item.genres,
      episodes: item.episodes,
      releaseDate: item.release_date,
      description: item.description,
      thumbnailUrl: item.thumbnail_url,
      trailerUrl: item.trailer_url,
      sectionOrder: item.section_order
    }));
  }
};

// Mock the apiRequest function to use our Supabase endpoints
export const apiRequest = async (endpoint: string, options?: any) => {
  if (endpoint in apiEndpoints) {
    return { data: await apiEndpoints[endpoint as keyof typeof apiEndpoints]() };
  }
  
  // Handle DELETE requests
  if (options?.method === 'DELETE' && endpoint.startsWith('/api/content/')) {
    const id = endpoint.split('/').pop();
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: { success: true } };
  }
  
  throw new Error(`Endpoint ${endpoint} not implemented`);
};
