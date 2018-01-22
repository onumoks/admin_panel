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
            pagination: {},
            headers: [
                {
                    text: 'id',
                    align: 'center',
                    sortable: false,
                    value: 'id'
                },
                { text: 'Title', align: 'center', value: 'title' }
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

            return Api.Subjects()
                .list({
                    page: 1,
                    perPage: 5
                })
                .then(res => {
                    this.loading = false;
                    this.items = res.items;
                    //  res.data.items = _.map(res.data.items, subject => { user.roles = _.join(user.roles, ', '); return user });
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
