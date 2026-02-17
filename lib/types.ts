export type UserRole = "admin" | "editor" | "author"

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  bio: string | null
  created_at: string
}

export type PostStatus = "draft" | "published" | "scheduled"

export interface Post {
  id: string
  title: string
  slug: string
  description: string | null
  content: string
  feature_image: string | null
  author_id: string
  author?: Profile
  status: PostStatus
  tags: string[]
  is_premium: boolean
  read_time: number
  scheduled_at: string | null
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  post_id: string
  post?: Post
  author_name: string
  author_email: string
  content: string
  approved: boolean
  created_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  confirmed: boolean
  created_at: string
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  image_url: string | null
  tech_stack: string[]
  category: string
  live_url: string | null
  github_url: string | null
  case_study: string | null
  featured: boolean
  sort_order: number
  created_at: string
}

export interface PostView {
  id: string
  post_id: string
  viewed_at: string
  referrer: string | null
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

export interface DashboardStats {
  totalPosts: number
  totalViews: number
  totalSubscribers: number
  totalMessages: number
}

export interface ViewsOverTime {
  date: string
  views: number
}

export interface TopPost {
  id: string
  title: string
  slug: string
  views: number
}

export interface AuthorLeaderboard {
  author_id: string
  full_name: string
  post_count: number
  total_views: number
}
