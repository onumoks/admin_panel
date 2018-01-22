<template>

          <v-flex xs12 sm12>
            <v-select
              label="Select"
              v-bind:items="students"
              v-model="selectedStudents"
              item-text="profile.fname"
              item-value="id"
              :search-input.sync="search"
              multiple
              chips
              max-height="auto"
              autocomplete
              :loading="loading"
              :disabled="disabled"
            >
              <template slot="selection" scope="data">
                <v-chip
                  close
                  @input="data.parent.selectItem(data.item)"
                  :selected="data.selected"
                  class="chip--select-multi"
                  :key="JSON.stringify(data.item)"
                  darck
                  color="grey"
                >
                  <v-avatar>
                    <img :src="`${Config.ApiUrl}/users/${data.item.id}/profile/avatar`">
                  </v-avatar>
                  {{ data.item.profile.fname }}
                </v-chip>
              </template>
              <template slot="item" scope="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-avatar>
                    <img v-bind:src="`${Config.ApiUrl}/users/${data.item.id}/profile/avatar`"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.profile.fname"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.profile.lname"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-select>
          </v-flex>
       
</template>


<script>
 import Config from '../../../config';
    import {
        Api
    } from '../../../services';
  export default {
      props: ['disabled'],
    data () {
      return {
        Config :Config,
        selectedStudents: [],
        students: [ ],
        search: null,
        loading: false,
      }
    },
    watch: {
      search (val) {
        val && this.querySelections(val)
      }
    },
    created(search){
        return this.querySelections('');
    },
    methods: {
      querySelections (v) {
        this.loading = true
         return Api.Users()
                .list({
                    page:1,
                    rowsPerPage:5,
                    filter: JSON.stringify({
                        all:v
                    })
                })
                .then(res => this.students = res.data.items)
                .then(()=> this.loading = false)
                .catch(err => {
                    this.loading = false;
                    this.items = [];
                    return [];
                });
      },
      getData() {
        console.log('ffooo')
        return this.selectedStudents;
      }
    }
  }
</script>