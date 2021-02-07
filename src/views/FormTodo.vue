<template>
  <v-container>
    <v-card>
      <v-card-title>Tambah Rencana</v-card-title>
      <v-form>
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
            <v-btn>Batal</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
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
    };
  },
  methods: {
    simpanData(data) {
      // console.log(`datanya : ${JSON.stringify(data)}`);
      this.$store.dispatch("rencana/postData", { data });
    },
  },
  created() {
    this.$store.dispatch("rencana/ambilData");
  },
};
</script>

<style scoped>
.v-card {
  margin: 10px 10px 10px 10px;
  padding: 20px 20px 20px 20px;
}
</style>