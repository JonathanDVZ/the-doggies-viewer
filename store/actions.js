export default {
  async getNftData({ commit }, url) {
    try {
      const nftData = await this.$axios.$get(url)
      commit('setNftData', nftData)
    } catch (error) {
      commit('setNftData', {})
      throw new Error(error)
    }
  },
}
