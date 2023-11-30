import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onClickButton, isCart}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onClickButton={onClickButton} isCart={isCart}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClickButton: PropTypes.func,
  isCart: PropTypes.bool
};

List.defaultProps = {
  onClickButton: () => {},
  isCart: false
}

export default React.memo(List);
