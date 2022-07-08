<template>
  <div class="container-style d-flex justify-center flex-column">
    <v-row no-gutters class="py-0 px-6">
      <v-col sm="6" offset-sm="3">
        <v-text-field
          class="shearch-box pa-0 my-5"
          hide-details="auto"
          solo
          label="Serch game"
          clearable
          prepend-inner-icon="mdi-magnify"
          dense
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-btn-toggle
      class="d-flex flex-column"
      v-model="getStore"
      tile
      group
      mandatory
    >
      <div class="px-6 d-flex justify-space-between flex-wrap">
        <v-btn
          class="mx-1"
          icon
          v-for="(item, index) in getStoresList"
          :key="index"
        >
          <v-img
            max-width="32"
            :src="'https://www.cheapshark.com/' + item.images.logo"
            @click="selectStore(item)"
          >
          </v-img>
        </v-btn>
      </div>
    </v-btn-toggle>
    <div class="pa-5 d-flex justify-space-between flex-wrap">
      <div
        class="ma-2"
        v-for="(item, index) in getDealsList"
        :key="index"
        @click="goToDetail(item.gameID)"
      >
        <v-card elevation="15">
          <!-- :click="goToDetail(item.gameID)" -->
          <v-img class="game-image" :src="item.thumb"> </v-img>
        </v-card>
        <div class="d-flex justify-end text-overline mt-1 mb-2">
          <div class="price-box d-flex flex-row">
            <div
              class="percent-box px-1"
              v-if="item.salePrice - item.normalPrice"
            >
              -{{ Math.round((item.salePrice * 100) / item.normalPrice) }}%
            </div>
            <div
              class="text-through mx-1"
              v-if="item.salePrice - item.normalPrice"
            >
              {{ item.normalPrice }}$
            </div>
            <div class="px-1">{{ item.salePrice }}$</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import router from "@/router";
import { Game, Deal, GameStore } from "@/models/interfaces";

export default Vue.extend({
  name: "Home",
  created() {
    this.getStores();
    this.getDeals();
  },
  data: () => ({ selectedStore: null as any }),
  methods: {
    ...mapActions(["getStores", "getStore", "getDeals", "setStoreSelected"]),
    goToDetail(id: number) {
      router.push({ path: `/game/${id}` });
    },
    selectStore(store: GameStore) {
      console.log("pulsado");
      this.setStoreSelected(store);
    },
    getHalfStore(first: boolean) {
      let result;
      if (first && this.getStoresList.length > 0) {
        result = this.getStoresList.slice(
          0,
          Math.round(this.getStoresList.length / 2)
        );
      } else if (!first && this.getStoresList.length > 0) {
        // if (this.getStoresList.length % 2 == 0) {
        result = this.getStoresList.slice(
          Math.round(this.getStoresList.length / 2),
          this.getStoresList.length
        );
      }
      console.log("corte: ", result);
      return result;
    },
  },
  computed: {
    ...mapGetters(["getGamesList", "getDealsList", "getStoresList"]),
  },
});
</script>
<style scoped>
.container-style {
  background-color: dimgrey;
}
.v-sheet.v-card {
  border-radius: 0;
}
.percent-box {
  background-color: darkgreen;
  text-align: center;
}
.price-box {
  line-height: 28px;
  height: 28px;
  color: white;
  background-color: #000000a1;
}
.text-through {
  text-decoration: line-through;
  color: silver;
}
.game-image {
  width: 190px;
  height: 71px;
}
.shearch-box {
  border-radius: 25px;
  background-color: #0000009e;
  color: white;
}

.v-input__control {
  min-height: 35px;
}

.theme--light.v-btn--active:hover::before,
.theme--light.v-btn--active::before {
  color: blue;
  z-index: 9;
}
</style>
