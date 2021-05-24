const Discord = require('discord.js');
const client = new Discord.Client();
const { Manager } = require('erela.js');
const Spotify = require('erela.js-spotify');
const { prefix, token } = require('./config.json');
require('dotenv').config();
const fs = require('fs');
const pm = require('pretty-ms');
const wait = require('util').promisify(setTimeout);
//const invites = {};
const clientID = '56c230e354ea40aaa272d294d9b672df';
const clientSecret = '2eb3c1e803a74c46a2ed157a38bf66db';
const db = require('quick.db');
const { EIDRM } = require('constants');

client.prefix = prefix;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands');

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.manager = new Manager({
  plugins: [
    new Spotify({
      clientID,
      clientSecret
    })
  ],
  nodes: [{
    host: "localhost",
    port: 2333,
    retryDelay: 5000,
  }],
  autoPlay: true,
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload)
  }
})
  .on("nodeConnect", node => console.log(`Node "${node.options.identifier}" connected.`))
  .on("nodeError", (node, error) => console.log(
    `Node "${node.options.identifier}" encountered an error: ${error.message}.`
  ))
  .on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);

    const embed = new Discord.MessageEmbed()
      .setTitle('Now playing')
      .setDescription(`[${player.queue.current.title}](${player.queue.current.uri}) [${track.requester}]`)

    channel.send(embed);  
  })
  .on("queueEnd", player => {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send("Queue has ended.");
  });


client.once("ready", () => {
    wait(1000);
    client.manager.init(client.user.id);
    console.log("Bot Is Online");
    client.user.setActivity('It\'s gonna be ok :)',{type:'Listening'});
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
});

client.on("inviteCreate", (invite) => {
    if(!invite.inviter.client) {
      db.set('invites.code', invite.code)
      db.set(`invites.${invite.code}.name`, invite.inviter)
      db.set(`invites.${invite.code}.uses`, 0)
    }

    /*const g = invite.guild;
    g.fetchInvites().then(guildInvites => {
        invites[g.id] = guildInvites;
        });*/
});

client.on('raw', payload => {
  client.manager.updateVoiceState(payload);
if(!['MESSAGE_REACTION_ADD'].includes(payload.t)) return;
let msgId = payload.d.message_id;
if(msgId === '742991820094439437') {
    const channel = client.channels.cache.get(payload.d.channel_id);
    if(channel.messages.cache.has(msgId)) return;
    channel.messages.fetch(msgId).then(msg => {
        //const emoji = payload.d.emoji.name;
        const reaction = msg.reactions.cache.get('✅');
        const user = (payload.d.user_id, client.users.cache.get(payload.d.user_id));
        client.emit('messageReactionAdd', reaction, user);
    })
}})

client.on("guildMemberAdd", (member) => {
    let joinEmbed = new Discord.MessageEmbed()
        .setColor('black')
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(member.displayName)
        .addField('Account created:', pm(Date.now() - member.user.createdTimestamp, {verbose: true}));

    let autorole = member.guild.roles.cache.get('676625392983080971');
    member.roles.add(autorole);
    let verifyrole = member.guild.roles.cache.get('828428881103028225');
    //member.roles.add(verifyrole);

    member.guild.fetchInvites().then(guildInvites => {

      const chnl = member.guild.channels.cache.get('698361306251788349');

      try {
          const invite = guildInvites.find(i => db.get(`invites.${i.code}.uses`) < i.uses);

          db.add(`invites.${invite.code}.uses`, 1)

          const inviter = db.get(`invites.${invite.code}.name`) || 'unknown';
              
          let whereFrom = '';

          chnl.send(`${member} joined from ${inviter}(${invite.uses}). ${whereFrom}`);
          return chnl.send(joinEmbed);
      } catch(e) {
        console.log(e);
          chnl.send(`${member} joined.`);
          return chnl.send(joinEmbed);

    /*member.guild.fetchInvites().then(guildInvites => {
        
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const chnl = member.guild.channels.cache.get('698361306251788349');

        try {
            //const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
            //invites[member.guild.id] = guildInvites;

            //const inviter = client.users.cache.get(invite.inviter.id) || 'unknown';
                
            let whereFrom = '';

            if(invite.code === 'd6s359hCKY') whereFrom = 'Joined from TikTok.';
            if(invite === 'QH83Gce') whereFrom = 'Joined from Instagram.';
            if(invite.code === '4CXJQKd') whereFrom = 'Joined from the Website.';

            chnl.send(`${member} joined, invited by ${inviter.username}(${invite.uses}). ${whereFrom}`);
            return chnl.send(joinEmbed);
        } catch(e) {
            chnl.send(`${member} joined.`);
            return chnl.send(joinEmbed);*/
        }
    });
});

client.login(process.env.TOKEN);