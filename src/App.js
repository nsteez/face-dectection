import React, { Component } from 'react';
import './App.css';
import Clarifai, { FACE_DETECT_MODEL } from 'clarifai';
import Navigation from './components/Navigation';
import Signin from './LoginIn/Signin';
import Register from './LoginIn/Register';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import FaceRecognition from './components/FaceRecognition';
//import Particles from 'react-parallax-tilt';
import Particles from 'react-tsparticles';

const app = new Clarifai.App({
  apiKey: "abc123"

});


const particleOptions = {
        fpsLimit: 30,
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push",
            },
            onHover: {enable: true, mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 300,duration: 1,opacity: 0.8, size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200, duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",enable: true,outMode: "bounce",random: false,speed: .8,straight: false,
          },
          number: {
            density: {
              enable: true, area: 800,
            },
            value: 40,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,value: 5,
          },
        },
        detectRetina: true,
}
//>
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      page: "signin",
      isSignedIn: false,
      user:{
        id: '',
        name:'',
        email:'',
        entries:0,
        dateJoined: new Date()
      }
    }
  }

  //update each user profile
  loadUserData = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      dateJoined: data.dateJoined
  }})
  }

  findFaceLocation = (data)=> {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width)
    const height = Number(image.height);

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow:height -(face.bottom_row *height)
    }
  }
  displayFaceDetect = (box)=> {
    console.log(box)
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})


  }
  onPictureSubmit = () => {
    this.setState({imageUrl:this.state.input});
    //console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
        .then(response => {
          if (response){
            fetch('http://localhost:3000/image',{
              method:'put',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify({
                id:this.state.user.id
              })
            })
          }
        this.displayFaceDetect(this.findFaceLocation(response))
      })

      .catch(error => console.log(error));
  }

  onPageChange = (page) => {
    if (page === 'signout') {
      this.setState({isSignedIn:false})
    }else if (page === "home"){
      this.setState({isSignedIn: true})
    }
    this.setState({page:page})
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
    // THE JPG
    this.state.input)
    .then((response) => {
        if(response) {
        fetch('http://localhost:3000/image', {
            method:'put',
                headers:{ 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id:this.state.user.id
                })
        })
        .then(response => response.json())
        .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
            })

        }
    this.displayFaceDetect(this.findFaceLocation(response));
    })
    .catch((err) => {
    console.log(err);
    });
        }

  render() {
    const { isSignedIn, imageUrl, page, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onPageChange={this.onPageChange}/>
        { page === 'home' ?
          <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          : (
            page === 'signin' ?
            <Signin loadUserData={this.loadUserData} onPageChange={this.onPageChange}/> :
             <Register loadUserData={this.loadUserData} onPageChange={this.onPageChange}/>
          )
        }
      </div>
    );
  }
}

export default App;