/* Config */
var config = {
	"apiUrl": "/users",
	"startMonth": 8,
	"startYear": 2015,
	"availablePositions": {
		"manager": "Manager",
		"team-leader": "Team leader",
		"developer": "Developer"
	}
}

/* App */
var app = angular.module('App', ['ui.layout']);

/* Filters */
app.filter('toHoursMinutes', function() {
	return function(input) {
		if (!input) {
			return input;
		} else {
			var hours = Math.floor(input / 60);          
			var minutes = input % 60;
			if (minutes < 10) { minutes = "0" + minutes };
			var time = hours + ":" + minutes;			
			return time;
		}
	};
});

app.filter('toMinutes', function() {
	return function(time) {
		if (!time) {
			return time;
		} else {		
			return parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
		}
	};
});

app.filter('isoDateToHoursMinutes', function() {
	return function(time) {
		if (!time) {
			return time;
		} else {		
			return time.split(":")[0].slice(-2) + ":" + time.split(":")[1].slice(0, 2);
		}
	};
});