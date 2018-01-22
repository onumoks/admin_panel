<template>
    <div>
        <v-card class="elevation-2">
            <SpecialtiesForm  ref="GeneralForm" :specialty="Specialty"> </SpecialtiesForm>
            <v-card-actions>
                <v-btn @click="back" flat>Back</v-btn>
                <v-btn @click="create" flat>Create</v-btn>
                <v-btn icon @click="clear">
                    <v-icon>highlight_off</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import Config from '../../../config';
    import {
        Api
    } from '../../../services';
    import SpecialtiesForm from './SpecialtiesForm.vue';
    export default {
        data() {
            return {
                loading: false,
                items: [],
                select: [],
                ApiUrl: Config.ApiUrl,
                slider: 56,
                tile: false,
                Specialty: {
                    name: '',
                    description: '',
                    notes: ''
                }
            }
        },
        created() {
            console.log('CREATED!!');
        },
        components: {
            SpecialtiesForm
        },
        computed: {
            avatarSize() {
                return `${this.slider}px`
            }
        },
        methods: {
            back() {
                this.$router.push('/specialties');
            },
            clear() {
                this.$refs.GeneralForm.clear()
            },
            create() {
                let generalFormData = this.$refs.GeneralForm.form();
                if (generalFormData) {
                    return Api
                        .Specialties()
                        .create(generalFormData)
                        .then(res => this.Specialty = res.data)
                        .then(() => this.$notify({
                            type: 'success',
                            title: 'Success',
                            text: 'Specialty has been created'
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