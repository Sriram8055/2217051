const REGISTRATION_API_URL = "http://20.244.56.144/evaluation-service/register";
const AUTH_API_URL = "http://20.244.56.144/evaluation-service/auth";

/**
 * @param {object} registrationData 
 * @param {string} registrationData.email
 * @param {string} registrationData.name
 * @param {string} registrationData.mobileNo
 * @param {string} registrationData.githubUsername
 * @param {string} registrationData.rollNo
 * @param {string} registrationData.accessCode
 * @returns {Promise<object|null>}
 */
async function register(registrationData) {
    try {
        const response = await fetch(REGISTRATION_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Registration failed: ${response.status} ${response.statusText} - ${errorText}`);
            return null;
        }

        const data = await response.json();
        console.log("Registration successful:", data);
        return { clientID: data.clientID, clientSecret: data.clientSecret };
    } catch (error) {
        console.error("Error during registration:", error);
        return null;
    }
}

/**
 * @param {object} authData
 * @param {string} authData.email
 * @param {string} authData.name
 * @param {string} authData.rollNo
 * @param {string} authData.accessCode
 * @param {string} authData.clientID
 * @param {string} authData.clientSecret
 * @returns {Promise<string|null>}
 */
async function getAuthToken(authData) {
    try {
        const response = await fetch(AUTH_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Authentication failed: ${response.status} ${response.statusText} - ${errorText}`);
            return null;
        }

        const data = await response.json();
        console.log("Authentication successful:", data);
        return data.access_token;
    } catch (error) {
        console.error("Error during authentication:", error);
        return null;
    }
}

module.exports = { register, getAuthToken };
