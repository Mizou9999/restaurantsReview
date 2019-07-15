import { navbar } from './navbar'
import { hero } from './hero'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import newMap from './newMap'
import { createMap, newRestaurants } from './map'
const map = createMap()
const appElement = document.getElementById('app')
appElement.innerHTML = ""
navbar(appElement)
hero(appElement)
import { filterByStars } from './functions'

newMap('https://maps.googleapis.com/maps/api/js?libraries=places&rating&key=AIzaSyAyPeFfGWQ4_5NJ5VcIQOPCfo24i0u3JMQ&callback=initMap')
createMap()

filterByStars()

