import React from "react";

/* Components */
import { Button } from '../button';

import './modal.scss'

interface ModalTypes {
  title?: string;
  description?: string;
  buttonsQueantity?: number;
  actionLeft?: () => void;
  actionRight?: () => void;
  labelBtnLeft?: string;
  labelBtnRight?: string;
  labelUniqueBtn?: string;
  handleClose?: () => void;
}
export const Modal = ({
  title,
  description,
  buttonsQueantity,
  actionLeft,
  actionRight,
  labelBtnLeft,
  labelBtnRight,
  handleClose,
  labelUniqueBtn
}: ModalTypes) => {
  return (
    <React.Fragment>
      <div className="backWall" onClick={() => handleClose && handleClose()}/>
      <div className="modal_default"> 
        <h1 className="title_modal_def">{title|| "Entry a title"}</h1>
        <h4 className="description_modal_def">{description || "add a description here!"}</h4>
        {buttonsQueantity && (
          <React.Fragment>
            {buttonsQueantity === 1 && (
              <Button
                label={labelUniqueBtn||"Button center"}
              />
            )}
            {buttonsQueantity === 2 && (
              <div className="container_btn_def_modal">                
              <Button
                label={labelBtnLeft||"Btn left"}
                onClick={actionLeft && actionLeft}
                />
              <Button
              label={labelBtnRight|| "Btn Right"}
              onClick={actionRight && actionRight}

              />
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}