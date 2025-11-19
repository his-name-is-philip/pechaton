// assets/site.Dca_zzip.js
function he(n2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? he = function(t) {
    return typeof t;
  } : he = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, he(n2);
}
function ci(n2, t) {
  if (!(n2 instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function jr(n2, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || false, i.configurable = true, "value" in i && (i.writable = true), Object.defineProperty(n2, i.key, i);
  }
}
function ui(n2, t, e) {
  return t && jr(n2.prototype, t), n2;
}
function Fn(n2, t, e) {
  return t in n2 ? Object.defineProperty(n2, t, {
    value: e,
    enumerable: true,
    configurable: true,
    writable: true
  }) : n2[t] = e, n2;
}
function le(n2, t) {
  return Hr(n2) || Br(n2, t) || hi(n2, t) || Wr();
}
function zr(n2) {
  return Nr(n2) || Vr(n2) || hi(n2) || Ur();
}
function Nr(n2) {
  if (Array.isArray(n2))
    return Me(n2);
}
function Hr(n2) {
  if (Array.isArray(n2))
    return n2;
}
function Vr(n2) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(n2))
    return Array.from(n2);
}
function Br(n2, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(n2)))) {
    var e = [], i = true, r = false, s = void 0;
    try {
      for (var o = n2[Symbol.iterator](), l; !(i = (l = o.next()).done) && (e.push(l.value), !(t && e.length === t)); i = true)
        ;
    } catch (a) {
      r = true, s = a;
    } finally {
      try {
        !i && o.return != null && o.return();
      } finally {
        if (r)
          throw s;
      }
    }
    return e;
  }
}
function hi(n2, t) {
  if (n2) {
    if (typeof n2 == "string")
      return Me(n2, t);
    var e = Object.prototype.toString.call(n2).slice(8, -1);
    if (e === "Object" && n2.constructor && (e = n2.constructor.name), e === "Map" || e === "Set")
      return Array.from(n2);
    if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
      return Me(n2, t);
  }
}
function Me(n2, t) {
  (t == null || t > n2.length) && (t = n2.length);
  for (var e = 0, i = new Array(t); e < t; e++)
    i[e] = n2[e];
  return i;
}
function Ur() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Wr() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var D = function() {
  function n2(t) {
    ci(this, n2), this.mAttr = "data-" + t.dataName, this.mCaptureEvents = ["mouseenter", "mouseleave"], this.el = t.el;
  }
  return ui(n2, [{
    key: "mInit",
    value: function(e) {
      var i = this;
      this.modules = e, this.mCheckEventTarget = this.mCheckEventTarget.bind(this), this.events && Object.keys(this.events).forEach(function(r) {
        return i.mAddEvent(r);
      });
    }
  }, {
    key: "mUpdate",
    value: function(e) {
      this.modules = e;
    }
  }, {
    key: "mDestroy",
    value: function() {
      var e = this;
      this.events && Object.keys(this.events).forEach(function(i) {
        return e.mRemoveEvent(i);
      });
    }
  }, {
    key: "mAddEvent",
    value: function(e) {
      var i = !!this.mCaptureEvents.includes(e);
      this.el.addEventListener(e, this.mCheckEventTarget, i);
    }
  }, {
    key: "mRemoveEvent",
    value: function(e) {
      var i = !!this.mCaptureEvents.includes(e);
      this.el.removeEventListener(e, this.mCheckEventTarget, i);
    }
  }, {
    key: "mCheckEventTarget",
    value: function(e) {
      var i = this.events[e.type];
      if (typeof i == "string")
        this[i](e);
      else {
        var r = "[" + this.mAttr + "]", s = e.target;
        if (this.mCaptureEvents.includes(e.type))
          s.matches(r) && this.mCallEventMethod(e, i, s);
        else
          for (; s && s !== document && !(s.matches(r) && this.mCallEventMethod(e, i, s) != "undefined"); )
            s = s.parentNode;
      }
    }
  }, {
    key: "mCallEventMethod",
    value: function(e, i, r) {
      var s = r.getAttribute(this.mAttr);
      if (i.hasOwnProperty(s)) {
        var o = i[s];
        e.hasOwnProperty("currentTarget") || Object.defineProperty(e, "currentTarget", {
          value: r
        }), e.hasOwnProperty("curTarget") || Object.defineProperty(e, "curTarget", {
          value: r
        }), this[o](e);
      }
    }
  }, {
    key: "$",
    value: function(e, i) {
      var r = e.indexOf("."), s = e.indexOf("#"), o = e.indexOf("["), l = [r, s, o].filter(function(d) {
        return d != -1;
      }), a = false, c = e, u = "", h = this.el;
      return l.length && (a = Math.min.apply(Math, zr(l)), c = e.slice(0, a), u = e.slice(a)), he(i) == "object" && (h = i), h.querySelectorAll("[" + this.mAttr + "=" + c + "]" + u);
    }
  }, {
    key: "parent",
    value: function(e, i) {
      for (var r = "[" + this.mAttr + "=" + e + "]", s = i.parentNode; s && s !== document; ) {
        if (s.matches(r))
          return s;
        s = s.parentNode;
      }
    }
  }, {
    key: "getData",
    value: function(e, i) {
      var r = i || this.el;
      return r.getAttribute(this.mAttr + "-" + e);
    }
  }, {
    key: "setData",
    value: function(e, i, r) {
      var s = r || this.el;
      return s.setAttribute(this.mAttr + "-" + e, i);
    }
  }, {
    key: "call",
    value: function(e, i, r, s) {
      var o = this;
      i && !r && (r = i, i = false), this.modules[r] && (s ? this.modules[r][s] && this.modules[r][s][e](i) : Object.keys(this.modules[r]).forEach(function(l) {
        o.modules[r][l][e](i);
      }));
    }
  }, {
    key: "on",
    value: function(e, i, r, s) {
      var o = this;
      this.modules[i] && (s ? this.modules[i][s].el.addEventListener(e, function(l) {
        return r(l);
      }) : Object.keys(this.modules[i]).forEach(function(l) {
        o.modules[i][l].el.addEventListener(e, function(a) {
          return r(a);
        });
      }));
    }
  }, {
    key: "init",
    value: function() {
    }
  }, {
    key: "destroy",
    value: function() {
    }
  }]), n2;
}();
var Gr = function() {
  function n2(t) {
    ci(this, n2), this.app, this.modules = t.modules, this.currentModules = {}, this.activeModules = {}, this.newModules = {}, this.moduleId = 0;
  }
  return ui(n2, [{
    key: "init",
    value: function(e, i) {
      var r = this, s = i || document, o = s.querySelectorAll("*");
      e && !this.app && (this.app = e), this.activeModules.app = {
        app: this.app
      }, o.forEach(function(l) {
        Array.from(l.attributes).forEach(function(a) {
          if (a.name.startsWith("data-module")) {
            var c = false, u = a.name.split("-").splice(2), h = r.toCamel(u);
            if (r.modules[h] ? c = true : r.modules[r.toUpper(h)] && (h = r.toUpper(h), c = true), c) {
              var d = {
                el: l,
                name: h,
                dataName: u.join("-")
              }, v = new r.modules[h](d), f = a.value;
              f || (r.moduleId++, f = "m" + r.moduleId, l.setAttribute(a.name, f)), r.addActiveModule(h, f, v);
              var p = h + "-" + f;
              i ? r.newModules[p] = v : r.currentModules[p] = v;
            }
          }
        });
      }), Object.entries(this.currentModules).forEach(function(l) {
        var a = le(l, 2), c = a[0], u = a[1];
        if (i) {
          var h = c.split("-"), d = h.shift(), v = h.pop();
          r.addActiveModule(d, v, u);
        } else
          r.initModule(u);
      });
    }
  }, {
    key: "initModule",
    value: function(e) {
      e.mInit(this.activeModules), e.init();
    }
  }, {
    key: "addActiveModule",
    value: function(e, i, r) {
      this.activeModules[e] ? Object.assign(this.activeModules[e], Fn({}, i, r)) : this.activeModules[e] = Fn({}, i, r);
    }
  }, {
    key: "update",
    value: function(e) {
      var i = this;
      this.init(this.app, e), Object.entries(this.currentModules).forEach(function(r) {
        var s = le(r, 2);
        s[0];
        var o = s[1];
        o.mUpdate(i.activeModules);
      }), Object.entries(this.newModules).forEach(function(r) {
        var s = le(r, 2);
        s[0];
        var o = s[1];
        i.initModule(o);
      }), Object.assign(this.currentModules, this.newModules);
    }
  }, {
    key: "destroy",
    value: function(e) {
      e ? this.destroyScope(e) : this.destroyModules();
    }
  }, {
    key: "destroyScope",
    value: function(e) {
      var i = this, r = e.querySelectorAll("*");
      r.forEach(function(s) {
        Array.from(s.attributes).forEach(function(o) {
          if (o.name.startsWith("data-module")) {
            var l = o.value, a = o.name.split("-").splice(2), c = i.toCamel(a) + "-" + l, u = false;
            i.currentModules[c] ? u = true : i.currentModules[i.toUpper(c)] && (c = i.toUpper(c), u = true), u && (i.destroyModule(i.currentModules[c]), delete i.currentModules[c]);
          }
        });
      }), this.activeModules = {}, this.newModules = {};
    }
  }, {
    key: "destroyModules",
    value: function() {
      var e = this;
      Object.entries(this.currentModules).forEach(function(i) {
        var r = le(i, 2);
        r[0];
        var s = r[1];
        e.destroyModule(s);
      }), this.currentModules = [];
    }
  }, {
    key: "destroyModule",
    value: function(e) {
      e.mDestroy(), e.destroy();
    }
  }, {
    key: "toCamel",
    value: function(e) {
      var i = this;
      return e.reduce(function(r, s) {
        return r + i.toUpper(s);
      });
    }
  }, {
    key: "toUpper",
    value: function(e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    }
  }]), n2;
}();
function Kr(n2, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || false, i.configurable = true, "value" in i && (i.writable = true), Object.defineProperty(n2, typeof (r = function(s, o) {
      if (typeof s != "object" || s === null)
        return s;
      var l = s[Symbol.toPrimitive];
      if (l !== void 0) {
        var a = l.call(s, "string");
        if (typeof a != "object")
          return a;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(s);
    }(i.key)) == "symbol" ? r : String(r), i);
  }
  var r;
}
function Je(n2, t, e) {
  return t && Kr(n2.prototype, t), Object.defineProperty(n2, "prototype", {
    writable: false
  }), n2;
}
function at() {
  return at = Object.assign ? Object.assign.bind() : function(n2) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (n2[i] = e[i]);
    }
    return n2;
  }, at.apply(this, arguments);
}
function ge(n2, t) {
  n2.prototype = Object.create(t.prototype), n2.prototype.constructor = n2, Xt(n2, t);
}
function $e(n2) {
  return $e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, $e(n2);
}
function Xt(n2, t) {
  return Xt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, i) {
    return e.__proto__ = i, e;
  }, Xt(n2, t);
}
function Yr() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return false;
  if (typeof Proxy == "function")
    return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch {
    return false;
  }
}
function Re(n2, t, e) {
  return Re = Yr() ? Reflect.construct.bind() : function(i, r, s) {
    var o = [null];
    o.push.apply(o, r);
    var l = new (Function.bind.apply(i, o))();
    return s && Xt(l, s.prototype), l;
  }, Re.apply(null, arguments);
}
function De(n2) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return De = function(e) {
    if (e === null || Function.toString.call(e).indexOf("[native code]") === -1)
      return e;
    if (typeof e != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(e))
        return t.get(e);
      t.set(e, i);
    }
    function i() {
      return Re(e, arguments, $e(this).constructor);
    }
    return i.prototype = Object.create(e.prototype, {
      constructor: {
        value: i,
        enumerable: false,
        writable: true,
        configurable: true
      }
    }), Xt(i, e);
  }, De(n2);
}
function Xr(n2) {
  if (n2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n2;
}
var bt;
var Jr = function() {
  this.before = void 0, this.beforeLeave = void 0, this.leave = void 0, this.afterLeave = void 0, this.beforeEnter = void 0, this.enter = void 0, this.afterEnter = void 0, this.after = void 0;
};
(function(n2) {
  n2[n2.off = 0] = "off", n2[n2.error = 1] = "error", n2[n2.warning = 2] = "warning", n2[n2.info = 3] = "info", n2[n2.debug = 4] = "debug";
})(bt || (bt = {}));
var qn = bt.off;
var Lt = function() {
  function n2(e) {
    this.t = void 0, this.t = e;
  }
  n2.getLevel = function() {
    return qn;
  }, n2.setLevel = function(e) {
    return qn = bt[e];
  };
  var t = n2.prototype;
  return t.error = function() {
    this.i(console.error, bt.error, [].slice.call(arguments));
  }, t.warn = function() {
    this.i(console.warn, bt.warning, [].slice.call(arguments));
  }, t.info = function() {
    this.i(console.info, bt.info, [].slice.call(arguments));
  }, t.debug = function() {
    this.i(console.log, bt.debug, [].slice.call(arguments));
  }, t.i = function(e, i, r) {
    i <= n2.getLevel() && e.apply(console, ["[" + this.t + "] "].concat(r));
  }, n2;
}();
function Dt(n2) {
  return n2.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function jn(n2) {
  return n2 && n2.sensitive ? "" : "i";
}
var ht = {
  container: "container",
  history: "history",
  namespace: "namespace",
  prefix: "data-barba",
  prevent: "prevent",
  wrapper: "wrapper"
};
var It = new (function() {
  function n2() {
    this.o = ht, this.u = void 0, this.h = {
      after: null,
      before: null,
      parent: null
    };
  }
  var t = n2.prototype;
  return t.toString = function(e) {
    return e.outerHTML;
  }, t.toDocument = function(e) {
    return this.u || (this.u = new DOMParser()), this.u.parseFromString(e, "text/html");
  }, t.toElement = function(e) {
    var i = document.createElement("div");
    return i.innerHTML = e, i;
  }, t.getHtml = function(e) {
    return e === void 0 && (e = document), this.toString(e.documentElement);
  }, t.getWrapper = function(e) {
    return e === void 0 && (e = document), e.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]');
  }, t.getContainer = function(e) {
    return e === void 0 && (e = document), e.querySelector("[" + this.o.prefix + '="' + this.o.container + '"]');
  }, t.removeContainer = function(e) {
    document.body.contains(e) && (this.v(e), e.parentNode.removeChild(e));
  }, t.addContainer = function(e, i) {
    var r = this.getContainer() || this.h.before;
    r ? this.l(e, r) : this.h.after ? this.h.after.parentNode.insertBefore(e, this.h.after) : this.h.parent ? this.h.parent.appendChild(e) : i.appendChild(e);
  }, t.getSibling = function() {
    return this.h;
  }, t.getNamespace = function(e) {
    e === void 0 && (e = document);
    var i = e.querySelector("[" + this.o.prefix + "-" + this.o.namespace + "]");
    return i ? i.getAttribute(this.o.prefix + "-" + this.o.namespace) : null;
  }, t.getHref = function(e) {
    if (e.tagName && e.tagName.toLowerCase() === "a") {
      if (typeof e.href == "string")
        return e.href;
      var i = e.getAttribute("href") || e.getAttribute("xlink:href");
      if (i)
        return this.resolveUrl(i.baseVal || i);
    }
    return null;
  }, t.resolveUrl = function() {
    var e = [].slice.call(arguments).length;
    if (e === 0)
      throw new Error("resolveUrl requires at least one argument; got none.");
    var i = document.createElement("base");
    if (i.href = arguments[0], e === 1)
      return i.href;
    var r = document.getElementsByTagName("head")[0];
    r.insertBefore(i, r.firstChild);
    for (var s, o = document.createElement("a"), l = 1; l < e; l++)
      o.href = arguments[l], i.href = s = o.href;
    return r.removeChild(i), s;
  }, t.l = function(e, i) {
    i.parentNode.insertBefore(e, i.nextSibling);
  }, t.v = function(e) {
    return this.h = {
      after: e.nextElementSibling,
      before: e.previousElementSibling,
      parent: e.parentElement
    }, this.h;
  }, n2;
}())();
var Qr = function() {
  function n2() {
    this.p = void 0, this.m = [], this.P = -1;
  }
  var t = n2.prototype;
  return t.init = function(e, i) {
    this.p = "barba";
    var r = {
      data: {},
      ns: i,
      scroll: {
        x: window.scrollX,
        y: window.scrollY
      },
      url: e
    };
    this.P = 0, this.m.push(r);
    var s = {
      from: this.p,
      index: this.P,
      states: [].concat(this.m)
    };
    window.history && window.history.replaceState(s, "", e);
  }, t.change = function(e, i, r) {
    if (r && r.state) {
      var s = r.state, o = s.index;
      i = this.g(this.P - o), this.replace(s.states), this.P = o;
    } else
      this.add(e, i);
    return i;
  }, t.add = function(e, i, r, s) {
    var o = r ?? this.R(i), l = {
      data: s ?? {},
      ns: "tmp",
      scroll: {
        x: window.scrollX,
        y: window.scrollY
      },
      url: e
    };
    switch (o) {
      case "push":
        this.P = this.size, this.m.push(l);
        break;
      case "replace":
        this.set(this.P, l);
    }
    var a = {
      from: this.p,
      index: this.P,
      states: [].concat(this.m)
    };
    switch (o) {
      case "push":
        window.history && window.history.pushState(a, "", e);
        break;
      case "replace":
        window.history && window.history.replaceState(a, "", e);
    }
  }, t.store = function(e, i) {
    var r = i || this.P, s = this.get(r);
    s.data = at({}, s.data, e), this.set(r, s);
    var o = {
      from: this.p,
      index: this.P,
      states: [].concat(this.m)
    };
    window.history.replaceState(o, "");
  }, t.update = function(e, i) {
    var r = i || this.P, s = at({}, this.get(r), e);
    this.set(r, s);
  }, t.remove = function(e) {
    e ? this.m.splice(e, 1) : this.m.pop(), this.P--;
  }, t.clear = function() {
    this.m = [], this.P = -1;
  }, t.replace = function(e) {
    this.m = e;
  }, t.get = function(e) {
    return this.m[e];
  }, t.set = function(e, i) {
    return this.m[e] = i;
  }, t.R = function(e) {
    var i = "push", r = e, s = ht.prefix + "-" + ht.history;
    return r.hasAttribute && r.hasAttribute(s) && (i = r.getAttribute(s)), i;
  }, t.g = function(e) {
    return Math.abs(e) > 1 ? e > 0 ? "forward" : "back" : e === 0 ? "popstate" : e > 0 ? "back" : "forward";
  }, Je(n2, [{
    key: "current",
    get: function() {
      return this.m[this.P];
    }
  }, {
    key: "previous",
    get: function() {
      return this.P < 1 ? null : this.m[this.P - 1];
    }
  }, {
    key: "size",
    get: function() {
      return this.m.length;
    }
  }]), n2;
}();
var di = new Qr();
var de = function(n2, t) {
  try {
    var e = function() {
      if (!t.next.html)
        return Promise.resolve(n2).then(function(i) {
          var r = t.next;
          if (i) {
            var s = It.toElement(i.html);
            r.namespace = It.getNamespace(s), r.container = It.getContainer(s), r.url = i.url, r.html = i.html, di.update({
              ns: r.namespace
            });
            var o = It.toDocument(i.html);
            document.title = o.title;
          }
        });
    }();
    return Promise.resolve(e && e.then ? e.then(function() {
    }) : void 0);
  } catch (i) {
    return Promise.reject(i);
  }
};
var fi = function n(t, e, i) {
  return t instanceof RegExp ? function(r, s) {
    if (!s)
      return r;
    for (var o = /\((?:\?<(.*?)>)?(?!\?)/g, l = 0, a = o.exec(r.source); a; )
      s.push({
        name: a[1] || l++,
        prefix: "",
        suffix: "",
        modifier: "",
        pattern: ""
      }), a = o.exec(r.source);
    return r;
  }(t, e) : Array.isArray(t) ? function(r, s, o) {
    var l = r.map(function(a) {
      return n(a, s, o).source;
    });
    return new RegExp("(?:".concat(l.join("|"), ")"), jn(o));
  }(t, e, i) : function(r, s, o) {
    return function(l, a, c) {
      c === void 0 && (c = {});
      for (var u = c.strict, h = u !== void 0 && u, d = c.start, v = d === void 0 || d, f = c.end, p = f === void 0 || f, b = c.encode, m = b === void 0 ? function(B) {
        return B;
      } : b, y = c.delimiter, g = y === void 0 ? "/#?" : y, w = c.endsWith, x = "[".concat(Dt(w === void 0 ? "" : w), "]|$"), S = "[".concat(Dt(g), "]"), E = v ? "^" : "", T = 0, A = l; T < A.length; T++) {
        var C = A[T];
        if (typeof C == "string")
          E += Dt(m(C));
        else {
          var L = Dt(m(C.prefix)), I = Dt(m(C.suffix));
          if (C.pattern)
            if (a && a.push(C), L || I)
              if (C.modifier === "+" || C.modifier === "*") {
                var P = C.modifier === "*" ? "?" : "";
                E += "(?:".concat(L, "((?:").concat(C.pattern, ")(?:").concat(I).concat(L, "(?:").concat(C.pattern, "))*)").concat(I, ")").concat(P);
              } else
                E += "(?:".concat(L, "(").concat(C.pattern, ")").concat(I, ")").concat(C.modifier);
            else
              E += C.modifier === "+" || C.modifier === "*" ? "((?:".concat(C.pattern, ")").concat(C.modifier, ")") : "(".concat(C.pattern, ")").concat(C.modifier);
          else
            E += "(?:".concat(L).concat(I, ")").concat(C.modifier);
        }
      }
      if (p)
        h || (E += "".concat(S, "?")), E += c.endsWith ? "(?=".concat(x, ")") : "$";
      else {
        var _ = l[l.length - 1], $ = typeof _ == "string" ? S.indexOf(_[_.length - 1]) > -1 : _ === void 0;
        h || (E += "(?:".concat(S, "(?=").concat(x, "))?")), $ || (E += "(?=".concat(S, "|").concat(x, ")"));
      }
      return new RegExp(E, jn(c));
    }(function(l, a) {
      a === void 0 && (a = {});
      for (var c = function(I) {
        for (var P = [], _ = 0; _ < I.length; ) {
          var $ = I[_];
          if ($ !== "*" && $ !== "+" && $ !== "?")
            if ($ !== "\\")
              if ($ !== "{")
                if ($ !== "}")
                  if ($ !== ":")
                    if ($ !== "(")
                      P.push({
                        type: "CHAR",
                        index: _,
                        value: I[_++]
                      });
                    else {
                      var B = 1, j = "";
                      if (I[M = _ + 1] === "?")
                        throw new TypeError('Pattern cannot start with "?" at '.concat(M));
                      for (; M < I.length; )
                        if (I[M] !== "\\") {
                          if (I[M] === ")") {
                            if (--B == 0) {
                              M++;
                              break;
                            }
                          } else if (I[M] === "(" && (B++, I[M + 1] !== "?"))
                            throw new TypeError("Capturing groups are not allowed at ".concat(M));
                          j += I[M++];
                        } else
                          j += I[M++] + I[M++];
                      if (B)
                        throw new TypeError("Unbalanced pattern at ".concat(_));
                      if (!j)
                        throw new TypeError("Missing pattern at ".concat(_));
                      P.push({
                        type: "PATTERN",
                        index: _,
                        value: j
                      }), _ = M;
                    }
                  else {
                    for (var R = "", M = _ + 1; M < I.length; ) {
                      var H = I.charCodeAt(M);
                      if (!(H >= 48 && H <= 57 || H >= 65 && H <= 90 || H >= 97 && H <= 122 || H === 95))
                        break;
                      R += I[M++];
                    }
                    if (!R)
                      throw new TypeError("Missing parameter name at ".concat(_));
                    P.push({
                      type: "NAME",
                      index: _,
                      value: R
                    }), _ = M;
                  }
                else
                  P.push({
                    type: "CLOSE",
                    index: _,
                    value: I[_++]
                  });
              else
                P.push({
                  type: "OPEN",
                  index: _,
                  value: I[_++]
                });
            else
              P.push({
                type: "ESCAPED_CHAR",
                index: _++,
                value: I[_++]
              });
          else
            P.push({
              type: "MODIFIER",
              index: _,
              value: I[_++]
            });
        }
        return P.push({
          type: "END",
          index: _,
          value: ""
        }), P;
      }(l), u = a.prefixes, h = u === void 0 ? "./" : u, d = "[^".concat(Dt(a.delimiter || "/#?"), "]+?"), v = [], f = 0, p = 0, b = "", m = function(I) {
        if (p < c.length && c[p].type === I)
          return c[p++].value;
      }, y = function(I) {
        var P = m(I);
        if (P !== void 0)
          return P;
        var _ = c[p], $ = _.index;
        throw new TypeError("Unexpected ".concat(_.type, " at ").concat($, ", expected ").concat(I));
      }, g = function() {
        for (var I, P = ""; I = m("CHAR") || m("ESCAPED_CHAR"); )
          P += I;
        return P;
      }; p < c.length; ) {
        var w = m("CHAR"), x = m("NAME"), S = m("PATTERN");
        if (x || S)
          h.indexOf(T = w || "") === -1 && (b += T, T = ""), b && (v.push(b), b = ""), v.push({
            name: x || f++,
            prefix: T,
            suffix: "",
            pattern: S || d,
            modifier: m("MODIFIER") || ""
          });
        else {
          var E = w || m("ESCAPED_CHAR");
          if (E)
            b += E;
          else if (b && (v.push(b), b = ""), m("OPEN")) {
            var T = g(), A = m("NAME") || "", C = m("PATTERN") || "", L = g();
            y("CLOSE"), v.push({
              name: A || (C ? f++ : ""),
              pattern: A && !C ? d : C,
              prefix: T,
              suffix: L,
              modifier: m("MODIFIER") || ""
            });
          } else
            y("END");
        }
      }
      return v;
    }(r, o), s, o);
  }(t, e, i);
};
var Zr = {
  __proto__: null,
  update: de,
  nextTick: function() {
    return new Promise(function(n2) {
      window.requestAnimationFrame(n2);
    });
  },
  pathToRegexp: fi
};
var pi = function() {
  return window.location.origin;
};
var Jt = function(n2) {
  return n2 === void 0 && (n2 = window.location.href), wt(n2).port;
};
var wt = function(n2) {
  var t, e = n2.match(/:\d+/);
  if (e === null)
    /^http/.test(n2) && (t = 80), /^https/.test(n2) && (t = 443);
  else {
    var i = e[0].substring(1);
    t = parseInt(i, 10);
  }
  var r, s = n2.replace(pi(), ""), o = {}, l = s.indexOf("#");
  l >= 0 && (r = s.slice(l + 1), s = s.slice(0, l));
  var a = s.indexOf("?");
  return a >= 0 && (o = mi(s.slice(a + 1)), s = s.slice(0, a)), {
    hash: r,
    path: s,
    port: t,
    query: o
  };
};
var mi = function(n2) {
  return n2.split("&").reduce(function(t, e) {
    var i = e.split("=");
    return t[i[0]] = i[1], t;
  }, {});
};
var Fe = function(n2) {
  return n2 === void 0 && (n2 = window.location.href), n2.replace(/(\/#.*|\/|#.*)$/, "");
};
var ts = {
  __proto__: null,
  getHref: function() {
    return window.location.href;
  },
  getAbsoluteHref: function(n2, t) {
    return t === void 0 && (t = document.baseURI), new URL(n2, t).href;
  },
  getOrigin: pi,
  getPort: Jt,
  getPath: function(n2) {
    return n2 === void 0 && (n2 = window.location.href), wt(n2).path;
  },
  getQuery: function(n2, t) {
    return t === void 0 && (t = false), t ? JSON.stringify(wt(n2).query) : wt(n2).query;
  },
  getHash: function(n2) {
    return wt(n2).hash;
  },
  parse: wt,
  parseQuery: mi,
  clean: Fe
};
function es(n2, t, e, i, r) {
  return t === void 0 && (t = 2e3), new Promise(function(s, o) {
    var l = new XMLHttpRequest();
    l.onreadystatechange = function() {
      if (l.readyState === XMLHttpRequest.DONE) {
        if (l.status === 200) {
          var a = l.responseURL !== "" && l.responseURL !== n2 ? l.responseURL : n2;
          s({
            html: l.responseText,
            url: at({
              href: a
            }, wt(a))
          }), i.update(n2, {
            status: "fulfilled",
            target: a
          });
        } else if (l.status) {
          var c = {
            status: l.status,
            statusText: l.statusText
          };
          e(n2, c), o(c), i.update(n2, {
            status: "rejected"
          });
        }
      }
    }, l.ontimeout = function() {
      var a = new Error("Timeout error [" + t + "]");
      e(n2, a), o(a), i.update(n2, {
        status: "rejected"
      });
    }, l.onerror = function() {
      var a = new Error("Fetch error");
      e(n2, a), o(a), i.update(n2, {
        status: "rejected"
      });
    }, l.open("GET", n2), l.timeout = t, l.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml"), l.setRequestHeader("x-barba", "yes"), r.all().forEach(function(a, c) {
      l.setRequestHeader(c, a);
    }), l.send();
  });
}
function ns(n2) {
  return !!n2 && (typeof n2 == "object" || typeof n2 == "function") && typeof n2.then == "function";
}
function jt(n2, t) {
  return t === void 0 && (t = {}), function() {
    var e = arguments, i = false, r = new Promise(function(s, o) {
      t.async = function() {
        return i = true, function(a, c) {
          a ? o(a) : s(c);
        };
      };
      var l = n2.apply(t, [].slice.call(e));
      i || (ns(l) ? l.then(s, o) : s(l));
    });
    return r;
  };
}
var yt = new (function(n2) {
  function t() {
    var i;
    return (i = n2.call(this) || this).logger = new Lt("@barba/core"), i.all = ["ready", "page", "reset", "currentAdded", "currentRemoved", "nextAdded", "nextRemoved", "beforeOnce", "once", "afterOnce", "before", "beforeLeave", "leave", "afterLeave", "beforeEnter", "enter", "afterEnter", "after"], i.registered = /* @__PURE__ */ new Map(), i.init(), i;
  }
  ge(t, n2);
  var e = t.prototype;
  return e.init = function() {
    var i = this;
    this.registered.clear(), this.all.forEach(function(r) {
      i[r] || (i[r] = function(s, o) {
        i.registered.has(r) || i.registered.set(r, /* @__PURE__ */ new Set()), i.registered.get(r).add({
          ctx: o || {},
          fn: s
        });
      });
    });
  }, e.do = function(i) {
    var r = arguments, s = this;
    if (this.registered.has(i)) {
      var o = Promise.resolve();
      return this.registered.get(i).forEach(function(l) {
        o = o.then(function() {
          return jt(l.fn, l.ctx).apply(void 0, [].slice.call(r, 1));
        });
      }), o.catch(function(l) {
        s.logger.debug("Hook error [" + i + "]"), s.logger.error(l);
      });
    }
    return Promise.resolve();
  }, e.clear = function() {
    var i = this;
    this.all.forEach(function(r) {
      delete i[r];
    }), this.init();
  }, e.help = function() {
    this.logger.info("Available hooks: " + this.all.join(","));
    var i = [];
    this.registered.forEach(function(r, s) {
      return i.push(s);
    }), this.logger.info("Registered hooks: " + i.join(","));
  }, t;
}(Jr))();
var gi = function() {
  function n2(t) {
    if (this.k = void 0, this.O = [], typeof t == "boolean")
      this.k = t;
    else {
      var e = Array.isArray(t) ? t : [t];
      this.O = e.map(function(i) {
        return fi(i);
      });
    }
  }
  return n2.prototype.checkHref = function(t) {
    if (typeof this.k == "boolean")
      return this.k;
    var e = wt(t).path;
    return this.O.some(function(i) {
      return i.exec(e) !== null;
    });
  }, n2;
}();
var is = function(n2) {
  function t(i) {
    var r;
    return (r = n2.call(this, i) || this).T = /* @__PURE__ */ new Map(), r;
  }
  ge(t, n2);
  var e = t.prototype;
  return e.set = function(i, r, s, o, l) {
    return this.T.set(i, {
      action: s,
      request: r,
      status: o,
      target: l ?? i
    }), {
      action: s,
      request: r,
      status: o,
      target: l
    };
  }, e.get = function(i) {
    return this.T.get(i);
  }, e.getRequest = function(i) {
    return this.T.get(i).request;
  }, e.getAction = function(i) {
    return this.T.get(i).action;
  }, e.getStatus = function(i) {
    return this.T.get(i).status;
  }, e.getTarget = function(i) {
    return this.T.get(i).target;
  }, e.has = function(i) {
    return !this.checkHref(i) && this.T.has(i);
  }, e.delete = function(i) {
    return this.T.delete(i);
  }, e.update = function(i, r) {
    var s = at({}, this.T.get(i), r);
    return this.T.set(i, s), s;
  }, t;
}(gi);
var rs = function() {
  function n2() {
    this.A = /* @__PURE__ */ new Map();
  }
  var t = n2.prototype;
  return t.set = function(e, i) {
    return this.A.set(e, i), {
      name: i
    };
  }, t.get = function(e) {
    return this.A.get(e);
  }, t.all = function() {
    return this.A;
  }, t.has = function(e) {
    return this.A.has(e);
  }, t.delete = function(e) {
    return this.A.delete(e);
  }, t.clear = function() {
    return this.A.clear();
  }, n2;
}();
var ss = function() {
  return !window.history.pushState;
};
var os = function(n2) {
  return !n2.el || !n2.href;
};
var as = function(n2) {
  var t = n2.event;
  return t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey;
};
var ls = function(n2) {
  var t = n2.el;
  return t.hasAttribute("target") && t.target === "_blank";
};
var cs = function(n2) {
  var t = n2.el;
  return t.protocol !== void 0 && window.location.protocol !== t.protocol || t.hostname !== void 0 && window.location.hostname !== t.hostname;
};
var us = function(n2) {
  var t = n2.el;
  return t.port !== void 0 && Jt() !== Jt(t.href);
};
var hs = function(n2) {
  var t = n2.el;
  return t.getAttribute && typeof t.getAttribute("download") == "string";
};
var ds = function(n2) {
  return n2.el.hasAttribute(ht.prefix + "-" + ht.prevent);
};
var fs = function(n2) {
  return !!n2.el.closest("[" + ht.prefix + "-" + ht.prevent + '="all"]');
};
var ps = function(n2) {
  var t = n2.href;
  return Fe(t) === Fe() && Jt(t) === Jt();
};
var ms = function(n2) {
  function t(i) {
    var r;
    return (r = n2.call(this, i) || this).suite = [], r.tests = /* @__PURE__ */ new Map(), r.init(), r;
  }
  ge(t, n2);
  var e = t.prototype;
  return e.init = function() {
    this.add("pushState", ss), this.add("exists", os), this.add("newTab", as), this.add("blank", ls), this.add("corsDomain", cs), this.add("corsPort", us), this.add("download", hs), this.add("preventSelf", ds), this.add("preventAll", fs), this.add("sameUrl", ps, false);
  }, e.add = function(i, r, s) {
    s === void 0 && (s = true), this.tests.set(i, r), s && this.suite.push(i);
  }, e.run = function(i, r, s, o) {
    return this.tests.get(i)({
      el: r,
      event: s,
      href: o
    });
  }, e.checkLink = function(i, r, s) {
    var o = this;
    return this.suite.some(function(l) {
      return o.run(l, i, r, s);
    });
  }, t;
}(gi);
var _e = function(n2) {
  function t(e, i) {
    var r;
    return i === void 0 && (i = "Barba error"), (r = n2.call.apply(n2, [this].concat([].slice.call(arguments, 2))) || this).error = void 0, r.label = void 0, r.error = e, r.label = i, Error.captureStackTrace && Error.captureStackTrace(Xr(r), t), r.name = "BarbaError", r;
  }
  return ge(t, n2), t;
}(De(Error));
var gs = function() {
  function n2(e) {
    e === void 0 && (e = []), this.logger = new Lt("@barba/core"), this.all = [], this.page = [], this.once = [], this.j = [{
      name: "namespace",
      type: "strings"
    }, {
      name: "custom",
      type: "function"
    }], e && (this.all = this.all.concat(e)), this.update();
  }
  var t = n2.prototype;
  return t.add = function(e, i) {
    e === "rule" ? this.j.splice(i.position || 0, 0, i.value) : this.all.push(i), this.update();
  }, t.resolve = function(e, i) {
    var r = this;
    i === void 0 && (i = {});
    var s = i.once ? this.once : this.page;
    s = s.filter(i.self ? function(d) {
      return d.name && d.name === "self";
    } : function(d) {
      return !d.name || d.name !== "self";
    });
    var o = /* @__PURE__ */ new Map(), l = s.find(function(d) {
      var v = true, f = {};
      return i.self && d.name === "self" ? (o.set(d, f), true) : (r.j.reverse().forEach(function(p) {
        v && (v = r.M(d, p, e, f), d.from && d.to && (v = r.M(d, p, e, f, "from") && r.M(d, p, e, f, "to")), d.from && !d.to && (v = r.M(d, p, e, f, "from")), !d.from && d.to && (v = r.M(d, p, e, f, "to")));
      }), o.set(d, f), v);
    }), a = o.get(l), c = [];
    if (c.push(i.once ? "once" : "page"), i.self && c.push("self"), a) {
      var u, h = [l];
      Object.keys(a).length > 0 && h.push(a), (u = this.logger).info.apply(u, ["Transition found [" + c.join(",") + "]"].concat(h));
    } else
      this.logger.info("No transition found [" + c.join(",") + "]");
    return l;
  }, t.update = function() {
    var e = this;
    this.all = this.all.map(function(i) {
      return e.N(i);
    }).sort(function(i, r) {
      return i.priority - r.priority;
    }).reverse().map(function(i) {
      return delete i.priority, i;
    }), this.page = this.all.filter(function(i) {
      return i.leave !== void 0 || i.enter !== void 0;
    }), this.once = this.all.filter(function(i) {
      return i.once !== void 0;
    });
  }, t.M = function(e, i, r, s, o) {
    var l = true, a = false, c = e, u = i.name, h = u, d = u, v = u, f = o ? c[o] : c, p = o === "to" ? r.next : r.current;
    if (o ? f && f[u] : f[u]) {
      switch (i.type) {
        case "strings":
        default:
          var b = Array.isArray(f[h]) ? f[h] : [f[h]];
          p[h] && b.indexOf(p[h]) !== -1 && (a = true), b.indexOf(p[h]) === -1 && (l = false);
          break;
        case "object":
          var m = Array.isArray(f[d]) ? f[d] : [f[d]];
          p[d] ? (p[d].name && m.indexOf(p[d].name) !== -1 && (a = true), m.indexOf(p[d].name) === -1 && (l = false)) : l = false;
          break;
        case "function":
          f[v](r) ? a = true : l = false;
      }
      a && (o ? (s[o] = s[o] || {}, s[o][u] = c[o][u]) : s[u] = c[u]);
    }
    return l;
  }, t.S = function(e, i, r) {
    var s = 0;
    return (e[i] || e.from && e.from[i] || e.to && e.to[i]) && (s += Math.pow(10, r), e.from && e.from[i] && (s += 1), e.to && e.to[i] && (s += 2)), s;
  }, t.N = function(e) {
    var i = this;
    e.priority = 0;
    var r = 0;
    return this.j.forEach(function(s, o) {
      r += i.S(e, s.name, o + 1);
    }), e.priority = r, e;
  }, n2;
}();
function Bt(n2, t) {
  try {
    var e = n2();
  } catch (i) {
    return t(i);
  }
  return e && e.then ? e.then(void 0, t) : e;
}
var vs = function() {
  function n2(e) {
    e === void 0 && (e = []), this.logger = new Lt("@barba/core"), this.store = void 0, this.C = false, this.store = new gs(e);
  }
  var t = n2.prototype;
  return t.get = function(e, i) {
    return this.store.resolve(e, i);
  }, t.doOnce = function(e) {
    var i = e.data, r = e.transition;
    try {
      var s = function() {
        o.C = false;
      }, o = this, l = r || {};
      o.C = true;
      var a = Bt(function() {
        return Promise.resolve(o.L("beforeOnce", i, l)).then(function() {
          return Promise.resolve(o.once(i, l)).then(function() {
            return Promise.resolve(o.L("afterOnce", i, l)).then(function() {
            });
          });
        });
      }, function(c) {
        o.C = false, o.logger.debug("Transition error [before/after/once]"), o.logger.error(c);
      });
      return Promise.resolve(a && a.then ? a.then(s) : s());
    } catch (c) {
      return Promise.reject(c);
    }
  }, t.doPage = function(e) {
    var i = e.data, r = e.transition, s = e.page, o = e.wrapper;
    try {
      var l = function(d) {
        a.C = false;
      }, a = this, c = r || {}, u = c.sync === true || false;
      a.C = true;
      var h = Bt(function() {
        function d() {
          return Promise.resolve(a.L("before", i, c)).then(function() {
            function f(b) {
              return Promise.resolve(a.remove(i)).then(function() {
                return Promise.resolve(a.L("after", i, c)).then(function() {
                });
              });
            }
            var p = function() {
              if (u)
                return Bt(function() {
                  return Promise.resolve(a.add(i, o)).then(function() {
                    return Promise.resolve(a.L("beforeLeave", i, c)).then(function() {
                      return Promise.resolve(a.L("beforeEnter", i, c)).then(function() {
                        return Promise.resolve(Promise.all([a.leave(i, c), a.enter(i, c)])).then(function() {
                          return Promise.resolve(a.L("afterLeave", i, c)).then(function() {
                            return Promise.resolve(a.L("afterEnter", i, c)).then(function() {
                            });
                          });
                        });
                      });
                    });
                  });
                }, function(g) {
                  if (a.H(g))
                    throw new _e(g, "Transition error [sync]");
                });
              var b = function(g) {
                return Bt(function() {
                  var w = function() {
                    if (m !== false)
                      return Promise.resolve(a.add(i, o)).then(function() {
                        return Promise.resolve(a.L("beforeEnter", i, c)).then(function() {
                          return Promise.resolve(a.enter(i, c, m)).then(function() {
                            return Promise.resolve(a.L("afterEnter", i, c)).then(function() {
                            });
                          });
                        });
                      });
                  }();
                  if (w && w.then)
                    return w.then(function() {
                    });
                }, function(w) {
                  if (a.H(w))
                    throw new _e(w, "Transition error [before/after/enter]");
                });
              }, m = false, y = Bt(function() {
                return Promise.resolve(a.L("beforeLeave", i, c)).then(function() {
                  return Promise.resolve(Promise.all([a.leave(i, c), de(s, i)]).then(function(g) {
                    return g[0];
                  })).then(function(g) {
                    return m = g, Promise.resolve(a.L("afterLeave", i, c)).then(function() {
                    });
                  });
                });
              }, function(g) {
                if (a.H(g))
                  throw new _e(g, "Transition error [before/after/leave]");
              });
              return y && y.then ? y.then(b) : b();
            }();
            return p && p.then ? p.then(f) : f();
          });
        }
        var v = function() {
          if (u)
            return Promise.resolve(de(s, i)).then(function() {
            });
        }();
        return v && v.then ? v.then(d) : d();
      }, function(d) {
        throw a.C = false, d.name && d.name === "BarbaError" ? (a.logger.debug(d.label), a.logger.error(d.error), d) : (a.logger.debug("Transition error [page]"), a.logger.error(d), d);
      });
      return Promise.resolve(h && h.then ? h.then(l) : l());
    } catch (d) {
      return Promise.reject(d);
    }
  }, t.once = function(e, i) {
    try {
      return Promise.resolve(yt.do("once", e, i)).then(function() {
        return i.once ? jt(i.once, i)(e) : Promise.resolve();
      });
    } catch (r) {
      return Promise.reject(r);
    }
  }, t.leave = function(e, i) {
    try {
      return Promise.resolve(yt.do("leave", e, i)).then(function() {
        return i.leave ? jt(i.leave, i)(e) : Promise.resolve();
      });
    } catch (r) {
      return Promise.reject(r);
    }
  }, t.enter = function(e, i, r) {
    try {
      return Promise.resolve(yt.do("enter", e, i)).then(function() {
        return i.enter ? jt(i.enter, i)(e, r) : Promise.resolve();
      });
    } catch (s) {
      return Promise.reject(s);
    }
  }, t.add = function(e, i) {
    try {
      return It.addContainer(e.next.container, i), yt.do("nextAdded", e), Promise.resolve();
    } catch (r) {
      return Promise.reject(r);
    }
  }, t.remove = function(e) {
    try {
      return It.removeContainer(e.current.container), yt.do("currentRemoved", e), Promise.resolve();
    } catch (i) {
      return Promise.reject(i);
    }
  }, t.H = function(e) {
    return e.message ? !/Timeout error|Fetch error/.test(e.message) : !e.status;
  }, t.L = function(e, i, r) {
    try {
      return Promise.resolve(yt.do(e, i, r)).then(function() {
        return r[e] ? jt(r[e], r)(i) : Promise.resolve();
      });
    } catch (s) {
      return Promise.reject(s);
    }
  }, Je(n2, [{
    key: "isRunning",
    get: function() {
      return this.C;
    },
    set: function(e) {
      this.C = e;
    }
  }, {
    key: "hasOnce",
    get: function() {
      return this.store.once.length > 0;
    }
  }, {
    key: "hasSelf",
    get: function() {
      return this.store.all.some(function(e) {
        return e.name === "self";
      });
    }
  }, {
    key: "shouldWait",
    get: function() {
      return this.store.all.some(function(e) {
        return e.to && !e.to.route || e.sync;
      });
    }
  }]), n2;
}();
var ys = function() {
  function n2(t) {
    var e = this;
    this.names = ["beforeLeave", "afterLeave", "beforeEnter", "afterEnter"], this.byNamespace = /* @__PURE__ */ new Map(), t.length !== 0 && (t.forEach(function(i) {
      e.byNamespace.set(i.namespace, i);
    }), this.names.forEach(function(i) {
      yt[i](e._(i));
    }));
  }
  return n2.prototype._ = function(t) {
    var e = this;
    return function(i) {
      var r = t.match(/enter/i) ? i.next : i.current, s = e.byNamespace.get(r.namespace);
      return s && s[t] ? jt(s[t], s)(i) : Promise.resolve();
    };
  }, n2;
}();
Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(n2) {
  var t = this;
  do {
    if (t.matches(n2))
      return t;
    t = t.parentElement || t.parentNode;
  } while (t !== null && t.nodeType === 1);
  return null;
});
var bs = {
  container: null,
  html: "",
  namespace: "",
  url: {
    hash: "",
    href: "",
    path: "",
    port: null,
    query: {}
  }
};
var Y = new (function() {
  function n2() {
    this.version = "2.10.3", this.schemaPage = bs, this.Logger = Lt, this.logger = new Lt("@barba/core"), this.plugins = [], this.timeout = void 0, this.cacheIgnore = void 0, this.cacheFirstPage = void 0, this.prefetchIgnore = void 0, this.preventRunning = void 0, this.hooks = yt, this.cache = void 0, this.headers = void 0, this.prevent = void 0, this.transitions = void 0, this.views = void 0, this.dom = It, this.helpers = Zr, this.history = di, this.request = es, this.url = ts, this.D = void 0, this.B = void 0, this.q = void 0, this.F = void 0;
  }
  var t = n2.prototype;
  return t.use = function(e, i) {
    var r = this.plugins;
    r.indexOf(e) > -1 ? this.logger.warn("Plugin [" + e.name + "] already installed.") : typeof e.install == "function" ? (e.install(this, i), r.push(e)) : this.logger.warn("Plugin [" + e.name + '] has no "install" method.');
  }, t.init = function(e) {
    var i = e === void 0 ? {} : e, r = i.transitions, s = r === void 0 ? [] : r, o = i.views, l = o === void 0 ? [] : o, a = i.schema, c = a === void 0 ? ht : a, u = i.requestError, h = i.timeout, d = h === void 0 ? 2e3 : h, v = i.cacheIgnore, f = v !== void 0 && v, p = i.cacheFirstPage, b = p !== void 0 && p, m = i.prefetchIgnore, y = m !== void 0 && m, g = i.preventRunning, w = g !== void 0 && g, x = i.prevent, S = x === void 0 ? null : x, E = i.debug, T = i.logLevel;
    if (Lt.setLevel((E !== void 0 && E) === true ? "debug" : T === void 0 ? "off" : T), this.logger.info(this.version), Object.keys(c).forEach(function(L) {
      ht[L] && (ht[L] = c[L]);
    }), this.B = u, this.timeout = d, this.cacheIgnore = f, this.cacheFirstPage = b, this.prefetchIgnore = y, this.preventRunning = w, this.q = this.dom.getWrapper(), !this.q)
      throw new Error("[@barba/core] No Barba wrapper found");
    this.I();
    var A = this.data.current;
    if (!A.container)
      throw new Error("[@barba/core] No Barba container found");
    if (this.cache = new is(f), this.headers = new rs(), this.prevent = new ms(y), this.transitions = new vs(s), this.views = new ys(l), S !== null) {
      if (typeof S != "function")
        throw new Error("[@barba/core] Prevent should be a function");
      this.prevent.add("preventCustom", S);
    }
    this.history.init(A.url.href, A.namespace), b && this.cache.set(A.url.href, Promise.resolve({
      html: A.html,
      url: A.url
    }), "init", "fulfilled"), this.U = this.U.bind(this), this.$ = this.$.bind(this), this.X = this.X.bind(this), this.G(), this.plugins.forEach(function(L) {
      return L.init();
    });
    var C = this.data;
    C.trigger = "barba", C.next = C.current, C.current = at({}, this.schemaPage), this.hooks.do("ready", C), this.once(C), this.I();
  }, t.destroy = function() {
    this.I(), this.J(), this.history.clear(), this.hooks.clear(), this.plugins = [];
  }, t.force = function(e) {
    window.location.assign(e);
  }, t.go = function(e, i, r) {
    var s;
    if (i === void 0 && (i = "barba"), this.F = null, this.transitions.isRunning)
      this.force(e);
    else if (!(s = i === "popstate" ? this.history.current && this.url.getPath(this.history.current.url) === this.url.getPath(e) && this.url.getQuery(this.history.current.url, true) === this.url.getQuery(e, true) : this.prevent.run("sameUrl", null, null, e)) || this.transitions.hasSelf)
      return i = this.history.change(this.cache.has(e) ? this.cache.get(e).target : e, i, r), r && (r.stopPropagation(), r.preventDefault()), this.page(e, i, r ?? void 0, s);
  }, t.once = function(e) {
    try {
      var i = this;
      return Promise.resolve(i.hooks.do("beforeEnter", e)).then(function() {
        function r() {
          return Promise.resolve(i.hooks.do("afterEnter", e)).then(function() {
          });
        }
        var s = function() {
          if (i.transitions.hasOnce) {
            var o = i.transitions.get(e, {
              once: true
            });
            return Promise.resolve(i.transitions.doOnce({
              transition: o,
              data: e
            })).then(function() {
            });
          }
        }();
        return s && s.then ? s.then(r) : r();
      });
    } catch (r) {
      return Promise.reject(r);
    }
  }, t.page = function(e, i, r, s) {
    try {
      var o, l = function() {
        var h = a.data;
        return Promise.resolve(a.hooks.do("page", h)).then(function() {
          var d = function(v, f) {
            try {
              var p = (b = a.transitions.get(h, {
                once: false,
                self: s
              }), Promise.resolve(a.transitions.doPage({
                data: h,
                page: o,
                transition: b,
                wrapper: a.q
              })).then(function() {
                a.I();
              }));
            } catch {
              return f();
            }
            var b;
            return p && p.then ? p.then(void 0, f) : p;
          }(0, function() {
            Lt.getLevel() === 0 && a.force(h.next.url.href);
          });
          if (d && d.then)
            return d.then(function() {
            });
        });
      }, a = this;
      if (a.data.next.url = at({
        href: e
      }, a.url.parse(e)), a.data.trigger = i, a.data.event = r, a.cache.has(e))
        o = a.cache.update(e, {
          action: "click"
        }).request;
      else {
        var c = a.request(e, a.timeout, a.onRequestError.bind(a, i), a.cache, a.headers);
        c.then(function(h) {
          h.url.href !== e && a.history.add(h.url.href, i, "replace");
        }), o = a.cache.set(e, c, "click", "pending").request;
      }
      var u = function() {
        if (a.transitions.shouldWait)
          return Promise.resolve(de(o, a.data)).then(function() {
          });
      }();
      return Promise.resolve(u && u.then ? u.then(l) : l());
    } catch (h) {
      return Promise.reject(h);
    }
  }, t.onRequestError = function(e) {
    this.transitions.isRunning = false;
    var i = [].slice.call(arguments, 1), r = i[0], s = i[1], o = this.cache.getAction(r);
    return this.cache.delete(r), this.B && this.B(e, o, r, s) === false || o === "click" && this.force(r), false;
  }, t.prefetch = function(e) {
    var i = this;
    e = this.url.getAbsoluteHref(e), this.cache.has(e) || this.cache.set(e, this.request(e, this.timeout, this.onRequestError.bind(this, "barba"), this.cache, this.headers).catch(function(r) {
      i.logger.error(r);
    }), "prefetch", "pending");
  }, t.G = function() {
    this.prefetchIgnore !== true && (document.addEventListener("mouseover", this.U), document.addEventListener("touchstart", this.U)), document.addEventListener("click", this.$), window.addEventListener("popstate", this.X);
  }, t.J = function() {
    this.prefetchIgnore !== true && (document.removeEventListener("mouseover", this.U), document.removeEventListener("touchstart", this.U)), document.removeEventListener("click", this.$), window.removeEventListener("popstate", this.X);
  }, t.U = function(e) {
    var i = this, r = this.W(e);
    if (r) {
      var s = this.url.getAbsoluteHref(this.dom.getHref(r));
      this.prevent.checkHref(s) || this.cache.has(s) || this.cache.set(s, this.request(s, this.timeout, this.onRequestError.bind(this, r), this.cache, this.headers).catch(function(o) {
        i.logger.error(o);
      }), "enter", "pending");
    }
  }, t.$ = function(e) {
    var i = this.W(e);
    if (i) {
      if (this.transitions.isRunning && this.preventRunning)
        return e.preventDefault(), void e.stopPropagation();
      this.F = e, this.go(this.dom.getHref(i), i, e);
    }
  }, t.X = function(e) {
    this.go(this.url.getHref(), "popstate", e);
  }, t.W = function(e) {
    for (var i = e.target; i && !this.dom.getHref(i); )
      i = i.parentNode;
    if (i && !this.prevent.checkLink(i, e, this.dom.getHref(i)))
      return i;
  }, t.I = function() {
    var e = this.url.getHref(), i = {
      container: this.dom.getContainer(),
      html: this.dom.getHtml(),
      namespace: this.dom.getNamespace(),
      url: at({
        href: e
      }, this.url.parse(e))
    };
    this.D = {
      current: i,
      event: void 0,
      next: at({}, this.schemaPage),
      trigger: void 0
    }, this.hooks.do("reset", this.data);
  }, Je(n2, [{
    key: "data",
    get: function() {
      return this.D;
    }
  }, {
    key: "wrapper",
    get: function() {
      return this.q;
    }
  }]), n2;
}())();
var ws = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ss(n2) {
  return n2 && n2.__esModule && Object.prototype.hasOwnProperty.call(n2, "default") ? n2.default : n2;
}
var vi = {
  exports: {}
};
(function(n2, t) {
  (function(e, i) {
    n2.exports = i();
  })(ws, function() {
    var e = function() {
      function i(v) {
        return o.appendChild(v.dom), v;
      }
      function r(v) {
        for (var f = 0; f < o.children.length; f++)
          o.children[f].style.display = f === v ? "block" : "none";
        s = v;
      }
      var s = 0, o = document.createElement("div");
      o.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", o.addEventListener("click", function(v) {
        v.preventDefault(), r(++s % o.children.length);
      }, false);
      var l = (performance || Date).now(), a = l, c = 0, u = i(new e.Panel("FPS", "#0ff", "#002")), h = i(new e.Panel("MS", "#0f0", "#020"));
      if (self.performance && self.performance.memory)
        var d = i(new e.Panel("MB", "#f08", "#201"));
      return r(0), {
        REVISION: 16,
        dom: o,
        addPanel: i,
        showPanel: r,
        begin: function() {
          l = (performance || Date).now();
        },
        end: function() {
          c++;
          var v = (performance || Date).now();
          if (h.update(v - l, 200), v > a + 1e3 && (u.update(1e3 * c / (v - a), 100), a = v, c = 0, d)) {
            var f = performance.memory;
            d.update(f.usedJSHeapSize / 1048576, f.jsHeapSizeLimit / 1048576);
          }
          return v;
        },
        update: function() {
          l = this.end();
        },
        domElement: o,
        setMode: r
      };
    };
    return e.Panel = function(i, r, s) {
      var o = 1 / 0, l = 0, a = Math.round, c = a(window.devicePixelRatio || 1), u = 80 * c, h = 48 * c, d = 3 * c, v = 2 * c, f = 3 * c, p = 15 * c, b = 74 * c, m = 30 * c, y = document.createElement("canvas");
      y.width = u, y.height = h, y.style.cssText = "width:80px;height:48px";
      var g = y.getContext("2d");
      return g.font = "bold " + 9 * c + "px Helvetica,Arial,sans-serif", g.textBaseline = "top", g.fillStyle = s, g.fillRect(0, 0, u, h), g.fillStyle = r, g.fillText(i, d, v), g.fillRect(f, p, b, m), g.fillStyle = s, g.globalAlpha = 0.9, g.fillRect(f, p, b, m), {
        dom: y,
        update: function(w, x) {
          o = Math.min(o, w), l = Math.max(l, w), g.fillStyle = s, g.globalAlpha = 1, g.fillRect(0, 0, u, p), g.fillStyle = r, g.fillText(a(w) + " " + i + " (" + a(o) + "-" + a(l) + ")", d, v), g.drawImage(y, f + c, p, b - c, m, f, p, b - c, m), g.fillRect(f + b - c, p, c, m), g.fillStyle = s, g.globalAlpha = 0.9, g.fillRect(f + b - c, p, c, a((1 - w / x) * m));
        }
      };
    }, e;
  });
})(vi);
var Es = vi.exports;
var Cs = Ss(Es);
var Et = typeof window < "u";
var yi = Et && !("onscroll" in window) || typeof navigator < "u" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
var bi = Et && window.devicePixelRatio > 1;
var xs = {
  elements_selector: ".lazy",
  container: yi || Et ? document : null,
  threshold: 300,
  thresholds: null,
  data_src: "src",
  data_srcset: "srcset",
  data_sizes: "sizes",
  data_bg: "bg",
  data_bg_hidpi: "bg-hidpi",
  data_bg_multi: "bg-multi",
  data_bg_multi_hidpi: "bg-multi-hidpi",
  data_bg_set: "bg-set",
  data_poster: "poster",
  class_applied: "applied",
  class_loading: "loading",
  class_loaded: "loaded",
  class_error: "error",
  class_entered: "entered",
  class_exited: "exited",
  unobserve_completed: true,
  unobserve_entered: false,
  cancel_on_exit: true,
  callback_enter: null,
  callback_exit: null,
  callback_applied: null,
  callback_loading: null,
  callback_loaded: null,
  callback_error: null,
  callback_finish: null,
  callback_cancel: null,
  use_native: false,
  restore_on_error: false
};
var wi = (n2) => Object.assign({}, xs, n2);
var zn = function(n2, t) {
  let e;
  const i = "LazyLoad::Initialized", r = new n2(t);
  try {
    e = new CustomEvent(i, {
      detail: {
        instance: r
      }
    });
  } catch {
    e = document.createEvent("CustomEvent"), e.initCustomEvent(i, false, false, {
      instance: r
    });
  }
  window.dispatchEvent(e);
};
var Ts = (n2, t) => {
  if (t)
    if (t.length)
      for (let e, i = 0; e = t[i]; i += 1)
        zn(n2, e);
    else
      zn(n2, t);
};
var gt = "src";
var Qe = "srcset";
var Ze = "sizes";
var Si = "poster";
var ie = "llOriginalAttrs";
var Ei = "data";
var tn = "loading";
var Ci = "loaded";
var xi = "applied";
var As = "entered";
var en = "error";
var Ti = "native";
var Ai = "data-";
var Li = "ll-status";
var J = (n2, t) => n2.getAttribute(Ai + t);
var Ls = (n2, t, e) => {
  const i = Ai + t;
  e !== null ? n2.setAttribute(i, e) : n2.removeAttribute(i);
};
var re = (n2) => J(n2, Li);
var $t = (n2, t) => Ls(n2, Li, t);
var ve = (n2) => $t(n2, null);
var nn = (n2) => re(n2) === null;
var Is = (n2) => re(n2) === tn;
var ks = (n2) => re(n2) === en;
var rn = (n2) => re(n2) === Ti;
var Os = [tn, Ci, xi, en];
var _s = (n2) => Os.indexOf(re(n2)) >= 0;
var Ct = (n2, t, e, i) => {
  n2 && typeof n2 == "function" && (i === void 0 ? e === void 0 ? n2(t) : n2(t, e) : n2(t, e, i));
};
var Ht = (n2, t) => {
  Et && t !== "" && n2.classList.add(t);
};
var ot = (n2, t) => {
  Et && t !== "" && n2.classList.remove(t);
};
var Ps = (n2) => {
  n2.llTempImage = document.createElement("IMG");
};
var Ms = (n2) => {
  delete n2.llTempImage;
};
var Ii = (n2) => n2.llTempImage;
var ye = (n2, t) => {
  if (!t)
    return;
  const e = t._observer;
  e && e.unobserve(n2);
};
var $s = (n2) => {
  n2.disconnect();
};
var Rs = (n2, t, e) => {
  t.unobserve_entered && ye(n2, e);
};
var sn = (n2, t) => {
  n2 && (n2.loadingCount += t);
};
var Ds = (n2) => {
  n2 && (n2.toLoadCount -= 1);
};
var ki = (n2, t) => {
  n2 && (n2.toLoadCount = t);
};
var Fs = (n2) => n2.loadingCount > 0;
var qs = (n2) => n2.toLoadCount > 0;
var Oi = (n2) => {
  let t = [];
  for (let e, i = 0; e = n2.children[i]; i += 1)
    e.tagName === "SOURCE" && t.push(e);
  return t;
};
var on = (n2, t) => {
  const e = n2.parentNode;
  e && e.tagName === "PICTURE" && Oi(e).forEach(t);
};
var _i = (n2, t) => {
  Oi(n2).forEach(t);
};
var be = [gt];
var Pi = [gt, Si];
var Qt = [gt, Qe, Ze];
var Mi = [Ei];
var we = (n2) => !!n2[ie];
var $i = (n2) => n2[ie];
var Ri = (n2) => delete n2[ie];
var Nt = (n2, t) => {
  if (we(n2))
    return;
  const e = {};
  t.forEach((i) => {
    e[i] = n2.getAttribute(i);
  }), n2[ie] = e;
};
var js = (n2) => {
  we(n2) || (n2[ie] = {
    backgroundImage: n2.style.backgroundImage
  });
};
var _t = (n2, t) => {
  if (!we(n2))
    return;
  const e = $i(n2);
  t.forEach((i) => {
    ((r, s, o) => {
      o ? r.setAttribute(s, o) : r.removeAttribute(s);
    })(n2, i, e[i]);
  });
};
var zs = (n2) => {
  if (!we(n2))
    return;
  const t = $i(n2);
  n2.style.backgroundImage = t.backgroundImage;
};
var Di = (n2, t, e) => {
  Ht(n2, t.class_applied), $t(n2, xi), e && (t.unobserve_completed && ye(n2, t), Ct(t.callback_applied, n2, e));
};
var Fi = (n2, t, e) => {
  Ht(n2, t.class_loading), $t(n2, tn), e && (sn(e, 1), Ct(t.callback_loading, n2, e));
};
var St = (n2, t, e) => {
  e && n2.setAttribute(t, e);
};
var Nn = (n2, t) => {
  St(n2, Ze, J(n2, t.data_sizes)), St(n2, Qe, J(n2, t.data_srcset)), St(n2, gt, J(n2, t.data_src));
};
var Ns = (n2, t) => {
  on(n2, (e) => {
    Nt(e, Qt), Nn(e, t);
  }), Nt(n2, Qt), Nn(n2, t);
};
var Hs = (n2, t) => {
  Nt(n2, be), St(n2, gt, J(n2, t.data_src));
};
var Vs = (n2, t) => {
  _i(n2, (e) => {
    Nt(e, be), St(e, gt, J(e, t.data_src));
  }), Nt(n2, Pi), St(n2, Si, J(n2, t.data_poster)), St(n2, gt, J(n2, t.data_src)), n2.load();
};
var Bs = (n2, t) => {
  Nt(n2, Mi), St(n2, Ei, J(n2, t.data_src));
};
var Us = (n2, t, e) => {
  const i = J(n2, t.data_bg), r = J(n2, t.data_bg_hidpi), s = bi && r ? r : i;
  s && (n2.style.backgroundImage = `url("${s}")`, Ii(n2).setAttribute(gt, s), Fi(n2, t, e));
};
var Ws = (n2, t, e) => {
  const i = J(n2, t.data_bg_multi), r = J(n2, t.data_bg_multi_hidpi), s = bi && r ? r : i;
  s && (n2.style.backgroundImage = s, Di(n2, t, e));
};
var Gs = (n2, t, e) => {
  const i = J(n2, t.data_bg_set);
  if (!i)
    return;
  let r = i.split("|").map((s) => `image-set(${s})`);
  n2.style.backgroundImage = r.join(), Di(n2, t, e);
};
var qi = {
  IMG: Ns,
  IFRAME: Hs,
  VIDEO: Vs,
  OBJECT: Bs
};
var Ks = (n2, t) => {
  const e = qi[n2.tagName];
  e && e(n2, t);
};
var Ys = (n2, t, e) => {
  const i = qi[n2.tagName];
  i && (i(n2, t), Fi(n2, t, e));
};
var Xs = ["IMG", "IFRAME", "VIDEO", "OBJECT"];
var Js = (n2) => Xs.indexOf(n2.tagName) > -1;
var ji = (n2, t) => {
  !t || Fs(t) || qs(t) || Ct(n2.callback_finish, t);
};
var Hn = (n2, t, e) => {
  n2.addEventListener(t, e), n2.llEvLisnrs[t] = e;
};
var Qs = (n2, t, e) => {
  n2.removeEventListener(t, e);
};
var an = (n2) => !!n2.llEvLisnrs;
var Zs = (n2, t, e) => {
  an(n2) || (n2.llEvLisnrs = {});
  const i = n2.tagName === "VIDEO" ? "loadeddata" : "load";
  Hn(n2, i, t), Hn(n2, "error", e);
};
var qe = (n2) => {
  if (!an(n2))
    return;
  const t = n2.llEvLisnrs;
  for (let e in t) {
    const i = t[e];
    Qs(n2, e, i);
  }
  delete n2.llEvLisnrs;
};
var zi = (n2, t, e) => {
  Ms(n2), sn(e, -1), Ds(e), ot(n2, t.class_loading), t.unobserve_completed && ye(n2, e);
};
var to = (n2, t, e, i) => {
  const r = rn(t);
  zi(t, e, i), Ht(t, e.class_loaded), $t(t, Ci), Ct(e.callback_loaded, t, i), r || ji(e, i);
};
var eo = (n2, t, e, i) => {
  const r = rn(t);
  zi(t, e, i), Ht(t, e.class_error), $t(t, en), Ct(e.callback_error, t, i), e.restore_on_error && _t(t, Qt), r || ji(e, i);
};
var je = (n2, t, e) => {
  const i = Ii(n2) || n2;
  an(i) || Zs(i, (r) => {
    to(0, n2, t, e), qe(i);
  }, (r) => {
    eo(0, n2, t, e), qe(i);
  });
};
var ze = (n2, t, e) => {
  Js(n2) ? ((i, r, s) => {
    je(i, r, s), Ys(i, r, s);
  })(n2, t, e) : ((i, r, s) => {
    Ps(i), je(i, r, s), js(i), Us(i, r, s), Ws(i, r, s), Gs(i, r, s);
  })(n2, t, e);
};
var no = (n2, t, e) => {
  n2.setAttribute("loading", "lazy"), je(n2, t, e), Ks(n2, t), $t(n2, Ti);
};
var Vn = (n2) => {
  n2.removeAttribute(gt), n2.removeAttribute(Qe), n2.removeAttribute(Ze);
};
var io = (n2) => {
  on(n2, (t) => {
    Vn(t);
  }), Vn(n2);
};
var Ni = (n2) => {
  on(n2, (t) => {
    _t(t, Qt);
  }), _t(n2, Qt);
};
var ro = (n2) => {
  _i(n2, (t) => {
    _t(t, be);
  }), _t(n2, Pi), n2.load();
};
var so = (n2) => {
  _t(n2, be);
};
var oo = (n2) => {
  _t(n2, Mi);
};
var ao = {
  IMG: Ni,
  IFRAME: so,
  VIDEO: ro,
  OBJECT: oo
};
var lo = (n2, t) => {
  ((e) => {
    const i = ao[e.tagName];
    i ? i(e) : zs(e);
  })(n2), ((e, i) => {
    nn(e) || rn(e) || (ot(e, i.class_entered), ot(e, i.class_exited), ot(e, i.class_applied), ot(e, i.class_loading), ot(e, i.class_loaded), ot(e, i.class_error));
  })(n2, t), ve(n2), Ri(n2);
};
var co = (n2, t, e, i) => {
  e.cancel_on_exit && Is(n2) && n2.tagName === "IMG" && (qe(n2), io(n2), Ni(n2), ot(n2, e.class_loading), sn(i, -1), ve(n2), Ct(e.callback_cancel, n2, t, i));
};
var uo = (n2, t, e, i) => {
  const r = _s(n2);
  $t(n2, As), Ht(n2, e.class_entered), ot(n2, e.class_exited), Rs(n2, e, i), Ct(e.callback_enter, n2, t, i), r || ze(n2, e, i);
};
var ho = (n2, t, e, i) => {
  nn(n2) || (Ht(n2, e.class_exited), co(n2, t, e, i), Ct(e.callback_exit, n2, t, i));
};
var fo = ["IMG", "IFRAME", "VIDEO"];
var Hi = (n2) => n2.use_native && "loading" in HTMLImageElement.prototype;
var po = (n2, t, e) => {
  n2.forEach((i) => {
    fo.indexOf(i.tagName) !== -1 && no(i, t, e);
  }), ki(e, 0);
};
var mo = (n2) => n2.isIntersecting || n2.intersectionRatio > 0;
var go = (n2, t) => {
  t.forEach((e) => {
    n2.observe(e);
  });
};
var vo = (n2, t) => {
  $s(n2), go(n2, t);
};
var yo = (n2, t) => {
  Hi(n2) || (t._observer = new IntersectionObserver((e) => {
    ((i, r, s) => {
      i.forEach((o) => mo(o) ? uo(o.target, o, r, s) : ho(o.target, o, r, s));
    })(e, n2, t);
  }, ((e) => ({
    root: e.container === document ? null : e.container,
    rootMargin: e.thresholds || e.threshold + "px"
  }))(n2)));
};
var Vi = (n2) => Array.prototype.slice.call(n2);
var fe = (n2) => n2.container.querySelectorAll(n2.elements_selector);
var bo = (n2) => Vi(n2).filter(nn);
var wo = (n2) => ks(n2);
var So = (n2) => Vi(n2).filter(wo);
var Bn = (n2, t) => bo(n2 || fe(t));
var Eo = (n2, t) => {
  So(fe(n2)).forEach((e) => {
    ot(e, n2.class_error), ve(e);
  }), t.update();
};
var Co = (n2, t) => {
  Et && (t._onlineHandler = () => {
    Eo(n2, t);
  }, window.addEventListener("online", t._onlineHandler));
};
var xo = (n2) => {
  Et && window.removeEventListener("online", n2._onlineHandler);
};
var zt = function(n2, t) {
  const e = wi(n2);
  this._settings = e, this.loadingCount = 0, yo(e, this), Co(e, this), this.update(t);
};
zt.prototype = {
  update: function(n2) {
    const t = this._settings, e = Bn(n2, t);
    ki(this, e.length), yi ? this.loadAll(e) : Hi(t) ? po(e, t, this) : vo(this._observer, e);
  },
  destroy: function() {
    this._observer && this._observer.disconnect(), xo(this), fe(this._settings).forEach((n2) => {
      Ri(n2);
    }), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, delete this.toLoadCount;
  },
  loadAll: function(n2) {
    const t = this._settings;
    Bn(n2, t).forEach((e) => {
      ye(e, this), ze(e, t, this);
    });
  },
  restoreAll: function() {
    const n2 = this._settings;
    fe(n2).forEach((t) => {
      lo(t, n2);
    });
  }
}, zt.load = (n2, t) => {
  const e = wi(t);
  ze(n2, e);
}, zt.resetStatus = (n2) => {
  ve(n2);
}, Et && Ts(zt, window.lazyLoadOptions);
var Ne = document.documentElement;
var {
  body: Zt
} = document;
var Ft = Ne.hasAttribute("data-debug");
var Bi = window.innerWidth <= 640;
function To() {
  let n2 = false;
  document.addEventListener("keydown", (t) => {
    t.key === "Control" ? n2 = true : n2 && t.key === "g" && Zt.classList.toggle("-isGridVisible");
  }), document.addEventListener("keyup", (t) => {
    t.key === "Control" && (n2 = false);
  });
}
var Ao = (n2, t) => {
  let e;
  return (...i) => {
    clearTimeout(e), e = setTimeout(() => {
      n2.apply(void 0, i);
    }, t);
  };
};
var Un = (n2, t) => {
  let e, i;
  return (...r) => {
    const o = +/* @__PURE__ */ new Date();
    e && o < e + t ? (clearTimeout(i), i = setTimeout(() => {
      e = o, n2.apply(void 0, r);
    }, t)) : (e = o, n2.apply(void 0, r));
  };
};
var Ui = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: true,
  timelineOffset: 0
};
var ln = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
};
var Io = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"];
var pe = {
  CSS: {},
  springs: {}
};
function lt(n2, t, e) {
  return Math.min(Math.max(n2, t), e);
}
function Kt(n2, t) {
  return n2.indexOf(t) > -1;
}
function Pe(n2, t) {
  return n2.apply(null, t);
}
var O = {
  arr: function(n2) {
    return Array.isArray(n2);
  },
  obj: function(n2) {
    return Kt(Object.prototype.toString.call(n2), "Object");
  },
  pth: function(n2) {
    return O.obj(n2) && n2.hasOwnProperty("totalLength");
  },
  svg: function(n2) {
    return n2 instanceof SVGElement;
  },
  inp: function(n2) {
    return n2 instanceof HTMLInputElement;
  },
  dom: function(n2) {
    return n2.nodeType || O.svg(n2);
  },
  str: function(n2) {
    return typeof n2 == "string";
  },
  fnc: function(n2) {
    return typeof n2 == "function";
  },
  und: function(n2) {
    return typeof n2 > "u";
  },
  nil: function(n2) {
    return O.und(n2) || n2 === null;
  },
  hex: function(n2) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n2);
  },
  rgb: function(n2) {
    return /^rgb/.test(n2);
  },
  hsl: function(n2) {
    return /^hsl/.test(n2);
  },
  col: function(n2) {
    return O.hex(n2) || O.rgb(n2) || O.hsl(n2);
  },
  key: function(n2) {
    return !Ui.hasOwnProperty(n2) && !ln.hasOwnProperty(n2) && n2 !== "targets" && n2 !== "keyframes";
  }
};
function Wi(n2) {
  var t = /\(([^)]+)\)/.exec(n2);
  return t ? t[1].split(",").map(function(e) {
    return parseFloat(e);
  }) : [];
}
function Gi(n2, t) {
  var e = Wi(n2), i = lt(O.und(e[0]) ? 1 : e[0], 0.1, 100), r = lt(O.und(e[1]) ? 100 : e[1], 0.1, 100), s = lt(O.und(e[2]) ? 10 : e[2], 0.1, 100), o = lt(O.und(e[3]) ? 0 : e[3], 0.1, 100), l = Math.sqrt(r / i), a = s / (2 * Math.sqrt(r * i)), c = a < 1 ? l * Math.sqrt(1 - a * a) : 0, u = 1, h = a < 1 ? (a * l + -o) / c : -o + l;
  function d(f) {
    var p = t ? t * f / 1e3 : f;
    return a < 1 ? p = Math.exp(-p * a * l) * (u * Math.cos(c * p) + h * Math.sin(c * p)) : p = (u + h * p) * Math.exp(-p * l), f === 0 || f === 1 ? f : 1 - p;
  }
  function v() {
    var f = pe.springs[n2];
    if (f)
      return f;
    for (var p = 1 / 6, b = 0, m = 0; ; )
      if (b += p, d(b) === 1) {
        if (m++, m >= 16)
          break;
      } else
        m = 0;
    var y = b * p * 1e3;
    return pe.springs[n2] = y, y;
  }
  return t ? d : v;
}
function ko(n2) {
  return n2 === void 0 && (n2 = 10), function(t) {
    return Math.ceil(lt(t, 1e-6, 1) * n2) * (1 / n2);
  };
}
var Oo = function() {
  var n2 = 11, t = 1 / (n2 - 1);
  function e(u, h) {
    return 1 - 3 * h + 3 * u;
  }
  function i(u, h) {
    return 3 * h - 6 * u;
  }
  function r(u) {
    return 3 * u;
  }
  function s(u, h, d) {
    return ((e(h, d) * u + i(h, d)) * u + r(h)) * u;
  }
  function o(u, h, d) {
    return 3 * e(h, d) * u * u + 2 * i(h, d) * u + r(h);
  }
  function l(u, h, d, v, f) {
    var p, b, m = 0;
    do
      b = h + (d - h) / 2, p = s(b, v, f) - u, p > 0 ? d = b : h = b;
    while (Math.abs(p) > 1e-7 && ++m < 10);
    return b;
  }
  function a(u, h, d, v) {
    for (var f = 0; f < 4; ++f) {
      var p = o(h, d, v);
      if (p === 0)
        return h;
      var b = s(h, d, v) - u;
      h -= b / p;
    }
    return h;
  }
  function c(u, h, d, v) {
    if (!(0 <= u && u <= 1 && 0 <= d && d <= 1))
      return;
    var f = new Float32Array(n2);
    if (u !== h || d !== v)
      for (var p = 0; p < n2; ++p)
        f[p] = s(p * t, u, d);
    function b(m) {
      for (var y = 0, g = 1, w = n2 - 1; g !== w && f[g] <= m; ++g)
        y += t;
      --g;
      var x = (m - f[g]) / (f[g + 1] - f[g]), S = y + x * t, E = o(S, u, d);
      return E >= 1e-3 ? a(m, S, u, d) : E === 0 ? S : l(m, y, y + t, u, d);
    }
    return function(m) {
      return u === h && d === v || m === 0 || m === 1 ? m : s(b(m), h, v);
    };
  }
  return c;
}();
var Ki = function() {
  var n2 = {
    linear: function() {
      return function(i) {
        return i;
      };
    }
  }, t = {
    Sine: function() {
      return function(i) {
        return 1 - Math.cos(i * Math.PI / 2);
      };
    },
    Expo: function() {
      return function(i) {
        return i ? Math.pow(2, 10 * i - 10) : 0;
      };
    },
    Circ: function() {
      return function(i) {
        return 1 - Math.sqrt(1 - i * i);
      };
    },
    Back: function() {
      return function(i) {
        return i * i * (3 * i - 2);
      };
    },
    Bounce: function() {
      return function(i) {
        for (var r, s = 4; i < ((r = Math.pow(2, --s)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - s) - 7.5625 * Math.pow((r * 3 - 2) / 22 - i, 2);
      };
    },
    Elastic: function(i, r) {
      i === void 0 && (i = 1), r === void 0 && (r = 0.5);
      var s = lt(i, 1, 10), o = lt(r, 0.1, 2);
      return function(l) {
        return l === 0 || l === 1 ? l : -s * Math.pow(2, 10 * (l - 1)) * Math.sin((l - 1 - o / (Math.PI * 2) * Math.asin(1 / s)) * (Math.PI * 2) / o);
      };
    }
  }, e = ["Quad", "Cubic", "Quart", "Quint"];
  return e.forEach(function(i, r) {
    t[i] = function() {
      return function(s) {
        return Math.pow(s, r + 2);
      };
    };
  }), Object.keys(t).forEach(function(i) {
    var r = t[i];
    n2["easeIn" + i] = r, n2["easeOut" + i] = function(s, o) {
      return function(l) {
        return 1 - r(s, o)(1 - l);
      };
    }, n2["easeInOut" + i] = function(s, o) {
      return function(l) {
        return l < 0.5 ? r(s, o)(l * 2) / 2 : 1 - r(s, o)(l * -2 + 2) / 2;
      };
    }, n2["easeOutIn" + i] = function(s, o) {
      return function(l) {
        return l < 0.5 ? (1 - r(s, o)(1 - l * 2)) / 2 : (r(s, o)(l * 2 - 1) + 1) / 2;
      };
    };
  }), n2;
}();
function cn(n2, t) {
  if (O.fnc(n2))
    return n2;
  var e = n2.split("(")[0], i = Ki[e], r = Wi(n2);
  switch (e) {
    case "spring":
      return Gi(n2, t);
    case "cubicBezier":
      return Pe(Oo, r);
    case "steps":
      return Pe(ko, r);
    default:
      return Pe(i, r);
  }
}
function Yi(n2) {
  try {
    var t = document.querySelectorAll(n2);
    return t;
  } catch {
    return;
  }
}
function Se(n2, t) {
  for (var e = n2.length, i = arguments.length >= 2 ? arguments[1] : void 0, r = [], s = 0; s < e; s++)
    if (s in n2) {
      var o = n2[s];
      t.call(i, o, s, n2) && r.push(o);
    }
  return r;
}
function Ee(n2) {
  return n2.reduce(function(t, e) {
    return t.concat(O.arr(e) ? Ee(e) : e);
  }, []);
}
function Wn(n2) {
  return O.arr(n2) ? n2 : (O.str(n2) && (n2 = Yi(n2) || n2), n2 instanceof NodeList || n2 instanceof HTMLCollection ? [].slice.call(n2) : [n2]);
}
function un(n2, t) {
  return n2.some(function(e) {
    return e === t;
  });
}
function hn(n2) {
  var t = {};
  for (var e in n2)
    t[e] = n2[e];
  return t;
}
function He(n2, t) {
  var e = hn(n2);
  for (var i in n2)
    e[i] = t.hasOwnProperty(i) ? t[i] : n2[i];
  return e;
}
function Ce(n2, t) {
  var e = hn(n2);
  for (var i in t)
    e[i] = O.und(n2[i]) ? t[i] : n2[i];
  return e;
}
function _o(n2) {
  var t = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(n2);
  return t ? "rgba(" + t[1] + ",1)" : n2;
}
function Po(n2) {
  var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, e = n2.replace(t, function(l, a, c, u) {
    return a + a + c + c + u + u;
  }), i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e), r = parseInt(i[1], 16), s = parseInt(i[2], 16), o = parseInt(i[3], 16);
  return "rgba(" + r + "," + s + "," + o + ",1)";
}
function Mo(n2) {
  var t = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n2) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n2), e = parseInt(t[1], 10) / 360, i = parseInt(t[2], 10) / 100, r = parseInt(t[3], 10) / 100, s = t[4] || 1;
  function o(d, v, f) {
    return f < 0 && (f += 1), f > 1 && (f -= 1), f < 1 / 6 ? d + (v - d) * 6 * f : f < 1 / 2 ? v : f < 2 / 3 ? d + (v - d) * (2 / 3 - f) * 6 : d;
  }
  var l, a, c;
  if (i == 0)
    l = a = c = r;
  else {
    var u = r < 0.5 ? r * (1 + i) : r + i - r * i, h = 2 * r - u;
    l = o(h, u, e + 1 / 3), a = o(h, u, e), c = o(h, u, e - 1 / 3);
  }
  return "rgba(" + l * 255 + "," + a * 255 + "," + c * 255 + "," + s + ")";
}
function $o(n2) {
  if (O.rgb(n2))
    return _o(n2);
  if (O.hex(n2))
    return Po(n2);
  if (O.hsl(n2))
    return Mo(n2);
}
function mt(n2) {
  var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n2);
  if (t)
    return t[1];
}
function Ro(n2) {
  if (Kt(n2, "translate") || n2 === "perspective")
    return "px";
  if (Kt(n2, "rotate") || Kt(n2, "skew"))
    return "deg";
}
function Ve(n2, t) {
  return O.fnc(n2) ? n2(t.target, t.id, t.total) : n2;
}
function ct(n2, t) {
  return n2.getAttribute(t);
}
function dn(n2, t, e) {
  var i = mt(t);
  if (un([e, "deg", "rad", "turn"], i))
    return t;
  var r = pe.CSS[t + e];
  if (!O.und(r))
    return r;
  var s = 100, o = document.createElement(n2.tagName), l = n2.parentNode && n2.parentNode !== document ? n2.parentNode : document.body;
  l.appendChild(o), o.style.position = "absolute", o.style.width = s + e;
  var a = s / o.offsetWidth;
  l.removeChild(o);
  var c = a * parseFloat(t);
  return pe.CSS[t + e] = c, c;
}
function Xi(n2, t, e) {
  if (t in n2.style) {
    var i = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), r = n2.style[t] || getComputedStyle(n2).getPropertyValue(i) || "0";
    return e ? dn(n2, r, e) : r;
  }
}
function fn(n2, t) {
  if (O.dom(n2) && !O.inp(n2) && (!O.nil(ct(n2, t)) || O.svg(n2) && n2[t]))
    return "attribute";
  if (O.dom(n2) && un(Io, t))
    return "transform";
  if (O.dom(n2) && t !== "transform" && Xi(n2, t))
    return "css";
  if (n2[t] != null)
    return "object";
}
function Ji(n2) {
  if (O.dom(n2)) {
    for (var t = n2.style.transform || "", e = /(\w+)\(([^)]*)\)/g, i = /* @__PURE__ */ new Map(), r; r = e.exec(t); )
      i.set(r[1], r[2]);
    return i;
  }
}
function Do(n2, t, e, i) {
  var r = Kt(t, "scale") ? 1 : 0 + Ro(t), s = Ji(n2).get(t) || r;
  return e && (e.transforms.list.set(t, s), e.transforms.last = t), i ? dn(n2, s, i) : s;
}
function pn(n2, t, e, i) {
  switch (fn(n2, t)) {
    case "transform":
      return Do(n2, t, i, e);
    case "css":
      return Xi(n2, t, e);
    case "attribute":
      return ct(n2, t);
    default:
      return n2[t] || 0;
  }
}
function mn(n2, t) {
  var e = /^(\*=|\+=|-=)/.exec(n2);
  if (!e)
    return n2;
  var i = mt(n2) || 0, r = parseFloat(t), s = parseFloat(n2.replace(e[0], ""));
  switch (e[0][0]) {
    case "+":
      return r + s + i;
    case "-":
      return r - s + i;
    case "*":
      return r * s + i;
  }
}
function Qi(n2, t) {
  if (O.col(n2))
    return $o(n2);
  if (/\s/g.test(n2))
    return n2;
  var e = mt(n2), i = e ? n2.substr(0, n2.length - e.length) : n2;
  return t ? i + t : i;
}
function gn(n2, t) {
  return Math.sqrt(Math.pow(t.x - n2.x, 2) + Math.pow(t.y - n2.y, 2));
}
function Fo(n2) {
  return Math.PI * 2 * ct(n2, "r");
}
function qo(n2) {
  return ct(n2, "width") * 2 + ct(n2, "height") * 2;
}
function jo(n2) {
  return gn({
    x: ct(n2, "x1"),
    y: ct(n2, "y1")
  }, {
    x: ct(n2, "x2"),
    y: ct(n2, "y2")
  });
}
function Zi(n2) {
  for (var t = n2.points, e = 0, i, r = 0; r < t.numberOfItems; r++) {
    var s = t.getItem(r);
    r > 0 && (e += gn(i, s)), i = s;
  }
  return e;
}
function zo(n2) {
  var t = n2.points;
  return Zi(n2) + gn(t.getItem(t.numberOfItems - 1), t.getItem(0));
}
function tr(n2) {
  if (n2.getTotalLength)
    return n2.getTotalLength();
  switch (n2.tagName.toLowerCase()) {
    case "circle":
      return Fo(n2);
    case "rect":
      return qo(n2);
    case "line":
      return jo(n2);
    case "polyline":
      return Zi(n2);
    case "polygon":
      return zo(n2);
  }
}
function No(n2) {
  var t = tr(n2);
  return n2.setAttribute("stroke-dasharray", t), t;
}
function Ho(n2) {
  for (var t = n2.parentNode; O.svg(t) && O.svg(t.parentNode); )
    t = t.parentNode;
  return t;
}
function er(n2, t) {
  var e = t || {}, i = e.el || Ho(n2), r = i.getBoundingClientRect(), s = ct(i, "viewBox"), o = r.width, l = r.height, a = e.viewBox || (s ? s.split(" ") : [0, 0, o, l]);
  return {
    el: i,
    viewBox: a,
    x: a[0] / 1,
    y: a[1] / 1,
    w: o,
    h: l,
    vW: a[2],
    vH: a[3]
  };
}
function Vo(n2, t) {
  var e = O.str(n2) ? Yi(n2)[0] : n2, i = t || 100;
  return function(r) {
    return {
      property: r,
      el: e,
      svg: er(e),
      totalLength: tr(e) * (i / 100)
    };
  };
}
function Bo(n2, t, e) {
  function i(u) {
    u === void 0 && (u = 0);
    var h = t + u >= 1 ? t + u : 0;
    return n2.el.getPointAtLength(h);
  }
  var r = er(n2.el, n2.svg), s = i(), o = i(-1), l = i(1), a = e ? 1 : r.w / r.vW, c = e ? 1 : r.h / r.vH;
  switch (n2.property) {
    case "x":
      return (s.x - r.x) * a;
    case "y":
      return (s.y - r.y) * c;
    case "angle":
      return Math.atan2(l.y - o.y, l.x - o.x) * 180 / Math.PI;
  }
}
function Gn(n2, t) {
  var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, i = Qi(O.pth(n2) ? n2.totalLength : n2, t) + "";
  return {
    original: i,
    numbers: i.match(e) ? i.match(e).map(Number) : [0],
    strings: O.str(n2) || t ? i.split(e) : []
  };
}
function vn(n2) {
  var t = n2 ? Ee(O.arr(n2) ? n2.map(Wn) : Wn(n2)) : [];
  return Se(t, function(e, i, r) {
    return r.indexOf(e) === i;
  });
}
function nr(n2) {
  var t = vn(n2);
  return t.map(function(e, i) {
    return {
      target: e,
      id: i,
      total: t.length,
      transforms: {
        list: Ji(e)
      }
    };
  });
}
function Uo(n2, t) {
  var e = hn(t);
  if (/^spring/.test(e.easing) && (e.duration = Gi(e.easing)), O.arr(n2)) {
    var i = n2.length, r = i === 2 && !O.obj(n2[0]);
    r ? n2 = {
      value: n2
    } : O.fnc(t.duration) || (e.duration = t.duration / i);
  }
  var s = O.arr(n2) ? n2 : [n2];
  return s.map(function(o, l) {
    var a = O.obj(o) && !O.pth(o) ? o : {
      value: o
    };
    return O.und(a.delay) && (a.delay = l ? 0 : t.delay), O.und(a.endDelay) && (a.endDelay = l === s.length - 1 ? t.endDelay : 0), a;
  }).map(function(o) {
    return Ce(o, e);
  });
}
function Wo(n2) {
  for (var t = Se(Ee(n2.map(function(s) {
    return Object.keys(s);
  })), function(s) {
    return O.key(s);
  }).reduce(function(s, o) {
    return s.indexOf(o) < 0 && s.push(o), s;
  }, []), e = {}, i = function(s) {
    var o = t[s];
    e[o] = n2.map(function(l) {
      var a = {};
      for (var c in l)
        O.key(c) ? c == o && (a.value = l[c]) : a[c] = l[c];
      return a;
    });
  }, r = 0; r < t.length; r++)
    i(r);
  return e;
}
function Go(n2, t) {
  var e = [], i = t.keyframes;
  i && (t = Ce(Wo(i), t));
  for (var r in t)
    O.key(r) && e.push({
      name: r,
      tweens: Uo(t[r], n2)
    });
  return e;
}
function Ko(n2, t) {
  var e = {};
  for (var i in n2) {
    var r = Ve(n2[i], t);
    O.arr(r) && (r = r.map(function(s) {
      return Ve(s, t);
    }), r.length === 1 && (r = r[0])), e[i] = r;
  }
  return e.duration = parseFloat(e.duration), e.delay = parseFloat(e.delay), e;
}
function Yo(n2, t) {
  var e;
  return n2.tweens.map(function(i) {
    var r = Ko(i, t), s = r.value, o = O.arr(s) ? s[1] : s, l = mt(o), a = pn(t.target, n2.name, l, t), c = e ? e.to.original : a, u = O.arr(s) ? s[0] : c, h = mt(u) || mt(a), d = l || h;
    return O.und(o) && (o = c), r.from = Gn(u, d), r.to = Gn(mn(o, u), d), r.start = e ? e.end : 0, r.end = r.start + r.delay + r.duration + r.endDelay, r.easing = cn(r.easing, r.duration), r.isPath = O.pth(s), r.isPathTargetInsideSVG = r.isPath && O.svg(t.target), r.isColor = O.col(r.from.original), r.isColor && (r.round = 1), e = r, r;
  });
}
var ir = {
  css: function(n2, t, e) {
    return n2.style[t] = e;
  },
  attribute: function(n2, t, e) {
    return n2.setAttribute(t, e);
  },
  object: function(n2, t, e) {
    return n2[t] = e;
  },
  transform: function(n2, t, e, i, r) {
    if (i.list.set(t, e), t === i.last || r) {
      var s = "";
      i.list.forEach(function(o, l) {
        s += l + "(" + o + ") ";
      }), n2.style.transform = s;
    }
  }
};
function rr(n2, t) {
  var e = nr(n2);
  e.forEach(function(i) {
    for (var r in t) {
      var s = Ve(t[r], i), o = i.target, l = mt(s), a = pn(o, r, l, i), c = l || mt(a), u = mn(Qi(s, c), a), h = fn(o, r);
      ir[h](o, r, u, i.transforms, true);
    }
  });
}
function Xo(n2, t) {
  var e = fn(n2.target, t.name);
  if (e) {
    var i = Yo(t, n2), r = i[i.length - 1];
    return {
      type: e,
      property: t.name,
      animatable: n2,
      tweens: i,
      duration: r.end,
      delay: i[0].delay,
      endDelay: r.endDelay
    };
  }
}
function Jo(n2, t) {
  return Se(Ee(n2.map(function(e) {
    return t.map(function(i) {
      return Xo(e, i);
    });
  })), function(e) {
    return !O.und(e);
  });
}
function sr(n2, t) {
  var e = n2.length, i = function(s) {
    return s.timelineOffset ? s.timelineOffset : 0;
  }, r = {};
  return r.duration = e ? Math.max.apply(Math, n2.map(function(s) {
    return i(s) + s.duration;
  })) : t.duration, r.delay = e ? Math.min.apply(Math, n2.map(function(s) {
    return i(s) + s.delay;
  })) : t.delay, r.endDelay = e ? r.duration - Math.max.apply(Math, n2.map(function(s) {
    return i(s) + s.duration - s.endDelay;
  })) : t.endDelay, r;
}
var Kn = 0;
function Qo(n2) {
  var t = He(Ui, n2), e = He(ln, n2), i = Go(e, n2), r = nr(n2.targets), s = Jo(r, i), o = sr(s, e), l = Kn;
  return Kn++, Ce(t, {
    id: l,
    children: [],
    animatables: r,
    animations: s,
    duration: o.duration,
    delay: o.delay,
    endDelay: o.endDelay
  });
}
var nt = [];
var or = function() {
  var n2;
  function t() {
    !n2 && (!Yn() || !q.suspendWhenDocumentHidden) && nt.length > 0 && (n2 = requestAnimationFrame(e));
  }
  function e(r) {
    for (var s = nt.length, o = 0; o < s; ) {
      var l = nt[o];
      l.paused ? (nt.splice(o, 1), s--) : (l.tick(r), o++);
    }
    n2 = o > 0 ? requestAnimationFrame(e) : void 0;
  }
  function i() {
    q.suspendWhenDocumentHidden && (Yn() ? n2 = cancelAnimationFrame(n2) : (nt.forEach(function(r) {
      return r._onDocumentVisibility();
    }), or()));
  }
  return typeof document < "u" && document.addEventListener("visibilitychange", i), t;
}();
function Yn() {
  return !!document && document.hidden;
}
function q(n2) {
  n2 === void 0 && (n2 = {});
  var t = 0, e = 0, i = 0, r, s = 0, o = null;
  function l(y) {
    var g = window.Promise && new Promise(function(w) {
      return o = w;
    });
    return y.finished = g, g;
  }
  var a = Qo(n2);
  l(a);
  function c() {
    var y = a.direction;
    y !== "alternate" && (a.direction = y !== "normal" ? "normal" : "reverse"), a.reversed = !a.reversed, r.forEach(function(g) {
      return g.reversed = a.reversed;
    });
  }
  function u(y) {
    return a.reversed ? a.duration - y : y;
  }
  function h() {
    t = 0, e = u(a.currentTime) * (1 / q.speed);
  }
  function d(y, g) {
    g && g.seek(y - g.timelineOffset);
  }
  function v(y) {
    if (a.reversePlayback)
      for (var w = s; w--; )
        d(y, r[w]);
    else
      for (var g = 0; g < s; g++)
        d(y, r[g]);
  }
  function f(y) {
    for (var g = 0, w = a.animations, x = w.length; g < x; ) {
      var S = w[g], E = S.animatable, T = S.tweens, A = T.length - 1, C = T[A];
      A && (C = Se(T, function(xt) {
        return y < xt.end;
      })[0] || C);
      for (var L = lt(y - C.start - C.delay, 0, C.duration) / C.duration, I = isNaN(L) ? 1 : C.easing(L), P = C.to.strings, _ = C.round, $ = [], B = C.to.numbers.length, j = void 0, R = 0; R < B; R++) {
        var M = void 0, H = C.to.numbers[R], U = C.from.numbers[R] || 0;
        C.isPath ? M = Bo(C.value, I * H, C.isPathTargetInsideSVG) : M = U + I * (H - U), _ && (C.isColor && R > 2 || (M = Math.round(M * _) / _)), $.push(M);
      }
      var Q = P.length;
      if (!Q)
        j = $[0];
      else {
        j = P[0];
        for (var W = 0; W < Q; W++) {
          P[W];
          var tt = P[W + 1], dt = $[W];
          isNaN(dt) || (tt ? j += dt + tt : j += dt + " ");
        }
      }
      ir[S.type](E.target, S.property, j, E.transforms), S.currentValue = j, g++;
    }
  }
  function p(y) {
    a[y] && !a.passThrough && a[y](a);
  }
  function b() {
    a.remaining && a.remaining !== true && a.remaining--;
  }
  function m(y) {
    var g = a.duration, w = a.delay, x = g - a.endDelay, S = u(y);
    a.progress = lt(S / g * 100, 0, 100), a.reversePlayback = S < a.currentTime, r && v(S), !a.began && a.currentTime > 0 && (a.began = true, p("begin")), !a.loopBegan && a.currentTime > 0 && (a.loopBegan = true, p("loopBegin")), S <= w && a.currentTime !== 0 && f(0), (S >= x && a.currentTime !== g || !g) && f(g), S > w && S < x ? (a.changeBegan || (a.changeBegan = true, a.changeCompleted = false, p("changeBegin")), p("change"), f(S)) : a.changeBegan && (a.changeCompleted = true, a.changeBegan = false, p("changeComplete")), a.currentTime = lt(S, 0, g), a.began && p("update"), y >= g && (e = 0, b(), a.remaining ? (t = i, p("loopComplete"), a.loopBegan = false, a.direction === "alternate" && c()) : (a.paused = true, a.completed || (a.completed = true, p("loopComplete"), p("complete"), !a.passThrough && "Promise" in window && (o(), l(a)))));
  }
  return a.reset = function() {
    var y = a.direction;
    a.passThrough = false, a.currentTime = 0, a.progress = 0, a.paused = true, a.began = false, a.loopBegan = false, a.changeBegan = false, a.completed = false, a.changeCompleted = false, a.reversePlayback = false, a.reversed = y === "reverse", a.remaining = a.loop, r = a.children, s = r.length;
    for (var g = s; g--; )
      a.children[g].reset();
    (a.reversed && a.loop !== true || y === "alternate" && a.loop === 1) && a.remaining++, f(a.reversed ? a.duration : 0);
  }, a._onDocumentVisibility = h, a.set = function(y, g) {
    return rr(y, g), a;
  }, a.tick = function(y) {
    i = y, t || (t = i), m((i + (e - t)) * q.speed);
  }, a.seek = function(y) {
    m(u(y));
  }, a.pause = function() {
    a.paused = true, h();
  }, a.play = function() {
    a.paused && (a.completed && a.reset(), a.paused = false, nt.push(a), h(), or());
  }, a.reverse = function() {
    c(), a.completed = !a.reversed, h();
  }, a.restart = function() {
    a.reset(), a.play();
  }, a.remove = function(y) {
    var g = vn(y);
    ar(g, a);
  }, a.reset(), a.autoplay && a.play(), a;
}
function Xn(n2, t) {
  for (var e = t.length; e--; )
    un(n2, t[e].animatable.target) && t.splice(e, 1);
}
function ar(n2, t) {
  var e = t.animations, i = t.children;
  Xn(n2, e);
  for (var r = i.length; r--; ) {
    var s = i[r], o = s.animations;
    Xn(n2, o), !o.length && !s.children.length && i.splice(r, 1);
  }
  !e.length && !i.length && t.pause();
}
function Zo(n2) {
  for (var t = vn(n2), e = nt.length; e--; ) {
    var i = nt[e];
    ar(t, i);
  }
}
function ta(n2, t) {
  t === void 0 && (t = {});
  var e = t.direction || "normal", i = t.easing ? cn(t.easing) : null, r = t.grid, s = t.axis, o = t.from || 0, l = o === "first", a = o === "center", c = o === "last", u = O.arr(n2), h = parseFloat(u ? n2[0] : n2), d = u ? parseFloat(n2[1]) : 0, v = mt(u ? n2[1] : n2) || 0, f = t.start || 0 + (u ? h : 0), p = [], b = 0;
  return function(m, y, g) {
    if (l && (o = 0), a && (o = (g - 1) / 2), c && (o = g - 1), !p.length) {
      for (var w = 0; w < g; w++) {
        if (!r)
          p.push(Math.abs(o - w));
        else {
          var x = a ? (r[0] - 1) / 2 : o % r[0], S = a ? (r[1] - 1) / 2 : Math.floor(o / r[0]), E = w % r[0], T = Math.floor(w / r[0]), A = x - E, C = S - T, L = Math.sqrt(A * A + C * C);
          s === "x" && (L = -A), s === "y" && (L = -C), p.push(L);
        }
        b = Math.max.apply(Math, p);
      }
      i && (p = p.map(function(P) {
        return i(P / b) * b;
      })), e === "reverse" && (p = p.map(function(P) {
        return s ? P < 0 ? P * -1 : -P : Math.abs(b - P);
      }));
    }
    var I = u ? (d - h) / b : h;
    return f + I * (Math.round(p[y] * 100) / 100) + v;
  };
}
function ea(n2) {
  n2 === void 0 && (n2 = {});
  var t = q(n2);
  return t.duration = 0, t.add = function(e, i) {
    var r = nt.indexOf(t), s = t.children;
    r > -1 && nt.splice(r, 1);
    function o(d) {
      d.passThrough = true;
    }
    for (var l = 0; l < s.length; l++)
      o(s[l]);
    var a = Ce(e, He(ln, n2));
    a.targets = a.targets || n2.targets;
    var c = t.duration;
    a.autoplay = false, a.direction = t.direction, a.timelineOffset = O.und(i) ? c : mn(i, c), o(t), t.seek(a.timelineOffset);
    var u = q(a);
    o(u), s.push(u);
    var h = sr(s, n2);
    return t.delay = h.delay, t.endDelay = h.endDelay, t.duration = h.duration, t.seek(0), t.reset(), t.autoplay && t.play(), t;
  }, t;
}
q.version = "3.2.1";
q.speed = 1;
q.suspendWhenDocumentHidden = true;
q.running = nt;
q.remove = Zo;
q.get = pn;
q.set = rr;
q.convertPx = dn;
q.path = Vo;
q.setDashoffset = No;
q.stagger = ta;
q.timeline = ea;
q.easing = cn;
q.penner = Ki;
q.random = function(n2, t) {
  return Math.floor(Math.random() * (t - n2 + 1)) + n2;
};
var lr = {
  afterEnter(n2) {
    const t = q.timeline({
      easing: "easeInOutCubic",
      duration: 800
    });
    return t.add({
      targets: n2.next.container,
      opacity: ["0", "1"]
    }), t.finished;
  },
  onceAnimate() {
    const n2 = q.timeline({
      easing: "easeInOutQuint",
      duration: 1600,
      complete: () => {
        setTimeout(() => {
          document.body.classList.add("-onceAnimate");
        }, 2e3);
      }
    }), t = 30;
    return n2.add({
      targets: this.container,
      scaleX: [1, (window.innerWidth - t) / window.innerWidth],
      scaleY: [1, (window.innerHeight - t) / window.innerHeight],
      borderRadius: "3rem"
    }), n2.add({
      targets: this.container,
      opacity: ["1", "0"],
      duration: 300,
      complete: () => {
      }
    }), n2.finished;
  },
  afterLeave() {
  },
  before() {
  },
  beforeEnter({
    current: n2,
    next: t,
    target: e
  }) {
    this.call("scrollTo", {
      target: 0,
      options: {
        immediate: true
      }
    }, "Scroll", "scroll"), this.call("destroy", n2.container, "app"), n2.container.remove(), this.call("change", false, "Menu", "menu"), this.call("update", t.container, "app"), this.call("enterPage", t.container, "Scroll", "scroll"), this.call("update", null, "Scroll", "scroll"), this.call("change", false, "PopinContact", "widget");
  },
  beforeLeave() {
  },
  enter() {
  },
  init(n2, t) {
    this.container = document.querySelector("#js-loader"), this.call = n2, this.config = t;
  },
  invoke() {
    return {
      afterEnter: this.afterEnter.bind(this),
      afterLeave: this.afterLeave.bind(this),
      before: this.before.bind(this),
      beforeEnter: this.beforeEnter.bind(this),
      beforeLeave: this.beforeLeave.bind(this),
      enter: this.enter.bind(this),
      init: this.init.bind(this),
      leave: this.leave.bind(this),
      name: "basic",
      once: this.once.bind(this)
    };
  },
  leave(n2) {
    const t = q.timeline({
      easing: "easeInOutCubic",
      duration: 800
    });
    return t.add({
      targets: n2.current.container,
      opacity: ["1", "0"]
    }), t.finished;
  },
  once(n2) {
    this.onceAnimate(n2).then(() => {
      this.call("after", null, "Website", "website");
    });
  }
}.invoke();
var na = Object.freeze(Object.defineProperty({
  __proto__: null,
  basicTransition: lr
}, Symbol.toStringTag, {
  value: "Module"
}));
var ia = {
  init(n2, t) {
    this.call = n2, this.config = t;
  },
  invoke() {
    return {
      namespace: "home",
      init: this.init.bind(this),
      afterEnter: this.afterEnter.bind(this),
      beforeEnter: this.beforeEnter.bind(this)
    };
  },
  afterEnter() {
  },
  beforeEnter() {
  }
}.invoke();
var ra = {
  init(n2, t) {
    this.call = n2, this.config = t;
  },
  invoke() {
    return {
      namespace: "contact",
      init: this.init.bind(this),
      afterLeave: this.afterLeave.bind(this),
      beforeEnter: this.beforeEnter.bind(this)
    };
  },
  afterLeave() {
    this.call("active", true, "PopinContact", "widget");
  },
  beforeEnter() {
    this.call("active", false, "PopinContact", "widget");
  }
}.invoke();
var sa = Object.freeze(Object.defineProperty({
  __proto__: null,
  contactView: ra,
  homeView: ia
}, Symbol.toStringTag, {
  value: "Module"
}));
var Jn = {
  resize: ["Scroll"],
  animate: [],
  aAnimate: ["Scroll"],
  scroll: []
};
var oa = class extends D {
  constructor(t) {
    super(t), this.updateModules = false, this.toAnimate = this.el.dataset.animate !== void 0, this.isAnimating = false, this.interval = null, this.size = {
      width: 0,
      height: 0
    }, this.animate = this.animate.bind(this), this.debounceResize = Ao(this.resize.bind(this, false), 600), Y.hooks.afterLeave(this.afterLeave.bind(this)), Y.hooks.afterEnter(this.afterEnter.bind(this)), Y.hooks.enter(this.enter.bind(this)), Y.hooks.once(this.once.bind(this)), Y.hooks.afterOnce(this.afterOnce.bind(this)), Y.hooks.after(this.after.bind(this)), Y.hooks.beforeLeave(this.beforeLeave.bind(this));
  }
  init() {
    const t = {
      debug: Ft,
      transitions: this.initConfigArray(na),
      views: this.initConfigArray(sa)
    };
    Ft ? (t.logLevel = "info", t.timeout = 1e4, To()) : t.timeout = 1e4, Y.init(t);
  }
  setStats() {
    this.stats = new Cs(), this.stats.showPanel(0), Zt.appendChild(this.stats.dom);
  }
  once() {
    this.lazy = new zt({
      elements_selector: "[data-lazy]",
      class_loaded: "-loaded",
      class_loading: "-loading",
      class_error: "-error",
      class_entered: "-entered",
      class_exited: "-exited"
    });
  }
  clearCache() {
    for (const [t] of Y.cache.T)
      Y.cache.delete(t);
  }
  afterOnce() {
    window.addEventListener("resize", this.debounceResize), Ft && this.setStats(), (Ft || this.toAnimate) && (this.requestId = window.requestAnimationFrame(this.animate));
    const t = {
      rootMargin: "0px",
      threshold: 0
    };
    this.observer = new IntersectionObserver(this.onDetectModule.bind(this), t);
  }
  resize(t = false) {
    window.innerWidth < 768 && window.innerWidth === this.size.width && t === false || (this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    }, this.updateModules && this.parseModulesFunctions("resize"));
  }
  animate() {
    Ft && this.stats.begin(), this.updateModules && this.isAnimating && (this.parseModulesFunctions("animate"), this.parseModulesFunctions("aAnimate")), Ft && this.stats.end(), this.requestId = window.requestAnimationFrame(this.animate);
  }
  after() {
    this.toggleLoad(false);
  }
  beforeLeave() {
    this.toggleLoad(true);
  }
  afterLeave() {
    this.updateModules = false;
  }
  enter({
    next: t
  }) {
    clearTimeout(this.timeoutDark), this.timeoutDark = setTimeout(() => {
      this.setDarkUi(t.namespace === "home"), this.call("toggleBackground", false, "Header", "header");
    }, 400), this.updateNavActive(t), this.updateLazy();
  }
  updateLazy() {
    this.lazy.update();
  }
  loadImage({
    item: t,
    config: e = {}
  }) {
    t.dataset.llStatus !== "loaded" && zt.load(t, e);
  }
  afterEnter() {
    this.updateModules = true, this.resize(true);
  }
  toggleLoad(t) {
    this.isAnimating = !t, window.requestAnimationFrame(() => {
      Ne.classList[t ? "remove" : "add"]("is-loaded"), Ne.classList[t ? "add" : "remove"]("is-loading");
    });
  }
  parseModulesFunctions(t) {
    const e = Jn[t], {
      length: i
    } = e;
    if (i !== 0)
      for (let r = i - 1; r >= 0; r -= 1) {
        const s = e[r];
        this.call(t, null, s);
      }
  }
  initConfigArray(t) {
    const e = [], i = Object.keys(t), {
      length: r
    } = i, s = this.call.bind(this), o = this.$.bind(this);
    for (let l = r - 1; l >= 0; l -= 1) {
      const a = t[i[l]];
      a.init(s, o, {}), e.push(a);
    }
    return e;
  }
  setScrollDetection() {
    const t = Jn.scroll, {
      currentModules: e
    } = this.modules.app.app, i = Object.keys(e), r = {};
    i.forEach((s) => {
      const o = e[s];
      if (t.includes(o.constructor.name)) {
        const l = s.replace(`${o.constructor.name}-`, "");
        o.el.dataset.moduleId = l, o.id = l, r[l] = o, this.observer.observe(o.el);
      }
    }), this.modulesObserve = r;
  }
  unsetScrollDetection() {
    Object.keys(this.modulesObserve).forEach((e) => {
      this.observer.unobserve(this.modulesObserve[e].el);
    });
  }
  onDetectModule(t) {
    t.forEach((e) => {
      if (e.isIntersecting) {
        const i = this.modulesObserve[e.target.dataset.moduleId];
        i && (this.call("enter", null, i.constructor.name, i.id), this.call("update", null, "Scroll", "scroll")), e.target.dataset.repeat === void 0 && this.observer.unobserve(e.target);
      } else {
        const i = this.modulesObserve[e.target.dataset.moduleId];
        i && this.call("leave", null, i.constructor.name, i.id);
      }
    });
  }
  setDarkUi(t) {
    this.isDark !== t && (this.isDark = t, window.requestAnimationFrame(() => {
      Zt.classList[t ? "add" : "remove"]("-dark");
    }));
  }
  updateNavActive(t) {
    const e = this.$("nav"), i = t.url.href;
    e.forEach((r) => {
      const {
        href: s
      } = r;
      r.classList[i.startsWith(s) ? "add" : "remove"]("-hover");
    });
  }
  updateHistory({
    url: t,
    action: e = "push"
  }) {
    Y.history.add(t, "barba", e);
  }
};
function cr(n2, t, e) {
  return Math.max(n2, Math.min(t, e));
}
var aa = class {
  constructor() {
    this.isRunning = false, this.value = 0, this.from = 0, this.to = 0, this.duration = 0, this.currentTime = 0;
  }
  advance(t) {
    var e;
    if (!this.isRunning)
      return;
    let i = false;
    if (this.duration && this.easing) {
      this.currentTime += t;
      const r = cr(0, this.currentTime / this.duration, 1);
      i = r >= 1;
      const s = i ? 1 : this.easing(r);
      this.value = this.from + (this.to - this.from) * s;
    } else
      this.lerp ? (this.value = function(s, o, l, a) {
        return function(u, h, d) {
          return (1 - d) * u + d * h;
        }(s, o, 1 - Math.exp(-l * a));
      }(this.value, this.to, 60 * this.lerp, t), Math.round(this.value) === this.to && (this.value = this.to, i = true)) : (this.value = this.to, i = true);
    i && this.stop(), (e = this.onUpdate) === null || e === void 0 || e.call(this, this.value, i);
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(t, e, {
    lerp: i,
    duration: r,
    easing: s,
    onStart: o,
    onUpdate: l
  }) {
    this.from = this.value = t, this.to = e, this.lerp = i, this.duration = r, this.easing = s, this.currentTime = 0, this.isRunning = true, o == null || o(), this.onUpdate = l;
  }
};
var la = class {
  constructor({
    wrapper: t,
    content: e,
    autoResize: i = true,
    debounce: r = 250
  } = {}) {
    this.width = 0, this.height = 0, this.scrollWidth = 0, this.scrollHeight = 0, this.resize = () => {
      this.onWrapperResize(), this.onContentResize();
    }, this.onWrapperResize = () => {
      this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : this.wrapper instanceof HTMLElement && (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    }, this.onContentResize = () => {
      this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : this.wrapper instanceof HTMLElement && (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
    }, this.wrapper = t, this.content = e, i && (this.debouncedResize = /* @__PURE__ */ function(o, l) {
      let a;
      return function() {
        let c = arguments, u = this;
        clearTimeout(a), a = setTimeout(function() {
          o.apply(u, c);
        }, l);
      };
    }(this.resize, r), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, false) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
  }
  destroy() {
    var t, e;
    (t = this.wrapperResizeObserver) === null || t === void 0 || t.disconnect(), (e = this.contentResizeObserver) === null || e === void 0 || e.disconnect(), window.removeEventListener("resize", this.debouncedResize, false);
  }
  get limit() {
    return {
      x: this.scrollWidth - this.width,
      y: this.scrollHeight - this.height
    };
  }
};
var ur = class {
  constructor() {
    this.events = {};
  }
  emit(t, ...e) {
    let i = this.events[t] || [];
    for (let r = 0, s = i.length; r < s; r++)
      i[r](...e);
  }
  on(t, e) {
    var i;
    return !((i = this.events[t]) === null || i === void 0) && i.push(e) || (this.events[t] = [e]), () => {
      var r;
      this.events[t] = (r = this.events[t]) === null || r === void 0 ? void 0 : r.filter((s) => e !== s);
    };
  }
  off(t, e) {
    var i;
    this.events[t] = (i = this.events[t]) === null || i === void 0 ? void 0 : i.filter((r) => e !== r);
  }
  destroy() {
    this.events = {};
  }
};
var Qn = 100 / 6;
var ca = class {
  constructor(t, {
    wheelMultiplier: e = 1,
    touchMultiplier: i = 1
  }) {
    this.lastDelta = {
      x: 0,
      y: 0
    }, this.windowWidth = 0, this.windowHeight = 0, this.onTouchStart = (r) => {
      const {
        clientX: s,
        clientY: o
      } = r.targetTouches ? r.targetTouches[0] : r;
      this.touchStart.x = s, this.touchStart.y = o, this.lastDelta = {
        x: 0,
        y: 0
      }, this.emitter.emit("scroll", {
        deltaX: 0,
        deltaY: 0,
        event: r
      });
    }, this.onTouchMove = (r) => {
      var s, o, l, a;
      const {
        clientX: c,
        clientY: u
      } = r.targetTouches ? r.targetTouches[0] : r, h = -(c - ((o = (s = this.touchStart) === null || s === void 0 ? void 0 : s.x) !== null && o !== void 0 ? o : 0)) * this.touchMultiplier, d = -(u - ((a = (l = this.touchStart) === null || l === void 0 ? void 0 : l.y) !== null && a !== void 0 ? a : 0)) * this.touchMultiplier;
      this.touchStart.x = c, this.touchStart.y = u, this.lastDelta = {
        x: h,
        y: d
      }, this.emitter.emit("scroll", {
        deltaX: h,
        deltaY: d,
        event: r
      });
    }, this.onTouchEnd = (r) => {
      this.emitter.emit("scroll", {
        deltaX: this.lastDelta.x,
        deltaY: this.lastDelta.y,
        event: r
      });
    }, this.onWheel = (r) => {
      let {
        deltaX: s,
        deltaY: o,
        deltaMode: l
      } = r;
      s *= l === 1 ? Qn : l === 2 ? this.windowWidth : 1, o *= l === 1 ? Qn : l === 2 ? this.windowHeight : 1, s *= this.wheelMultiplier, o *= this.wheelMultiplier, this.emitter.emit("scroll", {
        deltaX: s,
        deltaY: o,
        event: r
      });
    }, this.onWindowResize = () => {
      this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
    }, this.element = t, this.wheelMultiplier = e, this.touchMultiplier = i, this.touchStart = {
      x: null,
      y: null
    }, this.emitter = new ur(), window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, {
      passive: false
    }), this.element.addEventListener("touchstart", this.onTouchStart, {
      passive: false
    }), this.element.addEventListener("touchmove", this.onTouchMove, {
      passive: false
    }), this.element.addEventListener("touchend", this.onTouchEnd, {
      passive: false
    });
  }
  on(t, e) {
    return this.emitter.on(t, e);
  }
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, false), this.element.removeEventListener("wheel", this.onWheel), this.element.removeEventListener("touchstart", this.onTouchStart), this.element.removeEventListener("touchmove", this.onTouchMove), this.element.removeEventListener("touchend", this.onTouchEnd);
  }
};
var ua = class {
  constructor({
    wrapper: t = window,
    content: e = document.documentElement,
    wheelEventsTarget: i = t,
    eventsTarget: r = i,
    smoothWheel: s = true,
    syncTouch: o = false,
    syncTouchLerp: l = 0.075,
    touchInertiaMultiplier: a = 35,
    duration: c,
    easing: u = (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
    lerp: h = 0.1,
    infinite: d = false,
    orientation: v = "vertical",
    gestureOrientation: f = "vertical",
    touchMultiplier: p = 1,
    wheelMultiplier: b = 1,
    autoResize: m = true,
    prevent: y,
    virtualScroll: g,
    __experimental__naiveDimensions: w = false
  } = {}) {
    this.__isScrolling = false, this.__isStopped = false, this.__isLocked = false, this.userData = {}, this.lastVelocity = 0, this.velocity = 0, this.direction = 0, this.onPointerDown = (x) => {
      x.button === 1 && this.reset();
    }, this.onVirtualScroll = (x) => {
      if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(x) === false)
        return;
      const {
        deltaX: S,
        deltaY: E,
        event: T
      } = x;
      if (this.emitter.emit("virtual-scroll", {
        deltaX: S,
        deltaY: E,
        event: T
      }), T.ctrlKey)
        return;
      const A = T.type.includes("touch"), C = T.type.includes("wheel");
      if (this.isTouching = T.type === "touchstart" || T.type === "touchmove", this.options.syncTouch && A && T.type === "touchstart" && !this.isStopped && !this.isLocked)
        return void this.reset();
      const L = S === 0 && E === 0, I = this.options.gestureOrientation === "vertical" && E === 0 || this.options.gestureOrientation === "horizontal" && S === 0;
      if (L || I)
        return;
      let P = T.composedPath();
      P = P.slice(0, P.indexOf(this.rootElement));
      const _ = this.options.prevent;
      if (P.find((R) => {
        var M, H, U, Q, W;
        return R instanceof Element && (typeof _ == "function" && (_ == null ? void 0 : _(R)) || ((M = R.hasAttribute) === null || M === void 0 ? void 0 : M.call(R, "data-lenis-prevent")) || A && ((H = R.hasAttribute) === null || H === void 0 ? void 0 : H.call(R, "data-lenis-prevent-touch")) || C && ((U = R.hasAttribute) === null || U === void 0 ? void 0 : U.call(R, "data-lenis-prevent-wheel")) || ((Q = R.classList) === null || Q === void 0 ? void 0 : Q.contains("lenis")) && !(!((W = R.classList) === null || W === void 0) && W.contains("lenis-stopped")));
      }))
        return;
      if (this.isStopped || this.isLocked)
        return void T.preventDefault();
      if (!(this.options.syncTouch && A || this.options.smoothWheel && C))
        return this.isScrolling = "native", void this.animate.stop();
      T.preventDefault();
      let $ = E;
      this.options.gestureOrientation === "both" ? $ = Math.abs(E) > Math.abs(S) ? E : S : this.options.gestureOrientation === "horizontal" && ($ = S);
      const B = A && this.options.syncTouch, j = A && T.type === "touchend" && Math.abs($) > 5;
      j && ($ = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + $, Object.assign({
        programmatic: false
      }, B ? {
        lerp: j ? this.options.syncTouchLerp : 1
      } : {
        lerp: this.options.lerp,
        duration: this.options.duration,
        easing: this.options.easing
      }));
    }, this.onNativeScroll = () => {
      if (clearTimeout(this.__resetVelocityTimeout), delete this.__resetVelocityTimeout, this.__preventNextNativeScrollEvent)
        delete this.__preventNextNativeScrollEvent;
      else if (this.isScrolling === false || this.isScrolling === "native") {
        const x = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - x, this.direction = Math.sign(this.animatedScroll - x), this.isScrolling = "native", this.emit(), this.velocity !== 0 && (this.__resetVelocityTimeout = setTimeout(() => {
          this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = false, this.emit();
        }, 400));
      }
    }, window.lenisVersion = "1.1.9", t && t !== document.documentElement && t !== document.body || (t = window), this.options = {
      wrapper: t,
      content: e,
      wheelEventsTarget: i,
      eventsTarget: r,
      smoothWheel: s,
      syncTouch: o,
      syncTouchLerp: l,
      touchInertiaMultiplier: a,
      duration: c,
      easing: u,
      lerp: h,
      infinite: d,
      gestureOrientation: f,
      orientation: v,
      touchMultiplier: p,
      wheelMultiplier: b,
      autoResize: m,
      prevent: y,
      virtualScroll: g,
      __experimental__naiveDimensions: w
    }, this.animate = new aa(), this.emitter = new ur(), this.dimensions = new la({
      wrapper: t,
      content: e,
      autoResize: m
    }), this.updateClassName(), this.userData = {}, this.time = 0, this.velocity = this.lastVelocity = 0, this.isLocked = false, this.isStopped = false, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll = new ca(r, {
      touchMultiplier: p,
      wheelMultiplier: b
    }), this.virtualScroll.on("scroll", this.onVirtualScroll);
  }
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName();
  }
  on(t, e) {
    return this.emitter.on(t, e);
  }
  off(t, e) {
    return this.emitter.off(t, e);
  }
  setScroll(t) {
    this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t;
  }
  resize() {
    this.dimensions.resize();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  reset() {
    this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
  }
  start() {
    this.isStopped && (this.isStopped = false, this.reset());
  }
  stop() {
    this.isStopped || (this.isStopped = true, this.animate.stop(), this.reset());
  }
  raf(t) {
    const e = t - (this.time || t);
    this.time = t, this.animate.advance(1e-3 * e);
  }
  scrollTo(t, {
    offset: e = 0,
    immediate: i = false,
    lock: r = false,
    duration: s = this.options.duration,
    easing: o = this.options.easing,
    lerp: l = this.options.lerp,
    onStart: a,
    onComplete: c,
    force: u = false,
    programmatic: h = true,
    userData: d = {}
  } = {}) {
    if (!this.isStopped && !this.isLocked || u) {
      if (typeof t == "string" && ["top", "left", "start"].includes(t))
        t = 0;
      else if (typeof t == "string" && ["bottom", "right", "end"].includes(t))
        t = this.limit;
      else {
        let v;
        if (typeof t == "string" ? v = document.querySelector(t) : t instanceof HTMLElement && (t != null && t.nodeType) && (v = t), v) {
          if (this.options.wrapper !== window) {
            const p = this.rootElement.getBoundingClientRect();
            e -= this.isHorizontal ? p.left : p.top;
          }
          const f = v.getBoundingClientRect();
          t = (this.isHorizontal ? f.left : f.top) + this.animatedScroll;
        }
      }
      if (typeof t == "number" && (t += e, t = Math.round(t), this.options.infinite ? h && (this.targetScroll = this.animatedScroll = this.scroll) : t = cr(0, t, this.limit), t !== this.targetScroll)) {
        if (this.userData = d, i)
          return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), c == null || c(this), void (this.userData = {});
        h || (this.targetScroll = t), this.animate.fromTo(this.animatedScroll, t, {
          duration: s,
          easing: o,
          lerp: l,
          onStart: () => {
            r && (this.isLocked = true), this.isScrolling = "smooth", a == null || a(this);
          },
          onUpdate: (v, f) => {
            this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = v - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = v, this.setScroll(this.scroll), h && (this.targetScroll = v), f || this.emit(), f && (this.reset(), this.emit(), c == null || c(this), this.userData = {}, this.preventNextNativeScrollEvent());
          }
        });
      }
    }
  }
  preventNextNativeScrollEvent() {
    this.__preventNextNativeScrollEvent = true, requestAnimationFrame(() => {
      delete this.__preventNextNativeScrollEvent;
    });
  }
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  get limit() {
    return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  get actualScroll() {
    return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
  }
  get scroll() {
    return this.options.infinite ? function(e, i) {
      return (e % i + i) % i;
    }(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  get isScrolling() {
    return this.__isScrolling;
  }
  set isScrolling(t) {
    this.__isScrolling !== t && (this.__isScrolling = t, this.updateClassName());
  }
  get isStopped() {
    return this.__isStopped;
  }
  set isStopped(t) {
    this.__isStopped !== t && (this.__isStopped = t, this.updateClassName());
  }
  get isLocked() {
    return this.__isLocked;
  }
  set isLocked(t) {
    this.__isLocked !== t && (this.__isLocked = t, this.updateClassName());
  }
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  get className() {
    let t = "lenis";
    return this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), this.isScrolling && (t += " lenis-scrolling"), this.isScrolling === "smooth" && (t += " lenis-smooth"), t;
  }
  updateClassName() {
    this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
  }
  cleanUpClassName() {
    this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim();
  }
};
function Be() {
  return Be = Object.assign ? Object.assign.bind() : function(n2) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (n2[i] = e[i]);
    }
    return n2;
  }, Be.apply(this, arguments);
}
var Zn = class {
  constructor({
    scrollElements: t,
    rootMargin: e = "-1px -1px -1px -1px",
    IORaf: i
  }) {
    this.scrollElements = void 0, this.rootMargin = void 0, this.IORaf = void 0, this.observer = void 0, this.scrollElements = t, this.rootMargin = e, this.IORaf = i, this._init();
  }
  _init() {
    this.observer = new IntersectionObserver((t) => {
      t.forEach((e) => {
        const i = this.scrollElements.find((r) => r.$el === e.target);
        e.isIntersecting ? (i && (i.isAlreadyIntersected = true), this._setInview(e)) : i && i.isAlreadyIntersected && this._setOutOfView(e);
      });
    }, {
      rootMargin: this.rootMargin
    });
    for (const t of this.scrollElements)
      this.observe(t.$el);
  }
  destroy() {
    this.observer.disconnect();
  }
  observe(t) {
    t && this.observer.observe(t);
  }
  unobserve(t) {
    t && this.observer.unobserve(t);
  }
  _setInview(t) {
    const e = this.scrollElements.find((i) => i.$el === t.target);
    this.IORaf && (e == null || e.setInteractivityOn()), !this.IORaf && (e == null || e.setInview());
  }
  _setOutOfView(t) {
    const e = this.scrollElements.find((i) => i.$el === t.target);
    this.IORaf && (e == null || e.setInteractivityOff()), !this.IORaf && (e == null || e.setOutOfView()), e != null && e.attributes.scrollRepeat || this.IORaf || this.unobserve(t.target);
  }
};
function ti(n2, t, e, i, r) {
  return e + ((r - n2) / (t - n2) * (i - e) || 0);
}
function ei(n2, t) {
  return n2.reduce((e, i) => Math.abs(i - t) < Math.abs(e - t) ? i : e);
}
var ha = class {
  constructor({
    $el: t,
    id: e,
    modularInstance: i,
    subscribeElementUpdateFn: r,
    unsubscribeElementUpdateFn: s,
    needRaf: o,
    scrollOrientation: l
  }) {
    var a, c, u, h, d;
    this.$el = void 0, this.id = void 0, this.needRaf = void 0, this.attributes = void 0, this.scrollOrientation = void 0, this.isAlreadyIntersected = void 0, this.intersection = void 0, this.metrics = void 0, this.currentScroll = void 0, this.translateValue = void 0, this.progress = void 0, this.lastProgress = void 0, this.modularInstance = void 0, this.progressModularModules = void 0, this.isInview = void 0, this.isInteractive = void 0, this.isInFold = void 0, this.isFirstResize = void 0, this.subscribeElementUpdateFn = void 0, this.unsubscribeElementUpdateFn = void 0, this.$el = t, this.id = e, this.needRaf = o, this.scrollOrientation = l, this.modularInstance = i, this.subscribeElementUpdateFn = r, this.unsubscribeElementUpdateFn = s, this.attributes = {
      scrollClass: (a = this.$el.dataset.scrollClass) != null ? a : "is-inview",
      scrollOffset: (c = this.$el.dataset.scrollOffset) != null ? c : "0,0",
      scrollPosition: (u = this.$el.dataset.scrollPosition) != null ? u : "start,end",
      scrollModuleProgress: this.$el.dataset.scrollModuleProgress != null,
      scrollCssProgress: this.$el.dataset.scrollCssProgress != null,
      scrollEventProgress: (h = this.$el.dataset.scrollEventProgress) != null ? h : null,
      scrollSpeed: this.$el.dataset.scrollSpeed != null ? parseFloat(this.$el.dataset.scrollSpeed) : null,
      scrollRepeat: this.$el.dataset.scrollRepeat != null,
      scrollCall: (d = this.$el.dataset.scrollCall) != null ? d : null,
      scrollCallSelf: this.$el.dataset.scrollCallSelf != null,
      scrollIgnoreFold: this.$el.dataset.scrollIgnoreFold != null,
      scrollEnableTouchSpeed: this.$el.dataset.scrollEnableTouchSpeed != null
    }, this.intersection = {
      start: 0,
      end: 0
    }, this.metrics = {
      offsetStart: 0,
      offsetEnd: 0,
      bcr: {}
    }, this.currentScroll = this.scrollOrientation === "vertical" ? window.scrollY : window.scrollX, this.translateValue = 0, this.progress = 0, this.lastProgress = null, this.progressModularModules = [], this.isInview = false, this.isInteractive = false, this.isAlreadyIntersected = false, this.isInFold = false, this.isFirstResize = true, this._init();
  }
  _init() {
    this.needRaf && (this.modularInstance && this.attributes.scrollModuleProgress && this._getProgressModularModules(), this._resize());
  }
  onResize({
    currentScroll: t
  }) {
    this.currentScroll = t, this._resize();
  }
  onRender({
    currentScroll: t,
    smooth: e
  }) {
    const i = this.scrollOrientation === "vertical" ? window.innerHeight : window.innerWidth;
    if (this.currentScroll = t, this._computeProgress(), this.attributes.scrollSpeed && !isNaN(this.attributes.scrollSpeed))
      if (this.attributes.scrollEnableTouchSpeed || e) {
        if (this.isInFold) {
          const r = Math.max(0, this.progress);
          this.translateValue = r * i * this.attributes.scrollSpeed * -1;
        } else {
          const r = ti(0, 1, -1, 1, this.progress);
          this.translateValue = r * i * this.attributes.scrollSpeed * -1;
        }
        this.$el.style.transform = this.scrollOrientation === "vertical" ? `translate3d(0, ${this.translateValue}px, 0)` : `translate3d(${this.translateValue}px, 0, 0)`;
      } else
        this.translateValue && (this.$el.style.transform = "translate3d(0, 0, 0)"), this.translateValue = 0;
  }
  setInview() {
    if (this.isInview)
      return;
    this.isInview = true, this.$el.classList.add(this.attributes.scrollClass);
    const t = this._getScrollCallFrom();
    this.attributes.scrollCall && this._dispatchCall("enter", t);
  }
  setOutOfView() {
    if (!this.isInview || !this.attributes.scrollRepeat)
      return;
    this.isInview = false, this.$el.classList.remove(this.attributes.scrollClass);
    const t = this._getScrollCallFrom();
    this.attributes.scrollCall && this._dispatchCall("leave", t);
  }
  setInteractivityOn() {
    this.isInteractive || (this.isInteractive = true, this.subscribeElementUpdateFn(this));
  }
  setInteractivityOff() {
    this.isInteractive && (this.isInteractive = false, this.unsubscribeElementUpdateFn(this), this.lastProgress != null && this._computeProgress(ei([0, 1], this.lastProgress)));
  }
  _resize() {
    this.metrics.bcr = this.$el.getBoundingClientRect(), this._computeMetrics(), this._computeIntersection(), this.isFirstResize && (this.isFirstResize = false, this.isInFold && this.setInview());
  }
  _computeMetrics() {
    const {
      top: t,
      left: e,
      height: i,
      width: r
    } = this.metrics.bcr, s = this.scrollOrientation === "vertical" ? window.innerHeight : window.innerWidth, o = this.scrollOrientation === "vertical" ? i : r;
    this.metrics.offsetStart = this.currentScroll + (this.scrollOrientation === "vertical" ? t : e) - this.translateValue, this.metrics.offsetEnd = this.metrics.offsetStart + o, this.isInFold = this.metrics.offsetStart < s && !this.attributes.scrollIgnoreFold;
  }
  _computeIntersection() {
    const t = this.scrollOrientation === "vertical" ? window.innerHeight : window.innerWidth, e = this.scrollOrientation === "vertical" ? this.metrics.bcr.height : this.metrics.bcr.width, i = this.attributes.scrollOffset.split(","), r = i[0] != null ? i[0].trim() : "0", s = i[1] != null ? i[1].trim() : "0", o = this.attributes.scrollPosition.split(",");
    let l = o[0] != null ? o[0].trim() : "start";
    const a = o[1] != null ? o[1].trim() : "end", c = r.includes("%") ? t * parseInt(r.replace("%", "").trim()) * 0.01 : parseInt(r), u = s.includes("%") ? t * parseInt(s.replace("%", "").trim()) * 0.01 : parseInt(s);
    switch (this.isInFold && (l = "fold"), l) {
      case "start":
      default:
        this.intersection.start = this.metrics.offsetStart - t + c;
        break;
      case "middle":
        this.intersection.start = this.metrics.offsetStart - t + c + 0.5 * e;
        break;
      case "end":
        this.intersection.start = this.metrics.offsetStart - t + c + e;
        break;
      case "fold":
        this.intersection.start = 0;
    }
    switch (a) {
      case "start":
        this.intersection.end = this.metrics.offsetStart - u;
        break;
      case "middle":
        this.intersection.end = this.metrics.offsetStart - u + 0.5 * e;
        break;
      default:
        this.intersection.end = this.metrics.offsetStart - u + e;
    }
    if (this.intersection.end <= this.intersection.start)
      switch (a) {
        case "start":
        default:
          this.intersection.end = this.intersection.start + 1;
          break;
        case "middle":
          this.intersection.end = this.intersection.start + 0.5 * e;
          break;
        case "end":
          this.intersection.end = this.intersection.start + e;
      }
  }
  _computeProgress(t) {
    const e = t ?? ((i = ti(this.intersection.start, this.intersection.end, 0, 1, this.currentScroll)) < 0 ? 0 : i > 1 ? 1 : i);
    var i;
    if (this.progress = e, e != this.lastProgress) {
      if (this.lastProgress = e, this.attributes.scrollCssProgress && this._setCssProgress(e), this.attributes.scrollEventProgress && this._setCustomEventProgress(e), this.attributes.scrollModuleProgress)
        for (const r of this.progressModularModules)
          this.modularInstance && this.modularInstance.call("onScrollProgress", e, r.moduleName, r.moduleId);
      e > 0 && e < 1 && this.setInview(), e === 0 && this.setOutOfView(), e === 1 && this.setOutOfView();
    }
  }
  _setCssProgress(t = 0) {
    this.$el.style.setProperty("--progress", t.toString());
  }
  _setCustomEventProgress(t = 0) {
    const e = this.attributes.scrollEventProgress;
    if (!e)
      return;
    const i = new CustomEvent(e, {
      detail: {
        target: this.$el,
        progress: t
      }
    });
    window.dispatchEvent(i);
  }
  _getProgressModularModules() {
    if (!this.modularInstance)
      return;
    const t = Object.keys(this.$el.dataset).filter((i) => i.includes("module")), e = Object.entries(this.modularInstance.modules);
    if (t.length)
      for (const i of t) {
        const r = this.$el.dataset[i];
        if (!r)
          return;
        for (const s of e) {
          const [o, l] = s;
          r in l && this.progressModularModules.push({
            moduleName: o,
            moduleId: r
          });
        }
      }
  }
  _getScrollCallFrom() {
    const t = ei([this.intersection.start, this.intersection.end], this.currentScroll);
    return this.intersection.start === t ? "start" : "end";
  }
  _dispatchCall(t, e) {
    var i, r;
    const s = (i = this.attributes.scrollCall) == null ? void 0 : i.split(","), o = (r = this.attributes) == null ? void 0 : r.scrollCallSelf;
    if (s && s.length > 1) {
      var l;
      const [a, c, u] = s;
      let h;
      h = o ? this.$el.dataset[`module${c.trim()}`] : u, this.modularInstance && this.modularInstance.call(a.trim(), {
        target: this.$el,
        way: t,
        from: e
      }, c.trim(), (l = h) == null ? void 0 : l.trim());
    } else if (s) {
      const [a] = s, c = new CustomEvent(a, {
        detail: {
          target: this.$el,
          way: t,
          from: e
        }
      });
      window.dispatchEvent(c);
    }
  }
};
var da = ["scrollOffset", "scrollPosition", "scrollModuleProgress", "scrollCssProgress", "scrollEventProgress", "scrollSpeed"];
var fa = class {
  constructor({
    $el: t,
    modularInstance: e,
    triggerRootMargin: i,
    rafRootMargin: r,
    scrollOrientation: s
  }) {
    this.$scrollContainer = void 0, this.modularInstance = void 0, this.triggerRootMargin = void 0, this.rafRootMargin = void 0, this.scrollElements = void 0, this.triggeredScrollElements = void 0, this.RAFScrollElements = void 0, this.scrollElementsToUpdate = void 0, this.IOTriggerInstance = void 0, this.IORafInstance = void 0, this.scrollOrientation = void 0, t ? (this.$scrollContainer = t, this.modularInstance = e, this.scrollOrientation = s, this.triggerRootMargin = i ?? "-1px -1px -1px -1px", this.rafRootMargin = r ?? "100% 100% 100% 100%", this.scrollElements = [], this.triggeredScrollElements = [], this.RAFScrollElements = [], this.scrollElementsToUpdate = [], this._init()) : console.error("Please provide a DOM Element as scrollContainer");
  }
  _init() {
    const t = this.$scrollContainer.querySelectorAll("[data-scroll]"), e = Array.from(t);
    this._subscribeScrollElements(e), this.IOTriggerInstance = new Zn({
      scrollElements: [...this.triggeredScrollElements],
      rootMargin: this.triggerRootMargin,
      IORaf: false
    }), this.IORafInstance = new Zn({
      scrollElements: [...this.RAFScrollElements],
      rootMargin: this.rafRootMargin,
      IORaf: true
    });
  }
  destroy() {
    this.IOTriggerInstance.destroy(), this.IORafInstance.destroy(), this._unsubscribeAllScrollElements();
  }
  onResize({
    currentScroll: t
  }) {
    for (const e of this.RAFScrollElements)
      e.onResize({
        currentScroll: t
      });
  }
  onRender({
    currentScroll: t,
    smooth: e
  }) {
    for (const i of this.scrollElementsToUpdate)
      i.onRender({
        currentScroll: t,
        smooth: e
      });
  }
  removeScrollElements(t) {
    const e = t.querySelectorAll("[data-scroll]");
    if (e.length) {
      for (let i = 0; i < this.triggeredScrollElements.length; i++) {
        const r = this.triggeredScrollElements[i];
        Array.from(e).indexOf(r.$el) > -1 && (this.IOTriggerInstance.unobserve(r.$el), this.triggeredScrollElements.splice(i, 1));
      }
      for (let i = 0; i < this.RAFScrollElements.length; i++) {
        const r = this.RAFScrollElements[i];
        Array.from(e).indexOf(r.$el) > -1 && (this.IORafInstance.unobserve(r.$el), this.RAFScrollElements.splice(i, 1));
      }
      e.forEach((i) => {
        const r = this.scrollElementsToUpdate.find((o) => o.$el === i), s = this.scrollElements.find((o) => o.$el === i);
        r && this._unsubscribeElementUpdate(r), s && (this.scrollElements = this.scrollElements.filter((o) => o.id != s.id));
      });
    }
  }
  addScrollElements(t) {
    const e = t.querySelectorAll("[data-scroll]"), i = [];
    this.scrollElements.forEach((o) => {
      i.push(o.id);
    });
    const r = Math.max(...i, 0) + 1, s = Array.from(e);
    this._subscribeScrollElements(s, r, true);
  }
  _subscribeScrollElements(t, e = 0, i = false) {
    for (let r = 0; r < t.length; r++) {
      const s = t[r], o = this._checkRafNeeded(s), l = new ha({
        $el: s,
        id: e + r,
        scrollOrientation: this.scrollOrientation,
        modularInstance: this.modularInstance,
        subscribeElementUpdateFn: this._subscribeElementUpdate.bind(this),
        unsubscribeElementUpdateFn: this._unsubscribeElementUpdate.bind(this),
        needRaf: o
      });
      this.scrollElements.push(l), o ? (this.RAFScrollElements.push(l), i && (this.IORafInstance.scrollElements.push(l), this.IORafInstance.observe(l.$el))) : (this.triggeredScrollElements.push(l), i && (this.IOTriggerInstance.scrollElements.push(l), this.IOTriggerInstance.observe(l.$el)));
    }
  }
  _unsubscribeAllScrollElements() {
    this.scrollElements = [], this.RAFScrollElements = [], this.triggeredScrollElements = [], this.scrollElementsToUpdate = [];
  }
  _subscribeElementUpdate(t) {
    this.scrollElementsToUpdate.push(t);
  }
  _unsubscribeElementUpdate(t) {
    this.scrollElementsToUpdate = this.scrollElementsToUpdate.filter((e) => e.id != t.id);
  }
  _checkRafNeeded(t) {
    let e = [...da];
    const i = (r) => {
      e = e.filter((s) => s != r);
    };
    if (t.dataset.scrollOffset) {
      if (t.dataset.scrollOffset.split(",").map((r) => r.replace("%", "").trim()).join(",") != "0,0")
        return true;
      i("scrollOffset");
    } else
      i("scrollOffset");
    if (t.dataset.scrollPosition) {
      if (t.dataset.scrollPosition.trim() != "top,bottom")
        return true;
      i("scrollPosition");
    } else
      i("scrollPosition");
    if (t.dataset.scrollSpeed && !isNaN(parseFloat(t.dataset.scrollSpeed)))
      return true;
    i("scrollSpeed");
    for (const r of e)
      if (r in t.dataset)
        return true;
    return false;
  }
};
var pa = class {
  constructor({
    resizeElements: t,
    resizeCallback: e = () => {
    }
  }) {
    this.$resizeElements = void 0, this.isFirstObserve = void 0, this.observer = void 0, this.resizeCallback = void 0, this.$resizeElements = t, this.resizeCallback = e, this.isFirstObserve = true, this._init();
  }
  _init() {
    this.observer = new ResizeObserver((t) => {
      var e;
      !this.isFirstObserve && ((e = this.resizeCallback) == null || e.call(this)), this.isFirstObserve = false;
    });
    for (const t of this.$resizeElements)
      this.observer.observe(t);
  }
  destroy() {
    this.observer.disconnect();
  }
};
var ma = class {
  constructor({
    lenisOptions: t = {},
    modularInstance: e,
    triggerRootMargin: i,
    rafRootMargin: r,
    autoResize: s = true,
    autoStart: o = true,
    scrollCallback: l = () => {
    },
    initCustomTicker: a,
    destroyCustomTicker: c
  } = {}) {
    this.rafPlaying = void 0, this.lenisInstance = void 0, this.coreInstance = void 0, this.lenisOptions = void 0, this.modularInstance = void 0, this.triggerRootMargin = void 0, this.rafRootMargin = void 0, this.rafInstance = void 0, this.autoResize = void 0, this.autoStart = void 0, this.ROInstance = void 0, this.initCustomTicker = void 0, this.destroyCustomTicker = void 0, this._onRenderBind = void 0, this._onResizeBind = void 0, this._onScrollToBind = void 0;
    for (const [u] of Object.entries(t))
      ["wrapper", "content", "infinite"].includes(u) && console.warn(`Warning: Key "${u}" is not possible to edit in Locomotive Scroll.`);
    Object.assign(this, {
      lenisOptions: t,
      modularInstance: e,
      triggerRootMargin: i,
      rafRootMargin: r,
      autoResize: s,
      autoStart: o,
      scrollCallback: l,
      initCustomTicker: a,
      destroyCustomTicker: c
    }), this._onRenderBind = this._onRender.bind(this), this._onScrollToBind = this._onScrollTo.bind(this), this._onResizeBind = this._onResize.bind(this), this.rafPlaying = false, this._init();
  }
  _init() {
    var t;
    this.lenisInstance = new ua(Be({}, this.lenisOptions, {
      wrapper: window,
      content: document.documentElement,
      infinite: false
    })), (t = this.lenisInstance) == null || t.on("scroll", this.scrollCallback), document.documentElement.setAttribute("data-scroll-orientation", this.lenisInstance.options.orientation), requestAnimationFrame(() => {
      this.coreInstance = new fa({
        $el: this.lenisInstance.rootElement,
        modularInstance: this.modularInstance,
        triggerRootMargin: this.triggerRootMargin,
        rafRootMargin: this.rafRootMargin,
        scrollOrientation: this.lenisInstance.options.orientation
      }), this._bindEvents(), this.initCustomTicker && !this.destroyCustomTicker ? console.warn("initCustomTicker callback is declared, but destroyCustomTicker is not. Please pay attention. It could cause trouble.") : !this.initCustomTicker && this.destroyCustomTicker && console.warn("destroyCustomTicker callback is declared, but initCustomTicker is not. Please pay attention. It could cause trouble."), this.autoStart && this.start();
    });
  }
  destroy() {
    var t;
    this.stop(), this._unbindEvents(), this.lenisInstance.destroy(), (t = this.coreInstance) == null || t.destroy(), requestAnimationFrame(() => {
      var e;
      (e = this.coreInstance) == null || e.destroy();
    });
  }
  _bindEvents() {
    this._bindScrollToEvents(), this.autoResize && ("ResizeObserver" in window ? this.ROInstance = new pa({
      resizeElements: [document.body],
      resizeCallback: this._onResizeBind
    }) : window.addEventListener("resize", this._onResizeBind));
  }
  _unbindEvents() {
    this._unbindScrollToEvents(), this.autoResize && ("ResizeObserver" in window ? this.ROInstance && this.ROInstance.destroy() : window.removeEventListener("resize", this._onResizeBind));
  }
  _bindScrollToEvents(t) {
    const e = t || this.lenisInstance.rootElement, i = e == null ? void 0 : e.querySelectorAll("[data-scroll-to]");
    i != null && i.length && i.forEach((r) => {
      r.addEventListener("click", this._onScrollToBind, false);
    });
  }
  _unbindScrollToEvents(t) {
    const e = t || this.lenisInstance.rootElement, i = e == null ? void 0 : e.querySelectorAll("[data-scroll-to]");
    i != null && i.length && i.forEach((r) => {
      r.removeEventListener("click", this._onScrollToBind, false);
    });
  }
  _onResize() {
    requestAnimationFrame(() => {
      var t;
      (t = this.coreInstance) == null || t.onResize({
        currentScroll: this.lenisInstance.scroll
      });
    });
  }
  _onRender() {
    var t, e;
    (t = this.lenisInstance) == null || t.raf(Date.now()), (e = this.coreInstance) == null || e.onRender({
      currentScroll: this.lenisInstance.scroll,
      smooth: this.lenisInstance.options.smoothWheel
    });
  }
  _onScrollTo(t) {
    var e;
    t.preventDefault();
    const i = (e = t.currentTarget) != null ? e : null;
    if (!i)
      return;
    const r = i.getAttribute("data-scroll-to-href") || i.getAttribute("href"), s = i.getAttribute("data-scroll-to-offset") || 0, o = i.getAttribute("data-scroll-to-duration") || this.lenisInstance.options.duration;
    r && this.scrollTo(r, {
      offset: typeof s == "string" ? parseInt(s) : s,
      duration: typeof o == "string" ? parseInt(o) : o
    });
  }
  start() {
    var t;
    this.rafPlaying || ((t = this.lenisInstance) == null || t.start(), this.rafPlaying = true, this.initCustomTicker ? this.initCustomTicker(this._onRenderBind) : this._raf());
  }
  stop() {
    var t;
    this.rafPlaying && ((t = this.lenisInstance) == null || t.stop(), this.rafPlaying = false, this.destroyCustomTicker ? this.destroyCustomTicker(this._onRenderBind) : this.rafInstance && cancelAnimationFrame(this.rafInstance));
  }
  removeScrollElements(t) {
    var e;
    t ? (this._unbindScrollToEvents(t), (e = this.coreInstance) == null || e.removeScrollElements(t)) : console.error("Please provide a DOM Element as $oldContainer");
  }
  addScrollElements(t) {
    var e;
    t ? ((e = this.coreInstance) == null || e.addScrollElements(t), requestAnimationFrame(() => {
      this._bindScrollToEvents(t);
    })) : console.error("Please provide a DOM Element as $newContainer");
  }
  resize() {
    this._onResizeBind();
  }
  scrollTo(t, e) {
    var i;
    (i = this.lenisInstance) == null || i.scrollTo(t, {
      offset: e == null ? void 0 : e.offset,
      lerp: e == null ? void 0 : e.lerp,
      duration: e == null ? void 0 : e.duration,
      immediate: e == null ? void 0 : e.immediate,
      lock: e == null ? void 0 : e.lock,
      force: e == null ? void 0 : e.force,
      easing: e == null ? void 0 : e.easing,
      onComplete: e == null ? void 0 : e.onComplete
    });
  }
  _raf() {
    this._onRenderBind(), this.rafInstance = requestAnimationFrame(() => this._raf());
  }
};
var ga = class extends D {
  constructor(t) {
    super(t), this.state = true, this.rafRender = null;
  }
  init() {
    this.el.dataset.preventReset === void 0 && (history.scrollRestoration = "manual", window.scrollTo(0, 0));
    const t = this.el.dataset.horizontal !== void 0 ? "horizontal" : "vertical";
    this.scroll = new ma({
      lenisOptions: {
        orientation: t
      },
      modularInstance: this,
      autoResize: false,
      initCustomTicker: (e) => {
        this.rafRender = e;
      },
      destroyCustomTicker: () => {
        this.rafRender = null;
      },
      autoStart: true,
      scrollCallback: this.onScroll.bind(this)
    }), this.scrollOrientation = 1, this.lastProgress = 0, this.resize = this.scroll.resize.bind(this.scroll);
  }
  aAnimate() {
    this.rafRender && this.rafRender();
  }
  onScroll({
    progress: t
  }) {
    this.call("toggleBackground", t > 0.02, "Header", "header"), t <= 0.01 && (this.scrollOrientation = -1, this.call("toggleHeaderVisibility", false, "Header", "header")), t > this.lastProgress ? this.scrollOrientation !== 1 && (this.scrollOrientation = 1, this.call("toggleHeaderVisibility", true, "Header", "header")) : this.scrollOrientation !== -1 && (this.scrollOrientation = -1, this.call("toggleHeaderVisibility", false, "Header", "header")), Bi ? this.call("toggleWidgetVisibility", t > 0.4 && t < 0.8, "PopinContact", "widget") : this.call("toggleWidgetVisibility", this.scrollOrientation !== -1 && t > 0.4 && t < 0.8, "PopinContact", "widget"), this.lastProgress = t;
  }
  leavePage(t) {
    this.destroy();
  }
  enterPage(t) {
    this.init();
  }
  toggle(t) {
    if (t === this.state)
      return;
    this.state = t;
    const e = t ? "start" : "stop";
    this.scroll[e]();
  }
  update() {
    this.scroll.resize();
  }
  destroy() {
    this.scroll.destroy();
  }
  scrollTo({
    target: t = 0,
    options: e = {}
  }) {
    this.scroll.scrollTo(t, e);
  }
};
var va = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: "onClick"
    };
  }
  onClick(t) {
    const {
      target: e
    } = t, {
      action: i
    } = e.dataset;
    i && this[i] && this[i](e);
  }
  toggle() {
    this.change(!this.state);
  }
  change(t) {
    if (this.state === t)
      return;
    this.state = t;
    const [e] = this.$("aside"), [i] = this.$("button");
    this.el.classList.toggle("-isActive", t), Object.assign(Zt.style, {
      overflow: t ? "hidden" : ""
    }), i.querySelector("span").innerText = t ? "Fermer" : "Menu";
  }
};
function yn(n2) {
  return typeof n2 == "number";
}
function Ue(n2) {
  return typeof n2 == "string";
}
function xe(n2) {
  return typeof n2 == "boolean";
}
function ni(n2) {
  return Object.prototype.toString.call(n2) === "[object Object]";
}
function N(n2) {
  return Math.abs(n2);
}
function bn(n2) {
  return Math.sign(n2);
}
function Yt(n2, t) {
  return N(n2 - t);
}
function ya(n2, t) {
  if (n2 === 0 || t === 0 || N(n2) <= N(t))
    return 0;
  const e = Yt(N(n2), N(t));
  return N(e / n2);
}
function ba(n2) {
  return Math.round(n2 * 100) / 100;
}
function te(n2) {
  return ee(n2).map(Number);
}
function it(n2) {
  return n2[se(n2)];
}
function se(n2) {
  return Math.max(0, n2.length - 1);
}
function wn(n2, t) {
  return t === se(n2);
}
function ii(n2, t = 0) {
  return Array.from(Array(n2), (e, i) => t + i);
}
function ee(n2) {
  return Object.keys(n2);
}
function hr(n2, t) {
  return [n2, t].reduce((e, i) => (ee(i).forEach((r) => {
    const s = e[r], o = i[r], l = ni(s) && ni(o);
    e[r] = l ? hr(s, o) : o;
  }), e), {});
}
function We(n2, t) {
  return typeof t.MouseEvent < "u" && n2 instanceof t.MouseEvent;
}
function wa(n2, t) {
  const e = {
    start: i,
    center: r,
    end: s
  };
  function i() {
    return 0;
  }
  function r(a) {
    return s(a) / 2;
  }
  function s(a) {
    return t - a;
  }
  function o(a, c) {
    return Ue(n2) ? e[n2](a) : n2(t, a, c);
  }
  return {
    measure: o
  };
}
function ne() {
  let n2 = [];
  function t(r, s, o, l = {
    passive: true
  }) {
    let a;
    if ("addEventListener" in r)
      r.addEventListener(s, o, l), a = () => r.removeEventListener(s, o, l);
    else {
      const c = r;
      c.addListener(o), a = () => c.removeListener(o);
    }
    return n2.push(a), i;
  }
  function e() {
    n2 = n2.filter((r) => r());
  }
  const i = {
    add: t,
    clear: e
  };
  return i;
}
function Sa(n2, t, e, i) {
  const r = ne(), s = 1e3 / 60;
  let o = null, l = 0, a = 0;
  function c() {
    r.add(n2, "visibilitychange", () => {
      n2.hidden && f();
    });
  }
  function u() {
    v(), r.clear();
  }
  function h(b) {
    if (!a)
      return;
    o || (o = b, e(), e());
    const m = b - o;
    for (o = b, l += m; l >= s; )
      e(), l -= s;
    const y = l / s;
    i(y), a && (a = t.requestAnimationFrame(h));
  }
  function d() {
    a || (a = t.requestAnimationFrame(h));
  }
  function v() {
    t.cancelAnimationFrame(a), o = null, l = 0, a = 0;
  }
  function f() {
    o = null, l = 0;
  }
  return {
    init: c,
    destroy: u,
    start: d,
    stop: v,
    update: e,
    render: i
  };
}
function Ea(n2, t) {
  const e = t === "rtl", i = n2 === "y", r = i ? "y" : "x", s = i ? "x" : "y", o = !i && e ? -1 : 1, l = u(), a = h();
  function c(f) {
    const {
      height: p,
      width: b
    } = f;
    return i ? p : b;
  }
  function u() {
    return i ? "top" : e ? "right" : "left";
  }
  function h() {
    return i ? "bottom" : e ? "left" : "right";
  }
  function d(f) {
    return f * o;
  }
  return {
    scroll: r,
    cross: s,
    startEdge: l,
    endEdge: a,
    measureSize: c,
    direction: d
  };
}
function Pt(n2 = 0, t = 0) {
  const e = N(n2 - t);
  function i(c) {
    return c < n2;
  }
  function r(c) {
    return c > t;
  }
  function s(c) {
    return i(c) || r(c);
  }
  function o(c) {
    return s(c) ? i(c) ? n2 : t : c;
  }
  function l(c) {
    return e ? c - e * Math.ceil((c - t) / e) : c;
  }
  return {
    length: e,
    max: t,
    min: n2,
    constrain: o,
    reachedAny: s,
    reachedMax: r,
    reachedMin: i,
    removeOffset: l
  };
}
function dr(n2, t, e) {
  const {
    constrain: i
  } = Pt(0, n2), r = n2 + 1;
  let s = o(t);
  function o(d) {
    return e ? N((r + d) % r) : i(d);
  }
  function l() {
    return s;
  }
  function a(d) {
    return s = o(d), h;
  }
  function c(d) {
    return u().set(l() + d);
  }
  function u() {
    return dr(n2, l(), e);
  }
  const h = {
    get: l,
    set: a,
    add: c,
    clone: u
  };
  return h;
}
function Ca(n2, t, e, i, r, s, o, l, a, c, u, h, d, v, f, p, b, m, y) {
  const {
    cross: g,
    direction: w
  } = n2, x = ["INPUT", "SELECT", "TEXTAREA"], S = {
    passive: false
  }, E = ne(), T = ne(), A = Pt(50, 225).constrain(v.measure(20)), C = {
    mouse: 300,
    touch: 400
  }, L = {
    mouse: 500,
    touch: 600
  }, I = f ? 43 : 25;
  let P = false, _ = 0, $ = 0, B = false, j = false, R = false, M = false;
  function H(k) {
    if (!y)
      return;
    function F(K) {
      (xe(y) || y(k, K)) && xt(K);
    }
    const V = t;
    E.add(V, "dragstart", (K) => K.preventDefault(), S).add(V, "touchmove", () => {
    }, S).add(V, "touchend", () => {
    }).add(V, "touchstart", F).add(V, "mousedown", F).add(V, "touchcancel", G).add(V, "contextmenu", G).add(V, "click", ft, true);
  }
  function U() {
    E.clear(), T.clear();
  }
  function Q() {
    const k = M ? e : t;
    T.add(k, "touchmove", Z, S).add(k, "touchend", G).add(k, "mousemove", Z, S).add(k, "mouseup", G);
  }
  function W(k) {
    const F = k.nodeName || "";
    return x.includes(F);
  }
  function tt() {
    return (f ? L : C)[M ? "mouse" : "touch"];
  }
  function dt(k, F) {
    const V = h.add(bn(k) * -1), K = u.byDistance(k, !f).distance;
    return f || N(k) < A ? K : b && F ? K * 0.5 : u.byIndex(V.get(), 0).distance;
  }
  function xt(k) {
    const F = We(k, i);
    M = F, R = f && F && !k.buttons && P, P = Yt(r.get(), o.get()) >= 2, !(F && k.button !== 0) && (W(k.target) || (B = true, s.pointerDown(k), c.useFriction(0).useDuration(0), r.set(o), Q(), _ = s.readPoint(k), $ = s.readPoint(k, g), d.emit("pointerDown")));
  }
  function Z(k) {
    if (!We(k, i) && k.touches.length >= 2)
      return G(k);
    const V = s.readPoint(k), K = s.readPoint(k, g), st = Yt(V, _), pt = Yt(K, $);
    if (!j && !M && (!k.cancelable || (j = st > pt, !j)))
      return G(k);
    const Tt = s.pointerMove(k);
    st > p && (R = true), c.useFriction(0.3).useDuration(0.75), l.start(), r.add(w(Tt)), k.preventDefault();
  }
  function G(k) {
    const V = u.byDistance(0, false).index !== h.get(), K = s.pointerUp(k) * tt(), st = dt(w(K), V), pt = ya(K, st), Tt = I - 10 * pt, vt = m + pt / 50;
    j = false, B = false, T.clear(), c.useDuration(Tt).useFriction(vt), a.distance(st, !f), M = false, d.emit("pointerUp");
  }
  function ft(k) {
    R && (k.stopPropagation(), k.preventDefault(), R = false);
  }
  function et() {
    return B;
  }
  return {
    init: H,
    destroy: U,
    pointerDown: et
  };
}
function xa(n2, t) {
  let i, r;
  function s(h) {
    return h.timeStamp;
  }
  function o(h, d) {
    const f = `client${(d || n2.scroll) === "x" ? "X" : "Y"}`;
    return (We(h, t) ? h : h.touches[0])[f];
  }
  function l(h) {
    return i = h, r = h, o(h);
  }
  function a(h) {
    const d = o(h) - o(r), v = s(h) - s(i) > 170;
    return r = h, v && (i = h), d;
  }
  function c(h) {
    if (!i || !r)
      return 0;
    const d = o(r) - o(i), v = s(h) - s(i), f = s(h) - s(r) > 170, p = d / v;
    return v && !f && N(p) > 0.1 ? p : 0;
  }
  return {
    pointerDown: l,
    pointerMove: a,
    pointerUp: c,
    readPoint: o
  };
}
function Ta() {
  function n2(e) {
    const {
      offsetTop: i,
      offsetLeft: r,
      offsetWidth: s,
      offsetHeight: o
    } = e;
    return {
      top: i,
      right: r + s,
      bottom: i + o,
      left: r,
      width: s,
      height: o
    };
  }
  return {
    measure: n2
  };
}
function Aa(n2) {
  function t(i) {
    return n2 * (i / 100);
  }
  return {
    measure: t
  };
}
function La(n2, t, e, i, r, s, o) {
  const l = [n2].concat(i);
  let a, c, u = [], h = false;
  function d(b) {
    return r.measureSize(o.measure(b));
  }
  function v(b) {
    if (!s)
      return;
    c = d(n2), u = i.map(d);
    function m(y) {
      for (const g of y) {
        if (h)
          return;
        const w = g.target === n2, x = i.indexOf(g.target), S = w ? c : u[x], E = d(w ? n2 : i[x]);
        if (N(E - S) >= 0.5) {
          b.reInit(), t.emit("resize");
          break;
        }
      }
    }
    a = new ResizeObserver((y) => {
      (xe(s) || s(b, y)) && m(y);
    }), e.requestAnimationFrame(() => {
      l.forEach((y) => a.observe(y));
    });
  }
  function f() {
    h = true, a && a.disconnect();
  }
  return {
    init: v,
    destroy: f
  };
}
function Ia(n2, t, e, i, r, s) {
  let o = 0, l = 0, a = r, c = s, u = n2.get(), h = 0;
  function d() {
    const S = i.get() - n2.get(), E = !a;
    let T = 0;
    return E ? (o = 0, e.set(i), n2.set(i), T = S) : (e.set(n2), o += S / a, o *= c, u += o, n2.add(o), T = u - h), l = bn(T), h = u, x;
  }
  function v() {
    const S = i.get() - t.get();
    return N(S) < 1e-3;
  }
  function f() {
    return a;
  }
  function p() {
    return l;
  }
  function b() {
    return o;
  }
  function m() {
    return g(r);
  }
  function y() {
    return w(s);
  }
  function g(S) {
    return a = S, x;
  }
  function w(S) {
    return c = S, x;
  }
  const x = {
    direction: p,
    duration: f,
    velocity: b,
    seek: d,
    settled: v,
    useBaseFriction: y,
    useBaseDuration: m,
    useFriction: w,
    useDuration: g
  };
  return x;
}
function ka(n2, t, e, i, r) {
  const s = r.measure(10), o = r.measure(50), l = Pt(0.1, 0.99);
  let a = false;
  function c() {
    return !(a || !n2.reachedAny(e.get()) || !n2.reachedAny(t.get()));
  }
  function u(v) {
    if (!c())
      return;
    const f = n2.reachedMin(t.get()) ? "min" : "max", p = N(n2[f] - t.get()), b = e.get() - t.get(), m = l.constrain(p / o);
    e.subtract(b * m), !v && N(b) < s && (e.set(n2.constrain(e.get())), i.useDuration(25).useBaseFriction());
  }
  function h(v) {
    a = !v;
  }
  return {
    shouldConstrain: c,
    constrain: u,
    toggleActive: h
  };
}
function Oa(n2, t, e, i, r) {
  const s = Pt(-t + n2, 0), o = h(), l = u(), a = d();
  function c(f, p) {
    return Yt(f, p) <= 1;
  }
  function u() {
    const f = o[0], p = it(o), b = o.lastIndexOf(f), m = o.indexOf(p) + 1;
    return Pt(b, m);
  }
  function h() {
    return e.map((f, p) => {
      const {
        min: b,
        max: m
      } = s, y = s.constrain(f), g = !p, w = wn(e, p);
      return g ? m : w || c(b, y) ? b : c(m, y) ? m : y;
    }).map((f) => parseFloat(f.toFixed(3)));
  }
  function d() {
    if (t <= n2 + r)
      return [s.max];
    if (i === "keepSnaps")
      return o;
    const {
      min: f,
      max: p
    } = l;
    return o.slice(f, p);
  }
  return {
    snapsContained: a,
    scrollContainLimit: l
  };
}
function _a(n2, t, e) {
  const i = t[0], r = e ? i - n2 : it(t);
  return {
    limit: Pt(r, i)
  };
}
function Pa(n2, t, e, i) {
  const s = t.min + 0.1, o = t.max + 0.1, {
    reachedMin: l,
    reachedMax: a
  } = Pt(s, o);
  function c(d) {
    return d === 1 ? a(e.get()) : d === -1 ? l(e.get()) : false;
  }
  function u(d) {
    if (!c(d))
      return;
    const v = n2 * (d * -1);
    i.forEach((f) => f.add(v));
  }
  return {
    loop: u
  };
}
function Ma(n2) {
  const {
    max: t,
    length: e
  } = n2;
  function i(s) {
    const o = s - t;
    return e ? o / -e : 0;
  }
  return {
    get: i
  };
}
function $a(n2, t, e, i, r) {
  const {
    startEdge: s,
    endEdge: o
  } = n2, {
    groupSlides: l
  } = r, a = h().map(t.measure), c = d(), u = v();
  function h() {
    return l(i).map((p) => it(p)[o] - p[0][s]).map(N);
  }
  function d() {
    return i.map((p) => e[s] - p[s]).map((p) => -N(p));
  }
  function v() {
    return l(c).map((p) => p[0]).map((p, b) => p + a[b]);
  }
  return {
    snaps: c,
    snapsAligned: u
  };
}
function Ra(n2, t, e, i, r, s) {
  const {
    groupSlides: o
  } = r, {
    min: l,
    max: a
  } = i, c = u();
  function u() {
    const d = o(s), v = !n2 || t === "keepSnaps";
    return e.length === 1 ? [s] : v ? d : d.slice(l, a).map((f, p, b) => {
      const m = !p, y = wn(b, p);
      if (m) {
        const g = it(b[0]) + 1;
        return ii(g);
      }
      if (y) {
        const g = se(s) - it(b)[0] + 1;
        return ii(g, it(b)[0]);
      }
      return f;
    });
  }
  return {
    slideRegistry: c
  };
}
function Da(n2, t, e, i, r) {
  const {
    reachedAny: s,
    removeOffset: o,
    constrain: l
  } = i;
  function a(f) {
    return f.concat().sort((p, b) => N(p) - N(b))[0];
  }
  function c(f) {
    const p = n2 ? o(f) : l(f), b = t.map((y, g) => ({
      diff: u(y - p, 0),
      index: g
    })).sort((y, g) => N(y.diff) - N(g.diff)), {
      index: m
    } = b[0];
    return {
      index: m,
      distance: p
    };
  }
  function u(f, p) {
    const b = [f, f + e, f - e];
    if (!n2)
      return f;
    if (!p)
      return a(b);
    const m = b.filter((y) => bn(y) === p);
    return m.length ? a(m) : it(b) - e;
  }
  function h(f, p) {
    const b = t[f] - r.get(), m = u(b, p);
    return {
      index: f,
      distance: m
    };
  }
  function d(f, p) {
    const b = r.get() + f, {
      index: m,
      distance: y
    } = c(b), g = !n2 && s(b);
    if (!p || g)
      return {
        index: m,
        distance: f
      };
    const w = t[m] - y, x = f + u(w, 0);
    return {
      index: m,
      distance: x
    };
  }
  return {
    byDistance: d,
    byIndex: h,
    shortcut: u
  };
}
function Fa(n2, t, e, i, r, s, o) {
  function l(h) {
    const d = h.distance, v = h.index !== t.get();
    s.add(d), d && (i.duration() ? n2.start() : (n2.update(), n2.render(1), n2.update())), v && (e.set(t.get()), t.set(h.index), o.emit("select"));
  }
  function a(h, d) {
    const v = r.byDistance(h, d);
    l(v);
  }
  function c(h, d) {
    const v = t.clone().set(h), f = r.byIndex(v.get(), d);
    l(f);
  }
  return {
    distance: a,
    index: c
  };
}
function qa(n2, t, e, i, r, s, o, l) {
  const a = {
    passive: true,
    capture: true
  };
  let c = 0;
  function u(v) {
    if (!l)
      return;
    function f(p) {
      if ((/* @__PURE__ */ new Date()).getTime() - c > 10)
        return;
      o.emit("slideFocusStart"), n2.scrollLeft = 0;
      const y = e.findIndex((g) => g.includes(p));
      yn(y) && (r.useDuration(0), i.index(y, 0), o.emit("slideFocus"));
    }
    s.add(document, "keydown", h, false), t.forEach((p, b) => {
      s.add(p, "focus", (m) => {
        (xe(l) || l(v, m)) && f(b);
      }, a);
    });
  }
  function h(v) {
    v.code === "Tab" && (c = (/* @__PURE__ */ new Date()).getTime());
  }
  return {
    init: u
  };
}
function Gt(n2) {
  let t = n2;
  function e() {
    return t;
  }
  function i(a) {
    t = o(a);
  }
  function r(a) {
    t += o(a);
  }
  function s(a) {
    t -= o(a);
  }
  function o(a) {
    return yn(a) ? a : a.get();
  }
  return {
    get: e,
    set: i,
    add: r,
    subtract: s
  };
}
function fr(n2, t) {
  const e = n2.scroll === "x" ? o : l, i = t.style;
  let r = null, s = false;
  function o(d) {
    return `translate3d(${d}px,0px,0px)`;
  }
  function l(d) {
    return `translate3d(0px,${d}px,0px)`;
  }
  function a(d) {
    if (s)
      return;
    const v = ba(n2.direction(d));
    v !== r && (i.transform = e(v), r = v);
  }
  function c(d) {
    s = !d;
  }
  function u() {
    s || (i.transform = "", t.getAttribute("style") || t.removeAttribute("style"));
  }
  return {
    clear: u,
    to: a,
    toggleActive: c
  };
}
function ja(n2, t, e, i, r, s, o, l, a) {
  const u = te(r), h = te(r).reverse(), d = m().concat(y());
  function v(E, T) {
    return E.reduce((A, C) => A - r[C], T);
  }
  function f(E, T) {
    return E.reduce((A, C) => v(A, T) > 0 ? A.concat([C]) : A, []);
  }
  function p(E) {
    return s.map((T, A) => ({
      start: T - i[A] + 0.5 + E,
      end: T + t - 0.5 + E
    }));
  }
  function b(E, T, A) {
    const C = p(T);
    return E.map((L) => {
      const I = A ? 0 : -e, P = A ? e : 0, _ = A ? "end" : "start", $ = C[L][_];
      return {
        index: L,
        loopPoint: $,
        slideLocation: Gt(-1),
        translate: fr(n2, a[L]),
        target: () => l.get() > $ ? I : P
      };
    });
  }
  function m() {
    const E = o[0], T = f(h, E);
    return b(T, e, false);
  }
  function y() {
    const E = t - o[0] - 1, T = f(u, E);
    return b(T, -e, true);
  }
  function g() {
    return d.every(({
      index: E
    }) => {
      const T = u.filter((A) => A !== E);
      return v(T, t) <= 0.1;
    });
  }
  function w() {
    d.forEach((E) => {
      const {
        target: T,
        translate: A,
        slideLocation: C
      } = E, L = T();
      L !== C.get() && (A.to(L), C.set(L));
    });
  }
  function x() {
    d.forEach((E) => E.translate.clear());
  }
  return {
    canLoop: g,
    clear: x,
    loop: w,
    loopPoints: d
  };
}
function za(n2, t, e) {
  let i, r = false;
  function s(a) {
    if (!e)
      return;
    function c(u) {
      for (const h of u)
        if (h.type === "childList") {
          a.reInit(), t.emit("slidesChanged");
          break;
        }
    }
    i = new MutationObserver((u) => {
      r || (xe(e) || e(a, u)) && c(u);
    }), i.observe(n2, {
      childList: true
    });
  }
  function o() {
    i && i.disconnect(), r = true;
  }
  return {
    init: s,
    destroy: o
  };
}
function Na(n2, t, e, i) {
  const r = {};
  let s = null, o = null, l, a = false;
  function c() {
    l = new IntersectionObserver((f) => {
      a || (f.forEach((p) => {
        const b = t.indexOf(p.target);
        r[b] = p;
      }), s = null, o = null, e.emit("slidesInView"));
    }, {
      root: n2.parentElement,
      threshold: i
    }), t.forEach((f) => l.observe(f));
  }
  function u() {
    l && l.disconnect(), a = true;
  }
  function h(f) {
    return ee(r).reduce((p, b) => {
      const m = parseInt(b), {
        isIntersecting: y
      } = r[m];
      return (f && y || !f && !y) && p.push(m), p;
    }, []);
  }
  function d(f = true) {
    if (f && s)
      return s;
    if (!f && o)
      return o;
    const p = h(f);
    return f && (s = p), f || (o = p), p;
  }
  return {
    init: c,
    destroy: u,
    get: d
  };
}
function Ha(n2, t, e, i, r, s) {
  const {
    measureSize: o,
    startEdge: l,
    endEdge: a
  } = n2, c = e[0] && r, u = f(), h = p(), d = e.map(o), v = b();
  function f() {
    if (!c)
      return 0;
    const y = e[0];
    return N(t[l] - y[l]);
  }
  function p() {
    if (!c)
      return 0;
    const y = s.getComputedStyle(it(i));
    return parseFloat(y.getPropertyValue(`margin-${a}`));
  }
  function b() {
    return e.map((y, g, w) => {
      const x = !g, S = wn(w, g);
      return x ? d[g] + u : S ? d[g] + h : w[g + 1][l] - y[l];
    }).map(N);
  }
  return {
    slideSizes: d,
    slideSizesWithGaps: v,
    startGap: u,
    endGap: h
  };
}
function Va(n2, t, e, i, r, s, o, l, a) {
  const {
    startEdge: c,
    endEdge: u,
    direction: h
  } = n2, d = yn(e);
  function v(m, y) {
    return te(m).filter((g) => g % y === 0).map((g) => m.slice(g, g + y));
  }
  function f(m) {
    return m.length ? te(m).reduce((y, g, w) => {
      const x = it(y) || 0, S = x === 0, E = g === se(m), T = r[c] - s[x][c], A = r[c] - s[g][u], C = !i && S ? h(o) : 0, L = !i && E ? h(l) : 0, I = N(A - L - (T + C));
      return w && I > t + a && y.push(g), E && y.push(m.length), y;
    }, []).map((y, g, w) => {
      const x = Math.max(w[g - 1] || 0);
      return m.slice(x, y);
    }) : [];
  }
  function p(m) {
    return d ? v(m, e) : f(m);
  }
  return {
    groupSlides: p
  };
}
function Ba(n2, t, e, i, r, s, o) {
  const {
    align: l,
    axis: a,
    direction: c,
    startIndex: u,
    loop: h,
    duration: d,
    dragFree: v,
    dragThreshold: f,
    inViewThreshold: p,
    slidesToScroll: b,
    skipSnaps: m,
    containScroll: y,
    watchResize: g,
    watchSlides: w,
    watchDrag: x,
    watchFocus: S
  } = s, E = 2, T = Ta(), A = T.measure(t), C = e.map(T.measure), L = Ea(a, c), I = L.measureSize(A), P = Aa(I), _ = wa(l, I), $ = !h && !!y, B = h || !!y, {
    slideSizes: j,
    slideSizesWithGaps: R,
    startGap: M,
    endGap: H
  } = Ha(L, A, C, e, B, r), U = Va(L, I, b, h, A, C, M, H, E), {
    snaps: Q,
    snapsAligned: W
  } = $a(L, _, A, C, U), tt = -it(Q) + it(R), {
    snapsContained: dt,
    scrollContainLimit: xt
  } = Oa(I, tt, W, y, E), Z = $ ? dt : W, {
    limit: G
  } = _a(tt, Z, h), ft = dr(se(Z), u, h), et = ft.clone(), z = te(e), k = ({
    dragHandler: Rt,
    scrollBody: ke,
    scrollBounds: Oe,
    options: {
      loop: ae
    }
  }) => {
    ae || Oe.constrain(Rt.pointerDown()), ke.seek();
  }, F = ({
    scrollBody: Rt,
    translate: ke,
    location: Oe,
    offsetLocation: ae,
    previousLocation: _r,
    scrollLooper: Pr,
    slideLooper: Mr,
    dragHandler: $r,
    animation: Rr,
    eventHandler: _n,
    scrollBounds: Dr,
    options: {
      loop: Pn
    }
  }, Mn) => {
    const $n = Rt.settled(), Fr = !Dr.shouldConstrain(), Rn = Pn ? $n : $n && Fr, Dn = Rn && !$r.pointerDown();
    Dn && Rr.stop();
    const qr = Oe.get() * Mn + _r.get() * (1 - Mn);
    ae.set(qr), Pn && (Pr.loop(Rt.direction()), Mr.loop()), ke.to(ae.get()), Dn && _n.emit("settle"), Rn || _n.emit("scroll");
  }, V = Sa(i, r, () => k(Ie), (Rt) => F(Ie, Rt)), K = 0.68, st = Z[ft.get()], pt = Gt(st), Tt = Gt(st), vt = Gt(st), At = Gt(st), Vt = Ia(pt, vt, Tt, At, d, K), Ae = Da(h, Z, tt, G, At), Le = Fa(V, ft, et, Vt, Ae, At, o), In = Ma(G), kn = ne(), kr = Na(t, e, o, p), {
    slideRegistry: On
  } = Ra($, y, Z, xt, U, z), Or = qa(n2, e, On, Le, Vt, kn, o, S), Ie = {
    ownerDocument: i,
    ownerWindow: r,
    eventHandler: o,
    containerRect: A,
    slideRects: C,
    animation: V,
    axis: L,
    dragHandler: Ca(L, n2, i, r, At, xa(L, r), pt, V, Le, Vt, Ae, ft, o, P, v, f, m, K, x),
    eventStore: kn,
    percentOfView: P,
    index: ft,
    indexPrevious: et,
    limit: G,
    location: pt,
    offsetLocation: vt,
    previousLocation: Tt,
    options: s,
    resizeHandler: La(t, o, r, e, L, g, T),
    scrollBody: Vt,
    scrollBounds: ka(G, vt, At, Vt, P),
    scrollLooper: Pa(tt, G, vt, [pt, vt, Tt, At]),
    scrollProgress: In,
    scrollSnapList: Z.map(In.get),
    scrollSnaps: Z,
    scrollTarget: Ae,
    scrollTo: Le,
    slideLooper: ja(L, I, tt, j, R, Q, Z, vt, e),
    slideFocus: Or,
    slidesHandler: za(t, o, w),
    slidesInView: kr,
    slideIndexes: z,
    slideRegistry: On,
    slidesToScroll: U,
    target: At,
    translate: fr(L, t)
  };
  return Ie;
}
function Ua() {
  let n2 = {}, t;
  function e(c) {
    t = c;
  }
  function i(c) {
    return n2[c] || [];
  }
  function r(c) {
    return i(c).forEach((u) => u(t, c)), a;
  }
  function s(c, u) {
    return n2[c] = i(c).concat([u]), a;
  }
  function o(c, u) {
    return n2[c] = i(c).filter((h) => h !== u), a;
  }
  function l() {
    n2 = {};
  }
  const a = {
    init: e,
    emit: r,
    off: o,
    on: s,
    clear: l
  };
  return a;
}
var Wa = {
  align: "center",
  axis: "x",
  container: null,
  slides: null,
  containScroll: "trimSnaps",
  direction: "ltr",
  slidesToScroll: 1,
  inViewThreshold: 0,
  breakpoints: {},
  dragFree: false,
  dragThreshold: 10,
  loop: false,
  skipSnaps: false,
  duration: 25,
  startIndex: 0,
  active: true,
  watchDrag: true,
  watchResize: true,
  watchSlides: true,
  watchFocus: true
};
function Ga(n2) {
  function t(s, o) {
    return hr(s, o || {});
  }
  function e(s) {
    const o = s.breakpoints || {}, l = ee(o).filter((a) => n2.matchMedia(a).matches).map((a) => o[a]).reduce((a, c) => t(a, c), {});
    return t(s, l);
  }
  function i(s) {
    return s.map((o) => ee(o.breakpoints || {})).reduce((o, l) => o.concat(l), []).map(n2.matchMedia);
  }
  return {
    mergeOptions: t,
    optionsAtMedia: e,
    optionsMediaQueries: i
  };
}
function Ka(n2) {
  let t = [];
  function e(s, o) {
    return t = o.filter(({
      options: l
    }) => n2.optionsAtMedia(l).active !== false), t.forEach((l) => l.init(s, n2)), o.reduce((l, a) => Object.assign(l, {
      [a.name]: a
    }), {});
  }
  function i() {
    t = t.filter((s) => s.destroy());
  }
  return {
    init: e,
    destroy: i
  };
}
function Sn(n2, t, e) {
  const i = n2.ownerDocument, r = i.defaultView, s = Ga(r), o = Ka(s), l = ne(), a = Ua(), {
    mergeOptions: c,
    optionsAtMedia: u,
    optionsMediaQueries: h
  } = s, {
    on: d,
    off: v,
    emit: f
  } = a, p = L;
  let b = false, m, y = c(Wa, Sn.globalOptions), g = c(y), w = [], x, S, E;
  function T() {
    const {
      container: z,
      slides: k
    } = g;
    S = (Ue(z) ? n2.querySelector(z) : z) || n2.children[0];
    const V = Ue(k) ? S.querySelectorAll(k) : k;
    E = [].slice.call(V || S.children);
  }
  function A(z) {
    const k = Ba(n2, S, E, i, r, z, a);
    if (z.loop && !k.slideLooper.canLoop()) {
      const F = Object.assign({}, z, {
        loop: false
      });
      return A(F);
    }
    return k;
  }
  function C(z, k) {
    b || (y = c(y, z), g = u(y), w = k || w, T(), m = A(g), h([y, ...w.map(({
      options: F
    }) => F)]).forEach((F) => l.add(F, "change", L)), g.active && (m.translate.to(m.location.get()), m.animation.init(), m.slidesInView.init(), m.slideFocus.init(et), m.eventHandler.init(et), m.resizeHandler.init(et), m.slidesHandler.init(et), m.options.loop && m.slideLooper.loop(), S.offsetParent && E.length && m.dragHandler.init(et), x = o.init(et, w)));
  }
  function L(z, k) {
    const F = U();
    I(), C(c({
      startIndex: F
    }, z), k), a.emit("reInit");
  }
  function I() {
    m.dragHandler.destroy(), m.eventStore.clear(), m.translate.clear(), m.slideLooper.clear(), m.resizeHandler.destroy(), m.slidesHandler.destroy(), m.slidesInView.destroy(), m.animation.destroy(), o.destroy(), l.clear();
  }
  function P() {
    b || (b = true, l.clear(), I(), a.emit("destroy"), a.clear());
  }
  function _(z, k, F) {
    !g.active || b || (m.scrollBody.useBaseFriction().useDuration(k === true ? 0 : g.duration), m.scrollTo.index(z, F || 0));
  }
  function $(z) {
    const k = m.index.add(1).get();
    _(k, z, -1);
  }
  function B(z) {
    const k = m.index.add(-1).get();
    _(k, z, 1);
  }
  function j() {
    return m.index.add(1).get() !== U();
  }
  function R() {
    return m.index.add(-1).get() !== U();
  }
  function M() {
    return m.scrollSnapList;
  }
  function H() {
    return m.scrollProgress.get(m.offsetLocation.get());
  }
  function U() {
    return m.index.get();
  }
  function Q() {
    return m.indexPrevious.get();
  }
  function W() {
    return m.slidesInView.get();
  }
  function tt() {
    return m.slidesInView.get(false);
  }
  function dt() {
    return x;
  }
  function xt() {
    return m;
  }
  function Z() {
    return n2;
  }
  function G() {
    return S;
  }
  function ft() {
    return E;
  }
  const et = {
    canScrollNext: j,
    canScrollPrev: R,
    containerNode: G,
    internalEngine: xt,
    destroy: P,
    off: v,
    on: d,
    emit: f,
    plugins: dt,
    previousScrollSnap: Q,
    reInit: p,
    rootNode: Z,
    scrollNext: $,
    scrollPrev: B,
    scrollProgress: H,
    scrollSnapList: M,
    scrollTo: _,
    selectedScrollSnap: U,
    slideNodes: ft,
    slidesInView: W,
    slidesNotInView: tt
  };
  return C(t, e), setTimeout(() => a.emit("init"), 0), et;
}
Sn.globalOptions = void 0;
var Ya = {
  active: true,
  breakpoints: {},
  snapped: "is-snapped",
  inView: "is-in-view",
  draggable: "is-draggable",
  dragging: "is-dragging",
  loop: "is-loop"
};
function Ut(n2) {
  return (Array.isArray(n2) ? n2 : [n2]).filter(Boolean);
}
function Wt(n2, t) {
  !n2 || !t.length || n2.classList.remove(...t);
}
function ce(n2, t) {
  !n2 || !t.length || n2.classList.add(...t);
}
function En(n2 = {}) {
  let t, e, i, r, s = [], o = [];
  const l = ["select"], a = ["pointerDown", "pointerUp"], c = ["slidesInView"], u = {
    snapped: [],
    inView: [],
    draggable: [],
    dragging: [],
    loop: []
  };
  function h(y, g) {
    e = y;
    const {
      mergeOptions: w,
      optionsAtMedia: x
    } = g, S = w(Ya, En.globalOptions), E = w(S, n2);
    t = x(E), i = e.rootNode(), r = e.slideNodes();
    const {
      watchDrag: T,
      loop: A
    } = e.internalEngine().options, C = !!T;
    t.loop && A && (u.loop = Ut(t.loop), ce(i, u.loop)), t.draggable && C && (u.draggable = Ut(t.draggable), ce(i, u.draggable)), t.dragging && (u.dragging = Ut(t.dragging), a.forEach((L) => e.on(L, v))), t.snapped && (u.snapped = Ut(t.snapped), l.forEach((L) => e.on(L, p)), p()), t.inView && (u.inView = Ut(t.inView), c.forEach((L) => e.on(L, b)), b());
  }
  function d() {
    a.forEach((y) => e.off(y, v)), l.forEach((y) => e.off(y, p)), c.forEach((y) => e.off(y, b)), Wt(i, u.loop), Wt(i, u.draggable), Wt(i, u.dragging), f([], s, u.snapped), f([], o, u.inView), Object.keys(u).forEach((y) => {
      const g = y;
      u[g] = [];
    });
  }
  function v(y, g) {
    (g === "pointerDown" ? ce : Wt)(i, u.dragging);
  }
  function f(y = [], g = [], w) {
    const x = g.map((E) => r[E]), S = y.map((E) => r[E]);
    return x.forEach((E) => Wt(E, w)), S.forEach((E) => ce(E, w)), y;
  }
  function p() {
    const {
      slideRegistry: y
    } = e.internalEngine(), g = y[e.selectedScrollSnap()];
    s = f(g, s, u.snapped);
  }
  function b() {
    const y = e.slidesInView();
    o = f(y, o, u.inView);
  }
  return {
    name: "classNames",
    options: n2,
    init: h,
    destroy: d
  };
}
En.globalOptions = void 0;
var Xa = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: {}
    };
    const [e] = this.$("viewport"), i = e || this.el;
    this.options = this.setOptions();
    const r = this.setPlugins();
    this.slider = Sn(i, this.options, r), this.slider.on("resize", this.onSliderResize.bind(this)), this.setControls(), this.setDots(), this.setOnScroll(), this.setOnSelect(), this.setProgress(), this.setWatchDrag(), this.onSliderResize();
  }
  reInit(t = {}) {
    this.slider.reInit(t);
  }
  setOptions() {
    const t = {
      loop: false,
      controls: false,
      dots: false,
      align: "start",
      autoplay: false,
      direction: "ltr",
      startIndex: 0,
      skipSnaps: false,
      watchSlides: false,
      watchDrag: true,
      onScroll: null,
      containScroll: "trimSnaps",
      inViewThreshold: 0.5,
      classes: true,
      breakpoints: {}
    };
    try {
      const e = JSON.parse(this.el.dataset.config);
      return this.el.removeAttribute("data-config"), Object.assign(t, e);
    } catch {
      return t;
    }
  }
  setPlugins() {
    const t = [];
    return this.options.autoplay && t.push(Autoplay({
      delay: Number(this.options.autoplay) * 1e3,
      stopOnInteraction: true
    })), this.options.classes && t.push(En({
      selected: "-inView",
      draggabble: "-draggable",
      dragging: "-dragging"
    })), t;
  }
  onSliderResize() {
    const t = this.slider.internalEngine().scrollSnaps.length > 1;
    this.el.classList[t ? "remove" : "add"]("-fixed"), this.slider.reInit({
      active: t,
      align: t ? this.options.align : "center",
      controls: t ? this.options.controls : false,
      progress: t ? this.options.progress : false
    });
  }
  setWatchDrag() {
    if (!this.options.watchDrag)
      return;
    const t = this.onDrag.bind(this);
    this.slider.on("select", t);
  }
  onDrag() {
  }
  setOnScroll() {
    if (!this.options.onScroll)
      return;
    const t = Un(this[this.options.onScroll].bind(this), 50);
    this.slider.on("scroll", t).on("select", t), t();
  }
  setOnSelect() {
    if (!this.options.onSelect)
      return;
    const t = Un(this[this.options.onSelect].bind(this), 50);
    this.slider.on("select", t);
  }
  setControls() {
    if (!this.options.controls)
      return;
    const t = this.disablePrevAndNextBtns.bind(this);
    this.slider.on("select", t).on("init", t), this.events.click.nextBtn = "scrollNext", this.events.click.prevBtn = "scrollPrev", this.scrollNext = this.slider.scrollNext, this.scrollPrev = this.slider.scrollPrev;
  }
  setDots() {
    if (!this.options.dots)
      return;
    const t = this.setSelectedDotBtn.bind(this);
    this.slider.on("select", t).on("init", t), this.events.click.dot = "selectDotBtn", this.generateDotBtns();
  }
  generateDotBtns() {
    const t = document.querySelector("#dotTemplate").innerHTML, [e] = this.$("dotsContainer"), i = this.slider.scrollSnapList().reduce((r, s, o) => {
      const l = t.replace("{index}", `data-index="${o}"`);
      return r + l;
    }, "");
    e.innerHTML = i;
  }
  selectDotBtn(t) {
    const e = Number(t.currentTarget.dataset.index);
    this.slider.scrollTo(e);
  }
  setSelectedDotBtn() {
    const t = this.slider.previousScrollSnap(), e = this.slider.selectedScrollSnap(), i = this.$("dot");
    i[t].classList.remove("-active"), i[e].classList.add("-active");
  }
  disablePrevAndNextBtns() {
    const t = this.$("prevBtn"), e = this.$("nextBtn");
    this.slider.canScrollPrev() ? t[0].removeAttribute("disabled") : t[0].setAttribute("disabled", "disabled"), this.slider.canScrollNext() ? e[0].removeAttribute("disabled") : e[0].setAttribute("disabled", "disabled");
  }
  setProgress() {
    if (!this.options.progress)
      return;
    const [t] = this.$("bar");
    this.progress = t;
    const e = this.applyProgress.bind(this), i = this.slider.scrollSnapList();
    this.deltaProgress = 1 / i.length, this.slider.on("init", e).on("reInit", e).on("scroll", e);
  }
  applyProgress() {
    const {
      deltaProgress: t
    } = this, e = Math.max(0, Math.min(1, this.slider.scrollProgress() * (1 - t) + t));
    this.progress.style.transform = `translate3d(${e * 100}%,0px,0px)`;
  }
  onScroll() {
  }
  updateCarouselImage() {
    const t = this.slider.selectedScrollSnap(), i = this.$("image")[t];
    i && this.call("loadImage", {
      item: i,
      config: {}
    }, "Website", "website");
  }
};
var Ja = class extends D {
  constructor(t) {
    super(t), this.open = this.change.bind(this, true), this.close = this.change.bind(this, false), this.raf = null, this.state = this.el.classList.contains("-open"), this.events = {
      click: {
        button: "toggle"
      }
    };
  }
  toggle(t) {
    t.preventDefault(), t.target.blur(), this.change(!this.state);
  }
  change(t) {
    if (this.state === t)
      return;
    this.state = t;
    let e = 0;
    const [i] = this.$("button");
    window.cancelAnimationFrame(this.raf);
    const [r] = this.$("content");
    t && (e = r.scrollHeight), this.raf = window.requestAnimationFrame(() => {
      e && this.el.style.setProperty("--height", `${r.scrollHeight}px`), i.setAttribute("aria-expanded", this.state), this.el.classList.toggle("-open", this.state);
    });
  }
};
var Cn = class extends D {
  constructor(t) {
    super(t), this.errors = {}, this.state = false, this.containerScroll = window, this.loading = false, this.timeouts = [], this.interval = null, this.events = {
      click: {
        submit: "onSearch"
      }
    };
  }
  init() {
    setTimeout(() => {
      const t = this.el.dataset.status;
      t && (this.setCallback(t, true, 1500), this.el.removeAttribute("data-status"));
    }, 2e3);
  }
  onSearch(t) {
    if (this.disabledSubmit) {
      t.preventDefault();
      return;
    }
    this.el.checkValidity() && (this.disabledSubmit = true, window.requestAnimationFrame(() => {
      this.clearCallbacks(), t.currentTarget.setAttribute("aria-disabled", "true");
    }), t.currentTarget.blur(), t.preventDefault(), this.sendForm(this.el));
  }
  sendForm(t) {
    this.cleanErrors(), window.requestAnimationFrame(() => {
      this.el.classList.add("-loading");
    }), this.loading = true, this.state = null, fetch(t.action, {
      method: "POST",
      responseType: "json",
      body: new FormData(this.el),
      headers: {
        "Cache-Control": "no-cache",
        "X-Requested-With": "post"
      }
    }).then(async (e) => {
      const i = await e.json();
      this.formSent(i);
    }).catch((e) => {
      console.log(e), this.errorForm(e);
    });
  }
  setCallback(t, e, i = 15e3) {
    const r = document.createElement("div");
    r.setAttribute("class", "m-formCallback"), r.innerHTML = `<p class="tx-ps">${t}</p>`, e ? (this.resetInput(), r.classList.add("-success")) : r.classList.add("-error"), window.requestAnimationFrame(() => {
      this.el.appendChild(r), this.el.classList.remove("-loading");
    }), r.addEventListener("click", this.clearCallback.bind(this, r)), this.timeouts.push({
      el: r,
      timeout: setTimeout(this.clearCallback.bind(this, r), i)
    });
  }
  clearCallback(t) {
    const e = this.timeouts.findIndex((r) => r.el === t);
    if (e === -1)
      return;
    const i = this.timeouts[e];
    clearTimeout(i.timeout), window.requestAnimationFrame(() => {
      i.el.classList.add("-leave");
    }), setTimeout(() => {
      window.requestAnimationFrame(() => {
        i.el.remove();
      });
    }, 700), this.timeouts.splice(e, 1);
  }
  clearCallbacks() {
    this.timeouts.forEach((t) => {
      clearTimeout(t.timeout), window.requestAnimationFrame(() => {
        t.el.remove();
      });
    }), this.timeouts = [];
  }
  cleanErrors() {
    const t = this.$("invalid");
    window.requestAnimationFrame(() => {
      t.forEach((e) => {
        e.parentNode.classList.remove("-error"), e.remove();
      });
    });
  }
  formSent(t) {
    if (t.invalid && Object.keys(t.invalid).length > 0) {
      console.log(t, t.invalid, t.sent), this.errorForm(t);
      return;
    }
    this.state = true, this.setCallback(t.message, t.sent, 4500), this.afterSuccess(t), this.enableForm();
  }
  errorForm(t) {
    this.setCallback(t.message, t.success, 1500), this.state = false, this.afterError(), this.enableForm(), t.invalid && Object.keys(t.invalid).length > 0 && this.setErrors(t.invalid);
  }
  setErrors(t) {
    this.errors = t, Array.from(Object.entries(t)).forEach(([i, r]) => {
      const s = this.$(i)[0];
      if (s) {
        const o = document.createElement("p");
        o.innerHTML = r, s.classList.add("-error"), o.setAttribute("class", "a-pxsmall a-inputField__error"), o.setAttribute(this.mAttr, "invalid"), window.requestAnimationFrame(() => {
          s.append(o);
        });
      }
    });
  }
  enableForm() {
    window.requestAnimationFrame(() => {
      this.$("submit")[0].removeAttribute("aria-disabled", "false");
    }), this.disabledSubmit = false;
  }
  resetInput() {
    this.el.querySelectorAll("input, textarea, select").forEach((e) => {
      if (e.type !== "hidden") {
        if (e.type === "radio" || e.type === "checkbox") {
          e.checked = false;
          return;
        }
        e.value = "";
      }
    });
  }
  afterSuccess() {
  }
  afterError() {
  }
};
var Qa = class extends D {
  constructor(t) {
    super(t), this.visible = false, this.config = {
      disableScroll: true
    }, this.activeElement = null, this.open = this.change.bind(this, true), this.close = this.change.bind(this, false), this.onClick = this.onClick.bind(this), this.onKeyDown = this.onKeyDown.bind(this);
  }
  scrollBehaviour(t) {
    this.config.disableScroll && Object.assign(Zt.style, {
      overflow: t ? "hidden" : ""
    });
  }
  toggleEvents(t) {
    const e = t ? "add" : "remove";
    this.el[`${e}EventListener`]("touchstart", this.onClick), this.el[`${e}EventListener`]("click", this.onClick), document[`${e}EventListener`]("keydown", this.onKeyDown);
  }
  onClick(t) {
    const {
      target: e
    } = t, {
      action: i
    } = e.dataset;
    this[i] && (this[i](), e.blur(), t.preventDefault(), t.stopPropagation());
  }
  onKeyDown(t) {
    if (t.keyCode === 27) {
      this.close();
      return;
    }
    t.keyCode === 9 && this.retainFocus(t);
  }
  getFocusableNodes() {
    const t = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", 'button:not([disabled]):not([aria-hidden]):not([aria-disabled="true"])', "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'], e = this.el.querySelectorAll(t);
    return Array(...e);
  }
  retainFocus(t) {
    let e = this.getFocusableNodes();
    if (e.length !== 0)
      if (e = e.filter((i) => i.offsetParent !== null), !this.el.contains(document.activeElement))
        e[0].focus();
      else {
        const i = e.indexOf(document.activeElement);
        t.shiftKey && i === 0 && (e[e.length - 1].focus(), t.preventDefault()), !t.shiftKey && e.length > 0 && i === e.length - 1 && (e[0].focus(), t.preventDefault());
      }
  }
  setFocusToFirstNode() {
    const t = this.getFocusableNodes();
    if (t.length === 0)
      return;
    const e = t.filter((i) => i.dataset.action !== "close");
    if (e.length > 0) {
      e[0].focus();
      return;
    }
    t[0].focus();
  }
  destroy() {
    this.el.remove();
  }
  toggle() {
    this.change(!this.state);
  }
  change(t) {
    if (this.visible === t)
      return;
    this.visible = t, this.scrollBehaviour(t), this.toggleEvents(t), this.el.setAttribute("aria-hidden", !t);
    let e = () => {
    };
    t ? (this.el.classList.add("-isOpen"), this.activeElement = document.activeElement, e = () => {
      this.el.removeEventListener("animationend", e, false), this.setFocusToFirstNode(), this.afterChange(true);
    }) : e = () => {
      this.el.removeEventListener("animationend", e, false), this.el.classList.remove("-isOpen"), this.activeElement && this.activeElement.focus && this.activeElement.focus(), this.el.getAttribute("data-module-popin") === "contact" && this.call("onClose", null, "FormSteps", null), this.afterChange(false);
    }, this.el.addEventListener("animationend", e, false);
  }
  afterChange() {
  }
};
var Za = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: "onClick"
    };
  }
  onClick() {
    const t = this.el.dataset.action.split(","), e = {
      el: this.el
    };
    this.call(t[0], e, t[1], t[2]);
  }
};
var tl = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: "onClick",
      change: {
        region: "onChangeRegion",
        department: "onChangeDepartment"
      },
      submit: {
        form: "onSubmit"
      }
    };
  }
  init() {
    try {
      this.regions = JSON.parse(this.el.dataset.regions || "[]");
    } catch (t) {
      this.regions = [], console.warn("Error parsing regions data:", t);
    }
    this.onChangeRegion({
      target: this.$("region")[0] || {
        value: ""
      }
    });
  }
  onChangeRegion(t) {
    const [e] = this.$("department"), i = e.querySelectorAll("option"), r = this.regions.find((s) => s.id === t.target.value);
    if (!r) {
      e.value = "", i.forEach((s) => {
        s.style.display = "block";
      });
      return;
    }
    i.forEach((s) => {
      if (s.value === "") {
        s.style.display = "block";
        return;
      }
      s.style.display = r.departments.includes(Number(s.value)) ? "block" : "none";
    }), r.departments.includes(Number(e.value)) || (e.value = "");
  }
  onChangeDepartment(t) {
    const e = Number(t.target.value), i = this.regions.find((s) => s.departments.includes(e)), [r] = this.$("region");
    if (r.querySelectorAll("option"), !i) {
      r.value = "", this.onChangeRegion({
        target: r
      });
      return;
    }
    r.value = i.id, this.onChangeRegion({
      target: r
    });
  }
  onClick(t) {
    const {
      target: e
    } = t, {
      action: i
    } = e.dataset;
    i && this[i] && this[i](e);
  }
  editForm() {
    this.el.classList.add("-form");
  }
  resetForm() {
    this.resetInputs(), this.el.classList.add("-form");
  }
  resetInputs() {
    this.el.querySelectorAll("input, textarea, select").forEach((e) => {
      if (e.type !== "hidden") {
        if (e.type === "radio" || e.type === "checkbox") {
          e.checked = false;
          return;
        }
        e.value = "";
      }
    });
  }
  getAction(t, e) {
    const i = new URLSearchParams(e).toString();
    return i ? `${t}?${i}` : t;
  }
  onSubmit(t) {
    t.preventDefault();
    const e = t.target, i = new FormData(e), r = this.getAction(e.action, i);
    this.call("update", {
      url: r,
      formData: i
    }, "AdsListing", "ajaxContentAds");
  }
  updateData(t) {
    const [e] = this.$("tagsEl");
    let i = "";
    t.tags && t.tags.length && (i = t.tags.map((r) => `<li class="a-tag -bgprimary -clrwhite tx-ps -tx600">${r}</li>`).join("")), e.innerHTML = i, this.el.classList.remove("-form");
  }
};
var el = class extends D {
  constructor(t) {
    super(t), this.updating = false, this.events = {
      click: {
        submit: "onSubmit"
      }
    };
  }
  getAction(t) {
    return t;
  }
  validateForm() {
    return true;
  }
  onSubmit(t) {
    t.preventDefault(), this.updateBase();
  }
  updateBase() {
    const [t] = this.$("form"), e = new FormData(t), i = this.getAction(t.action, e);
    this.update({
      url: i,
      formData: e
    });
  }
  update({
    url: t,
    formData: e
  }) {
    if (!this.updating) {
      if (this.updating = true, e && !this.validateForm(t, e)) {
        this.updating = false;
        return;
      }
      this.onUpdate(), this.updateUrl(t), fetch(t, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "fetch"
        }
      }).then(this.afterUpdate.bind(this)).catch(this.onError.bind(this));
    }
  }
  async afterUpdate(t) {
    await t.json(), this.updating = false;
  }
  onError(t) {
    console.log(t);
  }
  onUpdate() {
  }
  updateUrl(t) {
    const e = t.replace(".json", "");
    this.call("updateHistory", {
      url: e,
      action: "push"
    }, "Website", "website");
  }
};
var nl = class extends el {
  constructor(t) {
    super(t), this.data = {}, this.rafs = {
      content: null,
      errors: null,
      loading: null
    }, this.offset = 110, this.timeout = null, this.events = {
      click: {
        submit: "onSubmit",
        content: "onClick"
      }
    };
  }
  validateForm(t) {
    const e = this.data[t];
    return this.contentId = t, e ? (this.updateContent(e), this.updateUrl(t), this.onComplete(e), false) : true;
  }
  async afterUpdate(t) {
    if (t.status !== 200) {
      this.updating = false, this.onError("Une erreur est survenue, veuillez r\xE9essayer");
      return;
    }
    try {
      const e = await t.json();
      clearTimeout(this.timeout), this.updating = false, this.updateContent(e), this.onComplete(e);
    } catch {
      clearTimeout(this.timeout), this.updating = false, this.onError("Une erreur est survenue, veuillez r\xE9essayer");
    }
  }
  updateContent(t) {
    const e = this.$("content");
    this.data[this.contentId] = t, window.cancelAnimationFrame(this.rafs.content), this.rafs.content = window.requestAnimationFrame(() => {
      e.forEach((i) => {
        i.style.removeProperty("min-height"), this.call("destroy", i, "app"), i.innerHTML = t[i.dataset.content], this.call("update", i, "app"), this.call("enterPage", i, "Scroll", "scroll");
      }), this.call("updateLazy", null, "Website", "website"), this.handleUpdate(t), this.rafs.content = window.requestAnimationFrame(() => {
        this.replaceScroll();
      });
    });
  }
  replaceScroll(t = "smooth") {
    const e = this.el.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + e.top - this.offset,
      behavior: t
    });
  }
  onError(t = "Aucun r\xE9sultat") {
    const e = this.$("content");
    window.cancelAnimationFrame(this.rafs.errors), this.rafs.errors = window.requestAnimationFrame(() => {
      e.forEach((i) => {
        i.style.removeProperty("min-height"), i.innerHTML = `<h3 class="o-adsListing__full o-adsListing__label tx-m my-sm lg-my-md">${t}</h3>`;
      });
    });
  }
  onUpdate() {
    this.timeout = setTimeout(() => {
      window.cancelAnimationFrame(this.rafs.loading);
      const t = this.$("content"), e = `
        <div class="m-loaderSection o-adsListing__full my-sm lg-my-md">
          <div class="m-loaderSection__loader" aria-hidden="true"></div>
        </div>
      `;
      this.rafs.loading = window.requestAnimationFrame(() => {
        this.replaceScroll("instant"), t.forEach((i) => {
          i.style.setProperty("min-height", `${i.offsetHeight}px`, "important"), i.innerHTML = e;
        });
      });
    }, 300);
  }
  onClick(t) {
    const {
      target: e
    } = t;
    this.constructor.isValidPaginationTarget(e) && this.onClickPagination(e, t);
  }
  onClickPagination(t, e) {
    const i = this.constructor.setPaginationUrl(t.href), r = this.data[i];
    if (e.preventDefault(), this.contentId = i, r) {
      this.updateContent(r), this.updateUrl(i), this.onComplete(r);
      return;
    }
    const [s] = this.$("form");
    if (s) {
      const o = new FormData(s);
      this.update({
        url: i,
        formData: o
      });
    } else
      this.update({
        url: i,
        formData: null
      });
  }
  static isValidPaginationTarget(t) {
    return t.nodeName === "A" && t.href && t.dataset.pagination !== void 0;
  }
  static setPaginationUrl(t) {
    return t.includes("/page") ? t.replace("/page", ".json/page") : t.includes("?") ? t.replace("?", ".json?") : `${t}.json`;
  }
  handleUpdate() {
  }
  onComplete(t) {
  }
};
var il = class extends nl {
  onClick(t) {
    const {
      target: e
    } = t;
    if (this.constructor.isValidPaginationTarget(e)) {
      this.onClickPagination(e, t);
      return;
    }
    this.constructor.isValidCardTarget(e) && this.onClickCard(e, t);
  }
  static isValidCardTarget(t) {
    return t.nodeName === "A" && t.href && t.dataset.card !== void 0;
  }
  onClickCard(t, e) {
    e.preventDefault(), e.stopPropagation(), Y.go(t.href, lr);
  }
};
var rl = class extends il {
  onComplete(t) {
    super.onComplete(t), this.call("updateData", t, "AdsFilters", "adsFilters");
  }
};
var sl = class extends D {
  constructor(t) {
    super(t), this.state = false, this.open = this.change.bind(this, true), this.close = this.change.bind(this, false), this.toast = null, this.events = {
      click: "onClick"
    };
  }
  onClick(t) {
    const {
      target: e
    } = t, {
      action: i
    } = e.dataset;
    i && this[i] && this[i](e);
  }
  toggle() {
    this.change(!this.state);
  }
  change(t) {
    if (this.state === t)
      return;
    this.state = t;
    const [e] = this.$("aside"), [i] = this.$("overlay"), [r] = this.$("button");
    e.style.transform = `translateX(${t ? 100 : 0}%)`, i.style.display = t ? "block" : "none", r.innerText = t ? "Close" : "Menu";
  }
  async copy(t) {
    const e = t.dataset.copy;
    if (window.navigator.clipboard && window.isSecureContext)
      await window.navigator.clipboard.writeText(e);
    else {
      const i = document.createElement("textarea");
      i.value = e, i.style.position = "absolute", i.style.left = "-99999999px", document.body.prepend(i), i.select();
      try {
        document.execCommand("copy"), this.addCopyToast(e);
      } catch (r) {
        console.log(r);
      } finally {
        i.remove();
      }
    }
  }
  addCopyToast(t) {
    if (clearTimeout(this.toastTimeout), this.toast) {
      const e = this.toast.querySelector("p");
      e.innerText = t;
    } else {
      const e = document.createElement("div");
      e.setAttribute("class", "t-styleguide__toast"), e.setAttribute("data-action", "removeCopyToast");
      const i = document.createElement("h3");
      i.innerText = "Texte copi\xE9";
      const r = document.createElement("p");
      r.innerText = t, e.append(i), e.append(r), this.el.append(e), this.toast = e;
    }
    this.toastTimeout = setTimeout(this.removeCopyToast.bind(this), 5e3);
  }
  removeCopyToast() {
    clearTimeout(this.toastTimeout), this.toast.remove(), this.toast = null;
  }
};
var ol = class extends D {
  constructor(t) {
    super(t), console.log("Test module"), this.initialized = false;
  }
  initModule() {
    this.initialized || (console.log("initModule Test"), this.initialized = true);
  }
  enter() {
    this.initModule(), console.log("enter Test");
  }
  leave() {
    this.initialized && console.log("leave Test");
  }
  toggle({
    way: t
  }) {
    t === "enter" ? this.enter() : this.leave();
  }
};
var al = class extends D {
  constructor(t) {
    super(t), this.events = {};
  }
  toggleHeaderVisibility(t) {
    this.visibilityState !== t && (this.visibilityState = t, this.el.classList.toggle("-isHidden", t));
  }
  toggleBackground(t) {
    this.bgState !== t && (this.bgState = t, this.el.classList.toggle("-bg", t), this.el.classList.toggle("-reduced", t));
  }
};
var ll = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: {
        button: "onChoice",
        close: "onClose"
      }
    }, this.iconsComputer = this.$("iconsComputer")[0], this.iconsUser = this.$("iconsUser")[0], this.timeoutId;
  }
  onChoice(t) {
    clearTimeout(this.timeoutId);
    const e = t.target.dataset.choice;
    t.target.classList.add("-isActive"), this.el.classList.add("is-playing");
    const i = ["pierre", "feuille", "ciseaux"], r = i[Math.floor(Math.random() * i.length)];
    this.iconsComputer.querySelector("[data-icon].-isActive") && this.iconsComputer.querySelector("[data-icon].-isActive").classList.remove("-isActive"), this.iconsUser.querySelector("[data-icon].-isActive") && this.iconsUser.querySelector("[data-icon].-isActive").classList.remove("-isActive"), this.iconsUser.querySelector('[data-icon="' + e + '"]').classList.add("-isActive"), setTimeout(() => {
      this.el.classList.remove("is-playing"), t.target.classList.remove("-isActive"), this.iconsComputer.querySelector('[data-icon="' + r + '"]').classList.add("-isActive");
      let s = "";
      e === r ? s = "\xC9galit\xE9 !" : e === "pierre" && r === "ciseaux" || e === "feuille" && r === "pierre" || e === "ciseaux" && r === "feuille" ? s = "<strong>gagn\xE9 !</strong>" : s = "<strong>Perdu !</strong>", this.$("result")[0].classList.add("-isActive"), this.$("resultText")[0].innerHTML = s, this.timeoutId = setTimeout(() => {
        this.$("result")[0].classList.remove("-isActive"), this.iconsComputer.querySelector("[data-icon].-isActive") && this.iconsComputer.querySelector("[data-icon].-isActive").classList.remove("-isActive"), this.iconsUser.querySelector("[data-icon].-isActive") && this.iconsUser.querySelector("[data-icon].-isActive").classList.remove("-isActive"), this.iconsUser.querySelector('[data-icon="pierre"]').classList.add("-isActive"), this.iconsComputer.querySelector('[data-icon="pierre"]').classList.add("-isActive");
      }, 3e3);
    }, 2e3);
  }
};
var cl = class extends D {
  constructor(t) {
    super(t), this.events = {}, this.previousScrollY = 0;
    const e = this.el.previousElementSibling;
    e && (this.previousId = e.getAttribute("data-module-list-cards"));
  }
  onScrollProgress(t) {
    this.previousId && this.call("setProgress", t, "ListCards", this.previousId);
    const e = window.scrollY;
    e < this.previousScrollY && t === 0 ? (this.el.classList.remove("-isEntered"), this.hasEntered = false) : t > 0 && !this.hasEntered && (this.el.classList.add("-isEntered"), this.hasEntered = true), this.previousScrollY = e;
  }
  setProgress(t) {
    this.el.style.setProperty("--scroll-progress", t);
  }
};
(function() {
  function n2() {
    for (var i = arguments.length, r = 0; r < i; r++) {
      var s = r < 0 || arguments.length <= r ? void 0 : arguments[r];
      s.nodeType === 1 || s.nodeType === 11 ? this.appendChild(s) : this.appendChild(document.createTextNode(String(s)));
    }
  }
  function t() {
    for (; this.lastChild; )
      this.removeChild(this.lastChild);
    arguments.length && this.append.apply(this, arguments);
  }
  function e() {
    for (var i = this.parentNode, r = arguments.length, s = new Array(r), o = 0; o < r; o++)
      s[o] = arguments[o];
    var l = s.length;
    if (i)
      for (l || i.removeChild(this); l--; ) {
        var a = s[l];
        typeof a != "object" ? a = this.ownerDocument.createTextNode(a) : a.parentNode && a.parentNode.removeChild(a), l ? i.insertBefore(this.previousSibling, a) : i.replaceChild(a, this);
      }
  }
  typeof Element < "u" && (Element.prototype.append || (Element.prototype.append = n2, DocumentFragment.prototype.append = n2), Element.prototype.replaceChildren || (Element.prototype.replaceChildren = t, DocumentFragment.prototype.replaceChildren = t), Element.prototype.replaceWith || (Element.prototype.replaceWith = e, DocumentFragment.prototype.replaceWith = e));
})();
function ul(n2, t) {
  if (!(n2 instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function ri(n2, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || false, i.configurable = true, "value" in i && (i.writable = true), Object.defineProperty(n2, i.key, i);
  }
}
function si(n2, t, e) {
  return t && ri(n2.prototype, t), e && ri(n2, e), n2;
}
function hl(n2, t, e) {
  return t in n2 ? Object.defineProperty(n2, t, {
    value: e,
    enumerable: true,
    configurable: true,
    writable: true
  }) : n2[t] = e, n2;
}
function oi(n2, t) {
  var e = Object.keys(n2);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n2);
    t && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(n2, r).enumerable;
    })), e.push.apply(e, i);
  }
  return e;
}
function ai(n2) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? oi(Object(e), true).forEach(function(i) {
      hl(n2, i, e[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n2, Object.getOwnPropertyDescriptors(e)) : oi(Object(e)).forEach(function(i) {
      Object.defineProperty(n2, i, Object.getOwnPropertyDescriptor(e, i));
    });
  }
  return n2;
}
function pr(n2, t) {
  return fl(n2) || ml(n2, t) || mr(n2, t) || vl();
}
function X(n2) {
  return dl(n2) || pl(n2) || mr(n2) || gl();
}
function dl(n2) {
  if (Array.isArray(n2))
    return Ge(n2);
}
function fl(n2) {
  if (Array.isArray(n2))
    return n2;
}
function pl(n2) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(n2))
    return Array.from(n2);
}
function ml(n2, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(n2)))) {
    var e = [], i = true, r = false, s = void 0;
    try {
      for (var o = n2[Symbol.iterator](), l; !(i = (l = o.next()).done) && (e.push(l.value), !(t && e.length === t)); i = true)
        ;
    } catch (a) {
      r = true, s = a;
    } finally {
      try {
        !i && o.return != null && o.return();
      } finally {
        if (r)
          throw s;
      }
    }
    return e;
  }
}
function mr(n2, t) {
  if (n2) {
    if (typeof n2 == "string")
      return Ge(n2, t);
    var e = Object.prototype.toString.call(n2).slice(8, -1);
    if (e === "Object" && n2.constructor && (e = n2.constructor.name), e === "Map" || e === "Set")
      return Array.from(n2);
    if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
      return Ge(n2, t);
  }
}
function Ge(n2, t) {
  (t == null || t > n2.length) && (t = n2.length);
  for (var e = 0, i = new Array(t); e < t; e++)
    i[e] = n2[e];
  return i;
}
function gl() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function vl() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kt(n2, t) {
  return Object.getOwnPropertyNames(Object(n2)).reduce(function(e, i) {
    var r = Object.getOwnPropertyDescriptor(Object(n2), i), s = Object.getOwnPropertyDescriptor(Object(t), i);
    return Object.defineProperty(e, i, s || r);
  }, {});
}
function oe(n2) {
  return typeof n2 == "string";
}
function xn(n2) {
  return Array.isArray(n2);
}
function ue() {
  var n2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = kt(n2), e;
  return t.types !== void 0 ? e = t.types : t.split !== void 0 && (e = t.split), e !== void 0 && (t.types = (oe(e) || xn(e) ? String(e) : "").split(",").map(function(i) {
    return String(i).trim();
  }).filter(function(i) {
    return /((line)|(word)|(char))/i.test(i);
  })), (t.absolute || t.position) && (t.absolute = t.absolute || /absolute/.test(n2.position)), t;
}
function Tn(n2) {
  var t = oe(n2) || xn(n2) ? String(n2) : "";
  return {
    none: !t,
    lines: /line/i.test(t),
    words: /word/i.test(t),
    chars: /char/i.test(t)
  };
}
function Te(n2) {
  return n2 !== null && typeof n2 == "object";
}
function yl(n2) {
  return Te(n2) && /^(1|3|11)$/.test(n2.nodeType);
}
function bl(n2) {
  return typeof n2 == "number" && n2 > -1 && n2 % 1 === 0;
}
function wl(n2) {
  return Te(n2) && bl(n2.length);
}
function Mt(n2) {
  return xn(n2) ? n2 : n2 == null ? [] : wl(n2) ? Array.prototype.slice.call(n2) : [n2];
}
function li(n2) {
  var t = n2;
  return oe(n2) && (/^(#[a-z]\w+)$/.test(n2.trim()) ? t = document.getElementById(n2.trim().slice(1)) : t = document.querySelectorAll(n2)), Mt(t).reduce(function(e, i) {
    return [].concat(X(e), X(Mt(i).filter(yl)));
  }, []);
}
var Sl = Object.entries;
var me = "_splittype";
var rt = {};
var El = 0;
function ut(n2, t, e) {
  if (!Te(n2))
    return console.warn("[data.set] owner is not an object"), null;
  var i = n2[me] || (n2[me] = ++El), r = rt[i] || (rt[i] = {});
  return e === void 0 ? t && Object.getPrototypeOf(t) === Object.prototype && (rt[i] = ai(ai({}, r), t)) : t !== void 0 && (r[t] = e), e;
}
function Ot(n2, t) {
  var e = Te(n2) ? n2[me] : null, i = e && rt[e] || {};
  return i;
}
function gr(n2) {
  var t = n2 && n2[me];
  t && (delete n2[t], delete rt[t]);
}
function Cl() {
  Object.keys(rt).forEach(function(n2) {
    delete rt[n2];
  });
}
function xl() {
  Sl(rt).forEach(function(n2) {
    var t = pr(n2, 2), e = t[0], i = t[1], r = i.isRoot, s = i.isSplit;
    (!r || !s) && (rt[e] = null, delete rt[e]);
  });
}
function Tl(n2) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ", e = n2 ? String(n2) : "";
  return e.trim().replace(/\s+/g, " ").split(t);
}
var An = "\\ud800-\\udfff";
var vr = "\\u0300-\\u036f\\ufe20-\\ufe23";
var yr = "\\u20d0-\\u20f0";
var br = "\\ufe0e\\ufe0f";
var Al = "[".concat(An, "]");
var Ke = "[".concat(vr).concat(yr, "]");
var Ye = "\\ud83c[\\udffb-\\udfff]";
var Ll = "(?:".concat(Ke, "|").concat(Ye, ")");
var wr = "[^".concat(An, "]");
var Sr = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var Er = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var Cr = "\\u200d";
var xr = "".concat(Ll, "?");
var Tr = "[".concat(br, "]?");
var Il = "(?:" + Cr + "(?:" + [wr, Sr, Er].join("|") + ")" + Tr + xr + ")*";
var kl = Tr + xr + Il;
var Ol = "(?:".concat(["".concat(wr).concat(Ke, "?"), Ke, Sr, Er, Al].join("|"), `
)`);
var _l = RegExp("".concat(Ye, "(?=").concat(Ye, ")|").concat(Ol).concat(kl), "g");
var Pl = [Cr, An, vr, yr, br];
var Ml = RegExp("[".concat(Pl.join(""), "]"));
function $l(n2) {
  return n2.split("");
}
function Ar(n2) {
  return Ml.test(n2);
}
function Rl(n2) {
  return n2.match(_l) || [];
}
function Dl(n2) {
  return Ar(n2) ? Rl(n2) : $l(n2);
}
function Fl(n2) {
  return n2 == null ? "" : String(n2);
}
function ql(n2) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return n2 = Fl(n2), n2 && oe(n2) && !t && Ar(n2) ? Dl(n2) : n2.split(t);
}
function Xe(n2, t) {
  var e = document.createElement(n2);
  return t && Object.keys(t).forEach(function(i) {
    var r = t[i], s = oe(r) ? r.trim() : r;
    s === null || s === "" || (i === "children" ? e.append.apply(e, X(Mt(s))) : e.setAttribute(i, s));
  }), e;
}
var Ln = {
  splitClass: "",
  lineClass: "line",
  wordClass: "word",
  charClass: "char",
  types: ["lines", "words", "chars"],
  absolute: false,
  tagName: "div"
};
function jl(n2, t) {
  t = kt(Ln, t);
  var e = Tn(t.types), i = t.tagName, r = n2.nodeValue, s = document.createDocumentFragment(), o = [], l = [];
  return /^\s/.test(r) && s.append(" "), o = Tl(r).reduce(function(a, c, u, h) {
    var d, v;
    return e.chars && (v = ql(c).map(function(f) {
      var p = Xe(i, {
        class: "".concat(t.splitClass, " ").concat(t.charClass),
        style: "display: inline-block;",
        children: f
      });
      return ut(p, "isChar", true), l = [].concat(X(l), [p]), p;
    })), e.words || e.lines ? (d = Xe(i, {
      class: "".concat(t.wordClass, " ").concat(t.splitClass),
      style: "display: inline-block; ".concat(e.words && t.absolute ? "position: relative;" : ""),
      children: e.chars ? v : c
    }), ut(d, {
      isWord: true,
      isWordStart: true,
      isWordEnd: true
    }), s.appendChild(d)) : v.forEach(function(f) {
      s.appendChild(f);
    }), u < h.length - 1 && s.append(" "), e.words ? a.concat(d) : a;
  }, []), /\s$/.test(r) && s.append(" "), n2.replaceWith(s), {
    words: o,
    chars: l
  };
}
function Lr(n2, t) {
  var e = n2.nodeType, i = {
    words: [],
    chars: []
  };
  if (!/(1|3|11)/.test(e))
    return i;
  if (e === 3 && /\S/.test(n2.nodeValue))
    return jl(n2, t);
  var r = Mt(n2.childNodes);
  if (r.length && (ut(n2, "isSplit", true), !Ot(n2).isRoot)) {
    n2.style.display = "inline-block", n2.style.position = "relative";
    var s = n2.nextSibling, o = n2.previousSibling, l = n2.textContent || "", a = s ? s.textContent : " ", c = o ? o.textContent : " ";
    ut(n2, {
      isWordEnd: /\s$/.test(l) || /^\s/.test(a),
      isWordStart: /^\s/.test(l) || /\s$/.test(c)
    });
  }
  return r.reduce(function(u, h) {
    var d = Lr(h, t), v = d.words, f = d.chars;
    return {
      words: [].concat(X(u.words), X(v)),
      chars: [].concat(X(u.chars), X(f))
    };
  }, i);
}
function zl(n2, t, e, i) {
  if (!e.absolute)
    return {
      top: t ? n2.offsetTop : null
    };
  var r = n2.offsetParent, s = pr(i, 2), o = s[0], l = s[1], a = 0, c = 0;
  if (r && r !== document.body) {
    var u = r.getBoundingClientRect();
    a = u.x + o, c = u.y + l;
  }
  var h = n2.getBoundingClientRect(), d = h.width, v = h.height, f = h.x, p = h.y, b = p + l - c, m = f + o - a;
  return {
    width: d,
    height: v,
    top: b,
    left: m
  };
}
function Ir(n2) {
  Ot(n2).isWord ? (gr(n2), n2.replaceWith.apply(n2, X(n2.childNodes))) : Mt(n2.children).forEach(function(t) {
    return Ir(t);
  });
}
var Nl = function() {
  return document.createDocumentFragment();
};
function Hl(n2, t, e) {
  var i = Tn(t.types), r = t.tagName, s = n2.getElementsByTagName("*"), o = [], l = [], a = null, c, u, h, d = [], v = n2.parentElement, f = n2.nextElementSibling, p = Nl(), b = window.getComputedStyle(n2), m = b.textAlign, y = parseFloat(b.fontSize), g = y * 0.2;
  return t.absolute && (h = {
    left: n2.offsetLeft,
    top: n2.offsetTop,
    width: n2.offsetWidth
  }, u = n2.offsetWidth, c = n2.offsetHeight, ut(n2, {
    cssWidth: n2.style.width,
    cssHeight: n2.style.height
  })), Mt(s).forEach(function(w) {
    var x = w.parentElement === n2, S = zl(w, x, t, e), E = S.width, T = S.height, A = S.top, C = S.left;
    /^br$/i.test(w.nodeName) || (i.lines && x && ((a === null || A - a >= g) && (a = A, o.push(l = [])), l.push(w)), t.absolute && ut(w, {
      top: A,
      left: C,
      width: E,
      height: T
    }));
  }), v && v.removeChild(n2), i.lines && (d = o.map(function(w) {
    var x = Xe(r, {
      class: "".concat(t.splitClass, " ").concat(t.lineClass),
      style: "display: block; text-align: ".concat(m, "; width: 100%;")
    });
    ut(x, "isLine", true);
    var S = {
      height: 0,
      top: 1e4
    };
    return p.appendChild(x), w.forEach(function(E, T, A) {
      var C = Ot(E), L = C.isWordEnd, I = C.top, P = C.height, _ = A[T + 1];
      S.height = Math.max(S.height, P), S.top = Math.min(S.top, I), x.appendChild(E), L && Ot(_).isWordStart && x.append(" ");
    }), t.absolute && ut(x, {
      height: S.height,
      top: S.top
    }), x;
  }), i.words || Ir(p), n2.replaceChildren(p)), t.absolute && (n2.style.width = "".concat(n2.style.width || u, "px"), n2.style.height = "".concat(c, "px"), Mt(s).forEach(function(w) {
    var x = Ot(w), S = x.isLine, E = x.top, T = x.left, A = x.width, C = x.height, L = Ot(w.parentElement), I = !S && L.isLine;
    w.style.top = "".concat(I ? E - L.top : E, "px"), w.style.left = S ? "".concat(h.left, "px") : "".concat(T - (I ? h.left : 0), "px"), w.style.height = "".concat(C, "px"), w.style.width = S ? "".concat(h.width, "px") : "".concat(A, "px"), w.style.position = "absolute";
  })), v && (f ? v.insertBefore(n2, f) : v.appendChild(n2)), d;
}
var qt = kt(Ln, {});
var Vl = function() {
  si(n2, null, [{
    key: "clearData",
    value: function() {
      Cl();
    }
  }, {
    key: "setDefaults",
    value: function(e) {
      return qt = kt(qt, ue(e)), Ln;
    }
  }, {
    key: "revert",
    value: function(e) {
      li(e).forEach(function(i) {
        var r = Ot(i), s = r.isSplit, o = r.html, l = r.cssWidth, a = r.cssHeight;
        s && (i.innerHTML = o, i.style.width = l || "", i.style.height = a || "", gr(i));
      });
    }
  }, {
    key: "create",
    value: function(e, i) {
      return new n2(e, i);
    }
  }, {
    key: "data",
    get: function() {
      return rt;
    }
  }, {
    key: "defaults",
    get: function() {
      return qt;
    },
    set: function(e) {
      qt = kt(qt, ue(e));
    }
  }]);
  function n2(t, e) {
    ul(this, n2), this.isSplit = false, this.settings = kt(qt, ue(e)), this.elements = li(t), this.split();
  }
  return si(n2, [{
    key: "split",
    value: function(e) {
      var i = this;
      this.revert(), this.elements.forEach(function(o) {
        ut(o, "html", o.innerHTML);
      }), this.lines = [], this.words = [], this.chars = [];
      var r = [window.pageXOffset, window.pageYOffset];
      e !== void 0 && (this.settings = kt(this.settings, ue(e)));
      var s = Tn(this.settings.types);
      s.none || (this.elements.forEach(function(o) {
        ut(o, "isRoot", true);
        var l = Lr(o, i.settings), a = l.words, c = l.chars;
        i.words = [].concat(X(i.words), X(a)), i.chars = [].concat(X(i.chars), X(c));
      }), this.elements.forEach(function(o) {
        if (s.lines || i.settings.absolute) {
          var l = Hl(o, i.settings, r);
          i.lines = [].concat(X(i.lines), X(l));
        }
      }), this.isSplit = true, window.scrollTo(r[0], r[1]), xl());
    }
  }, {
    key: "revert",
    value: function() {
      this.isSplit && (this.lines = null, this.words = null, this.chars = null, this.isSplit = false), n2.revert(this.elements);
    }
  }]), n2;
}();
var Bl = class extends D {
  constructor(t) {
    super(t), this.events = {}, this.el.getAttribute("data-hero") !== null ? setTimeout(() => {
      this.el.classList.add("-isReady");
    }, document.body.classList.contains("-onceAnimate") ? 0 : 2e3) : this.el.classList.add("-isReady"), new Vl(this.el.querySelectorAll('[data-title="title"]'), {
      types: "lines",
      tagName: "span"
    });
    const i = this.el.querySelectorAll('[data-title="title"] .line');
    i.length > 0 && i.forEach((r, s) => {
      r.style.setProperty("--delay", `${0.2 * (s + 1)}s`);
    });
  }
};
var Ul = class extends D {
  constructor(t) {
    super(t), this.events = {}, this.el.getAttribute("data-hero") !== null ? setTimeout(() => {
      this.el.classList.add("-isReady");
    }, document.body.classList.contains("-onceAnimate") ? 0 : 2e3) : this.el.classList.add("-isReady");
    const i = this.el.querySelectorAll('[data-steps="step"]');
    i.length > 0 && i.forEach((r, s) => {
      r.style.setProperty("--delay", `${0.2 * (s + 1)}s`);
    });
  }
};
var Wl = class extends Cn {
  constructor(t) {
    super(t), this.step = 0, this.events = {
      click: {
        submit: "onSearch",
        next: "onNext",
        choice: "onChoice",
        close: "onClose"
      }
    };
  }
  init() {
    let t = new URL(window.location), e = new URLSearchParams(t.search);
    e.has("choix") && document.querySelector(`[data-url="${e.get("choix")}"]`).click();
  }
  onNext(t) {
    t.preventDefault();
    const e = Number(t.target.dataset.index), i = this.$("step"), r = i[e], s = this.validateStep(r);
    if (s.length > 0) {
      this.setStepErrors(r, s);
      return;
    }
    this.cleanStepErrors(r);
    const o = document.querySelector('[name="option"]').value;
    let l = i[e + 1];
    e === 1 && (o === "3" || o === "4") && (l = i[e + 2]), this.call("close", null, "Accordeon", r.dataset.moduleAccordeon), l && this.call("open", null, "Accordeon", l.dataset.moduleAccordeon), window.requestAnimationFrame(() => {
      r.classList.add("-edit"), l && window.requestAnimationFrame(() => {
        this.el.parentNode.scrollTo({
          top: l.offsetTop,
          behavior: "smooth"
        });
      });
    });
  }
  onChoice(t) {
    t.preventDefault(), this.updateURL(t.target.dataset.url);
    const e = document.querySelector('[data-module-accordeon="accordeonContactStep1"]');
    this.call("open", null, "Popin", this.el.dataset.moduleFormSteps), e.classList.contains("-isInvisible") && e.classList.remove("-isInvisible"), document.querySelector('[name="option"]').value = t.target.dataset.index, this.$("card")[0].querySelector("[data-title]").innerHTML = t.target.dataset.title, this.$("card")[0].querySelector("[data-subtitle]").innerHTML = t.target.dataset.subtitle, this.$("card")[0].querySelector("[data-src]").setAttribute("src", t.target.dataset.img), this.el.querySelectorAll("[data-name]").forEach((s) => {
      s.classList.add("-disabled"), s.querySelector(".a-inputField__input").removeAttribute("required");
    }), e.removeAttribute("data-inputs");
    const i = [{
      labelSelector: '[for="address"] span',
      inputSelector: "#address",
      labelText: "Votre adresse postale (optionnel)",
      labelTextRequired: "Votre adresse postale"
    }, {
      labelSelector: '[for="zip"] span',
      inputSelector: "#zip",
      labelText: "Code postal (optionnel)",
      labelTextRequired: "Code postal"
    }, {
      labelSelector: '[for="city"] span',
      inputSelector: "#city",
      labelText: "Ville (optionnel)",
      labelTextRequired: "Ville"
    }];
    t.target.dataset.index == 3 || t.target.dataset.index == 4 ? (document.querySelector('[data-module-accordeon="accordeonContactStep3"]').removeAttribute("data-inputs"), document.querySelector('[data-module-accordeon="accordeonContactStep3"]').classList.add("-isInvisible")) : (document.querySelector('[data-module-accordeon="accordeonContactStep3"]').setAttribute("data-inputs", "day[],hours[]"), document.querySelector('[data-module-accordeon="accordeonContactStep3"].-isInvisible') && document.querySelector('[data-module-accordeon="accordeonContactStep3"].-isInvisible').classList.remove("-isInvisible")), t.target.dataset.index == 3 ? (document.querySelector('[data-module-accordeon="accordeonContactStep2"]').setAttribute("data-inputs", "firstname,lastname,email,phone"), i.forEach((s) => {
      document.querySelector(s.labelSelector).innerText = s.labelText, document.querySelector(s.inputSelector).removeAttribute("required");
    }), document.querySelector('[aria-controls="accordeon-accordeonContactStep4"] [data-accordeon="step"]').innerText = "03") : (document.querySelector('[data-module-accordeon="accordeonContactStep2"]').setAttribute("data-inputs", "firstname,lastname,email,phone,address,zip,city"), i.forEach((s) => {
      document.querySelector(s.labelSelector).innerText = s.labelTextRequired, document.querySelector(s.inputSelector).setAttribute("required", true);
    }), document.querySelector('[aria-controls="accordeon-accordeonContactStep4"] [data-accordeon="step"]').innerText = "04");
    const r = t.target.dataset.inputs ? t.target.dataset.inputs.split(",") : this.onJump(1);
    if (t.target.dataset.inputs) {
      e.querySelector('[aria-controls="accordeon-accordeonContactStep1"] [data-accordeon="title"]').innerText = t.target.dataset.titleStep, document.querySelector('[aria-controls="accordeon-accordeonContactStep2"] [data-accordeon="step"]').innerText = "02", document.querySelector('[aria-controls="accordeon-accordeonContactStep4"] [data-accordeon="title"]').innerText = "Votre projet", document.querySelector('[for="message"] span').innerText = "Votre message (optionnel)", document.querySelector("#message").removeAttribute("required");
      for (let s = r.length - 1; s >= 0; s -= 1) {
        const o = r[s];
        this.el.querySelector(`[name="${o}"]`).setAttribute("required", true), this.el.querySelector(`[data-name="${o}"]`).classList.remove("-disabled");
      }
      e.setAttribute("data-inputs", t.target.dataset.inputs), this.call("open", null, "Accordeon", "accordeonContactStep1");
    }
  }
  onJump(t) {
    document.querySelector('[data-module-accordeon="accordeonContactStep1"]').classList.add("-isInvisible"), document.querySelector('[aria-controls="accordeon-accordeonContactStep2"] [data-accordeon="step"]').innerText = "01", document.querySelector('[aria-controls="accordeon-accordeonContactStep4"] [data-accordeon="step"]').innerText = "02", document.querySelector('[aria-controls="accordeon-accordeonContactStep4"] [data-accordeon="title"]').innerText = "Votre question", document.querySelector('[for="message"] span').innerText = "Votre message", document.querySelector("#message").setAttribute("required", true), this.call("open", null, "Accordeon", "accordeonContactStep" + (t + 1));
  }
  onClose(t) {
    this.$("step").forEach((r) => {
      this.call("close", null, "Accordeon", r.dataset.moduleAccordeon);
    });
    let i = new URL(window.location);
    i.searchParams.delete("choix"), window.history.pushState({}, "", i);
  }
  updateURL(t) {
    let e = new URL(window.location);
    e.searchParams.set("choix", t), window.history.pushState({}, "", e);
  }
  validateStep(t) {
    const e = new FormData(this.el), i = t.dataset.inputs ? t.dataset.inputs.split(",") : [], r = [];
    for (let s = i.length - 1; s >= 0; s -= 1) {
      const o = i[s];
      e.get(o) || r.push(o);
    }
    return r;
  }
  getUniqueInputs(t) {
    const e = Array.from(t), i = [], r = [];
    return e.forEach((s) => {
      i.includes(s.name) || (r.push(s), i.push(s.name));
    }), r;
  }
  setStepErrors(t = null, e = []) {
    const i = t.querySelectorAll('input:not([type="hidden"]), textarea, select');
    this.getUniqueInputs(i).forEach((o) => {
      o.closest(".a-inputField").classList.toggle("-error", e.includes(o.name));
    });
    const s = t.querySelector("[data-module-multiselect]");
    if (s) {
      let o = false;
      for (const l of s.querySelectorAll("input"))
        if (l.checked) {
          o = true;
          break;
        }
      o || s.classList.add("-error");
    }
  }
  cleanStepErrors(t = null) {
    const e = t.querySelectorAll('input:not([type="hidden"]), textarea, select');
    this.getUniqueInputs(e).forEach((s) => {
      s.closest(".a-inputField").classList.remove("-error");
    });
    const r = t.querySelector("[data-module-multiselect]");
    if (r) {
      let s = false;
      for (const o of r.querySelectorAll("input"))
        if (o.checked) {
          s = true;
          break;
        }
      s && r.classList.remove("-error");
    }
  }
  cleanErrors() {
    this.cleanStepErrors(this.el);
  }
  setErrors(t) {
    this.setStepErrors(this.el, Object.keys(t));
  }
  setCallback(t, e) {
    const i = this.$("message")[0];
    i.innerHTML = `
      <p class="tx-m">${t}</p>
    `, document.querySelector("main").classList.add("-formValidate"), e ? (this.resetInput(), i.classList.add("-success")) : i.classList.add("-error"), window.scrollTo(0, 0), this.call("close", null, "Popin", this.el.dataset.moduleFormSteps), this.call("update", null, "Scroll", "scroll");
  }
};
var Gl = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: {
        toggle: "toggle"
      }
    };
  }
  active(t) {
    this.el.classList.toggle("-isNotExist", !t);
  }
  toggle(t) {
    t.preventDefault(), this.change(!this.state);
  }
  change(t) {
    if (this.state === t)
      return;
    this.state = t;
    let e = 0;
    window.cancelAnimationFrame(this.raf);
    const [i] = this.$("content");
    t && (e = i.scrollHeight), this.raf = window.requestAnimationFrame(() => {
      e && this.el.style.setProperty("--height", `${i.scrollHeight}px`), this.el.classList.toggle("-isActive", this.state);
    });
  }
  toggleWidgetVisibility(t) {
    this.visibilityState !== t && (this.visibilityState = t, this.el.classList.toggle("-isVisible", t));
  }
};
var Kl = class extends D {
  constructor(t) {
    super(t), this.events = {}, this.inputField = this.el.querySelector("input"), this.suggestionsContainer = null, this.inputField.addEventListener("input", this.onInput.bind(this)), document.addEventListener("click", this.onClickOutside.bind(this));
  }
  async fetchCities(t) {
    return await (await fetch(`https://geo.api.gouv.fr/communes?nom=${t}&fields=nom&limit=10`)).json();
  }
  createSuggestionsContainer() {
    this.suggestionsContainer = document.createElement("div"), this.suggestionsContainer.classList.add("a-inputField__suggestions"), this.el.appendChild(this.suggestionsContainer);
  }
  displaySuggestions(t) {
    this.suggestionsContainer || this.createSuggestionsContainer(), this.suggestionsContainer.innerHTML = "";
    const e = document.createElement("ul");
    t.forEach((i) => {
      const r = document.createElement("li");
      r.textContent = i.nom, r.addEventListener("click", () => {
        this.inputField.value = i.nom, this.clearSuggestions();
      }), e.appendChild(r);
    }), this.suggestionsContainer.appendChild(e);
  }
  async onInput() {
    const t = this.inputField.value;
    if (t.length >= 2) {
      const e = await this.fetchCities(t);
      this.displaySuggestions(e);
    } else
      this.clearSuggestions();
  }
  clearSuggestions() {
    this.suggestionsContainer && (this.suggestionsContainer.remove(), this.suggestionsContainer = null);
  }
  onClickOutside(t) {
    this.suggestionsContainer && !this.inputField.contains(t.target) && !this.suggestionsContainer.contains(t.target) && this.clearSuggestions();
  }
};
var Yl = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: {
        box: "onShow"
      }
    }, this.multiSelectBox = this.$("box")[0], this.checkboxList = this.$("list")[0];
    const e = this.checkboxList.querySelectorAll('input[type="checkbox"]');
    e.forEach((i) => {
      i.addEventListener("change", () => {
        this.updateSelectedValues(e);
      });
    }), document.addEventListener("click", (i) => {
      !this.multiSelectBox.contains(i.target) && !this.checkboxList.contains(i.target) && (this.checkboxList.style.display = "none");
    });
  }
  onShow() {
    this.checkboxList.style.display = this.checkboxList.style.display === "grid" ? "none" : "grid";
  }
  updateSelectedValues(t) {
    this.multiSelectBox.innerHTML = "";
    let e = 0;
    t.forEach((r) => {
      if (r.checked) {
        const s = document.createElement("div");
        s.classList.add("a-tag", "-small", "tx-ps", "-tx600", "-bgprimary", "-clrcream");
        const o = document.querySelector(`label[for="${r.id}"]`);
        s.textContent = o ? o.textContent : r.value;
        const l = document.createElement("span");
        l.classList.add("a-tag__remove"), l.textContent = "x", l.addEventListener("click", () => {
          r.checked = false, this.updateSelectedValues(t);
        }), s.appendChild(l), this.multiSelectBox.appendChild(s), e++;
      }
    }), e === 0 && (this.multiSelectBox.textContent = "S\xE9lectionner une option");
    const i = document.querySelector('[data-module-accordeon="accordeonContactStep1"]');
    if (i) {
      const r = i.querySelector('[data-accordeon="content"]');
      i.style.setProperty("--height", `${r.scrollHeight}px`);
    }
  }
};
var Xl = class extends D {
  constructor(t) {
    super(t), this.events = {
      input: {
        input: "onChange"
      }
    };
  }
  onChange(t) {
    const [e] = this.$("input"), [i] = this.$("value"), [r] = this.$("min"), [s] = this.$("max");
    i.textContent = this.formatCurrency(e.value);
    const o = (e.value - e.min) / (e.max - e.min) * 100, a = 20 / 2 - o * 0.3;
    i.style.left = `calc(${o}% + (${a}px))`;
  }
  formatCurrency(t) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0
    }).format(t);
  }
};
var Jl = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: {
        avatar: "toggle",
        close: "toggle"
      }
    }, this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  toggle(t) {
    Bi && (t.stopPropagation(), t.preventDefault(), this.change(!this.state));
  }
  change(t) {
    this.state !== t && (this.state = t, this.el.classList.toggle("-isVisible", this.state), this.state ? document.addEventListener("click", this.handleOutsideClick) : document.removeEventListener("click", this.handleOutsideClick));
  }
  handleOutsideClick(t) {
    this.el.contains(t.target) || this.change(false);
  }
};
var Ql = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: {
        button: "onChange"
      }
    };
  }
  onChange(t) {
    t.stopPropagation(), t.preventDefault();
    let e = parseInt(t.target.getAttribute("data-page"));
    console.log(e);
    let i = `${window.location.href.split("#")[0]}.json/page:${e}`;
    fetch(i, {
      method: "GET",
      responseType: "json",
      headers: {
        "Cache-Control": "no-cache",
        "X-Requested-With": "fetch"
      }
    }).then(async (r) => {
      console.log(r);
      const s = await r.json(), o = document.querySelector('[data-pagination="content"]');
      o.innerHTML = s.itemsHtml;
      const l = document.querySelector('[data-pagination="pagination"]');
      this.call("destroy", l, "app"), l.innerHTML = s.pagination, this.call("update", l, "app");
      const a = {
        target: o,
        options: {
          offset: -200
        }
      };
      this.call("scrollTo", a, "Scroll", "scroll");
    }).catch((r) => {
      console.log(r);
    });
  }
};
var Zl = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: "onCopy"
    };
  }
  onCopy(t) {
    t.stopPropagation(), t.preventDefault();
    const e = t.target.dataset.url;
    navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(e).then(() => {
      this.success();
    }).catch((i) => {
      console.error("Erreur lors de la copie :", i);
    }) : this.fallbackCopyTextToClipboard(e);
  }
  fallbackCopyTextToClipboard(t) {
    const e = document.createElement("textarea");
    e.value = t, e.style.position = "fixed", document.body.appendChild(e), e.focus(), e.select();
    try {
      document.execCommand("copy") ? this.success() : console.error("Erreur lors de la copie de secours");
    } catch (i) {
      console.error("Erreur lors de la copie de secours :", i);
    }
    document.body.removeChild(e);
  }
  success() {
    this.timeoutId && clearTimeout(this.timeoutId);
    const t = document.createElement("span");
    t.setAttribute("class", "a-copy__success | tx-ps"), t.innerHTML = "Lien copi\xE9 !", this.el.insertAdjacentElement("beforeend", t), this.timeoutId = setTimeout(() => {
      t.remove();
    }, 3e3);
  }
};
var tc = class extends D {
  constructor(t) {
    super(t), this.events = {}, this.isMobile = window.innerWidth <= 1024, this.isMobile ? (this.container = this.$("infoMobile")[0], this.content = this.$("contentMobile")[0], this.height = this.content.scrollHeight + 2) : (this.container = this.$("info")[0], this.content = this.$("content")[0], this.height = this.content.scrollHeight + 2 + 30);
  }
  onScrollProgress() {
    const e = this.el.getBoundingClientRect(), i = window.innerHeight;
    (this.isMobile ? e.top < 10 && e.bottom > i : e.top < 0) ? (this.container.classList.add("-isVisible"), this.container.style.setProperty("--height", `${this.height}px`)) : (this.container.classList.remove("-isVisible"), this.container.style.setProperty("--height", "0px"));
  }
};
var ec = class extends D {
  constructor(t) {
    super(t), this.events = {
      keydown: "onKeydown",
      update: "onChange"
    }, this.config = {
      "seller-siret": {
        maxLength: 13
      },
      phone: {
        maxLength: 10
      }
    };
  }
  onKeydown(t) {
    const e = this.el.getAttribute("name"), i = this.config[e];
    i && (!this.isDigit(t.key) && !this.isControlKey(t) && t.preventDefault(), this.checkMaxLength(t, i.maxLength));
  }
  checkMaxLength(t, e) {
    t.target.value.length > e && !this.isControlKey(t) && t.preventDefault();
  }
  isDigit(t) {
    return /^[0-9]$/.test(t);
  }
  isControlKey(t) {
    return ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(t.key);
  }
};
var nc = class extends Cn {
  afterSuccess(t) {
    t.sent && (this.call("clearCache", null, "Website", "website"), setTimeout(() => {
      const i = new URLSearchParams(window.location.search).get("redirect");
      i && Y.go(i);
    }, 4500));
  }
};
var ic = class extends D {
  constructor(t) {
    super(t), this.events = {
      click: "onClick",
      change: {
        region: "onChangeRegion",
        department: "onChangeDepartment"
      },
      submit: "onSubmit"
    };
  }
  init() {
    try {
      this.regions = JSON.parse(this.el.dataset.regions || "[]");
    } catch (t) {
      this.regions = [], console.warn("Error parsing regions data:", t);
    }
  }
  onChangeRegion(t) {
    const [e] = this.$("department"), i = e.querySelectorAll("option"), r = this.regions.find((s) => s.id === t.target.value);
    if (!r) {
      e.value = "", i.forEach((s) => {
        s.style.display = "block";
      });
      return;
    }
    i.forEach((s) => {
      if (s.value === "") {
        s.style.display = "block";
        return;
      }
      s.style.display = r.departments.includes(Number(s.value)) ? "block" : "none";
    }), r.departments.includes(Number(e.value)) || (e.value = "");
  }
  onChangeDepartment(t) {
    const e = Number(t.target.value), i = this.regions.find((s) => s.departments.includes(e)), [r] = this.$("region");
    if (r.querySelectorAll("option"), !i) {
      r.value = "", this.onChangeRegion({
        target: r
      });
      return;
    }
    r.value = i.id, this.onChangeRegion({
      target: r
    });
  }
  onClick(t) {
    const {
      target: e
    } = t, {
      action: i
    } = e.dataset;
    i && this[i] && this[i](t);
  }
  onSubmit(t) {
    t.preventDefault();
    const e = new URLSearchParams(new FormData(t.target)).toString();
    Y.go(this.el.action + "?" + e);
  }
  submitWithoutSearch(t) {
    t.preventDefault(), Y.go(this.el.action);
  }
};
var rc = Object.freeze(Object.defineProperty({
  __proto__: null,
  Accordeon: Ja,
  AdsFilters: tl,
  AdsListing: rl,
  AdsRegions: ic,
  Article: tc,
  Button: Za,
  City: Kl,
  Copy: Zl,
  Form: Cn,
  FormSign: nc,
  FormSteps: Wl,
  Game: ll,
  Header: al,
  Input: ec,
  ListCards: cl,
  Menu: va,
  Multiselect: Yl,
  Pagination: Ql,
  Popin: Qa,
  PopinContact: Gl,
  Profile: Jl,
  Range: Xl,
  Scroll: ga,
  Slider: Xa,
  Steps: Ul,
  Styleguide: sl,
  Test: ol,
  Title: Bl,
  Website: oa
}, Symbol.toStringTag, {
  value: "Module"
}));
window.addEventListener("load", () => {
  const n2 = () => {
    const e = new Gr({
      modules: rc
    });
    e.init(e);
  }, t = document.getElementById("main-css");
  if (!t) {
    console.warn('The "main-css" stylesheet not found');
    return;
  }
  t.isLoaded ? n2() : t.addEventListener("load", n2);
});

// entities/worksheet.ts
function validateString(value, fieldName, id) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError(`Worksheet ${id}: missing or invalid ${fieldName}`);
  }
  return value.trim();
}
function parseRawWorksheet(raw) {
  if (raw === null || typeof raw !== "object") {
    throw new TypeError("Invalid worksheet entry (not an object)");
  }
  const idNum = Number(raw.id);
  if (!Number.isFinite(idNum) || !Number.isInteger(Math.round(idNum)) || idNum <= 0) {
    throw new TypeError(`Invalid worksheet id: ${raw.id}`);
  }
  const id = Math.round(idNum);
  const name = validateString(raw.name, "name", id);
  const priceStr = validateString(raw.price, "price", id);
  const priceKopecks = Math.round(Number(priceStr) * 100);
  const unitUrl = validateString(raw.unit, "unit URL", id);
  const previewUrl = validateString(raw.preview, "preview URL", id);
  const illustrationUrl = validateString(raw.illustration, "illustration URL", id);
  const description = validateString(raw.description, "description", id);
  return {
    id,
    name,
    priceKopecks,
    unitUrl,
    previewUrl,
    illustrationUrl,
    description
  };
}
function formatPrice(kopecks) {
  const rub = Math.floor(kopecks / 100);
  const kope = Math.abs(kopecks % 100);
  return `${new Intl.NumberFormat("ru-RU").format(rub)},${kope.toString().padStart(2, "0")} \u20BD`;
}

// entities/cartModel.ts
var CartModel = class {
  constructor() {
    this.items = /* @__PURE__ */ new Map();
  }
  /**
   * Возвращает массив копий элементов корзины.
   */
  getItems() {
    return Array.from(this.items.values()).map((i) => ({ ...i }));
  }
  /**
   * Проверяет, есть ли товар с указанным id в корзине.
   */
  has(worksheetId) {
    return this.items.has(worksheetId);
  }
  /**
   * Добавляет элемент в корзину, только если такого ещё нет.
   * Возвращает true при успешном добавлении, false если элемент уже присутствует.
   * Бросает ошибку, если worksheetId некорректен.
   */
  add(item) {
    const id = item.worksheetId;
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid worksheetId");
    }
    if (this.items.has(id))
      return false;
    this.items.set(id, { worksheetId: id, name: String(item.name), priceKopecks: Number(item.priceKopecks) });
    return true;
  }
  /**
   * Удаляет товар по worksheetId. Возвращает true, если товар был удалён.
   */
  remove(worksheetId) {
    return this.items.delete(worksheetId);
  }
  /**
   * Полностью очищает корзину.
   */
  clear() {
    this.items.clear();
  }
  /**
   * Подсчитывает итоговые суммы в копейках.
   * Возвращает объект { subtotalKopecks, totalKopecks }.
   * На текущий момент total == subtotal (без налогов/доставки).
   */
  getTotals() {
    let subtotal = 0;
    for (const it2 of this.items.values()) {
      subtotal += Math.round(it2.priceKopecks);
    }
    return { subtotalKopecks: subtotal, totalKopecks: subtotal };
  }
  /**
   * Сериализует текущее состояние корзины в CartSnapshot.
   */
  serialize() {
    return {
      version: 1,
      items: this.getItems(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  /**
   * Загружает snapshot в модель. Если snapshot === null — ничего не делает.
   * Этот метод НЕ выполняет побочных эффектов (не записывает в storage, не эмитит событий).
   */
  loadSnapshot(snapshot) {
    this.items.clear();
    if (!snapshot || !Array.isArray(snapshot.items))
      return;
    for (const it2 of snapshot.items) {
      if (it2 && Number.isInteger(it2.worksheetId) && it2.worksheetId > 0) {
        this.items.set(it2.worksheetId, { worksheetId: it2.worksheetId, name: it2.name, priceKopecks: it2.priceKopecks });
      }
    }
  }
};

// adapters/storageAdapter.ts
var NAMESPACE = "pechaton";
function cookieKey(key) {
  return `${NAMESPACE}:${key}`;
}
function encodePayload(payload) {
  return encodeURIComponent(JSON.stringify(payload));
}
function decodePayload(raw) {
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
}
function setCookieRaw(name, value, days) {
  let expires = "";
  if (typeof days === "number") {
    const d = /* @__PURE__ */ new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1e3);
    expires = `; Expires=${d.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; Path=/; SameSite=Lax`;
}
function getCookieRaw(name) {
  const raw = document.cookie;
  if (!raw)
    return null;
  const parts = raw.split("; ").map((p) => p.trim());
  for (const p of parts) {
    if (p.startsWith(`${name}=`)) {
      return p.substring(name.length + 1);
    }
  }
  return null;
}
var storageAdapter = {
  /**
   * Set a namespaced value in cookies.
   *
   * @param key - logical key
   * @param value - serializable value
   * @param options - optional storage options (days)
   */
  set(key, value, options) {
    const days = options?.days ?? 180;
    const payload = { v: 1, ts: (/* @__PURE__ */ new Date()).toISOString(), data: value };
    const encoded = encodePayload(payload);
    setCookieRaw(cookieKey(key), encoded, days);
  },
  /**
   * Get a namespaced value from cookies.
   *
   * @param key - logical key
   * @returns parsed value or null
   */
  get(key) {
    const raw = getCookieRaw(cookieKey(key));
    if (!raw)
      return null;
    const parsed = decodePayload(raw);
    if (!parsed || parsed.data === void 0)
      return null;
    return parsed.data;
  },
  /**
   * Remove a namespaced cookie by expiring it.
   *
   * @param key - logical key to remove
   */
  remove(key) {
    setCookieRaw(cookieKey(key), "", -1);
  }
};
var storageAdapter_default = storageAdapter;

// entities/base.ts
var EventDetail = class {
  constructor(event) {
    this.event = event;
  }
  /**
   * toJSON используется при логировании/сериализации.
   * Подклассы обычно расширяют этот метод, возвращая свои поля.
   */
  toJSON() {
    return { event: this.event };
  }
};

// entities/eventDetails.ts
var CartUpdatedDetail = class extends EventDetail {
  constructor(items) {
    super("cart:updated" /* CART_UPDATED */);
    this.items = items;
  }
  /**
   * Сериализация детали — полезна для логирования.
   */
  toJSON() {
    return { event: this.event, items: this.items };
  }
};
var CheckoutStartDetail = class extends EventDetail {
  constructor(orderId) {
    super("cart:checkout-start" /* CHECKOUT_START */);
    this.orderId = orderId;
  }
  toJSON() {
    return { event: this.event, orderId: this.orderId };
  }
};
var CheckoutProgressDetail = class extends EventDetail {
  constructor(inProgress) {
    super("cart:checkout-progress" /* CHECKOUT_PROGRESS */);
    this.inProgress = inProgress;
  }
  toJSON() {
    return { event: this.event, inProgress: this.inProgress };
  }
};
var CheckoutStatusDetail = class extends EventDetail {
  constructor(orderId, status, message) {
    super("cart:checkout-status" /* CHECKOUT_STATUS */);
    this.orderId = orderId;
    this.status = status;
    this.message = message;
  }
  toJSON() {
    return { event: this.event, orderId: this.orderId, status: this.status, message: this.message };
  }
};
var CheckoutSuccessDetail = class extends EventDetail {
  constructor(orderId) {
    super("cart:checkout-success" /* CHECKOUT_SUCCESS */);
    this.orderId = orderId;
  }
  toJSON() {
    return { event: this.event, orderId: this.orderId, status: "paid" /* PAID */ };
  }
};
var CheckoutFailedDetail = class extends EventDetail {
  constructor(orderId, message) {
    super("cart:checkout-failed" /* CHECKOUT_FAILED */);
    this.orderId = orderId;
    this.message = message;
  }
  toJSON() {
    return { event: this.event, orderId: this.orderId, message: this.message };
  }
};
function isCartUpdated(d) {
  return d instanceof CartUpdatedDetail;
}
function isCheckoutStart(d) {
  return d instanceof CheckoutStartDetail;
}
function isCheckoutProgress(d) {
  return d instanceof CheckoutProgressDetail;
}
function isCheckoutStatus(d) {
  return d instanceof CheckoutStatusDetail;
}
function isCheckoutSuccess(d) {
  return d instanceof CheckoutSuccessDetail;
}
function isCheckoutFailed(d) {
  return d instanceof CheckoutFailedDetail;
}

// services/events.ts
var EventBus = class {
  /**
   * Emit a typed event.
   *
   * @param detail - an instance of one of event detail classes (EventDetailUnion).
   * This instance will be attached to CustomEvent.detail and dispatched on window.
   *
   * Note: listeners receive the actual class instance (not a plain object).
   */
  static emit(detail) {
    const ev = new CustomEvent(detail.event, { detail });
    window.dispatchEvent(ev);
  }
  /**
   * Subscribe to an event.
   *
   * @param eventName - one of EventNames enum values.
   * @param listener - callback that receives the typed detail instance. At runtime a guard
   * checks that the detail matches the expected class before calling the listener.
   * @returns unsubscribe function.
   *
   * Implementation note:
   * - The wrapper uses runtime instanceof checks (via the isX guards) to ensure that only
   *   valid class instances are forwarded to the listener.
   * - If an external emitter dispatches a plain object (not an instance), it will be ignored
   *   by the wrapper. If you want to accept plain objects, implement fromJSON factory methods
   *   in detail classes and attempt reconstruction here.
   */
  static on(eventName, listener) {
    const wrapper = (ev) => {
      const ce2 = ev;
      const d = ce2.detail;
      switch (eventName) {
        case "cart:updated" /* CART_UPDATED */:
          if (isCartUpdated(d))
            listener(d);
          break;
        case "cart:checkout-start" /* CHECKOUT_START */:
          if (isCheckoutStart(d))
            listener(d);
          break;
        case "cart:checkout-progress" /* CHECKOUT_PROGRESS */:
          if (isCheckoutProgress(d))
            listener(d);
          break;
        case "cart:checkout-status" /* CHECKOUT_STATUS */:
          if (isCheckoutStatus(d))
            listener(d);
          break;
        case "cart:checkout-success" /* CHECKOUT_SUCCESS */:
          if (isCheckoutSuccess(d))
            listener(d);
          break;
        case "cart:checkout-failed" /* CHECKOUT_FAILED */:
          if (isCheckoutFailed(d))
            listener(d);
          break;
      }
    };
    window.addEventListener(eventName, wrapper);
    return () => window.removeEventListener(eventName, wrapper);
  }
  /**
   * Unregister a previously registered EventListener (low-level).
   *
   * @param eventName - string event name (prefer EventNames enum when calling).
   * @param listener - actual EventListener to remove.
   *
   * Note: prefer the unsubscribe returned by on(...) instead of calling off directly.
   */
  static off(eventName, listener) {
    window.removeEventListener(eventName, listener);
  }
};

// services/cartController.ts
var CART_KEY = "cart_v1";
var DEFAULT_DAYS = 180;
var CartController = class {
  constructor() {
    this.checkoutInProgress = false;
    this.model = new CartModel();
    this.initFromStorage();
  }
  /**
   * Load snapshot from storage (if present) and emit initial CART_UPDATED event.
   * Note: CartUpdatedDetail currently expects (items, totals) but here only items are passed.
   * Please ensure CartUpdatedDetail signature matches usage.
   */
  initFromStorage() {
    const snap = storageAdapter_default.get(CART_KEY);
    if (snap) {
      this.model.loadSnapshot(snap);
    }
    const items = this.model.getItems();
    EventBus.emit(new CartUpdatedDetail(items));
  }
  /**
   * Persist cart snapshot to storage.
   */
  persist() {
    const snapshot = this.model.serialize();
    storageAdapter_default.set(CART_KEY, snapshot, { days: DEFAULT_DAYS });
  }
  /**
   * Add worksheet (one copy only). Returns true if item was added, false if it was already present.
   *
   * @param ws - object with id, name and priceKopecks properties.
   */
  addFromWorksheet(ws2) {
    const success = this.model.add({
      worksheetId: ws2.id,
      name: ws2.name,
      priceKopecks: ws2.priceKopecks
    });
    if (success) {
      this.persist();
      EventBus.emit(new CartUpdatedDetail(this.model.getItems()));
    }
    if (!success) {
      console.log("addFromWorksheet: item already existed in cart");
    }
    return success;
  }
  /**
   * Remove item by worksheetId.
   *
   * @param worksheetId - numeric id to remove.
   * @returns true if removed.
   */
  removeFromWorksheet(worksheetId) {
    const success = this.model.remove(worksheetId);
    if (success) {
      this.persist();
      EventBus.emit(new CartUpdatedDetail(this.model.getItems()));
    }
    if (!success) {
      console.log("removeFromWorksheet: item not found in cart");
    }
    return success;
  }
  /**
   * Clear the cart and persist the empty state.
   */
  clear() {
    this.model.clear();
    this.persist();
    EventBus.emit(new CartUpdatedDetail(this.model.getItems()));
  }
  /**
   * Get current cart items.
   *
   * @returns array of CartItem (worksheetId, name, priceKopecks).
   */
  getItems() {
    return this.model.getItems();
  }
  /**
   * Get totals. Since CartTotals was removed, totals reflect subtotal only.
   *
   * @returns object with subtotalKopecks and totalKopecks (equal for now).
   */
  getTotals() {
    return this.model.getTotals();
  }
  /**
   * Check whether item exists in the cart.
   */
  has(worksheetId) {
    return this.model.has(worksheetId);
  }
  /**
   * Set checkout-in-progress flag and emit CheckoutProgressDetail.
   *
   * @param flag - boolean indicating whether checkout is in progress.
   */
  setCheckoutInProgress(flag) {
    this.checkoutInProgress = !!flag;
    EventBus.emit(new CheckoutProgressDetail(this.checkoutInProgress));
  }
  /**
   * Get current checkout-in-progress flag.
   */
  getCheckoutInProgress() {
    return this.checkoutInProgress;
  }
};
var cartController = new CartController();
var cartController_default = cartController;

// ui/productCard.ts
function createProductCard(ws2) {
  const productLink = `./product?id=${ws2.id}`;
  const outer = document.createElement("a");
  outer.className = "col mb-5";
  outer.href = productLink;
  outer.setAttribute("aria-label", `\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0442\u043E\u0432\u0430\u0440\u0443 ${ws2.name}`);
  outer.dataset.barbaTrigger = "catalog-card";
  const card = document.createElement("div");
  card.className = "card h-100 | -radius";
  card.setAttribute("data-id", String(ws2.id));
  const img = document.createElement("img");
  img.className = "card-img-top";
  const match = ws2.previewUrl.match(/id=(.*)$/);
  img.src = `media/previews/${match?.[1]}.png`;
  console.log("productCard: img.src:", img.src);
  img.alt = ws2.name;
  const body = document.createElement("div");
  body.className = "card-body p-4";
  const bodyInner = document.createElement("div");
  bodyInner.className = "text-center";
  const title = document.createElement("h5");
  title.className = "tx-xs";
  title.textContent = ws2.name;
  const priceEl = document.createElement("div");
  priceEl.innerText = formatPrice(ws2.priceKopecks);
  bodyInner.appendChild(title);
  bodyInner.appendChild(priceEl);
  body.appendChild(bodyInner);
  const footer = document.createElement("div");
  footer.className = "card-footer p-4 pt-0 border-top-0 bg-transparent";
  const footerInner = document.createElement("div");
  footerInner.className = "text-center";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "a-social | a-button -secondary js-add-to-cart";
  btn.setAttribute("role", "button");
  btn.setAttribute("data-id", String(ws2.id));
  btn.setAttribute("aria-label", `Add ${ws2.name} to cart`);
  btn.style.cursor = "pointer";
  btn.innerHTML = `<svg aria-hidden="true" class="a-svg" focusable="false"><use href="#icon-cart"></use></svg>&nbsp;\u0412&nbsp;\u043A\u043E\u0440\u0437\u0438\u043D\u0443`;
  footerInner.appendChild(btn);
  footer.appendChild(footerInner);
  card.appendChild(img);
  card.appendChild(body);
  card.appendChild(footer);
  outer.appendChild(card);
  const isAdded = cartController_default.has(ws2.id);
  if (isAdded) {
    setAddedState(btn);
  } else {
    setDefaultState(btn);
  }
  btn.addEventListener("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (btnHasAddedState(btn)) {
      flashElement(btn);
      return;
    }
    setAddedState(btn);
    dropHeaderFor2s();
    let worksheet = ws2;
    try {
      if (!worksheet || typeof worksheet.id !== "number") {
        const id = Number(btn.getAttribute("data-id"));
        const maybe = await catalogService_default.getById(id);
        if (!maybe)
          throw new Error("Worksheet not found");
        worksheet = maybe;
      }
      const added = cartController_default.addFromWorksheet(worksheet);
      if (!added) {
        setAddedState(btn);
        flashElement(btn);
      }
    } catch (err) {
      console.error("add to cart failed", err);
      setDefaultState(btn);
      alert("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.");
    }
  });
  return outer;
}
function setAddedState(button) {
  const svg = button.querySelector("svg");
  const svgHtml = svg ? svg.outerHTML : "";
  button.classList.remove("-secondary");
  if (!button.classList.contains("-tertiary"))
    button.classList.add("-tertiary");
  button.setAttribute("aria-pressed", "true");
  button.setAttribute("aria-disabled", "true");
  button.style.pointerEvents = "none";
  if (svgHtml) {
    button.innerHTML = `${svgHtml}&nbsp;\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E`;
  } else {
    button.textContent = "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E";
  }
}
function setDefaultState(button) {
  const svg = button.querySelector("svg");
  const svgHtml = svg ? svg.outerHTML : "";
  button.classList.remove("-tertiary");
  if (!button.classList.contains("-secondary"))
    button.classList.add("-secondary");
  button.removeAttribute("aria-pressed");
  button.removeAttribute("aria-disabled");
  button.style.pointerEvents = "";
  if (svgHtml) {
    button.innerHTML = `${svgHtml}&nbsp;\u0412&nbsp;\u043A\u043E\u0440\u0437\u0438\u043D\u0443`;
  } else {
    button.textContent = "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443";
  }
}
function btnHasAddedState(button) {
  return button.classList.contains("-tertiary") || button.getAttribute("aria-disabled") === "true";
}
function updateAllProductButtons(detail) {
  const cartItemIds = new Set(detail.items.map((item) => item.worksheetId));
  const buttons = Array.from(document.querySelectorAll(".js-add-to-cart[data-id]"));
  for (const button of buttons) {
    const wsIdStr = button.getAttribute("data-id");
    if (!wsIdStr)
      continue;
    const wsId = Number.parseInt(wsIdStr, 10);
    if (Number.isNaN(wsId))
      continue;
    const isInCart = cartItemIds.has(wsId);
    if (isInCart) {
      setAddedState(button);
    } else {
      setDefaultState(button);
    }
  }
}
function flashElement(el2) {
  try {
    el2.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.04)" }, { transform: "scale(1)" }],
      { duration: 220 }
    );
  } catch {
  }
}
function appendProductCardTo(ws2, container) {
  const card = createProductCard(ws2);
  container.appendChild(card);
}
EventBus.on("cart:updated" /* CART_UPDATED */, (detail) => {
  if (detail instanceof CartUpdatedDetail) {
    updateAllProductButtons(detail);
  }
});

// ui/cartView.ts
var cartModal = null;
var savedScrollPosition = 0;
var unsubscribeCartUpdated = null;
function openCartModal() {
  console.log("openCartModal");
  savedScrollPosition = window.scrollY || document.documentElement.scrollTop;
  fetch("order.html").then((response) => response.text()).then((html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const modal = doc.querySelector('.m-popin[data-module-popin="contact"]');
    if (!modal)
      return;
    document.body.appendChild(modal);
    cartModal = modal;
    modal.classList.add("-isOpen");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.addEventListener("click", onModalClick, { capture: true });
    const listEl = modal.querySelector("#cart-list");
    if (listEl)
      listEl.addEventListener("click", onListClick);
    unsubscribeCartUpdated = EventBus.on("cart:updated" /* CART_UPDATED */, () => renderCart());
    renderCart();
  }).catch((err) => {
    console.error("Failed to load cart:", err);
  });
}
function closeCartModal() {
  if (!cartModal) {
    if (window.location.hash === "#cart") {
      if (history.pushState) {
        history.pushState(null, "", window.location.pathname);
      }
    }
    document.body.style.overflow = "";
    return;
  }
  if (unsubscribeCartUpdated) {
    try {
      unsubscribeCartUpdated();
    } catch {
    }
    unsubscribeCartUpdated = null;
  }
  try {
    cartModal.removeEventListener("click", onModalClick, { capture: true });
    const listEl = cartModal.querySelector("#cart-list");
    if (listEl)
      listEl.removeEventListener("click", onListClick);
  } catch {
  }
  cartModal.remove();
  cartModal = null;
  document.body.style.overflow = "";
  window.scrollTo(0, savedScrollPosition);
  if (window.location.hash === "#cart") {
    if (history.pushState) {
      history.pushState(null, "", window.location.pathname);
    }
  }
}
function onModalClick(e) {
  const target = e.target;
  const closeBtn = target.closest('[data-action="close"]');
  if (closeBtn) {
    e.preventDefault();
    closeCartModal();
  }
}
function onListClick(e) {
  const target = e.target;
  const itemEl = target.closest("[data-cart-item]");
  if (!itemEl)
    return;
  if (target.matches('[data-item-menu="open"]')) {
    const openBtn = itemEl.querySelector('[data-item-menu="open"]');
    const actions = itemEl.querySelector('[data-item-menu="actions"]');
    if (openBtn && actions) {
      openBtn.style.display = "none";
      actions.style.display = "";
    }
    return;
  }
  if (target.matches('[data-item-action="back"]')) {
    const openBtn2 = itemEl.querySelector('[data-item-menu="open"]');
    const actions2 = itemEl.querySelector('[data-item-menu="actions"]');
    if (openBtn2 && actions2) {
      actions2.style.display = "none";
      openBtn2.style.display = "";
    }
    return;
  }
  if (target.matches('[data-item-action="remove"]')) {
    const wsidStr = itemEl.getAttribute("data-wsid");
    const wsid = wsidStr ? parseInt(wsidStr, 10) : NaN;
    if (!Number.isNaN(wsid)) {
      cartController_default.removeFromWorksheet(wsid);
    }
    return;
  }
}
function renderCart() {
  if (!cartModal)
    return;
  const list = cartModal.querySelector("#cart-list");
  const empty = cartModal.querySelector("#empty-cart-state");
  const emailField = cartModal.querySelector('[data-name="buyer-email"]');
  const submitField = cartModal.querySelector(".a-inputField__submit");
  if (!list || !empty)
    return;
  list.innerHTML = "";
  const items = cartController_default.getItems();
  if (items.length === 0) {
    empty.style.display = "";
    list.style.display = "none";
    if (emailField)
      emailField.style.display = "none";
    if (submitField)
      submitField.style.display = "none";
    return;
  }
  empty.style.display = "none";
  list.style.display = "";
  if (emailField)
    emailField.style.display = "";
  if (submitField)
    submitField.style.display = "";
  items.forEach((it2, idx) => {
    const num = String(idx + 1).padStart(2, "0");
    const li2 = document.createElement("li");
    li2.className = "m-stepItem m-accordeon__content";
    li2.setAttribute("data-cart-item", "");
    li2.setAttribute("data-wsid", String(it2.worksheetId));
    li2.innerHTML = `
<div class="m-stepItem__header">
  <div class="m-stepItem__lead">
    <span class="a-tag -round m-stepItem__num" aria-hidden="true">${num}</span>
    <div class="m-stepItem__titleWrap">
      <p class="m-stepItem__title">${escapeHtml(it2.name)}</p>
      <div class="m-stepItem__tags" aria-label="\u041C\u0435\u0442\u043A\u0438 \u0442\u043E\u0432\u0430\u0440\u0430">
        <span class="m-tag -purple">\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</span>
        <span class="m-tag -outline">\u0410\u0440\u0442. ${it2.worksheetId}</span>
      </div>
    </div>
  </div>
  <div class="m-cartItem__actions">
    <button class="a-button -tertiary -flat" data-item-menu="open" title="\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F">\u2026</button>
    <span class="m-cartItem__actionsInline" data-item-menu="actions" style="display: none;">
      <button class="a-button -tertiary -small" data-item-action="remove">\u0443\u0434\u0430\u043B\u0438\u0442\u044C</button>
      <button class="a-button -tertiary -small -outlineBack" data-item-action="back">\u043E\u0431\u0440\u0430\u0442\u043D\u043E</button>
    </span>
  </div>
</div>`;
    list.appendChild(li2);
  });
}
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m]);
}
window.addEventListener("popstate", function(_e2) {
  if (cartModal && window.location.hash !== "#cart") {
    closeCartModal();
  }
});

// adapters/barbaAdapter.ts
function rebindPage(container) {
  console.log("barbaAdapter: rebindPage");
  const root = container ?? document;
  const addButtons = Array.from(root.querySelectorAll(".js-add-to-cart"));
  addButtons.forEach((btn) => {
    if (btn.__add_to_cart_bound)
      return;
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const idAttr = btn.getAttribute("data-id");
      if (!idAttr) {
        console.warn("add-to-cart clicked without data-id");
        return;
      }
      const id = Number(idAttr);
      if (!Number.isInteger(id) || id <= 0) {
        console.warn("invalid product id", idAttr);
        return;
      }
      const exists = cartController_default.getItems().some((i) => i.worksheetId === id);
      if (exists) {
        btn.animate([{ transform: "scale(1)" }, { transform: "scale(1.04)" }, { transform: "scale(1)" }], { duration: 220 });
        return;
      }
      try {
        const ws2 = await catalogService_default.getById(id);
        if (!ws2) {
          alert("\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
          return;
        }
        cartController_default.addFromWorksheet(ws2);
        openCartModal();
      } catch (err) {
        console.error("add-to-cart error", err);
        alert("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443");
      }
    });
    btn.__add_to_cart_bound = true;
  });
}

// services/catalogService.ts
var CATALOG_URL = "assets/goods.json";
var CatalogService = class {
  constructor() {
    this.cache = null;
  }
  /**
   * Fetch and return all worksheets from the goods.json.
   *
   * - Uses an in-memory cache to avoid refetching.
   * - Parses and validates entries with parseRawWorksheet; invalid entries are skipped with a warning.
   *
   * @returns Promise resolving to an array of valid Worksheet objects.
   */
  async getAll() {
    console.log("catalogService: getAllGoods");
    if (this.cache)
      return Array.from(this.cache.values());
    console.log("catalogService: getAllGoods, no cache");
    const resp = await fetch(CATALOG_URL, { method: "GET", credentials: "same-origin" });
    if (!resp.ok) {
      throw new Error(`Failed to load catalog: ${resp.status} ${resp.statusText}`);
    }
    const raw = await resp.json();
    if (!Array.isArray(raw)) {
      throw new Error("Invalid goods.json format: expected array");
    }
    const map = /* @__PURE__ */ new Map();
    for (const entry of raw) {
      try {
        const ws2 = parseRawWorksheet(entry);
        map.set(ws2.id, ws2);
      } catch (err) {
        console.warn("catalogService: skipping invalid entry", err);
      }
    }
    this.cache = map;
    return Array.from(map.values());
  }
  /**
   * Get a worksheet by its numeric id.
   *
   * - If cache is present and contains the id, returns the item.
   * - Otherwise triggers getAll() to populate cache and then tries again.
   *
   * @param id - numeric worksheet id
   * @returns Promise resolving to Worksheet or null if not found
   * todo get rid of getAll() call here
   */
  async getById(id) {
    if (this.cache && this.cache.has(id))
      return this.cache.get(id) ?? null;
    await this.getAll();
    return this.cache?.get(id) ?? null;
  }
  /**
   * Clear the in-memory catalog cache.
   */
  clearCache() {
    this.cache = null;
  }
  /**
   * Render the catalog into the provided container (or the default grid).
   *
   * - This method fetches items (using the internal cache) and programmatically
   *   creates product card nodes via appendProductCardTo (from ui/productCard).
   * - After appending cards, it calls rebindPage(rowElement) to attach click handlers.
   *
   * @param container - optional ParentNode or CSS selector string for the row container.
   *                    If omitted, uses '#catalog-grid .row' or '#catalog-grid' as fallback.
   * @returns Promise resolving to the array of rendered Worksheet objects.
   */
  async renderCatalog(container) {
    console.log("catalogService: renderCatalog");
    let rowEl = null;
    if (typeof container === "string") {
      const node = document.querySelector(container);
      rowEl = node ?? null;
    } else if (container instanceof Node) {
      rowEl = container;
    } else {
      rowEl = document.querySelector("#catalog-grid .row") || document.querySelector("#catalog-grid");
    }
    if (!rowEl) {
      throw new Error('Catalog grid container not found. Expected selector "#catalog-grid .row" or pass container.');
    }
    let appendTarget = rowEl;
    if (rowEl.classList && rowEl.classList.contains("column-22")) {
      const inner = rowEl.querySelector(".row");
      if (inner)
        appendTarget = inner;
    }
    while (appendTarget.firstChild) {
      appendTarget.removeChild(appendTarget.firstChild);
    }
    const loader = document.createElement("div");
    loader.className = "catalog-loader";
    loader.textContent = "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...";
    appendTarget.appendChild(loader);
    try {
      const items = await this.getAll();
      if (loader.parentNode)
        loader.parentNode.removeChild(loader);
      console.log("catalogService: appendTarget children count:", appendTarget.childElementCount);
      for (const ws2 of items) {
        appendProductCardTo(ws2, appendTarget);
      }
      try {
        rebindPage(appendTarget);
      } catch (err) {
        console.warn("catalogService: rebindPage failed", err);
      }
      return items;
    } catch (err) {
      if (loader.parentNode)
        loader.parentNode.removeChild(loader);
      throw err;
    }
  }
};
var catalogService = new CatalogService();
var catalogService_default = catalogService;

// ui/productPage.ts
function parseIdFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("id");
  if (!raw)
    return null;
  const n2 = Number(raw);
  if (!Number.isFinite(n2) || !Number.isInteger(n2) || n2 <= 0)
    return null;
  return n2;
}
async function initProductPage(container) {
  const id = parseIdFromLocation();
  if (!id) {
    console.error("productPage: missing or invalid id in URL");
    showNotFound(container);
    return;
  }
  let worksheet = null;
  worksheet = await catalogService_default.getById(id) ?? null;
  if (!worksheet) {
    showNotFound(container);
    return;
  }
  try {
    document.title = `${worksheet.name} \u2014 \u041F\u0435\u0447\u0430\u0442\u043E\u043D`;
  } catch (e) {
    console.warn("productPage: error setting document title", e);
  }
  const titleEl = container.querySelector("[data-title=title]") || container.querySelector(".a-title");
  if (titleEl)
    titleEl.textContent = worksheet.name;
  const bigH1 = container.querySelector("h1.a-title");
  if (bigH1)
    bigH1.textContent = worksheet.name;
  const idBubble = container.querySelector(".m-adDetail__circle");
  if (idBubble)
    idBubble.textContent = String(worksheet.id);
  const priceElById = container.querySelector("#product-price");
  if (priceElById) {
    priceElById.textContent = formatPrice(worksheet.priceKopecks);
  } else {
    const mDetails = Array.from(container.querySelectorAll(".t-adsItem__details .m-adDetail, .m-adDetail"));
    if (mDetails.length >= 3) {
      const el2 = mDetails[2].querySelector(".tx-s");
      if (el2)
        el2.textContent = formatPrice(worksheet.priceKopecks);
    } else {
      const anyPrice = container.querySelector(".m-adDetail .tx-s, .a-price, .product-price");
      if (anyPrice)
        anyPrice.textContent = formatPrice(worksheet.priceKopecks);
    }
  }
  const descById = container.querySelector("#product-description");
  if (descById) {
    descById.textContent = worksheet.description;
  } else {
    const descEl = container.querySelector(".t-adsItem__description, .m-contentPublic, .m-contentPublic__ahead");
    if (descEl) {
      descEl.textContent = worksheet.description;
    }
  }
  const img = container.querySelector("#product-preview");
  if (img) {
    img.src = worksheet.previewUrl;
    img.alt = worksheet.name;
  } else {
    const contactBlock = container.querySelector(".t-adsItem__contact");
    if (contactBlock) {
      const fig = document.createElement("figure");
      fig.className = "a-image t-adsItem__contactCover -product-preview";
      const newImg = document.createElement("img");
      newImg.id = "product-preview";
      newImg.className = "a-image__image js-image-image -landscape";
      newImg.alt = worksheet.name;
      newImg.src = worksheet.previewUrl;
      fig.appendChild(newImg);
      contactBlock.parentNode?.replaceChild(fig, contactBlock);
    }
  }
  const backBtn = document.querySelector(".js-back-to-resources") || container.querySelector("[data-back-button]") || // try to find button with exact text 'Материалы'
  Array.from(document.querySelectorAll("button, a")).find((el2) => el2.textContent?.trim() === "\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B");
  if (backBtn) {
    backBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      if (window.history.length > 1) {
        history.back();
      } else {
        window.location.href = "./resources.html";
      }
    });
  }
  const addBtn = container.querySelector(".js-add-to-cart");
  if (addBtn) {
    addBtn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      try {
        const added = cartController_default.addFromWorksheet(worksheet);
        if (added) {
          addBtn.textContent = "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E";
          addBtn.classList.remove("-secondary");
          addBtn.classList.add("-tertiary");
          addBtn.setAttribute("aria-disabled", "true");
        } else {
          try {
            addBtn.animate([{ transform: "scale(1)" }, { transform: "scale(1.04)" }, { transform: "scale(1)" }], { duration: 200 });
          } catch {
          }
        }
      } catch (err) {
        console.error("productPage: add to cart failed", err);
        alert("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443");
      }
    });
  }
}
function showNotFound(container) {
  const root = container ?? document;
  const holder = document.createElement("div");
  holder.className = "product-not-found";
  holder.innerHTML = "<p>\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D. \u0412\u0435\u0440\u043D\u0438\u0442\u0435\u0441\u044C \u043D\u0430\u0437\u0430\u0434.</p>";
  root.appendChild(holder);
  setTimeout(() => {
    if (window.history.length > 1)
      history.back();
    else
      window.location.href = "./resources.html";
  }, 2500);
}

// assets/mybarba.ts
function registerCatalogRenderer() {
  const handled = /* @__PURE__ */ new WeakSet();
  function handleCatalogFound(el2) {
    if (handled.has(el2))
      return;
    handled.add(el2);
    (async () => {
      try {
        const grid = el2.querySelector("#catalog-grid");
        const target = grid ?? el2;
        await catalogService_default.renderCatalog(target);
      } catch (err) {
        console.warn("catalog rendering failed for detected container", err);
      }
    })();
  }
  async function scanExisting() {
    console.log("mybarba: scanExisting");
    const catalogEl = document.querySelector('[data-barba-namespace="catalog"]' /* CATALOG */);
    if (catalogEl)
      handleCatalogFound(catalogEl);
    const productEl = document.querySelector('[data-barba-namespace="product-item"]' /* PRODUCT */);
    if (productEl)
      initProductPage(productEl);
  }
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        scanExisting();
      },
      { once: true }
    );
  } else {
    scanExisting();
  }
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (let i = 0; i < m.addedNodes.length; i++) {
        const node = m.addedNodes[i];
        if (node.nodeType !== Node.ELEMENT_NODE)
          continue;
        const el2 = node;
        if (el2.matches('[data-barba-namespace="catalog"]' /* CATALOG */)) {
          console.log("mybarba: calling renderCatalog from mutation observer", el2);
          handleCatalogFound(el2);
          continue;
        } else if (el2.matches('[data-barba-namespace="product-item"]' /* PRODUCT */)) {
          console.log("mybarba: calling initProductPage from mutation observer", el2);
          initProductPage(el2);
          continue;
        }
      }
    }
  });
  const root = document.documentElement ?? document.body;
  if (root) {
    observer.observe(root, { childList: true, subtree: true });
  }
  window.addEventListener(
    "beforeunload",
    () => {
      observer.disconnect();
    },
    { once: true }
  );
}

// index.ts
var ONCE_ANIMATE_CLASS = "-onceAnimate";
var LOADER_CLEANUP_TIMEOUT = 6e3;
function dropHeaderFor2s() {
  const headerElement = document.querySelector('[data-module-header="header"]') || document.querySelector("header");
  if (!headerElement) {
    console.warn("Header element not found");
    return;
  }
  const wasAlreadyVisible = !headerElement.classList.contains("-isHidden");
  headerElement.classList.remove("-isHidden");
  const initialScrollY = window.scrollY;
  const initialUrl = window.location.href;
  let wasHiddenManually = false;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        if (headerElement.classList.contains("-isHidden")) {
          wasHiddenManually = true;
        }
      }
    });
  });
  observer.observe(headerElement, {
    attributes: true,
    attributeFilter: ["class"]
  });
  const timeoutId = window.setTimeout(() => {
    observer.disconnect();
    const currentUrl = window.location.href;
    const urlChanged = currentUrl !== initialUrl;
    const currentScrollY = window.scrollY;
    const scrollDidNotGoUp = currentScrollY >= initialScrollY;
    if (scrollDidNotGoUp && !wasHiddenManually && !wasAlreadyVisible && !urlChanged) {
      headerElement.classList.add("-isHidden");
    }
  }, 2e3);
  return {
    cancel: () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    }
  };
}
function init() {
  console.log("index.ts: init");
  try {
    registerCatalogRenderer();
  } catch (err) {
    console.warn("registerCatalogRenderer failed", err);
  }
  scheduleLoaderCleanup();
  const catalogGrid = document.getElementById("catalog-grid");
  if (catalogGrid) {
  } else {
    console.debug("catalogGrid not found on initial load");
  }
  refreshCartBadge();
  setupCartHashRouting();
}
function refreshCartBadge() {
  const count = cartController_default.getItems().length;
  const badges = Array.from(document.querySelectorAll(".js-cart-count"));
  for (const el2 of badges) {
    el2.textContent = String(count);
    el2.setAttribute("aria-label", `Cart items: ${count}`);
  }
}
function setupCartHashRouting() {
  console.log("setupCartHashRouting");
  const syncWithHash = () => {
    if (window.location.hash === "#cart") {
      openCartModal();
    } else {
      closeCartModal();
    }
  };
  window.addEventListener("hashchange", syncWithHash);
  syncWithHash();
}
function releaseInitialLoader() {
  const htmlEl = document.documentElement;
  if (htmlEl.classList.contains("is-loading")) {
    htmlEl.classList.remove("is-loading");
    htmlEl.classList.add("is-loaded");
  }
  const loaderEl = document.getElementById("js-loader");
  if (loaderEl) {
    try {
      loaderEl.remove();
    } catch {
      loaderEl.style.display = "none";
    }
  }
  document.body.style.overflow = "";
}
function scheduleLoaderCleanup() {
  const body = document.body;
  if (!body) {
    releaseInitialLoader();
    return;
  }
  let cleaned = false;
  let observer = null;
  let fallbackId = null;
  const cleanup = () => {
    if (cleaned) {
      return;
    }
    cleaned = true;
    if (observer) {
      observer.disconnect();
    }
    if (fallbackId !== null) {
      window.clearTimeout(fallbackId);
    }
    releaseInitialLoader();
  };
  if (body.classList.contains(ONCE_ANIMATE_CLASS)) {
    cleanup();
    return;
  }
  observer = new MutationObserver(() => {
    if (body.classList.contains(ONCE_ANIMATE_CLASS)) {
      cleanup();
    }
  });
  observer.observe(body, { attributes: true, attributeFilter: ["class"] });
  fallbackId = window.setTimeout(cleanup, LOADER_CLEANUP_TIMEOUT);
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
export {
  dropHeaderFor2s,
  init,
  refreshCartBadge
};
