import React, { useState, useEffect } from 'react';
import './principalMenu.scss';

/* Components */
import { ModuleViewer } from '../moduleViewer';
/* Store */
import modulesSlice from '../../store/modules/modules';
import { RootSate, useAppDispatch } from '../../hooks/hooks';
import { useSelector } from 'react-redux';
import { es } from '../../schema/voice/dictionary';

export const PrincipalMenu = () => {
  const dispatch = useAppDispatch();

  /* Speech */
  const  { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  useEffect(() => { if(voices) setVoice(voices[5]) },[voices])

  const [newSubmoduleName, setNewSubmoduleName] = useState('');
  const [newSubmoduleDescription, setNewSubmoduleDescription] = useState('');

  const { setAddNewModule, setAddNewSubmodule } = modulesSlice.actions;
  const { speechEnable } = useSelector((state: RootSate) => state.speech);
  const { addNewModule, addNewSubmodule } = useSelector((state: RootSate) => state.modules);


  const handleSubmitSubmodule = () => {
    console.log({newSubmoduleName, newSubmoduleDescription})
  }

  const handleAddNewModule = () => {
    if(speechEnable){
      if(!addNewModule) speak({ text: es.addNewModuleOpen, voice })
      if(addNewModule) speak({ text: es.addNewModuleClose, voice })
    }
    dispatch(setAddNewModule({value: !addNewModule }))
  }

  const handleAddNewSubmodule = () => {
    if(speechEnable){
      if(!addNewSubmodule) speak({ text: es.addNewSubmoduleOpen, voice })
      if(addNewSubmodule) speak({ text: es.addNewSubmoduleClose, voice })
    }
    dispatch(setAddNewSubmodule({value: !addNewSubmodule}))
  }

  return (
    <nav className='principalMenu_root'>
      <div className='modules'>
        <div className='s_module_container'>
          <h1 className='s_module_title'>Modules</h1>
        </div>
        <div className='s_m_content'>
          <p className='s_m_add' onClick={() => handleAddNewModule()}>Add new module +</p>
          <div className='c_m_v_list'>
            <ModuleViewer type="list"/>
          </div>
        </div>
      </div>
      <div className='submodules'>
        <div className='s_module_container'>
          <h1 className='s_module_title'>Submodules</h1>
        </div>
        <div className='s_m_content'>
          <p className='s_m_add' onClick={() => handleAddNewSubmodule()}>Add new submodule +</p>
        </div>
      </div>
    </nav>
  )
}