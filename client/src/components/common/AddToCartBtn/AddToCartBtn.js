import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCartRequest } from '../../../redux/orderItemsRedux';
import { Button } from 'react-bootstrap';
import styles from '../AddToCartBtn/AddToCartBtn.module.scss';
import { useNavigate } from 'react-router-dom';

const AddToCartBtn = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCartRequest(item));
    navigate('/cart');
  };

  return <Button onClick={handleAddToCart} className={styles.button}>Add to Cart</Button>;
};

AddToCartBtn.propTypes = {
  item: PropTypes.object.isRequired,
};

export default AddToCartBtn;