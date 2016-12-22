$(document).ready(function () {
    getWorldBankCountries();
});

var countries = {};

var getWorldBankCountries = function () {
    let worldbankUrl = "http://api.worldbank.org/countries?format=jsonp&per_page=400";
    $.ajax({
        url: worldbankUrl,
        jsonp: "prefix",
        dataType: "JSONP",
        success: function (data) {
            var wbCountries = data[1];
            for (var i = 0; i < wbCountries.length; i++) {
                countries[wbCountries[i].iso2Code] = wbCountries[i];
            }

        }
    }).done(function (data) {
        console.log("worldbank done");
    }
).fail(function (data) {
    console.log("!!!!! worldbank failed");
});
}

var showCountryInfo = function (latlng, map, marker, ISSelement) {
    var latLng = marker.getPosition();
    
        var infowindow = new google.maps.InfoWindow({
            content: getCountryContent(ISSelement),
        });
        infowindow.open(map, marker);
    
}

var getCountryCode = function (lat, lon, callback) {
    let Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", "http://ws.geonames.org/countryCodeJSON?lat=" + lat + "&lng=" + lon + "&username=ntirnanich", false);
    Httpreq.send(null);
    let jsonResp = JSON.parse(Httpreq.responseText);
    let countryCode = jsonResp.countryCode;
    callback(countryCode);
}

var getCountryContent = function (countryCode) {
    message = "";
    if (countryCode.location.length == 2) {
        var country = countries[countryCode.location];
        message = country.name;
    }
    else {
        message = countryCode.location;
    }
    countryCode.tweets.forEach(function (element) {
        message += "\n" + element.FullText;
    })
    return message;
}