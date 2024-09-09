const movies = [
    {
        title: "Exemple 1",
        description: "Description",
        rating: 53,  // Note TMDb
        ageRating: "TP",  // Âge minimum
        thumbnail: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/exemple.jpg",  // Image depuis TMDb
        videoUrl: "https://link-to-video.com"
    }
];

const series = [
    {
        title: "Serie exemple 1",
        description: "Description",
        rating: 78,
        ageRating: "TV-14",
        thumbnail: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/exemple.jpg",
        seasons: [
            {
                seasonNumber: 9,
                episodes: [
                    {
                        title: "Episod 1",
                        videoUrl: "https://link-to-video.com"
                    },
                    {
                        title: "Episod 2",
                        videoUrl: "https://link-to-video.com"
                    }
                ]
            }
        ]
    }
];
