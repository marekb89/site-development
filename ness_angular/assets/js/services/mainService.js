var app = angular.module('App');

app.service('mainService', ['$http', '$q', '$filter', function($http, $q, $filter) {

    var deferred = $q.defer();
    var firstRequest = true;
    
    this.getUsers = function (getUrl, getParams) {
        
        return $http.get(getUrl, {params: getParams})
            .then(function (response) {
                response.data = calculationMethods.convertUsersObject(response.data);
                deferred.resolve(response.data);
                return deferred.promise;
            }, function (response) {
                if (firstRequest) {
                    response.defaultData = calculationMethods.convertUsersObject(users);
                    firstRequest = false;
                }
                deferred.reject(response);
                return deferred.promise;
            }
        );
    };

    this.updateUser = function (getUrl, userId, getData) {
      var url = getUrl + "/" + userId;
      var userData = calculationMethods.prepareDataForService(getData);
        return $http.put(url, userData)
            .then(function (response) {
                var usersObj = {};
                usersObj[userId] = userData;
                response.data = calculationMethods.convertUsersObject(usersObj);
                deferred.resolve(response.data);
                return deferred.promise;
            }, function (response) {
                var usersObj = {};
                usersObj[userId] = userData;
                response.defaultData = calculationMethods.convertUsersObject(usersObj);
                deferred.reject(response);
                return deferred.promise;
            }
        );
    };

    var calculationMethods = {
        timeAtWorkMonth: function(userObject) {
            var timeSummary = 0;
            for (day in userObject.attendance) {
                var timeAtWork = $filter('toMinutes')(userObject.attendance[day].timeAtWork);
                if(timeAtWork) {
                    timeSummary = timeSummary + timeAtWork;
                }
            }
            return timeSummary;
        },
        fondTimeMonth: function(userObject) {
            var fondTimeSummary = 0;
            for (day in userObject.attendance) {
                var fondTime = $filter('toMinutes')(userObject.attendance[day].fond);
                fondTimeSummary = fondTimeSummary + fondTime;
            }
            return fondTimeSummary;
        },
        percentTimeAtWork: function(userObject) {
            return ((userObject.timeAtWorkMonth / userObject.fondTimeMonth) * 100).toFixed(2);
        },
        timeAtWork: function(arrival, departure, fond) {
            if (departure && arrival) {
                var fondMinutes = $filter('toMinutes')(fond);
                var arrivalMinutes = $filter('toMinutes')(arrival);
                var departureMinutes = $filter('toMinutes')(departure);
                var timeAtWork = departureMinutes - arrivalMinutes;
                if (fondMinutes > 4 * 60) {
                    timeAtWork = timeAtWork - 30;
                };
                return timeAtWork;
            } else {
                return "";
            }
        },
        timeAtWorkFlag: function(arrival, departure, fond, timeAtWork) {
            var fondMinutes = $filter('toMinutes')(fond);
            var timeAtWork = $filter('toMinutes')(timeAtWork);
            if (departure && arrival) {
                if (timeAtWork >= 8 * 60) {
                    return "good";
                } else {
                    return "bad";
                } 
            } else if (fondMinutes == 0) {
                return false;
            } else {
                return "missing";
            }
        },
        getSupervisorName: function(supervisorId, supervisorName, usersObj) {
            if (supervisorName) {
                return supervisorName;
            } else {
                if (supervisorId) {
                    var supervisor = usersObj[supervisorId];
                    return supervisor.firstName + " " + supervisor.lastName;
                } else {
                    return "";
                }
            }
        },
        toLocalDateString: function(date) {
            var currentDayDate = new Date(date);
            return currentDayDate.getDate() + "." + (currentDayDate.getMonth() + 1) + "." + currentDayDate.getFullYear();
        },
        toIsoDateString: function(date) {
            var dateArray = date.split(".");
            var month = parseInt(dateArray[1]);
            var day = parseInt(dateArray[0]);
            if (month < 10) {month = "0" + month};
            if (day < 10) {day = "0" + day};
            return dateArray[2] + "-" + month + "-" + day;
        },
        toIsoDateTimeString: function(date, time) {
            if (time) {
                var timeArray = time.split(":");
                var hours = parseInt(timeArray[0]);
                if (hours < 10) {hours = "0" + hours};
                return date + "T" + hours + ":" + timeArray[1];
            } else {
                return "";
            } 
        },
        convertUsersObject: function(usersObj) {
            var usersObj = usersObj;
            for (user in usersObj) {
                for (day in usersObj[user].attendance) {
                    var currentDay = usersObj[user].attendance[day];
                    currentDay.date = this.toLocalDateString(currentDay.date);
                    currentDay.arrival = $filter('isoDateToHoursMinutes')(currentDay.arrival);
                    currentDay.departure = $filter('isoDateToHoursMinutes')(currentDay.departure);
                    currentDay.fond = $filter('isoDateToHoursMinutes')(currentDay.fond);
                    currentDay.timeAtWork = $filter('toHoursMinutes')(this.timeAtWork(currentDay.arrival, currentDay.departure, currentDay.fond));
                    currentDay.timeAtWorkFlag = this.timeAtWorkFlag(currentDay.arrival, currentDay.departure, currentDay.fond, currentDay.timeAtWork);
                    currentDay.supervisorName = this.getSupervisorName(currentDay.supervisorId, currentDay.supervisorName, usersObj);
                }
                var currentUser = usersObj[user];
                currentUser.fullName = currentUser.firstName + " " + currentUser.lastName;
                currentUser.birthDate = this.toLocalDateString(currentUser.birthDate);
                currentUser.timeAtWorkMonth = this.timeAtWorkMonth(currentUser);
                currentUser.fondTimeMonth = this.fondTimeMonth(currentUser);
                currentUser.percentTimeAtWork = this.percentTimeAtWork(currentUser);
            }
            return usersObj;
        },
        prepareDataForService: function(oneUserObj) {
            var oneUserObj = oneUserObj;
            oneUserObj.birthDate = this.toIsoDateString(oneUserObj.birthDate);
            for (day in oneUserObj.attendance) {
                var currentDay = oneUserObj.attendance[day];
                currentDay.date = this.toIsoDateString(currentDay.date);
                currentDay.arrival = this.toIsoDateTimeString(currentDay.date, currentDay.arrival);
                currentDay.departure = this.toIsoDateTimeString(currentDay.date, currentDay.departure);
                currentDay.fond = this.toIsoDateTimeString(currentDay.date, currentDay.fond);
            }
            return oneUserObj;
        }
    };

}]);

/* default JSON */
var users = { "1": 
              {
                "firstName": "Janko",
                "lastName": "Hraško",
                "birthDate": "1991-01-01",
                "position": "manager",
                "bench": false,
                "attendance": [
                        {
                          "date": "2015-10-01",
                          "arrival": "2015-10-01T10:30",
                          "departure": "2015-10-01T15:11",
                          "fond": "8:00",
                          "supervisorId": ""
                        },
                        {
                          "date": "2015-10-02",
                          "arrival": "2015-10-02T09:15",
                          "departure": "",
                          "fond": "5:00",
                          "supervisorId": ""
                        },
                        {
                          "date": "2015-10-03",
                          "arrival": "2015-10-03T06:30",
                          "departure": "2015-10-03T18:52",
                          "fond": "4:00",
                          "supervisorId": "3"
                        },
                        {
                          "date": "2015-10-04",
                          "arrival": "2015-10-04T07:30",
                          "departure": "2015-10-04T15:30",
                          "fond": "8:00",
                          "supervisorId": "2"
                        },
                        {
                          "date": "2015-10-05",
                          "arrival": "2015-10-05T08:20",
                          "departure": "2015-10-05T16:50",
                          "fond": "8:00",
                          "supervisorId": "2"
                        }
                      ]
              },
              "2":
              {
                "firstName": "Majka",
                "lastName": "Medovníková",
                "birthDate": "1995-05-05",
                "position": "team-leader",
                "bench": true,
                "attendance": [
                        {
                          "date": "2015-10-01",
                          "arrival": "09:00",
                          "departure": "16:31",
                          "fond": "8:00",
                          "supervisorId": ""
                        },
                        {
                          "date": "2015-10-02",
                          "arrival": "",
                          "departure": "",
                          "fond": "0:00",
                          "supervisorId": ""
                        },
                        {
                          "date": "2015-10-03",
                          "arrival": "07:30",
                          "departure": "17:30",
                          "fond": "8:00",
                          "supervisorId": ""
                        }
                      ]
              },
              "3":
              {
                "firstName": "Danuška",
                "lastName": "Danušková",
                "birthDate": "1993-02-07",
                "position": "developer",
                "bench": false,
                "attendance": [
                        {
                          "date": "2015-10-01",
                          "arrival": "07:00",
                          "departure": "15:11",
                          "fond": "8:00",
                          "supervisorId": ""
                        },
                        {
                          "date": "2015-10-02",
                          "arrival": "",
                          "departure": "",
                          "fond": "0:00",
                          "supervisorId": ""
                        },
                        {
                          "date": "2015-10-03",
                          "arrival": "08:30",
                          "departure": "12:30",
                          "fond": "8:00",
                          "supervisorId": ""
                        }
                      ]
              },
              "5":
              {
                "firstName": "Danuška",
                "lastName": "Danušková",
                "birthDate": "1993-02-07",
                "position": "",
                "bench": false,
                "attendance": [
                        {
                          "date": "2015-10-01",
                          "arrival": "07:00",
                          "departure": "15:11",
                          "fond": "8:00",
                          "supervisorId": ""
                        },
                        {
                          "date": "2015-10-02",
                          "arrival": "",
                          "departure": "",
                          "fond": "0:00",
                          "supervisorId": ""
                        },
                        {
                          "date": "2015-10-03",
                          "arrival": "08:30",
                          "departure": "12:30",
                          "fond": "8:00",
                          "supervisorId": ""
                        }
                      ]
              }
            };