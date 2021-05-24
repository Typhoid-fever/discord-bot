const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'kick',
    description: 'Kick a member.',
    aliases: ['k', 'curbstomp', 'cb'],
    usage: '.kick <user> [reason]',
    category: 'mod',
    execute(client, message, args){
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You can\'t use that.');

        let target = message.mentions.users.first();
        let mtarget = message.guild.member(target);
        
        if(!target) return message.channel.send('Pick somebody');

        if(mtarget.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot kick someone equal to or higher than yourself.');

        let reason = args.slice(1).join(' ') || 'Don\'t forget a reason.';

        const kickEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Kicked')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setThumbnail(target.displayAvatarURL())
            .addFields(
                {name: 'ID', value: target.id, inline: true},
                {name: 'Name', value: target.username, inline: true},
                {name: 'Moderator', value: message.member},
                {name: 'When', value: message.createdAt.toLocaleString(), inline: true},
                {name: 'Reason', value: reason}
            )

        db.add(`${target.id}.kicks`, 1);
        mtarget.kick({reason:reason});
        message.channel.send(kickEmbed);
        client.channels.cache.get('701905087122899054').send(kickEmbed);
    }
}