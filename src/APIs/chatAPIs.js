const serverLink = 'http://localhost:5000';

export const createConversation = async (userId1, userId2) => {
    
    try{
        const response = await fetch(`${serverLink}/conversations`, {
            method: 'POST',
            body: JSON.stringify({userId1: userId1, userId2: userId2}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            return response.json().then((data) => {
                let errorMessage = 'Error creating conversation!';
                if (data && data.error || data.error.message) {
                    errorMessage = data.error.message || data.error;
                }
                throw new Error(errorMessage);
            });
        }
        console.log(data);
        return data;
    } catch(err){
        console.log(err.message);
        return "";
    }
}
