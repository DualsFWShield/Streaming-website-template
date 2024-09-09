document.addEventListener('DOMContentLoaded', function() {
    const filmGallery = document.getElementById('film-gallery');
    const serieGallery = document.getElementById('serie-gallery');
    const videoPlayerContainer = document.getElementById('video-player-container');
    const videoPlayer = document.getElementById('video-player');
    const closeBtn = document.getElementById('close-btn');
    const serieDetails = document.getElementById('serie-details');
    const serieTitle = document.getElementById('serie-title');
    const seasonSelect = document.getElementById('season-select');
    const episodeList = document.getElementById('episode-list');
    const searchInput = document.getElementById('search');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const expandBtn = document.getElementById('expand-button');
    const pipBtn = document.getElementById('pip-button');
    const speedBtn = document.getElementById('speed-btn');
    const backBtn = document.getElementById('back-btn');
    const forwardBtn = document.getElementById('forward-btn');
    const downloadBtn = document.getElementById('download-btn');
    let currentVideoUrl = '';  // Pour stocker l'URL de la vidéo en cours
    let pipMode = false;       // Indicateur pour le mode PIP
    let playbackRate = 1;      // Taux de lecture initial

    function loadContent() {
        loadMovies(movies, filmGallery);
        loadSeries(series, serieGallery);
    }

    function loadMovies(content, gallery) {
        gallery.innerHTML = '';  // Nettoyage
        content.forEach(item => {
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-item');

            const img = document.createElement('img');
            img.src = item.thumbnail;
            img.alt = item.title;
            img.classList.add('movie-thumbnail');
            img.addEventListener('click', () => {
                playVideo(item.videoUrl, 'movie');
            });

            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movie-info');

            const title = document.createElement('h3');
            title.textContent = item.title;

            const description = document.createElement('p');
            description.textContent = item.description;

            const rating = document.createElement('p');
            rating.textContent = `Note : ${item.rating} / 100`;

            const ageRating = document.createElement('p');
            ageRating.textContent = `Âge : ${item.ageRating}`;

            movieInfo.appendChild(title);
            movieInfo.appendChild(description);
            movieInfo.appendChild(rating);
            movieInfo.appendChild(ageRating);

            movieContainer.appendChild(img);
            movieContainer.appendChild(movieInfo);

            gallery.appendChild(movieContainer);
        });
    }

    function loadSeries(content, gallery) {
        gallery.innerHTML = '';  // Nettoyage
        content.forEach(item => {
            const serieContainer = document.createElement('div');
            serieContainer.classList.add('serie-item');

            const img = document.createElement('img');
            img.src = item.thumbnail;
            img.alt = item.title;
            img.classList.add('serie-thumbnail');
            img.addEventListener('click', () => {
                showSerieDetails(item);
            });

            const serieInfo = document.createElement('div');
            serieInfo.classList.add('serie-info');

            const title = document.createElement('h3');
            title.textContent = item.title;

            const description = document.createElement('p');
            description.textContent = item.description;

            const rating = document.createElement('p');
            rating.textContent = `Note : ${item.rating} / 100`;

            const ageRating = document.createElement('p');
            ageRating.textContent = `Âge : ${item.ageRating}`;

            serieInfo.appendChild(title);
            serieInfo.appendChild(description);
            serieInfo.appendChild(rating);
            serieInfo.appendChild(ageRating);

            serieContainer.appendChild(img);
            serieContainer.appendChild(serieInfo);

            gallery.appendChild(serieContainer);
        });
    }

    function showSerieDetails(serie) {
        serieTitle.textContent = serie.title;
        seasonSelect.innerHTML = '';  // Nettoyage du sélecteur de saison
        episodeList.innerHTML = '';  // Nettoyage de la liste d'épisodes

        serie.seasons.forEach(season => {
            const option = document.createElement('option');
            option.value = season.seasonNumber;
            option.textContent = `Saison ${season.seasonNumber}`;
            seasonSelect.appendChild(option);
        });

        displayEpisodes(serie.seasons[0].episodes);

        seasonSelect.addEventListener('change', function() {
            const selectedSeason = serie.seasons.find(season => season.seasonNumber == this.value);
            displayEpisodes(selectedSeason.episodes);
        });

        videoPlayerContainer.classList.add('active');
        serieDetails.classList.remove('hidden');
    }

    function displayEpisodes(episodes) {
        episodeList.innerHTML = '';  // Nettoyage
        episodes.forEach(episode => {
            const li = document.createElement('li');
            li.textContent = episode.title;
            li.addEventListener('click', () => {
                playVideo(episode.videoUrl, 'serie');
            });
            episodeList.appendChild(li);
        });
    }

    function playVideo(url, type) {
        currentVideoUrl = url;
        videoPlayer.src = url;
        videoPlayer.play();
        videoPlayerContainer.classList.add('active');
        
        // Masquer ou afficher les détails des séries selon le type
        if (type === 'movie') {
            serieDetails.classList.add('hidden');
        } else {
            serieDetails.classList.remove('hidden');
        }
    }

    closeBtn.addEventListener('click', () => {
        videoPlayer.pause();
        videoPlayerContainer.classList.remove('active');
        serieDetails.classList.add('hidden');
    });

    playPauseBtn.addEventListener('click', () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    expandBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            videoPlayer.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }
    });
    

    pipBtn.addEventListener('click', () => {
        if (videoPlayer.requestPictureInPicture) {
            videoPlayer.requestPictureInPicture().catch(err => console.log(err));
        } else {
            pipMode = !pipMode;
            videoPlayer.style.position = pipMode ? 'absolute' : 'relative';
            videoPlayer.style.width = pipMode ? '300px' : '100%';
            videoPlayer.style.height = pipMode ? '200px' : 'auto';
        }
    });

    speedBtn.addEventListener('click', () => {
        playbackRate = playbackRate === 1 ? 1.5 : 1; // Alterner entre 1x et 1.5x
        videoPlayer.playbackRate = playbackRate;
        speedBtn.innerHTML = playbackRate === 1 ? '<i class="fas fa-tachometer-alt"></i>' : '<i class="fas fa-tachometer-alt" style="color: #ff0;"></i>';
    });

    backBtn.addEventListener('click', () => {
        videoPlayer.currentTime -= 10; // Reculer de 10 secondes
    });

    forwardBtn.addEventListener('click', () => {
        videoPlayer.currentTime += 10; // Avancer de 10 secondes
    });

    downloadBtn.addEventListener('click', () => {
        if (currentVideoUrl) {
            const link = document.createElement('a');
            link.href = currentVideoUrl;
            link.download = 'video.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
        const filteredSeries = series.filter(serie => serie.title.toLowerCase().includes(query));

        loadMovies(filteredMovies, filmGallery);
        loadSeries(filteredSeries, serieGallery);
    });

    loadContent();
});
