<template>
  <v-card max-width="300" class="mx-auto">
    <v-toolbar
      color="cyan"
      dark
      class="rounded-l"
      style="margin: 0 10px 0 10px"
      @click="tampilkanList()"
    >
      <v-toolbar-title>List Rencana</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'FormTodo' }"
        ><v-icon>mdi-plus</v-icon></router-link
      >
    </v-toolbar>

    <v-list two-line v-if="showList">
      <template v-for="todo in rencana">
        <v-list-item :key="todo.id">
          <v-list-item-icon>
            <v-icon class="x-small">mdi-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <router-link
                :to="{ name: 'UpdateTodo', params: { id: todo.id } }"
              >
                {{ todo.judul }}
              </router-link>
            </v-list-item-title>
            <v-list-item-subtitle
              v-html="todo.keterangan"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    rencana: [],
    showList: false,
  }),
  methods: {
    tampilkanList: function () {
      this.$store.dispatch("rencana/ambilData");
      setTimeout(this.tampilkan(), 750);
    },
    tampilkan: function () {
      this.showList = !this.showList;
      this.loadData();
    },
    loadData: function () {
      const datanya = this.$store.state.rencana.rencana;
      if (Object.keys(datanya).length > 0) {
        this.rencana = datanya;
      } else {
        console.log("data belum di-load");
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch("rencana/ambilData");
  },
};
</script>