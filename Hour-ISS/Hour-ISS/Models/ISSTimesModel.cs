using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Tweetinvi.Models;

namespace Hour_ISS.Models
{
    public class ISSTimesModel
    {

        public string time { get; set; }
        public double lat { get; set; }
        public double lon { get; set; }
        public string location { get; set; }
        public ITweet[] tweets { get; set; }
    
    }
}