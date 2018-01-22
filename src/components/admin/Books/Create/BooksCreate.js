import Config from '../../../../config';
import TimeLine from '../../TimeLine/TimeLine.vue';
import { Api } from '../../../../services';

export default {
    data() {
        return {
            card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
            ,
            ApiUrl: Config.ApiUrl,
            slider: 56,
            tile:false,
            User: { profile: {} }
        }
    },
    components: {
        TimeLine
    },
    created() {
        return Api
            .Users()
            .get(this.$route.params.id)
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
    computed: {
        avatarSize () {
            return `${this.slider}px`
          }
    },
    methods: {
        AvatarUrl() {
            return `${Config.ApiUrl}/users/${this.$route.params.id}/profile/avatar`;
        }
    }
}