import { createSlice} from '@reduxjs/toolkit'
import {jwtDecode} from 'jwt-decode'
//const savedAuth = JSON.parse(localStorage.getItem('auth')|| '{"isAuthenticated":false}')



const getUserInfoFromToken =()=> {
    const token =document.cookie.split(';')
        .find(item => item.startsWith('authtoken'))
    if (!token){
        return{
            isAuthenticated:false,
            user:null,
            email:null,
        }
    }
    try{
        const jwtToken =token.split('=')[1]
        //console.log("jwt token==",jwtToken)
        const decoded = jwtDecode(jwtToken)
        //console.log("Decoded token == ",decoded)
        return {
            isAuthenticated:true,
            user:decoded.name,
            email:decoded.email
        }
    }catch(error){
        return{
            isAuthenticated:false,
            user:null,
            email:null,
        }
    }
    //console.log("Token==",token)
}
const savedUser = getUserInfoFromToken()


//const checkJWTtoken=()=> {
//      return document.cookie.split(';').some((item)=>item.trim().startsWith('authtoken'))|| false

//}
const initialState ={
    
    //isAuthenticated: savedAuth.isAuthenticated,
    //isAuthenticated:checkJWTtoken(),
    isAuthenticated:savedUser.isAuthenticated,
    user:savedUser.user,
    email:savedUser.email
}
const authSlice= createSlice({
    name:"Auth reducer",
    initialState,
    reducers :{
        loginSuccess: (state,action)=>{
            state.isAuthenticated =true
           // localStorage.setItem('auth',JSON.stringify({isAuthenticated:true}))
           
        },
        logout : (state,action)=> {
            state.isAuthenticated = false
            //localStorage.removeItem('auth')
            document.cookie = "authtoken=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        }

    }
})
export const {loginSuccess,logout}= authSlice.actions
export default authSlice.reducer