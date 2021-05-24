const Discord = require('discord.js');

module.exports = {
    name: 'twitch',
    description: 'Gives a link to our twitch!',
    usage: 'none',
    aliases:['stream'],
    category: 'fun',
    execute(client, message) {
        const twitchEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Check out our Twitch!')
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(client.displayAvatarURL)
            .addField('Click the link!', 'https://www.twitch.tv/menssanctuary')
            .setFooter('Go follow our twitch!');
        message.channel.send(twitchEmbed);
    },
}


