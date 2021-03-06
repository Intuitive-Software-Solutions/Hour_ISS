﻿$(document).ready(function () {
    getData();
    initMap();
});


var getData = function getData() {
    $.ajax({
        type: "GET",
        url: $('#GetData').data('request-url'),
        dataType: "json",
        success: function (result) {
            refinePositionData(result);
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
            minzoom: 5,
            maxzoom: 15,
            center: new google.maps.LatLng(26, 8),
            draggable: true,
            zoomControl: true,
            streetViewControl: false,
            scrollwheel: false,
            panControl: true,
            keyboardShortcuts: false,
            disableDoubleClickZoom: true,
            backgroundColor: 'none',
            gestureHandling: 'none',
            mapTypeId: 'satellite'
        });
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter(26, 8);
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
}

function refinePositionData(array) {
    let coords;
    coords = array.map(function (element) {
        return { lat: element.lat, lng: element.lng }
    });
    placeMarkers(coords, array);
}


function placeMarkers(coords, array) {
    for (var i = 0; i < coords.length; i++) {
            createListeningMarker(coords[i], array[i]);
        }
    }


function createListeningMarker(latlng, ISSelement) {
    var icon = '../Content/img/international-space-station-custom-marker_46x28.png';
    var marker = new google.maps.Marker({
        position: latlng,
        icon: icon,
        map: map
    });
    google.maps.event.addListener(marker, 'click', function () {
        showCountryInfo(latlng, map, marker, ISSelement );
    });
}

google.maps.event.addDomListener(window, 'load', initMap());