import { Card } from 'react-bootstrap';
import { IMAGES_URL } from '../../../config';
import { Link } from 'react-router-dom';
import styles from './AlbumSummary.module.scss';
import SubmitButton from '../../common/SubmitButton/SubmitButton';

const SummaryAlbum = ({ album }) => {

  return (
    <Card className={styles.card}  key={album.id} >
      {album.images.map(albumImg => (
        <div className={styles.albumBox}  key={albumImg.id}>
          <Card.Img key={albumImg.id} variant="top" className={styles.albumImg} src={`${IMAGES_URL}/${albumImg.url}`} alt={album.title} />
        </div>
      ))}
      <Card.Body>
        <Card.Title className={styles.title}>{album.title}</Card.Title>
        <div className='d-flex justify-content-between'>
          <Card.Text className='my-auto fs-5'>{album.price}$</Card.Text>
          <Link to={`/album/${album.id}`}>
            <SubmitButton className={styles.button}>See More</SubmitButton>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SummaryAlbum;