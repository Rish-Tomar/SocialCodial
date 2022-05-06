const queue=require('../config/kue')

const commentMailer=require('../mailers/comments-mailer')


queue.process('new comment',function(job,done){
    console.log('email worker is processing a job',job.data);


    commentMailer.newComment(job.data)

    done()
})