import axios from '~/axios'

export async function loginapi(username: string, password: string) {
    return axios.post('/login', { username, password }).then(res => res.data).catch(err => err.response.data)
}
