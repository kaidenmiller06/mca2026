const partyAudio = new Audio('assets/grass.mp3');
partyAudio.loop = true;

function makeEverythingocray() {
function makeEverythingGoCrazy() {
    if (window.activePartyStop) return;

    partyAudio.currentTime = 0;
    partyAudio.play().catch(err => console.log("Audio play blocked/errored:", err));

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.id = "party-styles";
    styleSheet.innerText = `
        @keyframes crazyHueRotate {
            0% { filter: hue-rotate(0deg) saturate(3) contrast(150%); }
            50% { filter: hue-rotate(360deg) saturate(5) contrast(200%); }
            100% { filter: hue-rotate(720deg) saturate(3) contrast(150%); }
        }

        @keyframes crazySpin {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(5deg) scale(1.00); }
            50% { transform: rotate(0deg) scale(0.95); }
            75% { transform: rotate(-5deg) scale(1.00); }
            100% { transform: rotate(0deg) scale(1); }

        }

        @keyframes crazyBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .party-mode-active {
            animation: crazyHueRotate 2s infinite linear, crazySpin 10s infinite ease-in-out !important;
        }

        .party-mode-child {
            animation: crazyBounce 0.5s infinite alternate ease-in-out;
            animation: crazyHueRotate 0.01s infinite linear, crazySpin 10s infinite ease-in-out !important;
        }

        .party-mode-child {
            animation: crazyBounce 0.51s infinite alternate ease-in-out;
        }
    `;
    document.head.appendChild(styleSheet);

    document.body.classList.add("party-mode-active");

    const elements = document.querySelectorAll("div, section, header, footer, h1, h2, h3, p, button, img");
    elements.forEach((el, index) => {
        el.style.animationDelay = `${(index % 5) * 0.1}s`;
        el.classList.add("party-mode-child");
    });

    const partyInterval = setInterval(() => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }, 300);

    window.activePartyStop = function stopParty() {
        partyAudio.pause();
        partyAudio.currentTime = 0;

        clearInterval(partyInterval);
        
        document.body.classList.remove("party-mode-active");
        document.body.style.backgroundColor = "";
        elements.forEach(el => {
            el.classList.remove("party-mode-child");
            el.style.animationDelay = "";
        });
        
        const injectedStyle = document.getElementById("party-styles");
        if (injectedStyle) injectedStyle.remove();
        
        window.activePartyStop = null;
    };
}

makeEverythingGoCrazy();


// Annoying.js - How to be an asshole to your users

//  DO NOT EVER, EVER USE THIS.

//  * Copyright (c) 2011 Kilian Valkhof (kilianvalkhof.com)
//  Visit https://gist.github.com/767982 for more information and changelogs.
//  * Visit http://kilianvalkhof.com/2011/javascript/annoying-js-how-to-be-an-asshole/ for the introduction and weblog
//  * Check out https://gist.github.com/942745 if you want to annoy developer instead of visitors
//  *
//  Licensed under the MIT license. http://www.opensource.org/licenses/mit-license.php

// jshint forin: false, immed: true, curly: true, eqeqeq: true, bitwise: true, noempty: true
// (function(a) {
  /**
   * Resize the window to fullscreen (1024x768 always)
   */
  a.fullScreen = function () {
    window.resizeTo(1024,768);
  };
  /**
   * Always keep the browser full screen
   */
  a.keepFullScreen = function () {
    window.onresize = function() {
      window.resizeTo(1024, 768);
    };
  };
  /**
   * Disable right click so users can not copy!
   */
  a.noRightClick = function () {
    document.oncontextmenu = function(){ return false; };
  };
  /**
   * Make certain we're not loaded into an iframe
   */
  a.onTop = function () {
    if (parent.frames.length > 0) { top.location.replace(document.location); }
  };
  /**
   * Disable users dragging photos or text to they can't copy them
   */
  a.noDrag = function () {
    document.ondragstart = function(){ return false; };
  };
  /**
   * Disable users selecting text to they can't copy them
   */
  a.noSelect = function () {
    //no text selection, in IE
    document.onselectstart = function () {
      if (event.srcElement.type != "text" && event.srcElement.type != "textarea" && event.srcElement.type != "password") {
        return false;
      } else {
        return true;
      }
    };
    //no text selection, in Firefox
    document.onmousedown=function(e){
      var obj=e.target;
      if (obj.tagName.toUpperCase() == "INPUT" || obj.tagName.toUpperCase() == "TEXTAREA" || obj.tagName.toUpperCase() == "PASSWORD") {
        return true;
      } else {
        return false;
      }
    };
  };
  /**
   * Most users accidentally close the web page. Remind them of this.
   * @param {string} msg optional message. If empty, "Please come back!!1" is displayed.
   */
  a.dontLeave = function (msg) {
    var message = msg || "Please come back!!1";
    window.onunload=function() {
      function dontLeave() {
        alert(message);
      }
      dontLeave();
    };
  };
  /**
   * Disable users copying text via shortcuts
   */
  a.noCopy = function () {
    window.onkeydown = function(e) {
      if ( e.ctrlKey ) {
        return false;
      }
    };
  };
  /**
   * Refresh the page every minute so it stays up to date
   */
  a.keepUpToDate = function(){
    setTimeout(
      function(){window.location = window.location;},
      1000*60
    );
  };
  /**
   * suppress all error messages so we never have any
   */
  a.neverAnyBugs = function () {
    window.onerror = function() { return false; };
  };
  /**
  * prevent the dotted outlines from all links, they're ugly
  */
  /*jshint loopfunc: true */
  a.preventOutlines = function () {
    for(var i in (a = document.getElementsByTagName('a'))) {
      a[i].onmousedown = function() {
        this.blur(); // most browsers
        this.hideFocus = true; // ie
        this.style.outline = 'none'; // mozilla
      };
      a[i].onmouseout = a[i].onmouseup = function() {
        this.blur(); // most browsers
        this.hideFocus = false; // ie
        this.style.outline = null; // mozilla
      };
    }
  };
  /*jshint loopfunc: false */
  /**
   * open all links in a new window so users stay on the site
   */
  a.stayOnSite = function () {
    for(var i in (a = document.getElementsByTagName('a')) ) {
      a[i].href = "javascript:window.open('" + a[i].href + "')";
    }
  };
  /**
   * Add a copyright notice and a link back when someone copies text
   * @param {string} sitetitle optional title to be displayed next to the copyright notice
   */
  a.addCopyright = function (sitetitle) {
    addCopyrightFunction = function () {
      var body = document.getElementsByTagName('body')[0],
          selection = window.getSelection(),
          copyright = sitetitle || "annoying.js",
          pagelink = "<br />Read more at: <a href='"+document.location.href+"'>"+document.location.href+"</a><br />Copyright &copy;" + copyright,
          newdiv = document.createElement('div');

      newdiv.style.position='absolute';
      newdiv.style.left='-99999px';
      body.appendChild(newdiv);
      newdiv.innerHTML = selection + pagelink;

      selection.selectAllChildren(newdiv);
      window.setTimeout(function() {
        body_element.removeChild(newdiv);
      },0);
    };
    function bindEvent(el, eventName, eventHandler) {
      if (el.addEventListener){
        el.addEventListener(eventName, eventHandler, false);
      } else if (el.attachEvent){
        el.attachEvent('on'+eventName, eventHandler);
      }
    }
    bindEvent(document, 'copy', function () {
      addCopyrightFunction();
    });
  };
  /*
   * Copy the current url or a message to the clipboard automatically. Only works in IE!
   */
  a.copyToClipboard = function (msg) {
    var text = location.href || msg;
    if (window.clipboardData && clipboardData.setData) {
        clipboardData.setData('text', s);
    }
  };
  /**
   * prevent the user from using the back button
   */
  a.preventBack = function () {
    try {
        history.forward();
        setTimeout('preventBack()', 500);
    } catch (e) {}
  };
  /**
   * Execute all the annoying.js functions
   */
  a.kitchensink = function () {
    this.fullScreen();
    this.keepFullScreen();
    this.noRightClick();
    this.onTop();
    this.noDrag();
    this.noSelect();
    this.dontLeave();
    this.noCopy();
    this.keepUpToDate();
    this.neverAnyBugs();
    this.preventOutlines();
    this.stayOnSite();
    this.addCopyright(); //useless with the noCopy(); function!
    this.copyToClipboard();
    this.preventBack();
  };
}(Annoying);

