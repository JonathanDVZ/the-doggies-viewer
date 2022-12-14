import Web3 from 'web3'
import TheDoggiesArtifact from './artifacts/TheDoggies'

let provider = null

const web3 = (newProvider) => {
  provider = newProvider
  return new Web3(provider)
}

const callContract = () => {
  const { address, abi } = TheDoggiesArtifact
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, address)

  return contract
}

export default web3

export { callContract }
