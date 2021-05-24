const Discord = require('discord.js');

module.exports = {
    name: 'findus',
    description: 'Links to our socials!',
    aliases: ['find'],
    usage: 'none',
    category: 'fun',
    execute(client, message) {
        const findusEmbed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle('Where to find us all over the place!')
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(client.displayAvatarURL)
            .addFields(
                {name: 'Tiktok', value: 'https://vm.tiktok.com/qtbukW/', inline: true},
                //{name: '\u200B', value: '\u200B', inline: true},
                {name: 'Twitch', value: 'https://www.twitch.tv/menssanctuary', inline: true},
                {name: 'Insta', value: 'https://www.instagram.com/mensanctuary/', inline: true},
                )
            .setFooter('Go follow us!');
        message.channel.send(findusEmbed);
    },
}