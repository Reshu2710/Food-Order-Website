import React, {useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {

  const [foodCat,setFoodCat] =useState([]);     // for .map function use [].
  const [foodItem,setFoodItem] =useState([]);
  const [search, setSearch] = useState('');

  const loadData = async(req,response)=>{
    response = await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(()=>{
    loadData()
  },[])



  return (
    <div>
    <div> <Navbar/> </div>
    <div className='box'>
    <img src={require("./bg.jpg")} style={{width:"100%"}}/>
    <div className="d-flex search" style={{width:'550px'}}>
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      <button className="btn btn-outline-success text-white bg-danger" type="submit" style={{height:"45px"}}>Search</button>
    </div>
    {/* <div className='text1'>
      <h1>GOOD FOOD,</h1>
      </div>
      <div className='text2'>
      <h1>GOOD MOMENTS👍</h1>
    </div> */}
    </div>
    <div className='container'>
    {
      foodCat !==[]
      ? foodCat.map((data)=>{
        return ( <div className='row mb-3'>
        <div key={data._id} className='fs-3 m-3 cat'>
          {data.CategoryName}
        </div>
        <hr/>
        {foodItem !==[]
        ?
        foodItem.filter((item)=> item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
        .map(filterItems=>{
          return(
            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
            <Card foodId = {filterItems._id}
            foodImg = {filterItems.img}
            foodName = {filterItems.name}
            options={filterItems.options[0]}></Card>
            </div>
            )
        }
        ):<div>No Such Data Found</div>}
        </div>
        )
      })
      : ""
    }
      <Card/>
    </div>
    <div> <Footer/> </div>
    </div>
  )
}






  