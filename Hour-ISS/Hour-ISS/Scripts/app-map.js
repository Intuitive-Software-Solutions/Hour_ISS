$(document).ready(function () {
    initMap();
});

var map;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: 'terrain'
    });
    var script = document.createElement('script');
    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    console.log("Are we there yet?");
    document.getElementsByTagName('head')[0].appendChild(script);
}
window.eqfeed_callback = function(results){
    for (var i = 0; i < results.features.length; i++){
        var coords = results.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1], coords[0]);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
}