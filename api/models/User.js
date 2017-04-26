/**
 * User.js
 *
 * @description :: Modelo base para todos los usuarios. Extiende las propiedades de los modelos homónimos en
                   sails-permissions y sails-auth
 * @source      :: https://github.com/trailsjs/sails-auth/issues/119
 */

'use strict';

var _ = require('lodash');
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {
  attributes: {
    firstName: {
      type: 'string',
      required: true,
      defaultsTo: ''
    },
    lastName: {
      type: 'string',
      required: true,
      defaultsTo: ''
    },
    birthDate: {
        type: 'datetime',
        required: true,
        defaultsTo: Date.now()
    },
  }
});
