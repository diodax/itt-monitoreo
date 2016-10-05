var _ = require('lodash');

module.exports = {
  /**
   * add one or more patients to a particular doctor
   * @param patients { string of string array } - list of usernames of patients
   * @param doctorname { string } - the username of the doctor that the patients should be added to
   */
  addPatientsToDoctor: function (patients, doctorname) {
    // check if patient list is empty
    if (_.isEmpty(patients)) {
      return Promise.reject(new Error('One or more patients must be provided'));
    }

    if (!_.isArray(patients)) {
      patients = [patients];
    }

    return User.find({ username: patients })
               .then(function(users) {
                 // buscar los id de cada usuario en la lista de pacientes
               });

  }

};
