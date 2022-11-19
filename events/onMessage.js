module.exports = {
  async execute(message, client) {
    global.tt = Date.now()

    if (message.body === undefined) return console.log('Mensagem não esta no escopo')

    if (message.fromMe) return console.log('Mensagem enviada pelo bot')

    if (message.isMedia) return console.log('Mensagem é uma mídia')

    if (message.type === 'document') return console.log('Mensagem é um arquivo')
    // {
    //   const file = await client.decryptFile(message)
    //   client
    //   const buf = Buffer.from(file, "base64");
    //   const fs = require('fs')
    //   const crypto = require('crypto');
    //   const hashSum = crypto.createHash('sha256');
    //   hashSum.update(file);
    //   const hex = hashSum.digest('base64');

    //   // await fs.writeFile("image.png", buf);
    //   // console.log(message)
    //   // console.log(hashSum)
    //   // console.log('Mensagem é um arquivo')
    //   return
    // }

    // // console.log(message)


    if (!message.content.startsWith(process.env.PREFIX) &&
      !message.content.startsWith('oi') &&
      !message.content.startsWith('Oi') &&
      !message.content.startsWith('Gerenciar') &&
      !message.content.startsWith('🏠') &&
      !message.content.startsWith('📦') &&
      !message.content.startsWith('▶️') &&
      !message.content.startsWith('🔄') &&
      !message.content.startsWith('📴') &&
      !message.content.startsWith('🔃') &&
      !message.content.startsWith('📟') &&
      !message.content.startsWith('💻') &&
      !message.content.startsWith('☁️') &&
      !message.content.startsWith('❌') &&
      !message.content.startsWith('📂')) return console.log('Mensagem não é um comando')//await newMs.message(newMsg.result)

    let commands = message.content.replace('📦', 'apps')
    commands = commands.replace('📟', process.env.PREFIX + 'logs')
    commands = commands.replace('💻', process.env.PREFIX + 'fulllog')
    commands = commands.replace('▶️', process.env.PREFIX + 'start')
    commands = commands.replace('🔄', process.env.PREFIX + 'reboot')
    commands = commands.replace('📴', process.env.PREFIX + 'shutdown')
    commands = commands.replace('🔃', process.env.PREFIX + 'auto-reboot')
    commands = commands.replace('☁️', process.env.PREFIX + 'backup')
    commands = commands.replace('❌ Delete', process.env.PREFIX + 'delete')
    commands = commands.replace('📂', process.env.PREFIX + 'commit')
    commands = commands.replace('🏠 Apps', process.env.PREFIX + 'apps')
    commands = commands.replace('oi', '/oi')
    commands = commands.replace('Oi', '/Oi')
    commands = commands.replace('Gerenciar Aplicações da SquareCloud no WhatsApp', process.env.PREFIX + 'oi')

    // pega os argumentos
    const args = commands.slice(process.env.PREFIX).split(/ +/);
    // Pega os comandos
    const cmd = args.shift().toLowerCase().replace(process.env.PREFIX, '')
    // Pega o nome do comando
    if (cmd == null || cmd == '') return console.log('Commando esta vazio')

    let commandName
    try {
      commandName = client.commands.find(command => command === cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd)).name;
    } catch (err) {
      console.log(err)
      return console.log('⚠️ Este comando não é Válido!')
    }
    // Faz o require do comando
    const command = require(`../commands/${commandName}.js`);
    // Executa o comando
    if (command) command.execute(message, args);
  }
};