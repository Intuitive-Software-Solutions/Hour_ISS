$(document).ready(function () {
    let now = Date.now();
    let hoursList = getPast24Hrs(now);
    var newmap = getISSLocations(hoursList);
    initMap(newmap);
});

var map;
var coords;
function initMap(array) {
        var ward4 = {lat: 43.034433, lng: -87.911640}
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            minzoom: 2,
            maxzoom: 2,
        center: new google.maps.LatLng(24, 10),
        mapTypeId: 'terrain'
        });
        console.log("If you're reading this I didn't break it");
        console.log(array);
        array.map(function (element) {
            return coords[{ lat: element.lat, lng: element.lng }]
            console.log(coords);
        });
}


function placeMarkers(){
    for (var i = 0; i < coords[i].length; i++){
        console.log("The code has entered placeMarkers");
        console.log(coords);
        var lat = parseFloat(coords[0]);
        var lng = parseFloat(coords[1]);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map
        });
    }
}
//var contentString = '<div id="content">' +
//    '<div id="siteNotice">' +
//    '</div>' +
//    '<h1 id="firstHeading" class="firstHeading">Ward 4</h1>' +
//    '<div id="bodyContent">' +
//    '<p><b>Ward 4</b>, also referred to as the <b>Pritzlaff Building</b>, is a large ' +
//    'cream city brick building adjacent to the Historic Third Ward in Milwaukee.</p>' +
//    '</div>' +
//    '</div>';

//var infowindow = new google.maps.InfoWindow({
//    conent: contentString
//});
//var marker = new google.maps.Marker({
//    position: ward4,
//    map: map,
//    title: 'Ward 4'
//});
//marker.addListener('click', function () {
//    infowindow.open(map, marker);
//});