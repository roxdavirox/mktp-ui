import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { addOption } from './actions';

const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  select: { height: '37px' }
});

class Dialog extends React.Component {
  state = { optionName: '' };

  handleNameChange = e => this.setState({ optionName: e.target.value });

  handleSubmit = () => {
    const { addOption, enqueueSnackbar: snack } = this.props;
    const { optionName: name } = this.state;

    snack(`Adicionando opção ${name}`, {
      variant: 'info',
      autoHideDuration: 2000
    });

    addOption(name, snack);
    this.props.onClose();
  };

  render() {
    const { open, classes } = this.props;
    return (
      <div>
        <MuiDialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Adicionar Opção</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <TextField
                  value={this.state.optionName}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Nome"
                  fullWidth
                  onChange={this.handleNameChange}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Adicionar
            </Button>
          </DialogActions>
        </MuiDialog>
      </div>
    );
  }
}

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { addOption }
)(withStyles(styles)(Dialog));
