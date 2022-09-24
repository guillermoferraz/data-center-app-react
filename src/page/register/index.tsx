import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { RegisterSchema } from "../../schema/forms/register.schema";
import { isValidEmail, isValidPassword, digits, isAlpha } from "../../constants/regexp";


import './register.scss';
import { Link } from "react-router-dom";

type Errors = {
  name?: string;
  message?: string;
}

export const Register = () => {
  const BackVideo = require('../../assets/files/background.mp4');
  const entries: { [key: string]: string }[] = [
    {
      id: 'firstname',
      name: 'firstname',
      type: 'text',
      placeholder: 'Firstname',
      autoComplete: 'off'
    },
    {
      id: 'lastname',
      name: 'lastname',
      type: 'text',
      placeholder: 'Lastname',
      autoComplete: 'off'
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      autoComplete: 'off'
    },
    {
      id: 'confirmEmail',
      name: 'confirmEmail',
      type: 'email',
      placeholder: 'Confirm email',
      autoComplete: 'off'
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      autoComplete: 'off'

    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password',
      autoComplete: 'off'
    }
  ]
  const [formValues, setFormValues] = useState({ ...RegisterSchema });
  const [errorFirstname, setErrorFirstname] = useState({ active: false, message: 'The firstname must have at least 2 alphabetic characters' })
  const [errorLastname, setErrorLastname] = useState({ active: false, message: 'The lastname must have at least 2 alphabetic characters' })
  const [errorEmail, setErrorEmail] = useState({ active: false, message: 'The email entered is invalid' })
  const [errorConfirmEmail, setErrorConfirmEmail] = useState({ active: false, message: 'The email and the confirmation do not match' })
  const [errorPassword, setErrorPassword] = useState({ active: false, message: 'The password must have at least 8 characters, including at least one numeric character and one special character' });
  const [errorConfirmPassword, setErrorConfirmPassword] = useState({ active: false, message: 'The password and the confirmation do not match' })
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [showErrors, setShowErrors] = useState(false);


  useEffect(() => {
    if(!formValues.firstname ||  formValues.firstname.length < 2 || digits.test(formValues.firstname) || !isAlpha.test(formValues.firstname)) {
      setErrorFirstname({ ...errorFirstname, active: true })
      setEnableSubmit(false)
    } else {
      setEnableSubmit(true)
      setErrorFirstname({ ...errorFirstname, active: false })
    }

    if(!formValues.lastname  ||  formValues.lastname.length < 2 || digits.test(formValues.lastname) || !isAlpha.test(formValues.lastname)) {
      setErrorLastname({ ...errorLastname, active: true })
      setEnableSubmit(false)
    } else {
      setEnableSubmit(true)
      setErrorLastname({ ...errorLastname, active: false })
    }

    if(!formValues.email || !isValidEmail.test(formValues.email)){
      setErrorEmail({ ...errorEmail, active: true })
      setEnableSubmit(false)      
    } else {
      setEnableSubmit(true)
      setErrorEmail({ ...errorEmail, active: false })      
    }

    if(formValues.confirmEmail !== formValues.email){
      setErrorConfirmEmail({ ...errorConfirmEmail, active: true })
      setEnableSubmit(false)
    } else {
      setEnableSubmit(true)
      setErrorConfirmEmail({ ...errorConfirmEmail, active: false })      
    }

    if(!formValues.password || !isValidPassword.test(formValues.password)){
      setErrorPassword({ ...errorPassword, active: true })
      setEnableSubmit(false)
    } else {
      setEnableSubmit(true)
      setErrorPassword({ ...errorPassword, active: false })      
    }

    if(formValues.confirmPassword !== formValues.password){
      setErrorConfirmPassword({ ...errorConfirmPassword, active: true })
      setEnableSubmit(false)
    } else {
      setEnableSubmit(true)
      setErrorConfirmPassword({ ...errorConfirmPassword, active: false })      
    }
  },[formValues])


  const handleSubumit = () => {
    if(enableSubmit){
      console.log('form values:', formValues)
    }
  }
  
  const handlePreSubmit = () => {
    setShowErrors(true)
    setTimeout(() => handleSubumit(), 500)
  }

  const setValues = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value })    
  };

  const returnError = (name: string) => {
    switch(name){
      case 'firstname':
        if(errorFirstname.active) return `${ '*' }${errorFirstname.message}`;
        return ""
      case 'lastname':
        if(errorLastname.active) return `${ '*' }${errorLastname.message}`;
        return ""
      case 'email':
        if(errorEmail.active) return `${ '*' }${errorEmail.message}`;
        return ""
      case 'confirmEmail':
        if(errorConfirmEmail.active) return `${ '*' }${errorConfirmEmail.message}`;
        return ""
      case 'password':
        if(errorPassword.active) return `${ '*' }${errorPassword.message}`;
        return ""
      case 'confirmPassword':
        if(errorConfirmPassword.active) return `${ '*' }${errorConfirmPassword.message}`;
        return ""
    }
  }

  return (
    <div className="root_container">
      <video autoPlay muted loop id="backVideo">
        <source src={BackVideo} type="video/mp4" />
      </video>
      <div className="container_form">
        <h1 className="official_title">Data Center</h1>

        {entries && entries.map(e => (
          <React.Fragment>
            <div key={e.id} className="container_input" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handlePreSubmit()}>
              <Input
                id={e.id}
                name={e.name}
                type={e.type}
                placeholder={e.placeholder}
                autoComplete={e.autoComplete}
                onChange={(event) => setValues(e.name, event.target.value)}
              />
            </div>
            <p className="error_in_form">{showErrors && returnError(e.name)}</p>
          </React.Fragment>
        ))
        }

        <p className="info">
          Do you already have an account ?&nbsp;
          <Link className="hyperlink" to="/">Login</Link>
        </p>
        <div className="container_btn">
          <Button onClick={() => handlePreSubmit()} label="Register" />
        </div>
      </div>
    </div>
  )
}