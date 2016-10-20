/**
 * DoctorController
 *
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
};
