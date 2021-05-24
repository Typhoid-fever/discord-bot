const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'warn',
    description: 'Warn a user',
    aliases: ['w'],
    category: 'mod',
    usage: '.warn <user> [reason]',
    execute(client, message, args){
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can\'t use that.');

        let target = message.mentions.users.first();
        let mtarget = message.guild.member(target);

        if(!target) return message.reply('Pick somebody.');

        if(mtarget.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You can\'t do that to them.');

        let reason = args.slice(1).join(' ') || 'Don\'t forget a reason.';

        let warnEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Warning')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setThumbnail(target.displayAvatarURL())
            .addFields(
                {name: 'Name', value: target, inline: true},
                {name: 'Moderator', value: message.member, inline: true},
                {name: 'When', value: message.createdAt.toLocaleString()},
                {name: 'Reason', value: reason},
            )

        db.add(`${target.id}.infractions.warns`, 1);
        message.channel.send(warnEmbed);
        client.channels.cache.get('701905087122899054').send(warnEmbed);
    }
}