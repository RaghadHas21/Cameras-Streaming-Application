# Cameras-Streaming-Application

This is a Cameras Streaming Application built with React, Mapbox, and mock data for streaming camera feeds. The application displays camera locations on a map and streams live video from each camera.

Features

Interactive Map: Visualize camera locations on a Mapbox map.
Live Camera Feeds: View live camera streams with an embedded video player.
Mock Server: The camera data is served from a mock server, simulating real-time streaming data.

Tech Stack

Frontend: React
Map: Mapbox GL JS
Mock Data: JSON Server (for serving camera data)
Streaming Service: Mux (for camera streams)
Environment Variables: Store API tokens and URLs in .env for security.

Setup

1. Clone the repository
git clone https://github.com/RaghadHas21/cameras-streaming-application.git
cd cameras-streaming-application
2. Install dependencies
Install the necessary npm packages.

npm install
3. Setup Environment Variables
Create a .env file in the root of the project and add the Mapbox and Mock API keys:

VITE_MAPBOX_TOKEN=pk.eyJ1IjoicmFnaGFkLTI1IiwiYSI6ImNtOWpqY3hycTBjZ2sya3M2em8yeXRmZmEifQ.3l9u-VFEPPydUBzL2285ug
VITE_API_BASE_URL=http://localhost:4000/cameras
4. Run the mock server
Start the mock server to serve the camera data.

npm run mock-server
This will start a mock server that serves the camera data from http://localhost:4000/cameras.

5. Start the application
Start the application in development mode.

npm run dev
This will launch the app in the browser.
