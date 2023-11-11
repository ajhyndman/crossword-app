import { isCorrect, printBinaryFile } from '@ajhyndman/puz';
import { useState } from 'react';

import { useStore } from '~/store/remote';
import FloatingActionButton from './FloatingActionButton';
import styles from './Toolbar.module.css';

export default () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    state: { puzzle },
  } = useStore();

  const close = () => {
    // close toolbar _after_ any other event handlers are triggered
    setTimeout(() => setIsExpanded(false), 100);
  };

  const checkSolution = () => {
    if (isCorrect(puzzle!)) {
      window.alert('Congratulations!\n\nYou solved this puzzle.');
    } else {
      window.alert('Nope!\n\nThis puzzle is not yet correct. Please try again');
    }
  };

  // export the current puzzle state as a .puz binary file
  const handleDownload = () => {
    if (puzzle) {
      const buffer = printBinaryFile(puzzle);
      const file = new File([buffer], 'download.puz');
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.download = file.name;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={styles.container}>
      <FloatingActionButton
        onBlur={close}
        onClick={() => setIsExpanded(!isExpanded)}
        name={isExpanded ? 'close' : 'more_horiz'}
        transparent
      />
      {isExpanded && (
        <>
          {/* <FloatingActionButton name="edit" size="small" /> */}
          <FloatingActionButton name="check_box" size="small" onClick={checkSolution} />
          <FloatingActionButton name="download" size="small" onClick={handleDownload} />
        </>
      )}
    </div>
  );
};