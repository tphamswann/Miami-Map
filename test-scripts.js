	mapboxgl.accessToken = 'pk.eyJ1IjoidHlwcyIsImEiOiJjbDh4YXRyZmkwNHQ1M3Bvd25vNjdrMWkyIn0.HpGJaaIrWfLkmx8MiFKX9A';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/typs/cla65sw8q002315m3pcd183b8', 
        center: [-80.18896, 25.59], // starting position [lng, lat]
        zoom: 9.19, // starting zoom
        projection: 'globe' 
    });

    mapSource = 'https://tphamswann.github.io/final-geojson/final-layers.geojson'
  map.on('style.load', () => {
          map.setFog({}); // Set the default atmosphere style
         
          map.addSource('dataLayer', {
  'type': 'geojson',
  'data': 'https://tphamswann.github.io/final-geojson/final-layers.geojson'
  });
  map.addLayer(
  {
  'id': 'dataLayer',
  'type': 'fill',
  'source': 'dataLayer',
  'layout': {},
  'paint': {

      'fill-color': heatColors
  }
  },
    "road-simple"

    
  );

  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


// Change the cursor to a pointer when
// the mouse is over the states layer.
map.on('mouseenter', 'dataLayer', () => {
  map.getCanvas().style.cursor = 'pointer';

  const infoPopup = new mapboxgl.Popup({closeButton: false,
closeOnClick: false})
  infoPopup.addTo(map);

  map.on('mousemove', 'dataLayer', (e) => {
infoPopup.trackPointer()
switch (activeLayer) {
case 'rent': 
    if (e.features[0].properties.rent == -1000 ||e.features[0].properties.rent == -1){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML('rent: $' + e.features[0].properties.rent)
    }
break;
case 'medInc': 
    if (e.features[0].properties.income == -1000){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML('income: $' + round(e.features[0].properties.income / 1000) + 'k')
    }
break;
case 'shareBlack': 
    if (e.features[0].properties['black-share'] == -1000){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML(round(100 * e.features[0].properties['black-share'], 0) + '% black')
    }
break;
case 'shareWhite': 
    if (e.features[0].properties['white-share'] == -1000){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML(round(100 * e.features[0].properties['white-share'], 0) + '% white')
    }
break;
case 'shareAsian': 
    if (e.features[0].properties['asian-share'] == -1000){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML(round(100 * e.features[0].properties['asian-share'], 1) + '% asian')
    }
break;
case 'shareHispanic': 
    if (e.features[0].properties['hispanic-share'] == -1000){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML(round(100 * e.features[0].properties['hispanic-share'], 0) + '% hispanic')
    }
break;
case 'asthma': 
    if (e.features[0].properties['ashma-rate'] == -1000){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML(round(e.features[0].properties['ashma-rate'], 0) + '%')
    }
break;
case 'heart-disease': 
    if (e.features[0].properties['coronary-heart-disease'] == -1000){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML(round(e.features[0].properties['coronary-heart-disease'], 0) + '%')
    }
break;
case 'life-expectancy': 
    if (e.features[0].properties['life-expectancy'] == -1000){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML(round(e.features[0].properties['life-expectancy'], 0) + ' years')
    }
break;
case 'heat': 
    if (e.features[0].properties['LST_Day'] == -1000){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML('Heat Index: ' + round(e.features[0].properties['LST_Day'], 1))
    }
break;
default:
    case 'rent': 
    if (e.features[0].properties.rent == -1000 ||e.features[0].properties.rent == -1){
      infoPopup.setHTML('insufficient data')
    } else{
      infoPopup.setHTML('rent: $' + e.features[0].properties.rent)
    }
break;
}
});

map.on('mouseleave', 'dataLayer', () => {
map.getCanvas().style.cursor = '';
infoPopup.remove()
});
});

let selectedTract = 'none'
map.on('click', 'dataLayer', (e) => { 
  var mapLayer = map.getLayer('outline');


  if(typeof mapLayer !== 'undefined') {
    map.removeLayer('outline')
    map.removeLayer('outline2')
    map.removeSource('outline')
    }




if (selectedTract !== e.features[0].properties['TRACTCE']){

  
map.addSource('outline', {
'type': 'geojson',
'data': {
'type': 'Feature',
'geometry': {
'type': 'Polygon',
'coordinates': e.features[0].geometry.coordinates
}
}
});

map.addLayer({
'id': 'outline2',
'type': 'line',
'source': 'outline',
'layout': {},
'paint': {
'line-color': '#fff',
'line-width': 6
}
});

map.addLayer({
'id': 'outline',
'type': 'line',
'source': 'outline',
'layout': {},
'paint': {
'line-color': '#000',
'line-width': 3
}
});

//Fancy Zoom code that actually looks garbage

if (map.getZoom() < 10){
var bounds = e.features[0].geometry.coordinates;
tractPolygon = turf.polygon(bounds)
console.log(turf.centerOfMass(tractPolygon))
mbVersion = new mapboxgl.LngLat(turf.centerOfMass(tractPolygon).geometry.coordinates[0]+ 0, turf.centerOfMass(tractPolygon).geometry.coordinates[1])

map.flyTo({
        center: mbVersion,
        zoom: 12
      })
    }
    


selectedTract = e.features[0].properties['TRACTCE']
} else{
  selectedTract = 'none'
}

});



});



const popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});



