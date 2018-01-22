

<template>
    <v-app id="inspire" dark>
        <v-navigation-drawer clipped persistent v-model="drawer" enable-resize-watcher app>
            <SideBar></SideBar>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Moks</v-toolbar-title>
        </v-toolbar>
        <main>
            <v-content>
                <router-view></router-view>
            </v-content>
        </main>
        <v-footer app fixed>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
    import SideBar from './admin/SideBar'
    export default {
        data: () => ({
            clipped: true,
            drawer: true,
            fixed: true,
            items: [{
                icon: 'bubble_chart',
                title: 'Inspire'
            }],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'MOKS'
        }),
        components: {
            SideBar
        }
    }
</script>

<style scoped>

</style>



