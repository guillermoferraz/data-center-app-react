import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootSate, useAppDispatch } from '../../hooks/hooks';
import { ModuleTypes, SubmoduleType } from '../../schema/modules/module.types';
import { ModuleSchema, SubmodulesSchema } from '../../schema/modules/modules.schema';
import './cardInfo.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleInfo,
  faFilePen,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import { es } from '../../schema/voice/dictionary';

/* Components */
import { Modal } from '../modal';
import { Alert } from '../alert';

/* Store */
import moduleSlice, { deleteModule, getModules } from '../../store/modules/modules';

export const CardInfo = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  /* Speech */
  const { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  useEffect(() => { if (voices) setVoice(voices[5]) }, [voices])

  const { modules, moduleSelected, submodulesByModule, deleteModuleResponse, submoduleSelected } = useSelector((state: RootSate) => state.modules);
  const { speechEnable } = useSelector((state: RootSate) => state.speech);
  const { setCleanDeleteModuleResponse, setModuleSelected, setSubmoduleSelected , setSubmoduleByModule, setEditModule, setEditSubmodule} = moduleSlice.actions;

  const [total, setTotal] = useState(0);
  const [privates, setPrivates] = useState(0);
  const [publics, setPublics] = useState(0);
  const [dataModule, setDataModule] = useState<ModuleTypes>({ ...ModuleSchema });

  const [subPrivates, setSubPrivates] = useState(0);
  const [subPublics, setSubPublics] = useState(0);
  const [subData, setSubData] = useState<SubmoduleType[]>([{ ...SubmodulesSchema }])

  const [alertDelete, setAlertDelete] = useState<{ title: string, description: string, active: boolean }>({ title: '', description: '', active: false });
  const [openModalDelete, setOpenModalDelete] = useState(false);

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

  useEffect(() => {
    if (submodulesByModule && submodulesByModule.length > 0) {
      setSubData(submodulesByModule)
      setSubPrivates(submodulesByModule.filter(s => s.Private).length);
      setSubPublics(submodulesByModule.filter(s => !s.Private).length);

    } else {
      setSubData([{ ...SubmodulesSchema }])
      setSubPrivates(0);
      setSubPublics(0);
    }
  }, [submodulesByModule])

  //console.log('module selected:', moduleSelected)

  const handleInfoModules = () => {
    if (total > 0) {
      speak({ text: es.infoModules_1 + total + ' ' + es.words.modules, voice })
      speak({ text: privates + ' ' + es.words.privates + ' ' + es.words.and + ' ' + publics + ' ' + es.words.modules + ' ' + es.words.publics, voice })
    }
  }
  const handleInfoSubmodules = () => {
    let subModulesTotal = subData && subData.length > 0 && subData[0].Id !== undefined ? subData.length : 0;
    if (moduleSelected?.Id && subModulesTotal > 0) {
      const fixedOne = (count: number) => {
        if (count === 1) {
          return es.words.one
        } else {
          return count
        }
      }
      speak({
        text: es.words.the +
          ' ' +
          es.words.module +
          ' ' +
          moduleSelected?.Name +
          ' ' +
          es.haveATotal +
          ' ' +
          fixedOne(subData.length) +
          ' ' +
          es.words.submodules +
          ';' +
          fixedOne(subPrivates) +
          ' ' +
          es.words.submodules + ' ' + es.words.privates + ' ' + es.words.and +
          ' ' +
          fixedOne(subPublics) + ' ' + es.words.submodules + ' ' + es.words.publics
        ,
        voice
      })
    } else if (moduleSelected?.Id && subModulesTotal === 0) {
      speak({ text: es.words.the + ' ' + es.words.module + ' ' + moduleSelected?.Name + ' ' + es.dontExistSubmodules, voice })
    } else {
      speak({ text: es.errorSubmodules_1, voice })
    }
  }

  const cleanResponseDelete = () => {
    setOpenModalDelete(false)
    setTimeout(() =>{
      setAlertDelete({ title: '', description: '', active: false });
      dispatch(setCleanDeleteModuleResponse())
    },1500) 
    if (location.pathname !== '/Dashboard') navigate('/Dashboard')
  }

  useEffect(() => {
    if (deleteModuleResponse?.status === 200 || deleteModuleResponse?.status === 500) {
      if (deleteModuleResponse?.status === 200) {
        setAlertDelete({ title: 'Delete Successfully', description: deleteModuleResponse?.message || "", active: true })
        if(moduleSelected.Id === submoduleSelected.ModuleId){
          dispatch(setSubmoduleSelected({ ...SubmodulesSchema }))
          dispatch(setSubmoduleByModule())
        }
        dispatch(setModuleSelected({ ...ModuleSchema }))
        dispatch(getModules())
        speechEnable && speak({ text: es.success.deleteModule, voice })
        cleanResponseDelete()
      }
      if (deleteModuleResponse?.status === 500) {
        setAlertDelete({ title: 'Error on delete', description: deleteModuleResponse?.message || "", active: true })
        speechEnable && speak({ text: es.errors.deleteModule, voice })
        cleanResponseDelete()         
      }
    } else {
      setAlertDelete({ title: '', description: '', active: false });
    }
  }, [deleteModuleResponse])

  const handleDelete = () => {
    speechEnable && speak({ text: es.words.delete + ' ' + moduleSelected?.Name, voice })
    setOpenModalDelete(!openModalDelete)
  }
  const handleEdit = () => {
    speechEnable && speak({ text: es.words.edit + ' ' + submoduleSelected?.Name, voice })
    dispatch(setEditSubmodule(false))
    dispatch(setEditModule(true))
    navigate('/editmodules')
 }

  const sendDelete = () => {
    dispatch(deleteModule(moduleSelected?.Id || ""))
  }

  return (
    <React.Fragment>
      {alertDelete.active && (<Alert size="big" title="Successs" description="Module deleted successfully"/>)}
      {openModalDelete && (
        <Modal
          title="Delete module"
          description={`Sure you want to remove the module ${moduleSelected?.Name !== undefined ? moduleSelected?.Name: ''} ?`}
          buttonsQueantity={2}
          handleClose={() => setOpenModalDelete(false)}
          labelBtnLeft="Cancel"
          labelBtnRight="Delete"
          actionLeft={() => setOpenModalDelete(false)}
          actionRight={() => sendDelete()}
        />
      )}
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
            <h1 className='cnt_total_m_title'>Info Submodules
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="icon_info_small"
                title='Info'
                onClick={() => handleInfoSubmodules()}
              />
            </h1>
          </div>
          {dataModule?.Id === undefined && (
            <div className='tbl_r_i'>
              <p style={{ width: '100%', textAlign: 'center', textTransform: 'uppercase' }}>No module selected</p>
            </div>
          )}
          <React.Fragment>
            {dataModule?.Name && (
              <div className='tbl_r_i icons_small'>
                <FontAwesomeIcon icon={faFilePen} title="Edit" onClick={() => handleEdit()}/>
                <FontAwesomeIcon icon={faTrashCan} title="Delete" onClick={() => handleDelete()}/>
              </div>
            )}
            <div className='tbl_r_i'>
              <p style={{ width: '100%', textAlign: 'center', textTransform: 'uppercase' }}>{dataModule?.Name}</p>
            </div>
            {subData && subData.length > 0 && subData[0].Id !== undefined && (
              <React.Fragment>
                <div className='tbl_r_i'>
                  <p>Submodules</p>
                  <p />
                  <p>{subData.length}</p>
                </div>
                <div className='tbl_r_i'>
                  <p>Publics</p>
                  <p />
                  <p>{subPublics}</p>
                </div>
                <div className='tbl_r_i'>
                  <p>Privates</p>
                  <p />
                  <p>{subPrivates}</p>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  )
}