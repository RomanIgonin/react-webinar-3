import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural, priceFormat} from "../../utils";

function Controls(props) {
  const pluralWord = plural(props.productCount, {
    one: 'товар',
    few: 'товара',
    many: 'товаров'
  });
  const cost = priceFormat(props.cost);
  const cartInfo = props.productCount ? `${props.productCount} ${pluralWord} / ${cost} ₽` : 'пусто';

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
