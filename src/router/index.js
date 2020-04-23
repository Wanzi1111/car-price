import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import routerConfig from './routerConfig'
import RouterView from './router'

export default ()=>{
    return <BrowserRouter>
        <RouterView routerConfig={routerConfig}/>
    </BrowserRouter>
}