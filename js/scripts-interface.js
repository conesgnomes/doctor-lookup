var Doctor = require('./../js/scripts.js').doctorModule;

var clinics = function(clinics) {
  $('.result').append("<p><strong>Offices: " + clinics + "</strong></p>");
};

$(function() {
  var newDoctor = new Doctor();
  var searchInput;

  $('.search-form').submit(function(e) {
    e.preventDefault();
    searchInput = $('#issue-search').val();
    $('#issue-search').val('');

    newDoctor.getDoctors(searchInput, clinics);

  });
});
