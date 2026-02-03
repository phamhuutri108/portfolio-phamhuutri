/**
 * DATA ADAPTER
 * Convert new schema → old schema format
 * Để code cũ vẫn hoạt động mà không cần sửa nhiều
 */

function convertNewSchemaToOld(newData) {
    const oldData = {};
    
    for (const [projectId, project] of Object.entries(newData)) {
        // Build HTML string từ structured data (giống format cũ)
        
        // === VIETNAMESE VERSION ===
        const viParts = [];
        
        // Metadata
        if (project.metadata) {
            const meta = [];
            if (project.metadata.genre?.vi) meta.push(`<b>Thể loại:</b> ${project.metadata.genre.vi}`);
            if (project.metadata.year) {
                const yearText = project.metadata.status?.vi 
                    ? `${project.metadata.status.vi} (${project.metadata.year})`
                    : project.metadata.year;
                meta.push(`<b>Năm:</b> ${yearText}`);
            }
            if (project.metadata.duration) meta.push(`<b>Thời lượng:</b> ${project.metadata.duration}`);
            if (project.metadata.awards?.length > 0) {
                meta.push(`<b>Giải thưởng:</b> ${project.metadata.awards.join(', ')}`);
            }
            if (meta.length > 0) {
                viParts.push(`<p>${meta.join('<br>')}</p>`);
            }
        }
        
        // Video embed
        if (project.video?.embedId) {
            const embedUrl = project.video.platform === 'youtube'
                ? `https://www.youtube.com/embed/${project.video.embedId}`
                : `https://player.vimeo.com/video/${project.video.embedId}`;
            
            viParts.push(`
                <div style="text-align: left; margin: 30px 0;">
                    <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                        src="${embedUrl}" 
                        title="${project.title?.vi || ''}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            `);
        }
        
        // Logline
        if (project.logline?.vi) {
            viParts.push(`<h3>Logline</h3>`);
            viParts.push(`<p>${project.logline.vi}</p>`);
        }
        
        // Synopsis
        if (project.synopsis?.vi) {
            viParts.push(`<h3>Tóm tắt</h3>`);
            // Handle markdown-style line breaks
            const synopsis = project.synopsis.vi.split('\n\n').map(p => `<p>${p}</p>`).join('');
            viParts.push(synopsis);
        }
        
        // Director's Statement
        if (project.directorsStatement?.vi) {
            viParts.push(`<h3>Tuyên ngôn đạo diễn</h3>`);
            const statement = project.directorsStatement.vi.split('\n\n').map(p => `<p>${p}</p>`).join('');
            viParts.push(statement);
        }
        
        // Crew
        if (project.crew?.length > 0) {
            viParts.push(`<h3>Đội ngũ</h3>`);
            viParts.push(`<ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">`);
            
            const sortedCrew = [...project.crew].sort((a, b) => (a.priority || 999) - (b.priority || 999));
            sortedCrew.forEach(member => {
                const role = member.role?.vi || member.role || '';
                viParts.push(`<li><b>${role}:</b> ${member.name}</li>`);
            });
            
            viParts.push(`</ul>`);
        }
        
        // Gallery
        if (project.gallery?.length > 0) {
            viParts.push(`<h3>Behind The Scene</h3>`);
            viParts.push(`<div class="gallery-wall">`);
            
            project.gallery.forEach(img => {
                const className = img.size && img.size !== 'normal' ? ` class="${img.size}"` : '';
                const title = img.caption ? ` title="${img.caption}"` : '';
                viParts.push(`<img src="${img.url}"${className}${title}>`);
            });
            
            viParts.push(`</div>`);
        }
        
        // === ENGLISH VERSION ===
        const enParts = [];
        
        // Metadata
        if (project.metadata) {
            const meta = [];
            if (project.metadata.genre?.en) meta.push(`<b>Genre:</b> ${project.metadata.genre.en}`);
            if (project.metadata.year) {
                const yearText = project.metadata.status?.en 
                    ? `${project.metadata.status.en} (${project.metadata.year})`
                    : project.metadata.year;
                meta.push(`<b>Year:</b> ${yearText}`);
            }
            if (project.metadata.duration) meta.push(`<b>Duration:</b> ${project.metadata.duration}`);
            if (project.metadata.awards?.length > 0) {
                meta.push(`<b>Awards:</b> ${project.metadata.awards.join(', ')}`);
            }
            if (meta.length > 0) {
                enParts.push(`<p>${meta.join('<br>')}</p>`);
            }
        }
        
        // Video embed (same as VI)
        if (project.video?.embedId) {
            const embedUrl = project.video.platform === 'youtube'
                ? `https://www.youtube.com/embed/${project.video.embedId}`
                : `https://player.vimeo.com/video/${project.video.embedId}`;
            
            enParts.push(`
                <div style="text-align: left; margin: 30px 0;">
                    <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                        src="${embedUrl}" 
                        title="${project.title?.en || ''}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            `);
        }
        
        // Logline
        if (project.logline?.en) {
            enParts.push(`<h3>Logline</h3>`);
            enParts.push(`<p>${project.logline.en}</p>`);
        }
        
        // Synopsis
        if (project.synopsis?.en) {
            enParts.push(`<h3>Synopsis</h3>`);
            const synopsis = project.synopsis.en.split('\n\n').map(p => `<p>${p}</p>`).join('');
            enParts.push(synopsis);
        }
        
        // Director's Statement
        if (project.directorsStatement?.en) {
            enParts.push(`<h3>Director's Statement</h3>`);
            const statement = project.directorsStatement.en.split('\n\n').map(p => `<p>${p}</p>`).join('');
            enParts.push(statement);
        }
        
        // Crew
        if (project.crew?.length > 0) {
            enParts.push(`<h3>Crew</h3>`);
            enParts.push(`<ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">`);
            
            const sortedCrew = [...project.crew].sort((a, b) => (a.priority || 999) - (b.priority || 999));
            sortedCrew.forEach(member => {
                const role = member.role?.en || member.role || '';
                enParts.push(`<li><b>${role}:</b> ${member.name}</li>`);
            });
            
            enParts.push(`</ul>`);
        }
        
        // Gallery (same as VI)
        if (project.gallery?.length > 0) {
            enParts.push(`<h3>Behind The Scene</h3>`);
            enParts.push(`<div class="gallery-wall">`);
            
            project.gallery.forEach(img => {
                const className = img.size && img.size !== 'normal' ? ` class="${img.size}"` : '';
                const title = img.caption ? ` title="${img.caption}"` : '';
                enParts.push(`<img src="${img.url}"${className}${title}>`);
            });
            
            enParts.push(`</div>`);
        }
        
        // === BUILD OLD FORMAT ===
        oldData[projectId] = {
            title: project.title || { vi: '', en: '' },
            thumbnail: project.thumbnail?.url || project.thumbnail || '',
            vi: viParts.join('\n'),
            en: enParts.join('\n')
        };
    }
    
    return oldData;
}

// Export để dùng ở file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { convertNewSchemaToOld };
}