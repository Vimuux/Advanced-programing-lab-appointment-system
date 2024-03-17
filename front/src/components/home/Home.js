import React, { useEffect, useState } from 'react'
import { Statistic, Icon, Grid, Container, Image, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { orderApi } from '../misc/OrderApi'
import { handleLogError } from '../misc/Helpers'
import { useAuth } from '../context/AuthContext'
import { Link } from "react-router-dom";


function Home() {
  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [numberOfOrders, setNumberOfOrders] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { getUser, userIsAuthenticated, userLogout } = useAuth()
  const user = getUser()

  useEffect(() => {
    async function fetchData() {
      try {
        const responseUsers = await orderApi.numberOfUsers()
        const numberOfUsers = responseUsers.data

        const responseOrders = await orderApi.numberOfOrders()
        const numberOfOrders = responseOrders.data

        setNumberOfUsers(numberOfUsers)
        setNumberOfOrders(numberOfOrders)
      } catch (error) {
        handleLogError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
        <Dimmer active inverted>
          <Loader inverted size='huge'>Loading</Loader>
        </Dimmer>
      </Segment>
    )
  }

  return (

    <div class="relative bg-cover bg-center h-screen">
    <img
      src="https://c4.wallpaperflare.com/wallpaper/303/255/774/equipment-medicine-laboratory-professionals-wallpaper-preview.jpg"
      class="absolute inset-0 w-full h-full object-cover"
     
    />

    <div class="absolute inset-0 flex justify-center items-center">
      <div class="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md">
        <h1 class="text-2xl font-bold mb-4">
          Welcome to Lab Appoiment System
       
        </h1>
        <Link to='/login'>
        <center><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">login</button></center>
        
        </Link>
      
      </div>
    </div>
  </div>


  )
}

export default Home