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
    <v-snackbar v-model="snackbar" :timeout="timeout">{{
      snackbarText
    }}</v-snackbar>
    <div hidden>{{ getFilteredTodo }}</div>
  </v-container>
</template>

<script>
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
      snackbar: false,
      timeout: 2000,
      snackbarText: null,
    };
  },
  computed: {
    getFilteredTodo() {
      const id = this.$route.params.id;
      if (id) {
        const datanya = this.$store.getters["rencana/getTodoById"](id);
        if (datanya) {
          this.todos.id = datanya.id;
          this.todos.judul = datanya.judul;
          this.todos.keterangan = datanya.keterangan;
          this.todos.selesai = datanya.selesai;
          this.mode = "editMode";
        } else {
          this.snackbarText = "Data belum diload";
          this.snackbar = true;
        }
      } else {
        this.todos.judul = null;
        this.todos.keterangan = null;
        this.todos.selesai = null;
        this.mode = "addMode";
      }
    },
  },
  methods: {
    simpanData(data) {
      this.$store
        .dispatch("rencana/post", { data })
        .then((response) => {
          this.snackbarText = `Data sudah disimpan ${response}`;
          this.snackbar = true;
        })
        .catch((error) => {
          this.snackbarText = `Gagal simpan data ${error}`;
          this.snackbar = true;
        });
    },
    updateData(data) {
      this.$store
        .dispatch("rencana/update", { data })
        .then((response) => {
          this.snackbarText = `Data sudah diupdate ${response}`;
          this.snackbar = true;
        })
        .catch((error) => {
          this.snackbarText = `Gagal update data ${error}`;
          this.snackbar = true;
        });
    },
    hapusData() {
      const id = this.$route.params.id;
      this.$store
        .dispatch("rencana/delete", { id })
        .then((response) => {
          this.snackbarText = `Data sudah dihapus : ${response}`;
          this.snackbar = true;
        })
        .catch((error) => {
          this.snackbarText = `Gagal hapus data ${error}`;
          this.snackbar = true;
        });
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