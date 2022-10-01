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
import { Editor } from "../../components/editor";

import '../dashboard/dashboard.scss';

/* Store */
import modulesSlice, { patchModule, getModules, patchSubmodule, getSubmodulesByModule } from "../../store/modules/modules";
import { CardInfo } from "../../components/cardInfo";
import { Selector } from "../../components/selector";
import { ModuleTypes } from "../../schema/modules/module.types";
import { es } from "../../schema/voice/dictionary";

export const EditModules = () => {
  /* Speech */
  const  { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  useEffect(() => { if(voices) setVoice(voices[5]) },[voices])

  const dispatch = useAppDispatch();
  const { userData } = useSelector((state: RootSate) => state.user);
  const { 
    editModule,
    editSubmodule,
    patchModuleResponse, 
    modules, 
    patchSubmoduleResponse, 
    showInfoCard,
    submoduleSelected,
    moduleSelected } = useSelector((state: RootSate) => state.modules);
  const { setCleanPatchModuleResponse, setCleanPatchSubmoduleResponse } = modulesSlice.actions;


  const [alert, setAlert] = useState(false);
  const [patchModuleValues, setPatchModuleValues] = useState({id: '' ,name: '', description: '', private: false })
  const [patchSubmoduleValues, setPatchSubmoduleValues] = useState({ id: '' ,name: '', description: '', private: false, moduleId: '' })
  const [patchContent, setPatchContent] = useState('');
  const [alertPatchModule, setAlertPatchModule] = useState<{ active: boolean, message?: string, title?:string }>({ active: false, message: '', title: '' })
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
    setPatchModuleValues({
      name: moduleSelected.Name||"",
      description: moduleSelected.Description||"",
      private: moduleSelected.Private|| false,
      id: moduleSelected.Id||""
    })
  },[moduleSelected])

  useEffect(() => {
    setPatchSubmoduleValues({
      id: submoduleSelected.Id||"",
      name: submoduleSelected.Name||"",
      description: submoduleSelected.Description||"",
      moduleId: submoduleSelected.ModuleId||"",
      private: submoduleSelected.Private||false
    })
    setPatchContent(submoduleSelected.Content||"")
  },[submoduleSelected])

  useEffect(() => {
    if(patchModuleResponse?.status === 200 || patchModuleResponse?.status === 500) {
      if(patchModuleResponse?.status === 200) speak({ text: es.success.patchModule, voice })
      if(patchModuleResponse?.status === 500) speak({ text: es.errors.patchModule, voice })

      setAlertPatchModule({ active: true, message: patchModuleResponse?.message, title: patchModuleResponse?.status === 200 ? 'Success' : 'Error' })
    } else {
      setAlertPatchModule({ active: false, message: "", title: "" }) 
    }
  },[patchModuleResponse])

  useEffect(() => {
    if(alertPatchModule.active){
      patchModuleResponse?.status === 200 && dispatch(getModules())
      setTimeout(() =>{
        dispatch(setCleanPatchModuleResponse())
        setAlertPatchModule({ active: false, message: "", title: "" })
      },2500)
    }
  },[alertPatchModule])

  useEffect(() => {
    setAlert(false)
    setTimeout(() => { checkUser() }, 600)
  }, [userData])

  useEffect(() => {
    if(patchSubmoduleResponse?.status === 200 || patchSubmoduleResponse?.status === 500) {
      if(patchSubmoduleResponse?.status === 200){
        dispatch(getSubmodulesByModule(moduleSelected?.Id || ""))
        speak({ text: es.success.patchSubmodule, voice })
        setAlertPatchModule({ active: false, message: "", title: "" }) 
      } 
      if(patchSubmoduleResponse?.status === 500) speak({ text: es.errors.patchSubmodule, voice })

      setAlertPatchModule({ active: true, message: patchSubmoduleResponse?.message, title: patchSubmoduleResponse?.status === 200 ? 'Success' : 'Error' })
    } else {
      setAlertPatchModule({ active: false, message: "", title: "" }) 
    }
  },[patchSubmoduleResponse])

  const handleSubmitPatchModule = () => {
    if(patchModuleValues.name.length > 0 && patchModuleValues?.description){
      setErrorRequiredModule(false)
      dispatch(patchModule(patchModuleValues))
    } else {
      setErrorRequiredModule(true)
      speak({ text: es.errors.allInputsRequired, voice })
    }
  }
  const handleSubmitPatchSubmodule = () => {
    if(patchSubmoduleValues?.description && patchSubmoduleValues?.name && relationModule?.Id){
      setErrorRequiredSubmodule(false)
      dispatch(patchSubmodule({
        id: patchSubmoduleValues?.id,
        name: patchSubmoduleValues?.name,
        description: patchSubmoduleValues?.description,
        private: patchSubmoduleValues?.private,
        moduleId: relationModule?.Id,
        content: patchContent
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
      {alertPatchModule.active && (<Alert size="big" title={alertPatchModule?.title} description={alertPatchModule?.message} />)}
      <div className="content_root">
        <PrincipalMenu />
        <div className="container_root">
          {showInfoCard && <CardInfo/>}
          <div className="content_root_f">
          {editModule && (
            <div className="form_m" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleSubmitPatchModule() }>
              <div className="container_input_f_m" style={{ width: 'max-content' }}>
                <Input
                  id="patch_module"
                  placeholder="Module name"
                  type="text"
                  onChange={(e) => setPatchModuleValues({ ...patchModuleValues, name: e.target.value })}
                  value={patchModuleValues?.name}
                />
              </div>
              <div className="container_input_f_m" style={{ width: 'max-content' }}>
                <textarea
                  rows={10}
                  className="input textarea"
                  style={{ marginTop: 5, width: 260 }}
                  placeholder="Description"
                  onChange={(e) => setPatchModuleValues({ ...patchModuleValues, description: e.target.value })}
                  value={patchModuleValues?.description}
                >
                  {patchModuleValues?.description}
                </textarea>
              </div>
              <div className="check_container_a1">
                <div style={{ width: 'max-content' }}>
                  <input className="checkbox" type="checkbox" checked={patchModuleValues?.private} onChange={(e) => setPatchModuleValues({ ...patchModuleValues, private: e.target.checked })} />
                </div>
              </div>
              <div className="container_btn" style={{ width: 270 }}>
              {errorRequiredModule && <p className="error">All fields are required</p>}
                <button className='btn-submit-small' style={{ width: '100%' }} onClick={() => handleSubmitPatchModule()}>Upload</button>
              </div>
            </div>
          )}
          {editSubmodule && (
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
                  onChange={(e) => setPatchSubmoduleValues({ ...patchSubmoduleValues, name: e.target.value })}
                  value={patchSubmoduleValues?.name}
                />
              </div>
              <div className="container_input_f_m" style={{ width: 'max-content' }}>
                <textarea
                  rows={10}
                  className="input textarea"
                  style={{ marginTop: 5, width: 260 }}
                  placeholder="Description"
                  onChange={(e) => setPatchSubmoduleValues({ ...patchSubmoduleValues, description: e.target.value })}
                  value={patchSubmoduleValues?.description}
                >
                  {patchSubmoduleValues?.description}
                </textarea>
              </div>
              <div className="check_container_a1">
                <div style={{ width: 'max-content' }}>
                  <input className="checkbox" type="checkbox" checked={patchSubmoduleValues?.private} onChange={(e) => setPatchSubmoduleValues({ ...patchSubmoduleValues, private: e.target.checked })} />
                </div>
              </div>
              <div style={{ color: '#000c24' }}>
                <Editor content={patchContent} setContent={(e: string) => setPatchContent(e)}/>
              </div>
              <div className="container_btn" style={{ width: 270 }}>
                {errorRequiredSubmodule && <p className="error">All fields are required</p>}
                <button className='btn-submit-small' style={{ width: '100%' }} onClick={() => handleSubmitPatchSubmodule()}>Upload</button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
};