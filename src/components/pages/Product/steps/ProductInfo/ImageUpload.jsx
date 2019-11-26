import React, { useState, useEffect } from 'react';
// used for making the prop types of this component
import PropTypes from 'prop-types';

// core components
import Button from 'components/theme/CustomButtons/Button.jsx';

import defaultImage from 'assets/img/image_placeholder.jpg';
import defaultAvatar from 'assets/img/placeholder.jpg';

const ImageUpload = props => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [inputRef, setInputRef] = useState({});
  const [imageNotChanged, setImageNotChangeState] = useState(true);
  const [imageRemoved, setImageRemoved] = useState(false);

  useEffect(() => {
    const previewImage = props.avatar ? defaultAvatar : defaultImage;
    setImagePreviewUrl(previewImage);
  }, []);

  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let [file] = e.target.files;

    reader.onloadend = () => {
      setImageFile(file);
      props.onImageChange(file);
      setImagePreviewUrl(reader.result);
      setImageNotChangeState(false);
      setImageRemoved(false);
    };
    console.log('image change component file', file)
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    inputRef.click();
  };

  const handleRemove = () => {
    setInputRef(null);
    setImageFile(null);
    setImagePreviewUrl(defaultImage);
    setImageNotChangeState(false);
    setImageRemoved(true);
    // inputRef.value = null;
  };

  const {
    avatar,
    addButtonProps,
    changeButtonProps,
    removeButtonProps
  } = props;
  return (
    <div className="fileinput text-center">
      <input
        type="file"
        onChange={handleImageChange}
        ref={thisRef => setInputRef(thisRef)}
      />
      <div className={'thumbnail' + (avatar ? ' img-circle' : '')}>
        <img
          src={
            props.imagePreviewUrl && imageNotChanged
              ? props.imagePreviewUrl
              : imagePreviewUrl
          }
          alt="..."
        />
      </div>
      <div>
        {(imageFile === null && !props.imagePreviewUrl) || imageRemoved ? (
          <Button {...addButtonProps} onClick={handleClick}>
            {avatar ? 'Add Photo' : 'Selecione uma imagem'}
          </Button>
        ) : (
          <span>
            <Button {...changeButtonProps} onClick={handleClick}>
              Alterar
            </Button>
            {avatar ? <br /> : null}
            <Button {...removeButtonProps} onClick={handleRemove}>
              <i className="fas fa-times" /> Excluir
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  imagePreviewUrl: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object,
  onImageChange: PropTypes.func
};

export default ImageUpload;
