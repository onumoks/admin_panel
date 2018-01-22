import router from '../router'


export default (error) => {
    console.log('ERROR', error.response);
    if (error) {
        switch (true) {
            case error.response.status == 401:
                router.app.$notify({
                    type: 'error',
                    title: 'Unauthorize',
                    text: error.response.data
                });
                router.push('/sign-in');
                break;

            default:
                router.app.$notify({
                    type: 'error',
                    title: error.title,
                    text: error.response.data || error.message
                });
                break;
        }
    }
}