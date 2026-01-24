import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public'); //folder where files will be stored temporarily//
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); //keeping original file name//
    }
})

export const upload = multer({ storage});