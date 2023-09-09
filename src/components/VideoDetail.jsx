import React from 'react'
import { useState,useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Typography, Box, Stack, Card } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import {Videos, ChannelCard, VideoComment} from './'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DownloadIcon from '@mui/icons-material/Download';
import ReplyIcon from '@mui/icons-material/Reply';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { fetchFromApi } from '../utils/fetchFromApi'

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos]  = useState(null)
  const [comments, setComments] = useState(null)
  const [showFull, setShowFull] = useState(false)
  const {id} = useParams();
  useEffect(()=> {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => {
      setVideoDetail(data.items[0])
      fetchFromApi(`search?part=snippet&q=${data.items[0]?.snippet?.channelTitle}`)
      .then((data)=> setVideos(data.items));
    fetchFromApi(`commentThreads?part=snippet&videoId=${id}&maxResults=100`)
    .then((data) => {
        setComments(data.items)
    })

  });
    }, [id]);
  if (!videoDetail?.snippet || !videos) return "Loading..."
  const {snippet: {title, channelId, channelTitle, publishedAt, description}, 
  statistics: {viewCount, likeCount, commentCount}} = videoDetail;

  return (
    <Box minHeight='95vh' sx={{px: {xs: '10px'}}}>
      <Stack direction={{xs: 'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{width:'100%', position: 'sticky', top: '86px'}}></Box>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player" controls
              playing={true}
            />
            <Typography color="#fff" variant='h5' fontWeight="bold" marginTop={3}>
              {title}
            </Typography>
            <Stack direction='row' justifyContent="space-between" 
            sx={{color: '#fff', marginTop: "10px"}} py={1} px={2}>
              <Link to={`.channel/${channelId}`}>
                <Typography variant={{sm: 'subtitle1', md: 'h6'}} color='#fff' alignItems="center" px="12px" py="10px">
                  {channelTitle}
                  <CheckCircle sx={{fontSize:'12px', color: 'gray', ml: '5px'}}/>
                </Typography>
              </Link>
            <Stack direction="row" gap="10px">
              <Typography variant='body1' sx={{opacity: 0.7, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', borderRadius: 100, border: '1px solid #fff',  px : '12px', py: '10px'}}>
                <ThumbUpAltIcon fontSize='small'/> {"  "}
                {parseInt(likeCount).toLocaleString()} 
              </Typography>
              <Typography variant='body1' sx={{opacity: 0.7, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', borderRadius: 100, border: '1px solid #fff', px : '12px', py: '10px'}}>
                <DownloadIcon fontSize='small'/> {"  "}
                DownLoad 
              </Typography>
              <Typography variant='body1' sx={{opacity: 0.7, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', borderRadius: 100, border: '1px solid #fff',  px : '12px', py: '10px'}}>
                <ReplyIcon fontSize='small'/> {"  "}
                Share
              </Typography>
              <Typography variant='body1' sx={{opacity: 0.7, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', borderRadius: 100, border: '1px solid #fff',  px : '12px', py: '10px'}}>
                <SaveAltIcon fontSize='small'/> {"  "}
                Save
              </Typography>
            </Stack>
            </Stack>

            <Card sx={{color: '#fff', marginTop: "10px", marginLeft: "20px", backgroundColor: 'rgb(41, 39, 39)', borderRadius: '20px', paddingX: '15px', paddingY: '10px'}} 
            >
            <Typography variant='body1' sx={{fontWeight: 'bold', cursor: "pointer"}} onClick={()=> setShowFull(true)}>
                {parseInt(viewCount).toLocaleString()} views {"  "}
                {publishedAt.substring(0,10)}
            </Typography>

            {
            showFull ? (
            <Typography variant='body1' sx={{opacity: 0.7}}>
                  {description}
                  <Typography onClick={()=> setShowFull(false)} sx={{cursor: "pointer"}}>showLess</Typography>
            </Typography>
              ) : (
            <Typography variant='body1' sx={{opacity: 0.7, maxHeight: '50px', cursor: 'pointer'}} onClick={()=> setShowFull(true)} >
                {description.slice(0,150)} <span sx={{fontWeight: '500', opacity:1, color: 'white'}}> {"  ...more"}</span>
            </Typography>
              )
            }
            </Card>
          <Stack sx={{px: '10px', py: '10px'}} direction='column'>
             {comments?.map((comment, index) => (
                <VideoComment comment={comment} key={index}/>
             ))}
          </Stack>
    
        </Box>
    <Box px={2} py={{md: 1, xs: 5}} justifyContent="center" alignItems="center">
      <Videos videos={videos} direction="column"/>
    </Box>
      </Stack>
    
    </Box>
  )
}

export default VideoDetail