import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { addPrice } from 'store/ducks/price';

const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class AddPrice extends Component {
  state = { start: 0, end: 0, value: 0 };

  componentDidMount = ({ price } = this.props) => {
    if (price) {
      this.setState({
        start: price.start,
        end: price.end,
        value: price.value
      });
    }
  };

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  handleSubmit = () => {
    const { addPrice, priceTableId, enqueueSnackbar } = this.props;
    const { start, end, value } = this.state;

    const price = {
      start: Number(start),
      end: Number(end),
      value: Number(value)
    };

    enqueueSnackbar('Adicionando preço...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    addPrice(price, priceTableId, enqueueSnackbar);
    this.props.fnClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <DialogTitle id="form-dialog-title">Adicionar preço</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                value={this.state.start}
                margin="dense"
                id="start"
                name="start"
                label="Inicio"
                fullWidth
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                value={this.state.end}
                margin="dense"
                id="end"
                name="end"
                label="Fim"
                fullWidth
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                value={this.state.value}
                margin="dense"
                id="value"
                name="value"
                label="Preço"
                fullWidth
                onChange={this.handleChange}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.fnClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </>
    );
  }
}

AddPrice.propTypes = {
  addPrice: PropTypes.func.isRequired,
  fnClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  priceTableId: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    addPrice
  }
)(withStyles(styles)(AddPrice));
