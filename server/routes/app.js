const {check}   = require('express-validator');
const express = require('express');
const router = express.Router();

const { AppController , AuthController,  DataSetController, ScheduleController, AnalyticController, TestController}  = require('../controllers');
const {tokenGuard} = require('../services/Guard');

router.get('/', AppController.index);

router.post('/auth',
[
     check('o2o_id')
    .not().isEmpty()
    .withMessage("o2o_id is required"),
    check('org_id')
    .not().isEmpty()
    .withMessage("org_id is required"),
],
AuthController.createToken);

router.get('/datasets',  tokenGuard, DataSetController.getAllDataSets);

router.get('/datasets/:id', DataSetController.getDataSetsByID);

router.post('/datasets/:id', 
[
    check('attributes')
    .not().isEmpty()
    .withMessage("Attributes is required"),
],
DataSetController.createQuickReport);

router.get('/datasets/custom-report/:id',  DataSetController.createReportFromCustomReport);

router.get('/datasets/events/:id', DataSetController.getEventsByOrganizationID);


router.get('/custom-reports', tokenGuard, DataSetController.getAllCustomReports);

router.get('/custom-reports/user/:id', DataSetController.getCustomReportsByUserId);

router.get('/custom-reports/:id', DataSetController.getCustomReportByID);

router.get('/custom-reports/availability/:name', DataSetController.getNameAvailability);

router.post('/custom-reports', 
[
    check('dataset_id')
    .not().isEmpty()
    .withMessage("dataset_id is required"),
    check('name')
    .not().isEmpty()
    .withMessage("name is required"),
    check('attributes')
    .not().isEmpty()
    .withMessage("attributes is required")
],
tokenGuard,
DataSetController.createCustomReport);

router.post('/delete-custom-reports', 
[
    check('custom_report_ids')
    .not().isEmpty()
    .withMessage("custom_report_ids is required")
],
DataSetController.deleteMultipleCustomReport);

router.post('/magic-link', 
[
    check('organization')
    .not().isEmpty()
    .withMessage("organization is required")
],
DataSetController.generateMagicLinks);


router.get('/schedule-reports', tokenGuard, ScheduleController.getAllSchedules);

router.get('/schedule-reports/user/:id', ScheduleController.getSchedulesByUserId);

router.post('/schedule-reports', 
[
    check('custom_report_id')
    .not().isEmpty()
    .withMessage("custom_report_id is required"),
    check('date')
    .not().isEmpty()
    .withMessage("date is required")
],
tokenGuard,
ScheduleController.createScheduleReport);

router.post('/delete-schedule-reports', 
[
    check('schedules_ids')
    .not().isEmpty()
    .withMessage("schedules_ids is required")
],
ScheduleController.deleteMultipleSchedules);

router.get('/analytics', tokenGuard, AnalyticController.index);

router.get('/analytics/:id', tokenGuard, AnalyticController.view);

router.get('/reset', TestController.reset);



module.exports = router;