module.exports = {
    name: "pause",
    description: 'Pause the player.',
    aliases: ['none'],
    usage: '.pause',
    category: 'music',
    execute: async(client, message, args) => {
      
      const player = message.client.manager.get(message.guild.id);
      if (!player) return message.channel.send("There is no player for this guild.");
  
      const { channel } = message.member.voice;
      
      if (!channel) return message.channel.send("You need to be in a voice channel.");
      if (channel.id !== player.voiceChannel) return message.reply("You need to be in the same voice channel as the player.");
      if (player.paused) return message.channel.send("The player is already paused.");
  
      player.pause(true);
      return message.channel.send("Paused the player.");
    }
  }