const nodeMailer = require('../config/nodemailer')

//another way of exporting the method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from:'rishabhfordevelopment',
        to :comment.user.email,
        subject:"new comment",
        html: htmlString
    },
    (err,info)=>{
        if(err){console.log("error in sending mail",err);return;
        }
        console.log("sent",info)
        return;
    })}