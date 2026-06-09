import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

  const Profilepage = () => {
    const {isAuthenticated,user,email}=useSelector(state =>state.auth)

    //console.log("isAuthenticated ==", isAuthenticated)
  //console.log("Username==",user)
  // console.log("Email==", email)

  if(!isAuthenticated){
    return<Navigate to="/login"/>
  }
      
  return (
      <div className='w-full h-125 flex items-center justify-center'>
        <div>
          <h1 className='text-4xl font-bold'>Welcome, {user}</h1>
          <h3 className='text-xl'>Email : {email}</h3>
        </div>
      </div>
    )
  }

  export default Profilepage