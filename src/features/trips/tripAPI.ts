import { TripDeleteData, TripFormData, TripsState } from "./tripSlice";

const API_URL = "http://localhost:3000";

export async function fetchtrips() {
  return fetch(`${API_URL}/trips.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      return {} as TripsState;
    });
}

export async function createTrip(payload: TripFormData) {
  const trip = payload.trip;
  return fetch(`${API_URL}/trips.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trip,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      return {} as TripsState;
    });
}
export async function updatetrip(payload: TripFormData) {
  const trip = payload.trip;
  return fetch(`${API_URL}/trips/${trip.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trip,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      return {} as TripsState;
    });
}

export async function destroytrip(payload: TripDeleteData) {
  const trip = payload.trip;
  return fetch(`${API_URL}/trips/${trip.trip_id}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trip,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      return {} as TripsState;
    });
}

