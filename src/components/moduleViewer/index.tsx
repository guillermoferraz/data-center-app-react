import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootSate, useAppDispatch } from "../../hooks/hooks";
import { es } from "../../schema/voice/dictionary";
import { ModuleTypes } from "../../schema/modules/module.types";

/* Store */
import modulesSlice from "../../store/modules/modules";

import './moduleViewer.scss';

interface ModuleViwerTypes {
  type: string;
}

export const ModuleViewer = ({ type }: ModuleViwerTypes) => {
  const dispatch = useAppDispatch();

  /* Speech */
  const  { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  const { speechEnable } = useSelector((state: RootSate) => state.speech);
  
  useEffect(() => { if(voices) setVoice(voices[5]) },[voices])

  const { modules , moduleSelected} = useSelector((state: RootSate) => state.modules);
  const { setModuleSelected } = modulesSlice.actions;

  const handleSelectedModule = (module: ModuleTypes) => {
    if(speechEnable) speak({ text: es.moduleSelectedName + module.Name , voice})
    dispatch(setModuleSelected(module))
  }

  return (
    <React.Fragment>
      {type === 'list' && (
        <div className='module_viwer_container'>
          {modules && modules.length > 0 && modules.map(module => (
            <div 
              key={module.Id} 
              className={moduleSelected?.Id === module.Id ? "module_viwer_item m_v_i_selected" : "module_viwer_item"}
              title={module.Name} 
              onClick={() => handleSelectedModule(module)}              
             >
              {module.Name}
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  )
}