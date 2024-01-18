import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/Signin/Signin";
import "./App.css";
import Background from "./components/Background/Background";
import Clarifai from "clarifai";
import Register from "./components/Register/Register";
import { Spin, notification } from "antd";


const app = new Clarifai.App({
  apiKey: "964adaf77e3745fc83b95a7eda1184cd",
});

const clarifaiSetup = (imageUrl) => {
  const PAT = "087c5e36cebe462494ac735fb8346bdc";
  const USER_ID = "60d3gk0u9jsvs";
  const APP_ID = "face-detection";
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

function App() {

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      placement,
    });
  };

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const predictFaceLocation = (data) => {
    const location = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: location.left_col * width,
      topRow: location.top_row * height,
      rightCol: width - location.right_col * width,
      bottomRow: height - location.bottom_row * height,
    };
  };

  const displayFaceBox = (data) => {
    setBox(data);
  };

  const onInputChange = (event) => {
    const link = event.target.value;
    if(link === ''){
      openNotification('Please Fill the image URL')
    }
    setInput(link);
  };

  const onSubmit = async () => {
    {input && 
    setLoading(true);
    setImageUrl(input);
    await fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      clarifaiSetup(input)
    )
      .then(async (response) => {
        const data = await response.json();
        displayFaceBox(predictFaceLocation(data));
        setLoading(false);
      })
      .catch((err) => console.log(err));
    }
  };

  const onRouteChange = (value)=> {
    if(value === 'signout'){
      setSignedIn(false);
    } else if (value === 'home'){
      setSignedIn(true);
    }
    setRoute(value)
  }

  return (
    <div className="App">
      <Background />
      {<Spin spinning = {loading} style={{display:'flex', justifyContent: 'center'}} />}
      <Navigation onRouteChange={onRouteChange} signedIn={signedIn}/>
      {route === 'home' ? (
        <>
        <Rank />
        <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
        <FaceRecognition imageUrl={imageUrl} box={box} loading= {loading} />
        </>
      ) : (

        route === 'signin' ?
        (
           <>
           <div className="signin">
        <SignIn onRouteChange = {onRouteChange}/>
        </div>
        </>
        ): (
          <div>
            <Register onRouteChange = {onRouteChange}/>

          </div>
        )
       
      )}
    </div>
  );
}

export default App;
