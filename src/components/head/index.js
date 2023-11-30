import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, buttonTitle, onClickButton}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {buttonTitle && (
        <button className='Head-button' onClick={onClickButton}>{buttonTitle}</button>
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
