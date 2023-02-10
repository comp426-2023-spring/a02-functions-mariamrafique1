#!/usr/bin/env node

import minimist from "minimist";
import moment from "moment-timezone";
import fetch from "node-fetch";




const arg = minimist(process.argv.slice(2)); 



if (arg.h) {
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

const timezone = moment.tz.guess()  
var latitude = arg.n || arg.s * -1;
var longitude = arg.e || arg.w * -1;
const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&daily=precipitation_hours&timezone=" + timezone;
const response = await fetch(url);
const data = await response.json();

if (arg.j){
  console.log(data);
  process.exit(0);
}

const dayOfWeek = arg.d
//if precipitation days does not = 0, u might need galoshes
//n


if(data.daily.precipitation_hours[days] != 0.0) {
  console.log("You might need your galoshes");
} 
//else you will NOT need galoshes
else{
  console.log("You will not need your galoshes");
}

//if day of week equals to 0, then its today 
if (dayOfWeek == 0) {
  console.log("today.")
} 
//if day of week is greter than 1, then use var day of week
else if (dayOfWeek > 1) {
  console.log("in " + dayOfWeek + " days.")
} 
//other wise day = tmr
else {
  console.log("tomorrow.")
}








