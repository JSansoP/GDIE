/* Template: Valolytics - SaaS App HTML Landing Page Template
   Author: Inovatik
   Created: Sep 2019
   Description: Custom JS file
*/

class cue {
  constructor(id, inici, final, info) {
    this.id = id;
    this.inici = inici;
    this.final = final;
    this.info = info;
  }

  setTempsFinal(final) {
    this.final = final;
  }

  toVttFormat() {
    if (
      this.id == null ||
      this.inici == null ||
      this.final == null ||
      this.info == null
    )
      return null;
    return (
      this.id +
      "\n" +
      this.toHHMMSSttt(this.inici) +
      " --> " +
      this.toHHMMSSttt(this.final) +
      "\n" +
      this.info +
      "\n"
    );
  }

  toHHMMSSttt(sec_num) {
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);
    var miliseconds = Math.floor(
      (sec_num - hours * 3600 - minutes * 60 - seconds) * 1000
    );

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (miliseconds < 10) {
      miliseconds = "00" + miliseconds;
    } else if (miliseconds < 10) {
      miliseconds = "0" + miliseconds;
    }

    return hours + ":" + minutes + ":" + seconds + "." + miliseconds;
  }
}

(function ($) {
  "use strict";

  /* Preloader */
  $(window).on("load", function () {
    var preloaderFadeOutTime = 500;
    function hidePreloader() {
      var preloader = $(".spinner-wrapper");
      setTimeout(function () {
        preloader.fadeOut(preloaderFadeOutTime);
      }, 500);
    }
    hidePreloader();
  });

  /* Navbar Scripts */
  // jQuery to collapse the navbar on scroll
  $(window).on("scroll load", function () {
    if ($(".navbar").offset().top > 60) {
      $(".fixed-top").addClass("top-nav-collapse");
    } else {
      $(".fixed-top").removeClass("top-nav-collapse");
    }
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on("click", "a.page-scroll", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top,
          },
          600,
          "easeInOutExpo"
        );
      event.preventDefault();
    });
  });

  // closes the responsive menu on menu item click
  $(".navbar-nav li a").on("click", function (event) {
    if (!$(this).parent().hasClass("dropdown"))
      $(".navbar-collapse").collapse("hide");
  });

  /* Image Slider - Swiper */
  var imageSlider = new Swiper(".image-slider", {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    breakpoints: {
      // when window is <= 580px
      580: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // when window is <= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window is <= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // when window is <= 1200px
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });

  /* Text Slider - Swiper */
  var textSlider = new Swiper(".text-slider", {
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /* Move Form Fields Label When User Types */
  // for input and textarea fields
  $("input, textarea").keyup(function () {
    if ($(this).val() != "") {
      $(this).addClass("notEmpty");
    } else {
      $(this).removeClass("notEmpty");
    }
  });

  function ssubmitForm() {
    // initiate variables with form content
    var email = $("#semail").val();
    var name = $("#sname").val();
    var password = $("#spassword").val();
    var terms = $("#sterms").val();

    $.ajax({
      type: "POST",
      url: "php/signupform-process.php",
      data:
        "email=" +
        email +
        "&name=" +
        name +
        "&password=" +
        password +
        "&terms=" +
        terms,
      success: function (text) {
        if (text == "success") {
          sformSuccess();
        } else {
          sformError();
          ssubmitMSG(false, text);
        }
      },
    });
  }

  function sformSuccess() {
    $("#signUpForm")[0].reset();
    ssubmitMSG(true, "Sign Up Submitted!");
    $("input").removeClass("notEmpty"); // resets the field label after submission
  }

  function sformError() {
    $("#signUpForm")
      .removeClass()
      .addClass("shake animated")
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          $(this).removeClass();
        }
      );
  }

  function ssubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-center tada animated";
    } else {
      var msgClasses = "h3 text-center";
    }
    $("#smsgSubmit").removeClass().addClass(msgClasses).text(msg);
  }

  function lsubmitForm() {
    // initiate variables with form content
    var email = $("#lemail").val();
    var password = $("#lpassword").val();

    $.ajax({
      type: "POST",
      url: "php/loginform-process.php",
      data: "email=" + email + "&password=" + password,
      success: function (text) {
        if (text == "success") {
          lformSuccess();
        } else {
          lformError();
          lsubmitMSG(false, text);
        }
      },
    });
  }

  function lformSuccess() {
    $("#logInForm")[0].reset();
    lsubmitMSG(true, "Log In Submitted!");
    $("input").removeClass("notEmpty"); // resets the field label after submission
  }

  function lformError() {
    $("#logInForm")
      .removeClass()
      .addClass("shake animated")
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          $(this).removeClass();
        }
      );
  }

  function lsubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-center tada animated";
    } else {
      var msgClasses = "h3 text-center";
    }
    $("#lmsgSubmit").removeClass().addClass(msgClasses).text(msg);
  }

  function nsubmitForm() {
    // initiate variables with form content
    var email = $("#nemail").val();
    var terms = $("#nterms").val();
    $.ajax({
      type: "POST",
      url: "php/newsletterform-process.php",
      data: "email=" + email + "&terms=" + terms,
      success: function (text) {
        if (text == "success") {
          nformSuccess();
        } else {
          nformError();
          nsubmitMSG(false, text);
        }
      },
    });
  }

  function nformSuccess() {
    $("#newsletterForm")[0].reset();
    nsubmitMSG(true, "Subscribed!");
    $("input").removeClass("notEmpty"); // resets the field label after submission
  }

  function nformError() {
    $("#newsletterForm")
      .removeClass()
      .addClass("shake animated")
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          $(this).removeClass();
        }
      );
  }

  function nsubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-center tada animated";
    } else {
      var msgClasses = "h3 text-center";
    }
    $("#nmsgSubmit").removeClass().addClass(msgClasses).text(msg);
  }

  function psubmitForm() {
    // initiate variables with form content
    var name = $("#pname").val();
    var email = $("#pemail").val();
    var select = $("#pselect").val();
    var terms = $("#pterms").val();

    $.ajax({
      type: "POST",
      url: "php/privacyform-process.php",
      data:
        "name=" +
        name +
        "&email=" +
        email +
        "&select=" +
        select +
        "&terms=" +
        terms,
      success: function (text) {
        if (text == "success") {
          pformSuccess();
        } else {
          pformError();
          psubmitMSG(false, text);
        }
      },
    });
  }

  function pformSuccess() {
    $("#privacyForm")[0].reset();
    psubmitMSG(true, "Request Submitted!");
    $("input").removeClass("notEmpty"); // resets the field label after submission
  }

  function pformError() {
    $("#privacyForm")
      .removeClass()
      .addClass("shake animated")
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          $(this).removeClass();
        }
      );
  }

  function psubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-center tada animated";
    } else {
      var msgClasses = "h3 text-center";
    }
    $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
  }

  /* Back To Top Button */
  // create the back to top button
  $("body").prepend(
    '<a href="body" class="back-to-top page-scroll">Back to Top</a>'
  );
  var amountScrolled = 700;
  $(window).scroll(function () {
    if ($(window).scrollTop() > amountScrolled) {
      $("a.back-to-top").fadeIn("500");
    } else {
      $("a.back-to-top").fadeOut("500");
    }
  });

  /* Removes Long Focus On Buttons */
  $(".button, a, button").mouseup(function () {
    $(this).blur();
  });
})(jQuery);

function sendLocation() {
  var inputElement = document.getElementById("video-location");
  var location = inputElement.value;
  setVideoOnEditor(location);
  inputElement.hidden = true;
  document.getElementById("send-location").hidden = true;
}

function setVideoOnEditor(location) {
  var video = document.getElementById("editor-video");
  video.src = location;
  video.hidden = false;
  document.getElementById("button-container").style.visibility = "visible";
  document.getElementById("kills-container").style.visibility = "visible";
  document.getElementById("selector-container").style.visibility = "visible";
  document.getElementById("subtitles-container").style.visibility = "visible";
  video.addEventListener('ended', (event) => {
    cueOldAgent.setTempsFinal(video.currentTime);
    vttAgent = cueOldAgent.toVttFormat();
    if (vttAgent != null) {
      writeVtt(vttAgent, "agent_weapon_map");
    }
    cueOldWeapon.setTempsFinal(video.currentTime);
    vttWeapon = cueOldWeapon.toVttFormat();
    if (vttWeapon != null) {
      writeVtt(vttWeapon, "agent_weapon_map");
    }
    cueOldMap.setTempsFinal(video.currentTime);
    vttMap = cueOldMap.toVttFormat();
    if (vttMap != null) {
      writeVtt(vttMap, "agent_weapon_map");
    }
  });
}

// $(document).ready(function(){
//   var video = document.getElementById("editor-video");
//   if (video.canPlayType) {
//     if (video.canPlayType("video/ogg")) {
//       video.src = "http://techslides.com/demos/sample-videos/small.ogv";
//     }
//     if (video.canPlayType("video/mp4")) {
//       video.src = "../videos/file_example_MP4_1920_18MG.mp4";
//     }
//     video.setAttribute("height", "500px");
//     //video.setAttribute("controls", "controls");
//   } else {
//     var div = document.getElementById("video-container");
//     div.innerHTML = "Video not supported by your browser.";
//   }
// })

$("#toggleButton").click(function () {
  var vid = document.getElementById("editor-video");
  if (vid.paused) {
    this.innerText = "Pause";
    vid.play();
  } else {
    this.innerText = "Play";
    vid.pause();
  }
});

var numKill = 1;
var numAssist = 1;
var numAce = 1;
var numUlti = 1;
var numAgents = 1;
var numWeapon = 1;
var numMap = 1;
var currentAgent;
var cueOldAgent;
var cueOldWeapon;
var cueOldMap;

$("#AddKill").click(function () {
  var vid = document.getElementById("editor-video");
  var cueKill = new cue(
    `Kill-${numKill}`,
    vid.currentTime - 1,
    vid.currentTime + 1,
    ""
  );
  vtt = cueKill.toVttFormat();
  if (vtt != null) {
    numKill++;
    writeVtt(vtt, "kill_ult_ace");
  }
});

$("#AddUltimate").click(function () {
  var vid = document.getElementById("editor-video");
  var ctime = vid.currentTime;
  var cueUltimate = new cue(`Ultimate-${numUlti}`, ctime - 1, ctime + 1, "");
  vtt = cueUltimate.toVttFormat();
  if (vtt != null) {
    numUlti++;
    writeVtt(vtt, "kill_ult_ace");
  }
});

$("#AddAssist").click(function () {
  var vid = document.getElementById("editor-video");
  var cueAssist = new cue(
    `Assist-${numAssist}`,
    vid.currentTime - 1,
    vid.currentTime + 1,
    ""
  );
  vtt = cueAssist.toVttFormat();
  if (vtt != null) {
    numAssist++;
    writeVtt(vtt, "kill_ult_ace");
  }
});

$("#AddAce").click(function () {
  var vid = document.getElementById("editor-video");
  var cueAce = new cue(
    `Ace-${numAce}`,
    vid.currentTime - 1,
    vid.currentTime + 1,
    ""
  );
  vtt = cueAce.toVttFormat();
  if (vtt != null) {
    numAce++;
    writeVtt(vtt, "kill_ult_ace");
  }
});

// Falta posar a info quin agent és i canviar sa variable global currentAgent a nes que sigui
$("#changeAgent").change(function () {
  var vid = document.getElementById("editor-video");
  currentAgent = $("#changeAgent option:selected").val();
  if (currentAgent.localeCompare("None") == 0) return;
  console.log(currentAgent);
  if (numAgents == 1) {
    cueOldAgent = new cue(
      `Agent-${numAgents}`,
      vid.currentTime,
      null,
      currentAgent
    );
    numAgents++;
  } else {
    var cueCurrentAgent = new cue(
      `Agent-${numAgents}`,
      vid.currentTime,
      null,
      currentAgent
    );
    cueOldAgent.setTempsFinal(vid.currentTime);
    vtt = cueOldAgent.toVttFormat();
    if (vtt != null) {
      numAgents++;
      cueOldAgent = cueCurrentAgent;
      writeVtt(vtt, "agent_weapon_map");
    }
  }
});

// Falta posar a info quina weapona és
$("#changeWeapon").change(function () {
  var vid = document.getElementById("editor-video");
  currentWeapon = $("#changeWeapon option:selected").val();
  if (currentWeapon.localeCompare("None") == 0) return;
  console.log(currentWeapon);
  if (numWeapon == 1) {
    cueOldWeapon = new cue(
      `Weapon-${numWeapon}`,
      vid.currentTime,
      null,
      currentWeapon
    );
    numWeapon++;
  } else {
    var cueCurrentWeapon = new cue(
      `Weapon-${numWeapon}`,
      vid.currentTime,
      null,
      currentWeapon
    );
    cueOldWeapon.setTempsFinal(vid.currentTime);
    vtt = cueOldWeapon.toVttFormat();
    if (vtt != null) {
      numWeapon++;
      cueOldWeapon = cueCurrentWeapon;
      writeVtt(vtt, "agent_weapon_map");
    }
  }
});

// Falta posar a info quin mapa és
$("#changeMap").change(function () {
  var vid = document.getElementById("editor-video");
  currentMap = $("#changeMap option:selected").val();
  if (currentMap.localeCompare("None") == 0) return;
  console.log(currentMap);
  if (numMap == 1) {
    cueOldMap = new cue(
      `Map-${numMap}`,
      vid.currentTime,
      null,
      currentMap
    );
    numMap++;
  } else {
    var cueCurrentMap = new cue(
      `Map-${numMap}`,
      vid.currentTime,
      null,
      currentMap
    );
    cueOldMap.setTempsFinal(vid.currentTime);
    vtt = cueOldMap.toVttFormat();
    if (vtt != null) {
      numMap++;
      cueOldMap = cueCurrentMap;
      writeVtt(vtt, "agent_weapon_map");
    }
  }
});

function writeVtt(vtt, file) {
  var data = {
    f: file,
    str: vtt,
  };
  $.post("php/writeVtt.php", data);
  console.log("he posteado");
}

$("#forward5").click(function () {
  var vid = document.getElementById("editor-video");
  vid.currentTime = vid.currentTime + 5;
  console.log(vid.currentTime);
});

$("#back5").click(function () {
  var vid = document.getElementById("editor-video");
  vid.currentTime = vid.currentTime - 5;
});
