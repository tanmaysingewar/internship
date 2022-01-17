const { API } = require("../backend");
export const authincate = (data)=>{
    if (JSON.stringify(data.error)) {
        return ''
    }
    if (typeof window !== 'undefined') {
        localStorage.setItem('login_user',JSON.stringify({token : data.token}))
    }
}


export const isAuthincated =()=>{
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('login_user')) {
        return JSON.parse(localStorage.getItem('login_user'))
    }else{
        return false
    }
}


export const createUser = (user) => {
    return fetch(`${API}/create`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}

export const loginUser = (user) => {
    return fetch(`${API}/login`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}   

export const getUser = (token) => {
    return fetch(`${API}/user`,{
        method : 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}