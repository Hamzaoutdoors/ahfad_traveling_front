import React, { useEffect, useState } from 'react';
import ButtonGroup from './ButtonGroup';
import styled from 'styled-components';
import { mobile, desktop } from '../../responsive';

const Container = styled.div``;

const CarContainer = styled.div`
    display: flex;
    margin: 0 auto;
    box-shadow: 0px 0px 10px #ccc;
    border-radius: 5px;
    padding: .3rem;
`;

const ImageContainer = styled.div`
    height: 350px;
    width: 350px;
`;

const Image = styled.img`
    object-fit: cover;
    height: 100%;
    width: 100%;
`;

const Trip = (props: any) => {
    const [title, setTitle] = useState(props.trip.title);
    const [description, setdescription] = useState(props.trip.description);
    const [price, setPrice] = useState(props.trip.price);
    const [imageUrl, setImageUrl] = useState(props.trip.image_main);
    const [isEditing, setIsEditing] = useState(props.tripToEdit === props.trip.id);

    console.log('trip', props.trip);
    
    function getLastUpdatedTime (date: string) {
        const dateObj = new Date(date);
        const dateC = dateObj.toLocaleString();
        let hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strTime = `${dateC}`;
        return strTime;
    }


    function submitHandler(e: any) {
        e.preventDefault();
        const formData = {
            trip: {
                id: props.trip.id,
                title,
                description,
                price,
                image_main: imageUrl ?  imageUrl : '',
            }
        }
        props.submitEdit(formData)
        resetState();
    }

    function resetState() {
        setTitle(props.trip.title);
        setdescription(props.trip.description);
        setPrice(props.trip.price);
        setImageUrl(props.trip.image_main);
    }

    const titleElement = <h2 className="card-title text-start">{(props.trip.title).toUpperCase()}</h2>;
    const descriptionElement = <p className="card-text text-start">{(props.trip.description).slice(0, 200)}...</p>;
    const priceElement = <p className="card-text text-start fw-bold">{props.trip.price} DH</p>;
    // const imageElement = props.trip.image_main && <Image src={props.trip.image_main} className="img-fluid rounded-start" alt="..." />;
    const editableTitle = <input
        type="text"
        className="form-control text-start"
        value={title}
        onChange={(e) => setTitle(props.trip.title)} />;
    const editabledescription = <textarea
        className="form-control text-start"
        value={description}
        onChange={(e) => setdescription(e.target.value)} />;
    const editablePrice = <input
        type="number"
        className="form-control text-start"
        value={price}
        onChange={(e) => setPrice(e.target.value)} />;

    const submitButton = <button
        type="submit"
        className="form-control btn btn-primary"
        onClick={(e) => submitHandler(e)}>Submit</button>;
    
    return <Container>
        <CarContainer className="card mb-3" >
            <div className="row g-0">
                {/* <ImageContainer className="col-md-4">
                    {props.trip.image_main && imageElement}
                </ImageContainer> */}
                <div className="col-md-8">
                    <div className="card-body">
                        {isEditing ? editableTitle : titleElement}
                        {isEditing ? editabledescription : descriptionElement}
                        {isEditing ? editablePrice : priceElement}
                        <p className="card-text"><small className="text-muted">Last updated at {getLastUpdatedTime(props.trip.updated_at)} </small></p>
                    </div>
                </div>
            </div>
        </CarContainer>
        <ButtonGroup
            trip_id={props.trip.id}
            dispatch={props.dispatch}
            toggleEditForm={props.toggleEditForm}
        />
        <div className="row">
            <div className="col-4 pt-2">
                {isEditing ? submitButton : ""}
            </div>
        </div>
    </Container>;
}

export default Trip;