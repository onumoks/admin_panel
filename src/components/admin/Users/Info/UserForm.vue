<template>
    <v-form v-model="valid" ref="generalForm">
        <v-layout row>
            <v-flex xs3>
                <v-subheader>
                    <v-icon info>phone</v-icon>
                </v-subheader>
            </v-flex>
            <v-flex xs9>
                <v-text-field :disabled="disabled" v-model="work_phone" name="work_phone" :rules="phoneRules" label="Work" dark></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
            </v-flex>
            <v-flex xs9>
                <v-text-field :disabled="disabled" v-model="personal_phone" :rules="requiredPhoneRules" required label="Mobile" dark></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
                <v-subheader>
                    <v-icon info>mail</v-icon>
                </v-subheader>
            </v-flex>
            <v-flex xs9>
                <v-text-field :disabled="disabled" v-model="work_email" :rules="emailRules" required label="Work E-mail" dark></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
            </v-flex>
            <v-flex xs9>
                <v-text-field :disabled="disabled" v-model="personal_email" :rules="emailRules" label="Personal E-mail" dark></v-text-field>
            </v-flex>
        </v-layout>
    </v-form>
</template>


<script>
    import Config from '../../../../config';
    import {
        Api
    } from '../../../../services';
    import _ from 'lodash';
    ///sdsds
    export default {
        props: ['userId', 'disabled', 'profile'],
        data() {
            return {
                ApiUrl: Config.ApiUrl,
                slider: 56,
                tile: false,
                nameRules: [
                    (v) => !!v || 'Name is required',
                    (v) => v !== null && v.length <= 10 || 'Name must be less than 10 characters'
                ],
                emailRules: [
                    (v) => (!v || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) || 'E-mail must be valid'
                ],
                requiredEmailRules: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                requiredPhoneRules: [
                    (v) => !!v || 'Phone Number is required',
                    (v) => /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(v) || 'Phone number must be valid'
                ],
                phoneRules: [
                    (v) => (!v || /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(v)) || 'Phone number must be valid'
                ],
                personal_email: '',
                User: {
                    personal_email: '',
                    profile: {}
                },
                valid: false,
                url: '',
                uploadedFiles: [],
                uploadError: null,
                currentStatus: null,
                uploadFieldName: 'avatar',
                personal_phone:'',
                work_phone:'',
                personal_email:'',
                work_email:''
            }
        },
        created() {
            console.log('this.profile', this.profile);
        },
        watch: {
            profile: function(newProfile) {
                this.personal_phone = newProfile.personal_phone ?newProfile.personal_phone : '';
                this.work_phone = newProfile.work_phone ? newProfile.work_phone : '';
                this.personal_email = newProfile.personal_email ? newProfile.personal_email : '';
                this.work_email = newProfile.work_email ? newProfile.work_email : '';
            }
        },
        methods: {
            AvatarUrl() {
                return ``;
            },
            callInput() {
                this.$refs.fileInput.click();
            },
            clear() {
                this.$refs.generalForm.reset()
            },
            form() {
                if (this.$refs.generalForm.validate()) {
                    return {
                        personal_phone: this.personal_phone,
                        work_phone: this.work_phone,
                        personal_email: this.personal_email,
                        work_email: this.work_email
                    }
                }
            }
        }
    }
</script>