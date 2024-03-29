const Discord = require('discord.js');

module.exports = (client, message) => {
    if(!message.guild) return;
    if(message.author.bot) return;
    //if(message.attachments.size < 1) return;
    const attachment = message.attachments;

    const deletedEmbed = new Discord.MessageEmbed()
        .setAuthor('Deleted Message', message.author.displayAvatarURL())
		.setDescription(`**Author:** ${message.author}, \`${message.author.username}\` \n **Channel:** ${message.channel} \n ${message.content}`)
        .setFooter(`ID: ${message.id}`)
        .setTimestamp();
    const messageAttachment = attachment.first();

    if(messageAttachment) deletedEmbed.setImage(messageAttachment.proxyURL);
    
    message.guild.channels.cache.get('694429679163277322').send(deletedEmbed);
    if(message.attachments.size < 1) return;
    message.guild.channels.cache.get('678366727691698198').send(deletedEmbed);
};