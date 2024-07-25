const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cron = require('node-cron');
const AWS = require('aws-sdk');
const db = require("./conn");
const Learner = require('./models/Learner');
const Program = require('./models/Program');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = 3000;

//Cors 

const allowedOrigins = [
    'https://humble-space-halibut-v7rxq576prxfpr77-5173.app.github.dev'
  ];

  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you need to send cookies
  }));

const SES = {
    accessKeyId: process.env.SES_ACCESS_KEY,
    secertAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
}

// Set up AWS SES
AWS.config.update({
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
});
const ses = new AWS.SES();

app.use(bodyParser.json());

// Function to read JSON file
const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        }
        catch (err) {
            console.log("Error in reading file : ", err)
        }
    });
};

// Function to send email
const sendEmail = (to, subject, htmlContent, textContent) => {
    const params = {
        Destination: {
            ToAddresses: Array.isArray(to) ? to : [to]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: htmlContent
                },
                Text: {
                    Charset: "UTF-8",
                    Data: textContent
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: 'praneethdevarasetty31@gmail.com',  // Replace with your verified SES email address
    };
    console.log(`Sending welcome email to: ${to}`);

    return ses.sendEmail(params).promise();
};

// Function to send welcome email to program creator
const sendWelcomeEmail = async (program) => {
    const subject = `Enrollment Confirmation: ${program.program_name}`;
    const htmlContent = `<h1>Hello,</h1>
                       <p>You have created a new program: ${program.program_name}</p>
                       <p>${program.program_description}</p>`;
    const textContent = `Hello,\n\nYou have created a new program: ${program.program_name}\n\n${program.program_description}`;
    const email ='praneethdevarasetty31@gmail.com'
    try {
        console.log(`Sending welcome email to: ${email}`);
        const promise = await sendEmail(email, subject, htmlContent, textContent);
        console.log("Welcome Email sent")
        console.log(" promise : " , promise)
    }
    catch (err) {
        console.log("Error in sending Email : ", err)
    }
};

// Function to send reminder email at module start date
const sendReminderEmail = async (program) => {
    const subject = `Reminder: Upcoming Module in ${program.program_name}`;
    const htmlContent = `<h1>Reminder</h1>
                       <p>A module in your program ${program.program_name} is about to start.</p>`;
    const textContent = `Reminder\n\nA module in your program ${program.program_name} is about to start.`;


    try {
        await sendEmail(program.created_by.$oid, subject, htmlContent, textContent);
        console.log("Reminder Email Sent")
    }
    catch (err) {
        console.log("Reminder Failed to sent : ", err)
        console.log(AWS.config)
    }
};

// Function to send activity start email
const sendActivityStartEmail = async (program) => {
    const subject = `Activity Starting in ${program.program_name}`;
    const htmlContent = `<h1>Activity Starting</h1>
                       <p>An activity in your program ${program.program_name} is about to start.</p>`;
    const textContent = `Activity Starting\n\nAn activity in your program ${program.program_name} is about to start.`;


    try {
        await sendEmail(program.created_by.$oid, subject, htmlContent, textContent);
        console.log("Activity Email Sent")
    }
    catch (err) {
        console.log("Activity Failed to sent : ", err)
    }
};

// Function to send thank you email to learners
const sendThankYouEmail = async (learner, program) => {
    const subject = `Thank You for Enrolling in ${program.program_name}`;
    const htmlContent = `<h1>Thank You, ${learner.learner_name}</h1>
                       <p>Thank you for enrolling in the program: ${program.program_name}</p>
                       <p>${program.program_description}</p>`;
    const textContent = `Thank You, ${learner.learner_name}\n\nThank you for enrolling in the program: ${program.program_name}\n\n${program.program_description}`;

    await sendEmail([learner.email_id, learner.alt_email_id], subject, htmlContent, textContent);
    try {
        await sendEmail([learner.email_id, learner.alt_email_id], subject, htmlContent, textContent);
        console.log("Thank you Email Sent")
    }
    catch (err) {
        console.log("Thank you Failed to sent : ", err)
    }
};

// Function to upload data to MongoDB
const uploadDataToMongoDB = async () => {
    try {
        const learners = await readJsonFile('./sfl_product.learner_data.json');
        const programs = await readJsonFile('./sfl_product.program_data.json');

        // await Learner.deleteMany({});
        // await Program.deleteMany({});

        await Learner.insertMany(learners);
        await Program.insertMany(programs);

        console.log('Data uploaded to MongoDB successfully');
    } catch (error) {
        console.error('Error uploading data to MongoDB:', error);
    }
};

//date parsing
const parseDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
};
// await sendWelcomeEmail(program);

const sendemail=async()=>{
    try{
        const programs = await Program.find();
        for (const program of programs) {
            await sendWelcomeEmail(program);
        }

    }
    catch(err){
        console.log(err)
        console.log("aws ",AWS.config)
    }
}


app.post('/email',async(req,res)=>{
    // console.log(req)
    const {to, email,subject, message } = req.body
    //sendemail()
    const htmlContent = `<h1>Hello,</h1>
                       <p>${message}</p>`;
    const textContent = `You Have Message !!!`;
    try {
        console.log(`Sending welcome email to: ${email}`);
        const promise = await sendEmail(email, subject, htmlContent, textContent);
        console.log("Welcome Email sent")
        console.log(" promise : " , promise)
        res.json({
            "to":to,
            "email":email,
            "subject":subject,
            "message":message
        })
    }
    catch (err) {
        console.log("Error in sending Email : ", err)
        res.status(500).json({
            "Message":"Failed to sent Email"
        })
    }
    
    
})
// Schedule the cron jobs for emails
// cron.schedule('* * * * *', async () => { // Runs every minute for testing, adjust timing as needed
//     console.log("handeler at corn ")
//     try {
//         const programs = await Program.find();
//         const now = new Date();

//         for (const program of programs) {
//             // const createdAt = new Date(program.created_at?.$date);
//             // if (createdAt && createdAt <= now && program.status === 0) {
//             //     await sendWelcomeEmail(program);
//             //     program.status = 1;
//             //     await program.save();
//             // } else {
//             //     console.error('created_at or $date is undefined', program);
//             // }

//             for (const module of program.modules_list) {
//                 // Parse the start date using the Date constructor
//                 const moduleStartDate = new Date(module.module_start_date);
//                 console.log('Module Start Date:', moduleStartDate);
            
//                 if (moduleStartDate && moduleStartDate <= now && module.status === 0) {
//                     await sendReminderEmail(program);
//                     module.status = 1;
//                     await program.save();
//                 } else {
//                     console.error('Module start date is invalid or module status is not 0', module);
//                 }
            
//                 for (const activity of module.activity_list) {
//                     // Parse the start date using the Date constructor
//                     const activityStartDate = new Date(activity.activity_start_date);
//                     console.log('Activity Start Date:', activityStartDate);
            
//                     if (activityStartDate && activityStartDate <= now && activity.status === 0) {
//                         await sendActivityStartEmail(program);
//                         activity.status = 1;
//                         await program.save();
//                     } else {
//                         console.error('Activity start date is invalid or activity status is not 0', activity);
//                     }
//                 }
//             }
//         }

//         const learners = await Learner.find();

//         for (const learner of learners) {
//             for (const assignedProgram of learner.programs_assigned) {
//                 const program = programs.find(prog => prog._id.toString() === assignedProgram.program_id.toString());

//                 if (program && learner.status === 0) {
//                     await sendThankYouEmail(learner, program);
//                     learner.status = 1;
//                     await learner.save();
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error sending emails:', error);
//     }
// });

// Initial data upload to MongoDB
//uploadDataToMongoDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
