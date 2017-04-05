'use strict';

$(document).ready(function() {
    /*
     * Flot Interactive Chart
     * -----------------------
     */
    // We use an inline data source in the example, usually data would
    // be fetched from a server
    var data = [],
        totalPoints = 100;

    function getRandomData() {

        if (data.length > 0)
            data = data.slice(1);

        // Do a random walk
        while (data.length < totalPoints) {

            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + Math.random() * 10 - 5;

            if (y < 0) {
                y = 0;
            } else if (y > 100) {
                y = 100;
            }

            data.push(y);
        }

        // Zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]]);
        }
        console.log("Resultado random: " + res);
        //console.log(res);
        return res;
    }

    var interactive_plot = $.plot("#interactive", [0,0], {
        grid: {
            borderColor: "#f3f3f3",
            borderWidth: 1,
            tickColor: "#f3f3f3"
        },
        series: {
            shadowSize: 0, // Drawing is faster without shadows
            color: "#3c8dbc"
        },
        lines: {
            fill: true, //Converts the line chart to area chart
            color: "#3c8dbc"
        },
        yaxis: {
            min: 0,
            max: 400,
            show: true
        },
        xaxis: {
            show: true
        }
    });

    var updateInterval = 500; //Fetch data ever x milliseconds
    var realtime = "on"; //If == to on then fetch data every x seconds. else stop fetching
    function update(username, secs) {
        // getting data from server
        //console.log('username: ' + username + ', secs: ' + secs);

        //console.log(new Date());

        $.get( "/bucket", { username: username, secs: secs } )
          .done(function( data ) {
            // finished loading
            console.log("Resultado de la DB: " + [data]);
            //console.log([data]);
            interactive_plot.setData([data]);
            interactive_plot.setupGrid();
            interactive_plot.draw();
            if (realtime === "on")
                setTimeout(function(){ update(username, secs); getRandomData(); }, updateInterval);
          });
    }

    //INITIALIZE REALTIME DATA FETCHING
    if (realtime === "on") {
        update('patient', totalPoints);
    }
    //REALTIME TOGGLE
    $("#realtime .btn").click(function() {
        if ($(this).data("toggle") === "on") {
            realtime = "on";
        } else {
            realtime = "off";
        }
        update('patient', totalPoints);
    });
    /*
     * END INTERACTIVE CHART
     */

});
