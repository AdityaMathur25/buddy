const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "rradd",
    category: "reaction-role",
    description: "Adds a reaction role to a  message.",
    usage: "rradd <#channel> <messageID> <role> <emoji>",
    async run(client, message, args, flags) {
          const invalidEmbed = new Discord.MessageEmbed()
            .setAuthor("Reaction Role Add Command", client.user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 2048
            }))
            .setColor("#eb0936")
            .setTitle("Invalid Arguments")
            .addFields({
                name: "USAGE",
                value: "```rradd <#channel> <messageID> <role> <emoji>```"
            }, {
                name: "EXAMPLES",
                value: "`rradd #TRIAL 770636560281632768 @TRIAL3 🐒`"
            });
            
            if(!args[0]) return message.channel.send(invalidEmbed);
            const channel = message.mentions.channels.first();

            if(!channel) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Please enter a valid channel."}});

            if(!args[1] || isNaN(args[1])) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Please enter a valid Message ID."}});        
    
            const messageid = client.channels.cache.get(`${channel.id}`).messages.fetch(`${args[1]}`);

            //if(!messageid) return message.channel.send({embed: {color:'', description:"That is not a valid Message ID."}})

            const role = message.mentions.roles.first();

            if(!role) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Please enter a valid role you want to give with this reaction."}});

      const check = message.guild.roles.cache.find(r => r.name === `${role.name}`)|| `${args[2]}`;
            if(!check) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> The entered role is not valid. Please enter the role correctly."}});

            let customemoji = Discord.Util.parseEmoji(args[3]);

            if(!customemoji) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Please enter a valid emoji for the reaction role."}})
            
            console.log(customemoji)

            let emojicheck = message.guild.emojis.cache.find(e => e.name === args[3]) || message.guild.emojis.cache.get(customemoji.id) 

            if(!emojicheck) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> The entered emoji is not valid. Please enter the emoji correctly."}})
            
            let embed = new Discord.MessageEmbed()
                .setColor('#10de47')
                .setDescription(`<:tick_yes:746298071951867906> Added  ${emojicheck} with the role **${role.name}**`)

            message.channel.send(embed)

            const rr = new db.table('REACTION_ROLES')

            client.channels.cache.get(`${channel.id}`).messages.fetch(messageid).then(a => {
                
                a.react(emojicheck.id)

                    rr.set(`rrremove_${message.guild.id}_${args[1]}2`, channel.id);

                    rr.set(`rrremove_${message.guild.id}_${args[1]}_${args[3]}`, emojicheck.id || emojicheck.name);

                    rr.set(`rerremove_${message.guild.id}_${args[1]}`, args[1]);

                    rr.set(`emoteid_${message.guild.id}_${emojicheck.id}`, emojicheck.id || emojicheck.name);

                    rr.set(`role_${message.guild.id}_${emojicheck.id}`, role.id);
                    rr.set(`message_${message.guild.id}_${emojicheck.id}`, args[1]);
                        
            })

    }
}