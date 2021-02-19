<template>
  <v-container>
    <v-card>
      <v-card-title>Contoh CRUD Table</v-card-title>
      <CrudTable />
    </v-card>
  </v-container>
</template>

<script>
import CrudTable from "../components/CrudTable";
export default {
  name: "Crud",
  components: { CrudTable },
};
</script>

<style>
</style>