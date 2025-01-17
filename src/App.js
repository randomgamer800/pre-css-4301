//necessary
import React, { Component } from 'react';
import { auth, db } from "./util/firebase";
//basic routing
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
//for pages
import Login from "./pages/login"
import Dashboard from "./pages/dashboard";
import Guides from "./pages/guides";
import Rewards from "./pages/rewards";
import Products from "./pages/rewards";
import Signup from "./pages/signup";
import Cart from "./pages/cart";
import AddProducts from "./util/AddProducts"
import Quiz from "./pages/quiz"
import AddQuestions from './util/AddQuestions'
import Video from "./pages/video"
//might need to remove later to hide it from view
// import AddProducts from "./components/AddProducts";
//utilities
import { UserAuthContextProvider } from "./util/userAuthContext";
import { ProductsContextProvider } from "./util/ProductsContext";
import { CartContextProvider } from "./util/CartContext";
import './index.css'
//Background Image
import Background from "./images/Background2.jpg";
//Navbar
import WithNav from "./components/Layout/WithNav";

//testing


var backgroundStyle = {
  minHeight: "100vh", 
  backgroundImage: `url(${Background})`,
  backgroundSize: "100%", 
  backgroundPosition: "center",
  //backgroundRepeat: "repeat-y",
};

//for routing 
//https://www.youtube.com/watch?v=Law7wfdg_ls
export class App extends Component {
    //for auth
//   state = {
//     user: null,
// }

// componentDidMount() {

    // getting user info for navigation bar
    //think can do something to this part to link them to different timelapses
//     auth.onAuthStateChanged(user => {
//         if (user) {
//             db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
//                 this.setState({
//                     user: snapshot.data()
//                 })
//             })
//         }
//         else {
//             this.setState({
//                 user: null
//             })
//         }
//     })

// }
  render() {
    return (
      <ProductsContextProvider>
      <CartContextProvider>
      <Router>
        <div className="App">
          <div className="container" style={backgroundStyle}>
            <UserAuthContextProvider>
              <Routes>
               {/*<Route element={<WithoutNav />}>*/}
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
               {/*</Route>*/}
              <Route element={<WithNav />}>
              
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/quiz" element={<Quiz />} />
                {/* <Route path="/addquestions" element={<AddQuestions/>} /> */}
                {/* might need to remove later to hide it from view */}
                {/* <Route path='/addproducts' element={<AddProducts />} /> */}
              {/*<Route path="/Firebasef" element={<Firebasef />} />*/}
              </Route>
              </Routes>
            </UserAuthContextProvider>
          </div>
        </div>
      </Router>
      </CartContextProvider>
      </ProductsContextProvider>
  );
 }
}

export default App;
