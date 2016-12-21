﻿$(document).ready(function () {
    let now = Date.now();
    let hoursList = getPast24Hrs(now);
    var newmap = getISSLocations(hoursList);
    getData();
    initMap(newmap);
});


var getData = function getData() {
    $.ajax({
        type: "GET",
        url: $('#GetData').data('request-url'),
        dataType: "json",
        success: function (result) {
            alert('worked!!');
            console.log(result);
        }
    });
}
var map;
function initMap(array) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            minzoom: 2,
        center: new google.maps.LatLng(24, 10),
        mapTypeId: 'terrain'
    });
    var script = document.createElement('script');
    script.src = 'app.js';
    console.log("What follows is the array captured from app.js");
    console.log(array);
    array.getElementById('lat')[0].appendChild(script);
    
}
var placeMarkers = function(array){
    for (var i = 0; i < array[i].length; i++){
        var coords = array[i].lat;
        var latLng = new google.maps.LatLng(coords[1], coords[0]);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
}