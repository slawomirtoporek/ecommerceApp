import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import ButtonOnClick from '../../common/ButtonOnClick/ButtonOnClick';
import { useNavigate } from 'react-router-dom';
import styles from '../ThankYou/TkankYou.module.scss';

const ThankYou = () => {
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    navigate('/');
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card className='d-flex justify-content-center align-items-center self-items-center'>
            <Card.Body className={styles.fullHeightContainer}>
              <Card.Title className='text-center'>Thank You for Your Order!</Card.Title>
              <Alert variant="success">Your order has been successfully created.</Alert>
              <div className="d-flex justify-content-center">
                  <ButtonOnClick onClick={handleSubmit} className={styles.button}>Back to Home</ButtonOnClick>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ThankYou;