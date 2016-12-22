$(document).ready(function () {
    let now = Date.now();
    let hoursList = getPast24Hrs(now);
    var newmap = getISSLocations(hoursList);
    //getData();
    initMap(newmap);
});


//var getData = function getData() {
//    $.ajax({
//        type: "GET",
//        url: $('#GetData').data('request-url'),
//        dataType: "json",
//        success: function (result) {
//            alert('worked!!');
//            console.log(result);
//        }
//    });
//}
var map;

function initMap(array) {
    var ward4 = { lat: 43.034433, lng: -87.911640 }
    var coords;
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            minzoom: 2,
            maxzoom: 2,
        center: new google.maps.LatLng(24, 10),
        mapTypeId: 'satellite'
        });
        console.log("If you're reading this I didn't break it");
        console.log(array);
        coords = array.map(function (element) {
            return { lat: element.lat, lng: element.lng }
        });
        console.log(coords);
        placeMarkers(coords);
}


function placeMarkers(coords) {
    var latlng
    for (var i = 0; i < coords.length; i++) {
        latlng = coords[i];
        console.log(latlng);
        for (var index = 0; index < coords.length; index++) {
            var marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
        }
    }
}

google.maps.event.addDomListener(window, 'load', initMap(array));
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