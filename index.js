'use strict';
const http = require(`http`);
const url = require(`url`);
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
//const express = require(`express`);

//const app = express();
const token = `5495241708:AAH3HaZ8LcgGFB_rfG9FwuqHG60LddBg6SU`;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// start
bot.onText(/\/start/,msg=>{
    bot.sendMessage(msg.chat.id,'Welcome my friend');
});

//const PORT = process.env.PORT;

// check game num
bot.onText(/\/game/,msg=>{
        var result = axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=1509510`).then(
        (result) =>{
            //console.log(result.data.response.player_count);
            bot.sendMessage(msg.chat.id,'current game player: ' + result.data.response.player_count);

        }
    );
});



//app.get(`/`,(req,res) =>{
//    res.send(`telegram  bot`);
//})

//app.listen(PORT);
//console.log(PORT.data);

//const gameNum = 1509510;
//var result = axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${gameNum}`).then(

//var result = axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=1509510`).then(
//     (result) =>{
//         console.log(result.data.response.player_count);
//     }
// );

//console.log("hello nodejs");
