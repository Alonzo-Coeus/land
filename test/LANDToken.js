'use strict'

const BigNumber = web3.BigNumber
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

const Land = artifacts.require('./LANDToken')

contract('LANDToken', function ([owner, user1, user2]) {
  let world

  beforeEach(async () => {
    world = await Land.new()

    const tokenId = await world.buildTokenId(0, 0)
    await world.assignNewParcel(user1, tokenId, 'Genesis')
  })

  it('should report that the user has the correct amount of LAND', async function () {
    const numberOfLand = await world.totalSupply()
    numberOfLand.should.be.bignumber.equal(1)
  })

  it('should handle the transfer of LAND', async function () {
    const tokenId = await world.buildTokenId(0, 0)
    await world.transfer(user2, tokenId, { from: user1 })

    const balanceUser1 = await world.balanceOf(user1)
    balanceUser1.should.be.bignumber.equal(0)

    const balanceUser2 = await world.balanceOf(user2)
    balanceUser2.should.be.bignumber.equal(1)
  })

  const ONE = new BigNumber(1)
  const TWO = new BigNumber(2)
  const THREE = new BigNumber(3)

  it('should allow updating multiple LAND updates', async function () {
    await world.assignNewParcel(user1, await world.buildTokenId(ONE, THREE), 'Empty')
    await world.assignNewParcel(user1, await world.buildTokenId(ONE, TWO), 'Empty')

    await world.updateManyLandMetadata([ONE, THREE], [ONE, TWO], 'Changed', { from: user1 })

    (await world.landMetadata(ONE, THREE)).should.be.equal.to('Changed')
    (await world.landMetadata(ONE, TWO)).should.be.equal.to('Changed')
  })
})
