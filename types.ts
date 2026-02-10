
export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  imageUrl: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  location: string;
  status: 'In Progress' | 'Completed' | 'Planning';
  progress: number;
  type: 'Road' | 'Bridge' | 'Building' | 'Water';
  imageUrl: string;
}

export interface InfraStats {
  name: string;
  value: number;
}
