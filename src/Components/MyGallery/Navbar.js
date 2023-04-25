import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [photoGallery, setPhotoGallery] = useState(true);
  const [videoGallery, setVideoGallery] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  // This is to highlight the button of PhotoGallery page in the app 
  const onPhotoBtnClick = () => {
    setPhotoGallery(true);

    setVideoGallery(false);
    setUserProfile(false);
  };

  // This is to highlight the button of VideoGallery page in the app 
  const onVideoBtnClick = () => {
    setVideoGallery(true);

    setPhotoGallery(false);
    setUserProfile(false);
  };

  // This is to highlight the button of UserProfile page in the app 
  const onUserProfileBtnClick = () => {
    setUserProfile(true);

    setPhotoGallery(false);
    setVideoGallery(false);
  };

  const photoGalleryClasses = photoGallery
    ? "nav-buttons active"
    : "nav-buttons";
  const videoGalleryClasses = videoGallery
    ? "nav-buttons active"
    : "nav-buttons";
  const userProfileClasses = userProfile
    ? "nav-buttons  active"
    : "nav-buttons";

  return (
    <div className="navbar">
      <NavLink to="/photoGallery" className="nav-btn-link">
        <button className={photoGalleryClasses} onClick={onPhotoBtnClick}>
          PHOTO GALLERY
        </button>
      </NavLink>

      <NavLink to="/videoGallery" className="nav-btn-link">
        <button className={videoGalleryClasses} onClick={onVideoBtnClick}>
          VIDEO GALLERY
        </button>
      </NavLink>

      <NavLink to="/userProfile" className="nav-btn-link">
        <button className={userProfileClasses} onClick={onUserProfileBtnClick}>
          USER PROFILE
        </button>
      </NavLink>
    </div>
  );
};

export default Navbar;
