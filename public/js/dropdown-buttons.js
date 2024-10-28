document.addEventListener("DOMContentLoaded", function () {
	const categoryButton = document.getElementById("category-dropdown-button")
	const categoryDropdown = document.getElementById("categoryDropdown")
	const categoryButtons = document.querySelectorAll(".category-button")

	const ratingButton = document.getElementById("rating-dropdown-button")
	const ratingDropdown = document.getElementById("ratingDropdown")
	const ratingButtons = document.querySelectorAll(".rating-button")

	const languageButton = document.getElementById("language-dropdown-button")
	const languageDropdown = document.getElementById("languageDropdown")
	const languageButtons = document.querySelectorAll(".language-button")

	// Function to close all dropdown menus
	function closeAllDropdowns() {
		categoryDropdown.style.display = "none"
		ratingDropdown.style.display = "none"
		languageDropdown.style.display = "none"
	}

	// Toggle the category dropdown menu
	categoryButton.addEventListener("click", function () {
		if (categoryDropdown.style.display === "block") {
			categoryDropdown.style.display = "none"
		} else {
			closeAllDropdowns()
			categoryDropdown.style.display = "block"
		}
	})

	// Same for rating
	ratingButton.addEventListener("click", function () {
		if (ratingDropdown.style.display === "block") {
			ratingDropdown.style.display = "none"
		} else {
			closeAllDropdowns()
			ratingDropdown.style.display = "block"
		}
	})

	// Same for language
	languageButton.addEventListener("click", function () {
		if (languageDropdown.style.display === "block") {
			languageDropdown.style.display = "none"
		} else {
			closeAllDropdowns()
			languageDropdown.style.display = "block"
		}
	})

	// Add event listeners to category buttons
	categoryButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const category = this.getAttribute("data-category")
			window.location.href = `http://localhost:3000/search?query=&languages=&categories=${category}&yearRange=&ratings=&lengthRange=`
		})
	})

	// Same for rating
	ratingButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const rating = this.getAttribute("data-rating")
			window.location.href = `http://localhost:3000/search?query=&languages=&categories=&yearRange=&ratings=${rating}&lengthRange=`
		})
	})

	// Same for language
	languageButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const language = this.getAttribute("data-language")
			window.location.href = `http://localhost:3000/search?query=&languages=${language}&categories=&yearRange=&ratings=&lengthRange=`
		})
	})
})