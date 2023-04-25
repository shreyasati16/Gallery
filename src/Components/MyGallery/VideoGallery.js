
import React, { useEffect } from 'react'
import './index.css'
import Navbar from './Navbar'
import Modal from './Modal'
import Albums from './Albums'
import { useNavigate } from 'react-router-dom';
import { accessToken, refreshToken } from '../Constants'


const VideoGallery = () => {
  const navigate = useNavigate();

  // This is to check whether user is authenticated
  useEffect(() => {
    if (
      localStorage.getItem(refreshToken) === null ||
      localStorage.getItem(accessToken) === null
    ) {
      navigate("/");
    }
  });

  return (<>
    <Navbar />
    <div className='videoGallery-container'>
      <Modal />
      <br />
      <Albums />
    </div>
  </>
  )
}
export default VideoGallery
