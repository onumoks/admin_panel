


<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 class="padding elevation-0">
                <v-card class="blue-grey darken-2 white--text ">
                    <v-card-title>
                       <h4> Users </h4>
                        <v-spacer></v-spacer>
                        <v-text-field append-icon="search" label="Search by E-mail" single-line hide-details v-model="search"></v-text-field>
                    </v-card-title>
                     <v-card-actions>
                        <v-btn flat  >
                                        <v-icon>create</v-icon>                            
                           </v-btn>
                        <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex class="elevation-0 padding" xs12>
                <v-card darck>
                    <v-data-table v-model="selected" select-all selected-key="name" v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" :total-items="totalItems" :loading="loading" class="elevation-1">
                    <template slot="headerCell" scope="props">
                        <span v-tooltip:bottom="{ 'html': props.header.text }">
                            {{ props.header.text }}
                         </span>
                     </template>
                      
                        <template slot="items" scope="props" >
                             <tr :active="props.selected" @click="props.selected = !props.selected">
                                   <td>
                                     <v-checkbox primary hide-details :input-value="props.selected"></v-checkbox>
                                 </td>
                                 <td class="text-xs-center">{{ props.item.id }}</td>
                                 <td class="text-xs-center">{{ props.item.email }}</td>
                                 <td class="text-xs-center">{{ props.item.firstName }}</td>
                                 <td class="text-xs-center">{{ props.item.lastName }}</td>
                                 <td class="text-xs-center">{{ props.item.phone }}</td>
                                 <td class="text-xs-center">{{ props.item.roles }}</td>
                                <td class="text-xs-center">
                                    <span class="group pa-2">
                                     <!-- <v-icon>home</v-icon> -->
                                     <!-- <v-icon>event</v-icon> -->
                                     <router-link :to="`users/${props.item.id}`"> <v-icon>info</v-icon></router-link> 
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



<script src="./BooksList.js">
</script>