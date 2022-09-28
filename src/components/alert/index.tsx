import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './alert.scss';

interface AlertTypes {
  size?: string;
  title?: string;
  loading?: boolean;
  description?: string;
  action?: string;
}

export const Alert = ({
  size,
  title,
  loading,
  description,
  action
}: AlertTypes) => {
  const ProgressBar = require("progressbar.js");
  const navigate = useNavigate();
  
  /**
   * Props values;
   *  size: small, medium, big
   */
   useEffect(() => {
    if(loading){

      let lineBar = new ProgressBar.Line("#line-container", {
        strokeWidth: 4,
        trailWidth: 0.5,
        from: { color: "#FF0000" },
        to: { color: "#008000" },
        text: {
          value: '0',
          className: 'progress-text',
          style: {
            color: 'cyan',
            position: 'absolute',
            top: '-30px',
            padding: 0,
            margin: 0,
            transform: null
          }
        },
        step: (state: any, shape: any) => {
          shape.path.setAttribute("stroke", state.color);
          if(shape.value() === 1){
            shape.setText('Charge complete')
            if(action){
              setTimeout(() => navigate(action), 1500)
            }
          } else {
            shape.setText(Math.round(shape.value() * 100) + ' %')
          }
        }
      });
      
      lineBar.animate(1, {
        duration: 4000
      });
    }
   },[loading])


  return (
    <React.Fragment>
      {size === 'big' && (
        <div className="container_alert">
          <div className='content_alert'>
          <h1 className='alert_title'>{title}</h1>
          <h4 className='alert_description'>{description}</h4>
          {loading && (
            <div id="line-container"/>
          )}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}