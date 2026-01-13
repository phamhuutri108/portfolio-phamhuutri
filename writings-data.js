/* --- FILE: writing-data.js --- */

// Dùng Mảng (Array) để dễ quản lý thứ tự.
// Bài mới nhất bạn cứ thêm vào ĐẦU danh sách (ngay sau dấu [ ).

const writingData = [


    // mùi thuốc lá quen thuộc //

    {
    id: "writings-mui-thuoc-la-quen-thuoc",
    date: "29/01/2023",
    location: "Quy Nhơn",
    title: {
        vi: "mùi thuốc lá quen thuộc.",
        en: "that familiar smell of tobacco."
    },
    content: {
        vi: `
<p style="margin-bottom: 15px;">Tiếng gõ lên mặt bàn vang lên đều đều. Cả âm thanh của điếu thuốc bị mốc đang được kéo từng hơi dài của Nàng trong một không gian tĩnh mịch. Tình huống này dường như gã đã lường trước khả năng có thể xảy ra, nhưng gã vẫn mặc kệ mà tiến đến mối quan hệ này.</p>

<p style="margin-bottom: 15px;">Nàng ngồi ngay một góc của chiếc giường, đôi môi liên tục rít những hơi thuốc dài, sâu như thể lượng không khí bên trong căn phòng đã đi hết vào phổi Nàng và thay thế cho lượng không khí ấy là lượng khói thuốc tương đương. Sự ngột ngạt tăng lên theo thời gian. Từng giây từng phút trôi qua, Nàng không thể dừng việc lấp đầy cái gạt tàn bằng những đót thuốc đã bị cháy xém gần phân nửa.</p>

<p style="margin-bottom: 15px;">Gã ngồi ở chiếc bàn đối diện cánh cửa ra vào phòng. Gã nhìn vào khoảng không, như thể trong không khí có cái gì đó rất thu hút sự chú ý của gã. Gã không cử động nhiều, chỉ ngồi im và nhịp từng hồi lên mặt bàn ‘kịch, kịch, kịch’. Thứ âm thanh đó đều và nhịp nhàng như nhịp tim của gã. Gã luôn có một sự bình thản nhất định dù phải đối mặt với bất cứ sự kiện gì xảy đến. Lúc gã vui, lúc gã trầm mặc hay cả những khi rạo rực cùng Nàng trên chiếc giường đằng kia, thì khuôn mặt ấy luôn giữ một sự điềm tĩnh.</p>

<p style="margin-bottom: 15px;">Nàng dụi điếu thuốc xuống gạt tàn. Với lấy bao thuốc Marlboro đỏ rồi châm thêm một điếu nữa. Nàng mở lời sau khi thở ra hơi đầu tiên của điếu thuốc mới:<br>
“Có gì đó không ổn giữa chúng ta.”<br>
“Em thấy vậy sao?”, gã vẫn nhìn khoảng không nhưng ánh mắt có sự dao động nhẹ, nhìn về phía Nàng và nói.<br>
“Ừ, em thấy thế. Giữa chúng ta chẳng có ai ổn cả.”<br>
“Vậy thì, cho anh biết đi.”<br>
“Chuyện gì?”<br>
Gã khựng lại một nhịp rồi nói: “Biết em đang suy nghĩ gì?”<br>
Nàng im lặng. Lần nào cũng chỉ cùng một phản ứng đó.</p>

<p style="margin-bottom: 15px;">Gã không lấy gì làm lạ khi đối diện với phản ứng đó của Nàng. Gã không thích nhưng cũng dần quen thuộc với nó. Tựa như nếu Nàng nói thật ra suy nghĩ của mình thì gã sẽ lấy làm lạ mà càng đâm ra nghi ngờ những lời nói đó không phải sự thật. Gã tự thấy mâu thuẫn, cho dù Nàng có nói hay không thì gã đều không có chứng cớ gì để xác minh đâu mới là sự thật. Nên dần dà, gã tự bật công tắc, quen dần với phản ứng đó của Nàng, và gã ngầm chấp nhận đó như một giao ước giữa hai bên khi giao tiếp.</p>

<p style="margin-bottom: 15px;">“Em cũng không biết”, Nàng rít một hơi thuốc thật sâu, vừa phả ra vừa nói: “Em chưa bao giờ hiểu được chính mình, dù cho em đã rất cố gắng để hiểu.”<br>
“Vậy em mong đợi anh sẽ hiểu chính bản thân em thay em?”, gã bộc bạch với tông giọng thường ngày, không cao không thấp, chỉ đơn thuần là một câu nghi vấn với không chút sắc thái ẩn ý gì.<br>
“Đã từng”.</p>

<p style="margin-bottom: 15px;">Nàng cúi đầu nhìn về phía cửa sổ. Gió cứ lùa những luồng hơi mạnh bạo, khô khốc vào cửa kính. Âm thanh nền của tiếng xe cộ hòa lẫn cùng nỗi khát khao được biểu đạt cái bên trong của Nàng làm gã xao động.</p>

<p style="margin-bottom: 15px;">Thật lòng, gã đã từng cố gắng để làm điều đó giúp Nàng. Nhưng thứ phía trước chắn đường gã giống như bức tường ngăn cách Đông Đức với Tây Đức. Không một kẽ hở để gã có thể chen chân vào cái nội tâm rối ren của Nàng, dù cho có cố gắng bao nhiêu đi nữa.</p>

<p style="margin-bottom: 15px;">“Anh chưa từng một lần bỏ cuộc. Anh mong em biết điều đó.”, gã dừng gõ lên mặt bàn, nhìn về phía Nàng rồi nói tiếp: “Anh có thể làm gì khác hơn?”.<br>
“Em cũng không mong gì khác hơn. Em chỉ thắc mắc điều gì đã đưa bọn mình đến đây và im lặng với nhau đến nhường này?”<br>
“Em thú nhận, em chưa từng thật sự hiểu tình yêu là cái quái gì. Và em đã mong, em tìm được nó ở nơi anh”, Nàng nói với tông giọng cao dần nhưng khô khan.</p>

<p style="margin-bottom: 15px;">Gã tưởng tượng mình đang đi trong một hoang mạc đầy cát. Cái nắng khô khốc không một chút hơi ẩm làm gã muốn đổ gục xuống mặt đất. Gã không có nơi chốn cụ thể nào được gọi là mục đích để đến. Gã không biết phải đi đâu, làm gì để cải tạo được cái chốn khô cằn này. Gã chỉ có thể bước đi mà không có bất kỳ sự chỉ dẫn nào khác ngoài sự im lặng của Nàng trao cho gã. Gã bắt lấy sự chỉ dẫn không đáng được gọi là một chỉ dẫn đúng mực ấy trong sự tuyệt vọng cùng cực.</p>

<p style="margin-bottom: 15px;">Rồi Nàng nằm sải ra trên giường, xoay người vào trong góc tường. Vai Nàng run lên từng hồi mạnh. Âm thanh ấy đi thẳng vào màng nhĩ của gã, từng hồi, từng hồi một khiến gã không thể ngồi yên. Gã nhịp chân nhưng âm thanh giờ lại không hòa với nhau nữa. Có một tiếng động nào đó khác cứ quấy nhiễu gã. Gã thắc mắc, cố gắng đi tìm nguồn gốc của âm thanh đó. Và trong một khoảnh khắc, khi đưa mắt nhìn Nàng đang nằm trên giường, nhìn cơ thể mà hàng đêm gã ôm trong vòng tay, nhìn một tâm hồn đã thương tổn mà gã mong muốn được chữa lành. Gã nhận ra âm thanh ấy xuất phát từ nơi lồng ngực của gã. Trái tim gã đang đập từng hồi nhanh và mạnh.</p>

<p style="margin-bottom: 15px;">Chân gã tự động đứng dậy, cơ thể gã tiến đến bên Nàng. Trong thâm tâm gã vẫn có một ý chí đối nghịch bảo với gã rằng: không được tiến đến. Nhưng trái tim gã giờ đây đã chiếm toàn quyền kiểm soát. Gã ngồi cạnh giường, đưa người đến sát vào tấm lưng mềm mại của Nàng đang run lên. Gã ghé vào tai Nàng, hôn lên tất cả những vụn vỡ ấy bằng hơi ấm nơi nỗi lòng của gã, và cả mùi hương của điếu thuốc Marlboro gã vừa hút cách đây không lâu. Ý chí đối kháng vừa nãy đã biến mất tự lúc nào gã cũng không rõ. Mùi tóc Nàng vương khói thuốc của gã, vương mùi thuốc lá của Nàng và cả mùi nước hoa mà Nàng thường dùng vì gã bảo gã thích Nàng ở trong mùi hương đó.</p>

<p style="margin-bottom: 15px;">Gã nhìn bờ vai của Nàng. Chi chít những vết sẹo vì thuốc lá. Bờ vai Nàng chẳng chút tiếc thương mà tự làm đau mình bằng những điếu thuốc lá Nàng hút dở. Gã hôn lên cả nơi chốn ấy, gã vùi đầu vào mình vào bờ vai ấy.</p>

<p style="margin-bottom: 15px;">Nàng đưa tay lên chạm vào khuôn mặt gã. Khuôn mặt khô khốc vì cái thời tiết hanh khô của những tháng cuối năm và cả sự cằn cỗi bên trong tâm hồn gã. Nàng vuốt ve khuôn mặt ấy mà không một chút ngần ngại, như thể đó cũng là một phần cơ thể Nàng.<br>
“Nhưng sâu tận cùng của mọi sự tận cùng, em vẫn muốn được cùng anh.”<br>
Nàng quay sang nhìn gã, đôi mắt Nàng hồ như chứa đựng một mạch nước ngầm yên ắng, cứ xuôi theo những vách đá mà chảy đều, chảy đều.<br>
“Anh không phản đối chứ?”, Nàng mím chặt đôi môi nhỏ nhắn của mình thành một đường thẳng, đôi mắt không rời khỏi khuôn mặt gã một giây phút nào.</p>

<p style="margin-bottom: 15px;">Âm thanh xung quanh cứ vậy mà lặng thinh. Khói thuốc bay nghi ngút. Âm thanh từ trái tim của gã và trái tim của Nàng cùng đập. Nhịp điệu không đều nhau nhưng gã cảm nhận được: rồi sẽ đều một mai đây thôi.<br>
Gã khẽ lắc đầu: “Anh không phản đối!”</p>

<p style="margin-bottom: 15px;">Mạch nước ngầm trên đôi mắt Nàng xao động, chảy mạnh hơn thành từng đường dài ven theo sống mũi. Nàng áp mặt vào ngực gã. Áo gã ướt đẫm. Nhưng gã chẳng bận tâm, vì gã biết rằng: hoang mạc của gã bây giờ đã có dấu hiệu của những cơn mưa đầu tiên. Tuy nhỏ nhưng đều đặn. Tuy ít ỏi nhưng tràn đầy niềm hân hoan.<br>
Gã biết, rồi cũng sẽ đến một ngày, hoang mạc kia sẽ không còn hiện diện trong gã nữa.<br>
Và cũng có lẽ cả trong Nàng.</p>

<p style="margin-bottom: 15px;">Gã cúi nhẹ đầu, áp mặt vào tóc Nàng - Mùi thuốc lá quen thuộc.</p>
        `,
        en: `<p>...</p>`
    }
},





            // khi những lời nói của mẹ dần trở nên thều thào //

    {
        id: "writings-khi-loi-noi-cua-me-dan-tro-nen-theu-thao",
        date: "05/02/24",
        location: "Quy Nhơn",
        title: {
            vi: "khi những lời nói của mẹ dần trở nên thều thào.",
            en: "when mother's words became whispers."
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },









    {
        id: "writings-co-dieu-gi-do-khac",
        date: "11/06/25", // Tương lai? Hay là 2024? Tôi cứ để nguyên nhé
        location: "Sài Gòn",
        title: {
            vi: "có điều gì đó khác.",
            en: "something is different."
        },
        content: {
            vi: `<p>Nội dung của bài viết...</p>`,
            en: `<p>Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...Content of the article...
            Content of the article...</p>`
        }
    },










    


    {
        id: "writings-ba-toi-la-ke-noi-doi",
        date: "26/11/24",
        location: "Sài Gòn",
        title: {
            vi: "ba tôi là kẻ nói dối.",
            en: "my father is a liar."
        },
        content: {
            vi: `<p>Nội dung...</p>`,
            en: `<p>Content...</p>`
        }
    },



    {
        id: "writings-108-ga-nang-la-ban",
        date: "11/11/24",
        location: "Sài Gòn",
        title: {
            vi: "108% Gà và Nàng là bạn.",
            en: "108% Ga and Nang are friends."
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },



    {
        id: "writings-nha-trang-11-09-24",
        date: "11/09/24",
        location: "Nha Trang",
        title: {
            vi: "Nha Trang, 11/09/24", // Bài này không có tiêu đề, lấy ngày làm tiêu đề
            en: "Nha Trang, 11/09/24"
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },



    {
        id: "writings-nhung-manh-giay-trong-khe-da",
        date: "26/06/24",
        location: "Sài Gòn",
        title: {
            vi: "những mảnh giấy trong khe đá.",
            en: "scraps of paper in the crevices."
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },



    {
        id: "writings-sg-15-04-24",
        date: "15/04/24",
        location: "Sài Gòn",
        title: {
            vi: "Sài Gòn, 15/04/24",
            en: "Saigon, 15/04/24"
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },



    {
        id: "writings-vo-tuong-dai",
        date: "09/03/24",
        location: "Sài Gòn",
        title: {
            vi: "vở tuồng dài",
            en: "the long play"
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },






    {
        id: "writings-sg-12-06-23",
        date: "12/06/23",
        location: "Sài Gòn",
        title: {
            vi: "Sài Gòn, 12/06/23",
            en: "Saigon, 12/06/23"
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },




    {
        id: "writings-sg-04-03-23",
        date: "04/03/23",
        location: "Sài Gòn",
        title: {
            vi: "Sài Gòn, 04/03/23",
            en: "Saigon, 04/03/23"
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },






    {
        id: "writings-tu-do-that-su",
        date: "17/07/22",
        location: "Sài Gòn",
        title: {
            vi: "tự do thật sự",
            en: "true freedom"
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },




    {
        id: "writings-triet-ly-cai-tran-nha",
        date: "02/07/22",
        location: "Sài Gòn",
        title: {
            vi: "triết lý cái trần nhà",
            en: "philosophy of the ceiling"
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },





    {
        id: "writings-tinh-yeu-di-qua-tinh-thuong-o-lai",
        date: "28/06/22",
        location: "Sài Gòn",
        title: {
            vi: "tình yêu đi qua, tình thương ở lại",
            en: "love passes, affection stays"
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },




    
    {
        id: "writings-vong-ngu",
        date: "19/06/22",
        location: "Sài Gòn",
        title: {
            vi: "vọng ngữ",
            en: "false speech"
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    }
];