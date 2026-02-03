const fs = require('fs');
const path = require('path');

/**
 * CONVERSION SCRIPT: Migrate old JSON to optimized schema
 * 
 * Usage: node convert-data.js
 */

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Extract text content from HTML string
 */
function extractTextFromHTML(htmlString) {
  if (!htmlString) return '';
  return htmlString
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract video embed ID from HTML
 */
function extractVideoEmbedId(htmlContent) {
  if (!htmlContent) return null;
  
  const youtubeMatch = htmlContent.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  const vimeoMatch = htmlContent.match(/vimeo\.com\/([0-9]+)/);
  
  if (youtubeMatch) {
    return {
      platform: 'youtube',
      embedId: youtubeMatch[1],
      url: `https://www.youtube.com/watch?v=${youtubeMatch[1]}`
    };
  }
  
  if (vimeoMatch) {
    return {
      platform: 'vimeo',
      embedId: vimeoMatch[1],
      url: `https://vimeo.com/${vimeoMatch[1]}`
    };
  }
  
  return null;
}

/**
 * Extract metadata from HTML content
 */
function extractMetadata(htmlContent, lang) {
  const metadata = {
    genre: '',
    year: '',
    status: '',
    duration: '',
    awards: []
  };
  
  if (!htmlContent) return metadata;
  
  // Extract genre
  const genreMatch = htmlContent.match(/<b>(?:Thể loại|Genre):<\/b>\s*([^<\n]+)/i);
  if (genreMatch) {
    metadata.genre = genreMatch[1].trim();
  }
  
  // Extract year
  const yearMatch = htmlContent.match(/<b>(?:Năm|Year):<\/b>\s*([^<\n]+)/i);
  if (yearMatch) {
    const yearText = yearMatch[1].trim();
    const yearNum = yearText.match(/\d{4}/);
    if (yearNum) {
      metadata.year = yearNum[0];
    }
    
    // Check for status
    if (yearText.includes('Sắp ra mắt') || yearText.includes('Coming-soon')) {
      metadata.status = yearText;
    }
  }
  
  // Extract duration
  const durationMatch = htmlContent.match(/<b>(?:Thời lượng|Duration):<\/b>\s*([^<\n]+)/i);
  if (durationMatch) {
    metadata.duration = durationMatch[1].trim();
  }
  
  // Extract awards
  const awardMatch = htmlContent.match(/<b>(?:Giải thưởng|Award):<\/b>\s*([^<\n]+)/i);
  if (awardMatch) {
    metadata.awards.push(awardMatch[1].trim());
  }
  
  return metadata;
}

/**
 * Extract section content by heading
 */
function extractSection(htmlContent, headings) {
  if (!htmlContent) return '';
  
  // Try each heading variant
  for (const heading of headings) {
    const regex = new RegExp(`<h3>${heading}<\/h3>\\s*<p>([\\s\\S]*?)<\/p>`, 'i');
    const match = htmlContent.match(regex);
    if (match) {
      return match[1].trim();
    }
    
    // Try multiple paragraphs
    const multiPRegex = new RegExp(`<h3>${heading}<\/h3>([\\s\\S]*?)(?=<h3|<div class="gallery|$)`, 'i');
    const multiPMatch = htmlContent.match(multiPRegex);
    if (multiPMatch) {
      const paragraphs = multiPMatch[1].match(/<p>([\s\S]*?)<\/p>/g);
      if (paragraphs) {
        return paragraphs.map(p => p.replace(/<\/?p>/g, '').trim()).join('\n\n');
      }
    }
  }
  
  return '';
}

/**
 * Extract crew list from HTML
 */
function extractCrew(htmlContent, lang) {
  const crew = [];
  
  if (!htmlContent) return crew;
  
  // Find crew section
  const crewSectionMatch = htmlContent.match(/<h3>(?:Crew|Đội ngũ)<\/h3>[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/i);
  
  if (!crewSectionMatch) return crew;
  
  const crewList = crewSectionMatch[1];
  const items = crewList.match(/<li><b>([^:]+):<\/b>\s*([^<]+)<\/li>/g);
  
  if (!items) return crew;
  
  items.forEach((item, index) => {
    const match = item.match(/<li><b>([^:]+):<\/b>\s*([^<]+)<\/li>/);
    if (match) {
      const role = match[1].trim();
      const names = match[2].trim();
      
      crew.push({
        name: names,
        role: role,
        avatar: '',
        priority: index + 1
      });
    }
  });
  
  return crew;
}

/**
 * Extract gallery images from HTML
 */
function extractGallery(htmlContent) {
  const gallery = [];
  
  if (!htmlContent) return gallery;
  
  const galleryMatch = htmlContent.match(/<div class="gallery-wall">([\s\S]*?)<\/div>/i);
  
  if (!galleryMatch) return gallery;
  
  const images = galleryMatch[1].match(/<img[^>]+>/g);
  
  if (!images) return gallery;
  
  images.forEach(img => {
    const srcMatch = img.match(/src="([^"]+)"/);
    const classMatch = img.match(/class="([^"]+)"/);
    
    if (srcMatch) {
      gallery.push({
        url: srcMatch[1],
        size: classMatch ? classMatch[1] : 'normal',
        caption: ''
      });
    }
  });
  
  return gallery;
}

// ============================================================
// MAIN CONVERSION FUNCTION
// ============================================================

function convertProject(projectId, oldData) {
  const viContent = oldData.vi || '';
  const enContent = oldData.en || '';
  
  // Extract metadata from both languages
  const metadataVi = extractMetadata(viContent, 'vi');
  const metadataEn = extractMetadata(enContent, 'en');
  
  // Build crew with bilingual roles
  const crewVi = extractCrew(viContent, 'vi');
  const crewEn = extractCrew(enContent, 'en');
  
  const crew = crewVi.map((crewMemberVi, index) => {
    const crewMemberEn = crewEn[index] || { role: '' };
    return {
      name: crewMemberVi.name,
      role: {
        vi: crewMemberVi.role,
        en: crewMemberEn.role || crewMemberVi.role
      },
      avatar: '',
      priority: crewMemberVi.priority
    };
  });
  
  const newProject = {
    id: projectId,
    category: projectId.split('-')[0] + '-' + projectId.split('-')[1], // e.g., "short-films"
    slug: projectId.replace(/^[^-]+-[^-]+-/, ''), // Remove category prefix
    
    title: {
      vi: oldData.title?.vi || '',
      en: oldData.title?.en || ''
    },
    
    thumbnail: {
      url: oldData.thumbnail || '',
      alt: oldData.title?.en || ''
    },
    
    metadata: {
      genre: {
        vi: metadataVi.genre,
        en: metadataEn.genre
      },
      year: metadataVi.year || metadataEn.year,
      status: {
        vi: metadataVi.status,
        en: metadataEn.status
      },
      duration: metadataVi.duration || metadataEn.duration,
      awards: [...new Set([...metadataVi.awards, ...metadataEn.awards])]
    },
    
    video: extractVideoEmbedId(viContent) || extractVideoEmbedId(enContent),
    
    logline: {
      vi: extractSection(viContent, ['Logline']),
      en: extractSection(enContent, ['Logline'])
    },
    
    synopsis: {
      vi: extractSection(viContent, ['Synopsis', 'Tóm tắt']),
      en: extractSection(enContent, ['Synopsis'])
    },
    
    directorsStatement: {
      vi: extractSection(viContent, ['Director\'s Statement', 'Tuyên ngôn đạo diễn']),
      en: extractSection(enContent, ['Director\'s Statement'])
    },
    
    crew: crew,
    
    gallery: extractGallery(viContent) || extractGallery(enContent) || [],
    
    seo: {
      metaTitle: {
        vi: `${oldData.title?.vi || ''} - Phạm Hữu Trí`,
        en: `${oldData.title?.en || ''} - Pham Huu Tri`
      },
      metaDescription: {
        vi: extractSection(viContent, ['Logline', 'Synopsis']).substring(0, 160),
        en: extractSection(enContent, ['Logline', 'Synopsis']).substring(0, 160)
      },
      ogImage: oldData.thumbnail || ''
    },
    
    published: true,
    featured: false,
    order: 999
  };
  
  return newProject;
}

// ============================================================
// FILE PROCESSING
// ============================================================

function convertFile(inputPath, outputPath) {
  console.log(`\n📂 Converting: ${inputPath}`);
  
  try {
    const oldData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    const newData = {};
    
    let count = 0;
    for (const [projectId, projectData] of Object.entries(oldData)) {
      console.log(`  ✓ Converting: ${projectId}`);
      newData[projectId] = convertProject(projectId, projectData);
      count++;
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(newData, null, 2), 'utf8');
    console.log(`✅ Converted ${count} projects to: ${outputPath}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    return false;
  }
}

// ============================================================
// MAIN EXECUTION
// ============================================================

function main() {
  console.log('🚀 Starting data conversion...\n');
  
  const files = [
    { input: './data/short-films.json', output: './data-new/short-films.json' },
    { input: './data/commercials.json', output: './data-new/commercials.json' },
    { input: './data/others.json', output: './data-new/others.json' },
    { input: './data/writings.json', output: './data-new/writings.json' }
  ];
  
  // Create output directory
  if (!fs.existsSync('./data-new')) {
    fs.mkdirSync('./data-new');
  }
  
  let successCount = 0;
  
  files.forEach(({ input, output }) => {
    if (fs.existsSync(input)) {
      if (convertFile(input, output)) {
        successCount++;
      }
    } else {
      console.log(`⚠️  File not found: ${input}`);
    }
  });
  
  console.log(`\n✨ Conversion complete! ${successCount}/${files.length} files converted.`);
  console.log(`📁 New files saved in: ./data-new/`);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { convertProject, extractVideoEmbedId, extractCrew, extractGallery };
