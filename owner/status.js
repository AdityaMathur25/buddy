
const db = require('quick.db')
const discord = require("discord.js")

module.exports = {
  name: "status",
  description: "Change the bot status",
  usage: "status <here>",
  category: "owner",
  ownerOnly: true,
  run: async (client, message, args) => {
    
    //OWNER ONLY COMMAND
  
    //ARGUMENT
    if(!args.length) {
      return message.channel.send("Please give status message")
    }
    
 await db.set(`status`, args.join(" "))
   await message.channel.send("`"+ "Status changed "+ "`")
    process.exit(1);
    
  }
}