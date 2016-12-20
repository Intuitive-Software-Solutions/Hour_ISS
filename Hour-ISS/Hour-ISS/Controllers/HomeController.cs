using Hour_ISS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tweetinvi;
using Tweetinvi.Models;

namespace Hour_ISS.Controllers
{
    public class HomeController : Controller
                    
    {
        IEnumerable<ISSTimesModel> ISScontext; 
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
        public ActionResult Save(IEnumerable<ISSTimesModel> ISSLocations)
        {
            ISScontext = ISSLocations;
            return View("Save");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }

}