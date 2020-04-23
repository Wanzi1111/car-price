import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
export default ({routerConfig})=>{
    if(!routerConfig.length){
        return null;
    }
    const redirectArr = routerConfig.filter(item=>item.redirect);
    const allPage = routerConfig.filter(item=>item.path === '*');
    return <Switch>
        {
            routerConfig.map(item=>{
                return (item.component && (item.path !== '*')) ? <Route key={item.path} path={item.path} render={routeProps=>{
                    const Com = item.component;
                    return <Com {...routeProps} routerConfig={item.children} />
                }} /> : null
            })
            .concat(redirectArr.map(item=>{
                return <Redirect key={item.path} from={item.path} to={item.redirect} />
            }))
        }
        {
            allPage.length && allPage.map(item=>{
                return <Route key={item.path} path={item.path} component={item.component} />
            })
        }
    </Switch>
}