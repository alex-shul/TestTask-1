import * as React from 'react';
import './Tips.sass';
import { Overlay, Tooltip } from 'react-bootstrap';
import { Info } from 'react-bootstrap-icons';

interface TipsProps {
  message: string
}

const Tips = ({ message }: TipsProps) => {
  const canBeShown = React.useRef(true);
  const [show, setShow] = React.useState(false);
  const [fixed, setFixed] = React.useState(false);
  const target = React.useRef(null);
  
  return (
    <>
      <span
        className='tips__toggle ml-2'
        ref={target}
        onMouseOver={() => canBeShown.current && setShow(true)}
        onMouseLeave={() => {
          if (!fixed) {
            setShow(false);
            setTimeout(() => {
              canBeShown.current = true;
            }, 100);
          }
        }}
        onClick={() => {
          if (fixed) {
            setFixed(false);
            setShow(false);
            canBeShown.current = false;
          } else {
            setFixed(true);
          }
        }}
      >
        {fixed ? <span className='icon'>&times;</span> : <Info className='icon' />}
      </span>
      <Overlay
        target={target.current}
        show={show}
        placement='bottom-start'
      >
        {(props) => (
          <Tooltip id='tips__overlay' {...props}>
            {message}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default Tips;