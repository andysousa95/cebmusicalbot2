module.exports = {
  name: 'rewind',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Por favor, informe (em segundos) para voltar a música!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Por favor informe um número válido!`)
    queue.seek((queue.currentTime - time))
    message.channel.send(`Voltando a música para ${time}!`)
  }
}