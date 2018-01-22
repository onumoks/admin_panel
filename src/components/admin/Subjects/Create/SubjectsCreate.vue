<template>
    <div>
        <v-card class="elevation-2">
            <v-card-text>
                <v-container fluid>
                    <v-layout row>
                        <v-flex xs4>
                            <v-subheader class="grey--text text--lighten-1">Title</v-subheader>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field name="input-1" label="Label Text" v-model="Subject.title" dark required :rules="[() => Subject.title.length > 0|| 'Field Title is required']"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs4>
                            <v-subheader class="grey--text text--lighten-1">Description</v-subheader>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field name="input-7-2" label="Label Text" v-model="Subject.description" multi-line dark ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                          <v-flex xs4>
                            <v-subheader class="grey--text text--lighten-1">Recomended Books</v-subheader>
                        </v-flex>
                        <v-flex xs8>
                            <v-select label="Async items" autocomplete :async-loading="loading" dark multiple cache-items chips required :items="items" :rules="[() => select.length > 0 || 'You must choose at least one']" :search-input.sync="search" v-model="select"></v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn flat>Back</v-btn>
                <v-btn @click="create()" flat>Create</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script src ="./SubjectsCreate.js">

</script>

<style>
    .card {
        margin: 5px!important
    }
</style>