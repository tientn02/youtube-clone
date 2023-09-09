import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Typography,Card, CardContent, CardMedia } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants'
import { differenceInDays, differenceInMonths, differenceInYears ,parseISO } from 'date-fns';
import VideoDetail from './VideoDetail'
// 1 item video
const VideoCard = (props) => {
  const {video: {id: {videoId}, snippet}} = props
  if (!snippet) return "Loading"
  const currentDate = new Date()
  const publishedDay = new Date(snippet?.publishedAt);
  const calculateTimeDifference = (currentDate,publishedDay) => {
    const yearsDifference = differenceInYears(currentDate, publishedDay);
    const monthsDifference = differenceInMonths(currentDate, publishedDay);
    const daysDifference = differenceInDays(currentDate, publishedDay);

    if (yearsDifference >= 1) {
      return (yearsDifference === 1 ? `${yearsDifference} month ago` : `${yearsDifference} months ago`);
    } 
    else if (monthsDifference >= 1) {
     return (monthsDifference === 1 ? `${monthsDifference} month ago` : `${monthsDifference} months ago`); 
      
    } else {
      return (daysDifference > 1 ? `${daysDifference} days ago`: `${daysDifference} day ago`);
    }
  }
  const timeDifference = calculateTimeDifference(currentDate,publishedDay);
  return (
<Card sx={{ width:{ xs: '100%', sm: '358px', md: '320px' }, 
      boxShadow: "none", 
      borderRadius: '6px', backgroundColor: '#000' }}>
    {/*thumbnail*/}
    <Link to={videoId ? `/video/${videoId}` : demoVideoUrl }>
      <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title} 
        sx={{ width: { xs: '100%', sm: '358px', md: '320px'}, height: '180px'}} 
      />
    </Link>
    {/**info content with title and channel name */}
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px' }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl } >
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} 
      >
        <Typography variant="subtitle2" color="gray">
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircle sx={{fontSize: 12, color: 'gray', ml: '5px', mt: '4px'}}/>
        </Typography>
      </Link>
      <Typography variant="subtitle2" color="gray">
          {
          timeDifference
          } 
      </Typography>
    </CardContent>
  </Card>  )
}

export default VideoCard