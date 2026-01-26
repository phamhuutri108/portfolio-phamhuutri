/* --- FILE: films-data.js --- */

const filmsData = {

    // 1. BA ƠI, ĐỪNG NÓI DỐI (ĐÃ TỐI ƯU)
    "short-films-dad-dont-lie-to-me": {
        title: {
            vi: "Ba Ơi, Đừng Nói Dối",
            en: "Dad, Don't Lie To Me"
        },
        thumbnail: "https://ik.imagekit.io/phamhuutri108/BODND/BODND_Still.jpg",
        
        // Phần Text giới thiệu giữ nguyên, nhưng ĐÃ XÓA HTML CREW SCROLLER ở dưới cùng
        vi: `
            <p><b>Thể loại:</b> Phim ngắn / Tâm lý, Quan sát<br>
            <b> Năm:</b> Sắp ra mắt (2026)<br>
            <b>Thời lượng:</b> 39:45<br> </p>

            <div style="text-align: left; margin: 30px 0;">
                <iframe 
                    width="100%" 
                    height="315" 
                    style="max-width: 560px; border-radius: 4px;" 
                    src="https://www.youtube.com/embed/ooWID56SmHk" 
                    title="Dad, Don't Lie To Me" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>

            <h3>Logline</h3>
            <p>Một bác sĩ trung niên bất đắc dĩ, thông qua điện thoại, phải đóng giả làm cha của một cậu bé bệnh nhân ung thư của anh, để đánh lừa cậu về cái chết của người cha ruột.</p>
            
            <h3>Director’s Statement</h3>
            <p>Khoảng cuối năm 2023, khi tôi đang túc trực ở bệnh viện để chăm sóc cho mẹ tôi sau khi bà trải qua một cơn đột quỵ đã khiến sức khỏe tinh thần và khả năng lao động của bà giảm sút. Có một vị bác sĩ đã chăm sóc rất tận tâm cho mẹ tôi mặc dù gia đình tôi không quen biết ông, và phòng bệnh của mẹ tôi chỉ thuộc loại phổ thông. Tôi cho rằng, vượt lên trên y đức, phải có một động lực sâu xa hơn đằng sau lòng tốt của ông. Và ý tưởng của tôi ra đời từ đó.</p>
            <p>Tôi đã chuyển đổi bệnh nhân từ hình mẫu là một người phụ nữ thành một cậu bé vì điều đó gần gũi hơn với tâm hồn và cách hiểu của tôi. Ngoài ra, sự gắn kết của cậu bé và vị bác sĩ hết sức thân mật nhưng cũng hết sức xa cách, vì họ không thể gặp mặt trực tiếp mà chỉ có thể thông qua điện thoại. Một phần vì tình huống bất đắc dĩ của vị bác sĩ, nhưng hơn hết, sự kết nối giữa những con người với nhau qua một thiết bị điện tử phản ánh cho sự xa cách trong thời kỳ hiện đại, nơi con người buộc phải bày tỏ tình cảm của mình một cách không trọn vẹn. Đó là bi kịch của thời đại này.</p>
            <p>Tôi muốn kể câu chuyện ở góc độ người quan sát. Thay vì đưa máy quay đến gần nhân vật để thấy cảm xúc của họ đang diễn biến ra sao, tôi muốn cùng khán giả đứng ở khoảng cách thích hợp để theo dõi hành trình cảm xúc của họ. Khi một sự kiện đau buồn diễn ra, khán giả buộc phải dùng kinh nghiệm của mình để dự đoán cảm xúc của nhân vật. Điều này cho diễn viên của tôi nhiều không gian hơn để thể nghiệm nhân vật mà họ muốn trở thành, không phải chỉ vì tôi bảo họ phải làm theo cách mà tôi đang cảm nhận.</p>
            <p>Bộ phim sẽ không có nhân vật chính vì vai trò của cả ba nhân vật trong câu chuyện đều bổ trợ lẫn nhau. Khi đồng hồ đã điểm, hành trình của mỗi nhân vật sẽ hòa làm một để củng cố cho duy nhất một luận điểm: “Cuộc sống vẫn phải tiếp tục”.</p>

            <h3>Crew</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Diễn viên:</b> Ngô Nhật Trường, Cô Nhum, Nguyễn Vũ Uy Nhân</li>

                <li><b>Đạo diễn và Kịch bản:</b> Phạm Hữu Trí</li>
                <li><b>Cố vấn nghệ thuật:</b> NSND. Đạo diễn Đào Bá Sơn</li>

                <li><b>Sản xuất:</b> Thục Mai</li>
                <li><b>Đồng sản xuất:</b> Thảo Quiêng</li>
                <li><b>Quản lý dự án:</b> Phạm Văn Nam</li>

                <li><b>Đạo diễn hình ảnh và Quay phim:</b> Nguyễn Tùng Lâm</li>
                
                <li><b>Thiết kế sản xuất:</b> Dzuy Tom</li>
                <li><b>Thiết kế mỹ thuật:</b> Hoàng Bảo Uyên</li>

                <li><b>Trợ lý đạo diễn #1:</b> Lê Diễm Quỳnh</li>
                <li><b>Trợ lý đạo diễn #2:</b> Kon Lớn</li>
                <li><b>Thư ký trường quay:</b> Hồ Minh Khoa</li>

                <li><b>Gaffer:</b> Tô Anh Khoa</li>
                <li><b>Phụ quay:</b> Đặng Xuân Hoàng, Nguyễn Kim Hậu</li>
                <li><b>Chỉnh nét:</b> Văn Ngọc Thành</li>
                <li><b>Chuyên viên ánh sáng:</b> Hiếu, Gia Bảo, Mai Ngọc Hiền</li>

                <li><b>Trợ lý thiết kế sản xuất</b> Ruby</li>
                <li><b>Thiết kế bối cảnh:</b> Nicholas Nguyễn, Kaii Khải Hân, HaiBkk</li>
                <li><b>Phục trang:</b> Minh Thảo</li>
                <li><b>Hóa trang:</b> Bia Huyền</li>

                <li><b>Thu thanh hiện trường:</b> Crister Nguyên</li>
                <li><b>Storyboard Artist:</b> Phạm Hữu Trí</li>

                <li><b>Trợ lý sản xuất:</b> Khương Ngọc, Vương Linh</li>

                <li><b>Sản xuất hậu kỳ:</b> Thục Mai, Thảo Quiêng</li>
                <li><b>Giám sát hậu kỳ:</b> Văn Ngọc Thành</li>
                <li><b>Dựng phim:</b> Phạm Hữu Trí</li>
                <li><b>Hiệu chỉnh màu sắc:</b> Nguyễn Tùng Lâm</li>
                <li><b>Nhạc sĩ:</b> Huy Đẹp Trai</li>
                <li><b>Hiệu chỉnh âm thanh:</b> [Đang cập nhật]</li>
            </ul>

            `,
        en: `
            <p><b>Genre:</b> Short fiction / Drama, Observation<br>
            <b> Year:</b> Coming-soon (2026)<br>
            <b>Duration:</b> 39:40<br> </p>

            <div style="text-align: left; margin: 30px 0;">
                <iframe 
                    width="100%" 
                    height="315" 
                    style="max-width: 560px; border-radius: 4px;" 
                    src="https://www.youtube.com/embed/ooWID56SmHk" 
                    title="Dad, Don't Lie To Me" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <h3>Logline</h3>
            <p>An unwilling middle-aged doctor has to impersonate the father of his young cancer patient through a series of phone calls, to deceive him about the death of his real father.</p>
            <h3>Director’s Statement</h3>
            <p>In late 2023, while I was keeping vigil at the hospital caring for my mother after she suffered a stroke, there was a doctor who provided exceptionally dedicated care for my mother despite having no prior connection to our family, and we hadn't paid for treatment at a high-quality private hospital. I believe that, beyond medical ethics, there must have been a deeper motivation behind his kindness. And from this, my idea was born.</p>
            <p>I transformed the patient (my mother) from a woman to a young boy because this resonated more closely with my soul and understanding. The connection between the boy and the doctor is simultaneously intimate yet distant, as they cannot meet in person but can only communicate through phone calls. This is partly due to the doctor's unavoidable circumstances, but more importantly, the connection between them through an electronic device reflects the disconnect in modern life, where humans are forced to express their feelings incompletely. This is the tragedy of our era.</p>
            <p>I want to tell this story from an observer's perspective. Instead of bringing the camera close to the characters to see how their emotions unfold, I will stand with the audience at an appropriate distance to witness their emotional journey. When a sad event occurs, the audience must use their own experiences to anticipate the characters' feelings. This gives my actors more space to experiment with the characters they want to become, not just following my personal interpretation of how they should feel.</p>
            <p>The film will not have one main character because all three characters' roles complement each other. When the clock strikes, each character's journey will merge into one to reinforce a single thesis: "Life must go on."</p>



            <h3>Crew</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Cast:</b> Ngô Nhật Trường, Cô Nhum, Vũ Nguyễn Uy Nhân</li>

                <li><b>Director and Screenwriter:</b> Phạm Hữu Trí</li>
                <li><b>Director's Consultant:</b> NSND. Đào Bá Sơn</li>

                <li><b>Producer:</b> Thục Mai</li>
                <li><b>Co-Producer:</b> Thảo Quiêng</li>
                <li><b>Project Manager:</b> Phạm Văn Nam</li>

                <li><b>Cinematographer:</b> Nguyễn Tùng Lâm</li>

                <li><b>Production Designer:</b> Dzuy Tom</li>
                <li><b>Art Director:</b> Hoàng Bảo Uyên</li>

                <li><b>First Assistant Director:</b> Lê Diễm Quỳnh</li>
                <li><b>Second Assistant Director:</b> Kon Lớn</li>
                <li><b>Script Supervisor:</b> Hồ Minh Khoa</li>

                <li><b>Gaffer:</b> Tô Anh Khoa</li>
                <li><b>Assistant Camera:</b> Đặng Xuân Hoàng, Nguyễn Kim Hậu</li>
                <li><b>Focus Puller:</b> Văn Ngọc Thành</li>
                <li><b>Best boy:</b> Hiếu, Gia Bảo, Mai Ngọc Hiền</li>

                <li><b>Assistant Production Design:</b> Ruby</li>
                <li><b>Set Design and Set Decorator:</b> Nicholas Nguyễn, Kaii Khải Hân, HaiBkk</li>
                <li><b>Wardrobe:</b> Minh Thảo</li>
                <li><b>Make-up Artist:</b> Bia Huyền</li>

                <li><b>Sound Recordist:</b> Crister Nguyên</li>
                <li><b>Storyboard Artist:</b> Phạm Hữu Trí</li>

                <li><b>Production Assistant:</b> Khương Ngọc, Vương Linh</li>

                <li><b>Post-Producer:</b> Thục Mai, Thảo Quiêng</li>
                <li><b>Post-Production Supervisor:</b> Văn Ngọc Thành</li>
                <li><b>Editor:</b> Phạm Hữu Trí</li>
                <li><b>Colorist:</b> Nguyễn Tùng Lâm</li>
                <li><b>Music Composer:</b> Huy Đẹp Trai</li>
                <li><b>Sound Design and Mastering:</b> [Đang cập nhật]</li>
            </ul>
        
            `,

        // Dữ liệu Crew đã được tách riêng, sạch sẽ và dễ quản lý
        crewData: [
            { name: "Ngô Nhật Trường", role: { vi: "Diễn viên", en: "Cast" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-ngo-nhat-truong.png" },
            { name: "Cô Nhum", role: { vi: "Diễn viên", en: "Cast" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-co-nhum.png" },
            { name: "Nguyễn Vũ Uy Nhân", role: { vi: "Diễn viên", en: "Cast" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-bap.jpg" },
            
            { name: "Phạm Hữu Trí", role: { vi: "Đạo diễn, Kịch bản & Dựng phim", en: "Director, Screenwriter & Editor" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-pham-huu-tri.png" },
            
            { name: "Thục Mai", role: { vi: "Sản xuất & Sản xuất hậu kỳ", en: "Producer & Post-Producer" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-thuc-mai.jpg" },
            { name: "Thảo Quiêng", role: { vi: "Đồng sản xuất & Sản xuất hậu kỳ", en: "Co-Producer & Post-Producer" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/BODND_Still.jpg" },
            
            { name: "Nguyễn Tùng Lâm", role: { vi: "Đạo diễn hình ảnh, Quay phim & Hiệu chỉnh màu sắc", en: "Cinematographer & Colorist" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-nguyen-tung-lam.png" },
            
            { name: "Dzuy Tom", role: { vi: "Thiết kế sản xuất", en: "Production Designer" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-dzuy-tom.png" },
            { name: "Hoàng Bảo Uyên", role: { vi: "Thiết kế mỹ thuật", en: "Art Director" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-hoang-bao-uyen.png" },
            
            { name: "Lê Diễm Quỳnh", role: { vi: "Trợ lý đạo diễn #1", en: "First Assistant Director" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-quynh-sun.png" },
            { name: "Kon Lớn", role: { vi: "Trợ lý đạo diễn #2", en: "Second Assistant Director" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-kon-lon.JPG" },
            
            { name: "Văn Ngọc Thành", role: { vi: "Chỉnh nét & Giám sát hậu kỳ", en: "Focus Puller & Post-Production Supervisor" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/BODND_Still.jpg" },
            { name: "Tô Anh Khoa", role: { vi: "Gaffer", en: "Gaffer" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/BODND_Still.jpg" },
            { name: "Đặng Xuân Hoàng", role: { vi: "Phụ quay", en: "Assistant Camera" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/BODND_Still.jpg" },
            { name: "Nguyễn Kim Hậu", role: { vi: "Phụ quay", en: "Assistant Camera" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/BODND_Still.jpg" },
            
            
            
            { name: "Nicholas Nguyễn", role: { vi: "Thiết kế bối cảnh", en: "Set Design" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-nick.jpeg" },
            { name: "Kaii Khải Hân", role: { vi: "Thiết kế bối cảnh", en: "Set Design" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-kaii.png" },
            { name: "HaiBkk", role: { vi: "Thiết kế bối cảnh", en: "Set Design" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-haibkk.png" },
            { name: "Ruby", role: { vi: "Trợ lý thiết kế sản xuất", en: "Assistant Production Designer" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-ruby.png" },

            { name: "Huy Đẹp Trai", role: { vi: "Nhạc sĩ", en: "Music Composer" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/BODND_Still.jpg" },
            { name: "[Đang cập nhật]", role: { vi: "Hiệu chỉnh âm thanh", en: "Sound Design & Mastering" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/BODND_Still.jpg" },


            { name: "Minh Thảo", role: { vi: "Phục trang", en: "Wardrobe" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-minh-thao.png" },
            { name: "Bia Huyền", role: { vi: "Hóa trang", en: "Make-up Artist" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-bia-huyen.png" },
            { name: "Hồ Minh Khoa", role: { vi: "Thư ký trường quay", en: "Script Supervisor" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-ho-minh-khoa.jpeg" },
            
            { name: "Crister Nguyên", role: { vi: "Thu thanh hiện trường", en: "Sound Recordist" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-crister-nguyen.png" },
            { name: "Khương Ngọc", role: { vi: "Trợ lý sản xuất", en: "Production Assistant" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/crew-card/crew-card-ngoc-lao.png" },
            { name: "Vương Linh", role: { vi: "Trợ lý sản xuất", en: "Production Assistant" }, img: "https://ik.imagekit.io/phamhuutri108/BODND/BODND_Still.jpg" },
            
        ],

        // DỮ LIỆU BTS (MỚI THÊM VÀO - CHỈ CẦN KHAI BÁO 1 LẦN)
    btsData: [
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-2.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-1.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-3.jpeg", class: "big" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-5.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-6.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-8.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-9.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-14.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-7.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-11.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-12.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-15.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-10.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-19.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-23.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-21.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-24.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-26.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-22.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-27.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-25.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-18.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-20.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-28.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-16.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-17.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-29.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-30.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-31.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-32.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-33.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-4.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-36.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-34.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-35.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-37.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-38.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-39.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-40.jpeg", class: "tall" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-41.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-42.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-43.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-44.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-45.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-46.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-47.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-48.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-49.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-50.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-51.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-52.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-53.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-54.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-55.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-56.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-57.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-58.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-59.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-61.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-62.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-63.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-60.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-64.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-65.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-66.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-67.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-68.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-69.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-70.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-71.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-72.jpeg", class: "tall" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-73.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-74.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-75.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-77.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-76.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-79.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-81.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-83.jpeg", class: "big" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-82.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-80.jpeg" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-78.jpeg", class: "wide" },
    { src: "https://ik.imagekit.io/phamhuutri108/BODND/BODND-BTS-84.jpeg" },
],

        // Giữ nguyên phần Behind The Scene bên dưới nếu có...
        // ... (Bạn copy nốt phần gallery-wall BTS vào đây nếu muốn, hoặc để nguyên trong file gốc nếu nó nằm ngoài biến `vi`/`en`)
    },

    // 2. NGHIỆP
    "short-films-karma": {
        title: {
            vi: "Nghiệp",
            en: "Karma"
        },
        thumbnail: "https://ik.imagekit.io/phamhuutri108/karma/KARMA_thumbnail.png",
        
        vi: `
            <p><b>Thể loại:</b> Phim ngắn / Tâm lý<br>
            <b> Năm:</b> 2024<br>
            <b>Thời lượng:</b> 28:20<br>
            <b>Giải thưởng:</b>
            <br>Cánh Diều Bạc, Hội điện ảnh Việt Nam (2024)
            <br>Kịch bản xuất sắc nhất - FABA Films (2025)</p>
            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="https://www.youtube.com/embed/VzVB9pFBoiY" title="Karma" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p style="margin-top: 10px; font-size: 12px;"><a href="https://www.fabafilms.com/streaming-/karma" target="_blank" style="color: #0033cc;">▶ Xem trực tuyến trên FABA Films</a></p>
            </div>
            <h3>Logline</h3>
            <p>Một Tỳ Kheo già, sau hơn 20 năm đi tu để thoát khỏi cảm giác tội lỗi từng hãm hiếp một cô gái, đã vô tình gặp lại con gái ruột của mình, một lần nữa phải đối mặt với tội lỗi năm xưa và ngộ ra quan niệm về sự giải thoát và tha thứ.</p>
            <h3>Crew</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Diễn viên:</b> Khánh Duy, Cô Nhum, Đức Trí</li>

                <li><b>Đạo diễn & Kịch bản:</b> Phạm Hữu Trí</li>
                <li><b>Consultant Director:</b> NSƯT. Đạo diễn Đào Bá Sơn</li>

                <li><b>Cố vấn nghệ thuật:</b> NSƯT. Đạo diễn Nguyễn Tường Phương</li>

                <li><b>Trợ lý đạo diễn:</b> Lê Diễm Quỳnh</li>

                <li><b>Sản xuất:</b> Hoàng Mỹ</li>
                <li><b>Điều phối sản xuất:</b> Quang Phạm</li>
                <li><b>Quản lý bối cảnh:</b> Phạm Văn Nam</li>

                <li><b>Đạo diễn hình ảnh:</b> Nguyễn Tùng Lâm, Hoàng Bảo Uyên</li>
                <li><b>Quay phim:</b> Nguyễn Tùng Lâm, Hoàng Bảo Uyên</li>

                <li><b>Phụ quay:</b> Mẫn Nhi Mạch</li>
                <li><b>Điều phối ánh sáng & Kỹ thuật:</b> Phong Trần</li>

                <li><b>Thiết kế sản xuất:</b> Cá Đen</li>
                <li><b>Đạo cụ:</b> Trang Hồ</li>
                <li><b>Nghệ sĩ hóa trang:</b> Nguyễn Tố Loan</li>

                <li><b>Thu thanh hiện trường:</b> Ngô Hà Nam</li>
                <li><b>Trợ lý sản xuất:</b> Lan Phương</li>

                <li><b>Dượng phim:</b> Ngô Hà Nam, Phạm Hữu Trí</li>
                <li><b>Hiệu chỉnh màu sắc:</b> Lâm Nguyễn Tùng</li>
                <li><b>Hiệu chỉnh âm thanh:</b> Ngô Hà Nam</li>
                <li><b>Storyboard Artist:</b> Bảo Ngọc, Phạm Hữu Trí</li>
            </ul>

            <h3>Still</h3>
            <div class="gallery-wall">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-2.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-1.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-3.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-4.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-5.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-6.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-7.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-8.png">
            </div>

            <h3>3D storyboard</h3>
            <div class="gallery-wall">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-01.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-02.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-03.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-04.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-05.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-06.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-07.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-08.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-09.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-10.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-11.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-12.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-13.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-14.jpg">
            </div>

            <h3>Behind The Scene</h3>
            <div class="gallery-wall">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_1.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_2.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_4.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_5.png" class="tall">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_6.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_7.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_9.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_10.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_11.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_12.png" class="tall">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_15.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_16.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_18.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_19.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_17.png">
            </div>
        `,
        en: `
            <p><b>Genre:</b> Short fiction / Drama<br>
            <b>Year:</b> 2024<br><b>Duration:</b> 28:20<br>
            <b>Awards:</b>
            <br>Silver Prize, Golden Kite Awards (2024)
            <br>Best Screenplay, FABA Films (2025)</p>   <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="https://www.youtube.com/embed/VzVB9pFBoiY" title="Karma" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p style="margin-top: 10px; font-size: 12px;"><a href="https://www.fabafilms.com/streaming-/karma" target="_blank" style="color: #0033cc;">▶ Streaming on FABA Films</a></p>
            </div>
            <h3>Logline</h3>
            <p>An old monk, after 20 years of practicing Buddhism to escape the guilt of having raped a woman, accidentally meets his own daughter, and once more has to face his past sin and realizes the meaning of enlightenment and forgiveness.</p>
            <h3>Crew</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Cast:</b> Khánh Duy, Cô Nhum, Đức Trí</li>

                <li><b>Director & Screenwriter:</b> Phạm Hữu Trí</li>

                <li><b>Director's Consultant:</b> NSƯT. Nguyễn Tường Phương</li>

                <li><b>Assistant Director:</b> Lê Diễm Quỳnh</li>

                <li><b>Producer:</b> Hoàng Mỹ</li>
                <li><b>Production Coordinator:</b> Quang Phạm</li>
                <li><b>Location Manager:</b> Phạm Văn Nam</li>

                <li><b>Director of Photography:</b> Nguyễn Tùng Lâm, Hoàng Bảo Uyên</li>
                <li><b>Camera Operator:</b> Nguyễn Tùng Lâm, Hoàng Bảo Uyên</li>

                <li><b>Assistant Camera:</b> Mẫn Nhi Mạch</li>
                <li><b>Lighting & Technical:</b> Phong Trần</li>

                <li><b>Production Design:</b> Cá Đen</li>
                <li><b>Props Master:</b> Trang Hồ</li>
                <li><b>Hair & Makeup Artist:</b> Nguyễn Tố Loan</li>

                <li><b>Sound Recordist:</b> Ngô Hà Nam</li>
                <li><b>Production Assistant:</b> Lan Phương</li>

                <li><b>Editor:</b> Ngô Hà Nam, Phạm Hữu Trí</li>
                <li><b>Colorist:</b> Lâm Nguyễn Tùng</li>
                <li><b>Sound Editing and Mastering:</b> Ngô Hà Nam</li>
                <li><b>Storyboard Artist:</b> Bảo Ngọc, Phạm Hữu Trí</li>
            </ul>

            <h3>Still</h3>
            <div class="gallery-wall">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-2.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-1.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-3.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-4.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-5.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-6.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-7.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Still/KARMA-still-8.png">
            </div>

            <h3>3D storyboard</h3>
            <div class="gallery-wall">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-01.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-02.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-03.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-04.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-05.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-06.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-07.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-08.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-09.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-10.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-11.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-12.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-13.jpg">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/Storyboard/KARMA-Storyboard-14.jpg">
            </div>

            <h3>Behind The Scene</h3>
            <div class="gallery-wall">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_1.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_2.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_4.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_5.png" class="tall">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_6.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_7.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_9.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_10.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_11.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_12.png" class="tall">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_15.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_16.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_18.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_19.png">
                <img src="https://ik.imagekit.io/phamhuutri108/karma/KARMA_BTS_17.png">
            </div>
        `
    },

    // 3. CON MA MUỐN SỐNG
    "short-films-the-ghost-wants-to-live": {
        title: {
            vi: `"Con Ma" Muốn Sống`,
            en: `"The Ghost" Wants To Live`
        },
        thumbnail: "https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_thumbnail.png",
        
        vi: `
            <p>
            <b>Thể loại:</b> Phim tài liệu ngắn / Tương tác<br>
            <b>Năm:</b> 2022<br>
            <b>Thời lượng:</b> 22:02<br>
            <b>Giải thưởng & Quỹ hỗ trợ:</b><br>
            Giải Ba, Liên hoan Phim ngắn TP.HCM (2023)<br>
            Quỹ Sáng tạo trẻ, Hội Điện ảnh TP.HCM (2022)
            </p>
            

            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="https://www.youtube.com/embed/ijfYdCNMRK8" title="The Ghost Wants to Live" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <h3>Synopsis</h3>
            <p>Phim là toàn bộ câu chuyện của nhân vật Lâm Anh, kể về những thăng trầm của bản thân khi đã trải qua căn bệnh trầm cảm. Đã có lúc cô tự nhận mình là một con ma, và giờ đây… con ma ấy muốn được sống, muốn được hạnh phúc.</p>
            
                <h3>Crew</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Nhân vật:</b> Nguyễn Lâm Anh</li>
                <li><b>Đạo diễn và Kịch bản:</b> Phạm Hữu Trí</li>
                <li><b>Cố vấn nghệ thuật:</b> NSND. Đạo diễn Đào Bá Sơn</li>
                <li><b>Quay phim:</b> Võ Nguyễn Đạt Kha, Phan Quốc Anh, Phan Thiện Anh, Nguyễn Đan Thọ</li>
                <li><b>Dựng phim:</b> Phạm Hữu Trí</li>
                <li><b>Bài hát trong phim:</b> Một Ngày - Kien, Con Dế Mèn Hát Vào Mùa Hè - Tung</li>
                <li><b>Đoạn phim được sử dụng:</b> Rừng Na Uy - Directed by Trần Anh Hùng</li>
            </ul>



            <h3>Behind The Scene</h3>
            
            <div class="gallery-wall">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_1.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_5.png" class="big">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_12.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_17.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_15.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_8.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_10.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_2.png" class="tall">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_14.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_4.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_16.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_11.png" class="tall">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_3.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_6.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_9.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_7.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_13.png" class="wide">
            </div>


            `,
        en: `
            <p>
            <b>Genre:</b> Documentary short / Interactive<br>
            <b>Year:</b> 2022<br>
            <b>Duration:</b> 22:02<br>
            <b>Award & Fund:</b><br>
            Third Prize, HCMC Short Film Festival (2023)<br>
            Young Creativity Fund, HCMC Cinema Association (2022)
            </p>
            <div style="text-align: left; margin: 30px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="https://www.youtube.com/embed/ijfYdCNMRK8" title="The Ghost Wants to Live" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <h3>Synopsis</h3>
            <p>The film tells the complete story of the character Lâm Anh, recounting the ups and downs she experienced after battling depression. There was a time when she considered herself a ghost, and now... that ghost wants to live.</p>

            <h3>Crew</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Character:</b> Nguyễn Lâm Anh</li>
                <li><b>Director & Screenwriter:</b> Phạm Hữu Trí</li>
                <li><b>Director's Consultant:</b> NSND. Đào Bá Sơn</li>
                <li><b>Camera Operator:</b> Võ Nguyễn Đạt Kha, Phan Quốc Anh, Phan Thiện Anh, Nguyễn Đan Thọ</li>
                <li><b>Editor:</b> Phạm Hữu Trí</li>
                <li><b>Songs sung by Character:</b> Một Ngày - Kien, Con Dế Mèn Hát Vào Mùa Hè - Tung</li>
                <li><b>Film footages used:</b> Rừng Na Uy - Directed by Trần Anh Hùng</li>
            </ul>


            <h3>Behind The Scene</h3>
            
            <div class="gallery-wall">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_1.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_5.png" class="big">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_12.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_17.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_15.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_8.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_10.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_2.png" class="tall">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_14.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_4.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_16.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_11.png" class="tall">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_3.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_6.png" class="wide">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_9.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_7.png">
                <img src="https://ik.imagekit.io/phamhuutri108/CMMS/CMMS_13.png" class="wide">
            </div>



            `
    },

    // 4. GÀ TRỐNG NẤU CƠM
    "short-films-cocks-cooking": {
        title: {
            vi: "Gà Trống Nấu Cơm",
            en: "Cock's Cooking"
        },
        thumbnail: "https://ik.imagekit.io/phamhuutri108/GTNC_thumbnail.jpg",
        
        vi: `
            <p><b>Thể loại:</b> Phim ngắn / Tâm lý<br>
            <b>Năm:</b> 2023<br>
            <b>Thời lượng:</b> 06:45</p>
            

            <div style="text-align: left; margin: 20px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="https://www.youtube.com/embed/nOfecnBi0bM" title="Cock's Cooking" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

            <h3>Crew</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Đạo diễn, Kịch bản và Dựng phim:</b> Phạm Hữu Trí</li>
                <li><b>Diễn viên:</b> Võ Nguyễn Đạt Kha</li>
            </ul>


            <h3>Âm nhạc</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><i>You Are So Beautiful</i> bởi <b>Joe Cocker</b></li>
            </ul>
        `,
        en: `
            <p><b>Genre:</b> Short fiction / Drama<br><b>Year:</b> 2023<br><b>Duration:</b> 06:45</p>
            


            <div style="text-align: left; margin: 20px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="https://www.youtube.com/embed/nOfecnBi0bM" title="Cock's Cooking" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>


            <h3>Crew</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Director, Screenwriter & Editor:</b> Phạm Hữu Trí</li>
                <li><b>Cast:</b> Võ Nguyễn Đạt Kha</li>
            </ul>

            

            

            <h3>Music</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><i>You Are So Beautiful</i> by <b>Joe Cocker</b></li>
            </ul>
        `
    },

    // 5. ALIVE
    "short-films-alive": {
        title: {
            vi: "Khi Chúng Ta Được Sống",
            en: "Alive"
        },
        thumbnail: "https://ik.imagekit.io/phamhuutri108/Alive_thumbnail.jpg",
        
        vi: `
            <p><b>Thể loại:</b> Phim ngắn / Tâm lý<br>
            <b>Năm:</b> 2020<br>
            <b>Thời lượng:</b> 19:23</br>
            <b>Giải thưởng:</b> Phim ngắn xuất sắc, The Original Project, Hà Nội (2022)
            <p>
            <div style="text-align: left; margin: 20px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="https://www.youtube.com/embed/QBW1HpOVGz8" title="Alive" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

            <h3>Crew</h3>
            
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Diễn viên:</b> Ngọc Đạt, Tuyết Sương, Minh Nhã, Thảo Linh, Công Sang, Phạm Lê Bảo, Lê Đăng Doanh, Trọng Nghĩa, Duy Khang</li>
                <li><b>Đạo diễn:</b> Phạm Hữu Trí</li>
                <li><b>Đồng Đạo diễn:</b> Nguyễn Lâm Anh</li>
                <li><b>Sản xuất:</b> Phương Uyên</li>
                <li><b>Kịch bản:</b> Quốc Vinh</li>
                <li><b>Quay phim:</b> Nhật Khánh</li>
                <li><b>Dựng phim:</b> Lê Đăng Doanh</li>
                <li><b>Graphic Designer:</b> Trần Lương Gia Huy</li>
                <li><b>VFX:</b> Hoàng Hữu Quân</li>
                <li><b>Thiết kế âm thanh:</b> Lâm Quý</li>
                <li><b>Props:</b> Trần Gia Bảo, Hoàng Việt</li>
                <li><b>Trợ lý sản xuất:</b> Gia Hưng, Duy Khánh</li>
            </ul>
        `,
        en: `
            <p><b>Genre:</b> Short fiction / Drama<br>
            <b>Year:</b> 2020<br>
            <b>Duration:</b> 19:23</br>
            <b>Award:</b> Best Short Film, The Original Project, Hanoi (2022)
            <p>
            <div style="text-align: left; margin: 20px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="https://www.youtube.com/embed/QBW1HpOVGz8" title="Alive" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

            <h3>Crew</h3>
            
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Cast:</b> Ngọc Đạt, Tuyết Sương, Minh Nhã, Thảo Linh, Công Sang, Phạm Lê Bảo, Lê Đăng Doanh, Trọng Nghĩa, Duy Khang</li>
                <li><b>Director:</b> Phạm Hữu Trí</li>
                <li><b>Co-Director:</b> Nguyễn Lâm Anh</li>
                <li><b>Producer:</b> Phương Uyên</li>
                <li><b>Screenwriter:</b> Quốc Vinh</li>
                <li><b>Cinematography:</b> Nhật Khánh</li>
                <li><b>Editor:</b> Lê Đăng Doanh</li>
                <li><b>Graphic Designer:</b> Trần Lương Gia Huy</li>
                <li><b>VFX:</b> Hoàng Hữu Quân</li>
                <li><b>Sound Design:</b> Lâm Quý</li>
                <li><b>Props:</b> Trần Gia Bảo, Hoàng Việt</li>
                <li><b>Production Assistant:</b> Gia Hưng, Duy Khánh</li>
            </ul>
        `
        },


    // 6. KHI THÀNH PHỐ LỚN
    "short-films-when-my-city-grows": {
        title: {
            vi: "Khi Thành Phố Lớn",
            en: "When My City Grows"
        },
        thumbnail: "https://ik.imagekit.io/phamhuutri108/KTPL_thumbnail.jpg",
        
        vi: `
            <p>
                <b>Thể loại:</b> Phim tài liệu ngắn<br>
                <b>Năm:</b> 2020<br>
                <b>Thời lượng:</b> 02:55<br>
                <b>Giải thưởng:</b> Giải nhì, Le Filmmaking Camp: Spectrum, Quảng Trị
            </p>
            <div style="text-align: left; margin: 20px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="https://www.youtube.com/embed/9qh9bCoNitI" title="When My City Grows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

            <p>
                Dự án được tổ chức dưới sự tài trợ của Đại sứ quán Hoa Kỳ và được bảo trợ tổ chức của Tỉnh Đoàn Quảng Trị.
            </p>

            <h3>Đội ngũ</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Đạo diễn, Quay phim và Dựng phim:</b> Phạm Hữu Trí</li>
                <li><b>Kịch bản:</b> Quốc Vinh</li>
                <li><b>Sản xuất:</b> Hải Yến</li>
                <li><b>Trợ lý đạo diễn:</b> Việt Hà, Công Thoại</li>
                <li><b>Trợ lý kịch bản:</b> Thanh Lam, Hoa Diệu</li>
            </ul>
        `,
        en: `
            <p>
                <b>Genre:</b> Short documentary<br>
                <b>Year:</b> 2020<br>
                <b>Duration:</b> 02:55<br>
                <b>Award:</b> Second Prize, Le Filmmaking Camp: Spectrum, Quang Tri
            <br>

            <div style="text-align: left; margin: 20px 0;">
                <iframe width="100%" height="315" style="max-width: 560px; border-radius: 4px;" src="https://www.youtube.com/embed/9qh9bCoNitI" title="When My City Grows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            
            <p>
                The project was organised with sponsorship from the U.S. Embassy and supported by the Quang Tri Provincial Youth Union.
            </p>

            <h3>Crew</h3>
            <ul style="list-style: none; padding-left: 10px; font-size: 12px; line-height: 1.8;">
                <li><b>Director, Filmming and Editor:</b> Phạm Hữu Trí</li>
                <li><b>Screenwriter:</b> Quốc Vinh</li>
                <li><b>Producer:</b> Hải Yến</li>
                <li><b>Assistant Directors:</b> Việt Hà, Công Thoại</li>
                <li><b>Script Assistants:</b> Thanh Lam, Hoa Diệu</li>
            </ul>
            `
    }
};