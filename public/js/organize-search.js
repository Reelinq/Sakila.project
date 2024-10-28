document.addEventListener("DOMContentLoaded", function () {
	const filmsData = document.querySelector(".searchContent").getAttribute("data-films")
	const films = JSON.parse(filmsData)

	// Function to render films on the page
	function renderFilms(sortedFilms) {
		const filmContainer = document.querySelector(".searchFilmDiscovery")
		filmContainer.innerHTML = "" // Clear the container before rendering
		sortedFilms.forEach((film) => {
			const filmDiv = document.createElement("div")
			filmDiv.classList.add("film")
			filmDiv.innerHTML = `
				<a href="/film/${film.film_id}">
					<div class="film-text">
						<h3>${film.title} (${film.release_year})</h3>
						<p>${film.language} | ${film.category} | ${film.rating} | ${film.length} min</p>
					</div>
					<img src="/images/placeholder196x294.png" alt="Film Image">
				</a>
			`
			filmContainer.appendChild(filmDiv)
		})
	}

	// Event listener for sorting films alphabetically in ascending order
	document.getElementById("sortAlphabetAsc").addEventListener("click", function () {
		const sortedFilms = [...films].sort((a, b) => a.title.localeCompare(b.title))
		renderFilms(sortedFilms)
	})

	// Same for alphabetically in descending order
	document.getElementById("sortAlphabetDesc").addEventListener("click", function () {
		const sortedFilms = [...films].sort((a, b) => b.title.localeCompare(a.title))
		renderFilms(sortedFilms)
	})

	// Same for length in ascending order
	document.getElementById("sortLengthAsc").addEventListener("click", function () {
		const sortedFilms = [...films].sort((a, b) => a.length - b.length)
		renderFilms(sortedFilms)
	})

	// Same for length in descending order
	document.getElementById("sortLengthDesc").addEventListener("click", function () {
		const sortedFilms = [...films].sort((a, b) => b.length - a.length)
		renderFilms(sortedFilms)
	})

	// Same for release year in descending order (newest first)
	document.getElementById("sortNewest").addEventListener("click", function () {
		const sortedFilms = [...films].sort((a, b) => b.release_year - a.release_year)
		renderFilms(sortedFilms)
	})

	// Same for release year in ascending order (oldest first)
	document.getElementById("sortOldest").addEventListener("click", function () {
		const sortedFilms = [...films].sort((a, b) => a.release_year - b.release_year)
		renderFilms(sortedFilms)
	})
})