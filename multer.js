const multer = require('multer');
const path = require('path')


// storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }
})

// file validations
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        // prevent upload
        cb({
            message: "unsupported file format"
        }, false)
    }
}

// initialize upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024*1024},
    fileFilter: fileFilter
}).single('image'); 

module.exports = upload;