/* eslint-disable react/jsx-key */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// core components
import InputAdornment from '@material-ui/core/InputAdornment';
import Build from '@material-ui/icons/Build';
// theme components
import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';
import CustomInput from 'base/components/theme/CustomInput/CustomInput.jsx';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  inputAdornment: {
    position: 'relative'
  }
};

class Step1 extends React.Component {
  state = {
    nameState: ''
  };

  handleNameChange = e => {
    const { value: name } = e.target;
    const newName = name.length >= 3 ? 'success' : 'error';

    this.setState({ nameState: newName });
  };

  isValidated() {
    return this.state.nameState === 'success';
  }

  render() {
    const { classes } = this.props;
    const { nameState } = this.state;

    return (
      <>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <h4 className={classes.infoText}>Digite o nome do produto</h4>
          </GridItem>
          <GridItem xs={12} sm={6}>
            <CustomInput
              success={nameState === 'success'}
              error={nameState === 'error'}
              labelText={
                <span>
                  Nome do produto <small>(obrigatório)</small>
                </span>
              }
              id="firstname"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.handleNameChange(event),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Build className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

export default withStyles(style)(Step1);
