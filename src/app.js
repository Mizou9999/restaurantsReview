import { init } from './init'
import { navbar } from './navbar'
import { hero } from './hero'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far)



import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

import { mapDiv } from './map'
import newMap from './newMap'
import { createMap } from './map'

const map = createMap()
const appElement = init()
navbar(appElement)
hero(appElement)


newMap('https://maps.googleapis.com/maps/api/js?libraries=places&rating&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw&callback=initMap')
createMap()















// let photoRequestUrl = `api/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw`



// const nearbyUrl = 'api/maps/api/place/nearbysearch/json?location=48.8737815,2.3501669&radius=800&type=restaurant&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw'

// const photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=CmRaAAAAHIusMfRFhRS9nM1dcZcQ-aMGlw0aIXn55B9c5Gp63HViiKdXe79n5D7XxZgTat_UkX7S13ojWWYdLdL2rlpG8wh9kP8La2zYdMCQqX5-HVdJPm0bVxMYncpaErZ-DLpTEhAJXs4PBLSLGUX8t8xmHqO-GhRLzfh0S6ORyn0QJLrxUP45EjrzMQ&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw`

// const photoUrl = 'api/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAIAe5uRef8RhenLJb1YZMIJz4vwLZfgqrsgKLVWn-F5YJTL5K3I76ogTWkP7U6UekpIdlV6Q1ZLWzF60XBs9fNtGzFXTPEw4joQ-CoOSmC8e-j43-LenTOnjLTdfwDMsREhBSL_3AecpHIr9-bm5YaGjFGhSpVjCD0YPMWF7A5Sy7SA81GPknbw&key=AIzaSyBll93EcgKSTvPgM3554BIvyutwDjFdWaw'
// fetch(photo).then(data => {
//     data.json()
// }).then(element => {
//     console.log(element)
// })np