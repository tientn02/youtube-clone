import React from 'react'
import { useState, useEffect } from 'react'
import {Box, Stack, Typography} from '@mui/material'
import {SideBar, Videos} from './'
import { fetchFromApi } from '../utils/fetchFromApi'
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New')
  const [videos, setVideos] = useState([])
  useEffect(() => {
   fetchFromApi(`search?part=snippet&q=${selectedCategory}`)
    .then((data) => 
      setVideos(data.items)
    )
  }, [selectedCategory])
  return (
    <Stack sx={{flexDirection: {sx: "column", md: 'row'}}} >
      <Box sx={{height: {sx: 'auto', md: '92vh'}, 
      borderRight: '2px solid #fff', px: {sx: 0, md: 2}}}>
      <SideBar selectedCategory = {selectedCategory}
        setSelectedCategory={setSelectedCategory}
        />
        <Typography className='' variant='body2' sx={{mt: 1.5, color: "#fff"}}>
          CopyRight
        </Typography>
        
      </Box>
      <Box p={2} sx={{overflowY: "auto", height: '90vh', flex: 2}}>
        <Typography variant='h4' fontWeight="bold" mb={2} sx={{color: "white"}}>
          {selectedCategory} <span style={{color: "#F315903"}}>videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed