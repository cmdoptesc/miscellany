var _ = require('underscore');
var helpers = require('./helpers.js');

  // takes the raw times portion of the CSV and parses it to a object
  // in the format of:
  /*    days = {
          Mon: {
            open: 11,
            close: 23
          },
          Tue: {
            open: 11,
            close: 23
          }
        }
  */

  // times are stored in 24 decimal format (e.g. 10:15pm = 22.75)
var makeSchedule = function(rawSchedule) {
  var schedule = init(rawSchedule);

  function _parseHours(rawHours) {
    var hoursRegex = /\d*:*\d+ [ap]m - \d*:*\d+ [ap]m/;
    var openclose = rawHours.match(hoursRegex)[0].split(' - ');
    openclose[0] = helpers.to24Hr(openclose[0]);
    openclose[1] = helpers.to24Hr(openclose[1]);

    return openclose;
  }

  function _parseDays(rawDays) {
    var openDays = [];     // array of days sharing the same schedule

    var dayRangeRegex = /[a-z]{3}-[a-z]{3}/i;
    if(rawDays.match(dayRangeRegex) && rawDays.match(dayRangeRegex).length > 0) {
      var dayRange = rawDays.match(dayRangeRegex)[0].split('-');
      openDays = helpers.rangeToDays(dayRange[0], dayRange[1]);
    }

    var singleDaysRegex = /([a-zA-Z]{3})/g;
    var singleDays = rawDays.match(singleDaysRegex);

    _.each(singleDays, function(day) {
      openDays.push(day);
    });

    return openDays;
  }

  function init(rawSched) {
    var parsed = {};
    var scheds = rawSched.split('/');
    _.each(scheds, function(sched) {
      sched = sched.trim();

      var openclose = _parseHours(sched);
      var days = _parseDays(sched);

      _.each(days, function(day){
        parsed[day] = {};
        parsed[day].open = openclose[0];
        parsed[day].close = openclose[1];
      });
    });
    return parsed;
  }

  return schedule;
};

module.exports = makeSchedule;