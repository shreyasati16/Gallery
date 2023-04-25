import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Albums from "./Albums";
import { accessToken, refreshToken } from "../Constants";
import { albumListing_getData } from "../Services";
import axios from "axios";

const PhotoGallery = () => {
  const navigate = useNavigate();

  const [gallery, setGallery] = React.useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // code for uploading the imagefile onto the server.
  const handleImageUpload = async (data) => {
    const formData = new FormData();
    data.file.map((val) => formData.append("image", val));
    formData.append("image_gallery_id", data.galleryId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "237",
        Authorization: `Bearer ${localStorage.getItem(accessToken)}`,
      },
    };
    const addImage = await axios.post(
      `${process.env.REACT_APP_API}/gallery/images/`,
      formData,
      config
    );
    console.log(addImage);
    getImageGallery();
  };
  // uploaded picture will be shown with the help of this function
  const getImageGallery = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(accessToken)}`,
        "ngrok-skip-browser-warning": "237",
      },
    };
    const response = await axios.get(
      `${process.env.REACT_APP_API}/gallery/image-gallery/`,
      config
    );
    console.log(response);
    if (response?.data.length > 0) {
      setGallery(response.data);
    }
  };

  // This is to check whether user is authenticated
  useEffect(() => {
    if (
      localStorage.getItem(refreshToken) === null ||
      localStorage.getItem(accessToken) === null
    ) {
      navigate("/");
    } else {
      getImageGallery();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="photoGallery-container">
        <i
          className="fa
      -solid fa-plus add-icon-icon"
          onClick={handleOpenModal}
        ></i>
        {showModal && (
          <Modal
            handleClose={handleCloseModal}
            getImageGallery={getImageGallery}
            handleImageUpload={handleImageUpload}
          />
        )}
      </div>
    </>
  );
};

export default PhotoGallery;
