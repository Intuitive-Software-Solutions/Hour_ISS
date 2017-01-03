$(document).ready(function () {
    let now = Date.now();
    let hoursList = getPast24Hrs(now);
    var newmap = getISSLocations(hoursList);
    newmap = getLabels(newmap);
    passToController(newmap);
    APOD();
});

var APOD = function () {
    $.ajax({
        url: "https://api.nasa.gov/planetary/apod?api_key=guOb2qu4r4gd5Cq3o7FZcdzOif9aIUedG8jEk7wK",
        datatype: "JSONP",
        success: function (data) {
            let html = "";
            if(data.media_type!== "image"){
                html='<iframe height:"450" width:"600"  id="APOD"src ="'+ data.url + '"></iframe>';
            }
            else{
                html='<img src="'+ data.url + '" id="APOD" class="img-responsive" >';
            }
            $("#APOD").empty().append(html);
        }
    });
}
var passToController = function (array) {

    $.ajax({
        type: "POST",
        cache: false,
        url: $('#dataBinder').data('request-url'),
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(array),
        success: function (result) {
            alert('it worked!');
        }
    });
}
//timestamps from this API are expressed in milliseconds since the Unix epoch
//convert to seconds as this is what ISS api uses
//each hour is 3600 seconds.  
var getPast24Hrs = function (now) {
    let timestamps = [];
    let convertToSeconds = Math.round(now / 1000);
    let hour = 3600;
    for (let i = 1; i <= 24; i++) {
        timestamps.push((convertToSeconds - (hour * i)));
    }
    return (timestamps.toString());
}

var getISSLocations = function (times) {
    let issUrl = "https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=" + times;
    var map = [];
    $.ajax({
    url: issUrl,
    datatype: "JSONP",
    async: false,
    success: function (data) {
        console.log("success");
    }
    }).done(function (data) {
        data.forEach(function (elements) {
            let d = new Date();
            d.setTime(elements.timestamp * 1000);
            map.push({ time: d.toUTCString(), lat: elements.latitude, lng: elements.longitude });
        });
}
).fail(function (data) {
    console.log("!!!!! failed" + map);
})
    map[0].latitude
    map[0].longitude
    return  map;
}

var convertToCountryCode = function (element) {
    let countryCode = "";
    let geoCode = "http://api.geonames.org/countryCode?lat=" + element.lat + "&lng=" + element.lng + "&username=hour_iss&type=JSON";
    $.getJSON({
        url:geoCode,
        datatype: "json",
        async: false,
        success: function (data) {
           countryCode = data.countryCode;
        }

    }).done(function(data){
    }).fail(function(data){
        console.log("!!!!!failed");
    })

    return countryCode;
}


var getOcean = function (element) {
    let geoCode = "http://api.geonames.org/oceanJSON?formatted=true&lat=" + element.lat + "&lng=" + element.lng + "&username=hour_iss";
    let ocean = "";
    $.getJSON({
        url: geoCode,
        datatype: "json",
        async: false,
        success: function (data) {
            ocean = data.ocean.name;
        }

    }).done(function (data) {
    }).fail(function (data) {
        console.log("!!!!!failed");
    })
    return ocean;
}

var getLabels = function (locationArray) {
    let result = locationArray.map(function (element) {

        countryTest = convertToCountryCode(element);
        try{
            oceanTest = getOcean(element);
        }
        catch (ex) {
            oceanTest = undefined;
        }
        if (countryTest !== undefined) {
            return {
                time: element.time,
                lat: element.lat,
                lng: element.lng,
                location:countryTest
            };
        }
        if (oceanTest !== undefined) {
            return {
                time: element.time,
                lat: element.lat,
                lng: element.lng,
                location: oceanTest
            };
        }
        else{
            return {
            time: element.time,
            lat: element.lat,
            lng: element.lng,
            location: "Couldn't determine a locality"
        };
        }

    });

    return result;}