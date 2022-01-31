import React,{useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import {auth, db} from '../util/firebase'
import CartProducts from '../util/CartProducts';

const Cart = () => {

    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FullName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
    console.log(user);
    
    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

    // console.log(cartProducts);

    let Product;
    
    // cart product increase function
    const cartProductIncrease=(cartProduct)=>{
        // console.log(cartProduct);
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;
        // updating in database
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('increment added');
                })
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }

    // cart product decrease functionality
    const cartProductDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
             // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decrement');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    }
   
    return (
        <>
            <Navbar user={user} />           
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        <CartProducts cartProducts={cartProducts}
                           cartProductIncrease={cartProductIncrease}
                           cartProductDecrease={cartProductDecrease}
                        />
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
        </>
    )
}

export default Cart;