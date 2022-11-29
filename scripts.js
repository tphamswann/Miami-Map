
$(document).ready(function() {
  $(".toggle").click(function() {
    $(".toggle").removeClass('btn-highlight')
    $(this).addClass("btn-highlight");
  }); // Put your code here
});

$(document).ready(function() {
  $(".toggle-2").click(function() {
    $(this).toggleClass("btn-highlight2");
  }); // Put your code here
});

window.onload = function(){
    activeLayer = 'heat';
    map.getCanvas().style.cursor = 'pointer';

}

mapboxgl.accessToken = 'pk.eyJ1IjoidHlwcyIsImEiOiJjbDh4YXRyZmkwNHQ1M3Bvd25vNjdrMWkyIn0.HpGJaaIrWfLkmx8MiFKX9A';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/typs/cla5u59x8001814o0rq0xqlb0', 
    center: [-80.703896, 25.568010], // starting position [lng, lat]
    zoom: 8.83, // starting zoom
    projection: 'globe' 
});

map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
     
      map.addSource('heat', {
'type': 'geojson',
'data': 'https://tphamswann.github.io/GEOJSon-test-file/modified-socio.geojson'
});
map.addLayer(
{
'id': 'rent',
'type': 'fill',
'source': 'heat',
'layout': {},
'paint': {

  'fill-color': rentColors
}
},
"road-simple"
);

map.addSource('superfund', {
    'type': 'geojson',
    'data': 'https://tphamswann.github.io/GEOJSONs/superfund.geojson'
    });

    map.addLayer({
    'id': 'superfund',
    'type': 'circle',
    'source': 'superfund',
    'paint': {
    'circle-color': '#4264fb',
    'circle-radius': 6,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
    }
    });


  function switchLayer(layer, styleID) {
    activeLayer = layer;
}

function addPoints() {

}

rentColors =  [
'interpolate',
['linear'],
['get', 'rent'],
-1000,
'#b6b5aa',
600,
'#ffffcc',
990,
'#7ecdbb',
1200,
'#c7e9b4',
1300,
'#40b7c4',
1950,
'#2d81b9',
2800,
'#253393',
]

heatColors =  [
'interpolate',
['linear'],
['get', 'LST_Day'],
-1000,
'#b6b5aa',
-1.1004644115,
'#3288bd',
0.39,
'#66c2a5',
1.84,
'#abdda4',
3.38,
'#e6f598',
4.88,
'#ffffbf',
6.38,
'#fee08b',
7.87,
'#fdae61',
9.36,
'#f46d43',
10.85697326,
'#d53e4f'
]

heatColors =  [
'interpolate',
['linear'],
['get', 'LST_Day'],
-1000,
'#b6b5aa',
-1.1004644115,
'#3288bd',
0.39,
'#66c2a5',
1.84,
'#abdda4',
3.38,
'#e6f598',
4.88,
'#ffffbf',
6.38,
'#fee08b',
7.87,
'#fdae61',
9.36,
'#f46d43',
10.85697326,
'#d53e4f'
]

map.on('click', 'dataLayer', (e) => {
  map.addSource('outline', {
'type': 'geojson',
'data': {
'type': 'Feature',
'properties': {},
'geometry': {
'type': 'LineString',
'coordinates': e.features[0].properties.coordinates
}
}
});
map.addLayer({
'id': 'outline',
'type': 'line',
'source': 'outline',
'layout': {
'line-join': 'round',
'line-cap': 'round'
},
'paint': {
'line-color': 'black',
'line-width': 8
}
});

      });