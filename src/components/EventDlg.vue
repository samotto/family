<template>
  <v-dialog v-model="showDlg" persistent max-width="400">
    <v-card>
      <v-card-title>
        <span class="headline" v-if="isNew">New Event</span>
        <span class="headline" v-if="!isNew">{{ evt.type }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Event Date"
                v-model="eventDate"
                dense
                placeholder="mm/dd/yyyy"
              ></v-text-field>
            </v-col>
            <v-col cols="6" v-if="isNew">
              <v-select
                :items="eventTypes"
                v-model="evt.type"
                label="Event Type"
                placeholder=" "
                dense
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" v-if="isNew">
              <v-text-field
                label="Person"
                v-model="p1"
                dense
                placeholder=" "
              ></v-text-field>
            </v-col>
            <v-col cols="6"> {{name1}} </v-col>
            <v-col cols="6" v-if="isNew">
              <v-text-field
                label="Person"
                v-model="p2"
                placeholder=" "
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="6"> {{name2}} </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click="save()"> Save </v-btn>
        <v-btn @click="cancel()"> Cancel </v-btn>
        <v-btn class="alert" @click="del()" v-if="!isNew"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//-------------------------------------------------------------------------------------------------------------
// EVENT in store is clone
//-------------------------------------------------------------------------------------------------------------
import { formatDate } from "./../common";
import { familyMixin } from "./../common/mixin.js";
const clone = require("rfdc")();

export default {
  name: "EventDlg",
  mixins: [familyMixin],
  props: { event: Object, value: Boolean },
  components: {},
  data: function () {
    return {
      name1: this.evt && this.evt.pid1 && this.evt.pid1>0 ? this.fullName(this.evt.pid1) : '',
      name2: this.evt && this.evt.pid2 && this.evt.pid2>0 ? this.fullName(this.evt.pid2) : '',
      eventTypes: [
        "Marraige",
        "Divorce",
        "Born To",
        "Adopted By",
        "Baptism",
        "Graduation",
      ],
    };
  },
  computed: {
    isNew: function () {
      return !this.evt || !this.evt.event_id || this.evt.event_id == 0
    },
    showDlg: function () {
      return this.value;
    },
    evt: function () {
      return this.event ? clone(this.event) : { event_id: 0 }
    },
    p1: {
      get: function() {
        return this.evt.pid1
      },
      set: function(v) {
        this.evt.pid1 = v
        this.name1 = this.fullName(v)
      }
    },
    p2: {
      get: function() {
        return this.evt.pid2
      },
      set: function(v) {
        this.evt.pid2 = v
        this.name2 = this.fullName(v)
      }
    },   
    eventDate: {
      get: function () {
        return formatDate(this.evt.dt);
      },
      set: function (newValue) {
        var arr = newValue.split("/");
        console.log('arr ' + JSON.stringify(arr))
        if (arr.length == 3) this.evt.dt = new Date(arr[2], arr[0], arr[1]);
        console.log('new evt ' + JSON.stringify(this.evt))
        
      },
    }
  },
  watch: {
    evt: { // this is to initally set name1 name2
      deep:true,
      immediate: true,
      handler:function(newVal) {
        this.p1 = newVal.pid1
        this.p2 = newVal.pid2
      }
    }
  },
  methods: {
    save: function () {
      this.$emit("save", this.evt);
    },
    cancel: function () {
      this.$emit("cancel", this.evt);
    },
    del: function () {
      this.$emit("delete", this.evt);
    },
  },
};
</script>

<style scoped>
</style>