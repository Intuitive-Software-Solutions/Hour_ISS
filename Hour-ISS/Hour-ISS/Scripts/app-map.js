$(document).ready(function () {
    let now = Date.now();
    let hoursList = getPast24Hrs(now);
    var newmap = getISSLocations(hoursList);
    initMap(newmap);
});

var map;
function initMap(array) {
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: 'terrain'
    });
    var script = document.createElement('script');
    script.src = 'app.js';
    console.log("Are we there yet?");
    console.log(array);
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