const Discord = require("discord.js")
const color = "BLUE"
const non = "!"
module.exports = {
  name: "welcome",
  category: "settings",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: async(client, message, args) => {
    let missing = new Discord.MessageEmbed()
const prefix = await client.db.fetch(`prefix_${message.guild.id}`)
if(prefix === null) prefix = non
.setTitle(`**Missing Permissions**`)
 
.setDescription(`
 
 You Must Have **ADMINISTRATOR** To Use That Command.
 
`)   
 
.setFooter(message.guild.name , message.guild.iconURL())
 .setColor(color)
.setTimestamp()
 
 
 
if(!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_SERVER', 'MANAGE_CHANNELS')) return message.channel.send(missing)
 let command = args[0];


let embed = new Discord.MessageEmbed()
.setAuthor("WELCOME CONFIGURATION!")
 .setDescription("INVALID ARGUMENT \n **USAGE**```welcome <input> ```\n **INPUT**```toggle, Channel, dm, message, setImage.```")
                
.setColor("RED")
. setThumbnail(client.user.displayAvatarURL({dynamic: true}))
.setFooter(message.guild.name + " | REQUESTED BY "+ message.author.username)
.setTimestamp()
if(!command){
  return message.channel.send(embed)
  }
    
   if(command === "toggle"){
    var toggl = ["on","off"];
  
    let togglev = new Discord.MessageEmbed()
    .setDescription(`<a:tickred:785058669502398464> Please Mention on/off to turn on welcome features respectively!`)
    .setColor("RED")
     if(!toggl.includes(args[1])){
       return message.channel.send(togglev)
       }
     if(args[1] === "on"){
 
    let succ = new Discord.MessageEmbed()
    .setDescription(`<a:accepted:785058830090371073> the welcome features are successfully turned ON.`)
    .setColor("#33ff05")
    return message.channel.send(succ)
      await client.db.set(`wel-status-${message.guild.id}`, "enable")
      }
     if(args[1] === "off"){
 
    let succ = new Discord.MessageEmbed()
    .setDescription(`<a:accepted:785058830090371073> the welcome features are successfully turned OFF.`)
    .setColor("#33ff05")
    return message.channel.send(succ)
      await client.db.set(`wel-status-${message.guild.id}`, "disable")
      }
     
     }
  if(command === "message"){
    let kkt = args.join(" ");
    const emoji = client.emojis.cache.get(args[0])
    let rmb = emoji;
    let msg = kkt || rmb;
 
   console.log(emoji)
    let wrung = new Discord.MessageEmbed()

    .setDescription(`<a:tickred:785058669502398464> Please Mention your message to set your welcome message!`)

    .setColor("RED")

    
    if(!msg){
      return message.channel.send(wrung)
      }
    const em = msg
    let s = await client.db.set(`wel-msg-${message.guild.id}`, em)
        let rightu = new Discord.MessageEmbed()
.setAuthor("SET WELCOME MESSAGE")
  .setTitle("<a:accepted:785058830090371073>" + "Setted message to : ")      
 .setDescription(em)

    .setColor("RED")
    return message.channel.send(rightu)
    }
    if(command === "dm"){
      
       let toggle = ["on","off"]
         let togglev = new Discord.MessageEmbed()

    .setDescription(`<a:tickred:785058669502398464> Please Mention on/off to turn on welcome features respectively!`)

    .setColor("RED")

     if(!toggle.includes(args[1])){

       return message.channel.send(togglev)

       }

  if(args[1] === "on"){
   let on = await client.db.set(`wel-dm-${message.guild.id}`, "on")
   let succ = new Discord.MessageEmbed()

    .setDescription(`<a:accepted:785058830090371073> the dm features are successfully turned ON.`)

    .setColor("#33ff05")

    return message.channel.send(succ)  
    }if(args[1] === "off"){

   let on = await client.db.set(`wel-dm-${message.guild.id}`, "off")

   let succ = new Discord.MessageEmbed()

    .setDescription(`<a:accepted:785058830090371073> the dm features are successfully turned OFF.`)

    .setColor("#33ff05")

    return message.channel.send(succ)  

    }
       }
    if(command === "channel"){

 

let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
    
      let wr = new Discord.MessageEmbed()
      .setTitle("**CHANNEL REQUIRED**")
      .setDescription(`<a:tickred:785058669502398464> Please Mention channel | channel name | channel id  to turn on welcome features respectively!`)

    .setColor("RED")
      
if(!channel){
  return message.channel.send(wr)
  }
           let done = new Discord.MessageEmbed()
      .setAuthor("ADDED CHANNEL TO GREETINGS")
      .setTitle("**CHANNEL :**")
      .setDescription(`<a:accepted:785058830090371073> added channel as ${channel}`)
  .setColor("#33ff05")
      return message.channel.send(done)
      let id = channel.id;
     await client.db.set(`welch_${message.guild.id}`, id)
     
    client.db.export("database.json", "./").then(path => {
    console.log(`File exported to ${path}`);
});
 
 }

    if(command === "setimage"){
      
      }
      }
  
  
  }
  
