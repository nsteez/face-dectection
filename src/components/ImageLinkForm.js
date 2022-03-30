import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'To detect faces in your pictures press Detect'}
            </p>
            <div className='center'>
                <div className=' form pa3 br3 shadow-5 center'>
                <input className='f4 pa1 w-70 center' type='tex' onChange={onInputChange}/>
                <button className='w-30 grow f4 lik ph3 pv2 dib white bg-light-blue pointer'
                onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}
export default ImageLinkForm;