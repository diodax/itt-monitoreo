/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

//var _ = require('lodash');

module.exports.bootstrap = function(cb) {

  // var doctor = _.merge(Doctor.findOne({ id: '57e93230c3cc91e706c632a4' }), { _attributes.patients: [{ id: '57e9325ec3cc91e706c632a5' },
  // { id: '57e93406c3cc91e706c632a6' }, { id: '57e93424c3cc91e706c632a7' }, { id: '57e9343fc3cc91e706c632a8' }] });

  // var patientsList = Patient.find({});
  // var doctor = { user: "57e2d4bf9cfedda40acf30de", patients: [{}] };
  // Doctor.create(doctor);
  //
  // var doc = Doctor.find({ user: '57e2d4bf9cfedda40acf30de' });
  // console.log(doc);
  //
  // for (var i = 0, len = patientsList.length; i < len; i++) {
  //   doc.patients.add(patientsList[i].id);
  // }
  // onedoc.save();



  // Sets up custom Roles
  //                 { model: 'patient', action: 'update' },
  // Role.create({
  //   name: 'doctor',
  //   permissions: [{ model: 'patient', action: 'create' },
  //                 { model: 'patient', action: 'read' },
  //                 { model: 'patient', action: 'delete' },
  //                 { model: 'doctor', action: 'create' },
  //                 { model: 'doctor', action: 'read', relation: 'owner' },
  //                 { model: 'doctor', action: 'update', relation: 'owner' },
  //                 { model: 'doctor', action: 'delete', relation: 'owner' }]
  // });

  // Role.create({
  //   name: 'patient',
  //   permissions: [{ model: 'patient', action: 'create' },
  //                 { model: 'patient', action: 'read', relation: 'owner' },
  //                 { model: 'patient', action: 'update', relation: 'owner' },
  //                 { model: 'patient', action: 'delete', relation: 'owner' }]
  // });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
