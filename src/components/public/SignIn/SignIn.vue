<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card class="login-card  elevation-0" darck>
                <v-layout row class="logo-container">
                    <v-flex sm4>
                        <img class="login-logo" src="../../../assets/images/logo.png"></img>
                    </v-flex>
                    <v-flex sm8>
                        <h4 class="login-label text-xs-left">Sign In MOKS Admin Panel </h4>
                    </v-flex>
                </v-layout>
                <v-card-text>
                    <SignInForm ref="SignInForm" @submit="signIn()"> </SignInForm>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :loading="loading3" @click="signIn()" class="blue-grey white--text">
                        Log In
                        <v-icon right dark>arrow_forward</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import {
        Api
    } from '../../../services';
    import jwt_decode from 'jwt-decode';
    import SignInForm from './SignInForm.vue';
    export default {
        name: 'hello',
        data() {
            return {
                loader: null,
                loading3: false,
            }
        },
        components: {
            SignInForm
        },
        watch: {
            loader() {
                const l = this.loader
                this[l] = !this[l]
                setTimeout(() => (this[l] = false), 2000)
                // @click.native="loader = 'loading3'" :disabled="loading3"
                this.loader = null
            }
        },
        methods: {
            signIn() {
              console.log('fooooo')
                let signInData = this.$refs.SignInForm.form();
                if (signInData) {
                    this.loading3 = true;
                    Api
                        .signIn(signInData)
                        .then((res) => {
                            this.loading3 = false;
                            var decoded = jwt_decode(res.data.token);
                            Api.Axios().Api.setToken(res.data.token)
                            console.log(decoded);
                            this.$router.push('/users');
                        })
                        .catch((err) => {
                            this.loading3 = false;               
                        })
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .login-card {
        top: 9rem
    }
    .logo-container {
        height: 200px;
    }
    .login-logo {
        margin: 20px;
    }
    .login-label {
        margin-top: 90px;
    }
</style>
