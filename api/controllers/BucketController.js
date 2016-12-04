/**
 * BucketController
 *
 * @description :: Server-side logic for managing buckets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
var moment = require('moment');

module.exports = {

    /**
     * `BucketController.update()`
     */
    update: function(req, res) {
        // Check if req.username is a valid user
        User.findOne({
                username: req.body.username
            })
            .exec(function(err, user) {
								//sails.log.info(req.body.username);
                if (err) {
                    return res.serverError(err);
                }
                if (!user) {
                    return res.json("The user " + req.body.username + " doesn't exist!");
                }
								req.user = user;
                // Check if req.timestamp is a valid datetime
                var isTimestampValid = moment(req.body.timestamp, "YYYY-MM-DDTHH:mm:ss").isValid();
								//sails.log.info('timestamp is ' + isTimestampValid);
								//sails.log.info(req.body.timestamp);
                if (isTimestampValid) {
                    var parsedTimestamp = moment(req.body.timestamp).minutes(0).seconds(0).milliseconds(0).toISOString();

                    // Check if req.bpm is a valid number
                    Bucket.findOrCreate({
                        patient: user,
                        hourTimestamp: parsedTimestamp
                    }, {
                        patient: user,
                        hourTimestamp: parsedTimestamp //,
                            //values:
                    }).exec(function callback(error, bucket) {
												//sails.log.info('callback bucket function', bucket);
                        if (error) {
                            return res.serverError(error);
                        }
												sails.log.info('New bucket added!', bucket);
                        return res.json({
                            user: req.user.toJSON(),
                            bucket: bucket
                        });
                    });
                } else {
									return res.json("The timestamp is not valid!");
								}
            });
    }
};
