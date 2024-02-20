import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN


/** make API requests */

// export const getUserFromToken = async ()=>{
//     const token = localStorage.getItem('token')
//     if(!token) return Promise.reject("Cannot find the token")
//     let result = jwtDecode(token)
//     console.log(result);
//     return result
// }

export const getUserFromToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject("Cannot find the token");
    

    // Send the token to the backend for verification
    try {
        const response = await axios.post('/api/verifyToken',null,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // if (response.ok) {
        //     console.log('I am here', response.status);
        //     throw new Error('Token verification failed');
        // }
       
        const result = response.data;
        // console.log(result.user.username);
        return result;

    } catch (error) {
        console.log('I am here');
        return Promise.reject(error.message);
    }
}


/**Authenticate function */

export const authenticate = async (username) => {

    try 
    {
        return await axios.post('/api/authenticate',{username})  
    } catch (error) {
        return {error:"Username doesn't exist"}
    }
}

/** get user details */

export const getUsername  = async ({username}) => {

    try 
    {
        
        const {data} = await axios.get(`/api/user/${username}`)
        return {data}

    } catch (error) {
        return {error:"Password doesn't match"}
    }
}

/**Register function */
export const registerUser = async (credentials) => {

    try 
    {
     
        const{data:{msg},status} = await axios.post(`/api/register`,credentials)
        let{username,email} = credentials

        /**send Mail */
        if(status === 201)
        await axios.post('api/registerMail',{username,userEmail:email,text:msg})
        
        return Promise.resolve(msg) 

    } catch (error) {
        return {error:"Username doesn't exist"}
    }
}

/**Login function */

export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/**update function */

export const updateUser = async (response) => {
        
      try 
      {
        //get the token from localstorage
        const token = localStorage.getItem('token')
        const {data} = await axios.put('/api/updateuser',response,{headers:{'Authorization':`Bearer ${token}`}})

        return Promise.resolve({data})
        
      } catch (error) {
        return Promise.reject({error:"Couldn't update the Profile"})
      }

}

/**generateOTP */

export const generateOTP = async (username) => {
          try 
          {
            const{data:{code},status} = await axios.get('/api/generateOTP',{params:{username}})

            if(status === 201)
            {
               let{data:{email}} = await getUsername({username})

               let text = `Your Password Recovery OTP is ${code}. Verify and recover your password`
               await axios.post('api/registerMail',{username,userEmail:email,text,Subject:'Password Recovery OTP'})
            }

            return Promise.resolve(code)
          } catch (error) {
            return Promise.reject({error})
          }
}

/**verfiy otp */

export const verifyOTP = async ({username,code}) => {
 try 
 {
     const{data,status} = await axios.get('/api/verifyOTP',{params:{username,code}})
     return {data,status}    
 } catch (error) {
    return Promise.reject({error})
 }
}


/**reset password */

export const resetPassword = async ({username,password}) => {
        try 
        {
            const{data,status} = await axios.put('/api/resetPassword',{username,password})
            return Promise.resolve({data,status})
             
        } catch (error) {
            return Promise.reject({error})
        }
}