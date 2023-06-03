const getBondPrice = require("./getBondPrice")

const bond = 'al30'
const fee = .6
const feeCalc = (1 + (fee / 100)) / (1 - (fee / 100))


const calcMepPrice = async () => {
  const arsBond = await getBondPrice(bond)
  const usdBond = await getBondPrice(`${bond}d`)

  console.log({arsBond, usdBond})

  const price = arsBond.price / usdBond.price
  const priceWithFee = price * feeCalc

  console.log(`MEP con  ${bond}`, { price, priceWithFee })
}

calcMepPrice()
