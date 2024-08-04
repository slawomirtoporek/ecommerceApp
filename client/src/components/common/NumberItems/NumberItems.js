import styles from './NumberItems.module.scss';

const NumberItems = ({ numberItems, actPlus, actMinus }) => {
  return(
    <>
      Quantity: 
      <button className={styles.btnItem} onClick={actMinus}><span className={styles.char}>-</span></button>
        {numberItems}
      <button className={styles.btnItem} onClick={actPlus}><span className={styles.char}>+</span></button>
    </>
  );
};

export default NumberItems;