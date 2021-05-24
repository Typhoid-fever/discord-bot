const Discord = require('discord.js');

module.exports = {
    name: 'vault',
    description: 'Send a ticket to the vault.',
    aliases: ['v'],
    hidden: true,
    usage: '.vault',
    category: 'mod',
    execute: async (client, message, args) => {
       
        if(!message.channel.name.startsWith('t-')) return message.channel.send('That doesn\'t work here!');

        const channel = message.channel;

        await channel.setParent('735694433147945000');
        channel.lockPermissions();
        channel.send('Ticket vaulted');
    }
}  