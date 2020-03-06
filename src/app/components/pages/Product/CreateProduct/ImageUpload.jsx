/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ProductContext, { ProductConsumer } from './ProductContext';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    minWidth: '50%'
  }
});

const ImageUpload = () => {
  const [inputRef, setInputRef] = useState({});
  const classes = useStyles();

  const handleClick = () => {
    inputRef.click();
  };

  const fn = useContext(ProductContext);

  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let [file] = e.target.files;

    reader.onloadend = () => {
      fn.setImageFile(file);
      fn.setImagePreviewUrl(reader.result);
      fn.setImageChange(true);
      fn.setImageRemoved(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    fn.handleRemove();
    setInputRef(null);
    inputRef.value = null;
  };

  return (
    <ProductConsumer>
      {({ avatar, imageFile, imagePreviewUrl, imageRemoved }) => (
        <div className="fileinput text-center">
          <input
            hidden
            type="file"
            onChange={handleImageChange}
            ref={thisRef => setInputRef(thisRef)}
          />
          <div className={'thumbnail' + (avatar ? ' img-circle' : '')}>
            <img src={imagePreviewUrl} alt="..." />
          </div>
          <div>
            {(imageFile === null && !imagePreviewUrl) || imageRemoved ? (
              <Button
                color="primary"
                variant="outlined"
                size="large"
                onClick={handleClick}
                startIcon={<CloudUploadIcon />}
              >
                Selecione uma imagem
              </Button>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  color="primary"
                  variant="outlined"
                  size="large"
                  onClick={handleClick}
                  className={classes.button}
                >
                  <EditIcon /> Alterar
                </Button>
                {avatar ? <br /> : null}
                <Button
                  color="default"
                  variant="outlined"
                  size="large"
                  onClick={handleRemove}
                  className={classes.button}
                >
                  <DeleteIcon /> Excluir
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </ProductConsumer>
  );
};

export default ImageUpload;
