var getWorldBankCountries = function () {
    let worldbankUrl = "http://api.worldbank.org/countries?format=jsonp";
    console.log(worldbankUrl);
    $.ajax({
        url: worldbankUrl,
        jsonp: "prefix",
        dataType: "JSONP",
        success: function (data) {
            console.log("worldbank", data);

            return data;

        }
    }).done(function (data) {
        console.log("worldbank done");
    }
).fail(function (data) {
    console.log("!!!!! worldbank failed");
    console.log(data);
})
}
