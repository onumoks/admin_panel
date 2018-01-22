<template>
    <v-form v-model="valid" ref="generalForm" class="padding" @submit.stop.prevent="submit()">
        <v-layout row>
            <v-flex xs4>
                <v-subheader>E-mail</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" v-model="email" :rules="Rules.requiredEmailRules" required label="E-mail" dark></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>Password</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field name="input-10-1" label="Enter your password" hint="At least 8 characters" v-model="password"  :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (passwordVisibility = !passwordVisibility) "
                    :type="passwordVisibility ? 'password' : 'text'" counter required :rules="Rules.requiredPasswordRules"></v-text-field>
            </v-flex>
        </v-layout>
        <v-btn class="submit-button" type="submit"></v-btn>
    </v-form>
</template>


<script>
    import Config from '../../../config';
    import {
        Rules
    } from '../../../helpers';
    import _ from 'lodash';
    export default {
        props: ['id', 'disabled', 'cource'],
        data() {
            return {
                Rules: Rules,
                ApiUrl: Config.ApiUrl,
                valid: false,
                passwordVisibility: true,
                //------------Forms Params
                email: '',
                password: ''
            }
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
                        email: this.email,
                        password: this.password
                    }
                }
            },
            submit() {
                console.log('SSSSss')
                this.$emit('submit');
            }
        }
    }
</script>

<style>
    .submit-button {
        visibility: hidden;
    }
</style>
