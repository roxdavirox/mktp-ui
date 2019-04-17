import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  putItemPriceTableBegin,
  removeItemReferenceBegin
} from "../../redux/actions/items.actions";
import { getPricesRange } from "../../redux/selectors/pricesRange.selectors";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class PriceTableSelect extends React.Component {
  state = {
    priceTableSelected: "",
    labelWidth: 0
  };

  handleChange = e => {
    const {
      idItem,
      removeItemReferenceBegin,
      putItemPriceTableBegin,
      itemIndex
    } = this.props;
    const { value: idPriceRange } = e.target;
    console.log(itemIndex);
    const itemPriceTable = {
      idItem: idItem,
      idPriceRange: idPriceRange
    };

    if (idPriceRange == 0) {
      removeItemReferenceBegin(itemPriceTable, itemIndex);
      this.setState({ priceTableSelected: "0" });
      console.log("handle reference remove");
      return null;
    }

    this.setState({
      priceTableSelected: idPriceRange
    });
    console.log("handle put");

    putItemPriceTableBegin(itemPriceTable, itemIndex);
  };

  componentDidMount = () => {
    //
  };

  render = () => {
    // eslint-disable-next-line react/prop-types
    const { classes, priceTables, idPriceRange } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="price-table-select">Selecione</InputLabel>
          <Select
            value={idPriceRange ? idPriceRange : this.state.priceTableSelected}
            onChange={this.handleChange}
            inputProps={{
              name: "price-select",
              id: "price-table"
            }}
          >
            <MenuItem value="0">Nenhum</MenuItem>
            {priceTables.map((priceRange, index) => (
              <MenuItem key={index} value={priceRange.idPriceRange}>
                {priceRange.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  };
}

PriceTableSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  priceTables: PropTypes.array.isRequired,
  idItem: PropTypes.string.isRequired,
  putItemPriceTableBegin: PropTypes.func.isRequired,
  removeItemReferenceBegin: PropTypes.func.isRequired,
  itemIndex: PropTypes.any.isRequired
};

const mapStateToProps = store => ({
  priceTables: getPricesRange(store)
});

const styledPriceTableSelect = withStyles(styles)(PriceTableSelect);

export default connect(
  mapStateToProps,
  { putItemPriceTableBegin, removeItemReferenceBegin }
)(styledPriceTableSelect);
