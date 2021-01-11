<template>
  <v-row class="flex-column ma-0">
    <v-card class="pa-3" v-if="recordsDialog">
      <v-card-title>
        Рекорды
        <v-spacer> </v-spacer>
        <v-btn text @click="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        v-if="loadedSuccess"
        :headers="headers"
        :items="records"
        :loading="recordsLoading"
        loading-text="Loading... Please wait"
        item-key="title"
        :hide-default-footer="false"
        :sort-by="['score']"
        :sort-desc="[true]"
      >
      </v-data-table>
      <v-card-text v-else>
        Records not found
      </v-card-text>
    </v-card>

    <v-snackbar
      timeout="3000"
      bottom="bottom"
      :color="snackbar_color"
      v-model="snackbar"
    >
      {{ snackbar_message }}
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  name: "Records",
  props: ["currentUser", "recordsDialog"],
  computed: {
    headers() {
      return [
        {
          text: "Имя игрока",
          align: "start",
          value: "username",
          class: "title",
          sortable: true,
        },
        {
          text: "Баллы",
          value: "score",
          class: "title",
          align: "end",
          sortable: true,
        },
      ];
    },
  },
  data: () => ({
    score: 0,
    snackbar_message: "",
    snackbar_color: "",
    snackbar: false,
    records: [],
    recordsLoading: true,
    loadedSuccess: true,
  }),
  mounted() {},
  created() {
    this.loadRecords();
  },

  methods: {
    async loadRecords() {
      await this.$store
        .dispatch("record/get")
        .then((data) => {
          this.records = data.records;
          if (this.records.length == 0) {
            this.loadedSuccess = false;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.message)
              this.message = error.response.data.message;
          } else {
            this.snackbar_color = "red lighten-1";
            this.snackbar_message = error.message;
          }
          this.loadedSuccess = false;
          this.snackbar = true;
        });
      this.recordsLoading = false;
    },

    close() {
      this.$emit("update:recordsDialog", false);
    },
  },
};
</script>
