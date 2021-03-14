/* Javascript */

var toggled = false;

const toggleButton = document.querySelector('.js-toggle-dark-mode');
	
toggleButton.addEventListener('click', function(event) {
	toggleDarkMode(this);
});

/**
* toggle body class on button click
* params - button
*/
toggleDarkMode = function(button) {

	const bodyClassInitial = button.dataset.bodyClassInitial;
	const bodyClassToggle = button.dataset.bodyClassToggle;
	const buttonClassInitial = button.dataset.buttonClassInitial;
	const buttonClassToggle = button.dataset.buttonClassToggle;
	const buttonTextInitial = button.dataset.buttonTextInitial;
	const buttonTextToggle = button.dataset.buttonTextToggle;

	if (toggled) {
		// untoggle - revert to initial state
		document.body.classList.remove(bodyClassToggle);
		document.body.classList.remove(bodyClassInitial);
		button.classList.remove(buttonClassToggle);
		button.classList.add(buttonClassInitial);
		button.textContent = buttonTextInitial;
		toggled = false;
	} else {
		// toggle
		document.body.classList.remove(bodyClassInitial);
		document.body.classList.add(bodyClassToggle);
		button.classList.remove(buttonClassInitial);
		button.classList.add(buttonClassToggle);
		button.textContent = buttonTextToggle;
		toggled = true;
	}
}

// On Window Load
// add loaded class
// window.onload = function() {
// 	document.getElementsByTagName('body')[0].className = 'loaded';
// };

// On Scroll
// window.onload = function() {

// 	const isDesktop = window.matchMedia("(min-width: 800px)");

// 	if (isDesktop.matches) {
// 		document.onscroll = function() {

// 			let scroll = window.scrollY;
// 			let columns = document.getElementsByClassName('col');

// 			if (scroll >= 0) {
// 				for (let i = 0; i < columns.length; i += 2) {
// 					columns[i].style.transform = 'translate3d(0, ' + 0.6 * scroll + 'px, 0)';
// 				}
// 				for (let j = 1; j < columns.length; j += 2) {
// 					columns[j].style.transform = 'translate3d(0, ' + 0.7 * scroll + 'px, 0)';
// 				}
// 			}
// 		}
// 	}
// }

// Fill progress bars on scroll
// function fillProgress(element, scroll) {

// 	let progressBar = document.querySelectorAll('.ui-progress')

// 	for (let i = 0; i < progressBar.length; i ++) {
// 		let initialProgress = getComputedStyle(progressBar[i]).width;

// 		if (isDesktop.matches) {
// 			document.onscroll = function() {
// 				progressBar[i].style.width = 'calc(' + initialProgress + ' + ' + scroll + '%)';
// 			}
// 		}
// 	}
// }
