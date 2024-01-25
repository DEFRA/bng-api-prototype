# BNG API Prototype

## Introduction

This repository contains an API exercise for DEFRA's Biodiversity Net Gain (BNG) project. The application fetches and returns assets within a given radius of a specified flood station.

## Features

- Retrieve asset data based on flood station ID and radius

## Installation Guide

Follow the steps below to set up the development environment:

1. Clone the repository: `git clone https://github.com/DEFRA/bng-api-prototype.git`
2. Navigate to the project directory: `cd bng-api-prototype`
3. Build the docker image: `docker compose build`
4. Run the docker container: `docker compose up` 

## Usage

The application provides an API to retrieve asset id's within the radius of a flood station. Follow the API documentation for details on how to make requests.

## API Endpoints

### 1. Fetch Flood Station Data by ID and Radius

- **Endpoint:** `/flood-station-by-id-radius/{stationId}`
- **Method:** GET
- **Description:** Fetch flood station data by station ID and radius.
- **Parameters:**
  - `stationId` (required): The station ID of the flood station of interest.
  - `radius` (required): The radius around the flood station to retrieve asset IDs.
- **Expected Response:** An array of filtered asset IDs.

For more detailed information, refer to the Swagger documentation: `/localhost:3000/documentation`

## Technologies Used

- Node.js
- Hapi.js
- Joi for validation
- Swagger for API documentation
- Other dependencies (see `package.json`)

## Authors

- Adam Kay
- Stewart Jumbe

## License

This project is licensed under the [OGL-UK-3.0](LICENSE) License.
