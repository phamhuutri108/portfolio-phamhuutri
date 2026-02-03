/**
 * HYBRID CONTENT SYSTEM
 * - Giữ nguyên fields cố định
 * - Thêm customBlocks linh hoạt
 * - renderOrder để control thứ tự hiển thị
 */

// ==========================================
// 1. CUSTOM BLOCK RENDERERS
// ==========================================

const customBlockRenderers = {
    
    text: (block, lang) => {
        const heading = block.heading?.[lang] || '';
        const content = block.content?.[lang] || '';
        if (!content) return '';
        
        const formatText = (text) => text.replace(/\n/g, '<br>');
        
        return `
            ${heading ? `<h3>${heading}</h3>` : ''}
            <p>${formatText(content)}</p>
        `;
    },
    
    video: (block, lang) => {
        const title = block.title?.[lang] || '';
        const data = block.data || {};
        
        if (!data.embedId) return '';
        
        const src = data.platform === 'youtube' 
            ? `https://www.youtube.com/embed/${data.embedId}` 
            : `https://player.vimeo.com/video/${data.embedId}`;
        
        return `
            ${title ? `<h4 style="margin-top: 30px;">${title}</h4>` : ''}
            <div style="text-align: left; margin: 20px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                    src="${src}" frameborder="0" allowfullscreen></iframe>
            </div>
        `;
    },
    
    quote: (block, lang) => {
        const content = block.content?.[lang] || '';
        const author = block.author || '';
        if (!content) return '';
        
        return `
            <blockquote style="margin: 30px 0; padding: 20px; border-left: 4px solid #ccc; font-style: italic; background: #f9f9f9;">
                <p style="margin: 0; font-size: 16px;">"${content}"</p>
                ${author ? `<footer style="text-align: right; margin-top: 10px; font-size: 14px; color: #666;">— ${author}</footer>` : ''}
            </blockquote>
        `;
    },
    
    callout: (block, lang) => {
        const content = block.content?.[lang] || '';
        const style = block.style || 'info';
        
        const styles = {
            info: 'background: #e3f2fd; border-left: 4px solid #2196F3; color: #1565C0;',
            warning: 'background: #fff3e0; border-left: 4px solid #ff9800; color: #E65100;',
            success: 'background: #e8f5e9; border-left: 4px solid #4caf50; color: #2E7D32;',
            error: 'background: #ffebee; border-left: 4px solid #f44336; color: #C62828;'
        };
        
        return `
            <div style="padding: 15px 20px; margin: 20px 0; border-radius: 4px; ${styles[style] || styles.info}">
                ${content}
            </div>
        `;
    },
    
    button: (block, lang) => {
        const label = block.label?.[lang] || '';
        const url = block.url || '';
        const style = block.style || 'primary';
        
        const styles = {
            primary: 'background: #2196F3; color: white;',
            secondary: 'background: #f5f5f5; color: #333; border: 1px solid #ddd;'
        };
        
        return `
            <div style="text-align: center; margin: 30px 0;">
                <a href="${url}" target="_blank" 
                   style="display: inline-block; padding: 12px 30px; border-radius: 4px; text-decoration: none; font-weight: bold; ${styles[style]}">
                    ${label}
                </a>
            </div>
        `;
    },
    
    divider: (block, lang) => {
        return `<hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;">`;
    },
    
    image: (block, lang) => {
        const src = block.src || '';
        const caption = block.caption?.[lang] || '';
        const width = block.width || '100%';
        
        if (!src) return '';
        
        return `
            <figure style="margin: 30px 0;">
                <img src="${src}" alt="${caption}" style="width: ${width}; border-radius: 4px;">
                ${caption ? `<figcaption style="text-align: center; margin-top: 10px; font-size: 12px; color: #666;">${caption}</figcaption>` : ''}
            </figure>
        `;
    },
    
    list: (block, lang) => {
        const heading = block.heading?.[lang] || '';
        const items = block.items?.[lang] || [];
        if (items.length === 0) return '';
        
        const listType = block.listType || 'ul';
        
        return `
            ${heading ? `<h3>${heading}</h3>` : ''}
            <${listType} style="margin: 20px 0; padding-left: 30px;">
                ${items.map(item => `<li>${item}</li>`).join('')}
            </${listType}>
        `;
    },
    
    embed: (block, lang) => {
        const embedCode = block.embedCode || '';
        const caption = block.caption?.[lang] || '';
        
        return `
            <div style="margin: 30px 0;">
                ${embedCode}
                ${caption ? `<p style="text-align: center; margin-top: 10px; font-size: 12px;">${caption}</p>` : ''}
            </div>
        `;
    },
    
    custom_html: (block, lang) => {
        return block.content?.[lang] || '';
    }
};

// ==========================================
// 2. BUILT-IN SECTION RENDERERS
// ==========================================

const builtInRenderers = {
    
    metadata: (project, lang) => {
        const parts = [];
        const metaLines = [];
        
        if (project.genre?.[lang]) {
            metaLines.push(`<b>${lang=='vi'?'Thể loại':'Genre'}:</b> ${project.genre[lang]}`);
        }
        
        if (project.year) {
            let yearText = `<b>${lang=='vi'?'Năm':'Year'}:</b> `;
            if (project.status?.[lang]) {
                yearText += `${project.status[lang]} (${project.year})`;
            } else {
                yearText += project.year;
            }
            metaLines.push(yearText);
        }
        
        if (project.duration) {
            metaLines.push(`<b>${lang=='vi'?'Thời lượng':'Duration'}:</b> ${project.duration}`);
        }
        
        if (project.awards && project.awards.length > 0) {
            const validAwards = project.awards.filter(a => a && a.trim() !== "");
            if (validAwards.length > 0) {
                metaLines.push(`<b>${lang=='vi'?'Giải thưởng':'Awards'}:</b><br>${validAwards.join('<br>')}`);
            }
        }
        
        return metaLines.length > 0 ? `<p>${metaLines.join('<br>')}</p>` : '';
    },
    
    video: (project, lang) => {
        if (!project.video?.embedId) return '';
        
        const src = project.video.platform === 'youtube' 
            ? `https://www.youtube.com/embed/${project.video.embedId}` 
            : `https://player.vimeo.com/video/${project.video.embedId}`;
        
        return `<div style="text-align: left; margin: 30px 0;"><iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="${src}" frameborder="0" allowfullscreen></iframe></div>`;
    },
    
    logline: (project, lang) => {
        const content = project.logline?.[lang] || '';
        if (!content) return '';
        
        const formatText = (text) => text.replace(/\n/g, '<br>');
        return `<h3>Logline</h3><p>${formatText(content)}</p>`;
    },
    
    synopsis: (project, lang) => {
        const content = project.synopsis?.[lang] || '';
        if (!content) return '';
        
        const formatText = (text) => text.replace(/\n/g, '<br>');
        return `<h3>${lang=='vi'?'Tóm tắt':'Synopsis'}</h3><p>${formatText(content)}</p>`;
    },
    
    directorsStatement: (project, lang) => {
        const content = project.directorsStatement?.[lang] || '';
        if (!content) return '';
        
        const formatText = (text) => text.replace(/\n/g, '<br>');
        return `<h3>${lang=='vi'?'Lời đạo diễn':'Director\'s Statement'}</h3><p>${formatText(content)}</p>`;
    },
    
    description: (project, lang) => {
        const content = project.description?.[lang] || '';
        if (!content) return '';
        
        const formatText = (text) => text.replace(/\n/g, '<br>');
        return `<p>${formatText(content)}</p>`;
    },
    
    crew: (project, lang) => {
        if (!project.crew || project.crew.length === 0) return '';
        
        const parts = [];
        parts.push(`<h3>Crew</h3><ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">`);
        
        project.crew.forEach(c => {
            const role = c.role?.[lang] || c.role?.vi;
            if (role || c.name) {
                parts.push(`<li><b>${role}:</b> ${c.name}</li>`);
            }
        });
        
        parts.push(`</ul>`);
        return parts.join('');
    },
    
    music: (project, lang) => {
        if (!project.music || (!project.music.song && !project.music.artist)) return '';
        
        const song = project.music.song || '';
        const artist = project.music.artist || '';
        
        return `<p style="margin-top: 20px; font-style: italic; font-size: 12px;">♫ ${song}${song && artist ? ' - ' : ''}${artist}</p>`;
    }
};

// ==========================================
// 3. RENDER WITH ORDER CONTROL
// ==========================================

function renderContentWithOrder(project, lang) {
    const parts = [];
    
    // Nếu có renderOrder → Dùng nó
    if (project.renderOrder && Array.isArray(project.renderOrder)) {
        
        project.renderOrder.forEach(item => {
            
            // Built-in sections
            if (item.type !== 'custom') {
                const renderer = builtInRenderers[item.type];
                if (renderer) {
                    const html = renderer(project, lang);
                    if (html) parts.push(html);
                }
            }
            
            // Custom blocks
            else if (item.type === 'custom' && item.blockId) {
                const block = project.customBlocks?.[item.blockId];
                if (block) {
                    const renderer = customBlockRenderers[block.type];
                    if (renderer) {
                        const html = renderer(block, lang);
                        if (html) parts.push(html);
                    }
                }
            }
        });
        
    }
    
    // Nếu KHÔNG CÓ renderOrder → Fallback về thứ tự mặc định
    else {
        const defaultOrder = [
            'metadata',
            'video',
            'description',
            'logline',
            'synopsis',
            'directorsStatement',
            'crew',
            'music'
        ];
        
        defaultOrder.forEach(type => {
            const renderer = builtInRenderers[type];
            if (renderer) {
                const html = renderer(project, lang);
                if (html) parts.push(html);
            }
        });
    }
    
    return parts.join('');
}

// ==========================================
// 4. DATA ADAPTER INTEGRATION
// ==========================================

function convertNewSchemaToOld(newData, type = 'film') {
    const oldData = {};
    
    for (const [projectId, project] of Object.entries(newData)) {
        
        if (type === 'film' || type === 'others') {
            
            oldData[projectId] = {
                title: project.title || { vi: '', en: '' },
                thumbnail: project.thumbnail || '',
                vi: renderContentWithOrder(project, 'vi'),
                en: renderContentWithOrder(project, 'en'),
                
                // Pass through arrays
                crewData: project.crewData || [],
                stillData: project.stillData || [],
                storyboardData: project.storyboardData || [],
                btsData: project.btsData || [],
                
                // Pass through custom blocks & render order
                customBlocks: project.customBlocks || {},
                renderOrder: project.renderOrder || []
            };
        }
        
        else if (type === 'commercial') {
            // Commercial unchanged
            const buildCommContent = (lang) => {
                const parts = [];
                const metaLines = [];
                const brandVal = project.brand?.[lang] || project.brand || "";
                
                if (brandVal) metaLines.push(`<b>${lang=='vi'?'Thương hiệu':'Brand'}:</b> ${brandVal}`);
                if (project.year) metaLines.push(`<b>${lang=='vi'?'Năm':'Year'}:</b> ${project.year}`);
                if (project.country?.[lang]) metaLines.push(`<b>${lang=='vi'?'Quốc gia':'Country'}:</b> ${project.country[lang]}`);
                if (project.role?.[lang]) metaLines.push(`<b>${lang=='vi'?'Vai trò':'Role'}:</b> ${project.role[lang]}`);
                
                if (metaLines.length > 0) parts.push(`<p>${metaLines.join('<br>')}</p>`);

                if (project.video?.embedId) {
                    const src = project.video.platform === 'youtube' 
                        ? `https://www.youtube.com/embed/${project.video.embedId}` 
                        : `https://player.vimeo.com/video/${project.video.embedId}`;
                    parts.push(`<div style="text-align: left; margin: 30px 0;"><iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="${src}" frameborder="0" allowfullscreen></iframe></div>`);
                }

                const formatText = (text) => text ? text.replace(/\n/g, '<br>') : '';
                if (project.roleDescription?.[lang]) {
                    parts.push(`<h3>${lang=='vi'?'Mô tả vai trò':'Role Description'}</h3>`);
                    parts.push(`<p>${formatText(project.roleDescription[lang])}</p>`);
                }

                return parts.join('');
            };

            oldData[projectId] = {
                title: project.title || { vi: '', en: '' },
                thumbnail: project.thumbnail || '',
                vi: buildCommContent('vi'),
                en: buildCommContent('en'),
                crewData: [],
                btsData: []
            };
        }
        
        else if (type === 'writing') {
            return newData;
        }
    }
    
    return oldData;
}

// ==========================================
// 5. EXPORT
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        convertNewSchemaToOld, 
        renderContentWithOrder,
        builtInRenderers,
        customBlockRenderers 
    };
}