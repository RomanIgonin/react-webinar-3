import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
  const buttonTitle = props.isCart ? 'Удалить' : 'Добавить';

  const callbacks = {
    onClickButton: () => {
      props.onClickButton(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{props.item.price}&nbsp;</div>
      {props.isCart && (
        <div className='Item-count'>{props.item.count} шт</div>
      )}
      <div className='Item-actions'>
        <button onClick={callbacks.onClickButton}>{buttonTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
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
