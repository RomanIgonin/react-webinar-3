import List from "../list";
import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {priceFormat} from "../../utils";

const Cart = (props) => {
  const cost = priceFormat(props.cost);

  const callbacks = {
    onClickRemoveItem: (code) => {
      props.onClickRemoveItem(code);
    }
  }

  return (
    <div className='Cart-list'>
      {props.cart.length > 0 ? (
        <>
          <List list={props.cart} onClickButton={callbacks.onClickRemoveItem} isCart={true}/>
          <div className='Cart-total'>
            <div>Итого</div>
            <div className='Cart-total-sum'>&nbsp;&nbsp;{cost} ₽</div>
          </div>
        </>
      ) : (
        <div className='Cart-empty'>Корзина пуста</div>
      )}
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  cost: PropTypes.number,
  onClickRemoveItem: PropTypes.func,
};

Cart.defaultProps = {
  cart: [],
  cost: 0,
  onClickRemoveItem: () => {},
}

export default React.memo(Cart);
