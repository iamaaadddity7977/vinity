import { jsPDF } from 'jspdf';
import { BlogPost } from '../types';

export function createFileUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeFileUrl(url: string): void {
  URL.revokeObjectURL(url);
}

export async function downloadPost(post: BlogPost): Promise<void> {
  if (post.file) {
    const a = document.createElement('a');
    a.href = post.fileUrl!;
    a.download = post.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text(post.title, 20, 20);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Date: ${post.date}`, 20, 30);
    
    // Add content
    doc.setFontSize(12);
    const contentLines = doc.splitTextToSize(post.content, 170);
    doc.text(contentLines, 20, 40);
    
    // Save the PDF
    doc.save(`${post.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  }
}