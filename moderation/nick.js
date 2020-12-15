const discord = require("discord.js")
const db = require("quick.db")
const MessageEmbed = require("discord.js")
module.exports = {
  name: "nickname",
  aliases: ["setnick" , "nick"],
  description: "change someones name",
  category:"moderation",
  run: async (client, message, args) => {
    let perm = message.member.hasPermission("ADMINISTRATOR")
    if(!perm) return message.channel.send("No perms")
    
  let user = message.mentions.members.first()
  if(!user) return message.channel.send("user is needed")
    
    let name = args.slice(1).join(" ")
    if(!name) return message.channel.send("name is needed")
    
    user.setNickname(name)
    const dumb = new discord.MessageEmbed()
    .setTitle("NICKNAME CHANGE !")
    .setDescription(`${user.user} has changed name to ${name}!`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`REQUESTED BY @${message.author.username}`)
    message.channel.send(dumb)
  
  }
}