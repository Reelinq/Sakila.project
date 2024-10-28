document.addEventListener("DOMContentLoaded", function () {
	const cartButton = document.getElementById("cart-button")
	const cartPopup = document.getElementById("cart-popup")
	const checkoutButton = document.getElementById("checkout-button")
	const cartCount = document.getElementById("cart-count")
	const cartItems = document.getElementById("cart-items")
	const emptyCartMessage = document.getElementById("empty-cart-message")

	// Retrieve cart data or initialize an empty array
	let cartData = JSON.parse(localStorage.getItem("cartData")) || []

	// Function to update the cart count display
	function updateCartCount() {
		cartCount.textContent = cartData.reduce((total, item) => total + item.quantity, 0)
	}

	// Function to calculate the total amount of items in the cart
	function calculateTotalAmount() {
		return cartData.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
	}

	// Function to update the checkout button text with the total amount
	function updateCheckoutButton() {
		const totalAmount = calculateTotalAmount()
		checkoutButton.textContent = `Checkout - $${totalAmount}`
	}

	// Function to populate the cart items list
	function populateCartItems() {
		cartItems.innerHTML = ""
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
					updateCheckoutButton()
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
						// Remove item from cart if quantity is zero or less
						cartData = cartData.filter((item) => item.id !== filmId)
					}
					saveCartData()
					updateCartCount()
					populateCartItems()
					updateCheckoutButton()
				}
			})
		})
	}

	// Function to save cart data
	function saveCartData() {
		localStorage.setItem("cartData", JSON.stringify(cartData))
	}

	// Event listener for the cart button to toggle the cart popup
	cartButton.addEventListener("click", function () {
		if (cartData.length === 0) {
			// Show empty cart message and disable checkout button if cart is empty
			emptyCartMessage.style.display = "block"
			checkoutButton.disabled = true
		} else {
			// Hide empty cart message and enable checkout button if cart has items
			emptyCartMessage.style.display = "none"
			checkoutButton.disabled = false
		}
		// Toggle the display of the cart popup
		cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block"
	})

	// Event listener for the checkout button
	checkoutButton.addEventListener("click", function () {
		if (!checkoutButton.disabled) {
			window.location.href = "/checkout"
		}
	})

	// Initial population of cart items, cart count, and checkout button
	updateCartCount()
	populateCartItems()
	updateCheckoutButton()
})