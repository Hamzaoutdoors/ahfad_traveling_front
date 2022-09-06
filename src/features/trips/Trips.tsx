import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { AppDispatch } from '../../app/store';
import Trip from './Trip';
import TripForm from './TripForm';
import { v4 as uuidv4 } from 'uuid';
import { fetchTripsAsync, selecttrips, selectStatus, Statuses, updateTripAsync } from './tripSlice';

function Trips() {
    const trips = useAppSelector(selecttrips);
    const status = useAppSelector(selectStatus)
    const dispatch = useAppDispatch();

    const [tripToEdit, settripToEdit] = useState(0);

    useEffect(() => {
        dispatch(fetchTripsAsync());
    }, [dispatch])

    function toggleEditForm(trip_id?: number) {
        if (tripToEdit === trip_id) {
            settripToEdit(0);
        } else {
            settripToEdit(trip_id as number);
        }
    }

    function submitEdit(formData: any) {
        dispatch(updateTripAsync(formData));
        toggleEditForm();
    }

    let contents;

    if (status !== Statuses.UpToDate) {
        contents = <div className="d-flex align-items-center">
            <strong>Loading...</strong>
            <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>
    } else {
        contents = <div className="card">
            <div className="card-body">
                <h3>{status}</h3>
                <TripForm />
                {trips && trips.length > 0 && trips.map(trip => {
                    return <div key={uuidv4()} style={{ margin: "5em" }}>
                        <Trip
                            dispatch={dispatch}
                            trip={trip}
                            toggleEditForm={() => toggleEditForm(trip.id)}
                            tripToEdit={tripToEdit}
                            submitEdit={submitEdit}
                        />
                    </div>
                })}
            </div>
        </div>
    }

    return <div><h1>Our Trips</h1>
        {contents}
    </div>
}

export default Trips;