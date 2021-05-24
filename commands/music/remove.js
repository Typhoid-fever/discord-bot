const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'remove',
    description: 'Remove a track from the queue.',
    aliases:['none'],
    usage: '.remove <track>',
    category: 'music',
    execute: async (client, message, args) => {

        const {channel} = message.member.voice;

        if (!channel) return message.channel.send('You need to be in a voice channel.');

        const player = message.client.manager.get(message.guild.id);

        if (!player) return message.channel.send("There is no player for this guild.");
        if (channel.id !== player.voiceChannel) return message.reply("You need to be in the same voice channel as the player.");
        if(!args.length) return message.channel.send('Which track do you want to remove?');
        if(isNaN(args[0])) return ('Track needs to be a number.');

        const track = args[0] - 1;

        const embed = new MessageEmbed()
            .setTitle('Removed track')
            .setDescription(`[${player.queue[track].title}](${player.queue[track].uri}) [${player.queue[track].requester}]`)

        player.queue.remove(track);

        return message.channel.send(embed);
    }
}