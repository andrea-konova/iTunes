import { addZero } from './supScript.js';

export const videoPlayerInit = () => {
	const	videoPlayer = document.querySelector('.video-player'),
		videoButtonPlay = document.querySelector('.video-button__play'),
		videoTimePassed = document.querySelector('.video-time__passed'),
		videoProgress = document.querySelector('.video-progress'),
		videoTimeTotal = document.querySelector('.video-time__total');

	const toggleIcon = () => {
		if (videoPlayer.paused) {
			videoButtonPlay.classList.remove('fa-pause');
			videoButtonPlay.classList.add('fa-play');
		} else {
			videoButtonPlay.classList.add('fa-pause');
			videoButtonPlay.classList.remove('fa-play');
		}
	};

	const togglePlay = () => {
		if (videoPlayer.paused) {
			videoPlayer.play();
		} else {
			videoPlayer.pause();
		}
	};

	const stopPlay = () => {
		videoPlayer.pause();
		videoPlayer.currentTime = 0;
	};

	const toggleTime = () => {
		const currentTime = videoPlayer.currentTime,
			duration = videoPlayer.duration;

		videoProgress.value = (currentTime / duration) * 100;

		const minutePassed = Math.floor(currentTime / 60),
			secondsPassed = Math.floor(currentTime % 60);

		const minuteTottal = Math.floor(duration / 60),
			secondsTottal = Math.floor(duration % 60);

		videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
		videoTimeTotal.textContent = `${addZero(minuteTottal)}:${addZero(secondsTottal)}`;
	};

	const toggleProgress = () => {
		const duration = videoPlayer.duration,
			value = videoProgress.value;

		videoPlayer.currentTime = (value * duration) / 100;
	};

	document.addEventListener('click', () => {
		const target = event.target;

		if (target.matches('.video-button__play') || target.matches('.video-player')) {
			togglePlay();
		}

		if (target.matches('.video-button__stop')) {
			stopPlay();
		}
	});

	videoProgress.addEventListener('change', toggleProgress);

	videoPlayer.addEventListener('play', toggleIcon);
	videoPlayer.addEventListener('pause', toggleIcon);
	videoPlayer.addEventListener('timeupdate', toggleTime);

	videoPlayerInit.stop = () => {
		if (!videoPlayer.paused) {
			stopPlay();
		}
	};

};
