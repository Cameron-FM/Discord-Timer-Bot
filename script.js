require('dotenv').config(); //Require dotenv dependancy 
const fetch = require('node-fetch');
const Discord = require('discord.js'); //Require discord.js dependancy 
const bot = new Discord.Client();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const WEATHER_API_ACCESS_KEY = process.env.WEATHER_API_ACCESS_KEY
const preix = '/cambot'

bot.login(DISCORD_TOKEN); //Logs the bot in useing the auth token in the .env file

bot.on('ready', () => { //Logs when the bot in logged into the server and ready
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if (msg.content.split(" ")[0] === preix) { //Checks if msg starts with the prefix command '/cambot'
        if (msg.content.split(" ")[1] === 'timer') { //Check if the proceeding command is 'timer'
            //Gets the minutes specified in the message, converts to float and then into seconds
            let seconds = parseFloat(msg.content.split(" ")[2]) * 60
            msg.reply(`${msg.content.split(" ")[2]} Minute Timer Crteated`);
            timer = setInterval(() => {
                console.log(seconds, " Seconds Left")
                seconds - 1
                if (seconds < 1) {
                    clearInterval(timer)
                    msg.reply('Times Up!');
                }
            }, 1000)

        } else if (msg.content.split(" ")[1] === 'weather') {
            let location = (msg.content.split(" ")[2])
            fetch(`http://api.weatherstack.com/current?access_key=${WEATHER_API_ACCESS_KEY}&query=${location}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    msg.reply(`It's currently ${data['current']['temperature']} and ${data['current']['weather_descriptions']} in ${location}`);
                })
                .catch(err => { return msg.reply('Error! Maybe try entering a valid location.') })
        }
    }
});

/**
function startTimer(seconds) {
    timer = setInterval(() => {
        console.log(seconds, " Seconds Left")
        seconds - 1
        if (seconds < 1) {
            clearInterval(timer)
            return msg.reply('Times Up!');
        }
    }, 1000)
}
**/

/**
function getWeather(location) {
    fetch(`http://api.weatherstack.com/current?access_key=${WEATHER_API_ACCESS_KEY}&query=${location}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            return msg.reply(`It's currently ${data['current']['temperature']} and ${data['current']['weather_descriptions']}, in ${location}`);
        })
        .catch(err => { return msg.reply('Error! Maybe try entering a valid location.') })
}
**/

