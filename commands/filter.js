module.exports = {
  name: 'filter',
  aliases: ['filters'],
  inVoiceChannel: true,
  run: async (bot, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    const filter = args[0]
    if (filter === 'off' && queue.filters.size) queue.filters.clear()
    else if (Object.keys(bot.distube.filters).includes(filter)) {
      if (queue.filters.has(filter)) queue.filters.remove(filter)
      else queue.filters.add(filter)
    } else if (args[0]) return message.channel.send(`${client.emotes.error} | Filtro inválido`)
    message.channel.send(`Filtro de fila atual: \`${queue.filters.names.join(', ') || 'Off'}\``)
  }
}