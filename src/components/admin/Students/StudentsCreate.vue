<template>
    <v-flex class="elevation-0 padding " xs8 sm8 offset-xs2 offset-sm2>
        <v-card class="elevation-2">
            <v-toolbar class="teal" dark>
                <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                <v-btn @click="back()" dark icon>
                    <v-icon>chevron_left</v-icon>
                </v-btn>
               <v-card-title>
                Create Cource
            </v-card-title>
            </v-toolbar>
            
                
            <StudentsForm ref="GeneralForm" > </StudentsForm>
            <v-card-actions>
                <v-btn @click="back" flat>Back</v-btn>
                <v-btn @click="create" flat>Create</v-btn>
                <v-btn icon @click="clear">
                    <v-icon>highlight_off</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
    import Config from '../../../config';
    import {
        Api
    } from '../../../services';
    import StudentsForm from './StudentsForm.vue';
    export default {
        data() {
            return {
                Cource: {}
            }
        },
        created() {
            console.log('CREATED!!');
        },
        components: {
            StudentsForm
        },
        computed: {
            avatarSize() {
                return `${this.slider}px`
            }
        },
        methods: {
            back() {
                this.$router.push('/students');
            },
            clear() {
                this.$refs.GeneralForm.clear()
            },
            create() {
                let generalFormData = this.$refs.GeneralForm.form();
                if (generalFormData) {
                    return Api
                        .Users()
                        .create(generalFormData)
                        .then(res => this.Cource = res.data)
                        .then(() => this.$notify({
                            type: 'success',
                            title: 'Success',
                            text: 'Student has been created'
                        }))
                        .then(() => this.back())
                        .catch(error => {
                            console.log('error', error);
                            this.$notify({
                                type: 'error',
                                title: error.title,
                                text: error.message
                            });
                        });
                }
            }
        }
    }
</script>

<style>
    .card {
        margin: 5px!important
    }
</style>