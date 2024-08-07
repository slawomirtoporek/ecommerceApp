import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, getCartTotal } from "../../../redux/orderItemsRedux";
import { postOrderRequest } from "../../../redux/ordersRedux";
import { clearCartRequest } from "../../../redux/orderItemsRedux";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../OrderForm/OrderForm.module.scss";

const OrderForm = () => {

  const navigate = useNavigate();
  const items = useSelector(getCartItems);
  const subtotal = useSelector(getCartTotal);
  const dispatch = useDispatch();

  const orderItems = [];

  items.map((item) => orderItems.push({ albumId: item.id, quantity: item.quantity, price: item.price }));

  const deliveryOptions = [
    { value: 'POST', label: 'Post 10$', price: 10 },
    { value: 'COURIER', label: 'Curier 13$', price: 13 },
  ];

  const [selectedDelivery, setSelectedDelivery] = useState('POST');
  const [deliveryPrice, setDeliveryPrice] = useState(10);
  const [total, setTotal] = useState(subtotal + deliveryPrice);
  const [comment, setComment] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  const handleChange = (event) => {
    const selectedOption = deliveryOptions.find(option => option.value === event.target.value);
    setSelectedDelivery(selectedOption.value);
    setDeliveryPrice(selectedOption.price);
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleChangeData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phoneNumber.trim() !== '' &&
      selectedDelivery &&
      subtotal &&
      total &&
      orderItems.length > 0
    ) {
      await dispatch(postOrderRequest({
        ...formData, comment: comment, status: "ordered", delivery: selectedDelivery, priceProducts: subtotal, totalAmount: total, orderItems
      }));

      await dispatch(clearCartRequest());

      navigate('/thankyou');
    };
  };

  useEffect(() => {
    const newTotal = parseFloat(subtotal) + parseFloat(deliveryPrice);
    setTotal(newTotal);
    }, [subtotal, deliveryPrice]);

  return (
    <Container>
      <Row>
        <Card className={`d-flex align-items-center ${styles.fullHeightContainer}`}>
          <Col lg={6} className='d-flex justify-content-around w-auto'>
            <div className="mb-3">
              <h5 className='my-4'>Order</h5>
              <ul className={`${styles.cartList} p-0`}>
                {items && items.map((item, index) => (
                  <li key={index}  className='p-2'>
                      <p className='d-inline'>{item.title} - {item.quantity} x {item.price}</p> 
                  </li>
                ))}
              </ul>
              <Form.Group>
                <Form.Label>Delivery: </Form.Label>
                <div className="d-flex flex-direction-row">
                  {deliveryOptions.map(option => (
                    <Form.Check
                    className="ms-3"
                      key={option.value}
                      type="radio"
                      id={option.value}
                      label={option.label}
                      name="delivery"
                      value={option.value}
                      checked={selectedDelivery === option.value}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group controlId="formOrderComment" className="mt-2">
                <Form.Label>Order comment:</Form.Label>
                <Form.Control
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={handleChangeComment}
                />
              </Form.Group>
              <div className='d-flex justify-content-end align-items-center me-2 mt-2'>
                <p className='fw-bolder m-0'>Subtotal: ${subtotal && parseFloat(subtotal).toFixed(2)}</p>
              </div>
              <div className='d-flex justify-content-end align-items-center me-2'>
                <p className='fw-bolder m-0'>Delivery Cost: ${parseFloat(deliveryPrice).toFixed(2)}</p>
              </div>
              <div className='d-flex justify-content-end align-items-center me-2'>
                <p className='fw-bolder m-0'>Total: ${total && total.toFixed(2)}</p>
              </div>
            </div>
          </Col>
        </Card>
        <Card className="mt-3 d-flex align-items-center">
          <h5 className='mt-3'>Order Form</h5>
          <Col lg={5}>
            <div className="w-100">
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label className={styles.label}>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChangeData}
                  placeholder="Enter your first name"
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label className={styles.label}>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChangeData}
                  placeholder="Enter your last name"
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label className={styles.label}>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChangeData}
                  placeholder="Enter your address"
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label className={styles.label}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChangeData}
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label className={styles.label}>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChangeData}
                  placeholder="Enter your phone number"
                />
              </Form.Group>
              <div className='d-flex justify-content-center'>
              <Button onClick={handleSubmit} type="submit" className={`${styles.button} my-3`}>Order</Button>
              </div>
            </Form>
            </div>
          </Col>
        </Card>
      </Row>
    </Container>
  );
};

export default OrderForm;