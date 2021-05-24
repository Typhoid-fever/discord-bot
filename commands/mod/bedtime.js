const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'bedtime',
    description: 'Mute yourself 4h to go to bed.',
    aliases: ['bt', 'putmetosleep', 'gotobed', 'sleepytime'],
    usage: '.bedtime',
    category: 'mod',
    execute: async (client, message, args) => {

        let target = message.author;
        let mtarget = message.guild.member(target);

        let time = ms('4h');

        let muted = message.guild.roles.cache.find(r => r.name === 'Muted');

        if(!muted)  {
            try {
                muted = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        color: '#000000',
                        permissions: []
                    }
                })
                message.guild.channels.cache.forEach(channel => {
                    channel.createOverwrite(muted, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                })
            } catch(e) {
                console.log(e)
            }
        }

        let bedtimeEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Bedtime :)')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setThumbnail(target.displayAvatarURL())
            .setDescription('Sleepy time <:PepeHappy:676946199139581952> <:PepeHappy:676946199139581952>')

        mtarget.roles.add(muted.id);
        message.channel.send(bedtimeEmbed);

        setTimeout(function(){
            mtarget.roles.remove(muted.id);
        }, time);
    }
}