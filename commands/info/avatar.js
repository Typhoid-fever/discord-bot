const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'View the avatar of a user.',
    aliases: ['pfp', 'profile', 'picture'],
    hidden: true,
    usage: '.avatar [user]',
    category: 'info',
    execute: async (client, message) => {

        let target = message.mentions.users.first() || message.author;

        let avatarEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Avatar of ${target.tag}`)
            .setImage(target.displayAvatarURL({format: 'jpeg', dynamic: true, size: 512}))

        return message.channel.send(avatarEmbed);
    }
}  