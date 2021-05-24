const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shuffle',
    description: 'Shuffle the queue.',
    aliases:['sh'],
    usage: '.shuffle',
    category: 'music',
    execute: async (client, message, args) => {

        const {channel} = message.member.voice;

        if (!channel) return message.channel.send('You need to be in a voice channel.');

        const player = message.client.manager.get(message.guild.id);
        
        if (channel.id !== player.voiceChannel) return message.reply("You need to be in the same voice channel as the player.");

        if (!player) return message.channel.send("There is no player for this guild.");

        player.queue.shuffle();

        const embed = new MessageEmbed()
            .setTitle('Shuffled the queue')

        return message.channel.send(embed);
    }
}