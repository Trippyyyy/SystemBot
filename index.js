const express = require("express");
const app = express();

app.listen(() =>  ("im ready"));
require('events').EventEmitter.defaultMaxListeners = 30;
app.use('/ping', (req, res) => {
  res.send(new Date());
});
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix ="*";

client.on('ready',()=>{
    console.log(`Bot is On! ${client.user.tag}`);
});
client.on("ready", () =>{
 client.user.setActivity(`.gg/renox`,{type:"PLAYING"})
console.log(`Logged in as ${client.user.tag}`)
}) 
////clear
client.on("message",async message =>{
let command = message.content.toLowerCase().split(" ")[0];
if (command == `${prefix}clear` || command == `${prefix}مسح` || command == `${prefix}cr`) { 
message.delete({timeout: 0})
    if(!message.channel.guild) return message.reply(`** This Command For Servers Only**`); 
     if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** You don't have perms **`);
     if(!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** I don't have perms**`);
 
    let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 100) return message.channel.send(`\`\`\`javascript
i cant delete more than 100 messages 
\`\`\``).then(messages => messages.delete(5000))
if(!messagecount) messagecount = '100';
    message.channel.messages.fetch({limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(msgs => {
    message.channel.send(`\`\`\`js
${msgs.size} عدد الرسائل التي تم مسحها
\`\`\``).then(messages => 
messages.delete({timeout:3000}));
    })
  }    
}); 

////hide unhide
  client.on('message', hie => {
      if(hie.content.startsWith(prefix + "hide")) {
      if(!hie.channel.guild) return;
      if(!hie.member.hasPermission('ADMINISTRATOR')) return hie.reply('You Dont Have Permission \`ADMINISTRATOR\`');
             hie.channel.createOverwrite(hie.guild.id, {
             VIEW_CHANNEL: false
  }) 
  hie.channel.send(new Discord.MessageEmbed()
  .setDescription("**Channel is hidden**")
  .setColor('ff0000'))
      }
  });
   
   
  client.on('message', hie => {
      if(hie.content.startsWith(prefix + "unhide")) {
      if(!hie.channel.guild) return;
      if(!hie.member.hasPermission('ADMINISTRATOR')) return hie.reply('You Dont Have Permission \`ADMINISTRATOR\` :x:');
             hie.channel.createOverwrite(hie.guild.id, {
             VIEW_CHANNEL: true
  })
  hie.channel.send(new Discord.MessageEmbed()
     .setDescription("**Channel has been unhidden**")
     .setColor('ff0000'))  
  }
  }); 

////line
const line_url = 'https://media.discordapp.net/attachments/959739158614667314/960219552157950002/Line.png';

client.once('ready', () => {
    console.log('Ready!');
});
client.on('message', message => {
    if (message.content === 'خط') {
        message.delete();
        message.channel.send({files: [line_url]});
    }
}); 
///ban
client.on('message', message => {
if (!message.guild) return;
if (message.content.startsWith(prefix + 'ban')) {
if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");      
const user = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]);
if (user) {
const member = message.guild.member(user);
if (member) {
member.ban({
reason: 'IDK',
})
.then(() => {
const embed = new Discord.MessageEmbed()
.setColor("#ff0000")
.setTitle(`**${user.username} banned from the server! ✈️**`)
message.channel.send(embed);
})
.catch(err => {
 message.reply(`I couldn't ban that user. Please check my permissions and role position.`);
console.error(err);
});
} else {
message.reply(`**I can't find ${user.id} in the ban list**`);
}
} else {
const embed = new Discord.MessageEmbed()
.setColor("#ff0000")
.setTitle("**Command: ban**")
.setDescription(`
Bans a member.

**Usage:**
${prefix}ban (user) (reason)

**Examples:**
${prefix}ban ${message.author}
${prefix}ban ${message.author} spamming
`)
message.channel.send(embed);
    }
  }
});
client.on("message", message => {
if(message.content.startsWith(prefix + "nick")){
if(message.author.bot || message.channel.type == "dm" || !message.member.hasPermission("MANAGE_NICKNAMES") || !message.guild.member(client.user).hasPermission("MANAGE_NICKNAMES")) return;
var user = message.mentions.members.first();
var args = message.content.split(" ").slice(2);
var nick = args.join(" ");
if(!user || !args) return message.channel.send(`
\`\`\`js
Command: setnick
تغيير لقب العضو.
 
الاستخدام:
#setnick (العضو)
#setnick (العضو) (اللقب الجديد)
 
أمثله للأمر:
#setnick @Kαzūma
#setnick @Kαzūma_San
\`\`\`

`);
message.guild.member(user.user).setNickname(`${nick}`);
message.channel.send(`Successfully changed **${user}** nickname to **${nick}**`);
}
});
//unban
client.on("message", message => {
  let command = message.content.split(" ")[0];
  if (command == prefix + "unban") {
    if (!message.member.hasPermission("BAN_MEMBERS")) return;
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (args == "all") {
      message.guild.fetchBans().then(zg => {
        zg.cache.forEach(NoNo => {
          message.guild.members.unban(NoNo);
        });
      });
      return message.channel.send("**Unbanned all members **");
    }
    if (!args)
      return message.channel.send("**Please Type the member ID / all**");
    message.guild
    .members.unban(args)
      .then(m => {
        message.channel.send(`**Unbanned ${m.username}**`);
      })
      .catch(stry => {
        message.channel.send(
          `**I can't find \`${args}\` in the ban list**`
        );
      });
  }
});
client.on('message', message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (message.content.startsWith(prefix + 'lock')) {
		if (!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(`You Dont Have Permissions`);
		if (!message.guild.member(client.user).hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(`I Dont Have Permissions`);
		var channel = message.mentions.channels.first() || message.channel;
		channel.createOverwrite(message.guild.id, {
			SEND_MESSAGES: false
		});
		message.channel.send(`**Done lock ${channel}**`);
	}
});

//unlock
client.on('message', message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (message.content.startsWith(prefix + 'unlock')) {
		if (!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(`You Dont Have Permissions`);
		if (!message.guild.member(client.user).hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(`I Dont Have Permissions`);
		var channel = message.mentions.channels.first() || message.channel;
		channel.createOverwrite(message.guild.id, {
			SEND_MESSAGES: true
		});
		message.channel.send(`**Done unlock ${channel}**`);
	}
});
client.on("message", (message) => { try { if (!message.guild) { return; } else if (!message.content.startsWith(prefix)) { return; } else if (message.author.bot) { return; } if (message.content.startsWith(prefix + "mute")) { if (!message.guild.roles.cache.find((role) => role.name == "mutedRole")) { let role = message.guild.roles.create({ data: { name: "Muted", }, }); } let muteRole = message.guild.roles.cache.find( (role) => role.name == "Muted" ); let targetedMember = message.mentions.members.first(); if (targetedMember.roles.cache.has(muteRole.id)) { message.channel.send("**This person is already Muted**"); } else if (!targetedMember.roles.cache.has(muteRole.id)) { targetedMember.roles .add(muteRole.id) .then(() => { message.channel.send( `**${message.member.displayName}**- ${targetedMember} Has Been Muted.` ); }) .then(() => { message.guild.channels.cache.forEach((ch) => { ch.updateOverwrite(muteRole.id, { SEND_MESSAGES: false, ADD_REACTIONS: false, }); }); }); } } else if (message.content.startsWith(prefix + "unmute")) { let muteRole = message.guild.roles.cache.find( (role) => role.name == "Muted" ); let targetedMember = message.mentions.members.first(); if (!targetedMember.roles.cache.has(muteRole.id)) { return message.channel.send("**This person is not Muted**"); } else { targetedMember.roles.remove(muteRole.id).then(() => { message.channel.send( `**${message.member.displayName}**- ${targetedMember} Has Been Unmuted.` ); }); } } } catch { /**/ } });


client.on('message', msg=> {
  if(msg.content.startsWith(prefix + 'help')) {
    var embed = new Discord.MessageEmbed()
    .setTitle(msg.guild.name)
    .setTimestamp()
    .setThumbnail(msg.guild.iconURL())
    .addField("*hide , *unhide",`Hidding Room or unhide it`)
    .addField("*lock , *unlock",`Locking room or unlock it`)
    .addField("*clear",`Deleting message in chat`)
    .addField("*mute , *unmute",`Muting a person or unmute him`)
    .addField("*nick",`Change nick name of a person`)
    .addField("*ban , *unban",`ban person or unban him`)
    .setTimestamp()
.setColor('ff0000')
   msg.channel.send(embed)
  }
});  
client.on("message", message => {
    if (message.content === prefix + 'tezAbuaws') {
      let u = message.guild.members.cache
        .filter(k => k.user.bot)
        .map(h => `<@${h.id}>`)
        .join(`\n`)
      
      message.channel.send(`**There Is ${message.guild.members.cache.filter(j => j.user.bot).size} Bot In This Server !**\n${u}`).catch(j => {
        message.channel.send('There is An Error')
      })
    
    }
  })  

////feedback
client.on('message', function(message) {
let args = message.content.split(" ").slice('').join(" ");
if(message.author.bot)return;
const sugch = message.channel.id === "960501462805405768"
if (!sugch) return false;
if(message.content.startsWith('')){
  message.delete()
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.username,message.author.avatarURL())
.setColor("ff0000")
.setDescription(`**${args}**`)
.setFooter(`General Suggestions`)
.setTimestamp()
.setThumbnail(message.author.avatarURL({ dynamic: true }))
message.channel.send(embed).then(msg => {
  msg.react('955128860276584499').then( r => {
    msg.react('955128861870395392')
  })
}) 
}
});


client.login("OTU5NzQyMTcwNzU0MDc2Nzc0.YkgTjA.rnttzQBoDE6H7vy2umdSkbSy7bE");
