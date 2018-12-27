//SETUP VARAIBLES
//=================================================

var authKey = "9d5d2b85698c4684a7b0f60663ee240a";

var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// URL Base
var queryURLbase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// Variable to track number of articles
var articleCounter = 0;

//FUNCTIONS
//=================================================
function runQuery(numArticles, queryURL) {
    // AJAX function
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function (NYTData) {
            // Clear Well Sections
            $('#wellSection').empty();
            for (var i = 0; i < numArticles; i++) {

                console.log(NYTData.response.docs[i].section_name);
                console.log(NYTData.response.docs[i].pub_date);
                console.log(NYTData.response.docs[i].web_url);

                // Start dumping to HTML
                var wellSection = $('<div>');
                wellSection.addClass("well");
                wellSection.attr("id", "articleWell-" + i);
                $('#wellSection').append(wellSection);

                // Check if Headline content exists
                if (NYTData.response.docs[i].headline !== null) {
                    console.log(NYTData.response.docs[i].headline.main);
                    $("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
                }
                // Check if Byline exists
                if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
                    console.log(NYTData.response.docs[i].byline.original);
                    $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
                }

                // Attach content to appropriate Div Well

                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
                $("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");
            }


            // Log to console
            console.log(queryURL);
            console.log(numArticles);
            console.log(NYTData);
        });

}

//MAIN PROCESS
//=================================================
// Search button, on Click run function
$('#searchBtn').on('click', function () {

    queryTerm = $('#search').val().trim();
    // Add in the Search Term
    var newURL = queryURLbase + "&q=" + queryTerm;

    // Add in the Number of Records
    numResults = $("#numRecords").val();


    // Add in the startYear and endYear
    startYear = $('#startYear').val().trim();
    endYear = $('#endYear').val().trim();

    // Add the date information to the URL
    if (parseInt(startYear)) {
        // Added necessary fields
        startYear = startYear + "0101";
        newURL = newURL + "&begin_date=" + startYear;
    }
    if (parseInt(endYear)) {
        endYear = endYear + "0101";
        newURL = newURL + "&end_date=" + endYear;
    }

    // Send the AJAX call the newly assembled URL
    runQuery(numResults, newURL);

    return false;

});

// 1. Retrieve user inputs and convert to variables
// 2. Use variables to run AJAX call to the New York Times.
// 3. Break down NYT Object into usable fields.
// 4. Dynamically generate the content in HTML that provides data.
// 5. Dealing with "edge cases" Bugs or situations that are not intuitive.