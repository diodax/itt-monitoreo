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

module.exports = {
    /**
     * Finds one Doctor model by the username property of the associated User model
     *
     * @param {object} options - Dictionary with the helper's arguments
     * @param {string} options.username - The User's username property
     * @param {foundOneCallback} done - The callback that handles the response
     */
    findOneByUser: function(options, done) {
        assert.equal(typeof(options.username), 'string', "argument 'username' must be a string");

        Doctor.findOne({
                where: {
                    user: {
                        '!': null
                    }
                }
            })
            .populate('user', {
                username: options.username
            })
            .exec(foundOneCallback.bind(null, done));
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
     * @param {gotPatientsCallback} done - The callback that handles the response
     */
    getPatientList: function(options, done) {
        assert.equal(typeof(options.username), 'string', "argument 'username' must be a string");
    },

    /**
     * Adds one or more Patients to a particular Doctor model
     *
     * @param {object} options - Dictionary with the helper's arguments
     * @param {object} options.id - The Doctor's id identifier
     * @param {string[]} options.patients - The Array list of Patient's usernames. Can't be empty
     * @param {addedPatientsCallback} done - The callback that handles the response
     */
    addPatientsToDoctor: function(options, done) {
        assert.ok(typeof options != "undefined", "argument 'options' must be specified");
        assert.ok(options.id, "argument 'id' must be specified");
        assert.ok(_.isArray(options.patients), "argument 'patients' must be an array");
        assert.ok(!_.isEmpty(options.patients), "argument 'patients' must be a non-empty array");

        Doctor.find({ id: options.id })
          .then(function onFullfilled(list) {
            var doctor = _.head(list);
            var listOfPatients = _.castArray(doctor.patients);
            listOfPatients = _.concat(listOfPatients, options.patients); // TODO: array contains usernames, not id's. Should fix
            return Doctor.update(doctor.id, { patients: listOfPatients });
          }).then(function onFullfilled(doctorUpdated) {
            // do something when the update is done
            return done(null, doctorUpdated); // idk, what should I return?
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
     * @param {removedPatientsCallback} done - The callback that handles the response
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
