import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowDown,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './selector.scss'

interface SelectorTypes {
  values: any[];
  keyValue?: string;
  keyItem?: string;
  selectedValue?: string | number;
  setSelectedValue?: (e: any) => void;
  placeholder?: string;
  width?: number|string
}
export const Selector = ({ 
  values, 
  keyValue, 
  keyItem,
  selectedValue,
  setSelectedValue,
  placeholder,
  width
}: SelectorTypes) => {
  const [open, setOpen] = useState(false);

  const handleSelectValue = (v:any) => {
    setOpen(false)
    setSelectedValue && setSelectedValue(v)
  }

  return (
    <div className="selector_root" style={{ width: width || 270 }}>
      <div className="selector_default_container" onClick={() => setOpen(!open)}>
        <p>
          { selectedValue || placeholder || "" }
        </p>
        {!open && <FontAwesomeIcon icon={faArrowDown} className="selector_arrow_icon" onClick={() => setOpen(!open)}/>}
        {open && <FontAwesomeIcon icon={faArrowUp} className="selector_arrow_icon" onClick={() => setOpen(!open)}/>}
      </div>
      {open && (
        <div className='selector_list_opened' style={{ width: width || 270 }}>
          { values && values.map((v, i) => (
            <p 
            key={i}
            onClick={() => handleSelectValue(v)}
            >
              {keyItem ? v[keyItem] : ''}
            </p>
          )) }
        </div>
      )}
    </div>

  )
}