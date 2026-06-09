import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const VerifyEmail = () => {

    const { token } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const verifyEmail = async () => {
            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/auth/verify-email',
                    {token}
                )
                console.log("Verification successfull")
                
                setIsLoading(false)

                setTimeout(() => {
                    navigate('/login')
                }, 2000)

            } catch (error) {
                console.log("Error in Account verification:", error)
            }
        }

        if (token) {
            console.log("heyhey")
            verifyEmail()
        }
        else {
            console.log("Token is not present")
        }

    }, [token,navigate])


    if (isLoading) {
        return (
            <div className='w-full h-full absolute top-0 left-0 flex justify-center z-10 bg-black/80'>
                <div className='flex items-center gap-8'>
                    <div className='w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
                    <h1 className='text-white text-3xl font-semibold'>Verifying Email...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full h-50 flex items-center justify-center'>
            <h1 className=' text-3xl font-semibold'>Account Verified , Redirecting to Login</h1>
        </div>
    )
}

export default VerifyEmail