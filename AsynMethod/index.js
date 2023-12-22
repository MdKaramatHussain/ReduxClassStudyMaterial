// Application to fetch data from API endpoint and store them in redux store

const { createStore, applyMiddleware } = require("redux")
const thunkMiddleware = require('redux-thunk').thunk
const axios = require('axios')
// 1.) State={ 
// data: [], 
// error:''
// }

// 2.)action
// 3.) redux store


const initialState = {
    data: [],
    error: ''
}

const FETCH_USERS_DATA = 'FETCH_USERS_DATA';
const FETCH_USERS_DATA_FAILS = 'FETCH_USERS_DATA_FAILS'

// actionCreator for getting Data
const fetchUserData = (users) => {
    return {
        type: FETCH_USERS_DATA,
        payload: users
    }
}

// actionCreatore If Fails
const fetchUserDataFails = (error) => {
    return {
        type: FETCH_USERS_DATA_FAILS,
        payload: error
    }
}

// Reducer 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_DATA:
            return {
                data:action.payload,
                error: ''
            }
        case FETCH_USERS_DATA_FAILS:
            return {
                data:[],
                error:action.payload
            }
        default:
            return state;
    }
}
// making action creator with the help of redux-thunk middleware which return function 
const fetchUser = () => {
    return function (dispatch) {
        axios.get('http://jsonplaceholder.typicode.com/users')
        .then(res => {
            // res.data
            const data = res.data.map(user =>[user.id, user.name])
            dispatch(fetchUserData(data))
        })
        .catch( error => {
            // error.message
            dispatch(fetchUserDataFails(error.message))
        })
    }
}

// creating store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => {console.log(store.getState())});

store.dispatch(fetchUser())



