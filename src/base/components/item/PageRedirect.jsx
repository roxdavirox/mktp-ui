import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import ItemDatatable from './Datatable';
import { addOptionItem } from './actions';
import { fetchOptions } from '../option/actions';
import { getOptionsItems } from './selectors';
import FormDialog from './FormDialog';

class PageRedirect extends React.Component {
  state = { open: false };

  componentDidMount = ({ fetchOptions } = this.props) => {
    const pageRefreshed =
      window.performance && performance.navigation.type == 1;
    if (pageRefreshed) {
      fetchOptions();
    }
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  handleAddOptionItem = itemName => {
    const { enqueueSnackbar, optionId } = this.props;

    enqueueSnackbar('Adicionando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    if (itemName) {
      this.props.addOptionItem({
        name: itemName,
        optionId,
        enqueueSnackbar
      });
      this.handleClose();
    }
  };

  render = ({ data } = this.props) => {
    return (
      <>
        <FormDialog
          open={this.state.open}
          onClose={this.handleClose}
          onAddItem={this.handleAddOptionItem}
          priceTables={[
            { _id: 123, name: 'Acrilico' },
            { _id: 321, name: 'Base' }
          ]}
        />
        <ItemDatatable data={data} onDialog={this.handleOpen} />
      </>
    );
  };
}

PageRedirect.propTypes = {
  data: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  addOptionItem: PropTypes.func.isRequired,
  optionId: PropTypes.string.isRequired
};

const mapStateToProps = (store, { optionId }) => ({
  data: getOptionsItems(optionId, store)
});

const mapDispatchToProps = {
  fetchOptions,
  addOptionItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(PageRedirect));
