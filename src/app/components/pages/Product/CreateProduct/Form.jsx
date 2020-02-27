/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// core components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ImageUpload from './ImageUpload';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { getEndpoint } from 'helpers/api';
import ProductContext, { ProductConsumer } from './ProductContext';

const useStyles = makeStyles({
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  inputAdornment: {
    position: 'relative'
  },
  select: { height: '37px' },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 220
  }
});

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const fn = useContext(ProductContext);

  const classes = useStyles();

  useEffect(() => {
    const categoriesEndpoint = getEndpoint('/categories');
    fetch(categoriesEndpoint)
      .then(res => res.json())
      .then(({ categories }) => setCategories(categories));
  }, []);

  const handleNameChange = e => {
    const { value: name } = e.target;

    fn.setProductName(name);
  };

  const handleCategorySelect = e => fn.setCategoryId(e.target.value);

  return (
    <ProductConsumer>
      {({ productName, categoryId }) => (
        <Container justify="center">
          <Grid item xs={12} sm={12}>
            <h4 className={classes.infoText}>Digite o nome do produto</h4>
          </Grid>
          <Container
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Grid item xs={12} sm={4}>
              <ImageUpload />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="product-name">Nome do produto</InputLabel>
              <Input
                autoFocus
                style={{ width: '100%' }}
                onChange={handleNameChange}
                value={productName}
                id="product-name"
              />
              <Container
                style={{
                  display: 'flex',
                  padding: 'inherit',
                  justifyContent: 'space-between'
                }}
              >
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="category-input">Categoria</InputLabel>
                  <Select
                    className={classes.select}
                    value={categoryId}
                    onChange={handleCategorySelect}
                    input={<Input id="category-input" />}
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    {categories.map(c => (
                      <MenuItem key={c._id} value={c._id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Container>
            </Grid>
          </Container>
        </Container>
      )}
    </ProductConsumer>
  );
};

export default ProductForm;
