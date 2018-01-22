
<template>
    <div>
        <v-layout row wrap class="padding">
            <v-flex xs12 sm6>
                <v-card darck>
                    <v-card-title primary-title>
                        {{User.profile.fname}} {{User.profile.lname}}
                    </v-card-title>
                    <v-flex xs12 sm6 md8 text-xs-center layout align-center justify-center>
                        <v-avatar :tile="tile" :size="avatarSize" class=" lighten-4" darck>
                            <img :src="AvatarUrl()" alt="avatar">
                        </v-avatar>
                    </v-flex>
                    <v-card-actions>
                        <v-btn flat class="orange--text">Share</v-btn>
                        <v-btn flat class="orange--text">Explore</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-title primary-title>
                        Info
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat class="orange--text">Share</v-btn>
                        <v-btn flat class="orange--text">Explore</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="padding">
            <v-flex xs12 sm6>
                <v-card darck>
                    <v-card-title primary-title>
                        {{User.profile.fname}} {{User.profile.lname}}
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat class="orange--text">Share</v-btn>
                        <v-btn flat class="orange--text">Explore</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-title primary-title>
                        Info
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat class="orange--text">Share</v-btn>
                        <v-btn flat class="orange--text">Explore</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script src ="./BooksInfo.js">

</script>

<style>

</style>