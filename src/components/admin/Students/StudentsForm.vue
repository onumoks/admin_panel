<template>
    <v-form v-model="valid" ref="generalForm" class="padding">
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">First Name</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" name="input-1" label="First Name" v-model="fname" dark required :rules="Rules.nameRules"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Last Name</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" name="input-1" label="Last Name" v-model="lname" dark required :rules="Rules.nameRules"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>Password</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field name="input-10-1" label="Enter your password" hint="At least 8 characters" v-model="password" min="8" :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (passwordVisibility = !passwordVisibility)" :type="passwordVisibility ? 'password' : 'text'" counter></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>
                    <v-icon color="info">mail</v-icon>
                </v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" v-model="email" :rules="Rules.requiredEmailRules" required label="Work E-mail" dark></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" v-model="personal_email" :rules="Rules.emailRules" label="Personal E-mail" dark></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>
                    <v-icon color="info">phone</v-icon>
                </v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" v-model="work_phone" name="work_phone" :rules="Rules.phoneRules" label="Work" dark></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" v-model="personal_phone" :rules="Rules.phoneRules" required label="Mobile" dark></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Specialty</v-subheader>
            </v-flex>
            <v-flex xs8>
                <SpecialtySelect :required="false" :value="specialty" :disabled="disabled" ref="SpecialtySelect"> </SpecialtySelect>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Course</v-subheader>
            </v-flex>
            <v-flex xs8>
                <CourseSelector :required="false" :value="course" :disabled="disabled" ref="CourseSelector"> </CourseSelector>
            </v-flex>
        </v-layout>
    </v-form>
</template>


<script>
    import Config from '../../../config';
    import {
        Rules
    } from '../../../helpers';
    import _ from 'lodash';
    import Components from '../Components'
    export default {
        props: ['id', 'disabled', 'cource'],
        data() {
            return {
                Rules: Rules,
                ApiUrl: Config.ApiUrl,
                valid: false,
                passwordVisibility:false,
                //------------Forms Params
                fname: '',
                lname: '',
                email:'',
                personal_phone: '',
                work_phone: '',
                personal_email: '',
                work_email: '',
                specialty: [],
                course: [],
                password: ''
            }
        },
        components: {
            StudentsSelect: Components.StudentsSelect,
            SpecialtySelect: Components.SpecialtySelect,
            CourseSelector: Components.CourseSelector
        },
        created() {
            this.ages = [];
            this.years = [];
            for (let i = 0; i < 12; i++) {
                this.ages.push({
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
                this.specialty = newCource.specialty ? newCource.specialty : '';
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
                        specialty_id: _.isObject(this.$refs.SpecialtySelect.getData()) ? this.$refs.SpecialtySelect.getData().id : this.$refs.SpecialtySelect.getData(),
                        fname: this.fname,
                        lname: this.lname,
                        personal_phone: this.personal_phone,
                        work_phone: this.work_phone,
                        personal_email: this.personal_email,
                        work_email: this.work_email,
                        email:this.email,
                        role: 'student',
                        password: ''
                    }
                }
            }
        }
    }
</script>