import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './Items'

const Carousel_Slider = ({singleGalleryData}) => {

    return (
        <Carousel >
            {
                singleGalleryData && singleGalleryData.image_gallery_set.map(item => 
                <Item key={item.id} item={item}/>)
                } 
            {/* {
                singleGalleryData.map(item => <Item key={item.id} item={item} />)
            } */}

        </Carousel>
    )
}

export default Carousel_Slider
