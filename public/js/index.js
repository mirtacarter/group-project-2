//function to make both search fields required
function validate() {

  //Checking to make sure that the where field is filled out
  if (document.myForm.where.value == "") {
    //if not filled out launch whereMessage function
    whereMessage();
    document.myForm.where.focus();
    return false;
  }
  //Checking to make sure the type of job field is filled out
  if (document.myForm.type.value == "") {
    //if not filled out launch typeMessage function
    typeMessage();
    document.myForm.type.focus();
    return false;
  }
  return (true);
}

//Hides the 2 alerts for the input fields right away
$('#where').hide();
$('#type').hide();
//function to show the required message for the where input
function whereMessage() {
  $('#where').slideDown(1000);
  $('#where').delay(1000);
  $('#where').slideUp(1000);
}
//function to show the required message for the type input
function typeMessage() {
  $('#type').slideDown(1000);
  $('#type').delay(1000);
  $('#type').slideUp(1000);
}

//------Job search and results info is here-----------------------------------------------------------------

// Global variables
// Empty arrays to collect location of search and company names from results
var searchArea = [];
var companies = [];

// Map boolean for reset function, set to false
var isMapLoaded = false;

// Reset function
function resetMap() {
  // Clear out array data
  searchArea = [];
  companies = [];
  // Clear out content divs
  $("#map").empty();
  $("#resultsTable").empty();
}

//---------------------------------------------------------------------------------------------------------------------

// Main app logic
$("#submit-search").on("click", function (event) {
  event.preventDefault();

  // Check if map needs to be reset
  resetMap();
  validate();

  // Capture values entered
  var locationInput = $("#location-input").val().trim();
  var keywordInput = $("#keyword-input").val().trim();

  // Empty input fields
  $("#location-input").val("");
  $("#keyword-input").val("");

  // Set up URL for API request, include authorization token 
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.careeronestop.org/v1/jobsearch/lrBD3vbyFOxQtUb/" + keywordInput + "/" + locationInput + "/25/0/0/0/10/60",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer qA9NVS//BpInzmVsOODQ+tXhlgqTsKNa+ZFaOLvijHR04Jrr/3Jzdi2eJoOVrHE1/8L2MEnzLxeaJ4zV9uTkLA==",
      "Cache-Control": "no-cache",
      "Postman-Token": "0cab4fd0-14c7-44d0-8e24-ce787a7a188b"
    }
  }

  // Ajax request
  $.ajax(settings).done(function (response) {

    // Loop over response
    var resultsNum = response.Jobs.length;
    for (var i = 0; i < resultsNum; i++) {
      var jobListing = response.Jobs[i];

      // Convert job posting date/time result from returned format into days or months
      var dateConvert = jobListing.AccquisitionDate.split(" ");
      var calendarDate = dateConvert[0];
      var daysAgo = moment(calendarDate).fromNow();

      // Relevant job posting results stored as variables
      var title = jobListing.JobTitle;
      var company = jobListing.Company;
      var location = jobListing.Location;
      var postdate = jobListing.AccquisitionDate;
      var jobid = jobListing.JvId;
      var url = jobListing.URL;

      // Variable for location of jobListing to set map location context
      address = jobListing.Location;
      // Push to array         
      searchArea.push(address);

      // Variable for company names
      placeName = jobListing.Company;
      // Push to array
      companies.push(placeName);

      // Load search results to html with the save button if user is logged in
      var newRow = $("#resultsTable")
        .append($('<tr>')
          .append($('<td>').append(jobListing.JobTitle).attr("data-jobtitle", jobListing.JobTitle))
          .append($('<td>').append(jobListing.Company).attr("data-jobcompany", jobListing.Company))
          .append($('<td>').append(jobListing.Location).attr("data-joblocation", jobListing.Location))
          .append($('<td>').append(daysAgo).attr("data-dateposted", jobListing.AccquisitionDate))
          .append($('<td>').html("<a href='" + jobListing.URL + "' target='_blank'> Apply</a>").attr("data-url", jobListing.URL))
          .append($("<td>").html("<button data-title='" + title + "' data-company='" + company + "' data-location='" + location + "' data-postdate='" + postdate + "' data-url= '" + url + "' data-search= '" + keywordInput + "' data-jobid='" + jobid + "' type='button' class='btn-sm btn-primary' id='save-jobs'>Save</button>"))
        );
    }

    // Display content area 
    $(".content-wrapper").show();
  });
});

//Save the job information and send it to the MySQL database
$(document).on("click", "#save-jobs", function (event) {
  event.preventDefault();

  // Grabs user input 
  var company = $(this).attr("data-company").trim();
  var title = $(this).attr("data-title").trim();
  var url = $(this).attr("data-url").trim();
  var postDate = $(this).attr("data-postdate").trim();
  var location = $(this).attr("data-location").trim();
  var search = $(this).attr("data-search").trim();
  var jobid = $(this).attr("data-jobid");


  // Creates local "temporary" object for holding jobs data
  var newJob = {
      jobUser: email_id,
      jobCompany: company,
      jobTitle: title,
      jobUrl: url,
      jobPostdate: postDate,
      jobLocation: location,
      jobsearch: search
  };

  //
});
//-------------------------------------------------------------------------------------------------------------
//------Map information goes here------------------------------------------------------------------------------
// Map variables
var map;
var service;
var infowindow;