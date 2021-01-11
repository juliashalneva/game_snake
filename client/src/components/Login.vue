
<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="4">
      <v-card class="elevation-12">
        <v-card-text>
          <v-form v-model="isValid">
            <v-text-field
              label="Имя игрока"
              v-model="username"
              color="light-blue lighten-1">
            </v-text-field>

            <v-btn
              color="light-blue lighten-1"
              @click.native="submitLogin()"
              :disabled="!isValid"
              :loading="loading">
              Войти
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {},
  created() {},
  data: () => ({
    isValid: true,
    loading: false,
    username: "",
  }),
  methods: {
    async submitLogin() {
      await this.$store.dispatch("auth/login", {
        username: this.username,
      });
    },
  },
};
</script>
