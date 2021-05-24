const Discord = require('discord.js');

module.exports = {
    name: 'user',
    description: 'Get information about a user.',
    aliases: ['userinfo', 'user-info', 'info'],
    usage: '.user [user]',
    category: 'info',
    execute(client, message) {
        let target = message.mentions.users.first() || message.author;
        let mtarget = message.guild.member(target);

        const userEmbed = new Discord.MessageEmbed()
            .setColor(mtarget.roles.highest.color)
            .setTitle('User info')
            .setAuthor(target.tag, target.displayAvatarURL())
            .setThumbnail(target.displayAvatarURL())
            .addFields(
                {name: 'ID', value: target.id, inline: true},
                {name: 'Nickname', value: `${mtarget.nickname === 0 ? target.username : mtarget.nickname}`, inline: true},
                {name: 'Status', value: target.presence.status},
                {name: 'Created', value: target.createdAt.toLocaleString()},
                {name: 'Joined Server', value: message.guild.member(target).joinedAt.toLocaleString()},
                {name: 'Highest role', value: mtarget.roles.highest, inline: true},
                {name: 'Playing', value: `${target.presence.activities.length === 0 ? 'Nothing...' : target.presence.activities}`, inline: true}
            );
            message.channel.send(userEmbed);
    }
}