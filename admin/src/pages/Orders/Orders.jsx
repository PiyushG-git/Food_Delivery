// import React from 'react'
// import './Orders.css'
// import { useState } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { useEffect } from 'react'
// import { assets } from '../../assets/assets'

// const Orders = ({url}) => {

//   const [orders,setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     const response = await axios.get(url+"/api/order/list");
//     if(response.data.success){
//       setOrders(response.data.data);
//       console.log(response.data.data);
//     }
//     else{
//       toast.error("Error");
//     }
//   }


//   // updating the ststus
//   const statusHandler = async(event,orderId) =>{
//     // console.log(event,orderId);
//     const response = await axios.post(url+"/api/order/status",{
//       orderId,
//       status:event.target.value
//     })
//     if(response.data.success){
//       await fetchAllOrders();
//       // toast.success("Status updated");
//     }
//   }

//   useEffect(()=>{
//     fetchAllOrders();
//   },[])


//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className='order-list'>
//         {orders.map((order,index)=>{
//           <div key={index} className='order-item'>
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <p className='order-item-food'>
//                 {order.items.map((item,index)=>{
//                   if(index===order.items.length-1){
//                     return item.name + " x " + item.quantity
//                   }
//                   else{
//                     return item.name + " x " + item.quantity + ", "
//                   }
//                 })}
//               </p>
//               <p className='order-item-name'>
//                 {order.address.firstName + " " + order.address.lastName}
//               </p>
//               <div className="order-item-address">
//                 <p>{order.address.street+","}</p>
//                 <p>{order.address.city+"," +order.address.state +","+order.address.country+","+order.address.zipcode}  </p>
//               </div>
//               <p className='order-item-phone'>
//                 {order.address.phone}
//               </p>
//             </div>
//             <p> Items: {order.items.length}</p>
//             <p>${order.amount} val</p>
//             <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
//               <option value="Food Processing">Food Processing</option>
//               <option value="Out for delivert">
//                 Out for delivery
//               </option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         })}
//       </div>
//     </div>
//   )
// }

// export default Orders



import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      // Fixed: corrected endpoint to match your backend route
      const response = await axios.get(url + "/api/order/listorders");
      if(response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      }
      else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  }

  // updating the status
  const statusHandler = async(event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      })
      if(response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              {/* Food items with images */}
              <div className='order-item-food'>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='food-item-row'>
                    <img 
                      src={url + "/images/" + item.image} 
                      alt={item.name}
                      className='food-item-image'
                    />
                    <span className='food-item-details'>
                      {item.name} x {item.quantity}
                      {itemIndex < order.items.length - 1 ? ', ' : ''}
                    </span>
                  </div>
                ))}
              </div>
              
              <p className='order-item-name'>
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>
                {order.address.phone}
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              {/* Fixed: corrected "delivert" to "delivery" */}
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders