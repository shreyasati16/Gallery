
import axios from 'axios'
import { accessToken } from './Constants'

const config = {
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "237",
        'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
    }
};

export const ImageListing_deleteData = async (data) => {

    const response = await axios.delete(`${process.env.REACT_APP_API}/gallery/images/${data}/`, config);

    if (response.status === 200) {
        return response;
    } else {
        console.log("Something went wrong!!");
    }
}

export const albumListing_deleteData = async (data) => {

    const response = await axios.delete(`${process.env.REACT_APP_API}/gallery/image-gallery/${data}/`, config);

    if (response.status === 200) {
        console.log('Working');
        return response;
    } else {
        console.log("Something went wrong!!");
    }
}

export const albumListing_getData = async (data) => {

    const response = await axios.get(`${process.env.REACT_APP_API}/gallery/image-gallery/`, config);

    if (response.status === 200) {
        return response;
    } else {
        console.log("Something went wrong!!");
    }

}



export const imageListing_getData = async (data) => {

    const response = await axios.get(`${process.env.REACT_APP_API}/gallery/image-gallery/${data}/`, config);

    if (response.status === 200) {
        return response;
    } else {
        console.log("Something went wrong!!");
    }

}

/* This is to get tokens as response from the Sign-in API after the correct credentials are sent */
export const signIn_postData = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_API}/user/signin/`, data);
    if (response.status === 200) {
        return response;
    } else {
        console.log("Something went wrong!!");
    }
}

// This is to assure that logged in user is a validated user.
export const userProfile_getData = async (data) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/user/userprofile/`, config);

    if (response.status === 200) {
        return response;
    } else {
        console.log("Something went wrong!!");
    }
}

// This is to log-out the current logged-in user after the bearer is passed
export const signOut_postData = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_API}/user/sign-out/`, {config,data});
    return response;
}
  

