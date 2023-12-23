const getLocationData = async (latitute, longitude) => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitute}&longitude=${longitude}&=localityLanguage=en`

    const response = await fetch(url)
return await response.json()

}


const toRad = (degree) => {
    return degree * Math.PI / 180;

}

const getMaxSpeed = (positions) => {
    let maxSpeed= 0
positions.forEach(position => {
    if(position.speed  != null && position.speed > maxSpeed) {
        maxSpeed = position.speed
    }
})

    return (maxSpeed*3.6).toFixed(1)
}

const  getDistance= (positions) => {
const earthRadiusKm = 6371;
let totalDistance = 0;
for(let i=0;  i<positions.length -1 ; i++ ) {
    const pos1 = {
        latitude:positions[i].latitude,
        longitude:positions[i].longitude
    }

    const pos2 = {
        latitude:positions[i+1].latitude,
        longitude:positions[i+1].longitude
    }

    const deltaLatitude = toRad(pos2.latitude - pos1.latitude)
    const deltaLongitude = toRad(pos2.longitude - pos1.longitude)

    const sphericalLawTerm =
        Math.sin(deltaLatitude/2) *
        Math.sin(deltaLatitude/2) +
        Math.cos(toRad(pos1.latitude)) * 
        Math.cos(toRad(pos2.latitude)) *
        Math.sin(deltaLongitude/2) * 
        Math.sin(deltaLongitude/2);

    const angularDistance = 2 * Math.atan2(Math.sqrt(sphericalLawTerm), Math.sqrt(1-sphericalLawTerm));

    const distance = earthRadiusKm * angularDistance;

    totalDistance += distance;

}


return totalDistance.toFixed(2)

}

const getDuration = (ride) => {
    const interval = ride.stopTime - ride.startTime
    return `${Math.floor(interval/1000/60)}:${Math.floor(interval/1000%60)}`
}

const getStartDate = (ride) => {
    const date = new Date(ride.startTime)
    
const day = date.toLocaleString('pt-BR', {day: 'numeric'})
const month = date.toLocaleString('pt-BR', {month: 'short'})
const year =  date.toLocaleString('pt-BR', {year: 'numeric'})


const hour = date.toLocaleString('pt-BR', {hour: '2-digit'})
const minute = date.toLocaleString('pt-BR', {minute: '2-digit'})

return `${hour}:${minute} - ${day} de ${month} ${year} `	


}