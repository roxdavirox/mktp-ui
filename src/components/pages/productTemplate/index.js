import React, { useEffect } from 'react';
import Stepper from './Stepper';
import { useDispatch } from 'react-redux';
import { fetchTemplateItems } from 'store/ducks/productTemplate';

const ProductTemplatePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTemplateItems());
  }, []);

  return <Stepper />;
};

export default ProductTemplatePage;
