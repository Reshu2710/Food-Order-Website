import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
let dispatch = useDispatchCart();
let data = useCart();
let priceRef = useRef();

let foodId = props.foodId;
let options = props.options;
  let foodimg = props.foodImg;
  let foodname = props.foodName;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

const handleAddToCart = async()=>{
  let food = []
  for(const item of data) {
    if (item.id === foodId) {
      food = item;
      break;
    }
  }
  if (food !==[]) {
    if(food.size === size){
    await dispatch({type: "UPDATE", id: foodId, price:finalPrice, qty:qty})
    return
  }
  else if(food.size !==size){
    await dispatch({type:"ADD",id:foodId, name:foodname,  price:finalPrice, qty:qty, size:size})
    return
  //await console.log(data);
  }
  return
}
await dispatch({type:"ADD",id:foodId, name:foodname,  price:finalPrice, qty:qty, size:size})
}
let finalPrice = options? qty * parseInt(options[size]):0;

useEffect(()=>{
  setSize(priceRef.current.value)
},[])
  return (
    <>
    <div>
    <div className="card mt-3" style={{"width": "18rem", "maxHeight":"360px", "borderRadius":"10px"}}>
  <img src={foodimg} className="card-img-top" alt="..." style={{height:"120px", objectFit:"fill", "borderRadius":"10px"}} />
  <div className="card-body">
    <h5 className="card-title">{foodname}</h5>
    <div className='container w-100'>
      <select className='m-2 h-100 rounded' onChange={(e)=> setQty(e.target.value)}>
        {Array.from(Array(6), (e,i)=>{
          return(
            <option key={i+1} value={i+1}>{i+1}</option>
          )
        })}
      </select>
      <select className='m-2 h-100 rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
        <option value="half">Half</option>
        <option value="full">Full</option>
      </select>

      <div className='price d-inline h-100 fs-5'> 
      ₹{finalPrice}/-
      </div>
    </div> 
    <hr>
    </hr>
    <div className='btn1'>
    <button className={'btn btn-success justify-center'} style={{"backgroundColor":"rgb(225, 21, 59)"}} onClick={handleAddToCart}>Add to Cart</button>
    </div>
  </div>
</div>
    </div>
    </>
  )
}