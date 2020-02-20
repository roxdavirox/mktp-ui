/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';

import { ProductConsumer } from './ProductContext';

const ImageUpload = () => {
  const [inputRef, setInputRef] = useState({});

  const handleClick = () => {
    inputRef.click();
  };

  const fn = useContext(ProductConsumer);

  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let [file] = e.target.files;

    reader.onloadend = () => {
      fn.handleImageChange(file);
      fn.setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    fn.handleRemove();
    setInputRef(null);
  };

  return (
    <ProductConsumer>
      {({
        avatar,
        imageFile,
        imagePreviewUrl,
        imageNotChanged,
        imageRemoved
      }) => (
        <div className="fileinput text-center">
          <input
            type="file"
            onChange={handleImageChange}
            ref={thisRef => setInputRef(thisRef)}
          />
          <div className={'thumbnail' + (avatar ? ' img-circle' : '')}>
            <img
              src={imagePreviewUrl && imageNotChanged ? imagePreviewUrl : null}
              alt="..."
            />
          </div>
          <div>
            {(imageFile === null && imagePreviewUrl) || imageRemoved ? (
              <Button color="primary" variant="contained" onClick={handleClick}>
                {avatar ? 'Add Photo' : 'Selecione uma imagem'}
              </Button>
            ) : (
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  Alterar
                </Button>
                {avatar ? <br /> : null}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRemove}
                >
                  <i className="fas fa-times" /> Excluir
                </Button>
              </span>
            )}
          </div>
        </div>
      )}
    </ProductConsumer>
  );
};

export default ImageUpload;
