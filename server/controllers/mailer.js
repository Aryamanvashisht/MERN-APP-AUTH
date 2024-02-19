import NodeMailer from 'nodemailer'
import Mailgen from 'mailgen'
import ENV from '../config.js'

let nodeConfig = {
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false,
//     auth: {
//     user: ENV.EMAIL,
//     pass: ENV.PASSWORD,
//   },
     service:'gmail',
     auth:{
        user:ENV.EMAIL,
        pass:ENV.PASSWORD
     }
}

let transporter = NodeMailer.createTransport(nodeConfig)

var  mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
    }
});


export const registerMail = async (req,res)=>{
         
    const{username,userEmail,text,Subject} = req.body
      var email = {
        body: {
            name:username,
            intro:text || "Welcome to the world of Technology and Innovation, we are thrilled to have you on board",
            outro:"Need help? or any questions just reply to this mail, we\'d love to help"
        }
      }

      var emailBody = mailGenerator.generate(email)
      
      let message = {
        from : ENV.EMAIL,
        to: userEmail,
        subject : Subject || "Signup Successful",
        html: emailBody
      }

      let result = await transporter.sendMail(message)
      if(!result) return res.status(500).send({err:"Something went wrong"})

      return res.status(201).send({msg:"You should receive an email from us"})
}