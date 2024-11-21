using Microsoft.AspNetCore.Hosting;

namespace ReactORTanstack_Query.API.Upload
{
    public class UploadFiles
    {
        private readonly IWebHostEnvironment _wevEnvironment;
        public UploadFiles(IWebHostEnvironment wevEnvironment)
        {

            _wevEnvironment = wevEnvironment;

        }
        public string SaveImage(IFormFile File)
        {
            if (File != null)
            {


                string wwroot = _wevEnvironment.WebRootPath;
                string Ext = Guid.NewGuid().ToString() + Path.GetExtension(File.FileName);
                string fileName = Path.Combine("https://localhost:7258" + "/images/", Ext);
                string imagepath = Path.Combine(wwroot, "images", Ext);

                // Check if the file already exists and delete it if so
                if (System.IO.File.Exists(imagepath))
                {
                    System.IO.File.Delete(imagepath);  // Delete the old file
                }

                // Ensure the images directory exists
                if (!Directory.Exists(Path.Combine(wwroot, "images")))
                {
                    Directory.CreateDirectory(Path.Combine(wwroot, "images"));
                }

                using (var filestream = new FileStream(imagepath, FileMode.Create))
                {
                    File.CopyTo(filestream);
                }
                return fileName;
            }
            return string.Empty;
        }
    }
}
