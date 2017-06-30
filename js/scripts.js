var apiKey = require('./../.env').apiKey;

var Doctor = function() {
};

Doctor.prototype.getDoctors = function(medicalIssue, clinics) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
    .then(function(result) {
      // var nameArray = [];

      for (var i = 0; i < result.data.length; i++) {
        for (var j = 0; j < result.data[i].practices.length; j++) {
          var names = result.data[i].practices[j].name
          // nameArray.push(name);
          clinics(names);
        }
      }
      // console.log(nameArray);
    })
   .fail(function(error){
      console.log("fail");
    });
};

exports.doctorModule = Doctor;
