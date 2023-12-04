import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {priceFormat} from "../../utils";

function Item(props) {
  const cn = bem('Item');
  const price = priceFormat(props.item.price);
  const buttonTitle = props.isCart ? 'Удалить' : 'Добавить';

  const callbacks = {
    onClickButton: () => {
      props.onClickButton(props.item.code);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{price}&nbsp;</div>
      {props.isCart && (
        <div className={cn('count')}>{props.item.count} шт</div>
      )}
      <div className={cn('actions')}>
        <button onClick={callbacks.onClickButton}>{buttonTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onClickButton: PropTypes.func,
  isCart: PropTypes.bool
};

Item.defaultProps = {
  onClickButton: () => {},
  isCart: false
}

export default React.memo(Item);
