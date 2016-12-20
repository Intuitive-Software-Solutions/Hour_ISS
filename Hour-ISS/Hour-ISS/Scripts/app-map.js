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
    script.src = '/app.js/getISSLocations';
    console.log("Are we there yet?");
    console.log(script.src);
    document.getElementsByTagName('head')[0].appendChild(script);
}
window.eqfeed_callback = function(results){
    for (var i = 0; i < results.features.length; i++){
        var coords = results.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(lat[1], lon[2]);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
}