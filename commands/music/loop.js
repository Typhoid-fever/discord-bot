const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Loop a track or the entire queue.',
    aliases:['repeat'],
    usage: '.repeat [track | queue | off]',
    category: 'music',
    execute: async (client, message, args) => {

        const {channel} = message.member.voice;

        if (!channel) return message.channel.send('You need to be in a voice channel.');

        const player = message.client.manager.get(message.guild.id);
        
        if (channel.id !== player.voiceChannel) return message.reply("You need to be in the same voice channel as the player.");

        if (!player) return message.channel.send("There is no player for this guild.");

        const embed = new MessageEmbed()

        if(!args[0]) {
            player.setTrackRepeat(true)
            return message.channel.send(embed);
        }

        if(args[0] === 'off') {
            player.setTrackRepeat(false);
            player.setQueueRepeat(false);
            
            embed.setTitle('Loop off.')
            return message.channel.send(embed);
        } else if(args[0] === 'track') {
            player.setTrackRepeat(true);

            embed.setTitle('Looping the track.')
                .setDescription(`[${player.queue.current.title}](${player.queue.current.uri}) [${player.queue.current.requester}]`);
            return message.channel.send(embed);
        } else if (args[0] === 'queue') {
            player.setQueueRepeat(true);

            embed.setTitle('Looping the queue.')
            return message.channel.send(embed);
        } else {
            player.setQueueRepeat(true);

            embed.setTitle('Looping the queue.')
            return message.channel.send(embed);
        }

    }
}