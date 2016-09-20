/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
"use strict";

module.exports = function(req, res, next) {
  // User is allowed, proceed to the next policy or the controller
  if (req.user) {
    return next();
  }
  // User is not allowed
  res.redirect('/login');
};
