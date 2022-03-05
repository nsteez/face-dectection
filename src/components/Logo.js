import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';


const Logo = () => {
    return(
    <div className='ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2" option={{max:55}}style={{ height: 150, width: 150}} >
        <div className='Tilt-inner'>
        <img style={{width:"150px", height:"150px"}} alt="Logo"
            src={`../images/stockphoto2.png`} />

        </div>
       </Tilt>
    </div>
    );
}
export default Logo;