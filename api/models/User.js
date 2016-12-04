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
    }
  }
});
