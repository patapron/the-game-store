import Vue from "vue";
import Vuex from "vuex";
import { Game, Deal, GameStore } from "@/models/interfaces";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: [] as Game[],
    game: {} as Game,
    cart: {} as any,
    deals: [] as Deal[],
    stores: [] as GameStore[],
    store: {} as GameStore,
  },
  getters: {
    getGamesList: (state) => state.games,
    getDealsList: (state) => state.deals,
    getStoresList: (state) => state.stores,
    getStore: (state) => state.store,
    getGame: (state) => state.game,
  },
  mutations: {
    setGames(state, payload) {
      state.games = payload;
    },
    setGame(state, payload) {
      state.game = payload;
    },
    setDeals(state, payload) {
      state.deals = payload;
    },
    setStores(state, payload) {
      state.stores = payload;
    },
    setStore(state, payload) {
      state.store = payload;
    },
    setCart(state, payload) {
      state.cart[payload.id] = payload;
    },
  },
  actions: {
    getDeals: (state, payload) => {
      payload = payload || 1;
      fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=` + payload)
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          state.commit("setDeals", response);
        });
    },

    getStores: (state) => {
      fetch(`https://www.cheapshark.com/api/1.0/stores`)
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          state.commit("setStores", response);
          state.commit("setStore", response[0]);
        });
    },
    getSelectedGame: (state, payload) => {
      fetch(`https://www.cheapshark.com/api/1.0/games?id=` + payload)
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          state.commit("setGame", response);
        });
    },
    setStoreSelected(state, payload) {
      state.commit("setStore", payload);
      state.dispatch("getDeals", payload.storeID);
    },

    // addToCart({ commit, state }, character) {
    //   character.units = state.cart.hasOwnProperty(character.id)
    //     ? state.cart[character.id].units + 1
    //     : 1;
    //   commit("setCart", character);
    // },
    // async init ({commit}) {
    //   const response = await fetch('https://rickandmortyapi.com/api/character')
    //   const data = await response.json()
    //   commit("setCharacters", data.results);
    // },
  },
  modules: {},
});
