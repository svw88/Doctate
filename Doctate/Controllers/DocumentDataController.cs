using Doctate.Models;
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
        public IEnumerable<DocumentInfoModel> DocumentList()
        {

            var files = Directory.GetFiles(DirectoryPath).Where(x => x.Split('.').Last() == "json");
            var fileInfo = files.Select(x => new FileInfo(x));
            return fileInfo.Select(file => new DocumentInfoModel
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
        public IActionResult UpdateDocument([FromQuery]string name, [FromBody]DocumentModel document)
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
        public ActionResult<DocumentModel> GetDocument([FromQuery]string name)
        {

            if (System.IO.File.Exists($"{DirectoryPath}\\{name}.json"))
            {
                var result = JsonConvert.DeserializeObject<DocumentModel>(System.IO.File.ReadAllText($"{DirectoryPath}\\{name}.json"));

                return Ok(result);
            }
            else
            {
                return new ContentResult { StatusCode = 409, Content = "File Not Found", ContentType = "text/plain" };
            }


        }

        [HttpGet("[action]")]
        public IActionResult DeleteDocument([FromQuery]string name)
        {

            if (System.IO.File.Exists($"{DirectoryPath}\\{name}.json"))
            {
                System.IO.File.Delete($"{DirectoryPath}\\{name}.json");

                return Ok();
            }
            else
            {
                return new ContentResult { StatusCode = 409, Content = "File Not Found", ContentType = "text/plain" };
            }


        }

    }

}
