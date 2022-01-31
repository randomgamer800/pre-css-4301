// import React, { useContext } from 'react'
// import { Icon } from 'react-icons-kit'
// import { cart } from 'react-icons-kit/entypo/cart'
// import { CartContext } from '../util/CartContext'

// // export const Navbar = ({ user }) => {
//   export const Navbar = () => {
//     const { totalQty } = useContext(CartContext);

//     return (
//         <div className='navbox'>
//                 <span><Icon icon={cart} /></span>
//                 <span className='no-of-products'>{totalQty}</span>
//         </div>
//     )
// }

import React from 'react'
import {Link} from 'react-router-dom'
// import logo from '../Images/logo.png'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth} from '../util/firebase'
import {useNavigate} from 'react-router-dom'

export const Navbar = ({user}) => {

    const history = useNavigate();

    const handleLogout=()=>{
        auth.signOut().then(()=>{
            history.push('/login');
        })
    }

    return (
        <div className='navbar'>
            {/* <div className='leftside'>
                <div className='logo'>
                    <img src={logo} alt="logo"/>
                </div>
            </div> */}
            <div className='rightside'>

                {!user&&<>
                    <div><Link className='navlink' to="signup">SIGN UP</Link></div>
                    <div><Link className='navlink' to="login">LOGIN</Link></div>
                </>} 

                {user&&<>
                    <div><Link className='navlink' to="/">{user}</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="/cart">
                            <Icon icon={shoppingCart} size={20}/>
                        </Link>
                        {/* <span className='cart-indicator'>{totalQty}</span> */}
                    </div>
                    <div className='btn btn-danger btn-md'
                    onClick={handleLogout}>LOGOUT</div>
                </>}                     
                                
            </div>
        </div>

    )
}