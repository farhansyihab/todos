<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-toolbar
      color="cyan"
      dark
      class="rounded-l"
      style="margin: 20px 10px 0 10px"
      @click="tampilkanMenu()"
    >
      <v-toolbar-title>Menu</v-toolbar-title>
    </v-toolbar>
    <v-list flat v-if="showMenu">
      <v-list-item-group color="primary">
        <v-list-item>
          <v-list-item-content>
            <router-link to="/" class="arahLink"
              ><v-icon>mdi-home</v-icon> Home</router-link
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <router-link :to="{ name: 'About' }" class="arahLink"
              ><v-icon>mdi-information</v-icon> About</router-link
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <router-link :to="{ name: 'Crud' }" class="arahLink"
              ><v-icon>mdi-table</v-icon> CRUD Table</router-link
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    showMenu: true,
  }),
  methods: {
    tampilkanMenu: function () {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style>
</style>