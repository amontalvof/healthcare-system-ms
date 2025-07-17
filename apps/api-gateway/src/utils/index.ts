export function imageFilter(
    _req: Express.Request,
    file: Express.Multer.File,
    cb: Function,
): void {
    const validExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file?.mimetype?.split('/')[1];
    if (!validExtensions.includes(fileExtension)) {
        return cb(null, false);
    }
    cb(null, true);
}
