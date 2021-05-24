const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'play',
  description: 'Play a song or playlist.',
  aliases: ['p','search'],
  usage: '.play <song or link>',
  category: 'music',
  execute: async (client, message, args) => {

    const { channel } = message.member.voice;

    if(!channel) return message.channel.send('You need to be in a voice channel.');

    const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id
    });

    if(player.paused && !args.length) {
      player.pause(false);
      return message.channel.send('Resumed the player.');
    }

    if (channel.id !== player.voiceChannel) return message.channel.send("You need to be in the same voice channel as the player.");
    if(!args.length) return message.channel.send('You need to specify what you want to listen to.');
    if(player.state !== 'CONNECTED') player.connect();

    const search = args.join(' ');
    let res;

    const embed = new MessageEmbed()
      .setTitle('Added to queue')

    try {
      res = await player.search(search, message.author);
      if( res.loadType === 'LOAD_FAILED') {
        if(!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch(e) {
      return message.channel.send('There was an error.');
    }

    switch(res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();

        return message.channel.send('No matches for the search.');
      case 'TRACK_LOADED':
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.size) player.play();

        if(!player.queue.size) return;

        embed.setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri}) [${message.author}]`);

        return message.channel.send(embed);
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);

        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();

        embed.setDescription(`${res.playlist.name} with ${res.tracks.length} tracks.`);

        return message.channel.send(embed);
      case 'SEARCH_RESULT':
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.size) player.play();
          
        if(!player.queue.size) return;

        embed.setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri}) [${message.author}]`);

        return message.channel.send(embed);
    }
  }
};