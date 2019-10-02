using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    public class DocumentDataController : Controller
    {
        private string DirectoryPath;
        public DocumentDataController()
        {
            var directory = $"{Directory.GetCurrentDirectory()}\\Documents";
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            };

            DirectoryPath = directory;
        }

        [HttpGet("[action]")]
        public IEnumerable<DocumentInfo> DocumentList()
        {

            var files = Directory.GetFiles(DirectoryPath).Where(x => x.Split('.').Last() == "json");
            var fileInfo = files.Select(x => new FileInfo(x));
            return fileInfo.Select(file => new DocumentInfo
            {
                Name = file.Name.Replace($"{file.Extension}",""),
                DateCreated = file.CreationTime,
                DateUpdated = file.LastWriteTime
            });
        }


        [HttpGet("[action]")]
        public IActionResult CreateDocument(string name)
        {
            if (!System.IO.File.Exists($"{DirectoryPath}\\{name}.json"))
            {
                System.IO.File.Create($"{DirectoryPath}\\{name}.json").Dispose();
                return Ok();
            }
            else
            {
                return new ContentResult { StatusCode = 600, Content = "File Already Exists", ContentType = "text/plain" };
            }

        }

        [HttpPost("[action]")]
        public IActionResult UpdateDocument([FromQuery]string name, [FromBody]Document document)
        {

            if (System.IO.File.Exists($"{DirectoryPath}\\{name}.json"))
            {

                System.IO.File.WriteAllText($"{DirectoryPath}\\{name}.json", JsonConvert.SerializeObject(document));

                return Ok();
            }
            else
            {
                return new ContentResult { StatusCode = 409, Content = "File Not Found", ContentType = "text/plain" };
            }


        }

        [HttpGet("[action]")]
        public ActionResult<Document> GetDocument([FromQuery]string name)
        {

            if (System.IO.File.Exists($"{name}.json"))
            {

                var result = JsonConvert.DeserializeObject<Document>(System.IO.File.ReadAllText($"{name}.json"));

                return Ok(result);
            }
            else
            {
                return new ContentResult { StatusCode = 409, Content = "File Not Found", ContentType = "text/plain" };
            }


        }

    }

    public class DocumentInfo
    {
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }

    public class Document
    {
        public string OperatingSystem { get; set; }
        public string Features { get; set; }
        public string Cpu { get; set; }
        public string Memory { get; set; }
        public string Disk { get; set; }
        public string Software { get; set; }
        public string Instructions { get; set; }
        public string Debugging { get; set; }

    }


}
