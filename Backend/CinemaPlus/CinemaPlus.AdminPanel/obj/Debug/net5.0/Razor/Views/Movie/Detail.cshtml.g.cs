#pragma checksum "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "bb4fee1dc858e7f1602133db1f8a9de367ff1e1c"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Movie_Detail), @"mvc.1.0.view", @"/Views/Movie/Detail.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\_ViewImports.cshtml"
using CinemaPlus.AdminPanel;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\_ViewImports.cshtml"
using CinemaPlus.AdminPanel.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\_ViewImports.cshtml"
using CinemaPlus.Models.Entities;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\_ViewImports.cshtml"
using CinemaPlus.AdminPanel.ViewModels;

#line default
#line hidden
#nullable disable
#nullable restore
#line 1 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
using System.Globalization;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bb4fee1dc858e7f1602133db1f8a9de367ff1e1c", @"/Views/Movie/Detail.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b2799cb604341674b684080db859df7a1d9ff24d", @"/Views/_ViewImports.cshtml")]
    #nullable restore
    public class Views_Movie_Detail : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<Movie>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 3 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
  
    ViewData["Title"] = "Detail";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<div class=""content content-wrapper"">
    <div class=""container-fluid"">
        <div class=""event-details-area blog-area pt-150 pb-140"">
            <div class=""container"">
                <div class=""row"">
                    <div class=""col-md-12"">
                        <div class=""event-details row justify-content-between align-items-center"">
                            <iframe class=""col-12""
                                    ");
            WriteLiteral("                                    height=\"600px\"\n                                    src=\"");
#nullable restore
#line 17 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                    Write(Model.Detail.Trailer);

#line default
#line hidden
#nullable disable
            WriteLiteral(@"""
                                    title=""YouTube video player""
                                    frameBorder=""0""
                                    allow=""accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture""
                                    allowFullScreen></iframe>
                            <img class=""d-inline-block col-3 pt-3""");
            BeginWriteAttribute("src", " src=\"", 1028, "\"", 1046, 1);
#nullable restore
#line 22 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
WriteAttributeValue("", 1034, Model.Image, 1034, 12, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(" alt=\"event-details\">\n                            <div class=\"event-details-content col-9 pl-4 pt-3\">\n                                <h2 class=\"pt-2 pb-2\">");
#nullable restore
#line 24 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                                 Write(Model.Name);

#line default
#line hidden
#nullable disable
            WriteLiteral("</h2>\n                                <p>");
#nullable restore
#line 25 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                              Write(Html.Raw(Model.Detail.Description));

#line default
#line hidden
#nullable disable
            WriteLiteral("</p>\n                                <ul class=\"p-2\">\n                                    <li><span>In cinema:</span> ");
#nullable restore
#line 27 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                                           Write(Model.Detail.StartInCinema.ToString("dd MMM yyyy",CultureInfo.InvariantCulture));

#line default
#line hidden
#nullable disable
            WriteLiteral(" - ");
#nullable restore
#line 27 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                                                                                                                              Write(Model.Detail.EndInCinema.ToString("dd MMM yyyy",CultureInfo.InvariantCulture));

#line default
#line hidden
#nullable disable
            WriteLiteral("</li>\n                                    <li><span>Country:</span> ");
#nullable restore
#line 28 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                                         Write(Model.Detail.Country);

#line default
#line hidden
#nullable disable
            WriteLiteral("</li>\n                                    <li>\n                                        Directors:\n");
#nullable restore
#line 31 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                         foreach (var director in Model.MovieDirectors)
                                        {

#line default
#line hidden
#nullable disable
            WriteLiteral("                                            <span>");
#nullable restore
#line 33 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                             Write(director.Director.Name);

#line default
#line hidden
#nullable disable
            WriteLiteral(" ");
#nullable restore
#line 33 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                                                     Write(director.Director.Surname);

#line default
#line hidden
#nullable disable
            WriteLiteral(", </span>\n");
#nullable restore
#line 34 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                        }

#line default
#line hidden
#nullable disable
            WriteLiteral("                                    </li>\n                                    <li>\n                                        Actors:\n");
#nullable restore
#line 38 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                         foreach (var actor in Model.MovieActors)
                                        {

#line default
#line hidden
#nullable disable
            WriteLiteral("                                            <span>");
#nullable restore
#line 40 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                             Write(actor.Actor.Name);

#line default
#line hidden
#nullable disable
            WriteLiteral(" ");
#nullable restore
#line 40 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                                               Write(actor.Actor.Surname);

#line default
#line hidden
#nullable disable
            WriteLiteral(", </span>\n");
#nullable restore
#line 41 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                        }

#line default
#line hidden
#nullable disable
            WriteLiteral("                                    </li>\n                                    <li>\n                                        Genres:\n");
#nullable restore
#line 45 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                         foreach (var genre in Model.MovieGenres)
                                        {

#line default
#line hidden
#nullable disable
            WriteLiteral("                                            <span>");
#nullable restore
#line 47 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                             Write(genre.Genre.Name);

#line default
#line hidden
#nullable disable
            WriteLiteral(", </span>\n");
#nullable restore
#line 48 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                        }

#line default
#line hidden
#nullable disable
            WriteLiteral("                                    </li>\n                                    <li><span>Duration:</span> ");
#nullable restore
#line 50 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                                          Write(Model.Detail.Duration);

#line default
#line hidden
#nullable disable
            WriteLiteral(" minutes</li>\n                                    <li><span>Age:</span> ");
#nullable restore
#line 51 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                                     Write(Model.AgeLimit);

#line default
#line hidden
#nullable disable
            WriteLiteral("+</li>\n                                    <li>\n                                        Formats:\n");
#nullable restore
#line 54 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                         foreach (var format in Model.MovieFormats)
                                        {

#line default
#line hidden
#nullable disable
            WriteLiteral("                                            <span><img");
            BeginWriteAttribute("src", " src=\"", 3302, "\"", 3327, 1);
#nullable restore
#line 56 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
WriteAttributeValue("", 3308, format.Format.Icon, 3308, 19, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(" style=\"width:40px; height:40px;\" /></span>\n");
#nullable restore
#line 57 "C:\Users\UGHUR\Desktop\Finally-project\Backend\CinemaPlus\CinemaPlus.AdminPanel\Views\Movie\Detail.cshtml"
                                        }

#line default
#line hidden
#nullable disable
            WriteLiteral(@"                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Event Details End -->
");
        }
        #pragma warning restore 1998
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Movie> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591
