
import fm from 'front-matter';
import type { Project, ProjectFrontmatter } from '@/types/project';

// Import all markdown files from content/projects directory
const markdownFiles = import.meta.glob('../content/projects/*.md', { as: 'raw', eager: true });

export const getAllProjects = (): Project[] => {
    const projects: Project[] = [];

    for (const path in markdownFiles) {
        const fileContent = markdownFiles[path] as string;
        const { attributes, body } = fm<ProjectFrontmatter>(fileContent);

        // Extract filename as default ID if not provided
        const filename = path.split('/').pop()?.replace('.md', '') || '';

        projects.push({
            id: filename,
            ...attributes,
            content: body
        });
    }

    return projects;
};

// Export pre-loaded projects for synchronous usage
export const projects = getAllProjects();
