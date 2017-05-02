/**
 * DoctorController
 *
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
var Promise = require('bluebird');

module.exports = {

    /**
     * `DoctorController.index()`
     */
    index: function(req, res) {
				Doctor.find()
							.populate('user')
							.populate('patients')
							.exec(function (err, doctors) {
								if (err) {
							    return res.serverError(err);
							  }
								return res.view({
									user: req.user.toJSON(),
									doctors: doctors
								});
							});
    },

    find: function(req, res) {
      var id = req.param('id');
      Doctor.findOne({ id: id })
      .exec(function findDoctorFinished(err, doctor) {
        if (err) { return res.serverError(err); }
        if (!doctor) { return res.json("The doctor id: " + id + " doesn't exist!"); }
        return res.view({
          user: req.user.toJSON(),
          doctor: doctor
        });
      });
    },

    test1: function(req, res) {
      DoctorService.findOneByUser({ username: 'doctor' }, function findOneDone(err, data) {
        if (err) { return res.serverError(err); }
        return res.json(data);
      });
    },

    test2: function(req, res) {
      PatientService.findByUsername({ username: 'patient' }, function findDone(err, data) {
        if (err) { return res.serverError(err); }
        return res.json(data);
      });
    },

    test3: function(req, res) {
      PatientService.findByUsername({ username: ['srjuanito', 'patient', 'srafefita', 'srjuanperez'] }, function findDone(err, data) {
        if (err) { return res.serverError(err); }
        return res.json(data);
      });
    },

    test4: function(req, res) {
      DoctorService.getPatientList({ username: 'doctor' }, function findDone(err, data) {
        if (err) { return res.serverError(err); }
        return res.json(data);
      });
    },

    test5: function(req, res) {
      DoctorService.findOneByUser({ username: 'doctor' }, function doctorFound(err, data) {
        if (err) { return res.serverError(err); }
        DoctorService.addPatientsToDoctor({ id: data.id, patients: ['patient', 'srjuanito'] }, function patientsAdded(err, data) {
          if (err) { return res.serverError(err); }
          DoctorService.findOneByUser({ username: 'doctor' }, function updatedDoctorFound(err, data) {
            if (err) { return res.serverError(err); }
            Doctor.findOne(data.id).populate('user').populate('patients').exec(function populatedDoctorFound(err, data) {
              if (err) { return res.serverError(err); }
              return res.json(data);
            });
          });
        });
      });
    }
};
