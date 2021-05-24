module.exports = {
    name: "resume",
    description: 'Resume the player.',
    aliases: ['r','continue'],
    usage: '.resume',
    category: 'music',
    execute: (client, message) => {

      const player = message.client.manager.get(message.guild.id);
      if (!player) return message.channel.send("There is no player for this guild.");
  
      const { channel } = message.member.voice;
      
      if (!channel) return message.channel.send("You need to be in a voice channel.");
      if (channel.id !== player.voiceChannel) return message.channel.send("You need to be in the same voice channel as the player.");
      if (!player.paused) return message.channel.send("The player is already playing.");
  
      player.pause(false);
      return message.channel.send("Resumed the player.");
    }
  }