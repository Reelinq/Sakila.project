document.addEventListener("DOMContentLoaded", function () {
	const cartCount = document.getElementById("cart-count")
	const addToCartButtons = document.querySelectorAll(".add-to-cart")
	const cartItems = document.getElementById("cart-items")
	const emptyCartMessage = document.getElementById("empty-cart-message")
	const checkoutButton = document.getElementById("checkout-button")

	// Retrieve cart data or initialize an empty array
	let cartData = JSON.parse(localStorage.getItem("cartData")) || []

	// Function to update the cart count display
	function updateCartCount() {
		cartCount.textContent = cartData.reduce((total, item) => total + item.quantity, 0)
	}

	// Function to save cart data
	function saveCartData() {
		localStorage.setItem("cartData", JSON.stringify(cartData))
	}

	// Function to calculate the total price of items in the cart
	function calculateTotalPrice() {
		return cartData.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
	}

	// Function to populate the cart items list and update the checkout button
	function populateCartItems() {
		cartItems.innerHTML = ""
		if (cartData.length === 0) {
			// Show empty cart message and disable checkout button if cart is empty
			emptyCartMessage.style.display = "block"
			checkoutButton.disabled = true
			checkoutButton.textContent = "Checkout - $0.00"
		} else {
			// Hide empty cart message and enable checkout button if cart has items
			emptyCartMessage.style.display = "none"
			checkoutButton.disabled = false
			checkoutButton.textContent = `Checkout - $${calculateTotalPrice()}`
			cartData.forEach((item) => {
				// Create list item for each cart item
				const li = document.createElement("li")
				li.style.display = "flex"
				li.style.justifyContent = "space-between"
				li.style.alignItems = "center"
				li.innerHTML = `
					<span>${item.title} - $${item.price}</span>
					<div>
						<button class="decrement" data-film-id="${item.id}">-</button>
						<span class="item-quantity">${item.quantity}</span>
						<button class="increment" data-film-id="${item.id}">+</button>
					</div>
				`
				cartItems.appendChild(li)
			})

			// Add event listeners to increment buttons
			document.querySelectorAll(".increment").forEach((button) => {
				button.addEventListener("click", function () {
					const filmId = this.getAttribute("data-film-id")
					const item = cartData.find((item) => item.id === filmId)
					if (item) {
						item.quantity += 1
						saveCartData()
						updateCartCount()
						populateCartItems()
					}
				})
			})

			// Same for decrement
			document.querySelectorAll(".decrement").forEach((button) => {
				button.addEventListener("click", function () {
					const filmId = this.getAttribute("data-film-id")
					const item = cartData.find((item) => item.id === filmId)
					if (item) {
						item.quantity -= 1
						if (item.quantity <= 0) {
							// Remove item from cart if quantity is zero
							cartData = cartData.filter((item) => item.id !== filmId)
						}
						saveCartData()
						updateCartCount()
						populateCartItems()
					}
				})
			})
		}
	}

	// Add event listeners to "Add to cart" button
	addToCartButtons.forEach((button) => {
		button.addEventListener("click", function () {
			if (button.disabled) return

			const filmId = this.getAttribute("data-film-id")
			const filmTitle = this.getAttribute("data-film-title")
			const filmPrice = parseFloat(this.getAttribute("data-film-rental-rate"))
			const existingItem = cartData.find((item) => item.id === filmId)

			if (existingItem) {
				// Increment quantity if item already exists in cart
				existingItem.quantity += 1
			} else {
				// Add new item to cart
				cartData.push({ id: filmId, title: filmTitle, price: filmPrice, quantity: 1 })
			}

			saveCartData()
			updateCartCount()
			populateCartItems()

			// Temporarily disable button and change text to "Added!"
			button.textContent = "Added!"
			button.disabled = true
			button.style.cursor = "default"
			setTimeout(() => {
				button.textContent = "Add to cart"
				button.disabled = false
				button.style.cursor = "pointer"
			}, 3000)
		})
	})

	// Initial population of cart items and cart count
	updateCartCount()
	populateCartItems()
})