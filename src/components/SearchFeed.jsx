import React from 'react'
import { useState, useEffect } from 'react'
import {Box, Stack, Typography} from '@mui/material'
import {SideBar, Videos} from './'
import { fetchFromApi } from '../utils/fetchFromApi'
import { useParams } from 'react-router-dom'
const SearchFeed = () => {
  const {searchTerm} = useParams()
  const [videos, setVideos] = useState([])
  useEffect(() => {
   fetchFromApi(`search?part=snippet&q=${searchTerm}`)
    .then((data) => 
      setVideos(data.items)
    )
  }, [searchTerm])
  return (

      <Box p={2} sx={{overflowY: "auto", height: '90vh', flex: 2, marginX: "auto", marginLeft: {md: '100px'}}} alignItems="center" justifyContent="center">
        <Typography variant='h4' fontWeight="bold" mb={2} sx={{color: "white"}}>
          <span style={{color: "#F315903"}}>Search for</span> {" "} 
          <span style={{color: '#F31503'}}> {searchTerm} </span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
  )
}

export default SearchFeed