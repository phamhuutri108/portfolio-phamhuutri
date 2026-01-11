/* --- FILE: writing-data.js --- */

// Dùng Mảng (Array) để dễ quản lý thứ tự.
// Bài mới nhất bạn cứ thêm vào ĐẦU danh sách (ngay sau dấu [ ).

const writingData = [
    
    
    {
        id: "write-dieu-khac-la",
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
        id: "write-ba-toi-la-ke-noi-doi",
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
        id: "write-108-ga-nang",
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
        id: "write-nha-trang-sep",
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
        id: "write-manh-giay-khe-da",
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
        id: "write-sg-apr",
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
        id: "write-vo-tuong-dai",
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
        id: "write-loi-me-theu-thao",
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
        id: "write-sg-jun-23",
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
        id: "write-sg-mar-23",
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
        id: "write-mui-thuoc-la",
        date: "29/01/2023",
        location: "Quy Nhơn",
        title: {
            vi: "mùi thuốc lá quen thuộc.",
            en: "that familiar smell of tobacco."
        },
        content: {
            vi: `<p>...</p>`,
            en: `<p>...</p>`
        }
    },





    {
        id: "write-tu-do-that-su",
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
        id: "write-triet-ly-tran-nha",
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
        id: "write-tinh-yeu-tinh-thuong",
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
        id: "write-vong-ngu",
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