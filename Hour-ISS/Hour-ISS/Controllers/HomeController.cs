using Hour_ISS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using Tweetinvi;
using Tweetinvi.Models;
using Tweetinvi.Parameters;

namespace Hour_ISS.Controllers
{
    public class HomeController : Controller
                    
    {
        ISSTimesModel[] ISScontext; 
        public ActionResult Index()
        {
            // Applies credentials for the current thread. If used for the first time, set up the ApplicationCredentials
            Auth.SetUserCredentials("rQXVi4nESqkh8ifCAphk8QOYd", "9N6oGQfQT2rFm0xb14HQdDZ1Mj2ziHk5WwOvEfNVoM6f7ef9LN", "2851725184-faNigI3hfCeQ8plPDvzcSybyEyXvxGcdTsfzv1j", "1bYXwUXZPCuRhu8cBW1SljOQTC54MDY53S02FApjjFnJd");
            // When a new thread is created, the default credentials will be the Application Credentials
            Auth.ApplicationCredentials = new TwitterCredentials("rQXVi4nESqkh8ifCAphk8QOYd", "9N6oGQfQT2rFm0xb14HQdDZ1Mj2ziHk5WwOvEfNVoM6f7ef9LN", "2851725184-faNigI3hfCeQ8plPDvzcSybyEyXvxGcdTsfzv1j", "1bYXwUXZPCuRhu8cBW1SljOQTC54MDY53S02FApjjFnJd");

            return View();
        }


        public ActionResult Save()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Save(ISSTimesModel[] ISSLocations)
        {
            ISScontext = ISSLocations;
            
            for(int i= 0; i<ISScontext.Length; i++)
            {
                ISScontext[i].tweets = GetTweets(i);
                ISScontext[i].name = GetName(i);
                ISScontext[i].trends = GetTrends(i);
            }

            HttpContext.Application["ISSdb"] = ISScontext;
            return View("Save");
        }

        [HttpGet]
        public ActionResult PostData()
        {
            while (HttpContext.Application["ISSdb"] == null)
            {
                Thread.Sleep(10);
            }
            return Json((ISSTimesModel[])HttpContext.Application["ISSdb"], JsonRequestBehavior.AllowGet);
        }
        public ITweet[] GetTweets(int id)
        {
            if (ISScontext != null)
            {
                var searchParameter = new SearchTweetsParameters("*")
                {
                    GeoCode = new GeoCode(ISScontext[id].lat, ISScontext[id].lng, 100, DistanceMeasure.Miles),
                    SearchType = SearchResultType.Popular,
                    MaximumNumberOfResults = 10,
                    Filters = TweetSearchFilters.Images
                };

                var tweets = Search.SearchTweets(searchParameter);
                if (tweets == null)
                {
                    tweets = new ITweet[0];
                }
                return tweets.ToArray();
            }
            return null;

        }

        public string GetName(int id)
        {
            var name = "";
            if (ISScontext != null)
            {
                var closestTrendLocations = Trends.GetClosestTrendLocations(ISScontext[id].lat, ISScontext[id].lng);
                if (closestTrendLocations != null)
                {
                    name = closestTrendLocations.ElementAt(0).Name;
                   
                }
            }
            return name;
        }
        public ITrend[] GetTrends(int id)
        {
            if (ISScontext != null)
            {
                var closestTrendLocations = Trends.GetClosestTrendLocations(ISScontext[id].lat, ISScontext[id].lng);
                if (closestTrendLocations != null)
                {
                    var woe = closestTrendLocations.ElementAt(0).WoeId;
                    try
                    {
                        var trendingTopics = Trends.GetTrendsAt(woe);
                        return trendingTopics.Trends.ToArray();
                    }
                    catch(NullReferenceException )
                    {
                        return null;
                    }
                }
                return null;
            }
            return null;

        }
    }


}