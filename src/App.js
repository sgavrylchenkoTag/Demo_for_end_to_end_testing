import React, { StrictMode } from 'react';
import { useDispatch } from 'react-redux';
import { Popup, Position } from 'devextreme-react/popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { Grid, Form } from 'Components';
import { saveRecord } from 'Actions';
import styles from './App.scss';

const App = () => {
  const [isShow, setIsShow] = React.useState(false);
  const [popupKey, setPopupKey] = React.useState(false);
  const [refreshCounter, setRefreshCounter] = React.useState(0);

  const dispatch = useDispatch();

  function showPopup() {
    setIsShow(true);
  }

  function resetForm() {
    setPopupKey(Date.now());
  }

  function hidePopup() {
    setIsShow(false);
    resetForm();
  }

  function submitHandler(values) {
    dispatch(saveRecord(values));
    hidePopup();
  }

  function refreshData() {
    setRefreshCounter(refreshCounter + 1);
  }

  return (
    <StrictMode>
      <div className={styles.app}>
        <Popup
          key={popupKey}
          visible={isShow}
          dragEnabled={false}
          closeOnOutsideClick
          showCloseButton
          onHiding={hidePopup}
          showTitle
          title="Create record"
          container=".dx-viewport"
          width={300}
          height="auto"
        >
          <Position at="center" my="center" />
          <Form submitHandler={submitHandler} />
        </Popup>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.btn}
            onClick={showPopup}
            data-id="add-record-btn"
          >
            Add record
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={refreshData}
            data-id="reload-btn"
          >
            <FontAwesomeIcon icon={faUndo} />
          </button>
        </div>
        <div className={styles.grid}>
          <Grid refreshCounter={refreshCounter} />
        </div>
      </div>
    </StrictMode>
  );
};

export default App;
