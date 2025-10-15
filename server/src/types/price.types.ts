import { PriceType } from "@prisma/client";

interface ServicePriceOptionBody {
  duration: string;
  price: number;
  type: PriceType;
}

export { ServicePriceOptionBody}
