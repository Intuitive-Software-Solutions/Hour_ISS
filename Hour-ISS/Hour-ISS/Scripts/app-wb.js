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
    message = '<div class="infoWindow">';
    if (countryCode.location.length == 2) {
        var country = countries[countryCode.location];
        message+='<h5>' + country.name + '</h5></br>';
        message += '<h6> Capital City : ' + country.capitalCity + '</h6></br>';
    }
    else {
        message += '<h3>' + countryCode.location + '</h3></br>';
    }

    if (countryCode.trends != null) {
        message += '<span><small>Top 3 Trending Topics</small></span>';
        message += '<ul class ="list-inline" id="trends">';

        for (i = 0; i < 3; i++) {
            if(countryCode.trends[i]==null){break;}
                message += '<li class = "list-inline-item"><a href = "' + countryCode.trends[i].URL + '">' + countryCode.trends[i].Name + '</a></li>';
            
        }
        message += '</ul> ';
    }
    if (countryCode.tweets[0] != null) {
        message += '<span><small>Local Tweets</small></span>';

        countryCode.tweets.forEach(function (element) {
            message += '<blockquote >' + element.FullText + '...'+ element.Source + '</blockquote>';
            console.log('tweet');
            console.log(element.FullText);
        })
        message += ' ';
    }
    message += '<br/><small>'+countryCode.time+'</small>';
    message += "</div>";
    return message;
}