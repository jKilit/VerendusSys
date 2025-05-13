import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { VehicleResolver } from './resolvers/vehicleResolvers';
import * as path from 'path';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { VehicleService } from './services/VehicleService';
import { Request, Response } from 'express';


/**
 * Main entry point for the backend server. Sets up Express, Apollo Server, and REST endpoints.
 * Handles server initialization, middleware configuration, and API routing.
 */

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [VehicleResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const app = express();
  
  // Enable CORS
  app.use(cors());
  
  // Enable file uploads
  app.use(fileUpload());
  
  // Create Apollo Server
  const server = new ApolloServer({
    schema,
  });

  // Add REST endpoint for file uploads
  app.post('/upload', async (req: Request, res: Response  ) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'Ingen fil hittades' });
    }

    const file = req.files.file as fileUpload.UploadedFile;
    
    if (!file.name.endsWith('.txt')) {
      return res.status(400).json({ error: 'Endast .txt filer är tillåtna' });
    }

    try {
      const filePath = path.join(__dirname, '../data/vehicles.txt');
      await file.mv(filePath);
      
      const vehicleService = new VehicleService(filePath);
      const result = await vehicleService.updateFromFile(filePath);
      
      res.json(result);
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Ett fel uppstod vid uppladdningen' });
    }
  });

  // Apply Apollo Server middleware
  await server.start();
  server.applyMiddleware({ app: app as any, path: '/graphql' });

  // Start server
  const port = 4000;
  app.listen(port, () => {
    console.log(`Server is running, GraphQL Playground available at http://localhost:${port}/graphql`);
  });
}

bootstrap().catch(console.error);
