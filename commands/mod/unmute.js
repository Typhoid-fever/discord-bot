const Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Unmute a user.',
    aliases: ['um'],
    usage: '.unmute <user> [reason]',
    category: 'mod',
    execute(client, message, args){
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can\'t use that.');

        let target = message.mentions.users.first();
        let mtarget = message.guild.member(target);

        if(!target) return message.reply('Pick somebody.');

        if(mtarget.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot mute someone equal to or higher than yourself.');

        let reason = args.slice(2).join(' ') || 'Don\'t forget a reason.';

        let muted = message.guild.roles.cache.find(r => r.name === 'Muted');

        if(!mtarget.roles.cache.has(muted.id)) return message.channel.send('That person is not muted.');

        let unmuteEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Unmute')
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setThumbnail(target.displayAvatarURL())
        .addFields(
            {name: 'Name', value: target, inline: true},
            {name: 'Moderator', value: message.member, inline: true},
            {name: 'When', value: message.createdAt.toLocaleString()},
            {name: 'Reason', value: 'Mute', inline: true},
        )
            
        mtarget.roles.remove(muted.id);
        message.channel.send(unmuteEmbed);
        client.channels.cache.get('701905087122899054').send(unmuteEmbed);
    }
}