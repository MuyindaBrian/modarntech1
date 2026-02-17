-- MODARNTECH RLS Policies
-- Run this after 001-schema.sql

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Posts
CREATE POLICY "Published posts are viewable by everyone" ON public.posts
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));
CREATE POLICY "Authors can create posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));
CREATE POLICY "Admins can delete posts" ON public.posts
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- Comments
CREATE POLICY "Approved comments are viewable by everyone" ON public.comments
  FOR SELECT USING (approved = true OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));
CREATE POLICY "Anyone can submit comments" ON public.comments
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update comments" ON public.comments
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));
CREATE POLICY "Admins can delete comments" ON public.comments
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- Newsletter
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view subscribers" ON public.newsletter_subscribers
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- Portfolio
CREATE POLICY "Portfolio is viewable by everyone" ON public.portfolio_projects
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage portfolio" ON public.portfolio_projects
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- Post views
CREATE POLICY "Anyone can create views" ON public.post_views
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view analytics" ON public.post_views
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- Contact messages
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view messages" ON public.contact_messages
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));
CREATE POLICY "Admins can update messages" ON public.contact_messages
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));
