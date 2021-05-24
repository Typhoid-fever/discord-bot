module.exports = {
    name: "stop",
    description: 'Stop the player and disconnect.',
    aliases: ['st'],
    usage: '.stop',
    category: 'music',
    execute: (client, message) => {

      const player = message.client.manager.get(message.guild.id);
      if (!player) return message.channel.send("There is no player for this guild.");
  
      const { channel } = message.member.voice;
      
      if (!channel) return message.channel.send("You need to be in a voice channel.");
      if (channel.id !== player.voiceChannel) return message.channel.send('You need to be in the same voice channel as the player.');
      
      player.destroy();
      return message.channel.send("Cleared the queue and left the voice channel.");
    }
  }