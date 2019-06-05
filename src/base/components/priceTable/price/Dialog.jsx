/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

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

class Dialog extends React.Component {
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

  handleStartChange = start => this.setState({ start });
  handleEndChange = end => this.setState({ end });
  handleValueChange = value => this.setState({ value });

  handleSubmit = () => {
    const { fnSubmit } = this.props;
    const { start, end, value } = this.state;

    const price = {
      start: Number(start),
      end: Number(end),
      value: Number(value)
    };

    fnSubmit(price);
  };

  render() {
    const { open, onClose, classes } = this.props;
    return (
      <div>
        <MuiDialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.props.dialogTitle}
          </DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <TextField
                  autoFocus
                  value={this.state.start}
                  margin="dense"
                  id="start"
                  label="Inicio"
                  fullWidth
                  onChange={e => this.handleStartChange(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  value={this.state.end}
                  margin="dense"
                  id="end"
                  label="Fim"
                  fullWidth
                  onChange={e => this.handleEndChange(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  value={this.state.value}
                  margin="dense"
                  id="value"
                  label="Preço"
                  fullWidth
                  onChange={e => this.handleValueChange(e.target.value)}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              {this.props.buttonText}
            </Button>
          </DialogActions>
        </MuiDialog>
      </div>
    );
  }
}

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  fnSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  priceTableId: PropTypes.string.isRequired,
  snackText: PropTypes.string.isRequired,
  price: PropTypes.object,
  buttonText: PropTypes.string.isRequired,
  dialogTitle: PropTypes.string.isRequired
};

export default withStyles(styles)(Dialog);
