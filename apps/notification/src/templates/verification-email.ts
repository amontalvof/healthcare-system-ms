export const VERIFICATION_EMAIL_TEMPLATE = `<!doctype html>
<html lang="en" xml:lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Verify Your Email</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background: #f2f2f2;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }
            .email-container {
                background: #ffffff;
                width: 100%;
                max-width: 600px;
                margin: 30px auto;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: #000000;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 30px;
                text-align: center;
            }
            .content h1 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #333;
            }
            .content p {
                font-size: 16px;
                color: #555;
                line-height: 1.5;
            }
            .code-box {
                display: inline-block;
                padding: 15px 30px;
                background: #b2c2dc;
                border: 2px dashed #000000;
                color: #000000;
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 4px;
                margin: 20px 0;
                border-radius: 5px;
            }
            .footer {
                padding: 15px;
                text-align: center;
                background: #f2f2f2;
                font-size: 12px;
                color: #999;
            }
            @media screen and (max-width: 600px) {
                .email-container {
                    width: 95%;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h2>Verify Your Email</h2>
            </div>
            <div class="content">
                <h1>Account Verification</h1>
                <p>
                    Please use the following verification code to complete your
                    sign up:
                </p>
                <div class="code-box">{{verificationCode}}</div>
                <p>If you did not request this, please ignore this email.</p>
            </div>
            <div class="footer">
                &copy; 2025 Healthcare System. All rights reserved.
            </div>
        </div>
    </body>
</html>
`;
