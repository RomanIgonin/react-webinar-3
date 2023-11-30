import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props) {
  const callbacks = {
    onClickButton: () => {
      props.onClickButton();
    },
  }

  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      {props.buttonTitle && (
        <button className='Head-button' onClick={callbacks.onClickButton}>{props.buttonTitle}</button>
      )}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  buttonTitle: PropTypes.node,
  onClickButton: PropTypes.func
};

Head.defaultProps = {
  buttonTitle: '',
  onClickButton: () => {},
}

export default React.memo(Head);
