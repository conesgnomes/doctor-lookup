var Doctor = require('./../js/scripts.js').doctorModule;

var name = function(name) {
  $('.result').append("<p><strong>Doctor: " + name + "</strong></p>");
};

$(function() {
  var newDoctor = new Doctor();
  var searchInput;

  $('.search-form').submit(function(e) {
    e.preventDefault();
    searchInput = $('#issue-search').val();
    $('#issue-search').val('');

    newDoctor.getDoctors(searchInput, name);

  });
});
