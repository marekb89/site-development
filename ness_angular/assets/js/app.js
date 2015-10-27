/* app.js */

var users = {	"1": 
				{
					"firstName": "Janko",
					"lastName": "Hraško",
					"birthDate": "1.1.1991",
					"position": "",
					"bench": false,
					"supervisorId": "",
					"attendance": [
									{
										"date": "1.10.2015",
										"arrival": "8:00",
										"departure": "15:11",
										"fond": "8:00"
									},
									{
										"date": "2.10.2015",
										"arrival": "9:15",
										"departure": "",
										"fond": "5:00"
									},
									{
										"date": "3.10.2015",
										"arrival": "6:30",
										"departure": "19:30",
										"fond": "8:00"
									}
								]
				},
				"2":
				{
					"firstName": "Majka",
					"lastName": "Medovníková",
					"birthDate": "5.5.1995",
					"position": "",
					"bench": true,
					"supervisorId": "",
					"attendance": [
									{
										"date": "1.10.2015",
										"arrival": "9:00",
										"departure": "16:11",
										"fond": "8:00"
									},
									{
										"date": "2.10.2015",
										"arrival": "",
										"departure": "",
										"fond": "0:00"
									},
									{
										"date": "3.10.2015",
										"arrival": "7:30",
										"departure": "17:30",
										"fond": "8:00"
									}
								]
				},
				"3":
				{
					"firstName": "Danuška",
					"lastName": "Danušková",
					"birthDate": "7.2.1993",
					"position": "",
					"bench": false,
					"supervisorId": "",
					"attendance": [
									{
										"date": "1.10.2015",
										"arrival": "7:00",
										"departure": "15:11",
										"fond": "8:00"
									},
									{
										"date": "2.10.2015",
										"arrival": "",
										"departure": "",
										"fond": "0:00"
									},
									{
										"date": "3.10.2015",
										"arrival": "8:30",
										"departure": "12:30",
										"fond": "8:00"
									}
								]
				}
			};

var app = angular.module('App', ['ui.layout']);