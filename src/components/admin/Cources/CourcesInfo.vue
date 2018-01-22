<template>
    <v-flex class="elevation-0 padding " xs8 sm8 offset-xs2 offset-sm2>
        <v-card class="elevation-2">
            <v-toolbar class="teal" dark>
                <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                <v-btn @click="back()" dark icon>
                    <v-icon>chevron_left</v-icon>
                </v-btn>
               <v-card-title>
                 Cource Info
            </v-card-title>
            </v-toolbar>
            <CourcesForm :disabled="disabled" ref="GeneralForm" :cource="Cource"> </CourcesForm>
            <v-card-actions>
                <v-btn  @click="back" flat>Back</v-btn>
                <v-btn v-if="disabled" icon @click="edit">
                    <v-icon>create</v-icon>
                </v-btn>
                <v-btn v-if="!disabled" icon @click="update">
                    <v-icon>done</v-icon>
                </v-btn>
                <v-btn v-if="!disabled" icon @click="clear">
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
    import CourcesForm from './CourcesForm.vue';
    export default {
        data() {
            return {
                loading: false,
                ApiUrl: Config.ApiUrl,
                disabled: true,
                Cource: {}
            }
        },
        created() {
            return this.get();
        },
        computed: {
            avatarSize() {
                return `${this.slider}px`
            }
        },
        components: {
            CourcesForm
        },
        methods: {
            back() {
                this.$router.push('/courses');
            },
            edit() {
                this.disabled = !this.disabled;
            },
            clear() {
                this.$refs.GeneralForm.clear()
            },
            get() {
                return Api
                    .Cources()
                    .get(this.$route.params.id)
                    .then(res => this.Cource = res.data)
                    .catch(error => {
                        console.log('error', error);
                        this.$notify({
                            type: 'error',
                            title: error.title,
                            text: error.message
                        });
                    });
            },
            update() {
                let generalFormData = this.$refs.GeneralForm.form();
                if (generalFormData) {
                    return Api
                        .Cources()
                        .update(this.$route.params.id, generalFormData)
                        .then(res => this.Cource = res.data)
                        .then(() => this.$notify({
                            type: 'success',
                            title: 'Success',
                            text: 'Cource has been created'
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