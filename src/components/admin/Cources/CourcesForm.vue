<template>
    <v-form v-model="valid" ref="generalForm" class="padding">
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Name</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" name="input-1" label="Name" v-model="name" dark required :rules="nameRules"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader  class="grey--text text--lighten-1">Specialty</v-subheader>
            </v-flex>
            <v-flex xs8>
                <SpecialtySelect   :value="specialty" :disabled="disabled" ref="SpecialtySelect"> </SpecialtySelect>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1" v-text="'Cource Age'"></v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-select  :disabled="disabled" required v-bind:items="ages" :rules="ageRules" v-model="age" label="Select" dark single-line auto append-icon="map" hide-details item-value="text"></v-select>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Year</v-subheader>
            </v-flex>
            <v-flex xs8>
                <!-- <v-select required v-bind:items="years" :rules="yearRules" v-model="year" label="Select" dark single-line auto append-icon="map" hide-details item-value="text"></v-select> -->
                <v-text-field :disabled="disabled" name="input-1" label="Year" v-model="year" dark required :rules="yearRules"></v-text-field>
            </v-flex>
        </v-layout>
      
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Notes</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" name="input-7-2" label="Notes" v-model="note" multi-line dark></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Students</v-subheader>
            </v-flex>
            <v-flex xs8>
                <StudentsSelect  :disabled="disabled" ref="StudentsSelect"> </StudentsSelect>
            </v-flex>
        </v-layout>
    </v-form>
</template>


<script>
    import Config from '../../../config';
    import {
        Api
    } from '../../../services';
    import _ from 'lodash';
    import Components from '../Components'
    export default {
        props: ['id', 'disabled', 'cource'],
        data() {
            return {
                ApiUrl: Config.ApiUrl,
                nameRules: [
                    (v) => !!v || 'Name is required',
                    (v) => v !== null && v.length <= 20 || 'Name must be less than 20 characters'
                ],
                ageRules: [
                    (v) => !!v || 'Age is required'
                ],
                yearRules: [
                    (v) => !!v || 'Year is required',
                    (v) => v !== null && v.length === 4 && parseInt(v[0] + v[1]) >= 19 && new RegExp('^[0-9]+$').test(v) || 'Year mus contains only 4 numbers and must be more than 1900'
                ],
                DescriptionRules: [
                    (v) => !!v || 'Description is required',
                    (v) => v !== null && v.length <= 100 || 'Description must be less than 100 characters'
                ],
                ages: [{
                        text: '1'
                    },
                    {
                        text: '2'
                    },
                    {
                        text: '3'
                    },
                    {
                        text: '4'
                    },
                    {
                        text: '5'
                    },
                    {
                        text: '6'
                    },
                    {
                        text: '7'
                    }
                ],
                valid: false,
                //------------Forms Params
                name: '',
                note: '',
                age: '',
                year: '',
                students: [],
                specialty:[]
            }
        },
        components: {
            StudentsSelect: Components.StudentsSelect,
            SpecialtySelect: Components.SpecialtySelect
        },
        created() {
            this.ages = [];
            this.years = [];
            for (let i = 0; i < 12; i++) {
                this.ages.push({
                    text: i
                })
            }
            for (let i = 1900; i < 2200; i++) {
                this.years.push({
                    text: i
                })
            }
        },
        watch: {
            cource: function(newCource) {
                
                this.name = newCource.name ? newCource.name : '';
                this.note = newCource.note ? newCource.note : '';
                this.year = newCource.year ? String(newCource.year) : '';
                
                this.age = newCource.age ? newCource.age : '';
                this.specialty =  newCource.specialty ? newCource.specialty : '';   
            },
        },
        methods: {
            callInput() {
                this.$refs.fileInput.click();
            },
            clear() {
                this.$refs.generalForm.reset()
            },
            form() {
                if (this.$refs.generalForm.validate()) {
                    console.log('GET FORM')
                    return {
                        specialty_id: _.isObject(this.$refs.SpecialtySelect.getData())? this.$refs.SpecialtySelect.getData().id:this.$refs.SpecialtySelect.getData(),
                        students: this.$refs.StudentsSelect.getData(),
                        name: this.name,
                        note: this.note,
                        age: this.age,
                        year: this.year
                    }
                }
            }
        }
    }
</script>