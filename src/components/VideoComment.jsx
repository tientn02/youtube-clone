import React, {useState, useEffect } from 'react'
import { Typography, Box, Stack, Card, CardMedia } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import {Videos, ChannelCard} from './'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { fetchFromApi } from '../utils/fetchFromApi'
import { demoProfilePicture } from '../utils/constants';

const VideoComment = (props) => {
    const parseHtmlString = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
      };
    const {comment} = props
    if(!comment) return "Loading..."
    const {snippet: {topLevelComment: 
    {snippet: {textDisplay, authorDisplayName, authorProfileImageUrl, likeCount, updateAt}} }} = comment
    return (
    <Stack sx={{px: '10px', py: '10px',  width: '100%', color: '#fff'}} direction='row' width='100%' gap='5px'>
        <CardMedia image={authorProfileImageUrl || demoProfilePicture}
            alt={authorDisplayName}
            sx={{borderRadius: '50%', height: '49px', width: '55px', mb: 2, border: 'none'}}
        />
        <Card sx={{display: 'flex', flexDirection: 'column', gap:'5px',
         alignItems: 'left', width: '100%', ml: '10px', backgroundColor: '#000', }}>
            <Typography sx={{color: '#fff'}}>
                <Typography fontWeight='bold'>{authorDisplayName}</Typography>
            </Typography>
            <Typography variant='body1' color='#fff' sx={{opacity: 1.1}}>
                {parseHtmlString(textDisplay)}
            </Typography>
            <Typography color='#fff' sx={{opacity: 0.8, display: 'flex', gap: '7px'}} justifyContent="left" alignItems="center">
            <ThumbUpAltIcon fontSize='small'/>   {likeCount}  
            </Typography>
        </Card>
    </Stack>
  )
}

export default VideoComment