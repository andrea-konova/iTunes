import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
	const audio = document.querySelector('.audio'),
		audioImg = document.querySelector('.audio-img'),
		audioHeader = document.querySelector('.audio-header'),
		audioPlayer = document.querySelector('.audio-player'),
		audioNavigation = document.querySelector('.audio-navigation'),
		audioButtonPlay = document.querySelector('.audio-button__play'),
		audioProgress = document.querySelector('.audio-progress'),
		audioProgressTiming = document.querySelector('.audio-progress__timing'),
		audioTimePassed = document.querySelector('.audio-time__passed'),
		audioTimeTotal = document.querySelector('.audio-time__total'),
		audioVolume = document.querySelector('.audio-volume');

	const playList = ['hello', 'flow', 'speed'];
	let trackIndex = 0;

	const loadTrack = () => {
		const isPlayed = audioPlayer.paused,
			track = playList[trackIndex];

		audioImg.src = `./audio/${track}.jpg`;
		audioHeader.textContent = track.toUpperCase();
		audioPlayer.src = `./audio/${track}.mp3`;

		if (isPlayed) {
			audioPlayer.pause();
		} else {
			audioPlayer.play();
		}
	};

	const prevTrack = () => {
		if (trackIndex !== 0) {
			trackIndex--;
		} else {
			trackIndex = playList.length - 1;
		}
		loadTrack();
	};

	const nextTrack = () => {
		if (trackIndex === playList.length - 1) {
			trackIndex = 0;
		} else {
			trackIndex++;
		}
		loadTrack();
	};

	const toggleTime = () => {
		const currentTime = audioPlayer.currentTime,
			duration = audioPlayer.duration,
			progress = (currentTime / duration) * 100;

		audioProgressTiming.style.width = progress + '%';

		const minutePassed = Math.floor(currentTime / 60) || '0',
			secondsPassed = Math.floor(currentTime % 60) || '0';

		const minuteTottal = Math.floor(duration / 60) || '0',
			secondsTottal = Math.floor(duration % 60) || '0';

		audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
		audioTimeTotal.textContent = `${addZero(minuteTottal)}:${addZero(secondsTottal)}`;
	};

	audioNavigation.addEventListener('click', event => {
		const target = event.target;


		if (target.classList.contains('audio-button__play')) {
			audio.classList.toggle('play');
			audioButtonPlay.classList.toggle('fa-play');
			audioButtonPlay.classList.toggle('fa-pause');

			if (audioPlayer.paused) {
				audioPlayer.play();
			} else {
				audioPlayer.pause();
			}
			const track = playList[trackIndex];
			audioHeader.textContent = track.toUpperCase();
		}

		if (target.classList.contains('audio-button__prev')) {
			prevTrack();
		}

		if (target.classList.contains('audio-button__next')) {
			nextTrack();
		}

	});

	audioPlayer.addEventListener('ended', () => {
		nextTrack();
		audioPlayer.play();
	});

	audioPlayer.addEventListener('timeupdate', toggleTime);

	audioProgress.addEventListener('click', event => {
		const x = event.offsetX,
			allWidht = audioProgress.clientWidth,
			progress = (x / allWidht) * audioPlayer.duration;

		audioPlayer.currentTime = progress;
	});

	audioVolume.addEventListener('input', () => {
		audioPlayer.volume = audioVolume.value / 100;
	});

	audioVolume.value = audioPlayer.volume * 100;

	musicPlayerInit.stop = () => {
		if (!audioPlayer.paused) {
			audioPlayer.pause();
			audio.classList.remove('play');
			audioButtonPlay.classList.remove('fa-pause');
			audioButtonPlay.classList.add('fa-play');
		}
	};

};
