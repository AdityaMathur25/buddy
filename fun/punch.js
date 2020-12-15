const Discord = require ("discord.js");
module.exports = {
 name:"punch",
  description:"punch some one",
  category:"images",
  run: async (client, message, arg) => {
       var member= message.mentions.members.first();
        var images = [
          'https://imgur.com/e4bi40y.gif',
          'https://imgur.com/FCXJydZ.gif',
          'https://imgur.com/jznCcr2.gif',
          'https://imgur.com/hlqNBXp.gif',
          'https://imgur.com/AmQvKOV.gif',
        
        ];
        var image = Math.floor(Math.random() * images.length);
        if(!member) return message.channel.send("you need to mention someone")
        let HugEmbed = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} you can't punch yourself `)
          .setColor("RANDOM")
         let hugembed = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} PUNCHED ${member.user.username},`)
          .setImage(String([images[image]]))
          .setColor("RANDOM")
          .setFooter(`REQUESTED BY ${message.author.username}`)
         return message.channel.send(hugembed)
  }
}


