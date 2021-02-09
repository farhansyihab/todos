<template>
  <v-container>
    <v-card>
      <v-card-title>Tambah Rencana</v-card-title>
      <v-form>
        <v-row v-if="mode === 'editMode'">
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
          <v-col md="3" sm="4" xs="5" v-if="mode === 'addMode'">
            <v-btn @click="simpanData(todos)">Simpan</v-btn>
          </v-col>
          <v-col md="3" sm="4" xs="5" v-if="mode === 'editMode'">
            <v-btn @click="updateData(todos)">Simpan</v-btn>
          </v-col>
          <v-col md="3" sm="4" xs="5" v-if="mode === 'editMode'">
            <v-btn @click="hapusData(todos)">Hapus</v-btn>
          </v-col>
          <v-col md="3" sm="4" xs="5" v-if="mode === 'addMode'">
            <v-btn>Batal</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <div hidden>{{ loadData }}</div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FormTodo",
  data() {
    return {
      todos: {
        judul: null,
        keterangan: null,
        selesai: false,
      },
      mode: "addMode",
    };
  },
  computed: {
    loadData() {
      if (this.$route.params.id) {
        const id = this.$route.params.id;
        const idnya = parseInt(id);
        const datanya = this.$store.getters["rencana/getTodoById"](idnya);
        if (datanya) {
          this.todos.id = datanya.id;
          this.todos.judul = datanya.judul;
          this.todos.keterangan = datanya.keterangan;
          this.todos.selesai = datanya.selesai;
          this.mode = "editMode";
        } else {
          console.log("data belum di-load");
        }
      } else {
        this.todos.judul = null;
        this.todos.keterangan = null;
        this.todos.selesai = null;
        this.mode = "addMode";
      }
    },
    getFilteredTodo() {
      const id = this.$route.params.id;
      const hasil = this.$store.getters["rencana/getTodoById"](id);
      this.todos.id = hasil.id;
      this.todos.judul = hasil.judul;
      this.todos.keterangan = hasil.keterangan;
      this.todos.selesai = hasil.selesai;
    },
  },
  methods: {
    simpanData(data) {
      this.$store.dispatch("rencana/post", { data });
    },
    updateData(data) {
      this.$store.dispatch("rencana/update", { data });
    },
    hapusData(data) {
      this.$store.dispatch("rencana/delete", { data });
      this.$router.push("FormTodo");
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