import { Injectable } from '@nestjs/common';
import * as path from 'path';

import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
    }

    async upload(
        file: Express.Multer.File,
        folderPath: string,
    ): Promise<string> {
        // derive public_id from original filename (without extension) to overwrite if same
        const publicId = path.parse(file.filename).name;
        const options = {
            folder: folderPath,
            public_id: publicId,
            overwrite: true,
        };
        // If file.buffer exists (either as Buffer or serialized) normalize to Buffer and upload via stream
        if (file.buffer) {
            let bufferData: Buffer | null;
            if (Buffer.isBuffer(file.buffer)) {
                bufferData = file.buffer;
            } else if (Array.isArray((file.buffer as any).data)) {
                bufferData = Buffer.from((file.buffer as any).data);
            } else {
                bufferData = null;
            }
            if (bufferData) {
                return new Promise<string>((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        options,
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result?.secure_url || '');
                        },
                    );
                    stream.end(bufferData);
                });
            }
        }
        // Otherwise, if a disk path is provided, use the standard upload
        if (file.path && typeof file.path === 'string') {
            const response = await cloudinary.uploader.upload(
                file.path,
                options,
            );
            return response.secure_url;
        }
        return '';
    }
}
