import React, { useEffect, useState } from 'react'
import './index.css'
import Carousel_Slider from './Carousel';
import { albumListing_getData, albumListing_deleteData } from '../Services'
import { RiDeleteBinFill } from 'react-icons/ri';
import { BsFillPencilFill } from 'react-icons/bs';
import { BsInfoLg } from 'react-icons/bs';


const MyAlbum = ({ data }) => {

  const [isOpen, setIsOpen] = useState(false);

  const [myAlbumDetails, setMyAlbumDetails] = useState([]);
  const [singleGalleryData, setSingleGalleryData] = useState([]);

  // This is to get albums data from gallery API
  const getAllAlbumsData = () => {
    albumListing_getData()
      .then((response) => {
        setMyAlbumDetails(response.data);
      })

  }

  useEffect(() => {
    getAllAlbumsData();
  }, [])

  // This is to close the slider
  const handleClosePreview = () => {
    setIsOpen(!isOpen);
  }

  // This is to open the slider of a particular gallery
  const handlePreview = (galleryName) => {
    const filterData = myAlbumDetails.filter((item) => item.gallery_name === galleryName)
    console.log(filterData);
    setSingleGalleryData(filterData);
    setIsOpen(!isOpen);
    window.scrollTo({ top: 0, behavior: 'smooth', });
  }

  // This is to delete whole album from gallery API
  const handleDeleteAlbum = (galleryID) => {
    albumListing_deleteData(galleryID)
      .then((response) => {
        return response;
      }).then(() => {
        getAllAlbumsData();
      })
      .catch(error => {
        return error;
      });
      
  }

  return (
    <>
      {

        myAlbumDetails.map((detail, i) => {
          return <div className='container' key={i} >

            <h3 className='galleryHeading'>{detail["gallery_name"]}
            <RiDeleteBinFill className='del' title='Delete Your Album' onClick={() => handleDeleteAlbum(detail["id"])} />
                  <BsFillPencilFill className='edit' title='Edit Your Album' onClick={() => handleDeleteAlbum(detail["id"])} />
                  <BsInfoLg className='preview-gallery' title='Preview Your Album' onClick={() => handlePreview(detail["gallery_name"])} />
            </h3>

            <div className='slide-show' title="Click to preview" onClick={() => handlePreview(detail["gallery_name"])}>

              <div className="grid-container">
                {detail.image_gallery_set.map((el, ii) => {
                  if (ii < 4) {
                    return <>
                      <div className="grid-item" key={ii}><img src={el["image"]} alt='House' height='100px' width='100px' /></div>
                    </>
                  }
                  {data.image_gallery_set.length > 4 && (
                    <span className="grid-gallery-number">
                      +{data.image_gallery_set.length - 4}
                    </span>
                  )}
                })} 
              </div>

              {/* <div className='gallery_crud'>
                  <RiDeleteBinFill className='del' title='Delete Your Album' onClick={() => handleDeleteAlbum(detail["id"])} />
                  <BsFillPencilFill className='edit' title='Edit Your Album' onClick={() => handleDeleteAlbum(detail["id"])} />
                  <BsInfoLg className='preview-gallery' title='Preview Your Album' onClick={() => handlePreview(detail["gallery_name"])} />
                </div> */}
            </div>
            
          </div>
        })
      }

      
      {
        isOpen && (
          <>
            <div className='drop-down'>
              <button onClick={handleClosePreview} title='Close Slider' className='preview-btn'>X</button>
              <Carousel_Slider singleGalleryData={singleGalleryData[0]}/>
            </div>
          </>
        )
      }
     
    </>
  )
}


export default MyAlbum


  // const handlePreview = (galleryID) => {
  //   imageListing_getData(galleryID)
  //     .then(response => {
  //       const res = response.data;
  //       setSingleGalleryData(res);
  //       console.log(res);
  //     }).catch(error => {
  //       console.log(error);
  //     });
  // }
