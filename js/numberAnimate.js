;
(function ($) {
  $.fn.numberAnimate = function (setting) {
    var defaults = {
      speed: 1000,
      num: "",
      iniAnimate: true,
      symbol: '',
      dot: 0,
      pst: ""
    }
    var setting = $.extend(defaults, setting);
    if ($(this).length > 1) {
      alert("just only one obj!");
      return;
    }
    if (setting.num == "") {
      alert("must set a num!");
      return;
    }
    var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
            <span class="mt-number-animate-span">0</span>\
            <span class="mt-number-animate-span">1</span>\
            <span class="mt-number-animate-span">2</span>\
            <span class="mt-number-animate-span">3</span>\
            <span class="mt-number-animate-span">4</span>\
            <span class="mt-number-animate-span">5</span>\
            <span class="mt-number-animate-span">6</span>\
            <span class="mt-number-animate-span">7</span>\
            <span class="mt-number-animate-span">8</span>\
            <span class="mt-number-animate-span">9</span>\
            <span class="mt-number-animate-span">0</span>\
            <span class="mt-number-animate-span">.</span>\
          </div>';

    var numToArr = function (num) {
      num = parseFloat(num).toFixed(setting.dot);
      if (typeof (num) == 'number') {
        var arrStr = num.toString().split("");
      } else {
        var arrStr = num.split("");
      }
      return arrStr;
    }
    var setNumDom = function (arrStr) {
      var shtml = '<div class="mt-number-animate">';
      for (var i = 0, len = arrStr.length; i < len; i++) {
        if (i != 0 && (len - i) % 3 == 0 && setting.symbol != "" && arrStr[i] != ".") {
          shtml += '<div class="mt-number-animate-dot">' + setting.symbol + '</div>' + nHtml.replace("{{num}}", arrStr[i]);
        } else {
          shtml += nHtml.replace("{{num}}", arrStr[i]);
        }
      }
      if (setting.pst) {
        shtml += '%</div>';
      } else {
        shtml += '</div>';
      }
      return shtml;
    }
    var runAnimate = function ($parent) {
      $parent.find(".mt-number-animate-dom").each(function () {
        var num = $(this).attr("data-num");
        // console.log(num)
        num = (num == "." ? 11 : num == 0 ? 10 : num);
        var spanHei = $(this).height() / 12; //11为元素个数
        var thisTop = -num * spanHei + "px";
        if (thisTop != $(this).css("top")) {
          if (setting.iniAnimate) {
            //HTML5不支持
            if (!window.applicationCache) {
              $(this).animate({
                top: thisTop
              }, setting.speed);
            } else {
              $(this).css({
                'transform': 'translateY(' + thisTop + ')',
                '-ms-transform': 'translateY(' + thisTop + ')',
                /* IE 9 */
                '-moz-transform': 'translateY(' + thisTop + ')',
                /* Firefox */
                '-webkit-transform': 'translateY(' + thisTop + ')',
                /* Safari 和 Chrome */
                '-o-transform': 'translateY(' + thisTop + ')',
                '-ms-transition': setting.speed / 1000 + 's',
                '-moz-transition': setting.speed / 1000 + 's',
                '-webkit-transition': setting.speed / 1000 + 's',
                '-o-transition': setting.speed / 1000 + 's',
                'transition': setting.speed / 1000 + 's'
              });
            }
          } else {
            setting.iniAnimate = true;
            $(this).css({
              top: thisTop
            });
          }
        }
      });
    }
    var init = function ($parent) {
      $parent.html(setNumDom(numToArr(setting.num)));
      runAnimate($parent);
    };
    init($(this));
    return this;
  }
})(jQuery);