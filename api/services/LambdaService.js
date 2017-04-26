var _ = require('lodash');
var request = require('request');

module.exports = {

  sendSMS: function(options, done) {
    var api_id = "wfjdbvkrm8";
    var region_id = "us-east-1";
    var url = "https://" + api_id +  ".execute-api." + region_id + ".amazonaws.com/prod/sns-publish";

    request.post(
        url,
        { json: {
          message: options.message,
          phoneNumber: options.phoneNumber,
          subject: options.subject
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                sails.log.info(body);
            }
        }
    );
  },
};
