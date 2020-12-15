const Discord = require("discord.js");
 
const { stat } = require("fs");
 
const non = "!"
 const color = "RANDOM"
 module.exports = {
 
    name: "autorole",
   category: "Administration",
 
    description: "set auto-partner channel",
 
    run: async (client, message, args) => {
 
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
 
 
 
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(missing)
 
let command = args[0];
 
let embed = new Discord.MessageEmbed()
 
.setTitle(`**Auto Role Command**`)
 
.setDescription(`
 
 
 
**Usage**
 
${prefix}autorole enable/disable | To Disable Or enable auto role
 
${prefix}autorole add [@role | role id | role name] | To Add Role to auto role
 
${prefix}autorole delete [@role | role id | role name]
 
${prefix}autorole list | To show list of the auto role
 
`)   
 
.setFooter(message.guild.name , message.guild.iconURL())
 .setColor(color)
.setTimestamp()
 
if(!command) return message.channel.send(embed);
 
 
 
if(command.toLowerCase() === 'list') {
 
 
 
let database = await client.db.fetch(`autorole-${message.guild.id}`)
 
let empty = new Discord.MessageEmbed()
 
.setTitle(`**Database Empty**`)
 
.setDescription(`
 
It's looks your guild dont have any autorole roles.
 
`)   
 
.setFooter(message.guild.name , message.guild.iconURL())
 .setColor(color)
.setTimestamp()
 
 
 
if(!database) return message.channel.send(empty)
 
let embed = new Discord.MessageEmbed()
 
.setTitle(`${message.guild.name} AutoRole List`)
 
.setThumbnail(message.guild.iconURL())
 .setColor(color)
.setFooter(message.author.username, message.author.displayAvatarURL())
 if(database && database.length){
let array =  []
 database.forEach( async (m) => {
   await array.push(`<@&${m.roleid}>`)
  }) 
  embed.setDescription(`${array.join("\n")}`)
 embed.setColor(color)
}
 
message.channel.send(embed)
 
return;
 
}
 
if(command.toLowerCase() === 'add') {
 
    let status = await client.db.fetch(`autorole-status-${message.guild.id}`)
 
    let disable = new Discord.MessageEmbed()
 
.setTitle(`**Auto-role Is disabled.**`)
 
.setDescription(`
 
To Enable auto role
 
${prefix}autorole enable
 
`)   
 
.setFooter(message.guild.name , message.guild.iconURL())
 .setColor(color)
.setTimestamp()
 
 
 
    if(status === 'disable') return message.channel.send(disable)
 
 let rolename = args.slice(1).join(" ");
 
let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name == `${rolename}`) || message.guild.roles.cache.find(r => r.id == `${args[1]}`);
 
let empty = new Discord.MessageEmbed()
 
.setTitle(`**Role Required.**`)
 
.setDescription(`
 
${prefix}autorole add [@role | role name | role id]
 
`)   
 
.setFooter(message.guild.name , message.guild.iconURL())
 .setColor(color)
.setTimestamp()
 
 
 
 
 
if(!role) return message.channel.send(empty);
 
if (message.guild.me.roles.highest.position < role.position) {
return message.channel.send("I can't access that role, place me above other roles that you want me to manage.")
}
 
 
let added = new Discord.MessageEmbed()
 
.setTitle(`**Role Added.**`)
 .setColor(color)
.setDescription(`
 
Added ${role || role.name} To AutoRole
 
`)   
 
.setFooter(message.guild.name , message.guild.iconURL())
 
.setTimestamp()
 
let data = {
 
 roleid: role.id
 
}
 
client.db.push(`autorole-${message.guild.id}`, data)
 
return message.channel.send(added)
 
 
 
}
 
if(command.toLowerCase() === 'delete') {
 
    let status = await client.db.fetch(`autorole-status-${message.guild.id}`)
 
    let disable = new Discord.MessageEmbed()
 
.setTitle(`**Auto-role Is disabled.**`)
 
.setDescription(`
 
To Enable auto role
 
${prefix}autorole enable
 
`)   
 .setColor(color)
.setFooter(message.guild.name , message.guild.iconURL())
 
.setTimestamp()
 
 
 
    if(status === 'disable') return message.channel.send(disable)
 
     let database = await client.db.fetch(`autorole-${message.guild.id}`)
 
    let empty = new Discord.MessageEmbed()
 
    .setTitle(`**Database Empty**`)
 
    .setDescription(`
 
    It's looks your guild dont have any autorole roles.
 
    `)   
 .setColor(color)
    .setFooter(message.guild.name , message.guild.iconURL())
 
    .setTimestamp()
 
     if(!database) return message.channel.send(empty)
 
    let rolename = args.slice(1).join(" ");
 
    let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name == `${rolename}`) || message.guild.roles.cache.find(r => r.id == `${args[1]}`);
 
let rolerequired = new Discord.MessageEmbed()
 
.setTitle(`**Role Required.**`)
 
.setDescription(`
 
${prefix}autorole add [@role | role name | role id]
 
`)   
 .setColor(color)
.setFooter(message.guild.name , message.guild.iconURL())
 
.setTimestamp()
 
 
 
 
 
if(!role) return message.channel.send(rolerequired);
 
 
 
let data = database.find(x => x.roleid === role.id || role)
 
if(database) {
 
    let unabletofind = new Discord.MessageEmbed()
 
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
 .setColor(color)
    .setDescription(`
 
    ** unable to find that role on database!** 
 
    `)
 
    .setFooter(message.guild.name, message.guild.iconURL())
 
 
 
      if(!data) return message.channel.send(unabletofind)
 
 
 
  let value = database.indexOf(data)
 
  delete database[value]
 
 
 
  var filter = database.filter(x => {
 
    return x != null && x != ''
 
  })
 
 
 
  client.db.set(`autorole-${message.guild.id}`, filter)
 
let deleted = new Discord.MessageEmbed()
 
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
 
.setDescription(`
 
**Deleted ${role || role.id} Role From Auto-role!** 
 
`)
 .setColor(color)
.setFooter(message.guild.name, message.guild.iconURL())
 
 
 
  return message.channel.send(deleted)
 
 
 
 
 
} else {
 
    let okelse = new Discord.MessageEmbed()
 
.setAuthor(message.author.tag, message.author.displayAvatarURL())
 
.setDescription(`
 
** Sorry but i am unable to find that role!** 
 
`)
 .setColor(color)
.setFooter(message.guild.name, message.guild.iconURL())
 
 
 
  return message.channel.send(okelse)
 
}   
 
}
 
if(command.toLowerCase() === 'enable') {
 
    client.db.set(`autorole-status-${message.guild.id}`, 'enable')
 
let enable = new Discord.MessageEmbed()
 
.setTitle(`**Auto Role Enabled**`)
 .setColor(color)
return message.channel.send(enable)
 
}
 
if( command.toLowerCase() === 'disable') {
 
    client.db.set(`autorole-status-${message.guild.id}`, 'disable')
 
let disable = new Discord.MessageEmbed()
 
.setTitle(`**Auto Role Disabled**`)
 .setColor(color)
return message.channel.send(disable)
 
 
 
 }
 
    }}