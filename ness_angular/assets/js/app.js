/* app.js */

var users = {	"1": 
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
										"fond": "08:00"
									},
									{
										"date": "2015-10-02",
										"arrival": "2015-10-02T09:15",
										"departure": "",
										"fond": "05:00"
									},
									{
										"date": "2015-10-03",
										"arrival": "2015-10-03T06:30",
										"departure": "2015-10-03T19:30",
										"fond": "04:00"
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
										"arrival": "2015-10-01T09:00",
										"departure": "2015-10-01T16:11",
										"fond": "08:00"
									},
									{
										"date": "2015-10-02",
										"arrival": "",
										"departure": "",
										"fond": "00:00"
									},
									{
										"date": "2015-10-03",
										"arrival": "2015-10-03T07:30",
										"departure": "2015-10-03T17:30",
										"fond": "08:00"
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
										"arrival": "2015-10-01T07:00",
										"departure": "2015-10-01T15:11",
										"fond": "08:00"
									},
									{
										"date": "2015-10-02",
										"arrival": "",
										"departure": "",
										"fond": "00:00"
									},
									{
										"date": "2015-10-03",
										"arrival": "2015-10-03T08:30",
										"departure": "2015-10-03T12:30",
										"fond": "08:00"
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
										"arrival": "2015-10-01T07:00",
										"departure": "2015-10-01T15:11",
										"fond": "08:00"
									},
									{
										"date": "2015-10-02",
										"arrival": "",
										"departure": "",
										"fond": "00:00"
									},
									{
										"date": "2015-10-03",
										"arrival": "2015-10-03T08:30",
										"departure": "2015-10-03T12:30",
										"fond": "08:00"
									}
								]
				}
			};

var app = angular.module('App', ['ui.layout', 'users-directive']);