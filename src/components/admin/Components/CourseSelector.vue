<template>
  <v-layout>
    <v-flex>
      <v-select 
            :disabled="disabled" 
            label="Courses" 
            autocomplete 
            :loading="loading" 
            dark 
            :required="required"
            :items="courses" 
            :rules="courseRools" 
             max-height="auto"
            item-text="name"
            item-value="id" 
            :search-input.sync="search" 
            v-model="course">

            

            
            <template slot="item" scope="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.age +  ' course '+  data.item.specialty.name "></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>

      </v-select>
    </v-flex>
  </v-layout>
</template>


<script>
  import Config from '../../../config';
  import {
    Api
  } from '../../../services';
  import _ from 'lodash';
  export default {
    props: ['disabled', 'value', 'required'],
    data() {
      return {
        loading: false,
        items: [],
        search: null,
        course: [],
        courses: [],
        courseRools: [
          (v) => (!!v || !this.required) || 'You must choose at least one'
        ],
      }
    },
    watch: {
      search(val) {
        val && this.querySelections(val)
      },
      value(newVal) {
        this.course = newVal ? newVal : this.course
      }
    },
    created(search) {
      console.log('this.course44444', this.value)
      return this.querySelections('');
    },
    methods: {
      querySelections(v) {
        this.loading = true
        return Api.Cources()
          .list({
            page: 1,
            rowsPerPage: 5,
            filter: JSON.stringify({
              all: v
            })
          })
          .then(res => this.courses = res.data.items)
          .then(() => this.loading = false)
          .catch(err => {
            this.loading = false;
            this.items = [];
            return [];
          });
      },
      getData() {
        return this.course;
      }
    }
  }
</script>