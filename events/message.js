const Discord = require('discord.js');

module.exports = (client, message) => {
    const args = message.content.slice(client.prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if(message.channel.id === '824542986900733962') return message.delete();
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(client.prefix)) return;
    if(!command) return;
    //if(cmd.length === 0) return;

    if(command) {
        try {
            command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing the command');
        }
    }
};