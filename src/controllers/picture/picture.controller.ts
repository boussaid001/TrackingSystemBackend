import { PictureService } from '../../services/picture.service';

const pictureService = new PictureService();

export async function uploadPicture(req, res) {
    return await pictureService.uploadPicture(req, res);
}

export async function downloadPicture(req, res) {
    return await pictureService.downloadPicture(req, res);
}
