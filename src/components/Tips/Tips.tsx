import * as React from 'react';
import './Tips.sass';
import PropTypes from 'prop-types';
import { Overlay, Tooltip } from 'react-bootstrap';
import { Info } from 'react-bootstrap-icons';

interface TipsProps {
  message: string
}

const Tips = ({ message }: TipsProps) => {
  const canBeShown = React.useRef(true);
  const [show, setShow] = React.useState(false);
  const target = React.useRef(null);
  
  return (
    <>
      <span
        className='tips__toggle ml-2'
        ref={target}
        onMouseOver={() => canBeShown.current && setShow(true)}
        onMouseLeave={() => {
          setTimeout(() => {
            canBeShown.current = true;
          }, 100);
        }}
        onClick={() => {
          canBeShown.current = false;
          setShow(false);
        }}
      >
        {show ? <span className='icon'>&times;</span> : <Info className='icon' />}
      </span>
      <Overlay
        target={target.current}
        show={show}
        placement="bottom-start"
      >
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {message}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

Tips.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Tips;