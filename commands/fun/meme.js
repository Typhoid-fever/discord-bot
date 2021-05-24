const Disdord = require('discord.js');
const puppy = require('random-puppy');

module.exports = {
    name: 'meme',
    description: 'Post a (hopefully) funy meme!',
    aliases: ['memes'],
    usage: '.meme',
    category: 'fun',
    execute: async (client, message, args) => {
        const reddits = ['memes', 'dankmemes'];
        const random = reddits[Math.floor(Math.random() * reddits.length)];

        const img = await puppy(random);
        const memeembed = new Disdord.MessageEmbed()
            .setColor('brown')
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(memeembed);
    }
}