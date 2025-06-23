#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const requiredFields = [
  'title', 'description', 'category', 'status', 'tags', 'overview'
];

function validateProject(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const project = JSON.parse(content);
    const errors = [];

    // Check required fields
    requiredFields.forEach(field => {
      if (!project[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });

    // Validate arrays
    if (!Array.isArray(project.tags)) {
      errors.push('Tags must be an array');
    }

    if (!Array.isArray(project.objectives)) {
      errors.push('Objectives must be an array');
    }

    return errors;
  } catch (error) {
    return [`Invalid JSON: ${error.message}`];
  }
}

function validateAllProjects() {
  const projectsDir = path.join(process.cwd(), 'content/projects');
  
  if (!fs.existsSync(projectsDir)) {
    console.log('❌ Projects directory not found');
    return;
  }

  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
  let totalErrors = 0;

  files.forEach(file => {
    const filePath = path.join(projectsDir, file);
    const errors = validateProject(filePath);
    
    if (errors.length > 0) {
      console.log(`\n❌ ${file}:`);
      errors.forEach(error => console.log(`  - ${error}`));
      totalErrors += errors.length;
    } else {
      console.log(`✅ ${file}`);
    }
  });

  console.log(`\n📊 Summary: ${files.length} projects, ${totalErrors} errors`);
}

validateAllProjects();
