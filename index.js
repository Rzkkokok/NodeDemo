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

bot.onText(/\/views/,msg=>{
    var result = axios.get(`https://store.steampowered.com/appreviews/1509510?json=1?filter=recent&day_range=365`).then(
        (result) =>{
            console.log(result.data.query_summary.total_positive );
            var posNum = result.data.query_summary.total_positive;
            console.log(result.data.query_summary.total_negative );
            var negative = result.data.query_summary.total_negative;
            console.log(result.data.query_summary.total_reviews);
            var total = result.data.query_summary.total_reviews;
            console.log(posNum / total);
            bot.sendMessage(msg.chat.id,'current game player positive:'  + posNum + ` total_negative :` + negative +  ` rate:` + posNum / total);
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

var result = axios.get(`https://store.steampowered.com/appreviews/1509510?json=1?filter=recent&day_range=365`).then(
    (result) =>{
        console.log(result.data.query_summary.review_score);
        console.log(result.data.query_summary.total_positive );
        var posNum = result.data.query_summary.total_positive;
        console.log(result.data.query_summary.total_negative );
        var negative = result.data.query_summary.total_negative;
        console.log(result.data.query_summary.total_reviews);
        var total = result.data.query_summary.total_reviews;
        console.log(posNum / total);
    }
);