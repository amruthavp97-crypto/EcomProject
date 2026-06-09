from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.conf import settings

class EmailService:

    def send_verification_email(user_email,user_name,verification_url):
        subject = "Verify Your Email - Welcome to MyCart "

        html_message = f'''
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 10px; }}
                .content {{ padding: 20px; background-color: #f9fafb; border-radius: 10px; margin: 20px 0; }}
                .button {{ display: inline-block; background-color: #000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }}
                .footer {{ text-align: center; color: #666; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Email Verification</h1>
                </div>
                
                <div class="content">
                    <p>Hello <strong>{user_name}</strong>,</p>
                    <p>Thank you for signing up! To activate your account, please verify your email address by clicking the button below:</p>
                    
                    <center>
                        <a href="{verification_url}" class="button">Verify Email</a>
                    </center>
                    
                    <p>Or copy this link: <br><code>{verification_url}</code></p>
                    
                    <p>This link will expire in 1 hours.</p>
                    <p>If you didn't create this account, please ignore this email.</p>
                </div>
                
                <div class="footer">
                    <p>&copy; 2024 mycart. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>        
    '''

        try:
            send_mail(
                subject = subject,
                message = strip_tags(html_message),
                from_email = settings.DEFAULT_FROM_EMAIL,
                recipient_list = [user_email],
                html_message = html_message,
                fail_silently = False,
            )
            return True
        except Exception as e:
            print("Error in Sending mail :" , str(e))
            return False

    def send_welcome_email(user_email,user_name):
        subject = " Welcome to Our Platform : Mycart"
        html_message = f"""
        <!DOCTYPE html>
        <html>
        <body>
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                <h1>Welcome {user_name}!</h1>
                <p>Your account has been verified successfully.</p>
                <p>You can now access all features of our platform.</p>
            </div>
        </body>
        </html>
        """
        try:
            send_mail(
                subject = subject,
                message = strip_tags(html_message),
                from_email = settings.DEFAULT_FROM_EMAIL,
                recipient_list = [user_email],
                html_message = html_message,
                fail_silently = False,
            )
            return True
        except Exception as e:
            print("Error while sending welcome malil:",str(e))  
            return False