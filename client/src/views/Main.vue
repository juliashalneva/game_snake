<template>
  <v-app>
    <v-container class="fill-height ma-0 pa-0" fluid>
      <Login v-if="currentUser == null" />
      <Game v-bind:currentUser="currentUser" v-if="currentUser != null" />
    </v-container>
  </v-app>
</template>

<script>
import Login from "@/components/Login";
import Game from "@/components/Game";
export default {
  name: "Main",
  components: { Login, Game },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {},
  data: () => ({}),
  mounted() {},
  methods: {},
};
</script>
