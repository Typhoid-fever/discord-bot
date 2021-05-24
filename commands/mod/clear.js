module.exports = {
    name: 'clear',
    description: 'Clear up to 99 messages at a time.',
    aliases: ['prune', 'purge', 'c'],
    usage: '.clear <amount> [user]',
    category: 'mod',
    execute(client, message, args){
        const amount = parseInt(args[0]) + 1;
        const target = message.mentions.users.first();

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can\'t use that.');

        if(isNaN(amount)){
            return message.reply('That is not a valid number.');
        } else if(amount <= 1 || amount > 100) {
            return message.reply('Enter a number between 1 and 99.');
        };

        message.channel.messages.fetch({ limit: 100 }).then(messages => {
            if(target) {
                const filterUser = target.id;
                messages = messages.filter(m => m.author.id === filterUser).array().slice(0, amount)
            }
            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('There was an error deleting messages in the channel.');
            })
        })
    },
};