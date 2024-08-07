import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";

const SubmitButton = ({className, children}) => {

  return(
    <Button className={className}>{ children }</Button>
  );
};

SubmitButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SubmitButton;