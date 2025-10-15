import { ServiceType } from "@prisma/client";

interface ServiceBody {
  name: string;
  type: ServiceType; 
}

export { ServiceBody };
