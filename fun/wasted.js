const canvacord = require ("canvacord")

const { MessageAttachment } = require("discord.js")
module.exports= {
  name:"wasted",
  description:"kill some one",
  category:"images",
  aliases: ["ws"],
run: async (client, message, args) => {
async function create() {
    let img = await canvacord.Canvas.wasted("./image.png");
    canvacord.write(img, "wasted.gif");
 
    let color = await canvacord.color("#4E5D94");
    canvacord.write(color, "color.png");
}
 
create()

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let faceplam = await canvacord.Canvas.wasted(user.displayAvatarURL({ format: "png", dynamic: true }));
    let attachment = new MessageAttachment(faceplam, "wasted.gif");
    return message.channel.send(attachment);
}

}
