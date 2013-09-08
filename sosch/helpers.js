var _ = require('underscore');

var helpers = {
    // given a start day and end day,
    // return an array of all the days between them, inclusive
  rangeToDays: function(startDay, endDay) {
    var week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var days = [];

    var i, open = false;
      // loops twice just in case of a Sun-Thu schedule
    for(i=0; i<week.length*2; i++) {
      if(week[i%7] === startDay) { open = true; }
      if(open) { days.push(week[i%7]); }
      if(week[i%7] === endDay && open === true) { break; }
    }

    return days;
  },

    // converts time from 12-hour string into a 24-hr decimal
    //  midnight on the dot is treated as 24, but 12:15am is 0.25
  to24Hr: function(twelveHour) {
    var hoursRegex = /\d*/;
    var eveningRegex = /pm/i;

    var time = twelveHour.split(':');
    var hours = parseInt(hoursRegex.exec(time[0])[0], 10);

    if(eveningRegex.test(twelveHour) && hours < 12) {
      hours += 12;
    } else if (!eveningRegex.test(twelveHour) && hours === 12) {
      if(!time[1] || parseInt(time[1], 10) === 0) {
        hours = 24;
      } else {
        hours -= 12;
      }
    }

    if(time[1]) {
      hours += parseInt(time[1], 10)/60;
    }

    return hours;
  },

  to12Hr: function(twentyfour) {
    twentyfour = parseFloat(twentyfour);

    var min = Math.floor((twentyfour % 1) * 60);
    if(min === 0) {
      min = '';
    } else {
      min = min + '';
      min = (min.length<2) ? ':0'+ min : ':'+ min;
    }

    var hr = Math.floor(twentyfour);
    if(hr === 0 || hr === 24) {
      hr = '12'+ min +' am';
    } else if(hr === 12) {
      hr = '12'+ min +' pm';
    } else if(hr > 12) {
        hr = hr%12 + min +' pm';
    } else {
      hr = hr + min +' am';
    }

    return hr;
  },

    // since the schedule considers early morning hours as the previous
    //  day, I've set 5am as the cutoff. times between midnight and 5am
    //  will reference the previous day's schedule
  _cutoff: 5,

  getDay: function(dateObj) {
    var weekday = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat'
    };

    var hour = parseInt(dateObj.getHours(), 10);
    var day = weekday[dateObj.getDay()];

    if(hour < helpers._cutoff) {
      day = (day === 'Sun') ? 'Sat' : weekday[dateObj.getDay()-1];
    }

    return day;
  },

  getTime: function(dateObj) {
    var time = parseInt(dateObj.getHours(), 10);
    time += parseFloat(dateObj.getMinutes()/60);
    return time;
  }
};

module.exports = helpers;