<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-card-title>
        <div style="width: 100%">
          <div style="float: left" class="headline">Data</div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                name="d"
                :label="type"
                rows="15"
                full-width
                value=""
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="close()"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//import { insertPerson } from "./../cache";
import { familyMixin } from "./../common/mixin.js";
export default {
  name: "DataDlg",
  mixins: [familyMixin],
  props: {},
  components: {},
  data: function () {
    return { type: "People" };
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.dlgData;
      },
      set(newValue) {
        this.$store.commit("DLG_DATA", newValue);
      },
    },
  },
  methods: {
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
</style>