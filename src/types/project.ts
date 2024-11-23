export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  gallery?: string[];
  tags: string[];
  slug: string;
  category: string;
  client?: string;
  year?: string;
  collaborators?: string[];
  materials?: string[];
  techniques?: string[];
  wordpressId?: number;
}