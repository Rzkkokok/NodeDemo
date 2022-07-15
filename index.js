'use strict';
const http = require(`http`);
const url = require(`url`);
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const appid = require(`appid`);
//const express = require(`express`);

//const app = express();
const token = `5495241708:AAH3HaZ8LcgGFB_rfG9FwuqHG60LddBg6SU`;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

//const botName = bot.username;
//const constGame = await appid(`Dota 2`);
// start
bot.onText(/\/start/,msg=>{
    bot.sendMessage(msg.chat.id,'Welcome my friend');
});

//const PORT = process.env.PORT;

// check game num
bot.onText(/\/game/,msg=>{
    var text = msg.text;
    var todo = text.split(` `).slice(1).join(` `);
    console.log(todo);
    var game = GameStart(todo).then(
        (theResult)=>{
            if(theResult == null)
            {
                bot.sendMessage(msg.chat.id,`i could not find the game `);
                return;
            }
            //console.log(theResult.name);
            var result = axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${theResult.appid}`).then(
                (result) =>{
                    //console.log(result.data.response.player_count);
                    if(result !=null)
                    {
                        bot.sendMessage(msg.chat.id,`current game name ` + theResult.name + `  and player: ` + result.data.response.player_count);
                    }
                    else{
                        bot.sendMessage(msg.chat.id,`i could not find the game `);
                    }
        
                }
            );
        }
    );
        //GameStart(`Dota 2`);
    //     var result = axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=1509510`).then(
    //     (result) =>{
    //         //console.log(result.data.response.player_count);
    //         bot.sendMessage(msg.chat.id,`current game and player: ` + result.data.response.player_count);

    //     }
    // );
});

bot.onText(/\/views/,msg=>{
    var result = axios.get(`https://store.steampowered.com/appreviews/1509510?json=1?filter=recent&day_range=365`).then(
        (result) =>{
            //console.log(result.data.query_summary.total_positive );
            var posNum = result.data.query_summary.total_positive;
            //console.log(result.data.query_summary.total_negative );
            var negative = result.data.query_summary.total_negative;
            //console.log(result.data.query_summary.total_reviews);
            var total = result.data.query_summary.total_reviews;
            console.log(posNum / total);
            bot.sendMessage(msg.chat.id,'current game player positive:'  + posNum + 
            ` \ntotal_negative :` + negative +  
            ` \nrate:` + posNum / total);
        }
    );
});

bot.onText(/\@${botName}/,msg=>{
    const chatId = msg.chat.id;
    axios.get(`https://store.steampowered.com/appreviews/1509510?json=1?filter=recent&day_range=365`).then(
        (result) =>{
            var thedata = result.data.query_summary;
            console.log(thedata.data);
            // bot.sendMessage(msg.chat.id,'current game player positive:'  + posNum + 
            // ` \ntotal_negative :` + negative +  
            // ` \nrate:` + posNum / total);
        }
    );
    //bot.sendMessage(chatId, `@${msg.chat.username}` + ` hi ,I Got you message`);
});
//bot.on(`text`,(msg)=>{
bot.onText(/\/reviews/,msg=>{
//bot.onText(`/\/gameviews/`,msg=>{
    //const chatId = msg.chat.id;
    const chatId = msg.chat.id;
    axios.get(`https://store.steampowered.com/appreviews/1509510?json=1?filter=recent&day_range=90&review_type=negative&language=schinese`).then(
        (result) =>{
            //var thedata = result.data.reviews;
            result.data.reviews.map(wordObj=>{
                //console.log(wordObj.review);
                bot.sendMessage(chatId, wordObj.review);
            })
            //console.log(result.data.reviews);
            //console.log();
            // result.data.map(wordObj=>{
            //     CSSCounterStyleRule.log(wordObj.reviews);
            // })
            //var data = result.data.query_summary.reviews;
            // bot.sendMessage(msg.chat.id,'current game player positive:'  + posNum + 
            // ` \ntotal_negative :` + negative +  
            // ` \nrate:` + posNum / total);
        }
    );
    //bot.sendMessage(chatId, `@${msg.chat.username}` + ` i had received you message and my name is `);
    //bot.sendMessage(chatId, bot.);
});

// bot.on(`animation`,(msg)=>{
//     //const chatId = msg.chat.id;
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, `@${msg.chat.username}` + ` i had received animation`);
// });





// bot.on(`message`,(msg)=>{
//     //const chatId = msg.chat.id;
//     const chatId = msg.chat.id;
//     //bot.sendMessage(chatId, `${msg.entities.MessageEntity}`);
// });


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

// var result = axios.get(`https://store.steampowered.com/appreviews/1509510?json=1?filter=recent&day_range=365`).then(
//     (result) =>{
//         console.log(result.data.query_summary.review_score);
//         console.log(result.data.query_summary.total_positive );
//         var posNum = result.data.query_summary.total_positive;
//         console.log(result.data.query_summary.total_negative );
//         var negative = result.data.query_summary.total_negative;
//         console.log(result.data.query_summary.total_reviews);
//         var total = result.data.query_summary.total_reviews;
//         console.log(posNum / total);
//     }
// );

bot.onText(/\/spyowner/,msg=>{
    const chatId = msg.chat.id;
    console.log(msg.text);

    axios.get(`https://steamspy.com/api.php?request=appdetails&appid=1509510`).then(
        (result) =>{
            var thedata = result.data.owners;
            console.log(thedata);
            // bot.sendMessage(msg.chat.id,'current game player positive:'  + posNum + 
            // ` \ntotal_negative :` + negative +  
            // ` \nrate:` + posNum / total);
            bot.sendMessage(chatId,  `i had received animation:` + thedata);
        }
    );
    //bot.sendMessage(chatId, `@${msg.chat.username}` + ` hi ,I Got you message`);
});

const GameStart = async function(name){
    const result = await appid(name);
    return result;
    //console.log(result);
}