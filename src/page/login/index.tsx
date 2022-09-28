import React, { useEffect, useState } from "react";
import { RootSate, useAppDispatch } from "../../hooks/hooks";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Alert } from "../../components/alert";


import './login.scss';
import { Link } from "react-router-dom";
import { LoginSchema } from "../../schema/forms/register.schema";
import authSlice ,{ login } from '../../store/auth/auth';
import { registerInitialState } from "../../store/auth/states";
import { useSelector } from "react-redux";
import { es } from "../../schema/voice/dictionary";

export const Login = () => {
  const  { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  

  const BackVideo = require('../../assets/files/background.mp4');
  const dispatch = useAppDispatch();
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
  const [alert, setAlert] = useState<{title?: string, description?: string, active?: boolean, action?: string }>({ title: '', description: '', action: undefined, active: false })
  const { setCleanRegisterResponse, setCleanLoginResponse } = authSlice.actions;
  const { loginResponse } = useSelector((state: RootSate) => state.auth);

  useEffect(()=> {
    dispatch(setCleanRegisterResponse({ value: { ...registerInitialState } }))
  },[])
  useEffect(() => { if(voices) setVoice(voices[5]) },[voices])

  const handleCleanResponse = () => { dispatch(setCleanLoginResponse({ value: {...registerInitialState, user: undefined} })) }



  useEffect(() => {
    if(loginResponse?.status === 200){
      setAlert({ title: 'Login success', description: loginResponse?.message, active: true, action: '/Dashboard' })
      sessionStorage.setItem('dc_tkn', loginResponse?.user?.Token || "")
      speak({ text: es.access_success, voice})
      speak({ text: es.welcome + loginResponse?.user?.Firstname, voice})
      setTimeout(() => { handleCleanResponse() },5000)
    } else if (loginResponse?.status === 401){
      setAlert({ title: 'Denied !', description: loginResponse?.message, active: true, action: '/' })
      speak({ text: es.access_denied, voice})
      setTimeout(() => { handleCleanResponse() },5000)
    } else {
      setAlert({ title: '', description: '', active: false, action: '/' })
    }
  },[loginResponse])  

  console.log("login response:", loginResponse)

  const handleSubmit = () => {
    dispatch(login(formValues))
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
        {alert?.active && (<Alert size='big' title={alert?.title} description={alert?.description} action={alert?.action} loading/> )}
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