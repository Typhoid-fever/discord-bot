const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'nowplaying',
    description: 'Display current track playing.',
    aliases: ['np','current'],
    usage: '.nowplaying',
    catgeory: 'music',
    execute: (client, message, args) => {

        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.channel.send("There is no player for this guild.");

        const queue = player.queue;
        const embed = new MessageEmbed()
            .setTitle(`Now playing in ${message.guild.name}`);

        if (queue.current) {
            embed.setDescription(`[${queue.current.title}](${queue.current.uri}) [${queue.current.requester}]`);
        } else return message.channel.send('There is no track currently playing.');

        return message.channel.send(embed);
    }
}