var Discord = require('discord.js'),client = new Discord.Client();
var config = {
    "token": process.env.apriltoken,
    "rich": "April Administrator .",
    "prefix": "a",
    "developers": ["398165277671555072","476503634411257858"]
};
client.login(config.token).then(() => {
   console.log(`I'm ready at : ${client.user.username}`);
   client.user.setActivity(config.rich,{TYPE: "WATCHING"})});
client.on('channelCreate', async function(channel) {
    var user;
   if (!channel.name.startsWith("ticket-")) return undefined;
   var collector = new Discord.MessageCollector(channel,filter => filter.author.id == "417388989108977671" && filter.embeds[0] && filter.embeds[0].description.includes("Our"));
   collector.on('collect', async message => {
      user = message.guild.members.find(m => m.user.tag == message.embeds[0].description.split(",")[0].split("Hello ").slice(1).map(s => s).join(" "));
      if (!user) return undefined;
      channel.send(`\`#\` **اهلاً بك ،**  ${user} 

**يسعدنا اختيارك لاستضافة ابريل**

\`1\` **يرجى تحديد طلبك ..**
\`2\` **تحويل سعر المنتج او الخدمة المطلوب/ة داخل التذكرة .**
\`3\` **انتظار الرد من قبل الفريق .**
~
\`•\` **فترة تسليم اي منتج او اكمال خدمة ، من 5 دقائق و حتى 50 ساعة .** 
\`~\` **يرجى عدم المنشن .** 
\`~\` **يرجى عدم التوجه خاص .** 
\`-\` \`في حال تأخرنا عن المدة المحددة 50 ساعة سوف تكون هناك تعويضات شكراً لتفهمك\``)
   });
}).on('message', async message => {
  var args = message.content.split(" ").slice(1).join(" "),role = message.mentions.roles.first();
  if (!message.guild || message.author.bot || !message.member.hasPermission("ADMINISTRATOR") || !message.content.startsWith(config.prefix)) return undefined;
  var custommessage = "Type something to broadcast that up.";
  if (message.content.startsWith(config.prefix + "bc")) {
    if (!args) return message.reply(custommessage);
    var bcEmbed = new Discord.RichEmbed()
    .setColor("#36393e")
    .setAuthor(message.author.username,message.author.displayAvatarURL)
    .setDescription(`\`\`\`fix\n${args}\`\`\`**<a:_yes:582913238405087232> This message wil be sent to ${message.guild.members.size} members.. :leaves:**`)
    .setTimestamp();
    await message.channel.send(bcEmbed);
    message.guild.members.forEach(member => {
      member.send(args);
    });
  } else if (message.content.startsWith(config.prefix + "obc")) {
    var filter = message.guild.members.filter(member => member.user.presence.status != "offline");
    if (!args) return message.reply(custommessage);
    var obcEmbed = new Discord.RichEmbed()
    .setColor("#36393e")
    .setAuthor(message.author.username,message.author.displayAvatarURL)
    .setDescription(`\`\`\`fix\n${args}\`\`\`**<a:_yes:582913238405087232> This message wil be sent to ${filter.size} members.. :leaves:**`)
    .setTimestamp();
    await message.channel.send(obcEmbed);
    filter.forEach(member => {
      member.send(args);
    });
  } else if (message.content.startsWith(config.prefix + "rbc")) {
    if (role) args = args.split(role.toString())[1].split(" ").slice(1).join(" ");
    if (!role || !args) return message.reply(`syntax will be looks like \`\`\`fix\n${config.prefix}rbc @rolename [you super special words]\`\`\``);
    var rbcEmbed = new Discord.RichEmbed()
    .setColor("#36393e")
    .setAuthor(message.author.username,message.author.displayAvatarURL)
    .setDescription(`\`\`\`fix\n${args}\`\`\`**<a:_yes:582913238405087232> This message wil be sent to ${role.members.size} members.. :leaves:**`)
    .setTimestamp();
    await message.channel.send(rbcEmbed);
    role.members.forEach(member => {
      member.send(args);
    });
  }
  
});
