/**
 * BucketController
 *
 * @description :: Server-side logic for managing buckets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
var moment = require('moment');
var _ = require('lodash');

module.exports = {

    /**
     * `BucketController.update()`
     */
    update: function(req, res) {
        // Check if req.username is a valid user
        //sails.log.info("get here");
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
                //sails.log.info('The timestamp is: ', req.body.timestamp);
                // Check if req.timestamp is a valid datetime
                var isTimestampValid = moment(req.body.timestamp, "YYYY-MM-DDTHH:mm:ss").isValid();
                //sails.log.info('timestamp is ' + isTimestampValid);
                //sails.log.info(req.body.timestamp);
                if (isTimestampValid) {
                    var parsedTimestamp = moment(req.body.timestamp).minutes(0).seconds(0).milliseconds(0).toISOString();

                    // Create json object with default values
                    var readings = {};
                    for (var j = 0; j < 60; j++) {
                        var minute = {};
                        for (var i = 0; i < 60; i++) {
                            minute[i] = 0;
                        }
                        readings[j] = minute;
                    }
                    //sails.log.info('The values are: ', readings);
                    // Check if req.bpm is a valid number (meh, not neccesary)
                    var valMinute = moment(req.body.timestamp).minutes();
                    var valSecond = moment(req.body.timestamp).seconds();

                    // Assign req.body.bpm value
                    var tempMin = readings[valMinute];
                    tempMin[valSecond] = req.body.bpm;
                    readings[valMinute] = tempMin;

                    Bucket.findOne( { where: {
                        //patient: user,
                        hourTimestamp: new Date(moment(parsedTimestamp).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z')
                    }}).exec(function(err, found) {
                        if (err) {
                            return res.serverError(err);
                        }
                        if (!found) {
                            // Create
                            //sails.log.info('Found no match for ', found);
                            Bucket.create({
                                patient: user,
                                hourTimestamp: parsedTimestamp,
                                values: readings
                            }).exec(function(err, bucket) {
                                if (err) {
                                    return res.serverError(err);
                                }
                                //sails.log.info('Bucket created!', bucket);
                                return res.json({
                                    user: req.user.toJSON(),
                                    bucket: bucket
                                });
                            });
                        } else {
                            // Update
                            //sails.log.info('Old Bucket!', found.values);
                            //sails.log.info('New Bucket!', newValues);
                            var newValues = _.update(found.values, valMinute + '.' + valSecond, function(n) {
                                return req.body.bpm;
                            });

                            Bucket.update(found.id, {
                                values: newValues
                            }).exec(function(err, updated) {
                                if (err) {
                                    return res.serverError(err);
                                }
                                //sails.log.info('Bucket updated!', updated);
                                return res.json({
                                    user: req.user.toJSON(),
                                    bucket: updated
                                });
                            });
                        }
                    });

                } else {
                    sails.log.info('The timestamp is not valid!', req.body.timestamp);
                    return res.serverError("The timestamp is not valid!");
                }
            });
    }
};
