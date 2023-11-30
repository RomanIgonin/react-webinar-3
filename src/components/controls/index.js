import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onOpenCart, productCount, cost}) {
  return (
    <div className='Controls'>
      <div className='Cart-info'>В корзине: <div className='Cart-info-bold-text'>{productCount} товара / {cost} ₽</div></div>
      <button className='Button' onClick={() => onOpenCart()}>Перейти</button>
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
