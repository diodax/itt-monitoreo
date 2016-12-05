/**
 * Bucket.js
 *
 * @description :: A bucket model who represents the time series data recorded from the sensors
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @source      :: http://blog.mongodb.org/post/65517193370/schema-design-for-time-series-data-in-mongodb
 */
'use strict';
var _ = require('lodash');

module.exports = {

    attributes: {
        // References the patient associated with the data
        patient: {
            model: 'user',
            required: true
        },

        // TODO: Puse temporalmente la asociacion con user en vez de patient, porque es mas facil y ya
        // References the patient associated with the data
        // patient: {
        //     model: 'patient',
        //     required: true
        // },

        // Hour timestamp that represents the reading of the bucket
        hourTimestamp: {
            type: 'datetime',
            required: true,
            defaultsTo: Date.now()
        },

        // Number of samples collected
        numSamples: {
            type: 'integer',
            defaultsTo: 0
        },

        // Sum of all of the readings collected
        totalSamples: {
            type: 'integer',
            defaultsTo: 0
        },

        // Embedded object with the values of the readings
        values: {
            type: 'json',
            //isValidBucket: true,
            defaultsTo: function() {
                var readings = {};
                var minute = {};
                for (var i = 0; i < 60; i++) {
                    minute[i] = 0;
                }
                for (var j = 0; j < 60; j++) {
                    readings[i] = minute;
                }
                return readings;
            }
        },

        // Lifecyce callbacks
        beforeCreate: function(values, cb) {
            // Check if the objet is empty
            if (_.isEmpty(values.values)) {
                var readings = {};
                var minute = {};
                for (var i = 0; i < 60; i++) {
                    minute[i] = 0;
                }
                for (var j = 0; j < 60; j++) {
                    readings[i] = minute;
                }
                values.values = readings;
            }
            cb();
        }
    },

    // Custom types / validation rules
    // (available for use in this model's attribute definitions above)
    types: {
        isValidBucket: function(value) {
            /**
             * Checks if the inserted value is a valid integer
             * @param { Object } obj - The values object to validate
             * @param { Boolean } [checkValue = false] - Tells whenever or not to validate the data of the property
             * @returns { Boolean } True if the value meets the criteria, false otherwise
             */
            function isValueValid(val) {
                return _.isInteger(val) && val !== Infinity;
            }

            /**
             * Checks if the object has 60 properties (one per each minute/second) ranging from 0 to 59
             * @param { Object } obj - The values object to validate
             * @param { Boolean } [checkValue = false] - Tells whenever or not to validate the data of the property
             * @returns { Boolean } True if the object meets the criteria, false otherwise
             */
            function hasSixtyValues(obj, checkValue) {
                if (typeof(checkValue) === 'undefined') {
                    checkValue = false;
                };

                var result = true;
                for (var i = 0; i < 60; i++) {
                    result = result && _.has(obj, String(i));
                    if (checkValue === true) {
                        result = isValueValid(obj[String(i)]);
                    }
                    if (result === false) {
                        break;
                    } // Break early if a result is false
                }
                return result;
            }

            // Validation process

            var hasSixtyMinutes = hasSixtyValues(value);
            var hasSixtySecondsEach = true;

            _.forOwn(value, function(val, key) {
                hasSixtySecondsEach = hasSixtySecondsEach && hasSixtyValues(val, true);
                if (hasSixtySecondsEach === false) {
                    return false;
                } // Break early if a result is false
            });

            return hasSixtyMinutes && hasSixtySecondsEach;
        }
    }

};


// Example Document
//
// {
//   timestamp_hour: ISODate("2013-10-10T23:00:00.000Z"),
//   values: {
//     0: { 0: 999999, 1: 999999, …, 59: 1000000 },
//     1: { 0: 2000000, 1: 2000000, …, 59: 1000000 },
//     …,
//     58: { 0: 1600000, 1: 1200000, …, 59: 1100000 },
//     59: { 0: 1300000, 1: 1400000, …, 59: 1500000 }
//   }
// }
