import {configureStore,createSlice} from "@reduxjs/toolkit";

// const AuthSlice = createSlice({
//     name:"Auth",
//     initialState:{
//         users:[]
//     },
//     reducers:{
//         addAuth(state,action){
//            state.users = action.payload
//         }
//     }
// })

const localStorageSlice = createSlice({
  name: 'localStorageData',
  initialState: {
    data: JSON.parse(localStorage.getItem('myData')) || {}
  },
  reducers: {
    setLocalStorageData(state, action) {
      state.data = action.payload;
      localStorage.setItem('myData', JSON.stringify(action.payload));
    }
  }
});


const store = configureStore({
    reducer:{
        // Auth:AuthSlice.reducer
        localStorage:localStorageSlice.reducer
    }
})
// store.subscribe(()=>{
//     localStorage.setItem('reduxState', JSON.stringify(store.getState()))
//   })
// const initialState = store.getState()

// store.dispatch({
//     type:"Auth/addAuth",
    
// })

export {store} 
// export const {addAuth} = AuthSlice.actions;
export const { setLocalStorageData } = localStorageSlice.actions;
