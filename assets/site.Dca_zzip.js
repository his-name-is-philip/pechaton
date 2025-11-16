function he(n) {
    "@babel/helpers - typeof";
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? he = function(t) {
        return typeof t
    } : he = function(t) {
        return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, he(n)
}

function ci(n, t) {
    if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function jr(n, t) {
    for (var e = 0; e < t.length; e++) {
        var i = t[e];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i)
    }
}

function ui(n, t, e) {
    return t && jr(n.prototype, t), n
}

function Fn(n, t, e) {
    return t in n ? Object.defineProperty(n, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[t] = e, n
}

function le(n, t) {
    return Hr(n) || Br(n, t) || hi(n, t) || Wr()
}

function zr(n) {
    return Nr(n) || Vr(n) || hi(n) || Ur()
}

function Nr(n) {
    if (Array.isArray(n)) return Me(n)
}

function Hr(n) {
    if (Array.isArray(n)) return n
}

function Vr(n) {
    if (typeof Symbol < "u" && Symbol.iterator in Object(n)) return Array.from(n)
}

function Br(n, t) {
    if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(n)))) {
        var e = [],
            i = !0,
            r = !1,
            s = void 0;
        try {
            for (var o = n[Symbol.iterator](), l; !(i = (l = o.next()).done) && (e.push(l.value), !(t && e.length === t)); i = !0);
        } catch (a) {
            r = !0, s = a
        } finally {
            try {
                !i && o.return != null && o.return()
            } finally {
                if (r) throw s
            }
        }
        return e
    }
}

function hi(n, t) {
    if (n) {
        if (typeof n == "string") return Me(n, t);
        var e = Object.prototype.toString.call(n).slice(8, -1);
        if (e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set") return Array.from(n);
        if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return Me(n, t)
    }
}

function Me(n, t) {
    (t == null || t > n.length) && (t = n.length);
    for (var e = 0, i = new Array(t); e < t; e++) i[e] = n[e];
    return i
}

function Ur() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Wr() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
var D = function() {
        function n(t) {
            ci(this, n), this.mAttr = "data-" + t.dataName, this.mCaptureEvents = ["mouseenter", "mouseleave"], this.el = t.el
        }
        return ui(n, [{
            key: "mInit",
            value: function(e) {
                var i = this;
                this.modules = e, this.mCheckEventTarget = this.mCheckEventTarget.bind(this), this.events && Object.keys(this.events).forEach(function(r) {
                    return i.mAddEvent(r)
                })
            }
        }, {
            key: "mUpdate",
            value: function(e) {
                this.modules = e
            }
        }, {
            key: "mDestroy",
            value: function() {
                var e = this;
                this.events && Object.keys(this.events).forEach(function(i) {
                    return e.mRemoveEvent(i)
                })
            }
        }, {
            key: "mAddEvent",
            value: function(e) {
                var i = !!this.mCaptureEvents.includes(e);
                this.el.addEventListener(e, this.mCheckEventTarget, i)
            }
        }, {
            key: "mRemoveEvent",
            value: function(e) {
                var i = !!this.mCaptureEvents.includes(e);
                this.el.removeEventListener(e, this.mCheckEventTarget, i)
            }
        }, {
            key: "mCheckEventTarget",
            value: function(e) {
                var i = this.events[e.type];
                if (typeof i == "string") this[i](e);
                else {
                    var r = "[" + this.mAttr + "]",
                        s = e.target;
                    if (this.mCaptureEvents.includes(e.type)) s.matches(r) && this.mCallEventMethod(e, i, s);
                    else
                        for (; s && s !== document && !(s.matches(r) && this.mCallEventMethod(e, i, s) != "undefined");) s = s.parentNode
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
                    }), this[o](e)
                }
            }
        }, {
            key: "$",
            value: function(e, i) {
                var r = e.indexOf("."),
                    s = e.indexOf("#"),
                    o = e.indexOf("["),
                    l = [r, s, o].filter(function(d) {
                        return d != -1
                    }),
                    a = !1,
                    c = e,
                    u = "",
                    h = this.el;
                return l.length && (a = Math.min.apply(Math, zr(l)), c = e.slice(0, a), u = e.slice(a)), he(i) == "object" && (h = i), h.querySelectorAll("[" + this.mAttr + "=" + c + "]" + u)
            }
        }, {
            key: "parent",
            value: function(e, i) {
                for (var r = "[" + this.mAttr + "=" + e + "]", s = i.parentNode; s && s !== document;) {
                    if (s.matches(r)) return s;
                    s = s.parentNode
                }
            }
        }, {
            key: "getData",
            value: function(e, i) {
                var r = i || this.el;
                return r.getAttribute(this.mAttr + "-" + e)
            }
        }, {
            key: "setData",
            value: function(e, i, r) {
                var s = r || this.el;
                return s.setAttribute(this.mAttr + "-" + e, i)
            }
        }, {
            key: "call",
            value: function(e, i, r, s) {
                var o = this;
                i && !r && (r = i, i = !1), this.modules[r] && (s ? this.modules[r][s] && this.modules[r][s][e](i) : Object.keys(this.modules[r]).forEach(function(l) {
                    o.modules[r][l][e](i)
                }))
            }
        }, {
            key: "on",
            value: function(e, i, r, s) {
                var o = this;
                this.modules[i] && (s ? this.modules[i][s].el.addEventListener(e, function(l) {
                    return r(l)
                }) : Object.keys(this.modules[i]).forEach(function(l) {
                    o.modules[i][l].el.addEventListener(e, function(a) {
                        return r(a)
                    })
                }))
            }
        }, {
            key: "init",
            value: function() {}
        }, {
            key: "destroy",
            value: function() {}
        }]), n
    }(),
    Gr = function() {
        function n(t) {
            ci(this, n), this.app, this.modules = t.modules, this.currentModules = {}, this.activeModules = {}, this.newModules = {}, this.moduleId = 0
        }
        return ui(n, [{
            key: "init",
            value: function(e, i) {
                var r = this,
                    s = i || document,
                    o = s.querySelectorAll("*");
                e && !this.app && (this.app = e), this.activeModules.app = {
                    app: this.app
                }, o.forEach(function(l) {
                    Array.from(l.attributes).forEach(function(a) {
                        if (a.name.startsWith("data-module")) {
                            var c = !1,
                                u = a.name.split("-").splice(2),
                                h = r.toCamel(u);
                            if (r.modules[h] ? c = !0 : r.modules[r.toUpper(h)] && (h = r.toUpper(h), c = !0), c) {
                                var d = {
                                        el: l,
                                        name: h,
                                        dataName: u.join("-")
                                    },
                                    v = new r.modules[h](d),
                                    f = a.value;
                                f || (r.moduleId++, f = "m" + r.moduleId, l.setAttribute(a.name, f)), r.addActiveModule(h, f, v);
                                var p = h + "-" + f;
                                i ? r.newModules[p] = v : r.currentModules[p] = v
                            }
                        }
                    })
                }), Object.entries(this.currentModules).forEach(function(l) {
                    var a = le(l, 2),
                        c = a[0],
                        u = a[1];
                    if (i) {
                        var h = c.split("-"),
                            d = h.shift(),
                            v = h.pop();
                        r.addActiveModule(d, v, u)
                    } else r.initModule(u)
                })
            }
        }, {
            key: "initModule",
            value: function(e) {
                e.mInit(this.activeModules), e.init()
            }
        }, {
            key: "addActiveModule",
            value: function(e, i, r) {
                this.activeModules[e] ? Object.assign(this.activeModules[e], Fn({}, i, r)) : this.activeModules[e] = Fn({}, i, r)
            }
        }, {
            key: "update",
            value: function(e) {
                var i = this;
                this.init(this.app, e), Object.entries(this.currentModules).forEach(function(r) {
                    var s = le(r, 2);
                    s[0];
                    var o = s[1];
                    o.mUpdate(i.activeModules)
                }), Object.entries(this.newModules).forEach(function(r) {
                    var s = le(r, 2);
                    s[0];
                    var o = s[1];
                    i.initModule(o)
                }), Object.assign(this.currentModules, this.newModules)
            }
        }, {
            key: "destroy",
            value: function(e) {
                e ? this.destroyScope(e) : this.destroyModules()
            }
        }, {
            key: "destroyScope",
            value: function(e) {
                var i = this,
                    r = e.querySelectorAll("*");
                r.forEach(function(s) {
                    Array.from(s.attributes).forEach(function(o) {
                        if (o.name.startsWith("data-module")) {
                            var l = o.value,
                                a = o.name.split("-").splice(2),
                                c = i.toCamel(a) + "-" + l,
                                u = !1;
                            i.currentModules[c] ? u = !0 : i.currentModules[i.toUpper(c)] && (c = i.toUpper(c), u = !0), u && (i.destroyModule(i.currentModules[c]), delete i.currentModules[c])
                        }
                    })
                }), this.activeModules = {}, this.newModules = {}
            }
        }, {
            key: "destroyModules",
            value: function() {
                var e = this;
                Object.entries(this.currentModules).forEach(function(i) {
                    var r = le(i, 2);
                    r[0];
                    var s = r[1];
                    e.destroyModule(s)
                }), this.currentModules = []
            }
        }, {
            key: "destroyModule",
            value: function(e) {
                e.mDestroy(), e.destroy()
            }
        }, {
            key: "toCamel",
            value: function(e) {
                var i = this;
                return e.reduce(function(r, s) {
                    return r + i.toUpper(s)
                })
            }
        }, {
            key: "toUpper",
            value: function(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }
        }]), n
    }();

function Kr(n, t) {
    for (var e = 0; e < t.length; e++) {
        var i = t[e];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, typeof(r = function(s, o) {
            if (typeof s != "object" || s === null) return s;
            var l = s[Symbol.toPrimitive];
            if (l !== void 0) {
                var a = l.call(s, "string");
                if (typeof a != "object") return a;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(s)
        }(i.key)) == "symbol" ? r : String(r), i)
    }
    var r
}

function Je(n, t, e) {
    return t && Kr(n.prototype, t), Object.defineProperty(n, "prototype", {
        writable: !1
    }), n
}

function at() {
    return at = Object.assign ? Object.assign.bind() : function(n) {
        for (var t = 1; t < arguments.length; t++) {
            var e = arguments[t];
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i])
        }
        return n
    }, at.apply(this, arguments)
}

function ge(n, t) {
    n.prototype = Object.create(t.prototype), n.prototype.constructor = n, Xt(n, t)
}

function $e(n) {
    return $e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
    }, $e(n)
}

function Xt(n, t) {
    return Xt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, i) {
        return e.__proto__ = i, e
    }, Xt(n, t)
}

function Yr() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
    } catch {
        return !1
    }
}

function Re(n, t, e) {
    return Re = Yr() ? Reflect.construct.bind() : function(i, r, s) {
        var o = [null];
        o.push.apply(o, r);
        var l = new(Function.bind.apply(i, o));
        return s && Xt(l, s.prototype), l
    }, Re.apply(null, arguments)
}

function De(n) {
    var t = typeof Map == "function" ? new Map : void 0;
    return De = function(e) {
        if (e === null || Function.toString.call(e).indexOf("[native code]") === -1) return e;
        if (typeof e != "function") throw new TypeError("Super expression must either be null or a function");
        if (t !== void 0) {
            if (t.has(e)) return t.get(e);
            t.set(e, i)
        }

        function i() {
            return Re(e, arguments, $e(this).constructor)
        }
        return i.prototype = Object.create(e.prototype, {
            constructor: {
                value: i,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), Xt(i, e)
    }, De(n)
}

function Xr(n) {
    if (n === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return n
}
var bt, Jr = function() {
    this.before = void 0, this.beforeLeave = void 0, this.leave = void 0, this.afterLeave = void 0, this.beforeEnter = void 0, this.enter = void 0, this.afterEnter = void 0, this.after = void 0
};
(function(n) {
    n[n.off = 0] = "off", n[n.error = 1] = "error", n[n.warning = 2] = "warning", n[n.info = 3] = "info", n[n.debug = 4] = "debug"
})(bt || (bt = {}));
var qn = bt.off,
    Lt = function() {
        function n(e) {
            this.t = void 0, this.t = e
        }
        n.getLevel = function() {
            return qn
        }, n.setLevel = function(e) {
            return qn = bt[e]
        };
        var t = n.prototype;
        return t.error = function() {
            this.i(console.error, bt.error, [].slice.call(arguments))
        }, t.warn = function() {
            this.i(console.warn, bt.warning, [].slice.call(arguments))
        }, t.info = function() {
            this.i(console.info, bt.info, [].slice.call(arguments))
        }, t.debug = function() {
            this.i(console.log, bt.debug, [].slice.call(arguments))
        }, t.i = function(e, i, r) {
            i <= n.getLevel() && e.apply(console, ["[" + this.t + "] "].concat(r))
        }, n
    }();

function Dt(n) {
    return n.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")
}

function jn(n) {
    return n && n.sensitive ? "" : "i"
}
var ht = {
        container: "container",
        history: "history",
        namespace: "namespace",
        prefix: "data-barba",
        prevent: "prevent",
        wrapper: "wrapper"
    },
    It = new(function() {
        function n() {
            this.o = ht, this.u = void 0, this.h = {
                after: null,
                before: null,
                parent: null
            }
        }
        var t = n.prototype;
        return t.toString = function(e) {
            return e.outerHTML
        }, t.toDocument = function(e) {
            return this.u || (this.u = new DOMParser), this.u.parseFromString(e, "text/html")
        }, t.toElement = function(e) {
            var i = document.createElement("div");
            return i.innerHTML = e, i
        }, t.getHtml = function(e) {
            return e === void 0 && (e = document), this.toString(e.documentElement)
        }, t.getWrapper = function(e) {
            return e === void 0 && (e = document), e.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]')
        }, t.getContainer = function(e) {
            return e === void 0 && (e = document), e.querySelector("[" + this.o.prefix + '="' + this.o.container + '"]')
        }, t.removeContainer = function(e) {
            document.body.contains(e) && (this.v(e), e.parentNode.removeChild(e))
        }, t.addContainer = function(e, i) {
            var r = this.getContainer() || this.h.before;
            r ? this.l(e, r) : this.h.after ? this.h.after.parentNode.insertBefore(e, this.h.after) : this.h.parent ? this.h.parent.appendChild(e) : i.appendChild(e)
        }, t.getSibling = function() {
            return this.h
        }, t.getNamespace = function(e) {
            e === void 0 && (e = document);
            var i = e.querySelector("[" + this.o.prefix + "-" + this.o.namespace + "]");
            return i ? i.getAttribute(this.o.prefix + "-" + this.o.namespace) : null
        }, t.getHref = function(e) {
            if (e.tagName && e.tagName.toLowerCase() === "a") {
                if (typeof e.href == "string") return e.href;
                var i = e.getAttribute("href") || e.getAttribute("xlink:href");
                if (i) return this.resolveUrl(i.baseVal || i)
            }
            return null
        }, t.resolveUrl = function() {
            var e = [].slice.call(arguments).length;
            if (e === 0) throw new Error("resolveUrl requires at least one argument; got none.");
            var i = document.createElement("base");
            if (i.href = arguments[0], e === 1) return i.href;
            var r = document.getElementsByTagName("head")[0];
            r.insertBefore(i, r.firstChild);
            for (var s, o = document.createElement("a"), l = 1; l < e; l++) o.href = arguments[l], i.href = s = o.href;
            return r.removeChild(i), s
        }, t.l = function(e, i) {
            i.parentNode.insertBefore(e, i.nextSibling)
        }, t.v = function(e) {
            return this.h = {
                after: e.nextElementSibling,
                before: e.previousElementSibling,
                parent: e.parentElement
            }, this.h
        }, n
    }()),
    Qr = function() {
        function n() {
            this.p = void 0, this.m = [], this.P = -1
        }
        var t = n.prototype;
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
            window.history && window.history.replaceState(s, "", e)
        }, t.change = function(e, i, r) {
            if (r && r.state) {
                var s = r.state,
                    o = s.index;
                i = this.g(this.P - o), this.replace(s.states), this.P = o
            } else this.add(e, i);
            return i
        }, t.add = function(e, i, r, s) {
            var o = r ?? this.R(i),
                l = {
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
                    this.set(this.P, l)
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
                    window.history && window.history.replaceState(a, "", e)
            }
        }, t.store = function(e, i) {
            var r = i || this.P,
                s = this.get(r);
            s.data = at({}, s.data, e), this.set(r, s);
            var o = {
                from: this.p,
                index: this.P,
                states: [].concat(this.m)
            };
            window.history.replaceState(o, "")
        }, t.update = function(e, i) {
            var r = i || this.P,
                s = at({}, this.get(r), e);
            this.set(r, s)
        }, t.remove = function(e) {
            e ? this.m.splice(e, 1) : this.m.pop(), this.P--
        }, t.clear = function() {
            this.m = [], this.P = -1
        }, t.replace = function(e) {
            this.m = e
        }, t.get = function(e) {
            return this.m[e]
        }, t.set = function(e, i) {
            return this.m[e] = i
        }, t.R = function(e) {
            var i = "push",
                r = e,
                s = ht.prefix + "-" + ht.history;
            return r.hasAttribute && r.hasAttribute(s) && (i = r.getAttribute(s)), i
        }, t.g = function(e) {
            return Math.abs(e) > 1 ? e > 0 ? "forward" : "back" : e === 0 ? "popstate" : e > 0 ? "back" : "forward"
        }, Je(n, [{
            key: "current",
            get: function() {
                return this.m[this.P]
            }
        }, {
            key: "previous",
            get: function() {
                return this.P < 1 ? null : this.m[this.P - 1]
            }
        }, {
            key: "size",
            get: function() {
                return this.m.length
            }
        }]), n
    }(),
    di = new Qr,
    de = function(n, t) {
        try {
            var e = function() {
                if (!t.next.html) return Promise.resolve(n).then(function(i) {
                    var r = t.next;
                    if (i) {
                        var s = It.toElement(i.html);
                        r.namespace = It.getNamespace(s), r.container = It.getContainer(s), r.url = i.url, r.html = i.html, di.update({
                            ns: r.namespace
                        });
                        var o = It.toDocument(i.html);
                        document.title = o.title
                    }
                })
            }();
            return Promise.resolve(e && e.then ? e.then(function() {}) : void 0)
        } catch (i) {
            return Promise.reject(i)
        }
    },
    fi = function n(t, e, i) {
        return t instanceof RegExp ? function(r, s) {
            if (!s) return r;
            for (var o = /\((?:\?<(.*?)>)?(?!\?)/g, l = 0, a = o.exec(r.source); a;) s.push({
                name: a[1] || l++,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: ""
            }), a = o.exec(r.source);
            return r
        }(t, e) : Array.isArray(t) ? function(r, s, o) {
            var l = r.map(function(a) {
                return n(a, s, o).source
            });
            return new RegExp("(?:".concat(l.join("|"), ")"), jn(o))
        }(t, e, i) : function(r, s, o) {
            return function(l, a, c) {
                c === void 0 && (c = {});
                for (var u = c.strict, h = u !== void 0 && u, d = c.start, v = d === void 0 || d, f = c.end, p = f === void 0 || f, b = c.encode, m = b === void 0 ? function(B) {
                        return B
                    } : b, y = c.delimiter, g = y === void 0 ? "/#?" : y, w = c.endsWith, x = "[".concat(Dt(w === void 0 ? "" : w), "]|$"), S = "[".concat(Dt(g), "]"), E = v ? "^" : "", T = 0, A = l; T < A.length; T++) {
                    var C = A[T];
                    if (typeof C == "string") E += Dt(m(C));
                    else {
                        var L = Dt(m(C.prefix)),
                            I = Dt(m(C.suffix));
                        if (C.pattern)
                            if (a && a.push(C), L || I)
                                if (C.modifier === "+" || C.modifier === "*") {
                                    var P = C.modifier === "*" ? "?" : "";
                                    E += "(?:".concat(L, "((?:").concat(C.pattern, ")(?:").concat(I).concat(L, "(?:").concat(C.pattern, "))*)").concat(I, ")").concat(P)
                                } else E += "(?:".concat(L, "(").concat(C.pattern, ")").concat(I, ")").concat(C.modifier);
                        else E += C.modifier === "+" || C.modifier === "*" ? "((?:".concat(C.pattern, ")").concat(C.modifier, ")") : "(".concat(C.pattern, ")").concat(C.modifier);
                        else E += "(?:".concat(L).concat(I, ")").concat(C.modifier)
                    }
                }
                if (p) h || (E += "".concat(S, "?")), E += c.endsWith ? "(?=".concat(x, ")") : "$";
                else {
                    var _ = l[l.length - 1],
                        $ = typeof _ == "string" ? S.indexOf(_[_.length - 1]) > -1 : _ === void 0;
                    h || (E += "(?:".concat(S, "(?=").concat(x, "))?")), $ || (E += "(?=".concat(S, "|").concat(x, ")"))
                }
                return new RegExp(E, jn(c))
            }(function(l, a) {
                a === void 0 && (a = {});
                for (var c = function(I) {
                        for (var P = [], _ = 0; _ < I.length;) {
                            var $ = I[_];
                            if ($ !== "*" && $ !== "+" && $ !== "?")
                                if ($ !== "\\")
                                    if ($ !== "{")
                                        if ($ !== "}")
                                            if ($ !== ":")
                                                if ($ !== "(") P.push({
                                                    type: "CHAR",
                                                    index: _,
                                                    value: I[_++]
                                                });
                                                else {
                                                    var B = 1,
                                                        j = "";
                                                    if (I[M = _ + 1] === "?") throw new TypeError('Pattern cannot start with "?" at '.concat(M));
                                                    for (; M < I.length;)
                                                        if (I[M] !== "\\") {
                                                            if (I[M] === ")") {
                                                                if (--B == 0) {
                                                                    M++;
                                                                    break
                                                                }
                                                            } else if (I[M] === "(" && (B++, I[M + 1] !== "?")) throw new TypeError("Capturing groups are not allowed at ".concat(M));
                                                            j += I[M++]
                                                        } else j += I[M++] + I[M++];
                                                    if (B) throw new TypeError("Unbalanced pattern at ".concat(_));
                                                    if (!j) throw new TypeError("Missing pattern at ".concat(_));
                                                    P.push({
                                                        type: "PATTERN",
                                                        index: _,
                                                        value: j
                                                    }), _ = M
                                                }
                            else {
                                for (var R = "", M = _ + 1; M < I.length;) {
                                    var H = I.charCodeAt(M);
                                    if (!(H >= 48 && H <= 57 || H >= 65 && H <= 90 || H >= 97 && H <= 122 || H === 95)) break;
                                    R += I[M++]
                                }
                                if (!R) throw new TypeError("Missing parameter name at ".concat(_));
                                P.push({
                                    type: "NAME",
                                    index: _,
                                    value: R
                                }), _ = M
                            } else P.push({
                                type: "CLOSE",
                                index: _,
                                value: I[_++]
                            });
                            else P.push({
                                type: "OPEN",
                                index: _,
                                value: I[_++]
                            });
                            else P.push({
                                type: "ESCAPED_CHAR",
                                index: _++,
                                value: I[_++]
                            });
                            else P.push({
                                type: "MODIFIER",
                                index: _,
                                value: I[_++]
                            })
                        }
                        return P.push({
                            type: "END",
                            index: _,
                            value: ""
                        }), P
                    }(l), u = a.prefixes, h = u === void 0 ? "./" : u, d = "[^".concat(Dt(a.delimiter || "/#?"), "]+?"), v = [], f = 0, p = 0, b = "", m = function(I) {
                        if (p < c.length && c[p].type === I) return c[p++].value
                    }, y = function(I) {
                        var P = m(I);
                        if (P !== void 0) return P;
                        var _ = c[p],
                            $ = _.index;
                        throw new TypeError("Unexpected ".concat(_.type, " at ").concat($, ", expected ").concat(I))
                    }, g = function() {
                        for (var I, P = ""; I = m("CHAR") || m("ESCAPED_CHAR");) P += I;
                        return P
                    }; p < c.length;) {
                    var w = m("CHAR"),
                        x = m("NAME"),
                        S = m("PATTERN");
                    if (x || S) h.indexOf(T = w || "") === -1 && (b += T, T = ""), b && (v.push(b), b = ""), v.push({
                        name: x || f++,
                        prefix: T,
                        suffix: "",
                        pattern: S || d,
                        modifier: m("MODIFIER") || ""
                    });
                    else {
                        var E = w || m("ESCAPED_CHAR");
                        if (E) b += E;
                        else if (b && (v.push(b), b = ""), m("OPEN")) {
                            var T = g(),
                                A = m("NAME") || "",
                                C = m("PATTERN") || "",
                                L = g();
                            y("CLOSE"), v.push({
                                name: A || (C ? f++ : ""),
                                pattern: A && !C ? d : C,
                                prefix: T,
                                suffix: L,
                                modifier: m("MODIFIER") || ""
                            })
                        } else y("END")
                    }
                }
                return v
            }(r, o), s, o)
        }(t, e, i)
    },
    Zr = {
        __proto__: null,
        update: de,
        nextTick: function() {
            return new Promise(function(n) {
                window.requestAnimationFrame(n)
            })
        },
        pathToRegexp: fi
    },
    pi = function() {
        return window.location.origin
    },
    Jt = function(n) {
        return n === void 0 && (n = window.location.href), wt(n).port
    },
    wt = function(n) {
        var t, e = n.match(/:\d+/);
        if (e === null) /^http/.test(n) && (t = 80), /^https/.test(n) && (t = 443);
        else {
            var i = e[0].substring(1);
            t = parseInt(i, 10)
        }
        var r, s = n.replace(pi(), ""),
            o = {},
            l = s.indexOf("#");
        l >= 0 && (r = s.slice(l + 1), s = s.slice(0, l));
        var a = s.indexOf("?");
        return a >= 0 && (o = mi(s.slice(a + 1)), s = s.slice(0, a)), {
            hash: r,
            path: s,
            port: t,
            query: o
        }
    },
    mi = function(n) {
        return n.split("&").reduce(function(t, e) {
            var i = e.split("=");
            return t[i[0]] = i[1], t
        }, {})
    },
    Fe = function(n) {
        return n === void 0 && (n = window.location.href), n.replace(/(\/#.*|\/|#.*)$/, "")
    },
    ts = {
        __proto__: null,
        getHref: function() {
            return window.location.href
        },
        getAbsoluteHref: function(n, t) {
            return t === void 0 && (t = document.baseURI), new URL(n, t).href
        },
        getOrigin: pi,
        getPort: Jt,
        getPath: function(n) {
            return n === void 0 && (n = window.location.href), wt(n).path
        },
        getQuery: function(n, t) {
            return t === void 0 && (t = !1), t ? JSON.stringify(wt(n).query) : wt(n).query
        },
        getHash: function(n) {
            return wt(n).hash
        },
        parse: wt,
        parseQuery: mi,
        clean: Fe
    };

function es(n, t, e, i, r) {
    return t === void 0 && (t = 2e3), new Promise(function(s, o) {
        var l = new XMLHttpRequest;
        l.onreadystatechange = function() {
            if (l.readyState === XMLHttpRequest.DONE) {
                if (l.status === 200) {
                    var a = l.responseURL !== "" && l.responseURL !== n ? l.responseURL : n;
                    s({
                        html: l.responseText,
                        url: at({
                            href: a
                        }, wt(a))
                    }), i.update(n, {
                        status: "fulfilled",
                        target: a
                    })
                } else if (l.status) {
                    var c = {
                        status: l.status,
                        statusText: l.statusText
                    };
                    e(n, c), o(c), i.update(n, {
                        status: "rejected"
                    })
                }
            }
        }, l.ontimeout = function() {
            var a = new Error("Timeout error [" + t + "]");
            e(n, a), o(a), i.update(n, {
                status: "rejected"
            })
        }, l.onerror = function() {
            var a = new Error("Fetch error");
            e(n, a), o(a), i.update(n, {
                status: "rejected"
            })
        }, l.open("GET", n), l.timeout = t, l.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml"), l.setRequestHeader("x-barba", "yes"), r.all().forEach(function(a, c) {
            l.setRequestHeader(c, a)
        }), l.send()
    })
}

function ns(n) {
    return !!n && (typeof n == "object" || typeof n == "function") && typeof n.then == "function"
}

function jt(n, t) {
    return t === void 0 && (t = {}),
        function() {
            var e = arguments,
                i = !1,
                r = new Promise(function(s, o) {
                    t.async = function() {
                        return i = !0,
                            function(a, c) {
                                a ? o(a) : s(c)
                            }
                    };
                    var l = n.apply(t, [].slice.call(e));
                    i || (ns(l) ? l.then(s, o) : s(l))
                });
            return r
        }
}
var yt = new(function(n) {
        function t() {
            var i;
            return (i = n.call(this) || this).logger = new Lt("@barba/core"), i.all = ["ready", "page", "reset", "currentAdded", "currentRemoved", "nextAdded", "nextRemoved", "beforeOnce", "once", "afterOnce", "before", "beforeLeave", "leave", "afterLeave", "beforeEnter", "enter", "afterEnter", "after"], i.registered = new Map, i.init(), i
        }
        ge(t, n);
        var e = t.prototype;
        return e.init = function() {
            var i = this;
            this.registered.clear(), this.all.forEach(function(r) {
                i[r] || (i[r] = function(s, o) {
                    i.registered.has(r) || i.registered.set(r, new Set), i.registered.get(r).add({
                        ctx: o || {},
                        fn: s
                    })
                })
            })
        }, e.do = function(i) {
            var r = arguments,
                s = this;
            if (this.registered.has(i)) {
                var o = Promise.resolve();
                return this.registered.get(i).forEach(function(l) {
                    o = o.then(function() {
                        return jt(l.fn, l.ctx).apply(void 0, [].slice.call(r, 1))
                    })
                }), o.catch(function(l) {
                    s.logger.debug("Hook error [" + i + "]"), s.logger.error(l)
                })
            }
            return Promise.resolve()
        }, e.clear = function() {
            var i = this;
            this.all.forEach(function(r) {
                delete i[r]
            }), this.init()
        }, e.help = function() {
            this.logger.info("Available hooks: " + this.all.join(","));
            var i = [];
            this.registered.forEach(function(r, s) {
                return i.push(s)
            }), this.logger.info("Registered hooks: " + i.join(","))
        }, t
    }(Jr)),
    gi = function() {
        function n(t) {
            if (this.k = void 0, this.O = [], typeof t == "boolean") this.k = t;
            else {
                var e = Array.isArray(t) ? t : [t];
                this.O = e.map(function(i) {
                    return fi(i)
                })
            }
        }
        return n.prototype.checkHref = function(t) {
            if (typeof this.k == "boolean") return this.k;
            var e = wt(t).path;
            return this.O.some(function(i) {
                return i.exec(e) !== null
            })
        }, n
    }(),
    is = function(n) {
        function t(i) {
            var r;
            return (r = n.call(this, i) || this).T = new Map, r
        }
        ge(t, n);
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
            }
        }, e.get = function(i) {
            return this.T.get(i)
        }, e.getRequest = function(i) {
            return this.T.get(i).request
        }, e.getAction = function(i) {
            return this.T.get(i).action
        }, e.getStatus = function(i) {
            return this.T.get(i).status
        }, e.getTarget = function(i) {
            return this.T.get(i).target
        }, e.has = function(i) {
            return !this.checkHref(i) && this.T.has(i)
        }, e.delete = function(i) {
            return this.T.delete(i)
        }, e.update = function(i, r) {
            var s = at({}, this.T.get(i), r);
            return this.T.set(i, s), s
        }, t
    }(gi),
    rs = function() {
        function n() {
            this.A = new Map
        }
        var t = n.prototype;
        return t.set = function(e, i) {
            return this.A.set(e, i), {
                name: i
            }
        }, t.get = function(e) {
            return this.A.get(e)
        }, t.all = function() {
            return this.A
        }, t.has = function(e) {
            return this.A.has(e)
        }, t.delete = function(e) {
            return this.A.delete(e)
        }, t.clear = function() {
            return this.A.clear()
        }, n
    }(),
    ss = function() {
        return !window.history.pushState
    },
    os = function(n) {
        return !n.el || !n.href
    },
    as = function(n) {
        var t = n.event;
        return t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey
    },
    ls = function(n) {
        var t = n.el;
        return t.hasAttribute("target") && t.target === "_blank"
    },
    cs = function(n) {
        var t = n.el;
        return t.protocol !== void 0 && window.location.protocol !== t.protocol || t.hostname !== void 0 && window.location.hostname !== t.hostname
    },
    us = function(n) {
        var t = n.el;
        return t.port !== void 0 && Jt() !== Jt(t.href)
    },
    hs = function(n) {
        var t = n.el;
        return t.getAttribute && typeof t.getAttribute("download") == "string"
    },
    ds = function(n) {
        return n.el.hasAttribute(ht.prefix + "-" + ht.prevent)
    },
    fs = function(n) {
        return !!n.el.closest("[" + ht.prefix + "-" + ht.prevent + '="all"]')
    },
    ps = function(n) {
        var t = n.href;
        return Fe(t) === Fe() && Jt(t) === Jt()
    },
    ms = function(n) {
        function t(i) {
            var r;
            return (r = n.call(this, i) || this).suite = [], r.tests = new Map, r.init(), r
        }
        ge(t, n);
        var e = t.prototype;
        return e.init = function() {
            this.add("pushState", ss), this.add("exists", os), this.add("newTab", as), this.add("blank", ls), this.add("corsDomain", cs), this.add("corsPort", us), this.add("download", hs), this.add("preventSelf", ds), this.add("preventAll", fs), this.add("sameUrl", ps, !1)
        }, e.add = function(i, r, s) {
            s === void 0 && (s = !0), this.tests.set(i, r), s && this.suite.push(i)
        }, e.run = function(i, r, s, o) {
            return this.tests.get(i)({
                el: r,
                event: s,
                href: o
            })
        }, e.checkLink = function(i, r, s) {
            var o = this;
            return this.suite.some(function(l) {
                return o.run(l, i, r, s)
            })
        }, t
    }(gi),
    _e = function(n) {
        function t(e, i) {
            var r;
            return i === void 0 && (i = "Barba error"), (r = n.call.apply(n, [this].concat([].slice.call(arguments, 2))) || this).error = void 0, r.label = void 0, r.error = e, r.label = i, Error.captureStackTrace && Error.captureStackTrace(Xr(r), t), r.name = "BarbaError", r
        }
        return ge(t, n), t
    }(De(Error)),
    gs = function() {
        function n(e) {
            e === void 0 && (e = []), this.logger = new Lt("@barba/core"), this.all = [], this.page = [], this.once = [], this.j = [{
                name: "namespace",
                type: "strings"
            }, {
                name: "custom",
                type: "function"
            }], e && (this.all = this.all.concat(e)), this.update()
        }
        var t = n.prototype;
        return t.add = function(e, i) {
            e === "rule" ? this.j.splice(i.position || 0, 0, i.value) : this.all.push(i), this.update()
        }, t.resolve = function(e, i) {
            var r = this;
            i === void 0 && (i = {});
            var s = i.once ? this.once : this.page;
            s = s.filter(i.self ? function(d) {
                return d.name && d.name === "self"
            } : function(d) {
                return !d.name || d.name !== "self"
            });
            var o = new Map,
                l = s.find(function(d) {
                    var v = !0,
                        f = {};
                    return i.self && d.name === "self" ? (o.set(d, f), !0) : (r.j.reverse().forEach(function(p) {
                        v && (v = r.M(d, p, e, f), d.from && d.to && (v = r.M(d, p, e, f, "from") && r.M(d, p, e, f, "to")), d.from && !d.to && (v = r.M(d, p, e, f, "from")), !d.from && d.to && (v = r.M(d, p, e, f, "to")))
                    }), o.set(d, f), v)
                }),
                a = o.get(l),
                c = [];
            if (c.push(i.once ? "once" : "page"), i.self && c.push("self"), a) {
                var u, h = [l];
                Object.keys(a).length > 0 && h.push(a), (u = this.logger).info.apply(u, ["Transition found [" + c.join(",") + "]"].concat(h))
            } else this.logger.info("No transition found [" + c.join(",") + "]");
            return l
        }, t.update = function() {
            var e = this;
            this.all = this.all.map(function(i) {
                return e.N(i)
            }).sort(function(i, r) {
                return i.priority - r.priority
            }).reverse().map(function(i) {
                return delete i.priority, i
            }), this.page = this.all.filter(function(i) {
                return i.leave !== void 0 || i.enter !== void 0
            }), this.once = this.all.filter(function(i) {
                return i.once !== void 0
            })
        }, t.M = function(e, i, r, s, o) {
            var l = !0,
                a = !1,
                c = e,
                u = i.name,
                h = u,
                d = u,
                v = u,
                f = o ? c[o] : c,
                p = o === "to" ? r.next : r.current;
            if (o ? f && f[u] : f[u]) {
                switch (i.type) {
                    case "strings":
                    default:
                        var b = Array.isArray(f[h]) ? f[h] : [f[h]];
                        p[h] && b.indexOf(p[h]) !== -1 && (a = !0), b.indexOf(p[h]) === -1 && (l = !1);
                        break;
                    case "object":
                        var m = Array.isArray(f[d]) ? f[d] : [f[d]];
                        p[d] ? (p[d].name && m.indexOf(p[d].name) !== -1 && (a = !0), m.indexOf(p[d].name) === -1 && (l = !1)) : l = !1;
                        break;
                    case "function":
                        f[v](r) ? a = !0 : l = !1
                }
                a && (o ? (s[o] = s[o] || {}, s[o][u] = c[o][u]) : s[u] = c[u])
            }
            return l
        }, t.S = function(e, i, r) {
            var s = 0;
            return (e[i] || e.from && e.from[i] || e.to && e.to[i]) && (s += Math.pow(10, r), e.from && e.from[i] && (s += 1), e.to && e.to[i] && (s += 2)), s
        }, t.N = function(e) {
            var i = this;
            e.priority = 0;
            var r = 0;
            return this.j.forEach(function(s, o) {
                r += i.S(e, s.name, o + 1)
            }), e.priority = r, e
        }, n
    }();

function Bt(n, t) {
    try {
        var e = n()
    } catch (i) {
        return t(i)
    }
    return e && e.then ? e.then(void 0, t) : e
}
var vs = function() {
        function n(e) {
            e === void 0 && (e = []), this.logger = new Lt("@barba/core"), this.store = void 0, this.C = !1, this.store = new gs(e)
        }
        var t = n.prototype;
        return t.get = function(e, i) {
            return this.store.resolve(e, i)
        }, t.doOnce = function(e) {
            var i = e.data,
                r = e.transition;
            try {
                var s = function() {
                        o.C = !1
                    },
                    o = this,
                    l = r || {};
                o.C = !0;
                var a = Bt(function() {
                    return Promise.resolve(o.L("beforeOnce", i, l)).then(function() {
                        return Promise.resolve(o.once(i, l)).then(function() {
                            return Promise.resolve(o.L("afterOnce", i, l)).then(function() {})
                        })
                    })
                }, function(c) {
                    o.C = !1, o.logger.debug("Transition error [before/after/once]"), o.logger.error(c)
                });
                return Promise.resolve(a && a.then ? a.then(s) : s())
            } catch (c) {
                return Promise.reject(c)
            }
        }, t.doPage = function(e) {
            var i = e.data,
                r = e.transition,
                s = e.page,
                o = e.wrapper;
            try {
                var l = function(d) {
                        a.C = !1
                    },
                    a = this,
                    c = r || {},
                    u = c.sync === !0 || !1;
                a.C = !0;
                var h = Bt(function() {
                    function d() {
                        return Promise.resolve(a.L("before", i, c)).then(function() {
                            function f(b) {
                                return Promise.resolve(a.remove(i)).then(function() {
                                    return Promise.resolve(a.L("after", i, c)).then(function() {})
                                })
                            }
                            var p = function() {
                                if (u) return Bt(function() {
                                    return Promise.resolve(a.add(i, o)).then(function() {
                                        return Promise.resolve(a.L("beforeLeave", i, c)).then(function() {
                                            return Promise.resolve(a.L("beforeEnter", i, c)).then(function() {
                                                return Promise.resolve(Promise.all([a.leave(i, c), a.enter(i, c)])).then(function() {
                                                    return Promise.resolve(a.L("afterLeave", i, c)).then(function() {
                                                        return Promise.resolve(a.L("afterEnter", i, c)).then(function() {})
                                                    })
                                                })
                                            })
                                        })
                                    })
                                }, function(g) {
                                    if (a.H(g)) throw new _e(g, "Transition error [sync]")
                                });
                                var b = function(g) {
                                        return Bt(function() {
                                            var w = function() {
                                                if (m !== !1) return Promise.resolve(a.add(i, o)).then(function() {
                                                    return Promise.resolve(a.L("beforeEnter", i, c)).then(function() {
                                                        return Promise.resolve(a.enter(i, c, m)).then(function() {
                                                            return Promise.resolve(a.L("afterEnter", i, c)).then(function() {})
                                                        })
                                                    })
                                                })
                                            }();
                                            if (w && w.then) return w.then(function() {})
                                        }, function(w) {
                                            if (a.H(w)) throw new _e(w, "Transition error [before/after/enter]")
                                        })
                                    },
                                    m = !1,
                                    y = Bt(function() {
                                        return Promise.resolve(a.L("beforeLeave", i, c)).then(function() {
                                            return Promise.resolve(Promise.all([a.leave(i, c), de(s, i)]).then(function(g) {
                                                return g[0]
                                            })).then(function(g) {
                                                return m = g, Promise.resolve(a.L("afterLeave", i, c)).then(function() {})
                                            })
                                        })
                                    }, function(g) {
                                        if (a.H(g)) throw new _e(g, "Transition error [before/after/leave]")
                                    });
                                return y && y.then ? y.then(b) : b()
                            }();
                            return p && p.then ? p.then(f) : f()
                        })
                    }
                    var v = function() {
                        if (u) return Promise.resolve(de(s, i)).then(function() {})
                    }();
                    return v && v.then ? v.then(d) : d()
                }, function(d) {
                    throw a.C = !1, d.name && d.name === "BarbaError" ? (a.logger.debug(d.label), a.logger.error(d.error), d) : (a.logger.debug("Transition error [page]"), a.logger.error(d), d)
                });
                return Promise.resolve(h && h.then ? h.then(l) : l())
            } catch (d) {
                return Promise.reject(d)
            }
        }, t.once = function(e, i) {
            try {
                return Promise.resolve(yt.do("once", e, i)).then(function() {
                    return i.once ? jt(i.once, i)(e) : Promise.resolve()
                })
            } catch (r) {
                return Promise.reject(r)
            }
        }, t.leave = function(e, i) {
            try {
                return Promise.resolve(yt.do("leave", e, i)).then(function() {
                    return i.leave ? jt(i.leave, i)(e) : Promise.resolve()
                })
            } catch (r) {
                return Promise.reject(r)
            }
        }, t.enter = function(e, i, r) {
            try {
                return Promise.resolve(yt.do("enter", e, i)).then(function() {
                    return i.enter ? jt(i.enter, i)(e, r) : Promise.resolve()
                })
            } catch (s) {
                return Promise.reject(s)
            }
        }, t.add = function(e, i) {
            try {
                return It.addContainer(e.next.container, i), yt.do("nextAdded", e), Promise.resolve()
            } catch (r) {
                return Promise.reject(r)
            }
        }, t.remove = function(e) {
            try {
                return It.removeContainer(e.current.container), yt.do("currentRemoved", e), Promise.resolve()
            } catch (i) {
                return Promise.reject(i)
            }
        }, t.H = function(e) {
            return e.message ? !/Timeout error|Fetch error/.test(e.message) : !e.status
        }, t.L = function(e, i, r) {
            try {
                return Promise.resolve(yt.do(e, i, r)).then(function() {
                    return r[e] ? jt(r[e], r)(i) : Promise.resolve()
                })
            } catch (s) {
                return Promise.reject(s)
            }
        }, Je(n, [{
            key: "isRunning",
            get: function() {
                return this.C
            },
            set: function(e) {
                this.C = e
            }
        }, {
            key: "hasOnce",
            get: function() {
                return this.store.once.length > 0
            }
        }, {
            key: "hasSelf",
            get: function() {
                return this.store.all.some(function(e) {
                    return e.name === "self"
                })
            }
        }, {
            key: "shouldWait",
            get: function() {
                return this.store.all.some(function(e) {
                    return e.to && !e.to.route || e.sync
                })
            }
        }]), n
    }(),
    ys = function() {
        function n(t) {
            var e = this;
            this.names = ["beforeLeave", "afterLeave", "beforeEnter", "afterEnter"], this.byNamespace = new Map, t.length !== 0 && (t.forEach(function(i) {
                e.byNamespace.set(i.namespace, i)
            }), this.names.forEach(function(i) {
                yt[i](e._(i))
            }))
        }
        return n.prototype._ = function(t) {
            var e = this;
            return function(i) {
                var r = t.match(/enter/i) ? i.next : i.current,
                    s = e.byNamespace.get(r.namespace);
                return s && s[t] ? jt(s[t], s)(i) : Promise.resolve()
            }
        }, n
    }();
Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(n) {
    var t = this;
    do {
        if (t.matches(n)) return t;
        t = t.parentElement || t.parentNode
    } while (t !== null && t.nodeType === 1);
    return null
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
    },
    Y = new(function() {
        function n() {
            this.version = "2.10.3", this.schemaPage = bs, this.Logger = Lt, this.logger = new Lt("@barba/core"), this.plugins = [], this.timeout = void 0, this.cacheIgnore = void 0, this.cacheFirstPage = void 0, this.prefetchIgnore = void 0, this.preventRunning = void 0, this.hooks = yt, this.cache = void 0, this.headers = void 0, this.prevent = void 0, this.transitions = void 0, this.views = void 0, this.dom = It, this.helpers = Zr, this.history = di, this.request = es, this.url = ts, this.D = void 0, this.B = void 0, this.q = void 0, this.F = void 0
        }
        var t = n.prototype;
        return t.use = function(e, i) {
            var r = this.plugins;
            r.indexOf(e) > -1 ? this.logger.warn("Plugin [" + e.name + "] already installed.") : typeof e.install == "function" ? (e.install(this, i), r.push(e)) : this.logger.warn("Plugin [" + e.name + '] has no "install" method.')
        }, t.init = function(e) {
            var i = e === void 0 ? {} : e,
                r = i.transitions,
                s = r === void 0 ? [] : r,
                o = i.views,
                l = o === void 0 ? [] : o,
                a = i.schema,
                c = a === void 0 ? ht : a,
                u = i.requestError,
                h = i.timeout,
                d = h === void 0 ? 2e3 : h,
                v = i.cacheIgnore,
                f = v !== void 0 && v,
                p = i.cacheFirstPage,
                b = p !== void 0 && p,
                m = i.prefetchIgnore,
                y = m !== void 0 && m,
                g = i.preventRunning,
                w = g !== void 0 && g,
                x = i.prevent,
                S = x === void 0 ? null : x,
                E = i.debug,
                T = i.logLevel;
            if (Lt.setLevel((E !== void 0 && E) === !0 ? "debug" : T === void 0 ? "off" : T), this.logger.info(this.version), Object.keys(c).forEach(function(L) {
                    ht[L] && (ht[L] = c[L])
                }), this.B = u, this.timeout = d, this.cacheIgnore = f, this.cacheFirstPage = b, this.prefetchIgnore = y, this.preventRunning = w, this.q = this.dom.getWrapper(), !this.q) throw new Error("[@barba/core] No Barba wrapper found");
            this.I();
            var A = this.data.current;
            if (!A.container) throw new Error("[@barba/core] No Barba container found");
            if (this.cache = new is(f), this.headers = new rs, this.prevent = new ms(y), this.transitions = new vs(s), this.views = new ys(l), S !== null) {
                if (typeof S != "function") throw new Error("[@barba/core] Prevent should be a function");
                this.prevent.add("preventCustom", S)
            }
            this.history.init(A.url.href, A.namespace), b && this.cache.set(A.url.href, Promise.resolve({
                html: A.html,
                url: A.url
            }), "init", "fulfilled"), this.U = this.U.bind(this), this.$ = this.$.bind(this), this.X = this.X.bind(this), this.G(), this.plugins.forEach(function(L) {
                return L.init()
            });
            var C = this.data;
            C.trigger = "barba", C.next = C.current, C.current = at({}, this.schemaPage), this.hooks.do("ready", C), this.once(C), this.I()
        }, t.destroy = function() {
            this.I(), this.J(), this.history.clear(), this.hooks.clear(), this.plugins = []
        }, t.force = function(e) {
            window.location.assign(e)
        }, t.go = function(e, i, r) {
            var s;
            if (i === void 0 && (i = "barba"), this.F = null, this.transitions.isRunning) this.force(e);
            else if (!(s = i === "popstate" ? this.history.current && this.url.getPath(this.history.current.url) === this.url.getPath(e) && this.url.getQuery(this.history.current.url, !0) === this.url.getQuery(e, !0) : this.prevent.run("sameUrl", null, null, e)) || this.transitions.hasSelf) return i = this.history.change(this.cache.has(e) ? this.cache.get(e).target : e, i, r), r && (r.stopPropagation(), r.preventDefault()), this.page(e, i, r ?? void 0, s)
        }, t.once = function(e) {
            try {
                var i = this;
                return Promise.resolve(i.hooks.do("beforeEnter", e)).then(function() {
                    function r() {
                        return Promise.resolve(i.hooks.do("afterEnter", e)).then(function() {})
                    }
                    var s = function() {
                        if (i.transitions.hasOnce) {
                            var o = i.transitions.get(e, {
                                once: !0
                            });
                            return Promise.resolve(i.transitions.doOnce({
                                transition: o,
                                data: e
                            })).then(function() {})
                        }
                    }();
                    return s && s.then ? s.then(r) : r()
                })
            } catch (r) {
                return Promise.reject(r)
            }
        }, t.page = function(e, i, r, s) {
            try {
                var o, l = function() {
                        var h = a.data;
                        return Promise.resolve(a.hooks.do("page", h)).then(function() {
                            var d = function(v, f) {
                                try {
                                    var p = (b = a.transitions.get(h, {
                                        once: !1,
                                        self: s
                                    }), Promise.resolve(a.transitions.doPage({
                                        data: h,
                                        page: o,
                                        transition: b,
                                        wrapper: a.q
                                    })).then(function() {
                                        a.I()
                                    }))
                                } catch {
                                    return f()
                                }
                                var b;
                                return p && p.then ? p.then(void 0, f) : p
                            }(0, function() {
                                Lt.getLevel() === 0 && a.force(h.next.url.href)
                            });
                            if (d && d.then) return d.then(function() {})
                        })
                    },
                    a = this;
                if (a.data.next.url = at({
                        href: e
                    }, a.url.parse(e)), a.data.trigger = i, a.data.event = r, a.cache.has(e)) o = a.cache.update(e, {
                    action: "click"
                }).request;
                else {
                    var c = a.request(e, a.timeout, a.onRequestError.bind(a, i), a.cache, a.headers);
                    c.then(function(h) {
                        h.url.href !== e && a.history.add(h.url.href, i, "replace")
                    }), o = a.cache.set(e, c, "click", "pending").request
                }
                var u = function() {
                    if (a.transitions.shouldWait) return Promise.resolve(de(o, a.data)).then(function() {})
                }();
                return Promise.resolve(u && u.then ? u.then(l) : l())
            } catch (h) {
                return Promise.reject(h)
            }
        }, t.onRequestError = function(e) {
            this.transitions.isRunning = !1;
            var i = [].slice.call(arguments, 1),
                r = i[0],
                s = i[1],
                o = this.cache.getAction(r);
            return this.cache.delete(r), this.B && this.B(e, o, r, s) === !1 || o === "click" && this.force(r), !1
        }, t.prefetch = function(e) {
            var i = this;
            e = this.url.getAbsoluteHref(e), this.cache.has(e) || this.cache.set(e, this.request(e, this.timeout, this.onRequestError.bind(this, "barba"), this.cache, this.headers).catch(function(r) {
                i.logger.error(r)
            }), "prefetch", "pending")
        }, t.G = function() {
            this.prefetchIgnore !== !0 && (document.addEventListener("mouseover", this.U), document.addEventListener("touchstart", this.U)), document.addEventListener("click", this.$), window.addEventListener("popstate", this.X)
        }, t.J = function() {
            this.prefetchIgnore !== !0 && (document.removeEventListener("mouseover", this.U), document.removeEventListener("touchstart", this.U)), document.removeEventListener("click", this.$), window.removeEventListener("popstate", this.X)
        }, t.U = function(e) {
            var i = this,
                r = this.W(e);
            if (r) {
                var s = this.url.getAbsoluteHref(this.dom.getHref(r));
                this.prevent.checkHref(s) || this.cache.has(s) || this.cache.set(s, this.request(s, this.timeout, this.onRequestError.bind(this, r), this.cache, this.headers).catch(function(o) {
                    i.logger.error(o)
                }), "enter", "pending")
            }
        }, t.$ = function(e) {
            var i = this.W(e);
            if (i) {
                if (this.transitions.isRunning && this.preventRunning) return e.preventDefault(), void e.stopPropagation();
                this.F = e, this.go(this.dom.getHref(i), i, e)
            }
        }, t.X = function(e) {
            this.go(this.url.getHref(), "popstate", e)
        }, t.W = function(e) {
            for (var i = e.target; i && !this.dom.getHref(i);) i = i.parentNode;
            if (i && !this.prevent.checkLink(i, e, this.dom.getHref(i))) return i
        }, t.I = function() {
            var e = this.url.getHref(),
                i = {
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
            }, this.hooks.do("reset", this.data)
        }, Je(n, [{
            key: "data",
            get: function() {
                return this.D
            }
        }, {
            key: "wrapper",
            get: function() {
                return this.q
            }
        }]), n
    }()),
    ws = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

function Ss(n) {
    return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n
}
var vi = {
    exports: {}
};
(function(n, t) {
    (function(e, i) {
        n.exports = i()
    })(ws, function() {
        var e = function() {
            function i(v) {
                return o.appendChild(v.dom), v
            }

            function r(v) {
                for (var f = 0; f < o.children.length; f++) o.children[f].style.display = f === v ? "block" : "none";
                s = v
            }
            var s = 0,
                o = document.createElement("div");
            o.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", o.addEventListener("click", function(v) {
                v.preventDefault(), r(++s % o.children.length)
            }, !1);
            var l = (performance || Date).now(),
                a = l,
                c = 0,
                u = i(new e.Panel("FPS", "#0ff", "#002")),
                h = i(new e.Panel("MS", "#0f0", "#020"));
            if (self.performance && self.performance.memory) var d = i(new e.Panel("MB", "#f08", "#201"));
            return r(0), {
                REVISION: 16,
                dom: o,
                addPanel: i,
                showPanel: r,
                begin: function() {
                    l = (performance || Date).now()
                },
                end: function() {
                    c++;
                    var v = (performance || Date).now();
                    if (h.update(v - l, 200), v > a + 1e3 && (u.update(1e3 * c / (v - a), 100), a = v, c = 0, d)) {
                        var f = performance.memory;
                        d.update(f.usedJSHeapSize / 1048576, f.jsHeapSizeLimit / 1048576)
                    }
                    return v
                },
                update: function() {
                    l = this.end()
                },
                domElement: o,
                setMode: r
            }
        };
        return e.Panel = function(i, r, s) {
            var o = 1 / 0,
                l = 0,
                a = Math.round,
                c = a(window.devicePixelRatio || 1),
                u = 80 * c,
                h = 48 * c,
                d = 3 * c,
                v = 2 * c,
                f = 3 * c,
                p = 15 * c,
                b = 74 * c,
                m = 30 * c,
                y = document.createElement("canvas");
            y.width = u, y.height = h, y.style.cssText = "width:80px;height:48px";
            var g = y.getContext("2d");
            return g.font = "bold " + 9 * c + "px Helvetica,Arial,sans-serif", g.textBaseline = "top", g.fillStyle = s, g.fillRect(0, 0, u, h), g.fillStyle = r, g.fillText(i, d, v), g.fillRect(f, p, b, m), g.fillStyle = s, g.globalAlpha = .9, g.fillRect(f, p, b, m), {
                dom: y,
                update: function(w, x) {
                    o = Math.min(o, w), l = Math.max(l, w), g.fillStyle = s, g.globalAlpha = 1, g.fillRect(0, 0, u, p), g.fillStyle = r, g.fillText(a(w) + " " + i + " (" + a(o) + "-" + a(l) + ")", d, v), g.drawImage(y, f + c, p, b - c, m, f, p, b - c, m), g.fillRect(f + b - c, p, c, m), g.fillStyle = s, g.globalAlpha = .9, g.fillRect(f + b - c, p, c, a((1 - w / x) * m))
                }
            }
        }, e
    })
})(vi);
var Es = vi.exports;
const Cs = Ss(Es),
    Et = typeof window < "u",
    yi = Et && !("onscroll" in window) || typeof navigator < "u" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
    bi = Et && window.devicePixelRatio > 1,
    xs = {
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
        unobserve_completed: !0,
        unobserve_entered: !1,
        cancel_on_exit: !0,
        callback_enter: null,
        callback_exit: null,
        callback_applied: null,
        callback_loading: null,
        callback_loaded: null,
        callback_error: null,
        callback_finish: null,
        callback_cancel: null,
        use_native: !1,
        restore_on_error: !1
    },
    wi = n => Object.assign({}, xs, n),
    zn = function(n, t) {
        let e;
        const i = "LazyLoad::Initialized",
            r = new n(t);
        try {
            e = new CustomEvent(i, {
                detail: {
                    instance: r
                }
            })
        } catch {
            e = document.createEvent("CustomEvent"), e.initCustomEvent(i, !1, !1, {
                instance: r
            })
        }
        window.dispatchEvent(e)
    },
    Ts = (n, t) => {
        if (t)
            if (t.length)
                for (let e, i = 0; e = t[i]; i += 1) zn(n, e);
            else zn(n, t)
    },
    gt = "src",
    Qe = "srcset",
    Ze = "sizes",
    Si = "poster",
    ie = "llOriginalAttrs",
    Ei = "data",
    tn = "loading",
    Ci = "loaded",
    xi = "applied",
    As = "entered",
    en = "error",
    Ti = "native",
    Ai = "data-",
    Li = "ll-status",
    J = (n, t) => n.getAttribute(Ai + t),
    Ls = (n, t, e) => {
        const i = Ai + t;
        e !== null ? n.setAttribute(i, e) : n.removeAttribute(i)
    },
    re = n => J(n, Li),
    $t = (n, t) => Ls(n, Li, t),
    ve = n => $t(n, null),
    nn = n => re(n) === null,
    Is = n => re(n) === tn,
    ks = n => re(n) === en,
    rn = n => re(n) === Ti,
    Os = [tn, Ci, xi, en],
    _s = n => Os.indexOf(re(n)) >= 0,
    Ct = (n, t, e, i) => {
        n && typeof n == "function" && (i === void 0 ? e === void 0 ? n(t) : n(t, e) : n(t, e, i))
    },
    Ht = (n, t) => {
        Et && t !== "" && n.classList.add(t)
    },
    ot = (n, t) => {
        Et && t !== "" && n.classList.remove(t)
    },
    Ps = n => {
        n.llTempImage = document.createElement("IMG")
    },
    Ms = n => {
        delete n.llTempImage
    },
    Ii = n => n.llTempImage,
    ye = (n, t) => {
        if (!t) return;
        const e = t._observer;
        e && e.unobserve(n)
    },
    $s = n => {
        n.disconnect()
    },
    Rs = (n, t, e) => {
        t.unobserve_entered && ye(n, e)
    },
    sn = (n, t) => {
        n && (n.loadingCount += t)
    },
    Ds = n => {
        n && (n.toLoadCount -= 1)
    },
    ki = (n, t) => {
        n && (n.toLoadCount = t)
    },
    Fs = n => n.loadingCount > 0,
    qs = n => n.toLoadCount > 0,
    Oi = n => {
        let t = [];
        for (let e, i = 0; e = n.children[i]; i += 1) e.tagName === "SOURCE" && t.push(e);
        return t
    },
    on = (n, t) => {
        const e = n.parentNode;
        e && e.tagName === "PICTURE" && Oi(e).forEach(t)
    },
    _i = (n, t) => {
        Oi(n).forEach(t)
    },
    be = [gt],
    Pi = [gt, Si],
    Qt = [gt, Qe, Ze],
    Mi = [Ei],
    we = n => !!n[ie],
    $i = n => n[ie],
    Ri = n => delete n[ie],
    Nt = (n, t) => {
        if (we(n)) return;
        const e = {};
        t.forEach(i => {
            e[i] = n.getAttribute(i)
        }), n[ie] = e
    },
    js = n => {
        we(n) || (n[ie] = {
            backgroundImage: n.style.backgroundImage
        })
    },
    _t = (n, t) => {
        if (!we(n)) return;
        const e = $i(n);
        t.forEach(i => {
            ((r, s, o) => {
                o ? r.setAttribute(s, o) : r.removeAttribute(s)
            })(n, i, e[i])
        })
    },
    zs = n => {
        if (!we(n)) return;
        const t = $i(n);
        n.style.backgroundImage = t.backgroundImage
    },
    Di = (n, t, e) => {
        Ht(n, t.class_applied), $t(n, xi), e && (t.unobserve_completed && ye(n, t), Ct(t.callback_applied, n, e))
    },
    Fi = (n, t, e) => {
        Ht(n, t.class_loading), $t(n, tn), e && (sn(e, 1), Ct(t.callback_loading, n, e))
    },
    St = (n, t, e) => {
        e && n.setAttribute(t, e)
    },
    Nn = (n, t) => {
        St(n, Ze, J(n, t.data_sizes)), St(n, Qe, J(n, t.data_srcset)), St(n, gt, J(n, t.data_src))
    },
    Ns = (n, t) => {
        on(n, e => {
            Nt(e, Qt), Nn(e, t)
        }), Nt(n, Qt), Nn(n, t)
    },
    Hs = (n, t) => {
        Nt(n, be), St(n, gt, J(n, t.data_src))
    },
    Vs = (n, t) => {
        _i(n, e => {
            Nt(e, be), St(e, gt, J(e, t.data_src))
        }), Nt(n, Pi), St(n, Si, J(n, t.data_poster)), St(n, gt, J(n, t.data_src)), n.load()
    },
    Bs = (n, t) => {
        Nt(n, Mi), St(n, Ei, J(n, t.data_src))
    },
    Us = (n, t, e) => {
        const i = J(n, t.data_bg),
            r = J(n, t.data_bg_hidpi),
            s = bi && r ? r : i;
        s && (n.style.backgroundImage = `url("${s}")`, Ii(n).setAttribute(gt, s), Fi(n, t, e))
    },
    Ws = (n, t, e) => {
        const i = J(n, t.data_bg_multi),
            r = J(n, t.data_bg_multi_hidpi),
            s = bi && r ? r : i;
        s && (n.style.backgroundImage = s, Di(n, t, e))
    },
    Gs = (n, t, e) => {
        const i = J(n, t.data_bg_set);
        if (!i) return;
        let r = i.split("|").map(s => `image-set(${s})`);
        n.style.backgroundImage = r.join(), Di(n, t, e)
    },
    qi = {
        IMG: Ns,
        IFRAME: Hs,
        VIDEO: Vs,
        OBJECT: Bs
    },
    Ks = (n, t) => {
        const e = qi[n.tagName];
        e && e(n, t)
    },
    Ys = (n, t, e) => {
        const i = qi[n.tagName];
        i && (i(n, t), Fi(n, t, e))
    },
    Xs = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
    Js = n => Xs.indexOf(n.tagName) > -1,
    ji = (n, t) => {
        !t || Fs(t) || qs(t) || Ct(n.callback_finish, t)
    },
    Hn = (n, t, e) => {
        n.addEventListener(t, e), n.llEvLisnrs[t] = e
    },
    Qs = (n, t, e) => {
        n.removeEventListener(t, e)
    },
    an = n => !!n.llEvLisnrs,
    Zs = (n, t, e) => {
        an(n) || (n.llEvLisnrs = {});
        const i = n.tagName === "VIDEO" ? "loadeddata" : "load";
        Hn(n, i, t), Hn(n, "error", e)
    },
    qe = n => {
        if (!an(n)) return;
        const t = n.llEvLisnrs;
        for (let e in t) {
            const i = t[e];
            Qs(n, e, i)
        }
        delete n.llEvLisnrs
    },
    zi = (n, t, e) => {
        Ms(n), sn(e, -1), Ds(e), ot(n, t.class_loading), t.unobserve_completed && ye(n, e)
    },
    to = (n, t, e, i) => {
        const r = rn(t);
        zi(t, e, i), Ht(t, e.class_loaded), $t(t, Ci), Ct(e.callback_loaded, t, i), r || ji(e, i)
    },
    eo = (n, t, e, i) => {
        const r = rn(t);
        zi(t, e, i), Ht(t, e.class_error), $t(t, en), Ct(e.callback_error, t, i), e.restore_on_error && _t(t, Qt), r || ji(e, i)
    },
    je = (n, t, e) => {
        const i = Ii(n) || n;
        an(i) || Zs(i, r => {
            to(0, n, t, e), qe(i)
        }, r => {
            eo(0, n, t, e), qe(i)
        })
    },
    ze = (n, t, e) => {
        Js(n) ? ((i, r, s) => {
            je(i, r, s), Ys(i, r, s)
        })(n, t, e) : ((i, r, s) => {
            Ps(i), je(i, r, s), js(i), Us(i, r, s), Ws(i, r, s), Gs(i, r, s)
        })(n, t, e)
    },
    no = (n, t, e) => {
        n.setAttribute("loading", "lazy"), je(n, t, e), Ks(n, t), $t(n, Ti)
    },
    Vn = n => {
        n.removeAttribute(gt), n.removeAttribute(Qe), n.removeAttribute(Ze)
    },
    io = n => {
        on(n, t => {
            Vn(t)
        }), Vn(n)
    },
    Ni = n => {
        on(n, t => {
            _t(t, Qt)
        }), _t(n, Qt)
    },
    ro = n => {
        _i(n, t => {
            _t(t, be)
        }), _t(n, Pi), n.load()
    },
    so = n => {
        _t(n, be)
    },
    oo = n => {
        _t(n, Mi)
    },
    ao = {
        IMG: Ni,
        IFRAME: so,
        VIDEO: ro,
        OBJECT: oo
    },
    lo = (n, t) => {
        (e => {
            const i = ao[e.tagName];
            i ? i(e) : zs(e)
        })(n), ((e, i) => {
            nn(e) || rn(e) || (ot(e, i.class_entered), ot(e, i.class_exited), ot(e, i.class_applied), ot(e, i.class_loading), ot(e, i.class_loaded), ot(e, i.class_error))
        })(n, t), ve(n), Ri(n)
    },
    co = (n, t, e, i) => {
        e.cancel_on_exit && Is(n) && n.tagName === "IMG" && (qe(n), io(n), Ni(n), ot(n, e.class_loading), sn(i, -1), ve(n), Ct(e.callback_cancel, n, t, i))
    },
    uo = (n, t, e, i) => {
        const r = _s(n);
        $t(n, As), Ht(n, e.class_entered), ot(n, e.class_exited), Rs(n, e, i), Ct(e.callback_enter, n, t, i), r || ze(n, e, i)
    },
    ho = (n, t, e, i) => {
        nn(n) || (Ht(n, e.class_exited), co(n, t, e, i), Ct(e.callback_exit, n, t, i))
    },
    fo = ["IMG", "IFRAME", "VIDEO"],
    Hi = n => n.use_native && "loading" in HTMLImageElement.prototype,
    po = (n, t, e) => {
        n.forEach(i => {
            fo.indexOf(i.tagName) !== -1 && no(i, t, e)
        }), ki(e, 0)
    },
    mo = n => n.isIntersecting || n.intersectionRatio > 0,
    go = (n, t) => {
        t.forEach(e => {
            n.observe(e)
        })
    },
    vo = (n, t) => {
        $s(n), go(n, t)
    },
    yo = (n, t) => {
        Hi(n) || (t._observer = new IntersectionObserver(e => {
            ((i, r, s) => {
                i.forEach(o => mo(o) ? uo(o.target, o, r, s) : ho(o.target, o, r, s))
            })(e, n, t)
        }, (e => ({
            root: e.container === document ? null : e.container,
            rootMargin: e.thresholds || e.threshold + "px"
        }))(n)))
    },
    Vi = n => Array.prototype.slice.call(n),
    fe = n => n.container.querySelectorAll(n.elements_selector),
    bo = n => Vi(n).filter(nn),
    wo = n => ks(n),
    So = n => Vi(n).filter(wo),
    Bn = (n, t) => bo(n || fe(t)),
    Eo = (n, t) => {
        So(fe(n)).forEach(e => {
            ot(e, n.class_error), ve(e)
        }), t.update()
    },
    Co = (n, t) => {
        Et && (t._onlineHandler = () => {
            Eo(n, t)
        }, window.addEventListener("online", t._onlineHandler))
    },
    xo = n => {
        Et && window.removeEventListener("online", n._onlineHandler)
    },
    zt = function(n, t) {
        const e = wi(n);
        this._settings = e, this.loadingCount = 0, yo(e, this), Co(e, this), this.update(t)
    };
zt.prototype = {
    update: function(n) {
        const t = this._settings,
            e = Bn(n, t);
        ki(this, e.length), yi ? this.loadAll(e) : Hi(t) ? po(e, t, this) : vo(this._observer, e)
    },
    destroy: function() {
        this._observer && this._observer.disconnect(), xo(this), fe(this._settings).forEach(n => {
            Ri(n)
        }), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, delete this.toLoadCount
    },
    loadAll: function(n) {
        const t = this._settings;
        Bn(n, t).forEach(e => {
            ye(e, this), ze(e, t, this)
        })
    },
    restoreAll: function() {
        const n = this._settings;
        fe(n).forEach(t => {
            lo(t, n)
        })
    }
}, zt.load = (n, t) => {
    const e = wi(t);
    ze(n, e)
}, zt.resetStatus = n => {
    ve(n)
}, Et && Ts(zt, window.lazyLoadOptions);
const Ne = document.documentElement,
    {
        body: Zt
    } = document,
    Ft = Ne.hasAttribute("data-debug"),
    Bi = window.innerWidth <= 640;

function To() {
    let n = !1;
    document.addEventListener("keydown", t => {
        t.key === "Control" ? n = !0 : n && t.key === "g" && Zt.classList.toggle("-isGridVisible")
    }), document.addEventListener("keyup", t => {
        t.key === "Control" && (n = !1)
    })
}
const Ao = (n, t) => {
        let e;
        return (...i) => {
            clearTimeout(e), e = setTimeout(() => {
                n.apply(void 0, i)
            }, t)
        }
    },
    Un = (n, t) => {
        let e, i;
        return (...r) => {
            const o = +new Date;
            e && o < e + t ? (clearTimeout(i), i = setTimeout(() => {
                e = o, n.apply(void 0, r)
            }, t)) : (e = o, n.apply(void 0, r))
        }
    },
    Lo = (n, t) => {
        const i = Object.assign({
                async: !0,
                id: ""
            }, t),
            r = document.querySelector(`#${i.id}`);
        if (r) return r;
        const s = document.querySelector("script"),
            o = document.createElement("script"),
            l = Object.keys(i);
        for (let a = l.length - 1; a >= 0; a -= 1) {
            const c = l[a],
                u = i[c];
            u && (o[c] = u)
        }
        return o.src = n, s.parentNode.insertBefore(o, s), o
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
        autoplay: !0,
        timelineOffset: 0
    },
    ln = {
        duration: 1e3,
        delay: 0,
        endDelay: 0,
        easing: "easeOutElastic(1, .5)",
        round: 0
    },
    Io = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"],
    pe = {
        CSS: {},
        springs: {}
    };

function lt(n, t, e) {
    return Math.min(Math.max(n, t), e)
}

function Kt(n, t) {
    return n.indexOf(t) > -1
}

function Pe(n, t) {
    return n.apply(null, t)
}
var O = {
    arr: function(n) {
        return Array.isArray(n)
    },
    obj: function(n) {
        return Kt(Object.prototype.toString.call(n), "Object")
    },
    pth: function(n) {
        return O.obj(n) && n.hasOwnProperty("totalLength")
    },
    svg: function(n) {
        return n instanceof SVGElement
    },
    inp: function(n) {
        return n instanceof HTMLInputElement
    },
    dom: function(n) {
        return n.nodeType || O.svg(n)
    },
    str: function(n) {
        return typeof n == "string"
    },
    fnc: function(n) {
        return typeof n == "function"
    },
    und: function(n) {
        return typeof n > "u"
    },
    nil: function(n) {
        return O.und(n) || n === null
    },
    hex: function(n) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n)
    },
    rgb: function(n) {
        return /^rgb/.test(n)
    },
    hsl: function(n) {
        return /^hsl/.test(n)
    },
    col: function(n) {
        return O.hex(n) || O.rgb(n) || O.hsl(n)
    },
    key: function(n) {
        return !Ui.hasOwnProperty(n) && !ln.hasOwnProperty(n) && n !== "targets" && n !== "keyframes"
    }
};

function Wi(n) {
    var t = /\(([^)]+)\)/.exec(n);
    return t ? t[1].split(",").map(function(e) {
        return parseFloat(e)
    }) : []
}

function Gi(n, t) {
    var e = Wi(n),
        i = lt(O.und(e[0]) ? 1 : e[0], .1, 100),
        r = lt(O.und(e[1]) ? 100 : e[1], .1, 100),
        s = lt(O.und(e[2]) ? 10 : e[2], .1, 100),
        o = lt(O.und(e[3]) ? 0 : e[3], .1, 100),
        l = Math.sqrt(r / i),
        a = s / (2 * Math.sqrt(r * i)),
        c = a < 1 ? l * Math.sqrt(1 - a * a) : 0,
        u = 1,
        h = a < 1 ? (a * l + -o) / c : -o + l;

    function d(f) {
        var p = t ? t * f / 1e3 : f;
        return a < 1 ? p = Math.exp(-p * a * l) * (u * Math.cos(c * p) + h * Math.sin(c * p)) : p = (u + h * p) * Math.exp(-p * l), f === 0 || f === 1 ? f : 1 - p
    }

    function v() {
        var f = pe.springs[n];
        if (f) return f;
        for (var p = 1 / 6, b = 0, m = 0;;)
            if (b += p, d(b) === 1) {
                if (m++, m >= 16) break
            } else m = 0;
        var y = b * p * 1e3;
        return pe.springs[n] = y, y
    }
    return t ? d : v
}

function ko(n) {
    return n === void 0 && (n = 10),
        function(t) {
            return Math.ceil(lt(t, 1e-6, 1) * n) * (1 / n)
        }
}
var Oo = function() {
        var n = 11,
            t = 1 / (n - 1);

        function e(u, h) {
            return 1 - 3 * h + 3 * u
        }

        function i(u, h) {
            return 3 * h - 6 * u
        }

        function r(u) {
            return 3 * u
        }

        function s(u, h, d) {
            return ((e(h, d) * u + i(h, d)) * u + r(h)) * u
        }

        function o(u, h, d) {
            return 3 * e(h, d) * u * u + 2 * i(h, d) * u + r(h)
        }

        function l(u, h, d, v, f) {
            var p, b, m = 0;
            do b = h + (d - h) / 2, p = s(b, v, f) - u, p > 0 ? d = b : h = b; while (Math.abs(p) > 1e-7 && ++m < 10);
            return b
        }

        function a(u, h, d, v) {
            for (var f = 0; f < 4; ++f) {
                var p = o(h, d, v);
                if (p === 0) return h;
                var b = s(h, d, v) - u;
                h -= b / p
            }
            return h
        }

        function c(u, h, d, v) {
            if (!(0 <= u && u <= 1 && 0 <= d && d <= 1)) return;
            var f = new Float32Array(n);
            if (u !== h || d !== v)
                for (var p = 0; p < n; ++p) f[p] = s(p * t, u, d);

            function b(m) {
                for (var y = 0, g = 1, w = n - 1; g !== w && f[g] <= m; ++g) y += t;
                --g;
                var x = (m - f[g]) / (f[g + 1] - f[g]),
                    S = y + x * t,
                    E = o(S, u, d);
                return E >= .001 ? a(m, S, u, d) : E === 0 ? S : l(m, y, y + t, u, d)
            }
            return function(m) {
                return u === h && d === v || m === 0 || m === 1 ? m : s(b(m), h, v)
            }
        }
        return c
    }(),
    Ki = function() {
        var n = {
                linear: function() {
                    return function(i) {
                        return i
                    }
                }
            },
            t = {
                Sine: function() {
                    return function(i) {
                        return 1 - Math.cos(i * Math.PI / 2)
                    }
                },
                Expo: function() {
                    return function(i) {
                        return i ? Math.pow(2, 10 * i - 10) : 0
                    }
                },
                Circ: function() {
                    return function(i) {
                        return 1 - Math.sqrt(1 - i * i)
                    }
                },
                Back: function() {
                    return function(i) {
                        return i * i * (3 * i - 2)
                    }
                },
                Bounce: function() {
                    return function(i) {
                        for (var r, s = 4; i < ((r = Math.pow(2, --s)) - 1) / 11;);
                        return 1 / Math.pow(4, 3 - s) - 7.5625 * Math.pow((r * 3 - 2) / 22 - i, 2)
                    }
                },
                Elastic: function(i, r) {
                    i === void 0 && (i = 1), r === void 0 && (r = .5);
                    var s = lt(i, 1, 10),
                        o = lt(r, .1, 2);
                    return function(l) {
                        return l === 0 || l === 1 ? l : -s * Math.pow(2, 10 * (l - 1)) * Math.sin((l - 1 - o / (Math.PI * 2) * Math.asin(1 / s)) * (Math.PI * 2) / o)
                    }
                }
            },
            e = ["Quad", "Cubic", "Quart", "Quint"];
        return e.forEach(function(i, r) {
            t[i] = function() {
                return function(s) {
                    return Math.pow(s, r + 2)
                }
            }
        }), Object.keys(t).forEach(function(i) {
            var r = t[i];
            n["easeIn" + i] = r, n["easeOut" + i] = function(s, o) {
                return function(l) {
                    return 1 - r(s, o)(1 - l)
                }
            }, n["easeInOut" + i] = function(s, o) {
                return function(l) {
                    return l < .5 ? r(s, o)(l * 2) / 2 : 1 - r(s, o)(l * -2 + 2) / 2
                }
            }, n["easeOutIn" + i] = function(s, o) {
                return function(l) {
                    return l < .5 ? (1 - r(s, o)(1 - l * 2)) / 2 : (r(s, o)(l * 2 - 1) + 1) / 2
                }
            }
        }), n
    }();

function cn(n, t) {
    if (O.fnc(n)) return n;
    var e = n.split("(")[0],
        i = Ki[e],
        r = Wi(n);
    switch (e) {
        case "spring":
            return Gi(n, t);
        case "cubicBezier":
            return Pe(Oo, r);
        case "steps":
            return Pe(ko, r);
        default:
            return Pe(i, r)
    }
}

function Yi(n) {
    try {
        var t = document.querySelectorAll(n);
        return t
    } catch {
        return
    }
}

function Se(n, t) {
    for (var e = n.length, i = arguments.length >= 2 ? arguments[1] : void 0, r = [], s = 0; s < e; s++)
        if (s in n) {
            var o = n[s];
            t.call(i, o, s, n) && r.push(o)
        } return r
}

function Ee(n) {
    return n.reduce(function(t, e) {
        return t.concat(O.arr(e) ? Ee(e) : e)
    }, [])
}

function Wn(n) {
    return O.arr(n) ? n : (O.str(n) && (n = Yi(n) || n), n instanceof NodeList || n instanceof HTMLCollection ? [].slice.call(n) : [n])
}

function un(n, t) {
    return n.some(function(e) {
        return e === t
    })
}

function hn(n) {
    var t = {};
    for (var e in n) t[e] = n[e];
    return t
}

function He(n, t) {
    var e = hn(n);
    for (var i in n) e[i] = t.hasOwnProperty(i) ? t[i] : n[i];
    return e
}

function Ce(n, t) {
    var e = hn(n);
    for (var i in t) e[i] = O.und(n[i]) ? t[i] : n[i];
    return e
}

function _o(n) {
    var t = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(n);
    return t ? "rgba(" + t[1] + ",1)" : n
}

function Po(n) {
    var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        e = n.replace(t, function(l, a, c, u) {
            return a + a + c + c + u + u
        }),
        i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e),
        r = parseInt(i[1], 16),
        s = parseInt(i[2], 16),
        o = parseInt(i[3], 16);
    return "rgba(" + r + "," + s + "," + o + ",1)"
}

function Mo(n) {
    var t = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n),
        e = parseInt(t[1], 10) / 360,
        i = parseInt(t[2], 10) / 100,
        r = parseInt(t[3], 10) / 100,
        s = t[4] || 1;

    function o(d, v, f) {
        return f < 0 && (f += 1), f > 1 && (f -= 1), f < 1 / 6 ? d + (v - d) * 6 * f : f < 1 / 2 ? v : f < 2 / 3 ? d + (v - d) * (2 / 3 - f) * 6 : d
    }
    var l, a, c;
    if (i == 0) l = a = c = r;
    else {
        var u = r < .5 ? r * (1 + i) : r + i - r * i,
            h = 2 * r - u;
        l = o(h, u, e + 1 / 3), a = o(h, u, e), c = o(h, u, e - 1 / 3)
    }
    return "rgba(" + l * 255 + "," + a * 255 + "," + c * 255 + "," + s + ")"
}

function $o(n) {
    if (O.rgb(n)) return _o(n);
    if (O.hex(n)) return Po(n);
    if (O.hsl(n)) return Mo(n)
}

function mt(n) {
    var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n);
    if (t) return t[1]
}

function Ro(n) {
    if (Kt(n, "translate") || n === "perspective") return "px";
    if (Kt(n, "rotate") || Kt(n, "skew")) return "deg"
}

function Ve(n, t) {
    return O.fnc(n) ? n(t.target, t.id, t.total) : n
}

function ct(n, t) {
    return n.getAttribute(t)
}

function dn(n, t, e) {
    var i = mt(t);
    if (un([e, "deg", "rad", "turn"], i)) return t;
    var r = pe.CSS[t + e];
    if (!O.und(r)) return r;
    var s = 100,
        o = document.createElement(n.tagName),
        l = n.parentNode && n.parentNode !== document ? n.parentNode : document.body;
    l.appendChild(o), o.style.position = "absolute", o.style.width = s + e;
    var a = s / o.offsetWidth;
    l.removeChild(o);
    var c = a * parseFloat(t);
    return pe.CSS[t + e] = c, c
}

function Xi(n, t, e) {
    if (t in n.style) {
        var i = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
            r = n.style[t] || getComputedStyle(n).getPropertyValue(i) || "0";
        return e ? dn(n, r, e) : r
    }
}

function fn(n, t) {
    if (O.dom(n) && !O.inp(n) && (!O.nil(ct(n, t)) || O.svg(n) && n[t])) return "attribute";
    if (O.dom(n) && un(Io, t)) return "transform";
    if (O.dom(n) && t !== "transform" && Xi(n, t)) return "css";
    if (n[t] != null) return "object"
}

function Ji(n) {
    if (O.dom(n)) {
        for (var t = n.style.transform || "", e = /(\w+)\(([^)]*)\)/g, i = new Map, r; r = e.exec(t);) i.set(r[1], r[2]);
        return i
    }
}

function Do(n, t, e, i) {
    var r = Kt(t, "scale") ? 1 : 0 + Ro(t),
        s = Ji(n).get(t) || r;
    return e && (e.transforms.list.set(t, s), e.transforms.last = t), i ? dn(n, s, i) : s
}

function pn(n, t, e, i) {
    switch (fn(n, t)) {
        case "transform":
            return Do(n, t, i, e);
        case "css":
            return Xi(n, t, e);
        case "attribute":
            return ct(n, t);
        default:
            return n[t] || 0
    }
}

function mn(n, t) {
    var e = /^(\*=|\+=|-=)/.exec(n);
    if (!e) return n;
    var i = mt(n) || 0,
        r = parseFloat(t),
        s = parseFloat(n.replace(e[0], ""));
    switch (e[0][0]) {
        case "+":
            return r + s + i;
        case "-":
            return r - s + i;
        case "*":
            return r * s + i
    }
}

function Qi(n, t) {
    if (O.col(n)) return $o(n);
    if (/\s/g.test(n)) return n;
    var e = mt(n),
        i = e ? n.substr(0, n.length - e.length) : n;
    return t ? i + t : i
}

function gn(n, t) {
    return Math.sqrt(Math.pow(t.x - n.x, 2) + Math.pow(t.y - n.y, 2))
}

function Fo(n) {
    return Math.PI * 2 * ct(n, "r")
}

function qo(n) {
    return ct(n, "width") * 2 + ct(n, "height") * 2
}

function jo(n) {
    return gn({
        x: ct(n, "x1"),
        y: ct(n, "y1")
    }, {
        x: ct(n, "x2"),
        y: ct(n, "y2")
    })
}

function Zi(n) {
    for (var t = n.points, e = 0, i, r = 0; r < t.numberOfItems; r++) {
        var s = t.getItem(r);
        r > 0 && (e += gn(i, s)), i = s
    }
    return e
}

function zo(n) {
    var t = n.points;
    return Zi(n) + gn(t.getItem(t.numberOfItems - 1), t.getItem(0))
}

function tr(n) {
    if (n.getTotalLength) return n.getTotalLength();
    switch (n.tagName.toLowerCase()) {
        case "circle":
            return Fo(n);
        case "rect":
            return qo(n);
        case "line":
            return jo(n);
        case "polyline":
            return Zi(n);
        case "polygon":
            return zo(n)
    }
}

function No(n) {
    var t = tr(n);
    return n.setAttribute("stroke-dasharray", t), t
}

function Ho(n) {
    for (var t = n.parentNode; O.svg(t) && O.svg(t.parentNode);) t = t.parentNode;
    return t
}

function er(n, t) {
    var e = t || {},
        i = e.el || Ho(n),
        r = i.getBoundingClientRect(),
        s = ct(i, "viewBox"),
        o = r.width,
        l = r.height,
        a = e.viewBox || (s ? s.split(" ") : [0, 0, o, l]);
    return {
        el: i,
        viewBox: a,
        x: a[0] / 1,
        y: a[1] / 1,
        w: o,
        h: l,
        vW: a[2],
        vH: a[3]
    }
}

function Vo(n, t) {
    var e = O.str(n) ? Yi(n)[0] : n,
        i = t || 100;
    return function(r) {
        return {
            property: r,
            el: e,
            svg: er(e),
            totalLength: tr(e) * (i / 100)
        }
    }
}

function Bo(n, t, e) {
    function i(u) {
        u === void 0 && (u = 0);
        var h = t + u >= 1 ? t + u : 0;
        return n.el.getPointAtLength(h)
    }
    var r = er(n.el, n.svg),
        s = i(),
        o = i(-1),
        l = i(1),
        a = e ? 1 : r.w / r.vW,
        c = e ? 1 : r.h / r.vH;
    switch (n.property) {
        case "x":
            return (s.x - r.x) * a;
        case "y":
            return (s.y - r.y) * c;
        case "angle":
            return Math.atan2(l.y - o.y, l.x - o.x) * 180 / Math.PI
    }
}

function Gn(n, t) {
    var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
        i = Qi(O.pth(n) ? n.totalLength : n, t) + "";
    return {
        original: i,
        numbers: i.match(e) ? i.match(e).map(Number) : [0],
        strings: O.str(n) || t ? i.split(e) : []
    }
}

function vn(n) {
    var t = n ? Ee(O.arr(n) ? n.map(Wn) : Wn(n)) : [];
    return Se(t, function(e, i, r) {
        return r.indexOf(e) === i
    })
}

function nr(n) {
    var t = vn(n);
    return t.map(function(e, i) {
        return {
            target: e,
            id: i,
            total: t.length,
            transforms: {
                list: Ji(e)
            }
        }
    })
}

function Uo(n, t) {
    var e = hn(t);
    if (/^spring/.test(e.easing) && (e.duration = Gi(e.easing)), O.arr(n)) {
        var i = n.length,
            r = i === 2 && !O.obj(n[0]);
        r ? n = {
            value: n
        } : O.fnc(t.duration) || (e.duration = t.duration / i)
    }
    var s = O.arr(n) ? n : [n];
    return s.map(function(o, l) {
        var a = O.obj(o) && !O.pth(o) ? o : {
            value: o
        };
        return O.und(a.delay) && (a.delay = l ? 0 : t.delay), O.und(a.endDelay) && (a.endDelay = l === s.length - 1 ? t.endDelay : 0), a
    }).map(function(o) {
        return Ce(o, e)
    })
}

function Wo(n) {
    for (var t = Se(Ee(n.map(function(s) {
            return Object.keys(s)
        })), function(s) {
            return O.key(s)
        }).reduce(function(s, o) {
            return s.indexOf(o) < 0 && s.push(o), s
        }, []), e = {}, i = function(s) {
            var o = t[s];
            e[o] = n.map(function(l) {
                var a = {};
                for (var c in l) O.key(c) ? c == o && (a.value = l[c]) : a[c] = l[c];
                return a
            })
        }, r = 0; r < t.length; r++) i(r);
    return e
}

function Go(n, t) {
    var e = [],
        i = t.keyframes;
    i && (t = Ce(Wo(i), t));
    for (var r in t) O.key(r) && e.push({
        name: r,
        tweens: Uo(t[r], n)
    });
    return e
}

function Ko(n, t) {
    var e = {};
    for (var i in n) {
        var r = Ve(n[i], t);
        O.arr(r) && (r = r.map(function(s) {
            return Ve(s, t)
        }), r.length === 1 && (r = r[0])), e[i] = r
    }
    return e.duration = parseFloat(e.duration), e.delay = parseFloat(e.delay), e
}

function Yo(n, t) {
    var e;
    return n.tweens.map(function(i) {
        var r = Ko(i, t),
            s = r.value,
            o = O.arr(s) ? s[1] : s,
            l = mt(o),
            a = pn(t.target, n.name, l, t),
            c = e ? e.to.original : a,
            u = O.arr(s) ? s[0] : c,
            h = mt(u) || mt(a),
            d = l || h;
        return O.und(o) && (o = c), r.from = Gn(u, d), r.to = Gn(mn(o, u), d), r.start = e ? e.end : 0, r.end = r.start + r.delay + r.duration + r.endDelay, r.easing = cn(r.easing, r.duration), r.isPath = O.pth(s), r.isPathTargetInsideSVG = r.isPath && O.svg(t.target), r.isColor = O.col(r.from.original), r.isColor && (r.round = 1), e = r, r
    })
}
var ir = {
    css: function(n, t, e) {
        return n.style[t] = e
    },
    attribute: function(n, t, e) {
        return n.setAttribute(t, e)
    },
    object: function(n, t, e) {
        return n[t] = e
    },
    transform: function(n, t, e, i, r) {
        if (i.list.set(t, e), t === i.last || r) {
            var s = "";
            i.list.forEach(function(o, l) {
                s += l + "(" + o + ") "
            }), n.style.transform = s
        }
    }
};

function rr(n, t) {
    var e = nr(n);
    e.forEach(function(i) {
        for (var r in t) {
            var s = Ve(t[r], i),
                o = i.target,
                l = mt(s),
                a = pn(o, r, l, i),
                c = l || mt(a),
                u = mn(Qi(s, c), a),
                h = fn(o, r);
            ir[h](o, r, u, i.transforms, !0)
        }
    })
}

function Xo(n, t) {
    var e = fn(n.target, t.name);
    if (e) {
        var i = Yo(t, n),
            r = i[i.length - 1];
        return {
            type: e,
            property: t.name,
            animatable: n,
            tweens: i,
            duration: r.end,
            delay: i[0].delay,
            endDelay: r.endDelay
        }
    }
}

function Jo(n, t) {
    return Se(Ee(n.map(function(e) {
        return t.map(function(i) {
            return Xo(e, i)
        })
    })), function(e) {
        return !O.und(e)
    })
}

function sr(n, t) {
    var e = n.length,
        i = function(s) {
            return s.timelineOffset ? s.timelineOffset : 0
        },
        r = {};
    return r.duration = e ? Math.max.apply(Math, n.map(function(s) {
        return i(s) + s.duration
    })) : t.duration, r.delay = e ? Math.min.apply(Math, n.map(function(s) {
        return i(s) + s.delay
    })) : t.delay, r.endDelay = e ? r.duration - Math.max.apply(Math, n.map(function(s) {
        return i(s) + s.duration - s.endDelay
    })) : t.endDelay, r
}
var Kn = 0;

function Qo(n) {
    var t = He(Ui, n),
        e = He(ln, n),
        i = Go(e, n),
        r = nr(n.targets),
        s = Jo(r, i),
        o = sr(s, e),
        l = Kn;
    return Kn++, Ce(t, {
        id: l,
        children: [],
        animatables: r,
        animations: s,
        duration: o.duration,
        delay: o.delay,
        endDelay: o.endDelay
    })
}
var nt = [],
    or = function() {
        var n;

        function t() {
            !n && (!Yn() || !q.suspendWhenDocumentHidden) && nt.length > 0 && (n = requestAnimationFrame(e))
        }

        function e(r) {
            for (var s = nt.length, o = 0; o < s;) {
                var l = nt[o];
                l.paused ? (nt.splice(o, 1), s--) : (l.tick(r), o++)
            }
            n = o > 0 ? requestAnimationFrame(e) : void 0
        }

        function i() {
            q.suspendWhenDocumentHidden && (Yn() ? n = cancelAnimationFrame(n) : (nt.forEach(function(r) {
                return r._onDocumentVisibility()
            }), or()))
        }
        return typeof document < "u" && document.addEventListener("visibilitychange", i), t
    }();

function Yn() {
    return !!document && document.hidden
}

function q(n) {
    n === void 0 && (n = {});
    var t = 0,
        e = 0,
        i = 0,
        r, s = 0,
        o = null;

    function l(y) {
        var g = window.Promise && new Promise(function(w) {
            return o = w
        });
        return y.finished = g, g
    }
    var a = Qo(n);
    l(a);

    function c() {
        var y = a.direction;
        y !== "alternate" && (a.direction = y !== "normal" ? "normal" : "reverse"), a.reversed = !a.reversed, r.forEach(function(g) {
            return g.reversed = a.reversed
        })
    }

    function u(y) {
        return a.reversed ? a.duration - y : y
    }

    function h() {
        t = 0, e = u(a.currentTime) * (1 / q.speed)
    }

    function d(y, g) {
        g && g.seek(y - g.timelineOffset)
    }

    function v(y) {
        if (a.reversePlayback)
            for (var w = s; w--;) d(y, r[w]);
        else
            for (var g = 0; g < s; g++) d(y, r[g])
    }

    function f(y) {
        for (var g = 0, w = a.animations, x = w.length; g < x;) {
            var S = w[g],
                E = S.animatable,
                T = S.tweens,
                A = T.length - 1,
                C = T[A];
            A && (C = Se(T, function(xt) {
                return y < xt.end
            })[0] || C);
            for (var L = lt(y - C.start - C.delay, 0, C.duration) / C.duration, I = isNaN(L) ? 1 : C.easing(L), P = C.to.strings, _ = C.round, $ = [], B = C.to.numbers.length, j = void 0, R = 0; R < B; R++) {
                var M = void 0,
                    H = C.to.numbers[R],
                    U = C.from.numbers[R] || 0;
                C.isPath ? M = Bo(C.value, I * H, C.isPathTargetInsideSVG) : M = U + I * (H - U), _ && (C.isColor && R > 2 || (M = Math.round(M * _) / _)), $.push(M)
            }
            var Q = P.length;
            if (!Q) j = $[0];
            else {
                j = P[0];
                for (var W = 0; W < Q; W++) {
                    P[W];
                    var tt = P[W + 1],
                        dt = $[W];
                    isNaN(dt) || (tt ? j += dt + tt : j += dt + " ")
                }
            }
            ir[S.type](E.target, S.property, j, E.transforms), S.currentValue = j, g++
        }
    }

    function p(y) {
        a[y] && !a.passThrough && a[y](a)
    }

    function b() {
        a.remaining && a.remaining !== !0 && a.remaining--
    }

    function m(y) {
        var g = a.duration,
            w = a.delay,
            x = g - a.endDelay,
            S = u(y);
        a.progress = lt(S / g * 100, 0, 100), a.reversePlayback = S < a.currentTime, r && v(S), !a.began && a.currentTime > 0 && (a.began = !0, p("begin")), !a.loopBegan && a.currentTime > 0 && (a.loopBegan = !0, p("loopBegin")), S <= w && a.currentTime !== 0 && f(0), (S >= x && a.currentTime !== g || !g) && f(g), S > w && S < x ? (a.changeBegan || (a.changeBegan = !0, a.changeCompleted = !1, p("changeBegin")), p("change"), f(S)) : a.changeBegan && (a.changeCompleted = !0, a.changeBegan = !1, p("changeComplete")), a.currentTime = lt(S, 0, g), a.began && p("update"), y >= g && (e = 0, b(), a.remaining ? (t = i, p("loopComplete"), a.loopBegan = !1, a.direction === "alternate" && c()) : (a.paused = !0, a.completed || (a.completed = !0, p("loopComplete"), p("complete"), !a.passThrough && "Promise" in window && (o(), l(a)))))
    }
    return a.reset = function() {
        var y = a.direction;
        a.passThrough = !1, a.currentTime = 0, a.progress = 0, a.paused = !0, a.began = !1, a.loopBegan = !1, a.changeBegan = !1, a.completed = !1, a.changeCompleted = !1, a.reversePlayback = !1, a.reversed = y === "reverse", a.remaining = a.loop, r = a.children, s = r.length;
        for (var g = s; g--;) a.children[g].reset();
        (a.reversed && a.loop !== !0 || y === "alternate" && a.loop === 1) && a.remaining++, f(a.reversed ? a.duration : 0)
    }, a._onDocumentVisibility = h, a.set = function(y, g) {
        return rr(y, g), a
    }, a.tick = function(y) {
        i = y, t || (t = i), m((i + (e - t)) * q.speed)
    }, a.seek = function(y) {
        m(u(y))
    }, a.pause = function() {
        a.paused = !0, h()
    }, a.play = function() {
        a.paused && (a.completed && a.reset(), a.paused = !1, nt.push(a), h(), or())
    }, a.reverse = function() {
        c(), a.completed = !a.reversed, h()
    }, a.restart = function() {
        a.reset(), a.play()
    }, a.remove = function(y) {
        var g = vn(y);
        ar(g, a)
    }, a.reset(), a.autoplay && a.play(), a
}

function Xn(n, t) {
    for (var e = t.length; e--;) un(n, t[e].animatable.target) && t.splice(e, 1)
}

function ar(n, t) {
    var e = t.animations,
        i = t.children;
    Xn(n, e);
    for (var r = i.length; r--;) {
        var s = i[r],
            o = s.animations;
        Xn(n, o), !o.length && !s.children.length && i.splice(r, 1)
    }!e.length && !i.length && t.pause()
}

function Zo(n) {
    for (var t = vn(n), e = nt.length; e--;) {
        var i = nt[e];
        ar(t, i)
    }
}

function ta(n, t) {
    t === void 0 && (t = {});
    var e = t.direction || "normal",
        i = t.easing ? cn(t.easing) : null,
        r = t.grid,
        s = t.axis,
        o = t.from || 0,
        l = o === "first",
        a = o === "center",
        c = o === "last",
        u = O.arr(n),
        h = parseFloat(u ? n[0] : n),
        d = u ? parseFloat(n[1]) : 0,
        v = mt(u ? n[1] : n) || 0,
        f = t.start || 0 + (u ? h : 0),
        p = [],
        b = 0;
    return function(m, y, g) {
        if (l && (o = 0), a && (o = (g - 1) / 2), c && (o = g - 1), !p.length) {
            for (var w = 0; w < g; w++) {
                if (!r) p.push(Math.abs(o - w));
                else {
                    var x = a ? (r[0] - 1) / 2 : o % r[0],
                        S = a ? (r[1] - 1) / 2 : Math.floor(o / r[0]),
                        E = w % r[0],
                        T = Math.floor(w / r[0]),
                        A = x - E,
                        C = S - T,
                        L = Math.sqrt(A * A + C * C);
                    s === "x" && (L = -A), s === "y" && (L = -C), p.push(L)
                }
                b = Math.max.apply(Math, p)
            }
            i && (p = p.map(function(P) {
                return i(P / b) * b
            })), e === "reverse" && (p = p.map(function(P) {
                return s ? P < 0 ? P * -1 : -P : Math.abs(b - P)
            }))
        }
        var I = u ? (d - h) / b : h;
        return f + I * (Math.round(p[y] * 100) / 100) + v
    }
}

function ea(n) {
    n === void 0 && (n = {});
    var t = q(n);
    return t.duration = 0, t.add = function(e, i) {
        var r = nt.indexOf(t),
            s = t.children;
        r > -1 && nt.splice(r, 1);

        function o(d) {
            d.passThrough = !0
        }
        for (var l = 0; l < s.length; l++) o(s[l]);
        var a = Ce(e, He(ln, n));
        a.targets = a.targets || n.targets;
        var c = t.duration;
        a.autoplay = !1, a.direction = t.direction, a.timelineOffset = O.und(i) ? c : mn(i, c), o(t), t.seek(a.timelineOffset);
        var u = q(a);
        o(u), s.push(u);
        var h = sr(s, n);
        return t.delay = h.delay, t.endDelay = h.endDelay, t.duration = h.duration, t.seek(0), t.reset(), t.autoplay && t.play(), t
    }, t
}
q.version = "3.2.1";
q.speed = 1;
q.suspendWhenDocumentHidden = !0;
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
q.random = function(n, t) {
    return Math.floor(Math.random() * (t - n + 1)) + n
};
const lr = {
        afterEnter(n) {
            const t = q.timeline({
                easing: "easeInOutCubic",
                duration: 800
            });
            return t.add({
                targets: n.next.container,
                opacity: ["0", "1"]
            }), t.finished
        },
        onceAnimate() {
            const n = q.timeline({
                    easing: "easeInOutQuint",
                    duration: 1600,
                    complete: () => {
                        setTimeout(() => {
                            document.body.classList.add("-onceAnimate")
                        }, 2e3)
                    }
                }),
                t = 30;
            return n.add({
                targets: this.container,
                scaleX: [1, (window.innerWidth - t) / window.innerWidth],
                scaleY: [1, (window.innerHeight - t) / window.innerHeight],
                borderRadius: "3rem"
            }), n.add({
                targets: this.container,
                opacity: ["1", "0"],
                duration: 300,
                complete: () => {}
            }), n.finished
        },
        afterLeave() {},
        before() {},
        beforeEnter({
            current: n,
            next: t,
            target: e
        }) {
            this.call("scrollTo", {
                target: 0,
                options: {
                    immediate: !0
                }
            }, "Scroll", "scroll"), this.call("destroy", n.container, "app"), n.container.remove(), this.call("change", !1, "Menu", "menu"), this.call("update", t.container, "app"), this.call("enterPage", t.container, "Scroll", "scroll"), this.call("update", null, "Scroll", "scroll"), this.call("change", !1, "PopinContact", "widget")
        },
        beforeLeave() {},
        enter() {},
        init(n, t) {
            this.container = document.querySelector("#js-loader"), this.call = n, this.config = t
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
            }
        },
        leave(n) {
            const t = q.timeline({
                easing: "easeInOutCubic",
                duration: 800
            });
            return t.add({
                targets: n.current.container,
                opacity: ["1", "0"]
            }), t.finished
        },
        once(n) {
            this.onceAnimate(n).then(() => {
                this.call("after", null, "Website", "website")
            })
        }
    }.invoke(),
    na = Object.freeze(Object.defineProperty({
        __proto__: null,
        basicTransition: lr
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    ia = {
        init(n, t) {
            this.call = n, this.config = t
        },
        invoke() {
            return {
                namespace: "home",
                init: this.init.bind(this),
                afterEnter: this.afterEnter.bind(this),
                beforeEnter: this.beforeEnter.bind(this)
            }
        },
        afterEnter() {},
        beforeEnter() {}
    }.invoke(),
    ra = {
        init(n, t) {
            this.call = n, this.config = t
        },
        invoke() {
            return {
                namespace: "contact",
                init: this.init.bind(this),
                afterLeave: this.afterLeave.bind(this),
                beforeEnter: this.beforeEnter.bind(this)
            }
        },
        afterLeave() {
            this.call("active", !0, "PopinContact", "widget")
        },
        beforeEnter() {
            this.call("active", !1, "PopinContact", "widget")
        }
    }.invoke(),
    sa = Object.freeze(Object.defineProperty({
        __proto__: null,
        contactView: ra,
        homeView: ia
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    Jn = {
        resize: ["Scroll"],
        animate: [],
        aAnimate: ["Scroll"],
        scroll: []
    };
class oa extends D {
    constructor(t) {
        super(t), this.updateModules = !1, this.toAnimate = this.el.dataset.animate !== void 0, this.isAnimating = !1, this.interval = null, this.size = {
            width: 0,
            height: 0
        }, this.animate = this.animate.bind(this), this.debounceResize = Ao(this.resize.bind(this, !1), 600), Y.hooks.afterLeave(this.afterLeave.bind(this)), Y.hooks.afterEnter(this.afterEnter.bind(this)), Y.hooks.enter(this.enter.bind(this)), Y.hooks.once(this.once.bind(this)), Y.hooks.afterOnce(this.afterOnce.bind(this)), Y.hooks.after(this.after.bind(this)), Y.hooks.beforeLeave(this.beforeLeave.bind(this))
    }
    init() {
        const t = {
            debug: Ft,
            transitions: this.initConfigArray(na),
            views: this.initConfigArray(sa)
        };
        Ft ? (t.logLevel = "info", t.timeout = 1e4, To()) : t.timeout = 1e4, Y.init(t)
    }
    setStats() {
        this.stats = new Cs, this.stats.showPanel(0), Zt.appendChild(this.stats.dom)
    }
    once() {
        this.lazy = new zt({
            elements_selector: "[data-lazy]",
            class_loaded: "-loaded",
            class_loading: "-loading",
            class_error: "-error",
            class_entered: "-entered",
            class_exited: "-exited"
        })
    }
    clearCache() {
        for (const [t] of Y.cache.T) Y.cache.delete(t)
    }
    afterOnce() {
        window.addEventListener("resize", this.debounceResize), Ft && this.setStats(), (Ft || this.toAnimate) && (this.requestId = window.requestAnimationFrame(this.animate));
        const t = {
            rootMargin: "0px",
            threshold: 0
        };
        this.observer = new IntersectionObserver(this.onDetectModule.bind(this), t)
    }
    resize(t = !1) {
        window.innerWidth < 768 && window.innerWidth === this.size.width && t === !1 || (this.size = {
            width: window.innerWidth,
            height: window.innerHeight
        }, this.updateModules && this.parseModulesFunctions("resize"))
    }
    animate() {
        Ft && this.stats.begin(), this.updateModules && this.isAnimating && (this.parseModulesFunctions("animate"), this.parseModulesFunctions("aAnimate")), Ft && this.stats.end(), this.requestId = window.requestAnimationFrame(this.animate)
    }
    after() {
        this.toggleLoad(!1)
    }
    beforeLeave() {
        this.toggleLoad(!0)
    }
    afterLeave() {
        this.updateModules = !1
    }
    enter({
        next: t
    }) {
        clearTimeout(this.timeoutDark), this.timeoutDark = setTimeout(() => {
            this.setDarkUi(t.namespace === "home"), this.call("toggleBackground", !1, "Header", "header")
        }, 400), this.updateNavActive(t), this.updateLazy()
    }
    updateLazy() {
        this.lazy.update()
    }
    loadImage({
        item: t,
        config: e = {}
    }) {
        t.dataset.llStatus !== "loaded" && zt.load(t, e)
    }
    afterEnter() {
        this.updateModules = !0, this.resize(!0)
    }
    toggleLoad(t) {
        this.isAnimating = !t, window.requestAnimationFrame(() => {
            Ne.classList[t ? "remove" : "add"]("is-loaded"), Ne.classList[t ? "add" : "remove"]("is-loading")
        })
    }
    parseModulesFunctions(t) {
        const e = Jn[t],
            {
                length: i
            } = e;
        if (i !== 0)
            for (let r = i - 1; r >= 0; r -= 1) {
                const s = e[r];
                this.call(t, null, s)
            }
    }
    initConfigArray(t) {
        const e = [],
            i = Object.keys(t),
            {
                length: r
            } = i,
            s = this.call.bind(this),
            o = this.$.bind(this);
        for (let l = r - 1; l >= 0; l -= 1) {
            const a = t[i[l]];
            a.init(s, o, {}), e.push(a)
        }
        return e
    }
    setScrollDetection() {
        const t = Jn.scroll,
            {
                currentModules: e
            } = this.modules.app.app,
            i = Object.keys(e),
            r = {};
        i.forEach(s => {
            const o = e[s];
            if (t.includes(o.constructor.name)) {
                const l = s.replace(`${o.constructor.name}-`, "");
                o.el.dataset.moduleId = l, o.id = l, r[l] = o, this.observer.observe(o.el)
            }
        }), this.modulesObserve = r
    }
    unsetScrollDetection() {
        Object.keys(this.modulesObserve).forEach(e => {
            this.observer.unobserve(this.modulesObserve[e].el)
        })
    }
    onDetectModule(t) {
        t.forEach(e => {
            if (e.isIntersecting) {
                const i = this.modulesObserve[e.target.dataset.moduleId];
                i && (this.call("enter", null, i.constructor.name, i.id), this.call("update", null, "Scroll", "scroll")), e.target.dataset.repeat === void 0 && this.observer.unobserve(e.target)
            } else {
                const i = this.modulesObserve[e.target.dataset.moduleId];
                i && this.call("leave", null, i.constructor.name, i.id)
            }
        })
    }
    setDarkUi(t) {
        this.isDark !== t && (this.isDark = t, window.requestAnimationFrame(() => {
            Zt.classList[t ? "add" : "remove"]("-dark")
        }))
    }
    updateNavActive(t) {
        const e = this.$("nav"),
            i = t.url.href;
        e.forEach(r => {
            const {
                href: s
            } = r;
            r.classList[i.startsWith(s) ? "add" : "remove"]("-hover")
        })
    }
    updateHistory({
        url: t,
        action: e = "push"
    }) {
        Y.history.add(t, "barba", e)
    }
}

function cr(n, t, e) {
    return Math.max(n, Math.min(t, e))
}
class aa {
    constructor() {
        this.isRunning = !1, this.value = 0, this.from = 0, this.to = 0, this.duration = 0, this.currentTime = 0
    }
    advance(t) {
        var e;
        if (!this.isRunning) return;
        let i = !1;
        if (this.duration && this.easing) {
            this.currentTime += t;
            const r = cr(0, this.currentTime / this.duration, 1);
            i = r >= 1;
            const s = i ? 1 : this.easing(r);
            this.value = this.from + (this.to - this.from) * s
        } else this.lerp ? (this.value = function(s, o, l, a) {
            return function(u, h, d) {
                return (1 - d) * u + d * h
            }(s, o, 1 - Math.exp(-l * a))
        }(this.value, this.to, 60 * this.lerp, t), Math.round(this.value) === this.to && (this.value = this.to, i = !0)) : (this.value = this.to, i = !0);
        i && this.stop(), (e = this.onUpdate) === null || e === void 0 || e.call(this, this.value, i)
    }
    stop() {
        this.isRunning = !1
    }
    fromTo(t, e, {
        lerp: i,
        duration: r,
        easing: s,
        onStart: o,
        onUpdate: l
    }) {
        this.from = this.value = t, this.to = e, this.lerp = i, this.duration = r, this.easing = s, this.currentTime = 0, this.isRunning = !0, o == null || o(), this.onUpdate = l
    }
}
class la {
    constructor({
        wrapper: t,
        content: e,
        autoResize: i = !0,
        debounce: r = 250
    } = {}) {
        this.width = 0, this.height = 0, this.scrollWidth = 0, this.scrollHeight = 0, this.resize = () => {
            this.onWrapperResize(), this.onContentResize()
        }, this.onWrapperResize = () => {
            this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : this.wrapper instanceof HTMLElement && (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight)
        }, this.onContentResize = () => {
            this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : this.wrapper instanceof HTMLElement && (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth)
        }, this.wrapper = t, this.content = e, i && (this.debouncedResize = function(o, l) {
            let a;
            return function() {
                let c = arguments,
                    u = this;
                clearTimeout(a), a = setTimeout(function() {
                    o.apply(u, c)
                }, l)
            }
        }(this.resize, r), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, !1) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize()
    }
    destroy() {
        var t, e;
        (t = this.wrapperResizeObserver) === null || t === void 0 || t.disconnect(), (e = this.contentResizeObserver) === null || e === void 0 || e.disconnect(), window.removeEventListener("resize", this.debouncedResize, !1)
    }
    get limit() {
        return {
            x: this.scrollWidth - this.width,
            y: this.scrollHeight - this.height
        }
    }
}
class ur {
    constructor() {
        this.events = {}
    }
    emit(t, ...e) {
        let i = this.events[t] || [];
        for (let r = 0, s = i.length; r < s; r++) i[r](...e)
    }
    on(t, e) {
        var i;
        return !((i = this.events[t]) === null || i === void 0) && i.push(e) || (this.events[t] = [e]), () => {
            var r;
            this.events[t] = (r = this.events[t]) === null || r === void 0 ? void 0 : r.filter(s => e !== s)
        }
    }
    off(t, e) {
        var i;
        this.events[t] = (i = this.events[t]) === null || i === void 0 ? void 0 : i.filter(r => e !== r)
    }
    destroy() {
        this.events = {}
    }
}
const Qn = 100 / 6;
class ca {
    constructor(t, {
        wheelMultiplier: e = 1,
        touchMultiplier: i = 1
    }) {
        this.lastDelta = {
            x: 0,
            y: 0
        }, this.windowWidth = 0, this.windowHeight = 0, this.onTouchStart = r => {
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
            })
        }, this.onTouchMove = r => {
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
            })
        }, this.onTouchEnd = r => {
            this.emitter.emit("scroll", {
                deltaX: this.lastDelta.x,
                deltaY: this.lastDelta.y,
                event: r
            })
        }, this.onWheel = r => {
            let {
                deltaX: s,
                deltaY: o,
                deltaMode: l
            } = r;
            s *= l === 1 ? Qn : l === 2 ? this.windowWidth : 1, o *= l === 1 ? Qn : l === 2 ? this.windowHeight : 1, s *= this.wheelMultiplier, o *= this.wheelMultiplier, this.emitter.emit("scroll", {
                deltaX: s,
                deltaY: o,
                event: r
            })
        }, this.onWindowResize = () => {
            this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight
        }, this.element = t, this.wheelMultiplier = e, this.touchMultiplier = i, this.touchStart = {
            x: null,
            y: null
        }, this.emitter = new ur, window.addEventListener("resize", this.onWindowResize, !1), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, {
            passive: !1
        }), this.element.addEventListener("touchstart", this.onTouchStart, {
            passive: !1
        }), this.element.addEventListener("touchmove", this.onTouchMove, {
            passive: !1
        }), this.element.addEventListener("touchend", this.onTouchEnd, {
            passive: !1
        })
    }
    on(t, e) {
        return this.emitter.on(t, e)
    }
    destroy() {
        this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, !1), this.element.removeEventListener("wheel", this.onWheel), this.element.removeEventListener("touchstart", this.onTouchStart), this.element.removeEventListener("touchmove", this.onTouchMove), this.element.removeEventListener("touchend", this.onTouchEnd)
    }
}
class ua {
    constructor({
        wrapper: t = window,
        content: e = document.documentElement,
        wheelEventsTarget: i = t,
        eventsTarget: r = i,
        smoothWheel: s = !0,
        syncTouch: o = !1,
        syncTouchLerp: l = .075,
        touchInertiaMultiplier: a = 35,
        duration: c,
        easing: u = x => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
        lerp: h = .1,
        infinite: d = !1,
        orientation: v = "vertical",
        gestureOrientation: f = "vertical",
        touchMultiplier: p = 1,
        wheelMultiplier: b = 1,
        autoResize: m = !0,
        prevent: y,
        virtualScroll: g,
        __experimental__naiveDimensions: w = !1
    } = {}) {
        this.__isScrolling = !1, this.__isStopped = !1, this.__isLocked = !1, this.userData = {}, this.lastVelocity = 0, this.velocity = 0, this.direction = 0, this.onPointerDown = x => {
            x.button === 1 && this.reset()
        }, this.onVirtualScroll = x => {
            if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(x) === !1) return;
            const {
                deltaX: S,
                deltaY: E,
                event: T
            } = x;
            if (this.emitter.emit("virtual-scroll", {
                    deltaX: S,
                    deltaY: E,
                    event: T
                }), T.ctrlKey) return;
            const A = T.type.includes("touch"),
                C = T.type.includes("wheel");
            if (this.isTouching = T.type === "touchstart" || T.type === "touchmove", this.options.syncTouch && A && T.type === "touchstart" && !this.isStopped && !this.isLocked) return void this.reset();
            const L = S === 0 && E === 0,
                I = this.options.gestureOrientation === "vertical" && E === 0 || this.options.gestureOrientation === "horizontal" && S === 0;
            if (L || I) return;
            let P = T.composedPath();
            P = P.slice(0, P.indexOf(this.rootElement));
            const _ = this.options.prevent;
            if (P.find(R => {
                    var M, H, U, Q, W;
                    return R instanceof Element && (typeof _ == "function" && (_ == null ? void 0 : _(R)) || ((M = R.hasAttribute) === null || M === void 0 ? void 0 : M.call(R, "data-lenis-prevent")) || A && ((H = R.hasAttribute) === null || H === void 0 ? void 0 : H.call(R, "data-lenis-prevent-touch")) || C && ((U = R.hasAttribute) === null || U === void 0 ? void 0 : U.call(R, "data-lenis-prevent-wheel")) || ((Q = R.classList) === null || Q === void 0 ? void 0 : Q.contains("lenis")) && !(!((W = R.classList) === null || W === void 0) && W.contains("lenis-stopped")))
                })) return;
            if (this.isStopped || this.isLocked) return void T.preventDefault();
            if (!(this.options.syncTouch && A || this.options.smoothWheel && C)) return this.isScrolling = "native", void this.animate.stop();
            T.preventDefault();
            let $ = E;
            this.options.gestureOrientation === "both" ? $ = Math.abs(E) > Math.abs(S) ? E : S : this.options.gestureOrientation === "horizontal" && ($ = S);
            const B = A && this.options.syncTouch,
                j = A && T.type === "touchend" && Math.abs($) > 5;
            j && ($ = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + $, Object.assign({
                programmatic: !1
            }, B ? {
                lerp: j ? this.options.syncTouchLerp : 1
            } : {
                lerp: this.options.lerp,
                duration: this.options.duration,
                easing: this.options.easing
            }))
        }, this.onNativeScroll = () => {
            if (clearTimeout(this.__resetVelocityTimeout), delete this.__resetVelocityTimeout, this.__preventNextNativeScrollEvent) delete this.__preventNextNativeScrollEvent;
            else if (this.isScrolling === !1 || this.isScrolling === "native") {
                const x = this.animatedScroll;
                this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - x, this.direction = Math.sign(this.animatedScroll - x), this.isScrolling = "native", this.emit(), this.velocity !== 0 && (this.__resetVelocityTimeout = setTimeout(() => {
                    this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit()
                }, 400))
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
        }, this.animate = new aa, this.emitter = new ur, this.dimensions = new la({
            wrapper: t,
            content: e,
            autoResize: m
        }), this.updateClassName(), this.userData = {}, this.time = 0, this.velocity = this.lastVelocity = 0, this.isLocked = !1, this.isStopped = !1, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, !1), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, !1), this.virtualScroll = new ca(r, {
            touchMultiplier: p,
            wheelMultiplier: b
        }), this.virtualScroll.on("scroll", this.onVirtualScroll)
    }
    destroy() {
        this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, !1), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, !1), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName()
    }
    on(t, e) {
        return this.emitter.on(t, e)
    }
    off(t, e) {
        return this.emitter.off(t, e)
    }
    setScroll(t) {
        this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t
    }
    resize() {
        this.dimensions.resize()
    }
    emit() {
        this.emitter.emit("scroll", this)
    }
    reset() {
        this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop()
    }
    start() {
        this.isStopped && (this.isStopped = !1, this.reset())
    }
    stop() {
        this.isStopped || (this.isStopped = !0, this.animate.stop(), this.reset())
    }
    raf(t) {
        const e = t - (this.time || t);
        this.time = t, this.animate.advance(.001 * e)
    }
    scrollTo(t, {
        offset: e = 0,
        immediate: i = !1,
        lock: r = !1,
        duration: s = this.options.duration,
        easing: o = this.options.easing,
        lerp: l = this.options.lerp,
        onStart: a,
        onComplete: c,
        force: u = !1,
        programmatic: h = !0,
        userData: d = {}
    } = {}) {
        if (!this.isStopped && !this.isLocked || u) {
            if (typeof t == "string" && ["top", "left", "start"].includes(t)) t = 0;
            else if (typeof t == "string" && ["bottom", "right", "end"].includes(t)) t = this.limit;
            else {
                let v;
                if (typeof t == "string" ? v = document.querySelector(t) : t instanceof HTMLElement && (t != null && t.nodeType) && (v = t), v) {
                    if (this.options.wrapper !== window) {
                        const p = this.rootElement.getBoundingClientRect();
                        e -= this.isHorizontal ? p.left : p.top
                    }
                    const f = v.getBoundingClientRect();
                    t = (this.isHorizontal ? f.left : f.top) + this.animatedScroll
                }
            }
            if (typeof t == "number" && (t += e, t = Math.round(t), this.options.infinite ? h && (this.targetScroll = this.animatedScroll = this.scroll) : t = cr(0, t, this.limit), t !== this.targetScroll)) {
                if (this.userData = d, i) return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), c == null || c(this), void(this.userData = {});
                h || (this.targetScroll = t), this.animate.fromTo(this.animatedScroll, t, {
                    duration: s,
                    easing: o,
                    lerp: l,
                    onStart: () => {
                        r && (this.isLocked = !0), this.isScrolling = "smooth", a == null || a(this)
                    },
                    onUpdate: (v, f) => {
                        this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = v - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = v, this.setScroll(this.scroll), h && (this.targetScroll = v), f || this.emit(), f && (this.reset(), this.emit(), c == null || c(this), this.userData = {}, this.preventNextNativeScrollEvent())
                    }
                })
            }
        }
    }
    preventNextNativeScrollEvent() {
        this.__preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
            delete this.__preventNextNativeScrollEvent
        })
    }
    get rootElement() {
        return this.options.wrapper === window ? document.documentElement : this.options.wrapper
    }
    get limit() {
        return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"]
    }
    get isHorizontal() {
        return this.options.orientation === "horizontal"
    }
    get actualScroll() {
        return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop
    }
    get scroll() {
        return this.options.infinite ? function(e, i) {
            return (e % i + i) % i
        }(this.animatedScroll, this.limit) : this.animatedScroll
    }
    get progress() {
        return this.limit === 0 ? 1 : this.scroll / this.limit
    }
    get isScrolling() {
        return this.__isScrolling
    }
    set isScrolling(t) {
        this.__isScrolling !== t && (this.__isScrolling = t, this.updateClassName())
    }
    get isStopped() {
        return this.__isStopped
    }
    set isStopped(t) {
        this.__isStopped !== t && (this.__isStopped = t, this.updateClassName())
    }
    get isLocked() {
        return this.__isLocked
    }
    set isLocked(t) {
        this.__isLocked !== t && (this.__isLocked = t, this.updateClassName())
    }
    get isSmooth() {
        return this.isScrolling === "smooth"
    }
    get className() {
        let t = "lenis";
        return this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), this.isScrolling && (t += " lenis-scrolling"), this.isScrolling === "smooth" && (t += " lenis-smooth"), t
    }
    updateClassName() {
        this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim()
    }
    cleanUpClassName() {
        this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim()
    }
}

function Be() {
    return Be = Object.assign ? Object.assign.bind() : function(n) {
        for (var t = 1; t < arguments.length; t++) {
            var e = arguments[t];
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i])
        }
        return n
    }, Be.apply(this, arguments)
}
class Zn {
    constructor({
        scrollElements: t,
        rootMargin: e = "-1px -1px -1px -1px",
        IORaf: i
    }) {
        this.scrollElements = void 0, this.rootMargin = void 0, this.IORaf = void 0, this.observer = void 0, this.scrollElements = t, this.rootMargin = e, this.IORaf = i, this._init()
    }
    _init() {
        this.observer = new IntersectionObserver(t => {
            t.forEach(e => {
                const i = this.scrollElements.find(r => r.$el === e.target);
                e.isIntersecting ? (i && (i.isAlreadyIntersected = !0), this._setInview(e)) : i && i.isAlreadyIntersected && this._setOutOfView(e)
            })
        }, {
            rootMargin: this.rootMargin
        });
        for (const t of this.scrollElements) this.observe(t.$el)
    }
    destroy() {
        this.observer.disconnect()
    }
    observe(t) {
        t && this.observer.observe(t)
    }
    unobserve(t) {
        t && this.observer.unobserve(t)
    }
    _setInview(t) {
        const e = this.scrollElements.find(i => i.$el === t.target);
        this.IORaf && (e == null || e.setInteractivityOn()), !this.IORaf && (e == null || e.setInview())
    }
    _setOutOfView(t) {
        const e = this.scrollElements.find(i => i.$el === t.target);
        this.IORaf && (e == null || e.setInteractivityOff()), !this.IORaf && (e == null || e.setOutOfView()), e != null && e.attributes.scrollRepeat || this.IORaf || this.unobserve(t.target)
    }
}

function ti(n, t, e, i, r) {
    return e + ((r - n) / (t - n) * (i - e) || 0)
}

function ei(n, t) {
    return n.reduce((e, i) => Math.abs(i - t) < Math.abs(e - t) ? i : e)
}
class ha {
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
        }, this.currentScroll = this.scrollOrientation === "vertical" ? window.scrollY : window.scrollX, this.translateValue = 0, this.progress = 0, this.lastProgress = null, this.progressModularModules = [], this.isInview = !1, this.isInteractive = !1, this.isAlreadyIntersected = !1, this.isInFold = !1, this.isFirstResize = !0, this._init()
    }
    _init() {
        this.needRaf && (this.modularInstance && this.attributes.scrollModuleProgress && this._getProgressModularModules(), this._resize())
    }
    onResize({
        currentScroll: t
    }) {
        this.currentScroll = t, this._resize()
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
                    this.translateValue = r * i * this.attributes.scrollSpeed * -1
                } else {
                    const r = ti(0, 1, -1, 1, this.progress);
                    this.translateValue = r * i * this.attributes.scrollSpeed * -1
                }
                this.$el.style.transform = this.scrollOrientation === "vertical" ? `translate3d(0, ${this.translateValue}px, 0)` : `translate3d(${this.translateValue}px, 0, 0)`
            } else this.translateValue && (this.$el.style.transform = "translate3d(0, 0, 0)"), this.translateValue = 0
    }
    setInview() {
        if (this.isInview) return;
        this.isInview = !0, this.$el.classList.add(this.attributes.scrollClass);
        const t = this._getScrollCallFrom();
        this.attributes.scrollCall && this._dispatchCall("enter", t)
    }
    setOutOfView() {
        if (!this.isInview || !this.attributes.scrollRepeat) return;
        this.isInview = !1, this.$el.classList.remove(this.attributes.scrollClass);
        const t = this._getScrollCallFrom();
        this.attributes.scrollCall && this._dispatchCall("leave", t)
    }
    setInteractivityOn() {
        this.isInteractive || (this.isInteractive = !0, this.subscribeElementUpdateFn(this))
    }
    setInteractivityOff() {
        this.isInteractive && (this.isInteractive = !1, this.unsubscribeElementUpdateFn(this), this.lastProgress != null && this._computeProgress(ei([0, 1], this.lastProgress)))
    }
    _resize() {
        this.metrics.bcr = this.$el.getBoundingClientRect(), this._computeMetrics(), this._computeIntersection(), this.isFirstResize && (this.isFirstResize = !1, this.isInFold && this.setInview())
    }
    _computeMetrics() {
        const {
            top: t,
            left: e,
            height: i,
            width: r
        } = this.metrics.bcr, s = this.scrollOrientation === "vertical" ? window.innerHeight : window.innerWidth, o = this.scrollOrientation === "vertical" ? i : r;
        this.metrics.offsetStart = this.currentScroll + (this.scrollOrientation === "vertical" ? t : e) - this.translateValue, this.metrics.offsetEnd = this.metrics.offsetStart + o, this.isInFold = this.metrics.offsetStart < s && !this.attributes.scrollIgnoreFold
    }
    _computeIntersection() {
        const t = this.scrollOrientation === "vertical" ? window.innerHeight : window.innerWidth,
            e = this.scrollOrientation === "vertical" ? this.metrics.bcr.height : this.metrics.bcr.width,
            i = this.attributes.scrollOffset.split(","),
            r = i[0] != null ? i[0].trim() : "0",
            s = i[1] != null ? i[1].trim() : "0",
            o = this.attributes.scrollPosition.split(",");
        let l = o[0] != null ? o[0].trim() : "start";
        const a = o[1] != null ? o[1].trim() : "end",
            c = r.includes("%") ? t * parseInt(r.replace("%", "").trim()) * .01 : parseInt(r),
            u = s.includes("%") ? t * parseInt(s.replace("%", "").trim()) * .01 : parseInt(s);
        switch (this.isInFold && (l = "fold"), l) {
            case "start":
            default:
                this.intersection.start = this.metrics.offsetStart - t + c;
                break;
            case "middle":
                this.intersection.start = this.metrics.offsetStart - t + c + .5 * e;
                break;
            case "end":
                this.intersection.start = this.metrics.offsetStart - t + c + e;
                break;
            case "fold":
                this.intersection.start = 0
        }
        switch (a) {
            case "start":
                this.intersection.end = this.metrics.offsetStart - u;
                break;
            case "middle":
                this.intersection.end = this.metrics.offsetStart - u + .5 * e;
                break;
            default:
                this.intersection.end = this.metrics.offsetStart - u + e
        }
        if (this.intersection.end <= this.intersection.start) switch (a) {
            case "start":
            default:
                this.intersection.end = this.intersection.start + 1;
                break;
            case "middle":
                this.intersection.end = this.intersection.start + .5 * e;
                break;
            case "end":
                this.intersection.end = this.intersection.start + e
        }
    }
    _computeProgress(t) {
        const e = t ?? ((i = ti(this.intersection.start, this.intersection.end, 0, 1, this.currentScroll)) < 0 ? 0 : i > 1 ? 1 : i);
        var i;
        if (this.progress = e, e != this.lastProgress) {
            if (this.lastProgress = e, this.attributes.scrollCssProgress && this._setCssProgress(e), this.attributes.scrollEventProgress && this._setCustomEventProgress(e), this.attributes.scrollModuleProgress)
                for (const r of this.progressModularModules) this.modularInstance && this.modularInstance.call("onScrollProgress", e, r.moduleName, r.moduleId);
            e > 0 && e < 1 && this.setInview(), e === 0 && this.setOutOfView(), e === 1 && this.setOutOfView()
        }
    }
    _setCssProgress(t = 0) {
        this.$el.style.setProperty("--progress", t.toString())
    }
    _setCustomEventProgress(t = 0) {
        const e = this.attributes.scrollEventProgress;
        if (!e) return;
        const i = new CustomEvent(e, {
            detail: {
                target: this.$el,
                progress: t
            }
        });
        window.dispatchEvent(i)
    }
    _getProgressModularModules() {
        if (!this.modularInstance) return;
        const t = Object.keys(this.$el.dataset).filter(i => i.includes("module")),
            e = Object.entries(this.modularInstance.modules);
        if (t.length)
            for (const i of t) {
                const r = this.$el.dataset[i];
                if (!r) return;
                for (const s of e) {
                    const [o, l] = s;
                    r in l && this.progressModularModules.push({
                        moduleName: o,
                        moduleId: r
                    })
                }
            }
    }
    _getScrollCallFrom() {
        const t = ei([this.intersection.start, this.intersection.end], this.currentScroll);
        return this.intersection.start === t ? "start" : "end"
    }
    _dispatchCall(t, e) {
        var i, r;
        const s = (i = this.attributes.scrollCall) == null ? void 0 : i.split(","),
            o = (r = this.attributes) == null ? void 0 : r.scrollCallSelf;
        if (s && s.length > 1) {
            var l;
            const [a, c, u] = s;
            let h;
            h = o ? this.$el.dataset[`module${c.trim()}`] : u, this.modularInstance && this.modularInstance.call(a.trim(), {
                target: this.$el,
                way: t,
                from: e
            }, c.trim(), (l = h) == null ? void 0 : l.trim())
        } else if (s) {
            const [a] = s, c = new CustomEvent(a, {
                detail: {
                    target: this.$el,
                    way: t,
                    from: e
                }
            });
            window.dispatchEvent(c)
        }
    }
}
const da = ["scrollOffset", "scrollPosition", "scrollModuleProgress", "scrollCssProgress", "scrollEventProgress", "scrollSpeed"];
class fa {
    constructor({
        $el: t,
        modularInstance: e,
        triggerRootMargin: i,
        rafRootMargin: r,
        scrollOrientation: s
    }) {
        this.$scrollContainer = void 0, this.modularInstance = void 0, this.triggerRootMargin = void 0, this.rafRootMargin = void 0, this.scrollElements = void 0, this.triggeredScrollElements = void 0, this.RAFScrollElements = void 0, this.scrollElementsToUpdate = void 0, this.IOTriggerInstance = void 0, this.IORafInstance = void 0, this.scrollOrientation = void 0, t ? (this.$scrollContainer = t, this.modularInstance = e, this.scrollOrientation = s, this.triggerRootMargin = i ?? "-1px -1px -1px -1px", this.rafRootMargin = r ?? "100% 100% 100% 100%", this.scrollElements = [], this.triggeredScrollElements = [], this.RAFScrollElements = [], this.scrollElementsToUpdate = [], this._init()) : console.error("Please provide a DOM Element as scrollContainer")
    }
    _init() {
        const t = this.$scrollContainer.querySelectorAll("[data-scroll]"),
            e = Array.from(t);
        this._subscribeScrollElements(e), this.IOTriggerInstance = new Zn({
            scrollElements: [...this.triggeredScrollElements],
            rootMargin: this.triggerRootMargin,
            IORaf: !1
        }), this.IORafInstance = new Zn({
            scrollElements: [...this.RAFScrollElements],
            rootMargin: this.rafRootMargin,
            IORaf: !0
        })
    }
    destroy() {
        this.IOTriggerInstance.destroy(), this.IORafInstance.destroy(), this._unsubscribeAllScrollElements()
    }
    onResize({
        currentScroll: t
    }) {
        for (const e of this.RAFScrollElements) e.onResize({
            currentScroll: t
        })
    }
    onRender({
        currentScroll: t,
        smooth: e
    }) {
        for (const i of this.scrollElementsToUpdate) i.onRender({
            currentScroll: t,
            smooth: e
        })
    }
    removeScrollElements(t) {
        const e = t.querySelectorAll("[data-scroll]");
        if (e.length) {
            for (let i = 0; i < this.triggeredScrollElements.length; i++) {
                const r = this.triggeredScrollElements[i];
                Array.from(e).indexOf(r.$el) > -1 && (this.IOTriggerInstance.unobserve(r.$el), this.triggeredScrollElements.splice(i, 1))
            }
            for (let i = 0; i < this.RAFScrollElements.length; i++) {
                const r = this.RAFScrollElements[i];
                Array.from(e).indexOf(r.$el) > -1 && (this.IORafInstance.unobserve(r.$el), this.RAFScrollElements.splice(i, 1))
            }
            e.forEach(i => {
                const r = this.scrollElementsToUpdate.find(o => o.$el === i),
                    s = this.scrollElements.find(o => o.$el === i);
                r && this._unsubscribeElementUpdate(r), s && (this.scrollElements = this.scrollElements.filter(o => o.id != s.id))
            })
        }
    }
    addScrollElements(t) {
        const e = t.querySelectorAll("[data-scroll]"),
            i = [];
        this.scrollElements.forEach(o => {
            i.push(o.id)
        });
        const r = Math.max(...i, 0) + 1,
            s = Array.from(e);
        this._subscribeScrollElements(s, r, !0)
    }
    _subscribeScrollElements(t, e = 0, i = !1) {
        for (let r = 0; r < t.length; r++) {
            const s = t[r],
                o = this._checkRafNeeded(s),
                l = new ha({
                    $el: s,
                    id: e + r,
                    scrollOrientation: this.scrollOrientation,
                    modularInstance: this.modularInstance,
                    subscribeElementUpdateFn: this._subscribeElementUpdate.bind(this),
                    unsubscribeElementUpdateFn: this._unsubscribeElementUpdate.bind(this),
                    needRaf: o
                });
            this.scrollElements.push(l), o ? (this.RAFScrollElements.push(l), i && (this.IORafInstance.scrollElements.push(l), this.IORafInstance.observe(l.$el))) : (this.triggeredScrollElements.push(l), i && (this.IOTriggerInstance.scrollElements.push(l), this.IOTriggerInstance.observe(l.$el)))
        }
    }
    _unsubscribeAllScrollElements() {
        this.scrollElements = [], this.RAFScrollElements = [], this.triggeredScrollElements = [], this.scrollElementsToUpdate = []
    }
    _subscribeElementUpdate(t) {
        this.scrollElementsToUpdate.push(t)
    }
    _unsubscribeElementUpdate(t) {
        this.scrollElementsToUpdate = this.scrollElementsToUpdate.filter(e => e.id != t.id)
    }
    _checkRafNeeded(t) {
        let e = [...da];
        const i = r => {
            e = e.filter(s => s != r)
        };
        if (t.dataset.scrollOffset) {
            if (t.dataset.scrollOffset.split(",").map(r => r.replace("%", "").trim()).join(",") != "0,0") return !0;
            i("scrollOffset")
        } else i("scrollOffset");
        if (t.dataset.scrollPosition) {
            if (t.dataset.scrollPosition.trim() != "top,bottom") return !0;
            i("scrollPosition")
        } else i("scrollPosition");
        if (t.dataset.scrollSpeed && !isNaN(parseFloat(t.dataset.scrollSpeed))) return !0;
        i("scrollSpeed");
        for (const r of e)
            if (r in t.dataset) return !0;
        return !1
    }
}
class pa {
    constructor({
        resizeElements: t,
        resizeCallback: e = () => {}
    }) {
        this.$resizeElements = void 0, this.isFirstObserve = void 0, this.observer = void 0, this.resizeCallback = void 0, this.$resizeElements = t, this.resizeCallback = e, this.isFirstObserve = !0, this._init()
    }
    _init() {
        this.observer = new ResizeObserver(t => {
            var e;
            !this.isFirstObserve && ((e = this.resizeCallback) == null || e.call(this)), this.isFirstObserve = !1
        });
        for (const t of this.$resizeElements) this.observer.observe(t)
    }
    destroy() {
        this.observer.disconnect()
    }
}
class ma {
    constructor({
        lenisOptions: t = {},
        modularInstance: e,
        triggerRootMargin: i,
        rafRootMargin: r,
        autoResize: s = !0,
        autoStart: o = !0,
        scrollCallback: l = () => {},
        initCustomTicker: a,
        destroyCustomTicker: c
    } = {}) {
        this.rafPlaying = void 0, this.lenisInstance = void 0, this.coreInstance = void 0, this.lenisOptions = void 0, this.modularInstance = void 0, this.triggerRootMargin = void 0, this.rafRootMargin = void 0, this.rafInstance = void 0, this.autoResize = void 0, this.autoStart = void 0, this.ROInstance = void 0, this.initCustomTicker = void 0, this.destroyCustomTicker = void 0, this._onRenderBind = void 0, this._onResizeBind = void 0, this._onScrollToBind = void 0;
        for (const [u] of Object.entries(t))["wrapper", "content", "infinite"].includes(u) && console.warn(`Warning: Key "${u}" is not possible to edit in Locomotive Scroll.`);
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
        }), this._onRenderBind = this._onRender.bind(this), this._onScrollToBind = this._onScrollTo.bind(this), this._onResizeBind = this._onResize.bind(this), this.rafPlaying = !1, this._init()
    }
    _init() {
        var t;
        this.lenisInstance = new ua(Be({}, this.lenisOptions, {
            wrapper: window,
            content: document.documentElement,
            infinite: !1
        })), (t = this.lenisInstance) == null || t.on("scroll", this.scrollCallback), document.documentElement.setAttribute("data-scroll-orientation", this.lenisInstance.options.orientation), requestAnimationFrame(() => {
            this.coreInstance = new fa({
                $el: this.lenisInstance.rootElement,
                modularInstance: this.modularInstance,
                triggerRootMargin: this.triggerRootMargin,
                rafRootMargin: this.rafRootMargin,
                scrollOrientation: this.lenisInstance.options.orientation
            }), this._bindEvents(), this.initCustomTicker && !this.destroyCustomTicker ? console.warn("initCustomTicker callback is declared, but destroyCustomTicker is not. Please pay attention. It could cause trouble.") : !this.initCustomTicker && this.destroyCustomTicker && console.warn("destroyCustomTicker callback is declared, but initCustomTicker is not. Please pay attention. It could cause trouble."), this.autoStart && this.start()
        })
    }
    destroy() {
        var t;
        this.stop(), this._unbindEvents(), this.lenisInstance.destroy(), (t = this.coreInstance) == null || t.destroy(), requestAnimationFrame(() => {
            var e;
            (e = this.coreInstance) == null || e.destroy()
        })
    }
    _bindEvents() {
        this._bindScrollToEvents(), this.autoResize && ("ResizeObserver" in window ? this.ROInstance = new pa({
            resizeElements: [document.body],
            resizeCallback: this._onResizeBind
        }) : window.addEventListener("resize", this._onResizeBind))
    }
    _unbindEvents() {
        this._unbindScrollToEvents(), this.autoResize && ("ResizeObserver" in window ? this.ROInstance && this.ROInstance.destroy() : window.removeEventListener("resize", this._onResizeBind))
    }
    _bindScrollToEvents(t) {
        const e = t || this.lenisInstance.rootElement,
            i = e == null ? void 0 : e.querySelectorAll("[data-scroll-to]");
        i != null && i.length && i.forEach(r => {
            r.addEventListener("click", this._onScrollToBind, !1)
        })
    }
    _unbindScrollToEvents(t) {
        const e = t || this.lenisInstance.rootElement,
            i = e == null ? void 0 : e.querySelectorAll("[data-scroll-to]");
        i != null && i.length && i.forEach(r => {
            r.removeEventListener("click", this._onScrollToBind, !1)
        })
    }
    _onResize() {
        requestAnimationFrame(() => {
            var t;
            (t = this.coreInstance) == null || t.onResize({
                currentScroll: this.lenisInstance.scroll
            })
        })
    }
    _onRender() {
        var t, e;
        (t = this.lenisInstance) == null || t.raf(Date.now()), (e = this.coreInstance) == null || e.onRender({
            currentScroll: this.lenisInstance.scroll,
            smooth: this.lenisInstance.options.smoothWheel
        })
    }
    _onScrollTo(t) {
        var e;
        t.preventDefault();
        const i = (e = t.currentTarget) != null ? e : null;
        if (!i) return;
        const r = i.getAttribute("data-scroll-to-href") || i.getAttribute("href"),
            s = i.getAttribute("data-scroll-to-offset") || 0,
            o = i.getAttribute("data-scroll-to-duration") || this.lenisInstance.options.duration;
        r && this.scrollTo(r, {
            offset: typeof s == "string" ? parseInt(s) : s,
            duration: typeof o == "string" ? parseInt(o) : o
        })
    }
    start() {
        var t;
        this.rafPlaying || ((t = this.lenisInstance) == null || t.start(), this.rafPlaying = !0, this.initCustomTicker ? this.initCustomTicker(this._onRenderBind) : this._raf())
    }
    stop() {
        var t;
        this.rafPlaying && ((t = this.lenisInstance) == null || t.stop(), this.rafPlaying = !1, this.destroyCustomTicker ? this.destroyCustomTicker(this._onRenderBind) : this.rafInstance && cancelAnimationFrame(this.rafInstance))
    }
    removeScrollElements(t) {
        var e;
        t ? (this._unbindScrollToEvents(t), (e = this.coreInstance) == null || e.removeScrollElements(t)) : console.error("Please provide a DOM Element as $oldContainer")
    }
    addScrollElements(t) {
        var e;
        t ? ((e = this.coreInstance) == null || e.addScrollElements(t), requestAnimationFrame(() => {
            this._bindScrollToEvents(t)
        })) : console.error("Please provide a DOM Element as $newContainer")
    }
    resize() {
        this._onResizeBind()
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
        })
    }
    _raf() {
        this._onRenderBind(), this.rafInstance = requestAnimationFrame(() => this._raf())
    }
}
class ga extends D {
    constructor(t) {
        super(t), this.state = !0, this.rafRender = null
    }
    init() {
        this.el.dataset.preventReset === void 0 && (history.scrollRestoration = "manual", window.scrollTo(0, 0));
        const t = this.el.dataset.horizontal !== void 0 ? "horizontal" : "vertical";
        this.scroll = new ma({
            lenisOptions: {
                orientation: t
            },
            modularInstance: this,
            autoResize: !1,
            initCustomTicker: e => {
                this.rafRender = e
            },
            destroyCustomTicker: () => {
                this.rafRender = null
            },
            autoStart: !0,
            scrollCallback: this.onScroll.bind(this)
        }), this.scrollOrientation = 1, this.lastProgress = 0, this.resize = this.scroll.resize.bind(this.scroll)
    }
    aAnimate() {
        this.rafRender && this.rafRender()
    }
    onScroll({
        progress: t
    }) {
        this.call("toggleBackground", t > .02, "Header", "header"), t <= .01 && (this.scrollOrientation = -1, this.call("toggleHeaderVisibility", !1, "Header", "header")), t > this.lastProgress ? this.scrollOrientation !== 1 && (this.scrollOrientation = 1, this.call("toggleHeaderVisibility", !0, "Header", "header")) : this.scrollOrientation !== -1 && (this.scrollOrientation = -1, this.call("toggleHeaderVisibility", !1, "Header", "header")), Bi ? this.call("toggleWidgetVisibility", t > .4 && t < .8, "PopinContact", "widget") : this.call("toggleWidgetVisibility", this.scrollOrientation !== -1 && t > .4 && t < .8, "PopinContact", "widget"), this.lastProgress = t
    }
    leavePage(t) {
        this.destroy()
    }
    enterPage(t) {
        this.init()
    }
    toggle(t) {
        if (t === this.state) return;
        this.state = t;
        const e = t ? "start" : "stop";
        this.scroll[e]()
    }
    update() {
        this.scroll.resize()
    }
    destroy() {
        this.scroll.destroy()
    }
    scrollTo({
        target: t = 0,
        options: e = {}
    }) {
        this.scroll.scrollTo(t, e)
    }
}
class va extends D {
    constructor(t) {
        super(t), this.events = {
            click: "onClick"
        }
    }
    onClick(t) {
        const {
            target: e
        } = t, {
            action: i
        } = e.dataset;
        i && this[i] && this[i](e)
    }
    toggle() {
        this.change(!this.state)
    }
    change(t) {
        if (this.state === t) return;
        this.state = t;
        const [e] = this.$("aside"), [i] = this.$("button");
        this.el.classList.toggle("-isActive", t), Object.assign(Zt.style, {
            overflow: t ? "hidden" : ""
        }), i.querySelector("span").innerText = t ? "Fermer" : "Menu"
    }
}

function yn(n) {
    return typeof n == "number"
}

function Ue(n) {
    return typeof n == "string"
}

function xe(n) {
    return typeof n == "boolean"
}

function ni(n) {
    return Object.prototype.toString.call(n) === "[object Object]"
}

function N(n) {
    return Math.abs(n)
}

function bn(n) {
    return Math.sign(n)
}

function Yt(n, t) {
    return N(n - t)
}

function ya(n, t) {
    if (n === 0 || t === 0 || N(n) <= N(t)) return 0;
    const e = Yt(N(n), N(t));
    return N(e / n)
}

function ba(n) {
    return Math.round(n * 100) / 100
}

function te(n) {
    return ee(n).map(Number)
}

function it(n) {
    return n[se(n)]
}

function se(n) {
    return Math.max(0, n.length - 1)
}

function wn(n, t) {
    return t === se(n)
}

function ii(n, t = 0) {
    return Array.from(Array(n), (e, i) => t + i)
}

function ee(n) {
    return Object.keys(n)
}

function hr(n, t) {
    return [n, t].reduce((e, i) => (ee(i).forEach(r => {
        const s = e[r],
            o = i[r],
            l = ni(s) && ni(o);
        e[r] = l ? hr(s, o) : o
    }), e), {})
}

function We(n, t) {
    return typeof t.MouseEvent < "u" && n instanceof t.MouseEvent
}

function wa(n, t) {
    const e = {
        start: i,
        center: r,
        end: s
    };

    function i() {
        return 0
    }

    function r(a) {
        return s(a) / 2
    }

    function s(a) {
        return t - a
    }

    function o(a, c) {
        return Ue(n) ? e[n](a) : n(t, a, c)
    }
    return {
        measure: o
    }
}

function ne() {
    let n = [];

    function t(r, s, o, l = {
        passive: !0
    }) {
        let a;
        if ("addEventListener" in r) r.addEventListener(s, o, l), a = () => r.removeEventListener(s, o, l);
        else {
            const c = r;
            c.addListener(o), a = () => c.removeListener(o)
        }
        return n.push(a), i
    }

    function e() {
        n = n.filter(r => r())
    }
    const i = {
        add: t,
        clear: e
    };
    return i
}

function Sa(n, t, e, i) {
    const r = ne(),
        s = 1e3 / 60;
    let o = null,
        l = 0,
        a = 0;

    function c() {
        r.add(n, "visibilitychange", () => {
            n.hidden && f()
        })
    }

    function u() {
        v(), r.clear()
    }

    function h(b) {
        if (!a) return;
        o || (o = b, e(), e());
        const m = b - o;
        for (o = b, l += m; l >= s;) e(), l -= s;
        const y = l / s;
        i(y), a && (a = t.requestAnimationFrame(h))
    }

    function d() {
        a || (a = t.requestAnimationFrame(h))
    }

    function v() {
        t.cancelAnimationFrame(a), o = null, l = 0, a = 0
    }

    function f() {
        o = null, l = 0
    }
    return {
        init: c,
        destroy: u,
        start: d,
        stop: v,
        update: e,
        render: i
    }
}

function Ea(n, t) {
    const e = t === "rtl",
        i = n === "y",
        r = i ? "y" : "x",
        s = i ? "x" : "y",
        o = !i && e ? -1 : 1,
        l = u(),
        a = h();

    function c(f) {
        const {
            height: p,
            width: b
        } = f;
        return i ? p : b
    }

    function u() {
        return i ? "top" : e ? "right" : "left"
    }

    function h() {
        return i ? "bottom" : e ? "left" : "right"
    }

    function d(f) {
        return f * o
    }
    return {
        scroll: r,
        cross: s,
        startEdge: l,
        endEdge: a,
        measureSize: c,
        direction: d
    }
}

function Pt(n = 0, t = 0) {
    const e = N(n - t);

    function i(c) {
        return c < n
    }

    function r(c) {
        return c > t
    }

    function s(c) {
        return i(c) || r(c)
    }

    function o(c) {
        return s(c) ? i(c) ? n : t : c
    }

    function l(c) {
        return e ? c - e * Math.ceil((c - t) / e) : c
    }
    return {
        length: e,
        max: t,
        min: n,
        constrain: o,
        reachedAny: s,
        reachedMax: r,
        reachedMin: i,
        removeOffset: l
    }
}

function dr(n, t, e) {
    const {
        constrain: i
    } = Pt(0, n), r = n + 1;
    let s = o(t);

    function o(d) {
        return e ? N((r + d) % r) : i(d)
    }

    function l() {
        return s
    }

    function a(d) {
        return s = o(d), h
    }

    function c(d) {
        return u().set(l() + d)
    }

    function u() {
        return dr(n, l(), e)
    }
    const h = {
        get: l,
        set: a,
        add: c,
        clone: u
    };
    return h
}

function Ca(n, t, e, i, r, s, o, l, a, c, u, h, d, v, f, p, b, m, y) {
    const {
        cross: g,
        direction: w
    } = n, x = ["INPUT", "SELECT", "TEXTAREA"], S = {
        passive: !1
    }, E = ne(), T = ne(), A = Pt(50, 225).constrain(v.measure(20)), C = {
        mouse: 300,
        touch: 400
    }, L = {
        mouse: 500,
        touch: 600
    }, I = f ? 43 : 25;
    let P = !1,
        _ = 0,
        $ = 0,
        B = !1,
        j = !1,
        R = !1,
        M = !1;

    function H(k) {
        if (!y) return;

        function F(K) {
            (xe(y) || y(k, K)) && xt(K)
        }
        const V = t;
        E.add(V, "dragstart", K => K.preventDefault(), S).add(V, "touchmove", () => {}, S).add(V, "touchend", () => {}).add(V, "touchstart", F).add(V, "mousedown", F).add(V, "touchcancel", G).add(V, "contextmenu", G).add(V, "click", ft, !0)
    }

    function U() {
        E.clear(), T.clear()
    }

    function Q() {
        const k = M ? e : t;
        T.add(k, "touchmove", Z, S).add(k, "touchend", G).add(k, "mousemove", Z, S).add(k, "mouseup", G)
    }

    function W(k) {
        const F = k.nodeName || "";
        return x.includes(F)
    }

    function tt() {
        return (f ? L : C)[M ? "mouse" : "touch"]
    }

    function dt(k, F) {
        const V = h.add(bn(k) * -1),
            K = u.byDistance(k, !f).distance;
        return f || N(k) < A ? K : b && F ? K * .5 : u.byIndex(V.get(), 0).distance
    }

    function xt(k) {
        const F = We(k, i);
        M = F, R = f && F && !k.buttons && P, P = Yt(r.get(), o.get()) >= 2, !(F && k.button !== 0) && (W(k.target) || (B = !0, s.pointerDown(k), c.useFriction(0).useDuration(0), r.set(o), Q(), _ = s.readPoint(k), $ = s.readPoint(k, g), d.emit("pointerDown")))
    }

    function Z(k) {
        if (!We(k, i) && k.touches.length >= 2) return G(k);
        const V = s.readPoint(k),
            K = s.readPoint(k, g),
            st = Yt(V, _),
            pt = Yt(K, $);
        if (!j && !M && (!k.cancelable || (j = st > pt, !j))) return G(k);
        const Tt = s.pointerMove(k);
        st > p && (R = !0), c.useFriction(.3).useDuration(.75), l.start(), r.add(w(Tt)), k.preventDefault()
    }

    function G(k) {
        const V = u.byDistance(0, !1).index !== h.get(),
            K = s.pointerUp(k) * tt(),
            st = dt(w(K), V),
            pt = ya(K, st),
            Tt = I - 10 * pt,
            vt = m + pt / 50;
        j = !1, B = !1, T.clear(), c.useDuration(Tt).useFriction(vt), a.distance(st, !f), M = !1, d.emit("pointerUp")
    }

    function ft(k) {
        R && (k.stopPropagation(), k.preventDefault(), R = !1)
    }

    function et() {
        return B
    }
    return {
        init: H,
        destroy: U,
        pointerDown: et
    }
}

function xa(n, t) {
    let i, r;

    function s(h) {
        return h.timeStamp
    }

    function o(h, d) {
        const f = `client${(d||n.scroll)==="x"?"X":"Y"}`;
        return (We(h, t) ? h : h.touches[0])[f]
    }

    function l(h) {
        return i = h, r = h, o(h)
    }

    function a(h) {
        const d = o(h) - o(r),
            v = s(h) - s(i) > 170;
        return r = h, v && (i = h), d
    }

    function c(h) {
        if (!i || !r) return 0;
        const d = o(r) - o(i),
            v = s(h) - s(i),
            f = s(h) - s(r) > 170,
            p = d / v;
        return v && !f && N(p) > .1 ? p : 0
    }
    return {
        pointerDown: l,
        pointerMove: a,
        pointerUp: c,
        readPoint: o
    }
}

function Ta() {
    function n(e) {
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
        }
    }
    return {
        measure: n
    }
}

function Aa(n) {
    function t(i) {
        return n * (i / 100)
    }
    return {
        measure: t
    }
}

function La(n, t, e, i, r, s, o) {
    const l = [n].concat(i);
    let a, c, u = [],
        h = !1;

    function d(b) {
        return r.measureSize(o.measure(b))
    }

    function v(b) {
        if (!s) return;
        c = d(n), u = i.map(d);

        function m(y) {
            for (const g of y) {
                if (h) return;
                const w = g.target === n,
                    x = i.indexOf(g.target),
                    S = w ? c : u[x],
                    E = d(w ? n : i[x]);
                if (N(E - S) >= .5) {
                    b.reInit(), t.emit("resize");
                    break
                }
            }
        }
        a = new ResizeObserver(y => {
            (xe(s) || s(b, y)) && m(y)
        }), e.requestAnimationFrame(() => {
            l.forEach(y => a.observe(y))
        })
    }

    function f() {
        h = !0, a && a.disconnect()
    }
    return {
        init: v,
        destroy: f
    }
}

function Ia(n, t, e, i, r, s) {
    let o = 0,
        l = 0,
        a = r,
        c = s,
        u = n.get(),
        h = 0;

    function d() {
        const S = i.get() - n.get(),
            E = !a;
        let T = 0;
        return E ? (o = 0, e.set(i), n.set(i), T = S) : (e.set(n), o += S / a, o *= c, u += o, n.add(o), T = u - h), l = bn(T), h = u, x
    }

    function v() {
        const S = i.get() - t.get();
        return N(S) < .001
    }

    function f() {
        return a
    }

    function p() {
        return l
    }

    function b() {
        return o
    }

    function m() {
        return g(r)
    }

    function y() {
        return w(s)
    }

    function g(S) {
        return a = S, x
    }

    function w(S) {
        return c = S, x
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
    return x
}

function ka(n, t, e, i, r) {
    const s = r.measure(10),
        o = r.measure(50),
        l = Pt(.1, .99);
    let a = !1;

    function c() {
        return !(a || !n.reachedAny(e.get()) || !n.reachedAny(t.get()))
    }

    function u(v) {
        if (!c()) return;
        const f = n.reachedMin(t.get()) ? "min" : "max",
            p = N(n[f] - t.get()),
            b = e.get() - t.get(),
            m = l.constrain(p / o);
        e.subtract(b * m), !v && N(b) < s && (e.set(n.constrain(e.get())), i.useDuration(25).useBaseFriction())
    }

    function h(v) {
        a = !v
    }
    return {
        shouldConstrain: c,
        constrain: u,
        toggleActive: h
    }
}

function Oa(n, t, e, i, r) {
    const s = Pt(-t + n, 0),
        o = h(),
        l = u(),
        a = d();

    function c(f, p) {
        return Yt(f, p) <= 1
    }

    function u() {
        const f = o[0],
            p = it(o),
            b = o.lastIndexOf(f),
            m = o.indexOf(p) + 1;
        return Pt(b, m)
    }

    function h() {
        return e.map((f, p) => {
            const {
                min: b,
                max: m
            } = s, y = s.constrain(f), g = !p, w = wn(e, p);
            return g ? m : w || c(b, y) ? b : c(m, y) ? m : y
        }).map(f => parseFloat(f.toFixed(3)))
    }

    function d() {
        if (t <= n + r) return [s.max];
        if (i === "keepSnaps") return o;
        const {
            min: f,
            max: p
        } = l;
        return o.slice(f, p)
    }
    return {
        snapsContained: a,
        scrollContainLimit: l
    }
}

function _a(n, t, e) {
    const i = t[0],
        r = e ? i - n : it(t);
    return {
        limit: Pt(r, i)
    }
}

function Pa(n, t, e, i) {
    const s = t.min + .1,
        o = t.max + .1,
        {
            reachedMin: l,
            reachedMax: a
        } = Pt(s, o);

    function c(d) {
        return d === 1 ? a(e.get()) : d === -1 ? l(e.get()) : !1
    }

    function u(d) {
        if (!c(d)) return;
        const v = n * (d * -1);
        i.forEach(f => f.add(v))
    }
    return {
        loop: u
    }
}

function Ma(n) {
    const {
        max: t,
        length: e
    } = n;

    function i(s) {
        const o = s - t;
        return e ? o / -e : 0
    }
    return {
        get: i
    }
}

function $a(n, t, e, i, r) {
    const {
        startEdge: s,
        endEdge: o
    } = n, {
        groupSlides: l
    } = r, a = h().map(t.measure), c = d(), u = v();

    function h() {
        return l(i).map(p => it(p)[o] - p[0][s]).map(N)
    }

    function d() {
        return i.map(p => e[s] - p[s]).map(p => -N(p))
    }

    function v() {
        return l(c).map(p => p[0]).map((p, b) => p + a[b])
    }
    return {
        snaps: c,
        snapsAligned: u
    }
}

function Ra(n, t, e, i, r, s) {
    const {
        groupSlides: o
    } = r, {
        min: l,
        max: a
    } = i, c = u();

    function u() {
        const d = o(s),
            v = !n || t === "keepSnaps";
        return e.length === 1 ? [s] : v ? d : d.slice(l, a).map((f, p, b) => {
            const m = !p,
                y = wn(b, p);
            if (m) {
                const g = it(b[0]) + 1;
                return ii(g)
            }
            if (y) {
                const g = se(s) - it(b)[0] + 1;
                return ii(g, it(b)[0])
            }
            return f
        })
    }
    return {
        slideRegistry: c
    }
}

function Da(n, t, e, i, r) {
    const {
        reachedAny: s,
        removeOffset: o,
        constrain: l
    } = i;

    function a(f) {
        return f.concat().sort((p, b) => N(p) - N(b))[0]
    }

    function c(f) {
        const p = n ? o(f) : l(f),
            b = t.map((y, g) => ({
                diff: u(y - p, 0),
                index: g
            })).sort((y, g) => N(y.diff) - N(g.diff)),
            {
                index: m
            } = b[0];
        return {
            index: m,
            distance: p
        }
    }

    function u(f, p) {
        const b = [f, f + e, f - e];
        if (!n) return f;
        if (!p) return a(b);
        const m = b.filter(y => bn(y) === p);
        return m.length ? a(m) : it(b) - e
    }

    function h(f, p) {
        const b = t[f] - r.get(),
            m = u(b, p);
        return {
            index: f,
            distance: m
        }
    }

    function d(f, p) {
        const b = r.get() + f,
            {
                index: m,
                distance: y
            } = c(b),
            g = !n && s(b);
        if (!p || g) return {
            index: m,
            distance: f
        };
        const w = t[m] - y,
            x = f + u(w, 0);
        return {
            index: m,
            distance: x
        }
    }
    return {
        byDistance: d,
        byIndex: h,
        shortcut: u
    }
}

function Fa(n, t, e, i, r, s, o) {
    function l(h) {
        const d = h.distance,
            v = h.index !== t.get();
        s.add(d), d && (i.duration() ? n.start() : (n.update(), n.render(1), n.update())), v && (e.set(t.get()), t.set(h.index), o.emit("select"))
    }

    function a(h, d) {
        const v = r.byDistance(h, d);
        l(v)
    }

    function c(h, d) {
        const v = t.clone().set(h),
            f = r.byIndex(v.get(), d);
        l(f)
    }
    return {
        distance: a,
        index: c
    }
}

function qa(n, t, e, i, r, s, o, l) {
    const a = {
        passive: !0,
        capture: !0
    };
    let c = 0;

    function u(v) {
        if (!l) return;

        function f(p) {
            if (new Date().getTime() - c > 10) return;
            o.emit("slideFocusStart"), n.scrollLeft = 0;
            const y = e.findIndex(g => g.includes(p));
            yn(y) && (r.useDuration(0), i.index(y, 0), o.emit("slideFocus"))
        }
        s.add(document, "keydown", h, !1), t.forEach((p, b) => {
            s.add(p, "focus", m => {
                (xe(l) || l(v, m)) && f(b)
            }, a)
        })
    }

    function h(v) {
        v.code === "Tab" && (c = new Date().getTime())
    }
    return {
        init: u
    }
}

function Gt(n) {
    let t = n;

    function e() {
        return t
    }

    function i(a) {
        t = o(a)
    }

    function r(a) {
        t += o(a)
    }

    function s(a) {
        t -= o(a)
    }

    function o(a) {
        return yn(a) ? a : a.get()
    }
    return {
        get: e,
        set: i,
        add: r,
        subtract: s
    }
}

function fr(n, t) {
    const e = n.scroll === "x" ? o : l,
        i = t.style;
    let r = null,
        s = !1;

    function o(d) {
        return `translate3d(${d}px,0px,0px)`
    }

    function l(d) {
        return `translate3d(0px,${d}px,0px)`
    }

    function a(d) {
        if (s) return;
        const v = ba(n.direction(d));
        v !== r && (i.transform = e(v), r = v)
    }

    function c(d) {
        s = !d
    }

    function u() {
        s || (i.transform = "", t.getAttribute("style") || t.removeAttribute("style"))
    }
    return {
        clear: u,
        to: a,
        toggleActive: c
    }
}

function ja(n, t, e, i, r, s, o, l, a) {
    const u = te(r),
        h = te(r).reverse(),
        d = m().concat(y());

    function v(E, T) {
        return E.reduce((A, C) => A - r[C], T)
    }

    function f(E, T) {
        return E.reduce((A, C) => v(A, T) > 0 ? A.concat([C]) : A, [])
    }

    function p(E) {
        return s.map((T, A) => ({
            start: T - i[A] + .5 + E,
            end: T + t - .5 + E
        }))
    }

    function b(E, T, A) {
        const C = p(T);
        return E.map(L => {
            const I = A ? 0 : -e,
                P = A ? e : 0,
                _ = A ? "end" : "start",
                $ = C[L][_];
            return {
                index: L,
                loopPoint: $,
                slideLocation: Gt(-1),
                translate: fr(n, a[L]),
                target: () => l.get() > $ ? I : P
            }
        })
    }

    function m() {
        const E = o[0],
            T = f(h, E);
        return b(T, e, !1)
    }

    function y() {
        const E = t - o[0] - 1,
            T = f(u, E);
        return b(T, -e, !0)
    }

    function g() {
        return d.every(({
            index: E
        }) => {
            const T = u.filter(A => A !== E);
            return v(T, t) <= .1
        })
    }

    function w() {
        d.forEach(E => {
            const {
                target: T,
                translate: A,
                slideLocation: C
            } = E, L = T();
            L !== C.get() && (A.to(L), C.set(L))
        })
    }

    function x() {
        d.forEach(E => E.translate.clear())
    }
    return {
        canLoop: g,
        clear: x,
        loop: w,
        loopPoints: d
    }
}

function za(n, t, e) {
    let i, r = !1;

    function s(a) {
        if (!e) return;

        function c(u) {
            for (const h of u)
                if (h.type === "childList") {
                    a.reInit(), t.emit("slidesChanged");
                    break
                }
        }
        i = new MutationObserver(u => {
            r || (xe(e) || e(a, u)) && c(u)
        }), i.observe(n, {
            childList: !0
        })
    }

    function o() {
        i && i.disconnect(), r = !0
    }
    return {
        init: s,
        destroy: o
    }
}

function Na(n, t, e, i) {
    const r = {};
    let s = null,
        o = null,
        l, a = !1;

    function c() {
        l = new IntersectionObserver(f => {
            a || (f.forEach(p => {
                const b = t.indexOf(p.target);
                r[b] = p
            }), s = null, o = null, e.emit("slidesInView"))
        }, {
            root: n.parentElement,
            threshold: i
        }), t.forEach(f => l.observe(f))
    }

    function u() {
        l && l.disconnect(), a = !0
    }

    function h(f) {
        return ee(r).reduce((p, b) => {
            const m = parseInt(b),
                {
                    isIntersecting: y
                } = r[m];
            return (f && y || !f && !y) && p.push(m), p
        }, [])
    }

    function d(f = !0) {
        if (f && s) return s;
        if (!f && o) return o;
        const p = h(f);
        return f && (s = p), f || (o = p), p
    }
    return {
        init: c,
        destroy: u,
        get: d
    }
}

function Ha(n, t, e, i, r, s) {
    const {
        measureSize: o,
        startEdge: l,
        endEdge: a
    } = n, c = e[0] && r, u = f(), h = p(), d = e.map(o), v = b();

    function f() {
        if (!c) return 0;
        const y = e[0];
        return N(t[l] - y[l])
    }

    function p() {
        if (!c) return 0;
        const y = s.getComputedStyle(it(i));
        return parseFloat(y.getPropertyValue(`margin-${a}`))
    }

    function b() {
        return e.map((y, g, w) => {
            const x = !g,
                S = wn(w, g);
            return x ? d[g] + u : S ? d[g] + h : w[g + 1][l] - y[l]
        }).map(N)
    }
    return {
        slideSizes: d,
        slideSizesWithGaps: v,
        startGap: u,
        endGap: h
    }
}

function Va(n, t, e, i, r, s, o, l, a) {
    const {
        startEdge: c,
        endEdge: u,
        direction: h
    } = n, d = yn(e);

    function v(m, y) {
        return te(m).filter(g => g % y === 0).map(g => m.slice(g, g + y))
    }

    function f(m) {
        return m.length ? te(m).reduce((y, g, w) => {
            const x = it(y) || 0,
                S = x === 0,
                E = g === se(m),
                T = r[c] - s[x][c],
                A = r[c] - s[g][u],
                C = !i && S ? h(o) : 0,
                L = !i && E ? h(l) : 0,
                I = N(A - L - (T + C));
            return w && I > t + a && y.push(g), E && y.push(m.length), y
        }, []).map((y, g, w) => {
            const x = Math.max(w[g - 1] || 0);
            return m.slice(x, y)
        }) : []
    }

    function p(m) {
        return d ? v(m, e) : f(m)
    }
    return {
        groupSlides: p
    }
}

function Ba(n, t, e, i, r, s, o) {
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
        ae || Oe.constrain(Rt.pointerDown()), ke.seek()
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
        const $n = Rt.settled(),
            Fr = !Dr.shouldConstrain(),
            Rn = Pn ? $n : $n && Fr,
            Dn = Rn && !$r.pointerDown();
        Dn && Rr.stop();
        const qr = Oe.get() * Mn + _r.get() * (1 - Mn);
        ae.set(qr), Pn && (Pr.loop(Rt.direction()), Mr.loop()), ke.to(ae.get()), Dn && _n.emit("settle"), Rn || _n.emit("scroll")
    }, V = Sa(i, r, () => k(Ie), Rt => F(Ie, Rt)), K = .68, st = Z[ft.get()], pt = Gt(st), Tt = Gt(st), vt = Gt(st), At = Gt(st), Vt = Ia(pt, vt, Tt, At, d, K), Ae = Da(h, Z, tt, G, At), Le = Fa(V, ft, et, Vt, Ae, At, o), In = Ma(G), kn = ne(), kr = Na(t, e, o, p), {
        slideRegistry: On
    } = Ra($, y, Z, xt, U, z), Or = qa(n, e, On, Le, Vt, kn, o, S), Ie = {
        ownerDocument: i,
        ownerWindow: r,
        eventHandler: o,
        containerRect: A,
        slideRects: C,
        animation: V,
        axis: L,
        dragHandler: Ca(L, n, i, r, At, xa(L, r), pt, V, Le, Vt, Ae, ft, o, P, v, f, m, K, x),
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
    return Ie
}

function Ua() {
    let n = {},
        t;

    function e(c) {
        t = c
    }

    function i(c) {
        return n[c] || []
    }

    function r(c) {
        return i(c).forEach(u => u(t, c)), a
    }

    function s(c, u) {
        return n[c] = i(c).concat([u]), a
    }

    function o(c, u) {
        return n[c] = i(c).filter(h => h !== u), a
    }

    function l() {
        n = {}
    }
    const a = {
        init: e,
        emit: r,
        off: o,
        on: s,
        clear: l
    };
    return a
}
const Wa = {
    align: "center",
    axis: "x",
    container: null,
    slides: null,
    containScroll: "trimSnaps",
    direction: "ltr",
    slidesToScroll: 1,
    inViewThreshold: 0,
    breakpoints: {},
    dragFree: !1,
    dragThreshold: 10,
    loop: !1,
    skipSnaps: !1,
    duration: 25,
    startIndex: 0,
    active: !0,
    watchDrag: !0,
    watchResize: !0,
    watchSlides: !0,
    watchFocus: !0
};

function Ga(n) {
    function t(s, o) {
        return hr(s, o || {})
    }

    function e(s) {
        const o = s.breakpoints || {},
            l = ee(o).filter(a => n.matchMedia(a).matches).map(a => o[a]).reduce((a, c) => t(a, c), {});
        return t(s, l)
    }

    function i(s) {
        return s.map(o => ee(o.breakpoints || {})).reduce((o, l) => o.concat(l), []).map(n.matchMedia)
    }
    return {
        mergeOptions: t,
        optionsAtMedia: e,
        optionsMediaQueries: i
    }
}

function Ka(n) {
    let t = [];

    function e(s, o) {
        return t = o.filter(({
            options: l
        }) => n.optionsAtMedia(l).active !== !1), t.forEach(l => l.init(s, n)), o.reduce((l, a) => Object.assign(l, {
            [a.name]: a
        }), {})
    }

    function i() {
        t = t.filter(s => s.destroy())
    }
    return {
        init: e,
        destroy: i
    }
}

function Sn(n, t, e) {
    const i = n.ownerDocument,
        r = i.defaultView,
        s = Ga(r),
        o = Ka(s),
        l = ne(),
        a = Ua(),
        {
            mergeOptions: c,
            optionsAtMedia: u,
            optionsMediaQueries: h
        } = s,
        {
            on: d,
            off: v,
            emit: f
        } = a,
        p = L;
    let b = !1,
        m, y = c(Wa, Sn.globalOptions),
        g = c(y),
        w = [],
        x, S, E;

    function T() {
        const {
            container: z,
            slides: k
        } = g;
        S = (Ue(z) ? n.querySelector(z) : z) || n.children[0];
        const V = Ue(k) ? S.querySelectorAll(k) : k;
        E = [].slice.call(V || S.children)
    }

    function A(z) {
        const k = Ba(n, S, E, i, r, z, a);
        if (z.loop && !k.slideLooper.canLoop()) {
            const F = Object.assign({}, z, {
                loop: !1
            });
            return A(F)
        }
        return k
    }

    function C(z, k) {
        b || (y = c(y, z), g = u(y), w = k || w, T(), m = A(g), h([y, ...w.map(({
            options: F
        }) => F)]).forEach(F => l.add(F, "change", L)), g.active && (m.translate.to(m.location.get()), m.animation.init(), m.slidesInView.init(), m.slideFocus.init(et), m.eventHandler.init(et), m.resizeHandler.init(et), m.slidesHandler.init(et), m.options.loop && m.slideLooper.loop(), S.offsetParent && E.length && m.dragHandler.init(et), x = o.init(et, w)))
    }

    function L(z, k) {
        const F = U();
        I(), C(c({
            startIndex: F
        }, z), k), a.emit("reInit")
    }

    function I() {
        m.dragHandler.destroy(), m.eventStore.clear(), m.translate.clear(), m.slideLooper.clear(), m.resizeHandler.destroy(), m.slidesHandler.destroy(), m.slidesInView.destroy(), m.animation.destroy(), o.destroy(), l.clear()
    }

    function P() {
        b || (b = !0, l.clear(), I(), a.emit("destroy"), a.clear())
    }

    function _(z, k, F) {
        !g.active || b || (m.scrollBody.useBaseFriction().useDuration(k === !0 ? 0 : g.duration), m.scrollTo.index(z, F || 0))
    }

    function $(z) {
        const k = m.index.add(1).get();
        _(k, z, -1)
    }

    function B(z) {
        const k = m.index.add(-1).get();
        _(k, z, 1)
    }

    function j() {
        return m.index.add(1).get() !== U()
    }

    function R() {
        return m.index.add(-1).get() !== U()
    }

    function M() {
        return m.scrollSnapList
    }

    function H() {
        return m.scrollProgress.get(m.offsetLocation.get())
    }

    function U() {
        return m.index.get()
    }

    function Q() {
        return m.indexPrevious.get()
    }

    function W() {
        return m.slidesInView.get()
    }

    function tt() {
        return m.slidesInView.get(!1)
    }

    function dt() {
        return x
    }

    function xt() {
        return m
    }

    function Z() {
        return n
    }

    function G() {
        return S
    }

    function ft() {
        return E
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
    return C(t, e), setTimeout(() => a.emit("init"), 0), et
}
Sn.globalOptions = void 0;
const Ya = {
    active: !0,
    breakpoints: {},
    snapped: "is-snapped",
    inView: "is-in-view",
    draggable: "is-draggable",
    dragging: "is-dragging",
    loop: "is-loop"
};

function Ut(n) {
    return (Array.isArray(n) ? n : [n]).filter(Boolean)
}

function Wt(n, t) {
    !n || !t.length || n.classList.remove(...t)
}

function ce(n, t) {
    !n || !t.length || n.classList.add(...t)
}

function En(n = {}) {
    let t, e, i, r, s = [],
        o = [];
    const l = ["select"],
        a = ["pointerDown", "pointerUp"],
        c = ["slidesInView"],
        u = {
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
        } = g, S = w(Ya, En.globalOptions), E = w(S, n);
        t = x(E), i = e.rootNode(), r = e.slideNodes();
        const {
            watchDrag: T,
            loop: A
        } = e.internalEngine().options, C = !!T;
        t.loop && A && (u.loop = Ut(t.loop), ce(i, u.loop)), t.draggable && C && (u.draggable = Ut(t.draggable), ce(i, u.draggable)), t.dragging && (u.dragging = Ut(t.dragging), a.forEach(L => e.on(L, v))), t.snapped && (u.snapped = Ut(t.snapped), l.forEach(L => e.on(L, p)), p()), t.inView && (u.inView = Ut(t.inView), c.forEach(L => e.on(L, b)), b())
    }

    function d() {
        a.forEach(y => e.off(y, v)), l.forEach(y => e.off(y, p)), c.forEach(y => e.off(y, b)), Wt(i, u.loop), Wt(i, u.draggable), Wt(i, u.dragging), f([], s, u.snapped), f([], o, u.inView), Object.keys(u).forEach(y => {
            const g = y;
            u[g] = []
        })
    }

    function v(y, g) {
        (g === "pointerDown" ? ce : Wt)(i, u.dragging)
    }

    function f(y = [], g = [], w) {
        const x = g.map(E => r[E]),
            S = y.map(E => r[E]);
        return x.forEach(E => Wt(E, w)), S.forEach(E => ce(E, w)), y
    }

    function p() {
        const {
            slideRegistry: y
        } = e.internalEngine(), g = y[e.selectedScrollSnap()];
        s = f(g, s, u.snapped)
    }

    function b() {
        const y = e.slidesInView();
        o = f(y, o, u.inView)
    }
    return {
        name: "classNames",
        options: n,
        init: h,
        destroy: d
    }
}
En.globalOptions = void 0;
class Xa extends D {
    constructor(t) {
        super(t), this.events = {
            click: {}
        };
        const [e] = this.$("viewport"), i = e || this.el;
        this.options = this.setOptions();
        const r = this.setPlugins();
        this.slider = Sn(i, this.options, r), this.slider.on("resize", this.onSliderResize.bind(this)), this.setControls(), this.setDots(), this.setOnScroll(), this.setOnSelect(), this.setProgress(), this.setWatchDrag(), this.onSliderResize()
    }
    reInit(t = {}) {
        this.slider.reInit(t)
    }
    setOptions() {
        const t = {
            loop: !1,
            controls: !1,
            dots: !1,
            align: "start",
            autoplay: !1,
            direction: "ltr",
            startIndex: 0,
            skipSnaps: !1,
            watchSlides: !1,
            watchDrag: !0,
            onScroll: null,
            containScroll: "trimSnaps",
            inViewThreshold: .5,
            classes: !0,
            breakpoints: {}
        };
        try {
            const e = JSON.parse(this.el.dataset.config);
            return this.el.removeAttribute("data-config"), Object.assign(t, e)
        } catch {
            return t
        }
    }
    setPlugins() {
        const t = [];
        return this.options.autoplay && t.push(Autoplay({
            delay: Number(this.options.autoplay) * 1e3,
            stopOnInteraction: !0
        })), this.options.classes && t.push(En({
            selected: "-inView",
            draggabble: "-draggable",
            dragging: "-dragging"
        })), t
    }
    onSliderResize() {
        const t = this.slider.internalEngine().scrollSnaps.length > 1;
        this.el.classList[t ? "remove" : "add"]("-fixed"), this.slider.reInit({
            active: t,
            align: t ? this.options.align : "center",
            controls: t ? this.options.controls : !1,
            progress: t ? this.options.progress : !1
        })
    }
    setWatchDrag() {
        if (!this.options.watchDrag) return;
        const t = this.onDrag.bind(this);
        this.slider.on("select", t)
    }
    onDrag() {}
    setOnScroll() {
        if (!this.options.onScroll) return;
        const t = Un(this[this.options.onScroll].bind(this), 50);
        this.slider.on("scroll", t).on("select", t), t()
    }
    setOnSelect() {
        if (!this.options.onSelect) return;
        const t = Un(this[this.options.onSelect].bind(this), 50);
        this.slider.on("select", t)
    }
    setControls() {
        if (!this.options.controls) return;
        const t = this.disablePrevAndNextBtns.bind(this);
        this.slider.on("select", t).on("init", t), this.events.click.nextBtn = "scrollNext", this.events.click.prevBtn = "scrollPrev", this.scrollNext = this.slider.scrollNext, this.scrollPrev = this.slider.scrollPrev
    }
    setDots() {
        if (!this.options.dots) return;
        const t = this.setSelectedDotBtn.bind(this);
        this.slider.on("select", t).on("init", t), this.events.click.dot = "selectDotBtn", this.generateDotBtns()
    }
    generateDotBtns() {
        const t = document.querySelector("#dotTemplate").innerHTML,
            [e] = this.$("dotsContainer"),
            i = this.slider.scrollSnapList().reduce((r, s, o) => {
                const l = t.replace("{index}", `data-index="${o}"`);
                return r + l
            }, "");
        e.innerHTML = i
    }
    selectDotBtn(t) {
        const e = Number(t.currentTarget.dataset.index);
        this.slider.scrollTo(e)
    }
    setSelectedDotBtn() {
        const t = this.slider.previousScrollSnap(),
            e = this.slider.selectedScrollSnap(),
            i = this.$("dot");
        i[t].classList.remove("-active"), i[e].classList.add("-active")
    }
    disablePrevAndNextBtns() {
        const t = this.$("prevBtn"),
            e = this.$("nextBtn");
        this.slider.canScrollPrev() ? t[0].removeAttribute("disabled") : t[0].setAttribute("disabled", "disabled"), this.slider.canScrollNext() ? e[0].removeAttribute("disabled") : e[0].setAttribute("disabled", "disabled")
    }
    setProgress() {
        if (!this.options.progress) return;
        const [t] = this.$("bar");
        this.progress = t;
        const e = this.applyProgress.bind(this),
            i = this.slider.scrollSnapList();
        this.deltaProgress = 1 / i.length, this.slider.on("init", e).on("reInit", e).on("scroll", e)
    }
    applyProgress() {
        const {
            deltaProgress: t
        } = this, e = Math.max(0, Math.min(1, this.slider.scrollProgress() * (1 - t) + t));
        this.progress.style.transform = `translate3d(${e*100}%,0px,0px)`
    }
    onScroll() {}
    updateCarouselImage() {
        const t = this.slider.selectedScrollSnap(),
            i = this.$("image")[t];
        i && this.call("loadImage", {
            item: i,
            config: {}
        }, "Website", "website")
    }
}
class Ja extends D {
    constructor(t) {
        super(t), this.open = this.change.bind(this, !0), this.close = this.change.bind(this, !1), this.raf = null, this.state = this.el.classList.contains("-open"), this.events = {
            click: {
                button: "toggle"
            }
        }
    }
    toggle(t) {
        t.preventDefault(), t.target.blur(), this.change(!this.state)
    }
    change(t) {
        if (this.state === t) return;
        this.state = t;
        let e = 0;
        const [i] = this.$("button");
        window.cancelAnimationFrame(this.raf);
        const [r] = this.$("content");
        t && (e = r.scrollHeight), this.raf = window.requestAnimationFrame(() => {
            e && this.el.style.setProperty("--height", `${r.scrollHeight}px`), i.setAttribute("aria-expanded", this.state), this.el.classList.toggle("-open", this.state)
        })
    }
}
class Cn extends D {
    constructor(t) {
        super(t), this.errors = {}, this.state = !1, this.containerScroll = window, this.loading = !1, this.timeouts = [], this.interval = null, this.events = {
            click: {
                submit: "onSearch"
            }
        }
    }
    init() {
        setTimeout(() => {
            const t = this.el.dataset.status;
            t && (this.setCallback(t, !0, 1500), this.el.removeAttribute("data-status"))
        }, 2e3)
    }
    onSearch(t) {
        if (this.disabledSubmit) {
            t.preventDefault();
            return
        }
        this.el.checkValidity() && (this.disabledSubmit = !0, window.requestAnimationFrame(() => {
            this.clearCallbacks(), t.currentTarget.setAttribute("aria-disabled", "true")
        }), t.currentTarget.blur(), t.preventDefault(), this.sendForm(this.el))
    }
    sendForm(t) {
        this.cleanErrors(), window.requestAnimationFrame(() => {
            this.el.classList.add("-loading")
        }), this.loading = !0, this.state = null, fetch(t.action, {
            method: "POST",
            responseType: "json",
            body: new FormData(this.el),
            headers: {
                "Cache-Control": "no-cache",
                "X-Requested-With": "post"
            }
        }).then(async e => {
            const i = await e.json();
            this.formSent(i)
        }).catch(e => {
            console.log(e), this.errorForm(e)
        })
    }
    setCallback(t, e, i = 15e3) {
        const r = document.createElement("div");
        r.setAttribute("class", "m-formCallback"), r.innerHTML = `<p class="tx-ps">${t}</p>`, e ? (this.resetInput(), r.classList.add("-success")) : r.classList.add("-error"), window.requestAnimationFrame(() => {
            this.el.appendChild(r), this.el.classList.remove("-loading")
        }), r.addEventListener("click", this.clearCallback.bind(this, r)), this.timeouts.push({
            el: r,
            timeout: setTimeout(this.clearCallback.bind(this, r), i)
        })
    }
    clearCallback(t) {
        const e = this.timeouts.findIndex(r => r.el === t);
        if (e === -1) return;
        const i = this.timeouts[e];
        clearTimeout(i.timeout), window.requestAnimationFrame(() => {
            i.el.classList.add("-leave")
        }), setTimeout(() => {
            window.requestAnimationFrame(() => {
                i.el.remove()
            })
        }, 700), this.timeouts.splice(e, 1)
    }
    clearCallbacks() {
        this.timeouts.forEach(t => {
            clearTimeout(t.timeout), window.requestAnimationFrame(() => {
                t.el.remove()
            })
        }), this.timeouts = []
    }
    cleanErrors() {
        const t = this.$("invalid");
        window.requestAnimationFrame(() => {
            t.forEach(e => {
                e.parentNode.classList.remove("-error"), e.remove()
            })
        })
    }
    formSent(t) {
        if (t.invalid && Object.keys(t.invalid).length > 0) {
            console.log(t, t.invalid, t.sent), this.errorForm(t);
            return
        }
        this.state = !0, this.setCallback(t.message, t.sent, 4500), this.afterSuccess(t), this.enableForm()
    }
    errorForm(t) {
        this.setCallback(t.message, t.success, 1500), this.state = !1, this.afterError(), this.enableForm(), t.invalid && Object.keys(t.invalid).length > 0 && this.setErrors(t.invalid)
    }
    setErrors(t) {
        this.errors = t, Array.from(Object.entries(t)).forEach(([i, r]) => {
            const s = this.$(i)[0];
            if (s) {
                const o = document.createElement("p");
                o.innerHTML = r, s.classList.add("-error"), o.setAttribute("class", "a-pxsmall a-inputField__error"), o.setAttribute(this.mAttr, "invalid"), window.requestAnimationFrame(() => {
                    s.append(o)
                })
            }
        })
    }
    enableForm() {
        window.requestAnimationFrame(() => {
            this.$("submit")[0].removeAttribute("aria-disabled", "false")
        }), this.disabledSubmit = !1
    }
    resetInput() {
        this.el.querySelectorAll("input, textarea, select").forEach(e => {
            if (e.type !== "hidden") {
                if (e.type === "radio" || e.type === "checkbox") {
                    e.checked = !1;
                    return
                }
                e.value = ""
            }
        })
    }
    afterSuccess() {}
    afterError() {}
}
class Qa extends D {
    constructor(t) {
        super(t), this.visible = !1, this.config = {
            disableScroll: !0
        }, this.activeElement = null, this.open = this.change.bind(this, !0), this.close = this.change.bind(this, !1), this.onClick = this.onClick.bind(this), this.onKeyDown = this.onKeyDown.bind(this)
    }
    scrollBehaviour(t) {
        this.config.disableScroll && Object.assign(Zt.style, {
            overflow: t ? "hidden" : ""
        })
    }
    toggleEvents(t) {
        const e = t ? "add" : "remove";
        this.el[`${e}EventListener`]("touchstart", this.onClick), this.el[`${e}EventListener`]("click", this.onClick), document[`${e}EventListener`]("keydown", this.onKeyDown)
    }
    onClick(t) {
        const {
            target: e
        } = t, {
            action: i
        } = e.dataset;
        this[i] && (this[i](), e.blur(), t.preventDefault(), t.stopPropagation())
    }
    onKeyDown(t) {
        if (t.keyCode === 27) {
            this.close();
            return
        }
        t.keyCode === 9 && this.retainFocus(t)
    }
    getFocusableNodes() {
        const t = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", 'button:not([disabled]):not([aria-hidden]):not([aria-disabled="true"])', "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'],
            e = this.el.querySelectorAll(t);
        return Array(...e)
    }
    retainFocus(t) {
        let e = this.getFocusableNodes();
        if (e.length !== 0)
            if (e = e.filter(i => i.offsetParent !== null), !this.el.contains(document.activeElement)) e[0].focus();
            else {
                const i = e.indexOf(document.activeElement);
                t.shiftKey && i === 0 && (e[e.length - 1].focus(), t.preventDefault()), !t.shiftKey && e.length > 0 && i === e.length - 1 && (e[0].focus(), t.preventDefault())
            }
    }
    setFocusToFirstNode() {
        const t = this.getFocusableNodes();
        if (t.length === 0) return;
        const e = t.filter(i => i.dataset.action !== "close");
        if (e.length > 0) {
            e[0].focus();
            return
        }
        t[0].focus()
    }
    destroy() {
        this.el.remove()
    }
    toggle() {
        this.change(!this.state)
    }
    change(t) {
        if (this.visible === t) return;
        this.visible = t, this.scrollBehaviour(t), this.toggleEvents(t), this.el.setAttribute("aria-hidden", !t);
        let e = () => {};
        t ? (this.el.classList.add("-isOpen"), this.activeElement = document.activeElement, e = () => {
            this.el.removeEventListener("animationend", e, !1), this.setFocusToFirstNode(), this.afterChange(!0)
        }) : e = () => {
            this.el.removeEventListener("animationend", e, !1), this.el.classList.remove("-isOpen"), this.activeElement && this.activeElement.focus && this.activeElement.focus(), this.el.getAttribute("data-module-popin") === "contact" && this.call("onClose", null, "FormSteps", null), this.afterChange(!1)
        }, this.el.addEventListener("animationend", e, !1)
    }
    afterChange() {}
}
class Za extends D {
    constructor(t) {
        super(t), this.events = {
            click: "onClick"
        }
    }
    onClick() {
        const t = this.el.dataset.action.split(","),
            e = {
                el: this.el
            };
        this.call(t[0], e, t[1], t[2])
    }
}
class tl extends D {
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
        }
    }
    init() {
        try {
            this.regions = JSON.parse(this.el.dataset.regions || "[]")
        } catch (t) {
            this.regions = [], console.warn("Error parsing regions data:", t)
        }
        this.onChangeRegion({
            target: this.$("region")[0] || {
                value: ""
            }
        })
    }
    onChangeRegion(t) {
        const [e] = this.$("department"), i = e.querySelectorAll("option"), r = this.regions.find(s => s.id === t.target.value);
        if (!r) {
            e.value = "", i.forEach(s => {
                s.style.display = "block"
            });
            return
        }
        i.forEach(s => {
            if (s.value === "") {
                s.style.display = "block";
                return
            }
            s.style.display = r.departments.includes(Number(s.value)) ? "block" : "none"
        }), r.departments.includes(Number(e.value)) || (e.value = "")
    }
    onChangeDepartment(t) {
        const e = Number(t.target.value),
            i = this.regions.find(s => s.departments.includes(e)),
            [r] = this.$("region");
        if (r.querySelectorAll("option"), !i) {
            r.value = "", this.onChangeRegion({
                target: r
            });
            return
        }
        r.value = i.id, this.onChangeRegion({
            target: r
        })
    }
    onClick(t) {
        const {
            target: e
        } = t, {
            action: i
        } = e.dataset;
        i && this[i] && this[i](e)
    }
    editForm() {
        this.el.classList.add("-form")
    }
    resetForm() {
        this.resetInputs(), this.el.classList.add("-form")
    }
    resetInputs() {
        this.el.querySelectorAll("input, textarea, select").forEach(e => {
            if (e.type !== "hidden") {
                if (e.type === "radio" || e.type === "checkbox") {
                    e.checked = !1;
                    return
                }
                e.value = ""
            }
        })
    }
    getAction(t, e) {
        const i = new URLSearchParams(e).toString();
        return i ? `${t}?${i}` : t
    }
    onSubmit(t) {
        t.preventDefault();
        const e = t.target,
            i = new FormData(e),
            r = this.getAction(e.action, i);
        this.call("update", {
            url: r,
            formData: i
        }, "AdsListing", "ajaxContentAds")
    }
    updateData(t) {
        const [e] = this.$("tagsEl");
        let i = "";
        t.tags && t.tags.length && (i = t.tags.map(r => `<li class="a-tag -bgprimary -clrwhite tx-ps -tx600">${r}</li>`).join("")), e.innerHTML = i, this.el.classList.remove("-form")
    }
}
class el extends D {
    constructor(t) {
        super(t), this.updating = !1, this.events = {
            click: {
                submit: "onSubmit"
            }
        }
    }
    getAction(t) {
        return t
    }
    validateForm() {
        return !0
    }
    onSubmit(t) {
        t.preventDefault(), this.updateBase()
    }
    updateBase() {
        const [t] = this.$("form"), e = new FormData(t), i = this.getAction(t.action, e);
        this.update({
            url: i,
            formData: e
        })
    }
    update({
        url: t,
        formData: e
    }) {
        if (!this.updating) {
            if (this.updating = !0, e && !this.validateForm(t, e)) {
                this.updating = !1;
                return
            }
            this.onUpdate(), this.updateUrl(t), fetch(t, {
                method: "GET",
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "multipart/form-data",
                    "X-Requested-With": "fetch"
                }
            }).then(this.afterUpdate.bind(this)).catch(this.onError.bind(this))
        }
    }
    async afterUpdate(t) {
        await t.json(), this.updating = !1
    }
    onError(t) {
        console.log(t)
    }
    onUpdate() {}
    updateUrl(t) {
        const e = t.replace(".json", "");
        this.call("updateHistory", {
            url: e,
            action: "push"
        }, "Website", "website")
    }
}
class nl extends el {
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
        }
    }
    validateForm(t) {
        const e = this.data[t];
        return this.contentId = t, e ? (this.updateContent(e), this.updateUrl(t), this.onComplete(e), !1) : !0
    }
    async afterUpdate(t) {
        if (t.status !== 200) {
            this.updating = !1, this.onError("Une erreur est survenue, veuillez réessayer");
            return
        }
        try {
            const e = await t.json();
            clearTimeout(this.timeout), this.updating = !1, this.updateContent(e), this.onComplete(e)
        } catch {
            clearTimeout(this.timeout), this.updating = !1, this.onError("Une erreur est survenue, veuillez réessayer")
        }
    }
    updateContent(t) {
        const e = this.$("content");
        this.data[this.contentId] = t, window.cancelAnimationFrame(this.rafs.content), this.rafs.content = window.requestAnimationFrame(() => {
            e.forEach(i => {
                i.style.removeProperty("min-height"), this.call("destroy", i, "app"), i.innerHTML = t[i.dataset.content], this.call("update", i, "app"), this.call("enterPage", i, "Scroll", "scroll")
            }), this.call("updateLazy", null, "Website", "website"), this.handleUpdate(t), this.rafs.content = window.requestAnimationFrame(() => {
                this.replaceScroll()
            })
        })
    }
    replaceScroll(t = "smooth") {
        const e = this.el.getBoundingClientRect();
        window.scrollTo({
            top: window.scrollY + e.top - this.offset,
            behavior: t
        })
    }
    onError(t = "Aucun résultat") {
        const e = this.$("content");
        window.cancelAnimationFrame(this.rafs.errors), this.rafs.errors = window.requestAnimationFrame(() => {
            e.forEach(i => {
                i.style.removeProperty("min-height"), i.innerHTML = `<h3 class="o-adsListing__full o-adsListing__label tx-m my-sm lg-my-md">${t}</h3>`
            })
        })
    }
    onUpdate() {
        this.timeout = setTimeout(() => {
            window.cancelAnimationFrame(this.rafs.loading);
            const t = this.$("content"),
                e = `
        <div class="m-loaderSection o-adsListing__full my-sm lg-my-md">
          <div class="m-loaderSection__loader" aria-hidden="true"></div>
        </div>
      `;
            this.rafs.loading = window.requestAnimationFrame(() => {
                this.replaceScroll("instant"), t.forEach(i => {
                    i.style.setProperty("min-height", `${i.offsetHeight}px`, "important"), i.innerHTML = e
                })
            })
        }, 300)
    }
    onClick(t) {
        const {
            target: e
        } = t;
        this.constructor.isValidPaginationTarget(e) && this.onClickPagination(e, t)
    }
    onClickPagination(t, e) {
        const i = this.constructor.setPaginationUrl(t.href),
            r = this.data[i];
        if (e.preventDefault(), this.contentId = i, r) {
            this.updateContent(r), this.updateUrl(i), this.onComplete(r);
            return
        }
        const [s] = this.$("form");
        if (s) {
            const o = new FormData(s);
            this.update({
                url: i,
                formData: o
            })
        } else this.update({
            url: i,
            formData: null
        })
    }
    static isValidPaginationTarget(t) {
        return t.nodeName === "A" && t.href && t.dataset.pagination !== void 0
    }
    static setPaginationUrl(t) {
        return t.includes("/page") ? t.replace("/page", ".json/page") : t.includes("?") ? t.replace("?", ".json?") : `${t}.json`
    }
    handleUpdate() {}
    onComplete(t) {}
}
class il extends nl {
    onClick(t) {
        const {
            target: e
        } = t;
        if (this.constructor.isValidPaginationTarget(e)) {
            this.onClickPagination(e, t);
            return
        }
        this.constructor.isValidCardTarget(e) && this.onClickCard(e, t)
    }
    static isValidCardTarget(t) {
        return t.nodeName === "A" && t.href && t.dataset.card !== void 0
    }
    onClickCard(t, e) {
        e.preventDefault(), e.stopPropagation(), Y.go(t.href, lr)
    }
}
class rl extends il {
    onComplete(t) {
        super.onComplete(t), this.call("updateData", t, "AdsFilters", "adsFilters")
    }
}
class sl extends D {
    constructor(t) {
        super(t), this.state = !1, this.open = this.change.bind(this, !0), this.close = this.change.bind(this, !1), this.toast = null, this.events = {
            click: "onClick"
        }
    }
    onClick(t) {
        const {
            target: e
        } = t, {
            action: i
        } = e.dataset;
        i && this[i] && this[i](e)
    }
    toggle() {
        this.change(!this.state)
    }
    change(t) {
        if (this.state === t) return;
        this.state = t;
        const [e] = this.$("aside"), [i] = this.$("overlay"), [r] = this.$("button");
        e.style.transform = `translateX(${t?100:0}%)`, i.style.display = t ? "block" : "none", r.innerText = t ? "Close" : "Menu"
    }
    async copy(t) {
        const e = t.dataset.copy;
        if (window.navigator.clipboard && window.isSecureContext) await window.navigator.clipboard.writeText(e);
        else {
            const i = document.createElement("textarea");
            i.value = e, i.style.position = "absolute", i.style.left = "-99999999px", document.body.prepend(i), i.select();
            try {
                document.execCommand("copy"), this.addCopyToast(e)
            } catch (r) {
                console.log(r)
            } finally {
                i.remove()
            }
        }
    }
    addCopyToast(t) {
        if (clearTimeout(this.toastTimeout), this.toast) {
            const e = this.toast.querySelector("p");
            e.innerText = t
        } else {
            const e = document.createElement("div");
            e.setAttribute("class", "t-styleguide__toast"), e.setAttribute("data-action", "removeCopyToast");
            const i = document.createElement("h3");
            i.innerText = "Texte copié";
            const r = document.createElement("p");
            r.innerText = t, e.append(i), e.append(r), this.el.append(e), this.toast = e
        }
        this.toastTimeout = setTimeout(this.removeCopyToast.bind(this), 5e3)
    }
    removeCopyToast() {
        clearTimeout(this.toastTimeout), this.toast.remove(), this.toast = null
    }
}
class ol extends D {
    constructor(t) {
        super(t), console.log("Test module"), this.initialized = !1
    }
    initModule() {
        this.initialized || (console.log("initModule Test"), this.initialized = !0)
    }
    enter() {
        this.initModule(), console.log("enter Test")
    }
    leave() {
        this.initialized && console.log("leave Test")
    }
    toggle({
        way: t
    }) {
        t === "enter" ? this.enter() : this.leave()
    }
}
class al extends D {
    constructor(t) {
        super(t), this.events = {}
    }
    toggleHeaderVisibility(t) {
        this.visibilityState !== t && (this.visibilityState = t, this.el.classList.toggle("-isHidden", t))
    }
    toggleBackground(t) {
        this.bgState !== t && (this.bgState = t, this.el.classList.toggle("-bg", t), this.el.classList.toggle("-reduced", t))
    }
}
class ll extends D {
    constructor(t) {
        super(t), this.events = {
            click: {
                button: "onChoice",
                close: "onClose"
            }
        }, this.iconsComputer = this.$("iconsComputer")[0], this.iconsUser = this.$("iconsUser")[0], this.timeoutId
    }
    onChoice(t) {
        clearTimeout(this.timeoutId);
        const e = t.target.dataset.choice;
        t.target.classList.add("-isActive"), this.el.classList.add("is-playing");
        const i = ["pierre", "feuille", "ciseaux"],
            r = i[Math.floor(Math.random() * i.length)];
        this.iconsComputer.querySelector("[data-icon].-isActive") && this.iconsComputer.querySelector("[data-icon].-isActive").classList.remove("-isActive"), this.iconsUser.querySelector("[data-icon].-isActive") && this.iconsUser.querySelector("[data-icon].-isActive").classList.remove("-isActive"), this.iconsUser.querySelector('[data-icon="' + e + '"]').classList.add("-isActive"), setTimeout(() => {
            this.el.classList.remove("is-playing"), t.target.classList.remove("-isActive"), this.iconsComputer.querySelector('[data-icon="' + r + '"]').classList.add("-isActive");
            let s = "";
            e === r ? s = "Égalité !" : e === "pierre" && r === "ciseaux" || e === "feuille" && r === "pierre" || e === "ciseaux" && r === "feuille" ? s = "<strong>gagné !</strong>" : s = "<strong>Perdu !</strong>", this.$("result")[0].classList.add("-isActive"), this.$("resultText")[0].innerHTML = s, this.timeoutId = setTimeout(() => {
                this.$("result")[0].classList.remove("-isActive"), this.iconsComputer.querySelector("[data-icon].-isActive") && this.iconsComputer.querySelector("[data-icon].-isActive").classList.remove("-isActive"), this.iconsUser.querySelector("[data-icon].-isActive") && this.iconsUser.querySelector("[data-icon].-isActive").classList.remove("-isActive"), this.iconsUser.querySelector('[data-icon="pierre"]').classList.add("-isActive"), this.iconsComputer.querySelector('[data-icon="pierre"]').classList.add("-isActive")
            }, 3e3)
        }, 2e3)
    }
}
class cl extends D {
    constructor(t) {
        super(t), this.events = {}, this.previousScrollY = 0;
        const e = this.el.previousElementSibling;
        e && (this.previousId = e.getAttribute("data-module-list-cards"))
    }
    onScrollProgress(t) {
        this.previousId && this.call("setProgress", t, "ListCards", this.previousId);
        const e = window.scrollY;
        e < this.previousScrollY && t === 0 ? (this.el.classList.remove("-isEntered"), this.hasEntered = !1) : t > 0 && !this.hasEntered && (this.el.classList.add("-isEntered"), this.hasEntered = !0), this.previousScrollY = e
    }
    setProgress(t) {
        this.el.style.setProperty("--scroll-progress", t)
    }
}(function() {
    function n() {
        for (var i = arguments.length, r = 0; r < i; r++) {
            var s = r < 0 || arguments.length <= r ? void 0 : arguments[r];
            s.nodeType === 1 || s.nodeType === 11 ? this.appendChild(s) : this.appendChild(document.createTextNode(String(s)))
        }
    }

    function t() {
        for (; this.lastChild;) this.removeChild(this.lastChild);
        arguments.length && this.append.apply(this, arguments)
    }

    function e() {
        for (var i = this.parentNode, r = arguments.length, s = new Array(r), o = 0; o < r; o++) s[o] = arguments[o];
        var l = s.length;
        if (i)
            for (l || i.removeChild(this); l--;) {
                var a = s[l];
                typeof a != "object" ? a = this.ownerDocument.createTextNode(a) : a.parentNode && a.parentNode.removeChild(a), l ? i.insertBefore(this.previousSibling, a) : i.replaceChild(a, this)
            }
    }
    typeof Element < "u" && (Element.prototype.append || (Element.prototype.append = n, DocumentFragment.prototype.append = n), Element.prototype.replaceChildren || (Element.prototype.replaceChildren = t, DocumentFragment.prototype.replaceChildren = t), Element.prototype.replaceWith || (Element.prototype.replaceWith = e, DocumentFragment.prototype.replaceWith = e))
})();

function ul(n, t) {
    if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function ri(n, t) {
    for (var e = 0; e < t.length; e++) {
        var i = t[e];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i)
    }
}

function si(n, t, e) {
    return t && ri(n.prototype, t), e && ri(n, e), n
}

function hl(n, t, e) {
    return t in n ? Object.defineProperty(n, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[t] = e, n
}

function oi(n, t) {
    var e = Object.keys(n);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(n);
        t && (i = i.filter(function(r) {
            return Object.getOwnPropertyDescriptor(n, r).enumerable
        })), e.push.apply(e, i)
    }
    return e
}

function ai(n) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t] != null ? arguments[t] : {};
        t % 2 ? oi(Object(e), !0).forEach(function(i) {
            hl(n, i, e[i])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : oi(Object(e)).forEach(function(i) {
            Object.defineProperty(n, i, Object.getOwnPropertyDescriptor(e, i))
        })
    }
    return n
}

function pr(n, t) {
    return fl(n) || ml(n, t) || mr(n, t) || vl()
}

function X(n) {
    return dl(n) || pl(n) || mr(n) || gl()
}

function dl(n) {
    if (Array.isArray(n)) return Ge(n)
}

function fl(n) {
    if (Array.isArray(n)) return n
}

function pl(n) {
    if (typeof Symbol < "u" && Symbol.iterator in Object(n)) return Array.from(n)
}

function ml(n, t) {
    if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(n)))) {
        var e = [],
            i = !0,
            r = !1,
            s = void 0;
        try {
            for (var o = n[Symbol.iterator](), l; !(i = (l = o.next()).done) && (e.push(l.value), !(t && e.length === t)); i = !0);
        } catch (a) {
            r = !0, s = a
        } finally {
            try {
                !i && o.return != null && o.return()
            } finally {
                if (r) throw s
            }
        }
        return e
    }
}

function mr(n, t) {
    if (n) {
        if (typeof n == "string") return Ge(n, t);
        var e = Object.prototype.toString.call(n).slice(8, -1);
        if (e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set") return Array.from(n);
        if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return Ge(n, t)
    }
}

function Ge(n, t) {
    (t == null || t > n.length) && (t = n.length);
    for (var e = 0, i = new Array(t); e < t; e++) i[e] = n[e];
    return i
}

function gl() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function vl() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function kt(n, t) {
    return Object.getOwnPropertyNames(Object(n)).reduce(function(e, i) {
        var r = Object.getOwnPropertyDescriptor(Object(n), i),
            s = Object.getOwnPropertyDescriptor(Object(t), i);
        return Object.defineProperty(e, i, s || r)
    }, {})
}

function oe(n) {
    return typeof n == "string"
}

function xn(n) {
    return Array.isArray(n)
}

function ue() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
        t = kt(n),
        e;
    return t.types !== void 0 ? e = t.types : t.split !== void 0 && (e = t.split), e !== void 0 && (t.types = (oe(e) || xn(e) ? String(e) : "").split(",").map(function(i) {
        return String(i).trim()
    }).filter(function(i) {
        return /((line)|(word)|(char))/i.test(i)
    })), (t.absolute || t.position) && (t.absolute = t.absolute || /absolute/.test(n.position)), t
}

function Tn(n) {
    var t = oe(n) || xn(n) ? String(n) : "";
    return {
        none: !t,
        lines: /line/i.test(t),
        words: /word/i.test(t),
        chars: /char/i.test(t)
    }
}

function Te(n) {
    return n !== null && typeof n == "object"
}

function yl(n) {
    return Te(n) && /^(1|3|11)$/.test(n.nodeType)
}

function bl(n) {
    return typeof n == "number" && n > -1 && n % 1 === 0
}

function wl(n) {
    return Te(n) && bl(n.length)
}

function Mt(n) {
    return xn(n) ? n : n == null ? [] : wl(n) ? Array.prototype.slice.call(n) : [n]
}

function li(n) {
    var t = n;
    return oe(n) && (/^(#[a-z]\w+)$/.test(n.trim()) ? t = document.getElementById(n.trim().slice(1)) : t = document.querySelectorAll(n)), Mt(t).reduce(function(e, i) {
        return [].concat(X(e), X(Mt(i).filter(yl)))
    }, [])
}
var Sl = Object.entries,
    me = "_splittype",
    rt = {},
    El = 0;

function ut(n, t, e) {
    if (!Te(n)) return console.warn("[data.set] owner is not an object"), null;
    var i = n[me] || (n[me] = ++El),
        r = rt[i] || (rt[i] = {});
    return e === void 0 ? t && Object.getPrototypeOf(t) === Object.prototype && (rt[i] = ai(ai({}, r), t)) : t !== void 0 && (r[t] = e), e
}

function Ot(n, t) {
    var e = Te(n) ? n[me] : null,
        i = e && rt[e] || {};
    return i
}

function gr(n) {
    var t = n && n[me];
    t && (delete n[t], delete rt[t])
}

function Cl() {
    Object.keys(rt).forEach(function(n) {
        delete rt[n]
    })
}

function xl() {
    Sl(rt).forEach(function(n) {
        var t = pr(n, 2),
            e = t[0],
            i = t[1],
            r = i.isRoot,
            s = i.isSplit;
        (!r || !s) && (rt[e] = null, delete rt[e])
    })
}

function Tl(n) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ",
        e = n ? String(n) : "";
    return e.trim().replace(/\s+/g, " ").split(t)
}
var An = "\\ud800-\\udfff",
    vr = "\\u0300-\\u036f\\ufe20-\\ufe23",
    yr = "\\u20d0-\\u20f0",
    br = "\\ufe0e\\ufe0f",
    Al = "[".concat(An, "]"),
    Ke = "[".concat(vr).concat(yr, "]"),
    Ye = "\\ud83c[\\udffb-\\udfff]",
    Ll = "(?:".concat(Ke, "|").concat(Ye, ")"),
    wr = "[^".concat(An, "]"),
    Sr = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    Er = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    Cr = "\\u200d",
    xr = "".concat(Ll, "?"),
    Tr = "[".concat(br, "]?"),
    Il = "(?:" + Cr + "(?:" + [wr, Sr, Er].join("|") + ")" + Tr + xr + ")*",
    kl = Tr + xr + Il,
    Ol = "(?:".concat(["".concat(wr).concat(Ke, "?"), Ke, Sr, Er, Al].join("|"), `
)`),
    _l = RegExp("".concat(Ye, "(?=").concat(Ye, ")|").concat(Ol).concat(kl), "g"),
    Pl = [Cr, An, vr, yr, br],
    Ml = RegExp("[".concat(Pl.join(""), "]"));

function $l(n) {
    return n.split("")
}

function Ar(n) {
    return Ml.test(n)
}

function Rl(n) {
    return n.match(_l) || []
}

function Dl(n) {
    return Ar(n) ? Rl(n) : $l(n)
}

function Fl(n) {
    return n == null ? "" : String(n)
}

function ql(n) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return n = Fl(n), n && oe(n) && !t && Ar(n) ? Dl(n) : n.split(t)
}

function Xe(n, t) {
    var e = document.createElement(n);
    return t && Object.keys(t).forEach(function(i) {
        var r = t[i],
            s = oe(r) ? r.trim() : r;
        s === null || s === "" || (i === "children" ? e.append.apply(e, X(Mt(s))) : e.setAttribute(i, s))
    }), e
}
var Ln = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: ["lines", "words", "chars"],
    absolute: !1,
    tagName: "div"
};

function jl(n, t) {
    t = kt(Ln, t);
    var e = Tn(t.types),
        i = t.tagName,
        r = n.nodeValue,
        s = document.createDocumentFragment(),
        o = [],
        l = [];
    return /^\s/.test(r) && s.append(" "), o = Tl(r).reduce(function(a, c, u, h) {
        var d, v;
        return e.chars && (v = ql(c).map(function(f) {
            var p = Xe(i, {
                class: "".concat(t.splitClass, " ").concat(t.charClass),
                style: "display: inline-block;",
                children: f
            });
            return ut(p, "isChar", !0), l = [].concat(X(l), [p]), p
        })), e.words || e.lines ? (d = Xe(i, {
            class: "".concat(t.wordClass, " ").concat(t.splitClass),
            style: "display: inline-block; ".concat(e.words && t.absolute ? "position: relative;" : ""),
            children: e.chars ? v : c
        }), ut(d, {
            isWord: !0,
            isWordStart: !0,
            isWordEnd: !0
        }), s.appendChild(d)) : v.forEach(function(f) {
            s.appendChild(f)
        }), u < h.length - 1 && s.append(" "), e.words ? a.concat(d) : a
    }, []), /\s$/.test(r) && s.append(" "), n.replaceWith(s), {
        words: o,
        chars: l
    }
}

function Lr(n, t) {
    var e = n.nodeType,
        i = {
            words: [],
            chars: []
        };
    if (!/(1|3|11)/.test(e)) return i;
    if (e === 3 && /\S/.test(n.nodeValue)) return jl(n, t);
    var r = Mt(n.childNodes);
    if (r.length && (ut(n, "isSplit", !0), !Ot(n).isRoot)) {
        n.style.display = "inline-block", n.style.position = "relative";
        var s = n.nextSibling,
            o = n.previousSibling,
            l = n.textContent || "",
            a = s ? s.textContent : " ",
            c = o ? o.textContent : " ";
        ut(n, {
            isWordEnd: /\s$/.test(l) || /^\s/.test(a),
            isWordStart: /^\s/.test(l) || /\s$/.test(c)
        })
    }
    return r.reduce(function(u, h) {
        var d = Lr(h, t),
            v = d.words,
            f = d.chars;
        return {
            words: [].concat(X(u.words), X(v)),
            chars: [].concat(X(u.chars), X(f))
        }
    }, i)
}

function zl(n, t, e, i) {
    if (!e.absolute) return {
        top: t ? n.offsetTop : null
    };
    var r = n.offsetParent,
        s = pr(i, 2),
        o = s[0],
        l = s[1],
        a = 0,
        c = 0;
    if (r && r !== document.body) {
        var u = r.getBoundingClientRect();
        a = u.x + o, c = u.y + l
    }
    var h = n.getBoundingClientRect(),
        d = h.width,
        v = h.height,
        f = h.x,
        p = h.y,
        b = p + l - c,
        m = f + o - a;
    return {
        width: d,
        height: v,
        top: b,
        left: m
    }
}

function Ir(n) {
    Ot(n).isWord ? (gr(n), n.replaceWith.apply(n, X(n.childNodes))) : Mt(n.children).forEach(function(t) {
        return Ir(t)
    })
}
var Nl = function() {
    return document.createDocumentFragment()
};

function Hl(n, t, e) {
    var i = Tn(t.types),
        r = t.tagName,
        s = n.getElementsByTagName("*"),
        o = [],
        l = [],
        a = null,
        c, u, h, d = [],
        v = n.parentElement,
        f = n.nextElementSibling,
        p = Nl(),
        b = window.getComputedStyle(n),
        m = b.textAlign,
        y = parseFloat(b.fontSize),
        g = y * .2;
    return t.absolute && (h = {
        left: n.offsetLeft,
        top: n.offsetTop,
        width: n.offsetWidth
    }, u = n.offsetWidth, c = n.offsetHeight, ut(n, {
        cssWidth: n.style.width,
        cssHeight: n.style.height
    })), Mt(s).forEach(function(w) {
        var x = w.parentElement === n,
            S = zl(w, x, t, e),
            E = S.width,
            T = S.height,
            A = S.top,
            C = S.left;
        /^br$/i.test(w.nodeName) || (i.lines && x && ((a === null || A - a >= g) && (a = A, o.push(l = [])), l.push(w)), t.absolute && ut(w, {
            top: A,
            left: C,
            width: E,
            height: T
        }))
    }), v && v.removeChild(n), i.lines && (d = o.map(function(w) {
        var x = Xe(r, {
            class: "".concat(t.splitClass, " ").concat(t.lineClass),
            style: "display: block; text-align: ".concat(m, "; width: 100%;")
        });
        ut(x, "isLine", !0);
        var S = {
            height: 0,
            top: 1e4
        };
        return p.appendChild(x), w.forEach(function(E, T, A) {
            var C = Ot(E),
                L = C.isWordEnd,
                I = C.top,
                P = C.height,
                _ = A[T + 1];
            S.height = Math.max(S.height, P), S.top = Math.min(S.top, I), x.appendChild(E), L && Ot(_).isWordStart && x.append(" ")
        }), t.absolute && ut(x, {
            height: S.height,
            top: S.top
        }), x
    }), i.words || Ir(p), n.replaceChildren(p)), t.absolute && (n.style.width = "".concat(n.style.width || u, "px"), n.style.height = "".concat(c, "px"), Mt(s).forEach(function(w) {
        var x = Ot(w),
            S = x.isLine,
            E = x.top,
            T = x.left,
            A = x.width,
            C = x.height,
            L = Ot(w.parentElement),
            I = !S && L.isLine;
        w.style.top = "".concat(I ? E - L.top : E, "px"), w.style.left = S ? "".concat(h.left, "px") : "".concat(T - (I ? h.left : 0), "px"), w.style.height = "".concat(C, "px"), w.style.width = S ? "".concat(h.width, "px") : "".concat(A, "px"), w.style.position = "absolute"
    })), v && (f ? v.insertBefore(n, f) : v.appendChild(n)), d
}
var qt = kt(Ln, {}),
    Vl = function() {
        si(n, null, [{
            key: "clearData",
            value: function() {
                Cl()
            }
        }, {
            key: "setDefaults",
            value: function(e) {
                return qt = kt(qt, ue(e)), Ln
            }
        }, {
            key: "revert",
            value: function(e) {
                li(e).forEach(function(i) {
                    var r = Ot(i),
                        s = r.isSplit,
                        o = r.html,
                        l = r.cssWidth,
                        a = r.cssHeight;
                    s && (i.innerHTML = o, i.style.width = l || "", i.style.height = a || "", gr(i))
                })
            }
        }, {
            key: "create",
            value: function(e, i) {
                return new n(e, i)
            }
        }, {
            key: "data",
            get: function() {
                return rt
            }
        }, {
            key: "defaults",
            get: function() {
                return qt
            },
            set: function(e) {
                qt = kt(qt, ue(e))
            }
        }]);

        function n(t, e) {
            ul(this, n), this.isSplit = !1, this.settings = kt(qt, ue(e)), this.elements = li(t), this.split()
        }
        return si(n, [{
            key: "split",
            value: function(e) {
                var i = this;
                this.revert(), this.elements.forEach(function(o) {
                    ut(o, "html", o.innerHTML)
                }), this.lines = [], this.words = [], this.chars = [];
                var r = [window.pageXOffset, window.pageYOffset];
                e !== void 0 && (this.settings = kt(this.settings, ue(e)));
                var s = Tn(this.settings.types);
                s.none || (this.elements.forEach(function(o) {
                    ut(o, "isRoot", !0);
                    var l = Lr(o, i.settings),
                        a = l.words,
                        c = l.chars;
                    i.words = [].concat(X(i.words), X(a)), i.chars = [].concat(X(i.chars), X(c))
                }), this.elements.forEach(function(o) {
                    if (s.lines || i.settings.absolute) {
                        var l = Hl(o, i.settings, r);
                        i.lines = [].concat(X(i.lines), X(l))
                    }
                }), this.isSplit = !0, window.scrollTo(r[0], r[1]), xl())
            }
        }, {
            key: "revert",
            value: function() {
                this.isSplit && (this.lines = null, this.words = null, this.chars = null, this.isSplit = !1), n.revert(this.elements)
            }
        }]), n
    }();
class Bl extends D {
    constructor(t) {
        super(t), this.events = {}, this.el.getAttribute("data-hero") !== null ? setTimeout(() => {
            this.el.classList.add("-isReady")
        }, document.body.classList.contains("-onceAnimate") ? 0 : 2e3) : this.el.classList.add("-isReady"), new Vl(this.el.querySelectorAll('[data-title="title"]'), {
            types: "lines",
            tagName: "span"
        });
        const i = this.el.querySelectorAll('[data-title="title"] .line');
        i.length > 0 && i.forEach((r, s) => {
            r.style.setProperty("--delay", `${.2*(s+1)}s`)
        })
    }
}
class Ul extends D {
    constructor(t) {
        super(t), this.events = {}, this.el.getAttribute("data-hero") !== null ? setTimeout(() => {
            this.el.classList.add("-isReady")
        }, document.body.classList.contains("-onceAnimate") ? 0 : 2e3) : this.el.classList.add("-isReady");
        const i = this.el.querySelectorAll('[data-steps="step"]');
        i.length > 0 && i.forEach((r, s) => {
            r.style.setProperty("--delay", `${.2*(s+1)}s`)
        })
    }
}
class Wl extends Cn {
    constructor(t) {
        super(t), this.step = 0, this.events = {
            click: {
                submit: "onSearch",
                next: "onNext",
                choice: "onChoice",
                close: "onClose"
            }
        }
    }
    init() {
        let t = new URL(window.location),
            e = new URLSearchParams(t.search);
        e.has("choix") && document.querySelector(`[data-url="${e.get("choix")}"]`).click()
    }
    onNext(t) {
        t.preventDefault();
        const e = Number(t.target.dataset.index),
            i = this.$("step"),
            r = i[e],
            s = this.validateStep(r);
        if (s.length > 0) {
            this.setStepErrors(r, s);
            return
        }
        this.cleanStepErrors(r);
        const o = document.querySelector('[name="option"]').value;
        let l = i[e + 1];
        e === 1 && (o === "3" || o === "4") && (l = i[e + 2]), this.call("close", null, "Accordeon", r.dataset.moduleAccordeon), l && this.call("open", null, "Accordeon", l.dataset.moduleAccordeon), window.requestAnimationFrame(() => {
            r.classList.add("-edit"), l && window.requestAnimationFrame(() => {
                this.el.parentNode.scrollTo({
                    top: l.offsetTop,
                    behavior: "smooth"
                })
            })
        })
    }
    onChoice(t) {
        t.preventDefault(), this.updateURL(t.target.dataset.url);
        const e = document.querySelector('[data-module-accordeon="accordeonContactStep1"]');
        this.call("open", null, "Popin", this.el.dataset.moduleFormSteps), e.classList.contains("-isInvisible") && e.classList.remove("-isInvisible"), document.querySelector('[name="option"]').value = t.target.dataset.index, this.$("card")[0].querySelector("[data-title]").innerHTML = t.target.dataset.title, this.$("card")[0].querySelector("[data-subtitle]").innerHTML = t.target.dataset.subtitle, this.$("card")[0].querySelector("[data-src]").setAttribute("src", t.target.dataset.img), this.el.querySelectorAll("[data-name]").forEach(s => {
            s.classList.add("-disabled"), s.querySelector(".a-inputField__input").removeAttribute("required")
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
        t.target.dataset.index == 3 || t.target.dataset.index == 4 ? (document.querySelector('[data-module-accordeon="accordeonContactStep3"]').removeAttribute("data-inputs"), document.querySelector('[data-module-accordeon="accordeonContactStep3"]').classList.add("-isInvisible")) : (document.querySelector('[data-module-accordeon="accordeonContactStep3"]').setAttribute("data-inputs", "day[],hours[]"), document.querySelector('[data-module-accordeon="accordeonContactStep3"].-isInvisible') && document.querySelector('[data-module-accordeon="accordeonContactStep3"].-isInvisible').classList.remove("-isInvisible")), t.target.dataset.index == 3 ? (document.querySelector('[data-module-accordeon="accordeonContactStep2"]').setAttribute("data-inputs", "firstname,lastname,email,phone"), i.forEach(s => {
            document.querySelector(s.labelSelector).innerText = s.labelText, document.querySelector(s.inputSelector).removeAttribute("required")
        }), document.querySelector('[aria-controls="accordeon-accordeonContactStep4"] [data-accordeon="step"]').innerText = "03") : (document.querySelector('[data-module-accordeon="accordeonContactStep2"]').setAttribute("data-inputs", "firstname,lastname,email,phone,address,zip,city"), i.forEach(s => {
            document.querySelector(s.labelSelector).innerText = s.labelTextRequired, document.querySelector(s.inputSelector).setAttribute("required", !0)
        }), document.querySelector('[aria-controls="accordeon-accordeonContactStep4"] [data-accordeon="step"]').innerText = "04");
        const r = t.target.dataset.inputs ? t.target.dataset.inputs.split(",") : this.onJump(1);
        if (t.target.dataset.inputs) {
            e.querySelector('[aria-controls="accordeon-accordeonContactStep1"] [data-accordeon="title"]').innerText = t.target.dataset.titleStep, document.querySelector('[aria-controls="accordeon-accordeonContactStep2"] [data-accordeon="step"]').innerText = "02", document.querySelector('[aria-controls="accordeon-accordeonContactStep4"] [data-accordeon="title"]').innerText = "Votre projet", document.querySelector('[for="message"] span').innerText = "Votre message (optionnel)", document.querySelector("#message").removeAttribute("required");
            for (let s = r.length - 1; s >= 0; s -= 1) {
                const o = r[s];
                this.el.querySelector(`[name="${o}"]`).setAttribute("required", !0), this.el.querySelector(`[data-name="${o}"]`).classList.remove("-disabled")
            }
            e.setAttribute("data-inputs", t.target.dataset.inputs), this.call("open", null, "Accordeon", "accordeonContactStep1")
        }
    }
    onJump(t) {
        document.querySelector('[data-module-accordeon="accordeonContactStep1"]').classList.add("-isInvisible"), document.querySelector('[aria-controls="accordeon-accordeonContactStep2"] [data-accordeon="step"]').innerText = "01", document.querySelector('[aria-controls="accordeon-accordeonContactStep4"] [data-accordeon="step"]').innerText = "02", document.querySelector('[aria-controls="accordeon-accordeonContactStep4"] [data-accordeon="title"]').innerText = "Votre question", document.querySelector('[for="message"] span').innerText = "Votre message", document.querySelector("#message").setAttribute("required", !0), this.call("open", null, "Accordeon", "accordeonContactStep" + (t + 1))
    }
    onClose(t) {
        this.$("step").forEach(r => {
            this.call("close", null, "Accordeon", r.dataset.moduleAccordeon)
        });
        let i = new URL(window.location);
        i.searchParams.delete("choix"), window.history.pushState({}, "", i)
    }
    updateURL(t) {
        let e = new URL(window.location);
        e.searchParams.set("choix", t), window.history.pushState({}, "", e)
    }
    validateStep(t) {
        const e = new FormData(this.el),
            i = t.dataset.inputs ? t.dataset.inputs.split(",") : [],
            r = [];
        for (let s = i.length - 1; s >= 0; s -= 1) {
            const o = i[s];
            e.get(o) || r.push(o)
        }
        return r
    }
    getUniqueInputs(t) {
        const e = Array.from(t),
            i = [],
            r = [];
        return e.forEach(s => {
            i.includes(s.name) || (r.push(s), i.push(s.name))
        }), r
    }
    setStepErrors(t = null, e = []) {
        const i = t.querySelectorAll('input:not([type="hidden"]), textarea, select');
        this.getUniqueInputs(i).forEach(o => {
            o.closest(".a-inputField").classList.toggle("-error", e.includes(o.name))
        });
        const s = t.querySelector("[data-module-multiselect]");
        if (s) {
            let o = !1;
            for (const l of s.querySelectorAll("input"))
                if (l.checked) {
                    o = !0;
                    break
                } o || s.classList.add("-error")
        }
    }
    cleanStepErrors(t = null) {
        const e = t.querySelectorAll('input:not([type="hidden"]), textarea, select');
        this.getUniqueInputs(e).forEach(s => {
            s.closest(".a-inputField").classList.remove("-error")
        });
        const r = t.querySelector("[data-module-multiselect]");
        if (r) {
            let s = !1;
            for (const o of r.querySelectorAll("input"))
                if (o.checked) {
                    s = !0;
                    break
                } s && r.classList.remove("-error")
        }
    }
    cleanErrors() {
        this.cleanStepErrors(this.el)
    }
    setErrors(t) {
        this.setStepErrors(this.el, Object.keys(t))
    }
    setCallback(t, e) {
        const i = this.$("message")[0];
        i.innerHTML = `
      <p class="tx-m">${t}</p>
    `, document.querySelector("main").classList.add("-formValidate"), e ? (this.resetInput(), i.classList.add("-success")) : i.classList.add("-error"), window.scrollTo(0, 0), this.call("close", null, "Popin", this.el.dataset.moduleFormSteps), this.call("update", null, "Scroll", "scroll")
    }
}
class Gl extends D {
    constructor(t) {
        super(t), this.events = {
            click: {
                toggle: "toggle"
            }
        }
    }
    active(t) {
        this.el.classList.toggle("-isNotExist", !t)
    }
    toggle(t) {
        t.preventDefault(), this.change(!this.state)
    }
    change(t) {
        if (this.state === t) return;
        this.state = t;
        let e = 0;
        window.cancelAnimationFrame(this.raf);
        const [i] = this.$("content");
        t && (e = i.scrollHeight), this.raf = window.requestAnimationFrame(() => {
            e && this.el.style.setProperty("--height", `${i.scrollHeight}px`), this.el.classList.toggle("-isActive", this.state)
        })
    }
    toggleWidgetVisibility(t) {
        this.visibilityState !== t && (this.visibilityState = t, this.el.classList.toggle("-isVisible", t))
    }
}
let Kl = class extends D {
    constructor(t) {
        super(t), this.events = {}, this.inputField = this.el.querySelector("input"), this.suggestionsContainer = null, this.inputField.addEventListener("input", this.onInput.bind(this)), document.addEventListener("click", this.onClickOutside.bind(this))
    }
    async fetchCities(t) {
        return await (await fetch(`https://geo.api.gouv.fr/communes?nom=${t}&fields=nom&limit=10`)).json()
    }
    createSuggestionsContainer() {
        this.suggestionsContainer = document.createElement("div"), this.suggestionsContainer.classList.add("a-inputField__suggestions"), this.el.appendChild(this.suggestionsContainer)
    }
    displaySuggestions(t) {
        this.suggestionsContainer || this.createSuggestionsContainer(), this.suggestionsContainer.innerHTML = "";
        const e = document.createElement("ul");
        t.forEach(i => {
            const r = document.createElement("li");
            r.textContent = i.nom, r.addEventListener("click", () => {
                this.inputField.value = i.nom, this.clearSuggestions()
            }), e.appendChild(r)
        }), this.suggestionsContainer.appendChild(e)
    }
    async onInput() {
        const t = this.inputField.value;
        if (t.length >= 2) {
            const e = await this.fetchCities(t);
            this.displaySuggestions(e)
        } else this.clearSuggestions()
    }
    clearSuggestions() {
        this.suggestionsContainer && (this.suggestionsContainer.remove(), this.suggestionsContainer = null)
    }
    onClickOutside(t) {
        this.suggestionsContainer && !this.inputField.contains(t.target) && !this.suggestionsContainer.contains(t.target) && this.clearSuggestions()
    }
};
class Yl extends D {
    constructor(t) {
        super(t), this.events = {
            click: {
                box: "onShow"
            }
        }, this.multiSelectBox = this.$("box")[0], this.checkboxList = this.$("list")[0];
        const e = this.checkboxList.querySelectorAll('input[type="checkbox"]');
        e.forEach(i => {
            i.addEventListener("change", () => {
                this.updateSelectedValues(e)
            })
        }), document.addEventListener("click", i => {
            !this.multiSelectBox.contains(i.target) && !this.checkboxList.contains(i.target) && (this.checkboxList.style.display = "none")
        })
    }
    onShow() {
        this.checkboxList.style.display = this.checkboxList.style.display === "grid" ? "none" : "grid"
    }
    updateSelectedValues(t) {
        this.multiSelectBox.innerHTML = "";
        let e = 0;
        t.forEach(r => {
            if (r.checked) {
                const s = document.createElement("div");
                s.classList.add("a-tag", "-small", "tx-ps", "-tx600", "-bgprimary", "-clrcream");
                const o = document.querySelector(`label[for="${r.id}"]`);
                s.textContent = o ? o.textContent : r.value;
                const l = document.createElement("span");
                l.classList.add("a-tag__remove"), l.textContent = "x", l.addEventListener("click", () => {
                    r.checked = !1, this.updateSelectedValues(t)
                }), s.appendChild(l), this.multiSelectBox.appendChild(s), e++
            }
        }), e === 0 && (this.multiSelectBox.textContent = "Sélectionner une option");
        const i = document.querySelector('[data-module-accordeon="accordeonContactStep1"]');
        if (i) {
            const r = i.querySelector('[data-accordeon="content"]');
            i.style.setProperty("--height", `${r.scrollHeight}px`)
        }
    }
}
class Xl extends D {
    constructor(t) {
        super(t), this.events = {
            input: {
                input: "onChange"
            }
        }
    }
    onChange(t) {
        const [e] = this.$("input"), [i] = this.$("value"), [r] = this.$("min"), [s] = this.$("max");
        i.textContent = this.formatCurrency(e.value);
        const o = (e.value - e.min) / (e.max - e.min) * 100,
            a = 20 / 2 - o * .3;
        i.style.left = `calc(${o}% + (${a}px))`
    }
    formatCurrency(t) {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0
        }).format(t)
    }
}
class Jl extends D {
    constructor(t) {
        super(t), this.events = {
            click: {
                avatar: "toggle",
                close: "toggle"
            }
        }, this.handleOutsideClick = this.handleOutsideClick.bind(this)
    }
    toggle(t) {
        Bi && (t.stopPropagation(), t.preventDefault(), this.change(!this.state))
    }
    change(t) {
        this.state !== t && (this.state = t, this.el.classList.toggle("-isVisible", this.state), this.state ? document.addEventListener("click", this.handleOutsideClick) : document.removeEventListener("click", this.handleOutsideClick))
    }
    handleOutsideClick(t) {
        this.el.contains(t.target) || this.change(!1)
    }
}
class Ql extends D {
    constructor(t) {
        super(t), this.events = {
            click: {
                button: "onChange"
            }
        }
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
        }).then(async r => {
            console.log(r);
            const s = await r.json(),
                o = document.querySelector('[data-pagination="content"]');
            o.innerHTML = s.itemsHtml;
            const l = document.querySelector('[data-pagination="pagination"]');
            this.call("destroy", l, "app"), l.innerHTML = s.pagination, this.call("update", l, "app");
            const a = {
                target: o,
                options: {
                    offset: -200
                }
            };
            this.call("scrollTo", a, "Scroll", "scroll")
        }).catch(r => {
            console.log(r)
        })
    }
}
let Zl = class extends D {
    constructor(t) {
        super(t), this.events = {
            click: "onCopy"
        }
    }
    onCopy(t) {
        t.stopPropagation(), t.preventDefault();
        const e = t.target.dataset.url;
        navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(e).then(() => {
            this.success()
        }).catch(i => {
            console.error("Erreur lors de la copie :", i)
        }) : this.fallbackCopyTextToClipboard(e)
    }
    fallbackCopyTextToClipboard(t) {
        const e = document.createElement("textarea");
        e.value = t, e.style.position = "fixed", document.body.appendChild(e), e.focus(), e.select();
        try {
            document.execCommand("copy") ? this.success() : console.error("Erreur lors de la copie de secours")
        } catch (i) {
            console.error("Erreur lors de la copie de secours :", i)
        }
        document.body.removeChild(e)
    }
    success() {
        this.timeoutId && clearTimeout(this.timeoutId);
        const t = document.createElement("span");
        t.setAttribute("class", "a-copy__success | tx-ps"), t.innerHTML = "Lien copié !", this.el.insertAdjacentElement("beforeend", t), this.timeoutId = setTimeout(() => {
            t.remove()
        }, 3e3)
    }
};
class tc extends D {
    constructor(t) {
        super(t), this.events = {}, this.isMobile = window.innerWidth <= 1024, this.isMobile ? (this.container = this.$("infoMobile")[0], this.content = this.$("contentMobile")[0], this.height = this.content.scrollHeight + 2) : (this.container = this.$("info")[0], this.content = this.$("content")[0], this.height = this.content.scrollHeight + 2 + 30)
    }
    onScrollProgress() {
        const e = this.el.getBoundingClientRect(),
            i = window.innerHeight;
        (this.isMobile ? e.top < 10 && e.bottom > i : e.top < 0) ? (this.container.classList.add("-isVisible"), this.container.style.setProperty("--height", `${this.height}px`)) : (this.container.classList.remove("-isVisible"), this.container.style.setProperty("--height", "0px"))
    }
}
class ec extends D {
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
        }
    }
    onKeydown(t) {
        const e = this.el.getAttribute("name"),
            i = this.config[e];
        i && (!this.isDigit(t.key) && !this.isControlKey(t) && t.preventDefault(), this.checkMaxLength(t, i.maxLength))
    }
    checkMaxLength(t, e) {
        t.target.value.length > e && !this.isControlKey(t) && t.preventDefault()
    }
    isDigit(t) {
        return /^[0-9]$/.test(t)
    }
    isControlKey(t) {
        return ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(t.key)
    }
}
class nc extends Cn {
    afterSuccess(t) {
        t.sent && (this.call("clearCache", null, "Website", "website"), setTimeout(() => {
            const i = new URLSearchParams(window.location.search).get("redirect");
            i && Y.go(i)
        }, 4500))
    }
}
class ic extends D {
    constructor(t) {
        super(t), this.events = {
            click: "onClick",
            change: {
                region: "onChangeRegion",
                department: "onChangeDepartment"
            },
            submit: "onSubmit"
        }
    }
    init() {
        try {
            this.regions = JSON.parse(this.el.dataset.regions || "[]")
        } catch (t) {
            this.regions = [], console.warn("Error parsing regions data:", t)
        }
    }
    onChangeRegion(t) {
        const [e] = this.$("department"), i = e.querySelectorAll("option"), r = this.regions.find(s => s.id === t.target.value);
        if (!r) {
            e.value = "", i.forEach(s => {
                s.style.display = "block"
            });
            return
        }
        i.forEach(s => {
            if (s.value === "") {
                s.style.display = "block";
                return
            }
            s.style.display = r.departments.includes(Number(s.value)) ? "block" : "none"
        }), r.departments.includes(Number(e.value)) || (e.value = "")
    }
    onChangeDepartment(t) {
        const e = Number(t.target.value),
            i = this.regions.find(s => s.departments.includes(e)),
            [r] = this.$("region");
        if (r.querySelectorAll("option"), !i) {
            r.value = "", this.onChangeRegion({
                target: r
            });
            return
        }
        r.value = i.id, this.onChangeRegion({
            target: r
        })
    }
    onClick(t) {
        const {
            target: e
        } = t, {
            action: i
        } = e.dataset;
        i && this[i] && this[i](t)
    }
    onSubmit(t) {
        t.preventDefault();
        const e = new URLSearchParams(new FormData(t.target)).toString();
        Y.go(this.el.action + "?" + e)
    }
    submitWithoutSearch(t) {
        t.preventDefault(), Y.go(this.el.action)
    }
}
const rc = Object.freeze(Object.defineProperty({
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
    const n = () => {
            const e = new Gr({
                modules: rc
            });
            e.init(e)
        },
        t = document.getElementById("main-css");
    if (!t) {
        console.warn('The "main-css" stylesheet not found');
        return
    }
    t.isLoaded ? n() : t.addEventListener("load", n)
});