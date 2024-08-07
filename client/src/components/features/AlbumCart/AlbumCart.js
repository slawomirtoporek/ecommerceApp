import { useDispatch, useSelector } from 'react-redux';
import {
  getCartItems,
  getCartTotal,
  removeFromCartRequest,
  clearCartRequest,
  updateCartItemRequest
} from '../../../redux/orderItemsRedux';
import NumberItems from '../../common/NumberItems/NumberItems';
import styles from '../AlbumCart/AlbumCart.module.scss';
import ButtonOnClick from '../../common/ButtonOnClick/ButtonOnClick';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


const AlbumCart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(getCartItems);
  const total = useSelector(getCartTotal);

  const handleIncrease = (index) => {
    if (items && index >= 0 && index < items.length) {
      const item = items[index];
      if (item?.quantity !== undefined) {
        const newQuantity = item.quantity + 1;
        dispatch(updateCartItemRequest(index, newQuantity));
      }
    }
  };
  
  const handleDecrease = (index) => {
    if (items && index >= 0 && index < items.length) {
      const item = items[index];
      if (item?.quantity !== undefined && item.quantity > 0) {
        const newQuantity = item.quantity - 1;
        dispatch(updateCartItemRequest(index, newQuantity));
      }
    }
  };

  const handleRemove = (index) => {
    dispatch(removeFromCartRequest(index));
  };

  const handleClearCart = () => {
    dispatch(clearCartRequest());
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleOrder = () => {

  };

  if (!items.length) {
    return (
      <Container>
        <Row>
          <Card className={`d-flex align-items-center ${styles.fullHeightContainer}`}>
            <Col lg={6} className='d-flex justify-content-around w-auto m'>
              <div>
                <h3 className='my-4'>Your cart is empty</h3>
                <ButtonOnClick onClick={() => navigate('/')} className={styles.button}>Go back to the homepage</ButtonOnClick>
              </div>
            </Col>
          </Card>
        </Row>
      </Container>
    );
  };

  return(
    <Container className='full-height-container'>
      <Row>
        <Card className={`d-flex align-items-center ${styles.fullHeightContainer}`}>
          <Col lg={6} className='d-flex justify-content-around w-auto'>
            <div>
              <h3 className='my-4'>Cart</h3>
              <ul className={`${styles.cartList} p-0`}>
              {items && items.map((item, index) => (
                <li key={index}  className='p-3'>
                  <div className='m-2'>
                    <h5 className='d-inline'>{item.title}</h5> 
                  </div>
                  <div className='mx-2'>
                    <NumberItems numberItems={item.quantity} stock={item.stock} actMinus={() => handleDecrease(index)} actPlus={() => handleIncrease(index)} /> {item.price}$
                    <ButtonOnClick onClick={() => handleRemove(index)} className={`${styles.button} ${styles.btnTrash}`}>
                      <FontAwesomeIcon className={styles.icon} icon={faTrashCan} />
                    </ButtonOnClick>
                  </div>
                </li>
              ))}
              </ul>
              <div className='d-flex justify-content-between align-items-center my-3'>
                <ButtonOnClick onClick={handleClearCart} className={styles.button}>Clear Cart</ButtonOnClick>
                <p className='mx-2 fw-bolder'>Total: ${total && parseFloat(total).toFixed(2)}</p>
              </div>
              <div className='d-flex justify-content-end'>
                <ButtonOnClick onClick={handleContinueShopping} className={styles.button}>Continue shopping</ButtonOnClick>
                <ButtonOnClick onClick={handleOrder} className={styles.button}>Order</ButtonOnClick>
              </div>
            </div>
          </Col>
        </Card>
      </Row>
    </Container>
  );
};

export default AlbumCart;