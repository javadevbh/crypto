import React, { useEffect } from 'react';

//API
import { getCoins } from '../services/api';

const Landing = () => {

    useEffect(() => {
        const fetchAPI =  () => {
            getCoins()
            .then(data => console.log(data))
        }
        fetchAPI()
    },[])

    return (
        <div>
            
        </div>
    );
};

export default Landing;