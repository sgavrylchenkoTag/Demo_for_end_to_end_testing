import React from 'react';
import NumberBox from 'devextreme-react/number-box';
import TextBox from 'devextreme-react/text-box';
import { Button } from 'devextreme-react/button';

import styles from './Form.scss';

function RecordForm(props) {
  const [city, setCity] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [zipCode, setZipCode] = React.useState(null);
  const [beds, setBeds] = React.useState(null);
  const [validationRules, setValidationRules] = React.useState({
    city: true,
    state: true,
    zipCode: true,
    beds: true,
  });

  function bedsChanged(e) {
    setBeds(e.value);
  }

  function cityChanged(e) {
    setCity(e.value);
  }

  function stateChanged(e) {
    setState(e.value);
  }

  function zipCodeChanged(e) {
    setZipCode(e.value);
  }

  function getForm() {
    return { city, state, zipCode, beds };
  }

  function onSubmit() {
    const newValidationRules = { ...validationRules };
    newValidationRules.city = !!city;
    newValidationRules.state = !!state;
    newValidationRules.zipCode = !!zipCode;
    newValidationRules.beds = !!beds;

    setValidationRules(newValidationRules);

    if (!Object.values(newValidationRules).includes(false)) {
      props.submitHandler(getForm());
    }
  }

  return (
    <div>
      <div className={styles.field}>
        <span>City</span>
        <TextBox
          max={550}
          value={city}
          onValueChanged={cityChanged}
          className={!validationRules.city && styles.validation}
          inputAttr={{'data-id': 'city'}}
        />
      </div>
      <div className={styles.field}>
        <span>State</span>
        <TextBox
          max={550}
          value={state}
          onValueChanged={stateChanged}
          className={!validationRules.state && styles.validation}
          inputAttr={{'data-id': 'state'}}
        />
      </div>
      <div className={styles.field}>
        <span>ZipCode</span>
        <TextBox
          max={550}
          value={zipCode}
          onValueChanged={zipCodeChanged}
          className={!validationRules.zipCode && styles.validation}
          inputAttr={{'data-id': 'zipCode'}}
        />
      </div>
      <div className={styles.field}>
        <span>Beds</span>
        <NumberBox
          max={550}
          value={beds}
          onValueChanged={bedsChanged}
          className={!validationRules.beds && styles.validation}
          inputAttr={{'data-id': 'beds'}}
        />
      </div>
      <div className={styles.btnWrapper}>
        <Button
          className={styles.submitBtn}
          onClick={onSubmit}
          elementAttr={{'data-id': 'ok-btn'}}
        >
          OK
        </Button>
      </div>
    </div>
  );
}

export default RecordForm;
