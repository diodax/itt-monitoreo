/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		index: function(req, res) {
			Message.find()
						.populate('user')
						.exec(function indexMessagesFinished(err, messages) {
							if (err) {
								return res.serverError(err);
							}
							return res.view({
								user: req.user.toJSON(),
								messages: messages
							});
						});
		},

		find: function(req, res) {
			var id = req.param('id');
      Message.findOne( { id: id } )
						.exec(function findMessageFinished(err, message) {
							if (err) { return res.serverError(err); }
							if (!user) { return res.json("The message id: " + rid + " doesn't exist!"); }
							return res.view({
								user: req.user.toJSON(),
								message: message
							});
						});
		},

		create: function(req, res) {
			if (req.method.toUpperCase() == "GET") {
				User.find().exec(function findAllUsersFinished(err, users) {
					if (err) { return res.serverError(err); }
					var selectList = [];
					if (_.isArray(users) == false) {
				    users = _.castArray(users);
				  }
					for (var i = 0; i < users.length; i++) {
						var temp = { id: users[i].id, name: users[i].username + ' - ' + users[i].email };
						selectList.push(temp);
					}
					//sails.log.info({ selectUsers: selectList, user: req.user.toJSON() });
					return res.view({
						selectUsers: selectList,
						user: req.user.toJSON(),
					});
				});
			} else if (req.method.toUpperCase() == "POST") {

				// User.find({ username: req.body.user }).exec(function findUserFinished(err, user) {
				// 	if (err) { return res.serverError(err); }
				// 	req.body
				//
				// });
				Message.create(req.body)
								.exec(function createMessajeFinished(err, message) {
									if (err) { return res.serverError(err); }
									return res.view({
										user: req.user.toJSON(),
										message: message
									});
								});
			} else { return res.forbidden(); }
		},

		update: function(req, res) {
			//
		},

		delete: function(req, res) {
			//
		}
};
