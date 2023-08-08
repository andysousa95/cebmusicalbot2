module.exports = {
  name: 'skipto',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Por favor, informe (em segundos) para voltar a música!`)
    }
    const num = Number(args[0])
    if (isNaN(num)) return message.channel.send(`${client.emotes.error} | Por favor, informe um número válido!`)
    await client.distube.jump(message, num).then(song => {
      message.channel.send({ content: `Pulou para: ${song.name}` })
    })
  }
}