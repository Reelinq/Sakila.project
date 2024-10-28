const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const dbconfig = require("./dbconfig.json")
const connection = mysql.createConnection(dbconfig)

const app = express()
const port = 3000
const host = "localhost"

// Set the view engine to EJS and specify the views directory
app.set("view engine", "ejs")
app.set("views", __dirname + "/public/ejs")

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true }))

connection.connect()

// Route for the main page
app.get("/", (req, res) => {
	const query = `
		SELECT film.film_id, film.title, film.release_year, film.length, film.rating, language.name AS language, category.name AS category
		FROM film
		JOIN language ON film.language_id = language.language_id
		JOIN film_category ON film.film_id = film_category.film_id
		JOIN category ON film_category.category_id = category.category_id
		ORDER BY RAND()
	`
	// Execute the query and render the main page with the results
	connection.query(query, (err, results) => {
		if (err) throw err
		res.render("main-page", { films: results })
	})
})

// Route for the search functionality
app.get("/search", (req, res) => {
	const query = req.query.query || ""
	const languages = req.query.languages ? req.query.languages.split(",") : []
	const categories = req.query.categories ? req.query.categories.split(",") : []
	const yearRange = req.query.yearRange ? req.query.yearRange.split("-") : []
	const ratings = req.query.ratings ? req.query.ratings.split(",") : []
	const lengthRange = req.query.lengthRange ? req.query.lengthRange.split("-") : []

	let searchQuery = `
		SELECT film.film_id, film.title, film.release_year, film.length, film.rating, language.name AS language, category.name AS category
		FROM film
		JOIN language ON film.language_id = language.language_id
		JOIN film_category ON film.film_id = film_category.film_id
		JOIN category ON film_category.category_id = category.category_id
		WHERE film.title LIKE ?
	`

	const queryParams = [`%${query}%`]

	// Filters to the search query based on input
	if (languages.length > 0) {
		const languagePlaceholders = languages.map(() => "?").join(",")
		searchQuery += ` AND language.name IN (${languagePlaceholders})`
		queryParams.push(...languages)
	}

	if (categories.length > 0) {
		const categoryPlaceholders = categories.map(() => "?").join(",")
		searchQuery += ` AND category.name IN (${categoryPlaceholders})`
		queryParams.push(...categories)
	}

	if (yearRange.length === 2) {
		searchQuery += ` AND film.release_year BETWEEN ? AND ?`
		queryParams.push(yearRange[0], yearRange[1])
	}

	if (ratings.length > 0) {
		const ratingPlaceholders = ratings.map(() => "?").join(",")
		searchQuery += ` AND film.rating IN (${ratingPlaceholders})`
		queryParams.push(...ratings)
	}

	if (lengthRange.length === 2) {
		searchQuery += ` AND film.length BETWEEN ? AND ?`
		queryParams.push(lengthRange[0], lengthRange[1])
	}

	// Execute the search query and render search results page
	connection.query(searchQuery, queryParams, (err, results) => {
		if (err) throw err
		res.render("search", {
			films: results,
			searchQuery: query,
			selectedLanguages: req.query.languages || "",
			selectedCategories: req.query.categories || "",
			selectedYearRange: req.query.yearRange || "",
			selectedRatings: req.query.ratings || "",
			selectedLengthRange: req.query.lengthRange || "",
		})
	})
})

// Route for displaying a specific film's details
app.get("/film/:id", (req, res) => {
	const filmId = req.params.id
	const query = `
		SELECT film.*, language.name AS language, category.name AS category, actor.first_name, actor.last_name
		FROM film
		JOIN language ON film.language_id = language.language_id
		JOIN film_category ON film.film_id = film_category.film_id
		JOIN category ON film_category.category_id = category.category_id
		JOIN film_actor ON film.film_id = film_actor.film_id
		JOIN actor ON film_actor.actor_id = actor.actor_id
		WHERE film.film_id = ?
	`
	// Execute the query and render film details page
	connection.query(query, [filmId], (err, results) => {
		if (err) throw err
		if (results.length != 0) {
			const film = results[0]
			const actors = results.map((row) => ({
				first_name: row.first_name,
				last_name: row.last_name,
			}))
			res.render("film", { film, actors })
		} else {
			res.status(404).send("Film not found")
		}
	})
})

// Route for the checkout page
app.get("/checkout", (req, res) => {
	res.render("checkout")
})

// Route for processing payment
app.post("/process-payment", (req, res) => {
	const { firstName } = req.body
	res.render("payment-success", { firstName })
})

// Start the server
app.listen(port, host, () => console.log(`${host}:${port} is running...`))