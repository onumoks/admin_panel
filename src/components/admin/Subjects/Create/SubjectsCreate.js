import Config from '../../../../config';
import { Api } from '../../../../services';

export default {
    data() {
        return {
            loading: false,
            items: [],
            search: null,
            select: [],
            ApiUrl: Config.ApiUrl,
            slider: 56,
            tile: false,
            Subject: {
                title: '',
                description: '',
                books: []
            }
        }
    },
    created() {
        console.log('CREATED!!');
    },
    computed: {
        avatarSize() {
            return `${this.slider}px`
        }
    }, 
    watch: {
        search (val) {
          val && this.querySelections(val)
        }
      },
    methods: {
        AvatarUrl() {
            return `${Config.ApiUrl}/users/${this.$route.params.id}/profile/avatar`;
        },
        back() {
            this.$router.push('/subjects');
        },
        create() {
            return Api
                .Subjects()
                .create(this.Subject)
                .then(res => this.User = res.data)
                .catch(error => {
                    console.log('error', error);
                    this.$notify({
                        type: 'error',
                        title: error.title,
                        text: error.message
                    });

                });
        },
        querySelections (v) {
            this.loading = true
            // Simulated ajax query
            setTimeout(() => {
              this.items = this.states.filter(e => {
                return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
              })
              this.loading = false
            }, 500)
          }
    }
}