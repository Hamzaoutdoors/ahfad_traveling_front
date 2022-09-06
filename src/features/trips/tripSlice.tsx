import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import produce from "immer";
import { RootState } from "../../app/store"
import { fetchtrips, createTrip, destroytrip, updatetrip } from './tripAPI'

export enum Statuses {
    Initial = "Not Fetched",
    Loading = "Loading...",
    UpToDate = "Up To Date",
    Deleted = "Deleted",
    Error = "Error"
}

export interface TripFormData {
    trip: {
        id?: number;
        title?: string;
        description?: string;
        price?: string;
        image_main?: string;
    }
}

export interface TripState {
    id?: number;
    title?: string;
    description?: string;
    price?: string;
    image_main?: string;
    created_at?: any;
    updated_at?: any;
}

export interface TripsState {
    trips: TripState[];
    status: string;
}

export interface TripUpdateData {
    trip_id: number;
    trip: TripState;
}

export interface TripDeleteData {
    trip: {
        trip_id: number;
    }
}

const initialState: TripsState = {
    trips: [
        {
            id: 0,
            title: "",
            description: "",
            price: "",
            image_main: "",
            created_at: "",
            updated_at: "",
        }
    ],
    status: Statuses.Initial
}

export const fetchTripsAsync = createAsyncThunk(
    'trips/fetchtrips',
    async () => {
        const response = await fetchtrips();
        return response;
    }
)

export const createTripeAsync = createAsyncThunk(
    'trips/createtrip',
    async (payload: TripFormData) => {
        const response = await createTrip(payload);

        return response;
    }
)
export const updateTripAsync = createAsyncThunk(
    'trips/updatetrip',
    async (payload: TripFormData) => {
        const response = await updatetrip(payload);

        return response;
    }
)
export const destroyTripeAsync = createAsyncThunk(
    'trips/destroytrip',
    async (payload: TripDeleteData) => {
        const response = await destroytrip(payload);

        return response;
    }
)

export const tripSlice = createSlice({
    name: "trips",
    initialState,
    /**
     * Synchronous actions
     */
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTripsAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(fetchTripsAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.trips = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })            
            .addCase(fetchTripsAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
            /** Update Section */
            .addCase(createTripeAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(createTripeAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.trips.push(action.payload);
                    draftState.status = Statuses.UpToDate;
                })
            })            
            .addCase(createTripeAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
            /** Destroy Section */
            .addCase(destroyTripeAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(destroyTripeAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.trips = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })            
            .addCase(destroyTripeAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
            /** Update Section */
            .addCase(updateTripAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(updateTripAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    const index = draftState.trips.findIndex(
                        trip => trip.id === action.payload.id
                    );
                    draftState.trips[index] = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })            
            .addCase(updateTripAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
    }
})

export const {} = tripSlice.actions;

export const selecttrips = (state: RootState) => state.trips.trips;

export const selectStatus = (state: RootState) => state.trips.status;

export default tripSlice.reducer;