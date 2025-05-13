import { gql } from '@apollo/client';

export const GET_VEHICLES = gql`
  query GetVehicles {
    vehicles {
      identity
      chassisNumber
      modelYear
      color
      lastInspection
      nextInspection
      lastRegistration
    }
  }
`;

export const GET_VEHICLE = gql`
  query GetVehicle($chassisNumber: String!) {
    vehicle(chassisNumber: $chassisNumber) {
      identity
      chassisNumber
      modelYear
      color
      lastInspection
      nextInspection
      lastRegistration
      typeApprovalNumber
      firstRegistration
      privatelyImported
      deregisteredDate
      monthlyRegistration
    }
  }
`;

export const UPLOAD_VEHICLE_FILE = gql`
  mutation UploadVehicleFile($filePath: String!) {
    updateVehicles(filePath: $filePath) {
      added
      updated
    }
  }
`; 