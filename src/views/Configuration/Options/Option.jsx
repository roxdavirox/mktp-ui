import React from "react";

import CustomMUIDataTable from "components/Table/MuiDatatables";
import EditIcon from "components/CustomIcons/EditIcon";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "id",
    label: "Edit",
    options: {
      filter: false,
      // eslint-disable-next-line react/display-name
      customBodyRender: (value, tableMeta) => (
        <EditIcon key={tableMeta.columnIndex} onClick={() => alert(value)} />
      )
    }
  }
];

// const data = [
//   { name: "Joe James", id: "01-NY" },
//   { name: "John Walsh", id: "02-CT" },
//   { name: "Bob Herm", id: "03-FL" },
//   { name: "James Houston", id: "04-TX" }
// ];

const options = {
  filterType: "checkbox"
};

// const Option = () => (
//   <div>
//     <CustomMUIDataTable
//       title={"Lista de clientes"}
//       data={data}
//       columns={columns}
//       options={options}
//     />
//   </div>
// );

class Option extends React.Component {
  componentDidMount = () => {};

  render = () => {
    const { data } = this.props;

    return (
      <CustomMUIDataTable
        title={"Lista de opções"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  };
}

Option.propTypes = {
  data: PropTypes.any.isRequired
};

const mapStateToProps = store => ({
  data: store.optionsState.options
});

export default connect(mapStateToProps)(Option);
