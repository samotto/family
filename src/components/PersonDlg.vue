<template>
  <div>
    <v-dialog v-model="dialog" v-if="person" persistent max-width="600">
      <v-card>
        <v-card-title>
          <div style="width: 100%">
            <div style="float: left" class="headline">
              {{ fullName(person) }}
            </div>
            <div
              class="small"
              style="font-size: 0.7em; display: block; float: right"
            >
              {{ person.pid }}
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="First Name"
                  placeholder=" "
                  v-model="person.fname"
                  dense
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Middle Name"
                  v-model="person.mname"
                  placeholder=" "
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Last Name"
                  v-model="person.lname"
                  placeholder=" "
                  dense
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Date of Birth"
                  v-model="birthDate"
                  placeholder="mm/dd/yyyy"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Date of Death"
                  v-model="deathDate"
                  dense
                  placeholder="mm/dd/yyyy"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Father"
                  v-model="person.dad_id"
                  dense
                  placeholder=" "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Mother"
                  v-model="person.mom_id"
                  placeholder=" "
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="!isNew">
                <div
                  v-for="e in person.events"
                  :key="e.event_id"
                  @click="setEvent(e)"
                  class="clickable"
                >
                  {{ formatDate(e.dt) }}: {{ e.type }}
                  <span v-if="e.pid1 && e.pid1 != person.pid">
                    {{ fullName(e.pid1) }}
                  </span>
                  <span v-if="e.pid2 && e.pid2 != person.pid">
                    {{ fullName(e.pid2) }}
                  </span>
                </div>
                <div>
                  <v-icon
                    small
                    color="primary"
                    @click.stop="setEvent()"
                    title="Create New Event"
                    >mdi-calendar-plus</v-icon
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="create()" v-if="isNew">
            Create
          </v-btn>
          <v-btn color="primary" @click="save()" v-if="!isNew">
            Save
          </v-btn>
          <v-btn @click="close()"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <EventDlg
      :event="curEvent"
      v-model="showEventDlg"
      @save="saveEvent($event)"
      @cancel="closeEventDlg()"
      @delete="delEvent($event)"
    />
  </div>
</template>

<script>
import { formatDate } from "./../common";
import { familyMixin } from "./../common/mixin.js";
import EventDlg from "./EventDlg.vue";
import { updatePerson } from "./../cache";
import { insertPerson } from "./../cache";

export default {
  name: "PersonDlg",
  mixins: [familyMixin],
  props: {},
  components: { EventDlg },
  data: function () {
    return {
      curEvent: null,
      showEventDlg: false
    };
  },
  computed: {
    person: function () {
      return this.$store.state.dlgPerson;
    },
    isNew: function () {
      return !this.person.pid || this.person.pid <= 0;
    },
    birthDate: {
      get: function () {
        return formatDate(this.person.birth_dt);
      },
      set: function (newValue) {
        var arr = newValue.split("/");
        if (arr == 3) this.person.birth_dt = new Date(arr[2], arr[0], arr[1]);
      },
    },
    deathDate: {
      get: function () {
        return formatDate(this.person.death_dt);
      },
      set: function (newValue) {
        var arr = newValue.split("/");
        if (arr == 3) this.person.death_dt = new Date(arr[2], arr[0], arr[1]);
      },
    },
    dialog: {
      get() {
        return this.$store.state.dlgPerson;
      },
      set(newValue) {
        this.$store.commit("DLG_PERSON", newValue);
      },
    }
  },
  methods: {
    create() {
      var p = insertPerson(this.person);
      this.$store.commit("UPD_PERSON", p);
      this.close();
    },
    save() {
      var p = updatePerson(this.person);
      this.$store.commit("UPD_PERSON", p);
      this.close();
    },
    close() {
      this.dialog = null;
    },
    formatDate: function (dt) {
      return formatDate(dt);
    },
    setEvent: function (e) {
      this.curEvent = e
      this.showEventDlg = true
    },
    saveEvent: function (e) {
      this.curEvent = null
      this.showEventDlg = false
      this.upsertEvent(e)
    },
    closeEventDlg: function () {
      this.curEvent = null
      this.showEventDlg = false
    },
    delEvent: function (e) {
      console.log("Deleted event: " + JSON.stringify(e))
      this.curEvent = null
      this.showEventDlg = false
    },
  },
};
</script>

<style scoped>
</style>