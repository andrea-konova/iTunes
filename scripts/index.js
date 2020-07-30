import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn'),
	playerBlock = document.querySelectorAll('.player-block'),
	temp = document.querySelector('.temp');

document.addEventListener('click', () => {
	const target = event.target;

	if (target.matches('.player-btn')) {
		playerBtn.forEach((item, i) => {
			if (item === target) {
				item.classList.add('active');
				playerBlock[i].classList.add('active');
			} else {
				temp.style.display = 'none';
				item.classList.remove('active');
				playerBlock[i].classList.remove('active');

				musicPlayerInit.stop();
				radioPlayerInit.stop();
				videoPlayerInit.stop();
			}
		});
	}
});


radioPlayerInit();
musicPlayerInit();
videoPlayerInit();
