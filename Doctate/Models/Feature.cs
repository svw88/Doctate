using System.Collections.Generic;

namespace Doctate.Models
{
    public class FeatureModel
    {
        public FeatureModel()
        {
            SubFeatures = new List<SubFeatureModel>();
        }
        public string Feature { get; set; }
        public IEnumerable<SubFeatureModel> SubFeatures { get; set; }

    }
}
