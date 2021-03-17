
const filmList = document.querySelector('.film-list');

const userId = filmList.dataset.userId
const limit = filmList.dataset.limit

let requestURL = 'https://mubi.com/services/api/ratings?per_page=' + limit
if (userId) {
	requestURL += '&user_id=' + userId
}
let request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

console.log(requestURL);

request.onload = function() {
	const reviews = request.response;
	showFilms(reviews);
}

function showFilms(obj) {
	const ratings = obj;

	for (let i = 0; i < ratings.length; i++) {

		// list item
		const film = document.createElement('li');

		// film
		const filmTitle = document.createElement('a');
		const filmYear = document.createElement('span');
		const filmDirector = document.createElement('ul');
		const filmDirectorIntro = document.createElement('span');
		const filmImageWrapper = document.createElement('div');
		const filmImage = document.createElement('img');

		const directors = ratings[i].film.directors;
		for (let j = 0; j < directors.length; j++) {
			const director = document.createElement('li');
			const directorLink = document.createElement('a');
			directorLink.textContent = directors[j].name;
			directorLink.href = directors[j].canonical_url;
			director.appendChild(directorLink);
			filmDirector.appendChild(director);
		}

		filmTitle.textContent = ratings[i].film.title;
		filmYear.textContent = ratings[i].film.year;
		filmTitle.href = ratings[i].film.canonical_url;

		filmDirectorIntro.textContent = 'Directed by ';
		filmDirector.classList.add('director-list');

		filmImageWrapper.classList.add('film-image')
		filmImageWrapper.appendChild(filmImage);
		filmImage.src = ratings[i].film.stills.medium;

		// rating
		const review = 	document.createElement('blockquote');
		const rating = document.createElement('div');

		var regExp = /[a-zA-Z]/g;
		if (ratings[i].body && ratings[i].body.match(regExp)) {
			// only output reviews with words - no number-only reviews
			review.textContent = ratings[i].body;
		}
		rating.textContent = ratings[i].overall + ' / 5';

		film.appendChild(filmImageWrapper);
		film.appendChild(filmTitle);
		film.appendChild(filmDirectorIntro);
		film.appendChild(filmDirector);
		film.appendChild(filmYear);

		film.appendChild(rating);
		film.appendChild(review);

		filmList.appendChild(film);
	}
}
