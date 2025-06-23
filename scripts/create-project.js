#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createProject() {
  console.log('🚀 Creating a new project...\n');

  const title = await askQuestion('Project title: ');
  const description = await askQuestion('Project description: ');
  const category = await askQuestion('Category (AI/ML, IoT, Embedded Systems, etc.): ');
  const status = await askQuestion('Status (In Progress/Completed): ');
  const duration = await askQuestion('Duration: ');
  const tags = await askQuestion('Tags (comma-separated): ');
  const github = await askQuestion('GitHub URL (optional): ');
  const featured = await askQuestion('Featured project? (y/n): ');
  const priority = await askQuestion('Priority (0-10, higher = more important): ');

  const slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const projectData = {
    title,
    description,
    image: `/project-images/${slug}/hero.jpg`,
    tags: tags.split(',').map(tag => tag.trim()),
    status,
    duration,
    category,
    ...(github && { github }),
    overview: "Add your detailed project overview here. Explain the project's purpose, scope, and what makes it unique.",
    objectives: [
      "Add your primary project objective here",
      "Add secondary objectives",
      "Add more objectives as needed"
    ],
    technologies: [
      {
        name: "Technology Name",
        description: "Describe how this technology was used in the project"
      }
    ],
    challenges: [
      {
        title: "Challenge Title",
        description: "Describe a major challenge you faced",
        solution: "Explain how you solved this challenge"
      }
    ],
    results: [
      "Add key achievement or result here",
      "Add quantitative metrics if available",
      "Add more results as needed"
    ],
    futureWork: [
      "Add planned enhancement or feature",
      "Add potential improvements",
      "Add scaling possibilities"
    ],
    repositories: [],
    gallery: [],
    featured: featured.toLowerCase() === 'y',
    priority: parseInt(priority) || 0
  };

  // Create project file
  const projectsDir = path.join(process.cwd(), 'content/projects');
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
  }

  const filePath = path.join(projectsDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(projectData, null, 2));

  // Create image directory
  const imageDir = path.join(process.cwd(), 'public/project-images', slug);
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
    // Create gallery subdirectory
    fs.mkdirSync(path.join(imageDir, 'gallery'), { recursive: true });
  }

  console.log(`\n✅ Project created successfully!`);
  console.log(`📁 File: ${filePath}`);
  console.log(`🖼️  Images: ${imageDir}`);
  console.log(`\n📝 Next steps:`);
  console.log(`1. Add your hero image: public/project-images/${slug}/hero.jpg`);
  console.log(`2. Add gallery images: public/project-images/${slug}/gallery/`);
  console.log(`3. Edit the project file to add detailed content`);
  console.log(`4. Update overview, objectives, technologies, challenges, and results`);
  console.log(`5. Run 'npm run validate-projects' to check for errors`);

  rl.close();
}

createProject().catch(console.error);
