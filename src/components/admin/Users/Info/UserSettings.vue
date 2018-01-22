<template>
    <v-flex xs12 sm6>
        <v-card>
            <v-toolbar class="teal" dark>
                <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                <v-toolbar-title>Settings</v-toolbar-title>
            </v-toolbar>
            <v-list two-line subheader>
                <v-subheader>General</v-subheader>
                <v-list-tile avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Profile photo</v-list-tile-title>
                        <v-list-tile-sub-title>Change your Google+ profile photo</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Show your status</v-list-tile-title>
                        <v-list-tile-sub-title>Your status is visible to everyone</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list two-line subheader>
                <v-subheader>Hangout notifications</v-subheader>
                <v-list-tile avatar>
                    <v-list-tile-action>
                        <v-checkbox v-model="Settings.notifications"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Notifications</v-list-tile-title>
                        <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                    <v-list-tile-action>
                        <v-checkbox v-model="Settings.sound"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Sound</v-list-tile-title>
                        <v-list-tile-sub-title>Hangouts message</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                    <v-list-tile-action>
                        <v-checkbox v-model="Settings.video"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Video sounds</v-list-tile-title>
                        <v-list-tile-sub-title>Hangouts vidoe call</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                    <v-list-tile-action>
                        <v-checkbox v-model="Settings.invites"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Invites</v-list-tile-title>
                        <v-list-tile-sub-title>Notify when receiving invites</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-card-actions>
                <v-btn>
                    <v-icon>done</v-icon>
                </v-btn>
                <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
            </v-card-actions>
        </v-card>
    </v-flex>
</template>






<script>
    import Config from '../../../../config';
    import {
        Api
    } from '../../../../services';
    export default {
        props: ['userId'],
        data() {
            return {
                Settings: {
                    video: true,
                    sound: false,
                    notifications: true,
                    invites: true
                }
            }
        },
        created() {},
        computed: {},
        methods: {
            AvatarUrl() {
                return ``;
            }
        }
    }
</script>