/**
 * DoctorService
 *
 * @module      :: Doctor
 * @description :: Collection of helper methods related to the Doctor model
 * @docs        :: http://stackoverflow.com/questions/24214962/whats-the-proper-way-to-document-callbacks-with-jsdoc
 *                 http://sailsjs.com/documentation/concepts/services/creating-a-service
 */

'use strict';
var _ = require('lodash');
var assert = require('assert');
var Promise = require('bluebird');

module.exports = {
    /**
     * Finds one Doctor model by the username property of the associated User model
     *
     * @param {object} options - Dictionary with the helper's arguments
     * @param {string} options.username - The User's username property
     * @param {gotDataCallback} done - The callback that handles the response. Returns an object as the data result. Not compatible with Promises.
     */
    findOneByUser: function(options, done) {
        assert.ok(typeof options != "undefined", "argument 'options' must be specified");
        //assert.ok(Array.isArray(options), "argument 'options' must be an object and not an array");
        assert.equal(typeof(options.username), 'string', "argument 'username' must be a string");

        User.findOne({
          username: options.username
        }).then(function onFullfilled(user) {
          return Doctor.findOne({ user: user.id }).populate('user');
        }).then(function onFullfilled(doctor) {
          return done(null, doctor);
        }).catch(function onRejected(err) {
          return done(err);
        });
    },

    /**
     * Gets a list with all the Doctor models linked to an User
     *
     * @param {foundAllCallback} done - The callback that handles the response
     */
    findAll: function(done) {
        Doctor.find().where({
            user: {
                '!': null
            }
        }).exec(foundAllCallback.bind(null, done));
    },

    /**
     * Given a Doctor, identifies the Patient(s) assigned to it
     *
     * @param {object} options - Dictionary with the helper's arguments
     * @param {string} options.username - The User's username property
     * @param {gotDataCallback} done - The callback that handles the response. Returns an array of objects as the data result. Not compatible with Promises.
     */
    getPatientList: function(options, done) {
        assert.ok(typeof options != "undefined", "argument 'options' must be specified");
        //assert.ok(Array.isArray(options), "argument 'options' must be an object and not an array");
        assert.equal(typeof(options.username), 'string', "argument 'username' must be a string");

        User.findOne({
          username: options.username
        }).then(function onFullfilled(user) {
          return Doctor.findOne({ user: user.id }).populate('user');
        }).then(function onFullfilled(doctor) {
          return Doctor.findOne(doctor.id).populate('patients');
        }).then(function onFullfilled(doctor) {
          return done(null, doctor.patients);
        }).catch(function onRejected(err) {
          return done(err);
        });
    },

    /**
     * Adds one or more Patients to a particular Doctor model
     *
     * @param {object} options - Dictionary with the helper's arguments
     * @param {object} options.id - The Doctor's id identifier
     * @param {string[]} options.patients - The Array list of Patient's usernames. Can't be empty
     * @param {addedPatientsCallback} done - The callback that handles the response. Returns true if the operation is successfull. Not compatible with Promises.
     */
    addPatientsToDoctor: function(options, done) {
        assert.ok(typeof options != "undefined", "argument 'options' must be specified");
        //assert.ok(Array.isArray(options), "argument 'options' must be an object and not an array");
        assert.ok(options.id, "argument 'id' must be specified");
        assert.ok(_.isArray(options.patients), "argument 'patients' must be an array");
        assert.ok(!_.isEmpty(options.patients), "argument 'patients' must be a non-empty array");

        //Step 1: find the Doctor's model id
        //Step 2: get the Patient's id from the username (or multiple usernames)
        //Step 3: use Doctor.patients.add() to add the Patient(s) to the Collection
        //Step 4: call .save()

        var promise1 = Doctor.findOne({ id: options.id });
        var promise2 = new Promise(function promiseDone(resolve, reject) {
          PatientService.findByUsername({ username: options.patients }, function findDone(error, patients) {
            return error ? reject(error) : resolve(patients);
          });
        });

        Promise.all([
          promise1,
          promise2
        ]).then(function onFullfilled(list) {
          var doctorToAssign = list[0];
          var patientsToAdd = list[1];
          doctorToAssign.patients.add(_.map(patientsToAdd, 'id'));
          return doctorToAssign.save(sails.log.info());
        }).then(function onFullfilled() {
          return done(null, true);
        }).catch(function onRejected(err) {
          return done(err);
        });
    },

    /**
     * Removes one or more Patients from a particular Doctor model
     *
     * @param {object} options - Dictionary with the helper's arguments
     * @param {object} options.id - The Doctor's id identifier
     * @param {string[]} options.patients - The Array list of Patient's usernames
     * @param {removedPatientsCallback} done - The callback that handles the response. Returns true if the operation is successfull. Not compatible with Promises.
     */
    removePatientsFromDoctor: function(options, done) {}

};

/***** CALLBACKS *****/

//TODO: Those two callbacks do the same, I should merge then together and just use one (foundDataCallback)
/**
 * Callback for handling the results of the findeOneByUser helper method
 *
 * @callback foundOneCallback
 * @param {object} err - Returns a Error object if the operation fails
 * @param {object} data - Returns a Doctor object if the operation is successfull
 */
function foundOneCallback(done, err, data) {
    if (err) {
        return done(err);
    }
    return done(null, data);
}

/**
 * Callback for handling the results of the findAll helper method
 *
 * @callback foundAllCallback
 * @param {object} err - Returns a Error object if the operation fails
 * @param {object} data - Returns a Doctor object if the operation is successfull
 */
function foundAllCallback(done, err, data) {
    if (err) {
        return done(err);
    }
    return done(null, data);
}
