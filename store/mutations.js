export default {
  setAccounts(state, payload) {
    state.accounts = payload
  },
  setNftData(state, payload) {
    state.nftData = payload
  },
  setOwner(state, payload) {
    state.owner = payload
  },
  setIsLoading(state, payload) {
    state.isLoading = payload
  },
}
