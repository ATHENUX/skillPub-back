(this["webpackJsonpfront-app"] = this["webpackJsonpfront-app"] || []).push([
  [0],
  {
    71: function (e) {
      e.exports = JSON.parse('{"home":"Home","a-test-username":"A test user name"}');
    },
    72: function (e) {
      e.exports = JSON.parse('{"home":"Casa","a-test-username":"Un nombre de usuario de prueba"}');
    },
    80: function (e, t, a) {
      e.exports = a(98);
    },
    85: function (e, t, a) {},
    98: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        o = a(6),
        i = a.n(o),
        c = (a(85), a(43)),
        l = a(34),
        s = { name: "", lastName: "", firstName: "" },
        u = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
            t = arguments.length > 1 ? arguments[1] : void 0,
            a = t.type,
            n = t.payload;
          switch (a) {
            case "getUserData":
              return n;
            default:
              return e;
          }
        },
        m = Object(l.b)({ User: u }),
        p = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        f = Object(l.c)(m, p),
        d = a(68),
        E = a(9),
        h = a(131),
        g = a(73),
        b = Object(g.a)({ palette: { primary: { light: "#bbdefb", main: "#90caf9", dark: "#1976d2", contrastText: "#ffffff" } } }),
        v = a(48),
        O = a.n(v),
        w = a(60),
        x = a(44),
        N = function (e) {
          var t = e.title,
            a = e.description;
          Object(n.useEffect)(
            function () {
              document.title = "Social network | ".concat(t);
            },
            [t]
          ),
            Object(n.useEffect)(
              function () {
                var e = document.querySelector('meta[name="description"]');
                null === e || void 0 === e || e.setAttribute("content", a);
              },
              [a]
            );
        },
        j = a(124),
        k = a(126),
        S = a(127),
        y = a(136),
        _ = a(65),
        D = a.n(_),
        U = a(64),
        C = a.n(U),
        B = a(123),
        T = a(135),
        A = Object(B.a)({
          btn: {
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            border: 0,
            borderRadius: 3,
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "white",
            height: 48,
            padding: "0 30px",
            margin: function (e) {
              return e.hide ? "2em" : 0;
            },
          },
        }),
        z = Object(B.a)(function (e) {
          return Object(T.a)({ root: { flexGrow: 1 }, menuButton: { marginRight: e.spacing(2) }, title: { flexGrow: 1 }, offset: e.mixins.toolbar });
        }),
        F = a(134),
        I = {
          getUserData: function (e) {
            return { type: "getUserData", payload: e };
          },
        },
        J = Object(c.b)(function (e) {
          return { user: e.User };
        }, I)(
          Object(y.a)()(function (e) {
            var t = e.getUserData,
              a = e.user,
              o = e.width,
              i = Object(F.a)(),
              c = i.t,
              l = i.i18n,
              s = Object(n.useState)(!0),
              u = Object(x.a)(s, 2),
              m = u[0],
              p = u[1],
              f = A({ hide: m });
            N({ title: "Home", description: "home information" });
            var d = (function () {
              var e = Object(w.a)(
                O.a.mark(function e() {
                  var a;
                  return O.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          (a = { name: c("A-test-username"), lastName: "A test last name", firstName: "A test first name" }), t(a);
                        case 2:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })();
            return r.a.createElement(
              j.a,
              { maxWidth: o },
              r.a.createElement("h1", null, c("home"), " ", r.a.createElement(C.a, null)),
              r.a.createElement("p", null, "Screen size ", r.a.createElement("strong", null, o), " "),
              r.a.createElement(k.a, { variant: "h1" }, " hello world"),
              r.a.createElement(S.a, { size: "small", onClick: d, startIcon: r.a.createElement(D.a, null), className: f.btn }, "get user"),
              r.a.createElement(
                S.a,
                {
                  variant: "contained",
                  color: "primary",
                  onClick: function () {
                    return p(!m);
                  },
                },
                "margin change"
              ),
              r.a.createElement(
                S.a,
                {
                  variant: "contained",
                  color: "secondary",
                  onClick: function () {
                    l.changeLanguage("es");
                  },
                },
                "on change languaje"
              ),
              a.name && r.a.createElement("ul", null, r.a.createElement("li", null, a.name), r.a.createElement("li", null, a.lastName), r.a.createElement("li", null, a.firstName)),
              r.a.createElement(k.a, { variant: "h1" }, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem mollitia saepe vitae consequuntur cupiditate totam, officiis minima odit fugit expedita reiciendis, temporibus ex aperiam assumenda quam suscipit molestias? Sint, earum. --------------------------------------------------------------------------------------------------------")
            );
          })
        ),
        L = a(128),
        R = a(129),
        X = a(130),
        q = a(132),
        M = a(133),
        V = a(66),
        W = a.n(V),
        G = a(67),
        H = a.n(G);
      function P() {
        var e = z(),
          t = r.a.useState(null),
          a = Object(x.a)(t, 2),
          n = a[0],
          o = a[1],
          i = Boolean(n),
          c = function () {
            o(null);
          };
        return r.a.createElement(
          "div",
          { className: e.root },
          r.a.createElement(
            L.a,
            { position: "fixed" },
            r.a.createElement(
              R.a,
              null,
              r.a.createElement(X.a, { edge: "start", className: e.menuButton, color: "inherit", "aria-label": "menu" }, r.a.createElement(W.a, null)),
              r.a.createElement(k.a, { variant: "h6", className: e.title }, "Front app"),
              r.a.createElement(
                "div",
                null,
                r.a.createElement(
                  X.a,
                  {
                    "aria-label": "account of current user",
                    "aria-controls": "menu-appbar",
                    "aria-haspopup": "true",
                    onClick: function (e) {
                      o(e.currentTarget);
                    },
                    color: "inherit",
                  },
                  r.a.createElement(H.a, null)
                ),
                r.a.createElement(q.a, { id: "menu-appbar", anchorEl: n, anchorOrigin: { vertical: "top", horizontal: "right" }, keepMounted: !0, transformOrigin: { vertical: "top", horizontal: "right" }, open: i, onClose: c }, r.a.createElement(M.a, { onClick: c }, "Profile"), r.a.createElement(M.a, { onClick: c }, "My account"))
              )
            )
          ),
          r.a.createElement("div", { className: e.offset })
        );
      }
      function $() {
        return r.a.createElement(d.a, null, r.a.createElement(h.a, { theme: b }, r.a.createElement(c.a, { store: f }, r.a.createElement(P, null), r.a.createElement(E.c, null, r.a.createElement(E.a, { path: "/", component: J })))));
      }
      Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
      var K = a(51),
        Q = a(36),
        Y = a(69),
        Z = a(70),
        ee = { en: { translation: a(71) }, es: { translation: a(72) } };
      K.a
        .use(Y.a)
        .use(Z.a)
        .use(Q.e)
        .init({ resources: ee, lng: "en", keySeparator: !1, interpolation: { escapeValue: !1 } });
      K.a;
      i.a.render(r.a.createElement(r.a.StrictMode, null, r.a.createElement($, null)), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready
            .then(function (e) {
              e.unregister();
            })
            .catch(function (e) {
              console.error(e.message);
            });
    },
  },
  [[80, 1, 2]],
]);
//# sourceMappingURL=main.07ac485a.chunk.js.map
