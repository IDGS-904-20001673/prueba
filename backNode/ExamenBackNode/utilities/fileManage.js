const multer = require('multer');
const fs = require('fs');

const fileStorage = (path) => multer.diskStorage({
    destination: (req, file, cb) => {
        let folder;
        let directory;
        if (req.body.name || req.body.title){
            if (req.body.name){
                folder = removeSpecialChars(req.body.name.trim().replaceAll(' ', '-').toLowerCase());
            }else if (req.body.title){
                folder = removeSpecialChars(req.body.title.trim().replaceAll(' ', '-').toLowerCase());
            }
            directory = `public/images/${path}/${folder}`
        }else {
            directory = `public/images/${path}`
        }
        fs.mkdirSync(directory, { recursive: true });
        return cb(null, directory);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname.trim().replaceAll(' ', '-')}`)
    }
})

const upload = (path) => multer({
    storage: fileStorage(path),
    limits: { fieldSize: 50 * 1024 * 1024 }
})

function removeSpecialChars(string) {
    return string.replace(/[^\w\s]/gi, '');
}

module.exports = upload;