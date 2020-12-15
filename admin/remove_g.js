const discord = require("discord.js")
module.exports = {
 name: "removeglobal",
  description: "remove global chat channel!",
  category: "settings",
  usage: "removeglobal",
   authorPermission: ["MANAGE_CHANNEL"],
  run: async (client, message, args) => {
   const db = client.db
  await db.get(`g_${message.guild.id}`)
    let g = await db.delete(`g_${message.guild.id}`)
    return message.channel.send(`Global chat channel is now disabled!`)
  
  
  }}