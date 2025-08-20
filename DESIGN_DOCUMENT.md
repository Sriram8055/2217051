# URL Shortener Application Overview

## 1. What this App Does

This application is a URL Shortener. It takes a long web address (URL) and turns it into a much shorter, easier-to-share link. When someone clicks the short link, they are automatically sent to the original long web address. It also keeps track of some basic information and handles common issues.

## 2. Key Features

Here's what the app can do:

*   **Logging**: It records important events and errors using a special logging system, not just basic console messages.
*   **Simple Structure**: It's built as one main piece of software (a microservice) that handles all the link shortening tasks.
*   **No User Login Needed**: For this project, you don't need to create an account or log in to use the link shortening features.
*   **Unique Short Links**: Every short link created is unique, so there are no duplicates.
*   **Default Expiry**: If you don't set an expiry time, short links will automatically expire after 30 minutes. You can set a custom expiry in minutes.
*   **Custom Short Links**: You can suggest your own short code (like `mycoollink`). If it's available and valid, the app will use it. Otherwise, it will create a random one for you.
*   **Redirection**: Clicking a short link automatically sends you to the original long URL.
*   **Error Messages**: If something goes wrong (e.g., you provide a bad URL, or the short link doesn't exist or has expired), the app will give a clear error message.

## 3. How It's Built

The app is a web service built with Node.js and a framework called Express.js. It works like a set of instructions (APIs) that other programs can use.

*   **Main Tools**:
    *   **Node.js & Express.js**: For running the web server.
    *   **Crypto Module**: For creating random, secure short codes.
    *   **Logger**: A separate tool (`logger.js`) for sending important messages.
*   **How It Stores Data**: It uses a simple temporary storage system (an object in memory) to remember which short link goes to which long URL. For a real-world app, this would be a proper database.

## 4. How to Use the App (API Endpoints)

You interact with the app by sending requests to specific web addresses (endpoints).

### 4.1. Create a Short Link

*   **What it does**: Makes a new short link.
*   **Method**: `POST` (you send data to it)
*   **Address**: `/shorturls`
*   **What to Send (Example)**:
    ```json
    {
      "url": "https://your-very-long-website-address.com/page",
      "validity": 60,       // Optional: Link expires in 60 minutes
      "shortcode": "mycode" // Optional: Your custom short link code
    }
    ```
*   **What You Get Back (Example if successful)**:
    ```json
    {
      "shortLink": "http://localhost:3000/mycode",
      "expiry": "2025-01-01T01:00:00Z" // When the link expires
    }
    ```
*   **Possible Errors**:
    *   `URL is required`: You didn't provide a URL.
    *   `Malformed URL`: The URL you provided isn't a valid web address.
    *   `Invalid custom shortcode format`: Your custom code isn't valid (e.g., too short, wrong characters).
    *   `Custom shortcode already in use`: Someone else already took that custom code.

### 4.2. Go to the Original Link

*   **What it does**: Takes a short link and sends you to the original long URL.
*   **Method**: `GET` (you ask for information)
*   **Address**: `/:your_short_code` (e.g., `/mycode`)
*   **Possible Errors**:
    *   `Short URL not found`: The short link doesn't exist.
    *   `Short URL has expired`: The short link existed but is no longer active.

## 5. How Data is Stored (Simple View)

The app keeps a list of short codes and their details. Each entry looks like this:

```
"your_short_code": {
  "originalUrl": "the long web address",
  "createdAt": "when the short link was made (date/time)",
  "expiresAt": "when the short link will stop working (date/time)"
}
```

## 6. How Short Links are Made

*   If you provide a custom short code, the app checks if it's unique and valid.
*   If not, it creates a random, unique 8-character code using a secure method (`crypto.randomBytes`).
*   It calculates when the link should expire based on your input or a default of 30 minutes.
*   It then saves all this information.

## 7. Logging System

The app uses a special `logger.js` file to send important messages (like errors or successful operations) to an external system. This helps in monitoring how the app is working.
