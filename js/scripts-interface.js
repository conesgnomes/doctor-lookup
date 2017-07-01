var Doctor = require('./../js/scripts.js').doctorModule;

var clinicGroup = function(clinicArray) {
  for (i = 0; i < clinicArray.length; i++) {
    var clinicName = clinicArray.shift();
    var clinicWebsite = clinicArray.shift();
    var clinicPhone = clinicArray.shift();
    $('.search-results').after('<h3 class="clinic-name">' + clinicName + '</h3><ul><li><strong>Website: </strong>' + clinicWebsite + '</li><li><strong>Phone: </strong>' + clinicPhone.substr(0, 3) + '-' + clinicPhone.substr(3, 3) + '-' + clinicPhone.substr(6,4) + '</li></ul>')
  };
};

$(function() {
  var newDoctor = new Doctor();
  var searchInput;

  $('.search-form').submit(function(e) {
    e.preventDefault();
    searchInput = $('#issue-search').val();
    $('#issue-search').val('');
    $('.clinic-list').fadeIn(100);
    newDoctor.getDoctors(searchInput, clinicGroup);

  });
});
