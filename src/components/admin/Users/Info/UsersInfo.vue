
<template>
  <v-layout row>
    <v-flex sm6 xs12>
      <v-card>
        <v-toolbar class="teal" dark>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
          <v-btn @click="back()" dark icon>
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="callInput" dark icon class="mr-3">
            <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" ref="fileInput" accept="image/*" class="uploader">
            <v-icon>add_a_photo</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-media :src="url" height="300px">
          <v-layout column class="media">
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-3 pl-5 pt-5">{{User.profile.fname}} {{User.profile.lname}}</div>
            </v-card-title>
          </v-layout>
        </v-card-media>
        <UserForm :disabled="disabled" ref="GeneralForm" :profile="User.profile"> </UserForm>
        <v-card-actions>
          <v-btn v-if="!disabled" icon @click="updateUser">
            <v-icon>done</v-icon>
          </v-btn>
          <v-btn v-if="!disabled" icon @click="clear">
            <v-icon>highlight_off</v-icon>
          </v-btn>
          <v-btn v-if="disabled" icon @click="edit">
            <v-icon>create</v-icon>
          </v-btn>
          <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>
    <UserSettings></UserSettings>
  </v-layout>
</template>





<script>
  import Config from '../../../../config';
  import TimeLine from '../../TimeLine/TimeLine.vue';
  import {
    Api
  } from '../../../../services';
  import Components from './';
  import _ from 'lodash';
  ///sdsds
  export default {
    props: ['userId'],
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
          (v) => {
            console.log('v', v);
            console.log('test', (!v || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) || 'E-mail must be valid');
            return (!v || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) || 'E-mail must be valid';
          }
        ],
        requiredEmailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        phoneRules: [
          (v) => !!v || 'Phone Number is required',
          (v) => /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(v) || 'Phone number must be valid'
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
        disabled: true
      }
    },
    components: {
      UserSettings: Components.UserSettings,
      UserForm: Components.UserForm
    },
    created() {
      this.User.id = this.userId ? this.userId : this.$route.params.id
      return Api
        .Users()
        .get(this.User.id)
        .then(res => {
          this.url = `${Config.ApiUrl}/users/${this.User.id}/profile/avatar?access_token=${Api.Axios().Api.access_token}`;
          console.log('Api.Axios().Api.access_token',Api.Axios().Api.access_token)
          this.User = res.data
        })
        .catch(error => {
          console.log('error', error);
          this.$notify({
            type: 'error',
            title: error.title,
            text: error.message
          });
        });
    },
    computed: {
      avatarSize() {
        return `${this.slider}px`
      },
      isInitial() {
        return this.currentStatus === 'STATUS_INITIAL';
      },
      isSaving() {
        return this.currentStatus === 'STATUS_SAVING';
      },
      isSuccess() {
        return this.currentStatus === 'STATUS_SUCCESS';
      },
      isFailed() {
        return this.currentStatus === 'STATUS_FAILED';
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
        this.$refs.GeneralForm.clear()
      },
      edit() {
        this.disabled = !this.disabled;
      },
      updateUser() {
        let generalFormData = this.$refs.GeneralForm.form();
        console.log('generalFormData', generalFormData);
        if (generalFormData) {
          return Api
            .Users()
            .update(this.User.id, generalFormData)
            .then(res => {
              this.url = `${Config.ApiUrl}/users/${this.User.id}/profile/avatar?access_token=${Api.Axios().Api.access_token}`;
              this.User = res.data;
              this.$notify({
                type: 'success',
                title: 'Success',
                text: 'Profile has been updated!'
              });
            })
            .catch(error => {
              console.log('error', error);
              this.$notify({
                type: 'error',
                title: error.title,
                text: error.message
              });
            });
        }
      },
      getUser() {
        return Api
          .Users()
          .get(this.User.id)
          .then(res => {
            this.User = res.data
          })
          .catch(error => {
            console.log('error', error);
            this.$notify({
              type: 'error',
              title: error.title,
              text: error.message
            });
          });
      },
      back() {
        this.$router.push('/users');
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = 'STATUS_SAVING';
        return Api
          .Users()
          .uploadAvatar(this.User.id, formData)
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = 'STATUS_SUCCESS';
            this.url = '';
            return setTimeout(() => {
              this.url = `${Config.ApiUrl}/users/${this.User.id}/profile/avatar?access_token=${Api.Axios().Api.access_token}`;
            }, 100);
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = 'STATUS_FAILED';
            this.$notify({
              type: 'error',
              title: error.title,
              text: error.message
            });
          });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        if (!fileList.length) return;
        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });
        // save it
        this.save(formData);
      }
    }
  }
</script>

<style>
  .uploader {
    display: none;
  }
</style>