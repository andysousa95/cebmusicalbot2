const { DisTube } = require("distube");
const Discord = require("discord.js");
const bot = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent
  ]
});

const fs = require("fs");
const config = require('./config.json');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');

bot.config = require('./config.json');
bot.distube = new DisTube(bot, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ],
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.emotes = config.emoji;

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Could not find any commands!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  jsFiles.forEach(file => {
    const cmd = require (`./commands/${file}`)
    console.log(`Loaded ${file}`)
    bot.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => bot.aliases.set(alias, cmd.name))
  })
})

const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`CeB Musical Bot entrou em quadra.`)
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}\n`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
bot.login(process.env.TOKEN);

bot.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  const prefix = config.prefix
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`${bot.emotes.error} | Você deve estar em um canal de voz!`)
  }
  try {
    cmd.run(bot, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${bot.emotes.error} | Erro: \`${e}\``)
  }
});

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filtro: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Toda a fila' : 'Essa música') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
  bot.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send(
      `${bot.emotes.play} | Tocando \`${song.name}\` - \`${song.formattedDuration}\`\nSolicitado por: ${
        song.user
      }\n${status(queue)}`
    )
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `${bot.emotes.success} | Adicionado \`${playlist.name}\` a playlist (${
        playlist.songs.length
      } songs) para a fila.\n${status(queue)}`
    )
  )
  .on('error', (channel, e) => {
    if (channel) channel.send(`${bot.emotes.error} | Um erro foi encontrado: ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })
  .on('empty', channel => channel.send('Canal de voz vazio, saindo...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${bot.emotes.error} | Nenhum resultado encontrado para \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Finalizado!'))

/*bot.on("message", (message) => {
  const cmdMusica = ['Comandos para usar no bot de música: .play, .pause, .stop, .resume, .vol, .skip']
  if (message.content.startsWith(".musica")) {
    let mscEmbed = new Discord.EmbedBuilder()
      .setTitle('Comandos para usar no bot de música')
      .setTimestamp()
      .setColor("#552583")
      .setDescription(`${cmdMusica}`);
    message.channel.send(mscEmbed);
  }
});*/
