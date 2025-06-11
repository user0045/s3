
-- Create content table for movies and TV shows
CREATE TABLE public.content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Movie', 'TV Show')),
  genre TEXT NOT NULL,
  duration TEXT NOT NULL,
  rating TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Published' CHECK (status IN ('Published', 'Draft')),
  views TEXT NOT NULL DEFAULT '0',
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  trailer_url TEXT,
  release_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create upcoming_content table
CREATE TABLE public.upcoming_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('movie', 'tv')),
  genres JSONB NOT NULL DEFAULT '[]',
  episodes INTEGER,
  release_date DATE NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  trailer_url TEXT,
  section_order INTEGER NOT NULL CHECK (section_order >= 1 AND section_order <= 20),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(section_order)
);

-- Enable Row Level Security
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upcoming_content ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (since this is admin content)
CREATE POLICY "Allow all operations on content" ON public.content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on upcoming_content" ON public.upcoming_content FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_content_type ON public.content(type);
CREATE INDEX idx_content_status ON public.content(status);
CREATE INDEX idx_content_created_at ON public.content(created_at);
CREATE INDEX idx_upcoming_content_release_date ON public.upcoming_content(release_date);
CREATE INDEX idx_upcoming_content_section_order ON public.upcoming_content(section_order);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for auto-updating timestamps
CREATE TRIGGER update_content_updated_at 
  BEFORE UPDATE ON public.content 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_upcoming_content_updated_at 
  BEFORE UPDATE ON public.upcoming_content 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
