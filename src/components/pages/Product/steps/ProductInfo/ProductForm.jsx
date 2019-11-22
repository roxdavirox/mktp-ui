/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// core components
import InputAdornment from '@material-ui/core/InputAdornment';
import Build from '@material-ui/icons/Build';
// theme components
import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';
import CustomInput from 'components/theme/CustomInput/CustomInput.jsx';
import ImageUpload from './ImageUpload';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { getEndpoint } from 'helpers/api';

const style = () => ({
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

class ProductStep extends React.Component {
  state = {
    imageFile: null,
    nameState: '',
    productName: '',
    categories: [],
    categoryId: ''
  };

  componentDidMount() {
    const categoriesEndpoint = getEndpoint('/categories');
    fetch(categoriesEndpoint)
      .then(res => res.json())
      .then(({ categories }) => this.setState({ categories }));

    if (!this.props.allStates.locationState) return;

    const { allStates } = this.props;
    if (allStates.locationState.pathname === '/admin/config/products/edit') {
      const { productId } = allStates.locationState.state;
      const productEndpoint = getEndpoint(`/products/${productId}`);
      fetch(productEndpoint)
        .then(res => res.json())
        .then(product => {
          this.setState({ productName: product.name });
          this.setState({ categoryId: product.category });
          this.setState({ nameState: 'success' });
        });
    }
  }

  handleNameChange = e => {
    const { value: name } = e.target;
    const newName = name.length >= 3 ? 'success' : 'error';

    this.setState({ nameState: newName, productName: name });
  };

  handleCategorySelect = e =>
    this.setState({
      categoryId: e.target.value
    });

  // wizard functions
  isValidated() {
    return this.state.nameState === 'success';
  }

  sendState() {
    return this.state;
  }

  handleImageChange = imageFile =>
    this.setState({
      imageFile
    });

  render() {
    const { classes } = this.props;
    const { nameState, categories, productName } = this.state;

    return (
      <>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <h4 className={classes.infoText}>Digite o nome do produto</h4>
          </GridItem>
          <GridItem xs={12} sm={4}>
            <ImageUpload onImageChange={this.handleImageChange} />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <CustomInput
              success={nameState === 'success'}
              error={nameState === 'error'}
              labelText={
                <span>
                  Nome do produto <small>(obrigatório)</small>
                </span>
              }
              id="product-name"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.handleNameChange(event),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Build className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                ),
                value: productName
              }}
            />
            <GridContainer
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
                  value={this.state.categoryId}
                  onChange={this.handleCategorySelect}
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
            </GridContainer>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

export default withStyles(style)(ProductStep);
