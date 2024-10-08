export const emailTemplate = (message) => {
	return `
	<body style="margin: 0; padding: 0; font-family: Inter, sans-serif; font-size: 14px; width: 100% !important; background-color: #f5f5f5;">
		<table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0; width: 100% !important; line-height: 100% !important; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
			<tr>
				<td align="center" style="border-collapse: collapse;">
					<table style="background-color: #f5f5f5; padding: 70px 0; font-family: Inter, sans-serif; color: #333;">
						<table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
							<tr>
								<td align="center" style="padding: 40px 0 0 0;">
									<img src="cid:logo@cid" alt="Logo" width="70" style="display: block;" />
								</td>
							</tr>
							<tr>
								<td style="padding: 20px 40px; text-align: center;">
									<p style="font-size: 14px; margin-bottom: 10px;">This is your inquiry:</p>
									<p style="font-size: 14px; margin-bottom: 20px; font-weight: bold">${message}</p>
									<p style="font-size: 14px; margin-bottom: 30px;">We will get back to you with answers, otherwise...</p>
									<a target="_blank"  href="https://www.visitnorway.com/" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
										Go to Norway
									</a>
								</td>
							</tr>
							<tr>
								<td style="padding: 30px 0; text-align: center; font-size: 11px; color: #888;">
									<p style="margin: 0;">&copy; ${new Date().getFullYear()} The App Company. All rights reserved.</p>
								</td>
							</tr>
						</table>
					</table>
				</td>
			</tr>
		</table>
    </body>
    `;
};
