<template>
  <v-container>
    <v-card>
      <v-card-title>Update Rencana</v-card-title>
      <v-form>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="todos.id"
              label="Id Rencana"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="todos.judul"
              label="Nama Rencana"
              :counter="50"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="todos.keterangan"
              label="Keterangan Rencana"
              :counter="500"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-checkbox
              v-model="todos.selesai"
              label="Rencana Sudah selesai dikerjakan"
              color="green"
              hide-details
              required
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="3" sm="4" xs="5">
            <v-btn @click="simpanData(todos)">Simpan</v-btn>
          </v-col>
          <v-col md="3" sm="4" xs="5">
            <v-btn @click="hapusData(todos)">Hapus</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <div hidden>{{ loadData }}</div>
  </v-container>
</template>

<script>
export default {
  name: "UpdateTodo",
  data() {
    return {
      todos: {
        id: null,
        judul: null,
        keterangan: null,
        selesai: false,
      },
    };
  },
  computed: {
    loadData() {
      const id = this.$route.params.id;
      const idnya = parseInt(id) - 1;
      const datanya = this.$store.state.rencana.rencana;
      if (Object.keys(datanya).length > 0) {
        this.todos.id = datanya[idnya].id;
        this.todos.judul = datanya[idnya].judul;
        this.todos.keterangan = datanya[idnya].keterangan;
        this.todos.selesai = datanya[idnya].selesai;
        console.log("data sudah di-load");
      } else {
        console.log("data belum di-load");
      }
    },
  },
  methods: {
    simpanData(data) {
      this.$store.dispatch("rencana/updatetData", { data });
    },
    hapusData(data) {
      this.$store.dispatch("rencana/deleteData", { data });
      this.$router.push("FormTodo");
      // window.location.reload();
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 10px 10px 10px 10px;
  padding: 20px 20px 20px 20px;
}
</style>