<template>
  <v-data-table
    :headers="headers"
    :items="todos"
    sort-by="judul"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>CRUD TABLE</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.judul"
                      label="Judul"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.keterangan"
                      label="Keterangan"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.selesai"
                      label="Status/Selesai"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Anda yakin ingin menghapus ini?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "CrudTable",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Judul",
        align: "start",
        sortable: false,
        value: "judul",
      },
      { text: "Keterangan", value: "keterangan" },
      { text: "Selesai", value: "selesai", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    todos: [],
    editedIndex: -1,
    editedItem: {
      judul: "",
      keterangan: "",
      selesai: false,
    },
    defaultItem: {
      judul: "",
      keterangan: "",
      selesai: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.todos = [
        {
          judul: "belajar Vuejs",
          keterangan: "Belajar bikin template, props, data, method dan lainnya",
          selesai: false,
          id: 1,
        },
        {
          id: 2,
          judul: "Belajar Vue CLI",
          keterangan: "Vue CLI agak berbeda sedikit dengan Vue CDN",
          selesai: false,
        },
        {
          id: 3,
          judul: "Belajar Vuex",
          keterangan: "Penyimpanan fungsi dan data secara sentral",
          selesai: false,
        },
        {
          judul: "Belajar Vuetify",
          keterangan: "UI material desain component untuk vue",
          selesai: true,
          id: 4,
        },
        {
          judul: "Belajar Git",
          keterangan: "Belajar Git terutama GitHub",
          selesai: true,
          id: 5,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.todos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.todos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.todos.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.todos[this.editedIndex], this.editedItem);
      } else {
        this.todos.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
</style>