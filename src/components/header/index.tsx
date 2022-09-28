import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootSate, useAppDispatch } from '../../hooks/hooks';
import './header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faExpand, 
  faMinimize, 
  faPowerOff,
  faVolumeHigh,
  faVolumeMute
} from '@fortawesome/free-solid-svg-icons';

import userSlice from '../../store/user/user';
import speechSlice from '../../store/speech/speech';
import { useSelector } from 'react-redux';
import { es } from '../../schema/voice/dictionary';

export const Header = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /* Speech */
  const  { useSpeechSynthesis } = require('react-speech-kit');
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(null);
  useEffect(() => { if(voices) setVoice(voices[5]) },[voices])

  const { setCleanUserData } = userSlice.actions;
  const { speechEnable } = useSelector((state: RootSate) => state.speech);
  const { userData } = useSelector((state: RootSate) => state.user);
  const { setEnableSpeech } = speechSlice.actions;
  const [isExpand, setIsExpand] = useState(false);
  const [change, setCahnge] = useState(false);

  useEffect(() => {
    if (!document.fullscreenElement) setIsExpand(false)
    if (document.fullscreenElement) setIsExpand(true)
    setCahnge(false)
  }, [change])

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setCahnge(!change)
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setCahnge(!change)

    }
  }

  const handleLogout = () => {
    if(speechEnable) speak({ text: es.logout + userData.Firstname, voice})
    dispatch(setCleanUserData({ value: null }));
    sessionStorage.removeItem('dc_tkn');
    navigate('/');
  }

  return (
    <nav className='header_root'>
      <h1 className='official_title' style={{ fontSize: 14, marginLeft: 8, height: '100%', display:'flex', alignItems: 'center' }}>Data Center</h1>
      <div style={{ marginInlineStart: 'auto', height: '100%', width: 'max-content', display: 'flex', alignItems: 'center' }}>
        <div className='container_logout'>
          <FontAwesomeIcon icon={faPowerOff} className="icon_expand" onClick={() => handleLogout()} title="Logout" />
        </div>
        <div className='container_logout'>
          { speechEnable && <FontAwesomeIcon icon={faVolumeHigh} className="icon_expand" onClick={() => dispatch(setEnableSpeech({ value: false }))} />}
          { !speechEnable && <FontAwesomeIcon icon={faVolumeMute} className="icon_expand" onClick={() => dispatch(setEnableSpeech({ value: true }))} />}
        </div>
        <div className='container_icons_expand'>
          {isExpand && (<FontAwesomeIcon icon={faExpand} className="icon_expand" onClick={toggleFullScreen} title="FullScreen mode" />)}
          {!isExpand && (<FontAwesomeIcon icon={faMinimize} className="icon_expand" onClick={toggleFullScreen} title="Quit FullScreen mode" />)}
        </div>
      </div>
    </nav>
  )
}