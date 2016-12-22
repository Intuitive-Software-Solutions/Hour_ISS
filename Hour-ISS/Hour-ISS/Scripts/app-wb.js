$(document).ready(function () {
    getWorldBankCountries();
});

var countries = {};

var getWorldBankCountries = function () {
    let worldbankUrl = "http://api.worldbank.org/countries?format=jsonp&per_page=400";
    console.log(worldbankUrl);
    $.ajax({
        url: worldbankUrl,
        jsonp: "prefix",
        dataType: "JSONP",
        success: function (data) {
            console.log("worldbank", data);
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
    console.log(data);
})
}

var showCountryInfo = function (map, marker) {
    var latLng = marker.getPosition();
    getCountryCode(latLng.lat(), latLng.lng(), function (countryCode) {
        var infowindow = new google.maps.InfoWindow({
            content: getCountryContent(countryCode)
        });
        infowindow.open(map, marker);
    });
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
    // TODO: Replace country code with actual content
    var country = countries[countryCode];
    console.log(country);
    return JSON.stringify(country);
};