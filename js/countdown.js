// // Set the date we're counting down to
// var countDownDate = new Date("2019-03-05T05:00:00+03:00").getTime();
// // Update the count down every 1 second
// var x = setInterval(function() {
//     // Get todays date and time
//     var now = new Date().getTime();
//     // Find the distance between now and the count down date
//     var distance = countDownDate - now;
//     // Time calculations for days, hours, minutes and seconds
//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//     // Output the result in an element with id="countdown"
//     document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
//     // If the count down is over, write some text
//     if (distance < 0) {
//         clearInterval(x);
//         document.getElementById("countdown").innerHTML = "EXPIRED";
//     }
// }, 1000);

var isWindowVisible = !1,
  isIeMenuOpen = !1,
  main;

var Main = function() {
    var a = parseInt($("#hdnTimerInterval").val()),
      b = $("#hdnVideoUrl").val(),
      c = !1;
    this.Initialize = function() {
      d(1e3);
      var b = $("#hdnNextSale").val(),
        c = new SteamSales,
        g = c.ParseSale(b),
        h = new Timer(g.date, a);
      h.OnUpdate = e, h.OnFinish = f, h.Start(), $("#nextSale").html("Next: " + g.name), $("#saleDate").html(DateUtils.getMonthName(g.date.getMonth()) + " " + g.date.getDate() + ", " + g.date.getFullYear());
      var i = g.isConfirmed ? "confirmed" : "notconfirmed";
      $("#confirmationLabel").addClass(i)
    };
    var d = function(a) {
        var b = window.innerWidth,
          c = window.innerHeight;
        0 == $("#backgroundImage").children().length && $("#backgroundImage").css("background-image", "url('https://lorempixel.com/" + b + "/" + c + "/')"), setTimeout(function() {
          $("#backgroundImage").addClass("fadein")
        }, a)
      },
      e = function(a) {
        var b = DateUtils.getTime(a),
          d = DateUtils.getWeekString(b.days, b.totalDays, b.weeks);
        if (b.totalHours > 100) {
          var e = DateUtils.getTimeString(b.hours, b.minutes, b.seconds);
          $("#detailsLarge").html(d), $("#mainTimer").html(DateUtils.appendTime(b.days, "day")), $("#subTimer").html(e)
        } else {
          var e = DateUtils.getTimeString(Math.floor(b.totalHours), b.minutes, b.seconds);
          $("#detailsLarge").html(DateUtils.appendTime(b.days, "day")), b.totalDays > 1 && $("#detailsSmall").html("Ready your wallets"), $("#mainTimer").html(e), c || ($("#detailsLarge").addClass("fadein"), $("#detailsSmall").addClass("fadein"), $("#mainTimer").addClass("fadein"), $("#subTimer").addClass("fadeout"), c = !0)
        }
      },
      f = function() {
        $("#countdownContainer").css("display", "none"), i() ? $("#steamsaleContainer").append('<div id="videoContainer"><iframe src="' + b + '" frameborder="0" allowfullscreen></iframe></div>') : $("#steamsaleContainer").append('<div id="videoContainer"><video id="areyouready" autoplay><source src="res/vid/areyoureadyforamiracle.mp4" type="video/mp4">Your browser does not support the video tag.</video ></div>'), $("#nextSale").html("Worth the weight"), $("#nextSale").addClass("flash"), g()
      },
      g = function() {
        if (!($("#rainymood").length > 0)) {
          $("body").append("<div id='rainymood'></div>");
          for (var a = 1; 9 >= a; a++)
            for (var b = 0; 2 >= b; b++) $("#rainymood").append('<div class="discountDrop">-' + 10 * a + "%</div>")
        }
      },
      h = function(a) {
        for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
          for (var e = c[d];
            " " == e.charAt(0);) e = e.substring(1);
          if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
        }
        return ""
      },
      i = function() {
        var a = h("cookieconsent_status");
        return "" != a ? "allow" == a || "dismiss" == a : !1
      }
  },

  Timer = function(a, b) {
    var c, d, e, f = this,
      g = function(a, b) {
        c = b, d = a.getTime()
      },
      h = function() {
        e = setTimeout(j, c)
      },
      i = function() {
        clearTimeout(e)
      },
      j = function() {
        var a = (new Date).getTime(),
          b = d - a;
        return 0 >= b ? void k() : (l(f.OnUpdate) && f.OnUpdate(b), void h())
      },
      k = function() {
        i(), l(f.OnFinish) && f.OnFinish()
      },
      l = function(a) {
        return void 0 != f.OnFinish && null != f.OnFinish
      };
    this.OnUpdate, this.OnFinish, this.Start = function() {
      h()
    }, this.Stop = function() {
      i()
    }, g(a, b)
  },

  SteamSales = function() {
    this.ParseSale = function(b) {
      var c = JSON.parse(b);
      return a(c.Name, c.StartDate, c.EndDate, c.IsConfirmed)
    };
    var a = function(a, b, c, d) {
      var e = new Date(b),
        f = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours())),
        g = new Date(c),
        h = new Date(Date.UTC(g.getFullYear(), g.getMonth(), g.getDate(), g.getHours()));
      return {
        name: a,
        date: f,
        enddate: h,
        isConfirmed: d
      }
    }
  },

  DateUtils = {
    getMonthName: function(a) {
      var b = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return b[a]
    },
    getWeekString: function(a, b, c) {
      var d = "";
      if (7 != a) {
        var e = Math.floor(b % 7);
        e > 0 && (d += "about "), e >= 3 && 5 > e && (c += .5, d += this.appendTime(c + ".5", "week", ", ")), e >= 5 && (c += 1), d += this.appendTime(c, "week")
      }
      return d
    },
    getTimeString: function(a, b, c) {
      return StringUtils.pad(a, 2) + ":" + StringUtils.pad(b, 2) + ":" + StringUtils.pad(c, 2)
    },
    appendTime: function(a, b, c) {
      void 0 == c && (c = "");
      var d = "";
      return a > 0 && (d += "<span class='bold'>" + a + "</span> " + b, a >= 2 && (d += "s"), d += c), d
    },
    getTime: function(a) {
      var b = a / 1e3,
        c = b / 60,
        d = c / 60,
        e = d / 24,
        f = e / 7,
        g = {
          totalSeconds: b,
          totalMinutes: c,
          totalHours: d,
          totalDays: e,
          totalWeeks: f,
          seconds: Math.floor(b % 60),
          minutes: Math.floor(c % 60),
          hours: Math.floor(d % 24),
          days: Math.floor(e),
          weeks: Math.floor(f)
        };
      return g
    }
  },

  StringUtils = {
    pad: function(a, b, c) {
      return (void 0 == c || null == c) && (c = "0"), a += "", a.length >= b ? a : new Array(b - a.length + 1).join(c) + a
    }
  };
