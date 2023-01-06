/* eslint-disable */
!(function (e, t) {
  function i() {
    var t = n.getBoundingClientRect().width;
    t / s > 750 && (t = 750 * s);
    var i = t / 10;
    n.style.fontSize = i + 'px';
    var a = parseFloat(
      window.getComputedStyle(n, null).getPropertyValue('font-size'),
    );
    if (a < i && c) {
      var r = (a / i).toFixed(2);
      n.style.fontSize = (i / r).toFixed(2) + 'px';
    }
    m.rem = e.rem = i;
  }
  var a,
    r = e.document,
    n = r.documentElement,
    o = r.querySelector('meta[name="viewport"]'),
    l = r.querySelector('meta[name="flexible"]'),
    s = 0,
    d = 0,
    m = t.flexible || (t.flexible = {}),
    c = e.navigator.appVersion.match(/android/gi),
    p = e.navigator.appVersion.match(/iphone/gi),
    u = e.navigator.userAgent.toLowerCase().match(/amcustomer/gi);
  if (o) {
    console.warn('将根据已有的meta标签来设置缩放比');
    var f = o.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    f && ((d = parseFloat(f[1])), (s = parseInt(1 / d)));
  } else if (l) {
    var v = l.getAttribute('content');
    if (v) {
      var h = v.match(/initial\-dpr=([\d\.]+)/),
        x = v.match(/maximum\-dpr=([\d\.]+)/);
      h && ((s = parseFloat(h[1])), (d = parseFloat((1 / s).toFixed(2)))),
        x && ((s = parseFloat(x[1])), (d = parseFloat((1 / s).toFixed(2))));
    }
  }
  if (!s && !d) {
    var g = e.devicePixelRatio;
    (s = g || 1),
      (s =
        p && e.navigator.userAgent.match(/OS 9_3/)
          ? g >= 3 && (!s || s >= 3)
            ? 3
            : g >= 2 && (!s || s >= 2)
            ? 2
            : 1
          : 1),
      (d = 1 / s),
      (c || p) && n.setAttribute('data-real-dpr', e.devicePixelRatio),
      c && (n.className += ' device-android'),
      p && (n.className += ' device-ios');
  }
  if (
    (c || p || u
      ? n.setAttribute('data-dpr', s)
      : n.setAttribute('data-dpr', 2),
    !o)
  )
    if (
      ((o = r.createElement('meta')),
      o.setAttribute('name', 'viewport'),
      o.setAttribute(
        'content',
        'initial-scale=' +
          d +
          ', maximum-scale=' +
          d +
          ', minimum-scale=' +
          d +
          ', user-scalable=no',
      ),
      n.firstElementChild)
    )
      n.firstElementChild.appendChild(o);
    else {
      var b = r.createElement('div');
      b.appendChild(o), r.write(b.innerHTML);
    }
  e.addEventListener(
    'resize',
    function () {
      clearTimeout(a), (a = setTimeout(i, 300));
    },
    !1,
  ),
    e.addEventListener(
      'pageshow',
      function (e) {
        e.persisted && (clearTimeout(a), (a = setTimeout(i, 300)));
      },
      !1,
    ),
    'complete' === r.readyState
      ? (r.body.style.fontSize = 12 * s + 'px')
      : r.addEventListener(
          'DOMContentLoaded',
          function (e) {
            r.body.style.fontSize = 12 * s + 'px';
          },
          !1,
        ),
    i(),
    (m.dpr = e.dpr = s),
    (m.refreshRem = i),
    (m.rem2px = function (e) {
      var t = parseFloat(e) * this.rem;
      return 'string' == typeof e && e.match(/rem$/) && (t += 'px'), t;
    }),
    (m.px2rem = function (e) {
      var t = parseFloat(e) / this.rem;
      return 'string' == typeof e && e.match(/px$/) && (t += 'rem'), t;
    });
})(window, window.lib || (window.lib = {}));
