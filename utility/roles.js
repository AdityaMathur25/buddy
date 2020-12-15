const discord = require("discord.js")

module.exports = {
  name: "roles",
  description: "show the total server role with member",
  category: "utility",
  run: async (client, message, args)=>{

     let roles = message.guild.roles.cache.map(role => `${role}`);
if (roles.length > 4080) return message.channel.send("its too big to send :(")
   
 let embed = new discord.MessageEmbed()
 .setDescription(`**GUILD ROLES**\n\n${roles.slice(0, 2048).join("\n")}`)
 .setColor("RANDOM")
  return message.channel.send(embed)
  
  
    }

 }