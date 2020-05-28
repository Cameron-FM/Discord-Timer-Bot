require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const timerPreix = '/cambot'

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if (msg.content.includes(timerPreix)) {
        let minutes = msg.content.split(" ")
        let startingSeconds = parseInt(minutes[1], 10) * 60 -
            console.log(startingSeconds, " To Start With")
        msg.reply(`${startingSeconds / 60} Minute Timer Crteated`);
        let timer = setInterval(() => {
            startingSeconds -= 1
            console.log(startingSeconds, " Seconds Left")
            if (startingSeconds < 1) {
                clearInterval(timer)
                msg.reply('Times Up!');
            }
        }, 1000)
    }

});