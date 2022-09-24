import React, { useState } from "react";
import { Input } from "../../components/input";
import { Button } from "../../components/button";


import './login.scss';
import { Link } from "react-router-dom";
import { LoginSchema } from "../../schema/forms/register.schema";

export const Login = () => {
  const BackVideo = require('../../assets/files/background.mp4');
  const entries: { [key: string]: string }[] = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      autoComplete: 'off'
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      autoComplete: 'off'

    }
  ]

  const [formValues, setFormValues] = useState({...LoginSchema});
  console.log('formValues:', formValues)

  const handleSubmit = () => {
    console.log("submit:", formValues)
  }

  const setValues = (name: string, value: string) => {
    switch(name){
      case 'email':
        setFormValues({ ...formValues, email: value  })
        break
      case 'password':
        setFormValues({ ...formValues, password: value  })
        break
    default:
    }
  }

  

  return (
    <div className="root_container">
        <video autoPlay muted loop id="backVideo">
            <source src={BackVideo} type="video/mp4"/>
        </video>
      <div className="container_form">
        <h1 className="official_title">Data Center</h1>
      
          {entries && entries.map(e => (
            <div key={e.id} className="container_input" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
              <Input
                id={e.id}
                name={e.name}
                type={e.type}
                placeholder={e.placeholder}
                autoComplete={e.autoComplete}
                onChange={(event) => setValues(e.name, event.target.value)}
              />
            </div>
          ))
          }
        
        <p className="info">
        Do not you have an account yet ?&nbsp;
          <Link className="hyperlink" to="/register">Create account</Link>
        </p>
        <div className="container_btn">
          <Button label="Login" onClick={() => handleSubmit()}/>
        </div>
      </div>
    </div>
  )
}