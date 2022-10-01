import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootSate, useAppDispatch } from "../../hooks/hooks";
/* Components */
import { Header } from "../../components/header";
import { PrincipalMenu } from "../../components/principalMenu";
import { Alert } from "../../components/alert";
import { CardInfo } from "../../components/cardInfo";
import { Modal } from "../../components/modal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFilePen,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';


import './contentSubmodule.scss';
import { es } from "../../schema/voice/dictionary";

/* Store */
import moduleSlice ,{ deleteSubmodule, getSubmodulesByModule } from "../../store/modules/modules";

export const ContentSubmodule = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /* Speech */
  const  { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  useEffect(() => { if(voices) setVoice(voices[5]) },[voices])

  const { userData } = useSelector((state: RootSate) => state.user);
  const { submoduleSelected, showInfoCard, deleteSubmoduleResponse, moduleSelected } = useSelector((state: RootSate) => state.modules);
  const { setCleanDeleteSubmoduleResponse, setEditModule, setEditSubmodule } = moduleSlice.actions;
  const { speechEnable } = useSelector((state: RootSate) => state.speech);

  const [alert, setAlert] = useState(false);
  const [alertDelete, setAlertDelete] = useState<{title: string, description: string, active: boolean}>({ title: '', description: '', active: false });
  const [openModalDelete, setOpenModalDelete] = useState(false);


  const checkUser = () => {
    if (!userData || userData?.status === 409) {
      setAlert(true)
    } else {
      setAlert(false)
    }
  }

  useEffect(() => {
    setAlert(false)
    setTimeout(() => { checkUser() }, 600)
  }, [userData])

  useEffect(() => {
    if(submoduleSelected?.Id !== undefined){
      const el = (document.getElementById(`content_submodle-${submoduleSelected?.Id}`) as HTMLDivElement);
      if(el){
        el.innerHTML=submoduleSelected.Content||"";
        let anchors = el.getElementsByTagName('a');
        for (let i = 0; i<anchors.length; i++){
          anchors[i].setAttribute('target', '_blank');
        }

      }
    }
  },[submoduleSelected])

  const handleEdit = () => {
     speechEnable && speak({ text: es.words.edit + ' ' + submoduleSelected?.Name, voice })
     dispatch(setEditModule(false))
     dispatch(setEditSubmodule(true))
     navigate('/editmodules')
  }
  const handleDelete = () => {
    speechEnable && speak({ text: es.words.delete + ' ' + submoduleSelected?.Name, voice })
    setOpenModalDelete(!openModalDelete)
  }

  const cleanResponseDelete = () => {
    dispatch(setCleanDeleteSubmoduleResponse())
    setAlertDelete({ title: '', description: '', active: false });
    setOpenModalDelete(false)
    navigate('/Dashboard')
  }


  useEffect(() =>{
    if(deleteSubmoduleResponse?.status === 200 || deleteSubmoduleResponse?.status === 500){
      if(deleteSubmoduleResponse?.status === 200){
        dispatch(getSubmodulesByModule(moduleSelected?.Id||""))
        setAlertDelete({ title: 'Delete Successfully', description: deleteSubmoduleResponse?.message||"", active: true })
        speak({ text: es.success.deleteSubmodule ,voice })
        cleanResponseDelete()
      } 
      if(deleteSubmoduleResponse?.status === 500){
        setAlertDelete({ title: 'Error on delete', description: deleteSubmoduleResponse?.message||"", active: true })
        speak({ text: es.errors.deleteSubmodule, voice })
        cleanResponseDelete()
      } 
    } else {
      setAlertDelete({ title: '', description: '', active: false });
    }
  },[deleteSubmoduleResponse])

  const sendDelete = () => {
    dispatch(deleteSubmodule(submoduleSelected?.Id||""))
  }

  return (
    <div className="page_root">
      <Header />
      {alert && (<Alert size="big" title="Denied!" description="You do not have permissions for that section" loading action="/" />)}
      <div className="content_root">
        <PrincipalMenu />
        <div className="container_root">
          {openModalDelete && (
            <Modal
              title="Delete submodule"
              description={`Sure you want to remove the submodule ${submoduleSelected?.Name} ?`}
              buttonsQueantity={2}
              handleClose={() => setOpenModalDelete(false)}
              labelBtnLeft="Cancel"
              labelBtnRight="Delete"
              actionLeft={() => setOpenModalDelete(false)}
              actionRight={() => sendDelete()}
            />
          )}
          <nav className="nav_edit_contentsubmodule">
            <FontAwesomeIcon 
              icon={faFilePen} 
              className="icons_edit_menu_contentsubmodule" 
              title="Edit"
              onClick={() => handleEdit()}
            />
            <FontAwesomeIcon 
              icon={faTrashCan} 
              className="icons_edit_menu_contentsubmodule" 
              title="Delete"
              onClick={() => handleDelete()}
            />
          </nav>
          {showInfoCard && <CardInfo/>}
          {submoduleSelected?.Id !== undefined && <div className="content_editor" id={`content_submodle-${submoduleSelected?.Id}`}/>}
        </div>
      </div>
    </div>
  )
};