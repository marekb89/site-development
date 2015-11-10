var app = angular.module('App');

app.service('mainService', ['$http', '$q', '$filter', function($http, $q, $filter) {

    var deferred = $q.defer();
 
    this.getUsers = function (getUrl, getParams) {
        return $http.get(getUrl, {params: getParams})
            .then(function (response) {
                response.data = addMethods(response.data);
                deferred.resolve(response.data);
                return deferred.promise;
            }, function (response) {
                addMethods(users);
                response.defaultData = users;
                deferred.reject(response);
                return deferred.promise;
            }
        );
    };

    var addMethods = function(usersObj) {

      var timeAtWorkMonth = function(user) {
        var timeSummary = 0;
        for (day in usersObj[user].attendance) {
          var timeAtWork = $filter('toMinutes')(usersObj[user].attendance[day].timeAtWork);
          if(timeAtWork) {
            timeSummary = timeSummary + timeAtWork;
          }
        }
        return timeSummary;
      };

      var fondTimeMonth = function(user) {
        var fondTimeSummary = 0;
        for (day in usersObj[user].attendance) {
          var fondTime = $filter('toMinutes')(usersObj[user].attendance[day].fond);
          fondTimeSummary = fondTimeSummary + fondTime;
        }
        return fondTimeSummary;
      };

      var percentTimeAtWork = function(user) {
        return ((usersObj[user].timeAtWorkMonth / usersObj[user].fondTimeMonth) * 100).toFixed(2);
      };

      var timeAtWork = function(user, day) {
        if (usersObj[user].attendance[day].departure && usersObj[user].attendance[day].arrival) {
          var fondMinutes = $filter('toMinutes')(usersObj[user].attendance[day].fond);
          var arrivalMinutes = $filter('toMinutes')(usersObj[user].attendance[day].arrival);
          var departureMinutes = $filter('toMinutes')(usersObj[user].attendance[day].departure);

          var timeAtWork = departureMinutes - arrivalMinutes;

          if (fondMinutes > 4 * 60) {
            timeAtWork = timeAtWork - 30;
          };

          return timeAtWork;
        } else {
          return "";
        }        
      };

      var timeAtWorkFlag = function(user, day) {
        var fondMinutes = $filter('toMinutes')(usersObj[user].attendance[day].fond);
        var timeAtWork = $filter('toMinutes')(usersObj[user].attendance[day].timeAtWork);
        if (usersObj[user].attendance[day].departure && usersObj[user].attendance[day].arrival) {
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
      };

      var supervisorName = function(supervisorId) {
        if (usersObj[usersObj[user].supervisorId]) {
          return usersObj[usersObj[user].supervisorId].firstName + " " + usersObj[usersObj[user].supervisorId].lastName;
        } else {
          return "";
        }
      };

      for (user in usersObj) {

        for (day in usersObj[user].attendance) {
          usersObj[user].attendance[day].arrival = $filter('isoDateToHoursMinutes')(usersObj[user].attendance[day].arrival);
          usersObj[user].attendance[day].departure = $filter('isoDateToHoursMinutes')(usersObj[user].attendance[day].departure);

          usersObj[user].attendance[day].timeAtWork = $filter('toHoursMinutes')(timeAtWork(user, day));
          usersObj[user].attendance[day].timeAtWorkFlag = timeAtWorkFlag(user, day);
          usersObj[user].attendance[day].supervisorName = supervisorName(user);
        }

        usersObj[user].timeAtWorkMonth = timeAtWorkMonth(user);
        usersObj[user].fondTimeMonth = fondTimeMonth(user);
        usersObj[user].percentTimeAtWork = percentTimeAtWork(user);

      }

      return usersObj;
    };

}]);

/* default JSON */
var users = { "1": 
              {
                "firstName": "Janko",
                "lastName": "Hraško",
                "birthDate": "1991-01-01",
                "position": "",
                "bench": false,
                "supervisorId": "",
                "attendance": [
                        {
                          "date": "2015-10-01",
                          "arrival": "2015-10-01T10:30",
                          "departure": "2015-10-01T15:11",
                          "fond": "8:00"
                        },
                        {
                          "date": "2015-10-02",
                          "arrival": "2015-10-02T09:15",
                          "departure": "",
                          "fond": "5:00"
                        },
                        {
                          "date": "2015-10-03",
                          "arrival": "2015-10-03T06:30",
                          "departure": "2015-10-03T18:52",
                          "fond": "4:00"
                        },
                        {
                          "date": "2015-10-04",
                          "arrival": "2015-10-04T07:30",
                          "departure": "2015-10-04T15:30",
                          "fond": "8:00"
                        },
                        {
                          "date": "2015-10-05",
                          "arrival": "2015-10-05T08:20",
                          "departure": "2015-10-05T16:50",
                          "fond": "8:00"
                        }
                      ]
              },
              "2":
              {
                "firstName": "Majka",
                "lastName": "Medovníková",
                "birthDate": "1995-05-05",
                "position": "",
                "bench": true,
                "supervisorId": "",
                "attendance": [
                        {
                          "date": "2015-10-01",
                          "arrival": "09:00",
                          "departure": "16:31",
                          "fond": "8:00"
                        },
                        {
                          "date": "2015-10-02",
                          "arrival": "",
                          "departure": "",
                          "fond": "0:00"
                        },
                        {
                          "date": "2015-10-03",
                          "arrival": "07:30",
                          "departure": "17:30",
                          "fond": "8:00"
                        }
                      ]
              },
              "3":
              {
                "firstName": "Danuška",
                "lastName": "Danušková",
                "birthDate": "1993-02-07",
                "position": "",
                "bench": false,
                "supervisorId": 1,
                "attendance": [
                        {
                          "date": "2015-10-01",
                          "arrival": "07:00",
                          "departure": "15:11",
                          "fond": "8:00"
                        },
                        {
                          "date": "2015-10-02",
                          "arrival": "",
                          "departure": "",
                          "fond": "0:00"
                        },
                        {
                          "date": "2015-10-03",
                          "arrival": "08:30",
                          "departure": "12:30",
                          "fond": "8:00"
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
                "supervisorId": 1,
                "attendance": [
                        {
                          "date": "2015-10-01",
                          "arrival": "07:00",
                          "departure": "15:11",
                          "fond": "08:00"
                        },
                        {
                          "date": "2015-10-02",
                          "arrival": "",
                          "departure": "",
                          "fond": "0:00"
                        },
                        {
                          "date": "2015-10-03",
                          "arrival": "08:30",
                          "departure": "12:30",
                          "fond": "8:00"
                        }
                      ]
              }
            };