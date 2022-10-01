import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootSate, useAppDispatch } from "../../hooks/hooks";
import { es } from "../../schema/voice/dictionary";
import { ModuleTypes, SubmoduleType } from "../../schema/modules/module.types";

/* Store */
import modulesSlice from "../../store/modules/modules";

import './moduleViewer.scss';

interface ModuleViwerTypes {
  type: string;
  section: string;
}

export const ModuleViewer = ({ type, section }: ModuleViwerTypes) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /* Speech */
  const  { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  const { speechEnable } = useSelector((state: RootSate) => state.speech);
  
  useEffect(() => { if(voices) setVoice(voices[5]) },[voices])

  const { 
    modules, 
    submodulesByModule,
    submoduleSelected,
    moduleSelected} = useSelector((state: RootSate) => state.modules);
  const { setModuleSelected, setSubmoduleSelected } = modulesSlice.actions;

  const handleSelectedModule = (module: ModuleTypes) => {
    dispatch(setModuleSelected(module))
  }

  const handleSelectedSubModule = (submodule: SubmoduleType) => {
    if(speechEnable) speak({text:'', voice})
    dispatch(setSubmoduleSelected(submodule))
    setTimeout(() =>{
      navigate('/contentsubmodule')
    },500)
  }


  return (
    <React.Fragment>
      {type === 'list' && section === "module" && (
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
       {type === 'list' && section === "submodule" && (
        <div className='module_viwer_container'>
          {submodulesByModule && submodulesByModule.length > 0 && submodulesByModule.map(submodule => (
            <div 
              key={submodule.Id} 
              className={submoduleSelected?.Id === submodule.Id ? "module_viwer_item m_v_i_selected" : "module_viwer_item"}
              title={submodule.Name} 
              onClick={() => handleSelectedSubModule(submodule)}              
             >
              {submodule.Name}
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  )
}