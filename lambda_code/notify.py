import json
import boto3
from datetime import datetime
from datetime import date
from flask import Flask, jsonify, request
from datetime import timedelta
from botocore.exceptions import ClientError
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
import os
import re
import string
import random

ses = boto3.client('ses')
SENDER = os.environ['SENDER_EMAIL']
recipient = os.environ['recipient']

def lambda_handler(event, context):
    try:
        Title = event.get("Title")
        print(Title)
        body = "We have noticed that new content has been generated. The link for given content is provided below."
        html_body = "We have noticed that new content has been generated. The link for given content is provided below."
        notify_user(recipient, body, html_body)
        
    except:
        print("[Error] Somethning failed.")
    
    return {
        'statusCode': 200,
        'body': json.dumps('Execution Completed.')
    }
        
    
    
    
def notify_user(recipient, body, html_body):
    print("[INFO] Sending email to External agency.")
    CcAddresses ="sabademayur@gmail.com"
    CONFIGURATION_SET = "iam-access-key-rotator-configset"
    SUBJECT = "Attention - Verification Required For Medical Content."
    body = "Hi " + ",\r\n\r\n" + body + "\r\n\r\nPlease verify the given content.\r\n\r\nThanks, \r\nAWS Platform Automations"
    html_body = "Hi " + ",<br><br>" + html_body + "<br>Please verify the given content.<br><br>Thanks, <br>AWS Platform Automations"
    BODY_TEXT = (body)
    BODY_HTML = "<html><head></head><body><p>" + html_body + "</p></body></html>"
    CHARSET = "UTF-8"
    # Create a multipart/mixed parent container.
    msg = MIMEMultipart('mixed')
    # Add subject, from and to lines.
    msg['Subject'] = SUBJECT 
    msg['From'] = SENDER 
    msg['To'] = recipient
    msg['Importance'] = 'High'
    msg['Cc'] = CcAddresses
    
    # Encode the text and HTML content and set the character encoding. This step is necessary if you're sending a message with characters outside the ASCII range.
    textpart = MIMEText(BODY_TEXT.encode(CHARSET), 'plain', CHARSET)
    htmlpart = MIMEText(BODY_HTML.encode(CHARSET), 'html', CHARSET)
    # Create a multipart/alternative child container.
    msg_body = MIMEMultipart('alternative')
    
    # Add the text and HTML parts to the child container.
    msg_body.attach(textpart)
    msg_body.attach(htmlpart)
    
    # Attach the multipart/alternative child container to the multipart/mixed parent container.
    msg.attach(msg_body)
    
    try:
        #Provide the contents of the email.
        response = ses.send_raw_email(
            Source=SENDER,
            Destinations=[
                recipient,
                CcAddresses
                ],
            RawMessage={
                'Data':msg.as_string(),
            },
            # Optional configurationSet
            ConfigurationSetName=CONFIGURATION_SET,
        )
    # Display an error if something goes wrong.	
    except ClientError as e:
        print(e.response['Error']['Message'])
        print("[ERROR] Something went wrong while sending SES notification to " + recipient + " for user " + user_name)
    else:
        print("[INFO] Email sent, Message ID:" + response['MessageId'] + " to user external agency.")
    return

