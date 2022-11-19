require('dotenv').config()
const wppconnect = require('@wppconnect-team/wppconnect');

(async () => {

  const puppeteerOptions = ["--no-sandbox"]

  const browserArgs = ["--no-sandbox"]

  // Start bot service
  global.client = await wppconnect.create({
    session: 'sessionName',
    browserArgs: browserArgs,
    puppeteerOptions: { args: puppeteerOptions }
  })

  client.commands = []

  global.changed = []

})();