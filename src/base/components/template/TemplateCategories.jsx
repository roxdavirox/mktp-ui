import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Radio from '@material-ui/core/Radio';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import basicsStyle from 'assets/jss/material-dashboard-pro-react/views/basicsStyle.jsx';

const TemplateCategories = ({
  classes,
  categories,
  onSelectCategory,
  onOpenAddCategoryDialog,
  selectedEnabled
}) => {
  const handleChange = e => onSelectCategory(e.target.value);
  return (
    <>
      <div className={classes.title}>
        <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
          Categoria{' '}
          <Button
            variant="contained"
            color="primary"
            onClick={onOpenAddCategoryDialog}
          >
            <Add />
          </Button>
        </h3>
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
      {categories &&
        categories.map(c => (
          <div
            className={
              classes.checkboxAndRadio +
              ' ' +
              classes.checkboxAndRadioHorizontal
            }
            key={c._id}
          >
            <FormControlLabel
              control={
                <Radio
                  checked={selectedEnabled === c._id}
                  onChange={handleChange}
                  value={c._id}
                  name=""
                  aria-label="B"
                  icon={
                    <FiberManualRecord className={classes.radioUnchecked} />
                  }
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
              label={c.name}
            />
          </div>
        ))}
    </>
  );
};

TemplateCategories.propTypes = {
  classes: PropTypes.object,
  categories: PropTypes.array.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  onOpenAddCategoryDialog: PropTypes.func.isRequired,
  selectedEnabled: PropTypes.string.isRequired
};

export default withStyles(basicsStyle)(TemplateCategories);
