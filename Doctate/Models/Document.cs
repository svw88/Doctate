using System.Collections.Generic;

namespace Doctate.Models
{
    public class DocumentModel
    {
        public DocumentModel()
        {
            Features = new List<FeatureModel>();
            Software = new List<SoftwareModel>();
        }
        public string OperatingSystem { get; set; }
        public IEnumerable<FeatureModel> Features { get; set; }
        public string Type { get; set; }
        public string Cpu { get; set; }
        public string Memory { get; set; }
        public string Disk { get; set; }
        public IEnumerable<SoftwareModel> Software { get; set; }
        public string Instructions { get; set; }
        public string Debugging { get; set; }

    }
}
