const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'reminder',
    description: 'Set a reminder.',
    aliases: ['remind-me', 'remind'],
    usage: '.reminder <time> <reason>',
    category: 'info',
    execute(client, message, args) {

        if(!args[1]) return message.channel.send('Please provide what you would like to be reminded of.')
        
        let time = ms(args[0]);
        let reminder = args.slice(1).join(' ');

        if(time > '2100000000') time = '2100000000';
        
        if(isNaN(time) || !args[0]) return message.channel.send('Please provide a valid time.');

        message.channel.send(`I will remind you in ${args[0]} of ${reminder}`);

        setTimeout(function(){
            try { 
                 return message.reply(`${reminder}`);
            } catch (error) {
                console.log(error)
            }
        }, time);
    },
}