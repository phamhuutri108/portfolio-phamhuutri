/**
 * FRONTEND DATA LOADER & RENDERER
 * For New Optimized JSON Schema
 * 
 * Place this in: /js/project-renderer.js
 */

// ============================================================
// DATA LOADING
// ============================================================

/**
 * Load projects from JSON file
 */
async function loadProjectsData(category) {
  try {
    const response = await fetch(`/data/${category}.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    // Convert object to array and filter published only
    return Object.values(data)
      .filter(project => project.published)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error(`Error loading ${category}:`, error);
    return [];
  }
}

// ============================================================
// RENDERING FUNCTIONS
// ============================================================

/**
 * Render project thumbnail for listing page
 */
function renderProjectThumbnail(project, lang = 'vi') {
  const title = project.title[lang] || project.title.en;
  const genre = project.metadata.genre[lang] || '';
  
  return `
    <div class="project-thumb" id="thumb-${project.id}" data-id="${project.id}">
      <a href="javascript:void(0)" onclick="showPage('${project.id}')">
        <img src="${project.thumbnail.url}" alt="${project.thumbnail.alt || title}">
        <div class="project-info">
          <h3>${title}</h3>
          <p class="genre">${genre}</p>
        </div>
      </a>
    </div>
  `;
}

/**
 * Render project detail page
 */
function renderProjectDetail(project, lang = 'vi') {
  const title = project.title[lang];
  const metadata = renderMetadata(project.metadata, lang);
  const video = renderVideo(project.video);
  const logline = project.logline[lang] ? `
    <h3>${lang === 'vi' ? 'Logline' : 'Logline'}</h3>
    <p>${project.logline[lang]}</p>
  ` : '';
  const synopsis = project.synopsis[lang] ? `
    <h3>${lang === 'vi' ? 'Tóm tắt' : 'Synopsis'}</h3>
    <div class="synopsis">${renderMarkdown(project.synopsis[lang])}</div>
  ` : '';
  const statement = project.directorsStatement[lang] ? `
    <h3>${lang === 'vi' ? 'Tuyên ngôn đạo diễn' : 'Director\'s Statement'}</h3>
    <div class="statement">${renderMarkdown(project.directorsStatement[lang])}</div>
  ` : '';
  const crew = renderCrew(project.crew, lang);
  const gallery = renderGallery(project.gallery);
  
  return `
    <div class="project-detail">
      <h1>${title}</h1>
      ${metadata}
      ${video}
      ${logline}
      ${synopsis}
      ${statement}
      ${crew}
      ${gallery}
    </div>
  `;
}

/**
 * Render metadata section
 */
function renderMetadata(metadata, lang) {
  const parts = [];
  
  if (metadata.genre[lang]) {
    parts.push(`<b>${lang === 'vi' ? 'Thể loại' : 'Genre'}:</b> ${metadata.genre[lang]}`);
  }
  
  if (metadata.year) {
    const yearLabel = lang === 'vi' ? 'Năm' : 'Year';
    const yearText = metadata.status[lang] 
      ? `${metadata.status[lang]} (${metadata.year})`
      : metadata.year;
    parts.push(`<b>${yearLabel}:</b> ${yearText}`);
  }
  
  if (metadata.duration) {
    parts.push(`<b>${lang === 'vi' ? 'Thời lượng' : 'Duration'}:</b> ${metadata.duration}`);
  }
  
  if (metadata.awards && metadata.awards.length > 0) {
    parts.push(`<b>${lang === 'vi' ? 'Giải thưởng' : 'Awards'}:</b> ${metadata.awards.join(', ')}`);
  }
  
  return `<p class="metadata">${parts.join('<br>')}</p>`;
}

/**
 * Render video embed
 */
function renderVideo(video) {
  if (!video || !video.embedId) return '';
  
  const embedUrl = video.platform === 'youtube'
    ? `https://www.youtube.com/embed/${video.embedId}`
    : `https://player.vimeo.com/video/${video.embedId}`;
  
  return `
    <div class="video-container" style="text-align: left; margin: 30px 0;">
      <iframe 
        width="100%" 
        height="315" 
        style="max-width: 560px; border-radius: 4px;" 
        src="${embedUrl}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  `;
}

/**
 * Render crew list
 */
function renderCrew(crew, lang) {
  if (!crew || crew.length === 0) return '';
  
  const sorted = crew.sort((a, b) => a.priority - b.priority);
  
  const crewItems = sorted.map(member => {
    const role = member.role[lang] || member.role.en || '';
    const avatar = member.avatar ? `
      <img src="${member.avatar}" alt="${member.name}" class="crew-avatar">
    ` : '';
    
    return `
      <li>
        ${avatar}
        <b>${role}:</b> ${member.name}
      </li>
    `;
  }).join('');
  
  return `
    <h3>${lang === 'vi' ? 'Đội ngũ' : 'Crew'}</h3>
    <ul class="crew-list" style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
      ${crewItems}
    </ul>
  `;
}

/**
 * Render gallery
 */
function renderGallery(gallery) {
  if (!gallery || gallery.length === 0) return '';
  
  const images = gallery.map(img => {
    const caption = img.caption ? `alt="${img.caption}" title="${img.caption}"` : '';
    return `<img src="${img.url}" class="${img.size}" ${caption}>`;
  }).join('');
  
  return `
    <h3>Behind The Scene</h3>
    <div class="gallery-wall">
      ${images}
    </div>
  `;
}

/**
 * Simple markdown to HTML (basic support)
 */
function renderMarkdown(text) {
  if (!text) return '';
  
  return text
    .split('\n\n')
    .map(para => `<p>${para}</p>`)
    .join('');
}

// ============================================================
// SIDEBAR POPULATION
// ============================================================

/**
 * Populate sidebar with project links
 */
async function populateSidebar(category, lang = 'vi') {
  const projects = await loadProjectsData(category);
  const listElement = document.getElementById(`sidebar-${category}-list`);
  
  if (!listElement) return;
  
  listElement.innerHTML = projects.map(project => {
    const title = project.title[lang] || project.title.en;
    return `
      <li>
        <a href="javascript:void(0)" 
           onclick="showPage('${project.id}')" 
           id="link-${project.id}">
          ${title}
        </a>
      </li>
    `;
  }).join('');
}

/**
 * Populate category page with thumbnails
 */
async function populateCategoryPage(category, lang = 'vi') {
  const projects = await loadProjectsData(category);
  const pageElement = document.getElementById(`cat-${category}`);
  
  if (!pageElement) return;
  
  const html = `
    <h2 class="page-title">
      <span class="content-en">${getCategoryTitle(category, 'en')}</span>
      <span class="content-vi">${getCategoryTitle(category, 'vi')}</span>
    </h2>
    <div class="projects-grid">
      ${projects.map(p => renderProjectThumbnail(p, lang)).join('')}
    </div>
  `;
  
  pageElement.innerHTML = html;
}

/**
 * Load and display single project detail
 */
async function loadProjectDetail(projectId, lang = 'vi') {
  // Determine category from project ID
  const category = projectId.split('-').slice(0, 2).join('-');
  
  const projects = await loadProjectsData(category);
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    console.error(`Project not found: ${projectId}`);
    return;
  }
  
  // Create or get project detail page container
  let pageElement = document.getElementById(projectId);
  if (!pageElement) {
    pageElement = document.createElement('div');
    pageElement.id = projectId;
    pageElement.className = 'page-section';
    document.querySelector('.content').appendChild(pageElement);
  }
  
  pageElement.innerHTML = renderProjectDetail(project, lang);
}

/**
 * Get category title
 */
function getCategoryTitle(category, lang) {
  const titles = {
    'short-films': { vi: 'Phim Ngắn', en: 'Short Films' },
    'commercials': { vi: 'Quảng Cáo', en: 'Commercials' },
    'others': { vi: 'Các Dự Án Khác', en: 'Others' },
    'writings': { vi: 'Viết', en: 'Writings' }
  };
  
  return titles[category]?.[lang] || category;
}

// ============================================================
// INITIALIZATION
// ============================================================

/**
 * Initialize all data on page load
 */
async function initializePortfolio() {
  const categories = ['short-films', 'commercials', 'others', 'writings'];
  const currentLang = getCurrentLanguage(); // Your existing function
  
  // Populate sidebars and category pages
  for (const category of categories) {
    await populateSidebar(category, currentLang);
    await populateCategoryPage(category, currentLang);
  }
}

/**
 * Refresh content when language changes
 */
function onLanguageChange(newLang) {
  const categories = ['short-films', 'commercials', 'others', 'writings'];
  
  categories.forEach(category => {
    populateSidebar(category, newLang);
    populateCategoryPage(category, newLang);
  });
  
  // Reload current project if on detail page
  const currentPage = getCurrentPageId(); // Your existing function
  if (currentPage && currentPage.includes('-')) {
    loadProjectDetail(currentPage, newLang);
  }
}

// ============================================================
// USAGE EXAMPLE
// ============================================================

/**
 * Call this when page loads
 */
document.addEventListener('DOMContentLoaded', () => {
  initializePortfolio();
});

/**
 * Call this when user clicks project link
 * 
 * Example in your existing showPage() function:
 */
function showPage(pageId) {
  // Your existing page switching logic...
  
  // If it's a project detail page
  if (pageId.includes('short-films-') || 
      pageId.includes('commercials-') || 
      pageId.includes('others-') || 
      pageId.includes('writings-')) {
    
    const currentLang = getCurrentLanguage();
    loadProjectDetail(pageId, currentLang);
  }
  
  // Rest of your showPage logic...
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadProjectsData,
    renderProjectDetail,
    renderProjectThumbnail,
    initializePortfolio
  };
}
