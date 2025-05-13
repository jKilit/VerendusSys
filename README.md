# Vehicle Inspection System

A GraphQL-based system for managing vehicle inspections and registrations.

## Features

- Parse vehicle data from text files
- Track vehicle inspections and registrations
- Sort vehicles by inspection dates
- Update vehicle information from new data files
- GraphQL API for querying and updating vehicle data

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server in development mode with hot-reloading.

### Production Mode

1. Build the application:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

The GraphQL Playground will be available at `http://localhost:4000`

## GraphQL API

### Queries

- `vehicles`: Get all vehicles sorted by inspection date
- `vehicle(chassisNumber: String!)`: Get a specific vehicle by chassis number

### Mutations

- `updateVehicles(filePath: String!)`: Update vehicles from a new data file

## Data File Format

The system expects vehicle data files in the following format:

```
Field           Type    Length  Start Position
Identity        String  7       1
Chassis Number  String  19      8
Model Year      Number  4       27
Type Approval   Number  11      31
First Reg.      Number  8       42
Private Import  Number  1       50
Dereg. Date     Number  8       51
Color           String  20      59
Last Inspect.   Number  8       79
Next Inspect.   Number  8       87
Last Reg.       Number  8       95
Monthly Reg.    Number  4       103
```

## License

ISC 