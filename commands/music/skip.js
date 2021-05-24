module.exports = {
    name: "skip",
    description: 'Skip the current track.',
    aliases: ['s'],
    usage: '.skip',
    category: 'music',
    execute: (client, message) => { 
      const player = message.client.manager.get(message.guild.id);
      if (!player) return message.channel.send("There is no player for this guild.");
  
      const { channel } = message.member.voice;
      if (!channel) return message.channel.send("You need to be in a voice channel.");
      if (channel.id !== player.voiceChannel) return message.reply("You need to be in the same voice channel as the player.");

      if (!player.queue.current) return message.channel.send('There is no current track.')
      const { title } = player.queue.current;

      player.stop();
      return message.channel.send(`\`${title}\` was skipped.`);
    }
  }