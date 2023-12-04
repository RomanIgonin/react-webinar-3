import React, {useCallback} from "react";
import PropTypes from "prop-types";
import Head from "../head";
import './style.css';

const Modal = (props) => {
  const callbacks = {
    closeModal: useCallback(() => {
      props.closeModal();
    }, [])
  }

  if (props.isModalOpen) {
    return (
      <div className='Overlay'>
        <div className='Modal'>
          <Head title={props.title} buttonTitle={props.buttonTitle} onClickButton={callbacks.closeModal}/>
          {props.children}
        </div>
      </div>
    )
  } else return <></>;
}

Modal.propTypes = {
  isModalOpen: PropTypes.bool,
  title: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.node
};

Modal.defaultProps = {
  isModalOpen: false,
  title: '',
  closeModal: () => {},
}

export default React.memo(Modal);
