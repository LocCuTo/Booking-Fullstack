require('dotenv').config();
const nodemailer = require('nodemailer');

let sendSimpleEmail = async (data) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"BookingCare 👻" <phananhloc03102001@gmail.com>', // sender address
        to: data.receiverEmail, // list of receivers
        subject: 'Thông tin đặt lịch khám bệnh ✔', // Subject line
        html: getBodyHTMLEmail(data), // html body
    });
};

let getBodyHTMLEmail = (data) => {
    let result = '';
    if (data.language === 'vi') {
        result = `
        <h3>Xin chào ${data.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div>
            <b>Thời gian: ${data.time}</b>
        </div>
        <div>
            <b>Bác sĩ: ${data.doctorName}</b>
        </div>
        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div>
            <a href=${data.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Xin chân thành cảm ơn.</div>
    `;
    }

    if (data.language === 'en') {
        result = `
        <h3>Hello ${data.patientName}!</h3>
        <p>You received this email because you booked an appointment on BookingCare</p>
        <p>You appointment information:</p>
        <div>
            <b>Time: ${data.time}</b>
        </div>
        <div>
            <b>Doctor: ${data.doctorName}</b>
        </div>
        <p>
        If the information is correct, please click on the link below to confirm and complete your appointment.</p>
        <div>
            <a href=${data.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Sincerely.</div>
    `;
    }
    return result;
};

let sendAttachment = async (data) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"BookingCare 👻" <phananhloc03102001@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: 'Kết quả đặt lịch khám bệnh ✔', // Subject line
        html: getBodyHTMLEmailRemedy(data), // html body
        attachments: [
            {
                // encoded string as an attachment
                filename: `remedy-${data.patientId}-${new Date().getTime()}.png`,
                content: data.imgBase64.split('base64,')[1],
                encoding: 'base64',
            },
        ],
    });
};

let getBodyHTMLEmailRemedy = (data) => {
    let result = '';
    if (data.language === 'vi') {
        result = `
        <h3>Xin chào ${data.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare thành công</p>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm:</p>
        <div>Xin chân thành cảm ơn.</div>
    `;
    }

    if (data.language === 'en') {
        result = `
        <h3>Hello ${data.patientName}!</h3>
        <p>You received this email because you booked an appointment on BookingCare</p>
        <p>You appointment information:</p>
        
        <div>Sincerely.</div>
    `;
    }
    return result;
};

module.exports = { sendSimpleEmail, sendAttachment };
