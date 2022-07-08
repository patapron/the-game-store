<template>
  <div v-if="getGame.info">
    <v-btn icon @click="$router.go(-1)">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-card class="mx-auto" width="480px">
      <v-img :src="getGame.info.thumb" height="180px"></v-img>

      <v-card-title>{{ getGame.info.title }}</v-card-title>

      <v-card-subtitle
        >Best hitorical price {{ getGame.cheapestPriceEver.price }}$ in
        {{ moment(getGame.cheapestPriceEver.date).format("DD-MM-YYYY") }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange lighten-2" text> Deals </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            <v-list subheader two-line>
              <v-list-item v-for="deal in getGame.deals" :key="deal.title">
                <v-img
                  class="me-4"
                  max-width="32"
                  :src="
                    'https://www.cheapshark.com/' +
                    getStoreById(deal.storeID).images.logo
                  "
                >
                </v-img>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="getStoreById(deal.storeID).storeName"
                  ></v-list-item-title>

                  <v-list-item-subtitle
                    v-text="deal.price + '$'"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1">mdi-cart</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import router from "@/router";
import { Game, Deal, GameStore } from "@/models/interfaces";

export default Vue.extend({
  name: "Home",
  created() {
    this.moment = moment;
    this.getSelectedGame(this.$route.params.id);
  },
  data: () => ({ show: false, moment: null as any }),
  methods: {
    ...mapActions(["getSelectedGame"]),
    getStoreById(id: Number): GameStore {
      return this.getStoresList.find((e: GameStore) => e.storeID === id);
    },
  },
  computed: {
    ...mapGetters(["getGame", "getStoresList"]),
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
