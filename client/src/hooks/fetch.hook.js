import axios from "axios";
import { useEffect, useState } from "react";
// import { getUsername } from '../helper/helper'
import {getUserFromToken } from '../helper/helper'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** custom hook */

export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true}));

                const result  = !query ? await getUserFromToken() : '';
                //  const { user :{ username }} = !query ? await getUserFromToken() : '';
                //  console.log(username);
                
                const { data, status } = !query ? await axios.get(`https://mern-app-auth.onrender.com/api/user/${result.user.username}`) : await axios.get(`https://mern-app-auth.onrender.com/api/${query}`);

                if(status === 200){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}

// export default function useFetch(query){
//     const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setData(prev => ({ ...prev, isLoading: true }));

//                 let responseData;
//                 if (!query) {
//                     const { username } = await getUsername();
//                     responseData = await axios.get(`/api/user/${username}`);
//                 } else {
//                     responseData = await axios.get(`/api/${query}`);
//                 }

//                 setData({
//                     isLoading: false,
//                     apiData: responseData.data,
//                     status: responseData.status
//                 });
//             } catch (error) {
//                 setData(prev => ({ ...prev, isLoading: false, serverError: error }));
//             }
//         };

//         if (query) {
//             fetchData();
//         }

//     }, [query]);

//     return getData;
// }
