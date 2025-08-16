// import React from 'react'
// import './MyOrders.css'
// import { useState } from 'react'
// import { useContext } from 'react'
// import { StoreContext } from '../../context/StoreContext'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { assets } from '../../assets/assets'

// const MyOrders = () => {

//     const {url,token} = useContext(StoreContext);
//     const [data,setData] = useState([]);

//     const fetchOrders = async () =>{
//         const response = await axios.post(url+"/order/userorders",{},{Headers:token})
//         setData(response.data.data);
//         console.log(response.data.data);
        
//     }

//     useEffect(()=>{
//         if(token){
//             fetchOrders();
//         }
//     },[token])


//   return (
//     <div className='my-orders'>
//       <h2>My Orders</h2>
//       <div className='container'>
//         {data.map((order,index)=>{
//             return(
//                 <div key={index} className='my-orders-order'>
//                     <img src={assets.parcel_icon} alt="" />
//                     <p>{order.items.map((item,index)=>{
//                         if(index === order.items.length-1){
//                             return item.name+" x "+ item.quatity
//                         }
//                         else{
//                             return item.name+" x "+ item.quatity+", "
//                         }
//                     })}</p>
//                     <p>${order.amount}.00</p>
//                     <p>Items : {order.items.length}</p>
//                     <p><span>&#x25cf;</span> <b>{order.status}</b></p>
//                     <button onClick={fetchOrders}>Track Order</button>
//                 </div>
//             )
//         })}
//       </div>
//     </div>
//   )
// }

// export default MyOrders



import React from 'react'
import './MyOrders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            // Fixed: corrected the URL path and headers syntax
            const response = await axios.post(url + "/api/order/userorders", {}, {headers: {token}})
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        if(token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {data.map((order, index) => {
                    return(
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <div className='order-food-items'>
                                {order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className='food-item'>
                                        <img 
                                            src={url + "/images/" + item.image} 
                                            alt={item.name}
                                            className='food-item-image'
                                        />
                                        <span className='food-item-text'>
                                            {item.name} x {item.quantity}
                                            {itemIndex < order.items.length - 1 ? ', ' : ''}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <p>₹{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders