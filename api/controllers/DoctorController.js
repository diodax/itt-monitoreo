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

    test: function(req, res) {
      DoctorService.findOneByUser({ username: 'doctor' }, function findOneDone(err, data) {
        if (err) { return res.serverError(err); }
        return res.json(data);
      });

      // DoctorService.findAll(function findAllDone(err, data) {
      //   if (err) { return res.serverError(err); }
      //   return res.json(data);
      // });
    }
};
