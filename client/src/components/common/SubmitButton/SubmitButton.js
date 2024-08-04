import { Button } from "react-bootstrap";

const SubmitButton = ({className, children}) => {

  return(
    <Button className={className}>{ children }</Button>
  );
};

export default SubmitButton;