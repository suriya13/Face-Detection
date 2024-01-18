import { Button, Input } from "antd";
import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = (props) => {
    const {onInputChange, onSubmit} = props
    return (
        <div >
            <div className="form">
                <div className="align">
                    <Input className='input' type="text" onChange={onInputChange} />
                    <div style={{width:'40%'}}>
                    <Button  type="primary" onClick={onSubmit} >Generate</Button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ImageLinkForm