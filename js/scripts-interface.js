var Doctor = require('./../js/scripts.js').doctorModule;

var clinicGroup = function(clinicArray) {
  for (i = 0; i < clinicArray.length; i++) {
    var clinicName = clinicArray.shift();
    var clinicWebsite = clinicArray.shift();
    var clinicPhone = clinicArray.shift();
    $('.clinic-list').after('<h3>' + clinicName + '</h3><ul><li><strong>Website: </strong>' + clinicWebsite + '</li><li><strong>Phone: </strong>' + clinicPhone.substr(0, 3) + '-' + clinicPhone.substr(3, 3) + '-' + clinicPhone.substr(6,4) + '</li></ul>')
  };
};

$(function() {
  var newDoctor = new Doctor();
  var searchInput;

  $('.search-form').submit(function(e) {
    e.preventDefault();
    $('.clinic-list').html('');
    searchInput = $('#issue-search').val();
    $('#issue-search').val('');

    newDoctor.getDoctors(searchInput, clinicGroup);

  });
});
