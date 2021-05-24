const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'infractions',
    description: 'Check the number of infractions of a user.',
    aliases: ['inf', 'mistakes'],
    usage: '.infractions',
    category: 'mod',
    execute: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can\'t use that.');
        
        let target = message.mentions.users.first();
        let mtarget = message.guild.member(target);

        if(!target) return message.reply('Pick somebody.');

        const infractionsEmbed = new Discord.MessageEmbed()
            .setTitle('Infractions')
            .setColor('RED')
            .setThumbnail(target.displayAvatarURL())
            .setAuthor(message.guild.name, message.guild.iconURL())
            
        const infractions = db.get(`${target.id}.infractions`);

        if(!infractions){
            return message.channel.send(infractionsEmbed.setDescription(`No infractions found for ${target}.`));
        }

        let info = '';

        if(infractions.warns) info += `\n**Warnings**: ${infractions.warns}`;
        if(infractions.mutes) info += `\n**Mutes**: ${infractions.mutes}`;
        if(infractions.kicks) info += `\n**Kicks**: ${infractions.kicks}`;
        if(infractions.bans) info += `\n**Bans**: ${infractions.bans}`;
        
        return message.channel.send(infractionsEmbed.setDescription(info));
    }
}