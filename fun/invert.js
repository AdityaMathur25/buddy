const canvacord = require ("canvacord")

const { MessageAttachment } = require("discord.js")
module.exports= {
  name:"Invert",
  description:"invert some one",
  category:"images",
  aliases:["in"],
run: async (client, message, args) => {
async function create() {
    let img = await canvacord.invert("./image.png");
    canvacord.write(img, "invert.gif");
 
    let color = await canvacord.color("#4E5D94");
    canvacord.write(color, "color.png");
}
 
create()

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let triggered = await canvacord.invert(user.displayAvatarURL({ format: "png", dynamic: true }));
    let attachment = new MessageAttachment(triggered, "invert.gif");
    return message.channel.send(attachment);
}

}
