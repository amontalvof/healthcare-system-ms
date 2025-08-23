export const APPOINTMENT_SCHEDULED_TEMPLATE = `
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Appointment Confirmation</title>
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
            }
            .content h1 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #333;
                text-align: center;
            }
            .content p {
                font-size: 16px;
                color: #555;
                line-height: 1.5;
            }
            .details-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            .details-table th,
            .details-table td {
                padding: 12px 15px;
                border: 1px solid #ddd;
                text-align: left;
            }
            .details-table th {
                background: #f9f9f9;
                font-weight: bold;
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
                <h2>Appointment Confirmation</h2>
            </div>
            <div class="content">
                <h1>Your Appointment is Scheduled</h1>
                <p>Dear {{name}},</p>
                <p>
                    Thank you for scheduling your appointment. Here are your
                    appointment details:
                </p>
                <table class="details-table">
                    <tr>
                        <th>Date &amp; Time</th>
                        <td>{{date}}</td>
                    </tr>
                    <tr>
                        <th>Doctor</th>
                        <td>{{doctor}}</td>
                    </tr>
                    <tr>
                        <th>Hospital</th>
                        <td>{{hospital}}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{{address}}</td>
                    </tr>
                    <tr>
                        <th>Contact</th>
                        <td>{{countryCode}} {{phone}}</td>
                    </tr>
                </table>
                <p>
                    Please arrive a few minutes early and feel free to contact
                    us if you have any questions or need to reschedule.
                </p>
            </div>
            <div class="footer">
                &copy; 2025 Healthcare System. All rights reserved.
            </div>
        </div>
    </body>
</html>
`;
