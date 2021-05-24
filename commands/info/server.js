const Discord = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Displays server information.',
    aliases: ['serverinfo','server-info'],
    usage: '.server',
    category: 'info',
    execute(client, message) {
        const serverEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Server Info')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setThumbnail(message.guild.iconURL())
            .addFields(
                {name: 'Owner', value: message.guild.owner.user.tag},
                {name: `Created`, value: message.guild.createdAt.toLocaleString()},
                {name: 'Member Count', value: message.guild.memberCount, inline: true},
                {name: 'ServerID', value: message.guild.id, inline: true},
            )
        message.channel.send(serverEmbed);
    },
}