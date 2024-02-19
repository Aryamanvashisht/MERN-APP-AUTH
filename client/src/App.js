import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'


/*All components*/
import Username from './Components/Username'
import Password from './Components/Password'
import Register from './Components/Register'
import Reset from './Components/Reset'
import Profile from './Components/Profile'
import PageNotFound from './Components/PageNotFound'
import Recovery from './Components/Recovery'

/**Auth middleware */
import {AuthorizeUser,ProtectRoute} from './middleware/auth'


/*root routes*/

const router = createBrowserRouter([
    {
        path: '/',
        element: <Username />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/reset',
        element: <Reset />
    },
    {
        path: '/profile',
        element:<AuthorizeUser><Profile/></AuthorizeUser>
    },
    {
        path: '/recovery',
        element: <Recovery />
    },
    {
        path: '/password',
        element: <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path: '*',
        element: <PageNotFound />
    }
])

export default function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}   