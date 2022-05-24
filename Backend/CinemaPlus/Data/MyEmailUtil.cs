using CinemaPlus.Models.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Mail;

namespace CinemaPlus.Data
{

    public static class MyEmailUtil
    {
        public static void SendSubcribeEmail(string email, string title, string body)
        {
            try
            {
                MailMessage msg = new();

                msg.Body = body;
                msg.Subject = title;
                msg.IsBodyHtml = true;
                msg.From = new MailAddress("nvideyo@gmail.com", "CinemaPlus");
                msg.To.Add(email);

                SmtpClient smtp = new();

                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                //smtp.Credentials = new NetworkCredential("codep320@gmail.com", "codeacademyp320");
                smtp.Credentials = new NetworkCredential("nvideyo@gmail.com", "Lhx99lhx");
                smtp.Send(msg);
            }
            catch
            {
            }
        }
    }
}
