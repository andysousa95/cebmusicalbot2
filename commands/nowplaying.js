module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    const song = queue.songs[0];
    message.channel.send(`${client.emotes.play} | Estou tocando **\`${song.name}\`**, por ${song.user}`);
  }
}