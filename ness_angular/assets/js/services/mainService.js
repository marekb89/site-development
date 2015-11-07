var app = angular.module('App');

app.service('mainService', ['$http', '$q', function($http, $q) {

    var addMethods = function(usersObj) {

      var timeAtWorkMonth = function() {
        var timeSummary = 0;
        for (day in this.attendance) {
          if(this.attendance[day].timeAtWork()) {
            timeSummary = timeSummary + this.attendance[day].timeAtWork();
          }
        }
        return timeSummary;
      };

      var fondTimeMonth = function() {
        var fondTimeSummary = 0;
        for (day in this.attendance) {
          var fondTime = parseInt(this.attendance[day].fond.split(":")[0]*60) + parseInt(this.attendance[day].fond.split(":")[1]);
          fondTimeSummary = fondTimeSummary + fondTime;
        }
        return fondTimeSummary;
      };

      var percentTimeAtWork = function() {
        return ((this.timeAtWorkMonth() / this.fondTimeMonth()) * 100).toFixed(2);
      };

      var timeAtWork = function() {
        if (this.departure && this.arrival) {
          var fondMinutes = parseInt(this.fond.split(":")[0]*60) + parseInt(this.fond.split(":")[1]);
          var arrivalMinutes = parseInt(this.arrival.split(":")[0]*60) + parseInt(this.arrival.split(":")[1]);
          var departureMinutes = parseInt(this.departure.split(":")[0]*60) + parseInt(this.departure.split(":")[1]);

          var timeAtWork = departureMinutes - arrivalMinutes;

          if (fondMinutes > 4 * 60) {
            timeAtWork = timeAtWork - 30;
          };

          return timeAtWork;
        } else {
          return "";
        }        
      };

      var timeAtWorkFlag = function() {
        var fondMinutes = parseInt(this.fond.split(":")[0]*60) + parseInt(this.fond.split(":")[1])
        if (this.departure && this.arrival) {
          if (this.timeAtWork() >= 8 * 60) {
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

      for (user in usersObj) {

        users[user].timeAtWorkMonth = timeAtWorkMonth;
        users[user].fondTimeMonth = fondTimeMonth;
        users[user].percentTimeAtWork = percentTimeAtWork;

        for (day in usersObj[user].attendance) {
          users[user].attendance[day].timeAtWork = timeAtWork;
          users[user].attendance[day].timeAtWorkFlag = timeAtWorkFlag;

        }

      }

      return usersObj;
    };

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
                          "arrival": "10:30",
                          "departure": "15:11",
                          "fond": "8:00"
                        },
                        {
                          "date": "2015-10-02",
                          "arrival": "09:15",
                          "departure": "",
                          "fond": "5:00"
                        },
                        {
                          "date": "2015-10-03",
                          "arrival": "06:30",
                          "departure": "18:52",
                          "fond": "4:00"
                        },
                        {
                          "date": "2015-10-04",
                          "arrival": "07:30",
                          "departure": "15:30",
                          "fond": "8:00"
                        },
                        {
                          "date": "2015-10-05",
                          "arrival": "08:20",
                          "departure": "16:50",
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