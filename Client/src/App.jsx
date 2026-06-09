  import React from 'react'
  import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
  import { Provider } from 'react-redux'
  import store from './Redux/Store'
  import Navbar from './Components/Navbar'
  import Loginpage from './pages/Loginpage'
  import Signuppage from './pages/Signuppage'
  import Homepage from './pages/Homepage'
  import About from './pages/About'
  import Store from './pages/Store'
  import Reviews from './pages/Reviews'
  import Enquiries from './pages/Enquiries'
  import Connect from './pages/Connect'
  import Footer from './Components/footer'
  import NoteFound from './pages/Notfound'
  import Profilepage from './pages/Profilepage'
  import {Toaster} from 'react-hot-toast'
  import VerifyEmail from './pages/VerifyEmail'
  import GuestRoute from './Routes/GuestRoute'
  import Mycart from './pages/Mycart'
  import WishlistLoader from './Components/WishlistLoader'
  const App = () => {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <WishlistLoader/>
        <Toaster position='top-center'
        toastOptions={{
          duration:4000,
          style:{
            padding:'20px',
            fontsize:'18px',
            fontWeight:'600',
            boxShadow:'0 4px 12px'
          }
        }}/>
        
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path= '/login' element={ <GuestRoute>
          <Loginpage/>
          </GuestRoute> 
         }
          
         />
        <Route path= '/signup' element={<Signuppage/>}/>
        <Route path= '/verify-email/:token'element={<VerifyEmail/>}/>
        <Route path= '/profile' element={<Profilepage/>}/>
        <Route path= '/store' element={<Store/>}/>
        <Route path='*' element={<NoteFound />} />
        <Route path='/cart' element={<Mycart />} />
        
      </Routes>
      <div  className='minHeight:"100vh" marginTop:auto'>
      <Footer />
      </div>
      </BrowserRouter>

      </Provider>
      
    )
  }

  export default App