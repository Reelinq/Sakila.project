var languageModal = document.getElementById("languageModal")
var categoryModal = document.getElementById("categoryModal")
var yearModal = document.getElementById("yearModal")
var ratingModal = document.getElementById("ratingModal")
var lengthModal = document.getElementById("lengthModal")

var languageBtn = document.getElementById("languageButton")
var categoryBtn = document.getElementById("categoryButton")
var yearBtn = document.getElementById("yearButton")
var ratingBtn = document.getElementById("ratingButton")
var lengthBtn = document.getElementById("lengthButton")

// Function to close all modals
function closeAllModals() {
	languageModal.style.display = "none"
	categoryModal.style.display = "none"
	yearModal.style.display = "none"
	ratingModal.style.display = "none"
	lengthModal.style.display = "none"
}

// Function to update checkboxes in modals based on selected values
function updateModalCheckboxes(type) {
	var selectedValues =
		type === "language"
			? selectedLanguagesInput.value.split(",")
			: type === "category"
			? selectedCategoriesInput.value.split(",")
			: selectedRatingsInput.value.split(",")
	var checkboxes = document.querySelectorAll('input[name="' + type + '"]')
	checkboxes.forEach((checkbox) => {
		checkbox.checked = selectedValues.includes(checkbox.value)
	})
}

// Function to toggle the display of a modal
function toggleModal(modal, button) {
	if (modal.style.display === "block") {
		modal.style.display = "none"
	} else {
		closeAllModals()
		var rect = button.getBoundingClientRect()
		modal.style.top = rect.bottom + "px"
		modal.style.left = rect.left + "px"
		modal.style.display = "block"
	}
}

// Event listeners for buttons to toggle modals and update checkboxes
languageBtn.onclick = function () {
	toggleModal(languageModal, languageBtn)
	updateModalCheckboxes("language")
}

categoryBtn.onclick = function () {
	toggleModal(categoryModal, categoryBtn)
	updateModalCheckboxes("category")
}

yearBtn.onclick = function () {
	toggleModal(yearModal, yearBtn)
}

ratingBtn.onclick = function () {
	toggleModal(ratingModal, ratingBtn)
	updateModalCheckboxes("rating")
}

lengthBtn.onclick = function () {
	toggleModal(lengthModal, lengthBtn)
}

var closeButtons = document.getElementsByClassName("close")

// Event listeners for close buttons to close their respective modals
for (var i = 0; i < closeButtons.length; i++) {
	closeButtons[i].onclick = function () {
		this.parentElement.parentElement.style.display = "none"
	}
}

// Event listener to close modals when clicking outside of them
window.onclick = function (event) {
	if (event.target == languageModal) {
		languageModal.style.display = "none"
	} else if (event.target == categoryModal) {
		categoryModal.style.display = "none"
	} else if (event.target == yearModal) {
		yearModal.style.display = "none"
	} else if (event.target == ratingModal) {
		ratingModal.style.display = "none"
	} else if (event.target == lengthModal) {
		lengthModal.style.display = "none"
	}
}

var applyLanguageBtn = document.getElementById("applyLanguages")
var applyCategoryBtn = document.getElementById("applyCategories")
var applyYearRangeBtn = document.getElementById("applyYearRange")
var applyRatingsBtn = document.getElementById("applyRatings")
var applyLengthRangeBtn = document.getElementById("applyLengthRange")

var selectedLanguagesInput = document.getElementById("selectedLanguages")
var selectedCategoriesInput = document.getElementById("selectedCategories")
var selectedYearRangeInput = document.getElementById("selectedYearRange")
var selectedRatingsInput = document.getElementById("selectedRatings")
var selectedLengthRangeInput = document.getElementById("selectedLengthRange")

var yearRangeMin = document.getElementById("yearRangeMin")
var yearRangeMax = document.getElementById("yearRangeMax")
var fromYear = document.getElementById("fromYear")
var toYear = document.getElementById("toYear")

var lengthRangeMin = document.getElementById("lengthRangeMin")
var lengthRangeMax = document.getElementById("lengthRangeMax")
var fromLength = document.getElementById("fromLength")
var toLength = document.getElementById("toLength")

// Event listener for applying selected languages
applyLanguageBtn.onclick = function () {
	var selectedLanguages = []
	var checkboxes = document.querySelectorAll('input[name="language"]:checked')
	checkboxes.forEach((checkbox) => {
		selectedLanguages.push(checkbox.value)
	})
	selectedLanguagesInput.value = selectedLanguages.join(",")
	languageModal.style.display = "none"
	updateSelectedCriteria()
}

// Same for categories
applyCategoryBtn.onclick = function () {
	var selectedCategories = []
	var checkboxes = document.querySelectorAll('input[name="category"]:checked')
	checkboxes.forEach((checkbox) => {
		selectedCategories.push(checkbox.value)
	})
	selectedCategoriesInput.value = selectedCategories.join(",")
	categoryModal.style.display = "none"
	updateSelectedCriteria()
}

// Same for year range
applyYearRangeBtn.onclick = function () {
	selectedYearRangeInput.value = yearRangeMin.value + "-" + yearRangeMax.value
	yearModal.style.display = "none"
	updateSelectedCriteria()
}

// Same for ratings
applyRatingsBtn.onclick = function () {
	var selectedRatings = []
	var checkboxes = document.querySelectorAll('input[name="rating"]:checked')
	checkboxes.forEach((checkbox) => {
		selectedRatings.push(checkbox.value)
	})
	selectedRatingsInput.value = selectedRatings.join(",")
	ratingModal.style.display = "none"
	updateSelectedCriteria()
}

// Same for length range
applyLengthRangeBtn.onclick = function () {
	selectedLengthRangeInput.value = lengthRangeMin.value + "-" + lengthRangeMax.value
	lengthModal.style.display = "none"
	updateSelectedCriteria()
}

// Event listeners for updating year range display
yearRangeMin.oninput = yearRangeMax.oninput = function () {
	fromYear.innerText = yearRangeMin.value
	toYear.innerText = yearRangeMax.value
}

// Same for length range display
lengthRangeMin.oninput = lengthRangeMax.oninput = function () {
	fromLength.innerText = lengthRangeMin.value
	toLength.innerText = lengthRangeMax.value
}

var selectedCriteriaContainer = document.getElementById("selectedCriteria")

// Function to update the display of selected criteria
function updateSelectedCriteria() {
	selectedCriteriaContainer.innerHTML = ""
	var selectedLanguages = selectedLanguagesInput.value.split(",")
	var selectedCategories = selectedCategoriesInput.value.split(",")
	var selectedYearRange = selectedYearRangeInput.value
	var selectedRatings = selectedRatingsInput.value.split(",")
	var selectedLengthRange = selectedLengthRangeInput.value

	// Display selected languages
	selectedLanguages.forEach((language) => {
		if (language) {
			var criteriaBox = document.createElement("div")
			criteriaBox.className = "criteria-box"
			criteriaBox.innerHTML =
				language +
				' <span class="remove-criteria" data-type="language" data-value="' +
				language +
				'">x</span>'
			selectedCriteriaContainer.appendChild(criteriaBox)
		}
	})

	// Display selected categories
	selectedCategories.forEach((category) => {
		if (category) {
			var criteriaBox = document.createElement("div")
			criteriaBox.className = "criteria-box"
			criteriaBox.innerHTML =
				category +
				' <span class="remove-criteria" data-type="category" data-value="' +
				category +
				'">x</span>'
			selectedCriteriaContainer.appendChild(criteriaBox)
		}
	})

	// Display selected year range
	if (selectedYearRange) {
		var criteriaBox = document.createElement("div")
		criteriaBox.className = "criteria-box"
		criteriaBox.innerHTML =
			selectedYearRange +
			' <span class="remove-criteria" data-type="yearRange" data-value="' +
			selectedYearRange +
			'">x</span>'
		selectedCriteriaContainer.appendChild(criteriaBox)
	}

	// Display selected ratings
	selectedRatings.forEach((rating) => {
		if (rating) {
			var criteriaBox = document.createElement("div")
			criteriaBox.className = "criteria-box"
			criteriaBox.innerHTML =
				rating +
				' <span class="remove-criteria" data-type="rating" data-value="' +
				rating +
				'">x</span>'
			selectedCriteriaContainer.appendChild(criteriaBox)
		}
	})

	// Display selected length range
	if (selectedLengthRange) {
		var criteriaBox = document.createElement("div")
		criteriaBox.className = "criteria-box"
		criteriaBox.innerHTML =
			selectedLengthRange +
			" min" +
			' <span class="remove-criteria" data-type="lengthRange" data-value="' +
			selectedLengthRange +
			'">x</span>'
		selectedCriteriaContainer.appendChild(criteriaBox)
	}

	// Add event listeners to remove selected criteria
	var removeButtons = document.querySelectorAll(".remove-criteria")
	removeButtons.forEach((button) => {
		button.onclick = function () {
			var type = this.getAttribute("data-type")
			var value = this.getAttribute("data-value")
			if (type === "language") {
				var selectedLanguages = selectedLanguagesInput.value.split(",")
				selectedLanguages = selectedLanguages.filter((lang) => lang !== value)
				selectedLanguagesInput.value = selectedLanguages.join(",")
			} else if (type === "category") {
				var selectedCategories = selectedCategoriesInput.value.split(",")
				selectedCategories = selectedCategories.filter((cat) => cat !== value)
				selectedCategoriesInput.value = selectedCategories.join(",")
			} else if (type === "yearRange") {
				selectedYearRangeInput.value = ""
			} else if (type === "rating") {
				var selectedRatings = selectedRatingsInput.value.split(",")
				selectedRatings = selectedRatings.filter((rat) => rat !== value)
				selectedRatingsInput.value = selectedRatings.join(",")
			} else if (type === "lengthRange") {
				selectedLengthRangeInput.value = ""
			}
			updateSelectedCriteria()
		}
	})
}

// Initialize the selected criteria and update checkboxes when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
	updateSelectedCriteria()
	updateModalCheckboxes("language")
	updateModalCheckboxes("category")
	updateModalCheckboxes("rating")
})