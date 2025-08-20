const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

async function Log(stack, level, packageName, message, authToken) {

    const logData = {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: packageName.toLowerCase(),
        message: message,
        timestamp: new Date().toISOString() 
    };

    try {
        const headers = {
            "Content-Type": "application/json",
        };
        if (authToken) {
            headers["Authorization"] = `Bearer ${authToken}`;
        }

        const response = await fetch(LOG_API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(logData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to send log: ${response.status} ${response.statusText} - ${errorText}`);
        } else {
            console.log("Log sent successfully:", logData);
        }
    } catch (error) {
        console.error("Error sending log:", error);
    }
}

module.exports = { Log };
