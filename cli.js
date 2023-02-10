#!/usr/bin/env node

import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";

const arg = minimist(process.argv.slice(2));
if(arg.h) {
	console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
        -h            Show this help message and exit.
        -n, -s        Latitude: N positive; S negative.
        -e, -w        Longitude: E positive; W negative.
        -z            Time zone: uses tz.guess() from moment-timezone by default.
        -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
        -j            Echo pretty JSON from open-meteo API and exit.`
    );
  process.exit(0);

}

const timeZone = moment.tz.guess() 
var longitude = arg.e || arg.w * -1;
var latitude = arg.n || arg.s * -1;

const link = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&daily=precipitation_hours&timezone=" + timeZone;
const response = await fetch(link);
const data = await response.json();


if (arg.j){
	console.log(data);
	process.exit(0);
}

const day = arg.d

if (data.daily.precipitation_hours[days] != 0.0) {
	console.log("You might need your galoshes");

} else {
	console.log("You will not need your galoshes");
}

if (day ==0) {
	console.log("today");
} else if (days > 1) {
	console.log("in" + day "days.")
} else {
	console.log("tomorrow");
}









