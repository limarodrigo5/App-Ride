const createNewRide = () => {
    const rideID = Date.now();
    const rideRecord = {
        data: [],
        startTime: rideID,
        stopTime: null
    }

    saveRideRecord(rideID, rideRecord)
    return rideID
}

const deleteRide = (rideID) => {
    localStorage.removeItem(rideID)

}

const getAllRides = () => {
    return Object.entries(localStorage);
    
}

const getRideRecord = (rideID) => {
    return JSON.parse(localStorage.getItem(rideID))
}

const saveRideRecord = (rideID, rideRecord) => {
    localStorage.setItem(rideID, JSON.stringify(rideRecord))
}

const addPosition = (rideID, position) => {
    const rideRecord = getRideRecord(rideID)

    const newData = {
accuracy: position.coords.accuracy,
altitude: position.coords.altitude,
altitudeAccuracy: position.coords.altitudeAccuracy ,
heading:  position.coords.heading,
latitude:  position.coords.latitude,
longitude:  position.coords.longitude,
speed:  position.coords.speed,
timestamp:  position.timestamp

    }
    rideRecord.data.push(newData)
    saveRideRecord(rideID, rideRecord)
}

const updateStopTime = (rideID) => {
    const rideRecord = getRideRecord(rideID)
    rideRecord.stopTime = Date.now()
    saveRideRecord(rideID, rideRecord)
}