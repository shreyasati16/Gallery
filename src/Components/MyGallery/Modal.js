import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";
import { accessToken } from "../Constants";

const Modal = ({ handleClose, getImageGallery, handleImageUpload }) => {
  //states for file, and name
  const [files, setFile] = useState([]);
  const [galleryName, setGalleryName] = useState("");
  const [galleryCreated, setGalleryCreated] = useState(false);

  const handleNameChange = (event) => {
    if (!galleryCreated) setGalleryName(event.target.value);
  };

  const handleFiles = (e) => {
    console.log(e.target.files);
    const imageFiles = e.target.files;
    const images = [];
    for (let i = 0; i < imageFiles.length; i++) {
      images.push(imageFiles[i]);
    }
    console.log(images);
    setFile(images);
  };

  // code for creating a photo gallery
  
  const createImageGallery = async (event) => {
     event.preventDefault();
    console.log("called")
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "237",
          Authorization: `Bearer ${localStorage.getItem(accessToken)}`,
        },
      };
      const gallery_name = {
        gallery_name: galleryName,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/gallery/image-gallery/`,
        gallery_name,
        config
      );
      console.log(data);
      if (data?.message) {
        alert(data.message);
      }

     setGalleryCreated(data);
     getImageGallery();
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 400)
        alert(error?.response?.data?.gallery_name[0]);
    }
  };

  /*
   This function is called when the user drops an image file onto the modal.
   It prevents the default behavior of opening the file and sets the file state variable to the dropped file.
   */

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (galleryCreated) {
      const { files } = event.dataTransfer;
      if (files && files.length > 0) {
        //handleFiles(files)
      }
    }
  };

  // function for "Upload" button.If a file has been selected, it calls the handleUpload function passed in as a prop with the selected file and then calls the handleClose function to close the modal.
  const handleUploadClick = async () => {

    if (files) {
      const data = { galleryId: galleryCreated.data.id, file: files };
      await handleImageUpload(data);
      handleClose();
    }
  };

  const removeImage = (image) => {
    const updatedFiles = files.filter((ft) => ft !== image);
    setFile(updatedFiles);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form>
          <label htmlFor="galleryName">Name:</label>
          <input
            type="text"
            id="galleryName"
            name="galleryName"
            value={galleryName}
            onChange={handleNameChange}
          />

          <button
            className="button_Create_gallery"
            onClick={(e) => createImageGallery(e)}
            disabled={galleryCreated}
          >
            Create Gallery
          </button>
        </form>

        <>
          {galleryCreated && (
            <>
              <div className="modal-header">
                <h3>Upload Image</h3>
              </div>

              <div className="modal-body">
                <div className="preview-images">
                  {files.length > 0 &&
                    files.map((val, ind) => (
                      <div key={ind} className="preview">
                        
                        <button onClick={() => removeImage(val)}>
                          {" "}
                          Delete{" "}
                        </button>
                        <img
                          src={URL.createObjectURL(val)}
                          alt="Preview"
                          className="grid-img"
                        />
                      </div>
                    ))}
                </div>
                <div className="drag-and-drop" onDrop={handleDrop}>
                  <p>Drag and drop an image file here or click to browse.</p>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={handleFiles}
                    multiple
                  />
                </div>
              </div>
            </>
          )}
          <div className="modal-footer">
            <button onClick={() => handleClose()}>Cancel</button>
            {galleryCreated && (
              <button onClick={() => handleUploadClick()}>Upload</button>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default Modal;