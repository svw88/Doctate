using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    public class DocumentDataController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<DocumentInfo> DocumentList()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new DocumentInfo
            {
                Name = $"Test-{index}",
                DateCreated = DateTime.Now,
                DateUpdated = DateTime.Now
            });
        }

        public class DocumentInfo
        {
            public string Name { get; set; }
            public DateTime DateCreated { get; set; }
            public DateTime DateUpdated { get; set; }           
        }
    }
}
