import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize the SES client
const sesClient = new SESClient({
    region: process.env.REGION_NAME as string,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY as string,
        secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
    },
});

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL as string;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST = async (request: Request) => {
    try {
        const { name, email, message } = await request.json();
        if (!name || name.length < 3 || !email || !message || message.length < 10) {
            return Response.json({
                success: false,
                message: "Name must be at least 3 characters long, email must be valid, and message must be at least 10 characters long.",
            }, { status: 400 });
        }
        if (!emailPattern.test(email)) {
            return Response.json({
                success: false,
                message: "Invalid email address.",
            }, { status: 400 });
        }

        const htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="text-align: center; color: #333;">You have a new message from ${name}</h2>
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p style="white-space: pre-line;">${message}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                <footer style="text-align: center; color: #777;">
                    <p>This email was sent from your website's contact form.</p>
                </footer>
            </div>
        `;

        const params = {
            Destination: {
                ToAddresses: [adminEmail],
            },
            Message: {
                Body: {
                    Html: {
                        Data: htmlTemplate,
                    },
                },
                Subject: { Data: `Message from ${name}` },
            },
            Source: adminEmail,
        };

        const command = new SendEmailCommand(params);
        await sesClient.send(command);

        return Response.json({
            success: true,
            message: "Message sent successfully.",
        }, { status: 200 });
    } catch (error: any) {
        return Response.json({
            success: false,
            message: "Error while calling the mail API.",
            error: error.message,
        }, { status: 500 });
    }
};