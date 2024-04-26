export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places' ,  {
        method : "PUT",
        body: JSON.stringify({ places }),
        headers: {
            "content-type": "application/json"
        }
    });


const resData = await response.json();

if (!response.ok) {
    throw new Error('Failed to update user data');
}

return resData.message
}

export async function getUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user places');
    }

    const responseData = await response.json();
    return responseData.places;
}
