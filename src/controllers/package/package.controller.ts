import { HttpStatusCode } from 'axios';

import { PackageModel } from '../../models/package.model';
import { ProductModel } from '../../models/produit.model';
import { ProductService } from '../../services/product.service';
import { LineTypeService } from '../../services/lineType.service';
import { PackageService } from '../../services/package.service';

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
        const lineTypeId = req.body.lineTypeID;
        console.log(1)
        const lineTypeService = new LineTypeService();
        console.log(2)

        console.log(lineTypeId)

        const existedLineType =
            await lineTypeService.getLineTypeById(lineTypeId);
            console.log(3)

        if (!existedLineType) {
            throw new Error('LineType Not Found');
        }
        console.log(4)

        const productService = new ProductService();
        console.log(5)

        const products = await productService.createProducts(req.body.products);
        console.log(6)

        const packageCreated = await packageService.create({
            ...req.body,
            products
        });
        const packageId = packageCreated._id;
        for (const product of products) {
            await ProductModel.findByIdAndUpdate(product._id, { packageId });
        }
        const packagesWithProducts = await PackageModel.find({}).populate(
            'products'
        );
        return res.status(200).json({
            message: 'created succefully',
            data: packageCreated,
            packages: packagesWithProducts
        });
    } catch (error) {
        return res.status(HttpStatusCode.BadRequest).json({
            error,
            message: 'Erreur lors de la création du package'
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
