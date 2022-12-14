import Web3, { callContract } from '../config/web3'

const accountsChanged = (commit, web3) => {
  const setAccounts = async () => {
    // When a change happens, it's necessary to get the accounts again to set the correct array into the state.
    const accounts = await web3.eth.getAccounts()
    commit('setAccounts', accounts)

    // If the accounts array is empty, it's necessary to clear the nftData state and the listener of accountsChanged.
    if (!accounts.length) {
      commit('setNftData', {})
      window.ethereum.removeListener('accountsChanged', setAccounts)
    }
  }

  // A listener is called to detect any account changes.
  window.ethereum.on('accountsChanged', setAccounts)
}

export default {
  async connectWallet({ commit }) {
    try {
      commit('setIsLoading', true)
      if (window.ethereum) {
        const web3 = Web3(window.ethereum)
        const accounts = await web3.eth.requestAccounts()
        commit('setAccounts', accounts)
        // When the accounts array has data, it's necessary to call a method to create a listener of accountsChanged.
        if (accounts.length > 0) accountsChanged(commit, web3)
      }
    } catch (error) {
      commit('setAccounts', [])
      throw new Error(error)
    } finally {
      commit('setIsLoading', false)
    }
  },
  async getAccounts({ commit }) {
    try {
      commit('setIsLoading', true)
      if (window.ethereum) {
        const web3 = Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        commit('setAccounts', accounts)
        // When the accounts array has data, it's necessary to call a method to create a listener of accountsChanged.
        if (accounts.length > 0) accountsChanged(commit, web3)
      }
    } catch (error) {
      commit('setAccounts', [])
      throw new Error(error)
    } finally {
      commit('setIsLoading', false)
    }
  },
  async getNftData({ commit }, tokenId) {
    try {
      commit('setIsLoading', true)
      const urlWithData = await callContract().methods.tokenURI(tokenId).call()
      const nftData = await this.$axios.$get(urlWithData)
      commit('setNftData', nftData)
    } catch (error) {
      commit('setNftData', {})
      throw new Error(error)
    } finally {
      commit('setIsLoading', false)
    }
  },
  async getOwnerOf({ commit }, tokenId) {
    try {
      commit('setIsLoading', true)
      const address = await callContract().methods.ownerOf(tokenId).call()
      commit('setOwner', address)
    } catch (error) {
      commit('setNftData', {})
      throw new Error(error)
    } finally {
      commit('setIsLoading', false)
    }
  },
  async getTotalSupply({ commit }) {
    try {
      commit('setIsLoading', true)
      const totalSupply = await callContract().methods.totalSupply().call()
      commit('setTotalSupply', totalSupply)
    } catch (error) {
      commit('setNftData', {})
      throw new Error(error)
    } finally {
      commit('setIsLoading', false)
    }
  },
}
