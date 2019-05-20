import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteItems, fetchItems } from './actions';
import ItemDatatable from './Datatable';

import { getOptionsItems } from './selectors';

const mapStateToProps = store => ({
  data: getOptionsItems(store)
});


