import axios from 'axios';

export function getUser() {
    return axios.get('/auth/me').then(function(res) {
        console.log(res.data)
      return res.data;
    }).catch(function(err) {
      console.log(err);
    })
}
getUser()

export function postFavs(favs) {
     return axios.post('/postFav' + favs)
//    return axios.post('/postFav' + favs).then(res => res.data)
}

export function deleteFav(notFav) {
    return axios.delete('/deleteFav' + notFav)
//    return axios.delete('/deleteFav' + notFav).then(res => res.data)
}

export function getOptions() {
   return axios.get('/getOptions').then(res => res.data)
}