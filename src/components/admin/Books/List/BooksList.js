import { Api } from '../../../../services';
import _ from 'lodash';

export default {
    data() {
        return {
            search: '',
            totalItems: 0,
            items: [],
            selected: [],
            loading: true,
            pagination: {

            },
            headers: [
                {
                    text: 'id',
                    align: 'center',
                    sortable: false,
                    value: 'id'
                },
                { text: 'E-mail', align: 'center', value: 'calories' },
                { text: 'First Name', align: 'center', value: 'firstName' },
                { text: 'Last Name', align: 'center', value: 'lasttName' },
                { text: 'Phone Number', align: 'center', value: 'phone' },
                { text: 'Role (s)', align: 'center', value: 'roles' },
                { text: 'Actions', align: 'center', sortable: false, value: 'action' }

            ]
        }
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
        // this.getDataFromApi()
        //     .then(data => {
        //         console.log('data', data);
        //         this.items = data.items
        //         this.totalItems = data.total
        //     })
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
        getDataFromApi() {
            this.loading = true

            return Api.Users()
                .list(this.pagination)
                .then(res => {
                    this.loading = false;
                    this.items = res.items;
                    res.data.items = _.map(res.data.items, user => { user.roles = _.join(user.roles, ', '); return user });
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
