import axios from 'axios';

export function getUser() {
    return axios.get('/auth/me').then(function(res) {
        console.log(res.data)
      return res.data;
    }).catch(function(err) {
      console.log(err);
    })
}

export function postFavs(favs) {
     return axios.post('/postFav', favs)
//    return axios.post('/postFav', favs).then(res => res.data)
}

export function deleteFav(notFav) {
    console.log(notFav)
    return axios.delete('http://localhost:4005/deleteFav/' + notFav)
}


export function getOptions() {
   return axios.get('/getOptions').then(res => res.data)
}