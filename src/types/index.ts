export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  file?: File;
  fileType?: string;
  fileUrl?: string;
}