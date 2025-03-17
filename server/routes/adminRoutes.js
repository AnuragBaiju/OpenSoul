const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();



router.route('/confession-group')
    .post(  adminController.createConfessionGroup)
    .get(  adminController.getAllConfessionGroups);

router.route('/confession-group/:id')
    .get(  adminController.getConfessionGroup)
    .put(  adminController.updateConfessionGroup)
    .delete(  adminController.deleteConfessionGroup);

router.route('/confession-group/:id/add-member')
    .put(  adminController.addMember);


router.get("/student", adminController.getAllStudents);
router.get("/student/:id", adminController.getStudentById);
router.post("/student", adminController.createStudent);
router.put("/student/:id", adminController.updateStudent);
router.delete("/student/:id", adminController.deleteStudent);

module.exports = router;
