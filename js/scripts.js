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
