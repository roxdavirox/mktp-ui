/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { ProductConsumer } from './ProductContext';

const ImageUpload = () => {
  const [inputRef, setInputRef] = useState({});

  const handleClick = () => {
    inputRef.value = null;
    inputRef.click();
  };

  const fn = useContext(ProductConsumer);

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
    // setInputRef(null);
  };

  return (
    <ProductConsumer>
      {({ avatar, imageFile, imagePreviewUrl, imageRemoved }) => (
        <div className="fileinput text-center">
          <input
            type="file"
            onChange={handleImageChange}
            ref={thisRef => setInputRef(thisRef)}
          />
          <div className={'thumbnail' + (avatar ? ' img-circle' : '')}>
            <img src={imagePreviewUrl} alt="..." />
          </div>
          <div>
            {(imageFile === null && imagePreviewUrl) || imageRemoved ? (
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
                >
                  Alterar
                </Button>
                {avatar ? <br /> : null}
                <Button
                  color="default"
                  variant="outlined"
                  size="large"
                  onClick={handleRemove}
                >
                  <i className="fas fa-times" /> Excluir
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
