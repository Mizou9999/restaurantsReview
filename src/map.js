import jsonData from './restaurants.json'
import { guid, addRestaurant, placeMarkerOnRightClick } from './functions'
//google map section 
//init map 
let map
let restaurants = jsonData
restaurants.forEach(element => {
    element.imgSrc = 'https://source.unsplash.com/500x300/?food'
    console.log(element)
})

let restaurantsInJsonFileId = []
const activeMarkerId = {
    id: '',
    infowindow: {}
}


export const createMap = () => {
    function initMap() {
        let myLocation = {
            lat: 48.8737815,
            lng: 2.3501649
        };
        let option = {
            zoom: 14,
            center: myLocation
        };
        // user location

        // added the map to the HTML
        map = new google.maps.Map(document.getElementById("map"), option);

        //add marker for user Location 
        let marker = new google.maps.Marker({
            position: myLocation,
            map: map,
            title: "Hello World!"
        });
        marker.setMap(map);
        let request = {
            location: myLocation,
            radius: '1000',
            type: ['restaurant']
        }
        let service = new google.maps.places.PlacesService(map)
        service.nearbySearch(request, callback)
            // add unique id to the restaurants in the json File and show the restaurants on the map + div
        restaurants.forEach(restaurant => {
                restaurant.id = `id${guid()}`
                addRestaurant(restaurant)
                displayInfoWhenClickOnMarker(restaurant)
                restaurantsInJsonFileId.push(restaurant.id)
            })
            //------------------------- test-------------------------------------------------
            // let the user add the marker + new restaurant when right cick on the map  
        map.addListener('rightclick', function(e) {
            placeMarkerOnRightClick(e.latLng, map)


        })

    }
    window.initMap = initMap;
    return (map, restaurants);

};



function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        results.forEach(restaurant => {

            //createMarker(restaurant)
            // i cant get ratings this way            
        })
    }
}



function createMarker(place) {
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    })
}

function displayInfoWhenClickOnMarker(restaurant) {
    const restaurantGeo = {
        lat: restaurant.lat,
        lng: restaurant.long
    }
    const marker = new google.maps.Marker({
            position: restaurantGeo,
            map: map,
            title: restaurant.restaurantName
        })
        //<img src="https://source.unsplash.com/500x300/?food" class="card-img-top" alt="...">
    const restaurantItem = document.getElementById(restaurant.id)

    // CREATE : the info window that show up when user click on a marker 
    let infoContent = document.createElement('div')
    infoContent.classList.add('card', 'border-primary')
    infoContent.style.width = '12rem'
    const img = document.createElement('img')
    img.classList.add('card-img-top')
    if (restaurant.photoRestaurant) {
        img.src = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${restaurant.photoRestaurant}&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw`
    } else {
        img.src = restaurant.imgSrc
    }
    infoContent.appendChild(img)
    infoContent.innerHTML += `
  
    <div class="card-body">
      <h5 class="card-title"> ${restaurant.restaurantName} </h5>
      <p class="card-text"> ${restaurant.adress} </p>      
    </div>
    </div> `
    const infowindow = new google.maps.InfoWindow({
        content: infoContent
    })

    marker.addListener('click', () => {
        map.setZoom(18);
        map.setCenter(marker.getPosition());
        infowindow.open(map, marker)
        restaurantItem.classList.add('clickDiv')
        console.log(activeMarkerId, 'open')

        if (activeMarkerId.id) {
            activeMarkerId.infowindow.close()
            restaurantItem.classList.remove('clickDiv')
        }

        activeMarkerId.id = restaurant.id
        activeMarkerId.infowindow = infowindow
            // add infoWindow on map 
            // show when clicked on marker
    })

    google.maps.event.addListener(map, 'click', () => {
        restaurantItem.classList.remove('clickDiv')
        console.log(restaurant.id, 'close')
            // close info window when clicked on the map 
        infowindow.close()
    })
}
// google places part :

function fetchGooglePlacesData(url, photo) {
    fetch(url)
        .then(datas => datas.json())
        .then(restaurant => {
            console.log(restaurant)
            const obj = {
                adress: restaurant.result.formatted_address,
                id: restaurant.result.reference,
                lat: restaurant.result.geometry.location.lat,
                long: restaurant.result.geometry.location.lng,
                avrageRating: restaurant.result.rating,
                restaurantName: restaurant.result.name,
                ratings: [],
                photoRestaurant: photo,
                localPhone: restaurant.result.formatted_phone_number,
                internationalPhone: restaurant.result.international_phone_number,
                website: restaurant.result.website,
                openNow: restaurant.result.opening_hours.open_now,
                type: restaurant.result.types
            }

            if (restaurant.result.reviews) {
                restaurant.result.reviews.forEach(comment => {
                    obj.ratings.push({
                        stars: comment.rating,
                        comment: comment.text
                    })
                })
            } else {
                obj.ratings.push({
                    stars: 'there is no Rating for this restaurant yet',
                    comment: 'there is no reviews for this restaurant yet!'
                })
            }

            addRestaurant(obj)
                //console.log(obj)

            displayInfoWhenClickOnMarker(obj)
        })
}

function getRestaurantDataFromGooglePlace() {
    const nearbyUrl = 'api/maps/api/place/nearbysearch/json?location=48.8737815, 2.3501649&radius=1000&type=restaurant&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw'

    fetch(nearbyUrl)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(element => {

                const detailsUrl = `api/maps/api/place/details/json?placeid=${element.reference}&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw`

                let restaurantPhoto

                if (element.photos[0].photo_reference) {
                    restaurantPhoto = element.photos[0].photo_reference
                } else {
                    restaurantPhoto = 'smokke'
                }
                fetchGooglePlacesData(detailsUrl, restaurantPhoto)

            })

        })
}

getRestaurantDataFromGooglePlace()

// shitty function
function displayinfoMarker(restaurant) {
    myLocation = {
        lat: restaurant.lat,
        lng: restaurant.long
    }
    let marker = new google.maps.Marker({
        position: myLocation,
        map: map,
        title: "Hello World!"
    });
    marker.setMap(map);
}



// "reviews" : [
//     {
//        "author_name" : "Robert Ardill",
//        "author_url" : "https://www.google.com/maps/contrib/106422854611155436041/reviews",
//        "language" : "en",
//        "profile_photo_url" : "https://lh3.googleusercontent.com/-T47KxWuAoJU/AAAAAAAAAAI/AAAAAAAAAZo/BDmyI12BZAs/s128-c0x00000000-cc-rp-mo-ba1/photo.jpg",
//        "rating" : 5,
//        "relative_time_description" : "a month ago",
//        "text" : "Awesome offices. Great facilities, location and views. Staff are great hosts",
//        "time" : 1491144016
//     }
//  ],
// https://www.randomuser.me/ to get random user pictures

// search restaurants places function

// user location 
// navigator.geolocation.getCurrentPosition(
//     getPosition
// );

// function getPosition(
//     user
// ) {
//     let pos = {
//         lat: user
//             .coords
//             .latitude,
//         lng: user
//             .coords
//             .longitude
//     };
//     let marker = new google.maps.Marker({
//         position: pos,
//         map: map,
//         title: "u here!",
//         icon: "https://img.icons8.com/office/40/000000/map-editing.png"
//     });

//     map.setCenter(
//         pos
//     );
// }