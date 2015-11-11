/* Config */
var config = {
	"apiUrl": "/users",
	"startMonth": 8,
	"startYear": 2015,
	"availablePositions": {
		"": "Žiadna pozícia",
		"manager": "Manager",
		"team-leader": "Team leader",
		"developer": "Developer"
	}
}

/* App */
var app = angular.module('App', ['ui.layout', 'ui.mask']);

/* Filters */
app.filter('toHoursMinutes', function() {
	return function(input) {
		if (!input) {
			return input;
		} else {
			var hours = Math.floor(input / 60);          
			var minutes = input % 60;
			if (hours < 10) { hours = "0" + hours };
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
		var hours = parseInt(time.split(":")[0].slice(-2));
		if (hours < 10) { hours = "0" + hours; }	
			return hours + ":" + time.split(":")[1].slice(0, 2);
		}
	};
});