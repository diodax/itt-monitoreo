/**
 * PatientService
 *
 * @module      :: Patient
 * @description :: Collection of helper methods related to the Patient model
 */

'use strict';
var _ = require('lodash');
var assert = require('assert');

module.exports = {
  /**
   * Finds one Patient model by the username property of the associated User model
   *
   * @param {object} options - Dictionary with the helper's arguments
   * @param {string|string[]} options.username - The User's username property, or an array of usernames
   * @param {foundDataCallback} done - The callback that handles the response. Returns an array of objects as the data result. Not compatible with Promises.
   */
  findByUsername: function (options, done) {
    assert.ok(typeof options != "undefined", "argument 'options' must be specified");
    //assert.ok(Array.isArray(options), "argument 'options' must be an object and not an array");
    assert.ok((_.isArray(options.username)) || (typeof(options.username)), "argument 'username' must be a string or an array of strings");

    if (_.isArray(options.username)) {
      _.filter(options.username, function(item) {
        return assert.equal(typeof(item), 'string', "argument 'username' must be a string of an array of only strings"); });
    }

    User.find({
      username: options.username
    }).then(function onFullfilled(users) {
      var userList = _.map(users, 'id');    // get list of ids from users
      return Patient.find({ user: userList }).populate('user');
    }).then(function onFullfilled(patients) {
      return done(null, patients);
    }).catch(function onRejected(err) {
      return done(err);
    });
  }
};

/***** CALLBACKS *****/

/**
 * Callback for handling the results of the "find-" helper methods
 *
 * @callback foundDataCallback
 * @param {object} err - Returns a Error object if the operation fails
 * @param {object} data - Returns the result object(s) if the operation is successfull
 */
function foundDataCallback(done, err, data) {
    if (err) {
        return done(err);
    }
    return done(null, data);
}
