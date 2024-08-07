import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";

const ButtonOnClick = ({onClick, children, className}) => {

  return(
    <Button onClick={onClick} className={className}>{ children }</Button>
  );
};

ButtonOnClick.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default ButtonOnClick;