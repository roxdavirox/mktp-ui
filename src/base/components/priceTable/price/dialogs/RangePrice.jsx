import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap',
    width: 300
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class RangePrice extends Component {
  handleSubmit = () => {
    this.props.fnClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <DialogTitle id="form-dialog-title">
          Gerar intervalo de preços
        </DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                name="start"
                id="start"
                label="Menor preço de venda"
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                margin="dense"
                id="end"
                name="end"
                label="Maior preço de venda"
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                margin="dense"
                name="value"
                id="value"
                label="Quantidade para menor valor de venda"
                fullWidth
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.fnClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Gerar
          </Button>
        </DialogActions>
      </>
    );
  }
}

RangePrice.propTypes = {
  fnClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  priceTableId: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles)(RangePrice);
