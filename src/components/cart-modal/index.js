import React, {useCallback} from "react";
import PropTypes from "prop-types";
import ReactModal from 'react-modal';
import Head from "../head";
import List from "../list";
import './style.css';

const CartModal = (props) => {
  ReactModal.setAppElement('#root');

  const callbacks = {
    closeModal: useCallback(() => {
      props.closeModal();
    }, []),
    onClickRemoveItem: useCallback((code) => {
      props.onClickRemoveItem(code);
    }, [])
  }

  return (
    <ReactModal
      isOpen={props.isModalOpen}
      onRequestClose={props.closeModal}
      className='Cart-modal'
      overlayClassName="Overlay"
    >
      <Head title={'Корзина'} buttonTitle={'Закрыть'} onClickButton={callbacks.closeModal}/>
      <div className='Cart-list'>
        {props.cart.length > 0 ? (
          <>
            <List list={props.cart} onClickButton={callbacks.onClickRemoveItem} isCart={true}/>
            <div className='Cart-total'>
              <div>Итого</div>
              <div className='Cart-total-sum'>&nbsp;&nbsp;{props.totalCost} ₽</div>
            </div>
          </>
        ) : (
          <div className='Cart-empty'>Корзина пуста</div>
        )}
      </div>
    </ReactModal>
  )
}

CartModal.propTypes = {
  isModalOpen: PropTypes.bool,
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  totalCost: PropTypes.number,
  closeModal: PropTypes.func,
  onClickRemoveItem: PropTypes.func,
};

CartModal.defaultProps = {
  isModalOpen: false,
  cart: [],
  totalCost: 0,
  closeModal: () => {},
  onClickRemoveItem: () => {},
}

export default React.memo(CartModal);
