const https = require('https')
const bond = process.argv[2]
const TIMEOUT = 60000

let last = {}

function main() {
  https.get(`https://www.rava.com/perfil/${bond}`, (res) => {
    console.log('Requesting...')
    res.setEncoding('utf8')
    res.on('data', (data) => {
      const firstLine = data.split('\n')[0]

      const splittedStr = firstLine.split(';},')

      const formattedData = splittedStr.map((s) => {
        const splitted = s.split('&quot;')

        const price = parseFloat(splitted[2]?.split(':')[1]?.slice(0, -1))
        const hour = splitted[5]
        const date = splitted[11]?.split('&')[0]

        const timestamp = new Date(`${date}T${hour}.${new Date().getMilliseconds()}Z`)
        const unixTimestamp = parseInt((new Date(timestamp).getTime() / 1000).toFixed(0))

        return { price, hour, date, timestamp, unixTimestamp }
      })

      const slicedFormattedData = formattedData.slice(1, formattedData.length - 1)

      last = slicedFormattedData[slicedFormattedData.length - 1]
    })
    res.on('end', () => {
      if (!last) console.log(`${bond}: There was an error. Trying again in ${TIMEOUT / 1000} seconds.`)
      else console.log(bond, last)

      console.log(`Finished at ${new Date().getHours()}:${new Date().getMinutes()}.`)
    })
  }).on('error', (err) => {
    console.log(err)
  })
}

const execMainRecursive = () => {
  main()
  setTimeout(execMainRecursive, TIMEOUT)
}

execMainRecursive()
