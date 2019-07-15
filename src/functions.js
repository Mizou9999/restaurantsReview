import noUiSlider from "nouislider"
import "nouislider/distribute/nouislider.css"
import { newRestaurants } from "./map"

// generate Avrage RESTAURANT Rating function (FOR THE JSON RESTAURANTS)
export function generateAvrageRating(restaurant) {
	function getSum(val1, val2) {
		return val1 + val2
	}
	let starsArray = []
	restaurant.ratings.forEach(star => {
		let starPoints = star.stars
		starsArray.push(starPoints)
	})
	let totalRating = starsArray.reduce(getSum)
	let avrageRate = totalRating / starsArray.length
	return avrageRate
}

let starContainer
// generate unique id
export function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)
	}
	return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4()
	)
}
// add restaurants to the div on the RIGHT SIDE
export function addRestaurant(restaurant, back, restaurantBigDiv) {
	if (back == null) {
		const backBtn = document.getElementById("backBtn")
		backBtn.addEventListener("click", function () {
			const oneRestaurantDiv = document.getElementById("restaurants-div")
			const commentsDiv = document.getElementById("comments")
			oneRestaurantDiv.classList.remove("d-none")
			commentsDiv.innerHTML = ""
			commentsDiv.classList.add("d-none")
			backBtn.classList.add("d-none")
			let searchArea = document.getElementById("searchArea")
			searchArea.classList.remove("d-none")
		})
	}

	let stars
	if (stars) {
		stars = restaurant.stars
	} else {
		stars = restaurant.avrageRating
	}
	let restaurantName = restaurant.restaurantName,
		restaurantAdress = restaurant.address,
		oneRestaurantDiv = document.getElementById("restaurants-div"),
		restaurantDiv = document.createElement("div"),
		restaurantPictureDiv = document.createElement("div"),
		img = document.createElement("img"),
		restaurantDetailDiv = document.createElement("div"),
		buttonDetails = document.createElement("button"),
		divTitle = `<h4 class = "card-title font-weight-bold"> ${restaurantName} </h4> `,
		divAdressSection = `<p class = "card-title text-muted"> ${restaurantAdress} </p> `,
		divRatingSection = `<p class = ""> Rating : ${stars} </p> `,
		divParagraphSection = `<p class = "card-text"> Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  </p> `

	restaurantDiv.classList.add(
		"joker",
		"row",
		"pb-2",
		"mt-4",
		"pt-2",
		"border-bottom"
	)
	restaurantDiv.setAttribute("id", restaurant.id)
	restaurantPictureDiv.classList.add("col-lg-4")
	if (restaurant.photoRestaurant) {
		img.src = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${
			restaurant.photoRestaurant
			}&key=AIzaSyAyPeFfGWQ4_5NJ5VcIQOPCfo24i0u3JMQ`
	} else {
		img.src = restaurant.imgSrc
	}
	img.classList.add("img-fluid")
	buttonDetails.classList.add("btn", "btn-primary", "details")
	buttonDetails.innerText = "More details"
	restaurantDetailDiv.classList.add("col-lg-5")

	restaurantDetailDiv.innerHTML = divTitle
	restaurantDetailDiv.innerHTML += divAdressSection
	restaurantDetailDiv.innerHTML += divRatingSection
	restaurantDetailDiv.innerHTML += divParagraphSection

	// click details to show the div
	buttonDetails.addEventListener("click", function () {
		// fetching data to get random user
		let url = "https://randomuser.me/api/?results=5"
		let randomPersons = []
		let randomUser
		fetch(url)
			.then(data => data.json())
			.then(persons => {
				randomPersons.push(...persons.results)
				randomUser =
					randomPersons[Math.floor(Math.random() * randomPersons.length)]
				displayRestaurantDetails(restaurant)
				console.log(restaurant)

				backBtn.classList.remove("d-none")
				commentForm(restaurant)
				displayComments(
					restaurant,
					randomUser.name.first,
					randomUser.picture.thumbnail
				)
				oneRestaurantDiv.classList.add("d-none")
				let searchArea = document.getElementById("searchArea")
				searchArea.classList.add("d-none")
			})
			.catch(error => {
				console.log(error)
			})
	})

	//appending childs
	restaurantDetailDiv.appendChild(buttonDetails)
	restaurantPictureDiv.appendChild(img)
	restaurantDiv.appendChild(restaurantPictureDiv)
	restaurantDiv.appendChild(restaurantDetailDiv)
	if (oneRestaurantDiv !== null) {
		oneRestaurantDiv.appendChild(restaurantDiv)
	} else {
		oneRestaurantDiv = restaurantBigDiv
	}
}

// display picture and restaurant name and rating function
export function displayRestaurantDetails(restaurant) {
	let avrageRating = generateAvrageRating(restaurant)
	const commentsDiv = document.getElementById("comments")
	commentsDiv.classList.add(
		"container",
		"text-center",
		"principal",
		"border",
		"rounded",
		"border",
		"mt-2"
	)
	commentsDiv.classList.remove("d-none")
	// creating restaurant picture
	const photoRow = document.createElement("div")
	photoRow.classList.add("row", "py-2", "myrow")

	const photoDiv = document.createElement("div")
	photoDiv.classList.add("col-lg-6", "picContainer")

	const restaurantPhoto = document.createElement("img")
	restaurantPhoto.classList.add(
		"col-lg-4",
		"border",
		"border-primary",
		"p-0",
		"mx-2"
	)

	if (restaurant.photoRestaurant) {
		restaurantPhoto.src = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${
			restaurant.photoRestaurant
			}&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw`
	} else {
		restaurantPhoto.src = restaurant.imgSrc
	}

	photoRow.appendChild(restaurantPhoto)
	commentsDiv.appendChild(photoRow)
	// creating restaurant rating, name and adress
	const restaurantDetail = document.createElement("div")
	restaurantDetail.id = "restaurantDetailId"
	restaurantDetail.classList.add("col-lg-7", "ineed")

	const name = document.createElement("h1")
	name.classList.add("text-primary", "text-center")
	name.innerText = restaurant.restaurantName

	const adress = document.createElement("p")
	adress.classList.add("text-muted", "text-center")
	adress.innerHTML =
		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse praesentium illum omnis optio cumque! Qui corrupti ipsum nihil odio! Et placeat quibusdam iusto eius blanditiis architecto nam ea corporis minima!"

	const rating = document.createElement("div")
	rating.classList.add("col-lg-6", "mx-auto")
	starsCreate({ clickable: true, rating: avrageRating })
	rating.appendChild(starContainer)
	rating.innerHTML += avrageRating

	//check if restaurant is open
	let openStatus
	if (restaurant.openNow == true) {
		openStatus = `<span class='text-success'> Open</span>`
	} else {
		openStatus = `<span class='text-danger'> Closed</span>`
	}
	// check if the phone Number is aviable
	let localphoneNumber
	if (localphoneNumber) {
		localphoneNumber = restaurant.localPhone
	} else {
		localphoneNumber = "Local Phone Unavaible!"
	}
	let interPhoneNumber
	if (interPhoneNumber) {
		interPhoneNumber = restaurant.internationalPhone
	} else {
		interPhoneNumber = "InterNational Phone Unavaible!"
	}

	const description = document.createElement("div")
	description.innerHTML = `
    <ul class="list-group list-group-flush">
    <li class="list-group-item"><p > <span class='font-weight-bold text-muted '>Restaurant Adress : </span> ${
		restaurant.address
		}</p></li>
    <li class="list-group-item"><p > <span class='font-weight-bold text-muted '>Local Phone Number : </span> ${localphoneNumber}</p>
    <p > <span class='font-weight-bold text-muted'>International Phone Number : </span> ${interPhoneNumber}</p></li>
    <li class="list-group-item"><p > <span class='font-weight-bold text-muted'>Restaurant Status : </span> ${openStatus}</p></li>
    <li class="list-group-item"><p > <span class='font-weight-bold text-muted'>Website : </span> <a class='link' href='${
		restaurant.website
		}' target="_blank">${restaurant.restaurantName}</a></p></li>   
  </ul>`

	restaurantDetail.appendChild(name)
	restaurantDetail.appendChild(adress)
	restaurantDetail.appendChild(rating)
	restaurantDetail.appendChild(description)
	photoRow.appendChild(restaurantDetail)
}

export function placeMarkerOnRightClick(latLng, map) {
	let marker = new google.maps.Marker({
		position: latLng,
		map: map
	})
	// create the Card div
	const id = `thisIs${guid()}`
	const card = document.createElement("div")
	card.classList.add("card")
	card.id = `thisIs${guid()}`
	card.style.width = "18rem"

	const header = document.createElement("div")
	header.classList.add("card-head", "text-center", "text-white", "bg-danger")
	header.innerText = "ADD NEW RESTAURANT"
	card.appendChild(header)

	const ul = document.createElement("ul")
	ul.classList.add("list-group", "list-group-flush")
	card.appendChild(ul)

	const firstLi = document.createElement("li")
	firstLi.classList.add("list-group-item")
	const formGroupOne = document.createElement("div")
	formGroupOne.classList.add("formGroup")
	firstLi.appendChild(formGroupOne)
	const labelOne = document.createElement("label")
	labelOne.setAttribute("for", "exampleFormControlInput1")
	labelOne.innerText = "Enter Restaurant Name:"
	formGroupOne.appendChild(labelOne)
	const inputOne = document.createElement("input")
	inputOne.setAttribute("type", "text")
	inputOne.classList.add("form-control")
	inputOne.id = "exampleFormControlInput1"
	inputOne.placeholder = "restaurant name.."
	formGroupOne.appendChild(inputOne)

	const secondLi = document.createElement("li")
	secondLi.classList.add("list-group-item")
	const formGroupTwo = document.createElement("div")
	formGroupTwo.classList.add("formGroup")
	secondLi.appendChild(formGroupTwo)
	const labelTwo = document.createElement("label")
	labelTwo.setAttribute("for", "exampleFormControlInput2")
	labelTwo.innerText = "Enter Restaurant Adress:"
	formGroupTwo.appendChild(labelTwo)
	const inputTwo = document.createElement("input")
	inputTwo.setAttribute("type", "text")
	inputTwo.classList.add("form-control")
	inputTwo.id = "exampleFormControlInput2"
	inputTwo.placeholder = "restaurant adress.."
	formGroupTwo.appendChild(inputTwo)

	const thirdLi = document.createElement("li")
	thirdLi.classList.add("list-group-item")
	const formGroupThree = document.createElement("div")
	formGroupThree.classList.add("formGroup")
	thirdLi.appendChild(formGroupThree)
	const labelThree = document.createElement("label")
	labelThree.setAttribute("for", "exampleFormControlInput3")
	labelThree.innerText = "Enter Telephone Number:"
	formGroupThree.appendChild(labelThree)
	const inputThree = document.createElement("input")
	inputThree.setAttribute("type", "tel")
	inputThree.setAttribute("pattern", "[0-9]{3}-[0-9]{2}-[0-9]{3}")
	inputThree.classList.add("form-control")
	inputThree.id = "exampleFormControlInput3"
	inputThree.placeholder = "phone number.."
	formGroupThree.appendChild(inputThree)

	ul.appendChild(firstLi)
	ul.appendChild(secondLi)
	ul.appendChild(thirdLi)

	const btn = document.createElement("button")
	btn.id = "add-btn"
	btn.classList.add("btn", "btn-primary", "details")
	btn.innerText = "Add Now!"
	card.appendChild(btn)

	btn.addEventListener("click", function () {
		if (isNaN(inputThree.value)) {
			inputThree.innerHTML = "please inter a valid phone number"
			return
		} else {
		}
		let newRestaurant = {}
		newRestaurant.restaurantName = inputOne.value
		newRestaurant.address = inputTwo.value
		newRestaurant.localPhone = inputThree.value
		const principal = document.getElementById("principal")
		const alertDiv = document.createElement("div")
		alertDiv.classList.add("alert", "alert-success", "fade", "show")
		alertDiv.setAttribute("role", "alert")
		alertDiv.setAttribute("data-dismiss", "alert")
		alertDiv.innerHTML = `<strong>Thank you for Adding ${
			newRestaurant.restaurantName
			}!</strong> </br> Restaurant Adress : ${
			newRestaurant.address
			} </br> Restaurant Phone : ${newRestaurant.localPhone}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">Close</span>
        </button>`
		principal.prepend(alertDiv)
	})

	const infowindow = new google.maps.InfoWindow({
		// content: restaurantForm
		content: card
	})
	marker.addListener("click", function () {
		infowindow.open(map, marker)
		console.log(infowindow.getContent())
	})
}

// display Comments function
export function displayComments(element, username, picture) {
	// random date
	let day = Math.floor(Math.random() * 30 + 1)
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	]
	let month = months[Math.floor(Math.random() * months.length)]
	let hour = Math.floor(Math.random() * 24 + 1)
	let minute = Math.floor(Math.random() * 60 + 1)
	const commentsDiv = document.getElementById("comments")
	const commentRow = document.createElement("div")
	commentRow.classList.add("container", "my-4")
	commentRow.id = "zkimi"

	element.ratings.forEach(rating => {
		// creating the comments div
		const commentSection = document.createElement("div")
		commentSection.classList.add("row")
		const avatarCol = document.createElement("div")
		avatarCol.classList.add("col-lg-2", "text-center", "mr-3")

		const avatarLink = document.createElement("a")
		avatarLink.href = "#none"

		const avatar = document.createElement("img")
		avatar.src = picture
		avatar.classList.add("rounded-circle", "border", "border-primary")

		const avatarName = document.createElement("p")
		avatarName.innerText = username
		avatarName.classList.add("text-center")

		const commentContentDiv = document.createElement("div")
		commentContentDiv.classList.add(
			"col-lg-8",
			"flex-column",
			"d-flex",
			"bg-light",
			"rounded",
			"mb-3",
			"py-2",
			"bg-white",
			"border-primary",
			"shadow-sm"
		)

		const commentContent = document.createElement("p")
		commentContent.innerText = rating.stars
		commentContent.innerHTML += `<br> ${rating.comment}`

		const dateDiv = document.createElement("div")
		dateDiv.classList.add(
			"d-flex",
			"flex-column",
			"flex-grow-1",
			"align-self-end",
			"justify-content-end"
		)

		const commentDate = document.createElement("span")
		commentDate.classList.add("text-muted")
		commentDate.innerText = `${month + " " + day}, 2019 @ ${hour}:${minute}`

		// appending everything in order
		avatarLink.appendChild(avatar)
		avatarLink.appendChild(avatarName)
		avatarCol.appendChild(avatarLink)

		commentSection.appendChild(avatarCol)
		commentContentDiv.appendChild(commentContent)
		dateDiv.appendChild(commentDate)
		commentContentDiv.appendChild(dateDiv)
		commentSection.appendChild(commentContentDiv)
		commentRow.appendChild(commentSection)
		commentsDiv.appendChild(commentRow)
	})
}

// display new comment function
export function displayNewComment(username, comment) {
	const commentsHolder = document.getElementById("zkimi")
	console.log(commentsHolder)
	// random date
	let commentArea = document.getElementById("commentText")

	let userId = document.getElementById("userName")
	if (username == "") {
		userId.placeholder = "enter a valid name"
		userId.classList.add("border", "border-danger")
		return
	} else {
		userId.classList.remove("border", "border-danger")
	}

	if (comment == "") {
		commentArea.placeholder = "Say what you think !!!"
		commentArea.classList.add("border", "border-danger")
		return
	} else {
		commentArea.classList.remove("border", "border-danger")
	}

	// creating the comments div
	const commentSectionRow = document.createElement("div")
	commentSectionRow.id = "newComment"
	commentSectionRow.classList.add("row")

	const avatarCol = document.createElement("div")
	avatarCol.classList.add("col-lg-2", "text-center", "mr-3")

	const avatarLink = document.createElement("a")
	avatarLink.href = "#none"

	const avatar = document.createElement("img")
	avatar.src = "https://source.unsplash.com/60x60/?random"
	avatar.classList.add("rounded-circle", "border", "border-primary")

	const avatarName = document.createElement("p")
	avatarName.innerText = username
	avatarName.classList.add("text-center")

	const commentContentDiv = document.createElement("div")
	commentContentDiv.classList.add(
		"col-lg-8",
		"flex-column",
		"d-flex",
		"bg-light",
		"rounded",
		"mb-3",
		"py-2",
		"bg-white",
		"border-primary",
		"shadow-sm"
	)

	const commentContent = document.createElement("p")
	commentContent.innerText = comment
	let starDiv = document.createElement("div")
	//starDiv.innerHTML = starValue
	let combo = starsCreate({ clickable: true, rating: starValue })
	starDiv.appendChild(combo)
	const dateDiv = document.createElement("div")
	dateDiv.classList.add(
		"d-flex",
		"flex-column",
		"flex-grow-1",
		"align-self-end",
		"justify-content-end"
	)

	const dateNow = new Date()
	const month = dateNow.toLocaleString("en-us", { month: "long" })
	const commentDate = document.createElement("span")
	commentDate.classList.add("text-muted")
	commentDate.innerText = `${month +
		" " +
		dateNow.getDay()}, 2019 @ ${dateNow.getHours()}:${dateNow.getMinutes()}`

	// appending everything in order
	commentSectionRow.appendChild(avatarCol)
	commentContentDiv.appendChild(starDiv)
	commentContentDiv.appendChild(commentContent)
	commentContentDiv.appendChild(dateDiv)
	dateDiv.appendChild(commentDate)
	avatarCol.appendChild(avatarLink)
	avatarLink.appendChild(avatar)
	avatarLink.appendChild(avatarName)
	commentSectionRow.appendChild(commentContentDiv)
	commentsHolder.prepend(commentSectionRow)
}
let starValue
// stars rating function
function starsCreate({ clickable, rating }) {
	rating = rating ? rating : 0
	clickable = clickable ? clickable : false

	starContainer = document.createElement("div")
	starContainer.classList.add("container", "sniiop")
	starContainer.id = "starContainer"

	let stars = []
	for (let i = 0; i < 5; i++) {
		const star = document.createElement("span")
		star.classList.add("fa", "fa-star")
		const plusI = i + 1
		star.id = "star" + plusI
		star.setAttribute("data-value", plusI)
		stars.push(star)
	}
	// set default rating
	for (let i = 0; i < stars.length; i++) {
		if (stars[i].dataset.value <= rating) {
			//stars[i].classList.replace("fa-star", "fa-star-o");
			stars[i].classList.remove("fa-star-o")
			stars[i].classList.add("fa-star")
		} else {
			// stars[i].classList.replace("fa-star-o", "fa-star");
			stars[i].classList.remove("fa-star")
			stars[i].classList.add("fa-star-o")
		}
	}
	if (clickable) {
		// add css class hover and use loop to use it only on clickable
		function updateStars() {
			for (let i = 0; i < stars.length; i++) {
				if (stars[i].dataset.value <= rating) {
					// stars[i].classList.replace("fa-star", "fa-star-o");
					stars[i].classList.remove("fa-star-o")
					stars[i].classList.add("fa-star")
				} else {
					//stars[i].classList.replace("fa-star-o", "fa-star");
					stars[i].classList.remove("fa-star")
					stars[i].classList.add("fa-star-o")
				}
			}
		}
		stars.forEach(star => {
			//console.log(star)
			star.addEventListener("click", function (e) {
				rating = e.target.dataset.value
				starValue = rating
				//star.classList.add('clicked')
				updateStars()
				//	console.log(starValue)
			})

			starContainer.appendChild(star)
		})
	}
	return starContainer
}
// create comments form
function commentForm() {
	const commentsDiv = document.getElementById("comments")
	const formDiv = document.createElement("div")
	formDiv.classList.add("row", "pt-5", "justify-content-center")

	const formTextCol = document.createElement("div")
	formTextCol.classList.add("col-lg-12")
	starsCreate({ clickable: true })

	const formCol = document.createElement("div")
	formCol.classList.add("col-lg-8")

	const userNameForm = document.createElement("div")
	userNameForm.classList.add("input-form-group", "mb-3")
	userNameForm.id = "commentForm"

	const userNameFormGroup = document.createElement("div")
	userNameFormGroup.classList.add("input-group-prepend")

	const userNameFormSpan = document.createElement("span")
	userNameFormSpan.classList.add("input-group-text")
	userNameFormSpan.id = "basic-addon1"
	userNameFormSpan.innerText = "Username:"

	const userNamePlaceHolder = document.createElement("input")
	userNamePlaceHolder.id = "userName"
	userNamePlaceHolder.classList.add("form-control")
	userNamePlaceHolder.placeholder = "your username here..."
	userNamePlaceHolder.setAttribute("aria-label", "Username")
	userNamePlaceHolder.setAttribute("aria-describedby", "basic-addon1")

	// appending username area to the parent div

	formTextCol.appendChild(starContainer)
	formDiv.appendChild(formTextCol)
	userNameFormGroup.appendChild(userNameFormSpan)
	userNameFormGroup.appendChild(userNamePlaceHolder)
	userNameForm.appendChild(userNameFormGroup)
	formCol.appendChild(userNameForm)
	formDiv.appendChild(formCol)

	commentsDiv.appendChild(formDiv)

	// comment area
	const commentDiv = document.createElement("div")
	commentDiv.classList.add("input-group")

	const commentGroup = document.createElement("div")
	commentGroup.classList.add("input-group-prepend")

	const commentSpan = document.createElement("span")
	commentSpan.classList.add("input-group-text")
	commentSpan.innerText = "Comment:"

	const textArea = document.createElement("textarea")
	textArea.classList.add("form-control")
	textArea.setAttribute("aria-label", "With textarea")
	textArea.id = "commentText"
	textArea.placeholder = "What you think about this restaurant..."

	const formText = document.createElement("h3")
	starContainer.appendChild(formText)
	formText.innerText = "Rate this restaurant :"
	starContainer.prepend(formText)

	const postButtonDiv = document.createElement("div")
	postButtonDiv.classList.add("d-flex", "flex-row-reverse", "my-2")

	const postButton = document.createElement("button")
	postButton.classList.add("btn", "btn-primary")
	postButton.innerText = "Post"
	postButton.id = "post"

	// appending comments area to the parent div
	commentGroup.appendChild(commentSpan)
	commentDiv.appendChild(commentGroup)
	commentDiv.appendChild(textArea)

	postButtonDiv.appendChild(postButton)

	formCol.appendChild(commentDiv)
	formCol.appendChild(postButtonDiv)
	// add line separation
	const line = document.createElement("hr")
	formCol.appendChild(line)

	// add eventListener to the button when clicked to create div of a new comment
	postButton.addEventListener("click", function () {
		const userNameValue = document.getElementById("userName").value
		const commentValue = document.getElementById("commentText").value
		displayNewComment(userNameValue, commentValue)
		let userInput = document.getElementById("userName")
		let commentInput = document.getElementById("commentText")
		userInput.value = ""
		commentInput.value = ""
		let newComment = document.getElementById("newComment")
		newComment.classList.add("principal")
		const starContainer = document.getElementById("starContainer")

		console.log(starValue)
	})
}

// filter restaurants

export function filterByStars() {
	const mapContainer = document.getElementById("bigContainer")
	const searchArea = document.createElement("div")
	searchArea.classList.add("mb-5", "mt-0", "col-lg-6", "mx-auto")
	searchArea.id = "searchArea"
	const chooseStars = document.createElement("h3")
	chooseStars.innerHTML =
		'Select How Many <span class="fa fa-star "></span>  You Want to Display : '
	chooseStars.classList.add("text-muted", "text-center")
	// newDivCol.appendChild(searchArea)
	searchArea.append(chooseStars)
	let behaviourSlider = document.createElement("div")
	behaviourSlider.id = "behaviourSlider"
	noUiSlider.create(behaviourSlider, {
		start: [2, 3],
		step: 1,
		behaviour: "drag",
		connect: true,
		range: {
			min: 1,
			max: 5
		},
		pips: {
			mode: "values",
			values: [1, 2, 3, 4, 5],
			density: 20
		}
	})
	searchArea.appendChild(behaviourSlider)
	mapContainer.prepend(searchArea)
	let myRestaurant = []
	behaviourSlider.noUiSlider.on("set", function (value) {
		const backBtn = document.getElementById("backBtn")

		if (value) {
			const restaurantsContainer = document.getElementById("restaurants-div")
			myRestaurant = newRestaurants.filter(
				restaurant =>
					restaurant.avrageRating >= value[0] &&
					restaurant.avrageRating <= value[1]
			)
			//console.log(myRestaurant)
			restaurantsContainer.innerHTML = ""
			myRestaurant.forEach(restaurant => {
				addRestaurant(restaurant, backBtn, restaurantsContainer)
			})
		}
	})
}
