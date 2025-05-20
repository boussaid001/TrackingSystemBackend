import { HttpStatusCode } from 'axios';

import { PackageModel } from '../../models/package.model';
import { ProductModel } from '../../models/produit.model';
import { ProductService } from '../../services/product.service';
import { LineTypeService } from '../../services/lineType.service';
import { PackageService } from '../../services/package.service';
import { LineTypeDoc, LineTypeModel } from '../../models/line-type.model';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

const packageService = new PackageService();

export async function getPackageByFilter(req, res) {
    const x = req;

     const packages = await packageService.getpackagesByFilter(req);

    if (packages['error']) {
        return res.status(HttpStatusCode.BadRequest).json({ ...packages });
    }
    return res.status(HttpStatusCode.Ok).json({ packages });
}

export async function addPackage(req, res): Promise<any> {
    try {
        console.log("Request body:", JSON.stringify(req.body, null, 2));
        
        try {
            // Find the LineType by ID first
            const lineTypeId = req.body.lineTypeID;
            console.log("LineType ID:", lineTypeId);
            
            const lineTypeService = new LineTypeService();
            // Define lineType with proper type that can be null or a Document
            let lineType: Document<unknown, {}, LineTypeDoc> | null = null;
            
            // Try to find by ID first
            try {
                lineType = await lineTypeService.getLineTypeById(lineTypeId);
                console.log("Found LineType:", lineType);
            } catch (error) {
                console.log("Error finding LineType:", error);
                
                // If not found by ID, try to find by code
                try {
                    lineType = await LineTypeModel.findOne({ code: 'DEFAULT' });
                    console.log("Found default LineType:", lineType);
                } catch (err) {
                    console.log("Error finding default LineType:", err);
                }
                
                // If still not found, create a new LineType
                if (!lineType) {
                    console.log("Creating a new LineType");
                    lineType = await LineTypeModel.create({
                        code: 'DEFAULT',
                        label: 'Default Line Type',
                        color: 'blue'
                    });
                    console.log("Created new LineType:", lineType);
                }
            }
            
            // Make sure we have a valid LineType
            if (!lineType) {
                throw new Error("Could not find or create a LineType");
            }
            
            // Update the request body with the LineType ID
            req.body.lineTypeID = lineType._id;
            
            // Create the products
            const productService = new ProductService();
            console.log("Creating products:", req.body.products);
            
            const products = await productService.createProducts(req.body.products);
            console.log("Created products:", products);
            
            // Map product IDs for the package
            const productIds = products.map((product: any) => product._id);
            
            // Create the package
            const packageCreated = await packageService.create({
                ...req.body,
                products: productIds
            });
            
            console.log("Created package:", packageCreated);
            
            // Update products with the package ID
            const packageId = packageCreated._id;
            for (const product of products) {
                await ProductModel.findByIdAndUpdate(product._id, { packageId });
            }
            
            // Get all packages with their products
            const packagesWithProducts = await PackageModel.find({}).populate(
                'products'
            );
            
            return res.status(200).json({
                message: 'created succefully',
                data: packageCreated,
                packages: packagesWithProducts
            });
        } catch (error) {
            console.error("Error in addPackage:", error);
            return res.status(400).json({
                error,
                message: 'Erreur lors de la création du package: ' + error.message
            });
        }
    } catch (error) {
        console.error("Unexpected error in addPackage:", error);
        return res.status(500).json({
            error,
            message: 'Erreur inattendue lors de la création du package: ' + error.message
        });
    }
}

export async function getProductsByIds(req, res) {
    try {
        const  ids  = req.body;
   
        const products = await ProductModel.find({ _id: { $in: ids } });
        
        return res.status(200).json({
            data: products,
            products: products
        });
    } catch (error) {
        return res.status(HttpStatusCode.BadRequest).json({
            error,
            message: 'Erreur lors de la création du package'
        });
    }
}
