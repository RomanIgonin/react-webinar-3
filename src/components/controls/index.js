import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls(props) {
  const cartInfo = props.productCount ? `${props.productCount} товара / ${props.cost} ₽` : 'пусто';

  const callbacks = {
    openCart: () => {
      props.onOpenCart();
    },
  }

  return (
    <div className='Controls'>
      <div className='Cart-info'>В корзине: <div className='Cart-info-bold-text'>{cartInfo}</div></div>
      <button className='Button' onClick={callbacks.openCart}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: PropTypes.func,
  productCount: PropTypes.number,
  cost: PropTypes.number
};

Controls.defaultProps = {
  onOpenCart: () => {},
  productCount: 0,
  cost: 0
}

export default React.memo(Controls);
