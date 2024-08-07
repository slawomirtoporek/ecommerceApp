import { Button } from "react-bootstrap";

const ButtonOnClick = ({onClick, children, className}) => {

  return(
    <Button onClick={onClick} className={className}>{ children }</Button>
  );
};

export default ButtonOnClick;