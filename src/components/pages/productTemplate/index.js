/* eslint-disable no-console */
import React, { useEffect } from 'react';
import Stepper from './Stepper';
import { useDispatch } from 'react-redux';
import {
  fetchTemplateItems,
  setOptions,
  resetTemplateState
} from 'store/ducks/productTemplate';
import { getEndpoint } from 'helpers/api';

const ProductTemplatePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const optionsEndpoint = getEndpoint('/options');
    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(({ options }) => dispatch(setOptions(options)))
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    dispatch(fetchTemplateItems());
    return () => {
      dispatch(resetTemplateState()); // clear component
    };
  }, []);

  return <Stepper />;
};

export default ProductTemplatePage;
