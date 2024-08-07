import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAlbumById, loadAlbumByIdRequest } from "../../../redux/albumsRedux";
import { Row, Col, Card, Container, ListGroup } from "react-bootstrap";
import { IMAGES_URL } from '../../../config';
import styles from '../AlbumData/AlbumData.module.scss';
import NumberItems from "../../common/NumberItems/NumberItems";
import AddToCartBtn from "../../common/AddToCartBtn/AddToCartBtn";

const AlbumData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const album = useSelector(state => getAlbumById(state, id));
  const [numberItems, setNumberItems] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    dispatch(loadAlbumByIdRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (album) {
      setPrice(numberItems * album.price);
    }
  }, [album, numberItems]);
  
  const plus = (e) => {
    e.preventDefault();
    const numberAlbum = numberItems + 1;
    setNumberItems(numberAlbum);
    setPrice(numberAlbum * album.price)
  }
  
  const minus = (e) => {
    e.preventDefault();
    const numberAlbum = numberItems - 1;
    if (numberAlbum >= 1) {
      setNumberItems(numberAlbum);
      setPrice(numberAlbum * album.price);
    } else {
      setNumberItems(numberAlbum);
      setPrice(numberAlbum * album.price);
    }
    setNumberItems(numberAlbum);
    setPrice(numberAlbum * album.price)
  }

  if (!album) {
    navigate('/');
    return <p>No album data</p>;
  }

  const releaseDate = album.releaseDate ? new Date(album.releaseDate).toISOString().split('T')[0] : null;

  return(
    <Container>
      <Row >
        <Card className="d-flex flex-lg-row flex-md-row p-0">
          <Col xs={12} md={6} lg={7} className="p-3">
            {album.images && album.images.length > 0 && album.images.map(albumImg => (
              <div className='img-fluid' key={albumImg.id}>
                <Card.Img key={albumImg.id} variant="top" className='img-fluid' src={`${IMAGES_URL}/${albumImg.url}`} alt={album.title} />
              </div>
            ))}
          </Col>
          <Col xs={12} md={6} lg={5}>
            <Card.Body  className={`${styles.cardData} ps-0`}>
              <div className="d-flex justify-content-between">
                <Card.Title className="py-2 ps-3">{album.title}</Card.Title>
                <Card.Title className="py-2 ps-3 me-3">{album.price}$</Card.Title>
              </div>
              <ListGroup>
                <ListGroup.Item className={styles.listItem}><span className={styles.spanList}>Author: </span>{album.artist}</ListGroup.Item>
                <ListGroup.Item><span className={styles.spanList}>Genre: </span>{album.genre}</ListGroup.Item>
                <ListGroup.Item className={styles.listItem}>
                  <span className={styles.spanList}>Release date: </span>{releaseDate}
                </ListGroup.Item>
                <ListGroup.Item><span className={styles.spanList}>Format: </span>{album.format}</ListGroup.Item>
                <ListGroup.Item className={styles.listItem}><span className={styles.spanList}>Price: </span>{album.price}</ListGroup.Item>
              </ListGroup>
              <Card.Body className="d-flex justify-content-center align-self-center">
                <Card.Text className="d-inline m-0"><NumberItems numberItems={numberItems} actPlus={plus} actMinus={minus} stock={album.stock}/></Card.Text>
                <Card.Text className="d-inline my-auto"> of {album.stock}</Card.Text>
              </Card.Body>
              <Card.Body className="d-flex justify-content-center">
                <Card.Text className="d-block m-0 p-0">Total price: {price && parseFloat(price).toFixed(2)}$</Card.Text>
              </Card.Body>
              <Card.Body className="d-flex align-items-center flex-column p-0">
                <AddToCartBtn item={{ id: album.id, title: album.title, price: album.price, quantity: numberItems, stock: album.stock }} />
                {/* <SubmitButton className={styles.button}>Order</SubmitButton> */}
              </Card.Body>
            </Card.Body>
          </Col>
        </Card>
        <Card className="my-3">
          <Card.Body>
            <Card.Text>{album.description}</Card.Text>
            <Card.Title className="fs-6">Track list:</Card.Title>
            {album.tracks && album.tracks.length > 0 ? (
              album.tracks
                .sort((a, b) => a.trackNumber - b.trackNumber)
                .map(trackItem => (
                  <Card.Text key={trackItem.id}>
                    <span className={`${styles.spanList} ${styles.spanTrack}`}>{trackItem.trackNumber}.</span> {trackItem.title} <span className={styles.spanuDuration}>-</span> <span className={styles.spanList}>{trackItem.duration}</span>
                  </Card.Text>
                ))
            ) : (
              <p>No tracks available</p>
            )}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default AlbumData;