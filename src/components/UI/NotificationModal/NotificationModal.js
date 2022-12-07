import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './NotificationModal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  const {animation} =props;

  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const NotificationModal = (props) => {
  const {animation} =props;
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onHideModal} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay animation={animation}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default NotificationModal;
