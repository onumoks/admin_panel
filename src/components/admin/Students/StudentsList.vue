<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 class="padding elevation-0">
                <v-card class="blue-grey darken-2 white--text ">
                    <v-card-title>
                       <h4> Students </h4>
                        <v-spacer></v-spacer>
                        <v-text-field append-icon="search" label="Search by E-mail" single-line hide-details v-model="search"></v-text-field>
                    </v-card-title>
                     <v-card-actions>
                        <router-link :to="'students/create'"> <v-icon>create</v-icon></router-link>                   
                        <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex class="elevation-0 padding " sm12>
                <v-card darck>
                    <v-data-table v-model="selected" select-all selected-key="name" v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" :total-items="totalItems" :loading="loading" class="elevation-1">
                  
                    <template slot="headerCell" scope="props">
                             <v-tooltip bottom>
                             <span slot="activator">
                                    {{ props.header.text }}
                            </span>
                             <span>
                                     {{ props.header.text }}
                             </span>
                            </v-tooltip>
                    
                     </template>
                      
                        <template slot="items" scope="props" >
                             <tr :active="props.selected" @click="showUser(props.item.id)">
                                   <td @click="props.selected = !props.selected">
                                     <v-checkbox primary hide-details :input-value="props.selected"></v-checkbox>
                                 </td>
                                <td class="text-xs-center">{{ props.item.id }}</td>
                                <td class="text-xs-center">{{ props.item.email }}</td>
                                <td class="text-xs-center">{{ props.item.profile.fname }}</td>
                                <td class="text-xs-center">{{ props.item.profile.lname }}</td>
                                <td class="text-xs-center">{{ props.item.phone }}</td>
                                <td class="text-xs-center">
                                    <span class="group pa-2">
                                     <!-- <v-icon>home</v-icon> -->
                                     <!-- <v-icon>event</v-icon> -->
                                     <router-link :to="`students/${props.item.id}`"> <v-icon>info</v-icon></router-link> 
                                    </span>
                                </td>
                             </tr> 
                        </template>
                        
                    </v-data-table>
    
                </v-card>
                
            </v-flex>
           
        </v-layout>
        
    </div>

</template>



<script >
import { Api } from '../../../services';
import _ from 'lodash';
import moment from 'moment';
export default {
    data() {
        return {
            moment:moment,
            search: '',
            totalItems: 0,
            items: [],
            selected: [],
            loading: true,
            selectedUser:false,
            pagination: {

            },
            headers: [
                {
                    text: 'id',
                    align: 'center',
                    sortable: false,
                    value: 'id'
                },
                { text: 'E-mail', align: 'center', value: 'name' },
                { text: 'Year', align: 'center', value: 'year' },
                { text: 'Specialty', align: 'center', value: 'specialty' },
                { text: 'Student Count', align: 'center', value: 'student_count' },
                { text: 'Groups Count', align: 'center', value: 'cources_count' },
                { text: 'Created', align: 'center', value: 'created_at' }
                  
            ]
        }
    },
    components:{
        
    },
    watch: {
        pagination: {
            handler(newValue, oldValue) {
                if (!oldValue.page)
                    return;

                this.getDataFromApi()
                    .then(data => {
                        this.items = data.items
                        this.totalItems = data.total
                    })
            },
            deep: true
        }
    },
    mounted() {
        this.getDataFromApi()
                    .then(data => {
                        this.items = data.items
                        this.totalItems = data.total
                    })
    },
    methods: {
        toggleAll() {
            if (this.selected.length) this.selected = []
            else this.selected = this.items.slice()
        },
        changeSort(column) {
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
            } else {
                this.pagination.sortBy = column
                this.pagination.descending = false
            }
        },
        showUser(userId){
           this.selectedUser =userId; 
        },
        getDataFromApi() {
            this.loading = true

            return Api.Users()
                .list(Object.assign({},this.pagination,{
                      filter: JSON.stringify({
                            role: 'student'
                     })
                }))
                .then(res => {
                    this.loading = false;
                    this.items = res.items;
                    //res.data.items = _.map(res.data.items, cource => { user.roles = _.join(user.roles, ', '); return user });
                    return res.data;
                })
                .catch(err => {
                    this.loading = false;
                    this.items = [];
                    return [];
                });

        }
    }
}


</script>

<style scoped>
.resize{
     -webkit-transition:width 300ms ease-in-out, height 300ms ease-in-out;
    -moz-transition:width 300ms ease-in-out, height 300ms ease-in-out;
    -o-transition:width 300ms ease-in-out, height 300ms ease-in-out;
    transition:width 300ms ease-in-out, height 300ms ease-in-out;
}

</style>