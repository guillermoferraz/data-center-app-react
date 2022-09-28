import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, RootSate } from "../../hooks/hooks";
import { getUser } from "../../store/user/user";

/* Components */
import { Header } from "../../components/header";
import { PrincipalMenu } from "../../components/principalMenu";
import { Earth } from "../../components/earth";
import { Input } from "../../components/input";
import { Alert } from "../../components/alert";

import './dashboard.scss';

/* Store */
import modulesSlice, { addModule, getModules, addSubmodule } from "../../store/modules/modules";
import { CardInfo } from "../../components/cardInfo";
import { Selector } from "../../components/selector";
import { ModuleTypes } from "../../schema/modules/module.types";
import { es } from "../../schema/voice/dictionary";

export const Dashboard = () => {
  /* Speech */
  const  { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  useEffect(() => { if(voices) setVoice(voices[5]) },[voices])

  const dispatch = useAppDispatch();
  const { userData } = useSelector((state: RootSate) => state.user);
  const { addNewModule, addNewSubmodule, addModuleResponse, modules, addSubmoduleResponse } = useSelector((state: RootSate) => state.modules);
  const { setCleanAddModuleResponse, setCleanAddSubmoduleResponse } = modulesSlice.actions;


  const [alert, setAlert] = useState(false);
  const [newModuleValues, setNewModuleValues] = useState({ name: '', description: '', private: false })
  const [newSubmoduleValues, setNewSubmoduleValues] = useState({ name: '', description: '', private: false })
  const [alertNewModule, setAlertNewModule] = useState<{ active: boolean, message?: string, title?:string }>({ active: false, message: '', title: '' })
  const [relationModule, setRelationModule] = useState<{Id: string | undefined ,Name: string | undefined }>({ Id: undefined, Name: undefined })
  const [errorRequiredSubmodule, setErrorRequiredSubmodule] = useState(false);
  const [errorRequiredModule, setErrorRequiredModule] = useState(false);


  const checkUser = () => {
    if (!userData || userData?.status === 409) {
      setAlert(true)
    } else {
      setAlert(false)
    }
  }


  useEffect(() => {
    dispatch(getUser())
    dispatch(getModules())
  }, [])

  useEffect(() => {
    if(addModuleResponse?.status === 200 || addModuleResponse?.status === 500) {
      if(addModuleResponse?.status === 200) speak({ text: es.success.newModuleAdded, voice })
      if(addModuleResponse?.status === 500) speak({ text: es.errors.newModuleAdded, voice })

      setAlertNewModule({ active: true, message: addModuleResponse?.message, title: addModuleResponse?.status === 200 ? 'Success' : 'Error' })
    } else {
      setAlertNewModule({ active: false, message: "", title: "" }) 
    }
  },[addModuleResponse])

  useEffect(() => {
    if(alertNewModule.active){
      addModuleResponse?.status === 200 && dispatch(getModules())
      setTimeout(() =>{
        dispatch(setCleanAddModuleResponse())
        dispatch(setCleanAddModuleResponse())
        setAlertNewModule({ active: false, message: "", title: "" })
      },2500)
    }
  },[alertNewModule])

  useEffect(() => {
    setAlert(false)
    setTimeout(() => { checkUser() }, 600)
  }, [userData])

  useEffect(() => {
    if(addSubmoduleResponse?.status === 200 || addSubmoduleResponse?.status === 500) {
      if(addSubmoduleResponse?.status === 200) speak({ text: es.success.newSubmoduleAdded, voice })
      if(addSubmoduleResponse?.status === 500) speak({ text: es.errors.newSubmoduleAdded, voice })

      setAlertNewModule({ active: true, message: addSubmoduleResponse?.message, title: addSubmoduleResponse?.status === 200 ? 'Success' : 'Error' })
    } else {
      setAlertNewModule({ active: false, message: "", title: "" }) 
    }
  },[addSubmoduleResponse])

  const handleSubmitModule = () => {
    if(newModuleValues.name.length > 0 && newModuleValues?.description){
      setErrorRequiredModule(false)
      dispatch(addModule(newModuleValues))
    } else {
      setErrorRequiredModule(true)
      speak({ text: es.errors.allInputsRequired, voice })
    }
  }
  const handleSubmitSubmodule = () => {
    if(newSubmoduleValues?.description && newSubmoduleValues?.name && relationModule?.Id){
      setErrorRequiredSubmodule(false)
      dispatch(addSubmodule({
        name: newSubmoduleValues?.name,
        description: newSubmoduleValues?.description,
        private: newSubmoduleValues?.private,
        moduleId: relationModule?.Id
      }))
    } else {
      
      setErrorRequiredSubmodule(true)
      speak({ text: es.errors.allInputsRequired, voice })
    }
  }
  const handleRelationModuleSelected = (v: ModuleTypes) => {
    setRelationModule({ Id: v.Id, Name: v.Name })
  }

  //console.log('user data:', userData)

  return (
    <div className="page_root">
      <Header />
      {alert && (<Alert size="big" title="Denied!" description="You do not have permissions for that section" loading action="/" />)}
      {alertNewModule.active && (<Alert size="big" title={alertNewModule?.title} description={alertNewModule?.message} />)}
      <div className="content_root">
        <PrincipalMenu />
        <div className="container_root">
          <CardInfo/>
          <div className="content_root_f">
          {addNewModule && (
            <div className="form_m" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleSubmitModule() }>
              <div className="container_input_f_m" style={{ width: 'max-content' }}>
                <Input
                  id="add_new_module"
                  placeholder="Module name"
                  type="text"
                  onChange={(e) => setNewModuleValues({ ...newModuleValues, name: e.target.value })}
                  value={newModuleValues?.name}
                />
              </div>
              <div className="container_input_f_m" style={{ width: 'max-content' }}>
                <textarea
                  rows={10}
                  className="input textarea"
                  style={{ marginTop: 5, width: 260 }}
                  placeholder="Description"
                  onChange={(e) => setNewModuleValues({ ...newModuleValues, description: e.target.value })}
                >
                  {newModuleValues?.description}
                </textarea>
              </div>
              <div className="check_container_a1">
                <div style={{ width: 'max-content' }}>
                  <input className="checkbox" type="checkbox" checked={newModuleValues?.private} onChange={(e) => setNewModuleValues({ ...newModuleValues, private: e.target.checked })} />
                </div>
              </div>
              <div className="container_btn" style={{ width: 270 }}>
              {errorRequiredModule && <p className="error">All fields are required</p>}
                <button className='btn-submit-small' style={{ width: '100%' }} onClick={() => handleSubmitModule()}>Add</button>
              </div>
            </div>
          )}
          {addNewSubmodule && (
            <div className="form_m">
              <Selector
                values={modules||[]}
                keyValue={modules ? "Id" : ""}
                keyItem={modules? "Name": ""}
                placeholder="Select a module"
                setSelectedValue={handleRelationModuleSelected}
                selectedValue={relationModule?.Name}
              />
              <div className="container_input_f_m" style={{ width: 'max-content' }}>
                <Input
                  id="add_new_module"
                  placeholder="Submodule name"
                  type="text"
                  onChange={(e) => setNewSubmoduleValues({ ...newSubmoduleValues, name: e.target.value })}
                  value={newSubmoduleValues?.name}
                />
              </div>
              <div className="container_input_f_m" style={{ width: 'max-content' }}>
                <textarea
                  rows={10}
                  className="input textarea"
                  style={{ marginTop: 5, width: 260 }}
                  placeholder="Description"
                  onChange={(e) => setNewSubmoduleValues({ ...newSubmoduleValues, description: e.target.value })}
                >
                  {newSubmoduleValues?.description}
                </textarea>
              </div>
              <div className="check_container_a1">
                <div style={{ width: 'max-content' }}>
                  <input className="checkbox" type="checkbox" checked={newSubmoduleValues?.private} onChange={(e) => setNewSubmoduleValues({ ...newSubmoduleValues, private: e.target.checked })} />
                </div>
              </div>
              <div className="container_btn" style={{ width: 270 }}>
                {errorRequiredSubmodule && <p className="error">All fields are required</p>}
                <button className='btn-submit-small' style={{ width: '100%' }} onClick={() => handleSubmitSubmodule()}>Add</button>
              </div>
            </div>
          )}
          </div>
          {!addNewModule && !addNewSubmodule && <Earth />}          
        </div>
      </div>
    </div>
  )
};