<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <Menu />
      <List />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>TODOS -- App Pencatat Rencana</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Menu from "./components/Menu";
import List from "./components/List";
export default {
  data: () => ({ drawer: null }),
  components: { Menu, List },
  mounted() {
    this.$store
      .dispatch("rencana/ambilData")
      .then((response) => JSON.stringify(response));
  },
};
</script>