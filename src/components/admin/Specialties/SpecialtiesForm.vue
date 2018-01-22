<template>
    <v-form v-model="valid" ref="generalForm">
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
                <v-subheader class="grey--text text--lighten-1">Description</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" name="input-7-2" label="Description" v-model="description" required :rules="DescriptionRules" multi-line dark></v-text-field>
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
    </v-form>
</template>


<script>
    import Config from '../../../config';
    import {
        Api
    } from '../../../services';
    import _ from 'lodash';
    export default {
        props: ['id', 'disabled', 'specialty'],
        data() {
            return {
                ApiUrl: Config.ApiUrl,
                nameRules: [
                    (v) => !!v || 'Name is required',
                    (v) => v !== null && v.length <= 20 || 'Name must be less than 20 characters'
                ],
                DescriptionRules: [
                    (v) => !!v || 'Description is required',
                    (v) => v !== null && v.length <= 100 || 'Description must be less than 100 characters'
                ],
                valid: false,
                //------------Forms Params
                name: '',
                note: '',
                description: '',
            }
        },
        created() {
            console.log('this.disabled', this.disabled);
        },
        watch: {
            specialty: function(newSpecialty) {
                this.name = newSpecialty.name ? newSpecialty.name : '';
                this.note = newSpecialty.note ? newSpecialty.note : '';
                this.description = newSpecialty.description ? newSpecialty.description : '';
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
                    return {
                        name: this.name,
                        note: this.note,
                        description: this.description
                    }
                }
            }
        }
    }
</script>