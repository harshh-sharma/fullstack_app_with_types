import prisma from "../config/db";
import { CategoryBody } from "../types/catgory.types";
import {Request, Response} from "express";
import { ServiceBody } from "../types/service.types";
import { ServiceType } from "@prisma/client";
import { ServicePriceOptionBody } from "../types/price.types";

export const createCategory = async (req:Request, res:Response) => {
    try {
        const {name} = req.body as CategoryBody;

        const category = await prisma.category.create({
            data:{
                name
            }
        });

        return res.status(200).json({
            success:true,
            message:"category created successfully",
            data:category
        })
    } catch (error:any) {
        return res.status(500).json({
            success:false,
            message:error?.message
        })
    }
}


export const getCategories = async (req:Request,res:Response) => {
    try {
        const categories = await prisma.category.findMany({});
        return res.status(200).json({
            success:true,
            message:"successfully get categories",
            data:categories
        })
    } catch (error:any) {
        return res.status(500).json({
            success:false,
            message:error?.message
        })
    }
}

export const updateCategory = async (req:Request, res:Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const {name} = req.body as CategoryBody;

        const isCategoryExist = await prisma.category.findUnique({
        where: { id },
        });

        if(!isCategoryExist){
            return res.status(404).json({
                success:false,
                message:"category not found"
            })
        }

        const category = await prisma.category.update({
            where:{id},
            data:{name}
        });

        return res.status(200).json({
            success:true,
            message:"successfully category updated",
            data:category
        })
    } catch (error:any) {
         return res.status(500).json({
            success:false,
            message:error?.message
        })
    }
}

export const deleteCategory = async (req:Request,res:Response) => {
    try {
        const id = parseInt(req.params.id);

        const isCategoryExist = await prisma.category.findUnique({
            where:{id},
            include:{services:true}
        });
        
        if(!isCategoryExist){
            return res.status(404).json({
                success:false,
                message:"catgory not found"
            });
        }

        if(isCategoryExist.services?.length !== 0){
            return  res.status(400).json({
                success:false,
                message:"category not able to delete service is present"
            });
        }
        await prisma.category.delete({
            where:{id}
        });

        return res.status(200).json({
            success:true,
            message:"successfully deleted category"
        })
    } catch (error:any) {
        return res.status(500).json({
            success:false,
            message:error?.message
        })
    }
}

export const getServicesRelatedToCategory = async (req:Request, res:Response) => {
    try {
        const id = parseInt(req.params.id);
        
        const category = await prisma.category.findUnique({
            where:{id},
            include:{services:true}
        });

        if(!category){
            return res.status(404).json({
                success:false,
                message:"category not found"
            });
        }

       const services = category.services;

    if (!services || services.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No services found related to this category",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched services related to the category",
      data: services,
    });
    } catch (error:any) {
      return res.status(500).json({
            success:false,
            message:error?.message
        })  
    }
}


export const addServiceRelatedToCategory = async (req:Request, res:Response) => {
    try {
        const categoryId = parseInt(req.params.id);
        const { name, type, priceOptions } = req.body as ServiceBody & { priceOptions?: ServicePriceOptionBody[] };

        const category = await prisma.category.findUnique({ where:{id:categoryId} });
        if(!category){
            return res.status(404).json({ success:false, message:"category not found" });
        }

        // validate service type
        if (!Object.values(ServiceType).includes(type)) {
            return res.status(400).json({
                success:false,
                message:`Invalid service type. Must be one of: ${Object.values(ServiceType).join(", ")}`
            });
        }

        const service = await prisma.service.create({
            data: {
                name,
                type,
                categoryId,
                priceOptions: priceOptions ? {
                    create: priceOptions.map(po => ({
                        duration: po.duration,
                        price: po.price,
                        type: po.type
                    }))
                } : undefined
            },
            include: { priceOptions: true } 
        });

        return res.status(200).json({
            success:true,
            message:"service created successfully",
            data: service
        });

    } catch (error:any) {
        return res.status(500).json({ success:false, message:error?.message });
    }
}

export const deleteServiceRelatedToCategory = async (req:Request, res:Response) => {
    try {
        const categoryId = parseInt(req.params.categoryId);
        const serviceId = parseInt(req.params.serviceId);

        const category = await prisma.category.findUnique({
            where:{id:categoryId}
        });

        if(!category){
            return res.status(404).json({
                success:false,
                message:"category not found"
            });
        }

        const service = await prisma.service.findUnique({
            where:{id:serviceId}
        });

        if(!service){
            return res.status(404).json({
                success:false,
                message:"service not found"
            });
        }

        await prisma.service.delete({
            where:{id:serviceId}
        })

        return res.status(200).json({
            success:true,
            message:"service successfully deleted"
        })
    } catch (error:any) {
        return res.status(500).json({
            success:false,
            message:error?.message
        });
    }
}

export const updateServiceRelatedToCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const serviceId = parseInt(req.params.serviceId);
    const { name, type, priceOptions } = req.body as Partial<ServiceBody> & { priceOptions?: ServicePriceOptionBody[] };

    if (isNaN(categoryId) || isNaN(serviceId)) {
      return res.status(400).json({ success: false, message: "Invalid category or service ID" });
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    const service = await prisma.service.findUnique({ where: { id: serviceId }, include: { priceOptions: true } });
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });

    if (service.categoryId !== categoryId) {
      return res.status(400).json({ success: false, message: "Service does not belong to the specified category" });
    }

    // validate service type
    if (type && !Object.values(ServiceType).includes(type)) {
      return res.status(400).json({ success: false, message: `Invalid service type. Must be one of: ${Object.values(ServiceType).join(", ")}` });
    }

    // update service details
    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        name: name ?? service.name,
        type: type ? (type as ServiceType) : service.type,
        priceOptions: priceOptions ? {
          // delete old price options and create new ones
          deleteMany: {},
          create: priceOptions.map(po => ({
            duration: po.duration,
            price: po.price,
            type: po.type
          }))
        } : undefined
      },
      include: { priceOptions: true } // include price options in response
    });

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService
    });

  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message || "Internal server error" });
  }
};
