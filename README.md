# Auto Measure

This repository is a technical test for Shopper. It implements the Google Gemini API to read gas and water consumption measurements from an image. It combines the API and a React application.

This Test version uses local storage to save images, but I have implemented a file storage system in the app. However, it's not in production because I can't control the .env file to include the storage token. That’s how I would implement it if it was a real application going for production.

### 1. Clone the project
   ```bash
   git clone https://github.com/VictorSnt/auto_measurer.git
   cd auto_measurer
   ```
### 2. Generate Your Gemini API Key

1. Go to the [Gemini API portal](https://ai.google.dev/gemini-api/docs/api-key).
2. Follow the instructions to generate an API key.

### 2. Create the `.env` File

1. In the root directory of your project, create a file named `.env`.
2. Add the API key to the `.env` file in the following format:

    ```env
    GEMINI_API_KEY=Your_API_Key_Here
    ```

### 3. Build and Start the Services

1. Make sure Docker and Docker Compose are installed on your system.
2. Run the following command to build and start the services:

    ```bash
    docker-compose up --build
    ```

This command will build and start the necessary containers using the settings specified in the `.env` file.

### note

Project api runs on port 3000
Project frontend runs on port 80
If you want to access the app outside the server, don't forget to add the
```bash
    REACT_APP_API_URL=http://Your_host:3000
```
On the .env.production file inside the auto_measure_react project