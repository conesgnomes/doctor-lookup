(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

var Doctor = function() {
};

Doctor.prototype.getDoctors = function(medicalIssue, clinicGroup) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
    .then(function(result) {

      for (var i = 0; i < result.data.length; i++) {
        for (var j = 0; j < result.data[i].practices.length; j++) {

          //////////////////////////////////////////
          // If website is undefined, display N/A
          //////////////////////////////////////////

          if (JSON.stringify(result.data[i].practices[j].website) === undefined) {
              result.data[i].practices[j].website = "N/A";
            }

          //////////////////////////////////////////
          // Gather data from API
          //////////////////////////////////////////

          var names = result.data[i].practices[j].name
          var sites = result.data[i].practices[j].website
          var phone = result.data[i].practices[j].phones[0].number
          var clinicArray = [];
          clinicArray.push(names, sites, phone);
          clinicGroup(clinicArray);
        }
      }
    })
   .fail(function(error){
      console.log("fail");
    });
};

exports.doctorModule = Doctor;

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/scripts.js":2}]},{},[3]);
