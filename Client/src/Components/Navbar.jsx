import React from 'react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import { logout } from '../Redux/Authslice';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

    const {isAuthenticated}= useSelector(state=> state.auth)
    // console.log("Authentication Status ==", isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onHandleLogout= async ()=>{
       try{
        await axios.post('http://localhost:8000/api/auth/logout',
            {}, {withCredentials:true}
        )
        dispatch(logout())
        navigate('/')
        toast.success("successfully logged out")

        } catch (error){
        console.log("error in logout",error)
        toast.error("failed to logout")
        }
    }
    console.log("isAuthenticated==", isAuthenticated)

    return (
        <div className='flex justify-between items-center px-16'>
            <div>
                <Link to='/'><img src={Logo} alt="" className='w-25 h-25' /></Link>
            </div>
            <div className='flex gap-6'>
                <Link to='/about' className='text-lg text-black/60 font-semibold'>About Us</Link>
                <Link to='/store' className='text-lg text-black/60 font-semibold' >Store</Link> 
                <Link to ='/reviews' className='text-lg text-black/60 font-semibold'>Reviews</Link>
                <Link to='/enquiries' className='text-lg text-black/60 font-semibold'>Enquiries</Link>
                <Link to='/connect' className='text-lg text-black/60 font-semibold'>Connect Us</Link>
            </div>
            <div className='flex gap-6'>
                {isAuthenticated ?(
                    <>
                       <div className='flex justify-center items-center gap-2 cursor-pointer'>
                            <Link to='/profile'>Account</Link>
                            <FaUserCircle />

                        </div>
                        <div><Link to='/cart' className='text-lg text-black/60 font-semibold'>Cart</Link>
                        </div>
                        <button 
                            onClick={onHandleLogout}
                            className='ms-8 cursor-pointer'>Logout</button>
                    
                    </>
                ) 
                    :(
                        <>
                        <Link to='/login' className='cursor-pointer px-8 py-2 rounded-lg font-semibold bg-orange-400 text-white'>
                            Login</Link>
                        <Link to='/signup' className='cursor-pointer px-8 py-2 rounded-lg font-semibold border-2 border-orange-400'>
                            Signup</Link>
                        
                        </>
                    )
                }
               
                  




            </div>
        </div>
    )
}

export default Navbar