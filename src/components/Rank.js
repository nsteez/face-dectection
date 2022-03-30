import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
            {console.log(name)}
            {console.log(entries)}
           {`${name}, your current rank is ${entries}`}
            </div>
        </div>
    );
}
export default Rank;