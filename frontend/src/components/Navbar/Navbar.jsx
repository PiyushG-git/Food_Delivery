import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext)

    const navigate = useNavigate();

    const logout = () =>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }

  return (
    <div className='navbar'>
      <Link to='/'><img src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-a7b0-61f7-a326-dbf4608359c3/raw?se=2025-07-18T11%3A57%3A02Z&sp=r&sv=2024-08-04&sr=b&scid=c3a7bcc2-ef0e-55af-a0dc-50071d74a90b&skoid=31bc9c1a-c7e0-460a-8671-bf4a3c419305&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-18T08%3A22%3A12Z&ske=2025-07-19T08%3A22%3A12Z&sks=b&skv=2024-08-04&sig=CNtfNYE9j%2BnC45lscVvry5EapBoP9zNEjAU5Zeiunoo%3D" alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=> setMenu("home")} className={menu === "home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=> setMenu("menu")} className={menu === "menu"?"active":""}>menu</a>
        <a href='#app-download' onClick={()=> setMenu("moblie-app")} className={menu === "moblie-app"?"active":""}>moblie-app</a>
        <a href='#footer' onClick={()=> setMenu("contact-us")} className={menu === "contact-us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount() ===0 ?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>:<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="navbar-profile-dropdown">
            <li onClick={()=>navigate('/myorders')} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>}
        
      </div>
    </div>
  )
}

export default Navbar