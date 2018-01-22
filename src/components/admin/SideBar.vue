<template>
    <v-list>
        <v-list-group v-for="(item, i) in items" :key="i">
            <v-list-tile slot="item" ripple @click.native="navigate(item)">
                <v-list-tile-action>
                    <v-icon dark v-html="item.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                <v-list-tile-action v-if="item.items && item.items.length>0">
                    <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" @click.native="navigate(subItem)">
                <v-list-tile-action>
                    <v-icon dark v-html="subItem.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon>{{ subItem.action }}</v-icon>
                </v-list-tile-action>
            </v-list-tile>
        </v-list-group>
    </v-list>
</template>

<script>
    export default {
        data() {
            return {
                items: [{
                        icon: 'dashboard',
                        title: 'Dashboard',
                        link: '/dashboard'
                    },
                    {
                        icon: 'people',
                        title: 'Users',
                        link: '/users',
                        items: [{
                            icon: 'book',
                            title: 'Students',
                            link: '/students'
                        }, {
                            icon: 'school',
                            title: 'Lectors',
                            link: '/lectors'
                        }, {
                            icon: 'lock',
                            title: 'Admins',
                            link: '/admins'
                        }, {
                            icon: 'people',
                            title: 'All Users',
                            link: '/users'
                        }]
                    },
                    {
                        icon: 'school',
                        title: 'Students',
                        link: '/users',
                        items: [{
                            icon: 'bubble_chart',
                            title: 'Specialties',
                            link: '/specialties'
                        }, {
                            icon: 'share',
                            title: 'Threads',
                            link: '/threads'
                        }, {
                            icon: 'local_library',
                            title: 'Courses',
                            link: '/courses'
                        }, {
                            icon: 'call_split',
                            title: 'Groups',
                            link: '/groups'
                        }]
                    },
                    {
                        icon: 'subject',
                        title: 'Subjects',
                        link: '/subjects'
                    },
                    {
                        icon: 'book',
                        title: 'Books',
                        link: '/books'
                    },
                    {
                        icon: 'insert_drive_file',
                        title: 'Files',
                        link: '/files'
                    },
                    {
                        icon: 'bubble_chart',
                        title: 'Invites',
                        link: '/invites'
                    }
                ],
            }
        },
        methods: {
            navigate(item) {
                if (!item.items)
                    this.$router.push(item.link);
            }
        }
    }
</script>


