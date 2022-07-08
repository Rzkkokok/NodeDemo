'use strict';
const http = require(`http`);
const url = require(`url`);
const axios = require('axios');

const gameNum = 1509510;
var result = axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${gameNum}`).then(

//var result = axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=1509510`).then(
    (result) =>{
        console.log(result.data.response.player_count);
    }
);

console.log("hello nodejs");