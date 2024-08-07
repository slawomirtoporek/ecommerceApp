import PropTypes from 'prop-types';
import styles from './NumberItems.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const NumberItems = ({ numberItems, stock, actPlus, actMinus }) => {
  return(
    <>
      Quantity: 
      <button className={styles.btnItem} onClick={actMinus} disabled={numberItems <= 1}>
        <span className={styles.char}>
          <FontAwesomeIcon className={styles.icon} icon={faMinus} />
        </span>
      </button>
        {numberItems}
      <button className={styles.btnItem} onClick={actPlus}  disabled={numberItems >= stock}>
        <span className={styles.char}>
          <FontAwesomeIcon className={styles.icon} icon={faPlus} />
        </span>
      </button>
    </>
  );
};

NumberItems.propTypes = {
  numberItems: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  actPlus: PropTypes.func.isRequired,
  actMinus: PropTypes.func.isRequired
};

export default NumberItems;