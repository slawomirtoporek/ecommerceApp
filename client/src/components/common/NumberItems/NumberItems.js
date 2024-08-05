import styles from './NumberItems.module.scss';

const NumberItems = ({ numberItems, stock, actPlus, actMinus }) => {
  return(
    <>
      Quantity: 
      <button className={styles.btnItem} onClick={actMinus} disabled={numberItems <= 1}><span className={styles.char}>-</span></button>
        {numberItems}
      <button className={styles.btnItem} onClick={actPlus}  disabled={numberItems >= stock}><span className={styles.char}>+</span></button>
    </>
  );
};

export default NumberItems;