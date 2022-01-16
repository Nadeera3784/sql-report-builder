const nodemailer  = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const config_app = require('../config/app');

const SgClient = nodemailer.createTransport(nodemailerSendgrid({apiKey: config_app.app.sendgrid_key}));

const Mailer = module.exports;

Mailer.send = async function(data){
    const {from, to, subject, html} = data;
    const fileName = 'report_'+Date.now()+'.csv';
    const msg = {
        to: to, 
        from: from, 
        subject: subject,
        text: 'O2O',
        html: html,
        attachments: [{
            filename: fileName,
            path: 'public/report.csv'
        }]
    }
    return await SgClient.sendMail(msg);
}