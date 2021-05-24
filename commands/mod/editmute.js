const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'editmute',
    description: 'Add or edit a mute time.',
    aliases: ['em'],
    usage: '.editmute <member> <time> [reason]',
    category: 'mod',
    execute(client, message, args) {
        /*if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can\'t use that.');

        let target = message.mentions.members.first();
        if(!target) return message.reply('Pick somebody.');

        let reason = args.slice(2).join(' ');
        if(!reason) reason = 'Hey. don\'t forget to give a reason next time.';

        if(target.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You can\'t do that to them.');

        let time = args[1];
        if(!time) return message.channel.send('How long?');

        let muted = message.guild.roles.cache.find(r => r.name === 'Muted');

        setTimeout(function(){
            target.roles.remove(muted);
            client.channels.cache.get('701905087122899054').send(unmuteEmbed);
        }, ms(time));

        let editEmbed =  new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .addFields(
            {name: 'Moderation', value: 'edit mute'},
            {name: 'Muted', value: target.user.username, inline: true},
            {name: 'Reason', value: reason, inline: true},
            {name: 'At', value: message.createdAt},
            {name: 'Moderator', value: message.author.username}
        )

        let unmuteEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .addFields(
            {name: 'Moderation:', value: 'unmute'},
            {name: 'Muted', value: target.user.username, inline: true},
            {name: 'Reason', value: 'Who knows why.', inline: true},
            {name: 'How long', value: time},
            {name: 'At', value: message.createdAt},
            {name: 'Moderator', value: message.author.username}
        )
        client.channels.cache.get('701905087122899054').send(editEmbed);
        message.channel.send(editEmbed);*/
        message.channel.send('working on it sorry')
    }
}