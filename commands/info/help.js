const {prefix} = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List commands or info about a command.',
    aliases: ['commands', 'h', 'halp'],
    usage: '.help [command]',
    category: 'info',
    execute(client, message, args) {
        if(args[0]) {
            return getcmd(client, message, args[0]);
        } else {
            return getall(client, message);
        }
    },
};

function getall(client, message) {
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category == category)
            .map(cmd => `- \`${cmd.name}\``)
            .join(', ');
    }

    const info = client.categories
        .map(cat => `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + '\n' + category);
    return message.channel.send(embed.setDescription(info));
}

function getcmd(client, message, args) {
    const embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}`)

    const cmd = client.commands.get(args.toLowerCase()) || client.commands.get(client.aliases.get(args.toLowerCase()));

    let info = `No information found for command **${args.toLowerCase()}**`;

    if(!cmd || cmd.hidden) {
        return message.channel.send(embed.setDescription(info));
    }

    if(cmd.name) info = `**Name**: ${cmd.name}`;
    if(cmd.description) info += `\n**Description**: ${cmd.description}`;
    if(cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `${a}`).join(', ')}`;
    if(cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }
    if(cmd.category) info += `\n**Category**: ${cmd.category}`;

    return message.channel.send(embed.setColor('#0099ff').setDescription(info));
}