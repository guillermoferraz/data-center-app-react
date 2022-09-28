import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootSate } from '../../hooks/hooks';
import { ModuleTypes } from '../../schema/modules/module.types';
import { ModuleSchema } from '../../schema/modules/modules.schema';
import './cardInfo.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCircleInfo
} from '@fortawesome/free-solid-svg-icons';
import { es } from '../../schema/voice/dictionary';

export const CardInfo = () => {
  /* Speech */
  const  { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  useEffect(() => { if(voices) setVoice(voices[5]) },[voices])
  
  const { modules, moduleSelected } = useSelector((state: RootSate) => state.modules);

  const [total, setTotal] = useState(0);
  const [privates, setPrivates] = useState(0);
  const [publics, setPublics] = useState(0);
  const [dataModule, setDataModule] = useState<ModuleTypes>({ ...ModuleSchema });

  useEffect(() => {
    if (modules && modules.length > 0) {
      setTotal(modules.length)
      setPrivates(modules.filter(m => m?.Private).length)
      setPublics(modules.filter(m => !m?.Private).length)
    }
  }, [modules])

  useEffect(() => {
    if (moduleSelected?.Id) {
      setDataModule(moduleSelected)
    }
  }, [moduleSelected])

  //console.log('module selected:', moduleSelected)

  const handleInfoModules = () => {
    if(total > 0){
      speak({ text: es.infoModules_1 + total + ' ' + es.words.modules ,voice })
      speak({ text: privates + ' ' + es.words.privates + ' ' + es.words.and + ' ' + publics + ' ' + es.words.modules + ' ' + es.words.publics , voice })
    }
  }
  const handleInfoSubmodules = () => {
    let subModulesTotal = 0;
    if(moduleSelected?.Id && subModulesTotal > 0){
      speak({ text: es.inDevelopment, voice })
    } else if(moduleSelected?.Id && subModulesTotal === 0) {
      speak({ text: es.words.the +' '+ es.words.module + ' ' + moduleSelected?.Name +' '+ es.dontExistSubmodules, voice })
    } else {
      speak({ text: es.errorSubmodules_1, voice })
    }
  }

  return (
    <div className="card_info_root">
      <div className='card_info_row_1'>
        <div className='container_total_modules'>
          <h1 className='cnt_total_m_title'>Info Modules
          <FontAwesomeIcon 
            icon={faCircleInfo} 
            className="icon_info_small" 
            title='Info' 
            onClick={() => handleInfoModules()}
            />
          </h1>
        </div>
        <div className='cnt_t_m_tbl_r_1'>
          <div className='tbl_r_i'>
            <p>Total</p>
            <p />
            <p>{total}</p>
          </div>
          <div className='tbl_r_i'>
            <p>Publics</p>
            <p />
            <p>{publics}</p>
          </div>
          <div className='tbl_r_i'>
            <p>Privates</p>
            <p />
            <p>{privates}</p>
          </div>
        </div>
        <div className='container_total_modules'>
          <h1 className='cnt_total_m_title'>Selected Module
          <FontAwesomeIcon 
            icon={faCircleInfo} 
            className="icon_info_small" 
            title='Info' 
            onClick={() => handleInfoSubmodules()}
            />
          </h1>
        </div>
        {dataModule?.Id === undefined &&(
           <div className='tbl_r_i'>
           <p style={{ width:'100%', textAlign: 'center', textTransform: 'uppercase' }}>No module selected</p>
         </div>
        )}
        {dataModule?.Id && (
          <React.Fragment>
            <div className='tbl_r_i'>
              <p style={{ width:'100%', textAlign: 'center', textTransform: 'uppercase' }}>{dataModule?.Name}</p>
            </div>
            <div className='tbl_r_i'>
              <p>Submodules</p>
              <p />
              <p>0</p>
            </div>
            <div className='tbl_r_i'>
              <p>Publics</p>
              <p />
              <p>0</p>
            </div>
            <div className='tbl_r_i'>
              <p>Privates</p>
              <p />
              <p>0</p>
            </div>
          </React.Fragment>
        )}

        <div className='container_total_modules'>
          <h1 className='cnt_total_m_title'>Info Submodules</h1>
        </div>
      </div>
    </div>
  )
}