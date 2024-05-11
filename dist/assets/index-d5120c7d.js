var eg = Object.defineProperty
var tg = (e, t, i) =>
  t in e ? eg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)
var Sn = (e, t, i) => (tg(e, typeof t != 'symbol' ? t + '' : t, i), i)
;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) o(s)
  new MutationObserver((s) => {
    for (const a of s)
      if (a.type === 'childList')
        for (const c of a.addedNodes) c.tagName === 'LINK' && c.rel === 'modulepreload' && o(c)
  }).observe(document, { childList: !0, subtree: !0 })
  function i(s) {
    const a = {}
    return (
      s.integrity && (a.integrity = s.integrity),
      s.referrerPolicy && (a.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (a.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (a.credentials = 'omit')
          : (a.credentials = 'same-origin'),
      a
    )
  }
  function o(s) {
    if (s.ep) return
    s.ep = !0
    const a = i(s)
    fetch(s.href, a)
  }
})()
function ce() {}
function cn(e, t) {
  for (const i in t) e[i] = t[i]
  return e
}
function jh(e) {
  return e()
}
function au() {
  return Object.create(null)
}
function yt(e) {
  e.forEach(jh)
}
function li(e) {
  return typeof e == 'function'
}
function ge(e, t) {
  return e != e ? t == t : e !== t || (e && typeof e == 'object') || typeof e == 'function'
}
function ng(e) {
  return Object.keys(e).length === 0
}
function wa(e, ...t) {
  if (e == null) {
    for (const o of t) o(void 0)
    return ce
  }
  const i = e.subscribe(...t)
  return i.unsubscribe ? () => i.unsubscribe() : i
}
function je(e) {
  let t
  return wa(e, (i) => (t = i))(), t
}
function ae(e, t, i) {
  e.$$.on_destroy.push(wa(t, i))
}
function ti(e, t, i, o) {
  if (e) {
    const s = qh(e, t, i, o)
    return e[0](s)
  }
}
function qh(e, t, i, o) {
  return e[1] && o ? cn(i.ctx.slice(), e[1](o(t))) : i.ctx
}
function ni(e, t, i, o) {
  if (e[2] && o) {
    const s = e[2](o(i))
    if (t.dirty === void 0) return s
    if (typeof s == 'object') {
      const a = [],
        c = Math.max(t.dirty.length, s.length)
      for (let h = 0; h < c; h += 1) a[h] = t.dirty[h] | s[h]
      return a
    }
    return t.dirty | s
  }
  return t.dirty
}
function ii(e, t, i, o, s, a) {
  if (s) {
    const c = qh(t, i, o, a)
    e.p(c, s)
  }
}
function oi(e) {
  if (e.ctx.length > 32) {
    const t = [],
      i = e.ctx.length / 32
    for (let o = 0; o < i; o++) t[o] = -1
    return t
  }
  return -1
}
function ks(e) {
  const t = {}
  for (const i in e) i[0] !== '$' && (t[i] = e[i])
  return t
}
function $s(e, t) {
  const i = {}
  t = new Set(t)
  for (const o in e) !t.has(o) && o[0] !== '$' && (i[o] = e[o])
  return i
}
const ig = ['', !0, 1, 'true', 'contenteditable']
function u(e, t) {
  e.appendChild(t)
}
function M(e, t, i) {
  e.insertBefore(t, i || null)
}
function A(e) {
  e.parentNode && e.parentNode.removeChild(e)
}
function $n(e, t) {
  for (let i = 0; i < e.length; i += 1) e[i] && e[i].d(t)
}
function m(e) {
  return document.createElement(e)
}
function Ln(e) {
  return document.createElementNS('http://www.w3.org/2000/svg', e)
}
function T(e) {
  return document.createTextNode(e)
}
function E() {
  return T(' ')
}
function Tt() {
  return T('')
}
function Ee(e, t, i, o) {
  return e.addEventListener(t, i, o), () => e.removeEventListener(t, i, o)
}
function Eo(e) {
  return function (t) {
    return t.preventDefault(), e.call(this, t)
  }
}
function y(e, t, i) {
  i == null ? e.removeAttribute(t) : e.getAttribute(t) !== i && e.setAttribute(t, i)
}
const og = ['width', 'height']
function Ni(e, t) {
  const i = Object.getOwnPropertyDescriptors(e.__proto__)
  for (const o in t)
    t[o] == null
      ? e.removeAttribute(o)
      : o === 'style'
        ? (e.style.cssText = t[o])
        : o === '__value'
          ? (e.value = e[o] = t[o])
          : i[o] && i[o].set && og.indexOf(o) === -1
            ? (e[o] = t[o])
            : y(e, o, t[o])
}
function sg(e) {
  return Array.from(e.childNodes)
}
function O(e, t) {
  ;(t = '' + t), e.data !== t && (e.data = t)
}
function rg(e, t) {
  ;(t = '' + t), e.wholeText !== t && (e.data = t)
}
function ag(e, t, i) {
  ~ig.indexOf(i) ? rg(e, t) : O(e, t)
}
function en(e, t) {
  e.value = t == null ? '' : t
}
function Bt(e, t, i, o) {
  i == null ? e.style.removeProperty(t) : e.style.setProperty(t, i, o ? 'important' : '')
}
function lg(e, t, { bubbles: i = !1, cancelable: o = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: i, cancelable: o })
}
class Xr {
  constructor(t = !1) {
    Sn(this, 'is_svg', !1)
    Sn(this, 'e')
    Sn(this, 'n')
    Sn(this, 't')
    Sn(this, 'a')
    ;(this.is_svg = t), (this.e = this.n = null)
  }
  c(t) {
    this.h(t)
  }
  m(t, i, o = null) {
    this.e ||
      (this.is_svg
        ? (this.e = Ln(i.nodeName))
        : (this.e = m(i.nodeType === 11 ? 'TEMPLATE' : i.nodeName)),
      (this.t = i.tagName !== 'TEMPLATE' ? i : i.content),
      this.c(t)),
      this.i(o)
  }
  h(t) {
    ;(this.e.innerHTML = t),
      (this.n = Array.from(
        this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes,
      ))
  }
  i(t) {
    for (let i = 0; i < this.n.length; i += 1) M(this.t, this.n[i], t)
  }
  p(t) {
    this.d(), this.h(t), this.i(this.a)
  }
  d() {
    this.n.forEach(A)
  }
}
function lu(e, t) {
  return new e(t)
}
let So
function ko(e) {
  So = e
}
function Fi() {
  if (!So) throw new Error('Function called outside component initialization')
  return So
}
function wt(e) {
  Fi().$$.on_mount.push(e)
}
function Yh(e) {
  Fi().$$.after_update.push(e)
}
function Ut(e) {
  Fi().$$.on_destroy.push(e)
}
function cg() {
  const e = Fi()
  return (t, i, { cancelable: o = !1 } = {}) => {
    const s = e.$$.callbacks[t]
    if (s) {
      const a = lg(t, i, { cancelable: o })
      return (
        s.slice().forEach((c) => {
          c.call(e, a)
        }),
        !a.defaultPrevented
      )
    }
    return !0
  }
}
function $o(e, t) {
  return Fi().$$.context.set(e, t), t
}
function Mn(e) {
  return Fi().$$.context.get(e)
}
const Li = [],
  $t = []
let Pi = []
const Jr = [],
  Kh = Promise.resolve()
let Qr = !1
function Zh() {
  Qr || ((Qr = !0), Kh.then(Xh))
}
function ug() {
  return Zh(), Kh
}
function ea(e) {
  Pi.push(e)
}
function Lt(e) {
  Jr.push(e)
}
const Rr = new Set()
let Si = 0
function Xh() {
  if (Si !== 0) return
  const e = So
  do {
    try {
      for (; Si < Li.length; ) {
        const t = Li[Si]
        Si++, ko(t), hg(t.$$)
      }
    } catch (t) {
      throw ((Li.length = 0), (Si = 0), t)
    }
    for (ko(null), Li.length = 0, Si = 0; $t.length; ) $t.pop()()
    for (let t = 0; t < Pi.length; t += 1) {
      const i = Pi[t]
      Rr.has(i) || (Rr.add(i), i())
    }
    Pi.length = 0
  } while (Li.length)
  for (; Jr.length; ) Jr.pop()()
  ;(Qr = !1), Rr.clear(), ko(e)
}
function hg(e) {
  if (e.fragment !== null) {
    e.update(), yt(e.before_update)
    const t = e.dirty
    ;(e.dirty = [-1]), e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(ea)
  }
}
function fg(e) {
  const t = [],
    i = []
  Pi.forEach((o) => (e.indexOf(o) === -1 ? t.push(o) : i.push(o))), i.forEach((o) => o()), (Pi = t)
}
const vs = new Set()
let ei
function qe() {
  ei = { r: 0, c: [], p: ei }
}
function Ye() {
  ei.r || yt(ei.c), (ei = ei.p)
}
function D(e, t) {
  e && e.i && (vs.delete(e), e.i(t))
}
function U(e, t, i, o) {
  if (e && e.o) {
    if (vs.has(e)) return
    vs.add(e),
      ei.c.push(() => {
        vs.delete(e), o && (i && e.d(1), o())
      }),
      e.o(t)
  } else o && o()
}
function Pt(e) {
  return (e == null ? void 0 : e.length) !== void 0 ? e : Array.from(e)
}
function ta(e, t) {
  const i = {},
    o = {},
    s = { $$scope: 1 }
  let a = e.length
  for (; a--; ) {
    const c = e[a],
      h = t[a]
    if (h) {
      for (const f in c) f in h || (o[f] = 1)
      for (const f in h) s[f] || ((i[f] = h[f]), (s[f] = 1))
      e[a] = h
    } else for (const f in c) s[f] = 1
  }
  for (const c in o) c in i || (i[c] = void 0)
  return i
}
function _s(e) {
  return typeof e == 'object' && e !== null ? e : {}
}
function At(e, t, i) {
  const o = e.$$.props[t]
  o !== void 0 && ((e.$$.bound[o] = i), i(e.$$.ctx[o]))
}
function re(e) {
  e && e.c()
}
function oe(e, t, i) {
  const { fragment: o, after_update: s } = e.$$
  o && o.m(t, i),
    ea(() => {
      const a = e.$$.on_mount.map(jh).filter(li)
      e.$$.on_destroy ? e.$$.on_destroy.push(...a) : yt(a), (e.$$.on_mount = [])
    }),
    s.forEach(ea)
}
function se(e, t) {
  const i = e.$$
  i.fragment !== null &&
    (fg(i.after_update),
    yt(i.on_destroy),
    i.fragment && i.fragment.d(t),
    (i.on_destroy = i.fragment = null),
    (i.ctx = []))
}
function dg(e, t) {
  e.$$.dirty[0] === -1 && (Li.push(e), Zh(), e.$$.dirty.fill(0)),
    (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31)
}
function ye(e, t, i, o, s, a, c = null, h = [-1]) {
  const f = So
  ko(e)
  const p = (e.$$ = {
    fragment: null,
    ctx: [],
    props: a,
    update: ce,
    not_equal: s,
    bound: au(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (f ? f.$$.context : [])),
    callbacks: au(),
    dirty: h,
    skip_bound: !1,
    root: t.target || f.$$.root,
  })
  c && c(p.root)
  let g = !1
  if (
    ((p.ctx = i
      ? i(e, t.props || {}, (b, v, ...w) => {
          const $ = w.length ? w[0] : v
          return (
            p.ctx &&
              s(p.ctx[b], (p.ctx[b] = $)) &&
              (!p.skip_bound && p.bound[b] && p.bound[b]($), g && dg(e, b)),
            v
          )
        })
      : []),
    p.update(),
    (g = !0),
    yt(p.before_update),
    (p.fragment = o ? o(p.ctx) : !1),
    t.target)
  ) {
    if (t.hydrate) {
      const b = sg(t.target)
      p.fragment && p.fragment.l(b), b.forEach(A)
    } else p.fragment && p.fragment.c()
    t.intro && D(e.$$.fragment), oe(e, t.target, t.anchor), Xh()
  }
  ko(f)
}
class we {
  constructor() {
    Sn(this, '$$')
    Sn(this, '$$set')
  }
  $destroy() {
    se(this, 1), (this.$destroy = ce)
  }
  $on(t, i) {
    if (!li(i)) return ce
    const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = [])
    return (
      o.push(i),
      () => {
        const s = o.indexOf(i)
        s !== -1 && o.splice(s, 1)
      }
    )
  }
  $set(t) {
    this.$$set && !ng(t) && ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1))
  }
}
const pg = '4'
typeof window < 'u' && (window.__svelte || (window.__svelte = { v: new Set() })).v.add(pg)
class mg extends we {
  constructor(t) {
    super(), ye(this, t, null, null, ge, {})
  }
}
var gg = Object.defineProperty,
  Mo = (e, t) => {
    for (var i in t) gg(e, i, { get: t[i], enumerable: !0 })
  },
  _g = {}
Mo(_g, { convertFileSrc: () => vg, invoke: () => Ke, transformCallback: () => Cs })
function bg() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0]
}
function Cs(e, t = !1) {
  let i = bg(),
    o = '_'.concat(i)
  return (
    Object.defineProperty(window, o, {
      value: (s) => (t && Reflect.deleteProperty(window, o), e == null ? void 0 : e(s)),
      writable: !1,
      configurable: !0,
    }),
    i
  )
}
async function Ke(e, t = {}) {
  return new Promise((i, o) => {
    let s = Cs((c) => {
        i(c), Reflect.deleteProperty(window, '_'.concat(a))
      }, !0),
      a = Cs((c) => {
        o(c), Reflect.deleteProperty(window, '_'.concat(s))
      }, !0)
    window.__TAURI_IPC__({ cmd: e, callback: s, error: a, ...t })
  })
}
function vg(e, t = 'asset') {
  return window.__TAURI__.convertFileSrc(e, t)
}
async function Te(e) {
  return Ke('tauri', e)
}
var yg = {}
Mo(yg, { TauriEvent: () => tf, emit: () => $a, listen: () => Ai, once: () => nf })
async function Jh(e, t) {
  return Te({ __tauriModule: 'Event', message: { cmd: 'unlisten', event: e, eventId: t } })
}
async function Qh(e, t, i) {
  await Te({
    __tauriModule: 'Event',
    message: { cmd: 'emit', event: e, windowLabel: t, payload: i },
  })
}
async function ka(e, t, i) {
  return Te({
    __tauriModule: 'Event',
    message: { cmd: 'listen', event: e, windowLabel: t, handler: Cs(i) },
  }).then((o) => async () => Jh(e, o))
}
async function ef(e, t, i) {
  return ka(e, t, (o) => {
    i(o), Jh(e, o.id).catch(() => {})
  })
}
var tf = ((e) => (
  (e.WINDOW_RESIZED = 'tauri://resize'),
  (e.WINDOW_MOVED = 'tauri://move'),
  (e.WINDOW_CLOSE_REQUESTED = 'tauri://close-requested'),
  (e.WINDOW_CREATED = 'tauri://window-created'),
  (e.WINDOW_DESTROYED = 'tauri://destroyed'),
  (e.WINDOW_FOCUS = 'tauri://focus'),
  (e.WINDOW_BLUR = 'tauri://blur'),
  (e.WINDOW_SCALE_FACTOR_CHANGED = 'tauri://scale-change'),
  (e.WINDOW_THEME_CHANGED = 'tauri://theme-changed'),
  (e.WINDOW_FILE_DROP = 'tauri://file-drop'),
  (e.WINDOW_FILE_DROP_HOVER = 'tauri://file-drop-hover'),
  (e.WINDOW_FILE_DROP_CANCELLED = 'tauri://file-drop-cancelled'),
  (e.MENU = 'tauri://menu'),
  (e.CHECK_UPDATE = 'tauri://update'),
  (e.UPDATE_AVAILABLE = 'tauri://update-available'),
  (e.INSTALL_UPDATE = 'tauri://update-install'),
  (e.STATUS_UPDATE = 'tauri://update-status'),
  (e.DOWNLOAD_PROGRESS = 'tauri://update-download-progress'),
  e
))(tf || {})
async function Ai(e, t) {
  return ka(e, null, t)
}
async function nf(e, t) {
  return ef(e, null, t)
}
async function $a(e, t) {
  return Qh(e, void 0, t)
}
const cu = (e) => typeof e > 'u',
  of = (e) => typeof e == 'function',
  sf = (e) => typeof e == 'number'
function wg(e) {
  return (
    !e.defaultPrevented && e.button === 0 && !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
  )
}
function rf() {
  let e = 0
  return () => e++
}
function kg() {
  return Math.random().toString(36).substring(2)
}
const vn = typeof window > 'u'
function af(e, t, i) {
  return e.addEventListener(t, i), () => e.removeEventListener(t, i)
}
const lf = (e, t) => (e ? {} : { style: t }),
  na = (e) => ({ 'aria-hidden': 'true', ...lf(e, 'display:none;') }),
  Ti = []
function $g(e, t) {
  return { subscribe: Ie(e, t).subscribe }
}
function Ie(e, t = ce) {
  let i
  const o = new Set()
  function s(h) {
    if (ge(e, h) && ((e = h), i)) {
      const f = !Ti.length
      for (const p of o) p[1](), Ti.push(p, e)
      if (f) {
        for (let p = 0; p < Ti.length; p += 2) Ti[p][0](Ti[p + 1])
        Ti.length = 0
      }
    }
  }
  function a(h) {
    s(h(e))
  }
  function c(h, f = ce) {
    const p = [h, f]
    return (
      o.add(p),
      o.size === 1 && (i = t(s, a) || ce),
      h(e),
      () => {
        o.delete(p), o.size === 0 && i && (i(), (i = null))
      }
    )
  }
  return { set: s, update: a, subscribe: c }
}
function ci(e, t, i) {
  const o = !Array.isArray(e),
    s = o ? [e] : e
  if (!s.every(Boolean)) throw new Error('derived() expects stores as input, got a falsy value')
  const a = t.length < 2
  return $g(i, (c, h) => {
    let f = !1
    const p = []
    let g = 0,
      b = ce
    const v = () => {
        if (g) return
        b()
        const $ = t(o ? p[0] : p, c, h)
        a ? c($) : (b = li($) ? $ : ce)
      },
      w = s.map(($, x) =>
        wa(
          $,
          (S) => {
            ;(p[x] = S), (g &= ~(1 << x)), f && v()
          },
          () => {
            g |= 1 << x
          },
        ),
      )
    return (
      (f = !0),
      v(),
      function () {
        yt(w), b(), (f = !1)
      }
    )
  })
}
const Po = (e) => '@@svnav-ctx__'.concat(e),
  ia = Po('LOCATION'),
  Oi = Po('ROUTER'),
  cf = Po('ROUTE'),
  Cg = Po('ROUTE_PARAMS'),
  xg = Po('FOCUS_ELEM'),
  uf = /^:(.+)/,
  yo = (e, t, i) => e.substr(t, i),
  oa = (e, t) => yo(e, 0, t.length) === t,
  Eg = (e) => e === '',
  Sg = (e) => uf.test(e),
  hf = (e) => e[0] === '*',
  Tg = (e) => e.replace(/\*.*$/, ''),
  ff = (e) => e.replace(/(^\/+|\/+$)/g, '')
function mn(e, t = !1) {
  const i = ff(e).split('/')
  return t ? i.filter(Boolean) : i
}
const Hr = (e, t) => e + (t ? '?'.concat(t) : ''),
  Ca = (e) => '/'.concat(ff(e))
function Io(...e) {
  const t = (o) => mn(o, !0).join('/'),
    i = e.map(t).join('/')
  return Ca(i)
}
const xa = 1,
  Is = 2,
  si = 3,
  Lg = 4,
  df = 5,
  Ag = 6,
  pf = 7,
  Mg = 8,
  Pg = 9,
  mf = 10,
  gf = 11,
  Ig = {
    [xa]: 'Link',
    [Is]: 'Route',
    [si]: 'Router',
    [Lg]: 'useFocus',
    [df]: 'useLocation',
    [Ag]: 'useMatch',
    [pf]: 'useNavigate',
    [Mg]: 'useParams',
    [Pg]: 'useResolvable',
    [mf]: 'useResolve',
    [gf]: 'navigate',
  },
  Ea = (e) => Ig[e]
function Ng(e, t) {
  let i
  return (
    e === Is
      ? (i = t.path ? 'path="'.concat(t.path, '"') : 'default')
      : e === xa
        ? (i = 'to="'.concat(t.to, '"'))
        : e === si && (i = 'basepath="'.concat(t.basepath || '', '"')),
    '<'.concat(Ea(e), ' ').concat(i || '', ' />')
  )
}
function Og(e, t, i, o) {
  const s = i && Ng(o || e, i),
    a = s ? '\n\nOccurred in: '.concat(s) : '',
    c = Ea(e),
    h = of(t) ? t(c) : t
  return '<'.concat(c, '> ').concat(h).concat(a)
}
const _f =
    (e) =>
    (...t) =>
      e(Og(...t)),
  bf = _f((e) => {
    throw new Error(e)
  }),
  xs = _f(console.warn),
  uu = 4,
  Bg = 3,
  Dg = 2,
  Rg = 1,
  Hg = 1
function zg(e, t) {
  const i = e.default
    ? 0
    : mn(e.fullPath).reduce((o, s) => {
        let a = o
        return (
          (a += uu), Eg(s) ? (a += Hg) : Sg(s) ? (a += Dg) : hf(s) ? (a -= uu + Rg) : (a += Bg), a
        )
      }, 0)
  return { route: e, score: i, index: t }
}
function Ug(e) {
  return e
    .map(zg)
    .sort((t, i) => (t.score < i.score ? 1 : t.score > i.score ? -1 : t.index - i.index))
}
function vf(e, t) {
  let i, o
  const [s] = t.split('?'),
    a = mn(s),
    c = a[0] === '',
    h = Ug(e)
  for (let f = 0, p = h.length; f < p; f++) {
    const { route: g } = h[f]
    let b = !1
    const v = {},
      w = (L) => ({ ...g, params: v, uri: L })
    if (g.default) {
      o = w(t)
      continue
    }
    const $ = mn(g.fullPath),
      x = Math.max(a.length, $.length)
    let S = 0
    for (; S < x; S++) {
      const L = $[S],
        N = a[S]
      if (!cu(L) && hf(L)) {
        const F = L === '*' ? '*' : L.slice(1)
        v[F] = a.slice(S).map(decodeURIComponent).join('/')
        break
      }
      if (cu(N)) {
        b = !0
        break
      }
      const B = uf.exec(L)
      if (B && !c) {
        const F = decodeURIComponent(N)
        v[B[1]] = F
      } else if (L !== N) {
        b = !0
        break
      }
    }
    if (!b) {
      i = w(Io(...a.slice(0, S)))
      break
    }
  }
  return i || o || null
}
function yf(e, t) {
  return vf([e], t)
}
function Fg(e, t) {
  if (oa(e, '/')) return e
  const [i, o] = e.split('?'),
    [s] = t.split('?'),
    a = mn(i),
    c = mn(s)
  if (a[0] === '') return Hr(s, o)
  if (!oa(a[0], '.')) {
    const p = c.concat(a).join('/')
    return Hr((s === '/' ? '' : '/') + p, o)
  }
  const h = c.concat(a),
    f = []
  return (
    h.forEach((p) => {
      p === '..' ? f.pop() : p !== '.' && f.push(p)
    }),
    Hr('/'.concat(f.join('/')), o)
  )
}
function hu(e, t) {
  const { pathname: i, hash: o = '', search: s = '', state: a } = e,
    c = mn(t, !0),
    h = mn(i, !0)
  for (; c.length; )
    c[0] !== h[0] &&
      bf(
        si,
        'Invalid state: All locations must begin with the basepath "'
          .concat(t, '", found "')
          .concat(i, '"'),
      ),
      c.shift(),
      h.shift()
  return { pathname: Io(...h), hash: o, search: s, state: a }
}
const fu = (e) => (e.length === 1 ? '' : e),
  Sa = (e) => {
    const t = e.indexOf('?'),
      i = e.indexOf('#'),
      o = t !== -1,
      s = i !== -1,
      a = s ? fu(yo(e, i)) : '',
      c = s ? yo(e, 0, i) : e,
      h = o ? fu(yo(c, t)) : ''
    return { pathname: (o ? yo(c, 0, t) : c) || '/', search: h, hash: a }
  },
  Wg = (e) => {
    const { pathname: t, search: i, hash: o } = e
    return t + i + o
  }
function Vg(e, t, i) {
  return Io(i, Fg(e, t))
}
function Gg(e, t) {
  const i = Ca(Tg(e)),
    o = mn(i, !0),
    s = mn(t, !0).slice(0, o.length),
    a = yf({ fullPath: i }, Io(...s))
  return a && a.uri
}
const zr = 'POP',
  jg = 'PUSH',
  qg = 'REPLACE'
function Ur(e) {
  return {
    ...e.location,
    pathname: encodeURI(decodeURI(e.location.pathname)),
    state: e.history.state,
    _key: (e.history.state && e.history.state._key) || 'initial',
  }
}
function Yg(e) {
  let t = [],
    i = Ur(e),
    o = zr
  const s = (a = t) => a.forEach((c) => c({ location: i, action: o }))
  return {
    get location() {
      return i
    },
    listen(a) {
      t.push(a)
      const c = () => {
        ;(i = Ur(e)), (o = zr), s([a])
      }
      s([a])
      const h = af(e, 'popstate', c)
      return () => {
        h(), (t = t.filter((f) => f !== a))
      }
    },
    navigate(a, c) {
      const { state: h = {}, replace: f = !1 } = c || {}
      if (((o = f ? qg : jg), sf(a)))
        c &&
          xs(
            gf,
            'Navigation options (state or replace) are not supported, when passing a number as the first argument to navigate. They are ignored.',
          ),
          (o = zr),
          e.history.go(a)
      else {
        const p = { ...h, _key: kg() }
        try {
          e.history[f ? 'replaceState' : 'pushState'](p, '', a)
        } catch (g) {
          e.location[f ? 'replace' : 'assign'](a)
        }
      }
      ;(i = Ur(e)), s()
    },
  }
}
function Fr(e, t) {
  return { ...Sa(t), state: e }
}
function Kg(e = '/') {
  let t = 0,
    i = [Fr(null, e)]
  return {
    get entries() {
      return i
    },
    get location() {
      return i[t]
    },
    addEventListener() {},
    removeEventListener() {},
    history: {
      get state() {
        return i[t].state
      },
      pushState(o, s, a) {
        t++, (i = i.slice(0, t)), i.push(Fr(o, a))
      },
      replaceState(o, s, a) {
        i[t] = Fr(o, a)
      },
      go(o) {
        const s = t + o
        s < 0 || s > i.length - 1 || (t = s)
      },
    },
  }
}
const Zg = !!(!vn && window.document && window.document.createElement),
  Xg = !vn && window.location.origin === 'null',
  wf = Yg(Zg && !Xg ? window : Kg()),
  { navigate: sa } = wf
let bn = null,
  kf = !0
function Jg(e, t) {
  const i = document.querySelectorAll('[data-svnav-router]')
  for (let o = 0; o < i.length; o++) {
    const s = i[o],
      a = Number(s.dataset.svnavRouter)
    if (a === e) return !0
    if (a === t) return !1
  }
  return !1
}
function Qg(e) {
  ;(!bn || e.level > bn.level || (e.level === bn.level && Jg(e.routerId, bn.routerId))) && (bn = e)
}
function e_() {
  bn = null
}
function t_() {
  kf = !1
}
function du(e) {
  if (!e) return !1
  const t = 'tabindex'
  try {
    if (!e.hasAttribute(t)) {
      e.setAttribute(t, '-1')
      let i
      i = af(e, 'blur', () => {
        e.removeAttribute(t), i()
      })
    }
    return e.focus(), document.activeElement === e
  } catch (i) {
    return !1
  }
}
function n_(e, t) {
  return Number(e.dataset.svnavRouteEnd) === t
}
function i_(e) {
  return /^H[1-6]$/i.test(e.tagName)
}
function pu(e, t = document) {
  return t.querySelector(e)
}
function o_(e) {
  let i = pu('[data-svnav-route-start="'.concat(e, '"]')).nextElementSibling
  for (; !n_(i, e); ) {
    if (i_(i)) return i
    const o = pu('h1,h2,h3,h4,h5,h6', i)
    if (o) return o
    i = i.nextElementSibling
  }
  return null
}
function s_(e) {
  Promise.resolve(je(e.focusElement)).then((t) => {
    const i = t || o_(e.id)
    i ||
      xs(
        si,
        'Could not find an element to focus. You should always render a header for accessibility reasons, or set a custom focus element via the "useFocus" hook. If you don\'t want this Route or Router to manage focus, pass "primary={false}" to it.',
        e,
        Is,
      ),
      !du(i) && du(document.documentElement)
  })
}
const r_ = (e, t, i) => (o, s) =>
    ug().then(() => {
      if (!bn || kf) {
        t_()
        return
      }
      if ((o && s_(bn.route), e.announcements && s)) {
        const { path: a, fullPath: c, meta: h, params: f, uri: p } = bn.route,
          g = e.createAnnouncement({ path: a, fullPath: c, meta: h, params: f, uri: p }, je(i))
        Promise.resolve(g).then((b) => {
          t.set(b)
        })
      }
      e_()
    }),
  a_ =
    'position:fixed;top:-1px;left:0;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;'
function l_(e) {
  let t,
    i,
    o = [
      { role: 'status' },
      { 'aria-atomic': 'true' },
      { 'aria-live': 'polite' },
      { 'data-svnav-announcer': '' },
      lf(e[6], a_),
    ],
    s = {}
  for (let a = 0; a < o.length; a += 1) s = cn(s, o[a])
  return {
    c() {
      ;(t = m('div')), (i = T(e[0])), Ni(t, s)
    },
    m(a, c) {
      M(a, t, c), u(t, i)
    },
    p(a, c) {
      c[0] & 1 && ag(i, a[0], s.contenteditable)
    },
    d(a) {
      a && A(t)
    },
  }
}
function c_(e) {
  let t,
    i,
    o,
    s,
    a,
    c = [na(e[6]), { 'data-svnav-router': e[3] }],
    h = {}
  for (let b = 0; b < c.length; b += 1) h = cn(h, c[b])
  const f = e[22].default,
    p = ti(f, e, e[21], null)
  let g = e[2] && e[4] && e[1].announcements && l_(e)
  return {
    c() {
      ;(t = m('div')), (i = E()), p && p.c(), (o = E()), g && g.c(), (s = Tt()), Ni(t, h)
    },
    m(b, v) {
      M(b, t, v), M(b, i, v), p && p.m(b, v), M(b, o, v), g && g.m(b, v), M(b, s, v), (a = !0)
    },
    p(b, v) {
      p &&
        p.p &&
        (!a || v[0] & 2097152) &&
        ii(p, f, b, b[21], a ? ni(f, b[21], v, null) : oi(b[21]), null),
        b[2] && b[4] && b[1].announcements && g.p(b, v)
    },
    i(b) {
      a || (D(p, b), (a = !0))
    },
    o(b) {
      U(p, b), (a = !1)
    },
    d(b) {
      b && (A(t), A(i), A(o), A(s)), p && p.d(b), g && g.d(b)
    },
  }
}
const u_ = rf(),
  mu = '/'
function h_(e, t, i) {
  let o,
    s,
    a,
    c,
    h,
    { $$slots: f = {}, $$scope: p } = t,
    { basepath: g = mu } = t,
    { url: b = null } = t,
    { history: v = wf } = t,
    { primary: w = !0 } = t,
    { a11y: $ = {} } = t,
    { disableInlineStyles: x = !1 } = t
  const S = { createAnnouncement: (le) => 'Navigated to '.concat(le.uri), announcements: !0, ...$ },
    L = g,
    N = Ca(g),
    B = Mn(ia),
    F = Mn(Oi),
    R = !B,
    V = u_(),
    G = w && !(F && !F.manageFocus),
    j = Ie('')
  ae(e, j, (le) => i(0, (h = le)))
  const Y = F ? F.disableInlineStyles : x,
    z = Ie([])
  ae(e, z, (le) => i(20, (c = le)))
  const W = Ie(null)
  ae(e, W, (le) => i(18, (s = le)))
  let te = !1
  const K = R ? 0 : F.level + 1,
    ne = R ? Ie((() => hu(vn ? Sa(b) : v.location, N))()) : B
  ae(e, ne, (le) => i(17, (o = le)))
  const Z = Ie(o)
  ae(e, Z, (le) => i(19, (a = le)))
  const I = r_(S, j, ne),
    Q = (le) => (_e) => _e.filter((Ce) => Ce.id !== le)
  function ie(le) {
    if (vn) {
      if (te) return
      const _e = yf(le, o.pathname)
      if (_e) return (te = !0), _e
    } else
      z.update((_e) => {
        const Ce = Q(le.id)(_e)
        return Ce.push(le), Ce
      })
  }
  function ue(le) {
    z.update(Q(le))
  }
  return (
    !R &&
      g !== mu &&
      xs(si, 'Only top-level Routers can have a "basepath" prop. It is ignored.', { basepath: g }),
    R &&
      (wt(() =>
        v.listen((_e) => {
          const Ce = hu(_e.location, N)
          Z.set(o), ne.set(Ce)
        }),
      ),
      $o(ia, ne)),
    $o(Oi, {
      activeRoute: W,
      registerRoute: ie,
      unregisterRoute: ue,
      manageFocus: G,
      level: K,
      id: V,
      history: R ? v : F.history,
      basepath: R ? N : F.basepath,
      disableInlineStyles: Y,
    }),
    (e.$$set = (le) => {
      'basepath' in le && i(11, (g = le.basepath)),
        'url' in le && i(12, (b = le.url)),
        'history' in le && i(13, (v = le.history)),
        'primary' in le && i(14, (w = le.primary)),
        'a11y' in le && i(15, ($ = le.a11y)),
        'disableInlineStyles' in le && i(16, (x = le.disableInlineStyles)),
        '$$scope' in le && i(21, (p = le.$$scope))
    }),
    (e.$$.update = () => {
      if (
        (e.$$.dirty[0] & 2048 &&
          g !== L &&
          xs(si, 'You cannot change the "basepath" prop. It is ignored.'),
        e.$$.dirty[0] & 1179648)
      ) {
        const le = vf(c, o.pathname)
        W.set(le)
      }
      if (e.$$.dirty[0] & 655360 && R) {
        const le = !!o.hash,
          _e = !le && G,
          Ce = !le || o.pathname !== a.pathname
        I(_e, Ce)
      }
      e.$$.dirty[0] & 262144 && G && s && s.primary && Qg({ level: K, routerId: V, route: s })
    }),
    [h, S, R, V, G, j, Y, z, W, ne, Z, g, b, v, w, $, x, o, s, a, c, p, f]
  )
}
class f_ extends we {
  constructor(t) {
    super(),
      ye(
        this,
        t,
        h_,
        c_,
        ge,
        { basepath: 11, url: 12, history: 13, primary: 14, a11y: 15, disableInlineStyles: 16 },
        null,
        [-1, -1],
      )
  }
}
const $f = f_
function No(e, t, i = Oi, o = si) {
  Mn(i) || bf(e, (a) => 'You cannot use '.concat(a, ' outside of a ').concat(Ea(o), '.'), t)
}
const d_ = (e) => {
  const { subscribe: t } = Mn(e)
  return { subscribe: t }
}
function Ta() {
  return No(df), d_(ia)
}
function Cf() {
  const { history: e } = Mn(Oi)
  return e
}
function xf() {
  const e = Mn(cf)
  return e ? ci(e, (t) => t.base) : Ie('/')
}
function Ef() {
  No(mf)
  const e = xf(),
    { basepath: t } = Mn(Oi)
  return (o) => Vg(o, je(e), t)
}
function p_() {
  No(pf)
  const e = Ef(),
    { navigate: t } = Cf()
  return (o, s) => {
    const a = sf(o) ? o : e(o)
    return t(a, s)
  }
}
const m_ = (e) => ({ params: e & 16, location: e & 8 }),
  gu = (e) => ({ params: vn ? je(e[10]) : e[4], location: e[3], navigate: e[11] })
function _u(e) {
  let t, i
  return (
    (t = new $f({ props: { primary: e[1], $$slots: { default: [b_] }, $$scope: { ctx: e } } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 2 && (a.primary = o[1]), s & 528409 && (a.$$scope = { dirty: s, ctx: o }), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function g_(e) {
  let t
  const i = e[18].default,
    o = ti(i, e, e[19], gu)
  return {
    c() {
      o && o.c()
    },
    m(s, a) {
      o && o.m(s, a), (t = !0)
    },
    p(s, a) {
      o && o.p && (!t || a & 524312) && ii(o, i, s, s[19], t ? ni(i, s[19], a, m_) : oi(s[19]), gu)
    },
    i(s) {
      t || (D(o, s), (t = !0))
    },
    o(s) {
      U(o, s), (t = !1)
    },
    d(s) {
      o && o.d(s)
    },
  }
}
function __(e) {
  let t, i, o
  const s = [{ location: e[3] }, { navigate: e[11] }, vn ? je(e[10]) : e[4], e[12]]
  var a = e[0]
  function c(h, f) {
    let p = {}
    if (f !== void 0 && f & 7192)
      p = ta(s, [
        f & 8 && { location: h[3] },
        f & 2048 && { navigate: h[11] },
        f & 1040 && _s(vn ? je(h[10]) : h[4]),
        f & 4096 && _s(h[12]),
      ])
    else for (let g = 0; g < s.length; g += 1) p = cn(p, s[g])
    return { props: p }
  }
  return (
    a && (t = lu(a, c(e))),
    {
      c() {
        t && re(t.$$.fragment), (i = Tt())
      },
      m(h, f) {
        t && oe(t, h, f), M(h, i, f), (o = !0)
      },
      p(h, f) {
        if (f & 1 && a !== (a = h[0])) {
          if (t) {
            qe()
            const p = t
            U(p.$$.fragment, 1, 0, () => {
              se(p, 1)
            }),
              Ye()
          }
          a
            ? ((t = lu(a, c(h, f))), re(t.$$.fragment), D(t.$$.fragment, 1), oe(t, i.parentNode, i))
            : (t = null)
        } else if (a) {
          const p =
            f & 7192
              ? ta(s, [
                  f & 8 && { location: h[3] },
                  f & 2048 && { navigate: h[11] },
                  f & 1040 && _s(vn ? je(h[10]) : h[4]),
                  f & 4096 && _s(h[12]),
                ])
              : {}
          t.$set(p)
        }
      },
      i(h) {
        o || (t && D(t.$$.fragment, h), (o = !0))
      },
      o(h) {
        t && U(t.$$.fragment, h), (o = !1)
      },
      d(h) {
        h && A(i), t && se(t, h)
      },
    }
  )
}
function b_(e) {
  let t, i, o, s
  const a = [__, g_],
    c = []
  function h(f, p) {
    return f[0] !== null ? 0 : 1
  }
  return (
    (t = h(e)),
    (i = c[t] = a[t](e)),
    {
      c() {
        i.c(), (o = Tt())
      },
      m(f, p) {
        c[t].m(f, p), M(f, o, p), (s = !0)
      },
      p(f, p) {
        let g = t
        ;(t = h(f)),
          t === g
            ? c[t].p(f, p)
            : (qe(),
              U(c[g], 1, 1, () => {
                c[g] = null
              }),
              Ye(),
              (i = c[t]),
              i ? i.p(f, p) : ((i = c[t] = a[t](f)), i.c()),
              D(i, 1),
              i.m(o.parentNode, o))
      },
      i(f) {
        s || (D(i), (s = !0))
      },
      o(f) {
        U(i), (s = !1)
      },
      d(f) {
        f && A(o), c[t].d(f)
      },
    }
  )
}
function v_(e) {
  let t,
    i,
    o,
    s,
    a,
    c = [na(e[7]), { 'data-svnav-route-start': e[5] }],
    h = {}
  for (let b = 0; b < c.length; b += 1) h = cn(h, c[b])
  let f = e[2] && _u(e),
    p = [na(e[7]), { 'data-svnav-route-end': e[5] }],
    g = {}
  for (let b = 0; b < p.length; b += 1) g = cn(g, p[b])
  return {
    c() {
      ;(t = m('div')), (i = E()), f && f.c(), (o = E()), (s = m('div')), Ni(t, h), Ni(s, g)
    },
    m(b, v) {
      M(b, t, v), M(b, i, v), f && f.m(b, v), M(b, o, v), M(b, s, v), (a = !0)
    },
    p(b, [v]) {
      b[2]
        ? f
          ? (f.p(b, v), v & 4 && D(f, 1))
          : ((f = _u(b)), f.c(), D(f, 1), f.m(o.parentNode, o))
        : f &&
          (qe(),
          U(f, 1, 1, () => {
            f = null
          }),
          Ye())
    },
    i(b) {
      a || (D(f), (a = !0))
    },
    o(b) {
      U(f), (a = !1)
    },
    d(b) {
      b && (A(t), A(i), A(o), A(s)), f && f.d(b)
    },
  }
}
const y_ = rf()
function w_(e, t, i) {
  let o
  const s = ['path', 'component', 'meta', 'primary']
  let a = $s(t, s),
    c,
    h,
    f,
    p,
    { $$slots: g = {}, $$scope: b } = t,
    { path: v = '' } = t,
    { component: w = null } = t,
    { meta: $ = {} } = t,
    { primary: x = !0 } = t
  No(Is, t)
  const S = y_(),
    { registerRoute: L, unregisterRoute: N, activeRoute: B, disableInlineStyles: F } = Mn(Oi)
  ae(e, B, (te) => i(16, (c = te)))
  const R = xf()
  ae(e, R, (te) => i(17, (f = te)))
  const V = Ta()
  ae(e, V, (te) => i(3, (h = te)))
  const G = Ie(null)
  let j
  const Y = Ie(),
    z = Ie({})
  ae(e, z, (te) => i(4, (p = te))), $o(cf, Y), $o(Cg, z), $o(xg, G)
  const W = p_()
  return (
    vn || Ut(() => N(S)),
    (e.$$set = (te) => {
      i(24, (t = cn(cn({}, t), ks(te)))),
        i(12, (a = $s(t, s))),
        'path' in te && i(13, (v = te.path)),
        'component' in te && i(0, (w = te.component)),
        'meta' in te && i(14, ($ = te.meta)),
        'primary' in te && i(1, (x = te.primary)),
        '$$scope' in te && i(19, (b = te.$$scope))
    }),
    (e.$$.update = () => {
      if (e.$$.dirty & 155658) {
        const te = v === '',
          K = Io(f, v),
          ee = {
            id: S,
            path: v,
            meta: $,
            default: te,
            fullPath: te ? '' : K,
            base: te ? f : Gg(K, h.pathname),
            primary: x,
            focusElement: G,
          }
        Y.set(ee), i(15, (j = L(ee)))
      }
      if ((e.$$.dirty & 98304 && i(2, (o = !!(j || (c && c.id === S)))), e.$$.dirty & 98308 && o)) {
        const { params: te } = j || c
        z.set(te)
      }
    }),
    (t = ks(t)),
    [w, x, o, h, p, S, B, F, R, V, z, W, a, v, $, j, c, f, g, b]
  )
}
class k_ extends we {
  constructor(t) {
    super(), ye(this, t, w_, v_, ge, { path: 13, component: 0, meta: 14, primary: 1 })
  }
}
const fn = k_
function $_(e) {
  let t, i, o, s
  const a = e[13].default,
    c = ti(a, e, e[12], null)
  let h = [{ href: e[0] }, e[2], e[1]],
    f = {}
  for (let p = 0; p < h.length; p += 1) f = cn(f, h[p])
  return {
    c() {
      ;(t = m('a')), c && c.c(), Ni(t, f)
    },
    m(p, g) {
      M(p, t, g), c && c.m(t, null), (i = !0), o || ((s = Ee(t, 'click', e[4])), (o = !0))
    },
    p(p, [g]) {
      c &&
        c.p &&
        (!i || g & 4096) &&
        ii(c, a, p, p[12], i ? ni(a, p[12], g, null) : oi(p[12]), null),
        Ni(t, (f = ta(h, [(!i || g & 1) && { href: p[0] }, g & 4 && p[2], g & 2 && p[1]])))
    },
    i(p) {
      i || (D(c, p), (i = !0))
    },
    o(p) {
      U(c, p), (i = !1)
    },
    d(p) {
      p && A(t), c && c.d(p), (o = !1), s()
    },
  }
}
function C_(e, t, i) {
  let o, s, a, c, h, f
  const p = ['to', 'replace', 'state', 'getProps']
  let g = $s(t, p),
    b,
    { $$slots: v = {}, $$scope: w } = t,
    { to: $ } = t,
    { replace: x = !1 } = t,
    { state: S = {} } = t,
    { getProps: L = null } = t
  No(xa, t)
  const N = Ta()
  ae(e, N, (G) => i(11, (b = G)))
  const B = cg(),
    F = Ef(),
    { navigate: R } = Cf()
  function V(G) {
    B('click', G), wg(G) && (G.preventDefault(), R(o, { state: S, replace: c || x }))
  }
  return (
    (e.$$set = (G) => {
      i(19, (t = cn(cn({}, t), ks(G)))),
        i(18, (g = $s(t, p))),
        'to' in G && i(5, ($ = G.to)),
        'replace' in G && i(6, (x = G.replace)),
        'state' in G && i(7, (S = G.state)),
        'getProps' in G && i(8, (L = G.getProps)),
        '$$scope' in G && i(12, (w = G.$$scope))
    }),
    (e.$$.update = () => {
      e.$$.dirty & 2080 && i(0, (o = F($, b))),
        e.$$.dirty & 2049 && i(10, (s = oa(b.pathname, o))),
        e.$$.dirty & 2049 && i(9, (a = o === b.pathname)),
        e.$$.dirty & 2049 && (c = Sa(o) === Wg(b)),
        e.$$.dirty & 512 && i(2, (h = a ? { 'aria-current': 'page' } : {})),
        i(
          1,
          (f = (() => {
            if (of(L)) {
              const G = L({ location: b, href: o, isPartiallyCurrent: s, isCurrent: a })
              return { ...g, ...G }
            }
            return g
          })()),
        )
    }),
    (t = ks(t)),
    [o, f, h, N, V, $, x, S, L, a, s, b, w, v]
  )
}
class x_ extends we {
  constructor(t) {
    super(), ye(this, t, C_, $_, ge, { to: 5, replace: 6, state: 7, getProps: 8 })
  }
}
const yn = x_,
  Jt = Ie({}),
  Sf = () => Jt.set({}),
  E_ = () => je(nn) && je(Pn) && !je(Oo) && !je(tn),
  nn = Ie(!1),
  Pn = Ie(!1),
  Oo = Ie(!1),
  La = Ie(!1),
  tn = Ie(!1),
  Ii = Ie(!1),
  Ns = Ie(!0),
  pn = {},
  Tf = Ie(pn),
  Aa = Ie(pn),
  Ma = Ie(pn),
  Pa = Ie(pn),
  Ia = Ie(pn),
  Lf = () => {
    Aa.set(pn), Ma.set(pn), Pa.set(pn), Ia.set(pn), Tf.set(pn)
  }
var Af =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
      ? window
      : typeof global < 'u'
        ? global
        : typeof self < 'u'
          ? self
          : {}
function Na(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e
}
var Mf = { exports: {} }
/*! UIkit 3.17.11 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */ ;(function (
  e,
  t,
) {
  ;(function (i, o) {
    e.exports = o()
  })(Af, function () {
    const { hasOwnProperty: i, toString: o } = Object.prototype
    function s(n, r) {
      return i.call(n, r)
    }
    const a = /\B([A-Z])/g,
      c = ht((n) => n.replace(a, '-$1').toLowerCase()),
      h = /-(\w)/g,
      f = ht((n) => (n.charAt(0).toLowerCase() + n.slice(1)).replace(h, (r, l) => l.toUpperCase())),
      p = ht((n) => n.charAt(0).toUpperCase() + n.slice(1))
    function g(n, r) {
      var l
      return (l = n == null ? void 0 : n.startsWith) == null ? void 0 : l.call(n, r)
    }
    function b(n, r) {
      var l
      return (l = n == null ? void 0 : n.endsWith) == null ? void 0 : l.call(n, r)
    }
    function v(n, r) {
      var l
      return (l = n == null ? void 0 : n.includes) == null ? void 0 : l.call(n, r)
    }
    function w(n, r) {
      var l
      return (l = n == null ? void 0 : n.findIndex) == null ? void 0 : l.call(n, r)
    }
    const { isArray: $, from: x } = Array,
      { assign: S } = Object
    function L(n) {
      return typeof n == 'function'
    }
    function N(n) {
      return n !== null && typeof n == 'object'
    }
    function B(n) {
      return o.call(n) === '[object Object]'
    }
    function F(n) {
      return N(n) && n === n.window
    }
    function R(n) {
      return j(n) === 9
    }
    function V(n) {
      return j(n) >= 1
    }
    function G(n) {
      return j(n) === 1
    }
    function j(n) {
      return !F(n) && N(n) && n.nodeType
    }
    function Y(n) {
      return typeof n == 'boolean'
    }
    function z(n) {
      return typeof n == 'string'
    }
    function W(n) {
      return typeof n == 'number'
    }
    function te(n) {
      return W(n) || (z(n) && !isNaN(n - parseFloat(n)))
    }
    function K(n) {
      return !($(n) ? n.length : N(n) && Object.keys(n).length)
    }
    function ee(n) {
      return n === void 0
    }
    function ne(n) {
      return Y(n)
        ? n
        : n === 'true' || n === '1' || n === ''
          ? !0
          : n === 'false' || n === '0'
            ? !1
            : n
    }
    function Z(n) {
      const r = Number(n)
      return isNaN(r) ? !1 : r
    }
    function I(n) {
      return parseFloat(n) || 0
    }
    function Q(n) {
      return ie(n)[0]
    }
    function ie(n) {
      return V(n) ? [n] : Array.from(n || []).filter(V)
    }
    function ue(n) {
      if (F(n)) return n
      n = Q(n)
      const r = R(n) ? n : n == null ? void 0 : n.ownerDocument
      return (r == null ? void 0 : r.defaultView) || window
    }
    function le(n, r) {
      return (
        n === r ||
        (N(n) &&
          N(r) &&
          Object.keys(n).length === Object.keys(r).length &&
          xe(n, (l, d) => l === r[d]))
      )
    }
    function _e(n, r, l) {
      return n.replace(new RegExp(''.concat(r, '|').concat(l), 'g'), (d) => (d === r ? l : r))
    }
    function Ce(n) {
      return n[n.length - 1]
    }
    function xe(n, r) {
      for (const l in n) if (r(n[l], l) === !1) return !1
      return !0
    }
    function Me(n, r) {
      return n.slice().sort(({ [r]: l = 0 }, { [r]: d = 0 }) => (l > d ? 1 : d > l ? -1 : 0))
    }
    function ke(n, r) {
      return n.reduce((l, d) => l + I(L(r) ? r(d) : d[r]), 0)
    }
    function be(n, r) {
      const l = new Set()
      return n.filter(({ [r]: d }) => (l.has(d) ? !1 : l.add(d)))
    }
    function $e(n, r) {
      return r.reduce((l, d) => ({ ...l, [d]: n[d] }), {})
    }
    function me(n, r = 0, l = 1) {
      return Math.min(Math.max(Z(n) || 0, r), l)
    }
    function de() {}
    function Be(...n) {
      return [
        ['bottom', 'top'],
        ['right', 'left'],
      ].every(
        ([r, l]) =>
          Math.min(...n.map(({ [r]: d }) => d)) - Math.max(...n.map(({ [l]: d }) => d)) > 0,
      )
    }
    function Le(n, r) {
      return n.x <= r.right && n.x >= r.left && n.y <= r.bottom && n.y >= r.top
    }
    function tt(n, r, l) {
      const d = r === 'width' ? 'height' : 'width'
      return { [d]: n[r] ? Math.round((l * n[d]) / n[r]) : n[d], [r]: l }
    }
    function dt(n, r) {
      n = { ...n }
      for (const l in n) n = n[l] > r[l] ? tt(n, l, r[l]) : n
      return n
    }
    function pt(n, r) {
      n = dt(n, r)
      for (const l in n) n = n[l] < r[l] ? tt(n, l, r[l]) : n
      return n
    }
    const Ve = { ratio: tt, contain: dt, cover: pt }
    function Ge(n, r, l = 0, d = !1) {
      r = ie(r)
      const { length: _ } = r
      return _
        ? ((n = te(n)
            ? Z(n)
            : n === 'next'
              ? l + 1
              : n === 'previous'
                ? l - 1
                : n === 'last'
                  ? _ - 1
                  : r.indexOf(Q(n))),
          d ? me(n, 0, _ - 1) : ((n %= _), n < 0 ? n + _ : n))
        : -1
    }
    function ht(n) {
      const r = Object.create(null)
      return (l, ...d) => r[l] || (r[l] = n(l, ...d))
    }
    function he(n, r, l) {
      var d
      if (N(r)) {
        for (const _ in r) he(n, _, r[_])
        return
      }
      if (ee(l)) return (d = Q(n)) == null ? void 0 : d.getAttribute(r)
      for (const _ of ie(n))
        L(l) && (l = l.call(_, he(_, r))), l === null ? Re(_, r) : _.setAttribute(r, l)
    }
    function nt(n, r) {
      return ie(n).some((l) => l.hasAttribute(r))
    }
    function Re(n, r) {
      ie(n).forEach((l) => l.removeAttribute(r))
    }
    function Ae(n, r) {
      for (const l of [r, 'data-'.concat(r)]) if (nt(n, l)) return he(n, l)
    }
    function ve(n, ...r) {
      for (const l of ie(n)) {
        const d = kt(r).filter((_) => !Oe(l, _))
        d.length && l.classList.add(...d)
      }
    }
    function Ne(n, ...r) {
      for (const l of ie(n)) {
        const d = kt(r).filter((_) => Oe(l, _))
        d.length && l.classList.remove(...d)
      }
    }
    function hi(n, r) {
      r = new RegExp(r)
      for (const l of ie(n)) l.classList.remove(...x(l.classList).filter((d) => d.match(r)))
    }
    function Ct(n, r, l) {
      ;(l = kt(l)), (r = kt(r).filter((d) => !v(l, d))), Ne(n, r), ve(n, l)
    }
    function Oe(n, r) {
      return ([r] = kt(r)), ie(n).some((l) => l.classList.contains(r))
    }
    function ze(n, r, l) {
      const d = kt(r)
      ee(l) || (l = !!l)
      for (const _ of ie(n)) for (const k of d) _.classList.toggle(k, l)
    }
    function kt(n) {
      return n ? ($(n) ? n.map(kt).flat() : String(n).split(/[ ,]/).filter(Boolean)) : []
    }
    const zd = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
    function Vs(n) {
      return ie(n).some((r) => zd[r.tagName.toLowerCase()])
    }
    function _t(n) {
      return ie(n).some((r) => r.offsetWidth || r.offsetHeight || r.getClientRects().length)
    }
    const qi = 'input,select,textarea,button'
    function Gs(n) {
      return ie(n).some((r) => st(r, qi))
    }
    const Yi = ''.concat(qi, ',a[href],[tabindex]')
    function Ho(n) {
      return st(n, Yi)
    }
    function it(n) {
      var r
      return (r = Q(n)) == null ? void 0 : r.parentElement
    }
    function Ki(n, r) {
      return ie(n).filter((l) => st(l, r))
    }
    function st(n, r) {
      return ie(n).some((l) => l.matches(r))
    }
    function Qa(n, r) {
      var l
      return (l = Q(n)) == null ? void 0 : l.closest(g(r, '>') ? r.slice(1) : r)
    }
    function el(n, r) {
      return z(r) ? !!Qa(n, r) : Q(r).contains(Q(n))
    }
    function Dn(n, r) {
      const l = []
      for (; (n = it(n)); ) (!r || st(n, r)) && l.push(n)
      return l
    }
    function ct(n, r) {
      n = Q(n)
      const l = n ? x(n.children) : []
      return r ? Ki(l, r) : l
    }
    function fi(n, r) {
      return r ? ie(n).indexOf(Q(r)) : ct(it(n)).indexOf(n)
    }
    function di(n) {
      return (n = Q(n)), n && ['origin', 'pathname', 'search'].every((r) => n[r] === location[r])
    }
    function js(n) {
      if (di(n)) {
        n = Q(n)
        const r = decodeURIComponent(n.hash).substring(1)
        return document.getElementById(r) || document.getElementsByName(r)[0]
      }
    }
    function Vt(n, r) {
      return qs(n, nl(n, r))
    }
    function Zi(n, r) {
      return Xi(n, nl(n, r))
    }
    function qs(n, r) {
      return Q(il(n, Q(r), 'querySelector'))
    }
    function Xi(n, r) {
      return ie(il(n, Q(r), 'querySelectorAll'))
    }
    const Ud = /(^|[^\\],)\s*[!>+~-]/,
      tl = ht((n) => n.match(Ud))
    function nl(n, r = document) {
      return (z(n) && tl(n)) || R(r) ? r : r.ownerDocument
    }
    const Fd = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g,
      Wd = ht((n) => n.replace(Fd, '$1 *'))
    function il(n, r = document, l) {
      if (!n || !z(n)) return n
      if (((n = Wd(n)), tl(n))) {
        const d = Gd(n)
        n = ''
        for (let _ of d) {
          let k = r
          if (_[0] === '!') {
            const C = _.substr(1).trim().split(' ')
            if (
              ((k = it(r).closest(C[0])),
              (_ = C.slice(1).join(' ').trim()),
              !_.length && d.length === 1)
            )
              return k
          }
          if (_[0] === '-') {
            const C = _.substr(1).trim().split(' '),
              P = (k || r).previousElementSibling
            ;(k = st(P, _.substr(1)) ? P : null), (_ = C.slice(1).join(' '))
          }
          k &&
            (n += ''
              .concat(n ? ',' : '')
              .concat(jd(k), ' ')
              .concat(_))
        }
        r = document
      }
      try {
        return r[l](n)
      } catch (d) {
        return null
      }
    }
    const Vd = /.*?[^\\](?:,|$)/g,
      Gd = ht((n) => n.match(Vd).map((r) => r.replace(/,$/, '').trim()))
    function jd(n) {
      const r = []
      for (; n.parentNode; ) {
        const l = he(n, 'id')
        if (l) {
          r.unshift('#'.concat(Ys(l)))
          break
        } else {
          let { tagName: d } = n
          d !== 'HTML' && (d += ':nth-child('.concat(fi(n) + 1, ')')),
            r.unshift(d),
            (n = n.parentNode)
        }
      }
      return r.join(' > ')
    }
    function Ys(n) {
      return z(n) ? CSS.escape(n) : ''
    }
    function Ue(...n) {
      let [r, l, d, _, k = !1] = Ks(n)
      _.length > 1 && (_ = Yd(_)), k != null && k.self && (_ = Kd(_)), d && (_ = qd(d, _))
      for (const C of l) for (const P of r) P.addEventListener(C, _, k)
      return () => Rn(r, l, _, k)
    }
    function Rn(...n) {
      let [r, l, , d, _ = !1] = Ks(n)
      for (const k of l) for (const C of r) C.removeEventListener(k, d, _)
    }
    function bt(...n) {
      const [r, l, d, _, k = !1, C] = Ks(n),
        P = Ue(
          r,
          l,
          d,
          (H) => {
            const q = !C || C(H)
            q && (P(), _(H, q))
          },
          k,
        )
      return P
    }
    function Pe(n, r, l) {
      return Zs(n).every((d) => d.dispatchEvent(Hn(r, !0, !0, l)))
    }
    function Hn(n, r = !0, l = !1, d) {
      return z(n) && (n = new CustomEvent(n, { bubbles: r, cancelable: l, detail: d })), n
    }
    function Ks(n) {
      return (
        (n[0] = Zs(n[0])), z(n[1]) && (n[1] = n[1].split(' ')), L(n[2]) && n.splice(2, 0, !1), n
      )
    }
    function qd(n, r) {
      return (l) => {
        const d =
          n[0] === '>'
            ? Xi(n, l.currentTarget)
                .reverse()
                .find((_) => _.contains(l.target))
            : l.target.closest(n)
        d && ((l.current = d), r.call(this, l), delete l.current)
      }
    }
    function Yd(n) {
      return (r) => ($(r.detail) ? n(r, ...r.detail) : n(r))
    }
    function Kd(n) {
      return function (r) {
        if (r.target === r.currentTarget || r.target === r.current) return n.call(null, r)
      }
    }
    function ol(n) {
      return n && 'addEventListener' in n
    }
    function Zd(n) {
      return ol(n) ? n : Q(n)
    }
    function Zs(n) {
      return $(n) ? n.map(Zd).filter(Boolean) : z(n) ? Xi(n) : ol(n) ? [n] : ie(n)
    }
    function gn(n) {
      return n.pointerType === 'touch' || !!n.touches
    }
    function pi(n) {
      var r, l
      const { clientX: d, clientY: _ } =
        ((r = n.touches) == null ? void 0 : r[0]) ||
        ((l = n.changedTouches) == null ? void 0 : l[0]) ||
        n
      return { x: d, y: _ }
    }
    const Xd = {
      'animation-iteration-count': !0,
      'column-count': !0,
      'fill-opacity': !0,
      'flex-grow': !0,
      'flex-shrink': !0,
      'font-weight': !0,
      'line-height': !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      'stroke-dasharray': !0,
      'stroke-dashoffset': !0,
      widows: !0,
      'z-index': !0,
      zoom: !0,
    }
    function X(n, r, l, d) {
      const _ = ie(n)
      for (const k of _)
        if (z(r)) {
          if (((r = zo(r)), ee(l))) return getComputedStyle(k).getPropertyValue(r)
          k.style.setProperty(r, te(l) && !Xd[r] ? ''.concat(l, 'px') : l || W(l) ? l : '', d)
        } else if ($(r)) {
          const C = {}
          for (const P of r) C[P] = X(k, P)
          return C
        } else N(r) && ((d = l), xe(r, (C, P) => X(k, P, C, d)))
      return _[0]
    }
    const zo = ht((n) => Jd(n))
    function Jd(n) {
      if (g(n, '--')) return n
      n = c(n)
      const { style: r } = document.documentElement
      if (n in r) return n
      for (const l of ['webkit', 'moz']) {
        const d = '-'.concat(l, '-').concat(n)
        if (d in r) return d
      }
    }
    const Xs = 'uk-transition',
      Js = 'transitionend',
      Qs = 'transitioncanceled'
    function Qd(n, r, l = 400, d = 'linear') {
      return (
        (l = Math.round(l)),
        Promise.all(
          ie(n).map(
            (_) =>
              new Promise((k, C) => {
                for (const H in r) {
                  const q = X(_, H)
                  q === '' && X(_, H, q)
                }
                const P = setTimeout(() => Pe(_, Js), l)
                bt(
                  _,
                  [Js, Qs],
                  ({ type: H }) => {
                    clearTimeout(P),
                      Ne(_, Xs),
                      X(_, {
                        transitionProperty: '',
                        transitionDuration: '',
                        transitionTimingFunction: '',
                      }),
                      H === Qs ? C() : k(_)
                  },
                  { self: !0 },
                ),
                  ve(_, Xs),
                  X(_, {
                    transitionProperty: Object.keys(r).map(zo).join(','),
                    transitionDuration: ''.concat(l, 'ms'),
                    transitionTimingFunction: d,
                    ...r,
                  })
              }),
          ),
        )
      )
    }
    const rt = {
        start: Qd,
        async stop(n) {
          Pe(n, Js), await Promise.resolve()
        },
        async cancel(n) {
          Pe(n, Qs), await Promise.resolve()
        },
        inProgress(n) {
          return Oe(n, Xs)
        },
      },
      Ji = 'uk-animation-',
      sl = 'animationend',
      Uo = 'animationcanceled'
    function rl(n, r, l = 200, d, _) {
      return Promise.all(
        ie(n).map(
          (k) =>
            new Promise((C, P) => {
              Pe(k, Uo)
              const H = setTimeout(() => Pe(k, sl), l)
              bt(
                k,
                [sl, Uo],
                ({ type: q }) => {
                  clearTimeout(H),
                    q === Uo ? P() : C(k),
                    X(k, 'animationDuration', ''),
                    hi(k, ''.concat(Ji, '\\S*'))
                },
                { self: !0 },
              ),
                X(k, 'animationDuration', ''.concat(l, 'ms')),
                ve(k, r, Ji + (_ ? 'leave' : 'enter')),
                g(r, Ji) &&
                  (d && ve(k, 'uk-transform-origin-'.concat(d)),
                  _ && ve(k, ''.concat(Ji, 'reverse')))
            }),
        ),
      )
    }
    const e1 = new RegExp(''.concat(Ji, '(enter|leave)')),
      Cn = {
        in: rl,
        out(n, r, l, d) {
          return rl(n, r, l, d, !0)
        },
        inProgress(n) {
          return e1.test(he(n, 'class'))
        },
        cancel(n) {
          Pe(n, Uo)
        },
      }
    function t1(n) {
      if (document.readyState !== 'loading') {
        n()
        return
      }
      bt(document, 'DOMContentLoaded', n)
    }
    function xt(n, ...r) {
      return r.some((l) => {
        var d
        return (
          ((d = n == null ? void 0 : n.tagName) == null ? void 0 : d.toLowerCase()) ===
          l.toLowerCase()
        )
      })
    }
    function er(n) {
      return (n = He(n)), (n.innerHTML = ''), n
    }
    function zn(n, r) {
      return ee(r) ? He(n).innerHTML : mt(er(n), r)
    }
    const n1 = Vo('prepend'),
      mt = Vo('append'),
      Fo = Vo('before'),
      Wo = Vo('after')
    function Vo(n) {
      return function (r, l) {
        var d
        const _ = ie(z(l) ? Un(l) : l)
        return (d = He(r)) == null || d[n](..._), al(_)
      }
    }
    function qt(n) {
      ie(n).forEach((r) => r.remove())
    }
    function Go(n, r) {
      for (r = Q(Fo(n, r)); r.firstChild; ) r = r.firstChild
      return mt(r, n), r
    }
    function tr(n, r) {
      return ie(ie(n).map((l) => (l.hasChildNodes() ? Go(x(l.childNodes), r) : mt(l, r))))
    }
    function Qi(n) {
      ie(n)
        .map(it)
        .filter((r, l, d) => d.indexOf(r) === l)
        .forEach((r) => r.replaceWith(...r.childNodes))
    }
    const i1 = /^<(\w+)\s*\/?>(?:<\/\1>)?$/
    function Un(n) {
      const r = i1.exec(n)
      if (r) return document.createElement(r[1])
      const l = document.createElement('template')
      return (l.innerHTML = n.trim()), al(l.content.childNodes)
    }
    function al(n) {
      return n.length > 1 ? n : n[0]
    }
    function _n(n, r) {
      if (G(n))
        for (r(n), n = n.firstElementChild; n; ) {
          const l = n.nextElementSibling
          _n(n, r), (n = l)
        }
    }
    function He(n, r) {
      return ll(n) ? Q(Un(n)) : qs(n, r)
    }
    function ut(n, r) {
      return ll(n) ? ie(Un(n)) : Xi(n, r)
    }
    function ll(n) {
      return z(n) && g(n.trim(), '<')
    }
    const Fn = { width: ['left', 'right'], height: ['top', 'bottom'] }
    function Fe(n) {
      const r = G(n)
        ? Q(n).getBoundingClientRect()
        : { height: Ft(n), width: eo(n), top: 0, left: 0 }
      return {
        height: r.height,
        width: r.width,
        top: r.top,
        left: r.left,
        bottom: r.top + r.height,
        right: r.left + r.width,
      }
    }
    function Xe(n, r) {
      r && X(n, { left: 0, top: 0 })
      const l = Fe(n)
      if (n) {
        const { scrollY: d, scrollX: _ } = ue(n),
          k = { height: d, width: _ }
        for (const C in Fn) for (const P of Fn[C]) l[P] += k[C]
      }
      if (!r) return l
      for (const d of ['left', 'top']) X(n, d, r[d] - l[d])
    }
    function nr(n) {
      let { top: r, left: l } = Xe(n)
      const {
        ownerDocument: { body: d, documentElement: _ },
        offsetParent: k,
      } = Q(n)
      let C = k || _
      for (; C && (C === d || C === _) && X(C, 'position') === 'static'; ) C = C.parentNode
      if (G(C)) {
        const P = Xe(C)
        ;(r -= P.top + I(X(C, 'borderTopWidth'))), (l -= P.left + I(X(C, 'borderLeftWidth')))
      }
      return { top: r - I(X(n, 'marginTop')), left: l - I(X(n, 'marginLeft')) }
    }
    function Wn(n) {
      n = Q(n)
      const r = [n.offsetTop, n.offsetLeft]
      for (; (n = n.offsetParent); )
        if (
          ((r[0] += n.offsetTop + I(X(n, 'borderTopWidth'))),
          (r[1] += n.offsetLeft + I(X(n, 'borderLeftWidth'))),
          X(n, 'position') === 'fixed')
        ) {
          const l = ue(n)
          return (r[0] += l.scrollY), (r[1] += l.scrollX), r
        }
      return r
    }
    const Ft = cl('height'),
      eo = cl('width')
    function cl(n) {
      const r = p(n)
      return (l, d) => {
        if (ee(d)) {
          if (F(l)) return l['inner'.concat(r)]
          if (R(l)) {
            const _ = l.documentElement
            return Math.max(_['offset'.concat(r)], _['scroll'.concat(r)])
          }
          return (
            (l = Q(l)),
            (d = X(l, n)),
            (d = d === 'auto' ? l['offset'.concat(r)] : I(d) || 0),
            d - mi(l, n)
          )
        } else return X(l, n, !d && d !== 0 ? '' : +d + mi(l, n) + 'px')
      }
    }
    function mi(n, r, l = 'border-box') {
      return X(n, 'boxSizing') === l
        ? ke(
            Fn[r].map(p),
            (d) => I(X(n, 'padding'.concat(d))) + I(X(n, 'border'.concat(d, 'Width'))),
          )
        : 0
    }
    function jo(n) {
      for (const r in Fn) for (const l in Fn[r]) if (Fn[r][l] === n) return Fn[r][1 - l]
      return n
    }
    function Dt(n, r = 'width', l = window, d = !1) {
      return z(n)
        ? ke(s1(n), (_) => {
            const k = a1(_)
            return k
              ? l1(
                  k === 'vh'
                    ? c1()
                    : k === 'vw'
                      ? eo(ue(l))
                      : d
                        ? l['offset'.concat(p(r))]
                        : Fe(l)[r],
                  _,
                )
              : _
          })
        : I(n)
    }
    const o1 = /-?\d+(?:\.\d+)?(?:v[wh]|%|px)?/g,
      s1 = ht((n) => n.toString().replace(/\s/g, '').match(o1) || []),
      r1 = /(?:v[hw]|%)$/,
      a1 = ht((n) => (n.match(r1) || [])[0])
    function l1(n, r) {
      return (n * I(r)) / 100
    }
    let to, gi
    function c1() {
      return (
        to ||
        (gi ||
          ((gi = He('<div>')),
          X(gi, { height: '100vh', position: 'fixed' }),
          Ue(window, 'resize', () => (to = null))),
        mt(document.body, gi),
        (to = gi.clientHeight),
        qt(gi),
        to)
      )
    }
    const xn = typeof window < 'u',
      Et = xn && document.dir === 'rtl',
      Vn = xn && 'ontouchstart' in window,
      _i = xn && window.PointerEvent,
      rn = _i ? 'pointerdown' : Vn ? 'touchstart' : 'mousedown',
      qo = _i ? 'pointermove' : Vn ? 'touchmove' : 'mousemove',
      En = _i ? 'pointerup' : Vn ? 'touchend' : 'mouseup',
      bi = _i ? 'pointerenter' : Vn ? '' : 'mouseenter',
      no = _i ? 'pointerleave' : Vn ? '' : 'mouseleave',
      Yo = _i ? 'pointercancel' : 'touchcancel',
      Nt = {
        reads: [],
        writes: [],
        read(n) {
          return this.reads.push(n), or(), n
        },
        write(n) {
          return this.writes.push(n), or(), n
        },
        clear(n) {
          hl(this.reads, n), hl(this.writes, n)
        },
        flush: ir,
      }
    function ir(n) {
      ul(Nt.reads),
        ul(Nt.writes.splice(0)),
        (Nt.scheduled = !1),
        (Nt.reads.length || Nt.writes.length) && or(n + 1)
    }
    const u1 = 4
    function or(n) {
      Nt.scheduled ||
        ((Nt.scheduled = !0),
        n && n < u1 ? Promise.resolve().then(() => ir(n)) : requestAnimationFrame(() => ir(1)))
    }
    function ul(n) {
      let r
      for (; (r = n.shift()); )
        try {
          r()
        } catch (l) {
          console.error(l)
        }
    }
    function hl(n, r) {
      const l = n.indexOf(r)
      return ~l && n.splice(l, 1)
    }
    function sr() {}
    sr.prototype = {
      positions: [],
      init() {
        this.positions = []
        let n
        ;(this.unbind = Ue(document, 'mousemove', (r) => (n = pi(r)))),
          (this.interval = setInterval(() => {
            n && (this.positions.push(n), this.positions.length > 5 && this.positions.shift())
          }, 50))
      },
      cancel() {
        var n
        ;(n = this.unbind) == null || n.call(this), clearInterval(this.interval)
      },
      movesTo(n) {
        if (this.positions.length < 2) return !1
        const r = n.getBoundingClientRect(),
          { left: l, right: d, top: _, bottom: k } = r,
          [C] = this.positions,
          P = Ce(this.positions),
          H = [C, P]
        return Le(P, r)
          ? !1
          : [
              [
                { x: l, y: _ },
                { x: d, y: k },
              ],
              [
                { x: l, y: k },
                { x: d, y: _ },
              ],
            ].some((J) => {
              const fe = h1(H, J)
              return fe && Le(fe, r)
            })
      },
    }
    function h1([{ x: n, y: r }, { x: l, y: d }], [{ x: _, y: k }, { x: C, y: P }]) {
      const H = (P - k) * (l - n) - (C - _) * (d - r)
      if (H === 0) return !1
      const q = ((C - _) * (r - k) - (P - k) * (n - _)) / H
      return q < 0 ? !1 : { x: n + q * (l - n), y: r + q * (d - r) }
    }
    function fl(n, r, l = {}, { intersecting: d = !0 } = {}) {
      const _ = new IntersectionObserver(
        d
          ? (k, C) => {
              k.some((P) => P.isIntersecting) && r(k, C)
            }
          : r,
        l,
      )
      for (const k of ie(n)) _.observe(k)
      return _
    }
    const f1 = xn && window.ResizeObserver
    function io(n, r, l = { box: 'border-box' }) {
      if (f1) return pl(ResizeObserver, n, r, l)
      const d = [Ue(window, 'load resize', r), Ue(document, 'loadedmetadata load', r, !0)]
      return { disconnect: () => d.map((_) => _()) }
    }
    function rr(n) {
      return { disconnect: Ue([window, window.visualViewport], 'resize', n) }
    }
    function dl(n, r, l) {
      return pl(MutationObserver, n, r, l)
    }
    function pl(n, r, l, d) {
      const _ = new n(l)
      for (const k of ie(r)) _.observe(k, d)
      return _
    }
    function ml(n) {
      Zo(n) && ar(n, { func: 'playVideo', method: 'play' }), Ko(n) && n.play()
    }
    function gl(n) {
      Zo(n) && ar(n, { func: 'pauseVideo', method: 'pause' }), Ko(n) && n.pause()
    }
    function _l(n) {
      Zo(n) && ar(n, { func: 'mute', method: 'setVolume', value: 0 }), Ko(n) && (n.muted = !0)
    }
    function bl(n) {
      return Ko(n) || Zo(n)
    }
    function Ko(n) {
      return xt(n, 'video')
    }
    function Zo(n) {
      return xt(n, 'iframe') && (vl(n) || yl(n))
    }
    function vl(n) {
      return !!n.src.match(
        /\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/,
      )
    }
    function yl(n) {
      return !!n.src.match(/vimeo\.com\/video\/.*/)
    }
    async function ar(n, r) {
      await p1(n), wl(n, r)
    }
    function wl(n, r) {
      n.contentWindow.postMessage(JSON.stringify({ event: 'command', ...r }), '*')
    }
    const lr = '_ukPlayer'
    let d1 = 0
    function p1(n) {
      if (n[lr]) return n[lr]
      const r = vl(n),
        l = yl(n),
        d = ++d1
      let _
      return (n[lr] = new Promise((k) => {
        r &&
          bt(n, 'load', () => {
            const C = () => wl(n, { event: 'listening', id: d })
            ;(_ = setInterval(C, 100)), C()
          }),
          bt(window, 'message', k, !1, ({ data: C }) => {
            try {
              return (
                (C = JSON.parse(C)),
                (r && (C == null ? void 0 : C.id) === d && C.event === 'onReady') ||
                  (l && Number(C == null ? void 0 : C.player_id) === d)
              )
            } catch (P) {}
          }),
          (n.src = ''
            .concat(n.src)
            .concat(v(n.src, '?') ? '&' : '?')
            .concat(r ? 'enablejsapi=1' : 'api=1&player_id='.concat(d)))
      }).then(() => clearInterval(_)))
    }
    function m1(n, r = 0, l = 0) {
      return _t(n)
        ? Be(
            ...Gn(n)
              .map((d) => {
                const { top: _, left: k, bottom: C, right: P } = Yt(d)
                return { top: _ - r, left: k - l, bottom: C + r, right: P + l }
              })
              .concat(Xe(n)),
          )
        : !1
    }
    function kl(n, { offset: r = 0 } = {}) {
      const l = _t(n) ? vi(n, !1, ['hidden']) : []
      return l.reduce(
        (C, P, H) => {
          const { scrollTop: q, scrollHeight: J, offsetHeight: fe } = P,
            pe = Yt(P),
            Se = J - pe.height,
            { height: We, top: Je } = l[H - 1] ? Yt(l[H - 1]) : Xe(n)
          let at = Math.ceil(Je - pe.top - r + q)
          return (
            r > 0 && fe < We + r ? (at += r) : (r = 0),
            at > Se ? ((r -= at - Se), (at = Se)) : at < 0 && ((r -= at), (at = 0)),
            () => d(P, at - q, n, Se).then(C)
          )
        },
        () => Promise.resolve(),
      )()
      function d(C, P, H, q) {
        return new Promise((J) => {
          const fe = C.scrollTop,
            pe = _(Math.abs(P)),
            Se = Date.now(),
            We = fr(C) === C,
            Je = Xe(H).top + (We ? 0 : fe)
          let at = 0,
            hn = 15
          ;(function bo() {
            const ms = k(me((Date.now() - Se) / pe))
            let Qt = 0
            if (l[0] === C && fe + P < q) {
              Qt = Xe(H).top + (We ? 0 : C.scrollTop) - Je
              const Ei = ur(H)
              Qt -= Ei ? Xe(Ei).height : 0
            }
            ;(C.scrollTop = Math[P + Qt > 0 ? 'max' : 'min'](C.scrollTop, fe + (P + Qt) * ms)),
              ms === 1 && (at === Qt || !hn--) ? J() : ((at = Qt), requestAnimationFrame(bo))
          })()
        })
      }
      function _(C) {
        return 40 * Math.pow(C, 0.375)
      }
      function k(C) {
        return 0.5 * (1 - Math.cos(Math.PI * C))
      }
    }
    function cr(n, r = 0, l = 0) {
      if (!_t(n)) return 0
      const d = un(n, !0),
        { scrollHeight: _, scrollTop: k } = d,
        { height: C } = Yt(d),
        P = _ - C,
        H = Wn(n)[0] - Wn(d)[0],
        q = Math.max(0, H - C + r),
        J = Math.min(P, H + n.offsetHeight - l)
      return me((k - q) / (J - q))
    }
    function vi(n, r = !1, l = []) {
      const d = fr(n)
      let _ = Dn(n).reverse()
      _ = _.slice(_.indexOf(d) + 1)
      const k = w(_, (C) => X(C, 'position') === 'fixed')
      return (
        ~k && (_ = _.slice(k)),
        [d]
          .concat(
            _.filter(
              (C) =>
                X(C, 'overflow')
                  .split(' ')
                  .some((P) => v(['auto', 'scroll', ...l], P)) &&
                (!r || C.scrollHeight > Yt(C).height),
            ),
          )
          .reverse()
      )
    }
    function un(...n) {
      return vi(...n)[0]
    }
    function Gn(n) {
      return vi(n, !1, ['hidden', 'clip'])
    }
    function Yt(n) {
      const r = ue(n),
        {
          visualViewport: l,
          document: { documentElement: d },
        } = r
      let _ = n === fr(n) ? r : n
      if (F(_) && l) {
        let { height: C, width: P, scale: H, pageTop: q, pageLeft: J } = l
        return (
          (C = Math.round(C * H)),
          (P = Math.round(P * H)),
          { height: C, width: P, top: q, left: J, bottom: q + C, right: J + P }
        )
      }
      let k = Xe(_)
      if (X(_, 'display') === 'inline') return k
      for (let [C, P, H, q] of [
        ['width', 'x', 'left', 'right'],
        ['height', 'y', 'top', 'bottom'],
      ]) {
        F(_) ? (_ = d) : (k[H] += I(X(_, 'border-'.concat(H, '-width'))))
        const J = k[C] % 1
        ;(k[C] = k[P] = _['client'.concat(p(C))] - (J ? (J < 0.5 ? -J : 1 - J) : 0)),
          (k[q] = k[C] + k[H])
      }
      return k
    }
    function ur(n) {
      return n.ownerDocument.elementsFromPoint(Xe(n).left, 0).find(
        (r) =>
          !r.contains(n) &&
          ((hr(r, 'fixed') &&
            $l(
              Dn(n)
                .reverse()
                .find((l) => !l.contains(r) && !hr(l, 'static')),
            ) < $l(r)) ||
            (hr(r, 'sticky') && it(r).contains(n))),
      )
    }
    function $l(n) {
      return I(X(n, 'zIndex'))
    }
    function hr(n, r) {
      return X(n, 'position') === r
    }
    function fr(n) {
      return ue(n).document.scrollingElement
    }
    const Kt = [
      ['width', 'x', 'left', 'right'],
      ['height', 'y', 'top', 'bottom'],
    ]
    function Cl(n, r, l) {
      ;(l = {
        attach: { element: ['left', 'top'], target: ['left', 'top'], ...l.attach },
        offset: [0, 0],
        placement: [],
        ...l,
      }),
        $(r) || (r = [r, r]),
        Xe(n, xl(n, r, l))
    }
    function xl(n, r, l) {
      const d = El(n, r, l),
        { boundary: _, viewportOffset: k = 0, placement: C } = l
      let P = d
      for (const [H, [q, , J, fe]] of Object.entries(Kt)) {
        const pe = g1(n, r[H], k, _, H)
        if (Xo(d, pe, H)) continue
        let Se = 0
        if (C[H] === 'flip') {
          const We = l.attach.target[H]
          if ((We === fe && d[fe] <= pe[fe]) || (We === J && d[J] >= pe[J])) continue
          Se = b1(n, r, l, H)[J] - d[J]
          const Je = _1(n, r[H], k, H)
          if (!Xo(dr(d, Se, H), Je, H)) {
            if (Xo(d, Je, H)) continue
            if (l.recursion) return !1
            const at = v1(n, r, l)
            if (at && Xo(at, Je, 1 - H)) return at
            continue
          }
        } else if (C[H] === 'shift') {
          const We = Xe(r[H]),
            { offset: Je } = l
          Se = me(me(d[J], pe[J], pe[fe] - d[q]), We[J] - d[q] + Je[H], We[fe] - Je[H]) - d[J]
        }
        P = dr(P, Se, H)
      }
      return P
    }
    function El(n, r, l) {
      let { attach: d, offset: _ } = {
          attach: { element: ['left', 'top'], target: ['left', 'top'], ...l.attach },
          offset: [0, 0],
          ...l,
        },
        k = Xe(n)
      for (const [C, [P, , H, q]] of Object.entries(Kt)) {
        const J = d.target[C] === d.element[C] ? Yt(r[C]) : Xe(r[C])
        k = dr(k, J[H] - k[H] + Sl(d.target[C], q, J[P]) - Sl(d.element[C], q, k[P]) + +_[C], C)
      }
      return k
    }
    function dr(n, r, l) {
      const [, d, _, k] = Kt[l],
        C = { ...n }
      return (C[_] = n[d] = n[_] + r), (C[k] += r), C
    }
    function Sl(n, r, l) {
      return n === 'center' ? l / 2 : n === r ? l : 0
    }
    function g1(n, r, l, d, _) {
      let k = Ll(...Tl(n, r).map(Yt))
      return l && ((k[Kt[_][2]] += l), (k[Kt[_][3]] -= l)), d && (k = Ll(k, Xe($(d) ? d[_] : d))), k
    }
    function _1(n, r, l, d) {
      const [_, k, C, P] = Kt[d],
        [H] = Tl(n, r),
        q = Yt(H)
      return (
        ['auto', 'scroll'].includes(X(H, 'overflow-'.concat(k))) &&
          ((q[C] -= H['scroll'.concat(p(C))]), (q[P] = q[C] + H['scroll'.concat(p(_))])),
        (q[C] += l),
        (q[P] -= l),
        q
      )
    }
    function Tl(n, r) {
      return Gn(r).filter((l) => l.contains(n))
    }
    function Ll(...n) {
      let r = {}
      for (const l of n)
        for (const [, , d, _] of Kt)
          (r[d] = Math.max(r[d] || 0, l[d])), (r[_] = Math.min(...[r[_], l[_]].filter(Boolean)))
      return r
    }
    function Xo(n, r, l) {
      const [, , d, _] = Kt[l]
      return n[d] >= r[d] && n[_] <= r[_]
    }
    function b1(n, r, { offset: l, attach: d }, _) {
      return El(n, r, {
        attach: { element: Al(d.element, _), target: Al(d.target, _) },
        offset: y1(l, _),
      })
    }
    function v1(n, r, l) {
      return xl(n, r, {
        ...l,
        attach: {
          element: l.attach.element.map(Ml).reverse(),
          target: l.attach.target.map(Ml).reverse(),
        },
        offset: l.offset.reverse(),
        placement: l.placement.reverse(),
        recursion: !0,
      })
    }
    function Al(n, r) {
      const l = [...n],
        d = Kt[r].indexOf(n[r])
      return ~d && (l[r] = Kt[r][1 - (d % 2) + 2]), l
    }
    function Ml(n) {
      for (let r = 0; r < Kt.length; r++) {
        const l = Kt[r].indexOf(n)
        if (~l) return Kt[1 - r][(l % 2) + 2]
      }
    }
    function y1(n, r) {
      return (n = [...n]), (n[r] *= -1), n
    }
    var w1 = Object.freeze({
        __proto__: null,
        $: He,
        $$: ut,
        Animation: Cn,
        Dimensions: Ve,
        MouseTracker: sr,
        Transition: rt,
        addClass: ve,
        after: Wo,
        append: mt,
        apply: _n,
        assign: S,
        attr: he,
        before: Fo,
        boxModelAdjust: mi,
        camelize: f,
        children: ct,
        clamp: me,
        closest: Qa,
        createEvent: Hn,
        css: X,
        data: Ae,
        dimensions: Fe,
        each: xe,
        empty: er,
        endsWith: b,
        escape: Ys,
        fastdom: Nt,
        filter: Ki,
        find: qs,
        findAll: Xi,
        findIndex: w,
        flipPosition: jo,
        fragment: Un,
        getCoveringElement: ur,
        getEventPos: pi,
        getIndex: Ge,
        getTargetedElement: js,
        hasAttr: nt,
        hasClass: Oe,
        hasOwn: s,
        hasTouch: Vn,
        height: Ft,
        html: zn,
        hyphenate: c,
        inBrowser: xn,
        includes: v,
        index: fi,
        intersectRect: Be,
        isArray: $,
        isBoolean: Y,
        isDocument: R,
        isElement: G,
        isEmpty: K,
        isEqual: le,
        isFocusable: Ho,
        isFunction: L,
        isInView: m1,
        isInput: Gs,
        isNode: V,
        isNumber: W,
        isNumeric: te,
        isObject: N,
        isPlainObject: B,
        isRtl: Et,
        isSameSiteAnchor: di,
        isString: z,
        isTag: xt,
        isTouch: gn,
        isUndefined: ee,
        isVideo: bl,
        isVisible: _t,
        isVoidElement: Vs,
        isWindow: F,
        last: Ce,
        matches: st,
        memoize: ht,
        mute: _l,
        noop: de,
        observeIntersection: fl,
        observeMutation: dl,
        observeResize: io,
        observeViewportResize: rr,
        off: Rn,
        offset: Xe,
        offsetPosition: Wn,
        offsetViewport: Yt,
        on: Ue,
        once: bt,
        overflowParents: Gn,
        parent: it,
        parents: Dn,
        pause: gl,
        pick: $e,
        play: ml,
        pointInRect: Le,
        pointerCancel: Yo,
        pointerDown: rn,
        pointerEnter: bi,
        pointerLeave: no,
        pointerMove: qo,
        pointerUp: En,
        position: nr,
        positionAt: Cl,
        prepend: n1,
        propName: zo,
        query: Vt,
        queryAll: Zi,
        ready: t1,
        remove: qt,
        removeAttr: Re,
        removeClass: Ne,
        removeClasses: hi,
        replaceClass: Ct,
        scrollIntoView: kl,
        scrollParent: un,
        scrollParents: vi,
        scrolledOver: cr,
        selFocusable: Yi,
        selInput: qi,
        sortBy: Me,
        startsWith: g,
        sumBy: ke,
        swap: _e,
        toArray: x,
        toBoolean: ne,
        toEventTargets: Zs,
        toFloat: I,
        toNode: Q,
        toNodes: ie,
        toNumber: Z,
        toPx: Dt,
        toWindow: ue,
        toggleClass: ze,
        trigger: Pe,
        ucfirst: p,
        uniqueBy: be,
        unwrap: Qi,
        width: eo,
        within: el,
        wrapAll: Go,
        wrapInner: tr,
      }),
      Gt = {
        connected() {
          ve(this.$el, this.$options.id)
        },
      }
    const k1 = ['days', 'hours', 'minutes', 'seconds']
    var $1 = {
      mixins: [Gt],
      props: { date: String, clsWrapper: String, role: String },
      data: { date: '', clsWrapper: '.uk-countdown-%unit%', role: 'timer' },
      connected() {
        he(this.$el, 'role', this.role),
          (this.date = I(Date.parse(this.$props.date))),
          (this.end = !1),
          this.start()
      },
      disconnected() {
        this.stop()
      },
      events: {
        name: 'visibilitychange',
        el() {
          return document
        },
        handler() {
          document.hidden ? this.stop() : this.start()
        },
      },
      methods: {
        start() {
          this.stop(),
            this.update(),
            this.timer ||
              (Pe(this.$el, 'countdownstart'), (this.timer = setInterval(this.update, 1e3)))
        },
        stop() {
          this.timer &&
            (clearInterval(this.timer), Pe(this.$el, 'countdownstop'), (this.timer = null))
        },
        update() {
          const n = C1(this.date)
          n.total || (this.stop(), this.end || (Pe(this.$el, 'countdownend'), (this.end = !0)))
          for (const r of k1) {
            const l = He(this.clsWrapper.replace('%unit%', r), this.$el)
            if (!l) continue
            let d = String(Math.trunc(n[r]))
            ;(d = d.length < 2 ? '0'.concat(d) : d),
              l.textContent !== d &&
                ((d = d.split('')),
                d.length !== l.children.length && zn(l, d.map(() => '<span></span>').join('')),
                d.forEach((_, k) => (l.children[k].textContent = _)))
          }
        },
      },
    }
    function C1(n) {
      const r = Math.max(0, n - Date.now()) / 1e3
      return {
        total: r,
        seconds: r % 60,
        minutes: (r / 60) % 60,
        hours: (r / 60 / 60) % 24,
        days: r / 60 / 60 / 24,
      }
    }
    const St = {}
    ;(St.events =
      St.watch =
      St.observe =
      St.created =
      St.beforeConnect =
      St.connected =
      St.beforeDisconnect =
      St.disconnected =
      St.destroy =
        pr),
      (St.args = function (n, r) {
        return r !== !1 && pr(r || n)
      }),
      (St.update = function (n, r) {
        return Me(pr(n, L(r) ? { read: r } : r), 'order')
      }),
      (St.props = function (n, r) {
        if ($(r)) {
          const l = {}
          for (const d of r) l[d] = String
          r = l
        }
        return St.methods(n, r)
      }),
      (St.computed = St.methods =
        function (n, r) {
          return r ? (n ? { ...n, ...r } : r) : n
        }),
      (St.i18n = St.data =
        function (n, r, l) {
          return l
            ? Pl(n, r, l)
            : r
              ? n
                ? function (d) {
                    return Pl(n, r, d)
                  }
                : r
              : n
        })
    function Pl(n, r, l) {
      return St.computed(L(n) ? n.call(l, l) : n, L(r) ? r.call(l, l) : r)
    }
    function pr(n, r) {
      return (n = n && !$(n) ? [n] : n), r ? (n ? n.concat(r) : $(r) ? r : [r]) : n
    }
    function x1(n, r) {
      return ee(r) ? n : r
    }
    function oo(n, r, l) {
      const d = {}
      if ((L(r) && (r = r.options), r.extends && (n = oo(n, r.extends, l)), r.mixins))
        for (const k of r.mixins) n = oo(n, k, l)
      for (const k in n) _(k)
      for (const k in r) s(n, k) || _(k)
      function _(k) {
        d[k] = (St[k] || x1)(n[k], r[k], l)
      }
      return d
    }
    function yi(n, r = []) {
      try {
        return n
          ? g(n, '{')
            ? JSON.parse(n)
            : r.length && !v(n, ':')
              ? { [r[0]]: n }
              : n.split(';').reduce((l, d) => {
                  const [_, k] = d.split(/:(.*)/)
                  return _ && !ee(k) && (l[_.trim()] = k.trim()), l
                }, {})
          : {}
      } catch (l) {
        return {}
      }
    }
    function mr(n, r) {
      return n === Boolean
        ? ne(r)
        : n === Number
          ? Z(r)
          : n === 'list'
            ? S1(r)
            : n === Object && z(r)
              ? yi(r)
              : n
                ? n(r)
                : r
    }
    const E1 = /,(?![^(]*\))/
    function S1(n) {
      return $(n) ? n : z(n) ? n.split(E1).map((r) => (te(r) ? Z(r) : ne(r.trim()))) : [n]
    }
    function T1(n) {
      ;(n._data = {}), (n._updates = [...(n.$options.update || [])])
    }
    function L1(n, r) {
      n._updates.unshift(r)
    }
    function A1(n) {
      delete n._data
    }
    function so(n, r = 'update') {
      n._connected &&
        n._updates.length &&
        (n._queued ||
          ((n._queued = new Set()),
          Nt.read(() => {
            n._connected && M1(n, n._queued), delete n._queued
          })),
        n._queued.add(r.type || r))
    }
    function M1(n, r) {
      for (const { read: l, write: d, events: _ = [] } of n._updates) {
        if (!r.has('update') && !_.some((C) => r.has(C))) continue
        let k
        l && ((k = l.call(n, n._data, r)), k && B(k) && S(n._data, k)),
          d &&
            k !== !1 &&
            Nt.write(() => {
              n._connected && d.call(n, n._data, r)
            })
      }
    }
    function an(n) {
      return ao(io, n, 'resize')
    }
    function wi(n) {
      return ao(fl, n)
    }
    function gr(n) {
      return ao(dl, n)
    }
    function ro(n = {}) {
      return wi({
        handler: function (r, l) {
          const { targets: d = this.$el, preload: _ = 5 } = n
          for (const k of ie(L(d) ? d(this) : d))
            ut('[loading="lazy"]', k)
              .slice(0, _ - 1)
              .forEach((C) => Re(C, 'loading'))
          for (const k of r.filter(({ isIntersecting: C }) => C).map(({ target: C }) => C))
            l.unobserve(k)
        },
        ...n,
      })
    }
    function _r(n) {
      return ao((r, l) => rr(l), n)
    }
    function Jo(n) {
      return ao((r, l) => ({ disconnect: Ue(I1(r), 'scroll', l, { passive: !0 }) }), n, 'scroll')
    }
    function Il(n) {
      return {
        observe(r, l) {
          return { observe: de, unobserve: de, disconnect: Ue(r, rn, l, { passive: !0 }) }
        },
        handler(r) {
          if (!gn(r)) return
          const l = pi(r),
            d = 'tagName' in r.target ? r.target : it(r.target)
          bt(document, ''.concat(En, ' ').concat(Yo, ' scroll'), (_) => {
            const { x: k, y: C } = pi(_)
            ;((_.type !== 'scroll' && d && k && Math.abs(l.x - k) > 100) ||
              (C && Math.abs(l.y - C) > 100)) &&
              setTimeout(() => {
                Pe(d, 'swipe'), Pe(d, 'swipe'.concat(P1(l.x, l.y, k, C)))
              })
          })
        },
        ...n,
      }
    }
    function ao(n, r, l) {
      return {
        observe: n,
        handler() {
          so(this, l)
        },
        ...r,
      }
    }
    function P1(n, r, l, d) {
      return Math.abs(n - l) >= Math.abs(r - d)
        ? n - l > 0
          ? 'Left'
          : 'Right'
        : r - d > 0
          ? 'Up'
          : 'Down'
    }
    function I1(n) {
      return ie(n).map((r) => {
        const { ownerDocument: l } = r,
          d = un(r, !0)
        return d === l.scrollingElement ? l : d
      })
    }
    var Nl = {
      props: { margin: String, firstColumn: Boolean },
      data: { margin: 'uk-margin-small-top', firstColumn: 'uk-first-column' },
      observe: [
        gr({ options: { childList: !0, attributes: !0, attributeFilter: ['style'] } }),
        an({ target: ({ $el: n }) => [n, ...ct(n)] }),
      ],
      update: {
        read() {
          return { rows: br(x(this.$el.children)) }
        },
        write({ rows: n }) {
          for (const r of n)
            for (const l of r)
              ze(l, this.margin, n[0] !== r),
                ze(l, this.firstColumn, r[Et ? r.length - 1 : 0] === l)
        },
        events: ['resize'],
      },
    }
    function br(n) {
      const r = [[]],
        l = n.some((d, _) => _ && n[_ - 1].offsetParent !== d.offsetParent)
      for (const d of n) {
        if (!_t(d)) continue
        const _ = vr(d, l)
        for (let k = r.length - 1; k >= 0; k--) {
          const C = r[k]
          if (!C[0]) {
            C.push(d)
            break
          }
          const P = vr(C[0], l)
          if (_.top >= P.bottom - 1 && _.top !== P.top) {
            r.push([d])
            break
          }
          if (_.bottom - 1 > P.top || _.top === P.top) {
            let H = C.length - 1
            for (; H >= 0; H--) {
              const q = vr(C[H], l)
              if (_.left >= q.left) break
            }
            C.splice(H + 1, 0, d)
            break
          }
          if (k === 0) {
            r.unshift([d])
            break
          }
        }
      }
      return r
    }
    function vr(n, r = !1) {
      let { offsetTop: l, offsetLeft: d, offsetHeight: _, offsetWidth: k } = n
      return r && ([l, d] = Wn(n)), { top: l, left: d, bottom: l + _, right: d + k }
    }
    const yr = 'uk-transition-leave',
      wr = 'uk-transition-enter'
    function Ol(n, r, l, d = 0) {
      const _ = Qo(r, !0),
        k = { opacity: 1 },
        C = { opacity: 0 },
        P = (J) => () => (_ === Qo(r) ? J() : Promise.reject()),
        H = P(async () => {
          ve(r, yr),
            await Promise.all(
              Dl(r).map(
                (J, fe) =>
                  new Promise((pe) =>
                    setTimeout(() => rt.start(J, C, l / 2, 'ease').then(pe), fe * d),
                  ),
              ),
            ),
            Ne(r, yr)
        }),
        q = P(async () => {
          const J = Ft(r)
          ve(r, wr), n(), X(ct(r), { opacity: 0 }), await N1()
          const fe = ct(r),
            pe = Ft(r)
          X(r, 'alignContent', 'flex-start'), Ft(r, J)
          const Se = Dl(r)
          X(fe, C)
          const We = Se.map(async (Je, at) => {
            await O1(at * d), await rt.start(Je, k, l / 2, 'ease')
          })
          J !== pe && We.push(rt.start(r, { height: pe }, l / 2 + Se.length * d, 'ease')),
            await Promise.all(We).then(() => {
              Ne(r, wr),
                _ === Qo(r) &&
                  (X(r, { height: '', alignContent: '' }),
                  X(fe, { opacity: '' }),
                  delete r.dataset.transition)
            })
        })
      return Oe(r, yr) ? Bl(r).then(q) : Oe(r, wr) ? Bl(r).then(H).then(q) : H().then(q)
    }
    function Qo(n, r) {
      return r && (n.dataset.transition = 1 + Qo(n)), Z(n.dataset.transition) || 0
    }
    function Bl(n) {
      return Promise.all(
        ct(n)
          .filter(rt.inProgress)
          .map((r) => new Promise((l) => bt(r, 'transitionend transitioncanceled', l))),
      )
    }
    function Dl(n) {
      return br(ct(n))
        .flat()
        .filter((r) => _t(r))
    }
    function N1() {
      return new Promise((n) => requestAnimationFrame(n))
    }
    function O1(n) {
      return new Promise((r) => setTimeout(r, n))
    }
    async function B1(n, r, l) {
      await zl()
      let d = ct(r)
      const _ = d.map((pe) => Rl(pe, !0)),
        k = { ...X(r, ['height', 'padding']), display: 'block' }
      await Promise.all(d.concat(r).map(rt.cancel)),
        n(),
        (d = d.concat(ct(r).filter((pe) => !v(d, pe)))),
        await Promise.resolve(),
        Nt.flush()
      const C = he(r, 'style'),
        P = X(r, ['height', 'padding']),
        [H, q] = D1(r, d, _),
        J = d.map((pe) => ({ style: he(pe, 'style') }))
      d.forEach((pe, Se) => q[Se] && X(pe, q[Se])), X(r, k), Pe(r, 'scroll'), Nt.flush(), await zl()
      const fe = d
        .map((pe, Se) => it(pe) === r && rt.start(pe, H[Se], l, 'ease'))
        .concat(rt.start(r, P, l, 'ease'))
      try {
        await Promise.all(fe),
          d.forEach((pe, Se) => {
            he(pe, J[Se]), it(pe) === r && X(pe, 'display', H[Se].opacity === 0 ? 'none' : '')
          }),
          he(r, 'style', C)
      } catch (pe) {
        he(d, 'style', ''), R1(r, k)
      }
    }
    function Rl(n, r) {
      const l = X(n, 'zIndex')
      return _t(n)
        ? {
            display: '',
            opacity: r ? X(n, 'opacity') : '0',
            pointerEvents: 'none',
            position: 'absolute',
            zIndex: l === 'auto' ? fi(n) : l,
            ...Hl(n),
          }
        : !1
    }
    function D1(n, r, l) {
      const d = r.map((k, C) =>
          it(k) && C in l
            ? l[C]
              ? _t(k)
                ? Hl(k)
                : { opacity: 0 }
              : { opacity: _t(k) ? 1 : 0 }
            : !1,
        ),
        _ = d.map((k, C) => {
          const P = it(r[C]) === n && (l[C] || Rl(r[C]))
          if (!P) return !1
          if (!k) delete P.opacity
          else if (!('opacity' in k)) {
            const { opacity: H } = P
            H % 1 ? (k.opacity = 1) : delete P.opacity
          }
          return P
        })
      return [d, _]
    }
    function R1(n, r) {
      for (const l in r) X(n, l, '')
    }
    function Hl(n) {
      const { height: r, width: l } = Xe(n)
      return { height: r, width: l, transform: '', ...nr(n), ...X(n, ['marginTop', 'marginLeft']) }
    }
    function zl() {
      return new Promise((n) => requestAnimationFrame(n))
    }
    var Ul = {
      props: { duration: Number, animation: Boolean },
      data: { duration: 150, animation: 'slide' },
      methods: {
        animate(n, r = this.$el) {
          const l = this.animation
          return (
            l === 'fade'
              ? Ol
              : l === 'delayed-fade'
                ? (..._) => Ol(..._, 40)
                : l
                  ? B1
                  : () => (n(), Promise.resolve())
          )(n, r, this.duration).catch(de)
        },
      },
    }
    const ot = {
      TAB: 9,
      ESC: 27,
      SPACE: 32,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
    }
    var H1 = {
      mixins: [Ul],
      args: 'target',
      props: { target: String, selActive: Boolean },
      data: {
        target: '',
        selActive: !1,
        attrItem: 'uk-filter-control',
        cls: 'uk-active',
        duration: 250,
      },
      computed: {
        children: ({ target: n }, r) => ut(''.concat(n, ' > *'), r),
        toggles: ({ attrItem: n }, r) => ut('['.concat(n, '],[data-').concat(n, ']'), r),
      },
      watch: {
        toggles(n) {
          this.updateState()
          const r = ut(this.selActive, this.$el)
          for (const l of n) {
            this.selActive !== !1 && ze(l, this.cls, v(r, l))
            const d = G1(l)
            xt(d, 'a') && he(d, 'role', 'button')
          }
        },
        children(n, r) {
          r && this.updateState()
        },
      },
      events: {
        name: 'click keydown',
        delegate() {
          return '['.concat(this.attrItem, '],[data-').concat(this.attrItem, ']')
        },
        handler(n) {
          ;(n.type === 'keydown' && n.keyCode !== ot.SPACE) ||
            (n.target.closest('a,button') && (n.preventDefault(), this.apply(n.current)))
        },
      },
      methods: {
        apply(n) {
          const r = this.getState(),
            l = Wl(n, this.attrItem, this.getState())
          z1(r, l) || this.setState(l)
        },
        getState() {
          return this.toggles
            .filter((n) => Oe(n, this.cls))
            .reduce((n, r) => Wl(r, this.attrItem, n), { filter: { '': '' }, sort: [] })
        },
        async setState(n, r = !0) {
          ;(n = { filter: { '': '' }, sort: [], ...n }), Pe(this.$el, 'beforeFilter', [this, n])
          for (const l of this.toggles) ze(l, this.cls, F1(l, this.attrItem, n))
          await Promise.all(
            ut(this.target, this.$el).map((l) => {
              const d = () => {
                U1(n, l, ct(l)), this.$update(this.$el)
              }
              return r ? this.animate(d, l) : d()
            }),
          ),
            Pe(this.$el, 'afterFilter', [this])
        },
        updateState() {
          Nt.write(() => this.setState(this.getState(), !1))
        },
      },
    }
    function Fl(n, r) {
      return yi(Ae(n, r), ['filter'])
    }
    function z1(n, r) {
      return ['filter', 'sort'].every((l) => le(n[l], r[l]))
    }
    function U1(n, r, l) {
      const d = W1(n)
      l.forEach((C) => X(C, 'display', d && !st(C, d) ? 'none' : ''))
      const [_, k] = n.sort
      if (_) {
        const C = V1(l, _, k)
        le(C, l) || mt(r, C)
      }
    }
    function Wl(n, r, l) {
      const { filter: d, group: _, sort: k, order: C = 'asc' } = Fl(n, r)
      return (
        (d || ee(k)) &&
          (_
            ? d
              ? (delete l.filter[''], (l.filter[_] = d))
              : (delete l.filter[_],
                (K(l.filter) || '' in l.filter) && (l.filter = { '': d || '' }))
            : (l.filter = { '': d || '' })),
        ee(k) || (l.sort = [k, C]),
        l
      )
    }
    function F1(n, r, { filter: l = { '': '' }, sort: [d, _] }) {
      const { filter: k = '', group: C = '', sort: P, order: H = 'asc' } = Fl(n, r)
      return ee(P) ? (C in l && k === l[C]) || (!k && C && !(C in l) && !l['']) : d === P && _ === H
    }
    function W1({ filter: n }) {
      let r = ''
      return xe(n, (l) => (r += l || '')), r
    }
    function V1(n, r, l) {
      return [...n].sort(
        (d, _) => Ae(d, r).localeCompare(Ae(_, r), void 0, { numeric: !0 }) * (l === 'asc' || -1),
      )
    }
    function G1(n) {
      return He('a,button', n) || n
    }
    var lo = {
      props: { container: Boolean },
      data: { container: !0 },
      computed: {
        container({ container: n }) {
          return (n === !0 && this.$container) || (n && He(n))
        },
      },
    }
    let kr
    function Vl(n) {
      const r = Ue(
        n,
        'touchmove',
        (d) => {
          if (d.targetTouches.length !== 1 || st(d.target, 'input[type="range"')) return
          let { scrollHeight: _, clientHeight: k } = un(d.target)
          k >= _ && d.cancelable && d.preventDefault()
        },
        { passive: !1 },
      )
      if (kr) return r
      kr = !0
      const { scrollingElement: l } = document
      return (
        X(l, {
          overflowY: CSS.supports('overflow', 'clip') ? 'clip' : 'hidden',
          touchAction: 'none',
          paddingRight: eo(window) - l.clientWidth || '',
        }),
        () => {
          ;(kr = !1), r(), X(l, { overflowY: '', touchAction: '', paddingRight: '' })
        }
      )
    }
    var jn = {
      props: {
        cls: Boolean,
        animation: 'list',
        duration: Number,
        velocity: Number,
        origin: String,
        transition: String,
      },
      data: {
        cls: !1,
        animation: [!1],
        duration: 200,
        velocity: 0.2,
        origin: !1,
        transition: 'ease',
        clsEnter: 'uk-togglabe-enter',
        clsLeave: 'uk-togglabe-leave',
      },
      computed: {
        hasAnimation: ({ animation: n }) => !!n[0],
        hasTransition: ({ animation: n }) => ['slide', 'reveal'].some((r) => g(n[0], r)),
      },
      methods: {
        async toggleElement(n, r, l) {
          try {
            return (
              await Promise.all(
                ie(n).map((d) => {
                  const _ = Y(r) ? r : !this.isToggled(d)
                  if (!Pe(d, 'before'.concat(_ ? 'show' : 'hide'), [this])) return Promise.reject()
                  const k = (
                      L(l) ? l : l === !1 || !this.hasAnimation ? j1 : this.hasTransition ? q1 : Y1
                    )(d, _, this),
                    C = _ ? this.clsEnter : this.clsLeave
                  ve(d, C), Pe(d, _ ? 'show' : 'hide', [this])
                  const P = () => {
                    Ne(d, C), Pe(d, _ ? 'shown' : 'hidden', [this])
                  }
                  return k ? k.then(P, () => (Ne(d, C), Promise.reject())) : P()
                }),
              ),
              !0
            )
          } catch (d) {
            return !1
          }
        },
        isToggled(n = this.$el) {
          return (
            (n = Q(n)),
            Oe(n, this.clsEnter)
              ? !0
              : Oe(n, this.clsLeave)
                ? !1
                : this.cls
                  ? Oe(n, this.cls.split(' ')[0])
                  : _t(n)
          )
        },
        _toggle(n, r) {
          if (!n) return
          r = !!r
          let l
          this.cls
            ? ((l = v(this.cls, ' ') || r !== Oe(n, this.cls)),
              l && ze(n, this.cls, v(this.cls, ' ') ? void 0 : r))
            : ((l = r === n.hidden), l && (n.hidden = !r)),
            ut('[autofocus]', n).some((d) => (_t(d) ? d.focus() || !0 : d.blur())),
            l && Pe(n, 'toggled', [r, this])
        },
      },
    }
    function j1(n, r, { _toggle: l }) {
      return Cn.cancel(n), rt.cancel(n), l(n, r)
    }
    async function q1(n, r, { animation: l, duration: d, velocity: _, transition: k, _toggle: C }) {
      var P
      const [H = 'reveal', q = 'top'] = ((P = l[0]) == null ? void 0 : P.split('-')) || [],
        J = [
          ['left', 'right'],
          ['top', 'bottom'],
        ],
        fe = J[v(J[0], q) ? 0 : 1],
        pe = fe[1] === q,
        We = ['width', 'height'][J.indexOf(fe)],
        Je = 'margin-'.concat(fe[0]),
        at = 'margin-'.concat(q)
      let hn = Fe(n)[We]
      const bo = rt.inProgress(n)
      await rt.cancel(n), r && C(n, !0)
      const ms = Object.fromEntries(
          [
            'padding',
            'border',
            'width',
            'height',
            'minWidth',
            'minHeight',
            'overflowY',
            'overflowX',
            Je,
            at,
          ].map((ru) => [ru, n.style[ru]]),
        ),
        Qt = Fe(n),
        Ei = I(X(n, Je)),
        iu = I(X(n, at)),
        Qn = Qt[We] + iu
      !bo && !r && (hn += iu)
      const [gs] = tr(n, '<div>')
      X(gs, {
        boxSizing: 'border-box',
        height: Qt.height,
        width: Qt.width,
        ...X(n, [
          'overflow',
          'padding',
          'borderTop',
          'borderRight',
          'borderBottom',
          'borderLeft',
          'borderImage',
          at,
        ]),
      }),
        X(n, {
          padding: 0,
          border: 0,
          minWidth: 0,
          minHeight: 0,
          [at]: 0,
          width: Qt.width,
          height: Qt.height,
          overflow: 'hidden',
          [We]: hn,
        })
      const ou = hn / Qn
      d = (_ * Qn + d) * (r ? 1 - ou : ou)
      const su = { [We]: r ? Qn : 0 }
      pe && (X(n, Je, Qn - hn + Ei), (su[Je] = r ? Ei : Qn + Ei)),
        !pe ^ (H === 'reveal') && (X(gs, Je, -Qn + hn), rt.start(gs, { [Je]: r ? 0 : -Qn }, d, k))
      try {
        await rt.start(n, su, d, k)
      } finally {
        X(n, ms), Qi(gs.firstChild), r || C(n, !1)
      }
    }
    function Y1(n, r, l) {
      const { animation: d, duration: _, _toggle: k } = l
      return r
        ? (k(n, !0), Cn.in(n, d[0], _, l.origin))
        : Cn.out(n, d[1] || d[0], _, l.origin).then(() => k(n, !1))
    }
    const jt = []
    var $r = {
      mixins: [Gt, lo, jn],
      props: {
        selPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean,
        role: String,
      },
      data: { cls: 'uk-open', escClose: !0, bgClose: !0, overlay: !0, stack: !1, role: 'dialog' },
      computed: {
        panel: ({ selPanel: n }, r) => He(n, r),
        transitionElement() {
          return this.panel
        },
        bgClose({ bgClose: n }) {
          return n && this.panel
        },
      },
      connected() {
        he(this.panel || this.$el, 'role', this.role),
          this.overlay && he(this.panel || this.$el, 'aria-modal', !0)
      },
      beforeDisconnect() {
        v(jt, this) && this.toggleElement(this.$el, !1, !1)
      },
      events: [
        {
          name: 'click',
          delegate() {
            return ''.concat(this.selClose, ',a[href*="#"]')
          },
          handler(n) {
            const { current: r, defaultPrevented: l } = n,
              { hash: d } = r
            !l && d && di(r) && !this.$el.contains(He(d))
              ? this.hide()
              : st(r, this.selClose) && (n.preventDefault(), this.hide())
          },
        },
        {
          name: 'toggle',
          self: !0,
          handler(n) {
            n.defaultPrevented ||
              (n.preventDefault(), this.isToggled() === v(jt, this) && this.toggle())
          },
        },
        {
          name: 'beforeshow',
          self: !0,
          handler(n) {
            if (v(jt, this)) return !1
            !this.stack && jt.length
              ? (Promise.all(jt.map((r) => r.hide())).then(this.show), n.preventDefault())
              : jt.push(this)
          },
        },
        {
          name: 'show',
          self: !0,
          handler() {
            this.stack && X(this.$el, 'zIndex', I(X(this.$el, 'zIndex')) + jt.length)
            const n = [
              this.overlay && Z1(this),
              this.overlay && Vl(this.$el),
              this.bgClose && X1(this),
              this.escClose && J1(this),
            ]
            bt(this.$el, 'hidden', () => n.forEach((r) => r && r()), { self: !0 }),
              ve(document.documentElement, this.clsPage)
          },
        },
        {
          name: 'shown',
          self: !0,
          handler() {
            Ho(this.$el) || he(this.$el, 'tabindex', '-1'),
              st(this.$el, ':focus-within') || this.$el.focus()
          },
        },
        {
          name: 'hidden',
          self: !0,
          handler() {
            v(jt, this) && jt.splice(jt.indexOf(this), 1),
              X(this.$el, 'zIndex', ''),
              jt.some((n) => n.clsPage === this.clsPage) ||
                Ne(document.documentElement, this.clsPage)
          },
        },
      ],
      methods: {
        toggle() {
          return this.isToggled() ? this.hide() : this.show()
        },
        show() {
          return this.container && it(this.$el) !== this.container
            ? (mt(this.container, this.$el),
              new Promise((n) => requestAnimationFrame(() => this.show().then(n))))
            : this.toggleElement(this.$el, !0, Gl)
        },
        hide() {
          return this.toggleElement(this.$el, !1, Gl)
        },
      },
    }
    function Gl(n, r, { transitionElement: l, _toggle: d }) {
      return new Promise((_, k) =>
        bt(n, 'show hide', () => {
          var C
          ;(C = n._reject) == null || C.call(n), (n._reject = k), d(n, r)
          const P = bt(
              l,
              'transitionstart',
              () => {
                bt(l, 'transitionend transitioncancel', _, { self: !0 }), clearTimeout(H)
              },
              { self: !0 },
            ),
            H = setTimeout(
              () => {
                P(), _()
              },
              K1(X(l, 'transitionDuration')),
            )
        }),
      ).then(() => delete n._reject)
    }
    function K1(n) {
      return n ? (b(n, 'ms') ? I(n) : I(n) * 1e3) : 0
    }
    function Z1(n) {
      return Ue(document, 'focusin', (r) => {
        Ce(jt) === n && !n.$el.contains(r.target) && n.$el.focus()
      })
    }
    function X1(n) {
      return Ue(document, rn, ({ target: r }) => {
        Ce(jt) !== n ||
          (n.overlay && !n.$el.contains(r)) ||
          n.panel.contains(r) ||
          bt(
            document,
            ''.concat(En, ' ').concat(Yo, ' scroll'),
            ({ defaultPrevented: l, type: d, target: _ }) => {
              !l && d === En && r === _ && n.hide()
            },
            !0,
          )
      })
    }
    function J1(n) {
      return Ue(document, 'keydown', (r) => {
        r.keyCode === 27 && Ce(jt) === n && n.hide()
      })
    }
    var Cr = {
      slide: {
        show(n) {
          return [{ transform: gt(n * -100) }, { transform: gt() }]
        },
        percent(n) {
          return co(n)
        },
        translate(n, r) {
          return [{ transform: gt(r * -100 * n) }, { transform: gt(r * 100 * (1 - n)) }]
        },
      },
    }
    function co(n) {
      return Math.abs(X(n, 'transform').split(',')[4] / n.offsetWidth)
    }
    function gt(n = 0, r = '%') {
      return (n += n ? r : ''), 'translate3d('.concat(n, ', 0, 0)')
    }
    function ki(n) {
      return 'scale3d('.concat(n, ', ').concat(n, ', 1)')
    }
    function Q1(n, r, l, { animation: d, easing: _ }) {
      const { percent: k, translate: C, show: P = de } = d,
        H = P(l)
      let q
      return {
        dir: l,
        show(J, fe = 0, pe) {
          const Se = pe ? 'linear' : _
          return (
            (J -= Math.round(J * me(fe, -1, 1))),
            this.translate(fe),
            es(r, 'itemin', { percent: fe, duration: J, timing: Se, dir: l }),
            es(n, 'itemout', { percent: 1 - fe, duration: J, timing: Se, dir: l }),
            new Promise((We) => {
              q || (q = We),
                Promise.all([rt.start(r, H[1], J, Se), rt.start(n, H[0], J, Se)]).then(() => {
                  this.reset(), q()
                }, de)
            })
          )
        },
        cancel() {
          return rt.cancel([r, n])
        },
        reset() {
          for (const J in H[0]) X([r, n], J, '')
        },
        async forward(J, fe = this.percent()) {
          return await this.cancel(), this.show(J, fe, !0)
        },
        translate(J) {
          this.reset()
          const fe = C(J, l)
          X(r, fe[1]),
            X(n, fe[0]),
            es(r, 'itemtranslatein', { percent: J, dir: l }),
            es(n, 'itemtranslateout', { percent: 1 - J, dir: l })
        },
        percent() {
          return k(n || r, r, l)
        },
        getDistance() {
          return n == null ? void 0 : n.offsetWidth
        },
      }
    }
    function es(n, r, l) {
      Pe(n, Hn(r, !1, !1, l))
    }
    var ts = {
        props: { i18n: Object },
        data: { i18n: null },
        methods: {
          t(n, ...r) {
            var l, d, _
            let k = 0
            return (
              ((_ =
                ((l = this.i18n) == null ? void 0 : l[n]) ||
                ((d = this.$options.i18n) == null ? void 0 : d[n])) == null
                ? void 0
                : _.replace(/%s/g, () => r[k++] || '')) || ''
            )
          },
        },
      },
      e0 = {
        props: { autoplay: Boolean, autoplayInterval: Number, pauseOnHover: Boolean },
        data: { autoplay: !1, autoplayInterval: 7e3, pauseOnHover: !0 },
        connected() {
          he(this.list, 'aria-live', this.autoplay ? 'off' : 'polite'),
            this.autoplay && this.startAutoplay()
        },
        disconnected() {
          this.stopAutoplay()
        },
        update() {
          he(this.slides, 'tabindex', '-1')
        },
        events: [
          {
            name: 'visibilitychange',
            el() {
              return document
            },
            filter() {
              return this.autoplay
            },
            handler() {
              document.hidden ? this.stopAutoplay() : this.startAutoplay()
            },
          },
        ],
        methods: {
          startAutoplay() {
            this.stopAutoplay(),
              (this.interval = setInterval(() => {
                this.stack.length ||
                  (this.draggable && st(this.$el, ':focus-within')) ||
                  (this.pauseOnHover && st(this.$el, ':hover')) ||
                  this.show('next')
              }, this.autoplayInterval))
          },
          stopAutoplay() {
            clearInterval(this.interval)
          },
        },
      }
    const xr = { passive: !1, capture: !0 },
      jl = { passive: !0, capture: !0 },
      t0 = 'touchstart mousedown',
      Er = 'touchmove mousemove',
      ql = 'touchend touchcancel mouseup click input scroll'
    var n0 = {
      props: { draggable: Boolean },
      data: { draggable: !0, threshold: 10 },
      created() {
        for (const n of ['start', 'move', 'end']) {
          const r = this[n]
          this[n] = (l) => {
            const d = pi(l).x * (Et ? -1 : 1)
            ;(this.prevPos = d === this.pos ? this.prevPos : this.pos), (this.pos = d), r(l)
          }
        }
      },
      events: [
        {
          name: t0,
          passive: !0,
          delegate() {
            return ''.concat(this.selList, ' > *')
          },
          handler(n) {
            !this.draggable ||
              (!gn(n) && i0(n.target)) ||
              n.target.closest(qi) ||
              n.button > 0 ||
              this.length < 2 ||
              this.start(n)
          },
        },
        {
          name: 'dragstart',
          handler(n) {
            n.preventDefault()
          },
        },
        {
          name: Er,
          el() {
            return this.list
          },
          handler: de,
          ...xr,
        },
      ],
      methods: {
        start() {
          ;(this.drag = this.pos),
            this._transitioner
              ? ((this.percent = this._transitioner.percent()),
                (this.drag += this._transitioner.getDistance() * this.percent * this.dir),
                this._transitioner.cancel(),
                this._transitioner.translate(this.percent),
                (this.dragging = !0),
                (this.stack = []))
              : (this.prevIndex = this.index),
            Ue(document, Er, this.move, xr),
            Ue(document, ql, this.end, jl),
            X(this.list, 'userSelect', 'none')
        },
        move(n) {
          const r = this.pos - this.drag
          if (
            r === 0 ||
            this.prevPos === this.pos ||
            (!this.dragging && Math.abs(r) < this.threshold)
          )
            return
          X(this.list, 'pointerEvents', 'none'),
            n.cancelable && n.preventDefault(),
            (this.dragging = !0),
            (this.dir = r < 0 ? 1 : -1)
          let { slides: l, prevIndex: d } = this,
            _ = Math.abs(r),
            k = this.getIndex(d + this.dir),
            C = this._getDistance(d, k)
          for (; k !== d && _ > C; )
            (this.drag -= C * this.dir),
              (d = k),
              (_ -= C),
              (k = this.getIndex(d + this.dir)),
              (C = this._getDistance(d, k))
          this.percent = _ / C
          const P = l[d],
            H = l[k],
            q = this.index !== k,
            J = d === k
          let fe
          for (const pe of [this.index, this.prevIndex])
            v([k, d], pe) ||
              (Pe(l[pe], 'itemhidden', [this]), J && ((fe = !0), (this.prevIndex = d)))
          ;((this.index === d && this.prevIndex !== d) || fe) &&
            Pe(l[this.index], 'itemshown', [this]),
            q &&
              ((this.prevIndex = d),
              (this.index = k),
              !J && Pe(P, 'beforeitemhide', [this]),
              Pe(H, 'beforeitemshow', [this])),
            (this._transitioner = this._translate(Math.abs(this.percent), P, !J && H)),
            q && (!J && Pe(P, 'itemhide', [this]), Pe(H, 'itemshow', [this]))
        },
        end() {
          if ((Rn(document, Er, this.move, xr), Rn(document, ql, this.end, jl), this.dragging))
            if (((this.dragging = null), this.index === this.prevIndex))
              (this.percent = 1 - this.percent),
                (this.dir *= -1),
                this._show(!1, this.index, !0),
                (this._transitioner = null)
            else {
              const n = (Et ? this.dir * (Et ? 1 : -1) : this.dir) < 0 == this.prevPos > this.pos
              ;(this.index = n ? this.index : this.prevIndex),
                n && (this.percent = 1 - this.percent),
                this.show((this.dir > 0 && !n) || (this.dir < 0 && n) ? 'next' : 'previous', !0)
            }
          X(this.list, { userSelect: '', pointerEvents: '' }), (this.drag = this.percent = null)
        },
        _getDistance(n, r) {
          return this._getTransitioner(n, n !== r && r).getDistance() || this.slides[n].offsetWidth
        },
      },
    }
    function i0(n) {
      return (
        X(n, 'userSelect') !== 'none' &&
        x(n.childNodes).some((r) => r.nodeType === 3 && r.textContent.trim())
      )
    }
    function o0(n) {
      n._watches = []
      for (const r of n.$options.watch || []) for (const [l, d] of Object.entries(r)) Yl(n, d, l)
      n._initial = !0
    }
    function Yl(n, r, l) {
      n._watches.push({ name: l, ...(B(r) ? r : { handler: r }) })
    }
    function s0(n, r) {
      for (const { name: l, handler: d, immediate: _ = !0 } of n._watches)
        ((n._initial && _) || (s(r, l) && !le(r[l], n[l]))) && d.call(n, n[l], r[l])
      n._initial = !1
    }
    function r0(n) {
      const { computed: r } = n.$options
      if (((n._computed = {}), r)) for (const l in r) Kl(n, l, r[l])
    }
    function Kl(n, r, l) {
      ;(n._hasComputed = !0),
        Object.defineProperty(n, r, {
          enumerable: !0,
          get() {
            const { _computed: d, $props: _, $el: k } = n
            return s(d, r) || (d[r] = (l.get || l).call(n, _, k)), d[r]
          },
          set(d) {
            const { _computed: _ } = n
            ;(_[r] = l.set ? l.set.call(n, d) : d), ee(_[r]) && delete _[r]
          },
        })
    }
    function a0(n) {
      n._hasComputed &&
        (L1(n, { read: () => s0(n, Zl(n)), events: ['resize', 'computed'] }), c0(), uo.add(n))
    }
    function l0(n) {
      uo == null || uo.delete(n), Zl(n)
    }
    function Zl(n) {
      const r = { ...n._computed }
      return (n._computed = {}), r
    }
    let Sr, uo
    function c0() {
      Sr ||
        ((uo = new Set()),
        (Sr = new MutationObserver(() => {
          for (const n of uo) so(n, 'computed')
        })),
        Sr.observe(document, { subtree: !0, childList: !0 }))
    }
    function u0(n) {
      n._events = []
      for (const r of n.$options.events || [])
        if (s(r, 'handler')) Xl(n, r)
        else for (const l in r) Xl(n, r[l], l)
    }
    function h0(n) {
      n._events.forEach((r) => r()), delete n._events
    }
    function Xl(n, r, l) {
      let {
        name: d,
        el: _,
        handler: k,
        capture: C,
        passive: P,
        delegate: H,
        filter: q,
        self: J,
      } = B(r) ? r : { name: l, handler: r }
      ;(_ = L(_) ? _.call(n, n) : _ || n.$el),
        !(!_ || ($(_) && !_.length) || (q && !q.call(n))) &&
          n._events.push(
            Ue(_, d, H ? (z(H) ? H : H.call(n, n)) : null, z(k) ? n[k] : k.bind(n), {
              passive: P,
              capture: C,
              self: J,
            }),
          )
    }
    function f0(n) {
      n._observers = []
      for (const r of n.$options.observe || [])
        if (s(r, 'handler')) Ql(n, r)
        else for (const l of r) Ql(n, l)
    }
    function Jl(n, ...r) {
      n._observers.push(...r)
    }
    function d0(n) {
      for (const r of n._observers) r.disconnect()
    }
    function Ql(n, r) {
      let { observe: l, target: d = n.$el, handler: _, options: k, filter: C, args: P } = r
      if (C && !C.call(n, n)) return
      const H = '_observe'.concat(n._observers.length)
      L(d) && !s(n, H) && Kl(n, H, () => d.call(n, n)),
        (_ = z(_) ? n[_] : _.bind(n)),
        L(k) && (k = k.call(n, n))
      const q = s(n, H) ? n[H] : d,
        J = l(q, _, k, P)
      L(d) && $(n[H]) && J.unobserve && Yl(n, { handler: p0(J), immediate: !1 }, H), Jl(n, J)
    }
    function p0(n) {
      return (r, l) => {
        for (const d of l) !v(r, d) && n.unobserve(d)
        for (const d of r) !v(l, d) && n.observe(d)
      }
    }
    function m0(n) {
      const { $options: r, $props: l } = n,
        d = ec(r)
      S(l, d)
      const { computed: _, methods: k } = r
      for (let C in l) C in d && (!_ || !s(_, C)) && (!k || !s(k, C)) && (n[C] = l[C])
    }
    function ec(n) {
      const r = {},
        { args: l = [], props: d = {}, el: _, id: k } = n
      if (!d) return r
      for (const P in d) {
        const H = c(P)
        let q = Ae(_, H)
        ee(q) ||
          ((q = d[P] === Boolean && q === '' ? !0 : mr(d[P], q)),
          !(H === 'target' && g(q, '_')) && (r[P] = q))
      }
      const C = yi(Ae(_, k), l)
      for (const P in C) {
        const H = f(P)
        ee(d[H]) || (r[H] = mr(d[H], C[P]))
      }
      return r
    }
    const g0 = ht((n, r) => {
      const l = Object.keys(r),
        d = l
          .concat(n)
          .map((_) => [c(_), 'data-'.concat(c(_))])
          .flat()
      return { attributes: l, filter: d }
    })
    function _0(n) {
      const { $options: r, $props: l } = n,
        { id: d, props: _, el: k } = r
      if (!_) return
      const { attributes: C, filter: P } = g0(d, _),
        H = new MutationObserver((q) => {
          const J = ec(r)
          q.some(({ attributeName: fe }) => {
            const pe = fe.replace('data-', '')
            return (pe === d ? C : [f(pe), f(fe)]).some((Se) => !ee(J[Se]) && J[Se] !== l[Se])
          }) && n.$reset()
        })
      H.observe(k, { attributes: !0, attributeFilter: P }), Jl(n, H)
    }
    function $i(n, r) {
      var l
      ;(l = n.$options[r]) == null || l.forEach((d) => d.call(n))
    }
    function Tr(n) {
      n._connected ||
        (m0(n),
        $i(n, 'beforeConnect'),
        (n._connected = !0),
        u0(n),
        T1(n),
        o0(n),
        f0(n),
        _0(n),
        a0(n),
        $i(n, 'connected'),
        so(n))
    }
    function Lr(n) {
      n._connected &&
        ($i(n, 'beforeDisconnect'),
        h0(n),
        A1(n),
        d0(n),
        l0(n),
        $i(n, 'disconnected'),
        (n._connected = !1))
    }
    let b0 = 0
    function tc(n, r = {}) {
      ;(r.data = w0(r, n.constructor.options)),
        (n.$options = oo(n.constructor.options, r, n)),
        (n.$props = {}),
        (n._uid = b0++),
        v0(n),
        y0(n),
        r0(n),
        $i(n, 'created'),
        r.el && n.$mount(r.el)
    }
    function v0(n) {
      const { data: r = {} } = n.$options
      for (const l in r) n.$props[l] = n[l] = r[l]
    }
    function y0(n) {
      const { methods: r } = n.$options
      if (r) for (const l in r) n[l] = r[l].bind(n)
    }
    function w0({ data: n = {} }, { args: r = [], props: l = {} }) {
      $(n) &&
        (n = n.slice(0, r.length).reduce((d, _, k) => (B(_) ? S(d, _) : (d[r[k]] = _), d), {}))
      for (const d in n) ee(n[d]) ? delete n[d] : l[d] && (n[d] = mr(l[d], n[d]))
      return n
    }
    const Zt = function (n) {
      tc(this, n)
    }
    ;(Zt.util = w1), (Zt.options = {}), (Zt.version = '3.17.11')
    const k0 = 'uk-',
      qn = '__uikit__',
      Ci = {}
    function nc(n, r) {
      var l
      const d = k0 + c(n)
      if (!r) return B(Ci[d]) && (Ci[d] = Zt.extend(Ci[d])), Ci[d]
      ;(n = f(n)), (Zt[n] = (k, C) => ho(n, k, C))
      const _ = B(r) ? { ...r } : r.options
      return (
        (_.id = d),
        (_.name = n),
        (l = _.install) == null || l.call(_, Zt, _, n),
        Zt._initialized &&
          !_.functional &&
          requestAnimationFrame(() => ho(n, '['.concat(d, '],[data-').concat(d, ']'))),
        (Ci[d] = _)
      )
    }
    function ho(n, r, l, ...d) {
      const _ = nc(n)
      return _.options.functional
        ? new _({ data: B(r) ? r : [r, l, ...d] })
        : r
          ? ut(r).map(k)[0]
          : k()
      function k(C) {
        const P = ns(C, n)
        if (P)
          if (l) P.$destroy()
          else return P
        return new _({ el: C, data: l })
      }
    }
    function Yn(n) {
      return (n == null ? void 0 : n[qn]) || {}
    }
    function ns(n, r) {
      return Yn(n)[r]
    }
    function $0(n, r) {
      n[qn] || (n[qn] = {}), (n[qn][r.$options.name] = r)
    }
    function C0(n, r) {
      var l
      ;(l = n[qn]) == null || delete l[r.$options.name], K(n[qn]) || delete n[qn]
    }
    function x0(n) {
      ;(n.component = nc),
        (n.getComponents = Yn),
        (n.getComponent = ns),
        (n.update = ic),
        (n.use = function (l) {
          if (!l.installed) return l.call(null, this), (l.installed = !0), this
        }),
        (n.mixin = function (l, d) {
          ;(d = (z(d) ? this.component(d) : d) || this), (d.options = oo(d.options, l))
        }),
        (n.extend = function (l) {
          l || (l = {})
          const d = this,
            _ = function (C) {
              tc(this, C)
            }
          return (
            (_.prototype = Object.create(d.prototype)),
            (_.prototype.constructor = _),
            (_.options = oo(d.options, l)),
            (_.super = d),
            (_.extend = d.extend),
            _
          )
        })
      let r
      Object.defineProperty(n, 'container', {
        get() {
          return r || document.body
        },
        set(l) {
          r = He(l)
        },
      })
    }
    function ic(n, r) {
      n = n ? Q(n) : document.body
      for (const l of Dn(n).reverse()) oc(l, r)
      _n(n, (l) => oc(l, r))
    }
    function oc(n, r) {
      const l = Yn(n)
      for (const d in l) so(l[d], r)
    }
    function E0(n) {
      ;(n.prototype.$mount = function (r) {
        const l = this
        $0(r, l), (l.$options.el = r), document.contains(r) && Tr(l)
      }),
        (n.prototype.$destroy = function (r = !1) {
          const l = this,
            { el: d } = l.$options
          d && Lr(l), $i(l, 'destroy'), C0(d, l), r && qt(l.$el)
        }),
        (n.prototype.$create = ho),
        (n.prototype.$emit = function (r) {
          so(this, r)
        }),
        (n.prototype.$update = function (r = this.$el, l) {
          ic(r, l)
        }),
        (n.prototype.$reset = function () {
          Lr(this), Tr(this)
        }),
        (n.prototype.$getComponent = ns),
        Object.defineProperties(n.prototype, {
          $el: {
            get() {
              return this.$options.el
            },
          },
          $container: Object.getOwnPropertyDescriptor(n, 'container'),
        })
    }
    let S0 = 1
    function Kn(n, r = null) {
      return (r == null ? void 0 : r.id) || ''.concat(n.$options.id, '-').concat(S0++)
    }
    var T0 = {
        i18n: {
          next: 'Next slide',
          previous: 'Previous slide',
          slideX: 'Slide %s',
          slideLabel: '%s of %s',
          role: 'String',
        },
        data: { selNav: !1, role: 'region' },
        computed: {
          nav: ({ selNav: n }, r) => He(n, r),
          navChildren() {
            return ct(this.nav)
          },
          selNavItem: ({ attrItem: n }) => '['.concat(n, '],[data-').concat(n, ']'),
          navItems(n, r) {
            return ut(this.selNavItem, r)
          },
        },
        watch: {
          nav(n, r) {
            he(n, 'role', 'tablist'), r && this.$emit()
          },
          list(n) {
            he(n, 'role', 'presentation')
          },
          navChildren(n) {
            he(n, 'role', 'presentation')
          },
          navItems(n) {
            for (const r of n) {
              const l = Ae(r, this.attrItem),
                d = He('a,button', r) || r
              let _,
                k = null
              if (te(l)) {
                const C = Z(l),
                  P = this.slides[C]
                P && (P.id || (P.id = Kn(this, P)), (k = P.id)),
                  (_ = this.t('slideX', I(l) + 1)),
                  he(d, 'role', 'tab')
              } else
                this.list &&
                  (this.list.id || (this.list.id = Kn(this, this.list)), (k = this.list.id)),
                  (_ = this.t(l))
              he(d, { 'aria-controls': k, 'aria-label': he(d, 'aria-label') || _ })
            }
          },
          slides(n) {
            n.forEach((r, l) =>
              he(r, {
                role: this.nav ? 'tabpanel' : 'group',
                'aria-label': this.t('slideLabel', l + 1, this.length),
                'aria-roledescription': this.nav ? null : 'slide',
              }),
            )
          },
          length(n) {
            const r = this.navChildren.length
            if (this.nav && n !== r) {
              er(this.nav)
              for (let l = 0; l < n; l++)
                mt(this.nav, '<li '.concat(this.attrItem, '="').concat(l, '"><a href></a></li>'))
            }
          },
        },
        connected() {
          he(this.$el, { role: this.role, 'aria-roledescription': 'carousel' })
        },
        update: [
          {
            write() {
              this.navItems.concat(this.nav).forEach((n) => n && (n.hidden = !this.maxIndex)),
                this.updateNav()
            },
            events: ['resize'],
          },
        ],
        events: [
          {
            name: 'click keydown',
            delegate() {
              return this.selNavItem
            },
            handler(n) {
              n.target.closest('a,button') &&
                (n.type === 'click' || n.keyCode === ot.SPACE) &&
                (n.preventDefault(), this.show(Ae(n.current, this.attrItem)))
            },
          },
          { name: 'itemshow', handler: 'updateNav' },
          {
            name: 'keydown',
            delegate() {
              return this.selNavItem
            },
            handler(n) {
              const { current: r, keyCode: l } = n,
                d = Ae(r, this.attrItem)
              if (!te(d)) return
              let _ =
                l === ot.HOME
                  ? 0
                  : l === ot.END
                    ? 'last'
                    : l === ot.LEFT
                      ? 'previous'
                      : l === ot.RIGHT
                        ? 'next'
                        : -1
              ~_ && (n.preventDefault(), this.show(_))
            },
          },
        ],
        methods: {
          updateNav() {
            const n = this.getValidIndex()
            for (const r of this.navItems) {
              const l = Ae(r, this.attrItem),
                d = He('a,button', r) || r
              if (te(l)) {
                const k = Z(l) === n
                ze(r, this.clsActive, k),
                  he(d, { 'aria-selected': k, tabindex: k ? null : -1 }),
                  k && d && st(it(r), ':focus-within') && d.focus()
              } else
                ze(
                  r,
                  'uk-invisible',
                  this.finite &&
                    ((l === 'previous' && n === 0) || (l === 'next' && n >= this.maxIndex)),
                )
            }
          },
        },
      },
      sc = {
        mixins: [e0, n0, T0, ts],
        props: {
          clsActivated: Boolean,
          easing: String,
          index: Number,
          finite: Boolean,
          velocity: Number,
        },
        data: () => ({
          easing: 'ease',
          finite: !1,
          velocity: 1,
          index: 0,
          prevIndex: -1,
          stack: [],
          percent: 0,
          clsActive: 'uk-active',
          clsActivated: !1,
          Transitioner: !1,
          transitionOptions: {},
        }),
        connected() {
          ;(this.prevIndex = -1),
            (this.index = this.getValidIndex(this.$props.index)),
            (this.stack = [])
        },
        disconnected() {
          Ne(this.slides, this.clsActive)
        },
        computed: {
          duration: ({ velocity: n }, r) => rc(r.offsetWidth / n),
          list: ({ selList: n }, r) => He(n, r),
          maxIndex() {
            return this.length - 1
          },
          slides() {
            return ct(this.list)
          },
          length() {
            return this.slides.length
          },
        },
        watch: {
          slides(n, r) {
            r && this.$emit()
          },
        },
        observe: an(),
        methods: {
          show(n, r = !1) {
            var l
            if (this.dragging || !this.length) return
            const { stack: d } = this,
              _ = r ? 0 : d.length,
              k = () => {
                d.splice(_, 1), d.length && this.show(d.shift(), !0)
              }
            if ((d[r ? 'unshift' : 'push'](n), !r && d.length > 1)) {
              d.length === 2 &&
                ((l = this._transitioner) == null || l.forward(Math.min(this.duration, 200)))
              return
            }
            const C = this.getIndex(this.index),
              P = Oe(this.slides, this.clsActive) && this.slides[C],
              H = this.getIndex(n, this.index),
              q = this.slides[H]
            if (P === q) {
              k()
              return
            }
            if (
              ((this.dir = L0(n, C)),
              (this.prevIndex = C),
              (this.index = H),
              (P && !Pe(P, 'beforeitemhide', [this])) || !Pe(q, 'beforeitemshow', [this, P]))
            ) {
              ;(this.index = this.prevIndex), k()
              return
            }
            const J = this._show(P, q, r).then(() => {
              P && Pe(P, 'itemhidden', [this]),
                Pe(q, 'itemshown', [this]),
                d.shift(),
                (this._transitioner = null),
                requestAnimationFrame(() => d.length && this.show(d.shift(), !0))
            })
            return P && Pe(P, 'itemhide', [this]), Pe(q, 'itemshow', [this]), J
          },
          getIndex(n = this.index, r = this.index) {
            return me(Ge(n, this.slides, r, this.finite), 0, Math.max(0, this.maxIndex))
          },
          getValidIndex(n = this.index, r = this.prevIndex) {
            return this.getIndex(n, r)
          },
          _show(n, r, l) {
            if (
              ((this._transitioner = this._getTransitioner(n, r, this.dir, {
                easing: l
                  ? r.offsetWidth < 600
                    ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    : 'cubic-bezier(0.165, 0.84, 0.44, 1)'
                  : this.easing,
                ...this.transitionOptions,
              })),
              !l && !n)
            )
              return this._translate(1), Promise.resolve()
            const { length: d } = this.stack
            return this._transitioner[d > 1 ? 'forward' : 'show'](
              d > 1 ? Math.min(this.duration, 75 + 75 / (d - 1)) : this.duration,
              this.percent,
            )
          },
          _translate(n, r = this.prevIndex, l = this.index) {
            const d = this._getTransitioner(r === l ? !1 : r, l)
            return d.translate(n), d
          },
          _getTransitioner(
            n = this.prevIndex,
            r = this.index,
            l = this.dir || 1,
            d = this.transitionOptions,
          ) {
            return new this.Transitioner(
              W(n) ? this.slides[n] : n,
              W(r) ? this.slides[r] : r,
              l * (Et ? -1 : 1),
              d,
            )
          },
        },
      }
    function L0(n, r) {
      return n === 'next' ? 1 : n === 'previous' || n < r ? -1 : 1
    }
    function rc(n) {
      return 0.5 * n + 300
    }
    var ac = {
        mixins: [sc],
        props: { animation: String },
        data: {
          animation: 'slide',
          clsActivated: 'uk-transition-active',
          Animations: Cr,
          Transitioner: Q1,
        },
        computed: {
          animation({ animation: n, Animations: r }) {
            return { ...(r[n] || r.slide), name: n }
          },
          transitionOptions() {
            return { animation: this.animation }
          },
        },
        events: {
          beforeitemshow({ target: n }) {
            ve(n, this.clsActive)
          },
          itemshown({ target: n }) {
            ve(n, this.clsActivated)
          },
          itemhidden({ target: n }) {
            Ne(n, this.clsActive, this.clsActivated)
          },
        },
      },
      lc = {
        ...Cr,
        fade: {
          show() {
            return [{ opacity: 0 }, { opacity: 1 }]
          },
          percent(n) {
            return 1 - X(n, 'opacity')
          },
          translate(n) {
            return [{ opacity: 1 - n }, { opacity: n }]
          },
        },
        scale: {
          show() {
            return [
              { opacity: 0, transform: ki(1 - 0.2) },
              { opacity: 1, transform: ki(1) },
            ]
          },
          percent(n) {
            return 1 - X(n, 'opacity')
          },
          translate(n) {
            return [
              { opacity: 1 - n, transform: ki(1 - 0.2 * n) },
              { opacity: n, transform: ki(1 - 0.2 + 0.2 * n) },
            ]
          },
        },
      },
      cc = {
        mixins: [$r, ac],
        functional: !0,
        props: { delayControls: Number, preload: Number, videoAutoplay: Boolean, template: String },
        data: () => ({
          preload: 1,
          videoAutoplay: !1,
          delayControls: 3e3,
          items: [],
          cls: 'uk-open',
          clsPage: 'uk-lightbox-page',
          selList: '.uk-lightbox-items',
          attrItem: 'uk-lightbox-item',
          selClose: '.uk-close-large',
          selCaption: '.uk-lightbox-caption',
          pauseOnHover: !1,
          velocity: 2,
          Animations: lc,
          template:
            '<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>',
        }),
        created() {
          const n = He(this.template),
            r = He(this.selList, n)
          this.items.forEach(() => mt(r, '<li>'))
          const l = He('[uk-close]', n),
            d = this.t('close')
          l && d && (l.dataset.i18n = JSON.stringify({ label: d })),
            this.$mount(mt(this.container, n))
        },
        computed: { caption: ({ selCaption: n }, r) => He(n, r) },
        events: [
          { name: ''.concat(qo, ' ').concat(rn, ' keydown'), handler: 'showControls' },
          {
            name: 'click',
            self: !0,
            delegate() {
              return ''.concat(this.selList, ' > *')
            },
            handler(n) {
              n.defaultPrevented || this.hide()
            },
          },
          {
            name: 'shown',
            self: !0,
            handler() {
              this.showControls()
            },
          },
          {
            name: 'hide',
            self: !0,
            handler() {
              this.hideControls(), Ne(this.slides, this.clsActive), rt.stop(this.slides)
            },
          },
          {
            name: 'hidden',
            self: !0,
            handler() {
              this.$destroy(!0)
            },
          },
          {
            name: 'keyup',
            el() {
              return document
            },
            handler({ keyCode: n }) {
              if (!this.isToggled(this.$el) || !this.draggable) return
              let r = -1
              n === ot.LEFT
                ? (r = 'previous')
                : n === ot.RIGHT
                  ? (r = 'next')
                  : n === ot.HOME
                    ? (r = 0)
                    : n === ot.END && (r = 'last'),
                ~r && this.show(r)
            },
          },
          {
            name: 'beforeitemshow',
            handler(n) {
              this.isToggled() ||
                ((this.draggable = !1),
                n.preventDefault(),
                this.toggleElement(this.$el, !0, !1),
                (this.animation = lc.scale),
                Ne(n.target, this.clsActive),
                this.stack.splice(1, 0, this.index))
            },
          },
          {
            name: 'itemshow',
            handler() {
              zn(this.caption, this.getItem().caption || '')
              for (let n = -this.preload; n <= this.preload; n++) this.loadItem(this.index + n)
            },
          },
          {
            name: 'itemshown',
            handler() {
              this.draggable = this.$props.draggable
            },
          },
          {
            name: 'itemload',
            async handler(n, r) {
              const { source: l, type: d, alt: _ = '', poster: k, attrs: C = {} } = r
              if ((this.setItem(r, '<span uk-spinner></span>'), !l)) return
              let P
              const H = {
                allowfullscreen: '',
                style: 'max-width: 100%; box-sizing: border-box;',
                'uk-responsive': '',
                'uk-video': ''.concat(this.videoAutoplay),
              }
              if (d === 'image' || l.match(/\.(avif|jpe?g|jfif|a?png|gif|svg|webp)($|\?)/i)) {
                const q = fo('img', { src: l, alt: _, ...C })
                Ue(q, 'load', () => this.setItem(r, q)), Ue(q, 'error', () => this.setError(r))
              } else if (d === 'video' || l.match(/\.(mp4|webm|ogv)($|\?)/i)) {
                const q = fo('video', {
                  src: l,
                  poster: k,
                  controls: '',
                  playsinline: '',
                  'uk-video': ''.concat(this.videoAutoplay),
                  ...C,
                })
                Ue(q, 'loadedmetadata', () => this.setItem(r, q)),
                  Ue(q, 'error', () => this.setError(r))
              } else if (d === 'iframe' || l.match(/\.(html|php)($|\?)/i))
                this.setItem(
                  r,
                  fo('iframe', { src: l, allowfullscreen: '', class: 'uk-lightbox-iframe', ...C }),
                )
              else if (
                (P = l.match(
                  /\/\/(?:.*?youtube(-nocookie)?\..*?(?:[?&]v=|\/shorts\/)|youtu\.be\/)([\w-]{11})[&?]?(.*)?/,
                ))
              )
                this.setItem(
                  r,
                  fo('iframe', {
                    src: 'https://www.youtube'
                      .concat(P[1] || '', '.com/embed/')
                      .concat(P[2])
                      .concat(P[3] ? '?'.concat(P[3]) : ''),
                    width: 1920,
                    height: 1080,
                    ...H,
                    ...C,
                  }),
                )
              else if ((P = l.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/)))
                try {
                  const { height: q, width: J } = await (
                    await fetch(
                      'https://vimeo.com/api/oembed.json?maxwidth=1920&url='.concat(encodeURI(l)),
                      { credentials: 'omit' },
                    )
                  ).json()
                  this.setItem(
                    r,
                    fo('iframe', {
                      src: 'https://player.vimeo.com/video/'
                        .concat(P[1])
                        .concat(P[2] ? '?'.concat(P[2]) : ''),
                      width: J,
                      height: q,
                      ...H,
                      ...C,
                    }),
                  )
                } catch (q) {
                  this.setError(r)
                }
            },
          },
        ],
        methods: {
          loadItem(n = this.index) {
            const r = this.getItem(n)
            this.getSlide(r).childElementCount || Pe(this.$el, 'itemload', [r])
          },
          getItem(n = this.index) {
            return this.items[Ge(n, this.slides)]
          },
          setItem(n, r) {
            Pe(this.$el, 'itemloaded', [this, zn(this.getSlide(n), r)])
          },
          getSlide(n) {
            return this.slides[this.items.indexOf(n)]
          },
          setError(n) {
            this.setItem(n, '<span uk-icon="icon: bolt; ratio: 2"></span>')
          },
          showControls() {
            clearTimeout(this.controlsTimer),
              (this.controlsTimer = setTimeout(this.hideControls, this.delayControls)),
              ve(this.$el, 'uk-active', 'uk-transition-active')
          },
          hideControls() {
            Ne(this.$el, 'uk-active', 'uk-transition-active')
          },
        },
      }
    function fo(n, r) {
      const l = Un('<'.concat(n, '>'))
      return he(l, r), l
    }
    var A0 = {
      install: M0,
      props: { toggle: String },
      data: { toggle: 'a' },
      computed: { toggles: ({ toggle: n }, r) => ut(n, r) },
      watch: {
        toggles(n) {
          this.hide()
          for (const r of n) xt(r, 'a') && he(r, 'role', 'button')
        },
      },
      disconnected() {
        this.hide()
      },
      events: {
        name: 'click',
        delegate() {
          return ''.concat(this.toggle, ':not(.uk-disabled)')
        },
        handler(n) {
          n.preventDefault(), this.show(n.current)
        },
      },
      methods: {
        show(n) {
          const r = be(this.toggles.map(uc), 'source')
          if (G(n)) {
            const { source: l } = uc(n)
            n = w(r, ({ source: d }) => l === d)
          }
          return (
            (this.panel =
              this.panel || this.$create('lightboxPanel', { ...this.$props, items: r })),
            Ue(this.panel.$el, 'hidden', () => (this.panel = null)),
            this.panel.show(n)
          )
        },
        hide() {
          var n
          return (n = this.panel) == null ? void 0 : n.hide()
        },
      },
    }
    function M0(n, r) {
      n.lightboxPanel || n.component('lightboxPanel', cc),
        S(r.props, n.component('lightboxPanel').options.props)
    }
    function uc(n) {
      const r = {}
      for (const l of ['href', 'caption', 'type', 'poster', 'alt', 'attrs'])
        r[l === 'href' ? 'source' : l] = Ae(n, l)
      return (r.attrs = yi(r.attrs)), r
    }
    var P0 = {
      mixins: [lo],
      functional: !0,
      args: ['message', 'status'],
      data: {
        message: '',
        status: '',
        timeout: 5e3,
        group: '',
        pos: 'top-center',
        clsContainer: 'uk-notification',
        clsClose: 'uk-notification-close',
        clsMsg: 'uk-notification-message',
      },
      install: I0,
      computed: {
        marginProp: ({ pos: n }) => 'margin-'.concat(n.match(/[a-z]+(?=-)/)[0]),
        startProps() {
          return { opacity: 0, [this.marginProp]: -this.$el.offsetHeight }
        },
      },
      created() {
        const n = ''.concat(this.clsContainer, '-').concat(this.pos)
        let r = He('.'.concat(n), this.container)
        ;(!r || !_t(r)) &&
          (r = mt(
            this.container,
            '<div class="'.concat(this.clsContainer, ' ').concat(n, '"></div>'),
          )),
          this.$mount(
            mt(
              r,
              '<div class="'
                .concat(this.clsMsg)
                .concat(
                  this.status ? ' '.concat(this.clsMsg, '-').concat(this.status) : '',
                  '" role="alert"> <a href class="',
                )
                .concat(this.clsClose, '" data-uk-close></a> <div>')
                .concat(this.message, '</div> </div>'),
            ),
          )
      },
      async connected() {
        const n = I(X(this.$el, this.marginProp))
        await rt.start(X(this.$el, this.startProps), { opacity: 1, [this.marginProp]: n }),
          this.timeout && (this.timer = setTimeout(this.close, this.timeout))
      },
      events: {
        click(n) {
          n.target.closest('a[href="#"],a[href=""]') && n.preventDefault(), this.close()
        },
        [bi]() {
          this.timer && clearTimeout(this.timer)
        },
        [no]() {
          this.timeout && (this.timer = setTimeout(this.close, this.timeout))
        },
      },
      methods: {
        async close(n) {
          const r = (l) => {
            const d = it(l)
            Pe(l, 'close', [this]), qt(l), (d != null && d.hasChildNodes()) || qt(d)
          }
          this.timer && clearTimeout(this.timer),
            n || (await rt.start(this.$el, this.startProps)),
            r(this.$el)
        },
      },
    }
    function I0(n) {
      n.notification.closeAll = function (r, l) {
        _n(document.body, (d) => {
          const _ = n.getComponent(d, 'notification')
          _ && (!r || r === _.group) && _.close(l)
        })
      }
    }
    var is = {
      props: { media: Boolean },
      data: { media: !1 },
      connected() {
        const n = N0(this.media, this.$el)
        if (((this.matchMedia = !0), n)) {
          this.mediaObj = window.matchMedia(n)
          const r = () => {
            ;(this.matchMedia = this.mediaObj.matches),
              Pe(this.$el, Hn('mediachange', !1, !0, [this.mediaObj]))
          }
          ;(this.offMediaObj = Ue(this.mediaObj, 'change', () => {
            r(), this.$emit('resize')
          })),
            r()
        }
      },
      disconnected() {
        var n
        ;(n = this.offMediaObj) == null || n.call(this)
      },
    }
    function N0(n, r) {
      if (z(n)) {
        if (g(n, '@')) n = I(X(r, '--uk-breakpoint-'.concat(n.substr(1))))
        else if (isNaN(n)) return n
      }
      return n && te(n) ? '(min-width: '.concat(n, 'px)') : ''
    }
    function hc(n) {
      return Math.ceil(
        Math.max(
          0,
          ...ut('[stroke]', n).map((r) => {
            try {
              return r.getTotalLength()
            } catch (l) {
              return 0
            }
          }),
        ),
      )
    }
    const os = {
        x: ss,
        y: ss,
        rotate: ss,
        scale: ss,
        color: Ar,
        backgroundColor: Ar,
        borderColor: Ar,
        blur: Zn,
        hue: Zn,
        fopacity: Zn,
        grayscale: Zn,
        invert: Zn,
        saturate: Zn,
        sepia: Zn,
        opacity: B0,
        stroke: D0,
        bgx: pc,
        bgy: pc,
      },
      { keys: fc } = Object
    var dc = {
      mixins: [is],
      props: bc(fc(os), 'list'),
      data: bc(fc(os), void 0),
      computed: {
        props(n, r) {
          const l = {}
          for (const _ in n) _ in os && !ee(n[_]) && (l[_] = n[_].slice())
          const d = {}
          for (const _ in l) d[_] = os[_](_, r, l[_], l)
          return d
        },
      },
      events: {
        load() {
          this.$emit()
        },
      },
      methods: {
        reset() {
          for (const n in this.getCss(0)) X(this.$el, n, '')
        },
        getCss(n) {
          const r = {}
          for (const l in this.props) this.props[l](r, me(n))
          return (r.willChange = Object.keys(r).map(zo).join(',')), r
        },
      },
    }
    function ss(n, r, l) {
      let d = as(l) || { x: 'px', y: 'px', rotate: 'deg' }[n] || '',
        _
      return (
        n === 'x' || n === 'y'
          ? ((n = 'translate'.concat(p(n))), (_ = (k) => I(I(k).toFixed(d === 'px' ? 0 : 6))))
          : n === 'scale' &&
            ((d = ''),
            (_ = (k) => {
              var C
              return as([k])
                ? Dt(k, 'width', r, !0) /
                    r[
                      'offset'.concat(
                        (C = k.endsWith) != null && C.call(k, 'vh') ? 'Height' : 'Width',
                      )
                    ]
                : I(k)
            })),
        l.length === 1 && l.unshift(n === 'scale' ? 1 : 0),
        (l = xi(l, _)),
        (k, C) => {
          k.transform = ''
            .concat(k.transform || '', ' ')
            .concat(n, '(')
            .concat(po(l, C))
            .concat(d, ')')
        }
      )
    }
    function Ar(n, r, l) {
      return (
        l.length === 1 && l.unshift(mo(r, n, '')),
        (l = xi(l, (d) => O0(r, d))),
        (d, _) => {
          const [k, C, P] = _c(l, _),
            H = k.map((q, J) => ((q += P * (C[J] - q)), J === 3 ? I(q) : parseInt(q, 10))).join(',')
          d[n] = 'rgba('.concat(H, ')')
        }
      )
    }
    function O0(n, r) {
      return mo(n, 'color', r).split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(I)
    }
    function Zn(n, r, l) {
      l.length === 1 && l.unshift(0)
      const d = as(l) || { blur: 'px', hue: 'deg' }[n] || '%'
      return (
        (n = { fopacity: 'opacity', hue: 'hue-rotate' }[n] || n),
        (l = xi(l)),
        (_, k) => {
          const C = po(l, k)
          _.filter = ''
            .concat(_.filter || '', ' ')
            .concat(n, '(')
            .concat(C + d, ')')
        }
      )
    }
    function B0(n, r, l) {
      return (
        l.length === 1 && l.unshift(mo(r, n, '')),
        (l = xi(l)),
        (d, _) => {
          d[n] = po(l, _)
        }
      )
    }
    function D0(n, r, l) {
      l.length === 1 && l.unshift(0)
      const d = as(l),
        _ = hc(r)
      return (
        (l = xi(l.reverse(), (k) => ((k = I(k)), d === '%' ? (k * _) / 100 : k))),
        l.some(([k]) => k)
          ? (X(r, 'strokeDasharray', _),
            (k, C) => {
              k.strokeDashoffset = po(l, C)
            })
          : de
      )
    }
    function pc(n, r, l, d) {
      l.length === 1 && l.unshift(0)
      const _ = n === 'bgy' ? 'height' : 'width'
      d[n] = xi(l, (P) => Dt(P, _, r))
      const k = ['bgx', 'bgy'].filter((P) => P in d)
      if (k.length === 2 && n === 'bgx') return de
      if (mo(r, 'backgroundSize', '') === 'cover') return R0(n, r, l, d)
      const C = {}
      for (const P of k) C[P] = mc(r, P)
      return gc(k, C, d)
    }
    function R0(n, r, l, d) {
      const _ = H0(r)
      if (!_.width) return de
      const k = { width: r.offsetWidth, height: r.offsetHeight },
        C = ['bgx', 'bgy'].filter((J) => J in d),
        P = {}
      for (const J of C) {
        const fe = d[J].map(([at]) => at),
          pe = Math.min(...fe),
          Se = Math.max(...fe),
          We = fe.indexOf(pe) < fe.indexOf(Se),
          Je = Se - pe
        ;(P[J] = ''.concat((We ? -Je : 0) - (We ? pe : Se), 'px')),
          (k[J === 'bgy' ? 'height' : 'width'] += Je)
      }
      const H = Ve.cover(_, k)
      for (const J of C) {
        const fe = J === 'bgy' ? 'height' : 'width',
          pe = H[fe] - k[fe]
        P[J] = 'max('.concat(mc(r, J), ',-').concat(pe, 'px) + ').concat(P[J])
      }
      const q = gc(C, P, d)
      return (J, fe) => {
        q(J, fe),
          (J.backgroundSize = ''.concat(H.width, 'px ').concat(H.height, 'px')),
          (J.backgroundRepeat = 'no-repeat')
      }
    }
    function mc(n, r) {
      return mo(n, 'background-position-'.concat(r.substr(-1)), '')
    }
    function gc(n, r, l) {
      return function (d, _) {
        for (const k of n) {
          const C = po(l[k], _)
          d['background-position-'.concat(k.substr(-1))] = 'calc('
            .concat(r[k], ' + ')
            .concat(C, 'px)')
        }
      }
    }
    const rs = {}
    function H0(n) {
      const r = X(n, 'backgroundImage').replace(/^none|url\(["']?(.+?)["']?\)$/, '$1')
      if (rs[r]) return rs[r]
      const l = new Image()
      return r && ((l.src = r), !l.naturalWidth)
        ? ((l.onload = () => {
            ;(rs[r] = Mr(l)), Pe(n, Hn('load', !1))
          }),
          Mr(l))
        : (rs[r] = Mr(l))
    }
    function Mr(n) {
      return { width: n.naturalWidth, height: n.naturalHeight }
    }
    function xi(n, r = I) {
      const l = [],
        { length: d } = n
      let _ = 0
      for (let k = 0; k < d; k++) {
        let [C, P] = z(n[k]) ? n[k].trim().split(/ (?![^(]*\))/) : [n[k]]
        if (
          ((C = r(C)),
          (P = P ? I(P) / 100 : null),
          k === 0
            ? P === null
              ? (P = 0)
              : P && l.push([C, 0])
            : k === d - 1 && (P === null ? (P = 1) : P !== 1 && (l.push([C, P]), (P = 1))),
          l.push([C, P]),
          P === null)
        )
          _++
        else if (_) {
          const H = l[k - _ - 1][1],
            q = (P - H) / (_ + 1)
          for (let J = _; J > 0; J--) l[k - J][1] = H + q * (_ - J + 1)
          _ = 0
        }
      }
      return l
    }
    function _c(n, r) {
      const l = w(n.slice(1), ([, d]) => r <= d) + 1
      return [n[l - 1][0], n[l][0], (r - n[l - 1][1]) / (n[l][1] - n[l - 1][1])]
    }
    function po(n, r) {
      const [l, d, _] = _c(n, r)
      return l + Math.abs(l - d) * _ * (l < d ? 1 : -1)
    }
    const z0 = /^-?\d+(?:\.\d+)?(\S+)?/
    function as(n, r) {
      var l
      for (const d of n) {
        const _ = (l = d.match) == null ? void 0 : l.call(d, z0)
        if (_) return _[1]
      }
      return r
    }
    function mo(n, r, l) {
      const d = n.style[r],
        _ = X(X(n, r, l), r)
      return (n.style[r] = d), _
    }
    function bc(n, r) {
      return n.reduce((l, d) => ((l[d] = r), l), {})
    }
    var U0 = {
      mixins: [dc],
      props: { target: String, viewport: Number, easing: Number, start: String, end: String },
      data: { target: !1, viewport: 1, easing: 1, start: 0, end: 0 },
      computed: {
        target: ({ target: n }, r) => vc((n && Vt(n, r)) || r),
        start({ start: n }) {
          return Dt(n, 'height', this.target, !0)
        },
        end({ end: n, viewport: r }) {
          return Dt(
            n || ((r = (1 - r) * 100) && ''.concat(r, 'vh+').concat(r, '%')),
            'height',
            this.target,
            !0,
          )
        },
      },
      observe: [
        _r(),
        Jo({ target: ({ target: n }) => n }),
        an({ target: ({ $el: n, target: r }) => [n, r, un(r, !0)] }),
      ],
      update: {
        read({ percent: n }, r) {
          if ((r.has('scroll') || (n = !1), !_t(this.$el))) return !1
          if (!this.matchMedia) return
          const l = n
          return (
            (n = F0(cr(this.target, this.start, this.end), this.easing)),
            { percent: n, style: l === n ? !1 : this.getCss(n) }
          )
        },
        write({ style: n }) {
          if (!this.matchMedia) {
            this.reset()
            return
          }
          n && X(this.$el, n)
        },
        events: ['scroll', 'resize'],
      },
    }
    function F0(n, r) {
      return r >= 0 ? Math.pow(n, r + 1) : 1 - Math.pow(1 - n, 1 - r)
    }
    function vc(n) {
      return n ? ('offsetTop' in n ? n : vc(it(n))) : document.documentElement
    }
    var yc = {
        update: {
          write() {
            if (this.stack.length || this.dragging) return
            const n = this.getValidIndex()
            !~this.prevIndex || this.index !== n
              ? this.show(n)
              : this._translate(1, this.prevIndex, this.index)
          },
          events: ['resize'],
        },
      },
      wc = { observe: ro({ target: ({ slides: n }) => n, targets: (n) => n.getAdjacentSlides() }) }
    function W0(n, r, l, { center: d, easing: _, list: k }) {
      const C = n ? go(n, k, d) : go(r, k, d) + Fe(r).width * l,
        P = r ? go(r, k, d) : C + Fe(n).width * l * (Et ? -1 : 1)
      let H
      return {
        dir: l,
        show(q, J = 0, fe) {
          const pe = fe ? 'linear' : _
          return (
            (q -= Math.round(q * me(J, -1, 1))),
            this.translate(J),
            (J = n ? J : me(J, 0, 1)),
            Pr(this.getItemIn(), 'itemin', { percent: J, duration: q, timing: pe, dir: l }),
            n &&
              Pr(this.getItemIn(!0), 'itemout', {
                percent: 1 - J,
                duration: q,
                timing: pe,
                dir: l,
              }),
            new Promise((Se) => {
              H || (H = Se),
                rt.start(k, { transform: gt(-P * (Et ? -1 : 1), 'px') }, q, pe).then(H, de)
            })
          )
        },
        cancel() {
          return rt.cancel(k)
        },
        reset() {
          X(k, 'transform', '')
        },
        async forward(q, J = this.percent()) {
          return await this.cancel(), this.show(q, J, !0)
        },
        translate(q) {
          const J = this.getDistance() * l * (Et ? -1 : 1)
          X(k, 'transform', gt(me(-P + (J - J * q), -ls(k), Fe(k).width) * (Et ? -1 : 1), 'px'))
          const fe = this.getActives(),
            pe = this.getItemIn(),
            Se = this.getItemIn(!0)
          q = n ? me(q, -1, 1) : 0
          for (const We of ct(k)) {
            const Je = v(fe, We),
              at = We === pe,
              hn = We === Se,
              bo = at || (!hn && (Je || (l * (Et ? -1 : 1) === -1) ^ (cs(We, k) > cs(n || r))))
            Pr(We, 'itemtranslate'.concat(bo ? 'in' : 'out'), {
              dir: l,
              percent: hn ? 1 - q : at ? q : Je ? 1 : 0,
            })
          }
        },
        percent() {
          return Math.abs((X(k, 'transform').split(',')[4] * (Et ? -1 : 1) + C) / (P - C))
        },
        getDistance() {
          return Math.abs(P - C)
        },
        getItemIn(q = !1) {
          let J = this.getActives(),
            fe = $c(k, go(r || n, k, d))
          if (q) {
            const pe = J
            ;(J = fe), (fe = pe)
          }
          return fe[w(fe, (pe) => !v(J, pe))]
        },
        getActives() {
          return $c(k, go(n || r, k, d))
        },
      }
    }
    function go(n, r, l) {
      const d = cs(n, r)
      return l ? d - V0(n, r) : Math.min(d, kc(r))
    }
    function kc(n) {
      return Math.max(0, ls(n) - Fe(n).width)
    }
    function ls(n) {
      return ke(ct(n), (r) => Fe(r).width)
    }
    function V0(n, r) {
      return Fe(r).width / 2 - Fe(n).width / 2
    }
    function cs(n, r) {
      return (n && (nr(n).left + (Et ? Fe(n).width - Fe(r).width : 0)) * (Et ? -1 : 1)) || 0
    }
    function $c(n, r) {
      r -= 1
      const l = Fe(n).width,
        d = r + l + 2
      return ct(n).filter((_) => {
        const k = cs(_, n),
          C = k + Math.min(Fe(_).width, l)
        return k >= r && C <= d
      })
    }
    function Pr(n, r, l) {
      Pe(n, Hn(r, !1, !1, l))
    }
    var G0 = {
      mixins: [Gt, sc, yc, wc],
      props: { center: Boolean, sets: Boolean },
      data: {
        center: !1,
        sets: !1,
        attrItem: 'uk-slider-item',
        selList: '.uk-slider-items',
        selNav: '.uk-slider-nav',
        clsContainer: 'uk-slider-container',
        Transitioner: W0,
      },
      computed: {
        avgWidth() {
          return ls(this.list) / this.length
        },
        finite({ finite: n }) {
          return n || j0(this.list, this.center)
        },
        maxIndex() {
          if (!this.finite || (this.center && !this.sets)) return this.length - 1
          if (this.center) return Ce(this.sets)
          let n = 0
          const r = kc(this.list),
            l = w(this.slides, (d) => {
              if (n >= r) return !0
              n += Fe(d).width
            })
          return ~l ? l : this.length - 1
        },
        sets({ sets: n }) {
          if (!n) return
          let r = 0
          const l = [],
            d = Fe(this.list).width
          for (let _ = 0; _ < this.length; _++) {
            const k = Fe(this.slides[_]).width
            r + k > d && (r = 0),
              this.center
                ? r < d / 2 &&
                  r + k + Fe(Ge(+_ + 1, this.slides)).width / 2 > d / 2 &&
                  (l.push(+_), (r = d / 2 - k / 2))
                : r === 0 && l.push(Math.min(+_, this.maxIndex)),
              (r += k)
          }
          if (l.length) return l
        },
        transitionOptions() {
          return { center: this.center, list: this.list }
        },
        slides() {
          return ct(this.list).filter(_t)
        },
      },
      connected() {
        ze(this.$el, this.clsContainer, !He('.'.concat(this.clsContainer), this.$el))
      },
      observe: an({ target: ({ slides: n }) => n }),
      update: {
        write() {
          for (const n of this.navItems) {
            const r = Z(Ae(n, this.attrItem))
            r !== !1 &&
              (n.hidden = !this.maxIndex || r > this.maxIndex || (this.sets && !v(this.sets, r)))
          }
          this.length &&
            !this.dragging &&
            !this.stack.length &&
            (this.reorder(), this._translate(1)),
            this.updateActiveClasses()
        },
        events: ['resize'],
      },
      events: {
        beforeitemshow(n) {
          !this.dragging &&
            this.sets &&
            this.stack.length < 2 &&
            !v(this.sets, this.index) &&
            (this.index = this.getValidIndex())
          const r = Math.abs(
            this.index -
              this.prevIndex +
              ((this.dir > 0 && this.index < this.prevIndex) ||
              (this.dir < 0 && this.index > this.prevIndex)
                ? (this.maxIndex + 1) * this.dir
                : 0),
          )
          if (!this.dragging && r > 1) {
            for (let d = 0; d < r; d++) this.stack.splice(1, 0, this.dir > 0 ? 'next' : 'previous')
            n.preventDefault()
            return
          }
          const l = this.dir < 0 || !this.slides[this.prevIndex] ? this.index : this.prevIndex
          ;(this.duration =
            rc(this.avgWidth / this.velocity) * (Fe(this.slides[l]).width / this.avgWidth)),
            this.reorder()
        },
        itemshow() {
          ~this.prevIndex && ve(this._getTransitioner().getItemIn(), this.clsActive)
        },
        itemshown() {
          this.updateActiveClasses()
        },
      },
      methods: {
        reorder() {
          if (this.finite) {
            X(this.slides, 'order', '')
            return
          }
          const n = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index
          if (
            (this.slides.forEach((_, k) =>
              X(_, 'order', this.dir > 0 && k < n ? 1 : this.dir < 0 && k >= this.index ? -1 : ''),
            ),
            !this.center)
          )
            return
          const r = this.slides[n]
          let l = Fe(this.list).width / 2 - Fe(r).width / 2,
            d = 0
          for (; l > 0; ) {
            const _ = this.getIndex(--d + n, n),
              k = this.slides[_]
            X(k, 'order', _ > n ? -2 : -1), (l -= Fe(k).width)
          }
        },
        updateActiveClasses() {
          const n = this._getTransitioner(this.index).getActives(),
            r = [
              this.clsActive,
              ((!this.sets || v(this.sets, I(this.index))) && this.clsActivated) || '',
            ]
          for (const l of this.slides) {
            const d = v(n, l)
            ze(l, r, d), he(l, 'aria-hidden', !d)
            for (const _ of ut(Yi, l))
              s(_, '_tabindex') || (_._tabindex = he(_, 'tabindex')),
                he(_, 'tabindex', d ? _._tabindex : -1)
          }
        },
        getValidIndex(n = this.index, r = this.prevIndex) {
          if (((n = this.getIndex(n, r)), !this.sets)) return n
          let l
          do {
            if (v(this.sets, n)) return n
            ;(l = n), (n = this.getIndex(n + this.dir, r))
          } while (n !== l)
          return n
        },
        getAdjacentSlides() {
          const { width: n } = Fe(this.list),
            r = -n,
            l = n * 2,
            d = Fe(this.slides[this.index]).width,
            _ = this.center ? n / 2 - d / 2 : 0,
            k = new Set()
          for (const C of [-1, 1]) {
            let P = _ + (C > 0 ? d : 0),
              H = 0
            do {
              const q = this.slides[this.getIndex(this.index + C + H++ * C)]
              ;(P += Fe(q).width * C), k.add(q)
            } while (this.length > H && P > r && P < l)
          }
          return Array.from(k)
        },
      },
    }
    function j0(n, r) {
      if (!n || n.length < 2) return !0
      const { width: l } = Fe(n)
      if (!r) return Math.ceil(ls(n)) < Math.trunc(l + q0(n))
      const d = ct(n),
        _ = Math.trunc(l / 2)
      for (const k in d) {
        const C = d[k],
          P = Fe(C).width,
          H = new Set([C])
        let q = 0
        for (const J of [-1, 1]) {
          let fe = P / 2,
            pe = 0
          for (; fe < _; ) {
            const Se = d[Ge(+k + J + pe++ * J, d)]
            if (H.has(Se)) return !0
            ;(fe += Fe(Se).width), H.add(Se)
          }
          q = Math.max(q, P / 2 + Fe(d[Ge(+k + J, d)]).width / 2 - (fe - _))
        }
        if (
          q >
          ke(
            d.filter((J) => !H.has(J)),
            (J) => Fe(J).width,
          )
        )
          return !0
      }
      return !1
    }
    function q0(n) {
      return Math.max(0, ...ct(n).map((r) => Fe(r).width))
    }
    var Cc = {
      mixins: [dc],
      data: { selItem: '!li' },
      beforeConnect() {
        this.item = Vt(this.selItem, this.$el)
      },
      disconnected() {
        this.item = null
      },
      events: [
        {
          name: 'itemin itemout',
          self: !0,
          el() {
            return this.item
          },
          handler({ type: n, detail: { percent: r, duration: l, timing: d, dir: _ } }) {
            Nt.read(() => {
              if (!this.matchMedia) return
              const k = this.getCss(Ec(n, _, r)),
                C = this.getCss(xc(n) ? 0.5 : _ > 0 ? 1 : 0)
              Nt.write(() => {
                X(this.$el, k), rt.start(this.$el, C, l, d).catch(de)
              })
            })
          },
        },
        {
          name: 'transitioncanceled transitionend',
          self: !0,
          el() {
            return this.item
          },
          handler() {
            rt.cancel(this.$el)
          },
        },
        {
          name: 'itemtranslatein itemtranslateout',
          self: !0,
          el() {
            return this.item
          },
          handler({ type: n, detail: { percent: r, dir: l } }) {
            Nt.read(() => {
              if (!this.matchMedia) {
                this.reset()
                return
              }
              const d = this.getCss(Ec(n, l, r))
              Nt.write(() => X(this.$el, d))
            })
          },
        },
      ],
    }
    function xc(n) {
      return b(n, 'in')
    }
    function Ec(n, r, l) {
      return (l /= 2), xc(n) ^ (r < 0) ? l : 1 - l
    }
    var Y0 = {
      ...Cr,
      fade: {
        show() {
          return [{ opacity: 0, zIndex: 0 }, { zIndex: -1 }]
        },
        percent(n) {
          return 1 - X(n, 'opacity')
        },
        translate(n) {
          return [{ opacity: 1 - n, zIndex: 0 }, { zIndex: -1 }]
        },
      },
      scale: {
        show() {
          return [{ opacity: 0, transform: ki(1 + 0.5), zIndex: 0 }, { zIndex: -1 }]
        },
        percent(n) {
          return 1 - X(n, 'opacity')
        },
        translate(n) {
          return [{ opacity: 1 - n, transform: ki(1 + 0.5 * n), zIndex: 0 }, { zIndex: -1 }]
        },
      },
      pull: {
        show(n) {
          return n < 0
            ? [
                { transform: gt(30), zIndex: -1 },
                { transform: gt(), zIndex: 0 },
              ]
            : [
                { transform: gt(-100), zIndex: 0 },
                { transform: gt(), zIndex: -1 },
              ]
        },
        percent(n, r, l) {
          return l < 0 ? 1 - co(r) : co(n)
        },
        translate(n, r) {
          return r < 0
            ? [
                { transform: gt(30 * n), zIndex: -1 },
                { transform: gt(-100 * (1 - n)), zIndex: 0 },
              ]
            : [
                { transform: gt(-n * 100), zIndex: 0 },
                { transform: gt(30 * (1 - n)), zIndex: -1 },
              ]
        },
      },
      push: {
        show(n) {
          return n < 0
            ? [
                { transform: gt(100), zIndex: 0 },
                { transform: gt(), zIndex: -1 },
              ]
            : [
                { transform: gt(-30), zIndex: -1 },
                { transform: gt(), zIndex: 0 },
              ]
        },
        percent(n, r, l) {
          return l > 0 ? 1 - co(r) : co(n)
        },
        translate(n, r) {
          return r < 0
            ? [
                { transform: gt(n * 100), zIndex: 0 },
                { transform: gt(-30 * (1 - n)), zIndex: -1 },
              ]
            : [
                { transform: gt(-30 * n), zIndex: -1 },
                { transform: gt(100 * (1 - n)), zIndex: 0 },
              ]
        },
      },
    }
    const Sc = xn && CSS.supports('aspect-ratio', '1/1')
    var K0 = {
        mixins: [Gt, ac, yc, wc],
        props: { ratio: String, minHeight: Number, maxHeight: Number },
        data: {
          ratio: '16:9',
          minHeight: !1,
          maxHeight: !1,
          selList: '.uk-slideshow-items',
          attrItem: 'uk-slideshow-item',
          selNav: '.uk-slideshow-nav',
          Animations: Y0,
        },
        watch: {
          list(n) {
            n &&
              Sc &&
              X(n, {
                aspectRatio: this.ratio.replace(':', '/'),
                minHeight: this.minHeight || '',
                maxHeight: this.maxHeight || '',
                minWidth: '100%',
                maxWidth: '100%',
              })
          },
        },
        update: {
          read() {
            if (!this.list || Sc) return !1
            let [n, r] = this.ratio.split(':').map(Number)
            return (
              (r = (r * this.list.offsetWidth) / n || 0),
              this.minHeight && (r = Math.max(this.minHeight, r)),
              this.maxHeight && (r = Math.min(this.maxHeight, r)),
              { height: r - mi(this.list, 'height', 'content-box') }
            )
          },
          write({ height: n }) {
            n > 0 && X(this.list, 'minHeight', n)
          },
          events: ['resize'],
        },
        methods: {
          getAdjacentSlides() {
            return [1, -1].map((n) => this.slides[this.getIndex(this.index + n)])
          },
        },
      },
      Z0 = {
        mixins: [Gt, Ul],
        props: {
          group: String,
          threshold: Number,
          clsItem: String,
          clsPlaceholder: String,
          clsDrag: String,
          clsDragState: String,
          clsBase: String,
          clsNoDrag: String,
          clsEmpty: String,
          clsCustom: String,
          handle: String,
        },
        data: {
          group: !1,
          threshold: 5,
          clsItem: 'uk-sortable-item',
          clsPlaceholder: 'uk-sortable-placeholder',
          clsDrag: 'uk-sortable-drag',
          clsDragState: 'uk-drag',
          clsBase: 'uk-sortable',
          clsNoDrag: 'uk-sortable-nodrag',
          clsEmpty: 'uk-sortable-empty',
          clsCustom: '',
          handle: !1,
          pos: {},
        },
        created() {
          for (const n of ['init', 'start', 'move', 'end']) {
            const r = this[n]
            this[n] = (l) => {
              S(this.pos, pi(l)), r(l)
            }
          }
        },
        events: { name: rn, passive: !1, handler: 'init' },
        computed: {
          target: (n, r) => (r.tBodies || [r])[0],
          items() {
            return ct(this.target)
          },
          isEmpty() {
            return K(this.items)
          },
          handles({ handle: n }, r) {
            return n ? ut(n, r) : this.items
          },
        },
        watch: {
          isEmpty(n) {
            ze(this.target, this.clsEmpty, n)
          },
          handles(n, r) {
            X(r, { touchAction: '', userSelect: '' }),
              X(n, { touchAction: Vn ? 'none' : '', userSelect: 'none' })
          },
        },
        update: {
          write(n) {
            if (!this.drag || !it(this.placeholder)) return
            const {
              pos: { x: r, y: l },
              origin: { offsetTop: d, offsetLeft: _ },
              placeholder: k,
            } = this
            X(this.drag, { top: l - d, left: r - _ })
            const C = this.getSortable(document.elementFromPoint(r, l))
            if (!C) return
            const { items: P } = C
            if (P.some(rt.inProgress)) return
            const H = ep(P, { x: r, y: l })
            if (P.length && (!H || H === k)) return
            const q = this.getSortable(k),
              J = tp(C.target, H, k, r, l, C === q && n.moved !== H)
            J !== !1 &&
              ((J && k === J) ||
                (C !== q ? (q.remove(k), (n.moved = H)) : delete n.moved,
                C.insert(k, J),
                this.touched.add(C)))
          },
          events: ['move'],
        },
        methods: {
          init(n) {
            const { target: r, button: l, defaultPrevented: d } = n,
              [_] = this.items.filter((k) => k.contains(r))
            !_ ||
              d ||
              l > 0 ||
              Gs(r) ||
              r.closest('.'.concat(this.clsNoDrag)) ||
              (this.handle && !r.closest(this.handle)) ||
              (n.preventDefault(),
              (this.touched = new Set([this])),
              (this.placeholder = _),
              (this.origin = { target: r, index: fi(_), ...this.pos }),
              Ue(document, qo, this.move),
              Ue(document, En, this.end),
              this.threshold || this.start(n))
          },
          start(n) {
            this.drag = Q0(this.$container, this.placeholder)
            const { left: r, top: l } = this.placeholder.getBoundingClientRect()
            S(this.origin, { offsetLeft: this.pos.x - r, offsetTop: this.pos.y - l }),
              ve(this.drag, this.clsDrag, this.clsCustom),
              ve(this.placeholder, this.clsPlaceholder),
              ve(this.items, this.clsItem),
              ve(document.documentElement, this.clsDragState),
              Pe(this.$el, 'start', [this, this.placeholder]),
              X0(this.pos),
              this.move(n)
          },
          move(n) {
            this.drag
              ? this.$emit('move')
              : (Math.abs(this.pos.x - this.origin.x) > this.threshold ||
                  Math.abs(this.pos.y - this.origin.y) > this.threshold) &&
                this.start(n)
          },
          end() {
            if ((Rn(document, qo, this.move), Rn(document, En, this.end), !this.drag)) return
            J0()
            const n = this.getSortable(this.placeholder)
            this === n
              ? this.origin.index !== fi(this.placeholder) &&
                Pe(this.$el, 'moved', [this, this.placeholder])
              : (Pe(n.$el, 'added', [n, this.placeholder]),
                Pe(this.$el, 'removed', [this, this.placeholder])),
              Pe(this.$el, 'stop', [this, this.placeholder]),
              qt(this.drag),
              (this.drag = null)
            for (const { clsPlaceholder: r, clsItem: l } of this.touched)
              for (const d of this.touched) Ne(d.items, r, l)
            ;(this.touched = null), Ne(document.documentElement, this.clsDragState)
          },
          insert(n, r) {
            ve(this.items, this.clsItem)
            const l = () => (r ? Fo(r, n) : mt(this.target, n))
            this.animate(l)
          },
          remove(n) {
            this.target.contains(n) && this.animate(() => qt(n))
          },
          getSortable(n) {
            do {
              const r = this.$getComponent(n, 'sortable')
              if (r && (r === this || (this.group !== !1 && r.group === this.group))) return r
            } while ((n = it(n)))
          },
        },
      }
    let Tc
    function X0(n) {
      let r = Date.now()
      Tc = setInterval(() => {
        let { x: l, y: d } = n
        d += document.scrollingElement.scrollTop
        const _ = (Date.now() - r) * 0.3
        ;(r = Date.now()),
          vi(document.elementFromPoint(l, n.y))
            .reverse()
            .some((k) => {
              let { scrollTop: C, scrollHeight: P } = k
              const { top: H, bottom: q, height: J } = Yt(k)
              if (H < d && H + 35 > d) C -= _
              else if (q > d && q - 35 < d) C += _
              else return
              if (C > 0 && C < P - J) return (k.scrollTop = C), !0
            })
      }, 15)
    }
    function J0() {
      clearInterval(Tc)
    }
    function Q0(n, r) {
      let l
      if (xt(r, 'li', 'tr')) {
        ;(l = He('<div>')), mt(l, r.cloneNode(!0).children)
        for (const d of r.getAttributeNames()) he(l, d, r.getAttribute(d))
      } else l = r.cloneNode(!0)
      return (
        mt(n, l),
        X(l, 'margin', '0', 'important'),
        X(l, {
          boxSizing: 'border-box',
          width: r.offsetWidth,
          height: r.offsetHeight,
          padding: X(r, 'padding'),
        }),
        Ft(l.firstElementChild, Ft(r.firstElementChild)),
        l
      )
    }
    function ep(n, r) {
      return n[w(n, (l) => Le(r, l.getBoundingClientRect()))]
    }
    function tp(n, r, l, d, _, k) {
      if (!ct(n).length) return
      const C = r.getBoundingClientRect()
      if (!k) return np(n, l) || _ < C.top + C.height / 2 ? r : r.nextElementSibling
      const P = l.getBoundingClientRect(),
        H = Lc([C.top, C.bottom], [P.top, P.bottom]),
        [q, J, fe, pe] = H ? [d, 'width', 'left', 'right'] : [_, 'height', 'top', 'bottom'],
        Se = P[J] < C[J] ? C[J] - P[J] : 0
      return P[fe] < C[fe]
        ? Se && q < C[fe] + Se
          ? !1
          : r.nextElementSibling
        : Se && q > C[pe] - Se
          ? !1
          : r
    }
    function np(n, r) {
      const l = ct(n).length === 1
      l && mt(n, r)
      const d = ct(n),
        _ = d.some((k, C) => {
          const P = k.getBoundingClientRect()
          return d.slice(C + 1).some((H) => {
            const q = H.getBoundingClientRect()
            return !Lc([P.left, P.right], [q.left, q.right])
          })
        })
      return l && qt(r), _
    }
    function Lc(n, r) {
      return n[1] > r[0] && r[1] > n[0]
    }
    var Ac = {
      props: { pos: String, offset: null, flip: Boolean, shift: Boolean, inset: Boolean },
      data: {
        pos: 'bottom-'.concat(Et ? 'right' : 'left'),
        offset: !1,
        flip: !0,
        shift: !0,
        inset: !1,
      },
      connected() {
        ;(this.pos = this.$props.pos.split('-').concat('center').slice(0, 2)),
          ([this.dir, this.align] = this.pos),
          (this.axis = v(['top', 'bottom'], this.dir) ? 'y' : 'x')
      },
      methods: {
        positionAt(n, r, l) {
          let d = [this.getPositionOffset(n), this.getShiftOffset(n)]
          const _ = [this.flip && 'flip', this.shift && 'shift'],
            k = {
              element: [this.inset ? this.dir : jo(this.dir), this.align],
              target: [this.dir, this.align],
            }
          if (this.axis === 'y') {
            for (const H in k) k[H].reverse()
            d.reverse(), _.reverse()
          }
          const C = ip(n),
            P = Fe(n)
          X(n, { top: -P.height, left: -P.width }),
            Cl(n, r, {
              attach: k,
              offset: d,
              boundary: l,
              placement: _,
              viewportOffset: this.getViewportOffset(n),
            }),
            C()
        },
        getPositionOffset(n) {
          return (
            Dt(
              this.offset === !1 ? X(n, '--uk-position-offset') : this.offset,
              this.axis === 'x' ? 'width' : 'height',
              n,
            ) *
            (v(['left', 'top'], this.dir) ? -1 : 1) *
            (this.inset ? -1 : 1)
          )
        },
        getShiftOffset(n) {
          return this.align === 'center'
            ? 0
            : Dt(X(n, '--uk-position-shift-offset'), this.axis === 'y' ? 'width' : 'height', n) *
                (v(['left', 'top'], this.align) ? 1 : -1)
        },
        getViewportOffset(n) {
          return Dt(X(n, '--uk-position-viewport-offset'))
        },
      },
    }
    function ip(n) {
      const r = un(n),
        { scrollTop: l } = r
      return () => {
        l !== r.scrollTop && (r.scrollTop = l)
      }
    }
    var op = {
      mixins: [lo, jn, Ac],
      data: { pos: 'top', animation: ['uk-animation-scale-up'], duration: 100, cls: 'uk-active' },
      connected() {
        sp(this.$el)
      },
      disconnected() {
        this.hide()
      },
      methods: {
        show() {
          if (this.isToggled(this.tooltip || null)) return
          const { delay: n = 0, title: r } = ap(this.$options)
          if (!r) return
          const l = he(this.$el, 'title'),
            d = Ue(this.$el, ['blur', no], (k) => !gn(k) && this.hide())
          this.reset = () => {
            he(this.$el, { title: l, 'aria-describedby': null }), d()
          }
          const _ = Kn(this)
          he(this.$el, { title: null, 'aria-describedby': _ }),
            clearTimeout(this.showTimer),
            (this.showTimer = setTimeout(() => this._show(r, _), n))
        },
        async hide() {
          var n
          st(this.$el, 'input:focus') ||
            (clearTimeout(this.showTimer),
            this.isToggled(this.tooltip || null) &&
              (await this.toggleElement(this.tooltip, !1, !1)),
            (n = this.reset) == null || n.call(this),
            qt(this.tooltip),
            (this.tooltip = null))
        },
        async _show(n, r) {
          ;(this.tooltip = mt(
            this.container,
            '<div id="'
              .concat(r, '" class="uk-')
              .concat(this.$options.name, '" role="tooltip"> <div class="uk-')
              .concat(this.$options.name, '-inner">')
              .concat(n, '</div> </div>'),
          )),
            Ue(this.tooltip, 'toggled', (l, d) => {
              if (!d) return
              const _ = () => this.positionAt(this.tooltip, this.$el)
              _()
              const [k, C] = rp(this.tooltip, this.$el, this.pos)
              this.origin =
                this.axis === 'y'
                  ? ''.concat(jo(k), '-').concat(C)
                  : ''.concat(C, '-').concat(jo(k))
              const P = [
                bt(
                  document,
                  'keydown '.concat(rn),
                  this.hide,
                  !1,
                  (H) =>
                    (H.type === rn && !this.$el.contains(H.target)) ||
                    (H.type === 'keydown' && H.keyCode === ot.ESC),
                ),
                Ue([document, ...Gn(this.$el)], 'scroll', _, { passive: !0 }),
              ]
              bt(this.tooltip, 'hide', () => P.forEach((H) => H()), { self: !0 })
            }),
            (await this.toggleElement(this.tooltip, !0)) || this.hide()
        },
      },
      events: {
        ['focus '.concat(bi, ' ').concat(rn)](n) {
          gn(n) || this.show()
        },
      },
    }
    function sp(n) {
      Ho(n) || he(n, 'tabindex', '0')
    }
    function rp(n, r, [l, d]) {
      const _ = Xe(n),
        k = Xe(r),
        C = [
          ['left', 'right'],
          ['top', 'bottom'],
        ]
      for (const H of C) {
        if (_[H[0]] >= k[H[1]]) {
          l = H[1]
          break
        }
        if (_[H[1]] <= k[H[0]]) {
          l = H[0]
          break
        }
      }
      const P = v(C[0], l) ? C[1] : C[0]
      return (
        _[P[0]] === k[P[0]] ? (d = P[0]) : _[P[1]] === k[P[1]] ? (d = P[1]) : (d = 'center'), [l, d]
      )
    }
    function ap(n) {
      const { el: r, id: l, data: d } = n
      return ['delay', 'title'].reduce((_, k) => ({ [k]: Ae(r, k), ..._ }), {
        ...yi(Ae(r, l), ['title']),
        ...d,
      })
    }
    var lp = {
      mixins: [ts],
      i18n: {
        invalidMime: 'Invalid File Type: %s',
        invalidName: 'Invalid File Name: %s',
        invalidSize: 'Invalid File Size: %s Kilobytes Max',
      },
      props: {
        allow: String,
        clsDragover: String,
        concurrent: Number,
        maxSize: Number,
        method: String,
        mime: String,
        multiple: Boolean,
        name: String,
        params: Object,
        type: String,
        url: String,
      },
      data: {
        allow: !1,
        clsDragover: 'uk-dragover',
        concurrent: 1,
        maxSize: 0,
        method: 'POST',
        mime: !1,
        multiple: !1,
        name: 'files[]',
        params: {},
        type: '',
        url: '',
        abort: de,
        beforeAll: de,
        beforeSend: de,
        complete: de,
        completeAll: de,
        error: de,
        fail: de,
        load: de,
        loadEnd: de,
        loadStart: de,
        progress: de,
      },
      events: {
        change(n) {
          st(n.target, 'input[type="file"]') &&
            (n.preventDefault(),
            n.target.files && this.upload(n.target.files),
            (n.target.value = ''))
        },
        drop(n) {
          us(n)
          const r = n.dataTransfer
          r != null && r.files && (Ne(this.$el, this.clsDragover), this.upload(r.files))
        },
        dragenter(n) {
          us(n)
        },
        dragover(n) {
          us(n), ve(this.$el, this.clsDragover)
        },
        dragleave(n) {
          us(n), Ne(this.$el, this.clsDragover)
        },
      },
      methods: {
        async upload(n) {
          if (((n = x(n)), !n.length)) return
          Pe(this.$el, 'upload', [n])
          for (const d of n) {
            if (this.maxSize && this.maxSize * 1e3 < d.size) {
              this.fail(this.t('invalidSize', this.maxSize))
              return
            }
            if (this.allow && !Mc(this.allow, d.name)) {
              this.fail(this.t('invalidName', this.allow))
              return
            }
            if (this.mime && !Mc(this.mime, d.type)) {
              this.fail(this.t('invalidMime', this.mime))
              return
            }
          }
          this.multiple || (n = n.slice(0, 1)), this.beforeAll(this, n)
          const r = cp(n, this.concurrent),
            l = async (d) => {
              const _ = new FormData()
              d.forEach((k) => _.append(this.name, k))
              for (const k in this.params) _.append(k, this.params[k])
              try {
                const k = await up(this.url, {
                  data: _,
                  method: this.method,
                  responseType: this.type,
                  beforeSend: (C) => {
                    const { xhr: P } = C
                    Ue(P.upload, 'progress', this.progress)
                    for (const H of ['loadStart', 'load', 'loadEnd', 'abort'])
                      Ue(P, H.toLowerCase(), this[H])
                    return this.beforeSend(C)
                  },
                })
                this.complete(k), r.length ? await l(r.shift()) : this.completeAll(k)
              } catch (k) {
                this.error(k)
              }
            }
          await l(r.shift())
        },
      },
    }
    function Mc(n, r) {
      return r.match(
        new RegExp(
          '^'.concat(
            n
              .replace(/\//g, '\\/')
              .replace(/\*\*/g, '(\\/[^\\/]+)*')
              .replace(/\*/g, '[^\\/]+')
              .replace(/((?!\\))\?/g, '$1.'),
            '$',
          ),
          'i',
        ),
      )
    }
    function cp(n, r) {
      const l = []
      for (let d = 0; d < n.length; d += r) l.push(n.slice(d, d + r))
      return l
    }
    function us(n) {
      n.preventDefault(), n.stopPropagation()
    }
    function up(n, r) {
      const l = {
        data: null,
        method: 'GET',
        headers: {},
        xhr: new XMLHttpRequest(),
        beforeSend: de,
        responseType: '',
        ...r,
      }
      return Promise.resolve()
        .then(() => l.beforeSend(l))
        .then(() => hp(n, l))
    }
    function hp(n, r) {
      return new Promise((l, d) => {
        const { xhr: _ } = r
        for (const k in r)
          if (k in _)
            try {
              _[k] = r[k]
            } catch (C) {}
        _.open(r.method.toUpperCase(), n)
        for (const k in r.headers) _.setRequestHeader(k, r.headers[k])
        Ue(_, 'load', () => {
          _.status === 0 || (_.status >= 200 && _.status < 300) || _.status === 304
            ? l(_)
            : d(S(Error(_.statusText), { xhr: _, status: _.status }))
        }),
          Ue(_, 'error', () => d(S(Error('Network Error'), { xhr: _ }))),
          Ue(_, 'timeout', () => d(S(Error('Network Timeout'), { xhr: _ }))),
          _.send(r.data)
      })
    }
    var fp = Object.freeze({
      __proto__: null,
      Countdown: $1,
      Filter: H1,
      Lightbox: A0,
      LightboxPanel: cc,
      Notification: P0,
      Parallax: U0,
      Slider: G0,
      SliderParallax: Cc,
      Slideshow: K0,
      SlideshowParallax: Cc,
      Sortable: Z0,
      Tooltip: op,
      Upload: lp,
    })
    function dp(n) {
      xn &&
        window.MutationObserver &&
        (document.body
          ? requestAnimationFrame(() => Pc(n))
          : new MutationObserver((r, l) => {
              document.body && (Pc(n), l.disconnect())
            }).observe(document.documentElement, { childList: !0 }))
    }
    function Pc(n) {
      Pe(document, 'uikit:init', n),
        document.body && _n(document.body, Ic),
        new MutationObserver((r) => r.forEach(pp)).observe(document, {
          subtree: !0,
          childList: !0,
        }),
        new MutationObserver((r) => r.forEach(mp)).observe(document, {
          subtree: !0,
          attributes: !0,
        }),
        (n._initialized = !0)
    }
    function pp({ addedNodes: n, removedNodes: r }) {
      for (const l of n) _n(l, Ic)
      for (const l of r) _n(l, gp)
    }
    function mp({ target: n, attributeName: r }) {
      var l
      const d = Nc(r)
      if (d) {
        if (nt(n, r)) {
          ho(d, n)
          return
        }
        ;(l = ns(n, d)) == null || l.$destroy()
      }
    }
    function Ic(n) {
      const r = Yn(n)
      for (const l in Yn(n)) Tr(r[l])
      for (const l of n.getAttributeNames()) {
        const d = Nc(l)
        d && ho(d, n)
      }
    }
    function gp(n) {
      const r = Yn(n)
      for (const l in Yn(n)) Lr(r[l])
    }
    function Nc(n) {
      g(n, 'data-') && (n = n.slice(5))
      const r = Ci[n]
      return r && (B(r) ? r : r.options).name
    }
    x0(Zt), E0(Zt)
    var Oc = {
      mixins: [Gt, jn],
      props: {
        animation: Boolean,
        targets: String,
        active: null,
        collapsible: Boolean,
        multiple: Boolean,
        toggle: String,
        content: String,
        offset: Number,
      },
      data: {
        targets: '> *',
        active: !1,
        animation: !0,
        collapsible: !0,
        multiple: !1,
        clsOpen: 'uk-open',
        toggle: '> .uk-accordion-title',
        content: '> .uk-accordion-content',
        offset: 0,
      },
      computed: {
        items: ({ targets: n }, r) => ut(n, r),
        toggles({ toggle: n }) {
          return this.items.map((r) => He(n, r))
        },
        contents({ content: n }) {
          return this.items.map((r) => {
            var l
            return ((l = r._wrapper) == null ? void 0 : l.firstElementChild) || He(n, r)
          })
        },
      },
      watch: {
        items(n, r) {
          if (r || Oe(n, this.clsOpen)) return
          const l = (this.active !== !1 && n[Number(this.active)]) || (!this.collapsible && n[0])
          l && this.toggle(l, !1)
        },
        toggles() {
          this.$emit()
        },
        contents(n) {
          for (const r of n) {
            const l = Oe(
              this.items.find((d) => d.contains(r)),
              this.clsOpen,
            )
            hs(r, !l)
          }
          this.$emit()
        },
      },
      observe: ro(),
      events: [
        {
          name: 'click keydown',
          delegate() {
            return ''.concat(this.targets, ' ').concat(this.$props.toggle)
          },
          async handler(n) {
            var r
            ;(n.type === 'keydown' && n.keyCode !== ot.SPACE) ||
              (n.preventDefault(),
              (r = this._off) == null || r.call(this),
              (this._off = bp(n.target)),
              await this.toggle(fi(this.toggles, n.current)),
              this._off())
          },
        },
        {
          name: 'shown hidden',
          self: !0,
          delegate() {
            return this.targets
          },
          handler() {
            this.$emit()
          },
        },
      ],
      update() {
        const n = Ki(this.items, '.'.concat(this.clsOpen))
        for (const r in this.items) {
          const l = this.toggles[r],
            d = this.contents[r]
          if (!l || !d) continue
          ;(l.id = Kn(this, l)), (d.id = Kn(this, d))
          const _ = v(n, this.items[r])
          he(l, {
            role: xt(l, 'a') ? 'button' : null,
            'aria-controls': d.id,
            'aria-expanded': _,
            'aria-disabled': !this.collapsible && n.length < 2 && _,
          }),
            he(d, { role: 'region', 'aria-labelledby': l.id }),
            xt(d, 'ul') && he(ct(d), 'role', 'presentation')
        }
      },
      methods: {
        toggle(n, r) {
          n = this.items[Ge(n, this.items)]
          let l = [n]
          const d = Ki(this.items, '.'.concat(this.clsOpen))
          if (
            (!this.multiple && !v(d, l[0]) && (l = l.concat(d)),
            !(!this.collapsible && d.length < 2 && v(d, n)))
          )
            return Promise.all(
              l.map((_) =>
                this.toggleElement(_, !v(d, _), (k, C) => {
                  if ((ze(k, this.clsOpen, C), r === !1 || !this.animation)) {
                    hs(He(this.content, k), !C)
                    return
                  }
                  return _p(k, C, this)
                }),
              ),
            )
        },
      },
    }
    function hs(n, r) {
      n && (n.hidden = r)
    }
    async function _p(n, r, { content: l, duration: d, velocity: _, transition: k }) {
      var C
      ;(l = ((C = n._wrapper) == null ? void 0 : C.firstElementChild) || He(l, n)),
        n._wrapper || (n._wrapper = Go(l, '<div>'))
      const P = n._wrapper
      X(P, 'overflow', 'hidden')
      const H = I(X(P, 'height'))
      await rt.cancel(P), hs(l, !1)
      const q = ke(['marginTop', 'marginBottom'], (fe) => X(l, fe)) + Fe(l).height,
        J = H / q
      ;(d = (_ * q + d) * (r ? 1 - J : J)),
        X(P, 'height', H),
        await rt.start(P, { height: r ? q : 0 }, d, k),
        Qi(l),
        delete n._wrapper,
        r || hs(l, !0)
    }
    function bp(n) {
      const r = un(n, !0)
      let l
      return (
        (function d() {
          l = requestAnimationFrame(() => {
            const { top: _ } = n.getBoundingClientRect()
            _ < 0 && (r.scrollTop += _), d()
          })
        })(),
        () => requestAnimationFrame(() => cancelAnimationFrame(l))
      )
    }
    var vp = {
      mixins: [Gt, jn],
      args: 'animation',
      props: { animation: Boolean, close: String },
      data: { animation: !0, selClose: '.uk-alert-close', duration: 150 },
      events: {
        name: 'click',
        delegate() {
          return this.selClose
        },
        handler(n) {
          n.preventDefault(), this.close()
        },
      },
      methods: {
        async close() {
          await this.toggleElement(this.$el, !1, yp), this.$destroy(!0)
        },
      },
    }
    function yp(n, r, { duration: l, transition: d, velocity: _ }) {
      const k = I(X(n, 'height'))
      return (
        X(n, 'height', k),
        rt.start(
          n,
          {
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
            borderTop: 0,
            borderBottom: 0,
            opacity: 0,
          },
          _ * k + l,
          d,
        )
      )
    }
    var Bc = {
        args: 'autoplay',
        props: { automute: Boolean, autoplay: Boolean },
        data: { automute: !1, autoplay: !0 },
        connected() {
          this.autoplay === 'inview' && !nt(this.$el, 'preload') && (this.$el.preload = 'none'),
            xt(this.$el, 'iframe') && !nt(this.$el, 'allow') && (this.$el.allow = 'autoplay'),
            this.automute && _l(this.$el)
        },
        observe: [
          wi({
            filter: ({ $el: n, autoplay: r }) => r && bl(n),
            handler([{ isIntersecting: n }]) {
              n ? ml(this.$el) : gl(this.$el)
            },
            args: { intersecting: !1 },
            options: ({ $el: n, autoplay: r }) => ({ root: r === 'inview' ? null : it(n) }),
          }),
        ],
      },
      wp = {
        mixins: [Bc],
        props: { width: Number, height: Number },
        data: { automute: !0 },
        events: {
          'load loadedmetadata'() {
            this.$emit('resize')
          },
        },
        observe: an({ target: ({ $el: n }) => [Dc(n) || it(n)], filter: ({ $el: n }) => !Rc(n) }),
        update: {
          read() {
            if (Rc(this.$el)) return
            const { ratio: n, cover: r } = Ve,
              { $el: l, width: d, height: _ } = this
            let k = { width: d, height: _ }
            if (!d || !_) {
              const q = {
                width: l.naturalWidth || l.videoWidth || l.clientWidth,
                height: l.naturalHeight || l.videoHeight || l.clientHeight,
              }
              d ? (k = n(q, 'width', d)) : _ ? (k = n(q, 'height', _)) : (k = q)
            }
            const { offsetHeight: C, offsetWidth: P } = Dc(l) || it(l),
              H = r(k, { width: P + (P % 2 ? 1 : 0), height: C + (C % 2 ? 1 : 0) })
            return !H.width || !H.height ? !1 : H
          },
          write({ height: n, width: r }) {
            X(this.$el, { height: n, width: r })
          },
          events: ['resize'],
        },
      }
    function Dc(n) {
      for (; (n = it(n)); ) if (X(n, 'position') !== 'static') return n
    }
    function Rc(n) {
      return xt(n, 'img', 'video')
    }
    let Ot
    var Hc = {
      mixins: [lo, Ac, jn],
      args: 'pos',
      props: {
        mode: 'list',
        toggle: Boolean,
        boundary: Boolean,
        boundaryX: Boolean,
        boundaryY: Boolean,
        target: Boolean,
        targetX: Boolean,
        targetY: Boolean,
        stretch: Boolean,
        delayShow: Number,
        delayHide: Number,
        autoUpdate: Boolean,
        clsDrop: String,
        animateOut: Boolean,
        bgScroll: Boolean,
        closeOnScroll: Boolean,
      },
      data: {
        mode: ['click', 'hover'],
        toggle: '- *',
        boundary: !1,
        boundaryX: !1,
        boundaryY: !1,
        target: !1,
        targetX: !1,
        targetY: !1,
        stretch: !1,
        delayShow: 0,
        delayHide: 800,
        autoUpdate: !0,
        clsDrop: !1,
        animateOut: !1,
        bgScroll: !0,
        animation: ['uk-animation-fade'],
        cls: 'uk-open',
        container: !1,
        closeOnScroll: !1,
      },
      computed: {
        boundary({ boundary: n, boundaryX: r, boundaryY: l }, d) {
          return [Vt(r || n, d) || window, Vt(l || n, d) || window]
        },
        target({ target: n, targetX: r, targetY: l }, d) {
          return (
            r || (r = n || this.targetEl),
            l || (l = n || this.targetEl),
            [r === !0 ? window : Vt(r, d), l === !0 ? window : Vt(l, d)]
          )
        },
      },
      created() {
        this.tracker = new sr()
      },
      beforeConnect() {
        this.clsDrop = this.$props.clsDrop || 'uk-'.concat(this.$options.name)
      },
      connected() {
        ve(this.$el, 'uk-drop', this.clsDrop),
          this.toggle && !this.targetEl && (this.targetEl = Cp(this)),
          (this._style = $e(this.$el.style, ['width', 'height']))
      },
      disconnected() {
        this.isActive() && (this.hide(!1), (Ot = null)), X(this.$el, this._style)
      },
      observe: ro({ target: ({ toggle: n, $el: r }) => Vt(n, r), targets: ({ $el: n }) => n }),
      events: [
        {
          name: 'click',
          delegate() {
            return '.uk-drop-close'
          },
          handler(n) {
            n.preventDefault(), this.hide(!1)
          },
        },
        {
          name: 'click',
          delegate() {
            return 'a[href*="#"]'
          },
          handler({ defaultPrevented: n, current: r }) {
            const { hash: l } = r
            !n && l && di(r) && !this.$el.contains(He(l)) && this.hide(!1)
          },
        },
        {
          name: 'beforescroll',
          handler() {
            this.hide(!1)
          },
        },
        {
          name: 'toggle',
          self: !0,
          handler(n, r) {
            n.preventDefault(),
              this.isToggled() ? this.hide(!1) : this.show(r == null ? void 0 : r.$el, !1)
          },
        },
        {
          name: 'toggleshow',
          self: !0,
          handler(n, r) {
            n.preventDefault(), this.show(r == null ? void 0 : r.$el)
          },
        },
        {
          name: 'togglehide',
          self: !0,
          handler(n) {
            n.preventDefault(), st(this.$el, ':focus,:hover') || this.hide()
          },
        },
        {
          name: ''.concat(bi, ' focusin'),
          filter() {
            return v(this.mode, 'hover')
          },
          handler(n) {
            gn(n) || this.clearTimers()
          },
        },
        {
          name: ''.concat(no, ' focusout'),
          filter() {
            return v(this.mode, 'hover')
          },
          handler(n) {
            !gn(n) && n.relatedTarget && this.hide()
          },
        },
        {
          name: 'toggled',
          self: !0,
          handler(n, r) {
            r && (this.clearTimers(), this.position())
          },
        },
        {
          name: 'show',
          self: !0,
          handler() {
            ;(Ot = this), this.tracker.init(), he(this.targetEl, 'aria-expanded', !0)
            const n = [
              xp(this),
              Ep(this),
              Tp(this),
              this.autoUpdate && zc(this),
              this.closeOnScroll && Sp(this),
              !this.bgScroll && Vl(this.$el),
            ]
            bt(this.$el, 'hide', () => n.forEach((r) => r && r()), { self: !0 })
          },
        },
        {
          name: 'beforehide',
          self: !0,
          handler() {
            this.clearTimers()
          },
        },
        {
          name: 'hide',
          handler({ target: n }) {
            if (this.$el !== n) {
              Ot = Ot === null && this.$el.contains(n) && this.isToggled() ? this : Ot
              return
            }
            ;(Ot = this.isActive() ? null : Ot),
              this.tracker.cancel(),
              he(this.targetEl, 'aria-expanded', null)
          },
        },
      ],
      update: {
        write() {
          this.isToggled() && !Oe(this.$el, this.clsEnter) && this.position()
        },
      },
      methods: {
        show(n = this.targetEl, r = !0) {
          if (
            (this.isToggled() && n && this.targetEl && n !== this.targetEl && this.hide(!1, !1),
            (this.targetEl = n),
            this.clearTimers(),
            !this.isActive())
          ) {
            if (Ot) {
              if (r && Ot.isDelaying) {
                this.showTimer = setTimeout(() => st(n, ':hover') && this.show(), 10)
                return
              }
              let l
              for (; Ot && l !== Ot && !Ot.$el.contains(this.$el); ) (l = Ot), Ot.hide(!1, !1)
            }
            this.container && it(this.$el) !== this.container && mt(this.container, this.$el),
              (this.showTimer = setTimeout(
                () => this.toggleElement(this.$el, !0),
                (r && this.delayShow) || 0,
              ))
          }
        },
        hide(n = !0, r = !0) {
          const l = () => this.toggleElement(this.$el, !1, this.animateOut && r)
          this.clearTimers(),
            (this.isDelayedHide = n),
            (this.isDelaying = kp(this.$el).some((d) => this.tracker.movesTo(d))),
            n && this.isDelaying
              ? (this.hideTimer = setTimeout(this.hide, 50))
              : n && this.delayHide
                ? (this.hideTimer = setTimeout(l, this.delayHide))
                : l()
        },
        clearTimers() {
          clearTimeout(this.showTimer),
            clearTimeout(this.hideTimer),
            (this.showTimer = null),
            (this.hideTimer = null),
            (this.isDelaying = !1)
        },
        isActive() {
          return Ot === this
        },
        position() {
          Ne(this.$el, 'uk-drop-stack'), X(this.$el, this._style), (this.$el.hidden = !0)
          const n = this.target.map((_) => $p(this.$el, _)),
            r = this.getViewportOffset(this.$el),
            l = [
              [0, ['x', 'width', 'left', 'right']],
              [1, ['y', 'height', 'top', 'bottom']],
            ]
          for (const [_, [k, C]] of l)
            this.axis !== k &&
              v([k, !0], this.stretch) &&
              X(this.$el, {
                [C]: Math.min(Xe(this.boundary[_])[C], n[_][C] - 2 * r),
                ['overflow-'.concat(k)]: 'auto',
              })
          const d = n[0].width - 2 * r
          ;(this.$el.hidden = !1),
            X(this.$el, 'maxWidth', ''),
            this.$el.offsetWidth > d && ve(this.$el, 'uk-drop-stack'),
            X(this.$el, 'maxWidth', d),
            this.positionAt(this.$el, this.target, this.boundary)
          for (const [_, [k, C, P, H]] of l)
            if (this.axis === k && v([k, !0], this.stretch)) {
              const q = Math.abs(this.getPositionOffset(this.$el)),
                J = Xe(this.target[_]),
                fe = Xe(this.$el)
              X(this.$el, {
                [C]:
                  (J[P] > fe[P]
                    ? J[this.inset ? H : P] - Math.max(Xe(this.boundary[_])[P], n[_][P] + r)
                    : Math.min(Xe(this.boundary[_])[H], n[_][H] - r) - J[this.inset ? P : H]) - q,
                ['overflow-'.concat(k)]: 'auto',
              }),
                this.positionAt(this.$el, this.target, this.boundary)
            }
        },
      },
    }
    function kp(n) {
      const r = []
      return _n(n, (l) => X(l, 'position') !== 'static' && r.push(l)), r
    }
    function $p(n, r) {
      return Yt(Gn(r).find((l) => l.contains(n)))
    }
    function Cp(n) {
      const { $el: r } = n.$create('toggle', Vt(n.toggle, n.$el), { target: n.$el, mode: n.mode })
      return he(r, 'aria-haspopup', !0), r
    }
    function xp(n) {
      const r = () => n.$emit(),
        l = [rr(r), io(Gn(n.$el).concat(n.target), r)]
      return () => l.map((d) => d.disconnect())
    }
    function zc(n, r = () => n.$emit()) {
      return Ue([document, ...Gn(n.$el)], 'scroll', r, { passive: !0 })
    }
    function Ep(n) {
      return Ue(document, 'keydown', (r) => {
        r.keyCode === ot.ESC && n.hide(!1)
      })
    }
    function Sp(n) {
      return zc(n, () => n.hide(!1))
    }
    function Tp(n) {
      return Ue(document, rn, ({ target: r }) => {
        n.$el.contains(r) ||
          bt(
            document,
            ''.concat(En, ' ').concat(Yo, ' scroll'),
            ({ defaultPrevented: l, type: d, target: _ }) => {
              !l && d === En && r === _ && !(n.targetEl && el(r, n.targetEl)) && n.hide(!1)
            },
            !0,
          )
      })
    }
    var Uc = {
      mixins: [Gt, lo],
      props: {
        align: String,
        clsDrop: String,
        boundary: Boolean,
        dropbar: Boolean,
        dropbarAnchor: Boolean,
        duration: Number,
        mode: Boolean,
        offset: Boolean,
        stretch: Boolean,
        delayShow: Boolean,
        delayHide: Boolean,
        target: Boolean,
        targetX: Boolean,
        targetY: Boolean,
        animation: Boolean,
        animateOut: Boolean,
        closeOnScroll: Boolean,
      },
      data: {
        align: Et ? 'right' : 'left',
        clsDrop: 'uk-dropdown',
        clsDropbar: 'uk-dropnav-dropbar',
        boundary: !0,
        dropbar: !1,
        dropbarAnchor: !1,
        duration: 200,
        container: !1,
        selNavItem: '> li > a, > ul > li > a',
      },
      computed: {
        dropbarAnchor: ({ dropbarAnchor: n }, r) => Vt(n, r) || r,
        dropbar({ dropbar: n }) {
          return n
            ? ((n =
                this._dropbar || Vt(n, this.$el) || He('+ .'.concat(this.clsDropbar), this.$el)),
              n || (this._dropbar = He('<div></div>')))
            : null
        },
        dropbarOffset() {
          return 0
        },
        dropContainer(n, r) {
          return this.container || r
        },
        dropdowns({ clsDrop: n }, r) {
          var l
          const d = ut('.'.concat(n), r)
          if (this.dropContainer !== r)
            for (const _ of ut('.'.concat(n), this.dropContainer)) {
              const k = (l = this.getDropdown(_)) == null ? void 0 : l.targetEl
              !v(d, _) && k && this.$el.contains(k) && d.push(_)
            }
          return d
        },
        items({ selNavItem: n }, r) {
          return ut(n, r)
        },
      },
      watch: {
        dropbar(n) {
          ve(
            n,
            'uk-dropbar',
            'uk-dropbar-top',
            this.clsDropbar,
            'uk-'.concat(this.$options.name, '-dropbar'),
          )
        },
        dropdowns() {
          this.initializeDropdowns()
        },
      },
      connected() {
        this.initializeDropdowns()
      },
      disconnected() {
        qt(this._dropbar), delete this._dropbar
      },
      events: [
        {
          name: 'mouseover focusin',
          delegate() {
            return this.selNavItem
          },
          handler({ current: n }) {
            const r = this.getActive()
            r &&
              v(r.mode, 'hover') &&
              r.targetEl &&
              !n.contains(r.targetEl) &&
              !r.isDelaying &&
              r.hide(!1)
          },
        },
        {
          name: 'keydown',
          self: !0,
          delegate() {
            return this.selNavItem
          },
          handler(n) {
            var r
            const { current: l, keyCode: d } = n,
              _ = this.getActive()
            d === ot.DOWN &&
              (_ == null ? void 0 : _.targetEl) === l &&
              (n.preventDefault(), (r = He(Yi, _.$el)) == null || r.focus()),
              Fc(n, this.items, _)
          },
        },
        {
          name: 'keydown',
          el() {
            return this.dropContainer
          },
          delegate() {
            return '.'.concat(this.clsDrop)
          },
          handler(n) {
            var r
            const { current: l, keyCode: d } = n
            if (!v(this.dropdowns, l)) return
            const _ = this.getActive()
            let k = -1
            if (
              (d === ot.HOME
                ? (k = 0)
                : d === ot.END
                  ? (k = 'last')
                  : d === ot.UP
                    ? (k = 'previous')
                    : d === ot.DOWN
                      ? (k = 'next')
                      : d === ot.ESC && ((r = _.targetEl) == null || r.focus()),
              ~k)
            ) {
              n.preventDefault()
              const C = ut(Yi, l)
              C[
                Ge(
                  k,
                  C,
                  w(C, (P) => st(P, ':focus')),
                )
              ].focus()
            }
            Fc(n, this.items, _)
          },
        },
        {
          name: 'mouseleave',
          el() {
            return this.dropbar
          },
          filter() {
            return this.dropbar
          },
          handler() {
            const n = this.getActive()
            n && v(n.mode, 'hover') && !this.dropdowns.some((r) => st(r, ':hover')) && n.hide()
          },
        },
        {
          name: 'beforeshow',
          el() {
            return this.dropContainer
          },
          filter() {
            return this.dropbar
          },
          handler({ target: n }) {
            this.isDropbarDrop(n) &&
              (this.dropbar.previousElementSibling !== this.dropbarAnchor &&
                Wo(this.dropbarAnchor, this.dropbar),
              ve(n, ''.concat(this.clsDrop, '-dropbar')))
          },
        },
        {
          name: 'show',
          el() {
            return this.dropContainer
          },
          filter() {
            return this.dropbar
          },
          handler({ target: n }) {
            if (!this.isDropbarDrop(n)) return
            const r = this.getDropdown(n),
              l = () => {
                const d = Dn(n, '.'.concat(this.clsDrop))
                    .concat(n)
                    .map((P) => Xe(P)),
                  _ = Math.min(...d.map(({ top: P }) => P)),
                  k = Math.max(...d.map(({ bottom: P }) => P)),
                  C = Xe(this.dropbar)
                X(this.dropbar, 'top', this.dropbar.offsetTop - (C.top - _) - this.dropbarOffset),
                  this.transitionTo(k - _ + I(X(n, 'marginBottom')) + this.dropbarOffset, n)
              }
            ;(this._observer = io([r.$el, ...r.target], l)), l()
          },
        },
        {
          name: 'beforehide',
          el() {
            return this.dropContainer
          },
          filter() {
            return this.dropbar
          },
          handler(n) {
            const r = this.getActive()
            st(this.dropbar, ':hover') &&
              r.$el === n.target &&
              v(r.mode, 'hover') &&
              r.isDelayedHide &&
              !this.items.some((l) => r.targetEl !== l && st(l, ':focus')) &&
              n.preventDefault()
          },
        },
        {
          name: 'hide',
          el() {
            return this.dropContainer
          },
          filter() {
            return this.dropbar
          },
          handler({ target: n }) {
            var r
            if (!this.isDropbarDrop(n)) return
            ;(r = this._observer) == null || r.disconnect()
            const l = this.getActive()
            ;(!l || l.$el === n) && this.transitionTo(0)
          },
        },
      ],
      methods: {
        getActive() {
          var n
          return v(this.dropdowns, (n = Ot) == null ? void 0 : n.$el) && Ot
        },
        async transitionTo(n, r) {
          const { dropbar: l } = this,
            d = Ft(l)
          ;(r = d < n && r),
            await rt.cancel([r, l]),
            X(r, 'clipPath', 'polygon(0 0,100% 0,100% '.concat(d, 'px,0 ').concat(d, 'px)')),
            Ft(l, d),
            await Promise.all([
              rt.start(l, { height: n }, this.duration),
              rt
                .start(
                  r,
                  { clipPath: 'polygon(0 0,100% 0,100% '.concat(n, 'px,0 ').concat(n, 'px)') },
                  this.duration,
                )
                .finally(() => X(r, { clipPath: '' })),
            ]).catch(de)
        },
        getDropdown(n) {
          return this.$getComponent(n, 'drop') || this.$getComponent(n, 'dropdown')
        },
        isDropbarDrop(n) {
          return this.getDropdown(n) && Oe(n, this.clsDrop)
        },
        initializeDropdowns() {
          this.$create(
            'drop',
            this.dropdowns.filter((n) => !this.getDropdown(n)),
            {
              ...this.$props,
              flip: !1,
              shift: !0,
              pos: 'bottom-'.concat(this.align),
              boundary: this.boundary === !0 ? this.$el : this.boundary,
            },
          )
        },
      },
    }
    function Fc(n, r, l) {
      var d, _, k
      const { current: C, keyCode: P } = n
      let H = -1
      P === ot.HOME
        ? (H = 0)
        : P === ot.END
          ? (H = 'last')
          : P === ot.LEFT
            ? (H = 'previous')
            : P === ot.RIGHT
              ? (H = 'next')
              : P === ot.TAB &&
                ((d = l.targetEl) == null || d.focus(), (_ = l.hide) == null || _.call(l, !1)),
        ~H &&
          (n.preventDefault(),
          (k = l.hide) == null || k.call(l, !1),
          r[Ge(H, r, r.indexOf(l.targetEl || C))].focus())
    }
    var Lp = {
        mixins: [Gt],
        args: 'target',
        props: { target: Boolean },
        data: { target: !1 },
        computed: {
          input: (n, r) => He(qi, r),
          state() {
            return this.input.nextElementSibling
          },
          target({ target: n }, r) {
            return (
              n && ((n === !0 && it(this.input) === r && this.input.nextElementSibling) || He(n, r))
            )
          },
        },
        update() {
          var n
          const { target: r, input: l } = this
          if (!r) return
          let d
          const _ = Gs(r) ? 'value' : 'textContent',
            k = r[_],
            C =
              (n = l.files) != null && n[0]
                ? l.files[0].name
                : st(l, 'select') && (d = ut('option', l).filter((P) => P.selected)[0])
                  ? d.textContent
                  : l.value
          k !== C && (r[_] = C)
        },
        events: [
          {
            name: 'change',
            handler() {
              this.$emit()
            },
          },
          {
            name: 'reset',
            el() {
              return this.$el.closest('form')
            },
            handler() {
              this.$emit()
            },
          },
        ],
      },
      Ap = {
        extends: Nl,
        mixins: [Gt],
        name: 'grid',
        props: {
          masonry: Boolean,
          parallax: String,
          parallaxStart: String,
          parallaxEnd: String,
          parallaxJustify: Boolean,
        },
        data: {
          margin: 'uk-grid-margin',
          clsStack: 'uk-grid-stack',
          masonry: !1,
          parallax: 0,
          parallaxStart: 0,
          parallaxEnd: 0,
          parallaxJustify: !1,
        },
        connected() {
          this.masonry && ve(this.$el, 'uk-flex-top', 'uk-flex-wrap-top')
        },
        observe: Jo({ filter: ({ parallax: n, parallaxJustify: r }) => n || r }),
        update: [
          {
            write({ rows: n }) {
              ze(this.$el, this.clsStack, !n.some((r) => r.length > 1))
            },
            events: ['resize'],
          },
          {
            read(n) {
              const { rows: r } = n
              let { masonry: l, parallax: d, parallaxJustify: _, margin: k } = this
              if (
                ((d = Math.max(0, Dt(d))),
                !(l || d || _) ||
                  Wc(r) ||
                  r[0].some((We, Je) =>
                    r.some((at) => at[Je] && at[Je].offsetWidth !== We.offsetWidth),
                  ))
              )
                return (n.translates = n.scrollColumns = !1)
              let C = Pp(r, k),
                P,
                H
              l ? ([P, H] = Mp(r, C, l === 'next')) : (P = Ip(r))
              const q = P.map((We) => ke(We, 'offsetHeight') + C * (We.length - 1)),
                J = Math.max(0, ...q)
              let fe, pe, Se
              return (
                (d || _) &&
                  ((fe = q.map((We, Je) => (_ ? J - We + d : d / (Je % 2 || 8)))),
                  _ || (d = Math.max(...q.map((We, Je) => We + fe[Je] - J))),
                  (pe = Dt(this.parallaxStart, 'height', this.$el, !0)),
                  (Se = Dt(this.parallaxEnd, 'height', this.$el, !0))),
                {
                  columns: P,
                  translates: H,
                  scrollColumns: fe,
                  parallaxStart: pe,
                  parallaxEnd: Se,
                  padding: d,
                  height: H ? J : '',
                }
              )
            },
            write({ height: n, padding: r }) {
              X(this.$el, 'paddingBottom', r || ''), n !== !1 && X(this.$el, 'height', n)
            },
            events: ['resize'],
          },
          {
            read({ rows: n, scrollColumns: r, parallaxStart: l, parallaxEnd: d }) {
              return r && Wc(n) ? !1 : { scrolled: r ? cr(this.$el, l, d) : !1 }
            },
            write({ columns: n, scrolled: r, scrollColumns: l, translates: d }) {
              ;(!r && !d) ||
                n.forEach((_, k) =>
                  _.forEach((C, P) => {
                    let [H, q] = (d && d[k][P]) || [0, 0]
                    r && (q += r * l[k]),
                      X(C, 'transform', 'translate('.concat(H, 'px, ').concat(q, 'px)'))
                  }),
                )
            },
            events: ['scroll', 'resize'],
          },
        ],
      }
    function Wc(n) {
      return n.flat().some((r) => X(r, 'position') === 'absolute')
    }
    function Mp(n, r, l) {
      const d = [],
        _ = [],
        k = Array(n[0].length).fill(0)
      let C = 0
      for (let P of n) {
        Et && (P = P.reverse())
        let H = 0
        for (const q in P) {
          const { offsetWidth: J, offsetHeight: fe } = P[q],
            pe = l ? q : k.indexOf(Math.min(...k))
          Ir(d, pe, P[q]),
            Ir(_, pe, [(pe - q) * J * (Et ? -1 : 1), k[pe] - C]),
            (k[pe] += fe + r),
            (H = Math.max(H, fe))
        }
        C += H + r
      }
      return [d, _]
    }
    function Pp(n, r) {
      const l = n.flat().find((d) => Oe(d, r))
      return I(l ? X(l, 'marginTop') : X(n[0][0], 'paddingLeft'))
    }
    function Ip(n) {
      const r = []
      for (const l of n) for (const d in l) Ir(r, d, l[d])
      return r
    }
    function Ir(n, r, l) {
      n[r] || (n[r] = []), n[r].push(l)
    }
    var Np = {
      args: 'target',
      props: { target: String, row: Boolean },
      data: { target: '> *', row: !0 },
      computed: { elements: ({ target: n }, r) => ut(n, r) },
      observe: an({
        target: ({ $el: n, elements: r }) => r.reduce((l, d) => l.concat(d, ...d.children), [n]),
      }),
      update: {
        read() {
          return { rows: (this.row ? br(this.elements) : [this.elements]).map(Op) }
        },
        write({ rows: n }) {
          for (const { heights: r, elements: l } of n) l.forEach((d, _) => X(d, 'minHeight', r[_]))
        },
        events: ['resize'],
      },
    }
    function Op(n) {
      if (n.length < 2) return { heights: [''], elements: n }
      let r = n.map(Bp)
      const l = Math.max(...r)
      return { heights: n.map((d, _) => (r[_].toFixed(2) === l.toFixed(2) ? '' : l)), elements: n }
    }
    function Bp(n) {
      const r = $e(n.style, ['display', 'minHeight'])
      _t(n) || X(n, 'display', 'block', 'important'), X(n, 'minHeight', '')
      const l = Fe(n).height - mi(n, 'height', 'content-box')
      return X(n, r), l
    }
    var Dp = {
        props: { expand: Boolean, offsetTop: Boolean, offsetBottom: Boolean, minHeight: Number },
        data: { expand: !1, offsetTop: !1, offsetBottom: !1, minHeight: 0 },
        observe: [_r({ filter: ({ expand: n }) => n }), an({ target: ({ $el: n }) => vi(n) })],
        update: {
          read() {
            if (!_t(this.$el)) return !1
            let n = ''
            const r = mi(this.$el, 'height', 'content-box'),
              { body: l, scrollingElement: d } = document,
              _ = un(this.$el),
              { height: k } = Yt(_ === l ? d : _),
              C = d === _ || l === _
            if (((n = 'calc('.concat(C ? '100vh' : ''.concat(k, 'px'))), this.expand)) {
              const P = Fe(_).height - Fe(this.$el).height
              n += ' - '.concat(P, 'px')
            } else {
              if (this.offsetTop)
                if (C) {
                  const P = this.offsetTop === !0 ? this.$el : Vt(this.offsetTop, this.$el),
                    H = Wn(P)[0] - Wn(_)[0]
                  n += H > 0 && H < k / 2 ? ' - '.concat(H, 'px') : ''
                } else n += ' - '.concat(X(_, 'paddingTop'))
              this.offsetBottom === !0
                ? (n += ' - '.concat(Fe(this.$el.nextElementSibling).height, 'px'))
                : te(this.offsetBottom)
                  ? (n += ' - '.concat(this.offsetBottom, 'vh'))
                  : this.offsetBottom && b(this.offsetBottom, 'px')
                    ? (n += ' - '.concat(I(this.offsetBottom), 'px'))
                    : z(this.offsetBottom) &&
                      (n += ' - '.concat(Fe(Vt(this.offsetBottom, this.$el)).height, 'px'))
            }
            return (n += ''.concat(r ? ' - '.concat(r, 'px') : '', ')')), { minHeight: n }
          },
          write({ minHeight: n }) {
            X(this.$el, 'minHeight', 'max('.concat(this.minHeight || 0, 'px, ').concat(n, ')'))
          },
          events: ['resize'],
        },
      },
      Rp =
        '<svg width="14" height="14" viewBox="0 0 14 14"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>',
      Hp =
        '<svg width="20" height="20" viewBox="0 0 20 20"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>',
      zp =
        '<svg width="12" height="12" viewBox="0 0 12 12"><polyline fill="none" stroke="#000" stroke-width="1.1" points="1 3.5 6 8.5 11 3.5"/></svg>',
      Up =
        '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>',
      Fp =
        '<svg width="14" height="14" viewBox="0 0 14 14"><polyline fill="none" stroke="#000" stroke-width="1.1" points="1 4 7 10 13 4"/></svg>',
      Wp =
        '<svg width="12" height="12" viewBox="0 0 12 12"><polyline fill="none" stroke="#000" stroke-width="1.1" points="1 3.5 6 8.5 11 3.5"/></svg>',
      Vp =
        '<svg width="12" height="12" viewBox="0 0 12 12"><polyline fill="none" stroke="#000" stroke-width="1.1" points="1 3.5 6 8.5 11 3.5"/></svg>',
      Gp =
        '<svg width="20" height="20" viewBox="0 0 20 20"><style>.uk-navbar-toggle-animate svg&gt;[class*=&quot;line-&quot;]{transition:0.2s ease-in-out;transition-property:transform, opacity;transform-origin:center;opacity:1}.uk-navbar-toggle svg&gt;.line-3{opacity:0}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-3{opacity:1}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-2{transform:rotate(45deg)}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-3{transform:rotate(-45deg)}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-1,.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-4{opacity:0}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-1{transform:translateY(6px) scaleX(0)}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-4{transform:translateY(-6px) scaleX(0)}</style><rect class="line-1" y="3" width="20" height="2"/><rect class="line-2" y="9" width="20" height="2"/><rect class="line-3" y="9" width="20" height="2"/><rect class="line-4" y="15" width="20" height="2"/></svg>',
      jp =
        '<svg width="40" height="40" viewBox="0 0 40 40"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>',
      qp =
        '<svg width="7" height="12" viewBox="0 0 7 12"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>',
      Yp =
        '<svg width="7" height="12" viewBox="0 0 7 12"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>',
      Kp =
        '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',
      Zp =
        '<svg width="40" height="40" viewBox="0 0 40 40"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>',
      Xp =
        '<svg width="24" height="24" viewBox="0 0 24 24"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>',
      Jp =
        '<svg width="25" height="40" viewBox="0 0 25 40"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5"/></svg>',
      Qp =
        '<svg width="14" height="24" viewBox="0 0 14 24"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1"/></svg>',
      em =
        '<svg width="25" height="40" viewBox="0 0 25 40"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547"/></svg>',
      tm =
        '<svg width="14" height="24" viewBox="0 0 14 24"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23"/></svg>',
      nm =
        '<svg width="30" height="30" viewBox="0 0 30 30"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>',
      im =
        '<svg width="18" height="10" viewBox="0 0 18 10"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9"/></svg>',
      Vc = {
        args: 'src',
        props: { width: Number, height: Number, ratio: Number },
        data: { ratio: 1 },
        connected() {
          this.svg = this.getSvg().then((n) => {
            if (!this._connected) return
            const r = om(n, this.$el)
            return (
              this.svgEl && r !== this.svgEl && qt(this.svgEl),
              sm.call(this, r, n),
              (this.svgEl = r)
            )
          }, de)
        },
        disconnected() {
          this.svg.then((n) => {
            this._connected || (Vs(this.$el) && (this.$el.hidden = !1), qt(n), (this.svgEl = null))
          }),
            (this.svg = null)
        },
        methods: { async getSvg() {} },
      }
    function om(n, r) {
      if (Vs(r) || xt(r, 'canvas')) {
        r.hidden = !0
        const d = r.nextElementSibling
        return Gc(n, d) ? d : Wo(r, n)
      }
      const l = r.lastElementChild
      return Gc(n, l) ? l : mt(r, n)
    }
    function Gc(n, r) {
      return xt(n, 'svg') && xt(r, 'svg') && n.innerHTML === r.innerHTML
    }
    function sm(n, r) {
      const l = ['width', 'height']
      let d = l.map((k) => this[k])
      d.some((k) => k) || (d = l.map((k) => he(r, k)))
      const _ = he(r, 'viewBox')
      _ && !d.some((k) => k) && (d = _.split(' ').slice(2)),
        d.forEach((k, C) => he(n, l[C], I(k) * this.ratio || null))
    }
    const fs = {
        spinner: nm,
        totop: im,
        marker: Up,
        'close-icon': Rp,
        'close-large': Hp,
        'drop-parent-icon': zp,
        'nav-parent-icon': Wp,
        'nav-parent-icon-large': Fp,
        'navbar-parent-icon': Vp,
        'navbar-toggle-icon': Gp,
        'overlay-icon': jp,
        'pagination-next': qp,
        'pagination-previous': Yp,
        'search-icon': Kp,
        'search-large': Zp,
        'search-navbar': Xp,
        'slidenav-next': Qp,
        'slidenav-next-large': Jp,
        'slidenav-previous': tm,
        'slidenav-previous-large': em,
      },
      Nr = {
        install: mm,
        mixins: [Vc],
        args: 'icon',
        props: { icon: String },
        isIcon: !0,
        beforeConnect() {
          ve(this.$el, 'uk-icon')
        },
        methods: {
          async getSvg() {
            const n = gm(this.icon)
            if (!n) throw 'Icon not found.'
            return n
          },
        },
      },
      Xn = {
        args: !1,
        extends: Nr,
        data: (n) => ({ icon: c(n.constructor.options.name) }),
        beforeConnect() {
          ve(this.$el, this.$options.id)
        },
      },
      rm = {
        extends: Xn,
        beforeConnect() {
          const n = this.$props.icon
          this.icon = this.$el.closest('.uk-nav-primary') ? ''.concat(n, '-large') : n
        },
      },
      am = {
        extends: Xn,
        mixins: [ts],
        i18n: { toggle: 'Open Search', submit: 'Submit Search' },
        beforeConnect() {
          if (
            ((this.icon =
              Oe(this.$el, 'uk-search-icon') && Dn(this.$el, '.uk-search-large').length
                ? 'search-large'
                : Dn(this.$el, '.uk-search-navbar').length
                  ? 'search-navbar'
                  : this.$props.icon),
            !nt(this.$el, 'aria-label'))
          )
            if (Oe(this.$el, 'uk-search-toggle') || Oe(this.$el, 'uk-navbar-toggle')) {
              const n = this.t('toggle')
              he(this.$el, 'aria-label', n)
            } else {
              const n = this.$el.closest('a,button')
              if (n) {
                const r = this.t('submit')
                he(n, 'aria-label', r)
              }
            }
        },
      },
      lm = {
        extends: Xn,
        beforeConnect() {
          he(this.$el, 'role', 'status')
        },
        methods: {
          async getSvg() {
            const n = await Nr.methods.getSvg.call(this)
            return this.ratio !== 1 && X(He('circle', n), 'strokeWidth', 1 / this.ratio), n
          },
        },
      },
      Jn = {
        extends: Xn,
        mixins: [ts],
        beforeConnect() {
          const n = this.$el.closest('a,button')
          he(n, 'role', this.role !== null && xt(n, 'a') ? 'button' : this.role)
          const r = this.t('label')
          r && !nt(n, 'aria-label') && he(n, 'aria-label', r)
        },
      },
      jc = {
        extends: Jn,
        beforeConnect() {
          ve(this.$el, 'uk-slidenav')
          const n = this.$props.icon
          this.icon = Oe(this.$el, 'uk-slidenav-large') ? ''.concat(n, '-large') : n
        },
      },
      cm = { extends: Jn, i18n: { label: 'Open menu' } },
      um = {
        extends: Jn,
        i18n: { label: 'Close' },
        beforeConnect() {
          this.icon = 'close-'.concat(Oe(this.$el, 'uk-close-large') ? 'large' : 'icon')
        },
      },
      hm = { extends: Jn, i18n: { label: 'Open' } },
      fm = { extends: Jn, i18n: { label: 'Back to top' } },
      dm = { extends: Jn, i18n: { label: 'Next page' }, data: { role: null } },
      pm = { extends: Jn, i18n: { label: 'Previous page' }, data: { role: null } },
      ds = {}
    function mm(n) {
      n.icon.add = (r, l) => {
        const d = z(r) ? { [r]: l } : r
        xe(d, (_, k) => {
          ;(fs[k] = _), delete ds[k]
        }),
          n._initialized &&
            _n(document.body, (_) =>
              xe(n.getComponents(_), (k) => {
                k.$options.isIcon && k.icon in d && k.$reset()
              }),
            )
      }
    }
    function gm(n) {
      return fs[n]
        ? (ds[n] || (ds[n] = He((fs[_m(n)] || fs[n]).trim())), ds[n].cloneNode(!0))
        : null
    }
    function _m(n) {
      return Et ? _e(_e(n, 'left', 'right'), 'previous', 'next') : n
    }
    const bm = xn && 'loading' in HTMLImageElement.prototype
    var vm = {
      args: 'dataSrc',
      props: { dataSrc: String, sources: String, margin: String, target: String, loading: String },
      data: { dataSrc: '', sources: !1, margin: '50%', target: !1, loading: 'lazy' },
      connected() {
        if (this.loading !== 'lazy') {
          this.load()
          return
        }
        bm && ps(this.$el) && ((this.$el.loading = 'lazy'), Or(this.$el)), Cm(this.$el)
      },
      disconnected() {
        this.img && (this.img.onload = ''), delete this.img
      },
      observe: wi({
        target: ({ $el: n, $props: r }) => [n, ...Zi(r.target, n)],
        handler(n, r) {
          this.load(), r.disconnect()
        },
        options: ({ margin: n }) => ({ rootMargin: n }),
        filter: ({ loading: n }) => n === 'lazy',
      }),
      methods: {
        load() {
          if (this.img) return this.img
          const n = ps(this.$el) ? this.$el : wm(this.$el, this.dataSrc, this.sources)
          return Re(n, 'loading'), Or(this.$el, n.currentSrc), (this.img = n)
        },
      },
    }
    function Or(n, r) {
      if (ps(n)) {
        const l = it(n)
        ;(xt(l, 'picture') ? ct(l) : [n]).forEach((_) => qc(_, _))
      } else
        r &&
          !v(n.style.backgroundImage, r) &&
          (X(n, 'backgroundImage', 'url('.concat(Ys(r), ')')), Pe(n, Hn('load', !1)))
    }
    const ym = ['data-src', 'data-srcset', 'sizes']
    function qc(n, r) {
      for (const l of ym) {
        const d = Ae(n, l)
        d && he(r, l.replace(/^(data-)+/, ''), d)
      }
    }
    function wm(n, r, l) {
      const d = new Image()
      return (
        km(d, l),
        qc(n, d),
        (d.onload = () => {
          Or(n, d.currentSrc)
        }),
        he(d, 'src', r),
        d
      )
    }
    function km(n, r) {
      if (((r = $m(r)), r.length)) {
        const l = Un('<picture>')
        for (const d of r) {
          const _ = Un('<source>')
          he(_, d), mt(l, _)
        }
        mt(l, n)
      }
    }
    function $m(n) {
      if (!n) return []
      if (g(n, '['))
        try {
          n = JSON.parse(n)
        } catch (r) {
          n = []
        }
      else n = yi(n)
      return $(n) || (n = [n]), n.filter((r) => !K(r))
    }
    function Cm(n) {
      ps(n) &&
        !nt(n, 'src') &&
        he(n, 'src', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>')
    }
    function ps(n) {
      return xt(n, 'img')
    }
    var xm = {
        mixins: [Gt, is],
        props: { fill: String },
        data: {
          fill: '',
          clsWrapper: 'uk-leader-fill',
          clsHide: 'uk-leader-hide',
          attrFill: 'data-fill',
        },
        computed: { fill: ({ fill: n }, r) => n || X(r, '--uk-leader-fill-content') },
        connected() {
          ;[this.wrapper] = tr(this.$el, '<span class="'.concat(this.clsWrapper, '">'))
        },
        disconnected() {
          Qi(this.wrapper.childNodes)
        },
        observe: an(),
        update: {
          read() {
            return {
              width: Math.trunc(this.$el.offsetWidth / 2),
              fill: this.fill,
              hide: !this.matchMedia,
            }
          },
          write({ width: n, fill: r, hide: l }) {
            ze(this.wrapper, this.clsHide, l), he(this.wrapper, this.attrFill, new Array(n).join(r))
          },
          events: ['resize'],
        },
      },
      Em = {
        install: Sm,
        mixins: [$r],
        data: {
          clsPage: 'uk-modal-page',
          selPanel: '.uk-modal-dialog',
          selClose:
            '.uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full',
        },
        events: [
          {
            name: 'show',
            self: !0,
            handler() {
              Oe(this.panel, 'uk-margin-auto-vertical')
                ? ve(this.$el, 'uk-flex')
                : X(this.$el, 'display', 'block'),
                Ft(this.$el)
            },
          },
          {
            name: 'hidden',
            self: !0,
            handler() {
              X(this.$el, 'display', ''), Ne(this.$el, 'uk-flex')
            },
          },
        ],
      }
    function Sm({ modal: n }) {
      ;(n.dialog = function (l, d) {
        const _ = n(
          '<div class="uk-modal"> <div class="uk-modal-dialog">'.concat(l, '</div> </div>'),
          { stack: !0, role: 'alertdialog', ...d },
        )
        return (
          _.show(),
          Ue(
            _.$el,
            'hidden',
            async () => {
              await Promise.resolve(), _.$destroy(!0)
            },
            { self: !0 },
          ),
          _
        )
      }),
        (n.alert = function (l, d) {
          return r(
            ({ i18n: _ }) =>
              '<div class="uk-modal-body">'
                .concat(
                  z(l) ? l : zn(l),
                  '</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>',
                )
                .concat(_.ok, '</button> </div>'),
            d,
          )
        }),
        (n.confirm = function (l, d) {
          return r(
            ({ i18n: _ }) =>
              '<form> <div class="uk-modal-body">'
                .concat(
                  z(l) ? l : zn(l),
                  '</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">',
                )
                .concat(
                  _.cancel,
                  '</button> <button class="uk-button uk-button-primary" autofocus>',
                )
                .concat(_.ok, '</button> </div> </form>'),
            d,
            () => Promise.reject(),
          )
        }),
        (n.prompt = function (l, d, _) {
          const k = r(
              ({ i18n: H }) =>
                '<form class="uk-form-stacked"> <div class="uk-modal-body"> <label>'
                  .concat(z(l) ? l : zn(l), '</label> <input class="uk-input" value="')
                  .concat(
                    d || '',
                    '" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">',
                  )
                  .concat(H.cancel, '</button> <button class="uk-button uk-button-primary">')
                  .concat(H.ok, '</button> </div> </form>'),
              _,
              () => null,
              () => P.value,
            ),
            { $el: C } = k.dialog,
            P = He('input', C)
          return Ue(C, 'show', () => P.select()), k
        }),
        (n.i18n = { ok: 'Ok', cancel: 'Cancel' })
      function r(l, d, _ = de, k = de) {
        d = {
          bgClose: !1,
          escClose: !0,
          ...d,
          i18n: { ...n.i18n, ...(d == null ? void 0 : d.i18n) },
        }
        const C = n.dialog(l(d), d)
        return S(
          new Promise((P) => {
            const H = Ue(C.$el, 'hide', () => P(_()))
            Ue(C.$el, 'submit', 'form', (q) => {
              q.preventDefault(), P(k(C)), H(), C.hide()
            })
          }),
          { dialog: C },
        )
      }
    }
    var Tm = { extends: Oc, data: { targets: '> .uk-parent', toggle: '> a', content: '> ul' } },
      Lm = {
        extends: Uc,
        props: { dropbarTransparentMode: Boolean },
        data: {
          clsDrop: 'uk-navbar-dropdown',
          selNavItem:
            '.uk-navbar-nav > li > a,a.uk-navbar-item,button.uk-navbar-item,.uk-navbar-item a,.uk-navbar-item button,.uk-navbar-toggle',
          selTransparentTarget: '[class*="uk-section"]',
          dropbarTransparentMode: !1,
        },
        computed: {
          navbarContainer: (n, r) => r.closest('.uk-navbar-container'),
          dropbarOffset: ({ dropbarTransparentMode: n }, r) =>
            n === 'behind' ? r.offsetHeight : 0,
        },
        watch: {
          items() {
            const n = Oe(this.$el, 'uk-navbar-justify')
            for (const r of ut('.uk-navbar-nav, .uk-navbar-left, .uk-navbar-right', this.$el))
              X(
                r,
                'flexGrow',
                n
                  ? ut('.uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle', r).length
                  : '',
              )
          },
        },
        disconnect() {
          var n
          ;(n = this._colorListener) == null || n.call(this)
        },
        observe: [
          gr({
            target: ({ navbarContainer: n }) => n,
            handler: 'registerColorListener',
            options: { attributes: !0, attributeFilter: ['class'], attributeOldValue: !0 },
          }),
          wi({
            handler(n) {
              ;(this._isIntersecting = n[0].isIntersecting), this.registerColorListener()
            },
            args: { intersecting: !1 },
          }),
        ],
        events: [
          {
            name: 'show',
            el() {
              return this.dropContainer
            },
            handler({ target: n }) {
              const r = this.getTransparentMode(n)
              if (!r || this._mode) return
              const l = () => (this._mode = Am(this.navbarContainer, 'uk-light', 'uk-dark'))
              if (r === 'behind') {
                const d = Yc(this.$el)
                d && (l(), ve(this.navbarContainer, 'uk-'.concat(d)))
              }
              r === 'remove' && (l(), Ne(this.navbarContainer, 'uk-navbar-transparent'))
            },
          },
          {
            name: 'hide',
            el() {
              return this.dropContainer
            },
            async handler({ target: n }) {
              const r = this.getTransparentMode(n)
              if (!(!r || !this._mode) && (await Mm(), !this.getActive())) {
                if (r === 'behind') {
                  const l = Yc(this.$el)
                  l && Ne(this.navbarContainer, 'uk-'.concat(l))
                }
                ve(this.navbarContainer, this._mode),
                  r === 'remove' && ve(this.navbarContainer, 'uk-navbar-transparent'),
                  (this._mode = null)
              }
            },
          },
        ],
        methods: {
          getTransparentMode(n) {
            if (!this.navbarContainer) return
            if (this.dropbar && this.isDropbarDrop(n)) return this.dropbarTransparentMode
            const r = this.getDropdown(n)
            if (!(!r || !Oe(n, 'uk-dropbar'))) return r.inset ? 'behind' : 'remove'
          },
          registerColorListener() {
            const n =
              this._isIntersecting &&
              Oe(this.navbarContainer, 'uk-navbar-transparent') &&
              !Im(this.navbarContainer) &&
              !ut('.uk-drop', this.dropContainer)
                .map(this.getDropdown)
                .some(
                  (r) => r.isToggled() && (r.inset || this.getTransparentMode(r.$el) === 'behind'),
                )
            if (this._colorListener) {
              n || (this._colorListener(), (this._colorListener = null))
              return
            }
            n &&
              (this._colorListener = Pm(this.navbarContainer, () => {
                const { left: r, top: l, height: d } = Xe(this.navbarContainer),
                  _ = { x: r, y: Math.max(0, l) + d / 2 },
                  k = ut(this.selTransparentTarget).find((P) => Le(_, Xe(P))),
                  C = X(k, '--uk-navbar-color')
                C && Ct(this.navbarContainer, 'uk-light,uk-dark', 'uk-'.concat(C))
              }))
          },
        },
      }
    function Am(n, ...r) {
      for (const l of r) if (Oe(n, l)) return Ne(n, l), l
    }
    async function Mm() {
      return new Promise((n) => setTimeout(n))
    }
    function Yc(n) {
      return X(n, '--uk-navbar-dropbar-behind-color')
    }
    function Pm(n, r) {
      const l = un(n, !0),
        d = l === document.documentElement ? document : l,
        _ = Ue(d, 'scroll', r, { passive: !0 }),
        k = io([n, l], r)
      return () => {
        _(), k.disconnect()
      }
    }
    function Im(n) {
      do if (X(n, 'mixBlendMode') !== 'normal') return !0
      while ((n = it(n)))
    }
    var Nm = {
      mixins: [$r],
      args: 'mode',
      props: { mode: String, flip: Boolean, overlay: Boolean, swiping: Boolean },
      data: {
        mode: 'slide',
        flip: !1,
        overlay: !1,
        clsPage: 'uk-offcanvas-page',
        clsContainer: 'uk-offcanvas-container',
        selPanel: '.uk-offcanvas-bar',
        clsFlip: 'uk-offcanvas-flip',
        clsContainerAnimation: 'uk-offcanvas-container-animation',
        clsSidebarAnimation: 'uk-offcanvas-bar-animation',
        clsMode: 'uk-offcanvas',
        clsOverlay: 'uk-offcanvas-overlay',
        selClose: '.uk-offcanvas-close',
        container: !1,
        swiping: !0,
      },
      computed: {
        clsFlip: ({ flip: n, clsFlip: r }) => (n ? r : ''),
        clsOverlay: ({ overlay: n, clsOverlay: r }) => (n ? r : ''),
        clsMode: ({ mode: n, clsMode: r }) => ''.concat(r, '-').concat(n),
        clsSidebarAnimation: ({ mode: n, clsSidebarAnimation: r }) =>
          n === 'none' || n === 'reveal' ? '' : r,
        clsContainerAnimation: ({ mode: n, clsContainerAnimation: r }) =>
          n !== 'push' && n !== 'reveal' ? '' : r,
        transitionElement({ mode: n }) {
          return n === 'reveal' ? it(this.panel) : this.panel
        },
      },
      observe: Il({ filter: ({ swiping: n }) => n }),
      update: {
        read() {
          this.isToggled() && !_t(this.$el) && this.hide()
        },
        events: ['resize'],
      },
      events: [
        {
          name: 'touchmove',
          self: !0,
          passive: !1,
          filter() {
            return this.overlay
          },
          handler(n) {
            n.cancelable && n.preventDefault()
          },
        },
        {
          name: 'show',
          self: !0,
          handler() {
            this.mode === 'reveal' &&
              !Oe(it(this.panel), this.clsMode) &&
              (Go(this.panel, '<div>'), ve(it(this.panel), this.clsMode))
            const { body: n, scrollingElement: r } = document
            ve(n, this.clsContainer, this.clsFlip),
              X(n, 'touch-action', 'pan-y pinch-zoom'),
              X(this.$el, 'display', 'block'),
              X(this.panel, 'maxWidth', r.clientWidth),
              ve(this.$el, this.clsOverlay),
              ve(this.panel, this.clsSidebarAnimation, this.mode === 'reveal' ? '' : this.clsMode),
              Ft(n),
              ve(n, this.clsContainerAnimation),
              this.clsContainerAnimation && Om()
          },
        },
        {
          name: 'hide',
          self: !0,
          handler() {
            Ne(document.body, this.clsContainerAnimation), X(document.body, 'touch-action', '')
          },
        },
        {
          name: 'hidden',
          self: !0,
          handler() {
            this.clsContainerAnimation && Bm(),
              this.mode === 'reveal' && Qi(this.panel),
              Ne(this.panel, this.clsSidebarAnimation, this.clsMode),
              Ne(this.$el, this.clsOverlay),
              X(this.$el, 'display', ''),
              X(this.panel, 'maxWidth', ''),
              Ne(document.body, this.clsContainer, this.clsFlip)
          },
        },
        {
          name: 'swipeLeft swipeRight',
          handler(n) {
            this.isToggled() && b(n.type, 'Left') ^ this.flip && this.hide()
          },
        },
      ],
    }
    function Om() {
      Kc().content += ',user-scalable=0'
    }
    function Bm() {
      const n = Kc()
      n.content = n.content.replace(/,user-scalable=0$/, '')
    }
    function Kc() {
      return (
        He('meta[name="viewport"]', document.head) || mt(document.head, '<meta name="viewport">')
      )
    }
    var Dm = {
        mixins: [Gt],
        props: { selContainer: String, selContent: String, minHeight: Number },
        data: { selContainer: '.uk-modal', selContent: '.uk-modal-dialog', minHeight: 150 },
        computed: {
          container: ({ selContainer: n }, r) => r.closest(n),
          content: ({ selContent: n }, r) => r.closest(n),
        },
        observe: an({ target: ({ container: n, content: r }) => [n, r] }),
        update: {
          read() {
            return !this.content || !this.container || !_t(this.$el)
              ? !1
              : {
                  max: Math.max(
                    this.minHeight,
                    Ft(this.container) - (Fe(this.content).height - Ft(this.$el)),
                  ),
                }
          },
          write({ max: n }) {
            X(this.$el, { minHeight: this.minHeight, maxHeight: n })
          },
          events: ['resize'],
        },
      },
      Rm = {
        props: ['width', 'height'],
        connected() {
          ve(this.$el, 'uk-responsive-width')
        },
        observe: an({ target: ({ $el: n }) => [n, it(n)] }),
        update: {
          read() {
            return _t(this.$el) && this.width && this.height
              ? { width: eo(it(this.$el)), height: this.height }
              : !1
          },
          write(n) {
            Ft(this.$el, Ve.contain({ height: this.height, width: this.width }, n).height)
          },
          events: ['resize'],
        },
      },
      Hm = {
        props: { offset: Number },
        data: { offset: 0 },
        connected() {
          zm(this)
        },
        disconnected() {
          Um(this)
        },
        methods: {
          async scrollTo(n) {
            ;(n = (n && He(n)) || document.body),
              Pe(this.$el, 'beforescroll', [this, n]) &&
                (await kl(n, { offset: this.offset }), Pe(this.$el, 'scrolled', [this, n]))
          },
        },
      }
    const _o = new Set()
    function zm(n) {
      _o.size || Ue(document, 'click', Zc), _o.add(n)
    }
    function Um(n) {
      _o.delete(n), _o.size || Rn(document, 'click', Zc)
    }
    function Zc(n) {
      if (!n.defaultPrevented)
        for (const r of _o)
          r.$el.contains(n.target) &&
            di(r.$el) &&
            (n.preventDefault(),
            window.location.href !== r.$el.href && window.history.pushState({}, '', r.$el.href),
            r.scrollTo(js(r.$el)))
    }
    var Fm = {
        args: 'cls',
        props: {
          cls: String,
          target: String,
          hidden: Boolean,
          margin: String,
          repeat: Boolean,
          delay: Number,
        },
        data: () => ({
          cls: '',
          target: !1,
          hidden: !0,
          margin: '-1px',
          repeat: !1,
          delay: 0,
          inViewClass: 'uk-scrollspy-inview',
        }),
        computed: { elements: ({ target: n }, r) => (n ? ut(n, r) : [r]) },
        watch: {
          elements(n) {
            this.hidden && X(Ki(n, ':not(.'.concat(this.inViewClass, ')')), 'opacity', 0)
          },
        },
        connected() {
          this.elementData = new Map()
        },
        disconnected() {
          for (const [n, r] of this.elementData.entries())
            Ne(n, this.inViewClass, (r == null ? void 0 : r.cls) || '')
          delete this.elementData
        },
        observe: wi({
          target: ({ elements: n }) => n,
          handler(n) {
            const r = this.elementData
            for (const { target: l, isIntersecting: d } of n) {
              r.has(l) || r.set(l, { cls: Ae(l, 'uk-scrollspy-class') || this.cls })
              const _ = r.get(l)
              ;(!this.repeat && _.show) || (_.show = d)
            }
            this.$emit()
          },
          options: ({ margin: n }) => ({ rootMargin: n }),
          args: { intersecting: !1 },
        }),
        update: [
          {
            write(n) {
              for (const [r, l] of this.elementData.entries())
                l.show && !l.inview && !l.queued
                  ? ((l.queued = !0),
                    (n.promise = (n.promise || Promise.resolve())
                      .then(() => new Promise((d) => setTimeout(d, this.delay)))
                      .then(() => {
                        this.toggle(r, !0),
                          setTimeout(() => {
                            ;(l.queued = !1), this.$emit()
                          }, 300)
                      })))
                  : !l.show && l.inview && !l.queued && this.repeat && this.toggle(r, !1)
            },
          },
        ],
        methods: {
          toggle(n, r) {
            var l
            const d = this.elementData.get(n)
            if (d) {
              if (
                ((l = d.off) == null || l.call(d),
                X(n, 'opacity', !r && this.hidden ? 0 : ''),
                ze(n, this.inViewClass, r),
                ze(n, d.cls),
                /\buk-animation-/.test(d.cls))
              ) {
                const _ = () => hi(n, 'uk-animation-[\\w-]+')
                r ? (d.off = bt(n, 'animationcancel animationend', _)) : _()
              }
              Pe(n, r ? 'inview' : 'outview'), (d.inview = r), this.$update(n)
            }
          },
        },
      },
      Wm = {
        props: {
          cls: String,
          closest: Boolean,
          scroll: Boolean,
          overflow: Boolean,
          offset: Number,
        },
        data: { cls: 'uk-active', closest: !1, scroll: !1, overflow: !0, offset: 0 },
        computed: {
          links: (n, r) => ut('a[href*="#"]', r).filter((l) => l.hash && di(l)),
          elements({ closest: n }) {
            return this.links.map((r) => r.closest(n || '*'))
          },
        },
        watch: {
          links(n) {
            this.scroll && this.$create('scroll', n, { offset: this.offset })
          },
        },
        observe: [wi(), Jo()],
        update: [
          {
            read() {
              const n = this.links.map(js).filter(Boolean),
                { length: r } = n
              if (!r || !_t(this.$el)) return !1
              const l = un(n, !0),
                { scrollTop: d, scrollHeight: _ } = l,
                k = Yt(l),
                C = _ - k.height
              let P = !1
              if (d === C) P = r - 1
              else {
                for (let H = 0; H < n.length; H++) {
                  const q = ur(n[H]),
                    J = this.offset + (q ? Xe(q).height : 0)
                  if (Xe(n[H]).top - k.top - J > 0) break
                  P = +H
                }
                P === !1 && this.overflow && (P = 0)
              }
              return { active: P }
            },
            write({ active: n }) {
              const r = n !== !1 && !Oe(this.elements[n], this.cls)
              this.links.forEach((l) => l.blur())
              for (let l = 0; l < this.elements.length; l++)
                ze(this.elements[l], this.cls, +l === n)
              r && Pe(this.$el, 'active', [n, this.elements[n]])
            },
            events: ['scroll', 'resize'],
          },
        ],
      },
      Vm = {
        mixins: [Gt, is],
        props: {
          position: String,
          top: null,
          bottom: null,
          start: null,
          end: null,
          offset: String,
          overflowFlip: Boolean,
          animation: String,
          clsActive: String,
          clsInactive: String,
          clsFixed: String,
          clsBelow: String,
          selTarget: String,
          showOnUp: Boolean,
          targetOffset: Number,
        },
        data: {
          position: 'top',
          top: !1,
          bottom: !1,
          start: !1,
          end: !1,
          offset: 0,
          overflowFlip: !1,
          animation: '',
          clsActive: 'uk-active',
          clsInactive: '',
          clsFixed: 'uk-sticky-fixed',
          clsBelow: 'uk-sticky-below',
          selTarget: '',
          showOnUp: !1,
          targetOffset: !1,
        },
        computed: { selTarget: ({ selTarget: n }, r) => (n && He(n, r)) || r },
        connected() {
          ;(this.start = Xc(this.start || this.top)),
            (this.end = Xc(this.end || this.bottom)),
            (this.placeholder =
              He('+ .uk-sticky-placeholder', this.$el) ||
              He('<div class="uk-sticky-placeholder"></div>')),
            (this.isFixed = !1),
            this.setActive(!1)
        },
        beforeDisconnect() {
          this.isFixed && (this.hide(), Ne(this.selTarget, this.clsInactive)),
            Jc(this.$el),
            qt(this.placeholder),
            (this.placeholder = null)
        },
        observe: [
          _r(),
          Jo({ target: () => document.scrollingElement }),
          an({ target: ({ $el: n }) => [n, document.scrollingElement] }),
        ],
        events: [
          {
            name: 'load hashchange popstate',
            el() {
              return window
            },
            filter() {
              return this.targetOffset !== !1
            },
            handler() {
              const { scrollingElement: n } = document
              !location.hash ||
                n.scrollTop === 0 ||
                setTimeout(() => {
                  const r = Xe(He(location.hash)),
                    l = Xe(this.$el)
                  this.isFixed &&
                    Be(r, l) &&
                    (n.scrollTop =
                      r.top -
                      l.height -
                      Dt(this.targetOffset, 'height', this.placeholder) -
                      Dt(this.offset, 'height', this.placeholder))
                })
            },
          },
          {
            name: 'transitionstart',
            handler() {
              this.transitionInProgress = bt(
                this.$el,
                'transitionend transitioncancel',
                () => (this.transitionInProgress = null),
              )
            },
          },
        ],
        update: [
          {
            read({ height: n, width: r, margin: l, sticky: d }) {
              if (((this.inactive = !this.matchMedia || !_t(this.$el)), this.inactive)) return
              const _ = this.isFixed && !this.transitionInProgress
              _ && (Qc(this.$el), this.hide()),
                this.active ||
                  (({ height: n, width: r } = Xe(this.$el)), (l = X(this.$el, 'margin'))),
                _ && this.show()
              const k = Dt('100vh', 'height'),
                C = Ft(window),
                P = Math.max(0, document.scrollingElement.scrollHeight - k)
              let H = this.position
              this.overflowFlip && n > k && (H = H === 'top' ? 'bottom' : 'top')
              const q = this.isFixed ? this.placeholder : this.$el
              let J = Dt(this.offset, 'height', d ? this.$el : q)
              H === 'bottom' && (n < C || this.overflowFlip) && (J += C - n)
              const fe = this.overflowFlip ? 0 : Math.max(0, n + J - k),
                pe = Xe(q).top,
                Se = Xe(this.$el).height,
                We = (this.start === !1 ? pe : Br(this.start, this.$el, pe)) - J,
                Je =
                  this.end === !1
                    ? P
                    : Math.min(P, Br(this.end, this.$el, pe + n, !0) - Se - J + fe)
              return (
                (d =
                  P &&
                  !this.showOnUp &&
                  We + J === pe &&
                  Je === Math.min(P, Br('!*', this.$el, 0, !0) - Se - J + fe) &&
                  X(it(this.$el), 'overflowY') === 'visible'),
                {
                  start: We,
                  end: Je,
                  offset: J,
                  overflow: fe,
                  topOffset: pe,
                  height: n,
                  elHeight: Se,
                  width: r,
                  margin: l,
                  top: Wn(q)[0],
                  sticky: d,
                }
              )
            },
            write({ height: n, width: r, margin: l, offset: d, sticky: _ }) {
              if (((this.inactive || _ || !this.isFixed) && Jc(this.$el), this.inactive)) return
              _ && ((n = r = l = 0), X(this.$el, { position: 'sticky', top: d }))
              const { placeholder: k } = this
              X(k, { height: n, width: r, margin: l }),
                document.contains(k) || (k.hidden = !0),
                (_ ? Fo : Wo)(this.$el, k)
            },
            events: ['resize'],
          },
          {
            read({
              scroll: n = 0,
              dir: r = 'down',
              overflow: l,
              overflowScroll: d = 0,
              start: _,
              end: k,
            }) {
              const C = document.scrollingElement.scrollTop
              return {
                dir: n <= C ? 'down' : 'up',
                prevDir: r,
                scroll: C,
                prevScroll: n,
                offsetParentTop: Xe((this.isFixed ? this.placeholder : this.$el).offsetParent).top,
                overflowScroll: me(d + me(C, _, k) - me(n, _, k), 0, l),
              }
            },
            write(n, r) {
              const l = r.has('scroll'),
                {
                  initTimestamp: d = 0,
                  dir: _,
                  prevDir: k,
                  scroll: C,
                  prevScroll: P = 0,
                  top: H,
                  start: q,
                  topOffset: J,
                  height: fe,
                } = n
              if (C < 0 || (C === P && l) || (this.showOnUp && !l && !this.isFixed)) return
              const pe = Date.now()
              if (
                ((pe - d > 300 || _ !== k) && ((n.initScroll = C), (n.initTimestamp = pe)),
                !(
                  this.showOnUp &&
                  !this.isFixed &&
                  Math.abs(n.initScroll - C) <= 30 &&
                  Math.abs(P - C) <= 10
                ))
              )
                if (
                  this.inactive ||
                  C < q ||
                  (this.showOnUp &&
                    (C <= q || (_ === 'down' && l) || (_ === 'up' && !this.isFixed && C <= J + fe)))
                ) {
                  if (!this.isFixed) {
                    Cn.inProgress(this.$el) && H > C && (Cn.cancel(this.$el), this.hide())
                    return
                  }
                  if (this.animation && C > J) {
                    if (Oe(this.$el, 'uk-animation-leave')) return
                    Cn.out(this.$el, this.animation).then(() => this.hide(), de)
                  } else this.hide()
                } else
                  this.isFixed
                    ? this.update()
                    : this.animation && C > J
                      ? (this.show(), Cn.in(this.$el, this.animation).catch(de))
                      : (Qc(this.selTarget), this.show())
            },
            events: ['resize', 'resizeViewport', 'scroll'],
          },
        ],
        methods: {
          show() {
            ;(this.isFixed = !0), this.update(), (this.placeholder.hidden = !1)
          },
          hide() {
            const { offset: n, sticky: r } = this._data
            this.setActive(!1),
              Ne(this.$el, this.clsFixed, this.clsBelow),
              r
                ? X(this.$el, 'top', n)
                : X(this.$el, { position: '', top: '', width: '', marginTop: '' }),
              (this.placeholder.hidden = !0),
              (this.isFixed = !1)
          },
          update() {
            let {
              width: n,
              scroll: r = 0,
              overflow: l,
              overflowScroll: d = 0,
              start: _,
              end: k,
              offset: C,
              topOffset: P,
              height: H,
              elHeight: q,
              offsetParentTop: J,
              sticky: fe,
            } = this._data
            const pe = _ !== 0 || r > _
            if (!fe) {
              let Se = 'fixed'
              r > k && ((C += k - J + d - l), (Se = 'absolute')),
                X(this.$el, { position: Se, width: n, marginTop: 0 }, 'important')
            }
            X(this.$el, 'top', C - d),
              this.setActive(pe),
              ze(this.$el, this.clsBelow, r > P + (fe ? Math.min(H, q) : H)),
              ve(this.$el, this.clsFixed)
          },
          setActive(n) {
            const r = this.active
            ;(this.active = n),
              n
                ? (Ct(this.selTarget, this.clsInactive, this.clsActive),
                  r !== n && Pe(this.$el, 'active'))
                : (Ct(this.selTarget, this.clsActive, this.clsInactive),
                  r !== n && Pe(this.$el, 'inactive'))
          },
        },
      }
    function Br(n, r, l, d) {
      if (!n) return 0
      if (te(n) || (z(n) && n.match(/^-?\d/))) return l + Dt(n, 'height', r, !0)
      {
        const _ = n === !0 ? it(r) : Vt(n, r)
        return Xe(_).bottom - (d && _ != null && _.contains(r) ? I(X(_, 'paddingBottom')) : 0)
      }
    }
    function Xc(n) {
      return n === 'true' ? !0 : n === 'false' ? !1 : n
    }
    function Jc(n) {
      X(n, { position: '', top: '', marginTop: '', width: '' })
    }
    function Qc(n) {
      ve(n, 'uk-transition-disable'), requestAnimationFrame(() => Ne(n, 'uk-transition-disable'))
    }
    var Gm = {
      mixins: [Vc],
      args: 'src',
      props: { src: String, icon: String, attributes: 'list', strokeAnimation: Boolean },
      data: { strokeAnimation: !1 },
      observe: [
        gr({
          async handler() {
            const n = await this.svg
            n && eu.call(this, n)
          },
          options: { attributes: !0, attributeFilter: ['id', 'class', 'style'] },
        }),
      ],
      async connected() {
        v(this.src, '#') && ([this.src, this.icon] = this.src.split('#'))
        const n = await this.svg
        n && (eu.call(this, n), this.strokeAnimation && Km(n))
      },
      methods: {
        async getSvg() {
          return xt(this.$el, 'img') && !this.$el.complete && this.$el.loading === 'lazy'
            ? new Promise((n) => bt(this.$el, 'load', () => n(this.getSvg())))
            : qm(await jm(this.src), this.icon) || Promise.reject('SVG not found.')
        },
      },
    }
    function eu(n) {
      const { $el: r } = this
      ve(n, he(r, 'class'), 'uk-svg')
      for (let l = 0; l < r.style.length; l++) {
        const d = r.style[l]
        X(n, d, X(r, d))
      }
      for (const l in this.attributes) {
        const [d, _] = this.attributes[l].split(':', 2)
        he(n, d, _)
      }
      this.$el.id || Re(n, 'id')
    }
    const jm = ht(async (n) =>
      n
        ? g(n, 'data:')
          ? decodeURIComponent(n.split(',')[1])
          : (await fetch(n)).text()
        : Promise.reject(),
    )
    function qm(n, r) {
      return (
        r && v(n, '<symbol') && (n = Ym(n)[r] || n),
        (n = He(n.substr(n.indexOf('<svg')))),
        (n == null ? void 0 : n.hasChildNodes()) && n
      )
    }
    const tu = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g,
      Ym = ht(function (n) {
        const r = {}
        tu.lastIndex = 0
        let l
        for (; (l = tu.exec(n)); ) r[l[3]] = '<svg '.concat(l[1], 'svg>')
        return r
      })
    function Km(n) {
      const r = hc(n)
      r && X(n, '--uk-animation-stroke', r)
    }
    const Dr = '.uk-disabled *, .uk-disabled, [disabled]'
    var nu = {
        mixins: [jn],
        args: 'connect',
        props: {
          connect: String,
          toggle: String,
          itemNav: String,
          active: Number,
          followFocus: Boolean,
          swiping: Boolean,
        },
        data: {
          connect: '~.uk-switcher',
          toggle: '> * > :first-child',
          itemNav: !1,
          active: 0,
          cls: 'uk-active',
          attrItem: 'uk-switcher-item',
          selVertical: '.uk-nav',
          followFocus: !1,
          swiping: !0,
        },
        computed: {
          connects: ({ connect: n }, r) => Zi(n, r),
          connectChildren() {
            return this.connects.map((n) => ct(n)).flat()
          },
          toggles: ({ toggle: n }, r) => ut(n, r),
          children(n, r) {
            return ct(r).filter((l) => this.toggles.some((d) => l.contains(d)))
          },
        },
        watch: {
          connects(n) {
            this.swiping && X(n, 'touchAction', 'pan-y pinch-zoom'), this.$emit()
          },
          connectChildren() {
            let n = Math.max(0, this.index())
            for (const r of this.connects) ct(r).forEach((l, d) => ze(l, this.cls, d === n))
            this.$emit()
          },
          toggles(n) {
            this.$emit()
            const r = this.index()
            this.show(~r ? r : n[this.active] || n[0])
          },
        },
        connected() {
          he(this.$el, 'role', 'tablist')
        },
        observe: [
          ro({ targets: ({ connectChildren: n }) => n }),
          Il({ target: ({ connects: n }) => n, filter: ({ swiping: n }) => n }),
        ],
        events: [
          {
            name: 'click keydown',
            delegate() {
              return this.toggle
            },
            handler(n) {
              !st(n.current, Dr) &&
                (n.type === 'click' || n.keyCode === ot.SPACE) &&
                (n.preventDefault(), this.show(n.current))
            },
          },
          {
            name: 'keydown',
            delegate() {
              return this.toggle
            },
            handler(n) {
              const { current: r, keyCode: l } = n,
                d = st(this.$el, this.selVertical)
              let _ =
                l === ot.HOME
                  ? 0
                  : l === ot.END
                    ? 'last'
                    : (l === ot.LEFT && !d) || (l === ot.UP && d)
                      ? 'previous'
                      : (l === ot.RIGHT && !d) || (l === ot.DOWN && d)
                        ? 'next'
                        : -1
              if (~_) {
                n.preventDefault()
                const k = this.toggles.filter((P) => !st(P, Dr)),
                  C = k[Ge(_, k, k.indexOf(r))]
                C.focus(), this.followFocus && this.show(C)
              }
            },
          },
          {
            name: 'click',
            el() {
              return this.connects.concat(this.itemNav ? Zi(this.itemNav, this.$el) : [])
            },
            delegate() {
              return '['.concat(this.attrItem, '],[data-').concat(this.attrItem, ']')
            },
            handler(n) {
              n.target.closest('a,button') &&
                (n.preventDefault(), this.show(Ae(n.current, this.attrItem)))
            },
          },
          {
            name: 'swipeRight swipeLeft',
            filter() {
              return this.swiping
            },
            el() {
              return this.connects
            },
            handler({ type: n }) {
              this.show(b(n, 'Left') ? 'next' : 'previous')
            },
          },
        ],
        update() {
          var n
          he(this.connects, 'role', 'presentation'), he(ct(this.$el), 'role', 'presentation')
          for (const r in this.toggles) {
            const l = this.toggles[r],
              d = (n = this.connects[0]) == null ? void 0 : n.children[r]
            he(l, 'role', 'tab'),
              d &&
                ((l.id = Kn(this, l)),
                (d.id = Kn(this, d)),
                he(l, 'aria-controls', d.id),
                he(d, { role: 'tabpanel', 'aria-labelledby': l.id }))
          }
          he(this.$el, 'aria-orientation', st(this.$el, this.selVertical) ? 'vertical' : null)
        },
        methods: {
          index() {
            return w(this.children, (n) => Oe(n, this.cls))
          },
          show(n) {
            const r = this.toggles.filter((C) => !st(C, Dr)),
              l = this.index(),
              d = Ge(!V(n) || v(r, n) ? n : 0, r, Ge(this.toggles[l], r)),
              _ = Ge(r[d], this.toggles)
            this.children.forEach((C, P) => {
              ze(C, this.cls, _ === P),
                he(this.toggles[P], { 'aria-selected': _ === P, tabindex: _ === P ? null : -1 })
            })
            const k = l >= 0 && l !== d
            this.connects.forEach(async ({ children: C }) => {
              const P = x(C).filter((H, q) => q !== _ && Oe(H, this.cls))
              await this.toggleElement(P, !1, k), await this.toggleElement(C[_], !0, k)
            })
          },
        },
      },
      Zm = {
        mixins: [Gt],
        extends: nu,
        props: { media: Boolean },
        data: { media: 960, attrItem: 'uk-tab-item', selVertical: '.uk-tab-left,.uk-tab-right' },
        connected() {
          const n = Oe(this.$el, 'uk-tab-left')
            ? 'uk-tab-left'
            : Oe(this.$el, 'uk-tab-right')
              ? 'uk-tab-right'
              : !1
          n && this.$create('toggle', this.$el, { cls: n, mode: 'media', media: this.media })
        },
      }
    const Xm = 32
    var Jm = {
        mixins: [is, jn],
        args: 'target',
        props: { href: String, target: null, mode: 'list', queued: Boolean },
        data: { href: !1, target: !1, mode: 'click', queued: !0 },
        computed: {
          target({ target: n }, r) {
            return (n = Zi(n || r.hash, r)), n.length ? n : [r]
          },
        },
        connected() {
          v(this.mode, 'media') ||
            (Ho(this.$el) || he(this.$el, 'tabindex', '0'),
            !this.cls && xt(this.$el, 'a') && he(this.$el, 'role', 'button'))
        },
        observe: ro({ target: ({ target: n }) => n }),
        events: [
          {
            name: rn,
            filter() {
              return v(this.mode, 'hover')
            },
            handler(n) {
              ;(this._preventClick = null),
                !(!gn(n) || Y(this._showState) || this.$el.disabled) &&
                  (Pe(this.$el, 'focus'),
                  bt(
                    document,
                    rn,
                    () => Pe(this.$el, 'blur'),
                    !0,
                    (r) => !this.$el.contains(r.target),
                  ),
                  v(this.mode, 'click') && (this._preventClick = !0))
            },
          },
          {
            name: 'mouseenter mouseleave '.concat(bi, ' ').concat(no, ' focus blur'),
            filter() {
              return v(this.mode, 'hover')
            },
            handler(n) {
              if (gn(n) || this.$el.disabled) return
              const r = v(['mouseenter', bi, 'focus'], n.type),
                l = this.isToggled(this.target)
              if (
                !r &&
                (!Y(this._showState) ||
                  (n.type !== 'blur' && st(this.$el, ':focus')) ||
                  (n.type === 'blur' && st(this.$el, ':hover')))
              ) {
                l === this._showState && (this._showState = null)
                return
              }
              ;(r && Y(this._showState) && l !== this._showState) ||
                ((this._showState = r ? l : null),
                this.toggle('toggle'.concat(r ? 'show' : 'hide')))
            },
          },
          {
            name: 'keydown',
            filter() {
              return v(this.mode, 'click') && !xt(this.$el, 'input')
            },
            handler(n) {
              n.keyCode === Xm && (n.preventDefault(), this.$el.click())
            },
          },
          {
            name: 'click',
            filter() {
              return ['click', 'hover'].some((n) => v(this.mode, n))
            },
            handler(n) {
              let r
              ;(this._preventClick ||
                n.target.closest('a[href="#"], a[href=""]') ||
                ((r = n.target.closest('a[href]')) &&
                  (!this.isToggled(this.target) || (r.hash && st(this.target, r.hash))))) &&
                n.preventDefault(),
                !this._preventClick && v(this.mode, 'click') && this.toggle()
            },
          },
          {
            name: 'mediachange',
            filter() {
              return v(this.mode, 'media')
            },
            el() {
              return this.target
            },
            handler(n, r) {
              r.matches ^ this.isToggled(this.target) && this.toggle()
            },
          },
        ],
        methods: {
          async toggle(n) {
            if (!Pe(this.target, n || 'toggle', [this])) return
            if (
              (nt(this.$el, 'aria-expanded') &&
                he(this.$el, 'aria-expanded', !this.isToggled(this.target)),
              !this.queued)
            )
              return this.toggleElement(this.target)
            const r = this.target.filter((d) => Oe(d, this.clsLeave))
            if (r.length) {
              for (const d of this.target) {
                const _ = v(r, d)
                this.toggleElement(d, _, _)
              }
              return
            }
            const l = this.target.filter(this.isToggled)
            ;(await this.toggleElement(l, !1)) &&
              (await this.toggleElement(
                this.target.filter((d) => !v(l, d)),
                !0,
              ))
          },
        },
      },
      Qm = Object.freeze({
        __proto__: null,
        Accordion: Oc,
        Alert: vp,
        Close: um,
        Cover: wp,
        Drop: Hc,
        DropParentIcon: Xn,
        Dropdown: Hc,
        Dropnav: Uc,
        FormCustom: Lp,
        Grid: Ap,
        HeightMatch: Np,
        HeightViewport: Dp,
        Icon: Nr,
        Img: vm,
        Leader: xm,
        Margin: Nl,
        Marker: hm,
        Modal: Em,
        Nav: Tm,
        NavParentIcon: rm,
        Navbar: Lm,
        NavbarParentIcon: Xn,
        NavbarToggleIcon: cm,
        Offcanvas: Nm,
        OverflowAuto: Dm,
        OverlayIcon: Xn,
        PaginationNext: dm,
        PaginationPrevious: pm,
        Responsive: Rm,
        Scroll: Hm,
        Scrollspy: Fm,
        ScrollspyNav: Wm,
        SearchIcon: am,
        SlidenavNext: jc,
        SlidenavPrevious: jc,
        Spinner: lm,
        Sticky: Vm,
        Svg: Gm,
        Switcher: nu,
        Tab: Zm,
        Toggle: Jm,
        Totop: fm,
        Video: Bc,
      })
    return xe(Qm, (n, r) => Zt.component(r, n)), dp(Zt), xe(fp, (n, r) => Zt.component(r, n)), Zt
  })
})(Mf)
var S_ = Mf.exports
const wn = Na(S_)
function on(e) {
  wn.notification({
    message: '<span uk-icon=icon: check></span> '.concat(e),
    pos: 'bottom-left',
    status: 'success',
    timeout: 1e4,
  })
}
function Pf(e) {
  wn.notification({
    message: '<span uk-icon=icon: warning></span> '.concat(e),
    pos: 'bottom-left',
    status: 'danger',
    timeout: 1e4,
  })
}
const Es = Ie([])
function Ze(e, t = !1, i) {
  let o = !1
  e.category
    ? ((o = L_(e)), (e.msg = ''.concat(i, ': ').concat(e.msg)))
    : (e = {
        category: 0,
        uid: 0,
        msg: 'WARN: '.concat(i, ': error type returned is not a CarpeError. Payload: ').concat(e),
      }),
    Es.update((a) => (a.push(e), a))
  const s = 'Error ('.concat(e.uid, '): ').concat(e.msg)
  !t && !o && Pf(s), Ht('Error', e.msg)
}
function T_() {
  Es.set([])
}
const L_ = (e) => {
  switch (e.uid) {
    case 404:
      return !1
    case 1004:
      return !1
    case 130102:
      Aa.set(e)
      break
    case 130108:
      Ma.set(e)
      break
    case 130109:
      Pa.set(e)
      break
    case 130110:
      Ia.set(e)
      break
    case 12015:
      Tf.set(e)
      break
    default:
      return !1
  }
  return !0
}
var Rt = ((e) => ((e.Info = 'Info'), (e.Warn = 'Warn'), (e.Error = 'Error'), e))(Rt || {})
const Ht = async (e, t) => {
    console.log(''.concat(e, ': ').concat(t)),
      Ke('log_this', { level: e, msg: t }).catch((i) => Ze(i, !0, 'log_this'))
  },
  zt = Ie(''),
  ri = Ie(!1)
function bu(e) {
  Ke('set_env', { env: e })
    .then((t) => {
      on('switched to '.concat(t, ' mode')), Os.set(t)
    })
    .catch((t) => Ze(t, !1, 'setDebugProdTest'))
}
const Os = Ie(''),
  A_ = Ie(!1)
function If() {
  Ht(Rt.Info, ' getEnv'),
    Ke('get_env', {})
      .then((e) => {
        Os.set(e), e == 'test' && A_.set(!0)
      })
      .catch((e) => Ze(e, !1, 'getEnv'))
}
function Nf() {
  ri.set(!je(ri))
}
const vt = {
  home: '/',
  wallet: '/wallet',
  addAccount: '/add-account',
  accountFromMnem: '/account-from-mnem',
  keygen: '/keygen',
  miner: '/miner',
  transfer: '/transfer',
  events: '/events',
  settings: '/settings',
  about: '/about',
  developer: '/dev',
  swarm: '/swarm',
  makeWhole: '/make-whole',
}
var M_ = function (t) {
  return P_(t) && !I_(t)
}
function P_(e) {
  return !!e && typeof e == 'object'
}
function I_(e) {
  var t = Object.prototype.toString.call(e)
  return t === '[object RegExp]' || t === '[object Date]' || B_(e)
}
var N_ = typeof Symbol == 'function' && Symbol.for,
  O_ = N_ ? Symbol.for('react.element') : 60103
function B_(e) {
  return e.$$typeof === O_
}
function D_(e) {
  return Array.isArray(e) ? [] : {}
}
function To(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? Bi(D_(e), e, t) : e
}
function R_(e, t, i) {
  return e.concat(t).map(function (o) {
    return To(o, i)
  })
}
function H_(e, t) {
  if (!t.customMerge) return Bi
  var i = t.customMerge(e)
  return typeof i == 'function' ? i : Bi
}
function z_(e) {
  return Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(e).filter(function (t) {
        return Object.propertyIsEnumerable.call(e, t)
      })
    : []
}
function vu(e) {
  return Object.keys(e).concat(z_(e))
}
function Of(e, t) {
  try {
    return t in e
  } catch (i) {
    return !1
  }
}
function U_(e, t) {
  return Of(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t))
}
function F_(e, t, i) {
  var o = {}
  return (
    i.isMergeableObject(e) &&
      vu(e).forEach(function (s) {
        o[s] = To(e[s], i)
      }),
    vu(t).forEach(function (s) {
      U_(e, s) ||
        (Of(e, s) && i.isMergeableObject(t[s])
          ? (o[s] = H_(s, i)(e[s], t[s], i))
          : (o[s] = To(t[s], i)))
    }),
    o
  )
}
function Bi(e, t, i) {
  ;(i = i || {}),
    (i.arrayMerge = i.arrayMerge || R_),
    (i.isMergeableObject = i.isMergeableObject || M_),
    (i.cloneUnlessOtherwiseSpecified = To)
  var o = Array.isArray(t),
    s = Array.isArray(e),
    a = o === s
  return a ? (o ? i.arrayMerge(e, t, i) : F_(e, t, i)) : To(t, i)
}
Bi.all = function (t, i) {
  if (!Array.isArray(t)) throw new Error('first argument should be an array')
  return t.reduce(function (o, s) {
    return Bi(o, s, i)
  }, {})
}
var W_ = Bi,
  V_ = W_
const G_ = Na(V_)
var ra = function (e, t) {
  return (
    (ra =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (i, o) {
          i.__proto__ = o
        }) ||
      function (i, o) {
        for (var s in o) Object.prototype.hasOwnProperty.call(o, s) && (i[s] = o[s])
      }),
    ra(e, t)
  )
}
function Bs(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null')
  ra(e, t)
  function i() {
    this.constructor = e
  }
  e.prototype = t === null ? Object.create(t) : ((i.prototype = t.prototype), new i())
}
var lt = function () {
  return (
    (lt =
      Object.assign ||
      function (t) {
        for (var i, o = 1, s = arguments.length; o < s; o++) {
          i = arguments[o]
          for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a])
        }
        return t
      }),
    lt.apply(this, arguments)
  )
}
function Wr(e, t, i) {
  if (i || arguments.length === 2)
    for (var o = 0, s = t.length, a; o < s; o++)
      (a || !(o in t)) && (a || (a = Array.prototype.slice.call(t, 0, o)), (a[o] = t[o]))
  return e.concat(a || Array.prototype.slice.call(t))
}
var Qe
;(function (e) {
  ;(e[(e.EXPECT_ARGUMENT_CLOSING_BRACE = 1)] = 'EXPECT_ARGUMENT_CLOSING_BRACE'),
    (e[(e.EMPTY_ARGUMENT = 2)] = 'EMPTY_ARGUMENT'),
    (e[(e.MALFORMED_ARGUMENT = 3)] = 'MALFORMED_ARGUMENT'),
    (e[(e.EXPECT_ARGUMENT_TYPE = 4)] = 'EXPECT_ARGUMENT_TYPE'),
    (e[(e.INVALID_ARGUMENT_TYPE = 5)] = 'INVALID_ARGUMENT_TYPE'),
    (e[(e.EXPECT_ARGUMENT_STYLE = 6)] = 'EXPECT_ARGUMENT_STYLE'),
    (e[(e.INVALID_NUMBER_SKELETON = 7)] = 'INVALID_NUMBER_SKELETON'),
    (e[(e.INVALID_DATE_TIME_SKELETON = 8)] = 'INVALID_DATE_TIME_SKELETON'),
    (e[(e.EXPECT_NUMBER_SKELETON = 9)] = 'EXPECT_NUMBER_SKELETON'),
    (e[(e.EXPECT_DATE_TIME_SKELETON = 10)] = 'EXPECT_DATE_TIME_SKELETON'),
    (e[(e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11)] = 'UNCLOSED_QUOTE_IN_ARGUMENT_STYLE'),
    (e[(e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12)] = 'EXPECT_SELECT_ARGUMENT_OPTIONS'),
    (e[(e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13)] = 'EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE'),
    (e[(e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14)] = 'INVALID_PLURAL_ARGUMENT_OFFSET_VALUE'),
    (e[(e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15)] = 'EXPECT_SELECT_ARGUMENT_SELECTOR'),
    (e[(e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16)] = 'EXPECT_PLURAL_ARGUMENT_SELECTOR'),
    (e[(e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17)] =
      'EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT'),
    (e[(e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18)] =
      'EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT'),
    (e[(e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19)] = 'INVALID_PLURAL_ARGUMENT_SELECTOR'),
    (e[(e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20)] = 'DUPLICATE_PLURAL_ARGUMENT_SELECTOR'),
    (e[(e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21)] = 'DUPLICATE_SELECT_ARGUMENT_SELECTOR'),
    (e[(e.MISSING_OTHER_CLAUSE = 22)] = 'MISSING_OTHER_CLAUSE'),
    (e[(e.INVALID_TAG = 23)] = 'INVALID_TAG'),
    (e[(e.INVALID_TAG_NAME = 25)] = 'INVALID_TAG_NAME'),
    (e[(e.UNMATCHED_CLOSING_TAG = 26)] = 'UNMATCHED_CLOSING_TAG'),
    (e[(e.UNCLOSED_TAG = 27)] = 'UNCLOSED_TAG')
})(Qe || (Qe = {}))
var ft
;(function (e) {
  ;(e[(e.literal = 0)] = 'literal'),
    (e[(e.argument = 1)] = 'argument'),
    (e[(e.number = 2)] = 'number'),
    (e[(e.date = 3)] = 'date'),
    (e[(e.time = 4)] = 'time'),
    (e[(e.select = 5)] = 'select'),
    (e[(e.plural = 6)] = 'plural'),
    (e[(e.pound = 7)] = 'pound'),
    (e[(e.tag = 8)] = 'tag')
})(ft || (ft = {}))
var Di
;(function (e) {
  ;(e[(e.number = 0)] = 'number'), (e[(e.dateTime = 1)] = 'dateTime')
})(Di || (Di = {}))
function yu(e) {
  return e.type === ft.literal
}
function j_(e) {
  return e.type === ft.argument
}
function Bf(e) {
  return e.type === ft.number
}
function Df(e) {
  return e.type === ft.date
}
function Rf(e) {
  return e.type === ft.time
}
function Hf(e) {
  return e.type === ft.select
}
function zf(e) {
  return e.type === ft.plural
}
function q_(e) {
  return e.type === ft.pound
}
function Uf(e) {
  return e.type === ft.tag
}
function Ff(e) {
  return !!(e && typeof e == 'object' && e.type === Di.number)
}
function aa(e) {
  return !!(e && typeof e == 'object' && e.type === Di.dateTime)
}
var Wf = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
  Y_ =
    /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g
function K_(e) {
  var t = {}
  return (
    e.replace(Y_, function (i) {
      var o = i.length
      switch (i[0]) {
        case 'G':
          t.era = o === 4 ? 'long' : o === 5 ? 'narrow' : 'short'
          break
        case 'y':
          t.year = o === 2 ? '2-digit' : 'numeric'
          break
        case 'Y':
        case 'u':
        case 'U':
        case 'r':
          throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead')
        case 'q':
        case 'Q':
          throw new RangeError('`q/Q` (quarter) patterns are not supported')
        case 'M':
        case 'L':
          t.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][o - 1]
          break
        case 'w':
        case 'W':
          throw new RangeError('`w/W` (week) patterns are not supported')
        case 'd':
          t.day = ['numeric', '2-digit'][o - 1]
          break
        case 'D':
        case 'F':
        case 'g':
          throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead')
        case 'E':
          t.weekday = o === 4 ? 'short' : o === 5 ? 'narrow' : 'short'
          break
        case 'e':
          if (o < 4) throw new RangeError('`e..eee` (weekday) patterns are not supported')
          t.weekday = ['short', 'long', 'narrow', 'short'][o - 4]
          break
        case 'c':
          if (o < 4) throw new RangeError('`c..ccc` (weekday) patterns are not supported')
          t.weekday = ['short', 'long', 'narrow', 'short'][o - 4]
          break
        case 'a':
          t.hour12 = !0
          break
        case 'b':
        case 'B':
          throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead')
        case 'h':
          ;(t.hourCycle = 'h12'), (t.hour = ['numeric', '2-digit'][o - 1])
          break
        case 'H':
          ;(t.hourCycle = 'h23'), (t.hour = ['numeric', '2-digit'][o - 1])
          break
        case 'K':
          ;(t.hourCycle = 'h11'), (t.hour = ['numeric', '2-digit'][o - 1])
          break
        case 'k':
          ;(t.hourCycle = 'h24'), (t.hour = ['numeric', '2-digit'][o - 1])
          break
        case 'j':
        case 'J':
        case 'C':
          throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead')
        case 'm':
          t.minute = ['numeric', '2-digit'][o - 1]
          break
        case 's':
          t.second = ['numeric', '2-digit'][o - 1]
          break
        case 'S':
        case 'A':
          throw new RangeError('`S/A` (second) patterns are not supported, use `s` instead')
        case 'z':
          t.timeZoneName = o < 4 ? 'short' : 'long'
          break
        case 'Z':
        case 'O':
        case 'v':
        case 'V':
        case 'X':
        case 'x':
          throw new RangeError(
            '`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead',
          )
      }
      return ''
    }),
    t
  )
}
var Z_ = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i
function X_(e) {
  if (e.length === 0) throw new Error('Number skeleton cannot be empty')
  for (
    var t = e.split(Z_).filter(function (v) {
        return v.length > 0
      }),
      i = [],
      o = 0,
      s = t;
    o < s.length;
    o++
  ) {
    var a = s[o],
      c = a.split('/')
    if (c.length === 0) throw new Error('Invalid number skeleton')
    for (var h = c[0], f = c.slice(1), p = 0, g = f; p < g.length; p++) {
      var b = g[p]
      if (b.length === 0) throw new Error('Invalid number skeleton')
    }
    i.push({ stem: h, options: f })
  }
  return i
}
function J_(e) {
  return e.replace(/^(.*?)-/, '')
}
var wu = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,
  Vf = /^(@+)?(\+|#+)?[rs]?$/g,
  Q_ = /(\*)(0+)|(#+)(0+)|(0+)/g,
  Gf = /^(0+)$/
function ku(e) {
  var t = {}
  return (
    e[e.length - 1] === 'r'
      ? (t.roundingPriority = 'morePrecision')
      : e[e.length - 1] === 's' && (t.roundingPriority = 'lessPrecision'),
    e.replace(Vf, function (i, o, s) {
      return (
        typeof s != 'string'
          ? ((t.minimumSignificantDigits = o.length), (t.maximumSignificantDigits = o.length))
          : s === '+'
            ? (t.minimumSignificantDigits = o.length)
            : o[0] === '#'
              ? (t.maximumSignificantDigits = o.length)
              : ((t.minimumSignificantDigits = o.length),
                (t.maximumSignificantDigits = o.length + (typeof s == 'string' ? s.length : 0))),
        ''
      )
    }),
    t
  )
}
function jf(e) {
  switch (e) {
    case 'sign-auto':
      return { signDisplay: 'auto' }
    case 'sign-accounting':
    case '()':
      return { currencySign: 'accounting' }
    case 'sign-always':
    case '+!':
      return { signDisplay: 'always' }
    case 'sign-accounting-always':
    case '()!':
      return { signDisplay: 'always', currencySign: 'accounting' }
    case 'sign-except-zero':
    case '+?':
      return { signDisplay: 'exceptZero' }
    case 'sign-accounting-except-zero':
    case '()?':
      return { signDisplay: 'exceptZero', currencySign: 'accounting' }
    case 'sign-never':
    case '+_':
      return { signDisplay: 'never' }
  }
}
function e2(e) {
  var t
  if (
    (e[0] === 'E' && e[1] === 'E'
      ? ((t = { notation: 'engineering' }), (e = e.slice(2)))
      : e[0] === 'E' && ((t = { notation: 'scientific' }), (e = e.slice(1))),
    t)
  ) {
    var i = e.slice(0, 2)
    if (
      (i === '+!'
        ? ((t.signDisplay = 'always'), (e = e.slice(2)))
        : i === '+?' && ((t.signDisplay = 'exceptZero'), (e = e.slice(2))),
      !Gf.test(e))
    )
      throw new Error('Malformed concise eng/scientific notation')
    t.minimumIntegerDigits = e.length
  }
  return t
}
function $u(e) {
  var t = {},
    i = jf(e)
  return i || t
}
function t2(e) {
  for (var t = {}, i = 0, o = e; i < o.length; i++) {
    var s = o[i]
    switch (s.stem) {
      case 'percent':
      case '%':
        t.style = 'percent'
        continue
      case '%x100':
        ;(t.style = 'percent'), (t.scale = 100)
        continue
      case 'currency':
        ;(t.style = 'currency'), (t.currency = s.options[0])
        continue
      case 'group-off':
      case ',_':
        t.useGrouping = !1
        continue
      case 'precision-integer':
      case '.':
        t.maximumFractionDigits = 0
        continue
      case 'measure-unit':
      case 'unit':
        ;(t.style = 'unit'), (t.unit = J_(s.options[0]))
        continue
      case 'compact-short':
      case 'K':
        ;(t.notation = 'compact'), (t.compactDisplay = 'short')
        continue
      case 'compact-long':
      case 'KK':
        ;(t.notation = 'compact'), (t.compactDisplay = 'long')
        continue
      case 'scientific':
        t = lt(
          lt(lt({}, t), { notation: 'scientific' }),
          s.options.reduce(function (f, p) {
            return lt(lt({}, f), $u(p))
          }, {}),
        )
        continue
      case 'engineering':
        t = lt(
          lt(lt({}, t), { notation: 'engineering' }),
          s.options.reduce(function (f, p) {
            return lt(lt({}, f), $u(p))
          }, {}),
        )
        continue
      case 'notation-simple':
        t.notation = 'standard'
        continue
      case 'unit-width-narrow':
        ;(t.currencyDisplay = 'narrowSymbol'), (t.unitDisplay = 'narrow')
        continue
      case 'unit-width-short':
        ;(t.currencyDisplay = 'code'), (t.unitDisplay = 'short')
        continue
      case 'unit-width-full-name':
        ;(t.currencyDisplay = 'name'), (t.unitDisplay = 'long')
        continue
      case 'unit-width-iso-code':
        t.currencyDisplay = 'symbol'
        continue
      case 'scale':
        t.scale = parseFloat(s.options[0])
        continue
      case 'integer-width':
        if (s.options.length > 1)
          throw new RangeError('integer-width stems only accept a single optional option')
        s.options[0].replace(Q_, function (f, p, g, b, v, w) {
          if (p) t.minimumIntegerDigits = g.length
          else {
            if (b && v) throw new Error('We currently do not support maximum integer digits')
            if (w) throw new Error('We currently do not support exact integer digits')
          }
          return ''
        })
        continue
    }
    if (Gf.test(s.stem)) {
      t.minimumIntegerDigits = s.stem.length
      continue
    }
    if (wu.test(s.stem)) {
      if (s.options.length > 1)
        throw new RangeError('Fraction-precision stems only accept a single optional option')
      s.stem.replace(wu, function (f, p, g, b, v, w) {
        return (
          g === '*'
            ? (t.minimumFractionDigits = p.length)
            : b && b[0] === '#'
              ? (t.maximumFractionDigits = b.length)
              : v && w
                ? ((t.minimumFractionDigits = v.length),
                  (t.maximumFractionDigits = v.length + w.length))
                : ((t.minimumFractionDigits = p.length), (t.maximumFractionDigits = p.length)),
          ''
        )
      })
      var a = s.options[0]
      a === 'w'
        ? (t = lt(lt({}, t), { trailingZeroDisplay: 'stripIfInteger' }))
        : a && (t = lt(lt({}, t), ku(a)))
      continue
    }
    if (Vf.test(s.stem)) {
      t = lt(lt({}, t), ku(s.stem))
      continue
    }
    var c = jf(s.stem)
    c && (t = lt(lt({}, t), c))
    var h = e2(s.stem)
    h && (t = lt(lt({}, t), h))
  }
  return t
}
var bs = {
  AX: ['H'],
  BQ: ['H'],
  CP: ['H'],
  CZ: ['H'],
  DK: ['H'],
  FI: ['H'],
  ID: ['H'],
  IS: ['H'],
  ML: ['H'],
  NE: ['H'],
  RU: ['H'],
  SE: ['H'],
  SJ: ['H'],
  SK: ['H'],
  AS: ['h', 'H'],
  BT: ['h', 'H'],
  DJ: ['h', 'H'],
  ER: ['h', 'H'],
  GH: ['h', 'H'],
  IN: ['h', 'H'],
  LS: ['h', 'H'],
  PG: ['h', 'H'],
  PW: ['h', 'H'],
  SO: ['h', 'H'],
  TO: ['h', 'H'],
  VU: ['h', 'H'],
  WS: ['h', 'H'],
  '001': ['H', 'h'],
  AL: ['h', 'H', 'hB'],
  TD: ['h', 'H', 'hB'],
  'ca-ES': ['H', 'h', 'hB'],
  CF: ['H', 'h', 'hB'],
  CM: ['H', 'h', 'hB'],
  'fr-CA': ['H', 'h', 'hB'],
  'gl-ES': ['H', 'h', 'hB'],
  'it-CH': ['H', 'h', 'hB'],
  'it-IT': ['H', 'h', 'hB'],
  LU: ['H', 'h', 'hB'],
  NP: ['H', 'h', 'hB'],
  PF: ['H', 'h', 'hB'],
  SC: ['H', 'h', 'hB'],
  SM: ['H', 'h', 'hB'],
  SN: ['H', 'h', 'hB'],
  TF: ['H', 'h', 'hB'],
  VA: ['H', 'h', 'hB'],
  CY: ['h', 'H', 'hb', 'hB'],
  GR: ['h', 'H', 'hb', 'hB'],
  CO: ['h', 'H', 'hB', 'hb'],
  DO: ['h', 'H', 'hB', 'hb'],
  KP: ['h', 'H', 'hB', 'hb'],
  KR: ['h', 'H', 'hB', 'hb'],
  NA: ['h', 'H', 'hB', 'hb'],
  PA: ['h', 'H', 'hB', 'hb'],
  PR: ['h', 'H', 'hB', 'hb'],
  VE: ['h', 'H', 'hB', 'hb'],
  AC: ['H', 'h', 'hb', 'hB'],
  AI: ['H', 'h', 'hb', 'hB'],
  BW: ['H', 'h', 'hb', 'hB'],
  BZ: ['H', 'h', 'hb', 'hB'],
  CC: ['H', 'h', 'hb', 'hB'],
  CK: ['H', 'h', 'hb', 'hB'],
  CX: ['H', 'h', 'hb', 'hB'],
  DG: ['H', 'h', 'hb', 'hB'],
  FK: ['H', 'h', 'hb', 'hB'],
  GB: ['H', 'h', 'hb', 'hB'],
  GG: ['H', 'h', 'hb', 'hB'],
  GI: ['H', 'h', 'hb', 'hB'],
  IE: ['H', 'h', 'hb', 'hB'],
  IM: ['H', 'h', 'hb', 'hB'],
  IO: ['H', 'h', 'hb', 'hB'],
  JE: ['H', 'h', 'hb', 'hB'],
  LT: ['H', 'h', 'hb', 'hB'],
  MK: ['H', 'h', 'hb', 'hB'],
  MN: ['H', 'h', 'hb', 'hB'],
  MS: ['H', 'h', 'hb', 'hB'],
  NF: ['H', 'h', 'hb', 'hB'],
  NG: ['H', 'h', 'hb', 'hB'],
  NR: ['H', 'h', 'hb', 'hB'],
  NU: ['H', 'h', 'hb', 'hB'],
  PN: ['H', 'h', 'hb', 'hB'],
  SH: ['H', 'h', 'hb', 'hB'],
  SX: ['H', 'h', 'hb', 'hB'],
  TA: ['H', 'h', 'hb', 'hB'],
  ZA: ['H', 'h', 'hb', 'hB'],
  'af-ZA': ['H', 'h', 'hB', 'hb'],
  AR: ['H', 'h', 'hB', 'hb'],
  CL: ['H', 'h', 'hB', 'hb'],
  CR: ['H', 'h', 'hB', 'hb'],
  CU: ['H', 'h', 'hB', 'hb'],
  EA: ['H', 'h', 'hB', 'hb'],
  'es-BO': ['H', 'h', 'hB', 'hb'],
  'es-BR': ['H', 'h', 'hB', 'hb'],
  'es-EC': ['H', 'h', 'hB', 'hb'],
  'es-ES': ['H', 'h', 'hB', 'hb'],
  'es-GQ': ['H', 'h', 'hB', 'hb'],
  'es-PE': ['H', 'h', 'hB', 'hb'],
  GT: ['H', 'h', 'hB', 'hb'],
  HN: ['H', 'h', 'hB', 'hb'],
  IC: ['H', 'h', 'hB', 'hb'],
  KG: ['H', 'h', 'hB', 'hb'],
  KM: ['H', 'h', 'hB', 'hb'],
  LK: ['H', 'h', 'hB', 'hb'],
  MA: ['H', 'h', 'hB', 'hb'],
  MX: ['H', 'h', 'hB', 'hb'],
  NI: ['H', 'h', 'hB', 'hb'],
  PY: ['H', 'h', 'hB', 'hb'],
  SV: ['H', 'h', 'hB', 'hb'],
  UY: ['H', 'h', 'hB', 'hb'],
  JP: ['H', 'h', 'K'],
  AD: ['H', 'hB'],
  AM: ['H', 'hB'],
  AO: ['H', 'hB'],
  AT: ['H', 'hB'],
  AW: ['H', 'hB'],
  BE: ['H', 'hB'],
  BF: ['H', 'hB'],
  BJ: ['H', 'hB'],
  BL: ['H', 'hB'],
  BR: ['H', 'hB'],
  CG: ['H', 'hB'],
  CI: ['H', 'hB'],
  CV: ['H', 'hB'],
  DE: ['H', 'hB'],
  EE: ['H', 'hB'],
  FR: ['H', 'hB'],
  GA: ['H', 'hB'],
  GF: ['H', 'hB'],
  GN: ['H', 'hB'],
  GP: ['H', 'hB'],
  GW: ['H', 'hB'],
  HR: ['H', 'hB'],
  IL: ['H', 'hB'],
  IT: ['H', 'hB'],
  KZ: ['H', 'hB'],
  MC: ['H', 'hB'],
  MD: ['H', 'hB'],
  MF: ['H', 'hB'],
  MQ: ['H', 'hB'],
  MZ: ['H', 'hB'],
  NC: ['H', 'hB'],
  NL: ['H', 'hB'],
  PM: ['H', 'hB'],
  PT: ['H', 'hB'],
  RE: ['H', 'hB'],
  RO: ['H', 'hB'],
  SI: ['H', 'hB'],
  SR: ['H', 'hB'],
  ST: ['H', 'hB'],
  TG: ['H', 'hB'],
  TR: ['H', 'hB'],
  WF: ['H', 'hB'],
  YT: ['H', 'hB'],
  BD: ['h', 'hB', 'H'],
  PK: ['h', 'hB', 'H'],
  AZ: ['H', 'hB', 'h'],
  BA: ['H', 'hB', 'h'],
  BG: ['H', 'hB', 'h'],
  CH: ['H', 'hB', 'h'],
  GE: ['H', 'hB', 'h'],
  LI: ['H', 'hB', 'h'],
  ME: ['H', 'hB', 'h'],
  RS: ['H', 'hB', 'h'],
  UA: ['H', 'hB', 'h'],
  UZ: ['H', 'hB', 'h'],
  XK: ['H', 'hB', 'h'],
  AG: ['h', 'hb', 'H', 'hB'],
  AU: ['h', 'hb', 'H', 'hB'],
  BB: ['h', 'hb', 'H', 'hB'],
  BM: ['h', 'hb', 'H', 'hB'],
  BS: ['h', 'hb', 'H', 'hB'],
  CA: ['h', 'hb', 'H', 'hB'],
  DM: ['h', 'hb', 'H', 'hB'],
  'en-001': ['h', 'hb', 'H', 'hB'],
  FJ: ['h', 'hb', 'H', 'hB'],
  FM: ['h', 'hb', 'H', 'hB'],
  GD: ['h', 'hb', 'H', 'hB'],
  GM: ['h', 'hb', 'H', 'hB'],
  GU: ['h', 'hb', 'H', 'hB'],
  GY: ['h', 'hb', 'H', 'hB'],
  JM: ['h', 'hb', 'H', 'hB'],
  KI: ['h', 'hb', 'H', 'hB'],
  KN: ['h', 'hb', 'H', 'hB'],
  KY: ['h', 'hb', 'H', 'hB'],
  LC: ['h', 'hb', 'H', 'hB'],
  LR: ['h', 'hb', 'H', 'hB'],
  MH: ['h', 'hb', 'H', 'hB'],
  MP: ['h', 'hb', 'H', 'hB'],
  MW: ['h', 'hb', 'H', 'hB'],
  NZ: ['h', 'hb', 'H', 'hB'],
  SB: ['h', 'hb', 'H', 'hB'],
  SG: ['h', 'hb', 'H', 'hB'],
  SL: ['h', 'hb', 'H', 'hB'],
  SS: ['h', 'hb', 'H', 'hB'],
  SZ: ['h', 'hb', 'H', 'hB'],
  TC: ['h', 'hb', 'H', 'hB'],
  TT: ['h', 'hb', 'H', 'hB'],
  UM: ['h', 'hb', 'H', 'hB'],
  US: ['h', 'hb', 'H', 'hB'],
  VC: ['h', 'hb', 'H', 'hB'],
  VG: ['h', 'hb', 'H', 'hB'],
  VI: ['h', 'hb', 'H', 'hB'],
  ZM: ['h', 'hb', 'H', 'hB'],
  BO: ['H', 'hB', 'h', 'hb'],
  EC: ['H', 'hB', 'h', 'hb'],
  ES: ['H', 'hB', 'h', 'hb'],
  GQ: ['H', 'hB', 'h', 'hb'],
  PE: ['H', 'hB', 'h', 'hb'],
  AE: ['h', 'hB', 'hb', 'H'],
  'ar-001': ['h', 'hB', 'hb', 'H'],
  BH: ['h', 'hB', 'hb', 'H'],
  DZ: ['h', 'hB', 'hb', 'H'],
  EG: ['h', 'hB', 'hb', 'H'],
  EH: ['h', 'hB', 'hb', 'H'],
  HK: ['h', 'hB', 'hb', 'H'],
  IQ: ['h', 'hB', 'hb', 'H'],
  JO: ['h', 'hB', 'hb', 'H'],
  KW: ['h', 'hB', 'hb', 'H'],
  LB: ['h', 'hB', 'hb', 'H'],
  LY: ['h', 'hB', 'hb', 'H'],
  MO: ['h', 'hB', 'hb', 'H'],
  MR: ['h', 'hB', 'hb', 'H'],
  OM: ['h', 'hB', 'hb', 'H'],
  PH: ['h', 'hB', 'hb', 'H'],
  PS: ['h', 'hB', 'hb', 'H'],
  QA: ['h', 'hB', 'hb', 'H'],
  SA: ['h', 'hB', 'hb', 'H'],
  SD: ['h', 'hB', 'hb', 'H'],
  SY: ['h', 'hB', 'hb', 'H'],
  TN: ['h', 'hB', 'hb', 'H'],
  YE: ['h', 'hB', 'hb', 'H'],
  AF: ['H', 'hb', 'hB', 'h'],
  LA: ['H', 'hb', 'hB', 'h'],
  CN: ['H', 'hB', 'hb', 'h'],
  LV: ['H', 'hB', 'hb', 'h'],
  TL: ['H', 'hB', 'hb', 'h'],
  'zu-ZA': ['H', 'hB', 'hb', 'h'],
  CD: ['hB', 'H'],
  IR: ['hB', 'H'],
  'hi-IN': ['hB', 'h', 'H'],
  'kn-IN': ['hB', 'h', 'H'],
  'ml-IN': ['hB', 'h', 'H'],
  'te-IN': ['hB', 'h', 'H'],
  KH: ['hB', 'h', 'H', 'hb'],
  'ta-IN': ['hB', 'h', 'hb', 'H'],
  BN: ['hb', 'hB', 'h', 'H'],
  MY: ['hb', 'hB', 'h', 'H'],
  ET: ['hB', 'hb', 'h', 'H'],
  'gu-IN': ['hB', 'hb', 'h', 'H'],
  'mr-IN': ['hB', 'hb', 'h', 'H'],
  'pa-IN': ['hB', 'hb', 'h', 'H'],
  TW: ['hB', 'hb', 'h', 'H'],
  KE: ['hB', 'hb', 'H', 'h'],
  MM: ['hB', 'hb', 'H', 'h'],
  TZ: ['hB', 'hb', 'H', 'h'],
  UG: ['hB', 'hb', 'H', 'h'],
}
function n2(e, t) {
  for (var i = '', o = 0; o < e.length; o++) {
    var s = e.charAt(o)
    if (s === 'j') {
      for (var a = 0; o + 1 < e.length && e.charAt(o + 1) === s; ) a++, o++
      var c = 1 + (a & 1),
        h = a < 2 ? 1 : 3 + (a >> 1),
        f = 'a',
        p = i2(t)
      for ((p == 'H' || p == 'k') && (h = 0); h-- > 0; ) i += f
      for (; c-- > 0; ) i = p + i
    } else s === 'J' ? (i += 'H') : (i += s)
  }
  return i
}
function i2(e) {
  var t = e.hourCycle
  if ((t === void 0 && e.hourCycles && e.hourCycles.length && (t = e.hourCycles[0]), t))
    switch (t) {
      case 'h24':
        return 'k'
      case 'h23':
        return 'H'
      case 'h12':
        return 'h'
      case 'h11':
        return 'K'
      default:
        throw new Error('Invalid hourCycle')
    }
  var i = e.language,
    o
  i !== 'root' && (o = e.maximize().region)
  var s = bs[o || ''] || bs[i || ''] || bs[''.concat(i, '-001')] || bs['001']
  return s[0]
}
var Vr,
  o2 = new RegExp('^'.concat(Wf.source, '*')),
  s2 = new RegExp(''.concat(Wf.source, '*$'))
function et(e, t) {
  return { start: e, end: t }
}
var r2 = !!String.prototype.startsWith,
  a2 = !!String.fromCodePoint,
  l2 = !!Object.fromEntries,
  c2 = !!String.prototype.codePointAt,
  u2 = !!String.prototype.trimStart,
  h2 = !!String.prototype.trimEnd,
  f2 = !!Number.isSafeInteger,
  d2 = f2
    ? Number.isSafeInteger
    : function (e) {
        return (
          typeof e == 'number' &&
          isFinite(e) &&
          Math.floor(e) === e &&
          Math.abs(e) <= 9007199254740991
        )
      },
  la = !0
try {
  var p2 = Yf('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu')
  la = ((Vr = p2.exec('a')) === null || Vr === void 0 ? void 0 : Vr[0]) === 'a'
} catch (e) {
  la = !1
}
var Cu = r2
    ? function (t, i, o) {
        return t.startsWith(i, o)
      }
    : function (t, i, o) {
        return t.slice(o, o + i.length) === i
      },
  ca = a2
    ? String.fromCodePoint
    : function () {
        for (var t = [], i = 0; i < arguments.length; i++) t[i] = arguments[i]
        for (var o = '', s = t.length, a = 0, c; s > a; ) {
          if (((c = t[a++]), c > 1114111)) throw RangeError(c + ' is not a valid code point')
          o +=
            c < 65536
              ? String.fromCharCode(c)
              : String.fromCharCode(((c -= 65536) >> 10) + 55296, (c % 1024) + 56320)
        }
        return o
      },
  xu = l2
    ? Object.fromEntries
    : function (t) {
        for (var i = {}, o = 0, s = t; o < s.length; o++) {
          var a = s[o],
            c = a[0],
            h = a[1]
          i[c] = h
        }
        return i
      },
  qf = c2
    ? function (t, i) {
        return t.codePointAt(i)
      }
    : function (t, i) {
        var o = t.length
        if (!(i < 0 || i >= o)) {
          var s = t.charCodeAt(i),
            a
          return s < 55296 ||
            s > 56319 ||
            i + 1 === o ||
            (a = t.charCodeAt(i + 1)) < 56320 ||
            a > 57343
            ? s
            : ((s - 55296) << 10) + (a - 56320) + 65536
        }
      },
  m2 = u2
    ? function (t) {
        return t.trimStart()
      }
    : function (t) {
        return t.replace(o2, '')
      },
  g2 = h2
    ? function (t) {
        return t.trimEnd()
      }
    : function (t) {
        return t.replace(s2, '')
      }
function Yf(e, t) {
  return new RegExp(e, t)
}
var ua
if (la) {
  var Eu = Yf('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu')
  ua = function (t, i) {
    var o
    Eu.lastIndex = i
    var s = Eu.exec(t)
    return (o = s[1]) !== null && o !== void 0 ? o : ''
  }
} else
  ua = function (t, i) {
    for (var o = []; ; ) {
      var s = qf(t, i)
      if (s === void 0 || Kf(s) || y2(s)) break
      o.push(s), (i += s >= 65536 ? 2 : 1)
    }
    return ca.apply(void 0, o)
  }
var _2 = (function () {
  function e(t, i) {
    i === void 0 && (i = {}),
      (this.message = t),
      (this.position = { offset: 0, line: 1, column: 1 }),
      (this.ignoreTag = !!i.ignoreTag),
      (this.locale = i.locale),
      (this.requiresOtherClause = !!i.requiresOtherClause),
      (this.shouldParseSkeletons = !!i.shouldParseSkeletons)
  }
  return (
    (e.prototype.parse = function () {
      if (this.offset() !== 0) throw Error('parser can only be used once')
      return this.parseMessage(0, '', !1)
    }),
    (e.prototype.parseMessage = function (t, i, o) {
      for (var s = []; !this.isEOF(); ) {
        var a = this.char()
        if (a === 123) {
          var c = this.parseArgument(t, o)
          if (c.err) return c
          s.push(c.val)
        } else {
          if (a === 125 && t > 0) break
          if (a === 35 && (i === 'plural' || i === 'selectordinal')) {
            var h = this.clonePosition()
            this.bump(), s.push({ type: ft.pound, location: et(h, this.clonePosition()) })
          } else if (a === 60 && !this.ignoreTag && this.peek() === 47) {
            if (o) break
            return this.error(
              Qe.UNMATCHED_CLOSING_TAG,
              et(this.clonePosition(), this.clonePosition()),
            )
          } else if (a === 60 && !this.ignoreTag && ha(this.peek() || 0)) {
            var c = this.parseTag(t, i)
            if (c.err) return c
            s.push(c.val)
          } else {
            var c = this.parseLiteral(t, i)
            if (c.err) return c
            s.push(c.val)
          }
        }
      }
      return { val: s, err: null }
    }),
    (e.prototype.parseTag = function (t, i) {
      var o = this.clonePosition()
      this.bump()
      var s = this.parseTagName()
      if ((this.bumpSpace(), this.bumpIf('/>')))
        return {
          val: {
            type: ft.literal,
            value: '<'.concat(s, '/>'),
            location: et(o, this.clonePosition()),
          },
          err: null,
        }
      if (this.bumpIf('>')) {
        var a = this.parseMessage(t + 1, i, !0)
        if (a.err) return a
        var c = a.val,
          h = this.clonePosition()
        if (this.bumpIf('</')) {
          if (this.isEOF() || !ha(this.char()))
            return this.error(Qe.INVALID_TAG, et(h, this.clonePosition()))
          var f = this.clonePosition(),
            p = this.parseTagName()
          return s !== p
            ? this.error(Qe.UNMATCHED_CLOSING_TAG, et(f, this.clonePosition()))
            : (this.bumpSpace(),
              this.bumpIf('>')
                ? {
                    val: {
                      type: ft.tag,
                      value: s,
                      children: c,
                      location: et(o, this.clonePosition()),
                    },
                    err: null,
                  }
                : this.error(Qe.INVALID_TAG, et(h, this.clonePosition())))
        } else return this.error(Qe.UNCLOSED_TAG, et(o, this.clonePosition()))
      } else return this.error(Qe.INVALID_TAG, et(o, this.clonePosition()))
    }),
    (e.prototype.parseTagName = function () {
      var t = this.offset()
      for (this.bump(); !this.isEOF() && v2(this.char()); ) this.bump()
      return this.message.slice(t, this.offset())
    }),
    (e.prototype.parseLiteral = function (t, i) {
      for (var o = this.clonePosition(), s = ''; ; ) {
        var a = this.tryParseQuote(i)
        if (a) {
          s += a
          continue
        }
        var c = this.tryParseUnquoted(t, i)
        if (c) {
          s += c
          continue
        }
        var h = this.tryParseLeftAngleBracket()
        if (h) {
          s += h
          continue
        }
        break
      }
      var f = et(o, this.clonePosition())
      return { val: { type: ft.literal, value: s, location: f }, err: null }
    }),
    (e.prototype.tryParseLeftAngleBracket = function () {
      return !this.isEOF() && this.char() === 60 && (this.ignoreTag || !b2(this.peek() || 0))
        ? (this.bump(), '<')
        : null
    }),
    (e.prototype.tryParseQuote = function (t) {
      if (this.isEOF() || this.char() !== 39) return null
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'"
        case 123:
        case 60:
        case 62:
        case 125:
          break
        case 35:
          if (t === 'plural' || t === 'selectordinal') break
          return null
        default:
          return null
      }
      this.bump()
      var i = [this.char()]
      for (this.bump(); !this.isEOF(); ) {
        var o = this.char()
        if (o === 39)
          if (this.peek() === 39) i.push(39), this.bump()
          else {
            this.bump()
            break
          }
        else i.push(o)
        this.bump()
      }
      return ca.apply(void 0, i)
    }),
    (e.prototype.tryParseUnquoted = function (t, i) {
      if (this.isEOF()) return null
      var o = this.char()
      return o === 60 ||
        o === 123 ||
        (o === 35 && (i === 'plural' || i === 'selectordinal')) ||
        (o === 125 && t > 0)
        ? null
        : (this.bump(), ca(o))
    }),
    (e.prototype.parseArgument = function (t, i) {
      var o = this.clonePosition()
      if ((this.bump(), this.bumpSpace(), this.isEOF()))
        return this.error(Qe.EXPECT_ARGUMENT_CLOSING_BRACE, et(o, this.clonePosition()))
      if (this.char() === 125)
        return this.bump(), this.error(Qe.EMPTY_ARGUMENT, et(o, this.clonePosition()))
      var s = this.parseIdentifierIfPossible().value
      if (!s) return this.error(Qe.MALFORMED_ARGUMENT, et(o, this.clonePosition()))
      if ((this.bumpSpace(), this.isEOF()))
        return this.error(Qe.EXPECT_ARGUMENT_CLOSING_BRACE, et(o, this.clonePosition()))
      switch (this.char()) {
        case 125:
          return (
            this.bump(),
            {
              val: { type: ft.argument, value: s, location: et(o, this.clonePosition()) },
              err: null,
            }
          )
        case 44:
          return (
            this.bump(),
            this.bumpSpace(),
            this.isEOF()
              ? this.error(Qe.EXPECT_ARGUMENT_CLOSING_BRACE, et(o, this.clonePosition()))
              : this.parseArgumentOptions(t, i, s, o)
          )
        default:
          return this.error(Qe.MALFORMED_ARGUMENT, et(o, this.clonePosition()))
      }
    }),
    (e.prototype.parseIdentifierIfPossible = function () {
      var t = this.clonePosition(),
        i = this.offset(),
        o = ua(this.message, i),
        s = i + o.length
      this.bumpTo(s)
      var a = this.clonePosition(),
        c = et(t, a)
      return { value: o, location: c }
    }),
    (e.prototype.parseArgumentOptions = function (t, i, o, s) {
      var a,
        c = this.clonePosition(),
        h = this.parseIdentifierIfPossible().value,
        f = this.clonePosition()
      switch (h) {
        case '':
          return this.error(Qe.EXPECT_ARGUMENT_TYPE, et(c, f))
        case 'number':
        case 'date':
        case 'time': {
          this.bumpSpace()
          var p = null
          if (this.bumpIf(',')) {
            this.bumpSpace()
            var g = this.clonePosition(),
              b = this.parseSimpleArgStyleIfPossible()
            if (b.err) return b
            var v = g2(b.val)
            if (v.length === 0)
              return this.error(
                Qe.EXPECT_ARGUMENT_STYLE,
                et(this.clonePosition(), this.clonePosition()),
              )
            var w = et(g, this.clonePosition())
            p = { style: v, styleLocation: w }
          }
          var $ = this.tryParseArgumentClose(s)
          if ($.err) return $
          var x = et(s, this.clonePosition())
          if (p && Cu(p == null ? void 0 : p.style, '::', 0)) {
            var S = m2(p.style.slice(2))
            if (h === 'number') {
              var b = this.parseNumberSkeletonFromString(S, p.styleLocation)
              return b.err
                ? b
                : { val: { type: ft.number, value: o, location: x, style: b.val }, err: null }
            } else {
              if (S.length === 0) return this.error(Qe.EXPECT_DATE_TIME_SKELETON, x)
              var L = S
              this.locale && (L = n2(S, this.locale))
              var v = {
                  type: Di.dateTime,
                  pattern: L,
                  location: p.styleLocation,
                  parsedOptions: this.shouldParseSkeletons ? K_(L) : {},
                },
                N = h === 'date' ? ft.date : ft.time
              return { val: { type: N, value: o, location: x, style: v }, err: null }
            }
          }
          return {
            val: {
              type: h === 'number' ? ft.number : h === 'date' ? ft.date : ft.time,
              value: o,
              location: x,
              style: (a = p == null ? void 0 : p.style) !== null && a !== void 0 ? a : null,
            },
            err: null,
          }
        }
        case 'plural':
        case 'selectordinal':
        case 'select': {
          var B = this.clonePosition()
          if ((this.bumpSpace(), !this.bumpIf(',')))
            return this.error(Qe.EXPECT_SELECT_ARGUMENT_OPTIONS, et(B, lt({}, B)))
          this.bumpSpace()
          var F = this.parseIdentifierIfPossible(),
            R = 0
          if (h !== 'select' && F.value === 'offset') {
            if (!this.bumpIf(':'))
              return this.error(
                Qe.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,
                et(this.clonePosition(), this.clonePosition()),
              )
            this.bumpSpace()
            var b = this.tryParseDecimalInteger(
              Qe.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,
              Qe.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE,
            )
            if (b.err) return b
            this.bumpSpace(), (F = this.parseIdentifierIfPossible()), (R = b.val)
          }
          var V = this.tryParsePluralOrSelectOptions(t, h, i, F)
          if (V.err) return V
          var $ = this.tryParseArgumentClose(s)
          if ($.err) return $
          var G = et(s, this.clonePosition())
          return h === 'select'
            ? { val: { type: ft.select, value: o, options: xu(V.val), location: G }, err: null }
            : {
                val: {
                  type: ft.plural,
                  value: o,
                  options: xu(V.val),
                  offset: R,
                  pluralType: h === 'plural' ? 'cardinal' : 'ordinal',
                  location: G,
                },
                err: null,
              }
        }
        default:
          return this.error(Qe.INVALID_ARGUMENT_TYPE, et(c, f))
      }
    }),
    (e.prototype.tryParseArgumentClose = function (t) {
      return this.isEOF() || this.char() !== 125
        ? this.error(Qe.EXPECT_ARGUMENT_CLOSING_BRACE, et(t, this.clonePosition()))
        : (this.bump(), { val: !0, err: null })
    }),
    (e.prototype.parseSimpleArgStyleIfPossible = function () {
      for (var t = 0, i = this.clonePosition(); !this.isEOF(); ) {
        var o = this.char()
        switch (o) {
          case 39: {
            this.bump()
            var s = this.clonePosition()
            if (!this.bumpUntil("'"))
              return this.error(Qe.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, et(s, this.clonePosition()))
            this.bump()
            break
          }
          case 123: {
            ;(t += 1), this.bump()
            break
          }
          case 125: {
            if (t > 0) t -= 1
            else return { val: this.message.slice(i.offset, this.offset()), err: null }
            break
          }
          default:
            this.bump()
            break
        }
      }
      return { val: this.message.slice(i.offset, this.offset()), err: null }
    }),
    (e.prototype.parseNumberSkeletonFromString = function (t, i) {
      var o = []
      try {
        o = X_(t)
      } catch (s) {
        return this.error(Qe.INVALID_NUMBER_SKELETON, i)
      }
      return {
        val: {
          type: Di.number,
          tokens: o,
          location: i,
          parsedOptions: this.shouldParseSkeletons ? t2(o) : {},
        },
        err: null,
      }
    }),
    (e.prototype.tryParsePluralOrSelectOptions = function (t, i, o, s) {
      for (var a, c = !1, h = [], f = new Set(), p = s.value, g = s.location; ; ) {
        if (p.length === 0) {
          var b = this.clonePosition()
          if (i !== 'select' && this.bumpIf('=')) {
            var v = this.tryParseDecimalInteger(
              Qe.EXPECT_PLURAL_ARGUMENT_SELECTOR,
              Qe.INVALID_PLURAL_ARGUMENT_SELECTOR,
            )
            if (v.err) return v
            ;(g = et(b, this.clonePosition())), (p = this.message.slice(b.offset, this.offset()))
          } else break
        }
        if (f.has(p))
          return this.error(
            i === 'select'
              ? Qe.DUPLICATE_SELECT_ARGUMENT_SELECTOR
              : Qe.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,
            g,
          )
        p === 'other' && (c = !0), this.bumpSpace()
        var w = this.clonePosition()
        if (!this.bumpIf('{'))
          return this.error(
            i === 'select'
              ? Qe.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT
              : Qe.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,
            et(this.clonePosition(), this.clonePosition()),
          )
        var $ = this.parseMessage(t + 1, i, o)
        if ($.err) return $
        var x = this.tryParseArgumentClose(w)
        if (x.err) return x
        h.push([p, { value: $.val, location: et(w, this.clonePosition()) }]),
          f.add(p),
          this.bumpSpace(),
          (a = this.parseIdentifierIfPossible()),
          (p = a.value),
          (g = a.location)
      }
      return h.length === 0
        ? this.error(
            i === 'select'
              ? Qe.EXPECT_SELECT_ARGUMENT_SELECTOR
              : Qe.EXPECT_PLURAL_ARGUMENT_SELECTOR,
            et(this.clonePosition(), this.clonePosition()),
          )
        : this.requiresOtherClause && !c
          ? this.error(Qe.MISSING_OTHER_CLAUSE, et(this.clonePosition(), this.clonePosition()))
          : { val: h, err: null }
    }),
    (e.prototype.tryParseDecimalInteger = function (t, i) {
      var o = 1,
        s = this.clonePosition()
      this.bumpIf('+') || (this.bumpIf('-') && (o = -1))
      for (var a = !1, c = 0; !this.isEOF(); ) {
        var h = this.char()
        if (h >= 48 && h <= 57) (a = !0), (c = c * 10 + (h - 48)), this.bump()
        else break
      }
      var f = et(s, this.clonePosition())
      return a ? ((c *= o), d2(c) ? { val: c, err: null } : this.error(i, f)) : this.error(t, f)
    }),
    (e.prototype.offset = function () {
      return this.position.offset
    }),
    (e.prototype.isEOF = function () {
      return this.offset() === this.message.length
    }),
    (e.prototype.clonePosition = function () {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column,
      }
    }),
    (e.prototype.char = function () {
      var t = this.position.offset
      if (t >= this.message.length) throw Error('out of bound')
      var i = qf(this.message, t)
      if (i === void 0) throw Error('Offset '.concat(t, ' is at invalid UTF-16 code unit boundary'))
      return i
    }),
    (e.prototype.error = function (t, i) {
      return { val: null, err: { kind: t, message: this.message, location: i } }
    }),
    (e.prototype.bump = function () {
      if (!this.isEOF()) {
        var t = this.char()
        t === 10
          ? ((this.position.line += 1), (this.position.column = 1), (this.position.offset += 1))
          : ((this.position.column += 1), (this.position.offset += t < 65536 ? 1 : 2))
      }
    }),
    (e.prototype.bumpIf = function (t) {
      if (Cu(this.message, t, this.offset())) {
        for (var i = 0; i < t.length; i++) this.bump()
        return !0
      }
      return !1
    }),
    (e.prototype.bumpUntil = function (t) {
      var i = this.offset(),
        o = this.message.indexOf(t, i)
      return o >= 0 ? (this.bumpTo(o), !0) : (this.bumpTo(this.message.length), !1)
    }),
    (e.prototype.bumpTo = function (t) {
      if (this.offset() > t)
        throw Error(
          'targetOffset '
            .concat(t, ' must be greater than or equal to the current offset ')
            .concat(this.offset()),
        )
      for (t = Math.min(t, this.message.length); ; ) {
        var i = this.offset()
        if (i === t) break
        if (i > t)
          throw Error('targetOffset '.concat(t, ' is at invalid UTF-16 code unit boundary'))
        if ((this.bump(), this.isEOF())) break
      }
    }),
    (e.prototype.bumpSpace = function () {
      for (; !this.isEOF() && Kf(this.char()); ) this.bump()
    }),
    (e.prototype.peek = function () {
      if (this.isEOF()) return null
      var t = this.char(),
        i = this.offset(),
        o = this.message.charCodeAt(i + (t >= 65536 ? 2 : 1))
      return o != null ? o : null
    }),
    e
  )
})()
function ha(e) {
  return (e >= 97 && e <= 122) || (e >= 65 && e <= 90)
}
function b2(e) {
  return ha(e) || e === 47
}
function v2(e) {
  return (
    e === 45 ||
    e === 46 ||
    (e >= 48 && e <= 57) ||
    e === 95 ||
    (e >= 97 && e <= 122) ||
    (e >= 65 && e <= 90) ||
    e == 183 ||
    (e >= 192 && e <= 214) ||
    (e >= 216 && e <= 246) ||
    (e >= 248 && e <= 893) ||
    (e >= 895 && e <= 8191) ||
    (e >= 8204 && e <= 8205) ||
    (e >= 8255 && e <= 8256) ||
    (e >= 8304 && e <= 8591) ||
    (e >= 11264 && e <= 12271) ||
    (e >= 12289 && e <= 55295) ||
    (e >= 63744 && e <= 64975) ||
    (e >= 65008 && e <= 65533) ||
    (e >= 65536 && e <= 983039)
  )
}
function Kf(e) {
  return (
    (e >= 9 && e <= 13) ||
    e === 32 ||
    e === 133 ||
    (e >= 8206 && e <= 8207) ||
    e === 8232 ||
    e === 8233
  )
}
function y2(e) {
  return (
    (e >= 33 && e <= 35) ||
    e === 36 ||
    (e >= 37 && e <= 39) ||
    e === 40 ||
    e === 41 ||
    e === 42 ||
    e === 43 ||
    e === 44 ||
    e === 45 ||
    (e >= 46 && e <= 47) ||
    (e >= 58 && e <= 59) ||
    (e >= 60 && e <= 62) ||
    (e >= 63 && e <= 64) ||
    e === 91 ||
    e === 92 ||
    e === 93 ||
    e === 94 ||
    e === 96 ||
    e === 123 ||
    e === 124 ||
    e === 125 ||
    e === 126 ||
    e === 161 ||
    (e >= 162 && e <= 165) ||
    e === 166 ||
    e === 167 ||
    e === 169 ||
    e === 171 ||
    e === 172 ||
    e === 174 ||
    e === 176 ||
    e === 177 ||
    e === 182 ||
    e === 187 ||
    e === 191 ||
    e === 215 ||
    e === 247 ||
    (e >= 8208 && e <= 8213) ||
    (e >= 8214 && e <= 8215) ||
    e === 8216 ||
    e === 8217 ||
    e === 8218 ||
    (e >= 8219 && e <= 8220) ||
    e === 8221 ||
    e === 8222 ||
    e === 8223 ||
    (e >= 8224 && e <= 8231) ||
    (e >= 8240 && e <= 8248) ||
    e === 8249 ||
    e === 8250 ||
    (e >= 8251 && e <= 8254) ||
    (e >= 8257 && e <= 8259) ||
    e === 8260 ||
    e === 8261 ||
    e === 8262 ||
    (e >= 8263 && e <= 8273) ||
    e === 8274 ||
    e === 8275 ||
    (e >= 8277 && e <= 8286) ||
    (e >= 8592 && e <= 8596) ||
    (e >= 8597 && e <= 8601) ||
    (e >= 8602 && e <= 8603) ||
    (e >= 8604 && e <= 8607) ||
    e === 8608 ||
    (e >= 8609 && e <= 8610) ||
    e === 8611 ||
    (e >= 8612 && e <= 8613) ||
    e === 8614 ||
    (e >= 8615 && e <= 8621) ||
    e === 8622 ||
    (e >= 8623 && e <= 8653) ||
    (e >= 8654 && e <= 8655) ||
    (e >= 8656 && e <= 8657) ||
    e === 8658 ||
    e === 8659 ||
    e === 8660 ||
    (e >= 8661 && e <= 8691) ||
    (e >= 8692 && e <= 8959) ||
    (e >= 8960 && e <= 8967) ||
    e === 8968 ||
    e === 8969 ||
    e === 8970 ||
    e === 8971 ||
    (e >= 8972 && e <= 8991) ||
    (e >= 8992 && e <= 8993) ||
    (e >= 8994 && e <= 9e3) ||
    e === 9001 ||
    e === 9002 ||
    (e >= 9003 && e <= 9083) ||
    e === 9084 ||
    (e >= 9085 && e <= 9114) ||
    (e >= 9115 && e <= 9139) ||
    (e >= 9140 && e <= 9179) ||
    (e >= 9180 && e <= 9185) ||
    (e >= 9186 && e <= 9254) ||
    (e >= 9255 && e <= 9279) ||
    (e >= 9280 && e <= 9290) ||
    (e >= 9291 && e <= 9311) ||
    (e >= 9472 && e <= 9654) ||
    e === 9655 ||
    (e >= 9656 && e <= 9664) ||
    e === 9665 ||
    (e >= 9666 && e <= 9719) ||
    (e >= 9720 && e <= 9727) ||
    (e >= 9728 && e <= 9838) ||
    e === 9839 ||
    (e >= 9840 && e <= 10087) ||
    e === 10088 ||
    e === 10089 ||
    e === 10090 ||
    e === 10091 ||
    e === 10092 ||
    e === 10093 ||
    e === 10094 ||
    e === 10095 ||
    e === 10096 ||
    e === 10097 ||
    e === 10098 ||
    e === 10099 ||
    e === 10100 ||
    e === 10101 ||
    (e >= 10132 && e <= 10175) ||
    (e >= 10176 && e <= 10180) ||
    e === 10181 ||
    e === 10182 ||
    (e >= 10183 && e <= 10213) ||
    e === 10214 ||
    e === 10215 ||
    e === 10216 ||
    e === 10217 ||
    e === 10218 ||
    e === 10219 ||
    e === 10220 ||
    e === 10221 ||
    e === 10222 ||
    e === 10223 ||
    (e >= 10224 && e <= 10239) ||
    (e >= 10240 && e <= 10495) ||
    (e >= 10496 && e <= 10626) ||
    e === 10627 ||
    e === 10628 ||
    e === 10629 ||
    e === 10630 ||
    e === 10631 ||
    e === 10632 ||
    e === 10633 ||
    e === 10634 ||
    e === 10635 ||
    e === 10636 ||
    e === 10637 ||
    e === 10638 ||
    e === 10639 ||
    e === 10640 ||
    e === 10641 ||
    e === 10642 ||
    e === 10643 ||
    e === 10644 ||
    e === 10645 ||
    e === 10646 ||
    e === 10647 ||
    e === 10648 ||
    (e >= 10649 && e <= 10711) ||
    e === 10712 ||
    e === 10713 ||
    e === 10714 ||
    e === 10715 ||
    (e >= 10716 && e <= 10747) ||
    e === 10748 ||
    e === 10749 ||
    (e >= 10750 && e <= 11007) ||
    (e >= 11008 && e <= 11055) ||
    (e >= 11056 && e <= 11076) ||
    (e >= 11077 && e <= 11078) ||
    (e >= 11079 && e <= 11084) ||
    (e >= 11085 && e <= 11123) ||
    (e >= 11124 && e <= 11125) ||
    (e >= 11126 && e <= 11157) ||
    e === 11158 ||
    (e >= 11159 && e <= 11263) ||
    (e >= 11776 && e <= 11777) ||
    e === 11778 ||
    e === 11779 ||
    e === 11780 ||
    e === 11781 ||
    (e >= 11782 && e <= 11784) ||
    e === 11785 ||
    e === 11786 ||
    e === 11787 ||
    e === 11788 ||
    e === 11789 ||
    (e >= 11790 && e <= 11798) ||
    e === 11799 ||
    (e >= 11800 && e <= 11801) ||
    e === 11802 ||
    e === 11803 ||
    e === 11804 ||
    e === 11805 ||
    (e >= 11806 && e <= 11807) ||
    e === 11808 ||
    e === 11809 ||
    e === 11810 ||
    e === 11811 ||
    e === 11812 ||
    e === 11813 ||
    e === 11814 ||
    e === 11815 ||
    e === 11816 ||
    e === 11817 ||
    (e >= 11818 && e <= 11822) ||
    e === 11823 ||
    (e >= 11824 && e <= 11833) ||
    (e >= 11834 && e <= 11835) ||
    (e >= 11836 && e <= 11839) ||
    e === 11840 ||
    e === 11841 ||
    e === 11842 ||
    (e >= 11843 && e <= 11855) ||
    (e >= 11856 && e <= 11857) ||
    e === 11858 ||
    (e >= 11859 && e <= 11903) ||
    (e >= 12289 && e <= 12291) ||
    e === 12296 ||
    e === 12297 ||
    e === 12298 ||
    e === 12299 ||
    e === 12300 ||
    e === 12301 ||
    e === 12302 ||
    e === 12303 ||
    e === 12304 ||
    e === 12305 ||
    (e >= 12306 && e <= 12307) ||
    e === 12308 ||
    e === 12309 ||
    e === 12310 ||
    e === 12311 ||
    e === 12312 ||
    e === 12313 ||
    e === 12314 ||
    e === 12315 ||
    e === 12316 ||
    e === 12317 ||
    (e >= 12318 && e <= 12319) ||
    e === 12320 ||
    e === 12336 ||
    e === 64830 ||
    e === 64831 ||
    (e >= 65093 && e <= 65094)
  )
}
function fa(e) {
  e.forEach(function (t) {
    if ((delete t.location, Hf(t) || zf(t)))
      for (var i in t.options) delete t.options[i].location, fa(t.options[i].value)
    else
      (Bf(t) && Ff(t.style)) || ((Df(t) || Rf(t)) && aa(t.style))
        ? delete t.style.location
        : Uf(t) && fa(t.children)
  })
}
function w2(e, t) {
  t === void 0 && (t = {}), (t = lt({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, t))
  var i = new _2(e, t).parse()
  if (i.err) {
    var o = SyntaxError(Qe[i.err.kind])
    throw ((o.location = i.err.location), (o.originalMessage = i.err.message), o)
  }
  return (t != null && t.captureLocation) || fa(i.val), i.val
}
function Gr(e, t) {
  var i = t && t.cache ? t.cache : S2,
    o = t && t.serializer ? t.serializer : E2,
    s = t && t.strategy ? t.strategy : $2
  return s(e, { cache: i, serializer: o })
}
function k2(e) {
  return e == null || typeof e == 'number' || typeof e == 'boolean'
}
function Zf(e, t, i, o) {
  var s = k2(o) ? o : i(o),
    a = t.get(s)
  return typeof a > 'u' && ((a = e.call(this, o)), t.set(s, a)), a
}
function Xf(e, t, i) {
  var o = Array.prototype.slice.call(arguments, 3),
    s = i(o),
    a = t.get(s)
  return typeof a > 'u' && ((a = e.apply(this, o)), t.set(s, a)), a
}
function Oa(e, t, i, o, s) {
  return i.bind(t, e, o, s)
}
function $2(e, t) {
  var i = e.length === 1 ? Zf : Xf
  return Oa(e, this, i, t.cache.create(), t.serializer)
}
function C2(e, t) {
  return Oa(e, this, Xf, t.cache.create(), t.serializer)
}
function x2(e, t) {
  return Oa(e, this, Zf, t.cache.create(), t.serializer)
}
var E2 = function () {
  return JSON.stringify(arguments)
}
function Ba() {
  this.cache = Object.create(null)
}
Ba.prototype.get = function (e) {
  return this.cache[e]
}
Ba.prototype.set = function (e, t) {
  this.cache[e] = t
}
var S2 = {
    create: function () {
      return new Ba()
    },
  },
  jr = { variadic: C2, monadic: x2 },
  Ri
;(function (e) {
  ;(e.MISSING_VALUE = 'MISSING_VALUE'),
    (e.INVALID_VALUE = 'INVALID_VALUE'),
    (e.MISSING_INTL_API = 'MISSING_INTL_API')
})(Ri || (Ri = {}))
var Ds = (function (e) {
    Bs(t, e)
    function t(i, o, s) {
      var a = e.call(this, i) || this
      return (a.code = o), (a.originalMessage = s), a
    }
    return (
      (t.prototype.toString = function () {
        return '[formatjs Error: '.concat(this.code, '] ').concat(this.message)
      }),
      t
    )
  })(Error),
  Su = (function (e) {
    Bs(t, e)
    function t(i, o, s, a) {
      return (
        e.call(
          this,
          'Invalid values for "'
            .concat(i, '": "')
            .concat(o, '". Options are "')
            .concat(Object.keys(s).join('", "'), '"'),
          Ri.INVALID_VALUE,
          a,
        ) || this
      )
    }
    return t
  })(Ds),
  T2 = (function (e) {
    Bs(t, e)
    function t(i, o, s) {
      return (
        e.call(
          this,
          'Value for "'.concat(i, '" must be of type ').concat(o),
          Ri.INVALID_VALUE,
          s,
        ) || this
      )
    }
    return t
  })(Ds),
  L2 = (function (e) {
    Bs(t, e)
    function t(i, o) {
      return (
        e.call(
          this,
          'The intl string context variable "'
            .concat(i, '" was not provided to the string "')
            .concat(o, '"'),
          Ri.MISSING_VALUE,
          o,
        ) || this
      )
    }
    return t
  })(Ds),
  Wt
;(function (e) {
  ;(e[(e.literal = 0)] = 'literal'), (e[(e.object = 1)] = 'object')
})(Wt || (Wt = {}))
function A2(e) {
  return e.length < 2
    ? e
    : e.reduce(function (t, i) {
        var o = t[t.length - 1]
        return (
          !o || o.type !== Wt.literal || i.type !== Wt.literal ? t.push(i) : (o.value += i.value), t
        )
      }, [])
}
function M2(e) {
  return typeof e == 'function'
}
function ys(e, t, i, o, s, a, c) {
  if (e.length === 1 && yu(e[0])) return [{ type: Wt.literal, value: e[0].value }]
  for (var h = [], f = 0, p = e; f < p.length; f++) {
    var g = p[f]
    if (yu(g)) {
      h.push({ type: Wt.literal, value: g.value })
      continue
    }
    if (q_(g)) {
      typeof a == 'number' && h.push({ type: Wt.literal, value: i.getNumberFormat(t).format(a) })
      continue
    }
    var b = g.value
    if (!(s && b in s)) throw new L2(b, c)
    var v = s[b]
    if (j_(g)) {
      ;(!v || typeof v == 'string' || typeof v == 'number') &&
        (v = typeof v == 'string' || typeof v == 'number' ? String(v) : ''),
        h.push({ type: typeof v == 'string' ? Wt.literal : Wt.object, value: v })
      continue
    }
    if (Df(g)) {
      var w =
        typeof g.style == 'string' ? o.date[g.style] : aa(g.style) ? g.style.parsedOptions : void 0
      h.push({ type: Wt.literal, value: i.getDateTimeFormat(t, w).format(v) })
      continue
    }
    if (Rf(g)) {
      var w =
        typeof g.style == 'string'
          ? o.time[g.style]
          : aa(g.style)
            ? g.style.parsedOptions
            : o.time.medium
      h.push({ type: Wt.literal, value: i.getDateTimeFormat(t, w).format(v) })
      continue
    }
    if (Bf(g)) {
      var w =
        typeof g.style == 'string'
          ? o.number[g.style]
          : Ff(g.style)
            ? g.style.parsedOptions
            : void 0
      w && w.scale && (v = v * (w.scale || 1)),
        h.push({ type: Wt.literal, value: i.getNumberFormat(t, w).format(v) })
      continue
    }
    if (Uf(g)) {
      var $ = g.children,
        x = g.value,
        S = s[x]
      if (!M2(S)) throw new T2(x, 'function', c)
      var L = ys($, t, i, o, s, a),
        N = S(
          L.map(function (R) {
            return R.value
          }),
        )
      Array.isArray(N) || (N = [N]),
        h.push.apply(
          h,
          N.map(function (R) {
            return { type: typeof R == 'string' ? Wt.literal : Wt.object, value: R }
          }),
        )
    }
    if (Hf(g)) {
      var B = g.options[v] || g.options.other
      if (!B) throw new Su(g.value, v, Object.keys(g.options), c)
      h.push.apply(h, ys(B.value, t, i, o, s))
      continue
    }
    if (zf(g)) {
      var B = g.options['='.concat(v)]
      if (!B) {
        if (!Intl.PluralRules)
          throw new Ds(
            'Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',
            Ri.MISSING_INTL_API,
            c,
          )
        var F = i.getPluralRules(t, { type: g.pluralType }).select(v - (g.offset || 0))
        B = g.options[F] || g.options.other
      }
      if (!B) throw new Su(g.value, v, Object.keys(g.options), c)
      h.push.apply(h, ys(B.value, t, i, o, s, v - (g.offset || 0)))
      continue
    }
  }
  return A2(h)
}
function P2(e, t) {
  return t
    ? lt(
        lt(lt({}, e || {}), t || {}),
        Object.keys(e).reduce(function (i, o) {
          return (i[o] = lt(lt({}, e[o]), t[o] || {})), i
        }, {}),
      )
    : e
}
function I2(e, t) {
  return t
    ? Object.keys(e).reduce(
        function (i, o) {
          return (i[o] = P2(e[o], t[o])), i
        },
        lt({}, e),
      )
    : e
}
function qr(e) {
  return {
    create: function () {
      return {
        get: function (t) {
          return e[t]
        },
        set: function (t, i) {
          e[t] = i
        },
      }
    },
  }
}
function N2(e) {
  return (
    e === void 0 && (e = { number: {}, dateTime: {}, pluralRules: {} }),
    {
      getNumberFormat: Gr(
        function () {
          for (var t, i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o]
          return new ((t = Intl.NumberFormat).bind.apply(t, Wr([void 0], i, !1)))()
        },
        { cache: qr(e.number), strategy: jr.variadic },
      ),
      getDateTimeFormat: Gr(
        function () {
          for (var t, i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o]
          return new ((t = Intl.DateTimeFormat).bind.apply(t, Wr([void 0], i, !1)))()
        },
        { cache: qr(e.dateTime), strategy: jr.variadic },
      ),
      getPluralRules: Gr(
        function () {
          for (var t, i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o]
          return new ((t = Intl.PluralRules).bind.apply(t, Wr([void 0], i, !1)))()
        },
        { cache: qr(e.pluralRules), strategy: jr.variadic },
      ),
    }
  )
}
var Jf = (function () {
  function e(t, i, o, s) {
    var a = this
    if (
      (i === void 0 && (i = e.defaultLocale),
      (this.formatterCache = { number: {}, dateTime: {}, pluralRules: {} }),
      (this.format = function (c) {
        var h = a.formatToParts(c)
        if (h.length === 1) return h[0].value
        var f = h.reduce(function (p, g) {
          return (
            !p.length || g.type !== Wt.literal || typeof p[p.length - 1] != 'string'
              ? p.push(g.value)
              : (p[p.length - 1] += g.value),
            p
          )
        }, [])
        return f.length <= 1 ? f[0] || '' : f
      }),
      (this.formatToParts = function (c) {
        return ys(a.ast, a.locales, a.formatters, a.formats, c, void 0, a.message)
      }),
      (this.resolvedOptions = function () {
        return { locale: a.resolvedLocale.toString() }
      }),
      (this.getAst = function () {
        return a.ast
      }),
      (this.locales = i),
      (this.resolvedLocale = e.resolveLocale(i)),
      typeof t == 'string')
    ) {
      if (((this.message = t), !e.__parse))
        throw new TypeError(
          'IntlMessageFormat.__parse must be set to process `message` of type `string`',
        )
      this.ast = e.__parse(t, {
        ignoreTag: s == null ? void 0 : s.ignoreTag,
        locale: this.resolvedLocale,
      })
    } else this.ast = t
    if (!Array.isArray(this.ast))
      throw new TypeError('A message must be provided as a String or AST.')
    ;(this.formats = I2(e.formats, o)),
      (this.formatters = (s && s.formatters) || N2(this.formatterCache))
  }
  return (
    Object.defineProperty(e, 'defaultLocale', {
      get: function () {
        return (
          e.memoizedDefaultLocale ||
            (e.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale),
          e.memoizedDefaultLocale
        )
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.memoizedDefaultLocale = null),
    (e.resolveLocale = function (t) {
      var i = Intl.NumberFormat.supportedLocalesOf(t)
      return i.length > 0 ? new Intl.Locale(i[0]) : new Intl.Locale(typeof t == 'string' ? t : t[0])
    }),
    (e.__parse = w2),
    (e.formats = {
      number: {
        integer: { maximumFractionDigits: 0 },
        currency: { style: 'currency' },
        percent: { style: 'percent' },
      },
      date: {
        short: { month: 'numeric', day: 'numeric', year: '2-digit' },
        medium: { month: 'short', day: 'numeric', year: 'numeric' },
        long: { month: 'long', day: 'numeric', year: 'numeric' },
        full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
      },
      time: {
        short: { hour: 'numeric', minute: 'numeric' },
        medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
        long: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' },
        full: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' },
      },
    }),
    e
  )
})()
function O2(e, t) {
  if (t == null) return
  if (t in e) return e[t]
  const i = t.split('.')
  let o = e
  for (let s = 0; s < i.length; s++)
    if (typeof o == 'object') {
      if (s > 0) {
        const a = i.slice(s, i.length).join('.')
        if (a in o) {
          o = o[a]
          break
        }
      }
      o = o[i[s]]
    } else o = void 0
  return o
}
const An = {},
  B2 = (e, t, i) => i && (t in An || (An[t] = {}), e in An[t] || (An[t][e] = i), i),
  Qf = (e, t) => {
    if (t == null) return
    if (t in An && e in An[t]) return An[t][e]
    const i = Bo(t)
    for (let o = 0; o < i.length; o++) {
      const s = i[o],
        a = R2(s, e)
      if (a) return B2(e, t, a)
    }
  }
let Da
const Wi = Ie({})
function D2(e) {
  return Da[e] || null
}
function Ra(e) {
  return e in Da
}
function R2(e, t) {
  if (!Ra(e)) return null
  const i = D2(e)
  return O2(i, t)
}
function H2(e) {
  if (e == null) return
  const t = Bo(e)
  for (let i = 0; i < t.length; i++) {
    const o = t[i]
    if (Ra(o)) return o
  }
}
function z2(e, ...t) {
  delete An[e], Wi.update((i) => ((i[e] = G_.all([i[e] || {}, ...t])), i))
}
ci([Wi], ([e]) => Object.keys(e))
Wi.subscribe((e) => (Da = e))
const Co = {}
function U2(e) {
  Co[e] = new Set()
}
function F2(e, t) {
  Co[e].delete(t), Co[e].size === 0 && delete Co[e]
}
function xo(e) {
  return Co[e]
}
function W2(e) {
  return Bo(e)
    .map((t) => {
      const i = xo(t)
      return [t, i ? [...i] : []]
    })
    .filter(([, t]) => t.length > 0)
}
function Ss(e) {
  return e == null
    ? !1
    : Bo(e).some((t) => {
        var i
        return (i = xo(t)) == null ? void 0 : i.size
      })
}
function V2(e, t) {
  return Promise.all(t.map((o) => (F2(e, o), o().then((s) => s.default || s)))).then((o) =>
    z2(e, ...o),
  )
}
const vo = {}
function ed(e) {
  if (!Ss(e)) return e in vo ? vo[e] : Promise.resolve()
  const t = W2(e)
  return (
    (vo[e] = Promise.all(t.map(([i, o]) => V2(i, o))).then(() => {
      if (Ss(e)) return ed(e)
      delete vo[e]
    })),
    vo[e]
  )
}
function Nn(e, t) {
  xo(e) || U2(e)
  const i = xo(e)
  xo(e).has(t) || (Ra(e) || Wi.update((o) => ((o[e] = {}), o)), i.add(t))
}
var Tu = Object.getOwnPropertySymbols,
  G2 = Object.prototype.hasOwnProperty,
  j2 = Object.prototype.propertyIsEnumerable,
  q2 = (e, t) => {
    var i = {}
    for (var o in e) G2.call(e, o) && t.indexOf(o) < 0 && (i[o] = e[o])
    if (e != null && Tu) for (var o of Tu(e)) t.indexOf(o) < 0 && j2.call(e, o) && (i[o] = e[o])
    return i
  }
const Y2 = {
  number: {
    scientific: { notation: 'scientific' },
    engineering: { notation: 'engineering' },
    compactLong: { notation: 'compact', compactDisplay: 'long' },
    compactShort: { notation: 'compact', compactDisplay: 'short' },
  },
  date: {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  },
  time: {
    short: { hour: 'numeric', minute: 'numeric' },
    medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
    long: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' },
    full: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' },
  },
}
function K2({ locale: e, id: t }) {
  console.warn(
    '[svelte-i18n] The message "'
      .concat(t, '" was not found in "')
      .concat(Bo(e).join('", "'), '".')
      .concat(
        Ss(On())
          ? "\n\nNote: there are at least one loader still registered to this locale that wasn't executed."
          : '',
      ),
  )
}
const Z2 = {
    fallbackLocale: null,
    loadingDelay: 200,
    formats: Y2,
    warnOnMissingMessages: !0,
    handleMissingMessage: void 0,
    ignoreTag: !0,
  },
  wo = Z2
function Hi() {
  return wo
}
function X2(e) {
  const t = e,
    { formats: i } = t,
    o = q2(t, ['formats'])
  let s = e.fallbackLocale
  if (e.initialLocale)
    try {
      Jf.resolveLocale(e.initialLocale) && (s = e.initialLocale)
    } catch (a) {
      console.warn(
        '[svelte-i18n] The initial locale "'.concat(e.initialLocale, '" is not a valid locale.'),
      )
    }
  return (
    o.warnOnMissingMessages &&
      (delete o.warnOnMissingMessages,
      o.handleMissingMessage == null
        ? (o.handleMissingMessage = K2)
        : console.warn(
            '[svelte-i18n] The "warnOnMissingMessages" option is deprecated. Please use the "handleMissingMessage" option instead.',
          )),
    Object.assign(wo, o, { initialLocale: s }),
    i &&
      ('number' in i && Object.assign(wo.formats.number, i.number),
      'date' in i && Object.assign(wo.formats.date, i.date),
      'time' in i && Object.assign(wo.formats.time, i.time)),
    ui.set(s)
  )
}
const Yr = Ie(!1)
var J2 = Object.defineProperty,
  Q2 = Object.defineProperties,
  eb = Object.getOwnPropertyDescriptors,
  Lu = Object.getOwnPropertySymbols,
  tb = Object.prototype.hasOwnProperty,
  nb = Object.prototype.propertyIsEnumerable,
  Au = (e, t, i) =>
    t in e ? J2(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i),
  ib = (e, t) => {
    for (var i in t || (t = {})) tb.call(t, i) && Au(e, i, t[i])
    if (Lu) for (var i of Lu(t)) nb.call(t, i) && Au(e, i, t[i])
    return e
  },
  ob = (e, t) => Q2(e, eb(t))
let da
const Ts = Ie(null)
function Mu(e) {
  return e
    .split('-')
    .map((t, i, o) => o.slice(0, i + 1).join('-'))
    .reverse()
}
function Bo(e, t = Hi().fallbackLocale) {
  const i = Mu(e)
  return t ? [...new Set([...i, ...Mu(t)])] : i
}
function On() {
  return da != null ? da : void 0
}
Ts.subscribe((e) => {
  ;(da = e != null ? e : void 0),
    typeof window < 'u' && e != null && document.documentElement.setAttribute('lang', e)
})
const sb = (e) => {
    if (e && H2(e) && Ss(e)) {
      const { loadingDelay: t } = Hi()
      let i
      return (
        typeof window < 'u' && On() != null && t
          ? (i = window.setTimeout(() => Yr.set(!0), t))
          : Yr.set(!0),
        ed(e)
          .then(() => {
            Ts.set(e)
          })
          .finally(() => {
            clearTimeout(i), Yr.set(!1)
          })
      )
    }
    return Ts.set(e)
  },
  ui = ob(ib({}, Ts), { set: sb }),
  rb = () =>
    typeof window > 'u' ? null : window.navigator.language || window.navigator.languages[0],
  Rs = (e) => {
    const t = Object.create(null)
    return (o) => {
      const s = JSON.stringify(o)
      return s in t ? t[s] : (t[s] = e(o))
    }
  }
var ab = Object.defineProperty,
  Ls = Object.getOwnPropertySymbols,
  td = Object.prototype.hasOwnProperty,
  nd = Object.prototype.propertyIsEnumerable,
  Pu = (e, t, i) =>
    t in e ? ab(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i),
  Ha = (e, t) => {
    for (var i in t || (t = {})) td.call(t, i) && Pu(e, i, t[i])
    if (Ls) for (var i of Ls(t)) nd.call(t, i) && Pu(e, i, t[i])
    return e
  },
  Vi = (e, t) => {
    var i = {}
    for (var o in e) td.call(e, o) && t.indexOf(o) < 0 && (i[o] = e[o])
    if (e != null && Ls) for (var o of Ls(e)) t.indexOf(o) < 0 && nd.call(e, o) && (i[o] = e[o])
    return i
  }
const Lo = (e, t) => {
    const { formats: i } = Hi()
    if (e in i && t in i[e]) return i[e][t]
    throw new Error('[svelte-i18n] Unknown "'.concat(t, '" ').concat(e, ' format.'))
  },
  lb = Rs((e) => {
    var t = e,
      { locale: i, format: o } = t,
      s = Vi(t, ['locale', 'format'])
    if (i == null) throw new Error('[svelte-i18n] A "locale" must be set to format numbers')
    return o && (s = Lo('number', o)), new Intl.NumberFormat(i, s)
  }),
  cb = Rs((e) => {
    var t = e,
      { locale: i, format: o } = t,
      s = Vi(t, ['locale', 'format'])
    if (i == null) throw new Error('[svelte-i18n] A "locale" must be set to format dates')
    return (
      o ? (s = Lo('date', o)) : Object.keys(s).length === 0 && (s = Lo('date', 'short')),
      new Intl.DateTimeFormat(i, s)
    )
  }),
  ub = Rs((e) => {
    var t = e,
      { locale: i, format: o } = t,
      s = Vi(t, ['locale', 'format'])
    if (i == null) throw new Error('[svelte-i18n] A "locale" must be set to format time values')
    return (
      o ? (s = Lo('time', o)) : Object.keys(s).length === 0 && (s = Lo('time', 'short')),
      new Intl.DateTimeFormat(i, s)
    )
  }),
  hb = (e = {}) => {
    var t = e,
      { locale: i = On() } = t,
      o = Vi(t, ['locale'])
    return lb(Ha({ locale: i }, o))
  },
  fb = (e = {}) => {
    var t = e,
      { locale: i = On() } = t,
      o = Vi(t, ['locale'])
    return cb(Ha({ locale: i }, o))
  },
  db = (e = {}) => {
    var t = e,
      { locale: i = On() } = t,
      o = Vi(t, ['locale'])
    return ub(Ha({ locale: i }, o))
  },
  pb = Rs((e, t = On()) => new Jf(e, t, Hi().formats, { ignoreTag: Hi().ignoreTag })),
  mb = (e, t = {}) => {
    var i, o, s, a
    let c = t
    typeof e == 'object' && ((c = e), (e = c.id))
    const { values: h, locale: f = On(), default: p } = c
    if (f == null)
      throw new Error(
        '[svelte-i18n] Cannot format a message without first setting the initial locale.',
      )
    let g = Qf(e, f)
    if (!g)
      g =
        (a =
          (s =
            (o = (i = Hi()).handleMissingMessage) == null
              ? void 0
              : o.call(i, { locale: f, id: e, defaultValue: p })) != null
            ? s
            : p) != null
          ? a
          : e
    else if (typeof g != 'string')
      return (
        console.warn(
          '[svelte-i18n] Message with id "'
            .concat(e, '" must be of type "string", found: "')
            .concat(
              typeof g,
              '". Gettin its value through the "$format" method is deprecated; use the "json" method instead.',
            ),
        ),
        g
      )
    if (!h) return g
    let b = g
    try {
      b = pb(g, f).format(h)
    } catch (v) {
      v instanceof Error &&
        console.warn('[svelte-i18n] Message "'.concat(e, '" has syntax error:'), v.message)
    }
    return b
  },
  gb = (e, t) => db(t).format(e),
  _b = (e, t) => fb(t).format(e),
  bb = (e, t) => hb(t).format(e),
  vb = (e, t = On()) => Qf(e, t),
  De = ci([ui, Wi], () => mb)
ci([ui], () => gb)
ci([ui], () => _b)
ci([ui], () => bb)
ci([ui, Wi], () => vb)
const yb = { wallet: 'Wallet', miner: 'Miner', transactions: 'Transfer', events: 'Events' },
  wb = {
    key_error: {
      title: 'ERROR: key not configured',
      body: "Your private key could not be found. Maybe this is due to a migration or upgrade. You should enter your mnemonic again save on your operating system's secure keychain.",
    },
    connection_error: {
      title: "Oops, We Can't Connect to 0L Network",
      body: "<p> This is likely because the upstream peer (server) you use is down.</p> <h3> Don't worry, your account and coins are safe.</h3> <p>If you need to update or refresh your peers you can do so here:</p>",
      dont_worry: "Don't worry, your account and coins are safe",
      refresh_instructions: 'If you need to update or refresh your peers you can do so here:',
    },
    error_accordion: { title: 'Error Report', category: 'Error Category', id: 'ID' },
    recovery_mode: {
      title: 'Recovery Mode',
      body: 'The network is up! But we are in Recovery Mode, and no rewards are being paid for proofs yet. Wait until Recovery Mode is finished to send proofs for rewards. Recovery ends when epoch {epoch_recovery_ends} changes to {epoch_recovery_ends_after}',
    },
    attempting_to_connect: 'Attempting to connect to the blockchain',
    not_connected_to_chain: 'Not connected to chain, data may be out of sync',
  },
  kb = {
    wallet: 'Wallet',
    carpe: 'CARPE',
    btn_new_account: 'New Account',
    btn_restore_account: 'Restore Account',
    newbie_message: "Looks like you don't have any accounts",
    reminder_create: {
      card_title: 'Onboarding',
      message_headline:
        'You have generated keys for an account, but it does not yet exist on chain.',
      message_prefix: 'Join our community on ',
      message_suffix: ' and provide us your Address to get onboarded.',
      onboard_key: 'ADDRESS',
    },
    account_list: {
      nickname: 'Nickname',
      address: 'Address',
      authkey: 'Authkey',
      unlocked: 'Unlocked',
      balance: 'Balance',
      offline: 'offline',
      loading: 'loading',
      account_on_chain: 'Account Not On Chain',
      message: ' Your balance will go down for every transaction you send, including mining.',
    },
    keygen: {
      title: 'Create New Account',
      description:
        "After you generate an account and secret phrase, you'll need someone to send one 0L coin to that account for it to be created on chain.",
      btn_generate_keys: 'Generate Keys',
      btn_generate_keys_2: 'Generate Different Keys',
      btn_create_account: 'Create This Account',
      account_address: 'Account Address',
      onboard_key: 'Onboarding Key',
      onboard_key_description:
        "This is also known as an Auth Key. For now you'll need it to be able to create the account on chain.",
      securite_recovery_phrase: 'SECRET RECOVERY PHRASE',
      securite_note:
        'This is your secret account password (mnemonic). If you lose it no one can help you! Write it down now.',
      account_tips:
        "Your account does not exist yet on chain. You'll need to give someone your Onboarding Key so that they can create your account.",
    },
    account_from_mnem_submit: {
      title: ' Heads Up!',
      body: " <p>Are you sure you wrote down your mnemonic phrase?</p> <p>You won't be able to recover your account without it. No one can help you if lose it.</p><p>This is the last opportunity to write it down.</p>",
      btn_cancel: 'Let me check again',
      btn_submit: 'Submit Now',
      btn_submiting: 'Submitting',
    },
    account_from_mnem_from: {
      title: 'RESTORE ACCOUNT',
      description:
        'Using your recovery words (mnemonic) you can configure Carpe as a wallet to monitor, and send transactions',
      placeholder: 'Recovery Words',
    },
    account_from_private: {
      description: 'Recover the account using the private key.',
      placeholder: 'Private Key',
      accordion_title: 'advanced: use private key',
    },
    account_switcher: {
      select_account: 'Settings',
      switch_account: 'Switch Account',
      setting: 'Settings',
      developers: 'Developers',
    },
  },
  $b = {
    about: 'About',
    release: 'Release',
    version: 'Version',
    branch: 'Branch',
    commit: 'Commit',
    upgrade_uptodate: 'You are on the current version',
    upgrade_available: 'There is an upgrade available',
    upgrade_checkagain: 'Check Upgrade',
  },
  Cb = {
    title: 'SETTINGS',
    langapp_settings: {
      title: 'Language and Appearance',
      lang: 'Language',
      lang_description: 'Choose the language used to display',
      lang_button: 'English',
      theme: 'Theme',
      theme_description: 'Choose the theme',
    },
    network_settings: {
      title: 'NETWORK SETTINGS',
      list_of_peers: 'PEERS PLAYLIST',
      synced_peers: 'Synced Peers',
      refresh_peers_button: 'Check Fullnodes Sync',
      description:
        'Choose a playlist of upstream nodes, so you can access the chain. Network connections will try the list in random order until a connection is made. Simply link to any playlist.json file here to update peers.',
      playlist: 'Update Playlist of Network Servers',
      override_peers: 'OVERRIDE PEERS',
      override_peers_description:
        'You can force using a different peer. You can only choose one peer with this setting. It will remove the playlist. This will now be a list of one element.',
      url_of_upstream_node: 'URL of upstream node',
      btn_update: 'UPDATE',
      upstream_title: 'FETCH A NEW WAYPOINT FROM UPSTREAM',
      upstream_subtitle:
        'Most waypoint issues can easily be fixed by fetching an updated one from a connected upstream peer.',
      btn_fetch_new_waypoint: 'Fetch New Waypoint',
      btn_cancel: 'Cancel',
      btn_submit: 'USE PLAYLIST',
    },
    account_settings: {
      title: 'ACCOUNT SETTINGS',
      btn_remove: 'REMOVE ACCOUNTS',
      confirm: 'Confirm remove accounts from this device? This is not reversible.',
      description:
        'This does not delete any accounts from the chain. It only removes the accounts from this device. If you do not have your recovery codes (mnemonic) stored somewhere, you may be locked out of this account permanently. NO ONE CAN HELP YOU RECOVER THE MNEMONIC. ',
    },
  },
  xb = {
    title: 'Miner',
    miner_backlog: {
      title: 'Sync Tower Proofs',
      subtitle: 'Manually resubmit local proofs',
      in_process: 'Backlog in Progress',
      btn_submit: 'Submit Local Backlog',
    },
    miner_phases: {
      backlog_started: 'Backlog Listener Started',
      backlog_in_process: 'Backlog in Progress',
      backlog_complete: 'Backlog Complete',
      mining_enabled: 'Mining Enabled',
      proof_started: 'Proof start request received',
      proof_complete: 'Proof Complete',
    },
    miner_process: {
      status_complete: 'Proof Complete',
      status_in_process: 'Mining in Progress',
      notes:
        "The percentage is an estimate. <br> It is based on your previous proof's elapsed time.",
      notes2: 'Over 100% only means this is taking longer than previous proof',
    },
    tower_state: {
      local_height: 'Local Tower Height',
      on_chain_height: 'On-chain Tower Height',
      mined_in_last_epoch: 'Last Epoch Mined',
      sent_in_this_epoch: 'Proofs Sent this Epoch',
      empty: 'No proofs found on device',
      proof_more: 'You have submitted max proofs today (max 72)',
      proof_less: 'Insufficient proofs to receive a reward today (min 8)',
      proof_ok: 'Your account has submitted enough proofs today (min 8)',
    },
    cards: {
      cant_start: {
        title: 'Your account does not exist on chain yet ',
        body: "The Carpe can't do anything until the account can be found on chain. Maybe you've generated new keys locally, but no one has sent any coins to that address?",
      },
      disco_error: {
        title: 'Discontinuity ',
        body: "Looks like there's a gap in the proofs you are submitting. Each proof needs to reference the previous one, and the proof was rejected because of this.",
      },
      epoch_status: {
        empty_title: 'No proofs sent',
        empty_body:
          'There are no proofs saved to the chain. When you successfully submit your first proof, you will see some stats here.',
        in_process_title: 'Keep it up',
        in_process_body:
          'Your account needs to submit at least 8 proofs per day (epoch) to receive a reward. You will receive the reward on the next day.',
        complete_title: 'Success!',
        complete_body:
          'Your account has submitted enough proofs today (minimum 8 proofs per epoch). You should receive rewards at the start of next epoch.',
        exceed_title: 'Whoa',
        exceed_body:
          'You have mined 72 proofs, the maximum number of proofs per epoch. The tower can keep making proofs but they will only be accepted in the next epoch.',
      },
      first_proof: {
        title: "Let's mine your first proof",
        body: "<p> Hang tight! This will take at least 30mins, maybe up to 1hr</p> <p> You will see your balance go down while you mine proofs. If you reach the minimum per day, you will receive a reward, on the next day (epoch).</p> <p> Check your computer settings so that the computer doesn't sleep when the screen shuts off. You want the miner running while you're not here.</p>",
        body_disabled: 'Turn the switch on to start mining!',
      },
      invalid_proof: {
        title: 'Cannot Verify Proof',
        body: 'Weird. This proof was rejected because it is not a valid "delay proof". This is usually because parameters are not set correctly.',
      },
      oops: { title: 'Oops', body: "Looks like there's an error with mining a delay proof" },
      too_many_proofs: {
        title: 'Too Many Proofs',
        body: "Looks like you've sent more proofs than expected during the last 24 hours. The chain expects a max {maxNum} proofs during each epoch. On the next epoch your proofs will begin to be submitted again.",
      },
      wrong_difficulty: {
        title: 'Wrong Difficulty',
        body: "Looks like you're sending a proof with the wrong difficulty parameters to the chain. Check you are connected to the right network with the correct difficulty settings.",
      },
      sync_proof: {
        title: 'Syncing your proofs',
        body: 'Proofs awaiting transaction: {delta} ',
        body_0:
          'Something is wrong, you have more proofs on-chain, than on this device. You may be missing proofs locally.',
      },
    },
  },
  Eb = {
    deno_tx: 'Demo Tx',
    account: 'Account',
    balance: 'Balance',
    btn_onboard: 'Onboard Account',
    btn_transfer: 'Transfer Coins',
    onboard: {
      title: 'Onboard an Account',
      await: 'Awaiting Tx',
      btn_onboard: 'Onboard',
      btn_cancel: 'Cancel',
      no_balance_title: 'Low Balance',
      no_balance_body1: 'Onboarding {onboard_key} was not successful.',
      no_balance_body2:
        "Looks like you have less than 2 coins in your account, this means you won't be able to onboard anyone.",
    },
    set_wallet_type: {
      title: 'Set your Account Type',
      subtitle:
        ' Make sure you know what you are doing. This is not reversible. Slow and Community wallets are permanent.',
      btn_slow: 'Set Slow Wallet',
      btn_confirm_slow: 'Confirm Set Slow Wallet? This is not reversible.',
      slow_confirm: 'Set Slow',
      btn_community: 'Set Community Wallet',
      btn_confirm_community: 'Set Community',
      community_confirm: 'Confirm Set Community Wallet? This is not reversible.',
    },
    transfer: {
      title: 'Coin Transfer',
      sender: 'Sender',
      balance: 'Unlocked Balance',
      receiver: 'Receiver',
      amount: 'Amount',
      amount_label: 'Amount (fractions not allowed yet)',
      receiver_placeholder: 'Receiver address',
      amount_placeholder: 'Amount to be transferred',
      confirm_title: 'Heads up!',
      please_confirm: 'Please confirm your transfer information:',
      await: 'Await txs',
      btn_next: 'Next',
      btn_confirm: 'Confirm',
      btn_cancel: 'Cancel',
      btn_close: 'Close',
      error_amount_greater_than_balance: 'Amount cannot be greater than account balance',
      error_receiver_equals_sender: 'Receiver address must be different from sender address',
      error_slow_wallet: 'Coin transfer is disabled for slow wallets.',
      error_account_does_not_exist: 'Recipient account does not exist.',
      success: 'Transfer executed with success',
      failed: 'Transfer failed. Code: {code}',
    },
  },
  Sb = {
    account_events: 'Account Events',
    version: 'Version',
    type: 'Type',
    amount: 'Amount',
    sender: 'Sender',
    receiver: 'Receiver',
    received_payment: 'Received Payment',
    sent_payment: 'Sent Payment',
    loading: {
      error: 'Events Temporarily Unavailable',
      corrupted_db:
        'The server you are connected to does not have all your event history available.',
      account_off_chain: 'Account selected not onboarded yet, and has no events.',
    },
  },
  Tb = {
    link_title: 'Claim Coins',
    card: {
      title: 'Claim Your Missing Coins',
      body: '<p>Oops. Occasionally blockchains make math mistakes. 0L tries to fix them as quickly as possible.</p><p>Miner Identity Subsidy Incident: From Epoch 0 to epoch 52, the payouts to miners was lower than expected. Below you can credit your missing coins from that period.</p>',
    },
    table: { account: 'Account', amount: 'Amount', claim: 'Claim' },
    claim_btn: { await: 'Await...', claim: 'Claim Now' },
    modal_success: {
      title: 'Transaction confirmed!',
      amount_for_account:
        '<p>You have claimed <span class="uk-text-bold">{coins} coins</span> for account <br><span class="uk-text-bold">{account}</span>.</p>',
      check_balance: 'You can check your balance now.',
      ok_btn: 'OK',
    },
    modal_error: {
      title: 'Claim Error',
      body: 'You must turn off miner to claim this account coins.',
      ok_btn: 'OK',
    },
  },
  Lb = {
    nav: yb,
    layout: wb,
    wallet: kb,
    about: $b,
    settings: Cb,
    miner: xb,
    txs: Eb,
    events: Sb,
    make_whole: Tb,
  },
  Ab = { wallet: '钱包', miner: '矿工', transactions: '交易', events: '事件' },
  Mb = {
    connection_error: {
      title: '糟糕, 居然无法连上OL网络',
      body: '<p> 很有可能是上游节点已断开。</p> <h3> 别担心！您的账号和资产是安全的.</h3> <p>如果您需要更新连接节点，请点这里：</p>',
    },
    error_accordion: { title: '错误报告', category: '错误分类', id: 'ID' },
  },
  Pb = {
    wallet: '钱包',
    carpe: 'CARPE',
    btn_new_account: '创建账号',
    btn_restore_account: '恢复账号',
    newbie_message: '您似乎还没有创建账号。',
    reminder_create: {
      card_title: '激活',
      message_headline: '您的账号已经创建成功，但是还没有激活。',
      message_prefix: '加我们的',
      message_suffix: ' 社区并提供您的激活码，社区成员会帮助您完成账户激活。',
      onboard_key: '激活码（AuthKey）',
    },
    account_list: {
      nickname: '昵称',
      address: '地址',
      authkey: '激活码',
      unlocked: 'Unlocked',
      balance: '余额',
      offline: '断线',
      loading: '加载中',
      account_on_chain: '未激活',
      message: ' 所有发送的交易（包括：挖矿）都会消耗一些余额作为手续费。',
    },
    keygen: {
      title: '创建新账号',
      description:
        '创建账户后，您的账户需要收到来自链上的任意一个钱包至少1个0L代币，才能够被激活上链。',
      btn_generate_keys: '生成密钥',
      btn_generate_keys_2: '换一个密钥',
      btn_create_account: '创建账户',
      account_address: '账户地址',
      onboard_key: '激活码（AuthKey）',
      onboard_key_description: '这个激活码用来将您账户激活到链上',
      securite_recovery_phrase: '账号助记词',
      securite_note:
        '这是您账号的助记词。如果丢失，您的账户将永远无法恢复。建议您用纸和笔记下来，妥善保管。',
      account_tips:
        '您的账号还没有上链，您需要将激活码发给一个已经拥有链上钱包的用户，来帮助您完成账号创建。',
    },
    account_from_mnem_submit: {
      title: ' 备份好了吗？',
      body: ' <p>您确定要使用这个助记词吗？</p> <p>如果助记词丢失或者忘记，您将不能恢复您的账号！</p><p> 请检查已经完成助记词备份！</p>',
      btn_cancel: '返回检查',
      btn_submit: '确认提交',
      btn_submiting: '提交中',
    },
    account_from_mnem_from: {
      title: '恢复账号',
      description: '使用您已备份的钱包账户助记词，在 CARPE 恢复账号，查看资产和发送交易。',
      placeholder: '助记词',
    },
    account_switcher: {
      select_account: '选择账号',
      switch_account: '切换账号',
      setting: '设置菜单',
      developers: '开发者模式',
    },
  },
  Ib = { about: '关于', release: '版本信息', version: '版本号', branch: '分支', commit: 'Commit' },
  Nb = {
    title: '设置',
    langapp_settings: {
      title: '语言和显示',
      lang: '语言',
      lang_description: '请选择您要显示的语言',
      lang_button: '中文',
      theme: '主题',
      theme_description: '请选择您喜欢的界面主题',
    },
    network_settings: {
      title: '网络设置',
      list_of_peers: '节点列表',
      description:
        '选择节点列表，自动化切换上游节点。Carpe 会在列表中随机连接上游节点，直至链接成功。您可以链接任何的 playlist.json 文件来更新节点。',
      playlist: '更新网络节点',
      override_peers: '覆盖节点',
      override_peers_description:
        '您可以设置只使用一个指定节点，请输入该节点 IP 地址，点击确认。注：覆盖节点模式下，节点列表功能将默认关闭。',
      url_of_upstream_node: '指定节点URL',
      btn_update: '确认',
      upstream_title: '获取新的WAYPOINT',
      upstream_subtitle: '通过切换获取新的 waypoint 来解决连接问题。',
      btn_fetch_new_waypoint: '获取新的Waypoint',
      btn_cancel: '取消',
      btn_submit: '使用节点列表',
    },
    account_settings: {
      title: '账号设置',
      btn_remove: '删除账号',
      confirm: '请确认要从本设备中删除当前账号吗？本操作不可逆。',
      description:
        '本操作不会删除链上账号，只会删除本地设备上的信息，请注意如果您没有备份助记词，您的账号将无法被恢复。',
    },
  },
  Ob = {
    title: '矿工',
    miner_backlog: {
      title: '同步塔（Tower）证明',
      subtitle: '手动提交本地积压证明',
      in_process: '提交中',
      btn_submit: '提交本地积压证明',
    },
    miner_phases: {
      backlog_started: '积压监听启动',
      backlog_in_process: '积压提交中',
      backlog_complete: '积压处理完成',
      mining_enabled: '启动挖矿',
      proof_started: '证明请求开始',
      proof_complete: '证明完成',
    },
    miner_process: {
      status_complete: '证明完成',
      status_in_process: '挖矿进行中',
      notes: '百分比是预估值 <br> 它是根据您前一个证明的消耗时间估算的。',
      notes2: '超过100%，意味着当前证明比前一个所需要的时间更长。',
    },
    tower_state: {
      local_height: '本地塔高',
      on_chain_height: '链上塔高',
      mined_in_last_epoch: '当前纪元',
      sent_in_this_epoch: '现已提交',
      empty: '当前设备未发现证明',
      proof_more: '您提交的证明数已达到今天的最大值（72）',
      proof_less: '证明数量未达获取奖励的最小值 (8)',
      proof_ok: '恭喜您完成了本期需要的最小的证明数（8）',
    },
    cards: {
      cant_start: {
        title: '您的账号还未激活在链上。',
        body: '账号激活上链后，挖矿程序才能启动。可能您已经在本地创建了钱包地址，但是需要一个已经拥有链上钱包的用户转账1个0L币激活您的账户。',
      },
      disco_error: {
        title: '中断',
        body: '您当前提交的证明中存在空缺. 每一个证明的提交都需要基于前一个的数据，因此现在这个证明被拒绝了。',
      },
      epoch_status: {
        empty_title: '没有提交证明',
        empty_body: '没有在链上找到任何证明，如果您成功提交了一个证明，这里会显示统计数据。',
        in_process_title: '加油！',
        in_process_body:
          '您的账户每天（epoch）需要至少提交8个证明，第二天（下一个epoch）才会收到奖励。',
        complete_title: '成功！请保持',
        complete_body:
          '您已经完成今日所需的最低证明提交数量，（最少8个每天（epoch）保持挖矿将收获更多奖励。 您将会在明天（下一个epoch）开始的时候收到奖励',
        exceed_title: '牛哇！牛！',
        exceed_body:
          '您已经提交了72个证明，这是每天可以提交的最大数量。塔会继续提交证明，并在新的周期开始后一口气提交到连上。',
      },
      first_proof: {
        title: '开始提交第一个证明吧！',
        body: '<p>这将需要大约30分钟或者1小时左右的时间</p> <p> 挖取证明将会消耗您余额中一定数量的代币作为手续费. 如果您提交的证明数达到每天所需的最小值（8个）, 您就会在第二天（下一个epoch）收到奖励.</p> <p> 请检查您的计算机设置，关闭显示器后，电脑不会进入休眠状态，休眠状态 Carpe 会停止运行。</p>',
        body_disabled: '打开按钮开始挖矿吧!',
      },
      invalid_proof: {
        title: '证明验证失败！',
        body: '奇怪. 这个证明被拒绝了，因为它不是一个有效的“延时证明”。这通常是参数设置错误。',
      },
      oops: { title: '喔！~', body: '挖取证明的过程中出错了。' },
      too_many_proofs: {
        title: '太多错误',
        body: '您在最近24小时内已经提交了太多的证明. 每个周期最多接受{maxNum}证明. 您可以在下一个周期开始的时候重新提交.',
      },
      wrong_difficulty: {
        title: '错误的难度',
        body: '您证明文件中使用了错误的难度参数。检查您连接的网络是否使用了正确的难度参数。',
      },
      sync_proof: {
        title: '同步证明',
        body: '等待证明交易确认 {delta} ',
        body_0: '出现了一些小错误, 您本地的证明比链上的多，也有可能是您本地丢失了一些证明文件。',
      },
    },
  },
  Bb = {
    deno_tx: '测试交易',
    account: '账号',
    balance: '余额',
    btn_onboard: '激活账户',
    btn_transfer: '发送代币',
    onboard: {
      title: '激活账号',
      await: '处理中',
      btn_onboard: '激活',
      btn_cancel: '取消',
      no_balance_title: '余额不足',
      no_balance_body1: '{onboard_key}尚未激活成功.',
      no_balance_body2: '您的账户资产少于2个币，您不可以激活任何人。',
    },
    set_wallet_type: {
      title: '设置账户类型',
      subtitle: '确认您务必确认本次操作. 本操作不可逆. 慢钱包和社区钱包是永久性的。',
      btn_slow: '设为慢钱包',
      btn_confirm_slow: '确认设置慢钱包吗？本操作不可逆。',
      slow_confirm: '设为慢钱包',
      btn_community: '设为社区钱包',
      btn_confirm_community: '设为社区钱包',
      community_confirm: '确认要设为社区钱包吗？本操作不可逆。',
    },
    transfer: {
      title: '代币转账',
      sender: '发送者',
      balance: '余额',
      receiver: '接收者',
      amount: '代币数量',
      amount_label: '数量 (不能使用小数)',
      receiver_placeholder: '请输入接收者钱包账户地址',
      amount_placeholder: '请输入需要转账的数量',
      confirm_title: '注意！',
      please_confirm: '请确认您的转账信息:',
      await: '处理中',
      btn_next: '下一步',
      btn_confirm: '确认',
      btn_cancel: '取消',
      btn_close: '关闭',
      error_amount_greater_than_balance: '数量不能大于账户余额',
      error_receiver_equals_sender: '接收地址不能是发送地址',
      error_slow_wallet: '慢钱包转账功能尚未启动',
      success: '转账成功！',
      failed: '转账失败。 错误码: {code}',
    },
  },
  Db = {
    account_events: '账户事件',
    version: '版本',
    type: '类型',
    amount: '数量',
    sender: '发送者',
    receiver: '接收者',
    received_payment: '转入记录',
    sent_payment: '转出记录',
    loading: {
      error: '账户事件加载失败:',
      corrupted_db:
        '当前连接的节点无法查询您的账户信息. 别担心，您的资产是安全的，您可以尝试其他节点！',
      account_off_chain: '当前选中的账号未激活！',
    },
  },
  Rb = {
    link_title: 'Claim Coins',
    card: {
      title: 'Claim Your Missing Coins',
      body: '<p>Oops. Occasionally blockchains make math mistakes. 0L tries to fix them as quickly as possible.</p><p>Miner Identity Subsidy Incident: From Epoch 0 to epoch 52, the payouts to miners was lower than expected. Below you can credit your missing coins from that period.</p>',
    },
    table: { account: 'Account', amount: 'Amount', claim: 'Claim' },
    claim_btn: { await: 'Await...', claim: 'Claim Now' },
    modal_success: {
      title: 'Transation confirmed!',
      amount_for_account:
        '<p>You have claimed <span class="uk-text-bold">{coins} coins</span> for account <br><span class="uk-text-bold">{account}</span>.</p>',
      check_balance: 'You can check your balance now.',
      ok_btn: 'OK',
    },
    modal_error: {
      title: 'Claim Error',
      body: 'You must turn off miner to claim this account coins.',
      ok_btn: 'OK',
    },
  },
  Hb = {
    nav: Ab,
    layout: Mb,
    wallet: Pb,
    about: Ib,
    settings: Nb,
    miner: Ob,
    txs: Bb,
    events: Db,
    make_whole: Rb,
  },
  zb = { wallet: 'Wallet', miner: 'Miner', transactions: 'Transaktionen', events: 'Ereignisse' },
  Ub = {
    connection_error: {
      title: 'Ups, wir können keine Verbindung zum 0L-Netzwerk herstellen',
      body: '<p> Dies liegt wahrscheinlich daran, dass der von dir verwendete Upstream-Peer (Server) nicht verfügbar ist.</p> <h3> Keine Sorge, dein Konto und deine Coins sind sicher.</h3> <p>Wenn Du Deine Peers ändern oder aktualisieren musst, kannst Du das hier tun:</p>',
    },
    error_accordion: { title: 'Fehlerbericht', category: 'Fehler-Kategorie', id: 'ID' },
    recovery_mode: {
      title: 'Wiederherstellungsmodus',
      body: 'Das Netz ist wieder in Betrieb! Aber wir befinden uns im Wiederherstellungsmodus, und es werden noch keine Belohnungen für Proofs gezahlt. Warte, bis der Wiederherstellungsmodus beendet ist, um Proofs für Belohnungen zu senden. Die Wiederherstellung endet, wenn die Epoche {epoch_recovery_ends} auf {epoch_recovery_ends_after} wechselt.',
    },
  },
  Fb = {
    wallet: 'Wallet',
    carpe: 'CARPE',
    btn_new_account: 'Neues Konto',
    btn_restore_account: 'Konto wiederherstellen',
    newbie_message: 'Sieht aus, als hättest du keine Konten',
    reminder_create: {
      card_title: 'Onboarding',
      message_headline:
        'Du hast Keys für ein Konto erzeugt, aber es existiert noch nicht auf der Chain.',
      message_prefix: 'Tritt unserer Gemeinschaft bei auf ',
      message_suffix: ' und gib uns deinen Onboard Key, um an Bord zu kommen.',
      onboard_key: 'ONBOARD KEY',
    },
    account_list: {
      nickname: 'Spitzname',
      address: 'Adresse',
      authkey: 'Authkey',
      unlocked: 'Unlocked',
      balance: 'Guthaben',
      offline: 'offline',
      loading: 'wird geladen',
      account_on_chain: 'Konto nicht auf der Chain',
      message:
        ' Dein Guthaben verringert sich bei jeder Transaktion, die du sendest, einschließlich Mining.',
    },
    keygen: {
      title: 'Neues Konto anlegen',
      description:
        'Nachdem du ein Konto und eine geheime Phrase erstellt hast, muss jemand einen 0L-Coin an dieses Konto senden, damit es auf der Chain erstellt wird.',
      btn_generate_keys: 'Key erzeugen',
      btn_generate_keys_2: 'Unterschiedliche Keys erzeugen',
      btn_create_account: 'Dieses Konto anlegen',
      account_address: 'Adresse des Kontos',
      onboard_key: 'Onboarding Key',
      onboard_key_description:
        'Dieser wird auch als Auth Key bezeichnet. Du brauchst ihn, um das Konto auf der Chain erstellen zu können.',
      securite_recovery_phrase: 'GEHEIME WIEDERHERSTELLUNGSPHRASE',
      securite_note:
        'Dies ist dein geheimes Kontopasswort (Mnemonic). Wenn du es verlierst, kann dir niemand helfen! Schreib es dir jetzt auf.',
      account_tips:
        'Dein Konto existiert noch nicht auf der Chain. Du musst jemandem deinen Onboarding Key geben, damit er dein Konto erzeugen kann.',
    },
    account_from_mnem_submit: {
      title: ' Aufgepasst!',
      body: ' <p>Bist du sicher, dass du deine Mnemonic Phrase aufgeschrieben hast?</p> <p>Ohne sie kannst du dein Konto nicht wiederherstellen. Niemand kann dir helfen, wenn du sie verlierst.</p><p>Dies ist die letzte Chance, sie aufzuschreiben.</p>',
      btn_cancel: 'Ich schaue nochmal nach',
      btn_submit: 'Jetzt Abschicken',
      btn_submiting: 'Abschicken',
    },
    account_from_mnem_from: {
      title: 'KONTO WIEDERHERSTELLEN',
      description:
        'Mit deinen Wiederherstellungswörtern (Mnemonik) kannst du Carpe als Wallet zur Überwachung und zum Senden von Transaktionen konfigurieren',
      placeholder: 'Wiederherstellungs Mnemonik',
    },
    account_switcher: {
      select_account: 'Konto auswählen',
      switch_account: 'Konto wechseln',
      setting: 'Gehe zu Einstellung',
      developers: 'Entwickler',
    },
  },
  Wb = {
    about: 'Über',
    release: 'Release',
    version: 'Version',
    branch: 'Branch',
    commit: 'Commit',
  },
  Vb = {
    title: 'EINSTELLUNGEN',
    langapp_settings: {
      title: 'Sprache und Erscheinungsbild',
      lang: 'Sprache',
      lang_description: 'Wähle die Anzeigesprache',
      lang_button: 'Deutsch',
      theme: 'Theme',
      theme_description: 'Wähle das Theme',
    },
    network_settings: {
      title: 'NETZWERKEINSTELLUNGEN',
      list_of_peers: 'LISTE DER PEERS',
      description:
        'Wählen Sie eine Playlist mit vorgelagerten Knoten, damit ein Zugriff auf die Kette möglich ist. Netzwerkverbindungen werden die Liste in zufälliger Reihenfolge ausprobieren, bis eine Verbindung hergestellt ist. Verweise hier einfach auf eine beliebige playlist.json-Datei, um die Peers zu aktualisieren.',
      playlist: 'Playlist der Netzwerkserver aktualisieren',
      override_peers: 'PEERS ÜBERSCHREIBEN',
      override_peers_description:
        'Du kannst die Verwendung eines anderen Peers erzwingen. Mit dieser Einstellung kannst du nur einen Peer auswählen. Dadurch wird die Playlist entfernt. Diese besteht nun aus einem einzigen Element.',
      url_of_upstream_node: 'URL des vorgelagerten Knotens',
      btn_update: 'AKTUALISIERUNG',
      upstream_title: 'EINEN NEUEN WEGPUNKT VON OBERHALB ABRUFEN',
      upstream_subtitle:
        'Die meisten Probleme mit Wegpunkten lassen sich leicht beheben, indem man einen aktualisierten Wegpunkt von einem verbundenen Upstream-Peer abruft.',
      btn_fetch_new_waypoint: 'Neuen Wegpunkt abrufen',
      btn_cancel: 'Abbrechen',
      btn_submit: 'PLAYLIST VERWENDEN',
    },
    account_settings: {
      title: 'KONTOEINSTELLUNGEN',
      btn_remove: 'KONTO LÖSCHEN',
      confirm:
        'Das Löschen von Konten auf diesem Gerät bestätigen? Das kann nicht rückgängig gemacht werden.',
      description:
        'Dabei werden keine Konten von der Chain gelöscht. Die Konten werden nur von diesem Gerät entfernt. Wenn du deine Wiederherstellungscodes (Mnemonik) nicht irgendwo aufbewahrst, kann es sein, dass du dauerhaft aus diesem Konto ausgesperrt wirst. NIEMAND KANN DIR HELFEN, DIE MNEMONIK WIEDERZUBEKOMMEN. ',
    },
  },
  Gb = {
    title: 'Miner',
    miner_backlog: {
      title: 'Sync Tower Proofs',
      subtitle: 'Lokale Proofs manuell erneut einreichen',
      in_process: 'Backlog in Arbeit',
      btn_submit: 'Lokalen Backlog einreichen',
    },
    miner_phases: {
      backlog_started: 'Backlog Listener Gestartet',
      backlog_in_process: 'Backlog in Arbeit',
      backlog_complete: 'Backlog Fertig',
      mining_enabled: 'Mining Aktiviert',
      proof_started: 'Anforderung für Proof-Start erhalten',
      proof_complete: 'Proof Fertig',
    },
    miner_process: {
      status_complete: 'Proof Fertig',
      status_in_process: 'Mining Läuft',
      notes:
        'Der Prozentsatz ist eine Schätzung. <br> Es basiert auf der für den letzten Proof verwendeten Zeitspanne.',
      notes2: 'Über 100% bedeutet nur, dass es länger dauert als der vorherige Proof.',
    },
    tower_state: {
      local_height: 'Lokale Turmhöhe',
      on_chain_height: 'On-chain Turmhöhe',
      mined_in_last_epoch: 'Letzte Epoche gemined',
      sent_in_this_epoch: 'In dieser Epoche übermittelte Proofs',
      empty: 'Keine Proofs auf dem Gerät gefunden',
      proof_more: 'Du hast heute ein Maximum an Proofs übermittelt (max. 72)',
      proof_less: 'Nicht genügend Proofs, um heute eine Belohnung zu erhalten (mindestens 8)',
      proof_ok: 'Dein Konto hat heute genügend Proofs übermittelt (mindestens 8)',
    },
    cards: {
      cant_start: {
        title: 'Dein Konto existiert noch nicht in der Chain ',
        body: 'Der Miner kann erst starten, wenn das Konto auf der Chain gefunden werden kann. Vielleicht hast du lokal neue Schlüssel generiert, aber niemand hat Coins an die Adresse geschickt?',
      },
      disco_error: {
        title: 'Unterbrechung ',
        body: 'Sieht aus, als gäbe es eine Lücke in den von dir übermittelten Proofs. Jeder Proof muss auf den vorhergehenden verweisen, und der Proof wurde deshalb abgelehnt.',
      },
      epoch_status: {
        empty_title: 'Keine Proofs übermittelt',
        empty_body:
          'Es sind keine Proofs auf der Chain gespeichert. Wenn du deinen ersten Proof erfolgreich übermittelt hast, wirst du hier einige Statistiken sehen.',
        in_process_title: 'Weiter so',
        in_process_body:
          'Dein Konto muss mindestens 8 Proofs pro Tag (Epoche) übermitteln, um eine Belohnung zu erhalten. Du erhältst die Belohnung am nächsten Tag.',
        complete_title: 'Geschafft!',
        complete_body:
          'Dein Konto hat heute genügend Proofs geliefert (mindestens 8 Proofs pro Epoche). Du solltest die Belohnungen zu Beginn der nächsten Epoche erhalten.',
        exceed_title: 'Brrrr',
        exceed_body:
          'Du hast 72 Proofs erzeugt, das ist die maximale Anzahl von Proofs pro Epoche. Der Turm kann weiterhin Proofs machen, aber sie werden erst in der nächsten Epoche akzeptiert.',
      },
      first_proof: {
        title: 'Machen wir uns an deinen ersten Proof',
        body: '<p> Abwarten! Das dauert mindestens 30 Minuten, vielleicht bis zu 1 Stunde.</p> <p> Während du Proofs schürfst, wird dein Kontostand sinken. Wenn du das Minimum pro Tag erreichst, erhältst du am nächsten Tag (Epoche) eine Belohnung.</p> <p> Prüfe deine Computereinstellungen, damit der Computer nicht in den Ruhezustand geht, wenn sich der Bildschirm ausschaltet. Du möchtest, dass der Miner läuft, wenn du nicht da bist.</p>',
        body_disabled: 'Leg den Schalter um und fang an zu minen!',
      },
      invalid_proof: {
        title: 'Kann den Proof nicht bestätigen',
        body: 'Seltsam. Dieser Proof wurde abgelehnt, weil er kein gültiger "Delay Proof" ist. Dies liegt in der Regel daran, dass die Parameter nicht korrekt eingestellt sind.',
      },
      oops: {
        title: 'Hoppla',
        body: 'Sieht aus, als gäbe es einen Fehler beim Mining eines Delay Proofs',
      },
      too_many_proofs: {
        title: 'Zu Viele Proofs',
        body: 'Sieht aus, als hättest du in den letzten 24 Stunden mehr Proofs geschickt als erwartet. Die Chain erwartet maximal {maxNum} Proofs pro Epoche. In der nächsten Epoche werden deine Proofs wieder übermittelt.',
      },
      wrong_difficulty: {
        title: 'Falsche Difficulty',
        body: 'Es sieht so aus, als würdest du einen Proof mit den falschen Difficulty-Parametern an die Chain senden. Stelle sicher, dass du mit dem richtigen Netzwerk und den richtigen Difficulty-Einstellungen verbunden bist.',
      },
      sync_proof: {
        title: 'Synchronisierung Deiner Proofs',
        body: 'Auf Transaktion wartende Proofs: {delta} ',
        body_0:
          'Irgendetwas stimmt nicht. Du hast mehr Proofs auf der Chain, als auf diesem Gerät. Möglicherweise fehlen dir lokale Proofs.',
      },
    },
  },
  jb = {
    deno_tx: 'Demo Tx',
    account: 'Account',
    balance: 'Balance',
    btn_onboard: 'Onboard Account',
    btn_transfer: 'Transfer Coins',
    onboard: {
      title: 'Konto Onboarden',
      await: '',
      btn_onboard: 'Onboarden',
      btn_cancel: 'Abbrechen',
      no_balance_title: 'Niedriger Kontostand',
      no_balance_body1: 'Das Onboarding von {onboard_key} war nicht erfolgreich.',
      no_balance_body2:
        'Sieht so aus, als hättest du weniger als 2 Coins auf deinem Konto, das bedeutet, dass du niemanden onboarden kannst.',
    },
    set_wallet_type: {
      title: 'Kontotyp Auswählen',
      subtitle:
        ' Es ist wichtig, dass du weißt, was du tust. Dies kann nicht mehr rückgängig gemacht werden. Slow und Community Wallets sind unveränderlich.',
      btn_slow: 'Slow Wallet Wählen',
      btn_confirm_slow: 'Slow Wallet bestätigen? Dies kann nicht rückgängig gemacht werden.',
      slow_confirm: 'Slow Wählen',
      btn_community: 'Community Wallet Wählen',
      btn_confirm_community: 'Community Wählen',
      community_confirm: 'Community Wallet bestätigen? Dies kann nicht rückgängig gemacht werden.',
    },
    transfer: {
      title: 'Überweisung von Coins',
      sender: 'Sender',
      balance: 'Betrag',
      receiver: 'Receiver',
      amount: 'Empfänger',
      amount_label: 'Empfänger (Dezimalstellen noch nicht unterstützt)',
      receiver_placeholder: 'Empfänger Adresse',
      amount_placeholder: 'Überweisungsbetrag',
      confirm_title: 'Achtung!',
      please_confirm: 'Bitte die Überweisungsdaten bestätigen:',
      await: 'Auf Txs warten',
      btn_next: 'Weiter',
      btn_confirm: 'Bestätigen',
      btn_cancel: 'Abbrechen',
      btn_close: 'Schließen',
      error_amount_greater_than_balance: 'Der Betrag kann nicht größer als der Kontostand sein',
      error_receiver_equals_sender:
        'Die Empfängeradresse muss sich von der Absenderadresse unterscheiden',
      error_slow_wallet: 'Die Überweisung von Coins ist für Slow Wallets deaktiviert.',
      success: 'Überweisung erfolgreich durchgeführt',
      failed: 'Überweisung fehlgeschlagen. Code: {code}',
    },
  },
  qb = {
    account_events: 'Kontoereignisse',
    version: 'Version',
    type: 'Typ',
    amount: 'Betrag',
    sender: 'Sender',
    receiver: 'Empfänger',
    received_payment: 'Empfangene Zahlung',
    sent_payment: 'Gesendete Zahlung',
    loading: {
      error: 'Fehler beim Laden der Kontoereignisse:',
      corrupted_db:
        'Der aktuell verbundene Knoten verfügt nicht über alle Kontoereignisse. Keine Sorge. Deine Wallet und Coins sind in Sicherheit auf der Chain. Probiere, dich mit einem anderen Upstream-Knoten zu verbinden.',
      account_off_chain: 'Das ausgewählte Konto wurde noch nicht geonboarded.',
    },
  },
  Yb = {
    link_title: 'Coins einfordern',
    card: {
      title: 'Deine Fehlenden Coins Einfordern',
      body: '<p>Hoppla. Gelegentlich machen Blockchains mathematische Fehler. 0L versucht, diese so schnell wie möglich zu beheben.</p><p>Vorfall bei Miner-Identitäts-Subventionierung: Von Epoche 0 bis Epoche 52 waren die Auszahlungen an Miner geringer als erwartet. Nachfolgend kannst du deine fehlenden Coins aus diesem Zeitraum gutschreiben lassen.</p>',
    },
    table: { account: 'Konto', amount: 'Betrag', claim: 'Forderung' },
    claim_btn: { await: 'Warten...', claim: 'Jetzt Einfordern' },
    modal_success: {
      title: 'Transation confirmed!',
      amount_for_account:
        '<p>Du hast <span class="uk-text-bold">{coins} Coins</span> für Konto <br><span class="uk-text-bold">{account}</span> beansprucht.</p>',
      check_balance: 'Du kannst dein Guthaben jetzt überprüfen.',
      ok_btn: 'OK',
    },
    modal_error: {
      title: 'Fehler bei Anforderung',
      body: 'Du musst den Miner abstellen, um die Coins für dieses Konto zu beanspruchen.',
      ok_btn: 'OK',
    },
  },
  Kb = {
    nav: zb,
    layout: Ub,
    wallet: Fb,
    about: Wb,
    settings: Vb,
    miner: Gb,
    txs: jb,
    events: qb,
    make_whole: Yb,
  },
  Zb = {
    wallet: 'Portefeuille',
    miner: 'Mineur',
    transactions: 'Transactions',
    events: 'Événements',
  },
  Xb = {
    connection_error: {
      title: 'Impossible de se connecter au réseau 0L',
      body: "<p> Il est probable que l'upstream peer (serveur) que vous utilisez soit déconnecté.</p> <h3> Pas d'inquiétude, votre compte et vos Coins sont en sécurité.</h3> <p>Pour mettre à jour vos peers, rendez-vous ici :</p>",
    },
    error_accordion: { title: "Rapport d'erreurs", category: "Categorie d'erreur", id: 'ID' },
  },
  Jb = {
    wallet: 'Portefeuille',
    carpe: 'CARPE',
    btn_new_account: 'Nouveau Compte',
    btn_restore_account: 'Récupération de Compte',
    newbie_message: "Nous n'avons pas trouvé votre compte.",
    reminder_create: {
      card_title: 'Onboarding',
      message_headline:
        "Vous avez généré les clés de votre compte mais il n'existe pas encore sur la chaine.",
      message_prefix: 'Rejoignez notre communauté sur ',
      message_suffix: ' et fournissez votre clé (onboard key) pour etre onboardé.',
      onboard_key: 'ONBOARD KEY',
    },
    account_list: {
      nickname: 'Pseudo',
      address: 'Adresse',
      authkey: 'Authkey',
      unlocked: 'Unlocked',
      balance: 'Solde',
      offline: 'hors-ligne',
      loading: 'chargement',
      account_on_chain: "Le compte n'est pas sur la chaîne",
      message:
        ' Votre solde diminuera pour toutes transactions effectuées, y compris lorsque vous minez.',
    },
    keygen: {
      title: 'Creer un nouveau compte',
      description:
        "Aprés avoir généré votre compte et phrase secrète, vous aurez besoin que quelqu'un envoie un Coin 0L à ce compte pour qu'il soit mis sur la chaîne.",
      btn_generate_keys: 'Générer des clés',
      btn_generate_keys_2: 'Générer des clés différentes',
      btn_create_account: 'Créer ce compte',
      account_address: 'Adresse du compte',
      onboard_key: 'Onboarding key',
      onboard_key_description:
        "Aussi appelée clé d'authentification. Vous en aurez besoin pour créer ce compte sur la chaîne.",
      securite_recovery_phrase: 'PHRASE SECRÈTE DE RECUPÉRATION',
      securite_note:
        'Clé secrète de votre compte. Si vous la perdez, personne ne pourra vous aider. Notez-la et sécurisez-la bien.',
      account_tips:
        "Votre compte n'existe pas encore sur la chaîne. Vous devrez fournir votre onboarding key à quelqu'un pour qu'il soit créé.",
    },
    account_from_mnem_submit: {
      title: ' Attention !',
      body: ' <p>Avez-vous bien noté vore phrase secrète?</p> <p>Vous ne pourrez pas récupérer votre compte sans et personne ne peut vous aider si vous la perdez.</p><p>Dernière chance de la noter.</p>',
      btn_cancel: 'Je veux revérifier',
      btn_submit: 'Créer ce compte',
      btn_submiting: 'Création en cours',
    },
    account_from_mnem_from: {
      title: 'RÉCUPÉRATION DE COMPTE',
      description:
        'Grâce à votre phrase secrète de récupération vous pouvez utiliser Carpe comme portefeuille pour visualiser et faire des transactions',
      placeholder: 'Phrase secrète de récupération',
    },
    account_switcher: {
      select_account: 'Selection du Compte',
      switch_account: 'Changer de Compte',
      setting: 'Paramètres',
      developers: 'Dévelopeurs',
    },
  },
  Qb = {
    about: 'À propos',
    release: 'Release',
    version: 'Version',
    branch: 'Branche',
    commit: 'Commit',
  },
  ev = {
    title: 'PARAMÈTRES',
    langapp_settings: {
      title: 'Langage et apparence',
      lang: 'Langage',
      lang_description: 'Choisissez le langage à afficher',
      lang_button: 'Français',
      theme: 'Thème',
      theme_description: 'Choisir un thème',
    },
    network_settings: {
      title: 'PARAMÈTRES RÉSEAU',
      list_of_peers: 'LISTE DES PAIRS',
      description:
        "Choisissez une liste de noeuds en amont pour accéder à la chaîne. Un noeud aléatoire de la liste sera utilisé pour se connecter. Fournissez le lien d'un fichier playlist.json ici pour mettre à jour les pairs.",
      playlist: 'Rafraichir la liste des serveurs',
      override_peers: 'ÉCRASER LES PAIRS',
      override_peers_description:
        "Vous pouvez forcer l'utilisation d'un pair different. Vous ne pouvez choisir qu'un seul pair avec ce paramètre. La liste sera remplacée par une liste d'un élément.",
      url_of_upstream_node: 'URL du noeud amont',
      btn_update: 'RAFRAÎCHIR',
      upstream_title: 'DEMANDER UN NOUVEL ACCÈS AU NOEUD EN AMONT',
      upstream_subtitle: 'La plupart des problèmes sont résolus en demandant un nouvel accès.',
      btn_fetch_new_waypoint: 'Démander un nouvel accès',
      btn_cancel: 'Annuler',
      btn_submit: 'UTILISER LA LISTE',
    },
    account_settings: {
      title: 'PARAMÈTRES DU COMPTE',
      btn_remove: 'SUPPRIMER LE COMPTE',
      confirm:
        'Confirmer la suppression du compte de cet appareil ? Cette opération est irreversible.',
      description:
        "Votre compte sera toujours sur la chaîne mais il n'apparaîtra plus sur cet appareil. Si vous n'avez plus votre phrase secrète, vous perdez accès à ce compte définitivement. PERSONNE NE PEUT RETROUVER VOTRE PHRASE SECRÈTE.",
    },
  },
  tv = {
    title: 'Mineur',
    miner_backlog: {
      title: 'Synchroniser vos preuves',
      subtitle: 'Re-soumettre les preuves locales',
      in_process: 'Backlog en cours de soumission',
      btn_submit: 'Soumettre le backlog',
    },
    miner_phases: {
      backlog_started: 'Audit du backlog lancé',
      backlog_in_process: 'Backlog en cours',
      backlog_complete: 'Backlog complété',
      mining_enabled: 'Minage activé',
      proof_started: 'Requête de démarrage reçue',
      proof_complete: 'Preuve complétée',
    },
    miner_process: {
      status_complete: 'Preuve complétée',
      status_in_process: 'Minage en cours',
      notes:
        'Le pourcentage est une estimation. <br>Il est basé sur le temps pris par les preuves précédentes.',
      notes2:
        'Dépasser 100 % signifie simplement que la preuve en cours prend plus de temps que la précédente.',
    },
    tower_state: {
      local_height: 'Hauteur de la Tour locale',
      on_chain_height: 'Hauteur de la Tour on-chain',
      mined_in_last_epoch: 'Dernière Epoch minée',
      sent_in_this_epoch: 'Preuves envoyées pour cette Epoch',
      empty: 'Pas de preuve locale trouvée',
      proof_more: 'Vous avez soumis le maximum de preuves (max 72)',
      proof_less: 'Nombre de preuves insuffisantes pour recevoir la récompense (min 8)',
      proof_ok: 'Vous avez soumis suffisament de preuves (min 8)',
    },
    cards: {
      cant_start: {
        title: "Votre compte n'est pas encore sur la chaîne",
        body: "Le mineur ne peut débuter tant que votre compte n'est pas sur la chaîne. Si vous avez généré vos clés localement, quelqu'un doit vous envoyer des Coins.",
      },
      disco_error: {
        title: 'Discontinuité ',
        body: "Il semblerait qu'il y a une preuve manquante dans votre soumission. Chaque preuve a besoin de sa précédente et votre preuve a été rejetée de ce fait.",
      },
      epoch_status: {
        empty_title: 'Pas de preuves envoyées',
        empty_body:
          'Aucune preuve présente sur la chaine. Quand vous aurez soumis votre première preuve, vous trouverez vos stats ici.',
        in_process_title: "C'est parti !",
        in_process_body:
          'Votre compte doit soumettre au moins 8 preuves par Epoch pour recevoir une récompense. Les récompenses sont distribuée à la prochaine Epoch.',
        complete_title: 'Victoire !',
        complete_body:
          'Votre compte a soumis assez de preuves pour cette Epoch (minimum 8 preuves par Epoch). Vous recevrez votre récompense au début de la prochaine Epoch.',
        exceed_title: 'Wahou !!!',
        exceed_body:
          'Vous avez miné 72 preuves, le nombre maximum de preuves par Epoch. La Tour peut continuer de miner des preuves, mais elles seront soumises au prochain epoch.',
      },
      first_proof: {
        title: 'Minons votre première preuve',
        body: '<p> Un peu de patience ! Cela va prendre de 30min à 1h</p> <p> Votre solde diminuera durant le minage. Si vous soumettez le minimum requis, vous recevrez votre récompense au prochain epoch.</p> <p> Désactivez les paramètres de veille sur votre ordinateur afin que le mineur continue de tourner en votre absence.</p>',
        body_disabled: "Cliquez sur l'interrupteur pour démarrer le minage !",
      },
      invalid_proof: {
        title: 'Vérification impossible des preuves',
        body: 'Bizarre. Cette preuve a été rejetée car elle n\'est pas une "delay proof" valide. Ceci est habituellement dû à des mauvais paramètres.',
      },
      oops: {
        title: 'Oops',
        body: 'Une erreur s\'est passée durant le minage de la "delay proof"',
      },
      too_many_proofs: {
        title: 'Trop de preuves',
        body: 'Vous aurez soumis plus de preuves que prévu durant cet epoch. La chaîne supporte un max de {maxNum} preuves durant chaque Epoch. Vos preuves additionnelles seront soumises à la prochaine Epoch.',
      },
      wrong_difficulty: {
        title: 'Mauvaise difficulté',
        body: 'La difficulté de votre preuve ne correspond pas à celle de la chaîne. Vérifiez que vous êtes connecté au bon réseau avec le bon paramètre de difficulté.',
      },
      sync_proof: {
        title: 'Synchronisation des preuves',
        body: 'Preuves en attente de la transaction : {delta} ',
        body_0:
          'Vous avez plus de preuves sur la chaîne que sur votre appareil. Il vous manque des preuves localement.',
      },
    },
  },
  nv = {
    deno_tx: 'Demo Tx',
    account: 'Compte',
    balance: 'Solde',
    btn_onboard: 'Onboarder Compte',
    btn_transfer: 'Transfert de Coins',
    onboard: {
      title: 'Onboarder un Compte',
      await: '',
      btn_onboard: 'Onboarder',
      btn_cancel: 'Annuler',
      no_balance_title: 'Solde insuffisant',
      no_balance_body1: "L'onboarding de {onboard_key} a échoué.",
      no_balance_body2:
        "Vous avez moins de deux Coins sur votre compte, vous ne pouvez donc pas onboarder d'autres comptes.",
    },
    set_wallet_type: {
      title: 'Modifier le type de compte',
      subtitle:
        ' Soyez sûr de vous, cette opération est irreversible! Les portefeuilles "Slow" et "Community" sont permanents.',
      btn_slow: 'Changer en "Slow"',
      btn_confirm_slow: 'Confirmez le passage en "Slow"? Cet opération est irreversible.',
      slow_confirm: 'Changer en "Slow"',
      btn_community: 'Changer en "Community"',
      btn_confirm_community: 'Changer en "Community"',
      community_confirm: 'Confirmez le passage en "Community"? Cet opération est irreversible',
    },
    transfer: {
      title: 'Transfert de Coins',
      sender: 'Expéditeur',
      balance: 'Solde',
      receiver: 'Destinataire',
      amount: 'Montant',
      amount_label: 'Montant (fractions non permises)',
      receiver_placeholder: 'Adresse du destinataire',
      amount_placeholder: 'Montant à transférer',
      confirm_title: 'Attention !',
      please_confirm: 'Veuillez confirmer les informations du transfert :',
      await: 'Attente de txs',
      btn_next: 'Suivant',
      btn_confirm: 'Confirmer',
      btn_cancel: 'Annuler',
      btn_close: 'Fermer',
      error_amount_greater_than_balance: 'Le montant ne peut pas être supérieur au solde du compte',
      error_receiver_equals_sender:
        "Les adresses de l'expéditeur et du destinataire doivent être differentes",
      error_slow_wallet: "Le transfert de Coin est désactivé pour les portefeuilles 'slow'.",
      success: 'Transfert executé avec succés',
      failed: 'Transfert échoué. Code: {code}',
    },
  },
  iv = {
    account_events: 'Évènements du compte',
    version: 'Version',
    type: 'Type',
    amount: 'Montant',
    sender: 'Expéditeur',
    receiver: 'Destinataire',
    received_payment: 'Paiement reçu',
    sent_payment: 'Paiement envoyé',
    loading: {
      error: 'Erreur durant le chargement des événements :',
      corrupted_db: "Actuellement connecté à un noeud n'ayant pas tous les événements.",
      data_safe:
        'Ne vous inquiétez pas, votre compte est sécurisé sur la chaine. Essayez de vous connecter à un autre noeud en amont.',
    },
  },
  ov = {
    link_title: 'Récupérer les Coins',
    card: {
      title: 'Récupérer vos Coins manquantes',
      body: "<p>Oups. Les blockchains font parfois des erreurs de calcul. 0L s'efforce de les corriger aussi vite que possible.</p><p>Miner Identity Subsidy Incident: From Epoch 0 to epoch 52, the payouts to miners was lower than expected. Below you can credit your missing coins from that period.</p>",
    },
    table: { account: 'Account', amount: 'Amount', claim: 'Claim' },
    claim_btn: { await: 'Await...', claim: 'Claim Now' },
    modal_success: {
      title: 'Transation confirmed!',
      amount_for_account:
        '<p>You have claimed <span class="uk-text-bold">{coins} coins</span> for account <br><span class="uk-text-bold">{account}</span>.</p>',
      check_balance: 'You can check your balance now.',
      ok_btn: 'OK',
    },
    modal_error: {
      title: 'Claim Error',
      body: 'You must turn off miner to claim this account coins.',
      ok_btn: 'OK',
    },
  },
  sv = {
    nav: Zb,
    layout: Xb,
    wallet: Jb,
    about: Qb,
    settings: ev,
    miner: tv,
    txs: nv,
    events: iv,
    make_whole: ov,
  },
  rv = { wallet: 'Wallet', miner: 'Miner', transactions: 'Transaction', events: 'Events' },
  av = {
    connection_error: {
      title: "Oops, We Can't Connect to 0L Network",
      body: "<p> This is likely because the upstream peer (server) you use is down.</p> <h3> Don't worry, your account and coins are safe.</h3> <p>If you need to update or refresh your peers you can do so here:</p>",
    },
    error_accordion: { title: 'Error Report', category: 'Error Category', id: 'ID' },
  },
  lv = {
    wallet: 'Wallet',
    carpe: 'CARPE',
    btn_new_account: 'New Account',
    btn_restore_account: 'Restore Account',
    newbie_message: "Looks like you don't have any accounts",
    reminder_create: {
      card_title: 'Onboarding',
      message_headline:
        'You have generated keys for an account, but it does not yet exist on chain.',
      message_prefix: 'Join our community on ',
      message_suffix: ' and provide us your Onboard Key to get onboarded.',
      onboard_key: 'ONBOARD KEY',
    },
    account_list: {
      nickname: 'Nickname',
      address: 'Address',
      authkey: 'Authkey',
      unlocked: 'Unlocked',
      balance: 'Balance',
      offline: 'offline',
      loading: 'loading',
      account_on_chain: 'Account Not On Chain',
      message: ' Your balance will go down for every transaction you send, including mining.',
    },
    keygen: {
      title: 'Create New Account',
      description:
        "After you generate an account and secret phrase, you'll need someone to send one 0L coin to that account for it to be created on chain.",
      btn_generate_keys: 'Generate Keys',
      btn_generate_keys_2: 'Generate Different Keys',
      btn_create_account: 'Create This Account',
      account_address: 'Account Address',
      onboard_key: 'Onboarding Key',
      onboard_key_description:
        "This is also known as an Auth Key. For now you'll need it to be able to create the account on chain.",
      securite_recovery_phrase: 'SECRET RECOVERY PHRASE',
      securite_note:
        'This is your secret account password (mnemonic). If you lose it no one can help you! Write it down now.',
      account_tips:
        "Your account does not exist yet on chain. You'll need to give someone your Onboarding Key so that they can create your account.",
    },
    account_from_mnem_submit: {
      title: ' Heads Up!',
      body: " <p>Are you sure you wrote down your mnemonic phrase?</p> <p>You won't be able to recover your account without it. No one can help you if lose it.</p><p>This is the last opportunity to write it down.</p>",
      btn_cancel: 'Let me check again',
      btn_submit: 'Submit Now',
      btn_submiting: 'Submiting',
    },
    account_from_mnem_from: {
      title: 'RESTORE ACCOUNT',
      description:
        'Using your recovery words (mnemonic) you can configure Carpe as a wallet to monitor, and send transactions',
      placeholder: 'Recovery Mnemonic',
    },
    account_switcher: {
      select_account: 'Select Account',
      switch_account: 'Switch Account',
      setting: 'Go To Setting',
      developers: 'Developers',
    },
  },
  cv = {
    about: 'About',
    release: 'Release',
    version: 'Version',
    branch: 'Branch',
    commit: 'Commit',
  },
  uv = {
    title: 'SETTINGS',
    langapp_settings: {
      title: 'Language and Appearance',
      lang: 'Language',
      lang_description: 'Choose the language used to display',
      lang_button: 'Spanish',
      theme: 'Theme',
      theme_description: 'Choose the theme',
    },
    network_settings: {
      title: 'NETWORK SETTINGS',
      list_of_peers: 'LIST OF PEERS',
      description:
        'Choose a playlist of upstream nodes, so you can access the chain. Network connections will try the list in random order until a connection is made. Simply link to any playlist.json file here to update peers.',
      playlist: 'Update Playlist of Network Servers',
      override_peers: 'OVERRIDE PEERS',
      override_peers_description:
        'You can force using a different peer. You can only choose one peer with this setting. It will remove the playlist. This will now be a list of one element.',
      url_of_upstream_node: 'URL of upstream node',
      btn_update: 'UPDATE',
      upstream_title: 'FETCH A NEW WAYPOINT FROM UPSTREAM',
      upstream_subtitle:
        'Most waypoint issues can easily be fixed by fetching an updated one from a connected upstream peer.',
      btn_fetch_new_waypoint: 'Fetch New Waypoint',
      btn_cancel: 'Cancel',
      btn_submit: 'USE PLAYLIST',
    },
    account_settings: {
      title: 'ACCOUNT SETTINGS',
      btn_remove: 'REMOVE ACCOUNT',
      confirm: 'Confirm remove accounts from this device? This is not reversable.',
      description:
        'This does not delete any accounts from the chain. It only removes the accounts from this device. If you do not have your recovery codes (mnemonic) stored somewhere, you may be locked out of this account permanently. NO ONE CAN HELP YOU RECOVER THE MNEMONIC. ',
    },
  },
  hv = {
    title: 'Miner',
    miner_backlog: {
      title: 'Sync Tower Proofs',
      subtitle: 'Manually resubmit local proofs',
      in_process: 'Backlog in Progress',
      btn_submit: 'Submit Local Backlog',
    },
    miner_phases: {
      backlog_started: 'Backlog Listener Started',
      backlog_in_process: 'Backlog in Progress',
      backlog_complete: 'Backlog Complete',
      mining_enabled: 'Mining Enabled',
      proof_started: 'Proof start request received',
      proof_complete: 'Proof Complete',
    },
    miner_process: {
      status_complete: 'Proof Complete',
      status_in_process: 'Mining in Progress',
      notes:
        "The percentage is an estimate. <br> It is based on your previous proof's elapsed time.",
      notes2: 'Over 100% only means this is taking longer than previous proof',
    },
    tower_state: {
      local_height: 'Local Tower Height',
      on_chain_height: 'On-chain Tower Height',
      mined_in_last_epoch: 'Last Epoch Mined',
      sent_in_this_epoch: 'Proofs Sent this Epoch',
      empty: 'No proofs found on device',
      proof_more: 'You have submitted max proofs today (max 72)',
      proof_less: 'Insufficient proofs to receive a reward today (min 8)',
      proof_ok: 'Your account has submitted enough proofs today (min 8)',
    },
    cards: {
      cant_start: {
        title: 'Your account does not exist on chain yet ',
        body: "The miner can't start until the account can be found on chain. Maybe you've generated new keys locally, but no one has sent any coins to that address?",
      },
      disco_error: {
        title: 'Discontinuity ',
        body: "Looks like there's a gap in the proofs you are submitting. Each proof needs to reference the previous one, and the proof was rejected because of this.",
      },
      epoch_status: {
        empty_title: 'No proofs sent',
        empty_body:
          'There are no proofs saved to the chain. When you successfully submit your first proof, you will see some stats here.',
        in_process_title: 'Keep it up',
        in_process_body:
          'Your account needs to submit at least 8 proofs per day (epoch) to receive a reward. You will receive the reward on the next day.',
        complete_title: 'Success!',
        complete_body:
          'Your account has submitted enough proofs today (minimum 8 proofs per epoch). You should receive rewards at the start of next epoch.',
        exceed_title: 'Whoa',
        exceed_body:
          'You have mined 72 proofs, the maximum number of proofs per epoch. The tower can keep making proofs but they will only be accepted in the next epoch.',
      },
      first_proof: {
        title: "Let's mine your first proof",
        body: "<p> Hang tight! This will take at least 30mins, maybe up to 1hr</p> <p> You will see your balance go down while you mine proofs. If you reach the minimum per day, you will receive a reward, on the next day (epoch).</p> <p> Check your computer settings so that the computer doesn't sleep when the screen shuts off. You want the miner running while you're not here.</p>",
        body_disabled: 'Turn the switch on to start mining!',
      },
      invalid_proof: {
        title: 'Cannot Verify Proof',
        body: 'Weird. This proof was rejected because it is not a valid "delay proof". This is usually because parameters are not set correctly.',
      },
      oops: { title: 'Oops', body: "Looks like there's an error with mining a delay proof" },
      too_many_proofs: {
        title: 'Too Many Proofs',
        body: "Looks like you've sent more proofs than expected during the last 24 hours. The chain expects a max {maxNum} proofs during each epoch. On the next epoch your proofs will begin to be submitted again.",
      },
      wrong_difficulty: {
        title: 'Wrong Difficulty',
        body: "Looks like you're sending a proof with the wrong difficulty parameters to the chain. Check you are connected to the right network with the correct difficulty settings.",
      },
      sync_proof: {
        title: 'Syncing your proofs',
        body: 'Proofs awaiting transaction: {delta} ',
        body_0:
          'Something is wrong, you have more proofs on-chain, than on this device. You may be missing proofs locally.',
      },
    },
  },
  fv = {
    deno_tx: 'Demo Tx',
    account: 'Account',
    balance: 'Balance',
    btn_onboard: 'Onboard Account',
    btn_transfer: 'Transfer Coins',
    onboard: {
      title: 'Onboard an Account',
      await: 'Awaiting Tx',
      btn_onboard: 'Onboard',
      btn_cancel: 'Cancel',
      no_balance_title: 'Low Balance',
      no_balance_body1: 'Onboarding {onboard_key} was not successful.',
      no_balance_body2:
        "Looks like you have less than 2 coins in your account, this means you won't be able to onboard anyone.",
    },
    set_wallet_type: {
      title: 'Set your Account Type',
      subtitle:
        ' Make sure you know what you are doing. This is not reversible. Slow and Community wallets are permanent.',
      btn_slow: 'Set Slow Wallet',
      btn_confirm_slow: 'Confirm Set Slow Wallet? This is not reversable.',
      slow_confirm: 'Set Slow',
      btn_community: 'Set Community Wallet',
      btn_confirm_community: 'Set Community',
      community_confirm: 'Confirm Set Community Wallet? This is not reversable.',
    },
    transfer: {
      title: 'Coin Transfer',
      sender: 'Sender',
      balance: 'Balance',
      receiver: 'Receiver',
      amount: 'Amount',
      amount_label: 'Amount (fractions not allowed yet)',
      receiver_placeholder: 'Receiver address',
      amount_placeholder: 'Amount to be transfered',
      confirm_title: 'Heads up!',
      please_confirm: 'Please confirm your transfer information:',
      await: 'Await txs',
      btn_next: 'Next',
      btn_confirm: 'Confirm',
      btn_cancel: 'Cancel',
      btn_close: 'Close',
      error_amount_greater_than_balance: 'Amount cannot be greater than account balance',
      error_receiver_equals_sender: 'Receiver address must be different from sender address',
      error_slow_wallet: 'Coin transfer is disabled for slow wallets.',
      success: 'Transfer executed with success',
      failed: 'Transfer failed. Code: {code}',
    },
  },
  dv = {
    account_events: 'Account Events',
    version: 'Version',
    type: 'Type',
    amount: 'Amount',
    sender: 'Sender',
    receiver: 'Receiver',
    received_payment: 'Received Payment',
    sent_payment: 'Sent Payment',
    loading: {
      error: 'Error loading the account events:',
      corrupted_db:
        "Current connected node does not have all account events. Don't worry. Your wallet and coins are safe on the chain. Try connecting to another upstream node.",
      account_off_chain: 'Account selected not onboarded yet.',
    },
  },
  pv = {
    link_title: 'Claim Coins',
    card: {
      title: 'Claim Your Missing Coins',
      body: '<p>Oops. Occasionally blockchains make math mistakes. 0L tries to fix them as quickly as possible.</p><p>Miner Identity Subsidy Incident: From Epoch 0 to epoch 52, the payouts to miners was lower than expected. Below you can credit your missing coins from that period.</p>',
    },
    table: { account: 'Account', amount: 'Amount', claim: 'Claim' },
    claim_btn: { await: 'Await...', claim: 'Claim Now' },
    modal_success: {
      title: 'Transation confirmed!',
      amount_for_account:
        '<p>You have claimed <span class="uk-text-bold">{coins} coins</span> for account <br><span class="uk-text-bold">{account}</span>.</p>',
      check_balance: 'You can check your balance now.',
      ok_btn: 'OK',
    },
    modal_error: {
      title: 'Claim Error',
      body: 'You must turn off miner to claim this account coins.',
      ok_btn: 'OK',
    },
  },
  mv = {
    nav: rv,
    layout: av,
    wallet: lv,
    about: cv,
    settings: uv,
    miner: hv,
    txs: fv,
    events: dv,
    make_whole: pv,
  },
  gv = { wallet: 'Wallet', miner: 'Miner', transactions: 'Transaction', events: 'Events' },
  _v = {
    connection_error: {
      title: "Oops, We Can't Connect to 0L Network",
      body: "<p> This is likely because the upstream peer (server) you use is down.</p> <h3> Don't worry, your account and coins are safe.</h3> <p>If you need to update or refresh your peers you can do so here:</p>",
    },
    error_accordion: { title: 'Error Report', category: 'Error Category', id: 'ID' },
  },
  bv = {
    wallet: 'Wallet',
    carpe: 'CARPE',
    btn_new_account: 'New Account',
    btn_restore_account: 'Restore Account',
    newbie_message: "Looks like you don't have any accounts",
    reminder_create: {
      card_title: 'Onboarding',
      message_headline:
        'You have generated keys for an account, but it does not yet exist on chain.',
      message_prefix: 'Join our community on ',
      message_suffix: ' and provide us your Onboard Key to get onboarded.',
      onboard_key: 'ONBOARD KEY',
    },
    account_list: {
      nickname: 'Nickname',
      address: 'Address',
      authkey: 'Authkey',
      unlocked: 'Unlocked',
      balance: 'Balance',
      offline: 'offline',
      loading: 'loading',
      account_on_chain: 'Account Not On Chain',
      message: ' Your balance will go down for every transaction you send, including mining.',
    },
    keygen: {
      title: 'Create New Account',
      description:
        "After you generate an account and secret phrase, you'll need someone to send one 0L coin to that account for it to be created on chain.",
      btn_generate_keys: 'Generate Keys',
      btn_generate_keys_2: 'Generate Different Keys',
      btn_create_account: 'Create This Account',
      account_address: 'Account Address',
      onboard_key: 'Onboarding Key',
      onboard_key_description:
        "This is also known as an Auth Key. For now you'll need it to be able to create the account on chain.",
      securite_recovery_phrase: 'SECRET RECOVERY PHRASE',
      securite_note:
        'This is your secret account password (mnemonic). If you lose it no one can help you! Write it down now.',
      account_tips:
        "Your account does not exist yet on chain. You'll need to give someone your Onboarding Key so that they can create your account.",
    },
    account_from_mnem_submit: {
      title: ' Heads Up!',
      body: " <p>Are you sure you wrote down your mnemonic phrase?</p> <p>You won't be able to recover your account without it. No one can help you if lose it.</p><p>This is the last opportunity to write it down.</p>",
      btn_cancel: 'Let me check again',
      btn_submit: 'Submit Now',
      btn_submiting: 'Submiting',
    },
    account_from_mnem_from: {
      title: 'RESTORE ACCOUNT',
      description:
        'Using your recovery words (mnemonic) you can configure Carpe as a wallet to monitor, and send transactions',
      placeholder: 'Recovery Mnemonic',
    },
    account_switcher: {
      select_account: 'Select Account',
      switch_account: 'Switch Account',
      setting: 'Go To Setting',
      developers: 'Developers',
    },
  },
  vv = {
    about: 'About',
    release: 'Release',
    version: 'Version',
    branch: 'Branch',
    commit: 'Commit',
  },
  yv = {
    title: 'SETTINGS',
    langapp_settings: {
      title: 'Language and Appearance',
      lang: 'Language',
      lang_description: 'Choose the language used to display',
      lang_button: 'Italian',
      theme: 'Theme',
      theme_description: 'Choose the theme',
    },
    network_settings: {
      title: 'NETWORK SETTINGS',
      list_of_peers: 'LIST OF PEERS',
      description:
        'Choose a playlist of upstream nodes, so you can access the chain. Network connections will try the list in random order until a connection is made. Simply link to any playlist.json file here to update peers.',
      playlist: 'Update Playlist of Network Servers',
      override_peers: 'OVERRIDE PEERS',
      override_peers_description:
        'You can force using a different peer. You can only choose one peer with this setting. It will remove the playlist. This will now be a list of one element.',
      url_of_upstream_node: 'URL of upstream node',
      btn_update: 'UPDATE',
      upstream_title: 'FETCH A NEW WAYPOINT FROM UPSTREAM',
      upstream_subtitle:
        'Most waypoint issues can easily be fixed by fetching an updated one from a connected upstream peer.',
      btn_fetch_new_waypoint: 'Fetch New Waypoint',
      btn_cancel: 'Cancel',
      btn_submit: 'USE PLAYLIST',
    },
    account_settings: {
      title: 'ACCOUNT SETTINGS',
      btn_remove: 'REMOVE ACCOUNT',
      confirm: 'Confirm remove accounts from this device? This is not reversable.',
      description:
        'This does not delete any accounts from the chain. It only removes the accounts from this device. If you do not have your recovery codes (mnemonic) stored somewhere, you may be locked out of this account permanently. NO ONE CAN HELP YOU RECOVER THE MNEMONIC. ',
    },
  },
  wv = {
    title: 'Miner',
    miner_backlog: {
      title: 'Sync Tower Proofs',
      subtitle: 'Manually resubmit local proofs',
      in_process: 'Backlog in Progress',
      btn_submit: 'Submit Local Backlog',
    },
    miner_phases: {
      backlog_started: 'Backlog Listener Started',
      backlog_in_process: 'Backlog in Progress',
      backlog_complete: 'Backlog Complete',
      mining_enabled: 'Mining Enabled',
      proof_started: 'Proof start request received',
      proof_complete: 'Proof Complete',
    },
    miner_process: {
      status_complete: 'Proof Complete',
      status_in_process: 'Mining in Progress',
      notes:
        "The percentage is an estimate. <br> It is based on your previous proof's elapsed time.",
      notes2: 'Over 100% only means this is taking longer than previous proof',
    },
    tower_state: {
      local_height: 'Local Tower Height',
      on_chain_height: 'On-chain Tower Height',
      mined_in_last_epoch: 'Last Epoch Mined',
      sent_in_this_epoch: 'Proofs Sent this Epoch',
      empty: 'No proofs found on device',
      proof_more: 'You have submitted max proofs today (max 72)',
      proof_less: 'Insufficient proofs to receive a reward today (min 8)',
      proof_ok: 'Your account has submitted enough proofs today (min 8)',
    },
    cards: {
      cant_start: {
        title: 'Your account does not exist on chain yet ',
        body: "The miner can't start until the account can be found on chain. Maybe you've generated new keys locally, but no one has sent any coins to that address?",
      },
      disco_error: {
        title: 'Discontinuity ',
        body: "Looks like there's a gap in the proofs you are submitting. Each proof needs to reference the previous one, and the proof was rejected because of this.",
      },
      epoch_status: {
        empty_title: 'No proofs sent',
        empty_body:
          'There are no proofs saved to the chain. When you successfully submit your first proof, you will see some stats here.',
        in_process_title: 'Keep it up',
        in_process_body:
          'Your account needs to submit at least 8 proofs per day (epoch) to receive a reward. You will receive the reward on the next day.',
        complete_title: 'Success!',
        complete_body:
          'Your account has submitted enough proofs today (minimum 8 proofs per epoch). You should receive rewards at the start of next epoch.',
        exceed_title: 'Whoa',
        exceed_body:
          'You have mined 72 proofs, the maximum number of proofs per epoch. The tower can keep making proofs but they will only be accepted in the next epoch.',
      },
      first_proof: {
        title: "Let's mine your first proof",
        body: "<p> Hang tight! This will take at least 30mins, maybe up to 1hr</p> <p> You will see your balance go down while you mine proofs. If you reach the minimum per day, you will receive a reward, on the next day (epoch).</p> <p> Check your computer settings so that the computer doesn't sleep when the screen shuts off. You want the miner running while you're not here.</p>",
        body_disabled: 'Turn the switch on to start mining!',
      },
      invalid_proof: {
        title: 'Cannot Verify Proof',
        body: 'Weird. This proof was rejected because it is not a valid "delay proof". This is usually because parameters are not set correctly.',
      },
      oops: { title: 'Oops', body: "Looks like there's an error with mining a delay proof" },
      too_many_proofs: {
        title: 'Too Many Proofs',
        body: "Looks like you've sent more proofs than expected during the last 24 hours. The chain expects a max {maxNum} proofs during each epoch. On the next epoch your proofs will begin to be submitted again.",
      },
      wrong_difficulty: {
        title: 'Wrong Difficulty',
        body: "Looks like you're sending a proof with the wrong difficulty parameters to the chain. Check you are connected to the right network with the correct difficulty settings.",
      },
      sync_proof: {
        title: 'Syncing your proofs',
        body: 'Proofs awaiting transaction: {delta} ',
        body_0:
          'Something is wrong, you have more proofs on-chain, than on this device. You may be missing proofs locally.',
      },
    },
  },
  kv = {
    deno_tx: 'Demo Tx',
    account: 'Account',
    balance: 'Balance',
    btn_onboard: 'Onboard Account',
    btn_transfer: 'Transfer Coins',
    onboard: {
      title: 'Onboard an Account',
      await: 'Awaiting Tx',
      btn_onboard: 'Onboard',
      btn_cancel: 'Cancel',
      no_balance_title: 'Low Balance',
      no_balance_body1: 'Onboarding {onboard_key} was not successful.',
      no_balance_body2:
        "Looks like you have less than 2 coins in your account, this means you won't be able to onboard anyone.",
    },
    set_wallet_type: {
      title: 'Set your Account Type',
      subtitle:
        ' Make sure you know what you are doing. This is not reversible. Slow and Community wallets are permanent.',
      btn_slow: 'Set Slow Wallet',
      btn_confirm_slow: 'Confirm Set Slow Wallet? This is not reversable.',
      slow_confirm: 'Set Slow',
      btn_community: 'Set Community Wallet',
      btn_confirm_community: 'Set Community',
      community_confirm: 'Confirm Set Community Wallet? This is not reversable.',
    },
    transfer: {
      title: 'Coin Transfer',
      sender: 'Sender',
      balance: 'Balance',
      receiver: 'Receiver',
      amount: 'Amount',
      amount_label: 'Amount (fractions not allowed yet)',
      receiver_placeholder: 'Receiver address',
      amount_placeholder: 'Amount to be transfered',
      confirm_title: 'Heads up!',
      please_confirm: 'Please confirm your transfer information:',
      await: 'Await txs',
      btn_next: 'Next',
      btn_confirm: 'Confirm',
      btn_cancel: 'Cancel',
      btn_close: 'Close',
      error_amount_greater_than_balance: 'Amount cannot be greater than account balance',
      error_receiver_equals_sender: 'Receiver address must be different from sender address',
      error_slow_wallet: 'Coin transfer is disabled for slow wallets.',
      success: 'Transfer executed with success',
      failed: 'Transfer failed. Code: {code}',
    },
  },
  $v = {
    account_events: 'Account Events',
    version: 'Version',
    type: 'Type',
    amount: 'Amount',
    sender: 'Sender',
    receiver: 'Receiver',
    received_payment: 'Received Payment',
    sent_payment: 'Sent Payment',
    loading: {
      error: 'Error loading the account events:',
      corrupted_db:
        "Current connected node does not have all account events. Don't worry. Your wallet and coins are safe on the chain. Try connecting to another upstream node.",
      account_off_chain: 'Account selected not onboarded yet.',
    },
  },
  Cv = {
    link_title: 'Claim Coins',
    card: {
      title: 'Claim Your Missing Coins',
      body: '<p>Oops. Occasionally blockchains make math mistakes. 0L tries to fix them as quickly as possible.</p><p>Miner Identity Subsidy Incident: From Epoch 0 to epoch 52, the payouts to miners was lower than expected. Below you can credit your missing coins from that period.</p>',
    },
    table: { account: 'Account', amount: 'Amount', claim: 'Claim' },
    claim_btn: { await: 'Await...', claim: 'Claim Now' },
    modal_success: {
      title: 'Transation confirmed!',
      amount_for_account:
        '<p>You have claimed <span class="uk-text-bold">{coins} coins</span> for account <br><span class="uk-text-bold">{account}</span>.</p>',
      check_balance: 'You can check your balance now.',
      ok_btn: 'OK',
    },
    modal_error: {
      title: 'Claim Error',
      body: 'You must turn off miner to claim this account coins.',
      ok_btn: 'OK',
    },
  },
  xv = {
    nav: gv,
    layout: _v,
    wallet: bv,
    about: vv,
    settings: yv,
    miner: wv,
    txs: kv,
    events: $v,
    make_whole: Cv,
  },
  Ev = { wallet: 'Carteira', miner: 'Minerador', transactions: 'Transações', events: 'Eventos' },
  Sv = {
    connection_error: {
      title: 'Opa, não foi possível conectar à rede 0L',
      body: '<p>Isto geralmente acontece porque o node (servidor) que você está usando está fora do ar.</p> <h3> Não se preocupe, sua conta e moedas estão seguras.</h3> <p>Se você precisar configurar ou atualizar seus nodes, você pode fazer isso aqui:</p>',
    },
    error_accordion: { title: 'Relatório de Erros', category: 'Categoria de Erro', id: 'ID' },
  },
  Tv = {
    wallet: 'Carteira',
    carpe: 'CARPE',
    btn_new_account: 'Criar Conta',
    btn_restore_account: 'Restaurar Conta',
    newbie_message: 'Parece que você não tem nenhuma conta ainda',
    reminder_create: {
      card_title: 'Integração',
      message_headline: 'Você gerou chaves para uma conta, mas ela não existe na rede ainda.',
      message_prefix: 'Junte-se à nossa comunidade no ',
      message_suffix: ' e forneça-nos a sua Chave de Integração para criar sua conta na rede.',
      onboard_key: 'CHAVE DE INTEGRAÇÃO',
    },
    account_list: {
      nickname: 'Apelido',
      address: 'Conta',
      authkey: 'Chave de autenticação',
      unlocked: 'Unlocked',
      balance: 'Saldo',
      offline: 'offline',
      loading: 'carregando',
      account_on_chain: 'Conta não criada na rede',
      message:
        'Seu saldo diminuirá para cada transação que você enviar, incluindo as de mineração.',
    },
    keygen: {
      title: 'Criar nova conta',
      description:
        'Depois de gerar uma conta e a frase secreta, você precisará que alguém envie uma moeda do 0L para esta conta para que ela seja criada na rede.',
      btn_generate_keys: 'Gerar Chaves',
      btn_generate_keys_2: 'Gerar Chaves Diferentes',
      btn_create_account: 'Criar Esta Conta',
      account_address: 'Endereço da Conta',
      onboard_key: 'Chave de Integração',
      onboard_key_description:
        'Isto também é conhecido como Chave de Autenticação. Por enquanto, você precisará dele para poder criar a conta na rede.',
      securite_recovery_phrase: 'FRASE SECRETA DE RECUPERAÇÃO',
      securite_note:
        'Esta é a chave secreta da sua conta (mnemônico). Se você perder ela, ninguém poderá te ajudar! Escreva ela em algum lugar agora.',
      account_tips:
        'Sua conta não existe na rede ainda. Você precisará enviar para alguém sua Chave de Integração para que possam criar sua conta.',
    },
    account_from_mnem_submit: {
      title: 'Anteção!',
      body: '<p>Você tem certeza que escreveu sua frase mnemônica?</p><p>Você não conseguirá recuperar sua conta sem ela de jeito algum. Ninguém pode te ajudar se você perdê-la.</p><p>Esta é a sua última oportunidade de escrevê-la em algum lugar.</p>',
      btn_cancel: 'Deixe-me verificar novamente',
      btn_submit: 'Enviar Agora',
      btn_submiting: 'Enviando',
    },
    account_from_mnem_from: {
      title: 'RESTAURAR CONTA',
      description:
        'Usando suas palavras de recuperação (mnemônicos), você pode configurar o Carpe como uma carteira para monitorar e enviar transações',
      placeholder: 'Mnemônico de Recuperação',
    },
    account_switcher: {
      select_account: 'Selecionar Conta',
      switch_account: 'Mudar de Conta',
      setting: 'Configurações',
      developers: 'Desenvolvedores',
    },
  },
  Lv = {
    about: 'Sobre',
    release: 'Lançamento',
    version: 'Versão',
    branch: 'Branch',
    commit: 'Commit',
  },
  Av = {
    title: 'CONFIGURAÇÕES',
    langapp_settings: {
      title: 'Língua e Aparência',
      lang: 'Língua',
      lang_description: 'Escolha o idioma',
      lang_button: 'Português',
      theme: 'Tema',
      theme_description: 'Escolha o tema',
    },
    network_settings: {
      title: 'CONFIGURAÇÕES DE REDE',
      list_of_peers: 'LISTA DE PARES',
      description:
        'Escolha uma lista de nós ascendentes, para que você possa acessar o blockchain. As conexões de rede tentarão a lista em ordem aleatória até que uma conexão seja estabelecida. Basta vincular a qualquer arquivo playlist.json aqui para atualizar os pares.',
      playlist: 'Atualizar Lista de Servidores de Rede',
      override_peers: 'SUBSTITUIR PARES',
      override_peers_description:
        'Você pode forçar usando um par diferente. Você só pode escolher um par com essa configuração. Ela irá remover a lista de pares. Esta será agora uma lista de um elemento.',
      url_of_upstream_node: 'URL do nó ascendente',
      btn_update: 'ATUALIZAR',
      upstream_title: 'BUSCAR UM NOVO PONTO DE CAMINHO DO NODE ASCENDENTE',
      upstream_subtitle:
        'A maioria dos problemas de Ponto de Caminho pode ser facilmente corrigida ao buscar um atualizado de um par ascendente conectado.',
      btn_fetch_new_waypoint: 'Buscar Novo Ponto de Caminho',
      btn_cancel: 'Cancelar',
      btn_submit: 'USAR LISTA',
    },
    account_settings: {
      title: 'CONFIGURAÇÕES DA CONTA',
      btn_remove: 'REMOVER CONTA',
      confirm: 'Confirmar remover contas deste dispositivo? Isso não é reversível.',
      description:
        'Isso não exclui nenhuma conta da rede. Apenas remove as contas deste dispositivo. Se você não tiver seus códigos de recuperação (mnemônicos) armazenados em algum lugar, poderá ser bloqueado desta conta permanentemente. NINGUÉM PODE AJUDÁ-LO A RECUPERAR O MNEMONIC.',
    },
  },
  Mv = {
    title: 'Minerador',
    miner_backlog: {
      title: 'Provas de Sincronização da Torre',
      subtitle: 'Reenviar manualmente as provas locais',
      in_process: 'Backlog em Andamento',
      btn_submit: 'Enviar Backlog Local',
    },
    miner_phases: {
      backlog_started: 'Ouvinte de backlog iniciado',
      backlog_in_process: 'Backlog em Andamento',
      backlog_complete: 'Backlog Concluído',
      mining_enabled: 'Mineração Ativada',
      proof_started: 'Solicitação de início de prova recebida',
      proof_complete: 'Prova Concluída',
    },
    miner_process: {
      status_complete: 'Prova Concluída',
      status_in_process: 'Mineração em Andamento',
      notes:
        'A porcentagem é uma estimativa. <br> É baseada no tempo decorrido da sua prova anterior.',
      notes2: 'Mais de 100% significa apenas que isso está demorando mais do que a prova anterior.',
    },
    tower_state: {
      local_height: 'Altura da Torre Local',
      on_chain_height: 'Altura da Torre no Blockchain',
      mined_in_last_epoch: 'Última Época Minerada.',
      sent_in_this_epoch: 'Provas enviadas nesta época',
      empty: 'Nenhuma prova encontrada no dispositivo',
      proof_more: 'Você enviou o máximo de provas hoje (máximo de 72)',
      proof_less: 'Provas insuficientes para receber uma recompensa hoje (min 8)',
      proof_ok: 'Sua conta enviou provas suficientes hoje (min 8)',
    },
    cards: {
      cant_start: {
        title: 'Sua conta ainda não existe na rede',
        body: 'O minerador não pode iniciar até que a conta seja encontrada na rede. Talvez você tenha gerado novas chaves localmente, mas ninguém enviou moedas para esse endereço ainda?',
      },
      disco_error: {
        title: 'Descontinuidade',
        body: 'Parece que há uma lacuna nas provas que você está enviando. Cada prova precisa referenciar a anterior, e a prova foi rejeitada por causa disso.',
      },
      epoch_status: {
        empty_title: 'Nenhuma prova enviada',
        empty_body:
          'Não há provas salvas na rede. Quando você enviar sua primeira prova com sucesso, verá algumas estatísticas aqui.',
        in_process_title: 'Continue assim',
        in_process_body:
          'Sua conta precisa enviar pelo menos 8 provas por dia (época) para receber uma recompensa. Você receberá a recompensa no dia seguinte.',
        complete_title: 'Sucesso!',
        complete_body:
          'Sua conta enviou provas suficientes hoje (mínimo de 8 provas por época). Você deve receber recompensas no início da próxima época.',
        exceed_title: 'Uau',
        exceed_body:
          'Você minerou 72 provas, o número máximo de provas por época. A torre pode continuar fazendo provas, mas elas só serão aceitas na próxima época.',
      },
      first_proof: {
        title: 'Vamos minerar sua primeira prova',
        body: '<p> Aguente firme! Isso levará pelo menos 30 minutos, talvez até 1 hora.</p> <p> Você verá seu saldo cair enquanto você minera provas. Se você atingir o mínimo por dia, receberá uma recompensa, no dia seguinte (época).</p> <p> Verifique as configurações do seu computador para que o computador não durma quando a tela for desligada. Você quer que o minerador funcione enquanto você não está aqui.</p>',
        body_disabled: 'Ligue o interruptor para iniciar a mineração!',
      },
      invalid_proof: {
        title: 'Não é Possível Verificar a Prova',
        body: 'Esquisito. Esta prova foi rejeitada porque não é uma "prova de atraso" válida. Isso geralmente ocorre porque os parâmetros não estão definidos corretamente.',
      },
      oops: { title: 'Opa', body: 'Parece que há um erro ao minerar uma prova de atraso' },
      too_many_proofs: {
        title: 'Muitas Provas',
        body: 'Parece que você enviou mais provas do que o esperado nas últimas 24 horas. A rede espera um máximo de {maxNum} provas durante cada época. Na próxima época suas provas começarão a ser submetidas novamente.',
      },
      wrong_difficulty: {
        title: 'Dificuldade Errada',
        body: 'Parece que você está enviando uma prova com os parâmetros de dificuldade errados para a rede. Verifique se você está conectado à rede correta com as configurações de dificuldade corretas.',
      },
      sync_proof: {
        title: 'Sincronizando suas provas',
        body: 'Provas aguardando transação: {delta} ',
        body_0:
          'Algo está errado, você tem mais provas na rede do que neste dispositivo. Pode estar faltando provas localmente.',
      },
    },
  },
  Pv = {
    deno_tx: 'Demo Tx',
    account: 'Conta',
    balance: 'Saldo',
    btn_onboard: 'Integrar Conta',
    btn_transfer: 'Transferir Moedas',
    onboard: {
      title: 'Integrar uma conta',
      await: 'Aguardando',
      btn_onboard: 'Integrar',
      btn_cancel: 'Cancelar',
      no_balance_title: 'Saldo Insuficiente',
      no_balance_body1: 'A integração de {onboard_key} não foi bem-sucedida.',
      no_balance_body2:
        'Parece que você tem menos de 2 moedas em sua conta, isso significa que você não poderá embarcar ninguém.',
    },
    set_wallet_type: {
      title: 'Defina seu Tipo de Conta',
      subtitle:
        'Certifique-se de que você sabe o que está fazendo. Essa operação não é reversível. As carteiras lentas e comunitárias são permanentes.',
      btn_slow: 'Definir Carteira Lenta',
      btn_confirm_slow: 'Confirmar Definir Carteira Lenta? Esta operação não é reversível.',
      slow_confirm: 'Definir Lenta',
      btn_community: 'Definir Carteira de Comunidade',
      btn_confirm_community: 'Definir Comunidade',
      community_confirm:
        'Confirmar Definir Carteira de Comunidade? Esta operação não é reversível.',
    },
    transfer: {
      title: 'Transferência de Moedas',
      sender: 'Pagador',
      balance: 'Saldo',
      receiver: 'Recebedor',
      amount: 'Valor',
      amount_label: 'Valor (frações não são permitidas ainda)',
      receiver_placeholder: 'Endereço do Recebedor',
      amount_placeholder: 'Valor a ser transferido',
      confirm_title: 'Atenção!',
      please_confirm: 'Por favor, confirme as informações da sua transferência:',
      await: 'Aguarde',
      btn_next: 'Próximo',
      btn_confirm: 'Confirmar',
      btn_cancel: 'Cancelar',
      btn_close: 'Fechar',
      error_amount_greater_than_balance: 'Valor não pode ser maior que o saldo da conta',
      error_receiver_equals_sender:
        'Endereço do recebedor deve ser diferente do endereço do emissor.',
      error_slow_wallet: 'Transferência de moedas está desabilidato para slow wallets.',
      success: 'Transferência executada com sucesso!',
      failed: 'Transferência falhou. Código: {code}',
    },
  },
  Iv = {
    account_events: 'Eventos da Conta',
    version: 'Versão',
    type: 'Tipo',
    amount: 'Valor',
    sender: 'Pagador',
    receiver: 'Recebedor',
    received_payment: 'Pagamento Recebido',
    sent_payment: 'Pagamento Enviado',
    loading: {
      error: 'Erro ao carregar os eventos da conta:',
      corrupted_db:
        'O nó conectado atual não possui todos os eventos da conta. Não se preocupe. Sua carteira e moedas estão seguras na rede. Tente conectar-se a outro nó ascendente.',
      account_off_chain: 'Conta selecionada não foi integrada ainda.',
    },
  },
  Nv = {
    link_title: 'Claim Coins',
    card: {
      title: 'Claim Your Missing Coins',
      body: '<p>Oops. Occasionally blockchains make math mistakes. 0L tries to fix them as quickly as possible.</p><p>Miner Identity Subsidy Incident: From Epoch 0 to epoch 52, the payouts to miners was lower than expected. Below you can credit your missing coins from that period.</p>',
    },
    table: { account: 'Account', amount: 'Amount', claim: 'Claim' },
    claim_btn: { await: 'Await...', claim: 'Claim Now' },
    modal_success: {
      title: 'Transation confirmed!',
      amount_for_account:
        '<p>You have claimed <span class="uk-text-bold">{coins} coins</span> for account <br><span class="uk-text-bold">{account}</span>.</p>',
      check_balance: 'You can check your balance now.',
      ok_btn: 'OK',
    },
    modal_error: {
      title: 'Claim Error',
      body: 'You must turn off miner to claim this account coins.',
      ok_btn: 'OK',
    },
  },
  Ov = {
    nav: Ev,
    layout: Sv,
    wallet: Tv,
    about: Lv,
    settings: Av,
    miner: Mv,
    txs: Pv,
    events: Iv,
    make_whole: Nv,
  },
  Bv = { wallet: 'Wallet', miner: 'Miner', transactions: 'Transaction', events: 'Events' },
  Dv = {
    connection_error: {
      title: "Oops, We Can't Connect to 0L Network",
      body: "<p> This is likely because the upstream peer (server) you use is down.</p> <h3> Don't worry, your account and coins are safe.</h3> <p>If you need to update or refresh your peers you can do so here:</p>",
    },
    error_accordion: { title: 'Error Report', category: 'Error Category', id: 'ID' },
  },
  Rv = {
    wallet: 'Wallet',
    carpe: 'CARPE',
    btn_new_account: 'New Account',
    btn_restore_account: 'Restore Account',
    newbie_message: "Looks like you don't have any accounts",
    reminder_create: {
      card_title: 'Onboarding',
      message_headline:
        'You have generated keys for an account, but it does not yet exist on chain.',
      message_prefix: 'Join our community on ',
      message_suffix: ' and provide us your Onboard Key to get onboarded.',
      onboard_key: 'ONBOARD KEY',
    },
    account_list: {
      nickname: 'Nickname',
      address: 'Address',
      authkey: 'Authkey',
      unlocked: 'Unlocked',
      balance: 'Balance',
      offline: 'offline',
      loading: 'loading',
      account_on_chain: 'Account Not On Chain',
      message: ' Your balance will go down for every transaction you send, including mining.',
    },
    keygen: {
      title: 'Create New Account',
      description:
        "After you generate an account and secret phrase, you'll need someone to send one 0L coin to that account for it to be created on chain.",
      btn_generate_keys: 'Generate Keys',
      btn_generate_keys_2: 'Generate Different Keys',
      btn_create_account: 'Create This Account',
      account_address: 'Account Address',
      onboard_key: 'Onboarding Key',
      onboard_key_description:
        "This is also known as an Auth Key. For now you'll need it to be able to create the account on chain.",
      securite_recovery_phrase: 'SECRET RECOVERY PHRASE',
      securite_note:
        'This is your secret account password (mnemonic). If you lose it no one can help you! Write it down now.',
      account_tips:
        "Your account does not exist yet on chain. You'll need to give someone your Onboarding Key so that they can create your account.",
    },
    account_from_mnem_submit: {
      title: ' Heads Up!',
      body: " <p>Are you sure you wrote down your mnemonic phrase?</p> <p>You won't be able to recover your account without it. No one can help you if lose it.</p><p>This is the last opportunity to write it down.</p>",
      btn_cancel: 'Let me check again',
      btn_submit: 'Submit Now',
      btn_submiting: 'Submiting',
    },
    account_from_mnem_from: {
      title: 'RESTORE ACCOUNT',
      description:
        'Using your recovery words (mnemonic) you can configure Carpe as a wallet to monitor, and send transactions',
      placeholder: 'Recovery Mnemonic',
    },
    account_switcher: {
      select_account: 'Select Account',
      switch_account: 'Switch Account',
      setting: 'Go To Setting',
      developers: 'Developers',
    },
  },
  Hv = {
    about: 'About',
    release: 'Release',
    version: 'Version',
    branch: 'Branch',
    commit: 'Commit',
  },
  zv = {
    title: 'SETTINGS',
    langapp_settings: {
      title: 'Language and Appearance',
      lang: 'Language',
      lang_description: 'Choose the language used to display',
      lang_button: 'Arabic',
      theme: 'Theme',
      theme_description: 'Choose the theme',
    },
    network_settings: {
      title: 'NETWORK SETTINGS',
      list_of_peers: 'LIST OF PEERS',
      description:
        'Choose a playlist of upstream nodes, so you can access the chain. Network connections will try the list in random order until a connection is made. Simply link to any playlist.json file here to update peers.',
      playlist: 'Update Playlist of Network Servers',
      override_peers: 'OVERRIDE PEERS',
      override_peers_description:
        'You can force using a different peer. You can only choose one peer with this setting. It will remove the playlist. This will now be a list of one element.',
      url_of_upstream_node: 'URL of upstream node',
      btn_update: 'UPDATE',
      upstream_title: 'FETCH A NEW WAYPOINT FROM UPSTREAM',
      upstream_subtitle:
        'Most waypoint issues can easily be fixed by fetching an updated one from a connected upstream peer.',
      btn_fetch_new_waypoint: 'Fetch New Waypoint',
      btn_cancel: 'Cancel',
      btn_submit: 'USE PLAYLIST',
    },
    account_settings: {
      title: 'ACCOUNT SETTINGS',
      btn_remove: 'REMOVE ACCOUNT',
      confirm: 'Confirm remove accounts from this device? This is not reversable.',
      description:
        'This does not delete any accounts from the chain. It only removes the accounts from this device. If you do not have your recovery codes (mnemonic) stored somewhere, you may be locked out of this account permanently. NO ONE CAN HELP YOU RECOVER THE MNEMONIC. ',
    },
  },
  Uv = {
    title: 'Miner',
    miner_backlog: {
      title: 'Sync Tower Proofs',
      subtitle: 'Manually resubmit local proofs',
      in_process: 'Backlog in Progress',
      btn_submit: 'Submit Local Backlog',
    },
    miner_phases: {
      backlog_started: 'Backlog Listener Started',
      backlog_in_process: 'Backlog in Progress',
      backlog_complete: 'Backlog Complete',
      mining_enabled: 'Mining Enabled',
      proof_started: 'Proof start request received',
      proof_complete: 'Proof Complete',
    },
    miner_process: {
      status_complete: 'Proof Complete',
      status_in_process: 'Mining in Progress',
      notes:
        "The percentage is an estimate. <br> It is based on your previous proof's elapsed time.",
      notes2: 'Over 100% only means this is taking longer than previous proof',
    },
    tower_state: {
      local_height: 'Local Tower Height',
      on_chain_height: 'On-chain Tower Height',
      mined_in_last_epoch: 'Last Epoch Mined',
      sent_in_this_epoch: 'Proofs Sent this Epoch',
      empty: 'No proofs found on device',
      proof_more: 'You have submitted max proofs today (max 72)',
      proof_less: 'Insufficient proofs to receive a reward today (min 8)',
      proof_ok: 'Your account has submitted enough proofs today (min 8)',
    },
    cards: {
      cant_start: {
        title: 'Your account does not exist on chain yet ',
        body: "The miner can't start until the account can be found on chain. Maybe you've generated new keys locally, but no one has sent any coins to that address?",
      },
      disco_error: {
        title: 'Discontinuity ',
        body: "Looks like there's a gap in the proofs you are submitting. Each proof needs to reference the previous one, and the proof was rejected because of this.",
      },
      epoch_status: {
        empty_title: 'No proofs sent',
        empty_body:
          'There are no proofs saved to the chain. When you successfully submit your first proof, you will see some stats here.',
        in_process_title: 'Keep it up',
        in_process_body:
          'Your account needs to submit at least 8 proofs per day (epoch) to receive a reward. You will receive the reward on the next day.',
        complete_title: 'Success!',
        complete_body:
          'Your account has submitted enough proofs today (minimum 8 proofs per epoch). You should receive rewards at the start of next epoch.',
        exceed_title: 'Whoa',
        exceed_body:
          'You have mined 72 proofs, the maximum number of proofs per epoch. The tower can keep making proofs but they will only be accepted in the next epoch.',
      },
      first_proof: {
        title: "Let's mine your first proof",
        body: "<p> Hang tight! This will take at least 30mins, maybe up to 1hr</p> <p> You will see your balance go down while you mine proofs. If you reach the minimum per day, you will receive a reward, on the next day (epoch).</p> <p> Check your computer settings so that the computer doesn't sleep when the screen shuts off. You want the miner running while you're not here.</p>",
        body_disabled: 'Turn the switch on to start mining!',
      },
      invalid_proof: {
        title: 'Cannot Verify Proof',
        body: 'Weird. This proof was rejected because it is not a valid "delay proof". This is usually because parameters are not set correctly.',
      },
      oops: { title: 'Oops', body: "Looks like there's an error with mining a delay proof" },
      too_many_proofs: {
        title: 'Too Many Proofs',
        body: "Looks like you've sent more proofs than expected during the last 24 hours. The chain expects a max {maxNum} proofs during each epoch. On the next epoch your proofs will begin to be submitted again.",
      },
      wrong_difficulty: {
        title: 'Wrong Difficulty',
        body: "Looks like you're sending a proof with the wrong difficulty parameters to the chain. Check you are connected to the right network with the correct difficulty settings.",
      },
      sync_proof: {
        title: 'Syncing your proofs',
        body: 'Proofs awaiting transaction: {delta} ',
        body_0:
          'Something is wrong, you have more proofs on-chain, than on this device. You may be missing proofs locally.',
      },
    },
  },
  Fv = {
    deno_tx: 'Demo Tx',
    account: 'Account',
    balance: 'Balance',
    btn_onboard: 'Onboard Account',
    btn_transfer: 'Transfer Coins',
    onboard: {
      title: 'Onboard an Account',
      await: 'Awaiting Tx',
      btn_onboard: 'Onboard',
      btn_cancel: 'Cancel',
      no_balance_title: 'Low Balance',
      no_balance_body1: 'Onboarding {onboard_key} was not successful.',
      no_balance_body2:
        "Looks like you have less than 2 coins in your account, this means you won't be able to onboard anyone.",
    },
    set_wallet_type: {
      title: 'Set your Account Type',
      subtitle:
        ' Make sure you know what you are doing. This is not reversible. Slow and Community wallets are permanent.',
      btn_slow: 'Set Slow Wallet',
      btn_confirm_slow: 'Confirm Set Slow Wallet? This is not reversable.',
      slow_confirm: 'Set Slow',
      btn_community: 'Set Community Wallet',
      btn_confirm_community: 'Set Community',
      community_confirm: 'Confirm Set Community Wallet? This is not reversable.',
    },
    transfer: {
      title: 'Coin Transfer',
      sender: 'Sender',
      balance: 'Balance',
      receiver: 'Receiver',
      amount: 'Amount',
      amount_label: 'Amount (fractions not allowed yet)',
      receiver_placeholder: 'Receiver address',
      amount_placeholder: 'Amount to be transfered',
      confirm_title: 'Heads up!',
      please_confirm: 'Please confirm your transfer information:',
      await: 'Await txs',
      btn_next: 'Next',
      btn_confirm: 'Confirm',
      btn_cancel: 'Cancel',
      btn_close: 'Close',
      error_amount_greater_than_balance: 'Amount cannot be greater than account balance',
      error_receiver_equals_sender: 'Receiver address must be different from sender address',
      error_slow_wallet: 'Coin transfer is disabled for slow wallets.',
      success: 'Transfer executed with success',
      failed: 'Transfer failed. Code: {code}',
    },
  },
  Wv = {
    account_events: 'Account Events',
    version: 'Version',
    type: 'Type',
    amount: 'Amount',
    sender: 'Sender',
    receiver: 'Receiver',
    received_payment: 'Received Payment',
    sent_payment: 'Sent Payment',
    loading: {
      error: 'Error loading the account events:',
      corrupted_db:
        "Current connected node does not have all account events. Don't worry. Your wallet and coins are safe on the chain. Try connecting to another upstream node.",
      account_off_chain: 'Account selected not onboarded yet.',
    },
  },
  Vv = {
    link_title: 'Claim Coins',
    card: {
      title: 'Claim Your Missing Coins',
      body: '<p>Oops. Occasionally blockchains make math mistakes. 0L tries to fix them as quickly as possible.</p><p>Miner Identity Subsidy Incident: From Epoch 0 to epoch 52, the payouts to miners was lower than expected. Below you can credit your missing coins from that period.</p>',
    },
    table: { account: 'Account', amount: 'Amount', claim: 'Claim' },
    claim_btn: { await: 'Await...', claim: 'Claim Now' },
    modal_success: {
      title: 'Transation confirmed!',
      amount_for_account:
        '<p>You have claimed <span class="uk-text-bold">{coins} coins</span> for account <br><span class="uk-text-bold">{account}</span>.</p>',
      check_balance: 'You can check your balance now.',
      ok_btn: 'OK',
    },
    modal_error: {
      title: 'Claim Error',
      body: 'You must turn off miner to claim this account coins.',
      ok_btn: 'OK',
    },
  },
  Gv = {
    nav: Bv,
    layout: Dv,
    wallet: Rv,
    about: Hv,
    settings: zv,
    miner: Uv,
    txs: Fv,
    events: Wv,
    make_whole: Vv,
  }
Nn('en', async () => Lb)
Nn('zh_cn', async () => Hb)
Nn('de', async () => Kb)
Nn('fr', async () => sv)
Nn('es', async () => mv)
Nn('it', async () => xv)
Nn('pt', async () => Ov)
Nn('ar', async () => Gv)
function pa(e) {
  const { withLocale: t } = e
  X2({ initialLocale: t, fallbackLocale: 'en' })
}
const It = Ie(),
  Gi = Ie(!1),
  ln = Ie(!1),
  In = Ie([]),
  Mi = Ie(!1),
  jv = Ie(),
  id = Ie(!1),
  ma = Ie(),
  Hs = Ie(!1),
  za = Ie(),
  ga = Ie(),
  zi = (e) => e.replace('00000000000000000000000000000000', ''),
  qv = () => {
    Ht(Rt.Info, ' call init_preferences'), pa({ withLocale: 'en', fallbackLocale: 'en' })
    const e = je(It),
      t = e && e.locale ? e.locale : rb()
    pa({ withLocale: t, fallbackLocale: 'en' })
  }
function Tn(e) {
  Ke('set_preferences_locale', { locale: e })
    .then(() => {
      pa({ withLocale: e, fallbackLocale: 'en' })
    })
    .catch((t) => Ze(t, !0, 'set_preferences_locale'))
}
var Yv = {}
Mo(Yv, {
  CloseRequestedEvent: () => ud,
  LogicalPosition: () => sd,
  LogicalSize: () => od,
  PhysicalPosition: () => Ms,
  PhysicalSize: () => As,
  UserAttentionType: () => rd,
  WebviewWindow: () => Ui,
  WebviewWindowHandle: () => ld,
  WindowManager: () => cd,
  appWindow: () => ba,
  availableMonitors: () => Xv,
  currentMonitor: () => Kv,
  getAll: () => _a,
  getCurrent: () => ad,
  primaryMonitor: () => Zv,
})
var od = class {
    constructor(e, t) {
      ;(this.type = 'Logical'), (this.width = e), (this.height = t)
    }
  },
  As = class {
    constructor(e, t) {
      ;(this.type = 'Physical'), (this.width = e), (this.height = t)
    }
    toLogical(e) {
      return new od(this.width / e, this.height / e)
    }
  },
  sd = class {
    constructor(t, i) {
      ;(this.type = 'Logical'), (this.x = t), (this.y = i)
    }
  },
  Ms = class {
    constructor(e, t) {
      ;(this.type = 'Physical'), (this.x = e), (this.y = t)
    }
    toLogical(e) {
      return new sd(this.x / e, this.y / e)
    }
  },
  rd = ((e) => (
    (e[(e.Critical = 1)] = 'Critical'), (e[(e.Informational = 2)] = 'Informational'), e
  ))(rd || {})
function ad() {
  return new Ui(window.__TAURI_METADATA__.__currentWindow.label, { skip: !0 })
}
function _a() {
  return window.__TAURI_METADATA__.__windows.map((e) => new Ui(e.label, { skip: !0 }))
}
var Iu = ['tauri://created', 'tauri://error'],
  ld = class {
    constructor(e) {
      ;(this.label = e), (this.listeners = Object.create(null))
    }
    async listen(e, t) {
      return this._handleTauriEvent(e, t)
        ? Promise.resolve(() => {
            let i = this.listeners[e]
            i.splice(i.indexOf(t), 1)
          })
        : ka(e, this.label, t)
    }
    async once(e, t) {
      return this._handleTauriEvent(e, t)
        ? Promise.resolve(() => {
            let i = this.listeners[e]
            i.splice(i.indexOf(t), 1)
          })
        : ef(e, this.label, t)
    }
    async emit(e, t) {
      if (Iu.includes(e)) {
        for (let i of this.listeners[e] || [])
          i({ event: e, id: -1, windowLabel: this.label, payload: t })
        return Promise.resolve()
      }
      return Qh(e, this.label, t)
    }
    _handleTauriEvent(e, t) {
      return Iu.includes(e)
        ? (e in this.listeners ? this.listeners[e].push(t) : (this.listeners[e] = [t]), !0)
        : !1
    }
  },
  cd = class extends ld {
    async scaleFactor() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'scaleFactor' } } },
      })
    }
    async innerPosition() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'innerPosition' } } },
      }).then(({ x: e, y: t }) => new Ms(e, t))
    }
    async outerPosition() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'outerPosition' } } },
      }).then(({ x: e, y: t }) => new Ms(e, t))
    }
    async innerSize() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'innerSize' } } },
      }).then(({ width: e, height: t }) => new As(e, t))
    }
    async outerSize() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'outerSize' } } },
      }).then(({ width: e, height: t }) => new As(e, t))
    }
    async isFullscreen() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'isFullscreen' } } },
      })
    }
    async isMinimized() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'isMinimized' } } },
      })
    }
    async isMaximized() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'isMaximized' } } },
      })
    }
    async isFocused() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'isFocused' } } },
      })
    }
    async isDecorated() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'isDecorated' } } },
      })
    }
    async isResizable() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'isResizable' } } },
      })
    }
    async isMaximizable() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'isMaximizable' } } },
      })
    }
    async isMinimizable() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'isMinimizable' } } },
      })
    }
    async isClosable() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'isClosable' } } },
      })
    }
    async isVisible() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'isVisible' } } },
      })
    }
    async title() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'title' } } },
      })
    }
    async theme() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'theme' } } },
      })
    }
    async center() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'center' } } },
      })
    }
    async requestUserAttention(e) {
      let t = null
      return (
        e && (e === 1 ? (t = { type: 'Critical' }) : (t = { type: 'Informational' })),
        Te({
          __tauriModule: 'Window',
          message: {
            cmd: 'manage',
            data: { label: this.label, cmd: { type: 'requestUserAttention', payload: t } },
          },
        })
      )
    }
    async setResizable(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setResizable', payload: e } },
        },
      })
    }
    async setMaximizable(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setMaximizable', payload: e } },
        },
      })
    }
    async setMinimizable(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setMinimizable', payload: e } },
        },
      })
    }
    async setClosable(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setClosable', payload: e } },
        },
      })
    }
    async setTitle(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setTitle', payload: e } },
        },
      })
    }
    async maximize() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'maximize' } } },
      })
    }
    async unmaximize() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'unmaximize' } } },
      })
    }
    async toggleMaximize() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'toggleMaximize' } } },
      })
    }
    async minimize() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'minimize' } } },
      })
    }
    async unminimize() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'unminimize' } } },
      })
    }
    async show() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'show' } } },
      })
    }
    async hide() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'hide' } } },
      })
    }
    async close() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'close' } } },
      })
    }
    async setDecorations(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setDecorations', payload: e } },
        },
      })
    }
    async setAlwaysOnTop(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setAlwaysOnTop', payload: e } },
        },
      })
    }
    async setContentProtected(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setContentProtected', payload: e } },
        },
      })
    }
    async setSize(e) {
      if (!e || (e.type !== 'Logical' && e.type !== 'Physical'))
        throw new Error(
          'the `size` argument must be either a LogicalSize or a PhysicalSize instance',
        )
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: {
            label: this.label,
            cmd: {
              type: 'setSize',
              payload: { type: e.type, data: { width: e.width, height: e.height } },
            },
          },
        },
      })
    }
    async setMinSize(e) {
      if (e && e.type !== 'Logical' && e.type !== 'Physical')
        throw new Error(
          'the `size` argument must be either a LogicalSize or a PhysicalSize instance',
        )
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: {
            label: this.label,
            cmd: {
              type: 'setMinSize',
              payload: e ? { type: e.type, data: { width: e.width, height: e.height } } : null,
            },
          },
        },
      })
    }
    async setMaxSize(e) {
      if (e && e.type !== 'Logical' && e.type !== 'Physical')
        throw new Error(
          'the `size` argument must be either a LogicalSize or a PhysicalSize instance',
        )
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: {
            label: this.label,
            cmd: {
              type: 'setMaxSize',
              payload: e ? { type: e.type, data: { width: e.width, height: e.height } } : null,
            },
          },
        },
      })
    }
    async setPosition(e) {
      if (!e || (e.type !== 'Logical' && e.type !== 'Physical'))
        throw new Error(
          'the `position` argument must be either a LogicalPosition or a PhysicalPosition instance',
        )
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: {
            label: this.label,
            cmd: { type: 'setPosition', payload: { type: e.type, data: { x: e.x, y: e.y } } },
          },
        },
      })
    }
    async setFullscreen(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setFullscreen', payload: e } },
        },
      })
    }
    async setFocus() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'setFocus' } } },
      })
    }
    async setIcon(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: {
            label: this.label,
            cmd: { type: 'setIcon', payload: { icon: typeof e == 'string' ? e : Array.from(e) } },
          },
        },
      })
    }
    async setSkipTaskbar(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setSkipTaskbar', payload: e } },
        },
      })
    }
    async setCursorGrab(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setCursorGrab', payload: e } },
        },
      })
    }
    async setCursorVisible(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setCursorVisible', payload: e } },
        },
      })
    }
    async setCursorIcon(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setCursorIcon', payload: e } },
        },
      })
    }
    async setCursorPosition(e) {
      if (!e || (e.type !== 'Logical' && e.type !== 'Physical'))
        throw new Error(
          'the `position` argument must be either a LogicalPosition or a PhysicalPosition instance',
        )
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: {
            label: this.label,
            cmd: { type: 'setCursorPosition', payload: { type: e.type, data: { x: e.x, y: e.y } } },
          },
        },
      })
    }
    async setIgnoreCursorEvents(e) {
      return Te({
        __tauriModule: 'Window',
        message: {
          cmd: 'manage',
          data: { label: this.label, cmd: { type: 'setIgnoreCursorEvents', payload: e } },
        },
      })
    }
    async startDragging() {
      return Te({
        __tauriModule: 'Window',
        message: { cmd: 'manage', data: { label: this.label, cmd: { type: 'startDragging' } } },
      })
    }
    async onResized(e) {
      return this.listen('tauri://resize', (t) => {
        ;(t.payload = fd(t.payload)), e(t)
      })
    }
    async onMoved(e) {
      return this.listen('tauri://move', (t) => {
        ;(t.payload = hd(t.payload)), e(t)
      })
    }
    async onCloseRequested(e) {
      return this.listen('tauri://close-requested', (t) => {
        let i = new ud(t)
        Promise.resolve(e(i)).then(() => {
          if (!i.isPreventDefault()) return this.close()
        })
      })
    }
    async onFocusChanged(e) {
      let t = await this.listen('tauri://focus', (o) => {
          e({ ...o, payload: !0 })
        }),
        i = await this.listen('tauri://blur', (o) => {
          e({ ...o, payload: !1 })
        })
      return () => {
        t(), i()
      }
    }
    async onScaleChanged(e) {
      return this.listen('tauri://scale-change', e)
    }
    async onMenuClicked(e) {
      return this.listen('tauri://menu', e)
    }
    async onFileDropEvent(e) {
      let t = await this.listen('tauri://file-drop', (s) => {
          e({ ...s, payload: { type: 'drop', paths: s.payload } })
        }),
        i = await this.listen('tauri://file-drop-hover', (s) => {
          e({ ...s, payload: { type: 'hover', paths: s.payload } })
        }),
        o = await this.listen('tauri://file-drop-cancelled', (s) => {
          e({ ...s, payload: { type: 'cancel' } })
        })
      return () => {
        t(), i(), o()
      }
    }
    async onThemeChanged(e) {
      return this.listen('tauri://theme-changed', e)
    }
  },
  ud = class {
    constructor(e) {
      ;(this._preventDefault = !1),
        (this.event = e.event),
        (this.windowLabel = e.windowLabel),
        (this.id = e.id)
    }
    preventDefault() {
      this._preventDefault = !0
    }
    isPreventDefault() {
      return this._preventDefault
    }
  },
  Ui = class extends cd {
    constructor(t, i = {}) {
      super(t),
        (i != null && i.skip) ||
          Te({
            __tauriModule: 'Window',
            message: { cmd: 'createWebview', data: { options: { label: t, ...i } } },
          })
            .then(async () => this.emit('tauri://created'))
            .catch(async (o) => this.emit('tauri://error', o))
    }
    static getByLabel(t) {
      return _a().some((i) => i.label === t) ? new Ui(t, { skip: !0 }) : null
    }
    static async getFocusedWindow() {
      for (let t of _a()) if (await t.isFocused()) return t
      return null
    }
  },
  ba
'__TAURI_METADATA__' in window
  ? (ba = new Ui(window.__TAURI_METADATA__.__currentWindow.label, { skip: !0 }))
  : (console.warn(
      'Could not find "window.__TAURI_METADATA__". The "appWindow" value will reference the "main" window label.\nNote that this is not an issue if running this frontend on a browser instead of a Tauri window.',
    ),
    (ba = new Ui('main', { skip: !0 })))
function Ua(e) {
  return e === null
    ? null
    : { name: e.name, scaleFactor: e.scaleFactor, position: hd(e.position), size: fd(e.size) }
}
function hd(e) {
  return new Ms(e.x, e.y)
}
function fd(e) {
  return new As(e.width, e.height)
}
async function Kv() {
  return Te({
    __tauriModule: 'Window',
    message: { cmd: 'manage', data: { cmd: { type: 'currentMonitor' } } },
  }).then(Ua)
}
async function Zv() {
  return Te({
    __tauriModule: 'Window',
    message: { cmd: 'manage', data: { cmd: { type: 'primaryMonitor' } } },
  }).then(Ua)
}
async function Xv() {
  return Te({
    __tauriModule: 'Window',
    message: { cmd: 'manage', data: { cmd: { type: 'availableMonitors' } } },
  }).then((e) => e.map(Ua))
}
const Jv = () => ({
  chain_id: 'TESTING',
  nodes: [{ url: 'http://localhost:8080', note: 'local-net', version: 0, is_api: !1, is_sync: !1 }],
})
var Xt = ((e) => ((e.MAINNET = 'MAINNET'), (e.TESTNET = 'TESTNET'), (e.TESTING = 'TESTING'), e))(
  Xt || {},
)
const kn = Ie(Jv()),
  ai = Ie(!0),
  Ps = Ie(!1),
  Fa = Ie(new Date().getSeconds()),
  ws = Ie(0),
  dd = Ie([]),
  va = Ie()
function Kr(e) {
  Ke('toggle_network', { chainId: e })
    .then((t) => {
      kn.set(t), ji()
    })
    .catch((t) => Ze(t, !1, 'setNetwork'))
}
const Wa = async () => {
    Ke('get_networks', {})
      .then((e) => {
        kn.set(e)
      })
      .catch((e) => Ze(e, !0, 'getNetwork'))
  },
  Do = async () => (
    Ht(Rt.Info, ' get_metadata'),
    Ke('get_metadata', {})
      .then((e) => (va.set(e), ai.set(!0), Ps.set(!1), Fa.set(new Date().getSeconds()), e))
      .catch((e) => {
        Ze(e, !0, 'getMetadata'), va.set(null), ai.set(!1), Qv(), Va()
      })
  ),
  Va = async () => {
    if (!(new Date().getSeconds() < je(Fa)))
      return (
        Ps.set(!0),
        Ht(Rt.Info, 'refresh_upstream_peer_stats'),
        Ke('refresh_upstream_peer_stats', {})
          .then((e) => {
            dd.set(e), Do(), Ps.set(!1), ws.set(0)
          })
          .catch((e) => {
            Ze(e, !0, 'refreshUpstreamPeerStats')
          })
      )
  },
  Qv = () => {
    ws.set(je(ws) + 1)
    const e = new Date()
    e.setSeconds(e.getSeconds() + 2 * je(ws)), Fa.set(e.getSeconds())
  }
let pd
const ey = async () => {
  je(nn) || (Ga().then(Us).then(zs), (pd = setInterval(() => oy(), 5e3)))
}
async function md() {
  return nn.set(!1), ja(), clearInterval(pd), !0
}
function ty() {
  je(nn) ? md() : ey()
}
const gd = ad(),
  zs = async () => {
    if (!E_()) {
      Ze({ category: 1, uid: 1, msg: 'cannot mine proof, invalid state' }, !0, 'towerOnce')
      return
    }
    console.log('mine tower once'), Oo.set(!1), La.set(!1)
    let t = (je(kn) ? je(kn).chain_id : Xt.MAINNET) == Xt.TESTING ? 5 * 1e3 : 60 * 60 * 1e3
    const i = je(Jt)
    i &&
      i.last_local_proof &&
      i.last_local_proof.elapsed_secs != null &&
      (t = 1 + i.last_local_proof.elapsed_secs * 1e3)
    const o = {
      proof_in_progress: i && i.local_height ? i.local_height + 1 : 1,
      time_start: Date.now(),
      previous_duration: t,
      complete: !1,
      error: !1,
      time_elapsed: 0,
      pct_complete: 0,
    }
    Jt.update((s) => ((s.progress = o), s)), ny()
  },
  ny = async () =>
    Ke('miner_once', {})
      .catch((e) => {
        Ze(e, !1, 'towerInvoke'),
          md(),
          Jt.update(
            (t) => (
              t.progress &&
                ((t.progress.pct_complete = 0),
                (t.progress.complete = !1),
                (t.progress.error = !0)),
              t
            ),
          )
      })
      .then((e) => {
        La.set(!0),
          Oo.set(!1),
          Jt.update(
            (t) => (
              (t.last_local_proof = e),
              t.progress && ((t.progress.pct_complete = 1), (t.progress.complete = !0)),
              t
            ),
          ),
          on('Miner proof '.concat(e.height, ' complete!')),
          zt.set(JSON.stringify(e))
      })
      .then(Ya)
      .then(Ka)
      .finally(qa),
  Ga = async () => {
    await Ke('start_backlog_sender_listener', {})
      .then((e) => (zt.set(e), Pn.set(!0), nn.set(!0), e))
      .catch((e) => {
        let t = !1
        e.uid == 104 && (id.set(!0), Pn.set(!1), nn.set(!1), (t = !0)),
          Ze(e, t, 'startBacklogListener')
      })
  },
  ja = async () =>
    gd
      .emit('kill-backlog-listener')
      .then(() => Pn.set(!1))
      .catch((e) => Ze(e, !0, 'kill-backlog-listener')),
  qa = async () => {
    console.log('emit backlog'), Lf(), gd.emit('send-backlog', 'please...')
  },
  iy = () => {
    const e = je(Jt)
    return !!(
      (e.local_height && je(Ns)) ||
      (e.local_height &&
        e.on_chain &&
        e.on_chain.verified_tower_height &&
        e.local_height - e.on_chain.verified_tower_height > 0)
    )
  },
  _d = async () => {
    Ht(Rt.Info, 'maybeEmitBacklog'), iy() && !je(tn) && je(Pn) && _d()
  },
  Ya = async () => (
    Ht(Rt.Info, 'getTowerChainView'),
    ln.set(!0),
    Ke('get_onchain_tower_state', { account: je(It).account })
      .then((e) => {
        Sf(),
          e.verified_tower_height && Ns.set(!1),
          Jt.update((t) => ((t.on_chain = e), t)),
          zt.set(JSON.stringify(e)),
          ln.set(!1)
      })
      .catch((e) => {
        Ze(e, !0, 'getTowerChainView'), ln.set(!1)
      })
  ),
  Ka = async () => (
    console.log('getLocalHeight'),
    Ke('get_last_local_proof', {})
      .then((e) => {
        Jt.update((t) => ((t.last_local_proof = e), (t.local_height = e.height), t)),
          zt.set(JSON.stringify(e))
      })
      .catch((e) => {
        Ze(e, !0, 'getLocalHeight')
      })
  )
function oy() {
  const e = je(Jt)
  e.progress &&
    !e.progress.complete &&
    ((e.progress.time_elapsed = Date.now() - e.progress.time_start),
    (e.progress.pct_complete = e.progress.time_elapsed / e.progress.previous_duration),
    Jt.set(e))
}
const sy = async () => {
  tn.set(!0),
    Ke('submit_proof_zero', {})
      .then((e) => (console.log(e), zt.set(e), e))
      .catch((e) => {
        Ze(e, !1, 'submitProofZero')
      })
}
let Zr = !1
const Us = async () => {
    vd(),
      Zr ||
        (Ht(Rt.Info, 'carpeTick'),
        je(Gi) &&
          ((Zr = !0),
          Do()
            .then(ji)
            .then(Ya)
            .then(Ka)
            .then(_d)
            .finally(() => (Zr = !1))))
  },
  bd = async () => {
    Ke('get_default_profile', {})
      .then((e) => {
        It.set(e)
      })
      .catch((e) => {
        Ze(e, !0, 'get_default_profile')
      })
  },
  vd = async () => {
    Ke('get_all_accounts')
      .then((e) => In.set(e))
      .catch((e) => Ze(e, !0, 'get_all_accounts'))
  },
  ji = async () => {
    Ht(Rt.Info, 'refresh_accounts'),
      ln.set(!0),
      Ke('refresh_accounts')
        .then((e) => {
          ln.set(!1), In.set(e), je(Mi) || Mi.set(!0)
        })
        .catch((e) => {
          Ze(e, !0, 'refresh_accounts'), ln.set(!1), je(Mi) || Mi.set(!0)
        })
  }
var Za = ((e) => ((e[(e.Mnem = 0)] = 'Mnem'), (e[(e.PriKey = 1)] = 'PriKey'), e))(Za || {})
const yd = async (e, t) => {
    let i = '',
      o = {}
    return (
      e == 0
        ? ((i = 'init_from_mnem'), (o = { mnem: t.trim() }))
        : e == 1 && ((i = 'init_from_private_key'), (o = { priKeyString: t.trim() })),
      Ke(i, o)
        .then(
          (s) => (
            Gi.set(!0),
            zt.set(JSON.stringify(s)),
            It.set(s),
            on('Account Added: '.concat(s.nickname)),
            ji(),
            setTimeout(() => sa('wallet'), 10),
            s
          ),
        )
        .catch((s) => {
          Ze(s, !1, 'addAccount')
        })
        .finally(() => (t = null))
    )
  },
  ry = async () => (
    Ht(Rt.Info, ' isCarpeInit'),
    ln.set(!0),
    Ke('is_init', {})
      .then((e) => (zt.set(e.toString()), Gi.set(e), ln.set(!1), e))
      .catch((e) => (ln.set(!1), Ze(e, !1, 'isCarpeInit'), !1))
  ),
  Xa = async (e, t = !0) => {
    if (je(nn)) {
      Pf('To switch accounts you need to turn miner off first.')
      return
    }
    Ke('switch_profile', { account: e })
      .then((i) => {
        It.set(i), Gi.set(!0), t && on('Account switched to ' + i.nickname)
      })
      .then(Us)
      .catch((i) => {
        Ze(i, !1, 'setAccount')
      })
      .finally(() => {
        Sf(), Ns.set(!0)
      })
  }
function ay() {
  const e = je(It)
  Ke('query_balance', { account: e.account })
    .then((t) => {
      ;(e.balance = t), It.set(e)
      const i = je(In)
      if (!i) return
      const o = i.map((s) => (s.account == e.account && (s.balance = t), s))
      In.set(o)
    })
    .catch((t) => Ze(t, !1, 'checkSigningAccountBalance'))
}
function ly(e, t = null) {
  if (!e.on_chain) return t && t('account_not_on_chain')
}
const wd = async () =>
    Ke('has_legacy_configs', {})
      .then((e) => (e && Ht(Rt.Warn, 'legacy configs found, should try to migrate'), Hs.set(e), e))
      .catch((e) => (Ze(e, !0, 'has_legacy_configs'), !1)),
  cy = async () => {
    Ht(Rt.Warn, 'trying to migrate legacy user'),
      ga.set(!0),
      Ke('maybe_migrate', {})
        .then((e) => {
          za.set(e), on('Successfully migrated accounts')
        })
        .then(ji)
        .then(bd)
        .then(Us)
        .catch((e) => Ze(e, !0, 'maybe_migrate'))
        .finally(() => {
          ga.set(!1)
        })
  },
  uy = () => {
    Ht(Rt.Warn, 'ignoring migration'),
      Ke('ignore_migrate', {})
        .then((e) => {
          za.set(e)
        })
        .then(wd)
        .catch((e) => Ze(e, !0, 'ignore_migrate'))
  }
function hy(e, t = null) {
  if (je(It).account != e) {
    if (je(nn)) return t('To claim coins you need to turn miner off first.')
    Xa(e, !1)
  }
  const i = je(ma)
  Ke('claim_make_whole', { account: e })
    .then(() => {
      const o = i[e]
      ;(i[e] = o.map((s) => ((s.claimed = !0), s))), ma.set(i), ay(), t(null)
    })
    .catch((o) => {
      t ? t(o.msg) : Ze(o, !1, 'claim_make_whole')
    })
}
const Ja = Ie({ version: null, hash: null, head: null })
function kd() {
  console.log('getVersion'),
    Ke('get_app_version')
      .then((e) => {
        Ja.set(e)
      })
      .catch((e) => Ze(e, !0, 'getVersion'))
}
const fy = Ie(!1),
  dy = async () => {
    Ht(Rt.Warn, 'webview is starting'),
      If(),
      kd(),
      (await ry())
        ? await vd()
            .then(bd)
            .then(Wa)
            .then(Do)
            .then(ji)
            .finally(() => {
              Va(), setInterval(Us, 3e4), fy.set(!0), sa('wallet')
            })
        : (Ht(Rt.Warn, 'carpe settings not initialized'), await wd(), sa('wallet'))
  }
function py(e) {
  let t, i, o
  return {
    c() {
      ;(t = m('span')),
        (i = E()),
        (o = m('span')),
        (o.textContent = 'TESTNET'),
        y(t, 'uk-icon', 'icon: warning')
    },
    m(s, a) {
      M(s, t, a), M(s, i, a), M(s, o, a)
    },
    d(s) {
      s && (A(t), A(i), A(o))
    },
  }
}
function my(e) {
  let t
  return {
    c() {
      ;(t = m('span')), y(t, 'uk-icon', 'icon: user')
    },
    m(i, o) {
      M(i, t, o)
    },
    d(i) {
      i && A(t)
    },
  }
}
function gy(e) {
  let t
  function i(a, c) {
    return a[0] ? py : my
  }
  let o = i(e),
    s = o(e)
  return {
    c() {
      s.c(), (t = Tt())
    },
    m(a, c) {
      s.m(a, c), M(a, t, c)
    },
    p(a, [c]) {
      o !== (o = i(a)) && (s.d(1), (s = o(a)), s && (s.c(), s.m(t.parentNode, t)))
    },
    i: ce,
    o: ce,
    d(a) {
      a && A(t), s.d(a)
    },
  }
}
function _y(e, t, i) {
  let o = !1,
    s
  return (
    wt(async () => {
      s = kn.subscribe((a) => {
        a && i(0, (o = a.chain_id == Xt.TESTNET))
      })
    }),
    Ut(async () => {
      s && s()
    }),
    [o]
  )
}
class by extends we {
  constructor(t) {
    super(), ye(this, t, _y, gy, ge, {})
  }
}
function vy(e) {
  let t = e[1]('about.about') + '',
    i,
    o,
    s = e[0].version + '',
    a
  return {
    c() {
      ;(i = T(t)), (o = T(' - v')), (a = T(s))
    },
    m(c, h) {
      M(c, i, h), M(c, o, h), M(c, a, h)
    },
    p(c, h) {
      h & 2 && t !== (t = c[1]('about.about') + '') && O(i, t),
        h & 1 && s !== (s = c[0].version + '') && O(a, s)
    },
    d(c) {
      c && (A(i), A(o), A(a))
    },
  }
}
function yy(e) {
  let t, i
  return (
    (t = new yn({
      props: {
        to: 'about',
        class: 'uk-text-muted',
        $$slots: { default: [vy] },
        $$scope: { ctx: e },
      },
    })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, [s]) {
        const a = {}
        s & 7 && (a.$$scope = { dirty: s, ctx: o }), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function wy(e, t, i) {
  let o
  ae(e, De, (a) => i(1, (o = a)))
  let s = {}
  return (
    wt(async () => {
      Ja.subscribe((a) => i(0, (s = a)))
    }),
    [s, o]
  )
}
class ky extends we {
  constructor(t) {
    super(), ye(this, t, wy, yy, ge, {})
  }
}
function Nu(e, t, i) {
  const o = e.slice()
  return (o[4] = t[i]), o
}
function Ou(e) {
  let t
  function i(a, c) {
    return a[1] ? Cy : $y
  }
  let o = i(e),
    s = o(e)
  return {
    c() {
      ;(t = m('span')), s.c(), y(t, 'class', 'uk-margin-small-left')
    },
    m(a, c) {
      M(a, t, c), s.m(t, null)
    },
    p(a, c) {
      o === (o = i(a)) && s ? s.p(a, c) : (s.d(1), (s = o(a)), s && (s.c(), s.m(t, null)))
    },
    d(a) {
      a && A(t), s.d()
    },
  }
}
function $y(e) {
  let t = e[2]('wallet.account_switcher.select_account') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 4 && t !== (t = o[2]('wallet.account_switcher.select_account') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function Cy(e) {
  let t = e[1].nickname + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 2 && t !== (t = o[1].nickname + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function Bu(e) {
  let t,
    i = e[2]('wallet.account_switcher.switch_account') + '',
    o,
    s,
    a,
    c,
    h
  function f(b, v) {
    return b[0] ? xy : Ey
  }
  let p = f(e),
    g = p(e)
  return {
    c() {
      ;(t = m('li')),
        (o = T(i)),
        (s = E()),
        (a = m('li')),
        (c = E()),
        g.c(),
        (h = Tt()),
        y(t, 'class', 'uk-text-muted'),
        y(a, 'class', 'uk-nav-divider')
    },
    m(b, v) {
      M(b, t, v), u(t, o), M(b, s, v), M(b, a, v), M(b, c, v), g.m(b, v), M(b, h, v)
    },
    p(b, v) {
      v & 4 && i !== (i = b[2]('wallet.account_switcher.switch_account') + '') && O(o, i),
        p === (p = f(b)) && g ? g.p(b, v) : (g.d(1), (g = p(b)), g && (g.c(), g.m(h.parentNode, h)))
    },
    d(b) {
      b && (A(t), A(s), A(a), A(c), A(h)), g.d(b)
    },
  }
}
function xy(e) {
  let t,
    i,
    o = Pt(e[0]),
    s = []
  for (let a = 0; a < o.length; a += 1) s[a] = Du(Nu(e, o, a))
  return {
    c() {
      for (let a = 0; a < s.length; a += 1) s[a].c()
      ;(t = E()), (i = m('li')), y(i, 'class', 'uk-nav-divider')
    },
    m(a, c) {
      for (let h = 0; h < s.length; h += 1) s[h] && s[h].m(a, c)
      M(a, t, c), M(a, i, c)
    },
    p(a, c) {
      if (c & 3) {
        o = Pt(a[0])
        let h
        for (h = 0; h < o.length; h += 1) {
          const f = Nu(a, o, h)
          s[h] ? s[h].p(f, c) : ((s[h] = Du(f)), s[h].c(), s[h].m(t.parentNode, t))
        }
        for (; h < s.length; h += 1) s[h].d(1)
        s.length = o.length
      }
    },
    d(a) {
      a && (A(t), A(i)), $n(s, a)
    },
  }
}
function Ey(e) {
  let t
  return {
    c() {
      ;(t = m('p')), (t.textContent = 'loading...')
    },
    m(i, o) {
      M(i, t, o)
    },
    p: ce,
    d(i) {
      i && A(t)
    },
  }
}
function Du(e) {
  let t,
    i,
    o = e[4].nickname + '',
    s,
    a,
    c,
    h
  function f() {
    return e[3](e[4])
  }
  return {
    c() {
      ;(t = m('li')),
        (i = m('a')),
        (s = T(o)),
        y(i, 'href', '#'),
        y(i, 'class', (a = e[1].account == e[4].account ? 'uk-text-primary' : ''))
    },
    m(p, g) {
      M(p, t, g), u(t, i), u(i, s), c || ((h = Ee(i, 'click', f)), (c = !0))
    },
    p(p, g) {
      ;(e = p),
        g & 1 && o !== (o = e[4].nickname + '') && O(s, o),
        g & 3 &&
          a !== (a = e[1].account == e[4].account ? 'uk-text-primary' : '') &&
          y(i, 'class', a)
    },
    d(p) {
      p && A(t), (c = !1), h()
    },
  }
}
function Sy(e) {
  let t = e[2]('wallet.account_switcher.setting') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 4 && t !== (t = o[2]('wallet.account_switcher.setting') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function Ty(e) {
  let t = e[2]('wallet.account_switcher.developers') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 4 && t !== (t = o[2]('wallet.account_switcher.developers') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function Ly(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S, L, N, B, F
  s = new by({})
  let R = e[0] && e[0].length > 0 && Ou(e),
    V = e[1] && e[0] && e[0].length > 1 && Bu(e)
  return (
    (v = new yn({
      props: {
        to: 'settings',
        class: 'uk-text-muted',
        $$slots: { default: [Sy] },
        $$scope: { ctx: e },
      },
    })),
    (S = new yn({
      props: { to: 'dev', class: 'uk-text-muted', $$slots: { default: [Ty] }, $$scope: { ctx: e } },
    })),
    (B = new ky({})),
    {
      c() {
        ;(t = m('main')),
          (i = m('div')),
          (o = m('button')),
          re(s.$$.fragment),
          (a = E()),
          R && R.c(),
          (c = E()),
          (h = m('div')),
          (f = m('ul')),
          V && V.c(),
          (p = E()),
          (g = m('li')),
          (b = m('a')),
          re(v.$$.fragment),
          (w = E()),
          ($ = m('li')),
          (x = m('a')),
          re(S.$$.fragment),
          (L = E()),
          (N = m('li')),
          re(B.$$.fragment),
          y(o, 'class', 'uk-button uk-button-default'),
          y(o, 'type', 'button'),
          y(b, 'href', '#'),
          y(x, 'href', '#'),
          y(N, 'class', 'uk-text-muted'),
          y(f, 'class', 'uk-nav uk-dropdown-nav'),
          y(h, 'uk-dropdown', '')
      },
      m(G, j) {
        M(G, t, j),
          u(t, i),
          u(i, o),
          oe(s, o, null),
          u(o, a),
          R && R.m(o, null),
          u(i, c),
          u(i, h),
          u(h, f),
          V && V.m(f, null),
          u(f, p),
          u(f, g),
          u(g, b),
          oe(v, b, null),
          u(f, w),
          u(f, $),
          u($, x),
          oe(S, x, null),
          u(f, L),
          u(f, N),
          oe(B, N, null),
          (F = !0)
      },
      p(G, [j]) {
        G[0] && G[0].length > 0
          ? R
            ? R.p(G, j)
            : ((R = Ou(G)), R.c(), R.m(o, null))
          : R && (R.d(1), (R = null)),
          G[1] && G[0] && G[0].length > 1
            ? V
              ? V.p(G, j)
              : ((V = Bu(G)), V.c(), V.m(f, p))
            : V && (V.d(1), (V = null))
        const Y = {}
        j & 132 && (Y.$$scope = { dirty: j, ctx: G }), v.$set(Y)
        const z = {}
        j & 132 && (z.$$scope = { dirty: j, ctx: G }), S.$set(z)
      },
      i(G) {
        F ||
          (D(s.$$.fragment, G),
          D(v.$$.fragment, G),
          D(S.$$.fragment, G),
          D(B.$$.fragment, G),
          (F = !0))
      },
      o(G) {
        U(s.$$.fragment, G), U(v.$$.fragment, G), U(S.$$.fragment, G), U(B.$$.fragment, G), (F = !1)
      },
      d(G) {
        G && A(t), se(s), R && R.d(), V && V.d(), se(v), se(S), se(B)
      },
    }
  )
}
function Ay(e, t, i) {
  let o, s, a
  return (
    ae(e, In, (h) => i(0, (o = h))),
    ae(e, It, (h) => i(1, (s = h))),
    ae(e, De, (h) => i(2, (a = h))),
    [
      o,
      s,
      a,
      (h) => {
        s.account != h.account && Xa(h.account)
      },
    ]
  )
}
class My extends we {
  constructor(t) {
    super(), ye(this, t, Ay, Ly, ge, {})
  }
}
function Ru(e) {
  let t, i
  return (
    (t = new yn({ props: { to: vt.wallet, $$slots: { default: [Py] }, $$scope: { ctx: e } } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function Py(e) {
  let t
  return {
    c() {
      ;(t = m('span')),
        y(t, 'class', 'uk-text-muted'),
        y(t, 'uk-icon', 'icon: arrow-left; ratio: 2')
    },
    m(i, o) {
      M(i, t, o)
    },
    p: ce,
    d(i) {
      i && A(t)
    },
  }
}
function Hu(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $
  return (
    (s = new yn({ props: { to: vt.wallet, $$slots: { default: [Iy] }, $$scope: { ctx: e } } })),
    (f = new yn({ props: { to: vt.miner, $$slots: { default: [Ny] }, $$scope: { ctx: e } } })),
    (v = new yn({ props: { to: vt.transfer, $$slots: { default: [Oy] }, $$scope: { ctx: e } } })),
    {
      c() {
        ;(t = m('div')),
          (i = m('ul')),
          (o = m('li')),
          re(s.$$.fragment),
          (c = E()),
          (h = m('li')),
          re(f.$$.fragment),
          (g = E()),
          (b = m('li')),
          re(v.$$.fragment),
          y(
            o,
            'class',
            (a = 'uk-padding ' + (e[0].pathname.includes('wallet') ? 'uk-active' : '')),
          ),
          y(h, 'class', (p = 'uk-padding ' + (e[0].pathname.includes('miner') ? 'uk-active' : ''))),
          y(
            b,
            'class',
            (w = 'uk-padding ' + (e[0].pathname.includes('transfer') ? 'uk-active' : '')),
          ),
          y(i, 'class', 'uk-navbar-nav uk-flex'),
          y(t, 'class', 'uk-navbar-center')
      },
      m(x, S) {
        M(x, t, S),
          u(t, i),
          u(i, o),
          oe(s, o, null),
          u(i, c),
          u(i, h),
          oe(f, h, null),
          u(i, g),
          u(i, b),
          oe(v, b, null),
          ($ = !0)
      },
      p(x, S) {
        const L = {}
        S & 36 && (L.$$scope = { dirty: S, ctx: x }),
          s.$set(L),
          (!$ ||
            (S & 1 &&
              a !== (a = 'uk-padding ' + (x[0].pathname.includes('wallet') ? 'uk-active' : '')))) &&
            y(o, 'class', a)
        const N = {}
        S & 36 && (N.$$scope = { dirty: S, ctx: x }),
          f.$set(N),
          (!$ ||
            (S & 1 &&
              p !== (p = 'uk-padding ' + (x[0].pathname.includes('miner') ? 'uk-active' : '')))) &&
            y(h, 'class', p)
        const B = {}
        S & 36 && (B.$$scope = { dirty: S, ctx: x }),
          v.$set(B),
          (!$ ||
            (S & 1 &&
              w !==
                (w = 'uk-padding ' + (x[0].pathname.includes('transfer') ? 'uk-active' : '')))) &&
            y(b, 'class', w)
      },
      i(x) {
        $ || (D(s.$$.fragment, x), D(f.$$.fragment, x), D(v.$$.fragment, x), ($ = !0))
      },
      o(x) {
        U(s.$$.fragment, x), U(f.$$.fragment, x), U(v.$$.fragment, x), ($ = !1)
      },
      d(x) {
        x && A(t), se(s), se(f), se(v)
      },
    }
  )
}
function Iy(e) {
  let t = e[2]('nav.wallet') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 4 && t !== (t = o[2]('nav.wallet') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function Ny(e) {
  let t = e[2]('nav.miner') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 4 && t !== (t = o[2]('nav.miner') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function Oy(e) {
  let t = e[2]('nav.transactions') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 4 && t !== (t = o[2]('nav.transactions') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function By(e) {
  let t,
    i,
    o = e[3].includes(e[0].pathname),
    s,
    a,
    c,
    h,
    f,
    p,
    g,
    b = o && Ru(e),
    v = e[1] && Hu(e)
  return (
    (p = new My({})),
    {
      c() {
        ;(t = m('main')),
          (i = m('nav')),
          b && b.c(),
          (s = E()),
          v && v.c(),
          (a = E()),
          (c = m('div')),
          (h = m('ul')),
          (f = m('li')),
          re(p.$$.fragment),
          y(h, 'class', 'uk-navbar-nav'),
          y(c, 'class', 'uk-navbar-right'),
          y(i, 'class', 'uk-navbar-container'),
          y(i, 'uk-navbar', ''),
          y(t, 'class', 'uk-margin-top')
      },
      m(w, $) {
        M(w, t, $),
          u(t, i),
          b && b.m(i, null),
          u(i, s),
          v && v.m(i, null),
          u(i, a),
          u(i, c),
          u(c, h),
          u(h, f),
          oe(p, f, null),
          (g = !0)
      },
      p(w, [$]) {
        $ & 1 && (o = w[3].includes(w[0].pathname)),
          o
            ? b
              ? $ & 1 && D(b, 1)
              : ((b = Ru(w)), b.c(), D(b, 1), b.m(i, s))
            : b &&
              (qe(),
              U(b, 1, 1, () => {
                b = null
              }),
              Ye()),
          w[1]
            ? v
              ? (v.p(w, $), $ & 2 && D(v, 1))
              : ((v = Hu(w)), v.c(), D(v, 1), v.m(i, a))
            : v &&
              (qe(),
              U(v, 1, 1, () => {
                v = null
              }),
              Ye())
      },
      i(w) {
        g || (D(b), D(v), D(p.$$.fragment, w), (g = !0))
      },
      o(w) {
        U(b), U(v), U(p.$$.fragment, w), (g = !1)
      },
      d(w) {
        w && A(t), b && b.d(), v && v.d(), se(p)
      },
    }
  )
}
function Dy(e, t, i) {
  let o, s, a
  ae(e, It, (f) => i(1, (s = f))), ae(e, De, (f) => i(2, (a = f)))
  const c = [vt.settings, vt.about, vt.developer, vt.keygen, vt.accountFromMnem],
    h = Ta()
  return ae(e, h, (f) => i(0, (o = f))), [o, s, a, c, h]
}
class Ry extends we {
  constructor(t) {
    super(), ye(this, t, Dy, By, ge, {})
  }
}
function zu(e, t, i) {
  const o = e.slice()
  return (o[11] = t[i]), o
}
function Uu(e) {
  let t,
    i = Pt(e[1]),
    o = []
  for (let s = 0; s < i.length; s += 1) o[s] = Fu(zu(e, i, s))
  return {
    c() {
      for (let s = 0; s < o.length; s += 1) o[s].c()
      t = Tt()
    },
    m(s, a) {
      for (let c = 0; c < o.length; c += 1) o[c] && o[c].m(s, a)
      M(s, t, a)
    },
    p(s, a) {
      if (a & 2) {
        i = Pt(s[1])
        let c
        for (c = 0; c < i.length; c += 1) {
          const h = zu(s, i, c)
          o[c] ? o[c].p(h, a) : ((o[c] = Fu(h)), o[c].c(), o[c].m(t.parentNode, t))
        }
        for (; c < o.length; c += 1) o[c].d(1)
        o.length = i.length
      }
    },
    d(s) {
      s && A(t), $n(o, s)
    },
  }
}
function Fu(e) {
  let t,
    i,
    o = e[11].uid + '',
    s,
    a,
    c,
    h,
    f = e[11].msg + '',
    p,
    g,
    b,
    v
  return {
    c() {
      ;(t = m('p')),
        (i = T('Error ID: ')),
        (s = T(o)),
        (a = E()),
        (c = m('br')),
        (h = T('\n          Message: ')),
        (p = T(f)),
        (g = E()),
        (b = m('br')),
        (v = E()),
        y(t, 'class', 'uk-text-break')
    },
    m(w, $) {
      M(w, t, $), u(t, i), u(t, s), u(t, a), u(t, c), u(t, h), u(t, p), u(t, g), u(t, b), u(t, v)
    },
    p(w, $) {
      $ & 2 && o !== (o = w[11].uid + '') && O(s, o), $ & 2 && f !== (f = w[11].msg + '') && O(p, f)
    },
    d(w) {
      w && A(t)
    },
  }
}
function Wu(e) {
  let t, i, o, s, a
  return {
    c() {
      ;(t = m('span')),
        (t.textContent = 'LATEST REQUEST'),
        (i = E()),
        (o = m('br')),
        (s = E()),
        (a = T(e[0]))
    },
    m(c, h) {
      M(c, t, h), M(c, i, h), M(c, o, h), M(c, s, h), M(c, a, h)
    },
    p(c, h) {
      h & 1 && O(a, c[0])
    },
    d(c) {
      c && (A(t), A(i), A(o), A(s), A(a))
    },
  }
}
function Hy(e) {
  let t,
    i,
    o,
    s,
    a,
    c,
    h,
    f,
    p,
    g,
    b,
    v,
    w,
    $,
    x,
    S,
    L,
    N,
    B,
    F,
    R,
    V,
    G,
    j,
    Y,
    z,
    W,
    te,
    K,
    ee,
    ne,
    Z,
    I,
    Q,
    ie,
    ue,
    le,
    _e,
    Ce,
    xe = JSON.stringify(e[5], null, 2) + '',
    Me,
    ke,
    be,
    $e,
    me = (e[5] && e[5].on_chain) + '',
    de,
    Be,
    Le,
    tt,
    dt,
    pt,
    Ve,
    Ge,
    ht,
    he,
    nt,
    Re,
    Ae = JSON.stringify(e[8], null, 2) + '',
    ve,
    Ne,
    hi,
    Ct = e[1] != null && Uu(e),
    Oe = e[0] && e[0].length !== 0 && Wu(e)
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (i.innerHTML =
          '<h5 class="uk-margin-top uk-card-title uk-text-light uk-text-muted uk-text-uppercase">LOGS</h5>'),
        (o = E()),
        (s = m('div')),
        (a = m('div')),
        (c = m('span')),
        (c.textContent = 'ERRORS'),
        (h = E()),
        (f = m('div')),
        (p = m('button')),
        (g = E()),
        (b = m('button')),
        (v = E()),
        Ct && Ct.c(),
        (w = E()),
        ($ = m('hr')),
        (x = E()),
        (S = m('div')),
        (L = m('p')),
        Oe && Oe.c(),
        (N = E()),
        (B = m('br')),
        (F = E()),
        (R = m('hr')),
        (V = E()),
        (G = m('p')),
        (G.textContent = 'CLIENT STATE'),
        (j = E()),
        (Y = m('ul')),
        (z = m('li')),
        (W = T('is init: ')),
        (te = T(e[2])),
        (K = E()),
        (ee = m('li')),
        (ne = T('is connected: ')),
        (Z = T(e[3])),
        (I = E()),
        (Q = m('li')),
        (ie = T('is refreshing: ')),
        (ue = T(e[4])),
        (le = E()),
        (_e = m('li')),
        (Ce = T('signing account: ')),
        (Me = T(xe)),
        (ke = E()),
        (be = m('li')),
        ($e = T('is onchain: ')),
        (de = T(me)),
        (Be = E()),
        (Le = m('li')),
        (tt = T('can migrate: ')),
        (dt = T(e[6])),
        (pt = E()),
        (Ve = m('li')),
        (Ge = T('is account refreshed: ')),
        (ht = T(e[7])),
        (he = E()),
        (nt = m('li')),
        (Re = T('all accounts: ')),
        (ve = T(Ae)),
        y(i, 'class', 'uk-row'),
        y(c, 'class', 'uk-margin-small-right'),
        y(p, 'class', 'uk-margin-medium'),
        y(p, 'uk-icon', 'trash'),
        y(p, 'uk-tooltip', 'title: Clear Errors'),
        y(b, 'uk-icon', 'sign-out'),
        y(b, 'uk-tooltip', 'title: Exit Debug Mode'),
        y(f, 'class', 'uk-align-right'),
        y(a, 'class', 'uk-vertical-align-middle'),
        y(L, 'class', 'uk-text-break'),
        y(t, 'class', 'uk-card uk-card-default uk-card-body')
    },
    m(ze, kt) {
      M(ze, t, kt),
        u(t, i),
        u(t, o),
        u(t, s),
        u(s, a),
        u(a, c),
        u(a, h),
        u(a, f),
        u(f, p),
        u(f, g),
        u(f, b),
        u(s, v),
        Ct && Ct.m(s, null),
        u(t, w),
        u(t, $),
        u(t, x),
        u(t, S),
        u(S, L),
        Oe && Oe.m(L, null),
        u(L, N),
        u(L, B),
        u(t, F),
        u(t, R),
        u(t, V),
        u(t, G),
        u(t, j),
        u(t, Y),
        u(Y, z),
        u(z, W),
        u(z, te),
        u(Y, K),
        u(Y, ee),
        u(ee, ne),
        u(ee, Z),
        u(Y, I),
        u(Y, Q),
        u(Q, ie),
        u(Q, ue),
        u(Y, le),
        u(Y, _e),
        u(_e, Ce),
        u(_e, Me),
        u(Y, ke),
        u(Y, be),
        u(be, $e),
        u(be, de),
        u(Y, Be),
        u(Y, Le),
        u(Le, tt),
        u(Le, dt),
        u(Y, pt),
        u(Y, Ve),
        u(Ve, Ge),
        u(Ve, ht),
        u(Y, he),
        u(Y, nt),
        u(nt, Re),
        u(nt, ve),
        Ne || ((hi = [Ee(p, 'click', e[9]), Ee(b, 'click', e[10])]), (Ne = !0))
    },
    p(ze, [kt]) {
      ze[1] != null
        ? Ct
          ? Ct.p(ze, kt)
          : ((Ct = Uu(ze)), Ct.c(), Ct.m(s, null))
        : Ct && (Ct.d(1), (Ct = null)),
        ze[0] && ze[0].length !== 0
          ? Oe
            ? Oe.p(ze, kt)
            : ((Oe = Wu(ze)), Oe.c(), Oe.m(L, N))
          : Oe && (Oe.d(1), (Oe = null)),
        kt & 4 && O(te, ze[2]),
        kt & 8 && O(Z, ze[3]),
        kt & 16 && O(ue, ze[4]),
        kt & 32 && xe !== (xe = JSON.stringify(ze[5], null, 2) + '') && O(Me, xe),
        kt & 32 && me !== (me = (ze[5] && ze[5].on_chain) + '') && O(de, me),
        kt & 64 && O(dt, ze[6]),
        kt & 128 && O(ht, ze[7]),
        kt & 256 && Ae !== (Ae = JSON.stringify(ze[8], null, 2) + '') && O(ve, Ae)
    },
    i: ce,
    o: ce,
    d(ze) {
      ze && A(t), Ct && Ct.d(), Oe && Oe.d(), (Ne = !1), yt(hi)
    },
  }
}
function zy(e, t, i) {
  let o, s, a, c, h, f, p
  ae(e, Gi, ($) => i(2, (o = $))),
    ae(e, ai, ($) => i(3, (s = $))),
    ae(e, ln, ($) => i(4, (a = $))),
    ae(e, It, ($) => i(5, (c = $))),
    ae(e, Hs, ($) => i(6, (h = $))),
    ae(e, Mi, ($) => i(7, (f = $))),
    ae(e, In, ($) => i(8, (p = $)))
  let g = '',
    b = je(Es)
  return (
    Yh(async () => {
      zt.subscribe(($) => {
        i(0, (g = $))
      }),
        Es.subscribe(($) => {
          i(1, (b = $))
        })
    }),
    [g, b, o, s, a, c, h, f, p, () => T_(), () => Nf()]
  )
}
class $d extends we {
  constructor(t) {
    super(), ye(this, t, zy, Hy, ge, {})
  }
}
var Cd = { exports: {} }
/*! UIkit 3.17.11 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */ ;(function (
  e,
  t,
) {
  ;(function (i, o) {
    e.exports = o()
  })(Af, function () {
    function i(o) {
      i.installed ||
        o.icon.add({
          youtube:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M15,4.1c1,0.1,2.3,0,3,0.8c0.8,0.8,0.9,2.1,0.9,3.1C19,9.2,19,10.9,19,12c-0.1,1.1,0,2.4-0.5,3.4c-0.5,1.1-1.4,1.5-2.5,1.6 c-1.2,0.1-8.6,0.1-11,0c-1.1-0.1-2.4-0.1-3.2-1c-0.7-0.8-0.7-2-0.8-3C1,11.8,1,10.1,1,8.9c0-1.1,0-2.4,0.5-3.4C2,4.5,3,4.3,4.1,4.2 C5.3,4.1,12.6,4,15,4.1z M8,7.5v6l5.5-3L8,7.5z"/></svg>',
          yootheme:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="m16.15,5.48c-1.37,0-2.45.61-3.11,1.54-.66-.93-1.74-1.54-3.11-1.54-1.75,0-3.03,1-3.57,2.41v-2.22h-2.01v4.45c0,.85-.31,1.35-1.18,1.35s-1.18-.5-1.18-1.35v-4.45H0v4.86c0,.7.17,1.33.53,1.82.34.49.88.85,1.6,1v3.16h2.1v-3.16c1.28-.28,1.96-1.17,2.1-2.35.52,1.44,1.81,2.48,3.59,2.48,1.37,0,2.45-.61,3.11-1.54.66.93,1.74,1.54,3.11,1.54,2.37,0,3.85-1.82,3.85-4s-1.49-4-3.85-4Zm-6.22,5.99c-1.11,0-1.85-.72-1.85-1.99s.74-1.99,1.85-1.99,1.85.72,1.85,1.99-.74,1.99-1.85,1.99Zm6.22,0c-1.11,0-1.85-.72-1.85-1.99s.74-1.99,1.85-1.99,1.85.72,1.85,1.99-.74,1.99-1.85,1.99Z"/></svg>',
          yelp: '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M17.175,14.971c-0.112,0.77-1.686,2.767-2.406,3.054c-0.246,0.1-0.487,0.076-0.675-0.069	c-0.122-0.096-2.446-3.859-2.446-3.859c-0.194-0.293-0.157-0.682,0.083-0.978c0.234-0.284,0.581-0.393,0.881-0.276	c0.016,0.01,4.21,1.394,4.332,1.482c0.178,0.148,0.263,0.379,0.225,0.646L17.175,14.971L17.175,14.971z M11.464,10.789	c-0.203-0.307-0.199-0.666,0.009-0.916c0,0,2.625-3.574,2.745-3.657c0.203-0.135,0.452-0.141,0.69-0.025	c0.691,0.335,2.085,2.405,2.167,3.199v0.027c0.024,0.271-0.082,0.491-0.273,0.623c-0.132,0.083-4.43,1.155-4.43,1.155	c-0.322,0.096-0.68-0.06-0.882-0.381L11.464,10.789z M9.475,9.563C9.32,9.609,8.848,9.757,8.269,8.817c0,0-3.916-6.16-4.007-6.351	c-0.057-0.212,0.011-0.455,0.202-0.65C5.047,1.211,8.21,0.327,9.037,0.529c0.27,0.069,0.457,0.238,0.522,0.479	c0.047,0.266,0.433,5.982,0.488,7.264C10.098,9.368,9.629,9.517,9.475,9.563z M9.927,19.066c-0.083,0.225-0.273,0.373-0.54,0.421	c-0.762,0.13-3.15-0.751-3.647-1.342c-0.096-0.131-0.155-0.262-0.167-0.394c-0.011-0.095,0-0.189,0.036-0.272	c0.061-0.155,2.917-3.538,2.917-3.538c0.214-0.272,0.595-0.355,0.952-0.213c0.345,0.13,0.56,0.428,0.536,0.749	C10.014,14.479,9.977,18.923,9.927,19.066z M3.495,13.912c-0.235-0.009-0.444-0.148-0.568-0.382c-0.089-0.17-0.151-0.453-0.19-0.794	C2.63,11.701,2.761,10.144,3.07,9.648c0.145-0.226,0.357-0.345,0.592-0.336c0.154,0,4.255,1.667,4.255,1.667	c0.321,0.118,0.521,0.453,0.5,0.833c-0.023,0.37-0.236,0.655-0.551,0.738L3.495,13.912z"/></svg>',
          xing: '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M4.4,4.56 C4.24,4.56 4.11,4.61 4.05,4.72 C3.98,4.83 3.99,4.97 4.07,5.12 L5.82,8.16 L5.82,8.17 L3.06,13.04 C2.99,13.18 2.99,13.33 3.06,13.44 C3.12,13.55 3.24,13.62 3.4,13.62 L6,13.62 C6.39,13.62 6.57,13.36 6.71,13.12 C6.71,13.12 9.41,8.35 9.51,8.16 C9.49,8.14 7.72,5.04 7.72,5.04 C7.58,4.81 7.39,4.56 6.99,4.56 L4.4,4.56 L4.4,4.56 Z"/><path d="M15.3,1 C14.91,1 14.74,1.25 14.6,1.5 C14.6,1.5 9.01,11.42 8.82,11.74 C8.83,11.76 12.51,18.51 12.51,18.51 C12.64,18.74 12.84,19 13.23,19 L15.82,19 C15.98,19 16.1,18.94 16.16,18.83 C16.23,18.72 16.23,18.57 16.16,18.43 L12.5,11.74 L12.5,11.72 L18.25,1.56 C18.32,1.42 18.32,1.27 18.25,1.16 C18.21,1.06 18.08,1 17.93,1 L15.3,1 L15.3,1 Z"/></svg>',
          world:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" d="M1,10.5 L19,10.5"/><path fill="none" stroke="#000" d="M2.35,15.5 L17.65,15.5"/><path fill="none" stroke="#000" d="M2.35,5.5 L17.523,5.5"/><path fill="none" stroke="#000" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z"/><circle fill="none" stroke="#000" cx="10" cy="10.5" r="9"/></svg>',
          wordpress:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10,0.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5c5.2,0,9.5-4.3,9.5-9.5S15.2,0.5,10,0.5L10,0.5L10,0.5z M15.6,3.9h-0.1 c-0.8,0-1.4,0.7-1.4,1.5c0,0.7,0.4,1.3,0.8,1.9c0.3,0.6,0.7,1.3,0.7,2.3c0,0.7-0.3,1.5-0.6,2.7L14.1,15l-3-8.9 c0.5,0,0.9-0.1,0.9-0.1C12.5,6,12.5,5.3,12,5.4c0,0-1.3,0.1-2.2,0.1C9,5.5,7.7,5.4,7.7,5.4C7.2,5.3,7.2,6,7.6,6c0,0,0.4,0.1,0.9,0.1 l1.3,3.5L8,15L5,6.1C5.5,6.1,5.9,6,5.9,6C6.4,6,6.3,5.3,5.9,5.4c0,0-1.3,0.1-2.2,0.1c-0.2,0-0.3,0-0.5,0c1.5-2.2,4-3.7,6.9-3.7 C12.2,1.7,14.1,2.6,15.6,3.9L15.6,3.9L15.6,3.9z M2.5,6.6l3.9,10.8c-2.7-1.3-4.6-4.2-4.6-7.4C1.8,8.8,2,7.6,2.5,6.6L2.5,6.6L2.5,6.6 z M10.2,10.7l2.5,6.9c0,0,0,0.1,0.1,0.1C11.9,18,11,18.2,10,18.2c-0.8,0-1.6-0.1-2.3-0.3L10.2,10.7L10.2,10.7L10.2,10.7z M14.2,17.1 l2.5-7.3c0.5-1.2,0.6-2.1,0.6-2.9c0-0.3,0-0.6-0.1-0.8c0.6,1.2,1,2.5,1,4C18.3,13,16.6,15.7,14.2,17.1L14.2,17.1L14.2,17.1z"/></svg>',
          whatsapp:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M16.7,3.3c-1.8-1.8-4.1-2.8-6.7-2.8c-5.2,0-9.4,4.2-9.4,9.4c0,1.7,0.4,3.3,1.3,4.7l-1.3,4.9l5-1.3c1.4,0.8,2.9,1.2,4.5,1.2 l0,0l0,0c5.2,0,9.4-4.2,9.4-9.4C19.5,7.4,18.5,5,16.7,3.3 M10.1,17.7L10.1,17.7c-1.4,0-2.8-0.4-4-1.1l-0.3-0.2l-3,0.8l0.8-2.9 l-0.2-0.3c-0.8-1.2-1.2-2.7-1.2-4.2c0-4.3,3.5-7.8,7.8-7.8c2.1,0,4.1,0.8,5.5,2.3c1.5,1.5,2.3,3.4,2.3,5.5 C17.9,14.2,14.4,17.7,10.1,17.7 M14.4,11.9c-0.2-0.1-1.4-0.7-1.6-0.8c-0.2-0.1-0.4-0.1-0.5,0.1c-0.2,0.2-0.6,0.8-0.8,0.9 c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5C8,8.8,8.1,8.7,8.2,8.5 c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.2,0-0.3,0-0.4C8.4,7.6,7.9,6.5,7.7,6C7.5,5.5,7.3,5.6,7.2,5.6c-0.1,0-0.3,0-0.4,0 c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.8,0.8-0.8,2c0,1.2,0.8,2.3,1,2.4c0.1,0.2,1.7,2.5,4,3.5c0.6,0.2,1,0.4,1.3,0.5 c0.6,0.2,1.1,0.2,1.5,0.1c0.5-0.1,1.4-0.6,1.6-1.1c0.2-0.5,0.2-1,0.1-1.1C14.8,12.1,14.6,12,14.4,11.9"/></svg>',
          warning:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="14" r="1"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><path d="M10.97,7.72 C10.85,9.54 10.56,11.29 10.56,11.29 C10.51,11.87 10.27,12 9.99,12 C9.69,12 9.49,11.87 9.43,11.29 C9.43,11.29 9.16,9.54 9.03,7.72 C8.96,6.54 9.03,6 9.03,6 C9.03,5.45 9.46,5.02 9.99,5 C10.53,5.01 10.97,5.44 10.97,6 C10.97,6 11.04,6.54 10.97,7.72 L10.97,7.72 Z"/></svg>',
          vimeo:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M2.065,7.59C1.84,7.367,1.654,7.082,1.468,6.838c-0.332-0.42-0.137-0.411,0.274-0.772c1.026-0.91,2.004-1.896,3.127-2.688 c1.017-0.713,2.365-1.173,3.286-0.039c0.849,1.045,0.869,2.629,1.084,3.891c0.215,1.309,0.421,2.648,0.88,3.901 c0.127,0.352,0.37,1.018,0.81,1.074c0.567,0.078,1.145-0.917,1.408-1.289c0.684-0.987,1.611-2.317,1.494-3.587 c-0.115-1.349-1.572-1.095-2.482-0.773c0.146-1.514,1.555-3.216,2.912-3.792c1.439-0.597,3.579-0.587,4.302,1.036 c0.772,1.759,0.078,3.802-0.763,5.396c-0.918,1.731-2.1,3.333-3.363,4.829c-1.114,1.329-2.432,2.787-4.093,3.422 c-1.897,0.723-3.021-0.686-3.667-2.318c-0.705-1.777-1.056-3.771-1.565-5.621C4.898,8.726,4.644,7.836,4.136,7.191 C3.473,6.358,2.72,7.141,2.065,7.59C1.977,7.502,2.115,7.551,2.065,7.59L2.065,7.59z"/></svg>',
          'video-camera':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" points="19.5 5.9 19.5 14.1 14.5 10.4 14.5 15.5 .5 15.5 .5 4.5 14.5 4.5 14.5 9.6 19.5 5.9"/></svg>',
          users:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"/></svg>',
          user: '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.9" cy="6.4" r="4.4"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2"/></svg>',
          upload:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="5 8 9.5 3.5 14 8"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="15" x2="9.5" y2="4"/></svg>',
          unlock:
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" x="3.5" y="8.5" width="13" height="10"/><path fill="none" stroke="#000" d="M6.5,8.5 L6.5,4.9 C6.5,3 8.1,1.5 10,1.5 C11.9,1.5 13.5,3 13.5,4.9"/></svg>',
          uikit:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="14.4,3.1 11.3,5.1 15,7.3 15,12.9 10,15.7 5,12.9 5,8.5 2,6.8 2,14.8 9.9,19.5 18,14.8 18,5.3"/><polygon points="9.8,4.2 6.7,2.4 9.8,0.4 12.9,2.3"/></svg>',
          twitter:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M19,4.74 C18.339,5.029 17.626,5.229 16.881,5.32 C17.644,4.86 18.227,4.139 18.503,3.28 C17.79,3.7 17.001,4.009 16.159,4.17 C15.485,3.45 14.526,3 13.464,3 C11.423,3 9.771,4.66 9.771,6.7 C9.771,6.99 9.804,7.269 9.868,7.539 C6.795,7.38 4.076,5.919 2.254,3.679 C1.936,4.219 1.754,4.86 1.754,5.539 C1.754,6.82 2.405,7.95 3.397,8.61 C2.79,8.589 2.22,8.429 1.723,8.149 L1.723,8.189 C1.723,9.978 2.997,11.478 4.686,11.82 C4.376,11.899 4.049,11.939 3.713,11.939 C3.475,11.939 3.245,11.919 3.018,11.88 C3.49,13.349 4.852,14.419 6.469,14.449 C5.205,15.429 3.612,16.019 1.882,16.019 C1.583,16.019 1.29,16.009 1,15.969 C2.635,17.019 4.576,17.629 6.662,17.629 C13.454,17.629 17.17,12 17.17,7.129 C17.17,6.969 17.166,6.809 17.157,6.649 C17.879,6.129 18.504,5.478 19,4.74"/></svg>',
          twitch:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M5.23,1,2,4.23V15.85H5.88v3.23L9.1,15.85h2.59L17.5,10V1Zm11,8.4L13.62,12H11L8.78,14.24V12H5.88V2.29H16.21Z"/><rect x="12.98" y="4.55" width="1.29" height="3.88"/><rect x="9.43" y="4.55" width="1.29" height="3.88"/></svg>',
          tv: '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="7" y="16" width="6" height="1"/><rect fill="none" stroke="#000" x=".5" y="3.5" width="19" height="11"/></svg>',
          tumblr:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M6.885,8.598c0,0,0,3.393,0,4.996c0,0.282,0,0.66,0.094,0.942c0.377,1.509,1.131,2.545,2.545,3.11 c1.319,0.472,2.356,0.472,3.676,0c0.565-0.188,1.132-0.659,1.132-0.659l-0.849-2.263c0,0-1.036,0.378-1.603,0.283 c-0.565-0.094-1.226-0.66-1.226-1.508c0-1.603,0-4.902,0-4.902h2.828V5.771h-2.828V2H8.205c0,0-0.094,0.66-0.188,0.942 C7.828,3.791,7.262,4.733,6.603,5.394C5.848,6.147,5,6.43,5,6.43v2.168H6.885z"/></svg>',
          tripadvisor:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M19.021,7.866C19.256,6.862,20,5.854,20,5.854h-3.346C14.781,4.641,12.504,4,9.98,4C7.363,4,4.999,4.651,3.135,5.876H0	c0,0,0.738,0.987,0.976,1.988c-0.611,0.837-0.973,1.852-0.973,2.964c0,2.763,2.249,5.009,5.011,5.009	c1.576,0,2.976-0.737,3.901-1.879l1.063,1.599l1.075-1.615c0.475,0.611,1.1,1.111,1.838,1.451c1.213,0.547,2.574,0.612,3.825,0.15	c2.589-0.963,3.913-3.852,2.964-6.439c-0.175-0.463-0.4-0.876-0.675-1.238H19.021z M16.38,14.594	c-1.002,0.371-2.088,0.328-3.06-0.119c-0.688-0.317-1.252-0.817-1.657-1.438c-0.164-0.25-0.313-0.52-0.417-0.811	c-0.124-0.328-0.186-0.668-0.217-1.014c-0.063-0.689,0.037-1.396,0.339-2.043c0.448-0.971,1.251-1.71,2.25-2.079	c2.075-0.765,4.375,0.3,5.14,2.366c0.762,2.066-0.301,4.37-2.363,5.134L16.38,14.594L16.38,14.594z M8.322,13.066	c-0.72,1.059-1.935,1.76-3.309,1.76c-2.207,0-4.001-1.797-4.001-3.996c0-2.203,1.795-4.002,4.001-4.002	c2.204,0,3.999,1.8,3.999,4.002c0,0.137-0.024,0.261-0.04,0.396c-0.067,0.678-0.284,1.313-0.648,1.853v-0.013H8.322z M2.472,10.775	c0,1.367,1.112,2.479,2.476,2.479c1.363,0,2.472-1.11,2.472-2.479c0-1.359-1.11-2.468-2.472-2.468	C3.584,8.306,2.473,9.416,2.472,10.775L2.472,10.775z M12.514,10.775c0,1.367,1.104,2.479,2.471,2.479	c1.363,0,2.474-1.108,2.474-2.479c0-1.359-1.11-2.468-2.474-2.468c-1.364,0-2.477,1.109-2.477,2.468H12.514z M3.324,10.775	c0-0.893,0.726-1.618,1.614-1.618c0.889,0,1.625,0.727,1.625,1.618c0,0.898-0.725,1.627-1.625,1.627	c-0.901,0-1.625-0.729-1.625-1.627H3.324z M13.354,10.775c0-0.893,0.726-1.618,1.627-1.618c0.886,0,1.61,0.727,1.61,1.618	c0,0.898-0.726,1.627-1.626,1.627s-1.625-0.729-1.625-1.627H13.354z M9.977,4.875c1.798,0,3.425,0.324,4.849,0.968	c-0.535,0.015-1.061,0.108-1.586,0.3c-1.264,0.463-2.264,1.388-2.815,2.604c-0.262,0.551-0.398,1.133-0.448,1.72	C9.79,7.905,7.677,5.873,5.076,5.82C6.501,5.208,8.153,4.875,9.94,4.875H9.977z"/></svg>',
          'triangle-up':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="5 13 10 8 15 13"/></svg>',
          'triangle-right':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="8 5 13 10 8 15"/></svg>',
          'triangle-left':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="12 5 7 10 12 15"/></svg>',
          'triangle-down':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="5 7 15 7 10 12"/></svg>',
          trash:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"/><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"/><rect x="8" y="7" width="1" height="9"/><rect x="11" y="7" width="1" height="9"/><rect x="2" y="3" width="16" height="1"/></svg>',
          tiktok:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M17.24,6V8.82a6.79,6.79,0,0,1-4-1.28v5.81A5.26,5.26,0,1,1,8,8.1a4.36,4.36,0,0,1,.72.05v2.9A2.57,2.57,0,0,0,7.64,11a2.4,2.4,0,1,0,2.77,2.38V2h2.86a4,4,0,0,0,1.84,3.38A4,4,0,0,0,17.24,6Z"/></svg>',
          thumbnails:
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5"/><rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5"/><rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5"/></svg>',
          tag: '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.5,3.71 L17.5,7.72 C17.5,7.96 17.4,8.2 17.21,8.39 L8.39,17.2 C7.99,17.6 7.33,17.6 6.93,17.2 L2.8,13.07 C2.4,12.67 2.4,12.01 2.8,11.61 L11.61,2.8 C11.81,2.6 12.08,2.5 12.34,2.5 L16.19,2.5 C16.52,2.5 16.86,2.63 17.11,2.88 C17.35,3.11 17.48,3.4 17.5,3.71 L17.5,3.71 Z"/><circle cx="14" cy="6" r="1"/></svg>',
          tablet:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" d="M5,18.5 C4.2,18.5 3.5,17.8 3.5,17 L3.5,3 C3.5,2.2 4.2,1.5 5,1.5 L16,1.5 C16.8,1.5 17.5,2.2 17.5,3 L17.5,17 C17.5,17.8 16.8,18.5 16,18.5 L5,18.5 L5,18.5 L5,18.5 Z"/><circle cx="10.5" cy="16.3" r=".8"/></svg>',
          'tablet-landscape':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" d="M1.5,5 C1.5,4.2 2.2,3.5 3,3.5 L17,3.5 C17.8,3.5 18.5,4.2 18.5,5 L18.5,16 C18.5,16.8 17.8,17.5 17,17.5 L3,17.5 C2.2,17.5 1.5,16.8 1.5,16 L1.5,5 L1.5,5 L1.5,5 Z"/><circle cx="3.7" cy="10.5" r=".8"/></svg>',
          table:
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="1" y="3" width="18" height="1"/><rect x="1" y="7" width="18" height="1"/><rect x="1" y="11" width="18" height="1"/><rect x="1" y="15" width="18" height="1"/></svg>',
          strikethrough:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M6,13.02 L6.65,13.02 C7.64,15.16 8.86,16.12 10.41,16.12 C12.22,16.12 12.92,14.93 12.92,13.89 C12.92,12.55 11.99,12.03 9.74,11.23 C8.05,10.64 6.23,10.11 6.23,7.83 C6.23,5.5 8.09,4.09 10.4,4.09 C11.44,4.09 12.13,4.31 12.72,4.54 L13.33,4 L13.81,4 L13.81,7.59 L13.16,7.59 C12.55,5.88 11.52,4.89 10.07,4.89 C8.84,4.89 7.89,5.69 7.89,7.03 C7.89,8.29 8.89,8.78 10.88,9.45 C12.57,10.03 14.38,10.6 14.38,12.91 C14.38,14.75 13.27,16.93 10.18,16.93 C9.18,16.93 8.17,16.69 7.46,16.39 L6.52,17 L6,17 L6,13.02 L6,13.02 Z"/><rect x="3" y="10" width="15" height="1"/></svg>',
          star: '<svg width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"/></svg>',
          soundcloud:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M17.2,9.4c-0.4,0-0.8,0.1-1.101,0.2c-0.199-2.5-2.399-4.5-5-4.5c-0.6,0-1.2,0.1-1.7,0.3C9.2,5.5,9.1,5.6,9.1,5.6V15h8 c1.601,0,2.801-1.2,2.801-2.8C20,10.7,18.7,9.4,17.2,9.4L17.2,9.4z"/><rect x="6" y="6.5" width="1.5" height="8.5"/><rect x="3" y="8" width="1.5" height="7"/><rect y="10" width="1.5" height="5"/></svg>',
          social:
            '<svg width="20" height="20" viewBox="0 0 20 20"><line fill="none" stroke="#000" stroke-width="1.1" x1="13.4" y1="14" x2="6.3" y2="10.7"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13.5" y1="5.5" x2="6.5" y2="8.8"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="4.6" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="14.8" r="2.3"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="4.5" cy="9.8" r="2.3"/></svg>',
          'sign-out':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="13.1 13.4 12.5 12.8 15.28 10 8 10 8 9 15.28 9 12.5 6.2 13.1 5.62 17 9.5"/><polygon points="13 2 3 2 3 17 13 17 13 16 4 16 4 3 13 3"/></svg>',
          'sign-in':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="7 2 17 2 17 17 7 17 7 16 16 16 16 3 7 3"/><polygon points="9.1 13.4 8.5 12.8 11.28 10 4 10 4 9 11.28 9 8.5 6.2 9.1 5.62 13 9.5"/></svg>',
          shrink:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="11 4 12 4 12 8 16 8 16 9 11 9"/><polygon points="4 11 9 11 9 16 8 16 8 12 4 12"/><path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12"/></svg>',
          settings:
            '<svg width="20" height="20" viewBox="0 0 20 20"><ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15"/><ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15"/><circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15"/><rect x="1" y="3" width="3" height="1"/><rect x="10" y="3" width="8" height="1"/><rect x="1" y="9" width="8" height="1"/><rect x="15" y="9" width="3" height="1"/><rect x="1" y="15" width="3" height="1"/><rect x="10" y="15" width="8" height="1"/></svg>',
          server:
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="3" y="3" width="1" height="2"/><rect x="5" y="3" width="1" height="2"/><rect x="7" y="3" width="1" height="2"/><rect x="16" y="3" width="1" height="1"/><rect x="16" y="10" width="1" height="1"/><circle fill="none" stroke="#000" cx="9.9" cy="17.4" r="1.4"/><rect x="3" y="10" width="1" height="2"/><rect x="5" y="10" width="1" height="2"/><rect x="9.5" y="14" width="1" height="2"/><rect x="3" y="17" width="6" height="1"/><rect x="11" y="17" width="6" height="1"/><rect fill="none" stroke="#000" x="1.5" y="1.5" width="17" height="5"/><rect fill="none" stroke="#000" x="1.5" y="8.5" width="17" height="5"/></svg>',
          search:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',
          rss: '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="3.12" cy="16.8" r="1.85"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,8.2 C1.78,8.18 2.06,8.16 2.35,8.16 C7.57,8.16 11.81,12.37 11.81,17.57 C11.81,17.89 11.79,18.19 11.76,18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,2.52 C1.78,2.51 2.06,2.5 2.35,2.5 C10.72,2.5 17.5,9.24 17.5,17.57 C17.5,17.89 17.49,18.19 17.47,18.5"/></svg>',
          reply:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"/></svg>',
          refresh:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.1" d="M17.08,11.15 C17.09,11.31 17.1,11.47 17.1,11.64 C17.1,15.53 13.94,18.69 10.05,18.69 C6.16,18.68 3,15.53 3,11.63 C3,7.74 6.16,4.58 10.05,4.58 C10.9,4.58 11.71,4.73 12.46,5"/><polyline fill="none" stroke="#000" points="9.9 2 12.79 4.89 9.79 7.9"/></svg>',
          reddit:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M19 9.05a2.56 2.56 0 0 0-2.56-2.56 2.59 2.59 0 0 0-1.88.82 10.63 10.63 0 0 0-4.14-1v-.08c.58-1.62 1.58-3.89 2.7-4.1.38-.08.77.12 1.19.57a1.15 1.15 0 0 0-.06.37 1.48 1.48 0 1 0 1.51-1.45 1.43 1.43 0 0 0-.76.19A2.29 2.29 0 0 0 12.91 1c-2.11.43-3.39 4.38-3.63 5.19 0 0 0 .11-.06.11a10.65 10.65 0 0 0-3.75 1A2.56 2.56 0 0 0 1 9.05a2.42 2.42 0 0 0 .72 1.76A5.18 5.18 0 0 0 1.24 13c0 3.66 3.92 6.64 8.73 6.64s8.74-3 8.74-6.64a5.23 5.23 0 0 0-.46-2.13A2.58 2.58 0 0 0 19 9.05zm-16.88 0a1.44 1.44 0 0 1 2.27-1.19 7.68 7.68 0 0 0-2.07 1.91 1.33 1.33 0 0 1-.2-.72zM10 18.4c-4.17 0-7.55-2.4-7.55-5.4S5.83 7.53 10 7.53 17.5 10 17.5 13s-3.38 5.4-7.5 5.4zm7.69-8.61a7.62 7.62 0 0 0-2.09-1.91 1.41 1.41 0 0 1 .84-.28 1.47 1.47 0 0 1 1.44 1.45 1.34 1.34 0 0 1-.21.72z"/><path d="M6.69 12.58a1.39 1.39 0 1 1 1.39-1.39 1.38 1.38 0 0 1-1.38 1.39z"/><path d="M14.26 11.2a1.39 1.39 0 1 1-1.39-1.39 1.39 1.39 0 0 1 1.39 1.39z"/><path d="M13.09 14.88a.54.54 0 0 1-.09.77 5.3 5.3 0 0 1-3.26 1.19 5.61 5.61 0 0 1-3.4-1.22.55.55 0 1 1 .73-.83 4.09 4.09 0 0 0 5.25 0 .56.56 0 0 1 .77.09z"/></svg>',
          receiver:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611"/></svg>',
          'quote-right':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M17.27,7.79 C17.27,9.45 16.97,10.43 15.99,12.02 C14.98,13.64 13,15.23 11.56,15.97 L11.1,15.08 C12.34,14.2 13.14,13.51 14.02,11.82 C14.27,11.34 14.41,10.92 14.49,10.54 C14.3,10.58 14.09,10.6 13.88,10.6 C12.06,10.6 10.59,9.12 10.59,7.3 C10.59,5.48 12.06,4 13.88,4 C15.39,4 16.67,5.02 17.05,6.42 C17.19,6.82 17.27,7.27 17.27,7.79 L17.27,7.79 Z"/><path d="M8.68,7.79 C8.68,9.45 8.38,10.43 7.4,12.02 C6.39,13.64 4.41,15.23 2.97,15.97 L2.51,15.08 C3.75,14.2 4.55,13.51 5.43,11.82 C5.68,11.34 5.82,10.92 5.9,10.54 C5.71,10.58 5.5,10.6 5.29,10.6 C3.47,10.6 2,9.12 2,7.3 C2,5.48 3.47,4 5.29,4 C6.8,4 8.08,5.02 8.46,6.42 C8.6,6.82 8.68,7.27 8.68,7.79 L8.68,7.79 Z"/></svg>',
          question:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><circle cx="9.99" cy="14.24" r="1.05"/><path fill="none" stroke="#000" stroke-width="1.2" d="m7.72,7.61c0-3.04,4.55-3.06,4.55-.07,0,.95-.91,1.43-1.49,2.03-.48.49-.72.98-.78,1.65-.01.13-.02.24-.02.35"/></svg>',
          push: '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="12.15,4 9.5,1.4 6.85,4 6.15,3.3 9.5,0 12.85,3.3"/><line fill="none" stroke="#000" x1="9.5" y1="10" x2="9.5" y2="1"/><polyline fill="none" stroke="#000" points="6 5.5 3.5 5.5 3.5 18.5 15.5 18.5 15.5 5.5 13 5.5"/></svg>',
          pull: '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="6.85,8 9.5,10.6 12.15,8 12.85,8.7 9.5,12 6.15,8.7"/><line fill="none" stroke="#000" x1="9.5" y1="11" x2="9.5" y2="2"/><polyline fill="none" stroke="#000" points="6,5.5 3.5,5.5 3.5,18.5 15.5,18.5 15.5,5.5 13,5.5"/></svg>',
          print:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="4.5 13.5 1.5 13.5 1.5 6.5 18.5 6.5 18.5 13.5 15.5 13.5"/><polyline fill="none" stroke="#000" points="15.5 6.5 15.5 2.5 4.5 2.5 4.5 6.5"/><rect fill="none" stroke="#000" width="11" height="6" x="4.5" y="11.5"/><rect width="8" height="1" x="6" y="13"/><rect width="8" height="1" x="6" y="15"/></svg>',
          plus: '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="9" y="1" width="1" height="17"/><rect x="1" y="9" width="17" height="1"/></svg>',
          'plus-circle':
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',
          play: '<svg width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" points="6.5,5 14.5,10 6.5,15"/></svg>',
          'play-circle':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" stroke-width="1.1" points="8.5 7 13.5 10 8.5 13"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',
          pinterest:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10.21,1 C5.5,1 3,4.16 3,7.61 C3,9.21 3.85,11.2 5.22,11.84 C5.43,11.94 5.54,11.89 5.58,11.69 C5.62,11.54 5.8,10.8 5.88,10.45 C5.91,10.34 5.89,10.24 5.8,10.14 C5.36,9.59 5,8.58 5,7.65 C5,5.24 6.82,2.91 9.93,2.91 C12.61,2.91 14.49,4.74 14.49,7.35 C14.49,10.3 13,12.35 11.06,12.35 C9.99,12.35 9.19,11.47 9.44,10.38 C9.75,9.08 10.35,7.68 10.35,6.75 C10.35,5.91 9.9,5.21 8.97,5.21 C7.87,5.21 6.99,6.34 6.99,7.86 C6.99,8.83 7.32,9.48 7.32,9.48 C7.32,9.48 6.24,14.06 6.04,14.91 C5.7,16.35 6.08,18.7 6.12,18.9 C6.14,19.01 6.26,19.05 6.33,18.95 C6.44,18.81 7.74,16.85 8.11,15.44 C8.24,14.93 8.79,12.84 8.79,12.84 C9.15,13.52 10.19,14.09 11.29,14.09 C14.58,14.09 16.96,11.06 16.96,7.3 C16.94,3.7 14,1 10.21,1"/></svg>',
          phone:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" d="M15.5,17 C15.5,17.8 14.8,18.5 14,18.5 L7,18.5 C6.2,18.5 5.5,17.8 5.5,17 L5.5,3 C5.5,2.2 6.2,1.5 7,1.5 L14,1.5 C14.8,1.5 15.5,2.2 15.5,3 L15.5,17 L15.5,17 L15.5,17 Z"/><circle cx="10.5" cy="16.5" r=".8"/></svg>',
          'phone-landscape':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" d="M17,5.5 C17.8,5.5 18.5,6.2 18.5,7 L18.5,14 C18.5,14.8 17.8,15.5 17,15.5 L3,15.5 C2.2,15.5 1.5,14.8 1.5,14 L1.5,7 C1.5,6.2 2.2,5.5 3,5.5 L17,5.5 L17,5.5 L17,5.5 Z"/><circle cx="3.8" cy="10.5" r=".8"/></svg>',
          pencil:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z"/><path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148"/></svg>',
          'paint-bucket':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.1" d="m6.42,2.16l5.28,5.28"/><path d="m18.49,11.83s1.51,2.06,1.51,3.36c0,.92-.76,1.64-1.51,1.64h0c-.75,0-1.49-.72-1.49-1.64,0-1.3,1.49-3.36,1.49-3.36h0Z"/><line fill="none" stroke="#000" x1="1.26" y1="10.5" x2="16" y2="10.5"/><polygon fill="none" stroke="#000" stroke-width="1.1" points="10.2 1.55 17.6 8.93 8.08 18.45 .7 11.07 10.2 1.55"/></svg>',
          pagekit:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="3,1 17,1 17,16 10,16 10,13 14,13 14,4 6,4 6,16 10,16 10,19 3,19"/></svg>',
          nut: '<svg width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" points="2.5,5.7 10,1.3 17.5,5.7 17.5,14.3 10,18.7 2.5,14.3"/><circle fill="none" stroke="#000" cx="10" cy="10" r="3.5"/></svg>',
          move: '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="4,5 1,5 1,9 2,9 2,6 4,6"/><polygon points="1,16 2,16 2,18 4,18 4,19 1,19"/><polygon points="14,16 14,19 11,19 11,18 13,18 13,16"/><rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13"/><rect x="1" y="11" width="1" height="3"/><rect x="6" y="18" width="3" height="1"/></svg>',
          more: '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="3" cy="10" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="17" cy="10" r="2"/></svg>',
          'more-vertical':
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="3" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
          minus:
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect height="1" width="18" y="9" x="1"/></svg>',
          'minus-circle':
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9"/><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5"/></svg>',
          microsoft:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="m2,2h7.58v7.58H2V2Zm8.42,0h7.58v7.58h-7.58V2ZM2,10.42h7.58v7.58H2v-7.58Zm8.42,0h7.58v7.58h-7.58"/></svg>',
          microphone:
            '<svg width="20" height="20" viewBox="0 0 20 20"><line fill="none" stroke="#000" x1="10" x2="10" y1="16.44" y2="18.5"/><line fill="none" stroke="#000" x1="7" x2="13" y1="18.5" y2="18.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.5 4.89v5.87a3.5 3.5 0 0 1-7 0V4.89a3.5 3.5 0 0 1 7 0z"/><path fill="none" stroke="#000" stroke-width="1.1" d="M15.5 10.36V11a5.5 5.5 0 0 1-11 0v-.6"/></svg>',
          menu: '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="1"/><rect x="2" y="9" width="16" height="1"/><rect x="2" y="14" width="16" height="1"/></svg>',
          mastodon:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="m18.5,6.87c0-3.95-2.59-5.11-2.59-5.11-1.31-.6-3.55-.85-5.88-.87h-.06c-2.33.02-4.57.27-5.88.87,0,0-2.59,1.16-2.59,5.11,0,.91-.02,1.99.01,3.14.09,3.87.71,7.68,4.28,8.62,1.65.44,3.06.53,4.2.47,2.07-.11,3.23-.74,3.23-.74l-.07-1.5s-1.48.47-3.14.41c-1.64-.06-3.38-.18-3.64-2.2-.02-.18-.04-.37-.04-.57,0,0,1.61.39,3.66.49,1.25.06,2.42-.07,3.61-.22,2.28-.27,4.27-1.68,4.52-2.97.39-2.02.36-4.94.36-4.94Zm-3.05,5.09h-1.9v-4.65c0-.98-.41-1.48-1.24-1.48-.91,0-1.37.59-1.37,1.76v2.54h-1.89v-2.54c0-1.17-.46-1.76-1.37-1.76-.82,0-1.24.5-1.24,1.48v4.65h-1.9v-4.79c0-.98.25-1.76.75-2.33.52-.58,1.19-.87,2.03-.87.97,0,1.71.37,2.19,1.12l.47.79.47-.79c.49-.75,1.22-1.12,2.19-1.12.84,0,1.51.29,2.03.87.5.58.75,1.35.75,2.33v4.79Z"/></svg>',
          mail: '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5"/><path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z"/></svg>',
          lock: '<svg width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" height="10" width="13" y="8.5" x="3.5"/><path fill="none" stroke="#000" d="M6.5,8 L6.5,4.88 C6.5,3.01 8.07,1.5 10,1.5 C11.93,1.5 13.5,3.01 13.5,4.88 L13.5,8"/></svg>',
          location:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z"/><circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3"/></svg>',
          list: '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="6" y="4" width="12" height="1"/><rect x="6" y="9" width="12" height="1"/><rect x="6" y="14" width="12" height="1"/><rect x="2" y="4" width="2" height="1"/><rect x="2" y="9" width="2" height="1"/><rect x="2" y="14" width="2" height="1"/></svg>',
          linkedin:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M5.77,17.89 L5.77,7.17 L2.21,7.17 L2.21,17.89 L5.77,17.89 L5.77,17.89 Z M3.99,5.71 C5.23,5.71 6.01,4.89 6.01,3.86 C5.99,2.8 5.24,2 4.02,2 C2.8,2 2,2.8 2,3.85 C2,4.88 2.77,5.7 3.97,5.7 L3.99,5.7 L3.99,5.71 L3.99,5.71 Z"/><path d="M7.75,17.89 L11.31,17.89 L11.31,11.9 C11.31,11.58 11.33,11.26 11.43,11.03 C11.69,10.39 12.27,9.73 13.26,9.73 C14.55,9.73 15.06,10.71 15.06,12.15 L15.06,17.89 L18.62,17.89 L18.62,11.74 C18.62,8.45 16.86,6.92 14.52,6.92 C12.6,6.92 11.75,7.99 11.28,8.73 L11.3,8.73 L11.3,7.17 L7.75,7.17 C7.79,8.17 7.75,17.89 7.75,17.89 L7.75,17.89 L7.75,17.89 Z"/></svg>',
          link: '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.1" d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375"/><path fill="none" stroke="#000" stroke-width="1.1" d="M7.925,11.875 L11.925,7.975"/></svg>',
          lifesaver:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" cx="10" cy="10" r="9"/><circle fill="none" stroke="#000" cx="10" cy="10" r="5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="5.17" y1="2.39" x2="8.11" y2="5.33"/><line fill="none" stroke="#000" stroke-width="1.1" x1="5.33" y1="8.11" x2="2.39" y2="5.17"/><line fill="none" stroke="#000" stroke-width="1.1" x1="14.83" y1="17.61" x2="11.89" y2="14.67"/><line fill="none" stroke="#000" stroke-width="1.1" x1="14.67" y1="11.89" x2="17.61" y2="14.83"/><line fill="none" stroke="#000" stroke-width="1.1" x1="17.61" y1="5.17" x2="14.67" y2="8.11"/><line fill="none" stroke="#000" stroke-width="1.1" x1="11.89" y1="5.33" x2="14.83" y2="2.39"/><line fill="none" stroke="#000" stroke-width="1.1" x1="8.11" y1="14.67" x2="5.17" y2="17.61"/><line fill="none" stroke="#000" stroke-width="1.1" x1="2.39" y1="14.83" x2="5.33" y2="11.89"/></svg>',
          laptop:
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect y="16" width="20" height="1"/><rect fill="none" stroke="#000" x="2.5" y="4.5" width="15" height="10"/></svg>',
          joomla:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M7.8,13.4l1.7-1.7L5.9,8c-0.6-0.5-0.6-1.5,0-2c0.6-0.6,1.4-0.6,2,0l1.7-1.7c-1-1-2.3-1.3-3.6-1C5.8,2.2,4.8,1.4,3.7,1.4 c-1.3,0-2.3,1-2.3,2.3c0,1.1,0.8,2,1.8,2.3c-0.4,1.3-0.1,2.8,1,3.8L7.8,13.4L7.8,13.4z"/><path d="M10.2,4.3c1-1,2.5-1.4,3.8-1c0.2-1.1,1.1-2,2.3-2c1.3,0,2.3,1,2.3,2.3c0,1.2-0.9,2.2-2,2.3c0.4,1.3,0,2.8-1,3.8L13.9,8 c0.6-0.5,0.6-1.5,0-2c-0.5-0.6-1.5-0.6-2,0L8.2,9.7L6.5,8"/><path d="M14.1,16.8c-1.3,0.4-2.8,0.1-3.8-1l1.7-1.7c0.6,0.6,1.5,0.6,2,0c0.5-0.6,0.6-1.5,0-2l-3.7-3.7L12,6.7l3.7,3.7 c1,1,1.3,2.4,1,3.6c1.1,0.2,2,1.1,2,2.3c0,1.3-1,2.3-2.3,2.3C15.2,18.6,14.3,17.8,14.1,16.8"/><path d="M13.2,12.2l-3.7,3.7c-1,1-2.4,1.3-3.6,1c-0.2,1-1.2,1.8-2.2,1.8c-1.3,0-2.3-1-2.3-2.3c0-1.1,0.8-2,1.8-2.3 c-0.3-1.3,0-2.7,1-3.7l1.7,1.7c-0.6,0.6-0.6,1.5,0,2c0.6,0.6,1.4,0.6,2,0l3.7-3.7"/></svg>',
          italic:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M12.63,5.48 L10.15,14.52 C10,15.08 10.37,15.25 11.92,15.3 L11.72,16 L6,16 L6.2,15.31 C7.78,15.26 8.19,15.09 8.34,14.53 L10.82,5.49 C10.97,4.92 10.63,4.76 9.09,4.71 L9.28,4 L15,4 L14.81,4.69 C13.23,4.75 12.78,4.91 12.63,5.48 L12.63,5.48 Z"/></svg>',
          instagram:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z"/><circle cx="14.87" cy="5.26" r="1.09"/><path d="M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z M10.08,13c-1.66,0-3-1.34-3-2.99c0-1.65,1.34-2.99,3-2.99s3,1.34,3,2.99 C13.08,11.66,11.74,13,10.08,13L10.08,13L10.08,13z"/></svg>',
          info: '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M12.13,11.59 C11.97,12.84 10.35,14.12 9.1,14.16 C6.17,14.2 9.89,9.46 8.74,8.37 C9.3,8.16 10.62,7.83 10.62,8.81 C10.62,9.63 10.12,10.55 9.88,11.32 C8.66,15.16 12.13,11.15 12.14,11.18 C12.16,11.21 12.16,11.35 12.13,11.59 C12.08,11.95 12.16,11.35 12.13,11.59 L12.13,11.59 Z M11.56,5.67 C11.56,6.67 9.36,7.15 9.36,6.03 C9.36,5 11.56,4.54 11.56,5.67 L11.56,5.67 Z"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',
          image:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="16.1" cy="6.1" r="1.1"/><rect fill="none" stroke="#000" x=".5" y="2.5" width="19" height="15"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14"/></svg>',
          home: '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65"/><polygon points="15 4 18 4 18 7 17 7 17 5 15 5"/><polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19"/></svg>',
          history:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="#000" points="1 2 2 2 2 6 6 6 6 7 1 7 1 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M2.1,6.548 C3.391,3.29 6.746,1 10.5,1 C15.5,1 19.5,5 19.5,10 C19.5,15 15.5,19 10.5,19 C5.5,19 1.5,15 1.5,10"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',
          heart:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z"/></svg>',
          hashtag:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M15.431,8 L15.661,7 L12.911,7 L13.831,3 L12.901,3 L11.98,7 L9.29,7 L10.21,3 L9.281,3 L8.361,7 L5.23,7 L5,8 L8.13,8 L7.21,12 L4.23,12 L4,13 L6.98,13 L6.061,17 L6.991,17 L7.911,13 L10.601,13 L9.681,17 L10.611,17 L11.531,13 L14.431,13 L14.661,12 L11.76,12 L12.681,8 L15.431,8 Z M10.831,12 L8.141,12 L9.061,8 L11.75,8 L10.831,12 Z"/></svg>',
          happy:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="13" cy="7" r="1"/><circle cx="7" cy="7" r="1"/><circle fill="none" stroke="#000" cx="10" cy="10" r="8.5"/><path fill="none" stroke="#000" d="M14.6,11.4 C13.9,13.3 12.1,14.5 10,14.5 C7.9,14.5 6.1,13.3 5.4,11.4"/></svg>',
          grid: '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="2" width="3" height="3"/><rect x="8" y="2" width="3" height="3"/><rect x="14" y="2" width="3" height="3"/><rect x="2" y="8" width="3" height="3"/><rect x="8" y="8" width="3" height="3"/><rect x="14" y="8" width="3" height="3"/><rect x="2" y="14" width="3" height="3"/><rect x="8" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>',
          google:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M17.86,9.09 C18.46,12.12 17.14,16.05 13.81,17.56 C9.45,19.53 4.13,17.68 2.47,12.87 C0.68,7.68 4.22,2.42 9.5,2.03 C11.57,1.88 13.42,2.37 15.05,3.65 C15.22,3.78 15.37,3.93 15.61,4.14 C14.9,4.81 14.23,5.45 13.5,6.14 C12.27,5.08 10.84,4.72 9.28,4.98 C8.12,5.17 7.16,5.76 6.37,6.63 C4.88,8.27 4.62,10.86 5.76,12.82 C6.95,14.87 9.17,15.8 11.57,15.25 C13.27,14.87 14.76,13.33 14.89,11.75 L10.51,11.75 L10.51,9.09 L17.86,9.09 L17.86,9.09 Z"/></svg>',
          gitter:
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="3.5" y="1" width="1.531" height="11.471"/><rect x="7.324" y="4.059" width="1.529" height="15.294"/><rect x="11.148" y="4.059" width="1.527" height="15.294"/><rect x="14.971" y="4.059" width="1.529" height="8.412"/></svg>',
          github:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10,1 C5.03,1 1,5.03 1,10 C1,13.98 3.58,17.35 7.16,18.54 C7.61,18.62 7.77,18.34 7.77,18.11 C7.77,17.9 7.76,17.33 7.76,16.58 C5.26,17.12 4.73,15.37 4.73,15.37 C4.32,14.33 3.73,14.05 3.73,14.05 C2.91,13.5 3.79,13.5 3.79,13.5 C4.69,13.56 5.17,14.43 5.17,14.43 C5.97,15.8 7.28,15.41 7.79,15.18 C7.87,14.6 8.1,14.2 8.36,13.98 C6.36,13.75 4.26,12.98 4.26,9.53 C4.26,8.55 4.61,7.74 5.19,7.11 C5.1,6.88 4.79,5.97 5.28,4.73 C5.28,4.73 6.04,4.49 7.75,5.65 C8.47,5.45 9.24,5.35 10,5.35 C10.76,5.35 11.53,5.45 12.25,5.65 C13.97,4.48 14.72,4.73 14.72,4.73 C15.21,5.97 14.9,6.88 14.81,7.11 C15.39,7.74 15.73,8.54 15.73,9.53 C15.73,12.99 13.63,13.75 11.62,13.97 C11.94,14.25 12.23,14.8 12.23,15.64 C12.23,16.84 12.22,17.81 12.22,18.11 C12.22,18.35 12.38,18.63 12.84,18.54 C16.42,17.35 19,13.98 19,10 C19,5.03 14.97,1 10,1 L10,1 Z"/></svg>',
          'github-alt':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10,0.5 C4.75,0.5 0.5,4.76 0.5,10.01 C0.5,15.26 4.75,19.51 10,19.51 C15.24,19.51 19.5,15.26 19.5,10.01 C19.5,4.76 15.25,0.5 10,0.5 L10,0.5 Z M12.81,17.69 C12.81,17.69 12.81,17.7 12.79,17.69 C12.47,17.75 12.35,17.59 12.35,17.36 L12.35,16.17 C12.35,15.45 12.09,14.92 11.58,14.56 C12.2,14.51 12.77,14.39 13.26,14.21 C13.87,13.98 14.36,13.69 14.74,13.29 C15.42,12.59 15.76,11.55 15.76,10.17 C15.76,9.25 15.45,8.46 14.83,7.8 C15.1,7.08 15.07,6.29 14.75,5.44 L14.51,5.42 C14.34,5.4 14.06,5.46 13.67,5.61 C13.25,5.78 12.79,6.03 12.31,6.35 C11.55,6.16 10.81,6.05 10.09,6.05 C9.36,6.05 8.61,6.15 7.88,6.35 C7.28,5.96 6.75,5.68 6.26,5.54 C6.07,5.47 5.9,5.44 5.78,5.44 L5.42,5.44 C5.06,6.29 5.04,7.08 5.32,7.8 C4.7,8.46 4.4,9.25 4.4,10.17 C4.4,11.94 4.96,13.16 6.08,13.84 C6.53,14.13 7.05,14.32 7.69,14.43 C8.03,14.5 8.32,14.54 8.55,14.55 C8.07,14.89 7.82,15.42 7.82,16.16 L7.82,17.51 C7.8,17.69 7.7,17.8 7.51,17.8 C4.21,16.74 1.82,13.65 1.82,10.01 C1.82,5.5 5.49,1.83 10,1.83 C14.5,1.83 18.17,5.5 18.17,10.01 C18.18,13.53 15.94,16.54 12.81,17.69 L12.81,17.69 Z"/></svg>',
          'git-fork':
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.2" cx="5.79" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14.19" cy="2.79" r="1.79"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="10.03" cy="16.79" r="1.79"/><path fill="none" stroke="#000" stroke-width="2" d="M5.79,4.57 L5.79,6.56 C5.79,9.19 10.03,10.22 10.03,13.31 C10.03,14.86 10.04,14.55 10.04,14.55 C10.04,14.37 10.04,14.86 10.04,13.31 C10.04,10.22 14.2,9.19 14.2,6.56 L14.2,4.57"/></svg>',
          'git-branch':
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="3" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="14" cy="6" r="2"/><circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="17" r="2"/><path fill="none" stroke="#000" stroke-width="2" d="M14,8 C14,10.41 12.43,10.87 10.56,11.25 C9.09,11.54 7,12.06 7,15 L7,5"/></svg>',
          future:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2"/><path fill="none" stroke="#000" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10"/><rect x="9" y="4" width="1" height="7"/><path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" stroke-width="1.1"/></svg>',
          foursquare:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M15.23,2 C15.96,2 16.4,2.41 16.5,2.86 C16.57,3.15 16.56,3.44 16.51,3.73 C16.46,4.04 14.86,11.72 14.75,12.03 C14.56,12.56 14.16,12.82 13.61,12.83 C13.03,12.84 11.09,12.51 10.69,13 C10.38,13.38 7.79,16.39 6.81,17.53 C6.61,17.76 6.4,17.96 6.08,17.99 C5.68,18.04 5.29,17.87 5.17,17.45 C5.12,17.28 5.1,17.09 5.1,16.91 C5.1,12.4 4.86,7.81 5.11,3.31 C5.17,2.5 5.81,2.12 6.53,2 L15.23,2 L15.23,2 Z M9.76,11.42 C9.94,11.19 10.17,11.1 10.45,11.1 L12.86,11.1 C13.12,11.1 13.31,10.94 13.36,10.69 C13.37,10.64 13.62,9.41 13.74,8.83 C13.81,8.52 13.53,8.28 13.27,8.28 C12.35,8.29 11.42,8.28 10.5,8.28 C9.84,8.28 9.83,7.69 9.82,7.21 C9.8,6.85 10.13,6.55 10.5,6.55 C11.59,6.56 12.67,6.55 13.76,6.55 C14.03,6.55 14.23,6.4 14.28,6.14 C14.34,5.87 14.67,4.29 14.67,4.29 C14.67,4.29 14.82,3.74 14.19,3.74 L7.34,3.74 C7,3.75 6.84,4.02 6.84,4.33 C6.84,7.58 6.85,14.95 6.85,14.99 C6.87,15 8.89,12.51 9.76,11.42 L9.76,11.42 Z"/></svg>',
          forward:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M2.47,13.11 C4.02,10.02 6.27,7.85 9.04,6.61 C9.48,6.41 10.27,6.13 11,5.91 L11,2 L18.89,9 L11,16 L11,12.13 C9.25,12.47 7.58,13.19 6.02,14.25 C3.03,16.28 1.63,18.54 1.63,18.54 C1.63,18.54 1.38,15.28 2.47,13.11 L2.47,13.11 Z M5.3,13.53 C6.92,12.4 9.04,11.4 12,10.92 L12,13.63 L17.36,9 L12,4.25 L12,6.8 C11.71,6.86 10.86,7.02 9.67,7.49 C6.79,8.65 4.58,10.96 3.49,13.08 C3.18,13.7 2.68,14.87 2.49,16 C3.28,15.05 4.4,14.15 5.3,13.53 L5.3,13.53 Z"/></svg>',
          folder:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" points="9.5 5.5 8.5 3.5 1.5 3.5 1.5 16.5 18.5 16.5 18.5 5.5"/></svg>',
          flickr:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="5.5" cy="9.5" r="3.5"/><circle cx="14.5" cy="9.5" r="3.5"/></svg>',
          file: '<svg width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" x="3.5" y="1.5" width="13" height="17"/></svg>',
          'file-text':
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><line fill="none" stroke="#000" x1="6" x2="12" y1="12.5" y2="12.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="8.5" y2="8.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="6.5" y2="6.5"/><line fill="none" stroke="#000" x1="6" x2="14" y1="10.5" y2="10.5"/></svg>',
          'file-pdf':
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"/><path d="M14.65 11.67c-.48.3-1.37-.19-1.79-.37a4.65 4.65 0 0 1 1.49.06c.35.1.36.28.3.31zm-6.3.06l.43-.79a14.7 14.7 0 0 0 .75-1.64 5.48 5.48 0 0 0 1.25 1.55l.2.15a16.36 16.36 0 0 0-2.63.73zM9.5 5.32c.2 0 .32.5.32.97a1.99 1.99 0 0 1-.23 1.04 5.05 5.05 0 0 1-.17-1.3s0-.71.08-.71zm-3.9 9a4.35 4.35 0 0 1 1.21-1.46l.24-.22a4.35 4.35 0 0 1-1.46 1.68zm9.23-3.3a2.05 2.05 0 0 0-1.32-.3 11.07 11.07 0 0 0-1.58.11 4.09 4.09 0 0 1-.74-.5 5.39 5.39 0 0 1-1.32-2.06 10.37 10.37 0 0 0 .28-2.62 1.83 1.83 0 0 0-.07-.25.57.57 0 0 0-.52-.4H9.4a.59.59 0 0 0-.6.38 6.95 6.95 0 0 0 .37 3.14c-.26.63-1 2.12-1 2.12-.3.58-.57 1.08-.82 1.5l-.8.44A3.11 3.11 0 0 0 5 14.16a.39.39 0 0 0 .15.42l.24.13c1.15.56 2.28-1.74 2.66-2.42a23.1 23.1 0 0 1 3.59-.85 4.56 4.56 0 0 0 2.91.8.5.5 0 0 0 .3-.21 1.1 1.1 0 0 0 .12-.75.84.84 0 0 0-.14-.25z"/></svg>',
          'file-edit':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z"/><polyline fill="none" stroke="#000" points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5"/></svg>',
          facebook:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M11,10h2.6l0.4-3H11V5.3c0-0.9,0.2-1.5,1.5-1.5H14V1.1c-0.3,0-1-0.1-2.1-0.1C9.6,1,8,2.4,8,5v2H5.5v3H8v8h3V10z"/></svg>',
          eye: '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" cx="10" cy="10" r="3.45"/><path fill="none" stroke="#000" d="m19.5,10c-2.4,3.66-5.26,7-9.5,7h0,0,0c-4.24,0-7.1-3.34-9.49-7C2.89,6.34,5.75,3,9.99,3h0,0,0c4.25,0,7.11,3.34,9.5,7Z"/></svg>',
          'eye-slash':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" d="m7.56,7.56c.62-.62,1.49-1.01,2.44-1.01,1.91,0,3.45,1.54,3.45,3.45,0,.95-.39,1.82-1.01,2.44"/><path fill="none" stroke="#000" d="m19.5,10c-2.4,3.66-5.26,7-9.5,7h0,0,0c-4.24,0-7.1-3.34-9.49-7C2.89,6.34,5.75,3,9.99,3h0,0,0c4.25,0,7.11,3.34,9.5,7Z"/><line fill="none" stroke="#000" x1="2.5" y1="2.5" x2="17.5" y2="17.5"/></svg>',
          expand:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="13 2 18 2 18 7 17 7 17 3 13 3"/><polygon points="2 13 3 13 3 17 7 17 7 18 2 18"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11"/></svg>',
          etsy: '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M8,4.26C8,4.07,8,4,8.31,4h4.46c.79,0,1.22.67,1.53,1.91l.25,1h.76c.14-2.82.26-4,.26-4S13.65,3,12.52,3H6.81L3.75,2.92v.84l1,.2c.73.11.9.27,1,1,0,0,.06,2,.06,5.17s-.06,5.14-.06,5.14c0,.59-.23.81-1,.94l-1,.2v.84l3.06-.1h5.11c1.15,0,3.82.1,3.82.1,0-.7.45-3.88.51-4.22h-.73l-.76,1.69a2.25,2.25,0,0,1-2.45,1.47H9.4c-1,0-1.44-.4-1.44-1.24V10.44s2.16,0,2.86.06c.55,0,.85.19,1.06,1l.23,1H13L12.9,9.94,13,7.41h-.85l-.28,1.13c-.16.74-.28.84-1,1-1,.1-2.89.09-2.89.09Z"/></svg>',
          dribbble:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.4" d="M1.3,8.9c0,0,5,0.1,8.6-1c1.4-0.4,2.6-0.9,4-1.9 c1.4-1.1,2.5-2.5,2.5-2.5"/><path fill="none" stroke="#000" stroke-width="1.4" d="M3.9,16.6c0,0,1.7-2.8,3.5-4.2 c1.8-1.3,4-2,5.7-2.2C16,10,19,10.6,19,10.6"/><path fill="none" stroke="#000" stroke-width="1.4" d="M6.9,1.6c0,0,3.3,4.6,4.2,6.8 c0.4,0.9,1.3,3.1,1.9,5.2c0.6,2,0.9,4.4,0.9,4.4"/><circle fill="none" stroke="#000" stroke-width="1.4" cx="10" cy="10" r="9"/></svg>',
          download:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3"/></svg>',
          discord:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M16.074,4.361a14.243,14.243,0,0,0-3.61-1.134,10.61,10.61,0,0,0-.463.96,13.219,13.219,0,0,0-4,0,10.138,10.138,0,0,0-.468-.96A14.206,14.206,0,0,0,3.919,4.364,15.146,15.146,0,0,0,1.324,14.5a14.435,14.435,0,0,0,4.428,2.269A10.982,10.982,0,0,0,6.7,15.21a9.294,9.294,0,0,1-1.494-.727c.125-.093.248-.19.366-.289a10.212,10.212,0,0,0,8.854,0c.119.1.242.2.366.289a9.274,9.274,0,0,1-1.5.728,10.8,10.8,0,0,0,.948,1.562,14.419,14.419,0,0,0,4.431-2.27A15.128,15.128,0,0,0,16.074,4.361Zm-8.981,8.1a1.7,1.7,0,0,1-1.573-1.79A1.689,1.689,0,0,1,7.093,8.881a1.679,1.679,0,0,1,1.573,1.791A1.687,1.687,0,0,1,7.093,12.462Zm5.814,0a1.7,1.7,0,0,1-1.573-1.79,1.689,1.689,0,0,1,1.573-1.791,1.679,1.679,0,0,1,1.573,1.791A1.688,1.688,0,0,1,12.907,12.462Z"/></svg>',
          desktop:
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="8" y="15" width="1" height="2"/><rect x="11" y="15" width="1" height="2"/><rect x="5" y="16" width="10" height="1"/><rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11"/></svg>',
          database:
            '<svg width="20" height="20" viewBox="0 0 20 20"><ellipse fill="none" stroke="#000" cx="10" cy="4.64" rx="7.5" ry="3.14"/><path fill="none" stroke="#000" d="M17.5,8.11 C17.5,9.85 14.14,11.25 10,11.25 C5.86,11.25 2.5,9.84 2.5,8.11"/><path fill="none" stroke="#000" d="M17.5,11.25 C17.5,12.99 14.14,14.39 10,14.39 C5.86,14.39 2.5,12.98 2.5,11.25"/><path fill="none" stroke="#000" d="M17.49,4.64 L17.5,14.36 C17.5,16.1 14.14,17.5 10,17.5 C5.86,17.5 2.5,16.09 2.5,14.36 L2.5,4.64"/></svg>',
          crosshairs:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" cx="10" cy="10" r="7.5"/><line fill="none" stroke="#000" x1="10" x2="10" y2="8"/><line fill="none" stroke="#000" x1="10" y1="12" x2="10" y2="20"/><line fill="none" stroke="#000" y1="10" x2="8" y2="10"/><line fill="none" stroke="#000" x1="12" y1="10" x2="20" y2="10"/></svg>',
          'credit-card':
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" x="1.5" y="4.5" width="17" height="12"/><rect x="1" y="7" width="18" height="3"/></svg>',
          copy: '<svg width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" x="3.5" y="2.5" width="12" height="16"/><polyline fill="none" stroke="#000" points="5 0.5 17.5 0.5 17.5 17"/></svg>',
          comments:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="2 0.5 19.5 0.5 19.5 13"/><path d="M5,19.71 L5,15 L0,15 L0,2 L18,2 L18,15 L9.71,15 L5,19.71 L5,19.71 L5,19.71 Z M1,14 L6,14 L6,17.29 L9.29,14 L17,14 L17,3 L1,3 L1,14 L1,14 L1,14 Z"/></svg>',
          commenting:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" points="1.5,1.5 18.5,1.5 18.5,13.5 10.5,13.5 6.5,17.5 6.5,13.5 1.5,13.5"/><circle cx="10" cy="8" r="1"/><circle cx="6" cy="8" r="1"/><circle cx="14" cy="8" r="1"/></svg>',
          comment:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M6,18.71 L6,14 L1,14 L1,1 L19,1 L19,14 L10.71,14 L6,18.71 L6,18.71 Z M2,13 L7,13 L7,16.29 L10.29,13 L18,13 L18,2 L2,2 L2,13 L2,13 Z"/></svg>',
          cog: '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" cx="9.997" cy="10" r="3.31"/><path fill="none" stroke="#000" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z"/></svg>',
          code: '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16"/><polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16"/></svg>',
          'cloud-upload':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.31,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="7.25 11.75 9.5 9.5 11.75 11.75"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',
          'cloud-download':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.3,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"/><polyline fill="none" stroke="#000" points="11.75 16 9.5 18.25 7.25 16"/><path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5"/></svg>',
          close:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"/><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"/></svg>',
          clock:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><rect x="9" y="4" width="1" height="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"/></svg>',
          'chevron-up':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13"/></svg>',
          'chevron-right':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16"/></svg>',
          'chevron-left':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="13 16 7 10 13 4"/></svg>',
          'chevron-down':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"/></svg>',
          'chevron-double-right':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 6 14 10 10 14"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="6 6 10 10 6 14"/></svg>',
          'chevron-double-left':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="10 14 6 10 10 6"/><polyline fill="none" stroke="#000" stroke-width="1.03" points="14 14 10 10 14 6"/></svg>',
          check:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"/></svg>',
          cart: '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="7.3" cy="17.3" r="1.4"/><circle cx="13.3" cy="17.3" r="1.4"/><polyline fill="none" stroke="#000" points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5"/></svg>',
          camera:
            '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10.8" r="3.8"/><path fill="none" stroke="#000" d="M1,4.5 C0.7,4.5 0.5,4.7 0.5,5 L0.5,17 C0.5,17.3 0.7,17.5 1,17.5 L19,17.5 C19.3,17.5 19.5,17.3 19.5,17 L19.5,5 C19.5,4.7 19.3,4.5 19,4.5 L13.5,4.5 L13.5,2.9 C13.5,2.6 13.3,2.5 13,2.5 L7,2.5 C6.7,2.5 6.5,2.6 6.5,2.9 L6.5,4.5 L1,4.5 L1,4.5 Z"/></svg>',
          calendar:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"/><rect width="1" height="3" x="6" y="2"/><rect width="1" height="3" x="13" y="2"/></svg>',
          bookmark:
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" points="5.5 1.5 15.5 1.5 15.5 17.5 10.5 12.5 5.5 17.5"/></svg>',
          bolt: '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M4.74,20 L7.73,12 L3,12 L15.43,1 L12.32,9 L17.02,9 L4.74,20 L4.74,20 L4.74,20 Z M9.18,11 L7.1,16.39 L14.47,10 L10.86,10 L12.99,4.67 L5.61,11 L9.18,11 L9.18,11 L9.18,11 Z"/></svg>',
          bold: '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M5,15.3 C5.66,15.3 5.9,15 5.9,14.53 L5.9,5.5 C5.9,4.92 5.56,4.7 5,4.7 L5,4 L8.95,4 C12.6,4 13.7,5.37 13.7,6.9 C13.7,7.87 13.14,9.17 10.86,9.59 L10.86,9.7 C13.25,9.86 14.29,11.28 14.3,12.54 C14.3,14.47 12.94,16 9,16 L5,16 L5,15.3 Z M9,9.3 C11.19,9.3 11.8,8.5 11.85,7 C11.85,5.65 11.3,4.8 9,4.8 L7.67,4.8 L7.67,9.3 L9,9.3 Z M9.185,15.22 C11.97,15 12.39,14 12.4,12.58 C12.4,11.15 11.39,10 9,10 L7.67,10 L7.67,15 L9.18,15 Z"/></svg>',
          bell: '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.1" d="M17,15.5 L3,15.5 C2.99,14.61 3.79,13.34 4.1,12.51 C4.58,11.3 4.72,10.35 5.19,7.01 C5.54,4.53 5.89,3.2 7.28,2.16 C8.13,1.56 9.37,1.5 9.81,1.5 L9.96,1.5 C9.96,1.5 11.62,1.41 12.67,2.17 C14.08,3.2 14.42,4.54 14.77,7.02 C15.26,10.35 15.4,11.31 15.87,12.52 C16.2,13.34 17.01,14.61 17,15.5 L17,15.5 Z"/><path fill="none" stroke="#000" d="M12.39,16 C12.39,17.37 11.35,18.43 9.91,18.43 C8.48,18.43 7.42,17.37 7.42,16"/></svg>',
          behance:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M9.5,10.6c-0.4-0.5-0.9-0.9-1.6-1.1c1.7-1,2.2-3.2,0.7-4.7C7.8,4,6.3,4,5.2,4C3.5,4,1.7,4,0,4v12c1.7,0,3.4,0,5.2,0 c1,0,2.1,0,3.1-0.5C10.2,14.6,10.5,12.3,9.5,10.6L9.5,10.6z M5.6,6.1c1.8,0,1.8,2.7-0.1,2.7c-1,0-2,0-2.9,0V6.1H5.6z M2.6,13.8v-3.1 c1.1,0,2.1,0,3.2,0c2.1,0,2.1,3.2,0.1,3.2L2.6,13.8z"/><path d="M19.9,10.9C19.7,9.2,18.7,7.6,17,7c-4.2-1.3-7.3,3.4-5.3,7.1c0.9,1.7,2.8,2.3,4.7,2.1c1.7-0.2,2.9-1.3,3.4-2.9h-2.2 c-0.4,1.3-2.4,1.5-3.5,0.6c-0.4-0.4-0.6-1.1-0.6-1.7H20C20,11.7,19.9,10.9,19.9,10.9z M13.5,10.6c0-1.6,2.3-2.7,3.5-1.4 c0.4,0.4,0.5,0.9,0.6,1.4H13.5L13.5,10.6z"/><rect x="13" y="4" width="5" height="1.4"/></svg>',
          ban: '<svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><line fill="none" stroke="#000" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5"/></svg>',
          bag: '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" d="M7.5,7.5V4A2.48,2.48,0,0,1,10,1.5,2.54,2.54,0,0,1,12.5,4V7.5"/><polygon fill="none" stroke="#000" points="16.5 7.5 3.5 7.5 2.5 18.5 17.5 18.5 16.5 7.5"/></svg>',
          'arrow-up':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="10.5,4 15.37,9.4 14.63,10.08 10.5,5.49 6.37,10.08 5.63,9.4"/><line fill="none" stroke="#000" x1="10.5" y1="16" x2="10.5" y2="5"/></svg>',
          'arrow-right':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14"/><line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5"/></svg>',
          'arrow-left':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5"/><line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52"/></svg>',
          'arrow-down':
            '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66"/><line fill="none" stroke="#000" x1="10.5" y1="4" x2="10.5" y2="15"/></svg>',
          apple:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="m17.23,6.93c-.1.08-1.95,1.12-1.95,3.43,0,2.67,2.35,3.62,2.42,3.64-.01.06-.37,1.29-1.24,2.55-.77,1.11-1.58,2.22-2.8,2.22s-1.54-.71-2.95-.71-1.87.73-2.99.73-1.9-1.03-2.8-2.29c-1.04-1.48-1.88-3.78-1.88-5.96,0-3.5,2.28-5.36,4.51-5.36,1.19,0,2.18.78,2.93.78s1.82-.83,3.17-.83c.51,0,2.36.05,3.57,1.79h0Zm-4.21-3.27c.56-.66.96-1.59.96-2.51,0-.13-.01-.26-.03-.36-.91.03-1.99.61-2.65,1.36-.51.58-.99,1.5-.99,2.44,0,.14.02.28.03.33.06.01.15.02.24.02.82,0,1.85-.55,2.44-1.28h0Z"/></svg>',
          android:
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="m14.88,6.77l1.66-2.87c.09-.16.04-.37-.12-.46-.16-.09-.37-.04-.46.12l-1.68,2.91c-1.28-.59-2.73-.91-4.28-.91s-3,.33-4.28.91l-1.68-2.91c-.09-.16-.3-.22-.46-.12-.16.09-.22.3-.12.46l1.66,2.87C2.26,8.32.32,11.22,0,14.61h20c-.32-3.39-2.26-6.29-5.12-7.84h0Zm-9.47,5.03c-.46,0-.84-.38-.84-.84s.38-.84.84-.84.84.38.84.84c0,.46-.37.84-.84.84Zm9.18,0c-.46,0-.84-.38-.84-.84s.38-.84.84-.84.84.38.84.84c0,.46-.37.84-.84.84Z"/></svg>',
          'android-robot':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="m17.61,7.96v4.64c-.06,1.48-2.17,1.48-2.23,0v-4.64c.06-1.48,2.17-1.48,2.23,0Z"/><path d="m4.62,7.96v4.64c-.06,1.48-2.17,1.48-2.23,0v-4.64c.06-1.48,2.17-1.48,2.23,0Z"/><path d="m12.78,2.85c-.11-.07-.23-.13-.34-.19.13-.23.65-1.17.79-1.42.07-.12-.05-.27-.18-.23-.04.01-.07.04-.09.08l-.79,1.43c-1.32-.6-2.98-.6-4.3,0-.13-.23-.65-1.18-.79-1.43-.04-.07-.14-.1-.21-.06-.08.04-.1.14-.06.21,0,0,.79,1.42.79,1.42-1.49.77-2.53,2.28-2.53,3.99-.02,0,9.93,0,9.93,0,.01-1.55-.87-2.98-2.19-3.8Zm-5.07,1.98c-.23,0-.41-.19-.41-.41.01-.27.21-.41.41-.41s.4.14.42.41c0,.22-.18.42-.41.41Zm4.58,0c-.23,0-.42-.19-.41-.41.01-.28.21-.41.41-.41s.4.14.41.41c0,.23-.19.41-.41.41Z"/><path d="m14.97,7.03v7.2c0,.66-.54,1.2-1.2,1.2h-.8v2.46c-.06,1.48-2.16,1.48-2.23,0,0,0,0-2.46,0-2.46h-1.48v2.46c0,.61-.5,1.11-1.11,1.11s-1.11-.5-1.11-1.11v-2.46h-.8c-.66,0-1.2-.54-1.2-1.2,0,0,0-7.2,0-7.2h9.93Z"/></svg>',
          album:
            '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="5" y="2" width="10" height="1"/><rect x="3" y="4" width="14" height="1"/><rect fill="none" stroke="#000" x="1.5" y="6.5" width="17" height="11"/></svg>',
          '500px':
            '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M9.624,11.866c-0.141,0.132,0.479,0.658,0.662,0.418c0.051-0.046,0.607-0.61,0.662-0.664c0,0,0.738,0.719,0.814,0.719 c0.1,0,0.207-0.055,0.322-0.17c0.27-0.269,0.135-0.416,0.066-0.495l-0.631-0.616l0.658-0.668c0.146-0.156,0.021-0.314-0.1-0.449 c-0.182-0.18-0.359-0.226-0.471-0.125l-0.656,0.654l-0.654-0.654c-0.033-0.034-0.08-0.045-0.124-0.045 c-0.079,0-0.191,0.068-0.307,0.181c-0.202,0.202-0.247,0.351-0.133,0.462l0.665,0.665L9.624,11.866z"/><path d="M11.066,2.884c-1.061,0-2.185,0.248-3.011,0.604c-0.087,0.034-0.141,0.106-0.15,0.205C7.893,3.784,7.919,3.909,7.982,4.066 c0.05,0.136,0.187,0.474,0.452,0.372c0.844-0.326,1.779-0.507,2.633-0.507c0.963,0,1.9,0.191,2.781,0.564 c0.695,0.292,1.357,0.719,2.078,1.34c0.051,0.044,0.105,0.068,0.164,0.068c0.143,0,0.273-0.137,0.389-0.271 c0.191-0.214,0.324-0.395,0.135-0.575c-0.686-0.654-1.436-1.138-2.363-1.533C13.24,3.097,12.168,2.884,11.066,2.884z"/><path d="M16.43,15.747c-0.092-0.028-0.242,0.05-0.309,0.119l0,0c-0.652,0.652-1.42,1.169-2.268,1.521 c-0.877,0.371-1.814,0.551-2.779,0.551c-0.961,0-1.896-0.189-2.775-0.564c-0.848-0.36-1.612-0.879-2.268-1.53 c-0.682-0.688-1.196-1.455-1.529-2.268c-0.325-0.799-0.471-1.643-0.471-1.643c-0.045-0.24-0.258-0.249-0.567-0.203 c-0.128,0.021-0.519,0.079-0.483,0.36v0.01c0.105,0.644,0.289,1.284,0.545,1.895c0.417,0.969,1.002,1.849,1.756,2.604 c0.757,0.754,1.636,1.34,2.604,1.757C8.901,18.785,9.97,19,11.088,19c1.104,0,2.186-0.215,3.188-0.645 c1.838-0.896,2.604-1.757,2.604-1.757c0.182-0.204,0.227-0.317-0.1-0.643C16.779,15.956,16.525,15.774,16.43,15.747z"/><path d="M5.633,13.287c0.293,0.71,0.723,1.341,1.262,1.882c0.54,0.54,1.172,0.971,1.882,1.264c0.731,0.303,1.509,0.461,2.298,0.461 c0.801,0,1.578-0.158,2.297-0.461c0.711-0.293,1.344-0.724,1.883-1.264c0.543-0.541,0.971-1.172,1.264-1.882 c0.314-0.721,0.463-1.5,0.463-2.298c0-0.79-0.148-1.569-0.463-2.289c-0.293-0.699-0.721-1.329-1.264-1.881 c-0.539-0.541-1.172-0.959-1.867-1.263c-0.721-0.303-1.5-0.461-2.299-0.461c-0.802,0-1.613,0.159-2.322,0.461 c-0.577,0.25-1.544,0.867-2.119,1.454v0.012V2.108h8.16C15.1,2.104,15.1,1.69,15.1,1.552C15.1,1.417,15.1,1,14.809,1H5.915 C5.676,1,5.527,1.192,5.527,1.384v6.84c0,0.214,0.273,0.372,0.529,0.428c0.5,0.105,0.614-0.056,0.737-0.224l0,0 c0.18-0.273,0.776-0.884,0.787-0.894c0.901-0.905,2.117-1.408,3.416-1.408c1.285,0,2.5,0.501,3.412,1.408 c0.914,0.914,1.408,2.122,1.408,3.405c0,1.288-0.508,2.496-1.408,3.405c-0.9,0.896-2.152,1.406-3.438,1.406 c-0.877,0-1.711-0.229-2.433-0.671v-4.158c0-0.553,0.237-1.151,0.643-1.614c0.462-0.519,1.094-0.799,1.782-0.799 c0.664,0,1.293,0.253,1.758,0.715c0.459,0.459,0.709,1.071,0.709,1.723c0,1.385-1.094,2.468-2.488,2.468 c-0.273,0-0.769-0.121-0.781-0.125c-0.281-0.087-0.405,0.306-0.438,0.436c-0.159,0.496,0.079,0.585,0.123,0.607 c0.452,0.137,0.743,0.157,1.129,0.157c1.973,0,3.572-1.6,3.572-3.57c0-1.964-1.6-3.552-3.572-3.552c-0.97,0-1.872,0.36-2.546,1.038 c-0.656,0.631-1.027,1.487-1.027,2.322v3.438v-0.011c-0.372-0.42-0.732-1.041-0.981-1.682c-0.102-0.248-0.315-0.202-0.607-0.113 c-0.135,0.035-0.519,0.157-0.44,0.439C5.372,12.799,5.577,13.164,5.633,13.287z"/></svg>',
        })
    }
    return typeof window < 'u' && window.UIkit && window.UIkit.use(i), i
  })
})(Cd)
var Uy = Cd.exports
const xd = Na(Uy),
  Fy = (e) => ({}),
  Vu = (e) => ({}),
  Wy = (e) => ({}),
  Gu = (e) => ({})
function Vy(e) {
  let t, i, o, s, a, c
  const h = e[1].title,
    f = ti(h, e, e[0], Gu),
    p = e[1].body,
    g = ti(p, e, e[0], Vu)
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('h4')),
        f && f.c(),
        (s = E()),
        (a = m('div')),
        g && g.c(),
        y(o, 'class', 'uk-card-title uk-text-uppercase'),
        y(i, 'class', 'uk-card uk-card-primary uk-card-hover uk-card-body uk-light')
    },
    m(b, v) {
      M(b, t, v), u(t, i), u(i, o), f && f.m(o, null), u(i, s), u(i, a), g && g.m(a, null), (c = !0)
    },
    p(b, [v]) {
      f && f.p && (!c || v & 1) && ii(f, h, b, b[0], c ? ni(h, b[0], v, Wy) : oi(b[0]), Gu),
        g && g.p && (!c || v & 1) && ii(g, p, b, b[0], c ? ni(p, b[0], v, Fy) : oi(b[0]), Vu)
    },
    i(b) {
      c || (D(f, b), D(g, b), (c = !0))
    },
    o(b) {
      U(f, b), U(g, b), (c = !1)
    },
    d(b) {
      b && A(t), f && f.d(b), g && g.d(b)
    },
  }
}
function Gy(e, t, i) {
  let { $$slots: o = {}, $$scope: s } = t
  return (
    (e.$$set = (a) => {
      '$$scope' in a && i(0, (s = a.$$scope))
    }),
    [s, o]
  )
}
class Bn extends we {
  constructor(t) {
    super(), ye(this, t, Gy, Vy, ge, {})
  }
}
function jy(e) {
  let t
  return {
    c() {
      ;(t = m('div')), (t.textContent = 'migration successful')
    },
    m(i, o) {
      M(i, t, o)
    },
    i: ce,
    o: ce,
    d(i) {
      i && A(t)
    },
  }
}
function qy(e) {
  let t, i
  return (
    (t = new Bn({ props: { $$slots: { body: [Ky], title: [Yy] }, $$scope: { ctx: e } } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function Yy(e) {
  let t
  return {
    c() {
      ;(t = m('span')), (t.textContent = 'Looks like you are an 0L OG'), y(t, 'slot', 'title')
    },
    m(i, o) {
      M(i, t, o)
    },
    p: ce,
    d(i) {
      i && A(t)
    },
  }
}
function Ky(e) {
  let t, i, o, s, a, c, h, f, p, g, b
  return {
    c() {
      ;(t = m('div')),
        (i = m('div')),
        (o = m('p')),
        (o.textContent = 'We need to migrate some files on your computer'),
        (s = E()),
        (a = m('p')),
        (a.textContent = 'Nothing will be deleted, and no changes will happen on the blockchain'),
        (c = E()),
        (h = m('button')),
        (h.textContent = 'migrate'),
        (f = E()),
        (p = m('button')),
        (p.textContent = 'ignore'),
        y(h, 'class', 'uk-button uk-button-primary'),
        y(p, 'class', 'uk-button uk-button-default'),
        y(t, 'slot', 'body')
    },
    m(v, w) {
      M(v, t, w),
        u(t, i),
        u(i, o),
        u(i, s),
        u(i, a),
        u(i, c),
        u(i, h),
        u(i, f),
        u(i, p),
        g || ((b = [Ee(h, 'click', cy), Ee(p, 'click', uy)]), (g = !0))
    },
    p: ce,
    d(v) {
      v && A(t), (g = !1), yt(b)
    },
  }
}
function Zy(e) {
  let t, i, o, s
  const a = [qy, jy],
    c = []
  function h(f, p) {
    return f[0] && !f[1] ? 0 : f[2] ? 1 : -1
  }
  return (
    ~(i = h(e)) && (o = c[i] = a[i](e)),
    {
      c() {
        ;(t = m('main')), o && o.c(), y(t, 'class', 'uk-container')
      },
      m(f, p) {
        M(f, t, p), ~i && c[i].m(t, null), (s = !0)
      },
      p(f, [p]) {
        let g = i
        ;(i = h(f)),
          i !== g &&
            (o &&
              (qe(),
              U(c[g], 1, 1, () => {
                c[g] = null
              }),
              Ye()),
            ~i
              ? ((o = c[i]), o || ((o = c[i] = a[i](f)), o.c()), D(o, 1), o.m(t, null))
              : (o = null))
      },
      i(f) {
        s || (D(o), (s = !0))
      },
      o(f) {
        U(o), (s = !1)
      },
      d(f) {
        f && A(t), ~i && c[i].d()
      },
    }
  )
}
function Xy(e, t, i) {
  let o, s, a
  return (
    ae(e, Hs, (c) => i(0, (o = c))),
    ae(e, ga, (c) => i(1, (s = c))),
    ae(e, za, (c) => i(2, (a = c))),
    [o, s, a]
  )
}
class Jy extends we {
  constructor(t) {
    super(), ye(this, t, Xy, Zy, ge, {})
  }
}
function Qy(e) {
  let t,
    i = e[0]('wallet.btn_new_account') + '',
    o
  return {
    c() {
      ;(t = m('button')), (o = T(i)), y(t, 'class', 'uk-button uk-button-secondary')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 1 && i !== (i = s[0]('wallet.btn_new_account') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function ew(e) {
  let t,
    i = e[0]('wallet.btn_restore_account') + '',
    o
  return {
    c() {
      ;(t = m('button')), (o = T(i)), y(t, 'class', 'uk-button uk-button-default')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 1 && i !== (i = s[0]('wallet.btn_restore_account') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function tw(e) {
  let t, i, o, s, a, c
  return (
    (o = new yn({ props: { to: vt.keygen, $$slots: { default: [Qy] }, $$scope: { ctx: e } } })),
    (a = new yn({
      props: { to: vt.accountFromMnem, $$slots: { default: [ew] }, $$scope: { ctx: e } },
    })),
    {
      c() {
        ;(t = m('main')),
          (i = m('div')),
          re(o.$$.fragment),
          (s = E()),
          re(a.$$.fragment),
          y(i, 'uk-grid', ''),
          y(i, 'class', 'uk-margin uk-flex uk-flex-center'),
          y(t, 'class', 'uk-margin uk-flex uk-flex-center'),
          y(t, 'uk-grid', '')
      },
      m(h, f) {
        M(h, t, f), u(t, i), oe(o, i, null), u(i, s), oe(a, i, null), (c = !0)
      },
      p(h, [f]) {
        const p = {}
        f & 3 && (p.$$scope = { dirty: f, ctx: h }), o.$set(p)
        const g = {}
        f & 3 && (g.$$scope = { dirty: f, ctx: h }), a.$set(g)
      },
      i(h) {
        c || (D(o.$$.fragment, h), D(a.$$.fragment, h), (c = !0))
      },
      o(h) {
        U(o.$$.fragment, h), U(a.$$.fragment, h), (c = !1)
      },
      d(h) {
        h && A(t), se(o), se(a)
      },
    }
  )
}
function nw(e, t, i) {
  let o
  return ae(e, De, (s) => i(0, (o = s))), [o]
}
class Ed extends we {
  constructor(t) {
    super(), ye(this, t, nw, tw, ge, {})
  }
}
function ju(e) {
  let t, i
  return (
    (t = new Jy({})),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function iw(e) {
  let t,
    i,
    o,
    s = e[0]('wallet.carpe') + '',
    a,
    c,
    h,
    f = e[0]('wallet.newbie_message') + '',
    p,
    g,
    b,
    v,
    w
  b = new Ed({})
  let $ = e[1] && ju()
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('h1')),
        (a = T(s)),
        (c = E()),
        (h = m('h5')),
        (p = T(f)),
        (g = E()),
        re(b.$$.fragment),
        (v = E()),
        $ && $.c(),
        y(o, 'class', 'uk-text-light uk-text-muted uk-text-uppercase uk-text-center'),
        y(i, 'class', 'uk-container uk-align-center'),
        y(h, 'class', 'uk-text-light uk-text-muted uk-text-uppercase uk-text-center'),
        Bt(t, 'position', 'absolute'),
        y(t, 'class', 'uk-position-center uk-margin-large')
    },
    m(x, S) {
      M(x, t, S),
        u(t, i),
        u(i, o),
        u(o, a),
        u(t, c),
        u(t, h),
        u(h, p),
        u(t, g),
        oe(b, t, null),
        u(t, v),
        $ && $.m(t, null),
        (w = !0)
    },
    p(x, [S]) {
      ;(!w || S & 1) && s !== (s = x[0]('wallet.carpe') + '') && O(a, s),
        (!w || S & 1) && f !== (f = x[0]('wallet.newbie_message') + '') && O(p, f),
        x[1]
          ? $
            ? S & 2 && D($, 1)
            : (($ = ju()), $.c(), D($, 1), $.m(t, null))
          : $ &&
            (qe(),
            U($, 1, 1, () => {
              $ = null
            }),
            Ye())
    },
    i(x) {
      w || (D(b.$$.fragment, x), D($), (w = !0))
    },
    o(x) {
      U(b.$$.fragment, x), U($), (w = !1)
    },
    d(x) {
      x && A(t), se(b), $ && $.d()
    },
  }
}
function ow(e, t, i) {
  let o, s
  return ae(e, De, (a) => i(0, (o = a))), ae(e, Hs, (a) => i(1, (s = a))), [o, s]
}
class sw extends we {
  constructor(t) {
    super(), ye(this, t, ow, iw, ge, {})
  }
}
const rw = 1e6,
  aw = { zh_cn: 'zh' }
function Sd() {
  const e = je(ui)
  return lw(e)
}
function sn(e) {
  const t = Ao(e),
    i = Sd()
  return t.toLocaleString(i, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function ya(e, t = 2, i = 6) {
  const o = Sd()
  return e.toLocaleString(o, { minimumFractionDigits: t, maximumFractionDigits: i })
}
function Ao(e) {
  return e / rw
}
function lw(e) {
  return aw[e] || e
}
function cw(e) {
  let t, i, o, s, a, c, h
  return {
    c() {
      ;(t = Ln('svg')),
        (i = Ln('g')),
        (o = Ln('path')),
        (s = Ln('path')),
        (a = Ln('path')),
        (c = Ln('path')),
        (h = Ln('path')),
        y(
          o,
          'd',
          'M5.393 1.072v0c-.12-.07-.16-.23-.1-.35 .04-.08.12-.13.21-.13 4.881-.06 10.185 1.6 14.6 8v0 0c.27.39.23.92-.1 1.26l-1.44 1.48v0c-.39.39-1.02.4-1.42.01 -.08-.08-.14-.16-.19-.25l-.37-.7C14.35 6.12 8.953 3.14 5.35 1.03Z',
        ),
        y(
          s,
          'd',
          'M11.947 5.266L.95 15.609H.95c-.59.55-.62 1.47-.07 2.05 .01.01.02.02.03.03v0h0c.56.56 1.49.56 2.05 0 .01-.02.02-.03.02-.04l10.47-11.12',
        ),
        y(
          a,
          'd',
          'M10.752 15.961l0 0c-.16.08-.26.25-.26.43v2.92 0c0 .17.09.34.25.43l3 1.71v0c.15.08.34.08.5 0l3-1.72v-.001c.15-.09.25-.26.25-.44v-2.92 0c-.01-.18-.1-.35-.26-.44l-3-1.72v0c-.16-.09-.35-.09-.5 0Z',
        ),
        y(
          c,
          'd',
          'M19.7 14.05v0c-.13.09-.2.24-.2.4v.99 0c0 .16.07.31.21.4l1.5 1.05v0c.17.12.4.12.57-.001l1.5-1.05v0c.13-.1.21-.25.21-.41v-.99h0c0-.16-.08-.31-.2-.4l-1.5-1.13v0c-.18-.14-.43-.14-.6 0Z',
        ),
        y(
          h,
          'd',
          'M19.7 20.455v0c-.13.09-.2.24-.2.4v.99 0c0 .16.07.31.21.4l1.5 1.05v0c.17.12.4.12.57-.001l1.5-1.05v0c.13-.1.21-.25.21-.41v-.99h0c0-.16-.08-.31-.2-.4l-1.5-1.13v0c-.18-.14-.43-.14-.6 0Z',
        ),
        y(i, 'stroke-linecap', 'round'),
        y(i, 'stroke', '#1e87f0'),
        y(i, 'fill', 'none'),
        y(i, 'stroke-linejoin', 'round'),
        y(t, 'width', '20'),
        y(t, 'height', '20'),
        y(t, 'viewBox', '0 0 24 24'),
        y(t, 'xmlns', 'http://www.w3.org/2000/svg')
    },
    m(f, p) {
      M(f, t, p), u(t, i), u(i, o), u(i, s), u(i, a), u(i, c), u(i, h)
    },
    p: ce,
    i: ce,
    o: ce,
    d(f) {
      f && A(t)
    },
  }
}
class uw extends we {
  constructor(t) {
    super(), ye(this, t, null, cw, ge, {})
  }
}
function qu(e, t, i) {
  const o = e.slice()
  return (o[6] = t[i]), o
}
function Yu(e) {
  let t,
    i,
    o,
    s,
    a,
    c,
    h = e[2]('wallet.account_list.nickname') + '',
    f,
    p,
    g,
    b = e[2]('wallet.account_list.address') + '',
    v,
    w,
    $,
    x = e[2]('wallet.account_list.authkey') + '',
    S,
    L,
    N,
    B = e[2]('wallet.account_list.unlocked') + '',
    F,
    R,
    V,
    G = e[2]('wallet.account_list.balance') + '',
    j,
    Y,
    z,
    W,
    te = Pt(e[1]),
    K = []
  for (let ne = 0; ne < te.length; ne += 1) K[ne] = Xu(qu(e, te, ne))
  const ee = (ne) =>
    U(K[ne], 1, 1, () => {
      K[ne] = null
    })
  return {
    c() {
      ;(t = m('table')),
        (i = m('thead')),
        (o = m('tr')),
        (s = m('th')),
        (a = E()),
        (c = m('th')),
        (f = T(h)),
        (p = E()),
        (g = m('th')),
        (v = T(b)),
        (w = E()),
        ($ = m('th')),
        (S = T(x)),
        (L = E()),
        (N = m('th')),
        (F = T(B)),
        (R = E()),
        (V = m('th')),
        (j = T(G)),
        (Y = E()),
        (z = m('tbody'))
      for (let ne = 0; ne < K.length; ne += 1) K[ne].c()
      y(V, 'class', 'uk-text-right'), y(t, 'class', 'uk-table uk-table-divider')
    },
    m(ne, Z) {
      M(ne, t, Z),
        u(t, i),
        u(i, o),
        u(o, s),
        u(o, a),
        u(o, c),
        u(c, f),
        u(o, p),
        u(o, g),
        u(g, v),
        u(o, w),
        u(o, $),
        u($, S),
        u(o, L),
        u(o, N),
        u(N, F),
        u(o, R),
        u(o, V),
        u(V, j),
        u(t, Y),
        u(t, z)
      for (let I = 0; I < K.length; I += 1) K[I] && K[I].m(z, null)
      W = !0
    },
    p(ne, Z) {
      if (
        ((!W || Z & 4) && h !== (h = ne[2]('wallet.account_list.nickname') + '') && O(f, h),
        (!W || Z & 4) && b !== (b = ne[2]('wallet.account_list.address') + '') && O(v, b),
        (!W || Z & 4) && x !== (x = ne[2]('wallet.account_list.authkey') + '') && O(S, x),
        (!W || Z & 4) && B !== (B = ne[2]('wallet.account_list.unlocked') + '') && O(F, B),
        (!W || Z & 4) && G !== (G = ne[2]('wallet.account_list.balance') + '') && O(j, G),
        Z & 31)
      ) {
        te = Pt(ne[1])
        let I
        for (I = 0; I < te.length; I += 1) {
          const Q = qu(ne, te, I)
          K[I]
            ? (K[I].p(Q, Z), D(K[I], 1))
            : ((K[I] = Xu(Q)), K[I].c(), D(K[I], 1), K[I].m(z, null))
        }
        for (qe(), I = te.length; I < K.length; I += 1) ee(I)
        Ye()
      }
    },
    i(ne) {
      if (!W) {
        for (let Z = 0; Z < te.length; Z += 1) D(K[Z])
        W = !0
      }
    },
    o(ne) {
      K = K.filter(Boolean)
      for (let Z = 0; Z < K.length; Z += 1) U(K[Z])
      W = !1
    },
    d(ne) {
      ne && A(t), $n(K, ne)
    },
  }
}
function Ku(e) {
  let t, i, o, s
  const a = [fw, hw],
    c = []
  function h(f, p) {
    return f[3] ? 0 : 1
  }
  return (
    (t = h(e)),
    (i = c[t] = a[t](e)),
    {
      c() {
        i.c(), (o = Tt())
      },
      m(f, p) {
        c[t].m(f, p), M(f, o, p), (s = !0)
      },
      p(f, p) {
        let g = t
        ;(t = h(f)),
          t !== g &&
            (qe(),
            U(c[g], 1, 1, () => {
              c[g] = null
            }),
            Ye(),
            (i = c[t]),
            i || ((i = c[t] = a[t](f)), i.c()),
            D(i, 1),
            i.m(o.parentNode, o))
      },
      i(f) {
        s || (D(i), (s = !0))
      },
      o(f) {
        U(i), (s = !1)
      },
      d(f) {
        f && A(o), c[t].d(f)
      },
    }
  )
}
function hw(e) {
  let t
  return {
    c() {
      ;(t = m('span')), y(t, 'uk-icon', 'user')
    },
    m(i, o) {
      M(i, t, o)
    },
    i: ce,
    o: ce,
    d(i) {
      i && A(t)
    },
  }
}
function fw(e) {
  let t, i
  return (
    (t = new uw({})),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function dw(e) {
  let t = e[2]('wallet.account_list.account_on_chain') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 4 && t !== (t = o[2]('wallet.account_list.account_on_chain') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function pw(e) {
  let t = e[2]('wallet.account_list.offline') + '',
    i,
    o
  return {
    c() {
      ;(i = T(t)), (o = T('...'))
    },
    m(s, a) {
      M(s, i, a), M(s, o, a)
    },
    p(s, a) {
      a & 4 && t !== (t = s[2]('wallet.account_list.offline') + '') && O(i, t)
    },
    d(s) {
      s && (A(i), A(o))
    },
  }
}
function mw(e) {
  let t = e[2]('wallet.account_list.loading') + '',
    i,
    o
  return {
    c() {
      ;(i = T(t)), (o = T('...'))
    },
    m(s, a) {
      M(s, i, a), M(s, o, a)
    },
    p(s, a) {
      a & 4 && t !== (t = s[2]('wallet.account_list.loading') + '') && O(i, t)
    },
    d(s) {
      s && (A(i), A(o))
    },
  }
}
function gw(e) {
  let t,
    i = Ao(e[6].balance) < 1,
    o,
    s = sn(e[6].balance.total) + '',
    a,
    c = i && Zu(e)
  return {
    c() {
      ;(t = m('div')), c && c.c(), (o = E()), (a = T(s)), y(t, 'class', 'uk-inline')
    },
    m(h, f) {
      M(h, t, f), c && c.m(t, null), u(t, o), u(t, a)
    },
    p(h, f) {
      f & 2 && (i = Ao(h[6].balance) < 1),
        i ? (c ? c.p(h, f) : ((c = Zu(h)), c.c(), c.m(t, o))) : c && (c.d(1), (c = null)),
        f & 2 && s !== (s = sn(h[6].balance.total) + '') && O(a, s)
    },
    d(h) {
      h && A(t), c && c.d()
    },
  }
}
function _w(e) {
  let t = e[2]('wallet.account_list.account_on_chain') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 4 && t !== (t = o[2]('wallet.account_list.account_on_chain') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function Zu(e) {
  let t,
    i,
    o,
    s = e[2]('wallet.account_list.message') + '',
    a
  return {
    c() {
      ;(t = m('span')),
        (i = E()),
        (o = m('div')),
        (a = T(s)),
        y(t, 'class', 'uk-margin uk-text-warning'),
        y(t, 'uk-icon', 'icon: info'),
        y(o, 'uk-dropdown', '')
    },
    m(c, h) {
      M(c, t, h), M(c, i, h), M(c, o, h), u(o, a)
    },
    p(c, h) {
      h & 4 && s !== (s = c[2]('wallet.account_list.message') + '') && O(a, s)
    },
    d(c) {
      c && (A(t), A(i), A(o))
    },
  }
}
function Xu(e) {
  let t,
    i,
    o,
    s,
    a = e[6].nickname + '',
    c,
    h,
    f,
    p = zi(e[6].account) + '',
    g,
    b,
    v,
    w = e[6].auth_key.slice(0, 5) + '',
    $,
    x,
    S,
    L,
    N = sn(e[6].balance.unlocked) + '',
    B,
    F,
    R,
    V,
    G,
    j,
    Y,
    z,
    W = e[6].account == e[0].account && Ku(e)
  function te() {
    return e[5](e[6])
  }
  function K(Z, I) {
    return Z[6].on_chain != null && Z[6].on_chain == !1
      ? _w
      : Z[6].on_chain
        ? gw
        : Z[6].balance == null
          ? mw
          : Z[4]
            ? dw
            : pw
  }
  let ee = K(e),
    ne = ee(e)
  return {
    c() {
      ;(t = m('tr')),
        (i = m('td')),
        W && W.c(),
        (o = E()),
        (s = m('td')),
        (c = T(a)),
        (h = E()),
        (f = m('td')),
        (g = T(p)),
        (b = E()),
        (v = m('td')),
        ($ = T(w)),
        (x = T('...')),
        (S = E()),
        (L = m('td')),
        (B = T(N)),
        (F = E()),
        (R = m('td')),
        ne.c(),
        (V = E()),
        Bt(s, 'cursor', 'grab'),
        y(f, 'class', 'uk-text-truncate'),
        y(R, 'class', 'uk-text-right'),
        y(t, 'class', (G = e[3] && e[6].account == e[0].account ? 'uk-text-primary' : ''))
    },
    m(Z, I) {
      M(Z, t, I),
        u(t, i),
        W && W.m(i, null),
        u(t, o),
        u(t, s),
        u(s, c),
        u(t, h),
        u(t, f),
        u(f, g),
        u(t, b),
        u(t, v),
        u(v, $),
        u(v, x),
        u(t, S),
        u(t, L),
        u(L, B),
        u(t, F),
        u(t, R),
        ne.m(R, null),
        u(t, V),
        (j = !0),
        Y || ((z = Ee(s, 'click', te)), (Y = !0))
    },
    p(Z, I) {
      ;(e = Z),
        e[6].account == e[0].account
          ? W
            ? (W.p(e, I), I & 3 && D(W, 1))
            : ((W = Ku(e)), W.c(), D(W, 1), W.m(i, null))
          : W &&
            (qe(),
            U(W, 1, 1, () => {
              W = null
            }),
            Ye()),
        (!j || I & 2) && a !== (a = e[6].nickname + '') && O(c, a),
        (!j || I & 2) && p !== (p = zi(e[6].account) + '') && O(g, p),
        (!j || I & 2) && w !== (w = e[6].auth_key.slice(0, 5) + '') && O($, w),
        (!j || I & 2) && N !== (N = sn(e[6].balance.unlocked) + '') && O(B, N),
        ee === (ee = K(e)) && ne
          ? ne.p(e, I)
          : (ne.d(1), (ne = ee(e)), ne && (ne.c(), ne.m(R, null))),
        (!j ||
          (I & 11 && G !== (G = e[3] && e[6].account == e[0].account ? 'uk-text-primary' : ''))) &&
          y(t, 'class', G)
    },
    i(Z) {
      j || (D(W), (j = !0))
    },
    o(Z) {
      U(W), (j = !1)
    },
    d(Z) {
      Z && A(t), W && W.d(), ne.d(), (Y = !1), z()
    },
  }
}
function bw(e) {
  let t,
    i,
    o = e[0] && e[1] && e[1].length > 0 && Yu(e)
  return {
    c() {
      ;(t = m('main')), o && o.c()
    },
    m(s, a) {
      M(s, t, a), o && o.m(t, null), (i = !0)
    },
    p(s, [a]) {
      s[0] && s[1] && s[1].length > 0
        ? o
          ? (o.p(s, a), a & 3 && D(o, 1))
          : ((o = Yu(s)), o.c(), D(o, 1), o.m(t, null))
        : o &&
          (qe(),
          U(o, 1, 1, () => {
            o = null
          }),
          Ye())
    },
    i(s) {
      i || (D(o), (i = !0))
    },
    o(s) {
      U(o), (i = !1)
    },
    d(s) {
      s && A(t), o && o.d()
    },
  }
}
function vw(e, t, i) {
  let o, s, a, c, h
  return (
    ae(e, It, (p) => i(0, (o = p))),
    ae(e, In, (p) => i(1, (s = p))),
    ae(e, De, (p) => i(2, (a = p))),
    ae(e, nn, (p) => i(3, (c = p))),
    ae(e, ai, (p) => i(4, (h = p))),
    wn.use(xd),
    [o, s, a, c, h, (p) => Xa(p.account)]
  )
}
class yw extends we {
  constructor(t) {
    super(), ye(this, t, vw, bw, ge, {})
  }
}
function Ju(e, t, i) {
  const o = e.slice()
  return (o[3] = t[i]), o
}
function Qu(e) {
  let t,
    i,
    o,
    s = e[2]('wallet.reminder_create.card_title') + '',
    a,
    c,
    h,
    f = e[2]('wallet.reminder_create.message_headline') + '',
    p,
    g,
    b,
    v = e[2]('wallet.reminder_create.message_prefix') + '',
    w,
    $,
    x,
    S,
    L = e[2]('wallet.reminder_create.message_suffix') + '',
    N,
    B,
    F = Pt(e[0]),
    R = []
  for (let V = 0; V < F.length; V += 1) R[V] = eh(Ju(e, F, V))
  return {
    c() {
      ;(t = m('div')),
        (i = m('div')),
        (o = m('h3')),
        (a = T(s)),
        (c = E()),
        (h = m('p')),
        (p = T(f)),
        (g = E()),
        (b = m('p')),
        (w = T(v)),
        ($ = E()),
        (x = m('a')),
        (x.innerHTML = 'Discord <span uk-icon="icon: link;ratio:0.8"></span>'),
        (S = E()),
        (N = T(L)),
        (B = E())
      for (let V = 0; V < R.length; V += 1) R[V].c()
      y(o, 'class', 'uk-card-title uk-text-uppercase uk-text-light'),
        y(x, 'href', 'https://discord.com/channels/833074824447655976/909866360060932127'),
        y(x, 'target', '_blank'),
        y(i, 'class', 'uk-card uk-card-primary uk-card-hover uk-card-body uk-light'),
        y(t, 'class', 'uk-margin-large')
    },
    m(V, G) {
      M(V, t, G),
        u(t, i),
        u(i, o),
        u(o, a),
        u(i, c),
        u(i, h),
        u(h, p),
        u(i, g),
        u(i, b),
        u(b, w),
        u(b, $),
        u(b, x),
        u(b, S),
        u(b, N),
        u(i, B)
      for (let j = 0; j < R.length; j += 1) R[j] && R[j].m(i, null)
    },
    p(V, G) {
      if (
        (G & 4 && s !== (s = V[2]('wallet.reminder_create.card_title') + '') && O(a, s),
        G & 4 && f !== (f = V[2]('wallet.reminder_create.message_headline') + '') && O(p, f),
        G & 4 && v !== (v = V[2]('wallet.reminder_create.message_prefix') + '') && O(w, v),
        G & 4 && L !== (L = V[2]('wallet.reminder_create.message_suffix') + '') && O(N, L),
        G & 5)
      ) {
        F = Pt(V[0])
        let j
        for (j = 0; j < F.length; j += 1) {
          const Y = Ju(V, F, j)
          R[j] ? R[j].p(Y, G) : ((R[j] = eh(Y)), R[j].c(), R[j].m(i, null))
        }
        for (; j < R.length; j += 1) R[j].d(1)
        R.length = F.length
      }
    },
    d(V) {
      V && A(t), $n(R, V)
    },
  }
}
function eh(e) {
  let t,
    i = e[3].nickname + '',
    o,
    s,
    a = e[2]('wallet.reminder_create.onboard_key') + '',
    c,
    h,
    f,
    p = e[3].account + '',
    g,
    b
  return {
    c() {
      ;(t = m('p')),
        (o = T(i)),
        (s = T(' - ')),
        (c = T(a)),
        (h = T(' :\n            ')),
        (f = m('span')),
        (g = T(p)),
        (b = E()),
        y(f, 'class', 'uk-text-uppercase')
    },
    m(v, w) {
      M(v, t, w), u(t, o), u(t, s), u(t, c), u(t, h), u(t, f), u(f, g), u(t, b)
    },
    p(v, w) {
      w & 1 && i !== (i = v[3].nickname + '') && O(o, i),
        w & 4 && a !== (a = v[2]('wallet.reminder_create.onboard_key') + '') && O(c, a),
        w & 1 && p !== (p = v[3].account + '') && O(g, p)
    },
    d(v) {
      v && A(t)
    },
  }
}
function ww(e) {
  let t,
    i = e[0].length > 0 && e[1] && Qu(e)
  return {
    c() {
      ;(t = m('main')), i && i.c()
    },
    m(o, s) {
      M(o, t, s), i && i.m(t, null)
    },
    p(o, [s]) {
      o[0].length > 0 && o[1]
        ? i
          ? i.p(o, s)
          : ((i = Qu(o)), i.c(), i.m(t, null))
        : i && (i.d(1), (i = null))
    },
    i: ce,
    o: ce,
    d(o) {
      o && A(t), i && i.d()
    },
  }
}
function kw(e, t, i) {
  let o
  ae(e, De, (c) => i(2, (o = c)))
  let { pendingAccounts: s } = t,
    { isConnected: a } = t
  return (
    (e.$$set = (c) => {
      'pendingAccounts' in c && i(0, (s = c.pendingAccounts)),
        'isConnected' in c && i(1, (a = c.isConnected))
    }),
    [s, a, o]
  )
}
class $w extends we {
  constructor(t) {
    super(), ye(this, t, kw, ww, ge, { pendingAccounts: 0, isConnected: 1 })
  }
}
function Cw(e) {
  let t,
    i,
    o = e[1]('wallet.wallet') + '',
    s,
    a,
    c,
    h,
    f,
    p,
    g,
    b
  ;(c = new yw({})), (f = new Ed({}))
  let v = e[2] && e[3].length > 0 && th(e)
  return {
    c() {
      ;(t = m('div')),
        (i = m('h2')),
        (s = T(o)),
        (a = E()),
        re(c.$$.fragment),
        (h = E()),
        re(f.$$.fragment),
        (p = E()),
        v && v.c(),
        (g = Tt()),
        y(i, 'class', 'uk-text-light uk-text-muted uk-text-uppercase'),
        y(t, 'class', 'uk-flex uk-flex-center')
    },
    m(w, $) {
      M(w, t, $),
        u(t, i),
        u(i, s),
        M(w, a, $),
        oe(c, w, $),
        M(w, h, $),
        oe(f, w, $),
        M(w, p, $),
        v && v.m(w, $),
        M(w, g, $),
        (b = !0)
    },
    p(w, $) {
      ;(!b || $ & 2) && o !== (o = w[1]('wallet.wallet') + '') && O(s, o),
        w[2] && w[3].length > 0
          ? v
            ? (v.p(w, $), $ & 4 && D(v, 1))
            : ((v = th(w)), v.c(), D(v, 1), v.m(g.parentNode, g))
          : v &&
            (qe(),
            U(v, 1, 1, () => {
              v = null
            }),
            Ye())
    },
    i(w) {
      b || (D(c.$$.fragment, w), D(f.$$.fragment, w), D(v), (b = !0))
    },
    o(w) {
      U(c.$$.fragment, w), U(f.$$.fragment, w), U(v), (b = !1)
    },
    d(w) {
      w && (A(t), A(a), A(h), A(p), A(g)), se(c, w), se(f, w), v && v.d(w)
    },
  }
}
function xw(e) {
  let t, i
  return (
    (t = new sw({})),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p: ce,
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function th(e) {
  let t, i
  return (
    (t = new $w({ props: { pendingAccounts: e[3], isConnected: e[2] } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 4 && (a.isConnected = o[2]), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function Ew(e) {
  let t, i, o, s, a
  const c = [xw, Cw],
    h = []
  function f(p, g) {
    return !p[0] || (p[0] && p[0].length == 0) ? 0 : p[0] && p[0].length > 0 ? 1 : -1
  }
  return (
    ~(o = f(e)) && (s = h[o] = c[o](e)),
    {
      c() {
        ;(t = m('main')), (i = m('div')), s && s.c()
      },
      m(p, g) {
        M(p, t, g), u(t, i), ~o && h[o].m(i, null), (a = !0)
      },
      p(p, [g]) {
        let b = o
        ;(o = f(p)),
          o === b
            ? ~o && h[o].p(p, g)
            : (s &&
                (qe(),
                U(h[b], 1, 1, () => {
                  h[b] = null
                }),
                Ye()),
              ~o
                ? ((s = h[o]), s ? s.p(p, g) : ((s = h[o] = c[o](p)), s.c()), D(s, 1), s.m(i, null))
                : (s = null))
      },
      i(p) {
        a || (D(s), (a = !0))
      },
      o(p) {
        U(s), (a = !1)
      },
      d(p) {
        p && A(t), ~o && h[o].d()
      },
    }
  )
}
function Sw(e, t, i) {
  let o, s, a
  ae(e, In, (h) => i(0, (o = h))),
    ae(e, De, (h) => i(1, (s = h))),
    ae(e, ai, (h) => i(2, (a = h))),
    wn.use(xd)
  let c = o.filter((h) => h && !h.on_chain)
  return [o, s, a, c]
}
class Tw extends we {
  constructor(t) {
    super(), ye(this, t, Sw, Ew, ge, {})
  }
}
const Td = async () => {
  console.log('submitBacklog called'),
    Lf(),
    tn.set(!0),
    Ke('submit_backlog', {})
      .then(
        (e) => (
          tn.set(!1),
          Ii.set(!0),
          console.log('submit_backlog response: ' + e),
          zt.set(e),
          on('Backlog submitted'),
          e
        ),
      )
      .catch((e) => {
        tn.set(!1),
          Ii.set(!1),
          Ht(Rt.Info, ' submit_backlog error: ' + e),
          Ze(e, !1, 'submitBacklog')
      })
}
function Lw(e) {
  let t,
    i = e[0]('miner.miner_backlog.btn_submit') + '',
    o,
    s,
    a
  return {
    c() {
      ;(t = m('button')), (o = T(i)), y(t, 'class', 'uk-button uk-button-default')
    },
    m(c, h) {
      M(c, t, h), u(t, o), s || ((a = Ee(t, 'click', e[2])), (s = !0))
    },
    p(c, h) {
      h & 1 && i !== (i = c[0]('miner.miner_backlog.btn_submit') + '') && O(o, i)
    },
    d(c) {
      c && A(t), (s = !1), a()
    },
  }
}
function Aw(e) {
  let t,
    i = e[0]('miner.miner_backlog.in_process') + '',
    o
  return {
    c() {
      ;(t = m('button')), (o = T(i)), y(t, 'class', 'uk-button'), (t.disabled = !0)
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 1 && i !== (i = s[0]('miner.miner_backlog.in_process') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function Mw(e) {
  let t,
    i,
    o = e[0]('miner.miner_backlog.title') + '',
    s,
    a,
    c,
    h,
    f,
    p = e[0]('miner.miner_backlog.subtitle') + '',
    g,
    b
  function v(x, S) {
    return x[1] ? Aw : Lw
  }
  let w = v(e),
    $ = w(e)
  return {
    c() {
      ;(t = m('main')),
        (i = m('h4')),
        (s = T(o)),
        (a = E()),
        (c = m('div')),
        (h = m('div')),
        (f = m('p')),
        (g = T(p)),
        (b = E()),
        $.c(),
        y(i, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(c, 'class', 'uk-margin uk-grid'),
        y(t, 'class', 'uk-margin')
    },
    m(x, S) {
      M(x, t, S),
        u(t, i),
        u(i, s),
        u(t, a),
        u(t, c),
        u(c, h),
        u(h, f),
        u(f, g),
        u(h, b),
        $.m(h, null)
    },
    p(x, [S]) {
      S & 1 && o !== (o = x[0]('miner.miner_backlog.title') + '') && O(s, o),
        S & 1 && p !== (p = x[0]('miner.miner_backlog.subtitle') + '') && O(g, p),
        w === (w = v(x)) && $ ? $.p(x, S) : ($.d(1), ($ = w(x)), $ && ($.c(), $.m(h, null)))
    },
    i: ce,
    o: ce,
    d(x) {
      x && A(t), $.d()
    },
  }
}
function Pw(e, t, i) {
  let o, s
  return ae(e, De, (c) => i(0, (o = c))), ae(e, tn, (c) => i(1, (s = c))), [o, s, () => Td()]
}
class Ld extends we {
  constructor(t) {
    super(), ye(this, t, Pw, Mw, ge, {})
  }
}
function Iw(e) {
  let t, i, o, s, a, c, h, f, p
  return {
    c() {
      ;(t = m('div')),
        (i = m('h4')),
        (i.textContent = 'Debug Mode'),
        (o = E()),
        (s = m('label')),
        (a = m('input')),
        (c = E()),
        (h = m('div')),
        y(i, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(a, 'type', 'checkbox'),
        (a.checked = e[0]),
        y(h, 'class', 'uk-switch-slider uk-switch-on-off round'),
        y(s, 'class', 'uk-switch')
    },
    m(g, b) {
      M(g, t, b),
        u(t, i),
        u(t, o),
        u(t, s),
        u(s, a),
        u(s, c),
        u(s, h),
        f || ((p = Ee(a, 'click', e[1])), (f = !0))
    },
    p(g, [b]) {
      b & 1 && (a.checked = g[0])
    },
    i: ce,
    o: ce,
    d(g) {
      g && A(t), (f = !1), p()
    },
  }
}
function Nw(e, t, i) {
  let o = !1
  return (
    wt(async () => {
      ri.subscribe((a) => i(0, (o = a)))
    }),
    [o, () => Nf()]
  )
}
class Ad extends we {
  constructor(t) {
    super(), ye(this, t, Nw, Iw, ge, {})
  }
}
const Ow = (e) => ({}),
  nh = (e) => ({}),
  Bw = (e) => ({}),
  ih = (e) => ({})
function Dw(e) {
  let t, i, o, s, a, c, h, f
  const p = e[1].title,
    g = ti(p, e, e[0], ih),
    b = e[1].body,
    v = ti(b, e, e[0], nh)
  return (
    (h = new Ad({})),
    {
      c() {
        ;(t = m('main')),
          (i = m('div')),
          (o = m('h3')),
          g && g.c(),
          (s = E()),
          (a = m('div')),
          v && v.c(),
          (c = E()),
          re(h.$$.fragment),
          y(o, 'class', 'uk-card-title uk-text-uppercase'),
          y(i, 'class', 'uk-card uk-card-secondary uk-card-hover uk-card-body uk-light')
      },
      m(w, $) {
        M(w, t, $),
          u(t, i),
          u(i, o),
          g && g.m(o, null),
          u(i, s),
          u(i, a),
          v && v.m(a, null),
          u(i, c),
          oe(h, i, null),
          (f = !0)
      },
      p(w, [$]) {
        g && g.p && (!f || $ & 1) && ii(g, p, w, w[0], f ? ni(p, w[0], $, Bw) : oi(w[0]), ih),
          v && v.p && (!f || $ & 1) && ii(v, b, w, w[0], f ? ni(b, w[0], $, Ow) : oi(w[0]), nh)
      },
      i(w) {
        f || (D(g, w), D(v, w), D(h.$$.fragment, w), (f = !0))
      },
      o(w) {
        U(g, w), U(v, w), U(h.$$.fragment, w), (f = !1)
      },
      d(w) {
        w && A(t), g && g.d(w), v && v.d(w), se(h)
      },
    }
  )
}
function Rw(e, t, i) {
  let { $$slots: o = {}, $$scope: s } = t
  return (
    (e.$$set = (a) => {
      '$$scope' in a && i(0, (s = a.$$scope))
    }),
    [s, o]
  )
}
class Ro extends we {
  constructor(t) {
    super(), ye(this, t, Rw, Dw, ge, {})
  }
}
function Hw(e) {
  let t, i, o
  return {
    c() {
      ;(t = m('span')), (i = T(e[0])), (o = T(' proofs missing')), y(t, 'slot', 'title')
    },
    m(s, a) {
      M(s, t, a), u(t, i), u(t, o)
    },
    p(s, a) {
      a & 1 && O(i, s[0])
    },
    d(s) {
      s && A(t)
    },
  }
}
function zw(e) {
  let t, i, o
  return (
    (i = new Ld({})),
    {
      c() {
        ;(t = m('div')), re(i.$$.fragment), y(t, 'slot', 'body')
      },
      m(s, a) {
        M(s, t, a), oe(i, t, null), (o = !0)
      },
      p: ce,
      i(s) {
        o || (D(i.$$.fragment, s), (o = !0))
      },
      o(s) {
        U(i.$$.fragment, s), (o = !1)
      },
      d(s) {
        s && A(t), se(i)
      },
    }
  )
}
function Uw(e) {
  let t, i, o
  return (
    (i = new Ro({ props: { $$slots: { body: [zw], title: [Hw] }, $$scope: { ctx: e } } })),
    {
      c() {
        ;(t = m('main')), re(i.$$.fragment)
      },
      m(s, a) {
        M(s, t, a), oe(i, t, null), (o = !0)
      },
      p(s, [a]) {
        const c = {}
        a & 3 && (c.$$scope = { dirty: a, ctx: s }), i.$set(c)
      },
      i(s) {
        o || (D(i.$$.fragment, s), (o = !0))
      },
      o(s) {
        U(i.$$.fragment, s), (o = !1)
      },
      d(s) {
        s && A(t), se(i)
      },
    }
  )
}
function Fw(e, t, i) {
  let { delta: o } = t
  return (
    (e.$$set = (s) => {
      'delta' in s && i(0, (o = s.delta))
    }),
    [o]
  )
}
class Ww extends we {
  constructor(t) {
    super(), ye(this, t, Fw, Uw, ge, { delta: 0 })
  }
}
function Vw(e) {
  let t, i
  return (
    (t = new Ww({ props: { delta: e[1] } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 2 && (a.delta = o[1]), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function Gw(e) {
  let t, i
  return (
    (t = new Bn({ props: { $$slots: { body: [Kw], title: [jw] }, $$scope: { ctx: e } } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 74 && (a.$$scope = { dirty: s, ctx: o }), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function jw(e) {
  let t,
    i = e[3]('miner.cards.sync_proof.title') + '',
    o,
    s,
    a
  return {
    c() {
      ;(t = m('span')),
        (o = T(i)),
        (s = E()),
        (a = m('span')),
        y(a, 'class', 'uk-margin'),
        y(a, 'uk-spinner', 'ratio: 0.5'),
        y(t, 'slot', 'title'),
        y(t, 'class', 'uk-text-uppercase')
    },
    m(c, h) {
      M(c, t, h), u(t, o), u(t, s), u(t, a)
    },
    p(c, h) {
      h & 8 && i !== (i = c[3]('miner.cards.sync_proof.title') + '') && O(o, i)
    },
    d(c) {
      c && A(t)
    },
  }
}
function qw(e) {
  let t,
    i = e[3]('miner.cards.sync_proof.body_0') + '',
    o
  return {
    c() {
      ;(t = m('p')), (o = T(i)), y(t, 'class', 'uk-text-muted uk-text-uppercase')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 8 && i !== (i = s[3]('miner.cards.sync_proof.body_0') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function Yw(e) {
  let t,
    i = e[3]('miner.cards.sync_proof.body', { values: { delta: e[1] } }) + '',
    o
  return {
    c() {
      ;(t = m('p')), (o = T(i)), y(t, 'class', 'uk-text-muted uk-text-uppercase')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 10 &&
        i !== (i = s[3]('miner.cards.sync_proof.body', { values: { delta: s[1] } }) + '') &&
        O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function Kw(e) {
  let t
  function i(a, c) {
    if (a[1] > 0) return Yw
    if (a[1] < 0) return qw
  }
  let o = i(e),
    s = o && o(e)
  return {
    c() {
      ;(t = m('div')), s && s.c(), y(t, 'slot', 'body')
    },
    m(a, c) {
      M(a, t, c), s && s.m(t, null)
    },
    p(a, c) {
      o === (o = i(a)) && s ? s.p(a, c) : (s && s.d(1), (s = o && o(a)), s && (s.c(), s.m(t, null)))
    },
    d(a) {
      a && A(t), s && s.d()
    },
  }
}
function Zw(e) {
  let t, i, o, s
  const a = [Gw, Vw],
    c = []
  function h(f, p) {
    return f[2] ? 0 : !f[0] && f[1] && f[1] > 0 ? 1 : -1
  }
  return (
    ~(i = h(e)) && (o = c[i] = a[i](e)),
    {
      c() {
        ;(t = m('main')), o && o.c()
      },
      m(f, p) {
        M(f, t, p), ~i && c[i].m(t, null), (s = !0)
      },
      p(f, [p]) {
        let g = i
        ;(i = h(f)),
          i === g
            ? ~i && c[i].p(f, p)
            : (o &&
                (qe(),
                U(c[g], 1, 1, () => {
                  c[g] = null
                }),
                Ye()),
              ~i
                ? ((o = c[i]), o ? o.p(f, p) : ((o = c[i] = a[i](f)), o.c()), D(o, 1), o.m(t, null))
                : (o = null))
      },
      i(f) {
        s || (D(o), (s = !0))
      },
      o(f) {
        U(o), (s = !1)
      },
      d(f) {
        f && A(t), ~i && c[i].d()
      },
    }
  )
}
function Xw(e, t, i) {
  let o
  ae(e, De, (p) => i(3, (o = p)))
  let { minerTower: s } = t,
    { loading: a = !0 } = t,
    c = null,
    h = !1,
    f
  return (
    Yh(() => {
      let p = s.on_chain ? s.on_chain : 0
      i(1, (c = s.local_height - p))
    }),
    wt(async () => {
      f = Pn.subscribe((p) => i(2, (h = p)))
    }),
    Ut(async () => {
      f && f()
    }),
    (e.$$set = (p) => {
      'minerTower' in p && i(4, (s = p.minerTower)), 'loading' in p && i(0, (a = p.loading))
    }),
    [a, c, h, o, s]
  )
}
class Jw extends we {
  constructor(t) {
    super(), ye(this, t, Xw, Zw, ge, { minerTower: 4, loading: 0 })
  }
}
function Qw(e) {
  let t,
    i,
    o,
    s,
    a = e[1]('layout.error_accordion.title') + '',
    c,
    h,
    f,
    p,
    g = e[1]('layout.error_accordion.category') + '',
    b,
    v,
    w = e[0].category + '',
    $,
    x,
    S,
    L = e[1]('layout.error_accordion.id') + '',
    N,
    B,
    F = e[0].uid + '',
    R,
    V,
    G,
    j = e[0].msg + '',
    Y
  return {
    c() {
      ;(t = m('main')),
        (i = m('ul')),
        (o = m('li')),
        (s = m('a')),
        (c = T(a)),
        (h = E()),
        (f = m('div')),
        (p = m('p')),
        (b = T(g)),
        (v = T(' - ')),
        ($ = T(w)),
        (x = E()),
        (S = m('p')),
        (N = T(L)),
        (B = T(' - ')),
        (R = T(F)),
        (V = E()),
        (G = m('p')),
        (Y = T(j)),
        y(s, 'class', 'uk-accordion-title'),
        y(s, 'href', '#'),
        y(f, 'class', 'uk-accordion-content'),
        y(i, 'uk-accordion', '')
    },
    m(z, W) {
      M(z, t, W),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, c),
        u(o, h),
        u(o, f),
        u(f, p),
        u(p, b),
        u(p, v),
        u(p, $),
        u(f, x),
        u(f, S),
        u(S, N),
        u(S, B),
        u(S, R),
        u(f, V),
        u(f, G),
        u(G, Y)
    },
    p(z, [W]) {
      W & 2 && a !== (a = z[1]('layout.error_accordion.title') + '') && O(c, a),
        W & 2 && g !== (g = z[1]('layout.error_accordion.category') + '') && O(b, g),
        W & 1 && w !== (w = z[0].category + '') && O($, w),
        W & 2 && L !== (L = z[1]('layout.error_accordion.id') + '') && O(N, L),
        W & 1 && F !== (F = z[0].uid + '') && O(R, F),
        W & 1 && j !== (j = z[0].msg + '') && O(Y, j)
    },
    i: ce,
    o: ce,
    d(z) {
      z && A(t)
    },
  }
}
function e5(e, t, i) {
  let o
  ae(e, De, (a) => i(1, (o = a)))
  let { error: s } = t
  return (
    (e.$$set = (a) => {
      'error' in a && i(0, (s = a.error))
    }),
    [s, o]
  )
}
class Fs extends we {
  constructor(t) {
    super(), ye(this, t, e5, Qw, ge, { error: 0 })
  }
}
function oh(e) {
  let t, i, o
  return (
    (i = new Ro({ props: { $$slots: { body: [n5], title: [t5] }, $$scope: { ctx: e } } })),
    {
      c() {
        ;(t = m('main')), re(i.$$.fragment)
      },
      m(s, a) {
        M(s, t, a), oe(i, t, null), (o = !0)
      },
      p(s, a) {
        const c = {}
        a & 11 && (c.$$scope = { dirty: a, ctx: s }), i.$set(c)
      },
      i(s) {
        o || (D(i.$$.fragment, s), (o = !0))
      },
      o(s) {
        U(i.$$.fragment, s), (o = !1)
      },
      d(s) {
        s && A(t), se(i)
      },
    }
  )
}
function t5(e) {
  let t,
    i = e[1]('miner.cards.disco_error.title') + '',
    o
  return {
    c() {
      ;(t = m('span')), (o = T(i)), y(t, 'slot', 'title')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 2 && i !== (i = s[1]('miner.cards.disco_error.title') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function n5(e) {
  let t,
    i,
    o = e[1]('miner.cards.disco_error.body') + '',
    s,
    a,
    c,
    h
  return (
    (c = new Fs({ props: { error: e[0] } })),
    {
      c() {
        ;(t = m('div')),
          (i = m('p')),
          (s = T(o)),
          (a = E()),
          re(c.$$.fragment),
          y(t, 'slot', 'body')
      },
      m(f, p) {
        M(f, t, p), u(t, i), u(i, s), u(t, a), oe(c, t, null), (h = !0)
      },
      p(f, p) {
        ;(!h || p & 2) && o !== (o = f[1]('miner.cards.disco_error.body') + '') && O(s, o)
        const g = {}
        p & 1 && (g.error = f[0]), c.$set(g)
      },
      i(f) {
        h || (D(c.$$.fragment, f), (h = !0))
      },
      o(f) {
        U(c.$$.fragment, f), (h = !1)
      },
      d(f) {
        f && A(t), se(c)
      },
    }
  )
}
function i5(e) {
  let t,
    i,
    o = e[0] && oh(e)
  return {
    c() {
      o && o.c(), (t = Tt())
    },
    m(s, a) {
      o && o.m(s, a), M(s, t, a), (i = !0)
    },
    p(s, [a]) {
      s[0]
        ? o
          ? (o.p(s, a), a & 1 && D(o, 1))
          : ((o = oh(s)), o.c(), D(o, 1), o.m(t.parentNode, t))
        : o &&
          (qe(),
          U(o, 1, 1, () => {
            o = null
          }),
          Ye())
    },
    i(s) {
      i || (D(o), (i = !0))
    },
    o(s) {
      U(o), (i = !1)
    },
    d(s) {
      s && A(t), o && o.d(s)
    },
  }
}
function o5(e, t, i) {
  let o
  ae(e, De, (c) => i(1, (o = c)))
  let s = null,
    a
  return (
    wt(async () => {
      a = Pa.subscribe((c) => {
        i(0, (s = c.category ? c : null))
      })
    }),
    Ut(async () => {
      a && a()
    }),
    [s, o]
  )
}
class s5 extends we {
  constructor(t) {
    super(), ye(this, t, o5, i5, ge, {})
  }
}
function sh(e) {
  let t, i, o
  return (
    (i = new Ro({ props: { $$slots: { body: [a5], title: [r5] }, $$scope: { ctx: e } } })),
    {
      c() {
        ;(t = m('main')), re(i.$$.fragment)
      },
      m(s, a) {
        M(s, t, a), oe(i, t, null), (o = !0)
      },
      p(s, a) {
        const c = {}
        a & 11 && (c.$$scope = { dirty: a, ctx: s }), i.$set(c)
      },
      i(s) {
        o || (D(i.$$.fragment, s), (o = !0))
      },
      o(s) {
        U(i.$$.fragment, s), (o = !1)
      },
      d(s) {
        s && A(t), se(i)
      },
    }
  )
}
function r5(e) {
  let t,
    i = e[1]('miner.cards.invalid_proof.title') + '',
    o
  return {
    c() {
      ;(t = m('span')), (o = T(i)), y(t, 'slot', 'title')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 2 && i !== (i = s[1]('miner.cards.invalid_proof.title') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function a5(e) {
  let t,
    i,
    o = e[1]('miner.cards.invalid_proof.body') + '',
    s,
    a,
    c,
    h
  return (
    (c = new Fs({ props: { error: e[0] } })),
    {
      c() {
        ;(t = m('div')),
          (i = m('p')),
          (s = T(o)),
          (a = E()),
          re(c.$$.fragment),
          y(t, 'slot', 'body')
      },
      m(f, p) {
        M(f, t, p), u(t, i), u(i, s), u(t, a), oe(c, t, null), (h = !0)
      },
      p(f, p) {
        ;(!h || p & 2) && o !== (o = f[1]('miner.cards.invalid_proof.body') + '') && O(s, o)
        const g = {}
        p & 1 && (g.error = f[0]), c.$set(g)
      },
      i(f) {
        h || (D(c.$$.fragment, f), (h = !0))
      },
      o(f) {
        U(c.$$.fragment, f), (h = !1)
      },
      d(f) {
        f && A(t), se(c)
      },
    }
  )
}
function l5(e) {
  let t,
    i,
    o = e[0] && sh(e)
  return {
    c() {
      o && o.c(), (t = Tt())
    },
    m(s, a) {
      o && o.m(s, a), M(s, t, a), (i = !0)
    },
    p(s, [a]) {
      s[0]
        ? o
          ? (o.p(s, a), a & 1 && D(o, 1))
          : ((o = sh(s)), o.c(), D(o, 1), o.m(t.parentNode, t))
        : o &&
          (qe(),
          U(o, 1, 1, () => {
            o = null
          }),
          Ye())
    },
    i(s) {
      i || (D(o), (i = !0))
    },
    o(s) {
      U(o), (i = !1)
    },
    d(s) {
      s && A(t), o && o.d(s)
    },
  }
}
function c5(e, t, i) {
  let o
  ae(e, De, (c) => i(1, (o = c)))
  let s = null,
    a
  return (
    wt(async () => {
      a = Ia.subscribe((c) => {
        i(0, (s = c.category ? c : null))
      })
    }),
    Ut(async () => {
      a && a()
    }),
    [s, o]
  )
}
class u5 extends we {
  constructor(t) {
    super(), ye(this, t, c5, l5, ge, {})
  }
}
function rh(e) {
  let t, i, o
  return (
    (i = new Ro({ props: { $$slots: { body: [f5], title: [h5] }, $$scope: { ctx: e } } })),
    {
      c() {
        ;(t = m('main')), re(i.$$.fragment)
      },
      m(s, a) {
        M(s, t, a), oe(i, t, null), (o = !0)
      },
      p(s, a) {
        const c = {}
        a & 11 && (c.$$scope = { dirty: a, ctx: s }), i.$set(c)
      },
      i(s) {
        o || (D(i.$$.fragment, s), (o = !0))
      },
      o(s) {
        U(i.$$.fragment, s), (o = !1)
      },
      d(s) {
        s && A(t), se(i)
      },
    }
  )
}
function h5(e) {
  let t,
    i = e[1]('miner.cards.too_many_proofs.title') + '',
    o
  return {
    c() {
      ;(t = m('span')), (o = T(i)), y(t, 'slot', 'title')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 2 && i !== (i = s[1]('miner.cards.too_many_proofs.title') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function f5(e) {
  let t,
    i,
    o = e[1]('miner.cards.too_many_proofs.body', { values: { maxNum: ah } }) + '',
    s,
    a,
    c,
    h
  return (
    (c = new Fs({ props: { error: e[0] } })),
    {
      c() {
        ;(t = m('div')),
          (i = m('p')),
          (s = T(o)),
          (a = E()),
          re(c.$$.fragment),
          y(t, 'slot', 'body')
      },
      m(f, p) {
        M(f, t, p), u(t, i), u(i, s), u(t, a), oe(c, t, null), (h = !0)
      },
      p(f, p) {
        ;(!h || p & 2) &&
          o !== (o = f[1]('miner.cards.too_many_proofs.body', { values: { maxNum: ah } }) + '') &&
          O(s, o)
        const g = {}
        p & 1 && (g.error = f[0]), c.$set(g)
      },
      i(f) {
        h || (D(c.$$.fragment, f), (h = !0))
      },
      o(f) {
        U(c.$$.fragment, f), (h = !1)
      },
      d(f) {
        f && A(t), se(c)
      },
    }
  )
}
function d5(e) {
  let t,
    i,
    o = e[0] && rh(e)
  return {
    c() {
      o && o.c(), (t = Tt())
    },
    m(s, a) {
      o && o.m(s, a), M(s, t, a), (i = !0)
    },
    p(s, [a]) {
      s[0]
        ? o
          ? (o.p(s, a), a & 1 && D(o, 1))
          : ((o = rh(s)), o.c(), D(o, 1), o.m(t.parentNode, t))
        : o &&
          (qe(),
          U(o, 1, 1, () => {
            o = null
          }),
          Ye())
    },
    i(s) {
      i || (D(o), (i = !0))
    },
    o(s) {
      U(o), (i = !1)
    },
    d(s) {
      s && A(t), o && o.d(s)
    },
  }
}
let ah = 72
function p5(e, t, i) {
  let o
  ae(e, De, (c) => i(1, (o = c)))
  let s,
    a = null
  return (
    wt(async () => {
      s = Ma.subscribe((c) => {
        i(0, (a = c.category ? c : null))
      })
    }),
    Ut(async () => {
      s && s()
    }),
    [a, o]
  )
}
class m5 extends we {
  constructor(t) {
    super(), ye(this, t, p5, d5, ge, {})
  }
}
function lh(e) {
  let t, i, o
  return (
    (i = new Ro({ props: { $$slots: { body: [_5], title: [g5] }, $$scope: { ctx: e } } })),
    {
      c() {
        ;(t = m('main')), re(i.$$.fragment)
      },
      m(s, a) {
        M(s, t, a), oe(i, t, null), (o = !0)
      },
      p(s, a) {
        const c = {}
        a & 11 && (c.$$scope = { dirty: a, ctx: s }), i.$set(c)
      },
      i(s) {
        o || (D(i.$$.fragment, s), (o = !0))
      },
      o(s) {
        U(i.$$.fragment, s), (o = !1)
      },
      d(s) {
        s && A(t), se(i)
      },
    }
  )
}
function g5(e) {
  let t,
    i = e[1]('miner.cards.wrong_difficulty.title') + '',
    o
  return {
    c() {
      ;(t = m('span')), (o = T(i)), y(t, 'slot', 'title')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 2 && i !== (i = s[1]('miner.cards.wrong_difficulty.title') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function _5(e) {
  let t,
    i,
    o = e[1]('miner.cards.wrong_difficulty.body') + '',
    s,
    a,
    c,
    h
  return (
    (c = new Fs({ props: { error: e[0] } })),
    {
      c() {
        ;(t = m('div')),
          (i = m('p')),
          (s = T(o)),
          (a = E()),
          re(c.$$.fragment),
          y(t, 'slot', 'body')
      },
      m(f, p) {
        M(f, t, p), u(t, i), u(i, s), u(t, a), oe(c, t, null), (h = !0)
      },
      p(f, p) {
        ;(!h || p & 2) && o !== (o = f[1]('miner.cards.wrong_difficulty.body') + '') && O(s, o)
        const g = {}
        p & 1 && (g.error = f[0]), c.$set(g)
      },
      i(f) {
        h || (D(c.$$.fragment, f), (h = !0))
      },
      o(f) {
        U(c.$$.fragment, f), (h = !1)
      },
      d(f) {
        f && A(t), se(c)
      },
    }
  )
}
function b5(e) {
  let t,
    i,
    o = e[0] && lh(e)
  return {
    c() {
      o && o.c(), (t = Tt())
    },
    m(s, a) {
      o && o.m(s, a), M(s, t, a), (i = !0)
    },
    p(s, [a]) {
      s[0]
        ? o
          ? (o.p(s, a), a & 1 && D(o, 1))
          : ((o = lh(s)), o.c(), D(o, 1), o.m(t.parentNode, t))
        : o &&
          (qe(),
          U(o, 1, 1, () => {
            o = null
          }),
          Ye())
    },
    i(s) {
      i || (D(o), (i = !0))
    },
    o(s) {
      U(o), (i = !1)
    },
    d(s) {
      s && A(t), o && o.d(s)
    },
  }
}
function v5(e, t, i) {
  let o
  ae(e, De, (c) => i(1, (o = c)))
  let s,
    a = null
  return (
    wt(async () => {
      s = Aa.subscribe((c) => {
        i(0, (a = c.category ? c : null))
      })
    }),
    Ut(async () => {
      s && s()
    }),
    [a, o]
  )
}
class y5 extends we {
  constructor(t) {
    super(), ye(this, t, v5, b5, ge, {})
  }
}
function w5(e) {
  let t, i, o, s, a, c, h, f, p, g
  return (
    (o = new y5({})),
    (a = new m5({})),
    (h = new u5({})),
    (p = new s5({})),
    {
      c() {
        ;(t = m('main')),
          (i = m('div')),
          re(o.$$.fragment),
          (s = E()),
          re(a.$$.fragment),
          (c = E()),
          re(h.$$.fragment),
          (f = E()),
          re(p.$$.fragment),
          y(i, 'class', 'uk-grid uk-child-width-expand'),
          y(t, 'class', 'uk-margin')
      },
      m(b, v) {
        M(b, t, v),
          u(t, i),
          oe(o, i, null),
          u(i, s),
          oe(a, i, null),
          u(i, c),
          oe(h, i, null),
          u(i, f),
          oe(p, i, null),
          (g = !0)
      },
      p: ce,
      i(b) {
        g ||
          (D(o.$$.fragment, b),
          D(a.$$.fragment, b),
          D(h.$$.fragment, b),
          D(p.$$.fragment, b),
          (g = !0))
      },
      o(b) {
        U(o.$$.fragment, b), U(a.$$.fragment, b), U(h.$$.fragment, b), U(p.$$.fragment, b), (g = !1)
      },
      d(b) {
        b && A(t), se(o), se(a), se(h), se(p)
      },
    }
  )
}
class k5 extends we {
  constructor(t) {
    super(), ye(this, t, null, w5, ge, {})
  }
}
function $5(e) {
  let t,
    i = e[2]('miner.cards.epoch_status.in_process_title') + '',
    o,
    s,
    a,
    c = e[2]('miner.cards.epoch_status.in_process_body') + '',
    h
  return {
    c() {
      ;(t = m('h3')),
        (o = T(i)),
        (s = E()),
        (a = m('p')),
        (h = T(c)),
        y(t, 'class', 'uk-card-title uk-text-uppercase uk-text-light uk-text-muted'),
        y(a, 'class', 'uk-text-light uk-text-muted')
    },
    m(f, p) {
      M(f, t, p), u(t, o), M(f, s, p), M(f, a, p), u(a, h)
    },
    p(f, p) {
      p & 4 && i !== (i = f[2]('miner.cards.epoch_status.in_process_title') + '') && O(o, i),
        p & 4 && c !== (c = f[2]('miner.cards.epoch_status.in_process_body') + '') && O(h, c)
    },
    d(f) {
      f && (A(t), A(s), A(a))
    },
  }
}
function C5(e) {
  let t,
    i = e[2]('miner.cards.epoch_status.empty_title') + '',
    o,
    s,
    a,
    c = e[2]('miner.cards.epoch_status.empty_body') + '',
    h
  return {
    c() {
      ;(t = m('h3')),
        (o = T(i)),
        (s = E()),
        (a = m('p')),
        (h = T(c)),
        y(t, 'class', 'uk-card-title uk-text-uppercase uk-text-light uk-text-muted'),
        y(a, 'class', 'uk-text-light uk-text-muted')
    },
    m(f, p) {
      M(f, t, p), u(t, o), M(f, s, p), M(f, a, p), u(a, h)
    },
    p(f, p) {
      p & 4 && i !== (i = f[2]('miner.cards.epoch_status.empty_title') + '') && O(o, i),
        p & 4 && c !== (c = f[2]('miner.cards.epoch_status.empty_body') + '') && O(h, c)
    },
    d(f) {
      f && (A(t), A(s), A(a))
    },
  }
}
function x5(e) {
  let t,
    i = e[2]('miner.cards.epoch_status.complete_title') + '',
    o,
    s,
    a,
    c = e[2]('miner.cards.epoch_status.complete_body') + '',
    h
  return {
    c() {
      ;(t = m('h3')),
        (o = T(i)),
        (s = E()),
        (a = m('p')),
        (h = T(c)),
        y(t, 'class', 'uk-card-title uk-text-uppercase uk-text-light uk-text-muted'),
        y(a, 'class', 'uk-text-light uk-text-muted')
    },
    m(f, p) {
      M(f, t, p), u(t, o), M(f, s, p), M(f, a, p), u(a, h)
    },
    p(f, p) {
      p & 4 && i !== (i = f[2]('miner.cards.epoch_status.complete_title') + '') && O(o, i),
        p & 4 && c !== (c = f[2]('miner.cards.epoch_status.complete_body') + '') && O(h, c)
    },
    d(f) {
      f && (A(t), A(s), A(a))
    },
  }
}
function E5(e) {
  let t,
    i = e[2]('miner.cards.epoch_status.exceed_title') + '',
    o,
    s,
    a,
    c = e[2]('miner.cards.epoch_status.exceed_body') + '',
    h
  return {
    c() {
      ;(t = m('h3')),
        (o = T(i)),
        (s = E()),
        (a = m('p')),
        (h = T(c)),
        y(t, 'class', 'uk-card-title uk-text-uppercase uk-text-light uk-text-muted'),
        y(a, 'class', 'uk-text-light uk-text-muted')
    },
    m(f, p) {
      M(f, t, p), u(t, o), M(f, s, p), M(f, a, p), u(a, h)
    },
    p(f, p) {
      p & 4 && i !== (i = f[2]('miner.cards.epoch_status.exceed_title') + '') && O(o, i),
        p & 4 && c !== (c = f[2]('miner.cards.epoch_status.exceed_body') + '') && O(h, c)
    },
    d(f) {
      f && (A(t), A(s), A(a))
    },
  }
}
function S5(e) {
  let t, i
  function o(c, h) {
    return c[1].on_chain.count_proofs_in_epoch >= 72
      ? E5
      : c[1].on_chain.count_proofs_in_epoch >= 8
        ? x5
        : c[0]
          ? C5
          : $5
  }
  let s = o(e),
    a = s(e)
  return {
    c() {
      ;(t = m('main')), (i = m('div')), a.c(), y(i, 'class', 'uk-card uk-card-default uk-card-body')
    },
    m(c, h) {
      M(c, t, h), u(t, i), a.m(i, null)
    },
    p(c, [h]) {
      s === (s = o(c)) && a ? a.p(c, h) : (a.d(1), (a = s(c)), a && (a.c(), a.m(i, null)))
    },
    i: ce,
    o: ce,
    d(c) {
      c && A(t), a.d()
    },
  }
}
function T5(e, t, i) {
  let o, s
  ae(e, Jt, (c) => i(1, (o = c))), ae(e, De, (c) => i(2, (s = c)))
  let { isTowerNewbie: a } = t
  return (
    (e.$$set = (c) => {
      'isTowerNewbie' in c && i(0, (a = c.isTowerNewbie))
    }),
    [a, o, s]
  )
}
class L5 extends we {
  constructor(t) {
    super(), ye(this, t, T5, S5, ge, { isTowerNewbie: 0 })
  }
}
function A5(e) {
  let t,
    i = e[1]('miner.cards.first_proof.title') + '',
    o
  return {
    c() {
      ;(t = m('span')), (o = T(i)), y(t, 'slot', 'title')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 2 && i !== (i = s[1]('miner.cards.first_proof.title') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function M5(e) {
  let t,
    i = e[1]('miner.cards.first_proof.body_disabled') + '',
    o
  return {
    c() {
      ;(t = m('p')), (o = T(i))
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 2 && i !== (i = s[1]('miner.cards.first_proof.body_disabled') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function P5(e) {
  let t,
    i = e[1]('miner.cards.first_proof.body') + '',
    o
  return {
    c() {
      ;(t = new Xr(!1)), (o = Tt()), (t.a = o)
    },
    m(s, a) {
      t.m(i, s, a), M(s, o, a)
    },
    p(s, a) {
      a & 2 && i !== (i = s[1]('miner.cards.first_proof.body') + '') && t.p(i)
    },
    d(s) {
      s && (A(o), t.d())
    },
  }
}
function I5(e) {
  let t
  function i(a, c) {
    return a[0] ? P5 : M5
  }
  let o = i(e),
    s = o(e)
  return {
    c() {
      ;(t = m('div')), s.c(), y(t, 'slot', 'body')
    },
    m(a, c) {
      M(a, t, c), s.m(t, null)
    },
    p(a, c) {
      o === (o = i(a)) && s ? s.p(a, c) : (s.d(1), (s = o(a)), s && (s.c(), s.m(t, null)))
    },
    d(a) {
      a && A(t), s.d()
    },
  }
}
function N5(e) {
  let t, i
  return (
    (t = new Bn({ props: { $$slots: { body: [I5], title: [A5] }, $$scope: { ctx: e } } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, [s]) {
        const a = {}
        s & 11 && (a.$$scope = { dirty: s, ctx: o }), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function O5(e, t, i) {
  let o
  ae(e, De, (c) => i(1, (o = c)))
  let s = !1,
    a
  return (
    wt(async () => {
      a = nn.subscribe((c) => i(0, (s = c)))
    }),
    Ut(async () => {
      a && a()
    }),
    [s, o]
  )
}
class B5 extends we {
  constructor(t) {
    super(), ye(this, t, O5, N5, ge, {})
  }
}
function D5(e) {
  let t
  return {
    c() {
      ;(t = m('div')), y(t, 'uk-spinner', '')
    },
    m(i, o) {
      M(i, t, o)
    },
    p: ce,
    d(i) {
      i && A(t)
    },
  }
}
function R5(e) {
  let t, i, o, s, a, c
  return {
    c() {
      ;(t = m('label')),
        (i = m('input')),
        (o = E()),
        (s = m('div')),
        y(i, 'type', 'checkbox'),
        (i.checked = e[1]),
        y(s, 'class', 'uk-switch-slider uk-switch-on-off round'),
        y(t, 'class', 'uk-switch')
    },
    m(h, f) {
      M(h, t, f), u(t, i), u(t, o), u(t, s), a || ((c = Ee(i, 'click', e[2])), (a = !0))
    },
    p(h, f) {
      f & 2 && (i.checked = h[1])
    },
    d(h) {
      h && A(t), (a = !1), c()
    },
  }
}
function H5(e) {
  let t, i
  function o(c, h) {
    return c[0] ? D5 : R5
  }
  let s = o(e),
    a = s(e)
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        a.c(),
        y(i, 'class', 'uk-text-center uk-margin'),
        Bt(i, 'position', 'relative')
    },
    m(c, h) {
      M(c, t, h), u(t, i), a.m(i, null)
    },
    p(c, [h]) {
      s === (s = o(c)) && a ? a.p(c, h) : (a.d(1), (a = s(c)), a && (a.c(), a.m(i, null)))
    },
    i: ce,
    o: ce,
    d(c) {
      c && A(t), a.d()
    },
  }
}
function z5(e, t, i) {
  let o
  ae(e, nn, (c) => i(1, (o = c)))
  let s = !1
  return [
    s,
    o,
    () => {
      i(0, (s = !0)), setTimeout(() => i(0, (s = !1)), 1e3), ty()
    },
  ]
}
class U5 extends we {
  constructor(t) {
    super(), ye(this, t, z5, H5, ge, {})
  }
}
function ch(e) {
  let t,
    i,
    o,
    s,
    a = e[1]('miner.miner_process.notes') + '',
    c,
    h,
    f,
    p,
    g
  function b(x, S) {
    return x[0].progress && x[0].progress.complete ? W5 : F5
  }
  let v = b(e),
    w = v(e),
    $ = e[0].progress.pct_complete > 1.01 && uh(e)
  return {
    c() {
      ;(t = m('div')),
        (i = m('span')),
        w.c(),
        (o = E()),
        (s = m('div')),
        (c = E()),
        (h = m('progress')),
        (p = E()),
        (g = m('span')),
        $ && $.c(),
        y(i, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(s, 'uk-dropdown', ''),
        y(s, 'class', 'uk-text-light uk-text-muted uk-text-thin'),
        y(t, 'class', 'uk-inline'),
        y(h, 'id', 'mining-progressbar'),
        y(h, 'class', 'uk-progress'),
        (h.value = f = e[0].progress.pct_complete),
        y(h, 'max', '1'),
        y(g, 'class', 'uk-text-light uk-text-muted uk-text-thin')
    },
    m(x, S) {
      M(x, t, S),
        u(t, i),
        w.m(i, null),
        u(t, o),
        u(t, s),
        (s.innerHTML = a),
        M(x, c, S),
        M(x, h, S),
        M(x, p, S),
        M(x, g, S),
        $ && $.m(g, null)
    },
    p(x, S) {
      v === (v = b(x)) && w ? w.p(x, S) : (w.d(1), (w = v(x)), w && (w.c(), w.m(i, null))),
        S & 2 && a !== (a = x[1]('miner.miner_process.notes') + '') && (s.innerHTML = a),
        S & 1 && f !== (f = x[0].progress.pct_complete) && (h.value = f),
        x[0].progress.pct_complete > 1.01
          ? $
            ? $.p(x, S)
            : (($ = uh(x)), $.c(), $.m(g, null))
          : $ && ($.d(1), ($ = null))
    },
    d(x) {
      x && (A(t), A(c), A(h), A(p), A(g)), w.d(), $ && $.d()
    },
  }
}
function F5(e) {
  let t = e[1]('miner.miner_process.status_in_process') + '',
    i,
    o,
    s = hh(e[0].progress.pct_complete) + '',
    a
  return {
    c() {
      ;(i = T(t)), (o = E()), (a = T(s))
    },
    m(c, h) {
      M(c, i, h), M(c, o, h), M(c, a, h)
    },
    p(c, h) {
      h & 2 && t !== (t = c[1]('miner.miner_process.status_in_process') + '') && O(i, t),
        h & 1 && s !== (s = hh(c[0].progress.pct_complete) + '') && O(a, s)
    },
    d(c) {
      c && (A(i), A(o), A(a))
    },
  }
}
function W5(e) {
  let t = e[1]('miner.miner_process.status_complete') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 2 && t !== (t = o[1]('miner.miner_process.status_complete') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function uh(e) {
  let t,
    i = e[1]('miner.miner_process.notes2') + '',
    o
  return {
    c() {
      ;(t = m('span')), (o = T(i))
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 2 && i !== (i = s[1]('miner.miner_process.notes2') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function V5(e) {
  let t,
    i = e[0] && e[0].progress && ch(e)
  return {
    c() {
      ;(t = m('main')), i && i.c()
    },
    m(o, s) {
      M(o, t, s), i && i.m(t, null)
    },
    p(o, [s]) {
      o[0] && o[0].progress
        ? i
          ? i.p(o, s)
          : ((i = ch(o)), i.c(), i.m(t, null))
        : i && (i.d(1), (i = null))
    },
    i: ce,
    o: ce,
    d(o) {
      o && A(t), i && i.d()
    },
  }
}
function hh(e) {
  return e > 1.01 && (e = 1.01), (e * 100).toFixed(0) + '%'
}
function G5(e, t, i) {
  let o, s
  return ae(e, Jt, (a) => i(0, (o = a))), ae(e, De, (a) => i(1, (s = a))), [o, s]
}
class j5 extends we {
  constructor(t) {
    super(), ye(this, t, G5, V5, ge, {})
  }
}
function q5(e) {
  let t,
    i,
    o,
    s,
    a,
    c = e[0]('miner.tower_state.local_height') + '',
    h,
    f,
    p,
    g,
    b = e[0]('miner.tower_state.on_chain_height') + '',
    v,
    w,
    $,
    x,
    S = e[0]('miner.tower_state.mined_in_last_epoch') + '',
    L,
    N,
    B,
    F,
    R = e[0]('miner.tower_state.sent_in_this_epoch') + '',
    V,
    G,
    j
  return {
    c() {
      ;(t = m('table')),
        (i = m('thead')),
        (o = m('tr')),
        (s = m('th')),
        (a = m('span')),
        (h = T(c)),
        (f = E()),
        (p = m('th')),
        (g = m('span')),
        (v = T(b)),
        (w = E()),
        ($ = m('th')),
        (x = m('span')),
        (L = T(S)),
        (N = E()),
        (B = m('th')),
        (F = m('span')),
        (V = T(R)),
        (G = E()),
        (j = m('tbody')),
        (j.innerHTML =
          '<tr class="uk-text-center"><td><span class="skeleton-container svelte-1oz7l1v">0000</span></td> <td><span class="skeleton-container svelte-1oz7l1v">0000</span></td> <td><span class="skeleton-container svelte-1oz7l1v">0000</span></td> <td><span class="skeleton-container svelte-1oz7l1v">0000</span></td></tr>'),
        y(a, 'class', 'skeleton-container svelte-1oz7l1v'),
        y(s, 'class', 'uk-text-center'),
        y(g, 'class', 'skeleton-container svelte-1oz7l1v'),
        y(p, 'class', 'uk-text-center'),
        y(x, 'class', 'skeleton-container svelte-1oz7l1v'),
        y($, 'class', 'uk-text-center'),
        y(F, 'class', 'skeleton-container svelte-1oz7l1v'),
        y(B, 'class', 'uk-text-center'),
        y(t, 'class', 'uk-table uk-table-divider')
    },
    m(Y, z) {
      M(Y, t, z),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, a),
        u(a, h),
        u(o, f),
        u(o, p),
        u(p, g),
        u(g, v),
        u(o, w),
        u(o, $),
        u($, x),
        u(x, L),
        u(o, N),
        u(o, B),
        u(B, F),
        u(F, V),
        u(t, G),
        u(t, j)
    },
    p(Y, [z]) {
      z & 1 && c !== (c = Y[0]('miner.tower_state.local_height') + '') && O(h, c),
        z & 1 && b !== (b = Y[0]('miner.tower_state.on_chain_height') + '') && O(v, b),
        z & 1 && S !== (S = Y[0]('miner.tower_state.mined_in_last_epoch') + '') && O(L, S),
        z & 1 && R !== (R = Y[0]('miner.tower_state.sent_in_this_epoch') + '') && O(V, R)
    },
    i: ce,
    o: ce,
    d(Y) {
      Y && A(t)
    },
  }
}
function Y5(e, t, i) {
  let o
  return ae(e, De, (s) => i(0, (o = s))), [o]
}
class K5 extends we {
  constructor(t) {
    super(), ye(this, t, Y5, q5, ge, {})
  }
}
function Z5(e) {
  let t, i
  return (
    (t = new K5({})),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p: ce,
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function X5(e) {
  let t,
    i,
    o,
    s,
    a = e[1]('miner.tower_state.local_height') + '',
    c,
    h,
    f,
    p = e[1]('miner.tower_state.on_chain_height') + '',
    g,
    b,
    v,
    w = e[1]('miner.tower_state.mined_in_last_epoch') + '',
    $,
    x,
    S,
    L = e[1]('miner.tower_state.sent_in_this_epoch') + '',
    N,
    B,
    F,
    R,
    V,
    G,
    j,
    Y = e[0].on_chain.verified_tower_height + '',
    z,
    W,
    te,
    K = e[0].on_chain.latest_epoch_mining + '',
    ee,
    ne,
    Z,
    I,
    Q,
    ie = e[0].on_chain.count_proofs_in_epoch + '',
    ue,
    le,
    _e
  function Ce(Le, tt) {
    if (Le[0].local_height >= 0) return Q5
    if (Le[0].on_chain) return J5
  }
  let xe = Ce(e),
    Me = xe && xe(e)
  function ke(Le, tt) {
    return Le[0].on_chain.count_proofs_in_epoch >= 8 ? tk : ek
  }
  let be = ke(e),
    $e = be(e)
  function me(Le, tt) {
    return Le[0].on_chain.count_proofs_in_epoch >= 72
      ? ok
      : Le[0].on_chain.count_proofs_in_epoch >= 8
        ? ik
        : nk
  }
  let de = me(e),
    Be = de(e)
  return {
    c() {
      ;(t = m('table')),
        (i = m('thead')),
        (o = m('tr')),
        (s = m('th')),
        (c = T(a)),
        (h = E()),
        (f = m('th')),
        (g = T(p)),
        (b = E()),
        (v = m('th')),
        ($ = T(w)),
        (x = E()),
        (S = m('th')),
        (N = T(L)),
        (B = E()),
        (F = m('tbody')),
        (R = m('tr')),
        (V = m('td')),
        Me && Me.c(),
        (G = E()),
        (j = m('td')),
        (z = T(Y)),
        (W = E()),
        (te = m('td')),
        (ee = T(K)),
        (ne = E()),
        (Z = m('td')),
        (I = m('div')),
        $e.c(),
        (Q = E()),
        (ue = T(ie)),
        (le = E()),
        (_e = m('div')),
        Be.c(),
        y(s, 'class', 'uk-text-center'),
        y(f, 'class', 'uk-text-center'),
        y(v, 'class', 'uk-text-center'),
        y(S, 'class', 'uk-text-center'),
        y(_e, 'uk-dropdown', ''),
        y(I, 'class', 'uk-inline'),
        y(R, 'class', 'uk-text-center'),
        y(t, 'class', 'uk-table uk-table-divider')
    },
    m(Le, tt) {
      M(Le, t, tt),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, c),
        u(o, h),
        u(o, f),
        u(f, g),
        u(o, b),
        u(o, v),
        u(v, $),
        u(o, x),
        u(o, S),
        u(S, N),
        u(t, B),
        u(t, F),
        u(F, R),
        u(R, V),
        Me && Me.m(V, null),
        u(R, G),
        u(R, j),
        u(j, z),
        u(R, W),
        u(R, te),
        u(te, ee),
        u(R, ne),
        u(R, Z),
        u(Z, I),
        $e.m(I, null),
        u(I, Q),
        u(I, ue),
        u(I, le),
        u(I, _e),
        Be.m(_e, null)
    },
    p(Le, tt) {
      tt & 2 && a !== (a = Le[1]('miner.tower_state.local_height') + '') && O(c, a),
        tt & 2 && p !== (p = Le[1]('miner.tower_state.on_chain_height') + '') && O(g, p),
        tt & 2 && w !== (w = Le[1]('miner.tower_state.mined_in_last_epoch') + '') && O($, w),
        tt & 2 && L !== (L = Le[1]('miner.tower_state.sent_in_this_epoch') + '') && O(N, L),
        xe === (xe = Ce(Le)) && Me
          ? Me.p(Le, tt)
          : (Me && Me.d(1), (Me = xe && xe(Le)), Me && (Me.c(), Me.m(V, null))),
        tt & 1 && Y !== (Y = Le[0].on_chain.verified_tower_height + '') && O(z, Y),
        tt & 1 && K !== (K = Le[0].on_chain.latest_epoch_mining + '') && O(ee, K),
        be !== (be = ke(Le)) && ($e.d(1), ($e = be(Le)), $e && ($e.c(), $e.m(I, Q))),
        tt & 1 && ie !== (ie = Le[0].on_chain.count_proofs_in_epoch + '') && O(ue, ie),
        de === (de = me(Le)) && Be
          ? Be.p(Le, tt)
          : (Be.d(1), (Be = de(Le)), Be && (Be.c(), Be.m(_e, null)))
    },
    i: ce,
    o: ce,
    d(Le) {
      Le && A(t), Me && Me.d(), $e.d(), Be.d()
    },
  }
}
function J5(e) {
  let t,
    i,
    o,
    s,
    a = e[1]('miner.tower_state.empty') + '',
    c
  return {
    c() {
      ;(t = m('div')),
        (i = m('span')),
        (o = E()),
        (s = m('div')),
        (c = T(a)),
        y(i, 'uk-icon', 'icon: minus-circle'),
        y(s, 'uk-dropdown', ''),
        y(t, 'class', 'uk-inline')
    },
    m(h, f) {
      M(h, t, f), u(t, i), u(t, o), u(t, s), u(s, c)
    },
    p(h, f) {
      f & 2 && a !== (a = h[1]('miner.tower_state.empty') + '') && O(c, a)
    },
    d(h) {
      h && A(t)
    },
  }
}
function Q5(e) {
  let t = e[0].local_height + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 1 && t !== (t = o[0].local_height + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function ek(e) {
  let t
  return {
    c() {
      ;(t = m('span')),
        y(t, 'class', 'uk-text-warning uk-margin'),
        y(t, 'uk-icon', 'icon: minus-circle')
    },
    m(i, o) {
      M(i, t, o)
    },
    d(i) {
      i && A(t)
    },
  }
}
function tk(e) {
  let t
  return {
    c() {
      ;(t = m('span')), y(t, 'class', 'uk-text-muted uk-margin'), y(t, 'uk-icon', 'icon: check')
    },
    m(i, o) {
      M(i, t, o)
    },
    d(i) {
      i && A(t)
    },
  }
}
function nk(e) {
  let t = e[1]('miner.tower_state.proof_less') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 2 && t !== (t = o[1]('miner.tower_state.proof_less') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function ik(e) {
  let t = e[1]('miner.tower_state.proof_ok') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 2 && t !== (t = o[1]('miner.tower_state.proof_ok') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function ok(e) {
  let t = e[1]('miner.tower_state.proof_more') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 2 && t !== (t = o[1]('miner.tower_state.proof_more') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function sk(e) {
  let t, i, o, s
  const a = [X5, Z5],
    c = []
  function h(f, p) {
    return f[0] && f[0].on_chain && f[0].on_chain.previous_proof_hash ? 0 : 1
  }
  return (
    (i = h(e)),
    (o = c[i] = a[i](e)),
    {
      c() {
        ;(t = m('main')), o.c()
      },
      m(f, p) {
        M(f, t, p), c[i].m(t, null), (s = !0)
      },
      p(f, [p]) {
        let g = i
        ;(i = h(f)),
          i === g
            ? c[i].p(f, p)
            : (qe(),
              U(c[g], 1, 1, () => {
                c[g] = null
              }),
              Ye(),
              (o = c[i]),
              o ? o.p(f, p) : ((o = c[i] = a[i](f)), o.c()),
              D(o, 1),
              o.m(t, null))
      },
      i(f) {
        s || (D(o), (s = !0))
      },
      o(f) {
        U(o), (s = !1)
      },
      d(f) {
        f && A(t), c[i].d()
      },
    }
  )
}
function rk(e, t, i) {
  let o
  ae(e, De, (a) => i(1, (o = a)))
  let { minerTower: s } = t
  return (
    (e.$$set = (a) => {
      'minerTower' in a && i(0, (s = a.minerTower))
    }),
    [s, o]
  )
}
class ak extends we {
  constructor(t) {
    super(), ye(this, t, rk, sk, ge, { minerTower: 0 })
  }
}
function lk(e) {
  let t,
    i,
    o,
    s,
    a,
    c,
    h,
    f = e[1]('miner.miner_phases.backlog_started') + '',
    p,
    g,
    b,
    v,
    w,
    $,
    x = e[1]('miner.miner_phases.mining_enabled') + '',
    S,
    L,
    N,
    B,
    F,
    R,
    V = e[1]('miner.miner_phases.proof_started') + '',
    G,
    j,
    Y,
    z,
    W,
    te,
    K = e[1]('miner.miner_phases.proof_complete') + '',
    ee,
    ne,
    Z,
    I,
    Q,
    ie,
    ue = e[1]('miner.miner_phases.backlog_in_process') + '',
    le,
    _e,
    Ce,
    xe,
    Me,
    ke,
    be = e[1]('miner.miner_phases.backlog_complete') + '',
    $e
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('ul')),
        (s = m('li')),
        (a = m('span')),
        (h = E()),
        (p = T(f)),
        (g = E()),
        (b = m('li')),
        (v = m('span')),
        ($ = E()),
        (S = T(x)),
        (L = E()),
        (N = m('li')),
        (B = m('span')),
        (R = E()),
        (G = T(V)),
        (j = E()),
        (Y = m('li')),
        (z = m('span')),
        (te = E()),
        (ee = T(K)),
        (ne = E()),
        (Z = m('li')),
        (I = m('span')),
        (ie = E()),
        (le = T(ue)),
        (_e = E()),
        (Ce = m('li')),
        (xe = m('span')),
        (ke = E()),
        ($e = T(be)),
        y(a, 'uk-icon', (c = e[0] ? 'check' : 'close')),
        y(v, 'uk-icon', (w = e[2] ? 'check' : 'close')),
        y(B, 'uk-icon', (F = e[3] ? 'check' : 'close')),
        y(z, 'uk-icon', (W = e[4] ? 'check' : 'close')),
        y(I, 'uk-icon', (Q = e[5] ? 'check' : 'close')),
        y(xe, 'uk-icon', (Me = e[6] ? 'check' : 'close')),
        y(o, 'class', 'uk-list uk-list-divider'),
        y(i, 'class', 'uk-margin')
    },
    m(me, de) {
      M(me, t, de),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, a),
        u(s, h),
        u(s, p),
        u(o, g),
        u(o, b),
        u(b, v),
        u(b, $),
        u(b, S),
        u(o, L),
        u(o, N),
        u(N, B),
        u(N, R),
        u(N, G),
        u(o, j),
        u(o, Y),
        u(Y, z),
        u(Y, te),
        u(Y, ee),
        u(o, ne),
        u(o, Z),
        u(Z, I),
        u(Z, ie),
        u(Z, le),
        u(o, _e),
        u(o, Ce),
        u(Ce, xe),
        u(Ce, ke),
        u(Ce, $e)
    },
    p(me, [de]) {
      de & 1 && c !== (c = me[0] ? 'check' : 'close') && y(a, 'uk-icon', c),
        de & 2 && f !== (f = me[1]('miner.miner_phases.backlog_started') + '') && O(p, f),
        de & 4 && w !== (w = me[2] ? 'check' : 'close') && y(v, 'uk-icon', w),
        de & 2 && x !== (x = me[1]('miner.miner_phases.mining_enabled') + '') && O(S, x),
        de & 8 && F !== (F = me[3] ? 'check' : 'close') && y(B, 'uk-icon', F),
        de & 2 && V !== (V = me[1]('miner.miner_phases.proof_started') + '') && O(G, V),
        de & 16 && W !== (W = me[4] ? 'check' : 'close') && y(z, 'uk-icon', W),
        de & 2 && K !== (K = me[1]('miner.miner_phases.proof_complete') + '') && O(ee, K),
        de & 32 && Q !== (Q = me[5] ? 'check' : 'close') && y(I, 'uk-icon', Q),
        de & 2 && ue !== (ue = me[1]('miner.miner_phases.backlog_in_process') + '') && O(le, ue),
        de & 64 && Me !== (Me = me[6] ? 'check' : 'close') && y(xe, 'uk-icon', Me),
        de & 2 && be !== (be = me[1]('miner.miner_phases.backlog_complete') + '') && O($e, be)
    },
    i: ce,
    o: ce,
    d(me) {
      me && A(t)
    },
  }
}
function ck(e, t, i) {
  let o, s, a, c, h, f, p
  return (
    ae(e, Pn, (g) => i(0, (o = g))),
    ae(e, De, (g) => i(1, (s = g))),
    ae(e, nn, (g) => i(2, (a = g))),
    ae(e, Oo, (g) => i(3, (c = g))),
    ae(e, La, (g) => i(4, (h = g))),
    ae(e, tn, (g) => i(5, (f = g))),
    ae(e, Ii, (g) => i(6, (p = g))),
    [o, s, a, c, h, f, p]
  )
}
class uk extends we {
  constructor(t) {
    super(), ye(this, t, ck, lk, ge, {})
  }
}
function fh(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S, L, N, B, F, R, V, G, j
  F = new uk({})
  let Y = e[0] && dh(e)
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('div')),
        (s = m('div')),
        (a = m('button')),
        (a.textContent = 'Start Tower'),
        (c = E()),
        (h = m('div')),
        (f = m('button')),
        (f.textContent = 'Start Backlog Listener'),
        (p = E()),
        (g = m('div')),
        (b = m('button')),
        (b.textContent = 'Kill Listener'),
        (v = E()),
        (w = m('div')),
        ($ = m('button')),
        ($.textContent = 'Emit Backlog Event'),
        (x = E()),
        (S = m('div')),
        (L = m('button')),
        (L.textContent = 'Resend Proof Zero'),
        (N = E()),
        (B = m('div')),
        re(F.$$.fragment),
        (R = E()),
        Y && Y.c(),
        y(a, 'class', 'uk-button uk-button-default uk-width-1-1'),
        y(s, 'class', 'uk-margin'),
        y(f, 'class', 'uk-button uk-button-default uk-width-1-1'),
        y(h, 'class', 'uk-margin'),
        y(b, 'class', 'uk-button uk-button-default uk-width-1-1'),
        y(g, 'class', 'uk-margin'),
        y($, 'class', 'uk-button uk-button-default uk-width-1-1'),
        y(w, 'class', 'uk-margin'),
        y(L, 'class', 'uk-button uk-button-default uk-width-1-1'),
        y(S, 'class', 'uk-margin'),
        y(o, 'class', 'uk-width-1-2'),
        y(B, 'class', 'uk-width-1-2'),
        y(i, 'class', 'uk-grid'),
        y(t, 'class', 'uk-margin')
    },
    m(z, W) {
      M(z, t, W),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, a),
        u(o, c),
        u(o, h),
        u(h, f),
        u(o, p),
        u(o, g),
        u(g, b),
        u(o, v),
        u(o, w),
        u(w, $),
        u(o, x),
        u(o, S),
        u(S, L),
        u(i, N),
        u(i, B),
        oe(F, B, null),
        u(t, R),
        Y && Y.m(t, null),
        (V = !0),
        G ||
          ((j = [
            Ee(a, 'click', zs),
            Ee(f, 'click', Ga),
            Ee(b, 'click', ja),
            Ee($, 'click', qa),
            Ee(L, 'click', sy),
          ]),
          (G = !0))
    },
    p(z, W) {
      z[0] ? (Y ? Y.p(z, W) : ((Y = dh(z)), Y.c(), Y.m(t, null))) : Y && (Y.d(1), (Y = null))
    },
    i(z) {
      V || (D(F.$$.fragment, z), (V = !0))
    },
    o(z) {
      U(F.$$.fragment, z), (V = !1)
    },
    d(z) {
      z && A(t), se(F), Y && Y.d(), (G = !1), yt(j)
    },
  }
}
function dh(e) {
  let t,
    i,
    o,
    s = JSON.stringify(e[0], null, 2) + '',
    a
  return {
    c() {
      ;(t = m('p')),
        (i = m('span')),
        (i.textContent = 'minerTower:'),
        (o = E()),
        (a = T(s)),
        y(t, 'class', 'uk-text-break')
    },
    m(c, h) {
      M(c, t, h), u(t, i), u(t, o), u(t, a)
    },
    p(c, h) {
      h & 1 && s !== (s = JSON.stringify(c[0], null, 2) + '') && O(a, s)
    },
    d(c) {
      c && A(t)
    },
  }
}
function hk(e) {
  let t,
    i,
    o = e[1] && fh(e)
  return {
    c() {
      o && o.c(), (t = Tt())
    },
    m(s, a) {
      o && o.m(s, a), M(s, t, a), (i = !0)
    },
    p(s, [a]) {
      s[1]
        ? o
          ? (o.p(s, a), a & 2 && D(o, 1))
          : ((o = fh(s)), o.c(), D(o, 1), o.m(t.parentNode, t))
        : o &&
          (qe(),
          U(o, 1, 1, () => {
            o = null
          }),
          Ye())
    },
    i(s) {
      i || (D(o), (i = !0))
    },
    o(s) {
      U(o), (i = !1)
    },
    d(s) {
      s && A(t), o && o.d(s)
    },
  }
}
function fk(e, t, i) {
  let o
  ae(e, ri, (a) => i(1, (o = a)))
  let { minerTower: s } = t
  return (
    (e.$$set = (a) => {
      'minerTower' in a && i(0, (s = a.minerTower))
    }),
    [s, o]
  )
}
class dk extends we {
  constructor(t) {
    super(), ye(this, t, fk, hk, ge, { minerTower: 0 })
  }
}
function pk(e) {
  let t,
    i = e[0]('miner.cards.cant_start.title') + '',
    o
  return {
    c() {
      ;(t = m('span')), (o = T(i)), y(t, 'slot', 'title')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 1 && i !== (i = s[0]('miner.cards.cant_start.title') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function mk(e) {
  let t,
    i,
    o = e[0]('miner.cards.cant_start.body') + '',
    s
  return {
    c() {
      ;(t = m('div')), (i = m('p')), (s = T(o)), y(t, 'slot', 'body')
    },
    m(a, c) {
      M(a, t, c), u(t, i), u(i, s)
    },
    p(a, c) {
      c & 1 && o !== (o = a[0]('miner.cards.cant_start.body') + '') && O(s, o)
    },
    d(a) {
      a && A(t)
    },
  }
}
function gk(e) {
  let t, i, o
  return (
    (i = new Bn({ props: { $$slots: { body: [mk], title: [pk] }, $$scope: { ctx: e } } })),
    {
      c() {
        ;(t = m('main')), re(i.$$.fragment)
      },
      m(s, a) {
        M(s, t, a), oe(i, t, null), (o = !0)
      },
      p(s, [a]) {
        const c = {}
        a & 3 && (c.$$scope = { dirty: a, ctx: s }), i.$set(c)
      },
      i(s) {
        o || (D(i.$$.fragment, s), (o = !0))
      },
      o(s) {
        U(i.$$.fragment, s), (o = !1)
      },
      d(s) {
        s && A(t), se(i)
      },
    }
  )
}
function _k(e, t, i) {
  let o
  return ae(e, De, (s) => i(0, (o = s))), [o]
}
class Md extends we {
  constructor(t) {
    super(), ye(this, t, _k, gk, ge, {})
  }
}
function bk(e) {
  let t
  return {
    c() {
      ;(t = m('div')),
        (t.innerHTML =
          '<p class="uk-text-light uk-text-muted uk-text-uppercase">DEV MODE, RUNNING IN TEST DIFFICULTY</p>'),
        y(t, 'class', 'uk-flex uk-flex-center')
    },
    m(i, o) {
      M(i, t, o)
    },
    d(i) {
      i && A(t)
    },
  }
}
function ph(e) {
  let t, i
  return (
    (t = new Md({})),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function mh(e) {
  let t, i, o, s, a, c, h, f, p
  ;(i = new U5({})), (s = new j5({}))
  const g = [yk, vk],
    b = []
  function v(w, $) {
    return w[3] && !w[2].last_local_proof ? 0 : 1
  }
  return (
    (h = v(e)),
    (f = b[h] = g[h](e)),
    {
      c() {
        ;(t = m('div')),
          re(i.$$.fragment),
          (o = E()),
          re(s.$$.fragment),
          (a = E()),
          (c = m('div')),
          f.c(),
          y(t, 'class', 'uk-width-1-1 uk-align-center'),
          y(c, 'class', 'uk-width-1-1')
      },
      m(w, $) {
        M(w, t, $),
          oe(i, t, null),
          u(t, o),
          oe(s, t, null),
          M(w, a, $),
          M(w, c, $),
          b[h].m(c, null),
          (p = !0)
      },
      p(w, $) {
        let x = h
        ;(h = v(w)),
          h === x
            ? b[h].p(w, $)
            : (qe(),
              U(b[x], 1, 1, () => {
                b[x] = null
              }),
              Ye(),
              (f = b[h]),
              f ? f.p(w, $) : ((f = b[h] = g[h](w)), f.c()),
              D(f, 1),
              f.m(c, null))
      },
      i(w) {
        p || (D(i.$$.fragment, w), D(s.$$.fragment, w), D(f), (p = !0))
      },
      o(w) {
        U(i.$$.fragment, w), U(s.$$.fragment, w), U(f), (p = !1)
      },
      d(w) {
        w && (A(t), A(a), A(c)), se(i), se(s), b[h].d()
      },
    }
  )
}
function vk(e) {
  let t, i, o, s, a, c, h, f
  const p = [kk, wk],
    g = []
  function b(v, w) {
    return v[4] ? 0 : 1
  }
  return (
    (o = b(e)),
    (s = g[o] = p[o](e)),
    (h = new ak({ props: { minerTower: e[2] } })),
    {
      c() {
        ;(t = m('div')),
          (i = m('div')),
          s.c(),
          (a = E()),
          (c = m('div')),
          re(h.$$.fragment),
          y(i, 'class', 'uk-width-1-3'),
          y(c, 'class', 'uk-width-2-3'),
          y(t, 'class', 'uk-grid uk-grid-match')
      },
      m(v, w) {
        M(v, t, w), u(t, i), g[o].m(i, null), u(t, a), u(t, c), oe(h, c, null), (f = !0)
      },
      p(v, w) {
        let $ = o
        ;(o = b(v)),
          o === $
            ? g[o].p(v, w)
            : (qe(),
              U(g[$], 1, 1, () => {
                g[$] = null
              }),
              Ye(),
              (s = g[o]),
              s ? s.p(v, w) : ((s = g[o] = p[o](v)), s.c()),
              D(s, 1),
              s.m(i, null))
        const x = {}
        w & 4 && (x.minerTower = v[2]), h.$set(x)
      },
      i(v) {
        f || (D(s), D(h.$$.fragment, v), (f = !0))
      },
      o(v) {
        U(s), U(h.$$.fragment, v), (f = !1)
      },
      d(v) {
        v && A(t), g[o].d(), se(h)
      },
    }
  )
}
function yk(e) {
  let t, i
  return (
    (t = new B5({})),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p: ce,
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function wk(e) {
  let t, i
  return (
    (t = new L5({ props: { isTowerNewbie: e[3] } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 8 && (a.isTowerNewbie = o[3]), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function kk(e) {
  let t, i
  return (
    (t = new Jw({ props: { minerTower: e[2], loading: e[5] } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 4 && (a.minerTower = o[2]), s & 32 && (a.loading = o[5]), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function $k(e) {
  let t,
    i,
    o,
    s = e[0]('miner.title') + '',
    a,
    c,
    h,
    f,
    p,
    g,
    b,
    v,
    w,
    $,
    x = e[6] && bk(),
    S = !e[1].on_chain && ph(),
    L = ((e[1] && e[1].on_chain) || (e[2] && e[2].progress && e[2].progress.pct_complete)) && mh(e)
  return (
    (b = new k5({})),
    (w = new dk({ props: { minerTower: e[2] } })),
    {
      c() {
        ;(t = m('main')),
          (i = m('div')),
          (o = m('h2')),
          (a = T(s)),
          (c = E()),
          x && x.c(),
          (h = E()),
          S && S.c(),
          (f = E()),
          (p = m('div')),
          L && L.c(),
          (g = E()),
          re(b.$$.fragment),
          (v = E()),
          re(w.$$.fragment),
          y(o, 'class', 'uk-text-light uk-text-muted uk-text-uppercase'),
          y(i, 'class', 'uk-flex uk-flex-center'),
          y(p, 'class', 'uk-grid uk-margin-small'),
          y(t, 'class', 'uk-height-viewport')
      },
      m(N, B) {
        M(N, t, B),
          u(t, i),
          u(i, o),
          u(o, a),
          u(t, c),
          x && x.m(t, null),
          u(t, h),
          S && S.m(t, null),
          u(t, f),
          u(t, p),
          L && L.m(p, null),
          u(t, g),
          oe(b, t, null),
          u(t, v),
          oe(w, t, null),
          ($ = !0)
      },
      p(N, [B]) {
        ;(!$ || B & 1) && s !== (s = N[0]('miner.title') + '') && O(a, s),
          N[1].on_chain
            ? S &&
              (qe(),
              U(S, 1, 1, () => {
                S = null
              }),
              Ye())
            : S
              ? B & 2 && D(S, 1)
              : ((S = ph()), S.c(), D(S, 1), S.m(t, f)),
          (N[1] && N[1].on_chain) || (N[2] && N[2].progress && N[2].progress.pct_complete)
            ? L
              ? (L.p(N, B), B & 6 && D(L, 1))
              : ((L = mh(N)), L.c(), D(L, 1), L.m(p, null))
            : L &&
              (qe(),
              U(L, 1, 1, () => {
                L = null
              }),
              Ye())
        const F = {}
        B & 4 && (F.minerTower = N[2]), w.$set(F)
      },
      i(N) {
        $ || (D(S), D(L), D(b.$$.fragment, N), D(w.$$.fragment, N), ($ = !0))
      },
      o(N) {
        U(S), U(L), U(b.$$.fragment, N), U(w.$$.fragment, N), ($ = !1)
      },
      d(N) {
        N && A(t), x && x.d(), S && S.d(), L && L.d(), se(b), se(w)
      },
    }
  )
}
function Ck(e, t, i) {
  let o, s, a, c, h, f, p
  ae(e, Os, (b) => i(7, (o = b))),
    ae(e, De, (b) => i(0, (s = b))),
    ae(e, It, (b) => i(1, (a = b))),
    ae(e, Jt, (b) => i(2, (c = b))),
    ae(e, Ns, (b) => i(3, (h = b))),
    ae(e, tn, (b) => i(4, (f = b))),
    ae(e, Mi, (b) => i(5, (p = b)))
  let g = o == 'test'
  return (
    wt(async () => {
      Ya().then(Ka)
    }),
    [s, a, c, h, f, p, g]
  )
}
class xk extends we {
  constructor(t) {
    super(), ye(this, t, Ck, $k, ge, {})
  }
}
function Ek(e) {
  let t,
    i,
    o = e[0]('settings.account_settings.title') + '',
    s,
    a,
    c,
    h,
    f,
    p,
    g = e[0]('settings.account_settings.btn_remove') + '',
    b,
    v,
    w,
    $,
    x = e[0]('settings.account_settings.confirm') + '',
    S,
    L,
    N,
    B = e[0]('settings.account_settings.btn_remove') + '',
    F,
    R,
    V,
    G,
    j = e[0]('settings.account_settings.description') + '',
    Y,
    z,
    W
  return {
    c() {
      ;(t = m('main')),
        (i = m('h4')),
        (s = T(o)),
        (a = E()),
        (c = m('div')),
        (h = m('div')),
        (f = m('div')),
        (p = m('button')),
        (b = T(g)),
        (v = E()),
        (w = m('div')),
        ($ = m('p')),
        (S = T(x)),
        (L = E()),
        (N = m('button')),
        (F = T(B)),
        (R = E()),
        (V = m('div')),
        (G = m('span')),
        (Y = T(j)),
        y(i, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(p, 'class', 'uk-button uk-button-danger'),
        y(p, 'type', 'button'),
        y(N, 'class', 'uk-button uk-button-danger'),
        y(w, 'uk-dropdown', 'mode: click'),
        y(f, 'class', 'uk-inline'),
        y(c, 'class', 'uk-margin'),
        y(c, 'uk-grid', ''),
        y(t, 'class', 'uk-margin')
    },
    m(te, K) {
      M(te, t, K),
        u(t, i),
        u(i, s),
        u(t, a),
        u(t, c),
        u(c, h),
        u(h, f),
        u(f, p),
        u(p, b),
        u(f, v),
        u(f, w),
        u(w, $),
        u($, S),
        u(w, L),
        u(w, N),
        u(N, F),
        u(c, R),
        u(c, V),
        u(V, G),
        u(G, Y),
        z || ((W = Ee(N, 'click', e[1])), (z = !0))
    },
    p(te, [K]) {
      K & 1 && o !== (o = te[0]('settings.account_settings.title') + '') && O(s, o),
        K & 1 && g !== (g = te[0]('settings.account_settings.btn_remove') + '') && O(b, g),
        K & 1 && x !== (x = te[0]('settings.account_settings.confirm') + '') && O(S, x),
        K & 1 && B !== (B = te[0]('settings.account_settings.btn_remove') + '') && O(F, B),
        K & 1 && j !== (j = te[0]('settings.account_settings.description') + '') && O(Y, j)
    },
    i: ce,
    o: ce,
    d(te) {
      te && A(t), (z = !1), W()
    },
  }
}
function Sk(e, t, i) {
  let o
  return (
    ae(e, De, (a) => i(0, (o = a))),
    [
      o,
      async () => {
        Ke('remove_accounts', {})
          .then((a) => {
            zt.set(a), on('Accounts removed successfully'), ji()
          })
          .catch((a) => {
            Ze(a, !1, 'removeAccounts')
          })
      },
    ]
  )
}
class Tk extends we {
  constructor(t) {
    super(), ye(this, t, Sk, Ek, ge, {})
  }
}
function Lk(e) {
  let t,
    i,
    o,
    s,
    a,
    c = e[1]('settings.network_settings.playlist') + '',
    h,
    f,
    p,
    g,
    b,
    v,
    w = e[1]('settings.network_settings.btn_submit') + '',
    $,
    x,
    S
  return {
    c() {
      ;(t = m('main')),
        (i = m('form')),
        (o = m('fieldset')),
        (s = m('div')),
        (a = m('span')),
        (h = T(c)),
        (f = E()),
        (p = m('input')),
        (g = E()),
        (b = m('div')),
        (v = m('button')),
        ($ = T(w)),
        y(p, 'class', 'uk-input'),
        y(p, 'type', 'text'),
        y(p, 'placeholder', e[0]),
        y(s, 'class', 'uk-margin uk-inline-block uk-width-1-1'),
        y(v, 'class', 'uk-button uk-button-primary uk-align-right'),
        y(v, 'id', 'add-btn'),
        y(o, 'class', 'uk-fieldset'),
        y(i, 'id', 'account-form')
    },
    m(L, N) {
      M(L, t, N),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, a),
        u(a, h),
        u(s, f),
        u(s, p),
        en(p, e[0]),
        u(o, g),
        u(o, b),
        u(b, v),
        u(v, $),
        x ||
          ((S = [
            Ee(p, 'input', e[3]),
            Ee(v, 'click', function () {
              li(e[2](e[0])) && e[2](e[0]).apply(this, arguments)
            }),
          ]),
          (x = !0))
    },
    p(L, [N]) {
      ;(e = L),
        N & 2 && c !== (c = e[1]('settings.network_settings.playlist') + '') && O(h, c),
        N & 1 && y(p, 'placeholder', e[0]),
        N & 1 && p.value !== e[0] && en(p, e[0]),
        N & 2 && w !== (w = e[1]('settings.network_settings.btn_submit') + '') && O($, w)
    },
    i: ce,
    o: ce,
    d(L) {
      L && A(t), (x = !1), yt(S)
    },
  }
}
function Ak(e, t, i) {
  let o
  ae(e, De, (h) => i(1, (o = h)))
  let s =
    'https://raw.githubusercontent.com/0LNetworkCommunity/seed-peers/main/fullnode_seed_playlist.json'
  const a = (h) => {
    Ke('override_playlist', { url: h })
      .then((f) => {
        kn.set(f), on('Network Settings Updated')
      })
      .catch((f) => {
        Ze(f, !1, 'updateNetwork')
      })
  }
  function c() {
    ;(s = this.value), i(0, s)
  }
  return [s, o, a, c]
}
class Pd extends we {
  constructor(t) {
    super(), ye(this, t, Ak, Lk, ge, {})
  }
}
function gh(e, t, i) {
  const o = e.slice()
  return (o[7] = t[i]), o
}
function _h(e) {
  let t,
    i = Pt(e[2]),
    o = []
  for (let s = 0; s < i.length; s += 1) o[s] = bh(gh(e, i, s))
  return {
    c() {
      for (let s = 0; s < o.length; s += 1) o[s].c()
      t = Tt()
    },
    m(s, a) {
      for (let c = 0; c < o.length; c += 1) o[c] && o[c].m(s, a)
      M(s, t, a)
    },
    p(s, a) {
      if (a & 4) {
        i = Pt(s[2])
        let c
        for (c = 0; c < i.length; c += 1) {
          const h = gh(s, i, c)
          o[c] ? o[c].p(h, a) : ((o[c] = bh(h)), o[c].c(), o[c].m(t.parentNode, t))
        }
        for (; c < o.length; c += 1) o[c].d(1)
        o.length = i.length
      }
    },
    d(s) {
      s && A(t), $n(o, s)
    },
  }
}
function bh(e) {
  let t,
    i = e[7] + '',
    o
  return {
    c() {
      ;(t = m('p')), (o = T(i))
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 4 && i !== (i = s[7] + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function Mk(e) {
  let t,
    i,
    o = e[3]('settings.network_settings.title') + '',
    s,
    a,
    c,
    h,
    f,
    p = e[3]('settings.network_settings.synced_peers') + '',
    g,
    b,
    v,
    w,
    $ = e[3]('settings.network_settings.refresh_peers_button') + '',
    x,
    S,
    L,
    N = e[3]('settings.network_settings.list_of_peers') + '',
    B,
    F,
    R,
    V = e[3]('settings.network_settings.description') + '',
    G,
    j,
    Y,
    z,
    W,
    te = e[3]('settings.network_settings.override_peers') + '',
    K,
    ee,
    ne,
    Z = e[3]('settings.network_settings.override_peers_description') + '',
    I,
    Q,
    ie,
    ue,
    le,
    _e,
    Ce = e[3]('settings.network_settings.url_of_upstream_node') + '',
    xe,
    Me,
    ke,
    be,
    $e,
    me = e[3]('settings.network_settings.btn_update') + '',
    de,
    Be,
    Le,
    tt = e[3]('settings.network_settings.upstream_title') + '',
    dt,
    pt,
    Ve,
    Ge = e[3]('settings.network_settings.upstream_subtitle') + '',
    ht,
    he,
    nt,
    Re,
    Ae = e[2] && _h(e)
  return (
    (Y = new Pd({})),
    {
      c() {
        ;(t = m('main')),
          (i = m('h4')),
          (s = T(o)),
          (a = E()),
          (c = T(e[1])),
          (h = E()),
          (f = m('h5')),
          (g = T(p)),
          (b = E()),
          Ae && Ae.c(),
          (v = E()),
          (w = m('button')),
          (x = T($)),
          (S = E()),
          (L = m('h5')),
          (B = T(N)),
          (F = E()),
          (R = m('p')),
          (G = T(V)),
          (j = E()),
          re(Y.$$.fragment),
          (z = E()),
          (W = m('h5')),
          (K = T(te)),
          (ee = E()),
          (ne = m('p')),
          (I = T(Z)),
          (Q = E()),
          (ie = m('form')),
          (ue = m('fieldset')),
          (le = m('div')),
          (_e = m('span')),
          (xe = T(Ce)),
          (Me = E()),
          (ke = m('input')),
          (be = E()),
          ($e = m('button')),
          (de = T(me)),
          (Be = E()),
          (Le = m('h5')),
          (dt = T(tt)),
          (pt = E()),
          (Ve = m('p')),
          (ht = T(Ge)),
          y(i, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
          y(f, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
          y(w, 'class', 'uk-button uk-button-primary uk-align-right'),
          y(L, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
          y(W, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
          y(ke, 'class', 'uk-input'),
          y(ke, 'type', 'text'),
          y(ke, 'placeholder', 'http://1.1.1.1:8080'),
          y(le, 'class', 'uk-margin uk-inline-block uk-width-1-1'),
          y($e, 'class', 'uk-button uk-button-primary uk-align-right'),
          y($e, 'id', 'add-btn'),
          y(Le, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
          y(ue, 'class', 'uk-fieldset'),
          y(ie, 'id', 'account-form'),
          y(t, 'class', 'uk-margin')
      },
      m(ve, Ne) {
        M(ve, t, Ne),
          u(t, i),
          u(i, s),
          u(i, a),
          u(i, c),
          u(t, h),
          u(t, f),
          u(f, g),
          u(t, b),
          Ae && Ae.m(t, null),
          u(t, v),
          u(t, w),
          u(w, x),
          u(t, S),
          u(t, L),
          u(L, B),
          u(t, F),
          u(t, R),
          u(R, G),
          u(t, j),
          oe(Y, t, null),
          u(t, z),
          u(t, W),
          u(W, K),
          u(t, ee),
          u(t, ne),
          u(ne, I),
          u(t, Q),
          u(t, ie),
          u(ie, ue),
          u(ue, le),
          u(le, _e),
          u(_e, xe),
          u(le, Me),
          u(le, ke),
          en(ke, e[0]),
          u(ue, be),
          u(ue, $e),
          u($e, de),
          u(ue, Be),
          u(ue, Le),
          u(Le, dt),
          u(ue, pt),
          u(ue, Ve),
          u(Ve, ht),
          (he = !0),
          nt ||
            ((Re = [Ee(w, 'click', e[4]), Ee(ke, 'input', e[6]), Ee($e, 'click', e[5])]), (nt = !0))
      },
      p(ve, [Ne]) {
        ;(!he || Ne & 8) && o !== (o = ve[3]('settings.network_settings.title') + '') && O(s, o),
          (!he || Ne & 2) && O(c, ve[1]),
          (!he || Ne & 8) &&
            p !== (p = ve[3]('settings.network_settings.synced_peers') + '') &&
            O(g, p),
          ve[2]
            ? Ae
              ? Ae.p(ve, Ne)
              : ((Ae = _h(ve)), Ae.c(), Ae.m(t, v))
            : Ae && (Ae.d(1), (Ae = null)),
          (!he || Ne & 8) &&
            $ !== ($ = ve[3]('settings.network_settings.refresh_peers_button') + '') &&
            O(x, $),
          (!he || Ne & 8) &&
            N !== (N = ve[3]('settings.network_settings.list_of_peers') + '') &&
            O(B, N),
          (!he || Ne & 8) &&
            V !== (V = ve[3]('settings.network_settings.description') + '') &&
            O(G, V),
          (!he || Ne & 8) &&
            te !== (te = ve[3]('settings.network_settings.override_peers') + '') &&
            O(K, te),
          (!he || Ne & 8) &&
            Z !== (Z = ve[3]('settings.network_settings.override_peers_description') + '') &&
            O(I, Z),
          (!he || Ne & 8) &&
            Ce !== (Ce = ve[3]('settings.network_settings.url_of_upstream_node') + '') &&
            O(xe, Ce),
          Ne & 1 && ke.value !== ve[0] && en(ke, ve[0]),
          (!he || Ne & 8) &&
            me !== (me = ve[3]('settings.network_settings.btn_update') + '') &&
            O(de, me),
          (!he || Ne & 8) &&
            tt !== (tt = ve[3]('settings.network_settings.upstream_title') + '') &&
            O(dt, tt),
          (!he || Ne & 8) &&
            Ge !== (Ge = ve[3]('settings.network_settings.upstream_subtitle') + '') &&
            O(ht, Ge)
      },
      i(ve) {
        he || (D(Y.$$.fragment, ve), (he = !0))
      },
      o(ve) {
        U(Y.$$.fragment, ve), (he = !1)
      },
      d(ve) {
        ve && A(t), Ae && Ae.d(), se(Y), (nt = !1), yt(Re)
      },
    }
  )
}
function Pk(e, t, i) {
  let o
  ae(e, De, (g) => i(3, (o = g)))
  let s = '',
    a = ''
  wt(async () => {
    Wa(),
      kn.subscribe((g) => {
        g && (i(0, (s = g.nodes.length == 1 ? g.nodes[0].url : '')), i(1, (a = g.chain_id)))
      })
  })
  let c
  dd.subscribe((g) => {
    i(2, (c = g))
  })
  const h = () => {
      Va().then(() => {
        on('Refreshed Fullnode Statistics')
      })
    },
    f = () => {
      Ke('force_upstream', { url: s })
        .then((g) => {
          kn.set(g), on('Network Settings Updated')
        })
        .catch((g) => {
          Ze(g, !1, 'forceUpstream')
        })
    }
  function p() {
    ;(s = this.value), i(0, s)
  }
  return [s, a, c, o, h, f, p]
}
class Ik extends we {
  constructor(t) {
    super(), ye(this, t, Pk, Mk, ge, {})
  }
}
function Nk(e) {
  let t,
    i,
    o = e[0]('settings.langapp_settings.title') + '',
    s,
    a,
    c,
    h,
    f,
    p = e[0]('settings.langapp_settings.lang') + '',
    g,
    b,
    v,
    w = e[0]('settings.langapp_settings.lang_description') + '',
    $,
    x,
    S,
    L = e[0]('settings.langapp_settings.lang_button') + '',
    N,
    B,
    F,
    R,
    V,
    G,
    j,
    Y,
    z,
    W,
    te,
    K,
    ee,
    ne,
    Z,
    I,
    Q,
    ie,
    ue,
    le,
    _e,
    Ce,
    xe,
    Me,
    ke,
    be,
    $e,
    me,
    de
  return {
    c() {
      ;(t = m('main')),
        (i = m('h4')),
        (s = T(o)),
        (a = E()),
        (c = m('form')),
        (h = m('fieldset')),
        (f = m('h5')),
        (g = T(p)),
        (b = E()),
        (v = m('p')),
        ($ = T(w)),
        (x = E()),
        (S = m('button')),
        (N = T(L)),
        (B = E()),
        (F = m('div')),
        (R = m('ul')),
        (V = m('li')),
        (G = m('a')),
        (G.textContent = 'English'),
        (j = E()),
        (Y = m('li')),
        (z = m('a')),
        (z.textContent = '中文'),
        (W = E()),
        (te = m('li')),
        (K = m('a')),
        (K.textContent = 'French'),
        (ee = E()),
        (ne = m('li')),
        (Z = m('a')),
        (Z.textContent = 'German'),
        (I = E()),
        (Q = m('li')),
        (ie = m('a')),
        (ie.textContent = 'Spanish'),
        (ue = E()),
        (le = m('li')),
        (_e = m('a')),
        (_e.textContent = 'Italian'),
        (Ce = E()),
        (xe = m('li')),
        (Me = m('a')),
        (Me.textContent = 'Portuguese'),
        (ke = E()),
        (be = m('li')),
        ($e = m('a')),
        ($e.textContent = 'Arabic'),
        y(i, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(f, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(S, 'class', 'uk-button uk-button-default'),
        y(S, 'type', 'button'),
        y(G, 'class', 'uk-text-muted'),
        y(G, 'href', '#'),
        y(z, 'class', 'uk-text-muted'),
        y(z, 'href', '#'),
        y(K, 'class', 'uk-text-muted'),
        y(K, 'href', '#'),
        y(Z, 'class', 'uk-text-muted'),
        y(Z, 'href', '#'),
        y(ie, 'class', 'uk-text-muted'),
        y(ie, 'href', '#'),
        y(_e, 'class', 'uk-text-muted'),
        y(_e, 'href', '#'),
        y(Me, 'class', 'uk-text-muted'),
        y(Me, 'href', '#'),
        y($e, 'class', 'uk-text-muted'),
        y($e, 'href', '#'),
        y(R, 'class', 'uk-nav uk-dropdown-nav'),
        y(F, 'uk-dropdown', 'mode: click'),
        y(h, 'class', 'uk-fieldset'),
        y(c, 'id', 'account-form'),
        y(t, 'class', 'uk-margin')
    },
    m(Be, Le) {
      M(Be, t, Le),
        u(t, i),
        u(i, s),
        u(t, a),
        u(t, c),
        u(c, h),
        u(h, f),
        u(f, g),
        u(h, b),
        u(h, v),
        u(v, $),
        u(h, x),
        u(h, S),
        u(S, N),
        u(h, B),
        u(h, F),
        u(F, R),
        u(R, V),
        u(V, G),
        u(R, j),
        u(R, Y),
        u(Y, z),
        u(R, W),
        u(R, te),
        u(te, K),
        u(R, ee),
        u(R, ne),
        u(ne, Z),
        u(R, I),
        u(R, Q),
        u(Q, ie),
        u(R, ue),
        u(R, le),
        u(le, _e),
        u(R, Ce),
        u(R, xe),
        u(xe, Me),
        u(R, ke),
        u(R, be),
        u(be, $e),
        me ||
          ((de = [
            Ee(G, 'click', e[1]),
            Ee(z, 'click', e[2]),
            Ee(K, 'click', e[3]),
            Ee(Z, 'click', e[4]),
            Ee(ie, 'click', e[5]),
            Ee(_e, 'click', e[6]),
            Ee(Me, 'click', e[7]),
            Ee($e, 'click', e[8]),
          ]),
          (me = !0))
    },
    p(Be, [Le]) {
      Le & 1 && o !== (o = Be[0]('settings.langapp_settings.title') + '') && O(s, o),
        Le & 1 && p !== (p = Be[0]('settings.langapp_settings.lang') + '') && O(g, p),
        Le & 1 && w !== (w = Be[0]('settings.langapp_settings.lang_description') + '') && O($, w),
        Le & 1 && L !== (L = Be[0]('settings.langapp_settings.lang_button') + '') && O(N, L)
    },
    i: ce,
    o: ce,
    d(Be) {
      Be && A(t), (me = !1), yt(de)
    },
  }
}
function Ok(e, t, i) {
  let o
  return (
    ae(e, De, (v) => i(0, (o = v))),
    [
      o,
      () => Tn('en'),
      () => Tn('zh_cn'),
      () => Tn('fr'),
      () => Tn('de'),
      () => Tn('es'),
      () => Tn('it'),
      () => Tn('pt'),
      () => Tn('ar'),
    ]
  )
}
class Bk extends we {
  constructor(t) {
    super(), ye(this, t, Ok, Nk, ge, {})
  }
}
function vh(e) {
  let t
  return {
    c() {
      ;(t = m('div')),
        (t.innerHTML = '<span uk-spinner=""></span>'),
        y(t, 'class', 'uk-flex uk-flex-center')
    },
    m(i, o) {
      M(i, t, o)
    },
    d(i) {
      i && A(t)
    },
  }
}
function Dk(e) {
  let t,
    i,
    o = e[1]('txs.set_wallet_type.title') + '',
    s,
    a,
    c,
    h = e[1]('txs.set_wallet_type.subtitle') + '',
    f,
    p,
    g,
    b,
    v,
    w = e[1]('txs.set_wallet_type.btn_slow') + '',
    $,
    x,
    S,
    L,
    N,
    B = e[1]('txs.set_wallet_type.confirm_slow') + '',
    F,
    R,
    V,
    G = e[1]('txs.set_wallet_type.btn_confirm_slow') + '',
    j,
    Y,
    z,
    W,
    te = e[1]('txs.set_wallet_type.btn_community') + '',
    K,
    ee,
    ne,
    Z,
    I,
    Q = e[1]('txs.set_wallet_type.confirm_community') + '',
    ie,
    ue,
    le,
    _e = e[1]('txs.set_wallet_type.btn_confirm_community') + '',
    Ce,
    xe,
    Me,
    ke,
    be = e[0] && vh()
  return {
    c() {
      ;(t = m('main')),
        (i = m('h4')),
        (s = T(o)),
        (a = E()),
        (c = m('p')),
        (f = T(h)),
        (p = E()),
        (g = m('div')),
        (b = m('div')),
        (v = m('button')),
        ($ = T(w)),
        (S = E()),
        (L = m('div')),
        (N = m('p')),
        (F = T(B)),
        (R = E()),
        (V = m('button')),
        (j = T(G)),
        (Y = E()),
        (z = m('div')),
        (W = m('button')),
        (K = T(te)),
        (ne = E()),
        (Z = m('div')),
        (I = m('p')),
        (ie = T(Q)),
        (ue = E()),
        (le = m('button')),
        (Ce = T(_e)),
        (xe = E()),
        be && be.c(),
        y(i, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(v, 'class', 'uk-button uk-button-default'),
        y(v, 'type', 'button'),
        (v.disabled = x = !!e[0]),
        y(V, 'class', 'uk-button uk-button-danger'),
        y(L, 'class', 'send-drop'),
        y(L, 'uk-dropdown', 'mode: click'),
        y(b, 'class', 'uk-inline'),
        y(W, 'class', 'uk-button uk-button-default'),
        y(W, 'type', 'button'),
        (W.disabled = ee = !!e[0]),
        y(le, 'class', 'uk-button uk-button-danger'),
        y(Z, 'class', 'send-drop'),
        y(Z, 'uk-dropdown', 'mode: click'),
        y(z, 'class', 'uk-inline'),
        y(t, 'class', 'uk-margin')
    },
    m($e, me) {
      M($e, t, me),
        u(t, i),
        u(i, s),
        u(t, a),
        u(t, c),
        u(c, f),
        u(t, p),
        u(t, g),
        u(g, b),
        u(b, v),
        u(v, $),
        u(b, S),
        u(b, L),
        u(L, N),
        u(N, F),
        u(L, R),
        u(L, V),
        u(V, j),
        u(g, Y),
        u(g, z),
        u(z, W),
        u(W, K),
        u(z, ne),
        u(z, Z),
        u(Z, I),
        u(I, ie),
        u(Z, ue),
        u(Z, le),
        u(le, Ce),
        u(g, xe),
        be && be.m(g, null),
        Me || ((ke = [Ee(V, 'click', e[3]), Ee(le, 'click', e[4])]), (Me = !0))
    },
    p($e, [me]) {
      me & 2 && o !== (o = $e[1]('txs.set_wallet_type.title') + '') && O(s, o),
        me & 2 && h !== (h = $e[1]('txs.set_wallet_type.subtitle') + '') && O(f, h),
        me & 2 && w !== (w = $e[1]('txs.set_wallet_type.btn_slow') + '') && O($, w),
        me & 1 && x !== (x = !!$e[0]) && (v.disabled = x),
        me & 2 && B !== (B = $e[1]('txs.set_wallet_type.confirm_slow') + '') && O(F, B),
        me & 2 && G !== (G = $e[1]('txs.set_wallet_type.btn_confirm_slow') + '') && O(j, G),
        me & 2 && te !== (te = $e[1]('txs.set_wallet_type.btn_community') + '') && O(K, te),
        me & 1 && ee !== (ee = !!$e[0]) && (W.disabled = ee),
        me & 2 && Q !== (Q = $e[1]('txs.set_wallet_type.confirm_community') + '') && O(ie, Q),
        me & 2 &&
          _e !== (_e = $e[1]('txs.set_wallet_type.btn_confirm_community') + '') &&
          O(Ce, _e),
        $e[0] ? be || ((be = vh()), be.c(), be.m(g, null)) : be && (be.d(1), (be = null))
    },
    i: ce,
    o: ce,
    d($e) {
      $e && A(t), be && be.d(), (Me = !1), yt(ke)
    },
  }
}
function Rk(e, t, i) {
  let o
  ae(e, De, (f) => i(1, (o = f)))
  let s = !1
  function a(f) {
    i(0, (s = !0)),
      Ke('wallet_type', { typeInt: f })
        .then((p) => {
          i(0, (s = !1)), on('Account set to Slow Wallet'), zt.set(p)
        })
        .catch((p) => {
          i(0, (s = !1)), Ze(p, !1, 'setWallet')
        }),
      wn.dropdown(document.getElementsByClassName('send-drop')).hide(!0)
  }
  return [s, o, a, () => a(0), () => a(1)]
}
class Hk extends we {
  constructor(t) {
    super(), ye(this, t, Rk, Dk, ge, {})
  }
}
function zk(e) {
  let t,
    i,
    o,
    s = e[0]('settings.title') + '',
    a,
    c,
    h,
    f,
    p,
    g,
    b,
    v,
    w,
    $,
    x,
    S
  return (
    (h = new Bk({})),
    (p = new Ik({})),
    (b = new Tk({})),
    (w = new Ld({})),
    (x = new Hk({})),
    {
      c() {
        ;(t = m('main')),
          (i = m('div')),
          (o = m('h2')),
          (a = T(s)),
          (c = E()),
          re(h.$$.fragment),
          (f = E()),
          re(p.$$.fragment),
          (g = E()),
          re(b.$$.fragment),
          (v = E()),
          re(w.$$.fragment),
          ($ = E()),
          re(x.$$.fragment),
          y(o, 'class', 'uk-text-light uk-text-muted uk-text-uppercase'),
          y(i, 'class', 'uk-flex uk-flex-center')
      },
      m(L, N) {
        M(L, t, N),
          u(t, i),
          u(i, o),
          u(o, a),
          u(t, c),
          oe(h, t, null),
          u(t, f),
          oe(p, t, null),
          u(t, g),
          oe(b, t, null),
          u(t, v),
          oe(w, t, null),
          u(t, $),
          oe(x, t, null),
          (S = !0)
      },
      p(L, [N]) {
        ;(!S || N & 1) && s !== (s = L[0]('settings.title') + '') && O(a, s)
      },
      i(L) {
        S ||
          (D(h.$$.fragment, L),
          D(p.$$.fragment, L),
          D(b.$$.fragment, L),
          D(w.$$.fragment, L),
          D(x.$$.fragment, L),
          (S = !0))
      },
      o(L) {
        U(h.$$.fragment, L),
          U(p.$$.fragment, L),
          U(b.$$.fragment, L),
          U(w.$$.fragment, L),
          U(x.$$.fragment, L),
          (S = !1)
      },
      d(L) {
        L && A(t), se(h), se(p), se(b), se(w), se(x)
      },
    }
  )
}
function Uk(e, t, i) {
  let o
  return ae(e, De, (s) => i(0, (o = s))), [o]
}
class Fk extends we {
  constructor(t) {
    super(), ye(this, t, Uk, zk, ge, {})
  }
}
function Wk(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('div')),
        (s = m('h4')),
        (s.textContent = 'Tower'),
        (a = E()),
        (c = m('button')),
        (c.textContent = 'Mine One Proof'),
        (h = E()),
        (f = m('button')),
        (f.textContent = 'Submit Backlog'),
        (p = E()),
        (g = m('button')),
        (g.textContent = 'Start Backlog Listener'),
        (b = E()),
        (v = m('button')),
        (v.textContent = 'End Backlog Listener'),
        (w = E()),
        ($ = m('button')),
        ($.textContent = 'Emit Start Backlog'),
        y(s, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(c, 'class', 'uk-button uk-button-default'),
        y(f, 'class', 'uk-button uk-button-default'),
        y(g, 'class', 'uk-button uk-button-default'),
        y(v, 'class', 'uk-button uk-button-default'),
        y($, 'class', 'uk-button uk-button-default'),
        y(o, 'class', 'uk-margin-medium-bottom')
    },
    m(L, N) {
      M(L, t, N),
        u(t, i),
        u(i, o),
        u(o, s),
        u(o, a),
        u(o, c),
        u(o, h),
        u(o, f),
        u(o, p),
        u(o, g),
        u(o, b),
        u(o, v),
        u(o, w),
        u(o, $),
        x ||
          ((S = [
            Ee(c, 'click', zs),
            Ee(f, 'click', Td),
            Ee(g, 'click', Ga),
            Ee(v, 'click', ja),
            Ee($, 'click', qa),
          ]),
          (x = !0))
    },
    p: ce,
    i: ce,
    o: ce,
    d(L) {
      L && A(t), (x = !1), yt(S)
    },
  }
}
class Vk extends we {
  constructor(t) {
    super(), ye(this, t, null, Wk, ge, {})
  }
}
function Gk(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S
  return {
    c() {
      ;(t = m('main')),
        (i = m('h4')),
        (i.textContent = 'Miner Difficulty'),
        (o = E()),
        (s = m('div')),
        (a = m('div')),
        (c = m('label')),
        (h = m('input')),
        (p = T(' Prod')),
        (g = E()),
        (b = m('label')),
        (v = m('input')),
        ($ = T(' Test')),
        y(i, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(h, 'class', 'uk-radio'),
        y(h, 'type', 'radio'),
        y(h, 'name', 'radio2'),
        (h.checked = f = e[0] == 'prod'),
        y(v, 'class', 'uk-radio'),
        y(v, 'type', 'radio'),
        y(v, 'name', 'radio2'),
        (v.checked = w = e[0] == 'test'),
        y(a, 'class', 'uk-margin uk-grid-small uk-child-width-auto uk-grid')
    },
    m(L, N) {
      M(L, t, N),
        u(t, i),
        u(t, o),
        u(t, s),
        u(s, a),
        u(a, c),
        u(c, h),
        u(c, p),
        u(a, g),
        u(a, b),
        u(b, v),
        u(b, $),
        x || ((S = [Ee(h, 'click', e[1]), Ee(v, 'click', e[2])]), (x = !0))
    },
    p(L, [N]) {
      N & 1 && f !== (f = L[0] == 'prod') && (h.checked = f),
        N & 1 && w !== (w = L[0] == 'test') && (v.checked = w)
    },
    i: ce,
    o: ce,
    d(L) {
      L && A(t), (x = !1), yt(S)
    },
  }
}
function jk(e, t, i) {
  let o = 'prod'
  return (
    wt(() => {
      If(), Os.subscribe((c) => i(0, (o = c)))
    }),
    [o, () => bu('prod'), () => bu('test')]
  )
}
class qk extends we {
  constructor(t) {
    super(), ye(this, t, jk, Gk, ge, {})
  }
}
function Yk(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S, L, N, B, F
  return {
    c() {
      ;(t = m('div')),
        (i = m('h4')),
        (i.textContent = 'Network Connection'),
        (o = E()),
        (s = m('div')),
        (a = m('label')),
        (c = m('input')),
        (f = T(' Mainnet')),
        (p = E()),
        (g = m('label')),
        (b = m('input')),
        (w = T(' Testnet (Rex)')),
        ($ = E()),
        (x = m('label')),
        (S = m('input')),
        (N = T(' Local Node')),
        y(i, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(c, 'class', 'uk-radio'),
        y(c, 'type', 'radio'),
        y(c, 'name', 'networkCb'),
        (c.checked = h = e[0] == Xt.MAINNET),
        y(b, 'class', 'uk-radio'),
        y(b, 'type', 'radio'),
        y(b, 'name', 'networkCb'),
        (b.checked = v = e[0] == Xt.TESTNET),
        y(S, 'class', 'uk-radio'),
        y(S, 'type', 'radio'),
        y(S, 'name', 'networkCb'),
        (S.checked = L = e[0] == Xt.TESTING),
        y(s, 'class', 'uk-margin uk-grid-small uk-child-width-auto uk-grid'),
        y(t, 'class', 'uk-margin-medium-bottom')
    },
    m(R, V) {
      M(R, t, V),
        u(t, i),
        u(t, o),
        u(t, s),
        u(s, a),
        u(a, c),
        u(a, f),
        u(s, p),
        u(s, g),
        u(g, b),
        u(g, w),
        u(s, $),
        u(s, x),
        u(x, S),
        u(x, N),
        B || ((F = [Ee(c, 'click', e[1]), Ee(b, 'click', e[2]), Ee(S, 'click', e[3])]), (B = !0))
    },
    p(R, [V]) {
      V & 1 && h !== (h = R[0] == Xt.MAINNET) && (c.checked = h),
        V & 1 && v !== (v = R[0] == Xt.TESTNET) && (b.checked = v),
        V & 1 && L !== (L = R[0] == Xt.TESTING) && (S.checked = L)
    },
    i: ce,
    o: ce,
    d(R) {
      R && A(t), (B = !1), yt(F)
    },
  }
}
function Kk(e, t, i) {
  let o
  return (
    wt(async () => {
      Wa(),
        kn.subscribe((h) => {
          h && i(0, (o = h.chain_id))
        })
    }),
    [o, () => Kr(Xt.MAINNET), () => Kr(Xt.TESTNET), () => Kr(Xt.TESTING)]
  )
}
class Zk extends we {
  constructor(t) {
    super(), ye(this, t, Kk, Yk, ge, {})
  }
}
function Xk(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S, L, N, B, F, R, V, G, j, Y
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('h4')),
        (o.textContent = 'Local Files'),
        (s = E()),
        (a = m('div')),
        (c = m('span')),
        (h = T('Configs Path: ')),
        (f = T(e[0])),
        (p = E()),
        (g = m('div')),
        (b = m('span')),
        (v = T('App Configs: ')),
        (w = T(e[0])),
        ($ = T('/libra.yaml')),
        (x = E()),
        (S = m('div')),
        (L = m('span')),
        (N = T('App Logs: ')),
        (B = T(e[0])),
        (F = T('/carpe.log')),
        (R = E()),
        (V = m('div')),
        (G = m('span')),
        (j = T('Latest Proof Path: ')),
        (Y = T(e[1])),
        y(o, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(i, 'class', 'uk-margin-bottom')
    },
    m(z, W) {
      M(z, t, W),
        u(t, i),
        u(i, o),
        u(i, s),
        u(i, a),
        u(a, c),
        u(c, h),
        u(c, f),
        u(i, p),
        u(i, g),
        u(g, b),
        u(b, v),
        u(b, w),
        u(b, $),
        u(i, x),
        u(i, S),
        u(S, L),
        u(L, N),
        u(L, B),
        u(L, F),
        u(i, R),
        u(i, V),
        u(V, G),
        u(G, j),
        u(G, Y)
    },
    p(z, [W]) {
      W & 1 && O(f, z[0]), W & 1 && O(w, z[0]), W & 1 && O(B, z[0]), W & 2 && O(Y, z[1])
    },
    i: ce,
    o: ce,
    d(z) {
      z && A(t)
    },
  }
}
function Jk(e, t, i) {
  let o, s
  return (
    Ke('debug_highest_proof_path', {})
      .then((a) => {
        i(1, (s = a))
      })
      .catch((a) => Ze(a, !0, 'debug_highest_proof_path')),
    Ke('debug_preferences_path', {})
      .then((a) => {
        i(0, (o = a))
      })
      .catch(() => {
        i(0, (o = 'no local tower proofs found'))
      }),
    [o, s]
  )
}
class Qk extends we {
  constructor(t) {
    super(), ye(this, t, Jk, Xk, ge, {})
  }
}
function yh(e) {
  let t
  return {
    c() {
      ;(t = m('p')), y(t, 'uk-spinner', 'ratio:.5')
    },
    m(i, o) {
      M(i, t, o)
    },
    d(i) {
      i && A(t)
    },
  }
}
function e3(e) {
  let t,
    i,
    o,
    s,
    a,
    c,
    h,
    f = e[4] && yh()
  return {
    c() {
      ;(t = m('main')),
        (i = m('button')),
        (o = T(e[0])),
        (s = E()),
        f && f.c(),
        y(i, 'class', (a = 'uk-button ' + (e[1] ? e[2] : 'uk-button-default'))),
        (i.disabled = e[3])
    },
    m(p, g) {
      M(p, t, g),
        u(t, i),
        u(i, o),
        u(i, s),
        f && f.m(i, null),
        c || ((h = Ee(i, 'click', Eo(e[5]))), (c = !0))
    },
    p(p, [g]) {
      g & 1 && O(o, p[0]),
        p[4] ? f || ((f = yh()), f.c(), f.m(i, null)) : f && (f.d(1), (f = null)),
        g & 6 && a !== (a = 'uk-button ' + (p[1] ? p[2] : 'uk-button-default')) && y(i, 'class', a),
        g & 8 && (i.disabled = p[3])
    },
    i: ce,
    o: ce,
    d(p) {
      p && A(t), f && f.d(), (c = !1), h()
    },
  }
}
function t3(e, t, i) {
  let { text: o } = t,
    { color: s = '' } = t,
    { cbAction: a } = t,
    c = 'uk-button-default',
    h = !1,
    f = !1
  switch (s) {
    case 'blue': {
      c = 'uk-button-primary'
      break
    }
    case 'black': {
      c = 'uk-button-secondary'
      break
    }
    case 'red': {
      c = 'uk-button-danger'
      break
    }
    default:
      c = 'uk-button-default'
  }
  const p = () => {
    i(4, (f = !0)),
      i(3, (h = !0)),
      a().finally(() => {
        i(3, (h = !1)), i(4, (f = !1))
      })
  }
  return (
    (e.$$set = (g) => {
      'text' in g && i(0, (o = g.text)),
        'color' in g && i(1, (s = g.color)),
        'cbAction' in g && i(6, (a = g.cbAction))
    }),
    [o, s, c, h, f, p, a]
  )
}
class n3 extends we {
  constructor(t) {
    super(), ye(this, t, t3, e3, ge, { text: 0, color: 1, cbAction: 6 })
  }
}
function wh(e) {
  let t,
    i,
    o,
    s = e[0].chain_id + '',
    a,
    c,
    h,
    f,
    p = e[0].epoch + '',
    g,
    b,
    v,
    w,
    $ = e[0].ledger_version + '',
    x,
    S,
    L,
    N,
    B = e[0].oldest_ledger_version + '',
    F,
    R,
    V,
    G,
    j = e[0].ledger_timestamp + '',
    Y,
    z,
    W,
    te,
    K = e[0].node_role + '',
    ee,
    ne,
    Z,
    I,
    Q = e[0].oldest_block_height + '',
    ie,
    ue,
    le,
    _e,
    Ce = e[0].block_height + '',
    xe,
    Me,
    ke,
    be,
    $e = e[0].git_hash + '',
    me
  return {
    c() {
      ;(t = m('div')),
        (i = m('div')),
        (o = T('chain_id: ')),
        (a = T(s)),
        (c = E()),
        (h = m('div')),
        (f = T('epoch: ')),
        (g = T(p)),
        (b = E()),
        (v = m('div')),
        (w = T('ledger_version: ')),
        (x = T($)),
        (S = E()),
        (L = m('div')),
        (N = T('oldest_ledger_version: ')),
        (F = T(B)),
        (R = E()),
        (V = m('div')),
        (G = T('ledger_timestamp: ')),
        (Y = T(j)),
        (z = E()),
        (W = m('div')),
        (te = T('node_role: ')),
        (ee = T(K)),
        (ne = E()),
        (Z = m('div')),
        (I = T('oldest_block_height: ')),
        (ie = T(Q)),
        (ue = E()),
        (le = m('div')),
        (_e = T('block_height: ')),
        (xe = T(Ce)),
        (Me = E()),
        (ke = m('div')),
        (be = T('git_hash: ')),
        (me = T($e))
    },
    m(de, Be) {
      M(de, t, Be),
        u(t, i),
        u(i, o),
        u(i, a),
        u(t, c),
        u(t, h),
        u(h, f),
        u(h, g),
        u(t, b),
        u(t, v),
        u(v, w),
        u(v, x),
        u(t, S),
        u(t, L),
        u(L, N),
        u(L, F),
        u(t, R),
        u(t, V),
        u(V, G),
        u(V, Y),
        u(t, z),
        u(t, W),
        u(W, te),
        u(W, ee),
        u(t, ne),
        u(t, Z),
        u(Z, I),
        u(Z, ie),
        u(t, ue),
        u(t, le),
        u(le, _e),
        u(le, xe),
        u(t, Me),
        u(t, ke),
        u(ke, be),
        u(ke, me)
    },
    p(de, Be) {
      Be & 1 && s !== (s = de[0].chain_id + '') && O(a, s),
        Be & 1 && p !== (p = de[0].epoch + '') && O(g, p),
        Be & 1 && $ !== ($ = de[0].ledger_version + '') && O(x, $),
        Be & 1 && B !== (B = de[0].oldest_ledger_version + '') && O(F, B),
        Be & 1 && j !== (j = de[0].ledger_timestamp + '') && O(Y, j),
        Be & 1 && K !== (K = de[0].node_role + '') && O(ee, K),
        Be & 1 && Q !== (Q = de[0].oldest_block_height + '') && O(ie, Q),
        Be & 1 && Ce !== (Ce = de[0].block_height + '') && O(xe, Ce),
        Be & 1 && $e !== ($e = de[0].git_hash + '') && O(me, $e)
    },
    d(de) {
      de && A(t)
    },
  }
}
function i3(e) {
  let t, i, o, s, a, c, h
  a = new n3({ props: { color: '', text: 'UPDATE', cbAction: Do } })
  let f = e[0] && wh(e)
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('h4')),
        (o.textContent = 'Chain Metadata'),
        (s = E()),
        re(a.$$.fragment),
        (c = E()),
        f && f.c(),
        y(o, 'class', 'uk-text-light uk-text-uppercase uk-text-muted uk-text-thin'),
        y(i, 'class', 'uk-margin-bottom')
    },
    m(p, g) {
      M(p, t, g), u(t, i), u(i, o), u(i, s), oe(a, i, null), u(i, c), f && f.m(i, null), (h = !0)
    },
    p(p, [g]) {
      p[0] ? (f ? f.p(p, g) : ((f = wh(p)), f.c(), f.m(i, null))) : f && (f.d(1), (f = null))
    },
    i(p) {
      h || (D(a.$$.fragment, p), (h = !0))
    },
    o(p) {
      U(a.$$.fragment, p), (h = !1)
    },
    d(p) {
      p && A(t), se(a), f && f.d()
    },
  }
}
function o3(e, t, i) {
  let o
  return (
    wt(Do),
    va.subscribe((s) => {
      s && i(0, (o = s))
    }),
    [o]
  )
}
class s3 extends we {
  constructor(t) {
    super(), ye(this, t, o3, i3, ge, {})
  }
}
function kh(e) {
  let t, i
  return (
    (t = new $d({})),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function r3(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S, L
  ;(s = new Ad({})),
    (h = new s3({})),
    (p = new Qk({})),
    (b = new Zk({})),
    (w = new qk({})),
    (x = new Vk({}))
  let N = !e[0] && kh()
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('p')),
        re(s.$$.fragment),
        (a = T(' Turn on debug view on all screens')),
        (c = E()),
        re(h.$$.fragment),
        (f = E()),
        re(p.$$.fragment),
        (g = E()),
        re(b.$$.fragment),
        (v = E()),
        re(w.$$.fragment),
        ($ = E()),
        re(x.$$.fragment),
        (S = E()),
        N && N.c(),
        y(o, 'class', 'uk-margin-bottom'),
        y(i, 'class', 'uk-margin uk-container uk-dark'),
        Bt(i, 'margin-bottom', '280px'),
        y(t, 'class', 'uk-height-viewport')
    },
    m(B, F) {
      M(B, t, F),
        u(t, i),
        u(i, o),
        oe(s, o, null),
        u(o, a),
        u(i, c),
        oe(h, i, null),
        u(i, f),
        oe(p, i, null),
        u(i, g),
        oe(b, i, null),
        u(i, v),
        oe(w, i, null),
        u(i, $),
        oe(x, i, null),
        u(i, S),
        N && N.m(i, null),
        (L = !0)
    },
    p(B, [F]) {
      B[0]
        ? N &&
          (qe(),
          U(N, 1, 1, () => {
            N = null
          }),
          Ye())
        : N
          ? F & 1 && D(N, 1)
          : ((N = kh()), N.c(), D(N, 1), N.m(i, null))
    },
    i(B) {
      L ||
        (D(s.$$.fragment, B),
        D(h.$$.fragment, B),
        D(p.$$.fragment, B),
        D(b.$$.fragment, B),
        D(w.$$.fragment, B),
        D(x.$$.fragment, B),
        D(N),
        (L = !0))
    },
    o(B) {
      U(s.$$.fragment, B),
        U(h.$$.fragment, B),
        U(p.$$.fragment, B),
        U(b.$$.fragment, B),
        U(w.$$.fragment, B),
        U(x.$$.fragment, B),
        U(N),
        (L = !1)
    },
    d(B) {
      B && A(t), se(s), se(h), se(p), se(b), se(w), se(x), N && N.d()
    },
  }
}
function a3(e, t, i) {
  let o = !1
  return (
    wt(async () => {
      ri.subscribe((s) => i(0, (o = s)))
    }),
    [o]
  )
}
class l3 extends we {
  constructor(t) {
    super(), ye(this, t, a3, r3, ge, {})
  }
}
function c3(e) {
  let t,
    i,
    o,
    s = e[1]('wallet.account_from_private.description') + '',
    a,
    c,
    h,
    f,
    p,
    g,
    b,
    v,
    w,
    $,
    x
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('p')),
        (a = T(s)),
        (c = E()),
        (h = m('form')),
        (f = m('fieldset')),
        (p = m('div')),
        (g = m('input')),
        (v = E()),
        (w = m('button')),
        (w.textContent = 'Submit Now'),
        y(g, 'class', 'uk-input'),
        y(g, 'type', 'text'),
        y(g, 'placeholder', (b = e[1]('wallet.account_from_private.placeholder'))),
        y(p, 'class', 'uk-margin uk-inline-block uk-width-1-1'),
        y(f, 'class', 'uk-fieldset'),
        y(h, 'id', 'account-form'),
        y(w, 'class', 'uk-button uk-button-primary'),
        y(w, 'type', 'button'),
        y(i, 'class', 'uk-margin')
    },
    m(S, L) {
      M(S, t, L),
        u(t, i),
        u(i, o),
        u(o, a),
        u(i, c),
        u(i, h),
        u(h, f),
        u(f, p),
        u(p, g),
        en(g, e[0]),
        u(i, v),
        u(i, w),
        $ ||
          ((x = [
            Ee(g, 'input', e[3]),
            Ee(
              w,
              'click',
              Eo(function () {
                li(e[2](e[0])) && e[2](e[0]).apply(this, arguments)
              }),
            ),
          ]),
          ($ = !0))
    },
    p(S, [L]) {
      ;(e = S),
        L & 2 && s !== (s = e[1]('wallet.account_from_private.description') + '') && O(a, s),
        L & 2 &&
          b !== (b = e[1]('wallet.account_from_private.placeholder')) &&
          y(g, 'placeholder', b),
        L & 1 && g.value !== e[0] && en(g, e[0])
    },
    i: ce,
    o: ce,
    d(S) {
      S && A(t), ($ = !1), yt(x)
    },
  }
}
function u3(e, t, i) {
  let o
  ae(e, De, (h) => i(1, (o = h)))
  let s
  const a = (h) => {
    yd(Za.PriKey, h.trim())
  }
  function c() {
    ;(s = this.value), i(0, s)
  }
  return [s, o, a, c]
}
class h3 extends we {
  constructor(t) {
    super(), ye(this, t, u3, c3, ge, {})
  }
}
function f3(e) {
  let t, i, o
  function s(h, f) {
    return h[2] ? m3 : p3
  }
  let a = s(e),
    c = a(e)
  return {
    c() {
      ;(t = m('button')),
        c.c(),
        y(t, 'class', 'uk-button uk-button-primary'),
        y(t, 'type', 'button'),
        (t.disabled = e[2])
    },
    m(h, f) {
      M(h, t, f),
        c.m(t, null),
        i ||
          ((o = Ee(
            t,
            'click',
            Eo(function () {
              li(e[5](e[0])) && e[5](e[0]).apply(this, arguments)
            }),
          )),
          (i = !0))
    },
    p(h, f) {
      ;(e = h),
        a === (a = s(e)) && c ? c.p(e, f) : (c.d(1), (c = a(e)), c && (c.c(), c.m(t, null))),
        f & 4 && (t.disabled = e[2])
    },
    d(h) {
      h && A(t), c.d(), (i = !1), o()
    },
  }
}
function d3(e) {
  let t,
    i = e[3]('wallet.keygen.btn_create_account') + '',
    o,
    s,
    a,
    c,
    h,
    f = e[3]('wallet.account_from_mnem_submit.title') + '',
    p,
    g,
    b,
    v = e[3]('wallet.account_from_mnem_submit.body') + '',
    w,
    $,
    x,
    S = e[3]('wallet.account_from_mnem_submit.btn_cancel') + '',
    L,
    N,
    B,
    F,
    R
  function V(Y, z) {
    return Y[2] ? _3 : g3
  }
  let G = V(e),
    j = G(e)
  return {
    c() {
      ;(t = m('button')),
        (o = T(i)),
        (s = E()),
        (a = m('div')),
        (c = m('div')),
        (h = m('h2')),
        (p = T(f)),
        (g = E()),
        (b = m('p')),
        (w = E()),
        ($ = m('p')),
        (x = m('button')),
        (L = T(S)),
        (N = E()),
        (B = m('button')),
        j.c(),
        y(t, 'class', 'uk-button uk-button-secondary uk-margin-small-right'),
        (t.disabled = e[2]),
        y(t, 'type', 'button'),
        y(h, 'class', 'uk-modal-title uk-text-uppercase uk-text-danger'),
        y(x, 'class', 'uk-button uk-button-default uk-modal-close'),
        y(x, 'type', 'button'),
        (x.disabled = e[2]),
        y(B, 'class', 'uk-button uk-button-primary'),
        y(B, 'type', 'button'),
        (B.disabled = e[2]),
        y($, 'class', 'uk-text-right'),
        y(c, 'class', 'uk-modal-dialog uk-modal-body'),
        y(a, 'id', 'submit-confirmation-modal'),
        y(a, 'uk-modal', '')
    },
    m(Y, z) {
      M(Y, t, z),
        u(t, o),
        M(Y, s, z),
        M(Y, a, z),
        u(a, c),
        u(c, h),
        u(h, p),
        u(c, g),
        u(c, b),
        (b.innerHTML = v),
        u(c, w),
        u(c, $),
        u($, x),
        u(x, L),
        u($, N),
        u($, B),
        j.m(B, null),
        F ||
          ((R = [
            Ee(t, 'click', Eo(e[4])),
            Ee(
              B,
              'click',
              Eo(function () {
                li(e[5](e[0])) && e[5](e[0]).apply(this, arguments)
              }),
            ),
          ]),
          (F = !0))
    },
    p(Y, z) {
      ;(e = Y),
        z & 8 && i !== (i = e[3]('wallet.keygen.btn_create_account') + '') && O(o, i),
        z & 4 && (t.disabled = e[2]),
        z & 8 && f !== (f = e[3]('wallet.account_from_mnem_submit.title') + '') && O(p, f),
        z & 8 && v !== (v = e[3]('wallet.account_from_mnem_submit.body') + '') && (b.innerHTML = v),
        z & 8 && S !== (S = e[3]('wallet.account_from_mnem_submit.btn_cancel') + '') && O(L, S),
        z & 4 && (x.disabled = e[2]),
        G === (G = V(e)) && j ? j.p(e, z) : (j.d(1), (j = G(e)), j && (j.c(), j.m(B, null))),
        z & 4 && (B.disabled = e[2])
    },
    d(Y) {
      Y && (A(t), A(s), A(a)), j.d(), (F = !1), yt(R)
    },
  }
}
function p3(e) {
  let t = e[3]('wallet.account_from_mnem_submit.btn_submit') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 8 && t !== (t = o[3]('wallet.account_from_mnem_submit.btn_submit') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function m3(e) {
  let t = e[3]('wallet.account_from_mnem_submit.btn_submiting') + '',
    i,
    o
  return {
    c() {
      ;(i = T(t)), (o = T('...'))
    },
    m(s, a) {
      M(s, i, a), M(s, o, a)
    },
    p(s, a) {
      a & 8 && t !== (t = s[3]('wallet.account_from_mnem_submit.btn_submiting') + '') && O(i, t)
    },
    d(s) {
      s && (A(i), A(o))
    },
  }
}
function g3(e) {
  let t = e[3]('wallet.account_from_mnem_submit.btn_submit') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 8 && t !== (t = o[3]('wallet.account_from_mnem_submit.btn_submit') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function _3(e) {
  let t = e[3]('wallet.account_from_mnem_submit.btn_submiting') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 8 && t !== (t = o[3]('wallet.account_from_mnem_submit.btn_submiting') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function b3(e) {
  let t
  function i(a, c) {
    return a[1] ? d3 : f3
  }
  let o = i(e),
    s = o(e)
  return {
    c() {
      s.c(), (t = Tt())
    },
    m(a, c) {
      s.m(a, c), M(a, t, c)
    },
    p(a, [c]) {
      o === (o = i(a)) && s ? s.p(a, c) : (s.d(1), (s = o(a)), s && (s.c(), s.m(t.parentNode, t)))
    },
    i: ce,
    o: ce,
    d(a) {
      a && A(t), s.d(a)
    },
  }
}
function v3(e, t, i) {
  let o
  ae(e, De, (p) => i(3, (o = p)))
  let { formDangerMnem: s } = t,
    { isNewAccount: a = !0 } = t
  function c() {
    wn.modal('#submit-confirmation-modal').show()
  }
  let h = !1
  function f(p) {
    p.length != 0 &&
      (i(2, (h = !0)),
      yd(Za.Mnem, p.trim()).finally(() => {
        i(2, (h = !1)), (p = null), wn.modal('#submit-confirmation-modal').hide()
      }))
  }
  return (
    Ut(() => i(0, (s = null))),
    (e.$$set = (p) => {
      'formDangerMnem' in p && i(0, (s = p.formDangerMnem)),
        'isNewAccount' in p && i(1, (a = p.isNewAccount))
    }),
    [s, a, h, o, c, f]
  )
}
class Id extends we {
  constructor(t) {
    super(), ye(this, t, v3, b3, ge, { formDangerMnem: 0, isNewAccount: 1 })
  }
}
function y3(e) {
  let t,
    i,
    o = e[1]('wallet.account_from_mnem_from.title') + '',
    s,
    a,
    c,
    h = e[1]('wallet.account_from_mnem_from.description') + '',
    f,
    p,
    g,
    b,
    v,
    w,
    $,
    x,
    S,
    L,
    N,
    B
  return (
    (S = new Id({ props: { formDangerMnem: e[0], isNewAccount: !1 } })),
    {
      c() {
        ;(t = m('main')),
          (i = m('h3')),
          (s = T(o)),
          (a = E()),
          (c = m('p')),
          (f = T(h)),
          (p = E()),
          (g = m('form')),
          (b = m('fieldset')),
          (v = m('div')),
          (w = m('input')),
          (x = E()),
          re(S.$$.fragment),
          y(i, 'class', 'uk-text-light uk-text-muted uk-text-uppercase'),
          y(w, 'class', 'uk-input'),
          y(w, 'type', 'text'),
          y(w, 'placeholder', ($ = e[1]('wallet.account_from_mnem_from.placeholder'))),
          y(v, 'class', 'uk-margin uk-inline-block uk-width-1-1'),
          y(b, 'class', 'uk-fieldset'),
          y(g, 'id', 'account-form')
      },
      m(F, R) {
        M(F, t, R),
          u(t, i),
          u(i, s),
          u(t, a),
          u(t, c),
          u(c, f),
          u(t, p),
          u(t, g),
          u(g, b),
          u(b, v),
          u(v, w),
          en(w, e[0]),
          u(b, x),
          oe(S, b, null),
          (L = !0),
          N || ((B = Ee(w, 'input', e[2])), (N = !0))
      },
      p(F, [R]) {
        ;(!L || R & 2) && o !== (o = F[1]('wallet.account_from_mnem_from.title') + '') && O(s, o),
          (!L || R & 2) &&
            h !== (h = F[1]('wallet.account_from_mnem_from.description') + '') &&
            O(f, h),
          (!L || (R & 2 && $ !== ($ = F[1]('wallet.account_from_mnem_from.placeholder')))) &&
            y(w, 'placeholder', $),
          R & 1 && w.value !== F[0] && en(w, F[0])
        const V = {}
        R & 1 && (V.formDangerMnem = F[0]), S.$set(V)
      },
      i(F) {
        L || (D(S.$$.fragment, F), (L = !0))
      },
      o(F) {
        U(S.$$.fragment, F), (L = !1)
      },
      d(F) {
        F && A(t), se(S), (N = !1), B()
      },
    }
  )
}
function w3(e, t, i) {
  let o
  ae(e, De, (c) => i(1, (o = c)))
  let s
  Ut(() => i(0, (s = null)))
  function a() {
    ;(s = this.value), i(0, s)
  }
  return [s, o, a]
}
class Nd extends we {
  constructor(t) {
    super(), ye(this, t, w3, y3, ge, {})
  }
}
function k3(e) {
  let t,
    i,
    o,
    s,
    a,
    c,
    h = e[0]('wallet.account_from_private.accordion_title') + '',
    f,
    p,
    g,
    b,
    v
  return (
    (i = new Nd({})),
    (b = new h3({})),
    {
      c() {
        ;(t = m('main')),
          re(i.$$.fragment),
          (o = E()),
          (s = m('ul')),
          (a = m('li')),
          (c = m('a')),
          (f = T(h)),
          (p = E()),
          (g = m('div')),
          re(b.$$.fragment),
          y(c, 'class', 'uk-accordion-title uk-text-uppercase uk-text-muted uk-text-small'),
          y(c, 'href', '#'),
          y(g, 'class', 'uk-accordion-content'),
          y(s, 'uk-accordion', ''),
          y(s, 'class', 'uk-box-shadow-small uk-padding-small')
      },
      m(w, $) {
        M(w, t, $),
          oe(i, t, null),
          u(t, o),
          u(t, s),
          u(s, a),
          u(a, c),
          u(c, f),
          u(a, p),
          u(a, g),
          oe(b, g, null),
          (v = !0)
      },
      p(w, [$]) {
        ;(!v || $ & 1) &&
          h !== (h = w[0]('wallet.account_from_private.accordion_title') + '') &&
          O(f, h)
      },
      i(w) {
        v || (D(i.$$.fragment, w), D(b.$$.fragment, w), (v = !0))
      },
      o(w) {
        U(i.$$.fragment, w), U(b.$$.fragment, w), (v = !1)
      },
      d(w) {
        w && A(t), se(i), se(b)
      },
    }
  )
}
function $3(e, t, i) {
  let o
  return ae(e, De, (s) => i(0, (o = s))), [o]
}
class C3 extends we {
  constructor(t) {
    super(), ye(this, t, $3, k3, ge, {})
  }
}
function x3(e) {
  let t,
    i,
    o,
    s,
    a,
    c = e[3]('wallet.keygen.title') + '',
    h,
    f,
    p,
    g,
    b = e[3]('wallet.keygen.description') + '',
    v,
    w,
    $,
    x,
    S = e[3]('wallet.keygen.btn_generate_keys') + '',
    L,
    N,
    B
  return {
    c() {
      ;(t = m('div')),
        (i = m('div')),
        (o = m('div')),
        (s = m('div')),
        (a = m('h3')),
        (h = T(c)),
        (f = E()),
        (p = m('div')),
        (g = m('p')),
        (v = T(b)),
        (w = E()),
        ($ = m('div')),
        (x = m('button')),
        (L = T(S)),
        y(a, 'class', 'uk-card-title uk-margin-remove-bottom uk-text-muted uk-text-uppercase'),
        y(s, 'class', 'uk-width-expand'),
        y(o, 'class', 'uk-grid-small uk-flex-middle'),
        y(o, 'uk-grid', ''),
        y(i, 'class', 'uk-card-header'),
        y(p, 'class', 'uk-card-body'),
        y(x, 'class', 'uk-button uk-button-secondary'),
        y($, 'class', 'uk-card-footer'),
        y(t, 'class', 'uk-card uk-card-default uk-align-center uk-width-1-2@m')
    },
    m(F, R) {
      M(F, t, R),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, a),
        u(a, h),
        u(t, f),
        u(t, p),
        u(p, g),
        u(g, v),
        u(t, w),
        u(t, $),
        u($, x),
        u(x, L),
        N || ((B = Ee(x, 'click', e[4])), (N = !0))
    },
    p(F, R) {
      R & 8 && c !== (c = F[3]('wallet.keygen.title') + '') && O(h, c),
        R & 8 && b !== (b = F[3]('wallet.keygen.description') + '') && O(v, b),
        R & 8 && S !== (S = F[3]('wallet.keygen.btn_generate_keys') + '') && O(L, S)
    },
    i: ce,
    o: ce,
    d(F) {
      F && A(t), (N = !1), B()
    },
  }
}
function E3(e) {
  let t,
    i,
    o = e[3]('wallet.keygen.account_address') + '',
    s,
    a,
    c,
    h = e[2].account + '',
    f,
    p,
    g,
    b = e[3]('wallet.keygen.securite_recovery_phrase') + '',
    v,
    w,
    $,
    x = e[3]('wallet.keygen.securite_note') + '',
    S,
    L,
    N,
    B,
    F,
    R,
    V,
    G = e[3]('wallet.keygen.account_tips') + '',
    j,
    Y,
    z,
    W,
    te,
    K,
    ee = e[3]('wallet.keygen.btn_generate_keys_2') + '',
    ne,
    Z,
    I,
    Q
  return (
    (W = new Id({ props: { formDangerMnem: e[0] } })),
    {
      c() {
        ;(t = m('div')),
          (i = m('h5')),
          (s = T(o)),
          (a = E()),
          (c = m('p')),
          (f = T(h)),
          (p = E()),
          (g = m('h5')),
          (v = T(b)),
          (w = E()),
          ($ = m('p')),
          (S = T(x)),
          (L = E()),
          (N = m('div')),
          (B = m('textarea')),
          (F = E()),
          (R = m('div')),
          (V = m('p')),
          (j = T(G)),
          (Y = E()),
          (z = m('div')),
          re(W.$$.fragment),
          (te = E()),
          (K = m('button')),
          (ne = T(ee)),
          y(i, 'class', 'uk-text-muted uk-text-uppercase'),
          y(c, 'class', 'uk-text-emphasis uk-text-uppercase'),
          y(g, 'class', 'uk-text-muted uk-text-uppercase uk-text-danger'),
          y($, 'class', 'uk-text-danger'),
          y(B, 'class', 'uk-textarea'),
          y(B, 'rows', '3'),
          (B.readOnly = !0),
          (B.value = e[0]),
          y(N, 'class', 'uk-margin'),
          y(t, 'class', 'uk-margin uk-card uk-card-default uk-card-body uk-text-muted'),
          y(K, 'class', 'uk-button uk-button-default uk-align-right')
      },
      m(ie, ue) {
        M(ie, t, ue),
          u(t, i),
          u(i, s),
          u(t, a),
          u(t, c),
          u(c, f),
          u(t, p),
          u(t, g),
          u(g, v),
          u(t, w),
          u(t, $),
          u($, S),
          u(t, L),
          u(t, N),
          u(N, B),
          M(ie, F, ue),
          M(ie, R, ue),
          u(R, V),
          u(V, j),
          M(ie, Y, ue),
          M(ie, z, ue),
          oe(W, z, null),
          u(z, te),
          u(z, K),
          u(K, ne),
          (Z = !0),
          I || ((Q = Ee(K, 'click', e[4])), (I = !0))
      },
      p(ie, ue) {
        ;(!Z || ue & 8) && o !== (o = ie[3]('wallet.keygen.account_address') + '') && O(s, o),
          (!Z || ue & 4) && h !== (h = ie[2].account + '') && O(f, h),
          (!Z || ue & 8) &&
            b !== (b = ie[3]('wallet.keygen.securite_recovery_phrase') + '') &&
            O(v, b),
          (!Z || ue & 8) && x !== (x = ie[3]('wallet.keygen.securite_note') + '') && O(S, x),
          (!Z || ue & 1) && (B.value = ie[0]),
          (!Z || ue & 8) && G !== (G = ie[3]('wallet.keygen.account_tips') + '') && O(j, G)
        const le = {}
        ue & 1 && (le.formDangerMnem = ie[0]),
          W.$set(le),
          (!Z || ue & 8) &&
            ee !== (ee = ie[3]('wallet.keygen.btn_generate_keys_2') + '') &&
            O(ne, ee)
      },
      i(ie) {
        Z || (D(W.$$.fragment, ie), (Z = !0))
      },
      o(ie) {
        U(W.$$.fragment, ie), (Z = !1)
      },
      d(ie) {
        ie && (A(t), A(F), A(R), A(Y), A(z)), se(W), (I = !1), Q()
      },
    }
  )
}
function S3(e) {
  let t, i, o, s
  const a = [E3, x3],
    c = []
  function h(f, p) {
    return f[2] && f[2].account && !f[1] ? 0 : 1
  }
  return (
    (i = h(e)),
    (o = c[i] = a[i](e)),
    {
      c() {
        ;(t = m('main')), o.c()
      },
      m(f, p) {
        M(f, t, p), c[i].m(t, null), (s = !0)
      },
      p(f, [p]) {
        let g = i
        ;(i = h(f)),
          i === g
            ? c[i].p(f, p)
            : (qe(),
              U(c[g], 1, 1, () => {
                c[g] = null
              }),
              Ye(),
              (o = c[i]),
              o ? o.p(f, p) : ((o = c[i] = a[i](f)), o.c()),
              D(o, 1),
              o.m(t, null))
      },
      i(f) {
        s || (D(o), (s = !0))
      },
      o(f) {
        U(o), (s = !1)
      },
      d(f) {
        f && A(t), c[i].d()
      },
    }
  )
}
function T3(e, t, i) {
  let o, s
  ae(e, It, (f) => i(2, (o = f))), ae(e, De, (f) => i(3, (s = f)))
  let a,
    c = !0
  const h = async () => {
    Ke('keygen', {})
      .then((f) => {
        i(0, (a = f.mnem)),
          (f.mnem = null),
          zt.set(JSON.stringify(f)),
          It.set(f.entry),
          i(1, (c = !1))
      })
      .catch((f) => Ze(f, !0, 'do_keygen'))
  }
  return Ut(() => i(0, (a = null))), [a, c, o, s, h]
}
class L3 extends we {
  constructor(t) {
    super(), ye(this, t, T3, S3, ge, {})
  }
}
function A3(e) {
  let t
  function i(a, c) {
    return a[7] ? I3 : P3
  }
  let o = i(e),
    s = o(e)
  return {
    c() {
      ;(t = m('div')), s.c()
    },
    m(a, c) {
      M(a, t, c), s.m(t, null)
    },
    p(a, c) {
      o === (o = i(a)) && s ? s.p(a, c) : (s.d(1), (s = o(a)), s && (s.c(), s.m(t, null)))
    },
    i: ce,
    o: ce,
    d(a) {
      a && A(t), s.d()
    },
  }
}
function M3(e) {
  let t, i
  return (
    (t = new Md({})),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p: ce,
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function P3(e) {
  let t,
    i,
    o,
    s,
    a = e[3]('txs.transfer.sender') + '',
    c,
    h,
    f,
    p = zi(e[0].account) + '',
    g,
    b,
    v,
    w,
    $ = e[3]('txs.transfer.balance') + '',
    x,
    S,
    L,
    N = sn(e[0].balance.unlocked) + '',
    B,
    F,
    R,
    V,
    G = e[3]('txs.transfer.receiver') + '',
    j,
    Y,
    z,
    W,
    te,
    K,
    ee,
    ne,
    Z = e[3]('txs.transfer.amount_label') + '',
    I,
    Q,
    ie,
    ue,
    le,
    _e,
    Ce,
    xe = (e[10] || e[5]) + '',
    Me,
    ke,
    be,
    $e,
    me,
    de,
    Be = (e[6] ? e[3]('txs.transfer.btn_close') : e[3]('txs.transfer.btn_cancel')) + '',
    Le,
    tt,
    dt,
    pt = (e[6] ? e[3]('txs.transfer.await') : e[3]('txs.transfer.btn_next')) + '',
    Ve,
    Ge,
    ht,
    he,
    nt = e[6] && $h()
  return {
    c() {
      ;(t = m('form')),
        (i = m('fieldset')),
        (o = m('div')),
        (s = m('label')),
        (c = T(a)),
        (h = E()),
        (f = m('div')),
        (g = T(p)),
        (b = E()),
        (v = m('div')),
        (w = m('label')),
        (x = T($)),
        (S = E()),
        (L = m('div')),
        (B = T(N)),
        (F = E()),
        (R = m('div')),
        (V = m('label')),
        (j = T(G)),
        (Y = E()),
        (z = m('div')),
        (W = m('input')),
        (K = E()),
        (ee = m('div')),
        (ne = m('label')),
        (I = T(Z)),
        (Q = E()),
        (ie = m('div')),
        (ue = m('input')),
        (_e = E()),
        (Ce = m('p')),
        (Me = T(xe)),
        (ke = E()),
        (be = m('div')),
        ($e = m('div')),
        nt && nt.c(),
        (me = E()),
        (de = m('button')),
        (Le = T(Be)),
        (tt = E()),
        (dt = m('button')),
        (Ve = T(pt)),
        y(s, 'class', 'uk-form-label'),
        y(s, 'for', 'sender-text'),
        y(o, 'class', 'uk-width-3-4@s'),
        y(w, 'class', 'uk-form-label'),
        y(w, 'for', 'balance-text'),
        y(v, 'class', 'uk-width-1-4@s'),
        y(V, 'class', 'uk-form-label'),
        y(V, 'for', 'receiver-text'),
        y(W, 'id', 'receiver-text'),
        (W.disabled = e[6]),
        y(W, 'class', 'uk-input'),
        y(W, 'type', 'text'),
        y(W, 'placeholder', (te = e[3]('txs.transfer.receiver_placeholder'))),
        y(z, 'class', 'uk-form-controls'),
        y(R, 'class', 'uk-width-1-1'),
        y(ne, 'class', 'uk-form-label'),
        y(ne, 'for', 'amount-text'),
        y(ue, 'id', 'amount-text'),
        (ue.disabled = e[6]),
        y(ue, 'class', 'uk-input'),
        y(ue, 'type', 'text'),
        y(ue, 'placeholder', (le = e[3]('txs.transfer.amount_placeholder'))),
        y(ie, 'class', 'uk-form-controls uk-width-1-1'),
        y(ee, 'class', 'uk-width-1-1'),
        y(Ce, 'class', 'uk-text-warning'),
        y(de, 'class', 'uk-button uk-button-default uk-modal-close uk-margin-right'),
        (dt.disabled = Ge = e[6] || !e[9] || !e[8]),
        y(dt, 'class', 'uk-button uk-button-primary'),
        y($e, 'class', 'uk-align-right'),
        y(be, 'class', 'uk-width-1-1'),
        y(i, 'class', 'uk-fieldset uk-grid-small'),
        y(i, 'uk-grid', ''),
        y(t, 'id', 'account-form')
    },
    m(Re, Ae) {
      M(Re, t, Ae),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, c),
        u(o, h),
        u(o, f),
        u(f, g),
        u(i, b),
        u(i, v),
        u(v, w),
        u(w, x),
        u(v, S),
        u(v, L),
        u(L, B),
        u(i, F),
        u(i, R),
        u(R, V),
        u(V, j),
        u(R, Y),
        u(R, z),
        u(z, W),
        en(W, e[1]),
        u(i, K),
        u(i, ee),
        u(ee, ne),
        u(ne, I),
        u(ee, Q),
        u(ee, ie),
        u(ie, ue),
        en(ue, e[4]),
        u(i, _e),
        u(i, Ce),
        u(Ce, Me),
        u(i, ke),
        u(i, be),
        u(be, $e),
        nt && nt.m($e, null),
        u($e, me),
        u($e, de),
        u(de, Le),
        u($e, tt),
        u($e, dt),
        u(dt, Ve),
        ht ||
          ((he = [
            Ee(W, 'input', e[15]),
            Ee(ue, 'input', e[16]),
            Ee(ue, 'input', e[14]),
            Ee(dt, 'click', e[17]),
          ]),
          (ht = !0))
    },
    p(Re, Ae) {
      Ae & 8 && a !== (a = Re[3]('txs.transfer.sender') + '') && O(c, a),
        Ae & 1 && p !== (p = zi(Re[0].account) + '') && O(g, p),
        Ae & 8 && $ !== ($ = Re[3]('txs.transfer.balance') + '') && O(x, $),
        Ae & 1 && N !== (N = sn(Re[0].balance.unlocked) + '') && O(B, N),
        Ae & 8 && G !== (G = Re[3]('txs.transfer.receiver') + '') && O(j, G),
        Ae & 64 && (W.disabled = Re[6]),
        Ae & 8 &&
          te !== (te = Re[3]('txs.transfer.receiver_placeholder')) &&
          y(W, 'placeholder', te),
        Ae & 2 && W.value !== Re[1] && en(W, Re[1]),
        Ae & 8 && Z !== (Z = Re[3]('txs.transfer.amount_label') + '') && O(I, Z),
        Ae & 64 && (ue.disabled = Re[6]),
        Ae & 8 &&
          le !== (le = Re[3]('txs.transfer.amount_placeholder')) &&
          y(ue, 'placeholder', le),
        Ae & 16 && ue.value !== Re[4] && en(ue, Re[4]),
        Ae & 1056 && xe !== (xe = (Re[10] || Re[5]) + '') && O(Me, xe),
        Re[6] ? nt || ((nt = $h()), nt.c(), nt.m($e, me)) : nt && (nt.d(1), (nt = null)),
        Ae & 72 &&
          Be !==
            (Be =
              (Re[6] ? Re[3]('txs.transfer.btn_close') : Re[3]('txs.transfer.btn_cancel')) + '') &&
          O(Le, Be),
        Ae & 72 &&
          pt !==
            (pt = (Re[6] ? Re[3]('txs.transfer.await') : Re[3]('txs.transfer.btn_next')) + '') &&
          O(Ve, pt),
        Ae & 832 && Ge !== (Ge = Re[6] || !Re[9] || !Re[8]) && (dt.disabled = Ge)
    },
    d(Re) {
      Re && A(t), nt && nt.d(), (ht = !1), yt(he)
    },
  }
}
function I3(e) {
  let t,
    i = e[3]('txs.transfer.confirm_title') + '',
    o,
    s,
    a,
    c = e[3]('txs.transfer.please_confirm') + '',
    h,
    f,
    p,
    g = e[3]('txs.transfer.sender') + '',
    b,
    v,
    w,
    $ = zi(e[0].account) + '',
    x,
    S,
    L,
    N = e[3]('txs.transfer.receiver') + '',
    B,
    F,
    R,
    V,
    G,
    j,
    Y = e[3]('txs.transfer.amount') + '',
    z,
    W,
    te,
    K = ya(e[2]) + '',
    ee,
    ne,
    Z,
    I,
    Q = e[3]('txs.transfer.btn_cancel') + '',
    ie,
    ue,
    le,
    _e = e[3]('txs.transfer.btn_confirm') + '',
    Ce,
    xe,
    Me
  return {
    c() {
      ;(t = m('h2')),
        (o = T(i)),
        (s = E()),
        (a = m('p')),
        (h = T(c)),
        (f = E()),
        (p = m('p')),
        (b = T(g)),
        (v = T(':\n          ')),
        (w = m('span')),
        (x = T($)),
        (S = E()),
        (L = m('p')),
        (B = T(N)),
        (F = T(':\n          ')),
        (R = m('span')),
        (V = T(e[1])),
        (G = E()),
        (j = m('p')),
        (z = T(Y)),
        (W = T(':\n          ')),
        (te = m('span')),
        (ee = T(K)),
        (ne = E()),
        (Z = m('p')),
        (I = m('button')),
        (ie = T(Q)),
        (ue = E()),
        (le = m('button')),
        (Ce = T(_e)),
        y(t, 'class', 'uk-text-muted uk-text-uppercase'),
        y(w, 'class', 'uk-text-bold'),
        y(p, 'class', 'uk-text-uppercase'),
        y(R, 'class', 'uk-text-bold'),
        y(L, 'class', 'uk-text-uppercase'),
        y(te, 'class', 'uk-text-bold'),
        y(j, 'class', 'uk-text-uppercase'),
        y(I, 'class', 'uk-button uk-button-default uk-margin-right'),
        y(I, 'type', 'button'),
        y(le, 'class', 'uk-button uk-button-primary'),
        y(le, 'type', 'button'),
        y(Z, 'class', 'uk-text-right')
    },
    m(ke, be) {
      M(ke, t, be),
        u(t, o),
        M(ke, s, be),
        M(ke, a, be),
        u(a, h),
        M(ke, f, be),
        M(ke, p, be),
        u(p, b),
        u(p, v),
        u(p, w),
        u(w, x),
        M(ke, S, be),
        M(ke, L, be),
        u(L, B),
        u(L, F),
        u(L, R),
        u(R, V),
        M(ke, G, be),
        M(ke, j, be),
        u(j, z),
        u(j, W),
        u(j, te),
        u(te, ee),
        M(ke, ne, be),
        M(ke, Z, be),
        u(Z, I),
        u(I, ie),
        u(Z, ue),
        u(Z, le),
        u(le, Ce),
        xe || ((Me = [Ee(I, 'click', e[12]), Ee(le, 'click', e[13])]), (xe = !0))
    },
    p(ke, be) {
      be & 8 && i !== (i = ke[3]('txs.transfer.confirm_title') + '') && O(o, i),
        be & 8 && c !== (c = ke[3]('txs.transfer.please_confirm') + '') && O(h, c),
        be & 8 && g !== (g = ke[3]('txs.transfer.sender') + '') && O(b, g),
        be & 1 && $ !== ($ = zi(ke[0].account) + '') && O(x, $),
        be & 8 && N !== (N = ke[3]('txs.transfer.receiver') + '') && O(B, N),
        be & 2 && O(V, ke[1]),
        be & 8 && Y !== (Y = ke[3]('txs.transfer.amount') + '') && O(z, Y),
        be & 4 && K !== (K = ya(ke[2]) + '') && O(ee, K),
        be & 8 && Q !== (Q = ke[3]('txs.transfer.btn_cancel') + '') && O(ie, Q),
        be & 8 && _e !== (_e = ke[3]('txs.transfer.btn_confirm') + '') && O(Ce, _e)
    },
    d(ke) {
      ke && (A(t), A(s), A(a), A(f), A(p), A(S), A(L), A(G), A(j), A(ne), A(Z)), (xe = !1), yt(Me)
    },
  }
}
function $h(e) {
  let t
  return {
    c() {
      ;(t = m('span')), y(t, 'uk-spinner', 'ratio: 0.8'), Bt(t, 'margin', '0px 10px 0px 0px')
    },
    m(i, o) {
      M(i, t, o)
    },
    d(i) {
      i && A(t)
    },
  }
}
function N3(e) {
  let t,
    i,
    o,
    s = e[3]('nav.transactions') + '',
    a,
    c,
    h,
    f,
    p
  const g = [M3, A3],
    b = []
  function v(w, $) {
    return w[11].on_chain ? (w[0] ? 1 : -1) : 0
  }
  return (
    ~(h = v(e)) && (f = b[h] = g[h](e)),
    {
      c() {
        ;(t = m('main')),
          (i = m('div')),
          (o = m('h2')),
          (a = T(s)),
          (c = E()),
          f && f.c(),
          y(o, 'class', 'uk-text-light uk-text-muted uk-text-uppercase'),
          y(i, 'class', 'uk-flex uk-flex-center')
      },
      m(w, $) {
        M(w, t, $), u(t, i), u(i, o), u(o, a), u(t, c), ~h && b[h].m(t, null), (p = !0)
      },
      p(w, [$]) {
        ;(!p || $ & 8) && s !== (s = w[3]('nav.transactions') + '') && O(a, s)
        let x = h
        ;(h = v(w)),
          h === x
            ? ~h && b[h].p(w, $)
            : (f &&
                (qe(),
                U(b[x], 1, 1, () => {
                  b[x] = null
                }),
                Ye()),
              ~h
                ? ((f = b[h]), f ? f.p(w, $) : ((f = b[h] = g[h](w)), f.c()), D(f, 1), f.m(t, null))
                : (f = null))
      },
      i(w) {
        p || (D(f), (p = !0))
      },
      o(w) {
        U(f), (p = !1)
      },
      d(w) {
        w && A(t), ~h && b[h].d()
      },
    }
  )
}
const O3 = /[a-fA-F0-9]{32}/i
function B3(e, t, i) {
  let o, s
  ae(e, De, (j) => i(3, (o = j))), ae(e, It, (j) => i(11, (s = j)))
  const a = {
    120127: o('txs.transfer.error_slow_wallet'),
    1004: o('txs.transfer.error_account_does_not_exist'),
  }
  let c, h
  wt(async () => {
    h = It.subscribe((j) => i(0, (c = j)))
  })
  let f,
    p,
    g = 0,
    b = '',
    v = !1,
    w = !1,
    $ = !0,
    x = !0,
    S = ''
  Ut(async () => {
    h && h()
  })
  const L = async () => (
      i(6, (v = !0)),
      Ke('coin_transfer', { sender: c.account, receiver: f.trim(), amount: g })
        .then((j) => {
          zt.set(JSON.stringify(j)),
            on(o('txs.transfer.success')),
            i(6, (v = !1)),
            i(2, (g = 0)),
            i(1, (f = null))
        })
        .catch((j) => {
          zt.set(JSON.stringify(j)),
            Ze(j, !1, 'coin_transfer'),
            i(5, (b = a[j.msg] ? a[j.msg] : o('txs.transfer.failed', { values: { code: j.msg } }))),
            i(6, (v = !1))
        })
    ),
    N = () => {
      i(7, (w = !1))
    },
    B = () => {
      i(7, (w = !1)), L()
    },
    F = () => {
      let j = p.replace(/\D*/gm, '').replace(/^0+/gm, '')
      j.length === 0
        ? (i(2, (g = 0)), i(4, (p = '')))
        : (i(2, (g = parseInt(j))), i(4, (p = ya(g, 0, 0))))
    }
  function R() {
    ;(f = this.value), i(1, f)
  }
  function V() {
    ;(p = this.value), i(4, p)
  }
  const G = () => i(7, (w = !0))
  return (
    (e.$$.update = () => {
      e.$$.dirty & 3 && i(8, ($ = c && f && O3.test(f) && f != c.account)),
        e.$$.dirty & 5 && i(9, (x = c && g > 0 && g < Ao(c.balance.unlocked))),
        e.$$.dirty & 15 &&
          i(
            10,
            (S =
              c && g > Ao(c.balance)
                ? o('txs.transfer.error_amount_greater_than_balance')
                : f && f.toUpperCase() == c.account.toUpperCase()
                  ? o('txs.transfer.error_receiver_equals_sender')
                  : ''),
          )
    }),
    [c, f, g, o, p, b, v, w, $, x, S, s, N, B, F, R, V, G]
  )
}
class D3 extends we {
  constructor(t) {
    super(), ye(this, t, B3, N3, ge, {})
  }
}
function R3(e) {
  let t, i, o, s, a, c, h, f
  return {
    c() {
      ;(t = m('button')),
        (i = m('div')),
        (o = m('span')),
        (s = T(e[1])),
        y(o, 'class', 'page-index-number svelte-rt5tp2'),
        y(
          i,
          'class',
          (a =
            'uk-text-center page-index ' +
            (e[1] == e[0] ? 'page-index-selected' : 'page-index-not-selected') +
            ' svelte-rt5tp2'),
        ),
        y(t, 'id', (c = 'pageIndex' + e[1])),
        y(t, 'class', 'uk-align-left page-index-link svelte-rt5tp2')
    },
    m(p, g) {
      M(p, t, g), u(t, i), u(i, o), u(o, s), h || ((f = Ee(t, 'click', e[2])), (h = !0))
    },
    p(p, [g]) {
      g & 2 && O(s, p[1]),
        g & 3 &&
          a !==
            (a =
              'uk-text-center page-index ' +
              (p[1] == p[0] ? 'page-index-selected' : 'page-index-not-selected') +
              ' svelte-rt5tp2') &&
          y(i, 'class', a),
        g & 2 && c !== (c = 'pageIndex' + p[1]) && y(t, 'id', c)
    },
    i: ce,
    o: ce,
    d(p) {
      p && A(t), (h = !1), f()
    },
  }
}
function H3(e, t, i) {
  let { number: o } = t,
    { index: s } = t
  const a = () => i(0, (s = o))
  return (
    (e.$$set = (c) => {
      'number' in c && i(1, (o = c.number)), 'index' in c && i(0, (s = c.index))
    }),
    [s, o, a]
  )
}
class Mt extends we {
  constructor(t) {
    super(), ye(this, t, H3, R3, ge, { number: 1, index: 0 })
  }
}
function Ch(e, t, i) {
  const o = e.slice()
  return (o[26] = t[i]), o
}
function xh(e, t, i) {
  const o = e.slice()
  return (o[29] = t[i]), o
}
function Eh(e) {
  let t,
    i,
    o = e[29].transaction_version + '',
    s,
    a,
    c,
    h = e[5](e[29].data.type) + '',
    f,
    p,
    g,
    b = sn(e[29].data.amount.amount) + '',
    v,
    w,
    $,
    x = e[29].data.sender + '',
    S,
    L,
    N,
    B = e[29].data.receiver + '',
    F,
    R
  return {
    c() {
      ;(t = m('tr')),
        (i = m('td')),
        (s = T(o)),
        (a = E()),
        (c = m('td')),
        (f = T(h)),
        (p = E()),
        (g = m('td')),
        (v = T(b)),
        (w = E()),
        ($ = m('td')),
        (S = T(x)),
        (L = E()),
        (N = m('td')),
        (F = T(B)),
        (R = E()),
        y(i, 'class', 'uk-text-right'),
        y(c, 'class', 'uk-text-center'),
        y(g, 'class', 'uk-text-right'),
        y($, 'class', 'uk-text-center'),
        y(N, 'class', 'uk-text-center')
    },
    m(V, G) {
      M(V, t, G),
        u(t, i),
        u(i, s),
        u(t, a),
        u(t, c),
        u(c, f),
        u(t, p),
        u(t, g),
        u(g, v),
        u(t, w),
        u(t, $),
        u($, S),
        u(t, L),
        u(t, N),
        u(N, F),
        u(t, R)
    },
    p(V, G) {
      G[0] & 3 && o !== (o = V[29].transaction_version + '') && O(s, o),
        G[0] & 3 && h !== (h = V[5](V[29].data.type) + '') && O(f, h),
        G[0] & 3 && b !== (b = sn(V[29].data.amount.amount) + '') && O(v, b),
        G[0] & 3 && x !== (x = V[29].data.sender + '') && O(S, x),
        G[0] & 3 && B !== (B = V[29].data.receiver + '') && O(F, B)
    },
    d(V) {
      V && A(t)
    },
  }
}
function Sh(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w
  const $ = [W3, F3, U3, z3],
    x = []
  function S(L, N) {
    return (
      N[0] & 2 && (a = null),
      N[0] & 3 && (c = null),
      a == null && (a = Object.keys(L[1]).length <= 7),
      a ? 0 : L[0] <= 4 ? 1 : (c == null && (c = Object.keys(L[1]).length - L[0] < 4), c ? 2 : 3)
    )
  }
  return (
    (h = S(e, [-1, -1])),
    (f = x[h] = $[h](e)),
    {
      c() {
        ;(t = m('div')),
          (i = m('a')),
          (i.innerHTML = '<span uk-icon="chevron-left"></span>'),
          (o = E()),
          (s = m('div')),
          f.c(),
          (p = E()),
          (g = m('a')),
          (g.innerHTML = '<span uk-icon="chevron-right"></span>'),
          y(i, 'href', '#'),
          y(i, 'class', 'previous-page-btn uk-align-left uk-text-center svelte-19wc50z'),
          y(s, 'class', 'page-numbers-container uk-align-left svelte-19wc50z'),
          y(g, 'href', '#'),
          y(g, 'class', 'next-page-btn uk-align-left uk-text-center svelte-19wc50z'),
          y(t, 'class', 'pagination-container uk-text-center svelte-19wc50z')
      },
      m(L, N) {
        M(L, t, N),
          u(t, i),
          u(t, o),
          u(t, s),
          x[h].m(s, null),
          u(t, p),
          u(t, g),
          (b = !0),
          v || ((w = [Ee(i, 'click', e[3]), Ee(g, 'click', e[4])]), (v = !0))
      },
      p(L, N) {
        let B = h
        ;(h = S(L, N)),
          h === B
            ? x[h].p(L, N)
            : (qe(),
              U(x[B], 1, 1, () => {
                x[B] = null
              }),
              Ye(),
              (f = x[h]),
              f ? f.p(L, N) : ((f = x[h] = $[h](L)), f.c()),
              D(f, 1),
              f.m(s, null))
      },
      i(L) {
        b || (D(f), (b = !0))
      },
      o(L) {
        U(f), (b = !1)
      },
      d(L) {
        L && A(t), x[h].d(), (v = !1), yt(w)
      },
    }
  )
}
function z3(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S, L, N, B
  function F(ee) {
    e[20](ee)
  }
  let R = { number: 1 }
  e[0] !== void 0 && (R.index = e[0]), (t = new Mt({ props: R })), $t.push(() => At(t, 'index', F))
  function V(ee) {
    e[21](ee)
  }
  let G = { number: e[0] - 1 }
  e[0] !== void 0 && (G.index = e[0]), (c = new Mt({ props: G })), $t.push(() => At(c, 'index', V))
  function j(ee) {
    e[22](ee)
  }
  let Y = { number: e[0] }
  e[0] !== void 0 && (Y.index = e[0]), (p = new Mt({ props: Y })), $t.push(() => At(p, 'index', j))
  function z(ee) {
    e[23](ee)
  }
  let W = { number: e[0] + 1 }
  e[0] !== void 0 && (W.index = e[0]), (v = new Mt({ props: W })), $t.push(() => At(v, 'index', z))
  function te(ee) {
    e[24](ee)
  }
  let K = { number: Object.keys(e[1]).length }
  return (
    e[0] !== void 0 && (K.index = e[0]),
    (L = new Mt({ props: K })),
    $t.push(() => At(L, 'index', te)),
    {
      c() {
        re(t.$$.fragment),
          (o = E()),
          (s = m('div')),
          (s.textContent = '...'),
          (a = E()),
          re(c.$$.fragment),
          (f = E()),
          re(p.$$.fragment),
          (b = E()),
          re(v.$$.fragment),
          ($ = E()),
          (x = m('div')),
          (x.textContent = '...'),
          (S = E()),
          re(L.$$.fragment),
          y(s, 'class', 'uk-text-center uk-align-left reticence svelte-19wc50z'),
          y(x, 'class', 'uk-text-center uk-align-left reticence svelte-19wc50z')
      },
      m(ee, ne) {
        oe(t, ee, ne),
          M(ee, o, ne),
          M(ee, s, ne),
          M(ee, a, ne),
          oe(c, ee, ne),
          M(ee, f, ne),
          oe(p, ee, ne),
          M(ee, b, ne),
          oe(v, ee, ne),
          M(ee, $, ne),
          M(ee, x, ne),
          M(ee, S, ne),
          oe(L, ee, ne),
          (B = !0)
      },
      p(ee, ne) {
        const Z = {}
        !i && ne[0] & 1 && ((i = !0), (Z.index = ee[0]), Lt(() => (i = !1))), t.$set(Z)
        const I = {}
        ne[0] & 1 && (I.number = ee[0] - 1),
          !h && ne[0] & 1 && ((h = !0), (I.index = ee[0]), Lt(() => (h = !1))),
          c.$set(I)
        const Q = {}
        ne[0] & 1 && (Q.number = ee[0]),
          !g && ne[0] & 1 && ((g = !0), (Q.index = ee[0]), Lt(() => (g = !1))),
          p.$set(Q)
        const ie = {}
        ne[0] & 1 && (ie.number = ee[0] + 1),
          !w && ne[0] & 1 && ((w = !0), (ie.index = ee[0]), Lt(() => (w = !1))),
          v.$set(ie)
        const ue = {}
        ne[0] & 2 && (ue.number = Object.keys(ee[1]).length),
          !N && ne[0] & 1 && ((N = !0), (ue.index = ee[0]), Lt(() => (N = !1))),
          L.$set(ue)
      },
      i(ee) {
        B ||
          (D(t.$$.fragment, ee),
          D(c.$$.fragment, ee),
          D(p.$$.fragment, ee),
          D(v.$$.fragment, ee),
          D(L.$$.fragment, ee),
          (B = !0))
      },
      o(ee) {
        U(t.$$.fragment, ee),
          U(c.$$.fragment, ee),
          U(p.$$.fragment, ee),
          U(v.$$.fragment, ee),
          U(L.$$.fragment, ee),
          (B = !1)
      },
      d(ee) {
        ee && (A(o), A(s), A(a), A(f), A(b), A($), A(x), A(S)),
          se(t, ee),
          se(c, ee),
          se(p, ee),
          se(v, ee),
          se(L, ee)
      },
    }
  )
}
function U3(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S, L, N, B, F
  function R(I) {
    e[14](I)
  }
  let V = { number: 1 }
  e[0] !== void 0 && (V.index = e[0]), (t = new Mt({ props: V })), $t.push(() => At(t, 'index', R))
  function G(I) {
    e[15](I)
  }
  let j = { number: Object.keys(e[1]).length - 4 }
  e[0] !== void 0 && (j.index = e[0]), (c = new Mt({ props: j })), $t.push(() => At(c, 'index', G))
  function Y(I) {
    e[16](I)
  }
  let z = { number: Object.keys(e[1]).length - 3 }
  e[0] !== void 0 && (z.index = e[0]), (p = new Mt({ props: z })), $t.push(() => At(p, 'index', Y))
  function W(I) {
    e[17](I)
  }
  let te = { number: Object.keys(e[1]).length - 2 }
  e[0] !== void 0 && (te.index = e[0]),
    (v = new Mt({ props: te })),
    $t.push(() => At(v, 'index', W))
  function K(I) {
    e[18](I)
  }
  let ee = { number: Object.keys(e[1]).length - 1 }
  e[0] !== void 0 && (ee.index = e[0]),
    (x = new Mt({ props: ee })),
    $t.push(() => At(x, 'index', K))
  function ne(I) {
    e[19](I)
  }
  let Z = { number: Object.keys(e[1]).length }
  return (
    e[0] !== void 0 && (Z.index = e[0]),
    (N = new Mt({ props: Z })),
    $t.push(() => At(N, 'index', ne)),
    {
      c() {
        re(t.$$.fragment),
          (o = E()),
          (s = m('div')),
          (s.textContent = '...'),
          (a = E()),
          re(c.$$.fragment),
          (f = E()),
          re(p.$$.fragment),
          (b = E()),
          re(v.$$.fragment),
          ($ = E()),
          re(x.$$.fragment),
          (L = E()),
          re(N.$$.fragment),
          y(s, 'class', 'uk-text-center uk-align-left reticence svelte-19wc50z')
      },
      m(I, Q) {
        oe(t, I, Q),
          M(I, o, Q),
          M(I, s, Q),
          M(I, a, Q),
          oe(c, I, Q),
          M(I, f, Q),
          oe(p, I, Q),
          M(I, b, Q),
          oe(v, I, Q),
          M(I, $, Q),
          oe(x, I, Q),
          M(I, L, Q),
          oe(N, I, Q),
          (F = !0)
      },
      p(I, Q) {
        const ie = {}
        !i && Q[0] & 1 && ((i = !0), (ie.index = I[0]), Lt(() => (i = !1))), t.$set(ie)
        const ue = {}
        Q[0] & 2 && (ue.number = Object.keys(I[1]).length - 4),
          !h && Q[0] & 1 && ((h = !0), (ue.index = I[0]), Lt(() => (h = !1))),
          c.$set(ue)
        const le = {}
        Q[0] & 2 && (le.number = Object.keys(I[1]).length - 3),
          !g && Q[0] & 1 && ((g = !0), (le.index = I[0]), Lt(() => (g = !1))),
          p.$set(le)
        const _e = {}
        Q[0] & 2 && (_e.number = Object.keys(I[1]).length - 2),
          !w && Q[0] & 1 && ((w = !0), (_e.index = I[0]), Lt(() => (w = !1))),
          v.$set(_e)
        const Ce = {}
        Q[0] & 2 && (Ce.number = Object.keys(I[1]).length - 1),
          !S && Q[0] & 1 && ((S = !0), (Ce.index = I[0]), Lt(() => (S = !1))),
          x.$set(Ce)
        const xe = {}
        Q[0] & 2 && (xe.number = Object.keys(I[1]).length),
          !B && Q[0] & 1 && ((B = !0), (xe.index = I[0]), Lt(() => (B = !1))),
          N.$set(xe)
      },
      i(I) {
        F ||
          (D(t.$$.fragment, I),
          D(c.$$.fragment, I),
          D(p.$$.fragment, I),
          D(v.$$.fragment, I),
          D(x.$$.fragment, I),
          D(N.$$.fragment, I),
          (F = !0))
      },
      o(I) {
        U(t.$$.fragment, I),
          U(c.$$.fragment, I),
          U(p.$$.fragment, I),
          U(v.$$.fragment, I),
          U(x.$$.fragment, I),
          U(N.$$.fragment, I),
          (F = !1)
      },
      d(I) {
        I && (A(o), A(s), A(a), A(f), A(b), A($), A(L)),
          se(t, I),
          se(c, I),
          se(p, I),
          se(v, I),
          se(x, I),
          se(N, I)
      },
    }
  )
}
function F3(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S, L, N, B, F
  function R(I) {
    e[8](I)
  }
  let V = { number: 1 }
  e[0] !== void 0 && (V.index = e[0]), (t = new Mt({ props: V })), $t.push(() => At(t, 'index', R))
  function G(I) {
    e[9](I)
  }
  let j = { number: 2 }
  e[0] !== void 0 && (j.index = e[0]), (s = new Mt({ props: j })), $t.push(() => At(s, 'index', G))
  function Y(I) {
    e[10](I)
  }
  let z = { number: 3 }
  e[0] !== void 0 && (z.index = e[0]), (h = new Mt({ props: z })), $t.push(() => At(h, 'index', Y))
  function W(I) {
    e[11](I)
  }
  let te = { number: 4 }
  e[0] !== void 0 && (te.index = e[0]),
    (g = new Mt({ props: te })),
    $t.push(() => At(g, 'index', W))
  function K(I) {
    e[12](I)
  }
  let ee = { number: 5 }
  e[0] !== void 0 && (ee.index = e[0]),
    (w = new Mt({ props: ee })),
    $t.push(() => At(w, 'index', K))
  function ne(I) {
    e[13](I)
  }
  let Z = { number: Object.keys(e[1]).length }
  return (
    e[0] !== void 0 && (Z.index = e[0]),
    (N = new Mt({ props: Z })),
    $t.push(() => At(N, 'index', ne)),
    {
      c() {
        re(t.$$.fragment),
          (o = E()),
          re(s.$$.fragment),
          (c = E()),
          re(h.$$.fragment),
          (p = E()),
          re(g.$$.fragment),
          (v = E()),
          re(w.$$.fragment),
          (x = E()),
          (S = m('div')),
          (S.textContent = '...'),
          (L = E()),
          re(N.$$.fragment),
          y(S, 'class', 'uk-text-center uk-align-left reticence svelte-19wc50z')
      },
      m(I, Q) {
        oe(t, I, Q),
          M(I, o, Q),
          oe(s, I, Q),
          M(I, c, Q),
          oe(h, I, Q),
          M(I, p, Q),
          oe(g, I, Q),
          M(I, v, Q),
          oe(w, I, Q),
          M(I, x, Q),
          M(I, S, Q),
          M(I, L, Q),
          oe(N, I, Q),
          (F = !0)
      },
      p(I, Q) {
        const ie = {}
        !i && Q[0] & 1 && ((i = !0), (ie.index = I[0]), Lt(() => (i = !1))), t.$set(ie)
        const ue = {}
        !a && Q[0] & 1 && ((a = !0), (ue.index = I[0]), Lt(() => (a = !1))), s.$set(ue)
        const le = {}
        !f && Q[0] & 1 && ((f = !0), (le.index = I[0]), Lt(() => (f = !1))), h.$set(le)
        const _e = {}
        !b && Q[0] & 1 && ((b = !0), (_e.index = I[0]), Lt(() => (b = !1))), g.$set(_e)
        const Ce = {}
        !$ && Q[0] & 1 && (($ = !0), (Ce.index = I[0]), Lt(() => ($ = !1))), w.$set(Ce)
        const xe = {}
        Q[0] & 2 && (xe.number = Object.keys(I[1]).length),
          !B && Q[0] & 1 && ((B = !0), (xe.index = I[0]), Lt(() => (B = !1))),
          N.$set(xe)
      },
      i(I) {
        F ||
          (D(t.$$.fragment, I),
          D(s.$$.fragment, I),
          D(h.$$.fragment, I),
          D(g.$$.fragment, I),
          D(w.$$.fragment, I),
          D(N.$$.fragment, I),
          (F = !0))
      },
      o(I) {
        U(t.$$.fragment, I),
          U(s.$$.fragment, I),
          U(h.$$.fragment, I),
          U(g.$$.fragment, I),
          U(w.$$.fragment, I),
          U(N.$$.fragment, I),
          (F = !1)
      },
      d(I) {
        I && (A(o), A(c), A(p), A(v), A(x), A(S), A(L)),
          se(t, I),
          se(s, I),
          se(h, I),
          se(g, I),
          se(w, I),
          se(N, I)
      },
    }
  )
}
function W3(e) {
  let t,
    i,
    o = Pt(Object.keys(e[1])),
    s = []
  for (let c = 0; c < o.length; c += 1) s[c] = Th(Ch(e, o, c))
  const a = (c) =>
    U(s[c], 1, 1, () => {
      s[c] = null
    })
  return {
    c() {
      for (let c = 0; c < s.length; c += 1) s[c].c()
      t = Tt()
    },
    m(c, h) {
      for (let f = 0; f < s.length; f += 1) s[f] && s[f].m(c, h)
      M(c, t, h), (i = !0)
    },
    p(c, h) {
      if (h[0] & 3) {
        o = Pt(Object.keys(c[1]))
        let f
        for (f = 0; f < o.length; f += 1) {
          const p = Ch(c, o, f)
          s[f]
            ? (s[f].p(p, h), D(s[f], 1))
            : ((s[f] = Th(p)), s[f].c(), D(s[f], 1), s[f].m(t.parentNode, t))
        }
        for (qe(), f = o.length; f < s.length; f += 1) a(f)
        Ye()
      }
    },
    i(c) {
      if (!i) {
        for (let h = 0; h < o.length; h += 1) D(s[h])
        i = !0
      }
    },
    o(c) {
      s = s.filter(Boolean)
      for (let h = 0; h < s.length; h += 1) U(s[h])
      i = !1
    },
    d(c) {
      c && A(t), $n(s, c)
    },
  }
}
function Th(e) {
  let t, i, o
  function s(c) {
    e[7](c)
  }
  let a = { number: Number(e[26]) }
  return (
    e[0] !== void 0 && (a.index = e[0]),
    (t = new Mt({ props: a })),
    $t.push(() => At(t, 'index', s)),
    {
      c() {
        re(t.$$.fragment)
      },
      m(c, h) {
        oe(t, c, h), (o = !0)
      },
      p(c, h) {
        const f = {}
        h[0] & 2 && (f.number = Number(c[26])),
          !i && h[0] & 1 && ((i = !0), (f.index = c[0]), Lt(() => (i = !1))),
          t.$set(f)
      },
      i(c) {
        o || (D(t.$$.fragment, c), (o = !0))
      },
      o(c) {
        U(t.$$.fragment, c), (o = !1)
      },
      d(c) {
        se(t, c)
      },
    }
  )
}
function V3(e) {
  let t,
    i,
    o,
    s,
    a,
    c = e[2]('events.version') + '',
    h,
    f,
    p,
    g = e[2]('events.type') + '',
    b,
    v,
    w,
    $ = e[2]('events.amount') + '',
    x,
    S,
    L,
    N = e[2]('events.sender') + '',
    B,
    F,
    R,
    V = e[2]('events.receiver') + '',
    G,
    j,
    Y,
    z,
    W = Object.keys(e[1]).length > 1,
    te,
    K = Pt(e[1][e[0]]),
    ee = []
  for (let Z = 0; Z < K.length; Z += 1) ee[Z] = Eh(xh(e, K, Z))
  let ne = W && Sh(e)
  return {
    c() {
      ;(t = m('main')),
        (i = m('table')),
        (o = m('thead')),
        (s = m('tr')),
        (a = m('th')),
        (h = T(c)),
        (f = E()),
        (p = m('th')),
        (b = T(g)),
        (v = E()),
        (w = m('th')),
        (x = T($)),
        (S = E()),
        (L = m('th')),
        (B = T(N)),
        (F = E()),
        (R = m('th')),
        (G = T(V)),
        (j = E()),
        (Y = m('tbody'))
      for (let Z = 0; Z < ee.length; Z += 1) ee[Z].c()
      ;(z = E()),
        ne && ne.c(),
        y(a, 'class', 'uk-text-right'),
        y(p, 'class', 'uk-text-center'),
        Bt(p, 'width', '98px'),
        y(w, 'class', 'uk-text-right'),
        y(L, 'class', 'uk-text-center'),
        y(R, 'class', 'uk-text-center'),
        y(i, 'class', 'uk-table uk-table-divider')
    },
    m(Z, I) {
      M(Z, t, I),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, a),
        u(a, h),
        u(s, f),
        u(s, p),
        u(p, b),
        u(s, v),
        u(s, w),
        u(w, x),
        u(s, S),
        u(s, L),
        u(L, B),
        u(s, F),
        u(s, R),
        u(R, G),
        u(i, j),
        u(i, Y)
      for (let Q = 0; Q < ee.length; Q += 1) ee[Q] && ee[Q].m(Y, null)
      u(t, z), ne && ne.m(t, null), (te = !0)
    },
    p(Z, I) {
      if (
        ((!te || I[0] & 4) && c !== (c = Z[2]('events.version') + '') && O(h, c),
        (!te || I[0] & 4) && g !== (g = Z[2]('events.type') + '') && O(b, g),
        (!te || I[0] & 4) && $ !== ($ = Z[2]('events.amount') + '') && O(x, $),
        (!te || I[0] & 4) && N !== (N = Z[2]('events.sender') + '') && O(B, N),
        (!te || I[0] & 4) && V !== (V = Z[2]('events.receiver') + '') && O(G, V),
        I[0] & 35)
      ) {
        K = Pt(Z[1][Z[0]])
        let Q
        for (Q = 0; Q < K.length; Q += 1) {
          const ie = xh(Z, K, Q)
          ee[Q] ? ee[Q].p(ie, I) : ((ee[Q] = Eh(ie)), ee[Q].c(), ee[Q].m(Y, null))
        }
        for (; Q < ee.length; Q += 1) ee[Q].d(1)
        ee.length = K.length
      }
      I[0] & 2 && (W = Object.keys(Z[1]).length > 1),
        W
          ? ne
            ? (ne.p(Z, I), I[0] & 2 && D(ne, 1))
            : ((ne = Sh(Z)), ne.c(), D(ne, 1), ne.m(t, null))
          : ne &&
            (qe(),
            U(ne, 1, 1, () => {
              ne = null
            }),
            Ye())
    },
    i(Z) {
      te || (D(ne), (te = !0))
    },
    o(Z) {
      U(ne), (te = !1)
    },
    d(Z) {
      Z && A(t), $n(ee, Z), ne && ne.d()
    },
  }
}
const G3 = 5
function j3(e, t) {
  let i = {},
    o = 1
  for (let s = 0; s < e.length; s = s + t) {
    let a = e.slice(s, s + t)
    ;(i[o] = a), o++
  }
  return i
}
function q3(e, t, i) {
  let o, s
  ae(e, De, (K) => i(2, (s = K)))
  let { events: a } = t
  const c = { receivedpayment: s('events.received_payment'), sentpayment: s('events.sent_payment') }
  let h = 1
  function f() {
    h > 1 && i(0, (h = h - 1))
  }
  function p() {
    h < Object.keys(o).length && i(0, (h = h + 1))
  }
  function g(K) {
    return c[K] || K
  }
  function b(K) {
    ;(h = K), i(0, h)
  }
  function v(K) {
    ;(h = K), i(0, h)
  }
  function w(K) {
    ;(h = K), i(0, h)
  }
  function $(K) {
    ;(h = K), i(0, h)
  }
  function x(K) {
    ;(h = K), i(0, h)
  }
  function S(K) {
    ;(h = K), i(0, h)
  }
  function L(K) {
    ;(h = K), i(0, h)
  }
  function N(K) {
    ;(h = K), i(0, h)
  }
  function B(K) {
    ;(h = K), i(0, h)
  }
  function F(K) {
    ;(h = K), i(0, h)
  }
  function R(K) {
    ;(h = K), i(0, h)
  }
  function V(K) {
    ;(h = K), i(0, h)
  }
  function G(K) {
    ;(h = K), i(0, h)
  }
  function j(K) {
    ;(h = K), i(0, h)
  }
  function Y(K) {
    ;(h = K), i(0, h)
  }
  function z(K) {
    ;(h = K), i(0, h)
  }
  function W(K) {
    ;(h = K), i(0, h)
  }
  function te(K) {
    ;(h = K), i(0, h)
  }
  return (
    (e.$$set = (K) => {
      'events' in K && i(6, (a = K.events))
    }),
    (e.$$.update = () => {
      e.$$.dirty[0] & 64 && i(1, (o = j3(a, G3)))
    }),
    [h, o, s, f, p, g, a, b, v, w, $, x, S, L, N, B, F, R, V, G, j, Y, z, W, te]
  )
}
class Y3 extends we {
  constructor(t) {
    super(), ye(this, t, q3, V3, ge, { events: 6 }, null, [-1, -1])
  }
}
function Lh(e, t, i) {
  const o = e.slice()
  return (o[3] = t[i]), o
}
function Ah(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S
  return {
    c() {
      ;(t = m('tr')),
        (i = m('td')),
        (o = m('span')),
        (o.textContent = ''.concat(e[3].version)),
        (s = E()),
        (a = m('td')),
        (c = m('span')),
        (c.textContent = ''.concat(e[3].type)),
        (h = E()),
        (f = m('td')),
        (p = m('span')),
        (p.textContent = ''.concat(e[3].amount)),
        (g = E()),
        (b = m('td')),
        (v = m('span')),
        (v.textContent = ''.concat(e[3].sender)),
        (w = E()),
        ($ = m('td')),
        (x = m('span')),
        (x.textContent = ''.concat(e[3].receiver)),
        (S = E()),
        y(o, 'class', 'dummy-container svelte-3f6k9s'),
        y(i, 'class', 'uk-text-right'),
        y(c, 'class', 'dummy-container svelte-3f6k9s'),
        y(a, 'class', 'uk-text-center'),
        y(p, 'class', 'dummy-container svelte-3f6k9s'),
        y(f, 'class', 'uk-text-right'),
        y(v, 'class', 'dummy-container svelte-3f6k9s'),
        y(b, 'class', 'uk-text-center'),
        y(x, 'class', 'dummy-container svelte-3f6k9s'),
        y($, 'class', 'uk-text-center')
    },
    m(L, N) {
      M(L, t, N),
        u(t, i),
        u(i, o),
        u(t, s),
        u(t, a),
        u(a, c),
        u(t, h),
        u(t, f),
        u(f, p),
        u(t, g),
        u(t, b),
        u(b, v),
        u(t, w),
        u(t, $),
        u($, x),
        u(t, S)
    },
    p: ce,
    d(L) {
      L && A(t)
    },
  }
}
function K3(e) {
  let t,
    i,
    o,
    s,
    a,
    c,
    h = e[0]('events.version') + '',
    f,
    p,
    g,
    b,
    v = e[0]('events.type') + '',
    w,
    $,
    x,
    S,
    L = e[0]('events.amount') + '',
    N,
    B,
    F,
    R,
    V = e[0]('events.sender') + '',
    G,
    j,
    Y,
    z,
    W = e[0]('events.receiver') + '',
    te,
    K,
    ee,
    ne = Pt(e[1]),
    Z = []
  for (let I = 0; I < ne.length; I += 1) Z[I] = Ah(Lh(e, ne, I))
  return {
    c() {
      ;(t = m('main')),
        (i = m('table')),
        (o = m('thead')),
        (s = m('tr')),
        (a = m('th')),
        (c = m('span')),
        (f = T(h)),
        (p = E()),
        (g = m('th')),
        (b = m('span')),
        (w = T(v)),
        ($ = E()),
        (x = m('th')),
        (S = m('span')),
        (N = T(L)),
        (B = E()),
        (F = m('th')),
        (R = m('span')),
        (G = T(V)),
        (j = E()),
        (Y = m('th')),
        (z = m('span')),
        (te = T(W)),
        (K = E()),
        (ee = m('tbody'))
      for (let I = 0; I < Z.length; I += 1) Z[I].c()
      y(c, 'class', 'dummy-container svelte-3f6k9s'),
        y(a, 'class', 'uk-text-right'),
        y(b, 'class', 'dummy-container svelte-3f6k9s'),
        y(g, 'class', 'uk-text-center'),
        y(S, 'class', 'dummy-container svelte-3f6k9s'),
        y(x, 'class', 'uk-text-right'),
        y(R, 'class', 'dummy-container svelte-3f6k9s'),
        y(F, 'class', 'uk-text-center'),
        y(z, 'class', 'dummy-container svelte-3f6k9s'),
        y(Y, 'class', 'uk-text-center'),
        y(i, 'class', 'uk-table uk-table-divider')
    },
    m(I, Q) {
      M(I, t, Q),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, a),
        u(a, c),
        u(c, f),
        u(s, p),
        u(s, g),
        u(g, b),
        u(b, w),
        u(s, $),
        u(s, x),
        u(x, S),
        u(S, N),
        u(s, B),
        u(s, F),
        u(F, R),
        u(R, G),
        u(s, j),
        u(s, Y),
        u(Y, z),
        u(z, te),
        u(i, K),
        u(i, ee)
      for (let ie = 0; ie < Z.length; ie += 1) Z[ie] && Z[ie].m(ee, null)
    },
    p(I, [Q]) {
      if (
        (Q & 1 && h !== (h = I[0]('events.version') + '') && O(f, h),
        Q & 1 && v !== (v = I[0]('events.type') + '') && O(w, v),
        Q & 1 && L !== (L = I[0]('events.amount') + '') && O(N, L),
        Q & 1 && V !== (V = I[0]('events.sender') + '') && O(G, V),
        Q & 1 && W !== (W = I[0]('events.receiver') + '') && O(te, W),
        Q & 2)
      ) {
        ne = Pt(I[1])
        let ie
        for (ie = 0; ie < ne.length; ie += 1) {
          const ue = Lh(I, ne, ie)
          Z[ie] ? Z[ie].p(ue, Q) : ((Z[ie] = Ah(ue)), Z[ie].c(), Z[ie].m(ee, null))
        }
        for (; ie < Z.length; ie += 1) Z[ie].d(1)
        Z.length = ne.length
      }
    },
    i: ce,
    o: ce,
    d(I) {
      I && A(t), $n(Z, I)
    },
  }
}
function Z3(e, t, i) {
  let o
  ae(e, De, (c) => i(0, (o = c)))
  let s = o('events.received_payment')
  return [
    o,
    [
      {
        version: 99999999,
        type: s,
        amount: '000.00',
        sender: '00000000000000000000000000000000',
        receiver: '00000000000000000000000000000000',
      },
      {
        version: 99999999,
        type: s,
        amount: '000.00',
        sender: '00000000000000000000000000000000',
        receiver: '00000000000000000000000000000000',
      },
      {
        version: 99999999,
        type: s,
        amount: '000.00',
        sender: '00000000000000000000000000000000',
        receiver: '00000000000000000000000000000000',
      },
      {
        version: 99999999,
        type: s,
        amount: '000.00',
        sender: '00000000000000000000000000000000',
        receiver: '00000000000000000000000000000000',
      },
      {
        version: 99999999,
        type: s,
        amount: '000.00',
        sender: '00000000000000000000000000000000',
        receiver: '00000000000000000000000000000000',
      },
    ],
  ]
}
class X3 extends we {
  constructor(t) {
    super(), ye(this, t, Z3, K3, ge, {})
  }
}
function J3(e) {
  let t,
    i,
    o,
    s = e[1]('events.loading.error') + '',
    a,
    c,
    h,
    f,
    p
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('h3')),
        (a = T(s)),
        (c = E()),
        (h = m('div')),
        (f = m('p')),
        (p = T(e[0])),
        y(o, 'class', 'uk-card-title uk-text-uppercase uk-text-muted'),
        y(i, 'class', 'uk-card uk-card-default uk-card-hover uk-card-body uk-text-muted')
    },
    m(g, b) {
      M(g, t, b), u(t, i), u(i, o), u(o, a), u(i, c), u(i, h), u(h, f), u(f, p)
    },
    p(g, [b]) {
      b & 2 && s !== (s = g[1]('events.loading.error') + '') && O(a, s), b & 1 && O(p, g[0])
    },
    i: ce,
    o: ce,
    d(g) {
      g && A(t)
    },
  }
}
function Q3(e, t, i) {
  let o
  ae(e, De, (a) => i(1, (o = a)))
  let { loadingError: s } = t
  return (
    (e.$$set = (a) => {
      'loadingError' in a && i(0, (s = a.loadingError))
    }),
    [s, o]
  )
}
class e4 extends we {
  constructor(t) {
    super(), ye(this, t, Q3, J3, ge, { loadingError: 0 })
  }
}
function t4(e) {
  let t, i
  return (
    (t = new Y3({ props: { events: e[0] } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 1 && (a.events = o[0]), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function n4(e) {
  let t, i, o, s
  return (
    (o = new X3({})),
    {
      c() {
        ;(t = m('span')),
          (i = E()),
          re(o.$$.fragment),
          y(t, 'uk-spinner', ''),
          Bt(t, 'position', 'absolute'),
          Bt(t, 'top', '0px'),
          Bt(t, 'left', '0px')
      },
      m(a, c) {
        M(a, t, c), M(a, i, c), oe(o, a, c), (s = !0)
      },
      p: ce,
      i(a) {
        s || (D(o.$$.fragment, a), (s = !0))
      },
      o(a) {
        U(o.$$.fragment, a), (s = !1)
      },
      d(a) {
        a && (A(t), A(i)), se(o, a)
      },
    }
  )
}
function i4(e) {
  let t, i
  return (
    (t = new e4({ props: { loadingError: e[1] } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 2 && (a.loadingError = o[1]), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function o4(e) {
  let t,
    i,
    o,
    s,
    a = e[2]('events.account_events') + '',
    c,
    h,
    f,
    p,
    g
  const b = [i4, n4, t4],
    v = []
  function w($, x) {
    return $[1] ? 0 : $[0] == null ? 1 : 2
  }
  return (
    (f = w(e)),
    (p = v[f] = b[f](e)),
    {
      c() {
        ;(t = m('main')),
          (i = m('div')),
          (o = m('div')),
          (s = m('h2')),
          (c = T(a)),
          (h = E()),
          p.c(),
          y(s, 'class', 'uk-text-light uk-text-muted uk-text-uppercase'),
          y(o, 'class', 'uk-flex uk-flex-center'),
          Bt(i, 'position', 'relative')
      },
      m($, x) {
        M($, t, x), u(t, i), u(i, o), u(o, s), u(s, c), u(i, h), v[f].m(i, null), (g = !0)
      },
      p($, [x]) {
        ;(!g || x & 4) && a !== (a = $[2]('events.account_events') + '') && O(c, a)
        let S = f
        ;(f = w($)),
          f === S
            ? v[f].p($, x)
            : (qe(),
              U(v[S], 1, 1, () => {
                v[S] = null
              }),
              Ye(),
              (p = v[f]),
              p ? p.p($, x) : ((p = v[f] = b[f]($)), p.c()),
              D(p, 1),
              p.m(i, null))
      },
      i($) {
        g || (D(p), (g = !0))
      },
      o($) {
        U(p), (g = !1)
      },
      d($) {
        $ && A(t), v[f].d()
      },
    }
  )
}
function s4(e, t, i) {
  let o
  ae(e, De, (g) => i(2, (o = g)))
  let s = null,
    a = null,
    c,
    h,
    f = null
  const p = {
    corrupted_db: o('events.loading.corrupted_db'),
    account_not_on_chain: o('events.loading.account_off_chain'),
  }
  return (
    wt(async () => {
      c = It.subscribe((g) => {
        ;(a && a.account == g.account) ||
          (i(1, (f = null)),
          (a = g),
          ly(a, (b) => i(1, (f = p[b] || b))),
          (h = jv.subscribe((b) => {
            i(0, (s = b[a.account]))
          })))
      })
    }),
    Ut(async () => {
      c && c(), h && h()
    }),
    [s, f, o]
  )
}
class r4 extends we {
  constructor(t) {
    super(), ye(this, t, s4, o4, ge, {})
  }
}
var a4 = {}
Mo(a4, { checkUpdate: () => Bd, installUpdate: () => Od, onUpdaterEvent: () => Ws })
async function Ws(e) {
  return Ai('tauri://update-status', (t) => {
    e(t == null ? void 0 : t.payload)
  })
}
async function Od() {
  let e
  function t() {
    e && e(), (e = void 0)
  }
  return new Promise((i, o) => {
    function s(a) {
      if (a.error) {
        t(), o(a.error)
        return
      }
      a.status === 'DONE' && (t(), i())
    }
    Ws(s)
      .then((a) => {
        e = a
      })
      .catch((a) => {
        throw (t(), a)
      }),
      $a('tauri://update-install').catch((a) => {
        throw (t(), a)
      })
  })
}
async function Bd() {
  let e
  function t() {
    e && e(), (e = void 0)
  }
  return new Promise((i, o) => {
    function s(c) {
      t(), i({ manifest: c, shouldUpdate: !0 })
    }
    function a(c) {
      if (c.error) {
        t(), o(c.error)
        return
      }
      c.status === 'UPTODATE' && (t(), i({ shouldUpdate: !1 }))
    }
    nf('tauri://update-available', (c) => {
      s(c == null ? void 0 : c.payload)
    }).catch((c) => {
      throw (t(), c)
    }),
      Ws(a)
        .then((c) => {
          e = c
        })
        .catch((c) => {
          throw (t(), c)
        }),
      $a('tauri://update').catch((c) => {
        throw (t(), c)
      })
  })
}
var l4 = {}
Mo(l4, { exit: () => c4, relaunch: () => Dd })
async function c4(e = 0) {
  return Te({ __tauriModule: 'Process', message: { cmd: 'exit', exitCode: e } })
}
async function Dd() {
  return Te({ __tauriModule: 'Process', message: { cmd: 'relaunch' } })
}
const dn = Ie({ refreshing: !1 }),
  Rd = async () => {
    dn.set({ refreshing: !0 })
    try {
      const { shouldUpdate: e, manifest: t } = await Bd(),
        i = je(dn)
      e
        ? ((i.msg = 'upgrade is available'),
          (i.manifest = t),
          dn.set(i),
          console.log(
            'Installing update '
              .concat(t == null ? void 0 : t.version, ', ')
              .concat(t == null ? void 0 : t.date, ', ')
              .concat(t == null ? void 0 : t.body),
          ),
          (i.msg = 'attempting install'),
          dn.set(i),
          await Od(),
          (i.msg = 'attempting relaunch'),
          dn.set(i),
          await Dd(),
          (i.refreshing = !1))
        : ((i.msg = 'You are on the latest version'), (i.refreshing = !1)),
        dn.set(i)
    } catch (e) {
      dn.update((t) => ((t.error = e), (t.msg = u4(e).toString()), (t.refreshing = !1), t))
    }
  },
  u4 = (e) => {
    let t = 0
    return (
      e.includes('UnexpectedKeyId')
        ? (t = 'The key ID does not match')
        : e.includes('missing')
          ? (t = 'The update URL is not providing a valid JSON')
          : e.includes('InvalidSignature') &&
            (t = "The update's code signature does not match the pubkey provided"),
      t
    )
  }
function h4(e) {
  let t = e[0]('about.upgrade_available') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 1 && t !== (t = o[0]('about.upgrade_available') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function f4(e) {
  let t = e[0]('about.upgrade_uptodate') + '',
    i
  return {
    c() {
      i = T(t)
    },
    m(o, s) {
      M(o, i, s)
    },
    p(o, s) {
      s & 1 && t !== (t = o[0]('about.upgrade_uptodate') + '') && O(i, t)
    },
    d(o) {
      o && A(i)
    },
  }
}
function d4(e) {
  let t,
    i,
    o,
    s,
    a,
    c = e[0]('about.upgrade_checkagain') + '',
    h,
    f,
    p
  function g(w, $) {
    return w[2] ? f4 : h4
  }
  let v = g(e)(e)
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('p')),
        v.c(),
        (s = E()),
        (a = m('button')),
        (h = T(c)),
        y(a, 'class', 'uk-button uk-button-default'),
        (a.disabled = e[1]),
        y(t, 'class', 'uk-margin')
    },
    m(w, $) {
      M(w, t, $),
        u(t, i),
        u(i, o),
        v.m(o, null),
        u(i, s),
        u(i, a),
        u(a, h),
        f || ((p = Ee(a, 'click', Rd)), (f = !0))
    },
    p(w, [$]) {
      v.p(w, $), $ & 1 && c !== (c = w[0]('about.upgrade_checkagain') + '') && O(h, c)
    },
    i: ce,
    o: ce,
    d(w) {
      w && A(t), v.d(), (f = !1), p()
    },
  }
}
function p4(e, t, i) {
  var h
  let o, s
  ae(e, dn, (f) => i(3, (o = f))), ae(e, De, (f) => i(0, (s = f)))
  let a = (h = o.refreshing) != null ? h : !1,
    c = o.status == 'UPTODATE'
  return [s, a, c]
}
class Hd extends we {
  constructor(t) {
    super(), ye(this, t, p4, d4, ge, {})
  }
}
function Mh(e) {
  let t,
    i,
    o = e[1]('about.commit') + '',
    s,
    a,
    c = e[0].hash + '',
    h
  return {
    c() {
      ;(t = m('p')),
        (i = m('span')),
        (s = T(o)),
        (a = T(': ')),
        (h = T(c)),
        y(i, 'class', 'uk-text-bold'),
        y(t, 'class', 'uk-text-muted')
    },
    m(f, p) {
      M(f, t, p), u(t, i), u(i, s), u(i, a), u(t, h)
    },
    p(f, p) {
      p & 2 && o !== (o = f[1]('about.commit') + '') && O(s, o),
        p & 1 && c !== (c = f[0].hash + '') && O(h, c)
    },
    d(f) {
      f && A(t)
    },
  }
}
function Ph(e) {
  let t,
    i,
    o = e[1]('about.branch') + '',
    s,
    a,
    c = e[0].head + '',
    h
  return {
    c() {
      ;(t = m('p')),
        (i = m('span')),
        (s = T(o)),
        (a = T(': ')),
        (h = T(c)),
        y(i, 'class', 'uk-text-bold'),
        y(t, 'class', 'uk-text-muted')
    },
    m(f, p) {
      M(f, t, p), u(t, i), u(i, s), u(i, a), u(t, h)
    },
    p(f, p) {
      p & 2 && o !== (o = f[1]('about.branch') + '') && O(s, o),
        p & 1 && c !== (c = f[0].head + '') && O(h, c)
    },
    d(f) {
      f && A(t)
    },
  }
}
function m4(e) {
  let t,
    i,
    o,
    s = e[1]('about.about') + '',
    a,
    c,
    h,
    f,
    p,
    g = e[1]('about.release') + '',
    b,
    v,
    w,
    $,
    x = e[1]('about.version') + '',
    S,
    L,
    N,
    B = e[0].version + '',
    F,
    R,
    V,
    G,
    j,
    Y
  V = new Hd({})
  let z = e[0].hash && Mh(e),
    W = e[0].head && Ph(e)
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('h2')),
        (a = T(s)),
        (c = E()),
        (h = m('div')),
        (f = m('div')),
        (p = m('h3')),
        (b = T(g)),
        (v = E()),
        (w = m('p')),
        ($ = m('span')),
        (S = T(x)),
        (L = T(': ')),
        (N = T('v')),
        (F = T(B)),
        (R = E()),
        re(V.$$.fragment),
        (G = E()),
        z && z.c(),
        (j = E()),
        W && W.c(),
        y(o, 'class', 'uk-text-light uk-text-muted uk-text-uppercase'),
        y(i, 'class', 'uk-flex uk-flex-center'),
        y(p, 'class', 'uk-card-title uk-text-muted'),
        y($, 'class', 'uk-text-bold'),
        y(w, 'class', 'uk-text-muted'),
        y(f, 'class', 'uk-card uk-card-default uk-card-body uk-width-1-2@m'),
        y(h, 'class', 'uk-flex uk-flex-center'),
        y(t, 'class', 'uk-height-viewport')
    },
    m(te, K) {
      M(te, t, K),
        u(t, i),
        u(i, o),
        u(o, a),
        u(t, c),
        u(t, h),
        u(h, f),
        u(f, p),
        u(p, b),
        u(f, v),
        u(f, w),
        u(w, $),
        u($, S),
        u($, L),
        u(w, N),
        u(w, F),
        u(w, R),
        oe(V, w, null),
        u(f, G),
        z && z.m(f, null),
        u(f, j),
        W && W.m(f, null),
        (Y = !0)
    },
    p(te, [K]) {
      ;(!Y || K & 2) && s !== (s = te[1]('about.about') + '') && O(a, s),
        (!Y || K & 2) && g !== (g = te[1]('about.release') + '') && O(b, g),
        (!Y || K & 2) && x !== (x = te[1]('about.version') + '') && O(S, x),
        (!Y || K & 1) && B !== (B = te[0].version + '') && O(F, B),
        te[0].hash
          ? z
            ? z.p(te, K)
            : ((z = Mh(te)), z.c(), z.m(f, j))
          : z && (z.d(1), (z = null)),
        te[0].head
          ? W
            ? W.p(te, K)
            : ((W = Ph(te)), W.c(), W.m(f, null))
          : W && (W.d(1), (W = null))
    },
    i(te) {
      Y || (D(V.$$.fragment, te), (Y = !0))
    },
    o(te) {
      U(V.$$.fragment, te), (Y = !1)
    },
    d(te) {
      te && A(t), se(V), z && z.d(), W && W.d()
    },
  }
}
function g4(e, t, i) {
  let o
  ae(e, De, (a) => i(1, (o = a)))
  let s = {}
  return (
    wt(async () => {
      kd(), Ja.subscribe((a) => i(0, (s = a)))
    }),
    [s, o]
  )
}
class _4 extends we {
  constructor(t) {
    super(), ye(this, t, g4, m4, ge, {})
  }
}
function b4(e) {
  let t,
    i,
    o = e[0]('layout.connection_error.dont_worry') + '',
    s,
    a,
    c,
    h = e[0]('layout.connection_error.refresh_instructions') + '',
    f,
    p,
    g,
    b
  return (
    (g = new Pd({})),
    {
      c() {
        ;(t = m('div')),
          (i = m('h4')),
          (s = T(o)),
          (a = E()),
          (c = m('p')),
          (f = T(h)),
          (p = E()),
          re(g.$$.fragment),
          y(t, 'slot', 'body')
      },
      m(v, w) {
        M(v, t, w), u(t, i), u(i, s), u(t, a), u(t, c), u(c, f), u(t, p), oe(g, t, null), (b = !0)
      },
      p(v, w) {
        ;(!b || w & 1) && o !== (o = v[0]('layout.connection_error.dont_worry') + '') && O(s, o),
          (!b || w & 1) &&
            h !== (h = v[0]('layout.connection_error.refresh_instructions') + '') &&
            O(f, h)
      },
      i(v) {
        b || (D(g.$$.fragment, v), (b = !0))
      },
      o(v) {
        U(g.$$.fragment, v), (b = !1)
      },
      d(v) {
        v && A(t), se(g)
      },
    }
  )
}
function v4(e) {
  let t, i, o
  return (
    (i = new Bn({ props: { $$slots: { body: [b4] }, $$scope: { ctx: e } } })),
    {
      c() {
        ;(t = m('main')), re(i.$$.fragment)
      },
      m(s, a) {
        M(s, t, a), oe(i, t, null), (o = !0)
      },
      p(s, [a]) {
        const c = {}
        a & 3 && (c.$$scope = { dirty: a, ctx: s }), i.$set(c)
      },
      i(s) {
        o || (D(i.$$.fragment, s), (o = !0))
      },
      o(s) {
        U(i.$$.fragment, s), (o = !1)
      },
      d(s) {
        s && A(t), se(i)
      },
    }
  )
}
function y4(e, t, i) {
  let o
  return ae(e, De, (s) => i(0, (o = s))), [o]
}
class w4 extends we {
  constructor(t) {
    super(), ye(this, t, y4, v4, ge, {})
  }
}
function Ih(e) {
  let t
  function i(a, c) {
    return a[2] ? $4 : k4
  }
  let o = i(e),
    s = o(e)
  return {
    c() {
      ;(t = m('div')), s.c(), y(t, 'class', 'uk-background-primary uk-light uk-text-center')
    },
    m(a, c) {
      M(a, t, c), s.m(t, null)
    },
    p(a, c) {
      o === (o = i(a)) && s ? s.p(a, c) : (s.d(1), (s = o(a)), s && (s.c(), s.m(t, null)))
    },
    d(a) {
      a && A(t), s.d()
    },
  }
}
function k4(e) {
  let t,
    i = e[3]('layout.not_connected_to_chain') + '',
    o,
    s,
    a,
    c,
    h
  return {
    c() {
      ;(t = m('span')),
        (o = T(i)),
        (s = E()),
        (a = m('button')),
        y(t, 'class', 'uk-text-uppercase'),
        y(a, 'uk-icon', 'icon: settings'),
        y(a, 'class', 'uk-padding')
    },
    m(f, p) {
      M(f, t, p), u(t, o), M(f, s, p), M(f, a, p), c || ((h = Ee(a, 'click', e[4])), (c = !0))
    },
    p(f, p) {
      p & 8 && i !== (i = f[3]('layout.not_connected_to_chain') + '') && O(o, i)
    },
    d(f) {
      f && (A(t), A(s), A(a)), (c = !1), h()
    },
  }
}
function $4(e) {
  let t,
    i = e[3]('layout.attempting_to_connect') + '',
    o,
    s,
    a
  return {
    c() {
      ;(t = m('span')),
        (o = T(i)),
        (s = E()),
        (a = m('div')),
        y(t, 'class', 'uk-text-uppercase'),
        y(a, 'uk-spinner', 'ratio: 0.5'),
        y(a, 'class', 'uk-padding')
    },
    m(c, h) {
      M(c, t, h), u(t, o), M(c, s, h), M(c, a, h)
    },
    p(c, h) {
      h & 8 && i !== (i = c[3]('layout.attempting_to_connect') + '') && O(o, i)
    },
    d(c) {
      c && (A(t), A(s), A(a))
    },
  }
}
function Nh(e) {
  let t, i
  return (
    (t = new w4({})),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function C4(e) {
  let t,
    i,
    o,
    s = !e[1] && Ih(e),
    a = e[0] && Nh()
  return {
    c() {
      ;(t = m('main')), s && s.c(), (i = E()), a && a.c()
    },
    m(c, h) {
      M(c, t, h), s && s.m(t, null), u(t, i), a && a.m(t, null), (o = !0)
    },
    p(c, [h]) {
      c[1] ? s && (s.d(1), (s = null)) : s ? s.p(c, h) : ((s = Ih(c)), s.c(), s.m(t, i)),
        c[0]
          ? a
            ? h & 1 && D(a, 1)
            : ((a = Nh()), a.c(), D(a, 1), a.m(t, null))
          : a &&
            (qe(),
            U(a, 1, 1, () => {
              a = null
            }),
            Ye())
    },
    i(c) {
      o || (D(a), (o = !0))
    },
    o(c) {
      U(a), (o = !1)
    },
    d(c) {
      c && A(t), s && s.d(), a && a.d()
    },
  }
}
function x4(e, t, i) {
  let o, s, a
  ae(e, ai, (f) => i(1, (o = f))), ae(e, Ps, (f) => i(2, (s = f))), ae(e, De, (f) => i(3, (a = f)))
  let c = !1
  return [
    c,
    o,
    s,
    a,
    () => {
      i(0, (c = !c))
    },
  ]
}
class E4 extends we {
  constructor(t) {
    super(), ye(this, t, x4, C4, ge, {})
  }
}
function Oh(e) {
  let t, i
  return (
    (t = new Bn({ props: { $$slots: { body: [T4], title: [S4] }, $$scope: { ctx: e } } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 14 && (a.$$scope = { dirty: s, ctx: o }), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function S4(e) {
  let t,
    i = e[2]('layout.recovery_mode.title') + '',
    o
  return {
    c() {
      ;(t = m('span')), (o = T(i)), y(t, 'slot', 'title')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 4 && i !== (i = s[2]('layout.recovery_mode.title') + '') && O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function T4(e) {
  let t,
    i =
      e[2]('layout.recovery_mode.body', {
        values: { epoch_recovery_ends: e[1], epoch_recovery_ends_after: e[1] + 1 },
      }) + '',
    o
  return {
    c() {
      ;(t = m('div')), (o = T(i)), y(t, 'slot', 'body')
    },
    m(s, a) {
      M(s, t, a), u(t, o)
    },
    p(s, a) {
      a & 6 &&
        i !==
          (i =
            s[2]('layout.recovery_mode.body', {
              values: { epoch_recovery_ends: s[1], epoch_recovery_ends_after: s[1] + 1 },
            }) + '') &&
        O(o, i)
    },
    d(s) {
      s && A(t)
    },
  }
}
function L4(e) {
  let t,
    i,
    o = e[0] && Oh(e)
  return {
    c() {
      ;(t = m('main')), o && o.c()
    },
    m(s, a) {
      M(s, t, a), o && o.m(t, null), (i = !0)
    },
    p(s, [a]) {
      s[0]
        ? o
          ? (o.p(s, a), a & 1 && D(o, 1))
          : ((o = Oh(s)), o.c(), D(o, 1), o.m(t, null))
        : o &&
          (qe(),
          U(o, 1, 1, () => {
            o = null
          }),
          Ye())
    },
    i(s) {
      i || (D(o), (i = !0))
    },
    o(s) {
      U(o), (i = !1)
    },
    d(s) {
      s && A(t), o && o.d()
    },
  }
}
function A4(e, t, i) {
  let o
  ae(e, De, (c) => i(2, (o = c)))
  let s = !1,
    a = null
  return (
    Ke('get_recovery_mode', {})
      .then((c) => {
        c > 0 && (i(0, (s = !0)), i(1, (a = c)))
      })
      .catch((c) => {
        Ze(c, !0, 'get_recovery_mode')
      }),
    [s, a, o]
  )
}
class M4 extends we {
  constructor(t) {
    super(), ye(this, t, A4, L4, ge, {})
  }
}
function Bh(e, t, i) {
  const o = e.slice()
  return (o[8] = t[i]), o
}
function P4(e) {
  let t
  return {
    c() {
      ;(t = m('span')),
        y(t, 'uk-spinner', ''),
        Bt(t, 'position', 'absolute'),
        Bt(t, 'top', '0px'),
        Bt(t, 'left', '0px')
    },
    m(i, o) {
      M(i, t, o)
    },
    p: ce,
    d(i) {
      i && A(t)
    },
  }
}
function I4(e) {
  let t,
    i,
    o,
    s,
    a = e[4]('make_whole.table.account') + '',
    c,
    h,
    f,
    p = e[4]('make_whole.table.amount') + '',
    g,
    b,
    v,
    w = e[4]('make_whole.table.claim') + '',
    $,
    x,
    S,
    L = Pt(e[0]),
    N = []
  for (let B = 0; B < L.length; B += 1) N[B] = Dh(Bh(e, L, B))
  return {
    c() {
      ;(t = m('table')),
        (i = m('thead')),
        (o = m('tr')),
        (s = m('th')),
        (c = T(a)),
        (h = E()),
        (f = m('th')),
        (g = T(p)),
        (b = E()),
        (v = m('th')),
        ($ = T(w)),
        (x = E()),
        (S = m('tbody'))
      for (let B = 0; B < N.length; B += 1) N[B].c()
      y(s, 'class', 'uk-text-left'),
        y(f, 'class', 'uk-text-right'),
        y(v, 'class', 'uk-text-center'),
        y(t, 'class', 'uk-table uk-table-divider')
    },
    m(B, F) {
      M(B, t, F),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, c),
        u(o, h),
        u(o, f),
        u(f, g),
        u(o, b),
        u(o, v),
        u(v, $),
        u(t, x),
        u(t, S)
      for (let R = 0; R < N.length; R += 1) N[R] && N[R].m(S, null)
    },
    p(B, F) {
      if (
        (F & 16 && a !== (a = B[4]('make_whole.table.account') + '') && O(c, a),
        F & 16 && p !== (p = B[4]('make_whole.table.amount') + '') && O(g, p),
        F & 16 && w !== (w = B[4]('make_whole.table.claim') + '') && O($, w),
        F & 51)
      ) {
        L = Pt(B[0])
        let R
        for (R = 0; R < L.length; R += 1) {
          const V = Bh(B, L, R)
          N[R] ? N[R].p(V, F) : ((N[R] = Dh(V)), N[R].c(), N[R].m(S, null))
        }
        for (; R < N.length; R += 1) N[R].d(1)
        N.length = L.length
      }
    },
    d(B) {
      B && A(t), $n(N, B)
    },
  }
}
function N4(e) {
  let t,
    i = (e[1] ? e[4]('make_whole.claim_btn.await') : e[4]('make_whole.claim_btn.claim')) + '',
    o,
    s,
    a
  function c() {
    return e[6](e[8])
  }
  return {
    c() {
      ;(t = m('button')),
        (o = T(i)),
        (t.disabled = e[1]),
        Bt(t, 'width', '180px'),
        y(t, 'class', 'uk-button uk-button-primary')
    },
    m(h, f) {
      M(h, t, f), u(t, o), s || ((a = Ee(t, 'click', c)), (s = !0))
    },
    p(h, f) {
      ;(e = h),
        f & 18 &&
          i !==
            (i =
              (e[1] ? e[4]('make_whole.claim_btn.await') : e[4]('make_whole.claim_btn.claim')) +
              '') &&
          O(o, i),
        f & 2 && (t.disabled = e[1])
    },
    d(h) {
      h && A(t), (s = !1), a()
    },
  }
}
function O4(e) {
  let t
  return {
    c() {
      ;(t = m('span')),
        y(t, 'class', 'uk-text-success'),
        y(t, 'uk-icon', 'icon: check; ratio: 1; color: green')
    },
    m(i, o) {
      M(i, t, o)
    },
    p: ce,
    d(i) {
      i && A(t)
    },
  }
}
function Dh(e) {
  let t,
    i,
    o = e[8].account + '',
    s,
    a,
    c,
    h = sn(e[8].coins.value) + '',
    f,
    p,
    g,
    b
  function v(x, S) {
    return x[8].claimed ? O4 : N4
  }
  let w = v(e),
    $ = w(e)
  return {
    c() {
      ;(t = m('tr')),
        (i = m('td')),
        (s = T(o)),
        (a = E()),
        (c = m('td')),
        (f = T(h)),
        (p = E()),
        (g = m('td')),
        $.c(),
        (b = E()),
        y(i, 'class', 'uk-text-left'),
        y(c, 'class', 'uk-text-right'),
        y(g, 'class', 'uk-text-center'),
        Bt(g, 'width', '200px')
    },
    m(x, S) {
      M(x, t, S),
        u(t, i),
        u(i, s),
        u(t, a),
        u(t, c),
        u(c, f),
        u(t, p),
        u(t, g),
        $.m(g, null),
        u(t, b)
    },
    p(x, S) {
      S & 1 && o !== (o = x[8].account + '') && O(s, o),
        S & 1 && h !== (h = sn(x[8].coins.value) + '') && O(f, h),
        w === (w = v(x)) && $ ? $.p(x, S) : ($.d(1), ($ = w(x)), $ && ($.c(), $.m(g, null)))
    },
    d(x) {
      x && A(t), $.d()
    },
  }
}
function B4(e) {
  let t,
    i,
    o,
    s,
    a,
    c,
    h,
    f = e[4]('make_whole.modal_success.title') + '',
    p,
    g,
    b,
    v =
      e[4]('make_whole.modal_success.amount_for_account', {
        values: { coins: e[2] && sn(e[2].coins.value), account: e[2] ? e[2].account : '' },
      }) + '',
    w,
    $,
    x = e[4]('make_whole.modal_success.check_balance') + '',
    S,
    L,
    N,
    B,
    F = e[4]('make_whole.modal_success.ok_btn') + '',
    R,
    V,
    G,
    j,
    Y,
    z,
    W = e[4]('make_whole.modal_error.title') + '',
    te,
    K,
    ee,
    ne,
    Z,
    I,
    Q,
    ie = e[4]('make_whole.modal_error.ok_btn') + '',
    ue,
    le,
    _e,
    Ce,
    xe,
    Me = e[4]('make_whole.card.title') + '',
    ke,
    be,
    $e,
    me = e[4]('make_whole.card.body') + '',
    de,
    Be,
    Le
  function tt(Ve, Ge) {
    return Ve[0] ? I4 : P4
  }
  let dt = tt(e),
    pt = dt(e)
  return {
    c() {
      ;(t = m('main')),
        (i = m('div')),
        (o = m('div')),
        (s = m('div')),
        (a = m('h2')),
        (a.innerHTML =
          '<span class="success-icon svelte-tssuth" uk-icon="icon: check; ratio: 2"></span>'),
        (c = E()),
        (h = m('p')),
        (p = T(f)),
        (g = E()),
        (b = new Xr(!1)),
        (w = E()),
        ($ = m('p')),
        (S = T(x)),
        (L = E()),
        (N = m('p')),
        (B = m('button')),
        (R = T(F)),
        (V = E()),
        (G = m('div')),
        (j = m('div')),
        (Y = m('div')),
        (z = m('h2')),
        (te = T(W)),
        (K = E()),
        (ee = m('p')),
        (ne = T(e[3])),
        (Z = E()),
        (I = m('p')),
        (Q = m('button')),
        (ue = T(ie)),
        (le = E()),
        (_e = m('div')),
        (Ce = m('div')),
        (xe = m('h3')),
        (ke = T(Me)),
        (be = E()),
        ($e = new Xr(!1)),
        (de = E()),
        (Be = m('div')),
        (Le = E()),
        pt.c(),
        y(a, 'class', 'uk-modal-title'),
        y(h, 'class', 'uk-text-small'),
        (b.a = w),
        y(s, 'class', 'uk-section'),
        y(B, 'class', 'uk-button uk-button-large uk-button-primary uk-margin-right uk-modal-close'),
        y(B, 'type', 'button'),
        y(N, 'class', 'uk-text-center'),
        y(o, 'class', 'uk-modal-dialog uk-modal-body uk-text-center'),
        Bt(o, 'background-image', "url('/images/confetti.gif')"),
        y(i, 'id', 'claimedWithSuccess'),
        y(i, 'uk-modal', ''),
        y(z, 'class', 'uk-modal-title'),
        y(Y, 'class', 'uk-section'),
        y(Q, 'class', 'uk-button uk-button-large uk-button-primary uk-margin-right uk-modal-close'),
        y(Q, 'type', 'button'),
        y(I, 'class', 'uk-text-center'),
        y(j, 'class', 'uk-modal-dialog uk-modal-body uk-text-center'),
        y(G, 'id', 'claimError'),
        y(G, 'uk-modal', ''),
        y(xe, 'class', 'uk-card-title uk-text-muted uk-text-uppercase'),
        ($e.a = null),
        y(Ce, 'class', 'uk-card uk-card-default uk-card-body'),
        y(_e, 'class', 'uk-container')
    },
    m(Ve, Ge) {
      M(Ve, t, Ge),
        u(t, i),
        u(i, o),
        u(o, s),
        u(s, a),
        u(s, c),
        u(s, h),
        u(h, p),
        u(s, g),
        b.m(v, s),
        u(s, w),
        u(s, $),
        u($, S),
        u(o, L),
        u(o, N),
        u(N, B),
        u(B, R),
        u(t, V),
        u(t, G),
        u(G, j),
        u(j, Y),
        u(Y, z),
        u(z, te),
        u(Y, K),
        u(Y, ee),
        u(ee, ne),
        u(j, Z),
        u(j, I),
        u(I, Q),
        u(Q, ue),
        u(t, le),
        u(t, _e),
        u(_e, Ce),
        u(Ce, xe),
        u(xe, ke),
        u(Ce, be),
        $e.m(me, Ce),
        u(_e, de),
        u(_e, Be),
        u(_e, Le),
        pt.m(_e, null)
    },
    p(Ve, [Ge]) {
      Ge & 16 && f !== (f = Ve[4]('make_whole.modal_success.title') + '') && O(p, f),
        Ge & 20 &&
          v !==
            (v =
              Ve[4]('make_whole.modal_success.amount_for_account', {
                values: {
                  coins: Ve[2] && sn(Ve[2].coins.value),
                  account: Ve[2] ? Ve[2].account : '',
                },
              }) + '') &&
          b.p(v),
        Ge & 16 && x !== (x = Ve[4]('make_whole.modal_success.check_balance') + '') && O(S, x),
        Ge & 16 && F !== (F = Ve[4]('make_whole.modal_success.ok_btn') + '') && O(R, F),
        Ge & 16 && W !== (W = Ve[4]('make_whole.modal_error.title') + '') && O(te, W),
        Ge & 8 && O(ne, Ve[3]),
        Ge & 16 && ie !== (ie = Ve[4]('make_whole.modal_error.ok_btn') + '') && O(ue, ie),
        Ge & 16 && Me !== (Me = Ve[4]('make_whole.card.title') + '') && O(ke, Me),
        Ge & 16 && me !== (me = Ve[4]('make_whole.card.body') + '') && $e.p(me),
        dt === (dt = tt(Ve)) && pt
          ? pt.p(Ve, Ge)
          : (pt.d(1), (pt = dt(Ve)), pt && (pt.c(), pt.m(_e, null)))
    },
    i: ce,
    o: ce,
    d(Ve) {
      Ve && A(t), pt.d()
    },
  }
}
function D4(e, t, i) {
  let o
  ae(e, De, (b) => i(4, (o = b)))
  let s, a
  wt(async () => {
    a = ma.subscribe((b) => {
      i(0, (s = []))
      for (const v in b)
        b[v].forEach(($) => {
          s.push({ account: v, coins: $.coins, claimed: $.claimed })
        })
    })
  }),
    Ut(async () => {
      a && a()
    })
  let c = !1,
    h = null,
    f = ''
  const p = (b) => {
    i(2, (h = b)), i(1, (c = !0))
    let v = (w) => {
      if ((i(1, (c = !1)), w)) {
        i(3, (f = w)), wn.modal('#claimError').show()
        return
      }
      wn.modal('#claimedWithSuccess').show()
    }
    v.bind({ isProcessing: c }), hy(h.account, v)
  }
  return [s, c, h, f, o, p, (b) => p(b)]
}
class R4 extends we {
  constructor(t) {
    super(), ye(this, t, D4, B4, ge, {})
  }
}
function Rh(e) {
  let t
  return {
    c() {
      ;(t = m('div')),
        (t.innerHTML = '<span uk-spinner="" style="position:absolute; top:0; left:0"></span>'),
        Bt(t, 'position', 'relative')
    },
    m(i, o) {
      M(i, t, o)
    },
    d(i) {
      i && A(t)
    },
  }
}
function H4(e) {
  let t,
    i = e[0] && e[1] && Rh()
  return {
    c() {
      ;(t = m('main')), i && i.c(), y(t, 'class', 'uk-padding')
    },
    m(o, s) {
      M(o, t, s), i && i.m(t, null)
    },
    p(o, [s]) {
      o[0] && o[1] ? i || ((i = Rh()), i.c(), i.m(t, null)) : i && (i.d(1), (i = null))
    },
    i: ce,
    o: ce,
    d(o) {
      o && A(t), i && i.d()
    },
  }
}
function z4(e, t, i) {
  let o, s
  return ae(e, ln, (a) => i(0, (o = a))), ae(e, ai, (a) => i(1, (s = a))), [o, s]
}
class U4 extends we {
  constructor(t) {
    super(), ye(this, t, z4, H4, ge, {})
  }
}
function Hh(e) {
  let t, i
  return (
    (t = new Bn({ props: { $$slots: { body: [F4] }, $$scope: { ctx: e } } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 6 && (a.$$scope = { dirty: s, ctx: o }), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function F4(e) {
  let t,
    i,
    o = e[1]('layout.key_error.title') + '',
    s,
    a,
    c,
    h = e[1]('layout.key_error.body') + '',
    f,
    p,
    g,
    b
  return (
    (g = new Nd({})),
    {
      c() {
        ;(t = m('div')),
          (i = m('h4')),
          (s = T(o)),
          (a = E()),
          (c = m('p')),
          (f = T(h)),
          (p = E()),
          re(g.$$.fragment),
          y(i, 'class', 'uk-text-uppercase'),
          y(t, 'slot', 'body')
      },
      m(v, w) {
        M(v, t, w), u(t, i), u(i, s), u(t, a), u(t, c), u(c, f), u(t, p), oe(g, t, null), (b = !0)
      },
      p(v, w) {
        ;(!b || w & 2) && o !== (o = v[1]('layout.key_error.title') + '') && O(s, o),
          (!b || w & 2) && h !== (h = v[1]('layout.key_error.body') + '') && O(f, h)
      },
      i(v) {
        b || (D(g.$$.fragment, v), (b = !0))
      },
      o(v) {
        U(g.$$.fragment, v), (b = !1)
      },
      d(v) {
        v && A(t), se(g)
      },
    }
  )
}
function W4(e) {
  let t,
    i,
    o = e[0] && Hh(e)
  return {
    c() {
      ;(t = m('main')), o && o.c()
    },
    m(s, a) {
      M(s, t, a), o && o.m(t, null), (i = !0)
    },
    p(s, [a]) {
      s[0]
        ? o
          ? (o.p(s, a), a & 1 && D(o, 1))
          : ((o = Hh(s)), o.c(), D(o, 1), o.m(t, null))
        : o &&
          (qe(),
          U(o, 1, 1, () => {
            o = null
          }),
          Ye())
    },
    i(s) {
      i || (D(o), (i = !0))
    },
    o(s) {
      U(o), (i = !1)
    },
    d(s) {
      s && A(t), o && o.d()
    },
  }
}
function V4(e, t, i) {
  let o, s
  return ae(e, id, (a) => i(0, (o = a))), ae(e, De, (a) => i(1, (s = a))), [o, s]
}
class G4 extends we {
  constructor(t) {
    super(), ye(this, t, V4, W4, ge, {})
  }
}
function zh(e) {
  let t, i
  return (
    (t = new Bn({ props: { $$slots: { body: [K4], title: [Y4] }, $$scope: { ctx: e } } })),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      p(o, s) {
        const a = {}
        s & 11 && (a.$$scope = { dirty: s, ctx: o }), t.$set(a)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function j4(e) {
  let t,
    i = e[0].manifest.version + '',
    o,
    s
  return {
    c() {
      ;(t = m('span')),
        (o = T(i)),
        (s = T(' Update Available')),
        y(t, 'class', 'uk-text-uppercase uk-margin')
    },
    m(a, c) {
      M(a, t, c), u(t, o), u(t, s)
    },
    p(a, c) {
      c & 1 && i !== (i = a[0].manifest.version + '') && O(o, i)
    },
    d(a) {
      a && A(t)
    },
  }
}
function q4(e) {
  let t
  return {
    c() {
      ;(t = m('div')),
        (t.innerHTML =
          '<span class="uk-text-muted">Checking for upgrade</span> <span class="uk-padding" uk-spinner="ratio: 0.66"></span>'),
        y(t, 'class', 'uk-text-center')
    },
    m(i, o) {
      M(i, t, o)
    },
    p: ce,
    d(i) {
      i && A(t)
    },
  }
}
function Y4(e) {
  let t
  function i(a, c) {
    return a[0].refreshing ? q4 : j4
  }
  let o = i(e),
    s = o(e)
  return {
    c() {
      ;(t = m('div')), s.c(), y(t, 'slot', 'title')
    },
    m(a, c) {
      M(a, t, c), s.m(t, null)
    },
    p(a, c) {
      o === (o = i(a)) && s ? s.p(a, c) : (s.d(1), (s = o(a)), s && (s.c(), s.m(t, null)))
    },
    d(a) {
      a && A(t), s.d()
    },
  }
}
function Uh(e) {
  var $, x
  let t,
    i,
    o,
    s,
    a,
    c = (($ = e[0]) == null ? void 0 : $.manifest.body) + '',
    h,
    f,
    p,
    g,
    b,
    v = ((x = e[0]) == null ? void 0 : x.error) && Fh(e),
    w = e[1] && Wh(e)
  return {
    c() {
      ;(t = m('div')),
        (i = m('div')),
        (o = m('h5')),
        (o.textContent = 'Update Notes'),
        (s = E()),
        (a = m('p')),
        (h = T(c)),
        (f = E()),
        v && v.c(),
        (p = E()),
        w && w.c(),
        (g = Tt()),
        y(o, 'class', 'uk-text-uppercase'),
        y(i, 'class', 'uk-margin'),
        y(t, 'class', 'uk-padding uk-flex uk-grid')
    },
    m(S, L) {
      M(S, t, L),
        u(t, i),
        u(i, o),
        u(i, s),
        u(i, a),
        u(a, h),
        u(t, f),
        v && v.m(t, null),
        M(S, p, L),
        w && w.m(S, L),
        M(S, g, L),
        (b = !0)
    },
    p(S, L) {
      var N, B
      ;(!b || L & 1) && c !== (c = ((N = S[0]) == null ? void 0 : N.manifest.body) + '') && O(h, c),
        (B = S[0]) != null && B.error
          ? v
            ? (v.p(S, L), L & 1 && D(v, 1))
            : ((v = Fh(S)), v.c(), D(v, 1), v.m(t, null))
          : v &&
            (qe(),
            U(v, 1, 1, () => {
              v = null
            }),
            Ye()),
        S[1]
          ? w
            ? w.p(S, L)
            : ((w = Wh(S)), w.c(), w.m(g.parentNode, g))
          : w && (w.d(1), (w = null))
    },
    i(S) {
      b || (D(v), (b = !0))
    },
    o(S) {
      U(v), (b = !1)
    },
    d(S) {
      S && (A(t), A(p), A(g)), v && v.d(), w && w.d(S)
    },
  }
}
function Fh(e) {
  var w, $
  let t,
    i,
    o,
    s,
    a = ((w = e[0]) == null ? void 0 : w.error) + '',
    c,
    h,
    f = (($ = e[0]) == null ? void 0 : $.msg) + '',
    p,
    g,
    b,
    v
  return (
    (b = new Hd({})),
    {
      c() {
        ;(t = m('div')),
          (i = m('h5')),
          (i.textContent = 'Update Error'),
          (o = E()),
          (s = m('p')),
          (c = T(a)),
          (h = T(': ')),
          (p = T(f)),
          (g = E()),
          re(b.$$.fragment),
          y(i, 'class', 'uk-text-uppercase'),
          y(t, 'class', 'uk-margin')
      },
      m(x, S) {
        M(x, t, S),
          u(t, i),
          u(t, o),
          u(t, s),
          u(s, c),
          u(s, h),
          u(s, p),
          M(x, g, S),
          oe(b, x, S),
          (v = !0)
      },
      p(x, S) {
        var L, N
        ;(!v || S & 1) && a !== (a = ((L = x[0]) == null ? void 0 : L.error) + '') && O(c, a),
          (!v || S & 1) && f !== (f = ((N = x[0]) == null ? void 0 : N.msg) + '') && O(p, f)
      },
      i(x) {
        v || (D(b.$$.fragment, x), (v = !0))
      },
      o(x) {
        U(b.$$.fragment, x), (v = !1)
      },
      d(x) {
        x && (A(t), A(g)), se(b, x)
      },
    }
  )
}
function Wh(e) {
  var w, $, x
  let t,
    i,
    o = ((w = e[0]) == null ? void 0 : w.msg) + '',
    s,
    a,
    c,
    h = (($ = e[0]) == null ? void 0 : $.error) + '',
    f,
    p,
    g,
    b = JSON.stringify((x = e[0]) == null ? void 0 : x.status) + '',
    v
  return {
    c() {
      ;(t = m('div')),
        (i = m('p')),
        (s = T(o)),
        (a = E()),
        (c = m('p')),
        (f = T(h)),
        (p = E()),
        (g = m('p')),
        (v = T(b))
    },
    m(S, L) {
      M(S, t, L), u(t, i), u(i, s), u(t, a), u(t, c), u(c, f), u(t, p), u(t, g), u(g, v)
    },
    p(S, L) {
      var N, B, F
      L & 1 && o !== (o = ((N = S[0]) == null ? void 0 : N.msg) + '') && O(s, o),
        L & 1 && h !== (h = ((B = S[0]) == null ? void 0 : B.error) + '') && O(f, h),
        L & 1 && b !== (b = JSON.stringify((F = S[0]) == null ? void 0 : F.status) + '') && O(v, b)
    },
    d(S) {
      S && A(t)
    },
  }
}
function K4(e) {
  var s
  let t,
    i,
    o = !((s = e[0]) != null && s.refreshing) && Uh(e)
  return {
    c() {
      ;(t = m('div')), o && o.c(), y(t, 'slot', 'body')
    },
    m(a, c) {
      M(a, t, c), o && o.m(t, null), (i = !0)
    },
    p(a, c) {
      var h
      ;(h = a[0]) != null && h.refreshing
        ? o &&
          (qe(),
          U(o, 1, 1, () => {
            o = null
          }),
          Ye())
        : o
          ? (o.p(a, c), c & 1 && D(o, 1))
          : ((o = Uh(a)), o.c(), D(o, 1), o.m(t, null))
    },
    i(a) {
      i || (D(o), (i = !0))
    },
    o(a) {
      U(o), (i = !1)
    },
    d(a) {
      a && A(t), o && o.d()
    },
  }
}
function Z4(e) {
  var f
  let t,
    i,
    o = JSON.stringify(e[0]) + '',
    s,
    a,
    c,
    h = ((f = e[0]) == null ? void 0 : f.manifest) && zh(e)
  return {
    c() {
      ;(t = m('main')),
        (i = T('Upgrade App\n  ')),
        (s = T(o)),
        (a = E()),
        h && h.c(),
        y(t, 'class', 'uk-padding')
    },
    m(p, g) {
      M(p, t, g), u(t, i), u(t, s), u(t, a), h && h.m(t, null), (c = !0)
    },
    p(p, [g]) {
      var b
      ;(!c || g & 1) && o !== (o = JSON.stringify(p[0]) + '') && O(s, o),
        (b = p[0]) != null && b.manifest
          ? h
            ? (h.p(p, g), g & 1 && D(h, 1))
            : ((h = zh(p)), h.c(), D(h, 1), h.m(t, null))
          : h &&
            (qe(),
            U(h, 1, 1, () => {
              h = null
            }),
            Ye())
    },
    i(p) {
      c || (D(h), (c = !0))
    },
    o(p) {
      U(h), (c = !1)
    },
    d(p) {
      p && A(t), h && h.d()
    },
  }
}
function X4(e, t, i) {
  let o, s
  ae(e, dn, (c) => i(0, (o = c))), ae(e, ri, (c) => i(1, (s = c)))
  let a
  return (
    Ws(({ error: c, status: h }) => {
      dn.update((f) => ((f.error = c != null ? c : null), (f.status = h), f)),
        console.log('onMount Updater event', c, h)
    }),
    Ut(() => {
      a()
    }),
    [o, s]
  )
}
class J4 extends we {
  constructor(t) {
    super(), ye(this, t, X4, Z4, ge, {})
  }
}
function Vh(e) {
  let t, i, o, s, a, c, h, f
  return (
    (t = new E4({})),
    (o = new G4({})),
    (a = new U4({})),
    (h = new M4({})),
    {
      c() {
        re(t.$$.fragment),
          (i = E()),
          re(o.$$.fragment),
          (s = E()),
          re(a.$$.fragment),
          (c = E()),
          re(h.$$.fragment)
      },
      m(p, g) {
        oe(t, p, g),
          M(p, i, g),
          oe(o, p, g),
          M(p, s, g),
          oe(a, p, g),
          M(p, c, g),
          oe(h, p, g),
          (f = !0)
      },
      i(p) {
        f ||
          (D(t.$$.fragment, p),
          D(o.$$.fragment, p),
          D(a.$$.fragment, p),
          D(h.$$.fragment, p),
          (f = !0))
      },
      o(p) {
        U(t.$$.fragment, p), U(o.$$.fragment, p), U(a.$$.fragment, p), U(h.$$.fragment, p), (f = !1)
      },
      d(p) {
        p && (A(i), A(s), A(c)), se(t, p), se(o, p), se(a, p), se(h, p)
      },
    }
  )
}
function Gh(e) {
  let t, i
  return (
    (t = new $d({})),
    {
      c() {
        re(t.$$.fragment)
      },
      m(o, s) {
        oe(t, o, s), (i = !0)
      },
      i(o) {
        i || (D(t.$$.fragment, o), (i = !0))
      },
      o(o) {
        U(t.$$.fragment, o), (i = !1)
      },
      d(o) {
        se(t, o)
      },
    }
  )
}
function Q4(e) {
  let t, i, o, s, a, c, h, f, p, g, b, v, w, $, x, S, L, N, B, F, R, V, G, j, Y
  ;(t = new Ry({})),
    (s = new fn({ props: { path: vt.wallet, component: Tw, primary: !1 } })),
    (c = new fn({ props: { path: vt.accountFromMnem, component: C3, primary: !1 } })),
    (f = new fn({ props: { path: vt.keygen, component: L3, primary: !1 } })),
    (g = new fn({ props: { path: vt.miner, component: xk, primary: !1 } })),
    (v = new fn({ props: { path: vt.transfer, component: D3, primary: !1 } })),
    ($ = new fn({ props: { path: vt.events, component: r4, primary: !1 } })),
    (S = new fn({ props: { path: vt.settings, component: Fk, primary: !1 } })),
    (N = new fn({ props: { path: vt.about, component: _4, primary: !1 } })),
    (F = new fn({ props: { path: vt.makeWhole, component: R4, primary: !1 } })),
    (V = new fn({ props: { path: vt.developer, component: l3, primary: !1 } }))
  let z = e[1] && Gh()
  return {
    c() {
      re(t.$$.fragment),
        (i = E()),
        (o = m('div')),
        re(s.$$.fragment),
        (a = E()),
        re(c.$$.fragment),
        (h = E()),
        re(f.$$.fragment),
        (p = E()),
        re(g.$$.fragment),
        (b = E()),
        re(v.$$.fragment),
        (w = E()),
        re($.$$.fragment),
        (x = E()),
        re(S.$$.fragment),
        (L = E()),
        re(N.$$.fragment),
        (B = E()),
        re(F.$$.fragment),
        (R = E()),
        re(V.$$.fragment),
        (G = E()),
        z && z.c(),
        (j = Tt()),
        y(o, 'class', 'uk-background-muted uk-margin-large')
    },
    m(W, te) {
      oe(t, W, te),
        M(W, i, te),
        M(W, o, te),
        oe(s, o, null),
        u(o, a),
        oe(c, o, null),
        u(o, h),
        oe(f, o, null),
        u(o, p),
        oe(g, o, null),
        u(o, b),
        oe(v, o, null),
        u(o, w),
        oe($, o, null),
        u(o, x),
        oe(S, o, null),
        u(o, L),
        oe(N, o, null),
        u(o, B),
        oe(F, o, null),
        u(o, R),
        oe(V, o, null),
        M(W, G, te),
        z && z.m(W, te),
        M(W, j, te),
        (Y = !0)
    },
    p(W, te) {
      W[1]
        ? z
          ? te & 2 && D(z, 1)
          : ((z = Gh()), z.c(), D(z, 1), z.m(j.parentNode, j))
        : z &&
          (qe(),
          U(z, 1, 1, () => {
            z = null
          }),
          Ye())
    },
    i(W) {
      Y ||
        (D(t.$$.fragment, W),
        D(s.$$.fragment, W),
        D(c.$$.fragment, W),
        D(f.$$.fragment, W),
        D(g.$$.fragment, W),
        D(v.$$.fragment, W),
        D($.$$.fragment, W),
        D(S.$$.fragment, W),
        D(N.$$.fragment, W),
        D(F.$$.fragment, W),
        D(V.$$.fragment, W),
        D(z),
        (Y = !0))
    },
    o(W) {
      U(t.$$.fragment, W),
        U(s.$$.fragment, W),
        U(c.$$.fragment, W),
        U(f.$$.fragment, W),
        U(g.$$.fragment, W),
        U(v.$$.fragment, W),
        U($.$$.fragment, W),
        U(S.$$.fragment, W),
        U(N.$$.fragment, W),
        U(F.$$.fragment, W),
        U(V.$$.fragment, W),
        U(z),
        (Y = !1)
    },
    d(W) {
      W && (A(i), A(o), A(G), A(j)),
        se(t, W),
        se(s),
        se(c),
        se(f),
        se(g),
        se(v),
        se($),
        se(S),
        se(N),
        se(F),
        se(V),
        z && z.d(W)
    },
  }
}
function e7(e) {
  let t, i, o, s, a, c, h, f, p
  ;(i = new mg({})), (s = new J4({}))
  let g = e[0] && Vh()
  return (
    (f = new $f({ props: { $$slots: { default: [Q4] }, $$scope: { ctx: e } } })),
    {
      c() {
        ;(t = m('main')),
          re(i.$$.fragment),
          (o = E()),
          re(s.$$.fragment),
          (a = E()),
          g && g.c(),
          (c = E()),
          (h = m('div')),
          re(f.$$.fragment),
          y(h, 'class', 'uk-container'),
          y(t, 'class', 'uk-background-muted uk-height-viewport')
      },
      m(b, v) {
        M(b, t, v),
          oe(i, t, null),
          u(t, o),
          oe(s, t, null),
          u(t, a),
          g && g.m(t, null),
          u(t, c),
          u(t, h),
          oe(f, h, null),
          (p = !0)
      },
      p(b, [v]) {
        b[0]
          ? g
            ? v & 1 && D(g, 1)
            : ((g = Vh()), g.c(), D(g, 1), g.m(t, c))
          : g &&
            (qe(),
            U(g, 1, 1, () => {
              g = null
            }),
            Ye())
        const w = {}
        v & 66 && (w.$$scope = { dirty: v, ctx: b }), f.$set(w)
      },
      i(b) {
        p || (D(i.$$.fragment, b), D(s.$$.fragment, b), D(g), D(f.$$.fragment, b), (p = !0))
      },
      o(b) {
        U(i.$$.fragment, b), U(s.$$.fragment, b), U(g), U(f.$$.fragment, b), (p = !1)
      },
      d(b) {
        b && A(t), se(i), se(s), g && g.d(), se(f)
      },
    }
  )
}
function t7(e, t, i) {
  let o, s
  ae(e, Gi, (p) => i(0, (o = p))), ae(e, ri, (p) => i(1, (s = p))), qv()
  let a, c, h, f
  return (
    wt(async () => {
      Rd(),
        dy(),
        (a = await Ai('proof-start', (p) => {
          zt.set(p.payload), Oo.set(!0)
        })),
        (c = await Ai('ack-backlog-request', () => {
          tn.set(!0), Ii.set(!1), Pn.set(!0)
        })),
        (h = await Ai('backlog-success', (p) => {
          zt.set(p.payload), tn.set(!1), Ii.set(!0), zs()
        })),
        (f = await Ai('backlog-error', (p) => {
          Ze(p.payload, !0, 'listen(backlog-error)'), tn.set(!1), Ii.set(!1)
        }))
    }),
    Ut(() => {
      a(), c(), h(), f()
    }),
    [o, s]
  )
}
class n7 extends we {
  constructor(t) {
    super(), ye(this, t, t7, e7, ge, {})
  }
}
new n7({ target: document.body })
//# sourceMappingURL=index-d5120c7d.js.map
