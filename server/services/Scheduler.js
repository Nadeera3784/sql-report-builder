const cron     = require('node-cron');
const moment   = require('moment');

const ScheduleReport = require('../services/ScheduleReport');
const Builder        = require('../services/Builder');
const Logger         = require('../services/Logger');
const Mailer         = require('../services/Mailer');

const Scheduler = module.exports;

Scheduler.runner = async function () {
    cron.schedule('0 */1 * * * *', async function(){
        ScheduleReport.service.findAll().then(async function(data){
            for (let index = 0; index < data.length; index++) {
                const query_date = moment(new Date(data[index].date)).format('Y-M-DD hh:mm A');
                const now_date = moment().format('Y-M-DD hh:mm A');
                if(query_date === now_date){
                    const id = data[index].custom_report_id;
                    const report_path = Builder.CustomReportBuilder(id, null);
                    const sendTo = (data[index].email != undefined) ? data[index].email : "support@test.dev";
                    const mailData = {
                        from: 'support@test.dev',
                        to : sendTo,
                        subject : 'Scheduled report',
                        html : '<p>Your scheduled report for '+ query_date +'</p>'
                    };
                    await Mailer.send(mailData);
                    await ScheduleReport.service.update({_id: data[index]._id}, {'status' : 'sent'});
                }
            }
        }).catch(function (error) {
            Logger.error('error', error);
        }); 
    });
}
