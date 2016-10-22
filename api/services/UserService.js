// var _ = require('lodash');
//
// module.exports = {
//     /**
//      * returns a list of the roles to which the user belongs
//      * @required {String} username
//      *   The identifier of the user.
//      */
//     getRolesFromUser: function(options) {
//         // check if patient list is empty
//         if (_.isEmpty(options.username)) {
//             return Promise.reject(new Error('A username must be provided!'));
//         }
//
//         User.findOne({
//                 username: options.username
//             })
//             .populate('roles')
//             .exec(function(err, user) {
//                 // If an unexpected error occurred...
//                 if (err) {
//                     return err;
//                 }
//                 // Otherwise, it worked!
//                 if (!_.isArray(user.roles)) {
//                     var roles = [user.roles];
//                     return roles;
//                 }
//                 return user.roles;
//             });
//     }
// };
