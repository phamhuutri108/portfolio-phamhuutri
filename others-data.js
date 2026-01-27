/* --- FILE: others-data.js --- */

const othersData = {


    // 0. INFINITY (CẬP NHẬT: XẾP DỌC 480px + CLICK ZOOM + NÚT X)
    "others-infinity": {
        title: {
            vi: "Vô Cực",
            en: "Infinity"
        },
        thumbnail: "https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_1_ysowaw.jpeg?v=2",
        vi: `
            <p>
                <b>Thể loại:</b> Video / Collage Art<br>
                <b>Năm:</b> 2024<br>
                <b>Vai trò:</b> Ý tưởng & Chuyển động<br>
                <b>Phần mềm:</b> Adobe After Effects, Adobe Photoshop, Davinci Resolve
            </p>

            <div style="padding: 60px 0; display: flex; flex-direction: column; align-items: center; gap: 50px; width: 100%;">

                <div class="infinity-item" 
                     style="cursor: zoom-in; transition: transform 0.3s;"
                     onmouseover="this.style.transform='scale(1.02)'" 
                     onmouseout="this.style.transform='scale(1)'"
                     onclick="openInfinityVideo('https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_1_ysowaw.mov?v=2')">
                     
                    <video autoplay loop muted playsinline disablepictureinpicture 
                        style="width: 480px; max-width: 100%; height: auto; border-radius: 2px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); pointer-events: none;">
                        <source src="https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_1_ysowaw.mov?v=2">
                    </video>
                </div>

                <div class="infinity-item" 
                     style="cursor: zoom-in; transition: transform 0.3s;"
                     onmouseover="this.style.transform='scale(1.02)'" 
                     onmouseout="this.style.transform='scale(1)'"
                     onclick="openInfinityVideo('https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_2_z8mabq.mov?v=2')">
                    
                    <video autoplay loop muted playsinline disablepictureinpicture 
                        style="width: 480px; max-width: 100%; height: auto; border-radius: 2px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); pointer-events: none;">
                        <source src="https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_2_z8mabq.mov?v=2">
                    </video>
                </div>

                <div class="infinity-item" 
                     style="cursor: zoom-in; transition: transform 0.3s;"
                     onmouseover="this.style.transform='scale(1.02)'" 
                     onmouseout="this.style.transform='scale(1)'"
                     onclick="openInfinityVideo('https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_3_yu2x8g.mov?v=2')">
                    
                    <video autoplay loop muted playsinline disablepictureinpicture 
                        style="width: 480px; max-width: 100%; height: auto; border-radius: 2px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); pointer-events: none;">
                        <source src="https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_3_yu2x8g.mov?v=2">
                    </video>
                </div>

            </div>

            <img src="" onerror="
                window.openInfinityVideo = function(src) {
                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.98); z-index:10000; display:flex; justify-content:center; align-items:center; animation: fadeIn 0.3s ease;';
                    
                    overlay.innerHTML = \`
                        <span style='position:absolute; top:20px; right:35px; color:#000; font-size:40px; font-weight:bold; cursor:pointer; line-height:1; font-family: sans-serif;' title='Close'>&times;</span>
                        <video autoplay loop muted playsinline style='max-width:90%; max-height:90%; box-shadow: 0 20px 50px rgba(0,0,0,0.1); pointer-events: none;'><source src='\${src}'></video>
                    \`;
                    
                    overlay.onclick = function() { this.remove(); };
                    document.body.appendChild(overlay);
                }
            " style="display:none;">
        `,
        en: `
            <p>
                <b>Genre:</b> Video / Collage Art<br>
                <b>Year:</b> 2024<br>
                <b>Role:</b> Idea & Motion Design<br>
                <b>Software:</b> Adobe After Effects, Adobe Photoshop, Davinci Resolve
            </p>

            <div style="padding: 60px 0; display: flex; flex-direction: column; align-items: center; gap: 50px; width: 100%;">

                <div class="infinity-item" 
                     style="cursor: zoom-in; transition: transform 0.3s;"
                     onmouseover="this.style.transform='scale(1.02)'" 
                     onmouseout="this.style.transform='scale(1)'"
                     onclick="openInfinityVideo('https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_1_ysowaw.mov?v=2')">
                     
                    <video autoplay loop muted playsinline disablepictureinpicture 
                        style="width: 480px; max-width: 100%; height: auto; border-radius: 2px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); pointer-events: none;">
                        <source src="https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_1_ysowaw.mov?v=2">
                    </video>
                </div>

                <div class="infinity-item" 
                     style="cursor: zoom-in; transition: transform 0.3s;"
                     onmouseover="this.style.transform='scale(1.02)'" 
                     onmouseout="this.style.transform='scale(1)'"
                     onclick="openInfinityVideo('https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_2_z8mabq.mov?v=2')">
                    
                    <video autoplay loop muted playsinline disablepictureinpicture 
                        style="width: 480px; max-width: 100%; height: auto; border-radius: 2px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); pointer-events: none;">
                        <source src="https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_2_z8mabq.mov?v=2">
                    </video>
                </div>

                <div class="infinity-item" 
                     style="cursor: zoom-in; transition: transform 0.3s;"
                     onmouseover="this.style.transform='scale(1.02)'" 
                     onmouseout="this.style.transform='scale(1)'"
                     onclick="openInfinityVideo('https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_3_yu2x8g.mov?v=2')">
                    
                    <video autoplay loop muted playsinline disablepictureinpicture 
                        style="width: 480px; max-width: 100%; height: auto; border-radius: 2px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); pointer-events: none;">
                        <source src="https://res.cloudinary.com/dwtj2pjwn/video/upload/phamhuutri_infinity_3_yu2x8g.mov?v=2">
                    </video>
                </div>

            </div>
            
            <img src="" onerror="if(!window.openInfinityVideo) {
                window.openInfinityVideo = function(src) {
                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.98); z-index:10000; display:flex; justify-content:center; align-items:center; animation: fadeIn 0.3s ease;';
                    overlay.innerHTML = \`<span style='position:absolute; top:20px; right:35px; color:#000; font-size:40px; font-weight:bold; cursor:pointer; line-height:1; font-family: sans-serif;' title='Close'>&times;</span><video autoplay loop muted playsinline style='max-width:90%; max-height:90%; box-shadow: 0 20px 50px rgba(0,0,0,0.1); pointer-events: none;'><source src='\${src}'></video>\`;
                    overlay.onclick = function() { this.remove(); };
                    document.body.appendChild(overlay);
                }
            }" style="display:none;">
        `
    },








    // 1. WARDROBE (HỌC TỦ)
    "others-wardrobe": {
        title: {
            vi: "Học Tủ",
            en: "Wardrobe"
        },
        thumbnail: "https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Thumbnail.jpeg?v=2",
        vi: `
            <p>
                <b>Thể loại:</b> Phim ngắn / Tâm lý, Gia đình<br>
                <b>Năm:</b> 2023<br>
                <b>Vai trò:</b> Trợ lý đạo diễn #1, 3D Storyboard
            </p>

            <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Thumbnail.jpeg?v=2?v=2" style="width: 100%; max-width: 560px; border-radius: 4px; margin-bottom: 0px;">
             
            <h3>3D storyboard > Still</h3>
           
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_1.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_2.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_4.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_5.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_6.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_7.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_8.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_9.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_10.jpeg?v=2">
            </div>
        `,
        en: `
            <p>
                <b>Genre:</b> Short fiction / Drama, Family<br>
                <b>Year:</b> 2023<br>
                <b>Role:</b> First Assistant Director, 3D Storyboard Artist
            </p>
        
            <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Thumbnail.jpeg?v=2" style="width: 100%; max-width: 560px; border-radius: 4px; margin-bottom: 0px;">

            <h3>3D storyboard > Still</h3>
            
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_1.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_2.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_4.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_5.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_6.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_7.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_8.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_9.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/hoc-tu/HOC_TU_Storyboard_10.jpeg?v=2">
            </div>
        `
    },

    // 2. WET WOOD (CỦI ƯỚT)
    "others-wet-wood": {
        title: {
            vi: "Củi Ướt",
            en: "Wet Wood"
        },
        thumbnail: "https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/CUI_UOT_Thumbnail_1.jpeg?v=2",
        vi: `
            <p>
                <b>Thể loại:</b> Phim ngắn / Thể nghiệm<br>
                <b>Năm:</b> 2023<br>
                <b>Vai trò:</b> Trợ lý đạo diễn #1, 3D Storyboard
            </p>

            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                    src="https://www.youtube.com/embed/3BLnFAO6GzI" 
                    title="Wet Wood" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>

            <h3>Storyboard</h3>
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_1.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_2.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_4.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_5.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_6.jpeg?v=2">
            </div>

            <h3>Behind The Scene</h3>
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_2.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_4.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_1.jpeg?v=2" class="tall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_5.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_6.jpeg?v=2" class="big">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_7.jpeg?v=2">
            </div>
        `,
        en: `
            <p>
                <b>Genre:</b> Short fiction / Experimental<br>
                <b>Year:</b> 2023<br>
                <b>Role:</b> First Assistant Director, 3D Storyboard Artist
            </p>

            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                    src="https://www.youtube.com/embed/3BLnFAO6GzI" 
                    title="Wet Wood" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>

            <h3>Storyboard</h3>
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_1.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_2.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_4.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_5.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/STORYBOARD/CUI_UOT_Storyboard_6.jpeg?v=2">
            </div>

            <h3>Behind The Scene</h3>
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_2.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_4.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_1.jpeg?v=2" class="tall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_5.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_6.jpeg?v=2" class="big">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/cui-uot/BTS/CUI_UOT_BTS_7.jpeg?v=2">
            </div>
        `
    },

    // 3. TRANH KIẾNG NHÀ TÔI (MY FAMILY'S GLASS PAINTING)
    "others-tranh-kieng-nha-toi": {
        title: {
            vi: "Tranh Kiếng Nhà Tôi",
            en: "My Family's Glass Painting"
        },
        thumbnail: "https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Thumbnail.jpeg?v=2",
        vi: `
            <p>
                <b>Tựa tiếng Nhật:</b> うちのガラス絵<br>
                <b>Thể loại:</b> Phim ngắn / Tâm lý, Gia đình<br>
                <b>Năm:</b> 2023<br>
                <b>Vai trò:</b> Trợ lý đạo diễn #1
            </p>

            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                    src="https://www.youtube.com/embed/1mGxyoJrV7w"
                    title="My Family's Glass Painting" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>

            <h3>Still</h3>
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_1.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_2.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_4.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_5.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_6.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_7.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_8.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_9.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_10.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_11.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_12.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_13.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_14.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_15.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_16.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_17.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_18.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_19.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_20.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_21.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_22.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_23.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_24.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_25.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_26.jpeg?v=2">
            </div>

            <h3>Behind The Scene</h3>
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-1.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-2.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-4.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-5.jpeg?v=2" class="tall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-6.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-7.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-8.jpeg?v=2" class="big">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-9.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-10.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-11.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-12.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-13.jpeg?v=2" class="tall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-14.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-15.jpeg?v=2" class="big">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-16.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-17.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-18.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-19.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-20.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-22.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-23.jpeg?v=2" class="tall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-24.jpeg?v=2">
            </div>
        `,
        en: `
            <p>
                <b>Japanese Title:</b> うちのガラス絵<br>
                <b>Genre:</b> Short fiction / Drama, Family<br>
                <b>Year:</b> 2023<br>
                <b>Role:</b> First Assistant Director
            </p>

            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                    src="https://www.youtube.com/embed/1mGxyoJrV7w" 
                    title="My Family's Glass Painting" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>

            <h3>Still</h3>
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_1.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_2.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_4.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_5.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_6.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_7.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_8.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_9.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_10.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_11.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_12.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_13.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_14.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_15.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_16.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_17.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_18.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_19.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_20.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_21.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_22.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_23.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_24.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_25.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/TKNT_Still_26.jpeg?v=2">
            </div>

            <h3>Behind The Scene</h3>
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-1.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-2.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-4.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-5.jpeg?v=2" class="tall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-6.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-7.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-8.jpeg?v=2" class="big">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-9.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-10.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-11.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-12.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-13.jpeg?v=2" class="tall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-14.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-15.jpeg?v=2" class="big">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-16.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-17.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-18.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-19.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-20.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-22.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-23.jpeg?v=2" class="tall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/TKNT/BTS/TKNT-BTS-24.jpeg?v=2">
            </div>
        `
    },

    // 4. TRĂNG RẰM (THE FULL MOON)
    "others-trang-ram": {
        title: {
            vi: "Trăng Rằm",
            en: "The Full Moon"
        },
        thumbnail: "https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Trang_Ram_Thumbnail.jpeg?v=2",
        vi: `
            <p>
                <b>Thể loại:</b> Phim múa (Dance Film)<br>
                <b>Năm:</b> 2025<br>
                <b>Vai trò:</b> Trợ lý đạo diễn #1
            </p>

            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                    src="https://www.youtube.com/embed/mnGhpQ-tEFw" 
                    title="The Full Moon" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>

            <h3>Still</h3>
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_1.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_2.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_4.jpeg?v=2" class="tall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_5.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_6.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_7.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_8.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_9.jpeg?v=2" class="big">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_10.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_11.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_12.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_13.jpeg?v=2">
            </div>
        `,
        en: `
            <p>
                <b>Genre:</b> Dance Film<br>
                <b>Year:</b> 2025<br>
                <b>Role:</b> First Assistant Director
            </p>

            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                    src="https://www.youtube.com/embed/mnGhpQ-tEFw" 
                    title="The Full Moon" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>

            <h3>Still</h3>
            <div class="gallery-wall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_1.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_2.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_3.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_4.jpeg?v=2" class="tall">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_5.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_6.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_7.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_8.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_9.jpeg?v=2" class="big">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_10.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_11.jpeg?v=2">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_12.jpeg?v=2" class="wide">
                <img src="https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/trang-ram/Still/Trang_Ram_Still_13.jpeg?v=2">
            </div>
        `
    },

    // 5. CHILL CÙNG TÂY BẮC (CHILLING IN THE NORTHWEST)
    "others-chill-cung-tay-bac": {
        title: {
            vi: "Chill Cùng Tây Bắc",
            en: "Chilling in the Northwest"
        },
        thumbnail: "https://cdn.jsdelivr.net/gh/phamhuutri108/portfolio-phamhuutri@main/assets/others/Chill_cung_Tay_Bac_Thumbnail.jpeg?v=2",
        vi: `
            <p>
                <b>Thể loại:</b> Video Âm nhạc<br>
                <b>Năm:</b> 2023<br>
                <b>Vai trò:</b> Trợ lý đạo diễn
            </p>

            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                    src="https://www.youtube.com/embed/XOQvi2DauL8" 
                    title="Chilling in the Northwest" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>

            
        `,
        en: `
            <p>
                <b>Genre:</b> Music Video<br>
                <b>Year:</b> 2023<br>
                <b>Role:</b> Assistant Director
            </p>

            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" 
                    src="https://www.youtube.com/embed/XOQvi2DauL8" 
                    title="Chilling in the Northwest" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        `
    }
};