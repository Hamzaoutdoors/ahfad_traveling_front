import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTripeAsync } from './tripSlice';
import type { AppDispatch } from '../../app/store';
import styled from 'styled-components';


const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 2rem;
    border: 1px solid #ccc;
    `;

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    `;

const FIleImage = styled.div`
    display: flex;
    flex-direction: row;
    `;

const Image = styled.img`
    width: 100px;
    height: 100px;
    object-fit: contain;
    `;

function TripForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [imageUrl, setImageUrl] = useState('');

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      trip: {
        title,
        description,
        price,
        image_main: imageUrl,
      }
    }
    dispatch(createTripeAsync(formData));
    resetState();
  }

  function resetState() {
    setTitle('');
    setDescription('');
    setPrice('0');
    setImageUrl('');
  }

  const onImageChange = (e: any) => {
    const [file] = e.target.files;
    setImageUrl(URL.createObjectURL(file));
  }


  return <div>
    <Form>

      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            className="form-control text-start mb-2"
            name="title"
            placeholder='Title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="inputAddress"
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control text-start mb-2"
            name="description"
            placeholder='Description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />  </div>
        <Bottom className="form-row">
          <div className="col-3">
            <input
              type="number"
              className="form-control text-start mb-2"
              name="price"
              id='inputPrice'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <FIleImage className="col flex">
            <input type="file"
              className="form-control-file text-start m-2"
              onChange={onImageChange}
            />
            {/* {imageUrl && <Image src={imageUrl} alt="" className='' />} */}
          </FIleImage>
        </Bottom>
      </div>
      <button
        type="submit"
        className="form-control btn btn-primary mv-2 w-25"
        onClick={(e) => submitHandler(e)}>Submit</button>

    </Form>
  </div>;
}

export default TripForm;