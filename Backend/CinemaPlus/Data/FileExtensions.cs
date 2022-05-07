using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace CinemaPlus.Data
{
    public static class FileExtensions
    {
        public static Cloudinary cloudinary;

        public const string CLOUD_NAME = "cinemaplus";
        public const string API_KEY = "724711436394149";
        public const string API_SECRET = "oRtBYrxfRwHd-vIlzw_jeoP2Zno";

        public static ImageUploadResult UploadImage(string name, Stream stream)
        {
            Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
            cloudinary = new Cloudinary(account);

            try
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(name, stream)
                };
                return cloudinary.Upload(uploadParams);
            }
            catch
            {
                return null;
            }
        }

        public static bool IsImage(this IFormFile file)
        {
            return file.ContentType.Contains("image");
        }

        public static bool IsAllowedSize(this IFormFile file, int mb)
        {
            return file.Length < mb * 1024 * 1000;
        }

        public static async Task<string> GenerateFile(this IFormFile file, string folderPath)
        {
            var fileName = $"{Guid.NewGuid()}-{file.FileName}";
            var path = Path.Combine(folderPath, fileName);

            using (var fileStream = new FileStream(path, FileMode.CreateNew))
            {
                await file.CopyToAsync(fileStream);
            }

            return fileName;
        }
    }
}
