module.exports = {
    name: 'join',
    description: 'Join the player to the voice channel.',
    aliases:['j', 'summon'],
    usage: '.join',
    category: 'music',
    execute: async (client, message) => {

        if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel.');
 
        const player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        });

        return player.connect();
    }
}