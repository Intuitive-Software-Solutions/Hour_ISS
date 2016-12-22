﻿$(document).ready(function () {
    let now = Date.now();
    let hoursList = getPast24Hrs(now);
    var newmap = getISSLocations(hoursList);
    getData();
    initMap();
    refinePositionData(newmap);
});


var getData = function getData() {
    $.ajax({
        type: "GET",
        url: $('#GetData').data('request-url'),
        dataType: "json",
        success: function (result) {
            alert('worked!!');
            alert(result);
            console.log(result);
        },
        error: function (req, status, error) {
            alert(status);
            console.log(status);
        }
    });
}
var map;

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            minzoom: 2,
            maxzoom: 2,
            center: new google.maps.LatLng(26, 8),
            draggable: false,
            zoomControl: false,
            streetViewControl: false,
            scrollwheel: false,
            panControl: false,
            keyboardShortcuts: false,
            disableDoubleClickZoom: true,
            gestureHandling: 'none',
            mapTypeId: 'terrain'
        });
}

function refinePositionData(array) {
    var coords;
    coords = array.map(function (element) {
        return { lat: element.lat, lng: element.lng }
    });
    placeMarkers(coords);
}


function placeMarkers(coords) {
    var latlng
    for (var i = 0; i < coords.length; i++) {
        latlng = coords[i];
        for (var index = 0; index < coords.length; index++) {
            createListeningMarker(latlng);
        }
    }
}

function createListeningMarker(latlng) {
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });
    google.maps.event.addListener(marker, 'click', function () {
        showCountryInfo(map, marker);
    });
}

google.maps.event.addDomListener(window, 'load', initMap());