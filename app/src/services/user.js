import axios from 'axios';

export function getUser() {
    return axios.get('/auth/me').then(function(res) {
      return res.data;
    }).catch(function(err) {
      console.log(err);
    })
}

export function postFavs(favs) {
     return axios.post('/postFav', favs)
}

export function deleteFav(notFav) {
    return axios.delete('http://localhost:4005/deleteFav/' + notFav)
}


export function getOptions() {
   return axios.get('/getOptions').then(res => res.data)
}