const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'ban',
    description: 'Ban a member.',
    aliases: ['b', 'smite', 'tuck-in', 'hang', 'goodbye', 'no-u', 'ggez', 'mistakes-have-been-made'],
    usage: '.ban <member> [reason]',
    category: 'mod',
    execute(client, message, args) {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You can\'t use that.');

        let target = message.mentions.users.first();
        let mtarget = message.guild.member(target);

        if(!mtarget) return message.channel.send('Pick somebody.');

        if(mtarget.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot ban someone equal to or higher than yourself.');

        let reason = args.slice(1).join(' ') || 'Don\'t forget a reason.';
        
        const banEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Banned')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setThumbnail(target.displayAvatarURL())
            .addFields(
                {name: 'ID', value: target.id, inline: true},
                {name: 'Name', value: target.username, inline: true},
                {name: 'Moderator', value: message.member},
                {name: 'When', value: message.createdAt.toLocaleString(), inline: true},
                {name: 'Reason', value: reason}
            )
    
        db.add(`${target.id}.infractions.bans`, 1);
        mtarget.ban({reason:reason});
        message.channel.send(banEmbed);
        client.channels.cache.get('701905087122899054').send(banEmbed);
    }
}