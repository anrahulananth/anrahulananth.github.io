window.onload = (function() {
  //remove no-js class support
  document.body.classList.remove("no-js");
  //Select DOM Items
  var menuBtn = document.querySelector(".menu-lines");
  var menu = document.querySelector(".menu");
  var menuNav = document.querySelector(".menu-nav");
  var menuBranding = document.querySelector(".menu-branding");
  var navItems = document.querySelectorAll(".nav-item");

  //set initial state of menu
  var showMenu = false;
  var currentLink = document.querySelector(
    `a[href="${window.location.hash == "" ? "/" : window.location.hash}"]`
  );
  currentLink.classList.add("current");

  menuBtn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    if (!showMenu) {
      menuBtn.classList.add("close");
      menu.classList.add("show");
      menuNav.classList.add("show");
      menuBranding.classList.add("show");
      navItems.forEach(function(item) {
        item.classList.add("show");
      });
      showMenu = true;
    } else {
      menuBtn.classList.remove("close");
      menu.classList.remove("show");
      menuNav.classList.remove("show");
      menuBranding.classList.remove("show");
      navItems.forEach(function(item) {
        item.classList.remove("show");
      });
      showMenu = false;
    }
  }

  navItems.forEach(function(item) {
    item.addEventListener("click", handleMenu);
  });

  function handleMenu(event) {
    currentLink.classList.remove("current");
    event.target.classList.add("current");
    currentLink = event.target;
    toggleMenu();
  }

  document.addEventListener("readystatechange", function(event) {
    if (event.target.readyState === "complete") {

      //Hide Loader
      document.querySelector(".loader").classList.add("hide");

      var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.tick();
        this.isDeleting = false;
      };

      //TypeWriter
      TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
          delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }

        setTimeout(function() {
          that.tick();
        }, delta);
      };

      var elements = document.getElementsByClassName("typewrite");
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }

      //inject css
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
      document.body.appendChild(css);

      
    }
  });
})();
