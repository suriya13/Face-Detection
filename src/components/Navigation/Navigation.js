import React from 'react';
import './Navigation.css'
import { Button } from 'antd';

const Navigation = (props)=> {
    const {onRouteChange, signedIn} = props
    if(signedIn){
        return(
<nav style={{display:'flex', justifyContent: 'flex-end'}}>
        <Button onClick={()=>onRouteChange('signout')} className='signout' type='primary'>signout</Button>
    </nav> 
        )
        
    }else{
        return (
            <nav style={{display:'flex', justifyContent: 'flex-end'}}>
                <Button onClick={()=>onRouteChange('signin')} className='signout' type='primary'>Signin</Button>
                <Button onClick={()=>onRouteChange('register')} className='signout' type='primary'>Register</Button>
            </nav>
        )
    }

}
export default Navigation