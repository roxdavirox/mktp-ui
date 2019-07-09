import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Radio from '@material-ui/core/Radio';

import basicsStyle from 'assets/jss/material-dashboard-pro-react/views/basicsStyle.jsx';

const ProductCategory = ({ classes }) => {
  const [selectedEnabled, setEnabled] = useState('a');
  const handleChange = e => setEnabled(e.target.value);
  return (
    <>
      <div className={classes.title}>
        <h3>Categorias</h3>
      </div>
      <div
        className={
          classes.checkboxAndRadio + ' ' + classes.checkboxAndRadioHorizontal
        }
      >
        <FormControlLabel
          control={
            <Radio
              checked={selectedEnabled === 'a'}
              onChange={handleChange}
              value="a"
              name="Todos"
              aria-label="A"
              icon={<FiberManualRecord className={classes.radioUnchecked} />}
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio,
                root: classes.radioRoot
              }}
            />
          }
          classes={{
            label: classes.label,
            root: classes.labelRoot
          }}
          label="Todas"
        />
      </div>
      <div
        className={
          classes.checkboxAndRadio + ' ' + classes.checkboxAndRadioHorizontal
        }
      >
        <FormControlLabel
          control={
            <Radio
              checked={selectedEnabled === 'b'}
              onChange={handleChange}
              value="b"
              name=""
              aria-label="B"
              icon={<FiberManualRecord className={classes.radioUnchecked} />}
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio,
                root: classes.radioRoot
              }}
            />
          }
          classes={{
            label: classes.label,
            root: classes.labelRoot
          }}
          label="Adesivos & Papelaria"
        />
      </div>
    </>
  );
};

ProductCategory.propTypes = {
  classes: PropTypes.object
};

export default withStyles(basicsStyle)(ProductCategory);
