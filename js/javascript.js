/* Javascript */

// On Window Load
// add loaded class
// window.onload = function() {
// 	document.getElementsByTagName('body')[0].className = 'loaded';
// };

// On Scroll
window.onload = function() {

	const isDesktop = window.matchMedia("(min-width: 800px)");

	if (isDesktop.matches) {
		document.onscroll = function() {

			let scroll = window.scrollY;
			let columns = document.getElementsByClassName('col');

			if (scroll >= 0) {
				for (let i = 0; i < columns.length; i += 2) {
					columns[i].style.transform = 'translate3d(0, ' + 0.6 * scroll + 'px, 0)';
				}
				for (let j = 1; j < columns.length; j += 2) {
					columns[j].style.transform = 'translate3d(0, ' + 0.7 * scroll + 'px, 0)';
				}
			}
		}
	}
}
