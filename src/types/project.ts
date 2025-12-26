export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    tech: string[];
    link?: string; // Live site URL (optional)
    repo?: string; // GitHub URL (optional)
    features?: string[];
    gallery?: string[];
    content?: string; // Markdown body
}

// Helper to infer type from frontmatter attributes
export type ProjectFrontmatter = Omit<Project, 'content' | 'id'>;
