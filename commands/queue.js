module.exports = {
  name: 'queue',
  aliases: ['q'],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    message.channel.send(`${client.emotes.queue} | **Fila do server**\n${q}`)
  }
}