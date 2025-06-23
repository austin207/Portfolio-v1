import fs from 'fs';
import path from 'path';

export interface ProjectDetail {
  title: string;
  description: string;
  image: string;
  tags: string[];
  status: string;
  duration: string;
  category: string;
  github?: string;
  demoUrl?: string;
  videoUrl?: string;
  overview: string;
  objectives: string[];
  technologies: Array<{
    name: string;
    description: string;
  }>;
  challenges: Array<{
    title: string;
    description: string;
    solution: string;
  }>;
  results: string[];
  futureWork: string[];
  repositories?: Array<{
    name: string;
    url: string;
    description: string;
  }>;
  gallery?: string[];
}

export interface ProjectMetadata {
  id: string;
  slug: string;
  featured: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectWithMetadata = ProjectDetail & ProjectMetadata;

// File-based project loading utilities
class ProjectManager {
  private projectsDirectory: string;
  private projectsCache: Map<string, ProjectWithMetadata> = new Map();
  private lastCacheUpdate: number = 0;
  private cacheExpiry: number = process.env.NODE_ENV === 'development' ? 5 * 60 * 1000 : 60 * 60 * 1000; // 5 min dev, 1 hour prod

  constructor() {
    this.projectsDirectory = path.join(process.cwd(), 'content/projects');
  }

  private shouldRefreshCache(): boolean {
    return Date.now() - this.lastCacheUpdate > this.cacheExpiry;
  }

  private async loadProjectFromFile(filename: string): Promise<ProjectWithMetadata | null> {
    try {
      const slug = filename.replace(/\.json$/, '');
      const filePath = path.join(this.projectsDirectory, filename);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        console.warn(`Project file not found: ${filePath}`);
        return null;
      }

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const projectData = JSON.parse(fileContents) as ProjectDetail;
      
      // Get file stats for metadata
      const stats = fs.statSync(filePath);
      
      const projectWithMetadata: ProjectWithMetadata = {
        ...projectData,
        id: slug,
        slug,
        featured: (projectData as any).featured || projectData.status === 'Completed',
        priority: (projectData as any).priority || 0,
        createdAt: stats.birthtime.toISOString(),
        updatedAt: stats.mtime.toISOString(),
      };

      return projectWithMetadata;
    } catch (error) {
      console.error(`Error loading project ${filename}:`, error);
      return null;
    }
  }

  private async refreshCache(): Promise<void> {
    try {
      if (!fs.existsSync(this.projectsDirectory)) {
        console.warn(`Projects directory does not exist: ${this.projectsDirectory}`);
        return;
      }

      const files = fs.readdirSync(this.projectsDirectory)
        .filter(file => file.endsWith('.json'));

      this.projectsCache.clear();

      for (const file of files) {
        const project = await this.loadProjectFromFile(file);
        if (project) {
          this.projectsCache.set(project.slug, project);
        }
      }

      this.lastCacheUpdate = Date.now();
      console.log(`✅ Loaded ${this.projectsCache.size} projects from files`);
    } catch (error) {
      console.error('Error refreshing project cache:', error);
    }
  }

  async getAllProjects(): Promise<ProjectWithMetadata[]> {
    if (this.projectsCache.size === 0 || this.shouldRefreshCache()) {
      await this.refreshCache();
    }

    return Array.from(this.projectsCache.values())
      .sort((a, b) => {
        // Sort by priority first, then by update date
        if (a.priority !== b.priority) {
          return b.priority - a.priority;
        }
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }

  async getProjectBySlug(slug: string): Promise<ProjectWithMetadata | null> {
    if (this.projectsCache.size === 0 || this.shouldRefreshCache()) {
      await this.refreshCache();
    }

    return this.projectsCache.get(slug) || null;
  }

  async getFeaturedProjects(): Promise<ProjectWithMetadata[]> {
    const allProjects = await this.getAllProjects();
    return allProjects.filter(project => project.featured);
  }

  async getProjectsByCategory(category: string): Promise<ProjectWithMetadata[]> {
    const allProjects = await this.getAllProjects();
    return allProjects.filter(project => project.category === category);
  }

  async getProjectsByStatus(status: string): Promise<ProjectWithMetadata[]> {
    const allProjects = await this.getAllProjects();
    return allProjects.filter(project => project.status === status);
  }

  async getCategories(): Promise<string[]> {
    const allProjects = await this.getAllProjects();
    return Array.from(new Set(allProjects.map(p => p.category)));
  }

  async getTags(): Promise<string[]> {
    const allProjects = await this.getAllProjects();
    const allTags = new Set<string>();
    allProjects.forEach(project => {
      project.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
  }

  async getStatuses(): Promise<string[]> {
    const allProjects = await this.getAllProjects();
    return Array.from(new Set(allProjects.map(p => p.status)));
  }
}

// Create singleton instance
const projectManager = new ProjectManager();

// Export the functions
export async function getAllProjects(): Promise<ProjectWithMetadata[]> {
  return projectManager.getAllProjects();
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithMetadata | null> {
  return projectManager.getProjectBySlug(slug);
}

export async function getFeaturedProjects(): Promise<ProjectWithMetadata[]> {
  return projectManager.getFeaturedProjects();
}

export async function getProjectsByCategory(category: string): Promise<ProjectWithMetadata[]> {
  return projectManager.getProjectsByCategory(category);
}

export async function getProjectsByStatus(status: string): Promise<ProjectWithMetadata[]> {
  return projectManager.getProjectsByStatus(status);
}

export async function getCategories(): Promise<string[]> {
  return projectManager.getCategories();
}

export async function getTags(): Promise<string[]> {
  return projectManager.getTags();
}

export async function getStatuses(): Promise<string[]> {
  return projectManager.getStatuses();
}

// Legacy support for existing projects page
export const projects = [
  {
    id: "ai-ml-language-models",
    title: "AI/ML Language Model Prototyping",
    description: "Built an RNN-based text generator, then developed MiniGPT from scratch for modest hardware. Currently building a scalable LLaMA-like transformer model.",
    image: "/project-images/ai-ml-language-models/hero.jpg",
    tags: ["PyTorch", "NLP", "Transformers", "RNN", "LLaMA"],
    status: "In Progress",
    duration: "April 2025 - Present",
    category: "AI/ML",
  },
  {
    id: "ambulance-traffic-system",
    title: "Ambulance Traffic Reduction System",
    description: "Developed an Arduino Mega-based prototype with RF modules for real-time traffic monitoring, integrating RF signal validation and Dijkstra's algorithm.",
    image: "/project-images/ambulance-traffic-system/hero.jpg",
    tags: ["Arduino", "RF Modules", "Algorithms", "Embedded Systems"],
    status: "Completed",
    duration: "6 months",
    category: "Embedded Systems",
  },
  {
    id: "computer-vision",
    title: "Computer Vision Implementation",
    description: "Built a face recognition system using OpenCV in Python and an object classification system with GoogLeNet TL in MATLAB.",
    image: "/project-images/computer-vision/hero.jpg",
    tags: ["OpenCV", "Python", "MATLAB", "GoogLeNet", "Computer Vision"],
    status: "Completed",
    duration: "4 months",
    category: "AI/ML",
  },
  {
    id: "iot-home-automation",
    title: "IoT Home Automation System",
    description: "Designed a home automation system with NodeMCU ESP8266, relay modules, Blynk, and IFTTT, enabling mobile control and Google Assistant voice commands.",
    image: "/project-images/iot-home-automation/hero.jpg",
    tags: ["IoT", "ESP8266", "Blynk", "IFTTT", "Home Automation"],
    status: "Completed",
    duration: "3 months",
    category: "IoT",
  },
  {
    id: "solar-tracker",
    title: "Dual Axis Solar Tracker",
    description: "Developed a solar energy optimization prototype using microcontrollers, servo motors, and an LDR array for real-time sun tracking with closed-loop control.",
    image: "/project-images/solar-tracker/hero.jpg",
    tags: ["Solar Energy", "Microcontrollers", "Servo Motors", "Control Systems"],
    status: "Completed",
    duration: "5 months",
    category: "Automation",
  },
  {
    id: "wifi-range-extension",
    title: "Wi-Fi Range Extension System",
    description: "Developed a custom Wi-Fi repeater using Raspberry Pi 4B with adaptive channel management, enhancing range and mimicking mesh network functionality.",
    image: "/project-images/wifi-range-extension/hero.jpg",
    tags: ["Raspberry Pi", "Networking", "Wi-Fi", "Linux"],
    status: "Completed",
    duration: "2 months",
    category: "Networking",
  },
];
