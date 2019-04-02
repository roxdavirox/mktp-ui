import React from "react";
import CustomMUIDataTable from "./MuiDatatables";

class ItemMuiDatatable extends React.Component {
  state = {
    columns: [
      {
        name: "name",
        label: "Item",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "priceRange",
        label: "Tabela de preço",
        options: {
          sort: false,
          filter: false,
          // eslint-disable-next-line react/display-name
          customBodyRender: (value, tableMeta) => (
            <h6>Selecionar tabela de preço</h6>
          )
        }
      }
    ],
    options: {
      filterType: "checkbox",
      download: false,
      print: false,
      filter: false,
      viewColumns: false,
      rowHover: false,
      textLabels: {
        body: {
          noMatch: <h6>Nenhum item encontrado</h6>
        }
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    }
  };

  render() {
    const { data } = this.props;
    const { columns, options } = this.state;

    return (
      <div>
        <CustomMUIDataTable
          title={"Itens"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

export default ItemMuiDatatable;
