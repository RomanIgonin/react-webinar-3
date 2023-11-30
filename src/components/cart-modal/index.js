import React from "react";
import PropTypes from "prop-types";
import ReactModal from 'react-modal';
import Head from "../head";
import List from "../list";
import './style.css';

const CartModal = ({isModalOpen, closeModal, onClickRemoveItem, list}) => {
  ReactModal.setAppElement('#root');

  const callbacks = {
    closeModal: () => {
      closeModal();
    },
    onClickRemoveItem: () => {
      onClickRemoveItem();
    }
  }

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className='Cart-modal'
      overlayClassName="Overlay"
    >
      <Head title={'Корзина'} buttonTitle={'Закрыть'} onClickButton={callbacks.closeModal}/>
      {list.length > 0 ? (
        <List list={list} onClickButton={callbacks.onClickRemoveItem} isCart={true}/>
      ) : (
        <div className='Cart-empty'>Корзина пуста</div>
      )}

    </ReactModal>
  )
}

CartModal.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  onClickRemoveItem: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
};

CartModal.defaultProps = {
  isModalOpen: false,
  list: [],
  closeModal: () => {},
  onClickRemoveItem: () => {},
}

export default CartModal;
