/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
var _ = require('underscore');

module.exports = {

	/**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DashboardController)
   */
  _config: {
    blueprints: {
      actions: true,
      rest: false
    }
  },


  /**
   * `DashboardController.index()`
   */
  index: function (req, res) {
    // Pulls user info from the session
    User.findOne({ id: req.user.id })
    .populate('roles')
    .exec(function (err, user){
      if (err) {
        return res.serverError(err);
      }
      if (!user) {
        return res.notFound("Sorry, not found");
      }
      // Extract the list of roles associated with the user
      var roles = _.pluck(user.roles, 'name');

      // Redirects to the appropiate dashboard if a match is found
      if (_.some(roles, function (val) { return val == 'admin'; })) {
        return res.redirect('/admin');
      }
      else if (_.some(roles, function (val) { return val == 'doctor'; })) {
        return res.redirect('/doctor');
      }
      else if (_.some(roles, function (val) { return val == 'patient'; })) {
        return res.redirect('/patient');
      }
      else return res.json({
        todo: 'that dashboard is not implemented yet!'
      });
    });
  },


  /**
   * `DashboardController.admin()`
   */
  admin: function (req, res) {
    var username = req.user.username;  
    return res.json({
      todo: 'admin() is not implemented yet!',
      id: req.user.id,
      username: username
    });
  },


  /**
   * `DashboardController.doctor()`
   */
  doctor: function (req, res) {
    return res.json({
      todo: 'doctor() is not implemented yet!',
      id: req.user.id
    });
  },


  /**
   * `DashboardController.patient()`
   */
  patient: function (req, res) {
    return res.json({
      todo: 'patient() is not implemented yet!',
      id: req.user.id
    });
  }
};
