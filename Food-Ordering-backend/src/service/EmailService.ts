// emailUtil.ts
import nodemailer from 'nodemailer';

// Configure your email transport
const transporter = nodemailer.createTransport({
    // Provide your email configuration here
    service: 'gmail',
    auth: {
        user: 'viraj.lakshitha.22222@gmail.com',
        pass: 'vbgvchbgcfvhgfh452454545454',
    },
});

// Function to send order confirmation email
export const sendOrderConfirmationEmail = async (
    email: string,
    orders: any[]
) => {
    try {
        const mailOptions = {
            from: 'viraj.lakshitha.22222@gmail.com',
            to: email,
            subject: 'Order Confirmation',
            text: `Thank you for your order! Here are your order details: ${JSON.stringify(
                orders
            )}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        // Throw the error so that it can be caught in the calling function
        throw error;
    }
};
