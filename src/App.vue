<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="menu = !menu"></v-app-bar-nav-icon>
      <v-menu v-model="menu" nudge-bottom="50" offset-y>
        <v-list>
          <v-list-item>
            <v-list-item-title class="clickable" @click="showDlg">
              Create New Person</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="clickable" @click="showDataDlg">
              Show Data
              </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-toolbar-title>
        <div style="display: inline-block">Family</div>
        <div style="display: inline-block;">
          <v-alert
            type="success"
            dense
            dismissible
            v-model="showAlert"
            style="margin-left: 200px"
          >
            {{ msg }}
          </v-alert>
        </div>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <Family />
    </v-main>
  </v-app>
</template>

<script>
import Family from "./components/Family.vue";

export default {
  data: () => ({ menu: false }),
  components: {
    Family,
  },
  computed: {
    showAlert: {
      get: function () {
        return this.$store.state.msg != null;
      },
      set: function () {
        this.$store.commit("MSG", null);
      },
    },
    msg: function () {
      return this.$store.state.msg;
    },
  },
  methods: {
    showDlg() {
      this.$store.commit("DLG_PERSON", { fname: "", mname: "", lname: "" });
    },
    showDataDlg() {
      this.$store.commit("DLG_DATA", true);
    },
  },
};
</script>

<style>
.v-alert {
  margin-bottom: 0px !important;
}
</style>
