// const express = require('express');
// const router = express.Router();

// const itemController = require('../controllers/itemMasterController.js');


// const uploadMiddleware = (req, res, next) => {
//     upload.single('image')(req, res, function (err) {

//         if (err instanceof multer.MulterError) {
//             if (err.code === 'LIMIT_FILE_SIZE') {
//                 return res.json({
//                     status: 0,
//                     message: 'File size must be less than 5MB'
//                 });
//             }
//         } else if (err) {
//             return res.json({
//                 status: 0,
//                 message: err.message
//             });
//         }

//         next();
//     });
// };

// // Route
// router.post('/uploadToPinata', uploadMiddleware, itemController.uploadToPinata);

const express = require('express');
const router = express.Router();
 
const multer = require('multer');
const upload = require('../config/upload');
 
const itemController = require('../controllers/itemMasterController.js');
 
// Middleware
const uploadMiddleware = (req, res, next) => {
    upload.single('file')(req, res, function (err) {
 
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.json({
                    status: 0,
                    message: 'File size must be less than 5MB'
                });
            }
        } else if (err) {
            return res.json({
                status: 0,
                message: err.message
            });
        }
 
        next();
    });
};
 
// Route
router.post('/uploadToPinata', uploadMiddleware, itemController.uploadToPinata);

router.post('/enquiry', itemController.createEnquiry);
router.get('/getEnquiries', itemController.getEnquiries);
router.get('/enquiry/:id', itemController.getEnquiry);
router.post('/deleteEnquiry', itemController.deleteEnquiry);
router.post('/updateEnquiry', itemController.updateEnquiry);



router.post('/blog', itemController.createBlog);
router.get('/getBlogs', itemController.getBlogs);
router.get('/blog/:id', itemController.getBlog);
router.post('/updateBlog', itemController.updateBlog);
router.post('/deleteBlog', itemController.deleteBlog);


router.post("/Createdoctors", itemController.createDoctor);
router.get("/getdoctors", itemController.getDoctors);
router.get("/doctors/:id", itemController.getDoctorById);
router.post("/updatedoctors", itemController.updateDoctor);
router.post("/deletedoctors", itemController.deleteDoctor);



router.post('/titles', itemController.createTitle);
router.get('/getTitles', itemController.getTitles);
router.get('/title/:id', itemController.getTitle);
router.post('/deleteTitle', itemController.deleteTitle);
router.post('/updateTitle', itemController.updateTitle);


router.get('/titleDropdown', itemController.getTitleDropdown);


router.get('/dashboardCounts', itemController.getDashboardCounts);



module.exports = router;