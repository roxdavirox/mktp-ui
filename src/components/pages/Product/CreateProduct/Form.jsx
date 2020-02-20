/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
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

const ProductForm = props => {
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [isImageChanged, setImageChange] = useState(false);
  const [isImageDeleted, setImageDeleted] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [categoryId, setCategoryId] = useState('');

  const classes = useStyles();
  const [state, setState] = useState({
    productId: null
  });

  useEffect(() => {
    const categoriesEndpoint = getEndpoint('/categories');
    fetch(categoriesEndpoint)
      .then(res => res.json())
      .then(({ categories }) => setCategories(categories));
  }, []);

  const handleNameChange = e => {
    const { value: name } = e.target;

    setProductName(name);
    props.enableFinishButton();
  };

  const handleImageChange = imageFile => {
    setImageChange(true);
    setImageDeleted(false);
    setImageFile(imageFile);
    this.props.enableFinishButton();
  };

  const handleDeleteImage = () => {
    setImageDeleted(true);
    setImageChange(false);
    this.props.enableFinishButton();
  };

  const handleCategorySelect = e => setCategoryId(e.target.value);

  return (
    <>
      <Container justify="center">
        <Grid xs={12} sm={12}>
          <h4 className={classes.infoText}>Digite o nome do produto</h4>
        </Grid>
        <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid xs={12} sm={4}>
            <ImageUpload
              imagePreviewUrl={imageUrl}
              onImageChange={handleImageChange}
              onDeleteImage={handleDeleteImage}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <InputLabel htmlFor="product-name">Nome do produto</InputLabel>
            <Input
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
    </>
  );
};

export default ProductForm;
