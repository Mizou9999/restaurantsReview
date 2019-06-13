// declaring global variabled 
let starContainer
const activeMarkerId = {
    id: '',
    infowindow: {}
}

// generate unique id 
export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
// add restaurants to the div on the RIGHT SIDE 
export function addRestaurant(restaurant, idMainDiv = 'main-div') {
    // declaring variabals
    let restaurantName = restaurant.restaurantName,
        restaurantAdress = restaurant.address,
        stars = restaurant.ratings.stars,
        oneRestaurantDiv = document.getElementById('restaurants-div'),
        restaurantDiv = document.createElement('div'),
        restaurantPictureDiv = document.createElement('div'),
        img = document.createElement('img'),
        restaurantDetailDiv = document.createElement("div"),
        buttonDetails = document.createElement('button'),
        divTitle = `<h4 class = "card-title font-weight-bold"> ${restaurantName} </h4> `,
        divAdressSection = `<p class = "card-title text-muted"> ${restaurantAdress} </p> `,
        divRatingSection = `<p class = ""> Rating : ${stars} </p> `,
        divParagraphSection = `<p class = "card-text"> Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  </p> `

    restaurantDiv.classList.add("joker", "row", "pb-2", "mt-4", "pt-2", "border-bottom", "border-primary")
    restaurantDiv.setAttribute('id', restaurant.id)
    restaurantPictureDiv.classList.add('col-lg-4')
    if (restaurant.photoRestaurant) {
        img.src = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${restaurant.photoRestaurant}&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw`
    } else {
        img.src = restaurant.imgSrc
    }
    img.classList.add("img-fluid")
    buttonDetails.classList.add('btn', 'btn-primary', 'details')
    buttonDetails.innerText = 'More details'
    restaurantDetailDiv.classList.add("col-lg-5")

    restaurantDetailDiv.innerHTML = divTitle
    restaurantDetailDiv.innerHTML += divAdressSection
    restaurantDetailDiv.innerHTML += divRatingSection
    restaurantDetailDiv.innerHTML += divParagraphSection

    // click details to show the div 
    buttonDetails.addEventListener('click', function() {
        // fetching data to get random user 
        let url = 'https://randomuser.me/api/?results=5'
        let randomPersons = []
        let randomUser
        fetch(url)
            .then(data => data.json())
            .then(persons => {
                randomPersons.push(...persons.results)
                randomUser = randomPersons[Math.floor(Math.random() * randomPersons.length)]
                displayRestaurantDetails(restaurant)
                console.log(restaurant)
                commentForm(restaurant)
                displayComments(restaurant, randomUser.name.first, randomUser.picture.thumbnail)
                oneRestaurantDiv.classList.add('d-none')
            }).catch(error => {
                console.log(error)
            })
    })

    //appending childs 

    restaurantDetailDiv.appendChild(buttonDetails)
    restaurantPictureDiv.appendChild(img)
    restaurantDiv.appendChild(restaurantPictureDiv)
    restaurantDiv.appendChild(restaurantDetailDiv)
    oneRestaurantDiv.appendChild(restaurantDiv)


}
// generate Avrage RESTAURANT Rating function (FOR THE JSON RESTAURANTS)
function generateAvrageRating(restaurant) {
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
// display picture and restaurant name and rating function
function displayRestaurantDetails(restaurant) {
    let avrageRating = generateAvrageRating(restaurant)
    const commentsDiv = document.getElementById('comments')
    commentsDiv.classList.add('container', 'text-center', "principal", "border", 'rounded', "border-primary", 'mt-2')
    commentsDiv.classList.remove('d-none')
        // creating restaurant picture
    const photoRow = document.createElement('div')
    photoRow.classList.add('row', 'py-2')
    const restaurantPhoto = document.createElement('img')
    restaurantPhoto.classList.add('col-lg-4', 'border', 'border-primary', 'p-0', 'mx-2')
    if (restaurant.photoRestaurant) {
        restaurantPhoto.src = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${restaurant.photoRestaurant}&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw`
    } else {
        restaurantPhoto.src = restaurant.imgSrc
    }

    photoRow.appendChild(restaurantPhoto)
    commentsDiv.appendChild(photoRow)
        // creating restaurant rating, name and adress
    const restaurantDetail = document.createElement('div')
    restaurantDetail.classList.add('col-lg-7')

    const name = document.createElement('h1')
    name.classList.add('text-danger', 'text-center')
    name.innerText = restaurant.restaurantName

    const adress = document.createElement('p')
    adress.classList.add('text-muted', 'text-center')
    adress.innerHTML = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse praesentium illum omnis optio cumque! Qui corrupti ipsum nihil odio! Et placeat quibusdam iusto eius blanditiis architecto nam ea corporis minima!'

    const rating = document.createElement('div')
    rating.classList.add('col-lg-6', 'center')
    starsCreate({ clickable: false, rating: avrageRating })
    rating.appendChild(starContainer)
    rating.innerHTML += avrageRating

    //check if restaurant is open 
    let openStatus
    if (restaurant.openNow == true) {
        openStatus = `<span class='text-success'> Open</span>`
    } else {
        openStatus = `<span class='text-danger'> Closed</span>`
    }

    const description = document.createElement('div')
    description.innerHTML = `
    <ul class="list-group list-group-flush">
    <li class="list-group-item"><p > <span class='font-weight-bold text-muted '>Restaurant Adress : </span> ${restaurant.adress}</p></li>
    <li class="list-group-item"><p > <span class='font-weight-bold text-muted '>Local Phone Number : </span> ${restaurant.localPhone}</p>
    <p > <span class='font-weight-bold text-muted'>International Phone Number : </span> ${restaurant.internationalPhone}</p></li>
    <li class="list-group-item"><p > <span class='font-weight-bold text-muted'>Restaurant Status : </span> ${openStatus}</p></li>
    <li class="list-group-item"><p > <span class='font-weight-bold text-muted'>Website : </span> <a class='link' href='${restaurant.website}' target="_blank">${restaurant.restaurantName}</a></p></li>   
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
    const id = `thisIs${guid()}`
    const restaurantForm = `
    <div class="card" id ='${id}' style="width: 18rem;">
  <div class="card-header text-center text-white bg-danger">
    ADD NEW RESTAURANT
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"> <div class="form-group">
    <label for="exampleFormControlInput1">Enter Restaurant Name:</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="restaurant name...">
  </div></li>
    <li class="list-group-item"><div class="form-group">
    <label for="exampleFormControlInput2">Enter Restaurant Adress:</label>
    <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="restaurant Adress...">
  </div></li>
    <li class="list-group-item"><div class="form-group">
    <label for="exampleFormControlInput3">Enter telephone:</label>
    <input type="text" class="form-control" id="exampleFormControlInput3" placeholder="restaurant Phone number...">
  </div></li>
  </ul>
  <button id='add-btn' class="btn btn-primary details"> Add Now! </button>
</div>
    `
    const newRestButton = document.createElement('button')
    newRestButton.innerText = 'Add now'
    newRestButton.addEventListener('click', function() {
        alert('et')
    })

    const infowindow = new google.maps.InfoWindow({
        // content: restaurantForm
        content: newRestButton
    })
    marker.addListener('click', function() {
        infowindow.open(map, marker)
        console.log(infowindow.getContent())
        const addNow = document.getElementById(id)

    })


}




export function addNewRestaurantOnTheMap() {
    const infoContent = `<div class="container pt-5">
    <div class="row mt-5 d-flex justify-content-center">
      <div id="alertsContainer" class="alerts mt-5" style="position: absolute; z-index: 100;">
  
      </div>
      <div class="col-12 ">
        <div class="row">
          <div class="col d-flex justify-content-center">
            <div class="row mb-5">
  
              <div class="headings mb-5 text-center">
                <h1>Let's add restaurants.</h1>
               
              </div>
            </div>
          </div>
        </div>
        
        <div id="restaurant" class="row d-flex justify-content-center ">
          <div id="restaurant-submit" class="col col-md-6 p-5 shadow">
            <form>
              <div class="form-group ">
                <label for="exampleName">Restaurant Name</label>
                <input type="text" class="form-control" id="inputname" aria-describedby="emailHelp" placeholder="Enter name" />
              </div>
              <div class="form-group">
                <label for="exampleName">Description</label>
                <input type="text" class="form-control " id="inputdesc" aria-describedby="emailHelp" placeholder="Enter description" />
              </div>
              <div class="form-group">
                <label for="exampleName">Image URL (Add your own) </label>
                <input type="url" class="form-control " id="inputurl" aria-describedby="emailHelp" placeholder="Enter image URL" />
              </div>
  
              <div class="form-group">
                <label for="exampleName">Rating (1-5)</label>
                <input min="1" max="5" type="number" class="form-control " id="inputrating" aria-describedby="emailHelp" placeholder="Enter rating" />
              </div>
  
              <button type="button" onclick="AddRestaurant();" class="btn btn-primary ">Submit</button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  </div>`
    const infowindow = new google.maps.InfoWindow({
        content: infoContent
    })
}

// display Comments function 

export function displayComments(element, username, picture) {
    // random date 
    let day = Math.floor(Math.random() * 30 + 1)
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let month = months[Math.floor(Math.random() * months.length)]
    let hour = Math.floor(Math.random() * 24 + 1)
    let minute = Math.floor(Math.random() * 60 + 1)
    const commentsDiv = document.getElementById('comments')
    const commentRow = document.createElement('div')
    commentRow.classList.add('container', 'my-4')
    commentRow.id = 'zkimi'

    element.ratings.forEach(rating => {
        // creating the comments div
        const commentSection = document.createElement('div')
        commentSection.classList.add('row')
        const avatarCol = document.createElement('div')
        avatarCol.classList.add('col-lg-2', 'text-center', 'mr-3')

        const avatarLink = document.createElement('a')
        avatarLink.href = "#none"

        const avatar = document.createElement('img')
        avatar.src = picture
        avatar.classList.add('rounded-circle', 'border', 'border-primary')

        const avatarName = document.createElement('p')
        avatarName.innerText = username
        avatarName.classList.add('text-center')
        const extra = document.createElement('i')
        extra.classList.add('fa', 'fa-adjust')


        const commentContentDiv = document.createElement('div')
        commentContentDiv.classList.add('col-lg-8', 'flex-column', 'd-flex', 'bg-light', 'rounded', 'mb-3', 'py-2', 'bg-white', 'border-primary', 'shadow-sm')

        const commentContent = document.createElement('p')
        commentContent.innerText = rating.stars
        commentContent.innerHTML += `<br> ${rating.comment}`

        const dateDiv = document.createElement('div')
        dateDiv.classList.add('d-flex', 'flex-column', 'flex-grow-1', 'align-self-end', 'justify-content-end')

        const commentDate = document.createElement('span')
        commentDate.classList.add('text-muted')
        commentDate.innerText = `${month +" "+day}, 2019 @ ${hour}:${minute}`

        // appending everything in order 
        avatarLink.appendChild(avatar)
        avatarLink.appendChild(avatarName)
        avatarCol.appendChild(avatarLink)
        avatarCol.appendChild(extra)
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
    const commentsHolder = document.getElementById('zkimi')
        // random date     
    let commentArea = document.getElementById('commentText')
    let userId = document.getElementById('userName')
    if (username == '') {
        userId.placeholder = 'enter a valid name'
        userId.classList.add('border', 'border-danger')
        return
    } else {
        userId.classList.remove('border', 'border-danger')
    }
    if (comment == '') {

        commentArea.placeholder = 'Say what you think !!!'
        commentArea.classList.add('border', 'border-danger')
        return
    } else {
        commentArea.classList.remove('border', 'border-danger')
    }

    // creating the comments div
    const commentSectionRow = document.createElement('div')
    commentSectionRow.id = 'newComment'
    commentSectionRow.classList.add('row')

    const avatarCol = document.createElement('div')
    avatarCol.classList.add('col-lg-2', 'text-center', 'mr-3')

    const avatarLink = document.createElement('a')
    avatarLink.href = "#none"

    const avatar = document.createElement('img')
    avatar.src = "https://source.unsplash.com/60x60/?random"
    avatar.classList.add('rounded-circle', 'border', 'border-primary')

    const avatarName = document.createElement('p')
    avatarName.innerText = username
    avatarName.classList.add('text-center')

    const commentContentDiv = document.createElement('div')
    commentContentDiv.classList.add('col-lg-8', 'flex-column', 'd-flex', 'bg-light', 'rounded', 'mb-3', 'py-2', 'bg-white', 'border-primary', 'shadow-sm')

    const commentContent = document.createElement('p')
    commentContent.innerText = comment

    const dateDiv = document.createElement('div')
    dateDiv.classList.add('d-flex', 'flex-column', 'flex-grow-1', 'align-self-end', 'justify-content-end')

    const dateNow = new Date()
    const month = dateNow.toLocaleString('en-us', { month: 'long' })
    const commentDate = document.createElement('span')
    commentDate.classList.add('text-muted')
    commentDate.innerText = `${month+" "+dateNow.getDay()}, 2019 @ ${dateNow.getHours()}:${dateNow.getMinutes()}`

    // appending everything in order 
    commentSectionRow.appendChild(avatarCol)
    commentContentDiv.appendChild(commentContent)
    commentContentDiv.appendChild(dateDiv)
    dateDiv.appendChild(commentDate)
    avatarCol.appendChild(avatarLink)
    avatarLink.appendChild(avatar)
    avatarLink.appendChild(avatarName)
    commentSectionRow.appendChild(commentContentDiv)
    commentsHolder.prepend(commentSectionRow)


}


// stars rating section 
export function starsCreate({ clickable, rating }) {
    rating = rating ? rating : 0
    clickable = clickable ? clickable : false
    starContainer = document.createElement('div')
    starContainer.classList.add('container', 'sniiop')
    starContainer.id = 'starContainer'

    const star1 = document.createElement('span')
    star1.classList.add('far', 'fa-star')
    star1.id = 'star1'
    star1.setAttribute('data-value', '1')

    const star2 = document.createElement('span')
    star2.classList.add('far', 'fa-star')
    star2.id = 'star2'
    star2.setAttribute('data-value', '2')

    const star3 = document.createElement('span')
    star3.classList.add('far', 'fa-star')
    star3.id = 'star3'
    star3.setAttribute('data-value', '3')

    const star4 = document.createElement('span')
    star4.classList.add('far', 'fa-star')
    star4.id = 'star4'
    star4.setAttribute('data-value', '4')

    const star5 = document.createElement('span')
    star5.classList.add('far', 'fa-star')
    star5.id = 'star5'
    star5.setAttribute('data-value', '5')
    let stars = [star1, star2, star3, star4, star5]

    // set default rating
    for (let i = 0; i < stars.length; i++) {
        if (stars[i].dataset.value <= rating) {
            stars[i].classList.add('fas', 'fa-star')
        } else {
            stars[i].classList.remove('fas', 'fa-star')
        }
    }

    if (clickable) {
        // add css class hover and use loop to use it only on clicable
        function updateStars() {
            for (let i = 0; i < stars.length; i++) {
                if (stars[i].dataset.value <= rating) {
                    stars[i].classList.add('fas', 'fa-star')
                } else {
                    stars[i].classList.remove('fas', 'fa-star')
                }
            }
        }

        for (let i = 0; i < stars.length; i++) {
            stars[i].addEventListener('click', e => {
                rating = e.target.dataset.value
                console.log(e.target.dataset.value)
                updateStars()
            })
        }
    }

    starContainer.appendChild(star1)
    starContainer.appendChild(star2)
    starContainer.appendChild(star3)
    starContainer.appendChild(star4)
    starContainer.appendChild(star5)
    return starContainer
}
// create comments form
function commentForm() {
    const commentsDiv = document.getElementById('comments')
    const formDiv = document.createElement('div')
    formDiv.classList.add('row', 'pt-5', 'justify-content-center')
        //starsCreate()
        // creating username area
    const formTextCol = document.createElement('div')
    formTextCol.classList.add('col-lg-12')
    starsCreate({ clickable: true })
    const formText = document.createElement('h3')
    formText.appendChild(starContainer)
        // formText.innerText = 'Rate this restaurant :'
        // formText.appendChild(starContainer)

    const formCol = document.createElement('div')
    formCol.classList.add('col-lg-8')

    const userNameForm = document.createElement('div')
    userNameForm.classList.add('input-form-group', 'mb-3')
    userNameForm.id = 'commentForm'


    const userNameFormGroup = document.createElement('div')
    userNameFormGroup.classList.add('input-group-prepend')

    const userNameFormSpan = document.createElement('span')
    userNameFormSpan.classList.add('input-group-text')
    userNameFormSpan.id = 'basic-addon1'
    userNameFormSpan.innerText = 'Username:'

    const userNamePlaceHolder = document.createElement('input')
    userNamePlaceHolder.id = 'userName'
    userNamePlaceHolder.classList.add('form-control')
    userNamePlaceHolder.placeholder = 'your username here...'
    userNamePlaceHolder.setAttribute('aria-label', 'Username')
    userNamePlaceHolder.setAttribute('aria-describedby', 'basic-addon1')

    // appending username area to the parent div

    formTextCol.appendChild(formText)
    formDiv.appendChild(formTextCol)
    userNameFormGroup.appendChild(userNameFormSpan)
    userNameFormGroup.appendChild(userNamePlaceHolder)
    userNameForm.appendChild(userNameFormGroup)
    formCol.appendChild(userNameForm)
    formDiv.appendChild(formCol)

    commentsDiv.appendChild(formDiv)

    // creating comment area 
    const commentDiv = document.createElement('div')
    commentDiv.classList.add('input-group')

    const commentGroup = document.createElement('div')
    commentGroup.classList.add('input-group-prepend')

    const commentSpan = document.createElement('span')
    commentSpan.classList.add('input-group-text')
    commentSpan.innerText = 'Comment:'

    const textArea = document.createElement('textarea')
    textArea.classList.add('form-control')
    textArea.setAttribute('aria-label', 'With textarea')
    textArea.id = 'commentText'
    textArea.placeholder = 'What you think about this restaurant...'

    const postButtonDiv = document.createElement('div')
    postButtonDiv.classList.add('d-flex', 'flex-row-reverse', 'my-2')



    const postButton = document.createElement('button')
    postButton.classList.add('btn', 'btn-primary')
    postButton.innerText = 'Post'
    postButton.id = 'post'

    // appending comments area to the parent div
    commentGroup.appendChild(commentSpan)
    commentDiv.appendChild(commentGroup)
    commentDiv.appendChild(textArea)

    postButtonDiv.appendChild(postButton)

    formCol.appendChild(commentDiv)
    formCol.appendChild(postButtonDiv)
        // add line separation 
    const line = document.createElement('hr')
    formCol.appendChild(line)

    // add eventListener to the button when clicked to create div of a new comment
    postButton.addEventListener('click', function() {

            const userNameValue = document.getElementById('userName').value
            const commentValue = document.getElementById('commentText').value
            displayNewComment(userNameValue, commentValue)
            let userInput = document.getElementById('userName')

            let commentInput = document.getElementById('commentText')
            userInput.value = ''
            commentInput.value = ''
            let newComment = document.getElementById('newComment')
            newComment.classList.add("principal")
        })
        // pushin comment to the restaurants array [Cant fix it!!!!! it add the comment to both restaurants]



}