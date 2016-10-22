var _ = require('lodash');
var _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {
    /**
     * `UserController.index()`
     */
    index: function (req, res) {
        User.find()
            .populate('roles')
            .exec(function (err, users) {
                if (err) {
                    return res.serverError(err);
                }
                console.log(users);
                return res.view({
                    user: req.user.toJSON(),
                    users: users
                });
            });
    },
});
