const https = require('https')
const { structBondRes } = require('./structBondRes')
const TIMEOUT = 60000

function getBond(bond) {
  let response
  https.get(`https://www.rava.com/perfil/${bond}`, (res) => {
    console.log('Requesting...')
    res.setEncoding('utf8')
    res.on('data', (data) => {
      response = structBondRes(data)
    })
    res.on('end', () => {
      if (!response) console.log(`${bond}d: There was an error. Trying again in ${TIMEOUT / 1000} seconds.`)
      else console.log(bond, response)

      console.log(`Finished at ${new Date().getHours()}:${new Date().getMinutes()}.`)
    })
  }).on('error', (err) => {
    console.log(err)
  })

}

module.exports = getBond
