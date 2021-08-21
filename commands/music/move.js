module.exports = {
    name: 'move',
    description: 'Move a tracks position in the queue.',
    aliases: ['switch'],
    usage: '.move <track position> <new position>',
    category: 'music',
    execute: async (client, message, args) => {

        const {channel} = message.member.voice;

        if (!channel) return message.channel.send('You need to be in a voice channel.');

        const player = message.client.manager.get(message.guild.id);
        
        if (channel.id !== player.voiceChannel) return message.reply("You need to be in the same voice channel as the player.");

        if (!player) return message.channel.send("There is no player for this guild.");

        const queue = player.queue;
    }
}