import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './principalMenu.scss';

/* Components */
import { ModuleViewer } from '../moduleViewer';
/* Store */
import modulesSlice ,{ getSubmodulesByModule, getModules } from  '../../store/modules/modules';
import { RootSate, useAppDispatch } from '../../hooks/hooks';
import { useSelector } from 'react-redux';
import { es } from '../../schema/voice/dictionary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faRotate
} from '@fortawesome/free-solid-svg-icons';

export const PrincipalMenu = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  /* Speech */
  const  { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  useEffect(() => { if(voices) setVoice(voices[5]) },[voices])

  const { setAddNewModule, setAddNewSubmodule } = modulesSlice.actions;
  const { speechEnable } = useSelector((state: RootSate) => state.speech);
  const { 
    addNewModule, 
    addNewSubmodule, 
    submoduleSelected,
    moduleSelected } = useSelector((state: RootSate) => state.modules);

  const handleAddNewModule = () => {
    if(speechEnable){
      if(!addNewModule) speak({ text: es.addNewModuleOpen, voice })
      if(addNewModule) speak({ text: es.addNewModuleClose, voice })      
    }
    dispatch(setAddNewModule({value: !addNewModule }))
    if(location?.pathname !== '/Dashboard') setTimeout(() => { navigate('/Dashboard') } ,500)
    
  }

  const handleAddNewSubmodule = () => {
    if(speechEnable){
      if(!addNewSubmodule) speak({ text: es.addNewSubmoduleOpen, voice })
      if(addNewSubmodule) speak({ text: es.addNewSubmoduleClose, voice })
    }
    dispatch(setAddNewSubmodule({value: !addNewSubmodule}))
    if(location?.pathname !== '/Dashboard') setTimeout(() => { navigate('/Dashboard') } ,500)
  }

  useEffect(() => {
    if(moduleSelected?.Id) {
      dispatch(getSubmodulesByModule(moduleSelected?.Id||""))
      if(speechEnable) speak({ text: es.words.module + ';' + moduleSelected.Name , voice})
    } 
  },[moduleSelected])

  useEffect(() => {
    if(submoduleSelected?.Id){
      if(speechEnable) speak({ text: es.words.submodule + ';' + submoduleSelected?.Name , voice})
    }
  },[submoduleSelected])

  const refreshModules = (type: string) => {
    if(type === 'module'){
      dispatch(getModules())
      speechEnable && speak({text: es.reloadData + ' ' + es.words.modules, voice})
    }
    if(type === "submodules"){
      dispatch(getSubmodulesByModule(moduleSelected?.Id||""))
      speechEnable && speak({text: es.reloadData + ' ' + es.words.submodules, voice})
    }
  }

  return (
    <nav className='principalMenu_root'>
      <div className='modules'>
        <div className='s_module_container'>
          <h1 className='s_module_title'>Modules<FontAwesomeIcon icon={faRotate} className="icon_info_small_p_m" onClick={() => refreshModules('module')}/></h1>
        </div>
        <div className='s_m_content'>
          <p className='s_m_add' onClick={() => handleAddNewModule()}>Add new module +</p>
          <div className='c_m_v_list'>
            <ModuleViewer type="list" section="module"/>
          </div>
        </div>
      </div>
      <div className='submodules'>
        <div className='s_module_container'>
          <h1 className='s_module_title'>Submodules<FontAwesomeIcon icon={faRotate} className="icon_info_small_p_m" onClick={() => refreshModules('submodules')}/></h1>
        </div>
        <div className='s_m_content'>
          <p className='s_m_add' onClick={() => handleAddNewSubmodule()}>Add new submodule +</p>
          <div className='c_m_v_list'>
            <ModuleViewer type="list" section="submodule"/>
          </div>
        </div>
      </div>
    </nav>
  )
}