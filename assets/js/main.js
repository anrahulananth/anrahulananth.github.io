window.addEventListener("load", function() {
    function toggleMenu() {
        if (!showMenu) {
            menuLines.classList.add("close");
            menu && menu.classList.add("show");
            menuNav && menuNav.classList.add("show");
            menuBranding && menuBranding.classList.add("show");
            for (var i = 0; i < navItems.length; i++) {
                handleAddClass(navItems[i]);
            }
            showMenu = true;
        } else {
            menuLines.classList.remove("close");
            menu && menu.classList.remove("show");
            menuNav && menuNav.classList.remove("show");
            menuBranding && menuBranding.classList.remove("show");
            for (var i = 0; i < navItems.length; i++) {
                handleRemoveClass(navItems[i]);
            }
            showMenu = false;
        }
    }

    function handleMenu(event) {
        currentLink && currentLink.classList.remove("current");
        event.target.classList.add("current");
        currentLink = event.target;
        toggleMenu();
    }

    function handleAddClass(item) {
        item.classList.add("show");
    }

    function handleRemoveClass(item) {
        item.classList.remove("show");
    }

    //remove no-js class support
    document.body.classList.remove("no-js");
    //Select DOM Items
    var menuBtn = document.querySelector(".menu-btn");
    var menuLines = document.querySelector(".menu-lines");
    var menu = document.querySelector(".menu");
    var menuNav = document.querySelector(".menu-nav");
    var menuBranding = document.querySelector(".menu-branding");
    var navItems = document.querySelectorAll(".nav-item");
    var shareIcon = document.querySelector(".share-icon");
    var shareOverlay = document.querySelector(".share-overlay");
    var shareMessage = document.querySelector(".share-overlay h3");
    var copyIcon = document.querySelector(".copy-icon");
    var elements = document.getElementsByClassName("typewrite");

    //set initial state of menu
    var showMenu = false;
    for (var i = 0; i < navItems.length; i++) {
        navItems[i] && navItems[i].addEventListener("click", handleMenu);
    }
    var currentLink = document.querySelector(
        `a[href="${window.location.hash == "" ? "/" : window.location.hash}"]`
    );
    currentLink && currentLink.classList.add("current");
    menuBtn && menuBtn.addEventListener("click", toggleMenu);

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

    
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    shareIcon.addEventListener("click", function() {
        if (navigator.share) {
            navigator.share({
                title: "Rahul Ananth",
                url: "https://anrahulananth.github.io",
                text:
                    "My Porfolio Site - This site is developed using only pure JavaScript and SASS without any frameworks!"
            });
        } else {
            shareMessage.innerHTML = "Share Via";
            shareOverlay.classList.add("show");
        }
    });

    shareOverlay.addEventListener("click", function(event) {
        if (event.target.className.includes("share-overlay")) {
            shareOverlay.classList.remove("show");
            return false;
        }
    });

    copyIcon.addEventListener("click", function() {
        if (document.execCommand) {
            var element = document.createElement("textarea");
            element.value = "Rahul Anantharama - My Portfolio Site URL: https://anrahulananth.github.io";
            element.setAttribute("readonly", "");
            element.style.position = "absolute";
            element.style.left = "-9999px";
            document.body.appendChild(element);
            element.select();
            document.execCommand("copy");
            document.body.removeChild(element);
            shareMessage.innerHTML = "Copied Link!";
        }
    });

    //inject css
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
});
