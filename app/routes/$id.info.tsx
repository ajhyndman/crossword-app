import { useStore } from '~/store/remote';

import styles from './$id.info.module.css';

export default () => {
  const {
    state: { puzzle },
  } = useStore();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{puzzle?.title}</h1>
      <p>{puzzle?.author}</p>
      <p>{puzzle?.copyright}</p>
    </div>
  );
};