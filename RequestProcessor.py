import json
import os
from typing import List
from email.mime.text import MIMEText
import smtplib

class ProcessingStats:
    def __init__(self):
        self.total = 0
        self.success = 0
        self.failed = 0
        self.errors: List[str] = []

class RequestProcessor:
    def __init__(self, smtp_server="smtp.gmail.com", smtp_port=587):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port

    def process_batch(self, request_files: List[str]) -> ProcessingStats:
        stats = ProcessingStats()
        for file in request_files:
            stats.total += 1
            try:
                if self.process_single(file):
                    stats.success += 1
                else:
                    stats.failed += 1
                    stats.errors.append(f"Failed to process {file}")
            except Exception as e:
                stats.failed += 1
                stats.errors.append(f"Error in {file}: {str(e)}")
        return stats

    def process_single(self, file_path: str) -> bool:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Request file not found: {file_path}")

        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Validate required fields
        required = ["owner", "contact_email", "original_url", "infringing_url", "statement", "signature"]
        for field in required:
            if field not in data or not data[field]:
                raise ValueError(f"Missing required field: {field}")

        # Build DMCA email body
        body = self._build_email_body(data)

        # Send email
        self._send_email(
            subject=f"DMCA Takedown Request: {data['infringing_url']}",
            body=body,
            sender=data["contact_email"],
            to="dmca@github.com"
        )
        return True

    def _build_email_body(self, data: dict) -> str:
        return f"""
To: GitHub DMCA Team <dmca@github.com>
From: {data['owner']} <{data['contact_email']}>

Subject: DMCA Takedown Request

I, {data['owner']}, am the copyright holder of the original work located at:
{data['original_url']}

The following infringing material is being hosted without authorization:
{data['infringing_url']}

Statement of Good Faith:
{data['statement']}

I swear, under penalty of perjury, that the information in this notice is accurate
and that I am the copyright owner or authorized to act on behalf of the owner.

Signature:
{data['signature']}
"""

    def _send_email(self, subject: str, body: str, sender: str, to: str):
        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = sender
        msg["To"] = to

        # NOTE: Replace with your Gmail App Password for security
        app_password = os.getenv("GMAIL_APP_PASSWORD")
        if not app_password:
            raise RuntimeError("Missing Gmail App Password in environment variable GMAIL_APP_PASSWORD")

        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.starttls()
            server.login(sender, app_password)
            server.send_message(msg)
