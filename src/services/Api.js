import Config from '../config';
import { Axios } from './';
export class Api {

    static Users() { return UsersApi }
    static Subjects() { return SubjectsApi }
    static Specialties = () => SpecialtiesApi;
    static Cources = () => CourcesApi;

    static Axios = () => Axios;






    static signIn(signInData) {
        return Axios.Server
            .post(`/authorize`, signInData, {
                withCredentials: true
            }).then(res => {
                console.log(res.headers["set-cookie"]);
                return res;
            })
    }






}

class UsersApi {

    static list(params) {
        return Axios.Api
            .get(`/users`, { params }, {
                withCredentials: true
            })
    }
    static get(id) {
        return Axios.Api
            .get(`/users/${id}`, {
                withCredentials: true
            })
    }
    static uploadAvatar(userId, formData) {
        return Axios.Api
            .post(`/users/${userId}/profile/avatar`, formData)
    }
    static update(userId, newUser) {
        return Axios.Api
            .put(`/users/${userId}/profile`, newUser, {
                withCredentials: true
            })
    }

    static create(newUser) {
        return Axios.Api
            .post(`/users`, newUser, {
                withCredentials: true
            });

    }
}

class SubjectsApi {

    static list(params) {
        return Axios.Api
            .get(`/subjects`, { params }, {
                withCredentials: true
            })
    }
    static create(newSubject) {
        return Axios.Api
            .post(`/subjects`, newSubject, {
                withCredentials: true
            });

    }
}

class SpecialtiesApi {
    static list(params) {
        return Axios.Api
            .get(`/specialties`, { params }, {
                withCredentials: true
            })
    }
    static get(id) {
        return Axios.Api
            .get(`/specialties/${id}`, {
                withCredentials: true
            })
    }

    static create(newSpecialty) {
        return Axios.Api
            .post(`/specialties`, newSpecialty, {
                withCredentials: true
            });

    }

    static update(id, newSpecialty) {
        return Axios.Api
            .put(`/specialties/${id}`, newSpecialty, {
                withCredentials: true
            })
    }
}

class CourcesApi {


    static list(params) {
        return Axios.Api
            .get(`/courses`, { params }, {
                withCredentials: true
            })
    }
    static get(id) {
        return Axios.Api
            .get(`/courses/${id}`, {
                withCredentials: true
            })
    }

    static create(newCource) {
        return Axios.Api
            .post(`/courses`, newCource, {
                withCredentials: true
            });

    }

    static update(id, newCource) {
        return Axios.Api
            .put(`/courses/${id}`, newCource, {
                withCredentials: true
            })
    }
}