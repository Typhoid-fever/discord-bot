const Discord = require('discord.js');

module.exports = {
    name: 'merch',
    description: 'Gives a link to our merch!',
    usage: 'none',
    category: 'fun',
    execute(client, message) {
        const merchEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Check out our merch!')
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setThumbnail('https://uploads.twitchalerts.com/000/519/564/597/26522060-mockup-161256485811580-0.png')
            .addField('Click the link!', 'https://mensanctuary.com/merch')
            .setFooter('Go check out our merch!');
        message.channel.send(merchEmbed);
    },
}