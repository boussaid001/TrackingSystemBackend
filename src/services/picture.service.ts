import { Request, Response } from 'express';
import multer from 'multer';
import { S3 } from 'aws-sdk';
import { HttpStatusCode } from 'axios';

import { PictureDoc, PictureModel } from '../models/picture.model';
import { BaseService } from './base.service';
export class PictureService extends BaseService<PictureDoc> {
    constructor() {
        super(PictureModel);
    }
    // Initialize AWS S3 client
    s3 = new S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    });

    // Method to handle picture upload
    async uploadPicture(req: Request, res: Response) {
        // Set up multer middleware for picture upload
        const upload = multer().single('file');
        // Handle the picture upload
        upload(req, res, async (err: any) => {
            if (err) {
                return res
                    .status(400)
                    .json({ message: 'Error uploading picture', error: err });
            }
            try {
                if (!req.file) {
                    throw new Error('File does not exist');
                }
                // Add AWS S3 service before saving url to Database
                const uploadParams = {
                    Bucket: process.env.S3_BUCKET_NAME || 'packages-pfe',
                    Key: req?.file?.originalname,
                    Body: req?.file?.buffer
                };
                const uploadResult = await this.s3
                    .upload(uploadParams)
                    .promise();

                // create picture with baseService Create

                const pictureData = {
                    url: uploadResult.Location,
                    fileName: req?.file?.originalname
                    // Add other picture properties as needed
                };
                const picture = await this.create(pictureData);
                // Return success response
                return res.status(HttpStatusCode.Ok).json({
                    message: 'Picture uploaded successfully',
                    picture
                });
            } catch (error) {
                // Handle database errors
                return res.status(500).json({
                    message: 'Error saving picture to database',
                    error
                });
            }
        });
    }
    // Method to handle picture download by file name
    async downloadPicture(req: Request, res: Response) {
        try {
            // Get the file name from request parameters
            const { fileName } = req.params;
            const existingPicture = await PictureModel.findOne({
                fileName
            });
            if (!existingPicture) {
                throw new Error('Picture does not exist');
            }

            // Download the picture from S3 using the file name
            const downloadParams = {
                Bucket: process.env.S3_BUCKET_NAME || '',
                Key: fileName // Use the file name as the S3 object key
            };
            const downloadResult = await this.s3
                .getObject(downloadParams)
                .promise();

            // Return the picture data
            res.setHeader('Content-Type', 'image/png');
            res.send(downloadResult.Body);
        } catch (error) {
            // Handle errors
            res.status(500).json({
                message: 'Error downloading picture from S3',
                error: error.message // Send only the error message
            });
        }
    }
}
