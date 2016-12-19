$(document).ready(function () {
    let now = Date.now();
    let hoursList = getPast24Hrs(now);
    let coordinates = getISSLocations(hoursList);

});

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
    console.log(issUrl);
    $.ajax({
    url: issUrl,
    datatype: "JSONP",
    success: function (data) {
        console.log(data);
        data.forEach(function(elements){
            $('#locations').append(' lat:' + elements.latitude + ', lon:' + elements.longitude + '</br>')
        });
        return data;

    }
}).done(function (data) {
    console.log("done");
}
).fail(function (data) {
    console.log("!!!!! failed");
    console.log(data);
})
}
