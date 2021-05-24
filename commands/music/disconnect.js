module.exports = {
    name: 'disconnect',
    description: 'Disconnect the player from the channel.',
    aliases:['dc','leave'],
    usage: '.disconnect',
    category: 'music',
    execute: async (client, message) => {

        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.channel.send("There is nothing playing.");
    
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('You need to be in the same voice channel.');
        if (channel.id !== player.voiceChannel) return message.channel.send('You need to be in the same voice channel.');
        
        player.destroy();
        return message.react('👋');
    }
}