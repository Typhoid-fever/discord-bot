const Discord = require('discord.js');
//const db = require('quick.db');

module.exports = {
    name: 'stats',
    description: 'Server stats',
    usage: 'none',
    aliases: ['none'],
    category: 'info',
    hidden: true,
    execute(client, message) {
        /*let member = message.mentions.members.first() || message.member;
        
        let guild = db.fetch(`guildMessages_${message.guild.id}`);
        let messages = db.fetch(`messagesSent_${member.id}`);
        let users = db.fetch(`accounted_${member.id}`);
        let members = db.fetch('umembers');
        if(!users) {
            db.add('umembers', 1);
            db.set(`accounted_${member.id}`, true);
        }
        
        const statsEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Server Stats')
            .setAuthor(`${message.guild.name}`, 'https://i.imgur.com/LYsE1Vm.png?1')
            .addFields(
                {name: 'Guild', value: `How many messages have been sent in the server: ${guild}`},
                {name: 'Personal', value: `How many messages ${member} has sent: ${messages}`},
                {name: 'Unique Users', value: `How many different people have sent a message: ${members} I'm working on it.`}
            )
        message.channel.send(statsEmbed);*/
        message.channel.send('Sorry, this command is being worked on.');
    },
}

/// message count? active rank?