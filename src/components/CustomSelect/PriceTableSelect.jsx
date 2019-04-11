import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
    this.setState({
      priceTableSelected: e.target.value
    });

    const { idItem } = this.props;
    const { value: idPriceRange } = e.target;

    const itemPriceTable = {
      idItem: idItem,
      idPriceRange: idPriceRange
    };

    // put aqui
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
  idItem: PropTypes.string.isRequired
};

const mapStateToProps = store => ({
  priceTables: store.pricesRangeState.pricesRange
});

const styledPriceTableSelect = withStyles(styles)(PriceTableSelect);

export default connect(mapStateToProps)(styledPriceTableSelect);
