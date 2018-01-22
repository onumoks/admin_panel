<template>
  <v-layout>
    <v-flex>
      <v-select :disabled="disabled" label="Specialties" autocomplete :loading="loading" dark :required="required" :items="specialties" :rules="specialtyRools" item-text="name" item-value="id" :search-input.sync="search" v-model="specialty"></v-select>
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
        specialty: [],
        specialties: [],
        specialtyRools: [
          (v) => (!!v || !this.required) || 'You must choose at least one'
        ],
      }
    },
    watch: {
      search(val) {
        val && this.querySelections(val)
      },
      value(newVal) {
        this.specialty = newVal ? newVal : this.specialty
      },
      value(newVal) {
        this.specialty = newVal ? newVal : this.specialty
      }
    },
    created(search) {
      console.log('this.specialty44444', this.value)
      return this.querySelections('');
    },
    methods: {
      querySelections(v) {
        this.loading = true
        return Api.Specialties()
          .list({
            page: 1,
            rowsPerPage: 5,
            filter: JSON.stringify({
              all: v
            })
          })
          .then(res => this.specialties = res.data.items)
          .then(() => this.loading = false)
          .catch(err => {
            this.loading = false;
            this.items = [];
            return [];
          });
      },
      getData() {
        return this.specialty;
      }
    }
  }
</script>