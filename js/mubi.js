
const filmList = document.querySelector('.film-list');
const userId = filmList.dataset.userId;
const limit = filmList.dataset.limit;
let page = 1;
let loadNew = true;

function requestRatings() {
	let requestURL = 'https://mubi.com/services/api/ratings?per_page=' + limit + '&page=' + page;
	if (userId) {
		requestURL += '&user_id=' + userId;
	}

	let request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		const ratings = request.response;
		populateFilmList(ratings);
		page += 2; // 1
	}
}

window.onload = function() {
	requestRatings();
}

window.onscroll = function() {
  if ((window.innerHeight + window.scrollY + 160) >= document.body.offsetHeight) {
		if (loadNew) {
			loadNew = false;
			requestRatings();
		}
  }
};

function populateFilmList(ratings) {
	for (let i = 0; i < ratings.length; i++) {

		// list item
		const film = document.createElement('li');
		film.classList.add('film')

		// film
		const filmTitle = document.createElement('h2');
		const filmTitleLink = document.createElement('a');
		const filmInfo = document.createElement('div');
		const filmYear = document.createElement('span');
		const filmDirector = document.createElement('ul');
		const filmDirectorBy = document.createElement('span');
		const filmImageWrapper = document.createElement('div');
		const filmImage = document.createElement('img');

		// film image
		filmImageWrapper.classList.add('film-image')
		filmImageWrapper.appendChild(filmImage);
		filmImage.src = ratings[i].film.stills.large;

		// film title
		filmTitle.classList.add('film-title');
		filmTitleLink.textContent = ratings[i].film.title;
		filmTitleLink.href = ratings[i].film.canonical_url;
		filmTitle.appendChild(filmTitleLink);

		// film year
		filmYear.classList.add('film-year');
		filmYear.textContent = ratings[i].film.year;

		// film directors
		const directors = ratings[i].film.directors;
		for (let j = 0; j < directors.length; j++) {
			const director = document.createElement('li');
			const directorLink = document.createElement('a');
			directorLink.textContent = directors[j].name;
			directorLink.href = directors[j].canonical_url;
			director.appendChild(directorLink);
			filmDirector.appendChild(director);
		}
		filmDirectorBy.classList.add('director-by');
		filmDirectorBy.textContent = 'Directed by ';
		filmDirector.classList.add('director-list');

		filmTitle.appendChild(filmTitleLink);

		filmInfo.classList.add('film-info');
		filmInfo.appendChild(filmTitle);
		filmInfo.appendChild(filmYear);
		// filmInfo.appendChild(filmDirectorBy);
		filmInfo.appendChild(filmDirector);

		// rating / review
		const rating = document.createElement('div');
		const author = document.createElement('a');
		const review = 	document.createElement('blockquote');

		// rating
		ratingNumber = parseInt(ratings[i].overall);

		// add stars
		for (let k = 0; k < ratingNumber; k++) {
			const ratingStar = document.createElement('span');
			ratingStar.classList.add('material-icons');
			ratingStar.textContent += 'star';
			rating.appendChild(ratingStar);
		}
		// add empty stars
		for (let l = 0; l < 5 - ratingNumber; l++) {
			const ratingStar = document.createElement('span');
			ratingStar.classList.add('material-icons');
			ratingStar.textContent += 'star_border';
			rating.appendChild(ratingStar);
		}

		film.classList.add('rating-' + ratingNumber);
		rating.classList.add('rating');

		// review
		review.textContent = ratings[i].body;
		review.classList.add('review');

		// only output reviews with words - no number-only reviews
		var regExp = /[a-zA-Z]/g;
		const hasReview = ratings[i].body && ratings[i].body.match(regExp)

		// author
		author.classList.add('author');
		author.textContent = ratings[i].user.name;
		author.href = ratings[i].user.canonical_url;

		// build page element

		// build film
		film.appendChild(filmImageWrapper);
		film.appendChild(filmInfo);
		// build review
		filmImageWrapper.appendChild(rating);
		// film.appendChild(author);
		if (hasReview) {
			film.appendChild(review);
		}
		// add to page
		filmList.appendChild(film);

		setTimeout(function() {
			film.classList.add('loaded');
		}, 500 + 50 * i);
	}
	loadNew = true;
}
