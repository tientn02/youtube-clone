import React from 'react'
import {Stack, Box} from '@mui/material'
import {VideoCard, ChannelCard} from './'
const Videos = (props) => {
  const {videos, direction}  = props
  console.log(videos)
  if (!videos?.length) return 'Loading...'
  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" gap={2}>
      {videos.map((item, index) => (
        <Box key={index}>
          {(item.id.videoId || item.id.playlistId) && <VideoCard video={item}/> }
          {item.id.channelId && <ChannelCard channelDetail = {item}/>}
        </Box>
      ))}
    </Stack>
  )
}

export default Videos