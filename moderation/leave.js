
    const Discord = require("discord.js")
module.exports = {
     category: "settings",
  description: "Set the welcome channel",
  name: "setleave",
   usage: "setleave <#channel>",
  run: (client, message, args) => {
 let channel = message.mentions.channels.first() //mentioned channel
     //send success message
   if(!channel) {  
    
    
      return message.channel.send("Please Mention the channel first")
     }
    //Now we gonna use quick.db
    client.db.set(`leechannel_${message.guild.id}`, channel.id) //set id in var
    return message.channel.send(`leave Channel is seted as ${channel}`)
      
  }}
