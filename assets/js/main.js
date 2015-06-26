/*!
 * VERSION: 1.17.0
 * DATE: 2015-05-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
    var s = function (t) {
      var e, i = [],
          s = t.length;
      for (e = 0; e !== s; i.push(t[e++]));
      return i
    },
        r = function (t, e, s) {
        i.call(this, t, e, s), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
        },
        n = 1e-10,
        a = i._internals,
        o = a.isSelector,
        h = a.isArray,
        l = r.prototype = i.to({}, .1, {}),
        _ = [];
    r.version = "1.17.0", l.constructor = r, l.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.lagSmoothing = i.lagSmoothing, r.ticker = i.ticker, r.render = i.render, l.invalidate = function () {
      return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
    }, l.updateTo = function (t, e) {
      var s, r = this.ratio,
          n = this.vars.immediateRender || t.immediateRender;
      e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
      for (s in t) this.vars[s] = t[s];
      if (this._initted || n) if (e) this._initted = !1, n && this.render(0, !0, !0);
      else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
        var a = this._time;
        this.render(0, !0, !1), this._initted = !1, this.render(a, !0, !1)
      } else if (this._time > 0 || n) {
        this._initted = !1, this._init();
        for (var o, h = 1 / (1 - r), l = this._firstPT; l;) o = l.s + l.c, l.c *= h, l.s = o - l.c, l = l._next
      }
      return this
    }, l.render = function (t, e, i) {
      this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
      var s, r, o, h, l, _, u, c, f = this._dirty ? this.totalDuration() : this._totalDuration,
          p = this._time,
          m = this._totalTime,
          d = this._cycle,
          g = this._duration,
          v = this._rawPrevTime;
      if (t >= f ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = g, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === g && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > v || v === n) && v !== t && (i = !0, v > n && (r = "onReverseComplete")), this._rawPrevTime = c = !e || t || v === t ? t : n)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === g && v > 0) && (r = "onReverseComplete", s = this._reversed), 0 > t && (this._active = !1, 0 === g && (this._initted || !this.vars.lazy || i) && (v >= 0 && (i = !0), this._rawPrevTime = c = !e || t || v === t ? t : n)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (h = g + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 !== (1 & this._cycle) && (this._time = g - this._time), this._time > g ? this._time = g : 0 > this._time && (this._time = 0)), this._easeType ? (l = this._time / g, _ = this._easeType, u = this._easePower, (1 === _ || 3 === _ && l >= .5) && (l = 1 - l), 3 === _ && (l *= 2), 1 === u ? l *= l : 2 === u ? l *= l * l : 3 === u ? l *= l * l * l : 4 === u && (l *= l * l * l * l), this.ratio = 1 === _ ? 1 - l : 2 === _ ? l : .5 > this._time / g ? l / 2 : 1 - l / 2) : this.ratio = this._ease.getRatio(this._time / g)), p === this._time && !i && d === this._cycle) return m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")), void 0;
      if (!this._initted) {
        if (this._init(), !this._initted || this._gc) return;
        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = p, this._totalTime = m, this._rawPrevTime = v, this._cycle = d, a.lazyTweens.push(this), this._lazy = [t, e], void 0;
        this._time && !s ? this.ratio = this._ease.getRatio(this._time / g) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
      }
      for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== p && t >= 0 && (this._active = !0), 0 === m && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === g) && (e || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
      this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== m || s) && this._callback("onUpdate")), this._cycle !== d && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === g && this._rawPrevTime === n && c !== n && (this._rawPrevTime = 0))
    }, r.to = function (t, e, i) {
      return new r(t, e, i)
    }, r.from = function (t, e, i) {
      return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i)
    }, r.fromTo = function (t, e, i, s) {
      return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new r(t, e, s)
    }, r.staggerTo = r.allTo = function (t, e, n, a, l, u, c) {
      a = a || 0;
      var f, p, m, d, g = n.delay || 0,
          v = [],
          y = function () {
          n.onComplete && n.onComplete.apply(n.onCompleteScope || this, arguments), l.apply(c || n.callbackScope || this, u || _)
          };
      for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = s(t))), t = t || [], 0 > a && (t = s(t), t.reverse(), a *= -1), f = t.length - 1, m = 0; f >= m; m++) {
        p = {};
        for (d in n) p[d] = n[d];
        p.delay = g, m === f && l && (p.onComplete = y), v[m] = new r(t[m], e, p), g += a
      }
      return v
    }, r.staggerFrom = r.allFrom = function (t, e, i, s, n, a, o) {
      return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, s, n, a, o)
    }, r.staggerFromTo = r.allFromTo = function (t, e, i, s, n, a, o, h) {
      return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, s, n, a, o, h)
    }, r.delayedCall = function (t, e, i, s, n) {
      return new r(e, 0, {
        delay: t,
        onComplete: e,
        onCompleteParams: i,
        callbackScope: s,
        onReverseComplete: e,
        onReverseCompleteParams: i,
        immediateRender: !1,
        useFrames: n,
        overwrite: 0
      })
    }, r.set = function (t, e) {
      return new r(t, 0, e)
    }, r.isTweening = function (t) {
      return i.getTweensOf(t, !0).length > 0
    };
    var u = function (t, e) {
      for (var s = [], r = 0, n = t._first; n;) n instanceof i ? s[r++] = n : (e && (s[r++] = n), s = s.concat(u(n, e)), r = s.length), n = n._next;
      return s
    },
        c = r.getAllTweens = function (e) {
        return u(t._rootTimeline, e).concat(u(t._rootFramesTimeline, e))
        };
    r.killAll = function (t, i, s, r) {
      null == i && (i = !0), null == s && (s = !0);
      var n, a, o, h = c(0 != r),
          l = h.length,
          _ = i && s && r;
      for (o = 0; l > o; o++) a = h[o], (_ || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
    }, r.killChildTweensOf = function (t, e) {
      if (null != t) {
        var n, l, _, u, c, f = a.tweenLookup;
        if ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = s(t)), h(t)) for (u = t.length; --u > -1;) r.killChildTweensOf(t[u], e);
        else {
          n = [];
          for (_ in f) for (l = f[_].target.parentNode; l;) l === t && (n = n.concat(f[_].tweens)), l = l.parentNode;
          for (c = n.length, u = 0; c > u; u++) e && n[u].totalTime(n[u].totalDuration()), n[u]._enabled(!1, !1)
        }
      }
    };
    var f = function (t, i, s, r) {
      i = i !== !1, s = s !== !1, r = r !== !1;
      for (var n, a, o = c(r), h = i && s && r, l = o.length; --l > -1;) a = o[l], (h || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t)
    };
    return r.pauseAll = function (t, e, i) {
      f(!0, t, e, i)
    }, r.resumeAll = function (t, e, i) {
      f(!1, t, e, i)
    }, r.globalTimeScale = function (e) {
      var s = t._rootTimeline,
          r = i.ticker.time;
      return arguments.length ? (e = e || n, s._startTime = r - (r - s._startTime) * s._timeScale / e, s = t._rootFramesTimeline, r = i.ticker.frame, s._startTime = r - (r - s._startTime) * s._timeScale / e, s._timeScale = t._rootTimeline._timeScale = e, e) : s._timeScale
    }, l.progress = function (t) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
    }, l.totalProgress = function (t) {
      return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
    }, l.time = function (t, e) {
      return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
    }, l.duration = function (e) {
      return arguments.length ? t.prototype.duration.call(this, e) : this._duration
    }, l.totalDuration = function (t) {
      return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
    }, l.repeat = function (t) {
      return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
    }, l.repeatDelay = function (t) {
      return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
    }, l.yoyo = function (t) {
      return arguments.length ? (this._yoyo = t, this) : this._yoyo
    }, r
  }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
    var s = function (t) {
      e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
      var i, s, r = this.vars;
      for (s in r) i = r[s], h(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
      h(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
    },
        r = 1e-10,
        n = i._internals,
        a = s._internals = {},
        o = n.isSelector,
        h = n.isArray,
        l = n.lazyTweens,
        _ = n.lazyRender,
        u = [],
        c = _gsScope._gsDefine.globals,
        f = function (t) {
        var e, i = {};
        for (e in t) i[e] = t[e];
        return i
        },
        p = a.pauseCallback = function (t, e, i, s) {
        var n, a = t._timeline,
            o = a._totalTime,
            h = t._startTime,
            l = 0 > t._rawPrevTime || 0 === t._rawPrevTime && a._reversed,
            _ = l ? 0 : r,
            c = l ? r : 0;
        if (e || !this._forcingPlayhead) {
          for (a.pause(h), n = t._prev; n && n._startTime === h;) n._rawPrevTime = c, n = n._prev;
          for (n = t._next; n && n._startTime === h;) n._rawPrevTime = _, n = n._next;
          e && e.apply(s || a.vars.callbackScope || a, i || u), (this._forcingPlayhead || !a._paused) && a.seek(o)
        }
        },
        m = function (t) {
        var e, i = [],
            s = t.length;
        for (e = 0; e !== s; i.push(t[e++]));
        return i
        },
        d = s.prototype = new e;
    return s.version = "1.17.0", d.constructor = s, d.kill()._gc = d._forcingPlayhead = !1, d.to = function (t, e, s, r) {
      var n = s.repeat && c.TweenMax || i;
      return e ? this.add(new n(t, e, s), r) : this.set(t, s, r)
    }, d.from = function (t, e, s, r) {
      return this.add((s.repeat && c.TweenMax || i).from(t, e, s), r)
    }, d.fromTo = function (t, e, s, r, n) {
      var a = r.repeat && c.TweenMax || i;
      return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
    }, d.staggerTo = function (t, e, r, n, a, h, l, _) {
      var u, c = new s({
        onComplete: h,
        onCompleteParams: l,
        callbackScope: _,
        smoothChildTiming: this.smoothChildTiming
      });
      for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], o(t) && (t = m(t)), n = n || 0, 0 > n && (t = m(t), t.reverse(), n *= -1), u = 0; t.length > u; u++) r.startAt && (r.startAt = f(r.startAt)), c.to(t[u], e, f(r), u * n);
      return this.add(c, a)
    }, d.staggerFrom = function (t, e, i, s, r, n, a, o) {
      return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
    }, d.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
      return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
    }, d.call = function (t, e, s, r) {
      return this.add(i.delayedCall(0, t, e, s), r)
    }, d.set = function (t, e, s) {
      return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
    }, s.exportRoot = function (t, e) {
      t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
      var r, n, a = new s(t),
          o = a._timeline;
      for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
      return o.add(a, 0), a
    }, d.add = function (r, n, a, o) {
      var l, _, u, c, f, p;
      if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
        if (r instanceof Array || r && r.push && h(r)) {
          for (a = a || "normal", o = o || 0, l = n, _ = r.length, u = 0; _ > u; u++) h(c = r[u]) && (c = new s({
            tweens: c
          })), this.add(c, l), "string" != typeof c && "function" != typeof c && ("sequence" === a ? l = c._startTime + c.totalDuration() / c._timeScale : "start" === a && (c._startTime -= c.delay())), l += o;
          return this._uncache(!0)
        }
        if ("string" == typeof r) return this.addLabel(r, n);
        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
        r = i.delayedCall(0, r)
      }
      if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (f = this, p = f.rawTime() > r._startTime; f._timeline;) p && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1), f = f._timeline;
      return this
    }, d.remove = function (e) {
      if (e instanceof t) return this._remove(e, !1);
      if (e instanceof Array || e && e.push && h(e)) {
        for (var i = e.length; --i > -1;) this.remove(e[i]);
        return this
      }
      return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
    }, d._remove = function (t, i) {
      e.prototype._remove.call(this, t, i);
      var s = this._last;
      return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
    }, d.append = function (t, e) {
      return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
    }, d.insert = d.insertMultiple = function (t, e, i, s) {
      return this.add(t, e || 0, i, s)
    }, d.appendMultiple = function (t, e, i, s) {
      return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
    }, d.addLabel = function (t, e) {
      return this._labels[t] = this._parseTimeOrLabel(e), this
    }, d.addPause = function (t, e, s, r) {
      var n = i.delayedCall(0, p, ["{self}", e, s, r], this);
      return n.data = "isPause", this.add(n, t)
    }, d.removeLabel = function (t) {
      return delete this._labels[t], this
    }, d.getLabelTime = function (t) {
      return null != this._labels[t] ? this._labels[t] : -1
    }, d._parseTimeOrLabel = function (e, i, s, r) {
      var n;
      if (r instanceof t && r.timeline === this) this.remove(r);
      else if (r && (r instanceof Array || r.push && h(r))) for (n = r.length; --n > -1;) r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
      if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
      if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
      else {
        if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
        i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
      }
      return Number(e) + i
    }, d.seek = function (t, e) {
      return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
    }, d.stop = function () {
      return this.paused(!0)
    }, d.gotoAndPlay = function (t, e) {
      return this.play(t, e)
    }, d.gotoAndStop = function (t, e) {
      return this.pause(t, e)
    }, d.render = function (t, e, i) {
      this._gc && this._enabled(!0, !1);
      var s, n, a, o, h, u = this._dirty ? this.totalDuration() : this._totalDuration,
          c = this._time,
          f = this._startTime,
          p = this._timeScale,
          m = this._paused;
      if (t >= u) this._totalTime = this._time = u, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", h = !! this._timeline.autoRemoveChildren, 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = u + 1e-4;
      else if (1e-7 > t) if (this._totalTime = this._time = 0, (0 !== c || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", n = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (h = n = !0, o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (h = !0), this._rawPrevTime = t;
      else {
        if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && n) for (s = this._first; s && 0 === s._startTime;) s._duration || (n = !1), s = s._next;
        t = 0, this._initted || (h = !0)
      } else this._totalTime = this._time = this._rawPrevTime = t;
      if (this._time !== c && this._first || i || h) {
        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== c && t > 0 && (this._active = !0), 0 === c && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")), this._time >= c) for (s = this._first; s && (a = s._next, !this._paused || m);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
        else for (s = this._last; s && (a = s._prev, !this._paused || m);)(s._active || c >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
        this._onUpdate && (e || (l.length && _(), this._callback("onUpdate"))), o && (this._gc || (f === this._startTime || p !== this._timeScale) && (0 === this._time || u >= this.totalDuration()) && (n && (l.length && _(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this._callback(o)))
      }
    }, d._hasPausedChild = function () {
      for (var t = this._first; t;) {
        if (t._paused || t instanceof s && t._hasPausedChild()) return !0;
        t = t._next
      }
      return !1
    }, d.getChildren = function (t, e, s, r) {
      r = r || -9999999999;
      for (var n = [], a = this._first, o = 0; a;) r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
      return n
    }, d.getTweensOf = function (t, e) {
      var s, r, n = this._gc,
          a = [],
          o = 0;
      for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
      return n && this._enabled(!1, !0), a
    }, d.recent = function () {
      return this._recent
    }, d._contains = function (t) {
      for (var e = t.timeline; e;) {
        if (e === this) return !0;
        e = e.timeline
      }
      return !1
    }, d.shiftChildren = function (t, e, i) {
      i = i || 0;
      for (var s, r = this._first, n = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
      if (e) for (s in n) n[s] >= i && (n[s] += t);
      return this._uncache(!0)
    }, d._kill = function (t, e) {
      if (!t && !e) return this._enabled(!1, !1);
      for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;) i[s]._kill(t, e) && (r = !0);
      return r
    }, d.clear = function (t) {
      var e = this.getChildren(!1, !0, !0),
          i = e.length;
      for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
      return t !== !1 && (this._labels = {}), this._uncache(!0)
    }, d.invalidate = function () {
      for (var e = this._first; e;) e.invalidate(), e = e._next;
      return t.prototype.invalidate.call(this)
    }, d._enabled = function (t, i) {
      if (t === this._gc) for (var s = this._first; s;) s._enabled(t, !0), s = s._next;
      return e.prototype._enabled.call(this, t, i)
    }, d.totalTime = function () {
      this._forcingPlayhead = !0;
      var e = t.prototype.totalTime.apply(this, arguments);
      return this._forcingPlayhead = !1, e
    }, d.duration = function (t) {
      return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
    }, d.totalDuration = function (t) {
      if (!arguments.length) {
        if (this._dirty) {
          for (var e, i, s = 0, r = this._last, n = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
          this._duration = this._totalDuration = s, this._dirty = !1
        }
        return this._totalDuration
      }
      return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
    }, d.paused = function (e) {
      if (!e) for (var i = this._first, s = this._time; i;) i._startTime === s && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
      return t.prototype.paused.apply(this, arguments)
    }, d.usesFrames = function () {
      for (var e = this._timeline; e._timeline;) e = e._timeline;
      return e === t._rootFramesTimeline
    }, d.rawTime = function () {
      return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
    }, s
  }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (t, e, i) {
    var s = function (e) {
      t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
    },
        r = 1e-10,
        n = e._internals,
        a = n.lazyTweens,
        o = n.lazyRender,
        h = new i(null, null, 1, 0),
        l = s.prototype = new t;
    return l.constructor = s, l.kill()._gc = !1, s.version = "1.17.0", l.invalidate = function () {
      return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
    }, l.addCallback = function (t, i, s, r) {
      return this.add(e.delayedCall(0, t, s, r), i)
    }, l.removeCallback = function (t, e) {
      if (t) if (null == e) this._kill(null, t);
      else for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1;) i[s]._startTime === r && i[s]._enabled(!1, !1);
      return this
    }, l.removePause = function (e) {
      return this.removeCallback(t._internals.pauseCallback, e)
    }, l.tweenTo = function (t, i) {
      i = i || {};
      var s, r, n, a = {
        ease: h,
        useFrames: this.usesFrames(),
        immediateRender: !1
      };
      for (r in i) a[r] = i[r];
      return a.time = this._parseTimeOrLabel(t), s = Math.abs(Number(a.time) - this._time) / this._timeScale || .001, n = new e(this, s, a), a.onStart = function () {
        n.target.paused(!0), n.vars.time !== n.target.time() && s === n.duration() && n.duration(Math.abs(n.vars.time - n.target.time()) / n.target._timeScale), i.onStart && n._callback("onStart")
      }, n
    }, l.tweenFromTo = function (t, e, i) {
      i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
        onComplete: this.seek,
        onCompleteParams: [t],
        callbackScope: this
      }, i.immediateRender = i.immediateRender !== !1;
      var s = this.tweenTo(e, i);
      return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
    }, l.render = function (t, e, i) {
      this._gc && this._enabled(!0, !1);
      var s, n, h, l, _, u, c = this._dirty ? this.totalDuration() : this._totalDuration,
          f = this._duration,
          p = this._time,
          m = this._totalTime,
          d = this._startTime,
          g = this._timeScale,
          v = this._rawPrevTime,
          y = this._paused,
          T = this._cycle;
      if (t >= c) this._locked || (this._totalTime = c, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (n = !0, l = "onComplete", _ = !! this._timeline.autoRemoveChildren, 0 === this._duration && (0 === t || 0 > v || v === r) && v !== t && this._first && (_ = !0, v > r && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = f, t = f + 1e-4);
      else if (1e-7 > t) if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== p || 0 === f && v !== r && (v > 0 || 0 > t && v >= 0) && !this._locked) && (l = "onReverseComplete", n = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (_ = n = !0, l = "onReverseComplete") : v >= 0 && this._first && (_ = !0), this._rawPrevTime = t;
      else {
        if (this._rawPrevTime = f || !e || t || this._rawPrevTime === t ? t : r, 0 === t && n) for (s = this._first; s && 0 === s._startTime;) s._duration || (n = !1), s = s._next;
        t = 0, this._initted || (_ = !0)
      } else 0 === f && 0 > v && (_ = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (u = f + this._repeatDelay, this._cycle = this._totalTime / u >> 0, 0 !== this._cycle && this._cycle === this._totalTime / u && this._cycle--, this._time = this._totalTime - this._cycle * u, this._yoyo && 0 !== (1 & this._cycle) && (this._time = f - this._time), this._time > f ? (this._time = f, t = f + 1e-4) : 0 > this._time ? this._time = t = 0 : t = this._time));
      if (this._cycle !== T && !this._locked) {
        var x = this._yoyo && 0 !== (1 & T),
            w = x === (this._yoyo && 0 !== (1 & this._cycle)),
            b = this._totalTime,
            P = this._cycle,
            k = this._rawPrevTime,
            S = this._time;
        if (this._totalTime = T * f, T > this._cycle ? x = !x : this._totalTime += f, this._time = p, this._rawPrevTime = 0 === f ? v - 1e-4 : v, this._cycle = T, this._locked = !0, p = x ? 0 : f, this.render(p, e, 0 === f), e || this._gc || this.vars.onRepeat && this._callback("onRepeat"), w && (p = x ? f + 1e-4 : -1e-4, this.render(p, !0, !1)), this._locked = !1, this._paused && !y) return;
        this._time = S, this._totalTime = b, this._cycle = P, this._rawPrevTime = k
      }
      if (!(this._time !== p && this._first || i || _)) return m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")), void 0;
      if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== m && t > 0 && (this._active = !0), 0 === m && this.vars.onStart && 0 !== this._totalTime && (e || this._callback("onStart")), this._time >= p) for (s = this._first; s && (h = s._next, !this._paused || y);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = h;
      else for (s = this._last; s && (h = s._prev, !this._paused || y);)(s._active || p >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = h;
      this._onUpdate && (e || (a.length && o(), this._callback("onUpdate"))), l && (this._locked || this._gc || (d === this._startTime || g !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (n && (a.length && o(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[l] && this._callback(l)))
    }, l.getActive = function (t, e, i) {
      null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
      var s, r, n = [],
          a = this.getChildren(t, e, i),
          o = 0,
          h = a.length;
      for (s = 0; h > s; s++) r = a[s], r.isActive() && (n[o++] = r);
      return n
    }, l.getLabelAfter = function (t) {
      t || 0 !== t && (t = this._time);
      var e, i = this.getLabelsArray(),
          s = i.length;
      for (e = 0; s > e; e++) if (i[e].time > t) return i[e].name;
      return null
    }, l.getLabelBefore = function (t) {
      null == t && (t = this._time);
      for (var e = this.getLabelsArray(), i = e.length; --i > -1;) if (t > e[i].time) return e[i].name;
      return null
    }, l.getLabelsArray = function () {
      var t, e = [],
          i = 0;
      for (t in this._labels) e[i++] = {
        time: this._labels[t],
        name: t
      };
      return e.sort(function (t, e) {
        return t.time - e.time
      }), e
    }, l.progress = function (t, e) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
    }, l.totalProgress = function (t, e) {
      return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
    }, l.totalDuration = function (e) {
      return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
    }, l.time = function (t, e) {
      return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
    }, l.repeat = function (t) {
      return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
    }, l.repeatDelay = function (t) {
      return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
    }, l.yoyo = function (t) {
      return arguments.length ? (this._yoyo = t, this) : this._yoyo
    }, l.currentLabel = function (t) {
      return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
    }, s
  }, !0), function () {
    var t = 180 / Math.PI,
        e = [],
        i = [],
        s = [],
        r = {},
        n = _gsScope._gsDefine.globals,
        a = function (t, e, i, s) {
        this.a = t, this.b = e, this.c = i, this.d = s, this.da = s - t, this.ca = i - t, this.ba = e - t
        },
        o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
        h = function (t, e, i, s) {
        var r = {
          a: t
        },
            n = {},
            a = {},
            o = {
            c: s
            },
            h = (t + e) / 2,
            l = (e + i) / 2,
            _ = (i + s) / 2,
            u = (h + l) / 2,
            c = (l + _) / 2,
            f = (c - u) / 8;
        return r.b = h + (t - h) / 4, n.b = u + f, r.c = n.a = (r.b + n.b) / 2, n.c = a.a = (u + c) / 2, a.b = c - f, o.b = _ + (s - _) / 4, a.c = o.a = (a.b + o.b) / 2, [r, n, a, o]
        },
        l = function (t, r, n, a, o) {
        var l, _, u, c, f, p, m, d, g, v, y, T, x, w = t.length - 1,
            b = 0,
            P = t[0].a;
        for (l = 0; w > l; l++) f = t[b], _ = f.a, u = f.d, c = t[b + 1].d, o ? (y = e[l], T = i[l], x = .25 * (T + y) * r / (a ? .5 : s[l] || .5), p = u - (u - _) * (a ? .5 * r : 0 !== y ? x / y : 0), m = u + (c - u) * (a ? .5 * r : 0 !== T ? x / T : 0), d = u - (p + ((m - p) * (3 * y / (y + T) + .5) / 4 || 0))) : (p = u - .5 * (u - _) * r, m = u + .5 * (c - u) * r, d = u - (p + m) / 2), p += d, m += d, f.c = g = p, f.b = 0 !== l ? P : P = f.a + .6 * (f.c - f.a), f.da = u - _, f.ca = g - _, f.ba = P - _, n ? (v = h(_, P, g, u), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = m;
        f = t[b], f.b = P, f.c = P + .4 * (f.d - P), f.da = f.d - f.a, f.ca = f.c - f.a, f.ba = P - f.a, n && (v = h(f.a, P, f.c, f.d), t.splice(b, 1, v[0], v[1], v[2], v[3]))
        },
        _ = function (t, s, r, n) {
        var o, h, l, _, u, c, f = [];
        if (n) for (t = [n].concat(t), h = t.length; --h > -1;)"string" == typeof(c = t[h][s]) && "=" === c.charAt(1) && (t[h][s] = n[s] + Number(c.charAt(0) + c.substr(2)));
        if (o = t.length - 2, 0 > o) return f[0] = new a(t[0][s], 0, 0, t[-1 > o ? 0 : 1][s]), f;
        for (h = 0; o > h; h++) l = t[h][s], _ = t[h + 1][s], f[h] = new a(l, 0, 0, _), r && (u = t[h + 2][s], e[h] = (e[h] || 0) + (_ - l) * (_ - l), i[h] = (i[h] || 0) + (u - _) * (u - _));
        return f[h] = new a(t[h][s], 0, 0, t[h + 1][s]), f
        },
        u = function (t, n, a, h, u, c) {
        var f, p, m, d, g, v, y, T, x = {},
            w = [],
            b = c || t[0];
        u = "string" == typeof u ? "," + u + "," : o, null == n && (n = 1);
        for (p in t[0]) w.push(p);
        if (t.length > 1) {
          for (T = t[t.length - 1], y = !0, f = w.length; --f > -1;) if (p = w[f], Math.abs(b[p] - T[p]) > .05) {
            y = !1;
            break
          }
          y && (t = t.concat(), c && t.unshift(c), t.push(t[1]), c = t[t.length - 3])
        }
        for (e.length = i.length = s.length = 0, f = w.length; --f > -1;) p = w[f], r[p] = -1 !== u.indexOf("," + p + ","), x[p] = _(t, p, r[p], c);
        for (f = e.length; --f > -1;) e[f] = Math.sqrt(e[f]), i[f] = Math.sqrt(i[f]);
        if (!h) {
          for (f = w.length; --f > -1;) if (r[p]) for (m = x[w[f]], v = m.length - 1, d = 0; v > d; d++) g = m[d + 1].da / i[d] + m[d].da / e[d], s[d] = (s[d] || 0) + g * g;
          for (f = s.length; --f > -1;) s[f] = Math.sqrt(s[f])
        }
        for (f = w.length, d = a ? 4 : 1; --f > -1;) p = w[f], m = x[p], l(m, n, a, h, r[p]), y && (m.splice(0, d), m.splice(m.length - d, d));
        return x
        },
        c = function (t, e, i) {
        e = e || "soft";
        var s, r, n, o, h, l, _, u, c, f, p, m = {},
            d = "cubic" === e ? 3 : 2,
            g = "soft" === e,
            v = [];
        if (g && i && (t = [i].concat(t)), null == t || d + 1 > t.length) throw "invalid Bezier data";
        for (c in t[0]) v.push(c);
        for (l = v.length; --l > -1;) {
          for (c = v[l], m[c] = h = [], f = 0, u = t.length, _ = 0; u > _; _++) s = null == i ? t[_][c] : "string" == typeof(p = t[_][c]) && "=" === p.charAt(1) ? i[c] + Number(p.charAt(0) + p.substr(2)) : Number(p), g && _ > 1 && u - 1 > _ && (h[f++] = (s + h[f - 2]) / 2), h[f++] = s;
          for (u = f - d + 1, f = 0, _ = 0; u > _; _ += d) s = h[_], r = h[_ + 1], n = h[_ + 2], o = 2 === d ? 0 : h[_ + 3], h[f++] = p = 3 === d ? new a(s, r, n, o) : new a(s, (2 * r + s) / 3, (2 * r + n) / 3, n);
          h.length = f
        }
        return m
        },
        f = function (t, e, i) {
        for (var s, r, n, a, o, h, l, _, u, c, f, p = 1 / i, m = t.length; --m > -1;) for (c = t[m], n = c.a, a = c.d - n, o = c.c - n, h = c.b - n, s = r = 0, _ = 1; i >= _; _++) l = p * _, u = 1 - l, s = r - (r = (l * l * a + 3 * u * (l * o + u * h)) * l), f = m * i + _ - 1, e[f] = (e[f] || 0) + s * s
        },
        p = function (t, e) {
        e = e >> 0 || 6;
        var i, s, r, n, a = [],
            o = [],
            h = 0,
            l = 0,
            _ = e - 1,
            u = [],
            c = [];
        for (i in t) f(t[i], a, e);
        for (r = a.length, s = 0; r > s; s++) h += Math.sqrt(a[s]), n = s % e, c[n] = h, n === _ && (l += h, n = s / e >> 0, u[n] = c, o[n] = l, h = 0, c = []);
        return {
          length: l,
          lengths: o,
          segments: u
        }
        },
        m = _gsScope._gsDefine.plugin({
        propName: "bezier",
        priority: -1,
        version: "1.3.4",
        API: 2,
        global: !0,
        init: function (t, e, i) {
          this._target = t, e instanceof Array && (e = {
            values: e
          }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
          var s, r, n, a, o, h = e.values || [],
              l = {},
              _ = h[0],
              f = e.autoRotate || i.vars.orientToBezier;
          this._autoRotate = f ? f instanceof Array ? f : [
            ["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]
          ] : null;
          for (s in _) this._props.push(s);
          for (n = this._props.length; --n > -1;) s = this._props[n], this._overwriteProps.push(s), r = this._func[s] = "function" == typeof t[s], l[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), o || l[s] !== h[0][s] && (o = l);
          if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : c(h, e.type, l), this._segCount = this._beziers[s].length, this._timeRes) {
            var m = p(this._beziers, this._timeRes);
            this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
          }
          if (f = this._autoRotate) for (this._initialRotations = [], f[0] instanceof Array || (this._autoRotate = f = [f]), n = f.length; --n > -1;) {
            for (a = 0; 3 > a; a++) s = f[n][a], this._func[s] = "function" == typeof t[s] ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)] : !1;
            s = f[n][2], this._initialRotations[n] = this._func[s] ? this._func[s].call(this._target) : this._target[s]
          }
          return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
        },
        set: function (e) {
          var i, s, r, n, a, o, h, l, _, u, c = this._segCount,
              f = this._func,
              p = this._target,
              m = e !== this._startRatio;
          if (this._timeRes) {
            if (_ = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && c - 1 > r) {
              for (l = c - 1; l > r && e >= (this._l2 = _[++r]););
              this._l1 = _[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
            } else if (this._l1 > e && r > 0) {
              for (; r > 0 && (this._l1 = _[--r]) >= e;);
              0 === r && this._l1 > e ? this._l1 = 0 : r++, this._l2 = _[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
            }
            if (i = r, e -= this._l1, r = this._si, e > this._s2 && u.length - 1 > r) {
              for (l = u.length - 1; l > r && e >= (this._s2 = u[++r]););
              this._s1 = u[r - 1], this._si = r
            } else if (this._s1 > e && r > 0) {
              for (; r > 0 && (this._s1 = u[--r]) >= e;);
              0 === r && this._s1 > e ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
            }
            o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
          } else i = 0 > e ? 0 : e >= 1 ? c - 1 : c * e >> 0, o = (e - i * (1 / c)) * c;
          for (s = 1 - o, r = this._props.length; --r > -1;) n = this._props[r], a = this._beziers[n][i], h = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a, this._round[n] && (h = Math.round(h)), f[n] ? p[n](h) : p[n] = h;
          if (this._autoRotate) {
            var d, g, v, y, T, x, w, b = this._autoRotate;
            for (r = b.length; --r > -1;) n = b[r][2], x = b[r][3] || 0, w = b[r][4] === !0 ? 1 : t, a = this._beziers[b[r][0]], d = this._beziers[b[r][1]], a && d && (a = a[i], d = d[i], g = a.a + (a.b - a.a) * o, y = a.b + (a.c - a.b) * o, g += (y - g) * o, y += (a.c + (a.d - a.c) * o - y) * o, v = d.a + (d.b - d.a) * o, T = d.b + (d.c - d.b) * o, v += (T - v) * o, T += (d.c + (d.d - d.c) * o - T) * o, h = m ? Math.atan2(T - v, y - g) * w + x : this._initialRotations[r], f[n] ? p[n](h) : p[n] = h)
          }
        }
      }),
        d = m.prototype;
    m.bezierThrough = u, m.cubicToQuadratic = h, m._autoCSS = !0, m.quadraticToCubic = function (t, e, i) {
      return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
    }, m._cssRegister = function () {
      var t = n.CSSPlugin;
      if (t) {
        var e = t._internals,
            i = e._parseToProxy,
            s = e._setPluginRatio,
            r = e.CSSPropTween;
        e._registerComplexSpecialProp("bezier", {
          parser: function (t, e, n, a, o, h) {
            e instanceof Array && (e = {
              values: e
            }), h = new m;
            var l, _, u, c = e.values,
                f = c.length - 1,
                p = [],
                d = {};
            if (0 > f) return o;
            for (l = 0; f >= l; l++) u = i(t, c[l], a, o, h, f !== l), p[l] = u.end;
            for (_ in e) d[_] = e[_];
            return d.values = p, o = new r(t, "bezier", 0, 0, u.pt, 2), o.data = u, o.plugin = h, o.setRatio = s, 0 === d.autoRotate && (d.autoRotate = !0), !d.autoRotate || d.autoRotate instanceof Array || (l = d.autoRotate === !0 ? 0 : Number(d.autoRotate), d.autoRotate = null != u.end.left ? [
              ["left", "top", "rotation", l, !1]
            ] : null != u.end.x ? [
              ["x", "y", "rotation", l, !1]
            ] : !1), d.autoRotate && (a._transform || a._enableTransforms(!1), u.autoRotate = a._target._gsTransform), h._onInitTween(u.proxy, d, a._tween), o
          }
        })
      }
    }, d._roundProps = function (t, e) {
      for (var i = this._overwriteProps, s = i.length; --s > -1;)(t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e)
    }, d._kill = function (t) {
      var e, i, s = this._props;
      for (e in this._beziers) if (e in t) for (delete this._beziers[e], delete this._func[e], i = s.length; --i > -1;) s[i] === e && s.splice(i, 1);
      return this._super._kill.call(this, t)
    }
  }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
    var i, s, r, n, a = function () {
      t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
    },
        o = _gsScope._gsDefine.globals,
        h = {},
        l = a.prototype = new t("css");
    l.constructor = a, a.version = "1.17.0", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", a.defaultSmoothOrigin = !0, l = "px", a.suffixMap = {
      top: l,
      right: l,
      bottom: l,
      left: l,
      width: l,
      height: l,
      fontSize: l,
      padding: l,
      margin: l,
      perspective: l,
      lineHeight: ""
    };
    var _, u, c, f, p, m, d = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
        g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        T = /(?:\d|\-|\+|=|#|\.)*/g,
        x = /opacity *= *([^)]*)/i,
        w = /opacity:([^;]*)/i,
        b = /alpha\(opacity *=.+?\)/i,
        P = /^(rgb|hsl)/,
        k = /([A-Z])/g,
        S = /-([a-z])/gi,
        R = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        O = function (t, e) {
        return e.toUpperCase()
        },
        A = /(?:Left|Right|Width)/i,
        C = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        D = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        M = /,(?=[^\)]*(?:\(|$))/gi,
        z = Math.PI / 180,
        I = 180 / Math.PI,
        F = {},
        N = document,
        E = function (t) {
        return N.createElementNS ? N.createElementNS("http://www.w3.org/1999/xhtml", t) : N.createElement(t)
        },
        L = E("div"),
        X = E("img"),
        B = a._internals = {
        _specialProps: h
        },
        Y = navigator.userAgent,
        j = function () {
        var t = Y.indexOf("Android"),
            e = E("a");
        return c = -1 !== Y.indexOf("Safari") && -1 === Y.indexOf("Chrome") && (-1 === t || Number(Y.substr(t + 8, 1)) > 3), p = c && 6 > Number(Y.substr(Y.indexOf("Version/") + 8, 1)), f = -1 !== Y.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y)) && (m = parseFloat(RegExp.$1)), e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1
        }(),
        U = function (t) {
        return x.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        },
        q = function (t) {
        window.console && console.log(t)
        },
        V = "",
        G = "",
        W = function (t, e) {
        e = e || L;
        var i, s, r = e.style;
        if (void 0 !== r[t]) return t;
        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], s = 5; --s > -1 && void 0 === r[i[s] + t];);
        return s >= 0 ? (G = 3 === s ? "ms" : i[s], V = "-" + G.toLowerCase() + "-", G + t) : null
        },
        Z = N.defaultView ? N.defaultView.getComputedStyle : function () {},
        Q = a.getStyle = function (t, e, i, s, r) {
        var n;
        return j || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || Z(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(k, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : U(t)
        },
        $ = B.convertToPixels = function (t, i, s, r, n) {
        if ("px" === r || !r) return s;
        if ("auto" === r || !s) return 0;
        var o, h, l, _ = A.test(i),
            u = t,
            c = L.style,
            f = 0 > s;
        if (f && (s = -s), "%" === r && -1 !== i.indexOf("border")) o = s / 100 * (_ ? t.clientWidth : t.clientHeight);
        else {
          if (c.cssText = "border:0 solid red;position:" + Q(t, "position") + ";line-height:0;", "%" !== r && u.appendChild) c[_ ? "borderLeftWidth" : "borderTopWidth"] = s + r;
          else {
            if (u = t.parentNode || N.body, h = u._gsCache, l = e.ticker.frame, h && _ && h.time === l) return h.width * s / 100;
            c[_ ? "width" : "height"] = s + r
          }
          u.appendChild(L), o = parseFloat(L[_ ? "offsetWidth" : "offsetHeight"]), u.removeChild(L), _ && "%" === r && a.cacheWidths !== !1 && (h = u._gsCache = u._gsCache || {}, h.time = l, h.width = 100 * (o / s)), 0 !== o || n || (o = $(t, i, s, r, !0))
        }
        return f ? -o : o
        },
        H = B.calculateOffset = function (t, e, i) {
        if ("absolute" !== Q(t, "position", i)) return 0;
        var s = "left" === e ? "Left" : "Top",
            r = Q(t, "margin" + s, i);
        return t["offset" + s] - ($(t, e, parseFloat(r), r.replace(T, "")) || 0)
        },
        K = function (t, e) {
        var i, s, r, n = {};
        if (e = e || Z(t, null)) if (i = e.length) for (; --i > -1;) r = e[i], (-1 === r.indexOf("-transform") || Pe === r) && (n[r.replace(S, O)] = e.getPropertyValue(r));
        else for (i in e)(-1 === i.indexOf("Transform") || be === i) && (n[i] = e[i]);
        else if (e = t.currentStyle || t.style) for (i in e)"string" == typeof i && void 0 === n[i] && (n[i.replace(S, O)] = e[i]);
        return j || (n.opacity = U(t)), s = Ne(t, e, !1), n.rotation = s.rotation, n.skewX = s.skewX, n.scaleX = s.scaleX, n.scaleY = s.scaleY, n.x = s.x, n.y = s.y, Se && (n.z = s.z, n.rotationX = s.rotationX, n.rotationY = s.rotationY, n.scaleZ = s.scaleZ), n.filters && delete n.filters, n
        },
        J = function (t, e, i, s, r) {
        var n, a, o, h = {},
            l = t.style;
        for (a in i)"cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (h[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(y, "") ? n : 0 : H(t, a), void 0 !== l[a] && (o = new fe(l, a, l[a], o)));
        if (s) for (a in s)"className" !== a && (h[a] = s[a]);
        return {
          difs: h,
          firstMPT: o
        }
        },
        te = {
        width: ["Left", "Right"],
        height: ["Top", "Bottom"]
        },
        ee = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        ie = function (t, e, i) {
        var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
            r = te[e],
            n = r.length;
        for (i = i || Z(t, null); --n > -1;) s -= parseFloat(Q(t, "padding" + r[n], i, !0)) || 0, s -= parseFloat(Q(t, "border" + r[n] + "Width", i, !0)) || 0;
        return s
        },
        se = function (t, e) {
        (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
        var i = t.split(" "),
            s = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
            r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
        return null == r ? r = "center" === s ? "50%" : "0" : "center" === r && (r = "50%"), ("center" === s || isNaN(parseFloat(s)) && -1 === (s + "").indexOf("=")) && (s = "50%"), t = s + " " + r + (i.length > 2 ? " " + i[2] : ""), e && (e.oxp = -1 !== s.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === s.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(s.replace(y, "")), e.oy = parseFloat(r.replace(y, "")), e.v = t), e || t
        },
        re = function (t, e) {
        return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
        },
        ne = function (t, e) {
        return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
        },
        ae = function (t, e, i, s) {
        var r, n, a, o, h, l = 1e-6;
        return null == t ? o = e : "number" == typeof t ? o = t : (r = 360, n = t.split("_"), h = "=" === t.charAt(1), a = (h ? parseInt(t.charAt(0) + "1", 10) * parseFloat(n[0].substr(2)) : parseFloat(n[0])) * (-1 === t.indexOf("rad") ? 1 : I) - (h ? 0 : e), n.length && (s && (s[i] = e + a), -1 !== t.indexOf("short") && (a %= r, a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (0 | a / r) * r : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (0 | a / r) * r)), o = e + a), l > o && o > -l && (o = 0), o
        },
        oe = {
        aqua: [0, 255, 255],
        lime: [0, 255, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, 255],
        navy: [0, 0, 128],
        white: [255, 255, 255],
        fuchsia: [255, 0, 255],
        olive: [128, 128, 0],
        yellow: [255, 255, 0],
        orange: [255, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [255, 0, 0],
        pink: [255, 192, 203],
        cyan: [0, 255, 255],
        transparent: [255, 255, 255, 0]
        },
        he = function (t, e, i) {
        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
        },
        le = a.parseColor = function (t) {
        var e, i, s, r, n, a;
        return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), oe[t] ? oe[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), s = t.charAt(3), t = "#" + e + e + i + i + s + s), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(d), r = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = he(r + 1 / 3, e, i), t[1] = he(r, e, i), t[2] = he(r - 1 / 3, e, i), t) : (t = t.match(d) || oe.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : oe.black
        },
        _e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
    for (l in oe) _e += "|" + l + "\\b";
    _e = RegExp(_e + ")", "gi");
    var ue = function (t, e, i, s) {
      if (null == t) return function (t) {
        return t
      };
      var r, n = e ? (t.match(_e) || [""])[0] : "",
          a = t.split(n).join("").match(v) || [],
          o = t.substr(0, t.indexOf(a[0])),
          h = ")" === t.charAt(t.length - 1) ? ")" : "",
          l = -1 !== t.indexOf(" ") ? " " : ",",
          _ = a.length,
          u = _ > 0 ? a[0].replace(d, "") : "";
      return _ ? r = e ?
      function (t) {
        var e, c, f, p;
        if ("number" == typeof t) t += u;
        else if (s && M.test(t)) {
          for (p = t.replace(M, "|").split("|"), f = 0; p.length > f; f++) p[f] = r(p[f]);
          return p.join(",")
        }
        if (e = (t.match(_e) || [n])[0], c = t.split(e).join("").match(v) || [], f = c.length, _ > f--) for (; _ > ++f;) c[f] = i ? c[0 | (f - 1) / 2] : a[f];
        return o + c.join(l) + l + e + h + (-1 !== t.indexOf("inset") ? " inset" : "")
      } : function (t) {
        var e, n, c;
        if ("number" == typeof t) t += u;
        else if (s && M.test(t)) {
          for (n = t.replace(M, "|").split("|"), c = 0; n.length > c; c++) n[c] = r(n[c]);
          return n.join(",")
        }
        if (e = t.match(v) || [], c = e.length, _ > c--) for (; _ > ++c;) e[c] = i ? e[0 | (c - 1) / 2] : a[c];
        return o + e.join(l) + h
      } : function (t) {
        return t
      }
    },
        ce = function (t) {
        return t = t.split(","), function (e, i, s, r, n, a, o) {
          var h, l = (i + "").split(" ");
          for (o = {}, h = 0; 4 > h; h++) o[t[h]] = l[h] = l[h] || l[(h - 1) / 2 >> 0];
          return r.parse(e, o, n, a)
        }
        },
        fe = (B._setPluginRatio = function (t) {
        this.plugin.setRatio(t);
        for (var e, i, s, r, n = this.data, a = n.proxy, o = n.firstMPT, h = 1e-6; o;) e = a[o.v], o.r ? e = Math.round(e) : h > e && e > -h && (e = 0), o.t[o.p] = e, o = o._next;
        if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t) for (o = n.firstMPT; o;) {
          if (i = o.t, i.type) {
            if (1 === i.type) {
              for (r = i.xs0 + i.s + i.xs1, s = 1; i.l > s; s++) r += i["xn" + s] + i["xs" + (s + 1)];
              i.e = r
            }
          } else i.e = i.s + i.xs0;
          o = o._next
        }
      }, function (t, e, i, s, r) {
        this.t = t, this.p = e, this.v = i, this.r = r, s && (s._prev = this, this._next = s)
      }),
        pe = (B._parseToProxy = function (t, e, i, s, r, n) {
        var a, o, h, l, _, u = s,
            c = {},
            f = {},
            p = i._transform,
            m = F;
        for (i._transform = null, F = e, s = _ = i.parse(t, e, s, r), F = m, n && (i._transform = p, u && (u._prev = null, u._prev && (u._prev._next = null))); s && s !== u;) {
          if (1 >= s.type && (o = s.p, f[o] = s.s + s.c, c[o] = s.s, n || (l = new fe(s, "s", o, l, s.r), s.c = 0), 1 === s.type)) for (a = s.l; --a > 0;) h = "xn" + a, o = s.p + "_" + h, f[o] = s.data[h], c[o] = s[h], n || (l = new fe(s, h, o, l, s.rxp[h]));
          s = s._next
        }
        return {
          proxy: c,
          end: f,
          firstMPT: l,
          pt: _
        }
      }, B.CSSPropTween = function (t, e, s, r, a, o, h, l, _, u, c) {
        this.t = t, this.p = e, this.s = s, this.c = r, this.n = h || e, t instanceof pe || n.push(this.n), this.r = l, this.type = o || 0, _ && (this.pr = _, i = !0), this.b = void 0 === u ? s : u, this.e = void 0 === c ? s + r : c, a && (this._next = a, a._prev = this)
      }),
        me = function (t, e, i, s, r, n) {
        var a = new pe(t, e, i, s - i, r, -1, n);
        return a.b = i, a.e = a.xs0 = s, a
        },
        de = a.parseComplex = function (t, e, i, s, r, n, a, o, h, l) {
        i = i || n || "", a = new pe(t, e, 0, 0, a, l ? 2 : 1, null, !1, o, i, s), s += "";
        var u, c, f, p, m, v, y, T, x, w, b, k, S = i.split(", ").join(",").split(" "),
            R = s.split(", ").join(",").split(" "),
            O = S.length,
            A = _ !== !1;
        for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (S = S.join(" ").replace(M, ", ").split(" "), R = R.join(" ").replace(M, ", ").split(" "), O = S.length), O !== R.length && (S = (n || "").split(" "), O = S.length), a.plugin = h, a.setRatio = l, u = 0; O > u; u++) if (p = S[u], m = R[u], T = parseFloat(p), T || 0 === T) a.appendXtra("", T, re(m, T), m.replace(g, ""), A && -1 !== m.indexOf("px"), !0);
        else if (r && ("#" === p.charAt(0) || oe[p] || P.test(p))) k = "," === m.charAt(m.length - 1) ? ")," : ")", p = le(p), m = le(m), x = p.length + m.length > 6, x && !j && 0 === m[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(R[u]).join("transparent")) : (j || (x = !1), a.appendXtra(x ? "rgba(" : "rgb(", p[0], m[0] - p[0], ",", !0, !0).appendXtra("", p[1], m[1] - p[1], ",", !0).appendXtra("", p[2], m[2] - p[2], x ? "," : k, !0), x && (p = 4 > p.length ? 1 : p[3], a.appendXtra("", p, (4 > m.length ? 1 : m[3]) - p, k, !1)));
        else if (v = p.match(d)) {
          if (y = m.match(g), !y || y.length !== v.length) return a;
          for (f = 0, c = 0; v.length > c; c++) b = v[c], w = p.indexOf(b, f), a.appendXtra(p.substr(f, w - f), Number(b), re(y[c], b), "", A && "px" === p.substr(w + b.length, 2), 0 === c), f = w + b.length;
          a["xs" + a.l] += p.substr(f)
        } else a["xs" + a.l] += a.l ? " " + p : p;
        if (-1 !== s.indexOf("=") && a.data) {
          for (k = a.xs0 + a.data.s, u = 1; a.l > u; u++) k += a["xs" + u] + a.data["xn" + u];
          a.e = k + a["xs" + u]
        }
        return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
        },
        ge = 9;
    for (l = pe.prototype, l.l = l.pr = 0; --ge > 0;) l["xn" + ge] = 0, l["xs" + ge] = "";
    l.xs0 = "", l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null, l.appendXtra = function (t, e, i, s, r, n) {
      var a = this,
          o = a.l;
      return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = s || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = r, a["xn" + o] = e, a.plugin || (a.xfirst = new pe(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
        s: e + i
      }, a.rxp = {}, a.s = e, a.c = i, a.r = r, a)) : (a["xs" + o] += e + (s || ""), a)
    };
    var ve = function (t, e) {
      e = e || {}, this.p = e.prefix ? W(t) || t : t, h[t] = h[this.p] = this, this.format = e.formatter || ue(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
    },
        ye = B._registerComplexSpecialProp = function (t, e, i) {
        "object" != typeof e && (e = {
          parser: i
        });
        var s, r, n = t.split(","),
            a = e.defaultValue;
        for (i = i || [a], s = 0; n.length > s; s++) e.prefix = 0 === s && e.prefix, e.defaultValue = i[s] || a, r = new ve(n[s], e)
        },
        Te = function (t) {
        if (!h[t]) {
          var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
          ye(t, {
            parser: function (t, i, s, r, n, a, l) {
              var _ = o.com.greensock.plugins[e];
              return _ ? (_._cssRegister(), h[s].parse(t, i, s, r, n, a, l)) : (q("Error: " + e + " js file not loaded."), n)
            }
          })
        }
        };
    l = ve.prototype, l.parseComplex = function (t, e, i, s, r, n) {
      var a, o, h, l, _, u, c = this.keyword;
      if (this.multi && (M.test(i) || M.test(e) ? (o = e.replace(M, "|").split("|"), h = i.replace(M, "|").split("|")) : c && (o = [e], h = [i])), h) {
        for (l = h.length > o.length ? h.length : o.length, a = 0; l > a; a++) e = o[a] = o[a] || this.dflt, i = h[a] = h[a] || this.dflt, c && (_ = e.indexOf(c), u = i.indexOf(c), _ !== u && (-1 === u ? o[a] = o[a].split(c).join("") : -1 === _ && (o[a] += " " + c)));
        e = o.join(", "), i = h.join(", ")
      }
      return de(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
    }, l.parse = function (t, e, i, s, n, a) {
      return this.parseComplex(t.style, this.format(Q(t, this.p, r, !1, this.dflt)), this.format(e), n, a)
    }, a.registerSpecialProp = function (t, e, i) {
      ye(t, {
        parser: function (t, s, r, n, a, o) {
          var h = new pe(t, r, 0, 0, a, 2, r, !1, i);
          return h.plugin = o, h.setRatio = e(t, s, n._tween, r), h
        },
        priority: i
      })
    }, a.useSVGTransformAttr = c || f;
    var xe, we = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
        be = W("transform"),
        Pe = V + "transform",
        ke = W("transformOrigin"),
        Se = null !== W("perspective"),
        Re = B.Transform = function () {
        this.perspective = parseFloat(a.defaultTransformPerspective) || 0, this.force3D = a.defaultForce3D !== !1 && Se ? a.defaultForce3D || "auto" : !1
        },
        Oe = window.SVGElement,
        Ae = function (t, e, i) {
        var s, r = N.createElementNS("http://www.w3.org/2000/svg", t),
            n = /([a-z])([A-Z])/g;
        for (s in i) r.setAttributeNS(null, s.replace(n, "$1-$2").toLowerCase(), i[s]);
        return e.appendChild(r), r
        },
        Ce = N.documentElement,
        De = function () {
        var t, e, i, s = m || /Android/i.test(Y) && !window.chrome;
        return N.createElementNS && !s && (t = Ae("svg", Ce), e = Ae("rect", t, {
          width: 100,
          height: 50,
          x: 100
        }), i = e.getBoundingClientRect().width, e.style[ke] = "50% 50%", e.style[be] = "scaleX(0.5)", s = i === e.getBoundingClientRect().width && !(f && Se), Ce.removeChild(t)), s
        }(),
        Me = function (t, e, i, s, r) {
        var n, o, h, l, _, u, c, f, p, m, d, g, v, y, T = t._gsTransform,
            x = Fe(t, !0);
        T && (v = T.xOrigin, y = T.yOrigin), (!s || 2 > (n = s.split(" ")).length) && (c = t.getBBox(), e = se(e).split(" "), n = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * c.width : parseFloat(e[0])) + c.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * c.height : parseFloat(e[1])) + c.y]), i.xOrigin = l = parseFloat(n[0]), i.yOrigin = _ = parseFloat(n[1]), s && x !== Ie && (u = x[0], c = x[1], f = x[2], p = x[3], m = x[4], d = x[5], g = u * p - c * f, o = l * (p / g) + _ * (-f / g) + (f * d - p * m) / g, h = l * (-c / g) + _ * (u / g) - (u * d - c * m) / g, l = i.xOrigin = n[0] = o, _ = i.yOrigin = n[1] = h), T && (r || r !== !1 && a.defaultSmoothOrigin !== !1 ? (o = l - v, h = _ - y, T.xOffset += o * x[0] + h * x[2] - o, T.yOffset += o * x[1] + h * x[3] - h) : T.xOffset = T.yOffset = 0), t.setAttribute("data-svg-origin", n.join(" "))
        },
        ze = function (t) {
        return !!(Oe && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
        },
        Ie = [1, 0, 0, 1, 0, 0],
        Fe = function (t, e) {
        var i, s, r, n, a, o = t._gsTransform || new Re,
            h = 1e5;
        if (be ? s = Q(t, Pe, null, !0) : t.currentStyle && (s = t.currentStyle.filter.match(C), s = s && 4 === s.length ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), o.x || 0, o.y || 0].join(",") : ""), i = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s, (o.svg || t.getBBox && ze(t)) && (i && -1 !== (t.style[be] + "").indexOf("matrix") && (s = t.style[be], i = 0), r = t.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (s = r, i = 0) : -1 !== r.indexOf("translate") && (s = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Ie;
        for (r = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], ge = r.length; --ge > -1;) n = Number(r[ge]), r[ge] = (a = n - (n |= 0)) ? (0 | a * h + (0 > a ? -.5 : .5)) / h + n : n;
        return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
        },
        Ne = B.getTransform = function (t, i, s, n) {
        if (t._gsTransform && s && !n) return t._gsTransform;
        var o, h, l, _, u, c, f = s ? t._gsTransform || new Re : new Re,
            p = 0 > f.scaleX,
            m = 2e-5,
            d = 1e5,
            g = Se ? parseFloat(Q(t, ke, i, !1, "0 0 0").split(" ")[2]) || f.zOrigin || 0 : 0,
            v = parseFloat(a.defaultTransformPerspective) || 0;
        if (f.svg = !(!t.getBBox || !ze(t)), f.svg && (Me(t, Q(t, ke, r, !1, "50% 50%") + "", f, t.getAttribute("data-svg-origin")), xe = a.useSVGTransformAttr || De), o = Fe(t), o !== Ie) {
          if (16 === o.length) {
            var y, T, x, w, b, P = o[0],
                k = o[1],
                S = o[2],
                R = o[3],
                O = o[4],
                A = o[5],
                C = o[6],
                D = o[7],
                M = o[8],
                z = o[9],
                F = o[10],
                N = o[12],
                E = o[13],
                L = o[14],
                X = o[11],
                B = Math.atan2(C, F);
            f.zOrigin && (L = -f.zOrigin, N = M * L - o[12], E = z * L - o[13], L = F * L + f.zOrigin - o[14]), f.rotationX = B * I, B && (w = Math.cos(-B), b = Math.sin(-B), y = O * w + M * b, T = A * w + z * b, x = C * w + F * b, M = O * -b + M * w, z = A * -b + z * w, F = C * -b + F * w, X = D * -b + X * w, O = y, A = T, C = x), B = Math.atan2(M, F), f.rotationY = B * I, B && (w = Math.cos(-B), b = Math.sin(-B), y = P * w - M * b, T = k * w - z * b, x = S * w - F * b, z = k * b + z * w, F = S * b + F * w, X = R * b + X * w, P = y, k = T, S = x), B = Math.atan2(k, P), f.rotation = B * I, B && (w = Math.cos(-B), b = Math.sin(-B), P = P * w + O * b, T = k * w + A * b, A = k * -b + A * w, C = S * -b + C * w, k = T), f.rotationX && Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 && (f.rotationX = f.rotation = 0, f.rotationY += 180), f.scaleX = (0 | Math.sqrt(P * P + k * k) * d + .5) / d, f.scaleY = (0 | Math.sqrt(A * A + z * z) * d + .5) / d, f.scaleZ = (0 | Math.sqrt(C * C + F * F) * d + .5) / d, f.skewX = 0, f.perspective = X ? 1 / (0 > X ? -X : X) : 0, f.x = N, f.y = E, f.z = L, f.svg && (f.x -= f.xOrigin - (f.xOrigin * P - f.yOrigin * O), f.y -= f.yOrigin - (f.yOrigin * k - f.xOrigin * A))
          } else if (!(Se && !n && o.length && f.x === o[4] && f.y === o[5] && (f.rotationX || f.rotationY) || void 0 !== f.x && "none" === Q(t, "display", i))) {
            var Y = o.length >= 6,
                j = Y ? o[0] : 1,
                U = o[1] || 0,
                q = o[2] || 0,
                V = Y ? o[3] : 1;
            f.x = o[4] || 0, f.y = o[5] || 0, l = Math.sqrt(j * j + U * U), _ = Math.sqrt(V * V + q * q), u = j || U ? Math.atan2(U, j) * I : f.rotation || 0, c = q || V ? Math.atan2(q, V) * I + u : f.skewX || 0, Math.abs(c) > 90 && 270 > Math.abs(c) && (p ? (l *= -1, c += 0 >= u ? 180 : -180, u += 0 >= u ? 180 : -180) : (_ *= -1, c += 0 >= c ? 180 : -180)), f.scaleX = l, f.scaleY = _, f.rotation = u, f.skewX = c, Se && (f.rotationX = f.rotationY = f.z = 0, f.perspective = v, f.scaleZ = 1), f.svg && (f.x -= f.xOrigin - (f.xOrigin * j + f.yOrigin * q), f.y -= f.yOrigin - (f.xOrigin * U + f.yOrigin * V))
          }
          f.zOrigin = g;
          for (h in f) m > f[h] && f[h] > -m && (f[h] = 0)
        }
        return s && (t._gsTransform = f, f.svg && (xe && t.style[be] ? e.delayedCall(.001, function () {
          Be(t.style, be)
        }) : !xe && t.getAttribute("transform") && e.delayedCall(.001, function () {
          t.removeAttribute("transform")
        }))), f
        },
        Ee = function (t) {
        var e, i, s = this.data,
            r = -s.rotation * z,
            n = r + s.skewX * z,
            a = 1e5,
            o = (0 | Math.cos(r) * s.scaleX * a) / a,
            h = (0 | Math.sin(r) * s.scaleX * a) / a,
            l = (0 | Math.sin(n) * -s.scaleY * a) / a,
            _ = (0 | Math.cos(n) * s.scaleY * a) / a,
            u = this.t.style,
            c = this.t.currentStyle;
        if (c) {
          i = h, h = -l, l = -i, e = c.filter, u.filter = "";
          var f, p, d = this.t.offsetWidth,
              g = this.t.offsetHeight,
              v = "absolute" !== c.position,
              y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + h + ", M21=" + l + ", M22=" + _,
              w = s.x + d * s.xPercent / 100,
              b = s.y + g * s.yPercent / 100;
          if (null != s.ox && (f = (s.oxp ? .01 * d * s.ox : s.ox) - d / 2, p = (s.oyp ? .01 * g * s.oy : s.oy) - g / 2, w += f - (f * o + p * h), b += p - (f * l + p * _)), v ? (f = d / 2, p = g / 2, y += ", Dx=" + (f - (f * o + p * h) + w) + ", Dy=" + (p - (f * l + p * _) + b) + ")") : y += ", sizingMethod='auto expand')", u.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(D, y) : y + " " + e, (0 === t || 1 === t) && 1 === o && 0 === h && 0 === l && 1 === _ && (v && -1 === y.indexOf("Dx=0, Dy=0") || x.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && u.removeAttribute("filter")), !v) {
            var P, k, S, R = 8 > m ? 1 : -1;
            for (f = s.ieOffsetX || 0, p = s.ieOffsetY || 0, s.ieOffsetX = Math.round((d - ((0 > o ? -o : o) * d + (0 > h ? -h : h) * g)) / 2 + w), s.ieOffsetY = Math.round((g - ((0 > _ ? -_ : _) * g + (0 > l ? -l : l) * d)) / 2 + b), ge = 0; 4 > ge; ge++) k = ee[ge], P = c[k], i = -1 !== P.indexOf("px") ? parseFloat(P) : $(this.t, k, parseFloat(P), P.replace(T, "")) || 0, S = i !== s[k] ? 2 > ge ? -s.ieOffsetX : -s.ieOffsetY : 2 > ge ? f - s.ieOffsetX : p - s.ieOffsetY, u[k] = (s[k] = Math.round(i - S * (0 === ge || 2 === ge ? 1 : R))) + "px"
          }
        }
        },
        Le = B.set3DTransformRatio = B.setTransformRatio = function (t) {
        var e, i, s, r, n, a, o, h, l, _, u, c, p, m, d, g, v, y, T, x, w, b, P, k = this.data,
            S = this.t.style,
            R = k.rotation,
            O = k.rotationX,
            A = k.rotationY,
            C = k.scaleX,
            D = k.scaleY,
            M = k.scaleZ,
            I = k.x,
            F = k.y,
            N = k.z,
            E = k.svg,
            L = k.perspective,
            X = k.force3D;
        if (!(((1 !== t && 0 !== t || "auto" !== X || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && X || N || L || A || O) && (!xe || !E) && Se)) return R || k.skewX || E ? (R *= z, b = k.skewX * z, P = 1e5, e = Math.cos(R) * C, r = Math.sin(R) * C, i = Math.sin(R - b) * -D, n = Math.cos(R - b) * D, b && "simple" === k.skewType && (v = Math.tan(b), v = Math.sqrt(1 + v * v), i *= v, n *= v, k.skewY && (e *= v, r *= v)), E && (I += k.xOrigin - (k.xOrigin * e + k.yOrigin * i) + k.xOffset, F += k.yOrigin - (k.xOrigin * r + k.yOrigin * n) + k.yOffset, xe && (k.xPercent || k.yPercent) && (m = this.t.getBBox(), I += .01 * k.xPercent * m.width, F += .01 * k.yPercent * m.height), m = 1e-6, m > I && I > -m && (I = 0), m > F && F > -m && (F = 0)), T = (0 | e * P) / P + "," + (0 | r * P) / P + "," + (0 | i * P) / P + "," + (0 | n * P) / P + "," + I + "," + F + ")", E && xe ? this.t.setAttribute("transform", "matrix(" + T) : S[be] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + T) : S[be] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + C + ",0,0," + D + "," + I + "," + F + ")", void 0;
        if (f && (m = 1e-4, m > C && C > -m && (C = M = 2e-5), m > D && D > -m && (D = M = 2e-5), !L || k.z || k.rotationX || k.rotationY || (L = 0)), R || k.skewX) R *= z, d = e = Math.cos(R), g = r = Math.sin(R), k.skewX && (R -= k.skewX * z, d = Math.cos(R), g = Math.sin(R), "simple" === k.skewType && (v = Math.tan(k.skewX * z), v = Math.sqrt(1 + v * v), d *= v, g *= v, k.skewY && (e *= v, r *= v))), i = -g, n = d;
        else {
          if (!(A || O || 1 !== M || L || E)) return S[be] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) translate3d(" : "translate3d(") + I + "px," + F + "px," + N + "px)" + (1 !== C || 1 !== D ? " scale(" + C + "," + D + ")" : ""), void 0;
          e = n = 1, i = r = 0
        }
        l = 1, s = a = o = h = _ = u = 0, c = L ? -1 / L : 0, p = k.zOrigin, m = 1e-6, x = ",", w = "0", R = A * z, R && (d = Math.cos(R), g = Math.sin(R), o = -g, _ = c * -g, s = e * g, a = r * g, l = d, c *= d, e *= d, r *= d), R = O * z, R && (d = Math.cos(R), g = Math.sin(R), v = i * d + s * g, y = n * d + a * g, h = l * g, u = c * g, s = i * -g + s * d, a = n * -g + a * d, l *= d, c *= d, i = v, n = y), 1 !== M && (s *= M, a *= M, l *= M, c *= M), 1 !== D && (i *= D, n *= D, h *= D, u *= D), 1 !== C && (e *= C, r *= C, o *= C, _ *= C), (p || E) && (p && (I += s * -p, F += a * -p, N += l * -p + p), E && (I += k.xOrigin - (k.xOrigin * e + k.yOrigin * i) + k.xOffset, F += k.yOrigin - (k.xOrigin * r + k.yOrigin * n) + k.yOffset), m > I && I > -m && (I = w), m > F && F > -m && (F = w), m > N && N > -m && (N = 0)), T = k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix3d(" : "matrix3d(", T += (m > e && e > -m ? w : e) + x + (m > r && r > -m ? w : r) + x + (m > o && o > -m ? w : o), T += x + (m > _ && _ > -m ? w : _) + x + (m > i && i > -m ? w : i) + x + (m > n && n > -m ? w : n), O || A ? (T += x + (m > h && h > -m ? w : h) + x + (m > u && u > -m ? w : u) + x + (m > s && s > -m ? w : s), T += x + (m > a && a > -m ? w : a) + x + (m > l && l > -m ? w : l) + x + (m > c && c > -m ? w : c) + x) : T += ",0,0,0,0,1,0,", T += I + x + F + x + N + x + (L ? 1 + -N / L : 1) + ")", S[be] = T
        };
    l = Re.prototype, l.x = l.y = l.z = l.skewX = l.skewY = l.rotation = l.rotationX = l.rotationY = l.zOrigin = l.xPercent = l.yPercent = l.xOffset = l.yOffset = 0, l.scaleX = l.scaleY = l.scaleZ = 1, ye("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
      parser: function (t, e, i, s, n, o, h) {
        if (s._lastParsedTransform === h) return n;
        s._lastParsedTransform = h;
        var l, _, u, c, f, p, m, d, g, v = t._gsTransform,
            y = s._transform = Ne(t, r, !0, h.parseTransform),
            T = t.style,
            x = 1e-6,
            w = we.length,
            b = h,
            P = {},
            k = "transformOrigin";
        if ("string" == typeof b.transform && be) u = L.style, u[be] = b.transform, u.display = "block", u.position = "absolute", N.body.appendChild(L), l = Ne(L, null, !1), N.body.removeChild(L), null != b.xPercent && (l.xPercent = ne(b.xPercent, y.xPercent)), null != b.yPercent && (l.yPercent = ne(b.yPercent, y.yPercent));
        else if ("object" == typeof b) {
          if (l = {
            scaleX: ne(null != b.scaleX ? b.scaleX : b.scale, y.scaleX),
            scaleY: ne(null != b.scaleY ? b.scaleY : b.scale, y.scaleY),
            scaleZ: ne(b.scaleZ, y.scaleZ),
            x: ne(b.x, y.x),
            y: ne(b.y, y.y),
            z: ne(b.z, y.z),
            xPercent: ne(b.xPercent, y.xPercent),
            yPercent: ne(b.yPercent, y.yPercent),
            perspective: ne(b.transformPerspective, y.perspective)
          }, m = b.directionalRotation, null != m) if ("object" == typeof m) for (u in m) b[u] = m[u];
          else b.rotation = m;
          "string" == typeof b.x && -1 !== b.x.indexOf("%") && (l.x = 0, l.xPercent = ne(b.x, y.xPercent)), "string" == typeof b.y && -1 !== b.y.indexOf("%") && (l.y = 0, l.yPercent = ne(b.y, y.yPercent)), l.rotation = ae("rotation" in b ? b.rotation : "shortRotation" in b ? b.shortRotation + "_short" : "rotationZ" in b ? b.rotationZ : y.rotation, y.rotation, "rotation", P), Se && (l.rotationX = ae("rotationX" in b ? b.rotationX : "shortRotationX" in b ? b.shortRotationX + "_short" : y.rotationX || 0, y.rotationX, "rotationX", P), l.rotationY = ae("rotationY" in b ? b.rotationY : "shortRotationY" in b ? b.shortRotationY + "_short" : y.rotationY || 0, y.rotationY, "rotationY", P)), l.skewX = null == b.skewX ? y.skewX : ae(b.skewX, y.skewX), l.skewY = null == b.skewY ? y.skewY : ae(b.skewY, y.skewY), (_ = l.skewY - y.skewY) && (l.skewX += _, l.rotation += _)
        }
        for (Se && null != b.force3D && (y.force3D = b.force3D, p = !0), y.skewType = b.skewType || y.skewType || a.defaultSkewType, f = y.force3D || y.z || y.rotationX || y.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, f || null == b.scale || (l.scaleZ = 1); --w > -1;) i = we[w], c = l[i] - y[i], (c > x || -x > c || null != b[i] || null != F[i]) && (p = !0, n = new pe(y, i, y[i], c, n), i in P && (n.e = P[i]), n.xs0 = 0, n.plugin = o, s._overwriteProps.push(n.n));
        return c = b.transformOrigin, y.svg && (c || b.svgOrigin) && (d = y.xOffset, g = y.yOffset, Me(t, se(c), l, b.svgOrigin, b.smoothOrigin), n = me(y, "xOrigin", (v ? y : l).xOrigin, l.xOrigin, n, k), n = me(y, "yOrigin", (v ? y : l).yOrigin, l.yOrigin, n, k), (d !== y.xOffset || g !== y.yOffset) && (n = me(y, "xOffset", v ? d : y.xOffset, y.xOffset, n, k), n = me(y, "yOffset", v ? g : y.yOffset, y.yOffset, n, k)), c = xe ? null : "0px 0px"), (c || Se && f && y.zOrigin) && (be ? (p = !0, i = ke, c = (c || Q(t, i, r, !1, "50% 50%")) + "", n = new pe(T, i, 0, 0, n, -1, k), n.b = T[i], n.plugin = o, Se ? (u = y.zOrigin, c = c.split(" "), y.zOrigin = (c.length > 2 && (0 === u || "0px" !== c[2]) ? parseFloat(c[2]) : u) || 0, n.xs0 = n.e = c[0] + " " + (c[1] || "50%") + " 0px", n = new pe(y, "zOrigin", 0, 0, n, -1, n.n), n.b = u, n.xs0 = n.e = y.zOrigin) : n.xs0 = n.e = c) : se(c + "", y)), p && (s._transformType = y.svg && xe || !f && 3 !== this._transformType ? 2 : 3), n
      },
      prefix: !0
    }), ye("boxShadow", {
      defaultValue: "0px 0px 0px 0px #999",
      prefix: !0,
      color: !0,
      multi: !0,
      keyword: "inset"
    }), ye("borderRadius", {
      defaultValue: "0px",
      parser: function (t, e, i, n, a) {
        e = this.format(e);
        var o, h, l, _, u, c, f, p, m, d, g, v, y, T, x, w, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
            P = t.style;
        for (m = parseFloat(t.offsetWidth), d = parseFloat(t.offsetHeight), o = e.split(" "), h = 0; b.length > h; h++) this.p.indexOf("border") && (b[h] = W(b[h])), u = _ = Q(t, b[h], r, !1, "0px"), -1 !== u.indexOf(" ") && (_ = u.split(" "), u = _[0], _ = _[1]), c = l = o[h], f = parseFloat(u), v = u.substr((f + "").length), y = "=" === c.charAt(1), y ? (p = parseInt(c.charAt(0) + "1", 10), c = c.substr(2), p *= parseFloat(c), g = c.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(c), g = c.substr((p + "").length)), "" === g && (g = s[i] || v), g !== v && (T = $(t, "borderLeft", f, v), x = $(t, "borderTop", f, v), "%" === g ? (u = 100 * (T / m) + "%", _ = 100 * (x / d) + "%") : "em" === g ? (w = $(t, "borderLeft", 1, "em"), u = T / w + "em", _ = x / w + "em") : (u = T + "px", _ = x + "px"), y && (c = parseFloat(u) + p + g, l = parseFloat(_) + p + g)), a = de(P, b[h], u + " " + _, c + " " + l, !1, "0px", a);
        return a
      },
      prefix: !0,
      formatter: ue("0px 0px 0px 0px", !1, !0)
    }), ye("backgroundPosition", {
      defaultValue: "0 0",
      parser: function (t, e, i, s, n, a) {
        var o, h, l, _, u, c, f = "background-position",
            p = r || Z(t, null),
            d = this.format((p ? m ? p.getPropertyValue(f + "-x") + " " + p.getPropertyValue(f + "-y") : p.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
            g = this.format(e);
        if (-1 !== d.indexOf("%") != (-1 !== g.indexOf("%")) && (c = Q(t, "backgroundImage").replace(R, ""), c && "none" !== c)) {
          for (o = d.split(" "), h = g.split(" "), X.setAttribute("src", c), l = 2; --l > -1;) d = o[l], _ = -1 !== d.indexOf("%"), _ !== (-1 !== h[l].indexOf("%")) && (u = 0 === l ? t.offsetWidth - X.width : t.offsetHeight - X.height, o[l] = _ ? parseFloat(d) / 100 * u + "px" : 100 * (parseFloat(d) / u) + "%");
          d = o.join(" ")
        }
        return this.parseComplex(t.style, d, g, n, a)
      },
      formatter: se
    }), ye("backgroundSize", {
      defaultValue: "0 0",
      formatter: se
    }), ye("perspective", {
      defaultValue: "0px",
      prefix: !0
    }), ye("perspectiveOrigin", {
      defaultValue: "50% 50%",
      prefix: !0
    }), ye("transformStyle", {
      prefix: !0
    }), ye("backfaceVisibility", {
      prefix: !0
    }), ye("userSelect", {
      prefix: !0
    }), ye("margin", {
      parser: ce("marginTop,marginRight,marginBottom,marginLeft")
    }), ye("padding", {
      parser: ce("paddingTop,paddingRight,paddingBottom,paddingLeft")
    }), ye("clip", {
      defaultValue: "rect(0px,0px,0px,0px)",
      parser: function (t, e, i, s, n, a) {
        var o, h, l;
        return 9 > m ? (h = t.currentStyle, l = 8 > m ? " " : ",", o = "rect(" + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ")", e = this.format(e).split(",").join(l)) : (o = this.format(Q(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
      }
    }), ye("textShadow", {
      defaultValue: "0px 0px 0px #999",
      color: !0,
      multi: !0
    }), ye("autoRound,strictUnits", {
      parser: function (t, e, i, s, r) {
        return r
      }
    }), ye("border", {
      defaultValue: "0px solid #000",
      parser: function (t, e, i, s, n, a) {
        return this.parseComplex(t.style, this.format(Q(t, "borderTopWidth", r, !1, "0px") + " " + Q(t, "borderTopStyle", r, !1, "solid") + " " + Q(t, "borderTopColor", r, !1, "#000")), this.format(e), n, a)
      },
      color: !0,
      formatter: function (t) {
        var e = t.split(" ");
        return e[0] + " " + (e[1] || "solid") + " " + (t.match(_e) || ["#000"])[0]
      }
    }), ye("borderWidth", {
      parser: ce("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
    }), ye("float,cssFloat,styleFloat", {
      parser: function (t, e, i, s, r) {
        var n = t.style,
            a = "cssFloat" in n ? "cssFloat" : "styleFloat";
        return new pe(n, a, 0, 0, r, -1, i, !1, 0, n[a], e)
      }
    });
    var Xe = function (t) {
      var e, i = this.t,
          s = i.filter || Q(this.data, "filter") || "",
          r = 0 | this.s + this.c * t;
      100 === r && (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") && -1 === s.indexOf("oader(") ? (i.removeAttribute("filter"), e = !Q(this.data, "filter")) : (i.filter = s.replace(b, ""), e = !0)), e || (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"), -1 === s.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = s + " alpha(opacity=" + r + ")") : i.filter = s.replace(x, "opacity=" + r))
    };
    ye("opacity,alpha,autoAlpha", {
      defaultValue: "1",
      parser: function (t, e, i, s, n, a) {
        var o = parseFloat(Q(t, "opacity", r, !1, "1")),
            h = t.style,
            l = "autoAlpha" === i;
        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), l && 1 === o && "hidden" === Q(t, "visibility", r) && 0 !== e && (o = 0), j ? n = new pe(h, "opacity", o, e - o, n) : (n = new pe(h, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = l ? 1 : 0, h.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Xe), l && (n = new pe(h, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", s._overwriteProps.push(n.n), s._overwriteProps.push(i)), n
      }
    });
    var Be = function (t, e) {
      e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(k, "-$1").toLowerCase())) : t.removeAttribute(e))
    },
        Ye = function (t) {
        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
          this.t.setAttribute("class", 0 === t ? this.b : this.e);
          for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Be(i, e.p), e = e._next;
          1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
    ye("className", {
      parser: function (t, e, s, n, a, o, h) {
        var l, _, u, c, f, p = t.getAttribute("class") || "",
            m = t.style.cssText;
        if (a = n._classNamePT = new pe(t, s, 0, 0, a, 2), a.setRatio = Ye, a.pr = -11, i = !0, a.b = p, _ = K(t, r), u = t._gsClassPT) {
          for (c = {}, f = u.data; f;) c[f.p] = 1, f = f._next;
          u.setRatio(1)
        }
        return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : p.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", a.e), l = J(t, _, K(t), h, c), t.setAttribute("class", p), a.data = l.firstMPT, t.style.cssText = m, a = a.xfirst = n.parse(t, l.difs, a, o)
      }
    });
    var je = function (t) {
      if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
        var e, i, s, r, n, a = this.t.style,
            o = h.transform.parse;
        if ("all" === this.e) a.cssText = "", r = !0;
        else for (e = this.e.split(" ").join("").split(","), s = e.length; --s > -1;) i = e[s], h[i] && (h[i].parse === o ? r = !0 : i = "transformOrigin" === i ? ke : h[i].p), Be(a, i);
        r && (Be(a, be), n = this.t._gsTransform, n && (n.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform))
      }
    };
    for (ye("clearProps", {
      parser: function (t, e, s, r, n) {
        return n = new pe(t, s, 0, 0, n, 2), n.setRatio = je, n.e = e, n.pr = -10, n.data = r._tween, i = !0, n
      }
    }), l = "bezier,throwProps,physicsProps,physics2D".split(","), ge = l.length; ge--;) Te(l[ge]);
    l = a.prototype, l._firstPT = l._lastParsedTransform = l._transform = null, l._onInitTween = function (t, e, o) {
      if (!t.nodeType) return !1;
      this._target = t, this._tween = o, this._vars = e, _ = e.autoRound, i = !1, s = e.suffixMap || a.suffixMap, r = Z(t, ""), n = this._overwriteProps;
      var l, f, m, d, g, v, y, T, x, b = t.style;
      if (u && "" === b.zIndex && (l = Q(t, "zIndex", r), ("auto" === l || "" === l) && this._addLazySet(b, "zIndex", 0)), "string" == typeof e && (d = b.cssText, l = K(t, r), b.cssText = d + ";" + e, l = J(t, l, K(t)).difs, !j && w.test(e) && (l.opacity = parseFloat(RegExp.$1)), e = l, b.cssText = d), this._firstPT = f = e.className ? h.className.parse(t, e.className, "className", this, null, null, e) : this.parse(t, e, null), this._transformType) {
        for (x = 3 === this._transformType, be ? c && (u = !0, "" === b.zIndex && (y = Q(t, "zIndex", r), ("auto" === y || "" === y) && this._addLazySet(b, "zIndex", 0)), p && this._addLazySet(b, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (x ? "visible" : "hidden"))) : b.zoom = 1, m = f; m && m._next;) m = m._next;
        T = new pe(t, "transform", 0, 0, null, 2), this._linkCSSP(T, null, m), T.setRatio = be ? Le : Ee, T.data = this._transform || Ne(t, r, !0), T.tween = o, T.pr = -1, n.pop()
      }
      if (i) {
        for (; f;) {
          for (v = f._next, m = d; m && m.pr > f.pr;) m = m._next;
          (f._prev = m ? m._prev : g) ? f._prev._next = f : d = f, (f._next = m) ? m._prev = f : g = f, f = v
        }
        this._firstPT = d
      }
      return !0
    }, l.parse = function (t, e, i, n) {
      var a, o, l, u, c, f, p, m, d, g, v = t.style;
      for (a in e) f = e[a], o = h[a], o ? i = o.parse(t, f, a, this, i, n, e) : (c = Q(t, a, r) + "", d = "string" == typeof f, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || d && P.test(f) ? (d || (f = le(f), f = (f.length > 3 ? "rgba(" : "rgb(") + f.join(",") + ")"), i = de(v, a, c, f, !0, "transparent", i, 0, n)) : !d || -1 === f.indexOf(" ") && -1 === f.indexOf(",") ? (l = parseFloat(c), p = l || 0 === l ? c.substr((l + "").length) : "", ("" === c || "auto" === c) && ("width" === a || "height" === a ? (l = ie(t, a, r), p = "px") : "left" === a || "top" === a ? (l = H(t, a, r), p = "px") : (l = "opacity" !== a ? 0 : 1, p = "")), g = d && "=" === f.charAt(1), g ? (u = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), u *= parseFloat(f), m = f.replace(T, "")) : (u = parseFloat(f), m = d ? f.replace(T, "") : ""), "" === m && (m = a in s ? s[a] : p), f = u || 0 === u ? (g ? u + l : u) + m : e[a], p !== m && "" !== m && (u || 0 === u) && l && (l = $(t, a, l, p), "%" === m ? (l /= $(t, a, 100, "%") / 100, e.strictUnits !== !0 && (c = l + "%")) : "em" === m ? l /= $(t, a, 1, "em") : "px" !== m && (u = $(t, a, u, m), m = "px"), g && (u || 0 === u) && (f = u + l + m)), g && (u += l), !l && 0 !== l || !u && 0 !== u ? void 0 !== v[a] && (f || "NaN" != f + "" && null != f) ? (i = new pe(v, a, u || l || 0, 0, i, -1, a, !1, 0, c, f), i.xs0 = "none" !== f || "display" !== a && -1 === a.indexOf("Style") ? f : c) : q("invalid " + a + " tween value: " + e[a]) : (i = new pe(v, a, l, u - l, i, 0, a, _ !== !1 && ("px" === m || "zIndex" === a), 0, c, f), i.xs0 = m)) : i = de(v, a, c, f, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
      return i
    }, l.setRatio = function (t) {
      var e, i, s, r = this._firstPT,
          n = 1e-6;
      if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (; r;) {
        if (e = r.c * t + r.s, r.r ? e = Math.round(e) : n > e && e > -n && (e = 0), r.type) if (1 === r.type) if (s = r.l, 2 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
        else if (3 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
        else if (4 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
        else if (5 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
        else {
          for (i = r.xs0 + e + r.xs1, s = 1; r.l > s; s++) i += r["xn" + s] + r["xs" + (s + 1)];
          r.t[r.p] = i
        } else - 1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
        else r.t[r.p] = e + r.xs0;
        r = r._next
      } else for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
      else for (; r;) {
        if (2 !== r.type) if (r.r && -1 !== r.type) if (e = Math.round(r.s + r.c), r.type) {
          if (1 === r.type) {
            for (s = r.l, i = r.xs0 + e + r.xs1, s = 1; r.l > s; s++) i += r["xn" + s] + r["xs" + (s + 1)];
            r.t[r.p] = i
          }
        } else r.t[r.p] = e + r.xs0;
        else r.t[r.p] = r.e;
        else r.setRatio(t);
        r = r._next
      }
    }, l._enableTransforms = function (t) {
      this._transform = this._transform || Ne(this._target, r, !0), this._transformType = this._transform.svg && xe || !t && 3 !== this._transformType ? 2 : 3
    };
    var Ue = function () {
      this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
    };
    l._addLazySet = function (t, e, i) {
      var s = this._firstPT = new pe(t, e, 0, 0, this._firstPT, 2);
      s.e = i, s.setRatio = Ue, s.data = this
    }, l._linkCSSP = function (t, e, i, s) {
      return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, s = !0), i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
    }, l._kill = function (e) {
      var i, s, r, n = e;
      if (e.autoAlpha || e.alpha) {
        n = {};
        for (s in e) n[s] = e[s];
        n.opacity = 1, n.autoAlpha && (n.visibility = 1)
      }
      return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
    };
    var qe = function (t, e, i) {
      var s, r, n, a;
      if (t.slice) for (r = t.length; --r > -1;) qe(t[r], e, i);
      else for (s = t.childNodes, r = s.length; --r > -1;) n = s[r], a = n.type, n.style && (e.push(K(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || qe(n, e, i)
    };
    return a.cascadeTo = function (t, i, s) {
      var r, n, a, o, h = e.to(t, i, s),
          l = [h],
          _ = [],
          u = [],
          c = [],
          f = e._internals.reservedProps;
      for (t = h._targets || h.target, qe(t, _, c), h.render(i, !0, !0), qe(t, u), h.render(0, !0, !0), h._enabled(!0), r = c.length; --r > -1;) if (n = J(c[r], _[r], u[r]), n.firstMPT) {
        n = n.difs;
        for (a in s) f[a] && (n[a] = s[a]);
        o = {};
        for (a in n) o[a] = _[r][a];
        l.push(e.fromTo(c[r], i, o, n))
      }
      return l
    }, t.activate([a]), a
  }, !0), function () {
    var t = _gsScope._gsDefine.plugin({
      propName: "roundProps",
      priority: -1,
      API: 2,
      init: function (t, e, i) {
        return this._tween = i, !0
      }
    }),
        e = t.prototype;
    e._onInitAllProps = function () {
      for (var t, e, i, s = this._tween, r = s.vars.roundProps instanceof Array ? s.vars.roundProps : s.vars.roundProps.split(","), n = r.length, a = {}, o = s._propLookup.roundProps; --n > -1;) a[r[n]] = 1;
      for (n = r.length; --n > -1;) for (t = r[n], e = s._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(a, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : s._firstPT === e && (s._firstPT = i), e._next = e._prev = null, s._propLookup[t] = o), e = i;
      return !1
    }, e._add = function (t, e, i, s) {
      this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e)
    }
  }(), function () {
    var t = /(?:\d|\-|\+|=|#|\.)*/g,
        e = /[A-Za-z%]/g;
    _gsScope._gsDefine.plugin({
      propName: "attr",
      API: 2,
      version: "0.4.0",
      init: function (i, s) {
        var r, n, a, o, h;
        if ("function" != typeof i.setAttribute) return !1;
        this._target = i, this._proxy = {}, this._start = {}, this._end = {}, this._suffix = {};
        for (r in s) this._start[r] = this._proxy[r] = n = i.getAttribute(r) + "", this._end[r] = a = s[r] + "", this._suffix[r] = o = e.test(a) ? a.replace(t, "") : e.test(n) ? n.replace(t, "") : "", o && (h = a.indexOf(o), -1 !== h && (a = a.substr(0, h))), this._addTween(this._proxy, r, parseFloat(n), a, r) || (this._suffix[r] = ""), "=" === a.charAt(1) && (this._end[r] = this._firstPT.s + this._firstPT.c + o), this._overwriteProps.push(r);
        return !0
      },
      set: function (t) {
        this._super.setRatio.call(this, t);
        for (var e, i = this._overwriteProps, s = i.length, r = 1 === t ? this._end : t ? this._proxy : this._start, n = r === this._proxy; --s > -1;) e = i[s], this._target.setAttribute(e, r[e] + (n ? this._suffix[e] : ""))
      }
    })
  }(), _gsScope._gsDefine.plugin({
    propName: "directionalRotation",
    version: "0.2.1",
    API: 2,
    init: function (t, e) {
      "object" != typeof e && (e = {
        rotation: e
      }), this.finals = {};
      var i, s, r, n, a, o, h = e.useRadians === !0 ? 2 * Math.PI : 360,
          l = 1e-6;
      for (i in e)"useRadians" !== i && (o = (e[i] + "").split("_"), s = o[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), n = this.finals[i] = "string" == typeof s && "=" === s.charAt(1) ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, a = n - r, o.length && (s = o.join("_"), -1 !== s.indexOf("short") && (a %= h, a !== a % (h / 2) && (a = 0 > a ? a + h : a - h)), -1 !== s.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * h) % h - (0 | a / h) * h : -1 !== s.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * h) % h - (0 | a / h) * h)), (a > l || -l > a) && (this._addTween(t, i, r, r + a, i), this._overwriteProps.push(i)));
      return !0
    },
    set: function (t) {
      var e;
      if (1 !== t) this._super.setRatio.call(this, t);
      else for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
    }
  })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (t) {
    var e, i, s, r = _gsScope.GreenSockGlobals || _gsScope,
        n = r.com.greensock,
        a = 2 * Math.PI,
        o = Math.PI / 2,
        h = n._class,
        l = function (e, i) {
        var s = h("easing." + e, function () {}, !0),
            r = s.prototype = new t;
        return r.constructor = s, r.getRatio = i, s
        },
        _ = t.register ||
        function () {},
        u = function (t, e, i, s) {
        var r = h("easing." + t, {
          easeOut: new e,
          easeIn: new i,
          easeInOut: new s
        }, !0);
        return _(r, t), r
        },
        c = function (t, e, i) {
        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
        },
        f = function (e, i) {
        var s = h("easing." + e, function (t) {
          this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
        }, !0),
            r = s.prototype = new t;
        return r.constructor = s, r.getRatio = i, r.config = function (t) {
          return new s(t)
        }, s
        },
        p = u("Back", f("BackOut", function (t) {
        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
      }), f("BackIn", function (t) {
        return t * t * ((this._p1 + 1) * t - this._p1)
      }), f("BackInOut", function (t) {
        return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
      })),
        m = h("easing.SlowMo", function (t, e, i) {
        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
      }, !0),
        d = m.prototype = new t;
    return d.constructor = m, d.getRatio = function (t) {
      var e = t + (.5 - t) * this._p;
      return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
    }, m.ease = new m(.7, .7), d.config = m.config = function (t, e, i) {
      return new m(t, e, i)
    }, e = h("easing.SteppedEase", function (t) {
      t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
    }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function (t) {
      return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
    }, d.config = e.config = function (t) {
      return new e(t)
    }, i = h("easing.RoughEase", function (e) {
      e = e || {};
      for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), f = u, p = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = p ? Math.random() : 1 / u * f, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), p ? s += Math.random() * r - .5 * r : f % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
        x: i,
        y: s
      };
      for (l.sort(function (t, e) {
        return t.x - e.x
      }), o = new c(1, 1, null), f = u; --f > -1;) a = l[f], o = new c(a.x, a.y, o);
      this._prev = new c(0, 0, 0 !== o.t ? o : o.next)
    }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function (t) {
      var e = this._prev;
      if (t > e.t) {
        for (; e.next && t >= e.t;) e = e.next;
        e = e.prev
      } else for (; e.prev && e.t >= t;) e = e.prev;
      return this._prev = e, e.v + (t - e.t) / e.gap * e.c
    }, d.config = function (t) {
      return new i(t)
    }, i.ease = new i, u("Bounce", l("BounceOut", function (t) {
      return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    }), l("BounceIn", function (t) {
      return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
    }), l("BounceInOut", function (t) {
      var e = .5 > t;
      return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
    })), u("Circ", l("CircOut", function (t) {
      return Math.sqrt(1 - (t -= 1) * t)
    }), l("CircIn", function (t) {
      return -(Math.sqrt(1 - t * t) - 1)
    }), l("CircInOut", function (t) {
      return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
    })), s = function (e, i, s) {
      var r = h("easing." + e, function (t, e) {
        this._p1 = t >= 1 ? t : 1, this._p2 = (e || s) / (1 > t ? t : 1), this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0), this._p2 = a / this._p2
      }, !0),
          n = r.prototype = new t;
      return n.constructor = r, n.getRatio = i, n.config = function (t, e) {
        return new r(t, e)
      }, r
    }, u("Elastic", s("ElasticOut", function (t) {
      return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
    }, .3), s("ElasticIn", function (t) {
      return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2))
    }, .3), s("ElasticInOut", function (t) {
      return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) + 1
    }, .45)), u("Expo", l("ExpoOut", function (t) {
      return 1 - Math.pow(2, -10 * t)
    }), l("ExpoIn", function (t) {
      return Math.pow(2, 10 * (t - 1)) - .001
    }), l("ExpoInOut", function (t) {
      return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
    })), u("Sine", l("SineOut", function (t) {
      return Math.sin(t * o)
    }), l("SineIn", function (t) {
      return -Math.cos(t * o) + 1
    }), l("SineInOut", function (t) {
      return -.5 * (Math.cos(Math.PI * t) - 1)
    })), h("easing.EaseLookup", {
      find: function (e) {
        return t.map[e]
      }
    }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), p
  }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (t, e) {
  "use strict";
  var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
  if (!i.TweenLite) {
    var s, r, n, a, o, h = function (t) {
      var e, s = t.split("."),
          r = i;
      for (e = 0; s.length > e; e++) r[s[e]] = r = r[s[e]] || {};
      return r
    },
        l = h("com.greensock"),
        _ = 1e-10,
        u = function (t) {
        var e, i = [],
            s = t.length;
        for (e = 0; e !== s; i.push(t[e++]));
        return i
        },
        c = function () {},
        f = function () {
        var t = Object.prototype.toString,
            e = t.call([]);
        return function (i) {
          return null != i && (i instanceof Array || "object" == typeof i && !! i.push && t.call(i) === e)
        }
        }(),
        p = {},
        m = function (s, r, n, a) {
        this.sc = p[s] ? p[s].sc : [], p[s] = this, this.gsClass = null, this.func = n;
        var o = [];
        this.check = function (l) {
          for (var _, u, c, f, d = r.length, g = d; --d > -1;)(_ = p[r[d]] || new m(r[d], [])).gsClass ? (o[d] = _.gsClass, g--) : l && _.sc.push(this);
          if (0 === g && n) for (u = ("com.greensock." + s).split("."), c = u.pop(), f = h(u.join("."))[c] = this.gsClass = n.apply(n, o), a && (i[c] = f, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function () {
            return f
          }) : s === e && "undefined" != typeof module && module.exports && (module.exports = f)), d = 0; this.sc.length > d; d++) this.sc[d].check()
        }, this.check(!0)
        },
        d = t._gsDefine = function (t, e, i, s) {
        return new m(t, e, i, s)
        },
        g = l._class = function (t, e, i) {
        return e = e ||
        function () {}, d(t, [], function () {
          return e
        }, i), e
        };
    d.globals = i;
    var v = [0, 0, 1, 1],
        y = [],
        T = g("easing.Ease", function (t, e, i, s) {
        this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? v.concat(e) : v
      }, !0),
        x = T.map = {},
        w = T.register = function (t, e, i, s) {
        for (var r, n, a, o, h = e.split(","), _ = h.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;) for (n = h[_], r = s ? g("easing." + n, null, !0) : l.easing[n] || {}, a = u.length; --a > -1;) o = u[a], x[n + "." + o] = x[o + n] = r[o] = t.getRatio ? t : t[o] || new t
        };
    for (n = T.prototype, n._calcEnd = !1, n.getRatio = function (t) {
      if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
      var e = this._type,
          i = this._power,
          s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
      return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
    }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = s.length; --r > -1;) n = s[r] + ",Power" + r, w(new T(null, null, 1, r), n, "easeOut", !0), w(new T(null, null, 2, r), n, "easeIn" + (0 === r ? ",easeNone" : "")), w(new T(null, null, 3, r), n, "easeInOut");
    x.linear = l.easing.Linear.easeIn, x.swing = l.easing.Quad.easeInOut;
    var b = g("events.EventDispatcher", function (t) {
      this._listeners = {}, this._eventTarget = t || this
    });
    n = b.prototype, n.addEventListener = function (t, e, i, s, r) {
      r = r || 0;
      var n, h, l = this._listeners[t],
          _ = 0;
      for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1;) n = l[h], n.c === e && n.s === i ? l.splice(h, 1) : 0 === _ && r > n.pr && (_ = h + 1);
      l.splice(_, 0, {
        c: e,
        s: i,
        up: s,
        pr: r
      }), this !== a || o || a.wake()
    }, n.removeEventListener = function (t, e) {
      var i, s = this._listeners[t];
      if (s) for (i = s.length; --i > -1;) if (s[i].c === e) return s.splice(i, 1), void 0
    }, n.dispatchEvent = function (t) {
      var e, i, s, r = this._listeners[t];
      if (r) for (e = r.length, i = this._eventTarget; --e > -1;) s = r[e], s && (s.up ? s.c.call(s.s || i, {
        type: t,
        target: i
      }) : s.c.call(s.s || i))
    };
    var P = t.requestAnimationFrame,
        k = t.cancelAnimationFrame,
        S = Date.now ||
        function () {
        return (new Date).getTime()
        },
        R = S();
    for (s = ["ms", "moz", "webkit", "o"], r = s.length; --r > -1 && !P;) P = t[s[r] + "RequestAnimationFrame"], k = t[s[r] + "CancelAnimationFrame"] || t[s[r] + "CancelRequestAnimationFrame"];
    g("Ticker", function (t, e) {
      var i, s, r, n, h, l = this,
          u = S(),
          f = e !== !1 && P,
          p = 500,
          m = 33,
          d = "tick",
          g = function (t) {
          var e, a, o = S() - R;
          o > p && (u += o - m), R += o, l.time = (R - u) / 1e3, e = l.time - h, (!i || e > 0 || t === !0) && (l.frame++, h += e + (e >= n ? .004 : n - e), a = !0), t !== !0 && (r = s(g)), a && l.dispatchEvent(d)
          };
      b.call(l), l.time = l.frame = 0, l.tick = function () {
        g(!0)
      }, l.lagSmoothing = function (t, e) {
        p = t || 1 / _, m = Math.min(e, p, 0)
      }, l.sleep = function () {
        null != r && (f && k ? k(r) : clearTimeout(r), s = c, r = null, l === a && (o = !1))
      }, l.wake = function () {
        null !== r ? l.sleep() : l.frame > 10 && (R = S() - p + 5), s = 0 === i ? c : f && P ? P : function (t) {
          return setTimeout(t, 0 | 1e3 * (h - l.time) + 1)
        }, l === a && (o = !0), g(2)
      }, l.fps = function (t) {
        return arguments.length ? (i = t, n = 1 / (i || 60), h = this.time + n, l.wake(), void 0) : i
      }, l.useRAF = function (t) {
        return arguments.length ? (l.sleep(), f = t, l.fps(i), void 0) : f
      }, l.fps(t), setTimeout(function () {
        f && 5 > l.frame && l.useRAF(!1)
      }, 1500)
    }), n = l.Ticker.prototype = new l.events.EventDispatcher, n.constructor = l.Ticker;
    var O = g("core.Animation", function (t, e) {
      if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, U) {
        o || a.wake();
        var i = this.vars.useFrames ? j : U;
        i.add(this, i._time), this.vars.paused && this.paused(!0)
      }
    });
    a = O.ticker = new l.Ticker, n = O.prototype, n._dirty = n._gc = n._initted = n._paused = !1, n._totalTime = n._time = 0, n._rawPrevTime = -1, n._next = n._last = n._onUpdate = n._timeline = n.timeline = null, n._paused = !1;
    var A = function () {
      o && S() - R > 2e3 && a.wake(), setTimeout(A, 2e3)
    };
    A(), n.play = function (t, e) {
      return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
    }, n.pause = function (t, e) {
      return null != t && this.seek(t, e), this.paused(!0)
    }, n.resume = function (t, e) {
      return null != t && this.seek(t, e), this.paused(!1)
    }, n.seek = function (t, e) {
      return this.totalTime(Number(t), e !== !1)
    }, n.restart = function (t, e) {
      return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
    }, n.reverse = function (t, e) {
      return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
    }, n.render = function () {}, n.invalidate = function () {
      return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
    }, n.isActive = function () {
      var t, e = this._timeline,
          i = this._startTime;
      return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
    }, n._enabled = function (t, e) {
      return o || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
    }, n._kill = function () {
      return this._enabled(!1, !1)
    }, n.kill = function (t, e) {
      return this._kill(t, e), this
    }, n._uncache = function (t) {
      for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
      return this
    }, n._swapSelfInParams = function (t) {
      for (var e = t.length, i = t.concat(); --e > -1;)"{self}" === t[e] && (i[e] = this);
      return i
    }, n._callback = function (t) {
      var e = this.vars;
      e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || y)
    }, n.eventCallback = function (t, e, i, s) {
      if ("on" === (t || "").substr(0, 2)) {
        var r = this.vars;
        if (1 === arguments.length) return r[t];
        null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = f(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
      }
      return this
    }, n.delay = function (t) {
      return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
    }, n.duration = function (t) {
      return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
    }, n.totalDuration = function (t) {
      return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
    }, n.time = function (t, e) {
      return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
    }, n.totalTime = function (t, e, i) {
      if (o || a.wake(), !arguments.length) return this._totalTime;
      if (this._timeline) {
        if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
          this._dirty && this.totalDuration();
          var s = this._totalDuration,
              r = this._timeline;
          if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline) for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
        }
        this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), I.length && V())
      }
      return this
    }, n.progress = n.totalProgress = function (t, e) {
      return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
    }, n.startTime = function (t) {
      return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
    }, n.endTime = function (t) {
      return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
    }, n.timeScale = function (t) {
      if (!arguments.length) return this._timeScale;
      if (t = t || _, this._timeline && this._timeline.smoothChildTiming) {
        var e = this._pauseTime,
            i = e || 0 === e ? e : this._timeline.totalTime();
        this._startTime = i - (i - this._startTime) * this._timeScale / t
      }
      return this._timeScale = t, this._uncache(!1)
    }, n.reversed = function (t) {
      return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
    }, n.paused = function (t) {
      if (!arguments.length) return this._paused;
      var e, i, s = this._timeline;
      return t != this._paused && s && (o || t || a.wake(), e = s.rawTime(), i = e - this._pauseTime, !t && s.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && this.render(s.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, !0, !0)), this._gc && !t && this._enabled(!0, !1), this
    };
    var C = g("core.SimpleTimeline", function (t) {
      O.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
    });
    n = C.prototype = new O, n.constructor = C, n.kill()._gc = !1, n._first = n._last = n._recent = null, n._sortChildren = !1, n.add = n.insert = function (t, e) {
      var i, s;
      if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren) for (s = t._startTime; i && i._startTime > s;) i = i._prev;
      return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
    }, n._remove = function (t, e) {
      return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
    }, n.render = function (t, e, i) {
      var s, r = this._first;
      for (this._totalTime = this._time = this._rawPrevTime = t; r;) s = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s
    }, n.rawTime = function () {
      return o || a.wake(), this._totalTime
    };
    var D = g("TweenLite", function (e, i, s) {
      if (O.call(this, i, s), this.render = D.prototype.render, null == e) throw "Cannot tween a null target.";
      this.target = e = "string" != typeof e ? e : D.selector(e) || e;
      var r, n, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
          h = this.vars.overwrite;
      if (this._overwrite = h = null == h ? Y[D.defaultOverwrite] : "number" == typeof h ? h >> 0 : Y[h], (o || e instanceof Array || e.push && f(e)) && "number" != typeof e[0]) for (this._targets = a = u(e), this._propLookup = [], this._siblings = [], r = 0; a.length > r; r++) n = a[r], n ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(u(n))) : (this._siblings[r] = G(n, this, !1), 1 === h && this._siblings[r].length > 1 && Z(n, this, null, 1, this._siblings[r])) : (n = a[r--] = D.selector(n), "string" == typeof n && a.splice(r + 1, 1)) : a.splice(r--, 1);
      else this._propLookup = {}, this._siblings = G(e, this, !1), 1 === h && this._siblings.length > 1 && Z(e, this, null, 1, this._siblings);
      (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -_, this.render(-this._delay))
    }, !0),
        M = function (e) {
        return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
        },
        z = function (t, e) {
        var i, s = {};
        for (i in t) B[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!E[i] || E[i] && E[i]._autoCSS) || (s[i] = t[i], delete t[i]);
        t.css = s
        };
    n = D.prototype = new O, n.constructor = D, n.kill()._gc = !1, n.ratio = 0, n._firstPT = n._targets = n._overwrittenProps = n._startAt = null, n._notifyPluginsOfEnabled = n._lazy = !1, D.version = "1.17.0", D.defaultEase = n._ease = new T(null, null, 1, 1), D.defaultOverwrite = "auto", D.ticker = a, D.autoSleep = 120, D.lagSmoothing = function (t, e) {
      a.lagSmoothing(t, e)
    }, D.selector = t.$ || t.jQuery ||
    function (e) {
      var i = t.$ || t.jQuery;
      return i ? (D.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
    };
    var I = [],
        F = {},
        N = D._internals = {
        isArray: f,
        isSelector: M,
        lazyTweens: I
        },
        E = D._plugins = {},
        L = N.tweenLookup = {},
        X = 0,
        B = N.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1
        },
        Y = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        "true": 1,
        "false": 0
        },
        j = O._rootFramesTimeline = new C,
        U = O._rootTimeline = new C,
        q = 30,
        V = N.lazyRender = function () {
        var t, e = I.length;
        for (F = {}; --e > -1;) t = I[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
        I.length = 0
        };
    U._startTime = a.time, j._startTime = a.frame, U._active = j._active = !0, setTimeout(V, 1), O._updateRoot = D.render = function () {
      var t, e, i;
      if (I.length && V(), U.render((a.time - U._startTime) * U._timeScale, !1, !1), j.render((a.frame - j._startTime) * j._timeScale, !1, !1), I.length && V(), a.frame >= q) {
        q = a.frame + (parseInt(D.autoSleep, 10) || 120);
        for (i in L) {
          for (e = L[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
          0 === e.length && delete L[i]
        }
        if (i = U._first, (!i || i._paused) && D.autoSleep && !j._first && 1 === a._listeners.tick.length) {
          for (; i && i._paused;) i = i._next;
          i || a.sleep()
        }
      }
    }, a.addEventListener("tick", O._updateRoot);
    var G = function (t, e, i) {
      var s, r, n = t._gsTweenID;
      if (L[n || (t._gsTweenID = n = "t" + X++)] || (L[n] = {
        target: t,
        tweens: []
      }), e && (s = L[n].tweens, s[r = s.length] = e, i)) for (; --r > -1;) s[r] === e && s.splice(r, 1);
      return L[n].tweens
    },
        W = function (t, e, i, s) {
        var r, n, a = t.vars.onOverwrite;
        return a && (r = a(t, e, i, s)), a = D.onOverwrite, a && (n = a(t, e, i, s)), r !== !1 && n !== !1
        },
        Z = function (t, e, i, s, r) {
        var n, a, o, h;
        if (1 === s || s >= 4) {
          for (h = r.length, n = 0; h > n; n++) if ((o = r[n]) !== e) o._gc || o._kill(null, t, e) && (a = !0);
          else if (5 === s) break;
          return a
        }
        var l, u = e._startTime + _,
            c = [],
            f = 0,
            p = 0 === e._duration;
        for (n = r.length; --n > -1;)(o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (l = l || Q(e, 0, p), 0 === Q(o, l, p) && (c[f++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((p || !o._initted) && 2e-10 >= u - o._startTime || (c[f++] = o)));
        for (n = f; --n > -1;) if (o = c[n], 2 === s && o._kill(i, t, e) && (a = !0), 2 !== s || !o._firstPT && o._initted) {
          if (2 !== s && !W(o, e)) continue;
          o._enabled(!1, !1) && (a = !0)
        }
        return a
        },
        Q = function (t, e, i) {
        for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline;) {
          if (n += s._startTime, r *= s._timeScale, s._paused) return -100;
          s = s._timeline
        }
        return n /= r, n > e ? n - e : i && n === e || !t._initted && 2 * _ > n - e ? _ : (n += t.totalDuration() / t._timeScale / r) > e + _ ? 0 : n - e - _
        };
    n._init = function () {
      var t, e, i, s, r, n = this.vars,
          a = this._overwrittenProps,
          o = this._duration,
          h = !! n.immediateRender,
          l = n.ease;
      if (n.startAt) {
        this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
        for (s in n.startAt) r[s] = n.startAt[s];
        if (r.overwrite = !1, r.immediateRender = !0, r.lazy = h && n.lazy !== !1, r.startAt = r.delay = null, this._startAt = D.to(this.target, 0, r), h) if (this._time > 0) this._startAt = null;
        else if (0 !== o) return
      } else if (n.runBackwards && 0 !== o) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
      else {
        0 !== this._time && (h = !1), i = {};
        for (s in n) B[s] && "autoCSS" !== s || (i[s] = n[s]);
        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && n.lazy !== !1, i.immediateRender = h, this._startAt = D.to(this.target, 0, i), h) {
          if (0 === this._time) return
        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
      }
      if (this._ease = l = l ? l instanceof T ? l : "function" == typeof l ? new T(l, n.easeParams) : x[l] || D.defaultEase : D.defaultEase, n.easeParams instanceof Array && l.config && (this._ease = l.config.apply(l, n.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
      else e = this._initProps(this.target, this._propLookup, this._siblings, a);
      if (e && D._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), n.runBackwards) for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
      this._onUpdate = n.onUpdate, this._initted = !0
    }, n._initProps = function (e, i, s, r) {
      var n, a, o, h, l, _;
      if (null == e) return !1;
      F[e._gsTweenID] && V(), this.vars.css || e.style && e !== t && e.nodeType && E.css && this.vars.autoCSS !== !1 && z(this.vars, e);
      for (n in this.vars) {
        if (_ = this.vars[n], B[n]) _ && (_ instanceof Array || _.push && f(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[n] = _ = this._swapSelfInParams(_, this));
        else if (E[n] && (h = new E[n])._onInitTween(e, this.vars[n], this)) {
          for (this._firstPT = l = {
            _next: this._firstPT,
            t: h,
            p: "setRatio",
            s: 0,
            c: 1,
            f: !0,
            n: n,
            pg: !0,
            pr: h._priority
          }, a = h._overwriteProps.length; --a > -1;) i[h._overwriteProps[a]] = this._firstPT;
          (h._priority || h._onInitAllProps) && (o = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0)
        } else this._firstPT = i[n] = l = {
          _next: this._firstPT,
          t: e,
          p: n,
          f: "function" == typeof e[n],
          n: n,
          pg: !1,
          pr: 0
        }, l.s = l.f ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), l.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - l.s || 0;
        l && l._next && (l._next._prev = l)
      }
      return r && this._kill(r, e) ? this._initProps(e, i, s, r) : this._overwrite > 1 && this._firstPT && s.length > 1 && Z(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (F[e._gsTweenID] = !0), o)
    }, n.render = function (t, e, i) {
      var s, r, n, a, o = this._time,
          h = this._duration,
          l = this._rawPrevTime;
      if (t >= h) this._totalTime = this._time = h, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === h && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > l || l === _ && "isPause" !== this.data) && l !== t && (i = !0, l > _ && (r = "onReverseComplete")), this._rawPrevTime = a = !e || t || l === t ? t : _);
      else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === h && l > 0) && (r = "onReverseComplete", s = this._reversed), 0 > t && (this._active = !1, 0 === h && (this._initted || !this.vars.lazy || i) && (l >= 0 && (l !== _ || "isPause" !== this.data) && (i = !0), this._rawPrevTime = a = !e || t || l === t ? t : _)), this._initted || (i = !0);
      else if (this._totalTime = this._time = t, this._easeType) {
        var u = t / h,
            c = this._easeType,
            f = this._easePower;
        (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === c ? 1 - u : 2 === c ? u : .5 > t / h ? u / 2 : 1 - u / 2
      } else this.ratio = this._ease.getRatio(t / h);
      if (this._time !== o || i) {
        if (!this._initted) {
          if (this._init(), !this._initted || this._gc) return;
          if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = l, I.push(this), this._lazy = [t, e], void 0;
          this._time && !s ? this.ratio = this._ease.getRatio(this._time / h) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
        }
        for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === h) && (e || this._callback("onStart"))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
        this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._callback("onUpdate")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === h && this._rawPrevTime === _ && a !== _ && (this._rawPrevTime = 0))
      }
    }, n._kill = function (t, e, i) {
      if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
      e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
      var s, r, n, a, o, h, l, _, u, c = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
      if ((f(e) || M(e)) && "number" != typeof e[0]) for (s = e.length; --s > -1;) this._kill(t, e[s], i) && (h = !0);
      else {
        if (this._targets) {
          for (s = this._targets.length; --s > -1;) if (e === this._targets[s]) {
            o = this._propLookup[s] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[s] = t ? this._overwrittenProps[s] || {} : "all";
            break
          }
        } else {
          if (e !== this.target) return !1;
          o = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
        }
        if (o) {
          if (l = t || o, _ = t !== r && "all" !== r && t !== o && ("object" != typeof t || !t._tempKill), i && (D.onOverwrite || this.vars.onOverwrite)) {
            for (n in l) o[n] && (u || (u = []), u.push(n));
            if ((u || !t) && !W(this, i, e, u)) return !1
          }
          for (n in l)(a = o[n]) && (c && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s, h = !0), a.pg && a.t._kill(l) && (h = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[n]), _ && (r[n] = 1);
          !this._firstPT && this._initted && this._enabled(!1, !1)
        }
      }
      return h
    }, n.invalidate = function () {
      return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], O.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -_, this.render(-this._delay)), this
    }, n._enabled = function (t, e) {
      if (o || a.wake(), t && this._gc) {
        var i, s = this._targets;
        if (s) for (i = s.length; --i > -1;) this._siblings[i] = G(s[i], this, !0);
        else this._siblings = G(this.target, this, !0)
      }
      return O.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? D._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
    }, D.to = function (t, e, i) {
      return new D(t, e, i)
    }, D.from = function (t, e, i) {
      return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new D(t, e, i)
    }, D.fromTo = function (t, e, i, s) {
      return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new D(t, e, s)
    }, D.delayedCall = function (t, e, i, s, r) {
      return new D(e, 0, {
        delay: t,
        onComplete: e,
        onCompleteParams: i,
        callbackScope: s,
        onReverseComplete: e,
        onReverseCompleteParams: i,
        immediateRender: !1,
        lazy: !1,
        useFrames: r,
        overwrite: 0
      })
    }, D.set = function (t, e) {
      return new D(t, 0, e)
    }, D.getTweensOf = function (t, e) {
      if (null == t) return [];
      t = "string" != typeof t ? t : D.selector(t) || t;
      var i, s, r, n;
      if ((f(t) || M(t)) && "number" != typeof t[0]) {
        for (i = t.length, s = []; --i > -1;) s = s.concat(D.getTweensOf(t[i], e));
        for (i = s.length; --i > -1;) for (n = s[i], r = i; --r > -1;) n === s[r] && s.splice(i, 1)
      } else for (s = G(t).concat(), i = s.length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
      return s
    }, D.killTweensOf = D.killDelayedCallsTo = function (t, e, i) {
      "object" == typeof e && (i = e, e = !1);
      for (var s = D.getTweensOf(t, e), r = s.length; --r > -1;) s[r]._kill(i, t)
    };
    var $ = g("plugins.TweenPlugin", function (t, e) {
      this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = $.prototype
    }, !0);
    if (n = $.prototype, $.version = "1.10.1", $.API = 2, n._firstPT = null, n._addTween = function (t, e, i, s, r, n) {
      var a, o;
      return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - Number(i) : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
        _next: this._firstPT,
        t: t,
        p: e,
        s: i,
        c: a,
        f: "function" == typeof t[e],
        n: r || e,
        r: n
      }, o._next && (o._next._prev = o), o) : void 0
    }, n.setRatio = function (t) {
      for (var e, i = this._firstPT, s = 1e-6; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
    }, n._kill = function (t) {
      var e, i = this._overwriteProps,
          s = this._firstPT;
      if (null != t[this._propName]) this._overwriteProps = [];
      else for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
      for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
      return !1
    }, n._roundProps = function (t, e) {
      for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
    }, D._onPluginEvent = function (t, e) {
      var i, s, r, n, a, o = e._firstPT;
      if ("_onInitAllProps" === t) {
        for (; o;) {
          for (a = o._next, s = r; s && s.pr > o.pr;) s = s._next;
          (o._prev = s ? s._prev : n) ? o._prev._next = o : r = o, (o._next = s) ? s._prev = o : n = o, o = a
        }
        o = e._firstPT = r
      }
      for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
      return i
    }, $.activate = function (t) {
      for (var e = t.length; --e > -1;) t[e].API === $.API && (E[(new t[e])._propName] = t[e]);
      return !0
    }, d.plugin = function (t) {
      if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
      var e, i = t.propName,
          s = t.priority || 0,
          r = t.overwriteProps,
          n = {
          init: "_onInitTween",
          set: "setRatio",
          kill: "_kill",
          round: "_roundProps",
          initAll: "_onInitAllProps"
          },
          a = g("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
          $.call(this, i, s), this._overwriteProps = r || []
        }, t.global === !0),
          o = a.prototype = new $(i);
      o.constructor = a, a.API = t.API;
      for (e in n)"function" == typeof t[e] && (o[n[e]] = t[e]);
      return a.version = t.version, $.activate([a]), a
    }, s = t._gsQueue) {
      for (r = 0; s.length > r; r++) s[r]();
      for (n in p) p[n].func || t.console.log("GSAP encountered missing dependency: com.greensock." + n)
    }
    o = !1
  }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function ($) {

  var $event = $.event,
      $special, resizeTimeout;

  $special = $event.special.debouncedresize = {
    setup: function () {
      $(this).on("resize", $special.handler);
    },
    teardown: function () {
      $(this).off("resize", $special.handler);
    },
    handler: function (event, execAsap) {
      // Save the context
      var context = this,
          args = arguments,
          dispatch = function () {
          // set correct event type
          event.type = "debouncedresize";
          $event.dispatch.apply(context, args);
          };

      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
    },
    threshold: 150
  };

})(jQuery);
//http://stackoverflow.com/questions/8354786/determine-the-width-of-a-dynamic-css3-multicolumn-div-width-fixed-column-width
(function ($) {
  $.fn.extend({
    getColumnsWidth: function () {

      // append an empty <span>
      $this = $(this).append('<span></span>');

      // grab left position
      var pos = $this.find('span:last-of-type').position().left;

      // get prefix for css3
      var prefix;
      if (jQuery.browser.webkit) prefix = '-webkit-';
      else if (jQuery.browser.opera) prefix = '-o-';
      else if (jQuery.browser.mozilla) prefix = '-moz-';
      else if (jQuery.browser.msie) prefix = '-ms-';

      // add the width of the final column
      pos += parseInt($this.css(prefix + 'column-width'), 10);

      // subtract one column gap (not sure why this is necessary?)
      pos -= parseInt($this.css(prefix + 'column-gap'), 10);

      // remove empty <span>
      $(this).find('span:last-of-type').remove();

      // return position
      return pos;

    }
  });
})(jQuery);
/**
 * requestAnimationFrame polyfill by Erik Möller.
 * Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
 *
 * MIT license
 */
if (!Date.now) Date.now = function () {
  return new Date().getTime();
};

(function () {
  'use strict';

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
  || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function (callback) {
      var now = Date.now();
      var nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
}()); /* --- ROYALSLIDER --- */

// jQuery RoyalSlider plugin. Custom build. Copyright 2011-2013 Dmitry Semenov http://dimsemenov.com
// http://dimsemenov.com/private/home.php?build=bullets_thumbnails_tabs_fullscreen_autoplay_video_animated-blocks_auto-height_global-caption_active-class_deeplinking_visible-nearby
// jquery.royalslider v9.5.6
(function (n) {
  function u(b, f) {
    var c, a = this,
        e = window.navigator,
        g = e.userAgent.toLowerCase();
    a.uid = n.rsModules.uid++;
    a.ns = ".rs" + a.uid;
    var d = document.createElement("div").style,
        h = ["webkit", "Moz", "ms", "O"],
        k = "",
        l = 0,
        r;
    for (c = 0; c < h.length; c++) r = h[c], !k && r + "Transform" in d && (k = r), r = r.toLowerCase(), window.requestAnimationFrame || (window.requestAnimationFrame = window[r + "RequestAnimationFrame"], window.cancelAnimationFrame = window[r + "CancelAnimationFrame"] || window[r + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame || (window.requestAnimationFrame = function (a, b) {
      var c = (new Date).getTime(),
          d = Math.max(0, 16 - (c - l)),
          e = window.setTimeout(function () {
          a(c + d)
        }, d);
      l = c + d;
      return e
    });
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
      clearTimeout(a)
    });
    a.isIPAD = g.match(/(ipad)/);
    a.isIOS = a.isIPAD || g.match(/(iphone|ipod)/);
    c = function (a) {
      a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
      return {
        browser: a[1] || "",
        version: a[2] || "0"
      }
    }(g);
    h = {};
    c.browser && (h[c.browser] = !0, h.version = c.version);
    h.chrome && (h.webkit = !0);
    a._a = h;
    a.isAndroid = -1 < g.indexOf("android");
    a.slider = n(b);
    a.ev = n(a);
    a._b = n(document);
    a.st = n.extend({}, n.fn.royalSlider.defaults, f);
    a._c = a.st.transitionSpeed;
    a._d = 0;
    !a.st.allowCSS3 || h.webkit && !a.st.allowCSS3OnWebkit || (c = k + (k ? "T" : "t"), a._e = c + "ransform" in d && c + "ransition" in d, a._e && (a._f = k + (k ? "P" : "p") + "erspective" in d));
    k = k.toLowerCase();
    a._g = "-" + k + "-";
    a._h = "vertical" === a.st.slidesOrientation ? !1 : !0;
    a._i = a._h ? "left" : "top";
    a._j = a._h ? "width" : "height";
    a._k = -1;
    a._l = "fade" === a.st.transitionType ? !1 : !0;
    a._l || (a.st.sliderDrag = !1, a._m = 10);
    a._n = "z-index:0; display:none; opacity:0;";
    a._o = 0;
    a._p = 0;
    a._q = 0;
    n.each(n.rsModules, function (b, c) {
      "uid" !== b && c.call(a)
    });
    a.slides = [];
    a._r = 0;
    (a.st.slides ? n(a.st.slides) : a.slider.children().detach()).each(function () {
      a._s(this, !0)
    });
    a.st.randomizeSlides && a.slides.sort(function () {
      return.5 - Math.random()
    });
    a.numSlides = a.slides.length;
    a._t();
    a.st.startSlideId ? a.st.startSlideId > a.numSlides - 1 && (a.st.startSlideId = a.numSlides - 1) : a.st.startSlideId = 0;
    a._o = a.staticSlideId = a.currSlideId = a._u = a.st.startSlideId;
    a.currSlide = a.slides[a.currSlideId];
    a._v = 0;
    a.pointerMultitouch = !1;
    a.slider.addClass((a._h ? "rsHor" : "rsVer") + (a._l ? "" : " rsFade"));
    d = '<div class="rsOverflow"><div class="rsContainer">';
    a.slidesSpacing = a.st.slidesSpacing;
    a._w = (a._h ? a.slider.width() : a.slider.height()) + a.st.slidesSpacing;
    a._x = Boolean(0 < a._y);
    1 >= a.numSlides && (a._z = !1);
    a._a1 = a._z && a._l ? 2 === a.numSlides ? 1 : 2 : 0;
    a._b1 =
    6 > a.numSlides ? a.numSlides : 6;
    a._c1 = 0;
    a._d1 = 0;
    a.slidesJQ = [];
    for (c = 0; c < a.numSlides; c++) a.slidesJQ.push(n('<div style="' + (a._l ? "" : c !== a.currSlideId ? a._n : "z-index:0;") + '" class="rsSlide "></div>'));
    a._e1 = d = n(d + "</div></div>");
    var m = a.ns,
        k = function (b, c, d, e, f) {
        a._j1 = b + c + m;
        a._k1 = b + d + m;
        a._l1 = b + e + m;
        f && (a._m1 = b + f + m)
        };
    c = e.pointerEnabled;
    a.pointerEnabled = c || e.msPointerEnabled;
    a.pointerEnabled ? (a.hasTouch = !1, a._n1 = .2, a.pointerMultitouch = Boolean(1 < e[(c ? "m" : "msM") + "axTouchPoints"]), c ? k("pointer", "down", "move", "up", "cancel") : k("MSPointer", "Down", "Move", "Up", "Cancel")) : (a.isIOS ? a._j1 = a._k1 = a._l1 = a._m1 = "" : k("mouse", "down", "move", "up"), "ontouchstart" in window || "createTouch" in document ? (a.hasTouch = !0, a._j1 += " touchstart" + m, a._k1 += " touchmove" + m, a._l1 += " touchend" + m, a._m1 += " touchcancel" + m, a._n1 = .5, a.st.sliderTouch && (a._f1 = !0)) : (a.hasTouch = !1, a._n1 = .2));
    a.st.sliderDrag && (a._f1 = !0, h.msie || h.opera ? a._g1 = a._h1 = "move" : h.mozilla ? (a._g1 = "-moz-grab", a._h1 = "-moz-grabbing") : h.webkit && -1 != e.platform.indexOf("Mac") && (a._g1 = "-webkit-grab", a._h1 = "-webkit-grabbing"), a._i1());
    a.slider.html(d);
    a._o1 = a.st.controlsInside ? a._e1 : a.slider;
    a._p1 = a._e1.children(".rsContainer");
    a.pointerEnabled && a._p1.css((c ? "" : "-ms-") + "touch-action", a._h ? "pan-y" : "pan-x");
    a._q1 = n('<div class="rsPreloader"></div>');
    e = a._p1.children(".rsSlide");
    a._r1 = a.slidesJQ[a.currSlideId];
    a._s1 = 0;
    a._e ? (a._t1 = "transition-property", a._u1 = "transition-duration", a._v1 = "transition-timing-function", a._w1 = a._x1 = a._g + "transform", a._f ? (h.webkit && !h.chrome && a.slider.addClass("rsWebkit3d"), a._y1 = "translate3d(", a._z1 = "px, ", a._a2 = "px, 0px)") : (a._y1 = "translate(", a._z1 = "px, ", a._a2 = "px)"), a._l ? a._p1[a._g + a._t1] = a._g + "transform" : (h = {}, h[a._g + a._t1] = "opacity", h[a._g + a._u1] = a.st.transitionSpeed + "ms", h[a._g + a._v1] = a.st.css3easeInOut, e.css(h))) : (a._x1 = "left", a._w1 = "top");
    var p;
    n(window).on("resize" + a.ns, function () {
      p && clearTimeout(p);
      p = setTimeout(function () {
        a.updateSliderSize()
      }, 50)
    });
    a.ev.trigger("rsAfterPropsSetup");
    a.updateSliderSize();
    a.st.keyboardNavEnabled && a._b2();
    a.st.arrowsNavHideOnTouch && (a.hasTouch || a.pointerMultitouch) && (a.st.arrowsNav = !1);
    a.st.arrowsNav && (e = a._o1, n('<div class="rsArrow rsArrowLeft"><div class="rsArrowIcn"></div></div><div class="rsArrow rsArrowRight"><div class="rsArrowIcn"></div></div>').appendTo(e), a._c2 = e.children(".rsArrowLeft").click(function (b) {
      b.preventDefault();
      a.prev()
    }), a._d2 = e.children(".rsArrowRight").click(function (b) {
      b.preventDefault();
      a.next()
    }), a.st.arrowsNavAutoHide && !a.hasTouch && (a._c2.addClass("rsHidden"), a._d2.addClass("rsHidden"), e.one("mousemove.arrowshover", function () {
      a._c2.removeClass("rsHidden");
      a._d2.removeClass("rsHidden")
    }), e.hover(function () {
      a._e2 || (a._c2.removeClass("rsHidden"), a._d2.removeClass("rsHidden"))
    }, function () {
      a._e2 || (a._c2.addClass("rsHidden"), a._d2.addClass("rsHidden"))
    })), a.ev.on("rsOnUpdateNav", function () {
      a._f2()
    }), a._f2());
    if (a.hasTouch && a.st.sliderTouch || !a.hasTouch && a.st.sliderDrag) a._p1.on(a._j1, function (b) {
      a._g2(b)
    });
    else a.dragSuccess = !1;
    var q = ["rsPlayBtnIcon", "rsPlayBtn", "rsCloseVideoBtn", "rsCloseVideoIcn"];
    a._p1.click(function (b) {
      if (!a.dragSuccess) {
        var c =
        n(b.target).attr("class");
        if (-1 !== n.inArray(c, q) && a.toggleVideo()) return !1;
        if (a.st.navigateByClick && !a._h2) {
          if (n(b.target).closest(".rsNoDrag", a._r1).length) return !0;
          a._i2(b)
        }
        a.ev.trigger("rsSlideClick", b)
      }
    }).on("click.rs", "a", function (b) {
      if (a.dragSuccess) return !1;
      a._h2 = !0;
      setTimeout(function () {
        a._h2 = !1
      }, 3)
    });
    a.ev.trigger("rsAfterInit")
  }
  n.rsModules || (n.rsModules = {
    uid: 0
  });
  u.prototype = {
    constructor: u,
    _i2: function (b) {
      b = b[this._h ? "pageX" : "pageY"] - this._j2;
      b >= this._q ? this.next() : 0 > b && this.prev()
    },
    _t: function () {
      var b;
      b = this.st.numImagesToPreload;
      if (this._z = this.st.loop) 2 === this.numSlides ? (this._z = !1, this.st.loopRewind = !0) : 2 > this.numSlides && (this.st.loopRewind = this._z = !1);
      this._z && 0 < b && (4 >= this.numSlides ? b = 1 : this.st.numImagesToPreload > (this.numSlides - 1) / 2 && (b = Math.floor((this.numSlides - 1) / 2)));
      this._y = b
    },
    _s: function (b, f) {
      function c(b, c) {
        c ? g.images.push(b.attr(c)) : g.images.push(b.text());
        if (h) {
          h = !1;
          g.caption = "src" === c ? b.attr("alt") : b.contents();
          g.image = g.images[0];
          g.videoURL = b.attr("data-rsVideo");
          var d = b.attr("data-rsw"),
              e = b.attr("data-rsh");
          "undefined" !== typeof d && !1 !== d && "undefined" !== typeof e && !1 !== e ? (g.iW = parseInt(d, 10), g.iH = parseInt(e, 10)) : a.st.imgWidth && a.st.imgHeight && (g.iW = a.st.imgWidth, g.iH = a.st.imgHeight)
        }
      }
      var a = this,
          e, g = {},
          d, h = !0;
      b = n(b);
      a._k2 = b;
      a.ev.trigger("rsBeforeParseNode", [b, g]);
      if (!g.stopParsing) return b = a._k2, g.id = a._r, g.contentAdded = !1, a._r++, g.images = [], g.isBig = !1, g.hasCover || (b.hasClass("rsImg") ? (d = b, e = !0) : (d = b.find(".rsImg"), d.length && (e = !0)), e ? (g.bigImage = d.eq(0).attr("data-rsBigImg"), d.each(function () {
        var a =
        n(this);
        a.is("a") ? c(a, "href") : a.is("img") ? c(a, "src") : c(a)
      })) : b.is("img") && (b.addClass("rsImg rsMainSlideImage"), c(b, "src"))), d = b.find(".rsCaption"), d.length && (g.caption = d.remove()), g.content = b, a.ev.trigger("rsAfterParseNode", [b, g]), f && a.slides.push(g), 0 === g.images.length && (g.isLoaded = !0, g.isRendered = !1, g.isLoading = !1, g.images = null), g
    },
    _b2: function () {
      var b = this,
          f, c, a = function (a) {
          37 === a ? b.prev() : 39 === a && b.next()
          };
      b._b.on("keydown" + b.ns, function (e) {
        b._l2 || (c = e.keyCode, 37 !== c && 39 !== c || f || (e.preventDefault(), a(c), f = setInterval(function () {
          a(c)
        }, 700)))
      }).on("keyup" + b.ns, function (a) {
        f && (clearInterval(f), f = null)
      })
    },
    goTo: function (b, f) {
      b !== this.currSlideId && this._m2(b, this.st.transitionSpeed, !0, !f)
    },
    destroy: function (b) {
      this.ev.trigger("rsBeforeDestroy");
      this._b.off("keydown" + this.ns + " keyup" + this.ns + " " + this._k1 + " " + this._l1);
      this._p1.off(this._j1 + " click");
      this.slider.data("royalSlider", null);
      n.removeData(this.slider, "royalSlider");
      n(window).off("resize" + this.ns);
      this.loadingTimeout && clearTimeout(this.loadingTimeout);
      b && this.slider.remove();
      this.ev = this.slider = this.slides = null
    },
    _n2: function (b, f) {
      function c(c, f, g) {
        c.isAdded ? (a(f, c), e(f, c)) : (g || (g = d.slidesJQ[f]), c.holder ? g = c.holder : (g = d.slidesJQ[f] = n(g), c.holder = g), c.appendOnLoaded = !1, e(f, c, g), a(f, c), d._p2(c, g, b), c.isAdded = !0)
      }
      function a(a, c) {
        c.contentAdded || (d.setItemHtml(c, b), b || (c.contentAdded = !0))
      }
      function e(a, b, c) {
        d._l && (c || (c = d.slidesJQ[a]), c.css(d._i, (a + d._d1 + p) * d._w))
      }
      function g(a) {
        if (l) {
          if (a > r - 1) return g(a - r);
          if (0 > a) return g(r + a)
        }
        return a
      }
      var d = this,
          h, k, l = d._z,
          r = d.numSlides;
      if (!isNaN(f)) return g(f);
      var m = d.currSlideId,
          p, q = b ? Math.abs(d._o2 - d.currSlideId) >= d.numSlides - 1 ? 0 : 1 : d._y,
          s = Math.min(2, q),
          v = !1,
          u = !1,
          t;
      for (k = m; k < m + 1 + s; k++) if (t = g(k), (h = d.slides[t]) && (!h.isAdded || !h.positionSet)) {
        v = !0;
        break
      }
      for (k = m - 1; k > m - 1 - s; k--) if (t = g(k), (h = d.slides[t]) && (!h.isAdded || !h.positionSet)) {
        u = !0;
        break
      }
      if (v) for (k = m; k < m + q + 1; k++) t = g(k), p = Math.floor((d._u - (m - k)) / d.numSlides) * d.numSlides, (h = d.slides[t]) && c(h, t);
      if (u) for (k = m - 1; k > m - 1 - q; k--) t = g(k), p = Math.floor((d._u - (m - k)) / r) * r, (h = d.slides[t]) && c(h, t);
      if (!b) for (s = g(m - q), m = g(m + q), q = s > m ? 0 : s, k = 0; k < r; k++) s > m && k > s - 1 || !(k < q || k > m) || (h = d.slides[k]) && h.holder && (h.holder.detach(), h.isAdded = !1)
    },
    setItemHtml: function (b, f) {
      var c = this,
          a = function () {
          if (!b.images) b.isRendered = !0, b.isLoaded = !0, b.isLoading = !1, d(!0);
          else if (!b.isLoading) {
            var a, f;
            b.content.hasClass("rsImg") ? (a = b.content, f = !0) : a = b.content.find(".rsImg:not(img)");
            a && !a.is("img") && a.each(function () {
              var a = n(this),
                  c = '<img class="rsImg" src="' + (a.is("a") ? a.attr("href") : a.text()) + '" />';
              f ? b.content = n(c) : a.replaceWith(c)
            });
            a = f ? b.content : b.content.find("img.rsImg");
            k();
            a.eq(0).addClass("rsMainSlideImage");
            b.iW && b.iH && (b.isLoaded || c._q2(b), d());
            b.isLoading = !0;
            if (b.isBig) n("<img />").on("load.rs error.rs", function (a) {
              n(this).off("load.rs error.rs");
              e([this], !0)
            }).attr("src", b.image);
            else {
              b.loaded = [];
              b.numStartedLoad = 0;
              a = function (a) {
                n(this).off("load.rs error.rs");
                b.loaded.push(this);
                b.loaded.length === b.numStartedLoad && e(b.loaded, !1)
              };
              for (var g = 0; g < b.images.length; g++) {
                var h = n("<img />");
                b.numStartedLoad++;
                h.on("load.rs error.rs", a).attr("src", b.images[g])
              }
            }
          }
          },
          e = function (a, c) {
          if (a.length) {
            var d = a[0];
            if (c !== b.isBig)(d = b.holder.children()) && 1 < d.length && l();
            else if (b.iW && b.iH) g();
            else if (b.iW = d.width, b.iH = d.height, b.iW && b.iH) g();
            else {
              var e = new Image;
              e.onload = function () {
                e.width ? (b.iW = e.width, b.iH = e.height, g()) : setTimeout(function () {
                  e.width && (b.iW = e.width, b.iH = e.height);
                  g()
                }, 1E3)
              };
              e.src = d.src
            }
          } else g()
          },
          g = function () {
          b.isLoaded = !0;
          b.isLoading = !1;
          d();
          l();
          h()
          },
          d = function () {
          if (!b.isAppended && c.ev) {
            var a = c.st.visibleNearby,
                d = b.id - c._o;
            f || b.appendOnLoaded || !c.st.fadeinLoadedSlide || 0 !== d && (!(a || c._r2 || c._l2) || -1 !== d && 1 !== d) || (a = {
              visibility: "visible",
              opacity: 0
            }, a[c._g + "transition"] = "opacity 400ms ease-in-out", b.content.css(a), setTimeout(function () {
              b.content.css("opacity", 1)
            }, 16));
            b.holder.find(".rsPreloader").length ? b.holder.append(b.content) : b.holder.html(b.content);
            b.isAppended = !0;
            b.isLoaded && (c._q2(b), h());
            b.sizeReady || (b.sizeReady = !0, setTimeout(function () {
              c.ev.trigger("rsMaybeSizeReady", b)
            }, 100))
          }
          },
          h = function () {
          !b.loadedTriggered && c.ev && (b.isLoaded = b.loadedTriggered = !0, b.holder.trigger("rsAfterContentSet"), c.ev.trigger("rsAfterContentSet", b))
          },
          k = function () {
          c.st.usePreloader && b.holder.html(c._q1.clone())
          },
          l = function (a) {
          c.st.usePreloader && (a = b.holder.find(".rsPreloader"), a.length && a.remove())
          };
      b.isLoaded ? d() : f ? !c._l && b.images && b.iW && b.iH ? a() : (b.holder.isWaiting = !0, k(), b.holder.slideId = -99) : a()
    },
    _p2: function (b, f, c) {
      this._p1.append(b.holder);
      b.appendOnLoaded = !1
    },
    _g2: function (b, f) {
      var c =
      this,
          a, e = "touchstart" === b.type;
      c._s2 = e;
      c.ev.trigger("rsDragStart");
      if (n(b.target).closest(".rsNoDrag", c._r1).length) return c.dragSuccess = !1, !0;
      !f && c._r2 && (c._t2 = !0, c._u2());
      c.dragSuccess = !1;
      if (c._l2) e && (c._v2 = !0);
      else {
        e && (c._v2 = !1);
        c._w2();
        if (e) {
          var g = b.originalEvent.touches;
          if (g && 0 < g.length) a = g[0], 1 < g.length && (c._v2 = !0);
          else return
        } else b.preventDefault(), a = b, c.pointerEnabled && (a = a.originalEvent);
        c._l2 = !0;
        c._b.on(c._k1, function (a) {
          c._x2(a, f)
        }).on(c._l1, function (a) {
          c._y2(a, f)
        });
        c._z2 = "";
        c._a3 = !1;
        c._b3 = a.pageX;
        c._c3 = a.pageY;
        c._d3 = c._v = (f ? c._e3 : c._h) ? a.pageX : a.pageY;
        c._f3 = 0;
        c._g3 = 0;
        c._h3 = f ? c._i3 : c._p;
        c._j3 = (new Date).getTime();
        if (e) c._e1.on(c._m1, function (a) {
          c._y2(a, f)
        })
      }
    },
    _k3: function (b, f) {
      if (this._l3) {
        var c = this._m3,
            a = b.pageX - this._b3,
            e = b.pageY - this._c3,
            g = this._h3 + a,
            d = this._h3 + e,
            h = f ? this._e3 : this._h,
            g = h ? g : d,
            d = this._z2;
        this._a3 = !0;
        this._b3 = b.pageX;
        this._c3 = b.pageY;
        "x" === d && 0 !== a ? this._f3 = 0 < a ? 1 : -1 : "y" === d && 0 !== e && (this._g3 = 0 < e ? 1 : -1);
        d = h ? this._b3 : this._c3;
        a = h ? a : e;
        f ? g > this._n3 ? g = this._h3 + a * this._n1 : g < this._o3 && (g = this._h3 + a * this._n1) : this._z || (0 >= this.currSlideId && 0 < d - this._d3 && (g = this._h3 + a * this._n1), this.currSlideId >= this.numSlides - 1 && 0 > d - this._d3 && (g = this._h3 + a * this._n1));
        this._h3 = g;
        200 < c - this._j3 && (this._j3 = c, this._v = d);
        f ? this._q3(this._h3) : this._l && this._p3(this._h3)
      }
    },
    _x2: function (b, f) {
      var c = this,
          a, e = "touchmove" === b.type;
      if (!c._s2 || e) {
        if (e) {
          if (c._r3) return;
          var g = b.originalEvent.touches;
          if (g) {
            if (1 < g.length) return;
            a = g[0]
          } else return
        } else a = b, c.pointerEnabled && (a = a.originalEvent);
        c._a3 || (c._e && (f ? c._s3 : c._p1).css(c._g + c._u1, "0s"), function h() {
          c._l2 && (c._t3 = requestAnimationFrame(h), c._u3 && c._k3(c._u3, f))
        }());
        if (c._l3) b.preventDefault(), c._m3 = (new Date).getTime(), c._u3 = a;
        else if (g = f ? c._e3 : c._h, a = Math.abs(a.pageX - c._b3) - Math.abs(a.pageY - c._c3) - (g ? -7 : 7), 7 < a) {
          if (g) b.preventDefault(), c._z2 = "x";
          else if (e) {
            c._v3(b);
            return
          }
          c._l3 = !0
        } else if (-7 > a) {
          if (!g) b.preventDefault(), c._z2 = "y";
          else if (e) {
            c._v3(b);
            return
          }
          c._l3 = !0
        }
      }
    },
    _v3: function (b, f) {
      this._r3 = !0;
      this._a3 = this._l2 = !1;
      this._y2(b)
    },
    _y2: function (b, f) {
      function c(a) {
        return 100 > a ? 100 : 500 < a ? 500 : a
      }
      function a(a, b) {
        if (e._l || f) h = (-e._u - e._d1) * e._w, k = Math.abs(e._p - h), e._c = k / b, a && (e._c += 250), e._c = c(e._c), e._x3(h, !1)
      }
      var e = this,
          g, d, h, k;
      g = -1 < b.type.indexOf("touch");
      if (!e._s2 || g) if (e._s2 = !1, e.ev.trigger("rsDragRelease"), e._u3 = null, e._l2 = !1, e._r3 = !1, e._l3 = !1, e._m3 = 0, cancelAnimationFrame(e._t3), e._a3 && (f ? e._q3(e._h3) : e._l && e._p3(e._h3)), e._b.off(e._k1).off(e._l1), g && e._e1.off(e._m1), e._i1(), !e._a3 && !e._v2 && f && e._w3) {
        var l = n(b.target).closest(".rsNavItem");
        l.length && e.goTo(l.index())
      } else {
        d = f ? e._e3 : e._h;
        if (!e._a3 || "y" === e._z2 && d || "x" === e._z2 && !d) if (!f && e._t2) {
          e._t2 = !1;
          if (e.st.navigateByClick) {
            e._i2(e.pointerEnabled ? b.originalEvent : b);
            e.dragSuccess = !0;
            return
          }
          e.dragSuccess = !0
        } else {
          e._t2 = !1;
          e.dragSuccess = !1;
          return
        } else e.dragSuccess = !0;
        e._t2 = !1;
        e._z2 = "";
        var r = e.st.minSlideOffset;
        g = g ? b.originalEvent.changedTouches[0] : e.pointerEnabled ? b.originalEvent : b;
        var m = d ? g.pageX : g.pageY,
            p = e._d3;
        g = e._v;
        var q = e.currSlideId,
            s = e.numSlides,
            v = d ? e._f3 : e._g3,
            u = e._z;
        Math.abs(m - p);
        g = m - g;
        d = (new Date).getTime() - e._j3;
        d = Math.abs(g) / d;
        if (0 === v || 1 >= s) a(!0, d);
        else {
          if (!u && !f) if (0 >= q) {
            if (0 < v) {
              a(!0, d);
              return
            }
          } else if (q >= s - 1 && 0 > v) {
            a(!0, d);
            return
          }
          if (f) {
            h = e._i3;
            if (h > e._n3) h = e._n3;
            else if (h < e._o3) h = e._o3;
            else {
              m = d * d / .006;
              l = -e._i3;
              p = e._y3 - e._z3 + e._i3;
              0 < g && m > l ? (l += e._z3 / (15 / (m / d * .003)), d = d * l / m, m = l) : 0 > g && m > p && (p += e._z3 / (15 / (m / d * .003)), d = d * p / m, m = p);
              l = Math.max(Math.round(d / .003), 50);
              h += m * (0 > g ? -1 : 1);
              if (h > e._n3) {
                e._a4(h, l, !0, e._n3, 200);
                return
              }
              if (h < e._o3) {
                e._a4(h, l, !0, e._o3, 200);
                return
              }
            }
            e._a4(h, l, !0)
          } else l = function (a) {
            var b = Math.floor(a / e._w);
            a - b * e._w > r && b++;
            return b
          }, p + r < m ? 0 > v ? a(!1, d) : (l = l(m - p), e._m2(e.currSlideId - l, c(Math.abs(e._p - (-e._u - e._d1 + l) * e._w) / d), !1, !0, !0)) : p - r > m ? 0 < v ? a(!1, d) : (l = l(p - m), e._m2(e.currSlideId + l, c(Math.abs(e._p - (-e._u - e._d1 - l) * e._w) / d), !1, !0, !0)) : a(!1, d)
        }
      }
    },
    _p3: function (b) {
      b = this._p = b;
      this._e ? this._p1.css(this._x1, this._y1 + (this._h ? b + this._z1 + 0 : 0 + this._z1 + b) + this._a2) : this._p1.css(this._h ? this._x1 : this._w1, b)
    },
    updateSliderSize: function (b) {
      var f, c;
      if (this.slider) {
        if (this.st.autoScaleSlider) {
          var a =
          this.st.autoScaleSliderWidth,
              e = this.st.autoScaleSliderHeight;
          this.st.autoScaleHeight ? (f = this.slider.width(), f != this.width && (this.slider.css("height", e / a * f), f = this.slider.width()), c = this.slider.height()) : (c = this.slider.height(), c != this.height && (this.slider.css("width", a / e * c), c = this.slider.height()), f = this.slider.width())
        } else f = this.slider.width(), c = this.slider.height();
        if (b || f != this.width || c != this.height) {
          this.width = f;
          this.height = c;
          this._b4 = f;
          this._c4 = c;
          this.ev.trigger("rsBeforeSizeSet");
          this.ev.trigger("rsAfterSizePropSet");
          this._e1.css({
            width: this._b4,
            height: this._c4
          });
          this._w = (this._h ? this._b4 : this._c4) + this.st.slidesSpacing;
          this._d4 = this.st.imageScalePadding;
          for (f = 0; f < this.slides.length; f++) b = this.slides[f], b.positionSet = !1, b && b.images && b.isLoaded && (b.isRendered = !1, this._q2(b));
          if (this._e4) for (f = 0; f < this._e4.length; f++) b = this._e4[f], b.holder.css(this._i, (b.id + this._d1) * this._w);
          this._n2();
          this._l && (this._e && this._p1.css(this._g + "transition-duration", "0s"), this._p3((-this._u - this._d1) * this._w));
          this.ev.trigger("rsOnUpdateNav")
        }
        this._j2 =
        this._e1.offset();
        this._j2 = this._j2[this._i]
      }
    },
    appendSlide: function (b, f) {
      var c = this._s(b);
      if (isNaN(f) || f > this.numSlides) f = this.numSlides;
      this.slides.splice(f, 0, c);
      this.slidesJQ.splice(f, 0, n('<div style="' + (this._l ? "position:absolute;" : this._n) + '" class="rsSlide"></div>'));
      f <= this.currSlideId && this.currSlideId++;
      this.ev.trigger("rsOnAppendSlide", [c, f]);
      this._f4(f);
      f === this.currSlideId && this.ev.trigger("rsAfterSlideChange")
    },
    removeSlide: function (b) {
      var f = this.slides[b];
      f && (f.holder && f.holder.remove(), b < this.currSlideId && this.currSlideId--, this.slides.splice(b, 1), this.slidesJQ.splice(b, 1), this.ev.trigger("rsOnRemoveSlide", [b]), this._f4(b), b === this.currSlideId && this.ev.trigger("rsAfterSlideChange"))
    },
    _f4: function (b) {
      var f = this;
      b = f.numSlides;
      b = 0 >= f._u ? 0 : Math.floor(f._u / b);
      f.numSlides = f.slides.length;
      0 === f.numSlides ? (f.currSlideId = f._d1 = f._u = 0, f.currSlide = f._g4 = null) : f._u = b * f.numSlides + f.currSlideId;
      for (b = 0; b < f.numSlides; b++) f.slides[b].id = b;
      f.currSlide = f.slides[f.currSlideId];
      f._r1 = f.slidesJQ[f.currSlideId];
      f.currSlideId >= f.numSlides ? f.goTo(f.numSlides - 1) : 0 > f.currSlideId && f.goTo(0);
      f._t();
      f._l && f._p1.css(f._g + f._u1, "0ms");
      f._h4 && clearTimeout(f._h4);
      f._h4 = setTimeout(function () {
        f._l && f._p3((-f._u - f._d1) * f._w);
        f._n2();
        f._l || f._r1.css({
          display: "block",
          opacity: 1
        })
      }, 14);
      f.ev.trigger("rsOnUpdateNav")
    },
    _i1: function () {
      this._f1 && this._l && (this._g1 ? this._e1.css("cursor", this._g1) : (this._e1.removeClass("grabbing-cursor"), this._e1.addClass("grab-cursor")))
    },
    _w2: function () {
      this._f1 && this._l && (this._h1 ? this._e1.css("cursor", this._h1) : (this._e1.removeClass("grab-cursor"), this._e1.addClass("grabbing-cursor")))
    },
    next: function (b) {
      this._m2("next", this.st.transitionSpeed, !0, !b)
    },
    prev: function (b) {
      this._m2("prev", this.st.transitionSpeed, !0, !b)
    },
    _m2: function (b, f, c, a, e) {
      var g = this,
          d, h, k;
      g.ev.trigger("rsBeforeMove", [b, a]);
      k = "next" === b ? g.currSlideId + 1 : "prev" === b ? g.currSlideId - 1 : b = parseInt(b, 10);
      if (!g._z) {
        if (0 > k) {
          g._i4("left", !a);
          return
        }
        if (k >= g.numSlides) {
          g._i4("right", !a);
          return
        }
      }
      g._r2 && (g._u2(!0), c = !1);
      h = k - g.currSlideId;
      k = g._o2 =
      g.currSlideId;
      var l = g.currSlideId + h;
      a = g._u;
      var n;
      g._z ? (l = g._n2(!1, l), a += h) : a = l;
      g._o = l;
      g._g4 = g.slidesJQ[g.currSlideId];
      g._u = a;
      g.currSlideId = g._o;
      g.currSlide = g.slides[g.currSlideId];
      g._r1 = g.slidesJQ[g.currSlideId];
      var l = g.st.slidesDiff,
          m = Boolean(0 < h);
      h = Math.abs(h);
      var p = Math.floor(k / g._y),
          q = Math.floor((k + (m ? l : -l)) / g._y),
          p = (m ? Math.max(p, q) : Math.min(p, q)) * g._y + (m ? g._y - 1 : 0);
      p > g.numSlides - 1 ? p = g.numSlides - 1 : 0 > p && (p = 0);
      k = m ? p - k : k - p;
      k > g._y && (k = g._y);
      if (h > k + l) for (g._d1 += (h - (k + l)) * (m ? -1 : 1), f *= 1.4, k = 0; k < g.numSlides; k++) g.slides[k].positionSet = !1;
      g._c = f;
      g._n2(!0);
      e || (n = !0);
      d = (-a - g._d1) * g._w;
      n ? setTimeout(function () {
        g._j4 = !1;
        g._x3(d, b, !1, c);
        g.ev.trigger("rsOnUpdateNav")
      }, 0) : (g._x3(d, b, !1, c), g.ev.trigger("rsOnUpdateNav"))
    },
    _f2: function () {
      this.st.arrowsNav && (1 >= this.numSlides ? (this._c2.css("display", "none"), this._d2.css("display", "none")) : (this._c2.css("display", "block"), this._d2.css("display", "block"), this._z || this.st.loopRewind || (0 === this.currSlideId ? this._c2.addClass("rsArrowDisabled") : this._c2.removeClass("rsArrowDisabled"), this.currSlideId === this.numSlides - 1 ? this._d2.addClass("rsArrowDisabled") : this._d2.removeClass("rsArrowDisabled"))))
    },
    _x3: function (b, f, c, a, e) {
      function g() {
        var a;
        h && (a = h.data("rsTimeout")) && (h !== k && h.css({
          opacity: 0,
          display: "none",
          zIndex: 0
        }), clearTimeout(a), h.data("rsTimeout", ""));
        if (a = k.data("rsTimeout")) clearTimeout(a), k.data("rsTimeout", "")
      }
      var d = this,
          h, k, l = {};
      isNaN(d._c) && (d._c = 400);
      d._p = d._h3 = b;
      d.ev.trigger("rsBeforeAnimStart");
      d._e ? d._l ? (d._c = parseInt(d._c, 10), c = d._g + d._v1, l[d._g + d._u1] = d._c + "ms", l[c] = a ? n.rsCSS3Easing[d.st.easeInOut] : n.rsCSS3Easing[d.st.easeOut], d._p1.css(l), a || !d.hasTouch ? setTimeout(function () {
        d._p3(b)
      }, 5) : d._p3(b)) : (d._c = d.st.transitionSpeed, h = d._g4, k = d._r1, k.data("rsTimeout") && k.css("opacity", 0), g(), h && h.data("rsTimeout", setTimeout(function () {
        l[d._g + d._u1] = "0ms";
        l.zIndex = 0;
        l.display = "none";
        h.data("rsTimeout", "");
        h.css(l);
        setTimeout(function () {
          h.css("opacity", 0)
        }, 16)
      }, d._c + 60)), l.display = "block", l.zIndex = d._m, l.opacity = 0, l[d._g + d._u1] = "0ms", l[d._g + d._v1] = n.rsCSS3Easing[d.st.easeInOut], k.css(l), k.data("rsTimeout", setTimeout(function () {
        k.css(d._g + d._u1, d._c + "ms");
        k.data("rsTimeout", setTimeout(function () {
          k.css("opacity", 1);
          k.data("rsTimeout", "")
        }, 20))
      }, 20))) : d._l ? (l[d._h ? d._x1 : d._w1] = b + "px", d._p1.animate(l, d._c, a ? d.st.easeInOut : d.st.easeOut)) : (h = d._g4, k = d._r1, k.stop(!0, !0).css({
        opacity: 0,
        display: "block",
        zIndex: d._m
      }), d._c = d.st.transitionSpeed, k.animate({
        opacity: 1
      }, d._c, d.st.easeInOut), g(), h && h.data("rsTimeout", setTimeout(function () {
        h.stop(!0, !0).css({
          opacity: 0,
          display: "none",
          zIndex: 0
        })
      }, d._c + 60)));
      d._r2 = !0;
      d.loadingTimeout && clearTimeout(d.loadingTimeout);
      d.loadingTimeout = e ? setTimeout(function () {
        d.loadingTimeout = null;
        e.call()
      }, d._c + 60) : setTimeout(function () {
        d.loadingTimeout = null;
        d._k4(f)
      }, d._c + 60)
    },
    _u2: function (b) {
      this._r2 = !1;
      clearTimeout(this.loadingTimeout);
      if (this._l) if (!this._e) this._p1.stop(!0), this._p = parseInt(this._p1.css(this._h ? this._x1 : this._w1), 10);
      else {
        if (!b) {
          b = this._p;
          var f = this._h3 = this._l4();
          this._p1.css(this._g + this._u1, "0ms");
          b !== f && this._p3(f)
        }
      } else 20 < this._m ? this._m = 10 : this._m++
    },
    _l4: function () {
      var b = window.getComputedStyle(this._p1.get(0), null).getPropertyValue(this._g + "transform").replace(/^matrix\(/i, "").split(/, |\)$/g),
          f = 0 === b[0].indexOf("matrix3d");
      return parseInt(b[this._h ? f ? 12 : 4 : f ? 13 : 5], 10)
    },
    _m4: function (b, f) {
      return this._e ? this._y1 + (f ? b + this._z1 + 0 : 0 + this._z1 + b) + this._a2 : b
    },
    _k4: function (b) {
      this._l || (this._r1.css("z-index", 0), this._m = 10);
      this._r2 = !1;
      this.staticSlideId = this.currSlideId;
      this._n2();
      this._n4 = !1;
      this.ev.trigger("rsAfterSlideChange")
    },
    _i4: function (b, f) {
      var c =
      this,
          a = (-c._u - c._d1) * c._w;
      if (0 !== c.numSlides && !c._r2) if (c.st.loopRewind) c.goTo("left" === b ? c.numSlides - 1 : 0, f);
      else if (c._l) {
        c._c = 200;
        var e = function () {
          c._r2 = !1
        };
        c._x3(a + ("left" === b ? 30 : -30), "", !1, !0, function () {
          c._r2 = !1;
          c._x3(a, "", !1, !0, e)
        })
      }
    },
    _q2: function (b, f) {
      if (!b.isRendered) {
        var c = b.content,
            a = "rsMainSlideImage",
            e, g = this.st.imageAlignCenter,
            d = this.st.imageScaleMode,
            h;
        b.videoURL && (a = "rsVideoContainer", "fill" !== d ? e = !0 : (h = c, h.hasClass(a) || (h = h.find("." + a)), h.css({
          width: "100%",
          height: "100%"
        }), a = "rsMainSlideImage"));
        c.hasClass(a) || (c = c.find("." + a));
        if (c) {
          var k = b.iW,
              l = b.iH;
          b.isRendered = !0;
          if ("none" !== d || g) {
            a = "fill" !== d ? this._d4 : 0;
            h = this._b4 - 2 * a;
            var n = this._c4 - 2 * a,
                m, p, q = {};
            "fit-if-smaller" === d && (k > h || l > n) && (d = "fit");
            if ("fill" === d || "fit" === d) m = h / k, p = n / l, m = "fill" == d ? m > p ? m : p : "fit" == d ? m < p ? m : p : 1, k = Math.ceil(k * m, 10), l = Math.ceil(l * m, 10);
            "none" !== d && (q.width = k, q.height = l, e && c.find(".rsImg").css({
              width: "100%",
              height: "100%"
            }));
            g && (q.marginLeft = Math.floor((h - k) / 2) + a, q.marginTop = Math.floor((n - l) / 2) + a);
            c.css(q)
          }
        }
      }
    }
  };
  n.rsProto =
  u.prototype;
  n.fn.royalSlider = function (b) {
    var f = arguments;
    return this.each(function () {
      var c = n(this);
      if ("object" !== typeof b && b) {
        if ((c = c.data("royalSlider")) && c[b]) return c[b].apply(c, Array.prototype.slice.call(f, 1))
      } else c.data("royalSlider") || c.data("royalSlider", new u(c, b))
    })
  };
  n.fn.royalSlider.defaults = {
    slidesSpacing: 8,
    startSlideId: 0,
    loop: !1,
    loopRewind: !1,
    numImagesToPreload: 4,
    fadeinLoadedSlide: !0,
    slidesOrientation: "horizontal",
    transitionType: "move",
    transitionSpeed: 600,
    controlNavigation: "bullets",
    controlsInside: !0,
    arrowsNav: !0,
    arrowsNavAutoHide: !0,
    navigateByClick: !0,
    randomizeSlides: !1,
    sliderDrag: !0,
    sliderTouch: !0,
    keyboardNavEnabled: !1,
    fadeInAfterLoaded: !0,
    allowCSS3: !0,
    allowCSS3OnWebkit: !0,
    addActiveClass: !1,
    autoHeight: !1,
    easeOut: "easeOutSine",
    easeInOut: "easeInOutSine",
    minSlideOffset: 10,
    imageScaleMode: "fit-if-smaller",
    imageAlignCenter: !0,
    imageScalePadding: 4,
    usePreloader: !0,
    autoScaleSlider: !1,
    autoScaleSliderWidth: 800,
    autoScaleSliderHeight: 400,
    autoScaleHeight: !0,
    arrowsNavHideOnTouch: !1,
    globalCaption: !1,
    slidesDiff: 2
  };
  n.rsCSS3Easing = {
    easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
    easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)"
  };
  n.extend(jQuery.easing, {
    easeInOutSine: function (b, f, c, a, e) {
      return -a / 2 * (Math.cos(Math.PI * f / e) - 1) + c
    },
    easeOutSine: function (b, f, c, a, e) {
      return a * Math.sin(f / e * (Math.PI / 2)) + c
    },
    easeOutCubic: function (b, f, c, a, e) {
      return a * ((f = f / e - 1) * f * f + 1) + c
    }
  })
})(jQuery, window);
// jquery.rs.bullets v1.0.1
(function (c) {
  c.extend(c.rsProto, {
    _i5: function () {
      var a = this;
      "bullets" === a.st.controlNavigation && (a.ev.one("rsAfterPropsSetup", function () {
        a._j5 = !0;
        a.slider.addClass("rsWithBullets");
        for (var b = '<div class="rsNav rsBullets">', e = 0; e < a.numSlides; e++) b += '<div class="rsNavItem rsBullet"><span></span></div>';
        a._k5 = b = c(b + "</div>");
        a._l5 = b.appendTo(a.slider).children();
        a._k5.on("click.rs", ".rsNavItem", function (b) {
          a._m5 || a.goTo(c(this).index())
        })
      }), a.ev.on("rsOnAppendSlide", function (b, c, d) {
        d >= a.numSlides ? a._k5.append('<div class="rsNavItem rsBullet"><span></span></div>') : a._l5.eq(d).before('<div class="rsNavItem rsBullet"><span></span></div>');
        a._l5 = a._k5.children()
      }), a.ev.on("rsOnRemoveSlide", function (b, c) {
        var d = a._l5.eq(c);
        d && d.length && (d.remove(), a._l5 = a._k5.children())
      }), a.ev.on("rsOnUpdateNav", function () {
        var b = a.currSlideId;
        a._n5 && a._n5.removeClass("rsNavSelected");
        b = a._l5.eq(b);
        b.addClass("rsNavSelected");
        a._n5 = b
      }))
    }
  });
  c.rsModules.bullets = c.rsProto._i5
})(jQuery);
// jquery.rs.thumbnails v1.0.8
(function (f) {
  f.extend(f.rsProto, {
    _h6: function () {
      var a = this;
      "thumbnails" === a.st.controlNavigation && (a._i6 = {
        drag: !0,
        touch: !0,
        orientation: "horizontal",
        navigation: !0,
        arrows: !0,
        arrowLeft: null,
        arrowRight: null,
        spacing: 4,
        arrowsAutoHide: !1,
        appendSpan: !1,
        transitionSpeed: 600,
        autoCenter: !0,
        fitInViewport: !0,
        firstMargin: !0,
        paddingTop: 0,
        paddingBottom: 0
      }, a.st.thumbs = f.extend({}, a._i6, a.st.thumbs), a._j6 = !0, !1 === a.st.thumbs.firstMargin ? a.st.thumbs.firstMargin = 0 : !0 === a.st.thumbs.firstMargin && (a.st.thumbs.firstMargin =
      a.st.thumbs.spacing), a.ev.on("rsBeforeParseNode", function (a, b, c) {
        b = f(b);
        c.thumbnail = b.find(".rsTmb").remove();
        c.thumbnail.length ? c.thumbnail = f(document.createElement("div")).append(c.thumbnail).html() : (c.thumbnail = b.attr("data-rsTmb"), c.thumbnail || (c.thumbnail = b.find(".rsImg").attr("data-rsTmb")), c.thumbnail = c.thumbnail ? '<img src="' + c.thumbnail + '"/>' : "")
      }), a.ev.one("rsAfterPropsSetup", function () {
        a._k6()
      }), a._n5 = null, a.ev.on("rsOnUpdateNav", function () {
        var e = f(a._l5[a.currSlideId]);
        e !== a._n5 && (a._n5 && (a._n5.removeClass("rsNavSelected"), a._n5 = null), a._l6 && a._m6(a.currSlideId), a._n5 = e.addClass("rsNavSelected"))
      }), a.ev.on("rsOnAppendSlide", function (e, b, c) {
        e = "<div" + a._n6 + ' class="rsNavItem rsThumb">' + a._o6 + b.thumbnail + "</div>";
        a._e && a._s3.css(a._g + "transition-duration", "0ms");
        c >= a.numSlides ? a._s3.append(e) : a._l5.eq(c).before(e);
        a._l5 = a._s3.children();
        a.updateThumbsSize(!0)
      }), a.ev.on("rsOnRemoveSlide", function (e, b) {
        var c = a._l5.eq(b);
        c && (a._e && a._s3.css(a._g + "transition-duration", "0ms"), c.remove(), a._l5 = a._s3.children(), a.updateThumbsSize(!0))
      }))
    },
    _k6: function () {
      var a = this,
          e = "rsThumbs",
          b = a.st.thumbs,
          c = "",
          g, d, h = b.spacing;
      a._j5 = !0;
      a._e3 = "vertical" === b.orientation ? !1 : !0;
      a._n6 = g = h ? ' style="margin-' + (a._e3 ? "right" : "bottom") + ":" + h + 'px;"' : "";
      a._i3 = 0;
      a._p6 = !1;
      a._m5 = !1;
      a._l6 = !1;
      a._q6 = b.arrows && b.navigation;
      d = a._e3 ? "Hor" : "Ver";
      a.slider.addClass("rsWithThumbs rsWithThumbs" + d);
      c += '<div class="rsNav rsThumbs rsThumbs' + d + '"><div class="' + e + 'Container">';
      a._o6 = b.appendSpan ? '<span class="thumbIco"></span>' : "";
      for (var k = 0; k < a.numSlides; k++) d = a.slides[k], c += "<div" + g + ' class="rsNavItem rsThumb">' + d.thumbnail + a._o6 + "</div>";
      c = f(c + "</div></div>");
      g = {};
      b.paddingTop && (g[a._e3 ? "paddingTop" : "paddingLeft"] = b.paddingTop);
      b.paddingBottom && (g[a._e3 ? "paddingBottom" : "paddingRight"] = b.paddingBottom);
      c.css(g);
      a._s3 = f(c).find("." + e + "Container");
      a._q6 && (e += "Arrow", b.arrowLeft ? a._r6 = b.arrowLeft : (a._r6 = f('<div class="' + e + " " + e + 'Left"><div class="' + e + 'Icn"></div></div>'), c.append(a._r6)), b.arrowRight ? a._s6 = b.arrowRight : (a._s6 = f('<div class="' + e + " " + e + 'Right"><div class="' + e + 'Icn"></div></div>'), c.append(a._s6)), a._r6.click(function () {
        var b = (Math.floor(a._i3 / a._t6) + a._u6) * a._t6 + a.st.thumbs.firstMargin;
        a._a4(b > a._n3 ? a._n3 : b)
      }), a._s6.click(function () {
        var b = (Math.floor(a._i3 / a._t6) - a._u6) * a._t6 + a.st.thumbs.firstMargin;
        a._a4(b < a._o3 ? a._o3 : b)
      }), b.arrowsAutoHide && !a.hasTouch && (a._r6.css("opacity", 0), a._s6.css("opacity", 0), c.one("mousemove.rsarrowshover", function () {
        a._l6 && (a._r6.css("opacity", 1), a._s6.css("opacity", 1))
      }), c.hover(function () {
        a._l6 && (a._r6.css("opacity", 1), a._s6.css("opacity", 1))
      }, function () {
        a._l6 && (a._r6.css("opacity", 0), a._s6.css("opacity", 0))
      })));
      a._k5 = c;
      a._l5 = a._s3.children();
      a.msEnabled && a.st.thumbs.navigation && a._s3.css("-ms-touch-action", a._e3 ? "pan-y" : "pan-x");
      a.slider.append(c);
      a._w3 = !0;
      a._v6 = h;
      b.navigation && a._e && a._s3.css(a._g + "transition-property", a._g + "transform");
      a._k5.on("click.rs", ".rsNavItem", function (b) {
        a._m5 || a.goTo(f(this).index())
      });
      a.ev.off("rsBeforeSizeSet.thumbs").on("rsBeforeSizeSet.thumbs", function () {
        a._w6 = a._e3 ? a._c4 : a._b4;
        a.updateThumbsSize(!0)
      });
      a.ev.off("rsAutoHeightChange.thumbs").on("rsAutoHeightChange.thumbs", function (b, c) {
        a.updateThumbsSize(!0, c)
      })
    },
    updateThumbsSize: function (a, e) {
      var b = this,
          c = b._l5.first(),
          f = {},
          d = b._l5.length;
      b._t6 = (b._e3 ? c.outerWidth() : c.outerHeight()) + b._v6;
      b._y3 = d * b._t6 - b._v6;
      f[b._e3 ? "width" : "height"] = b._y3 + b._v6;
      b._z3 = b._e3 ? b._k5.width() : void 0 !== e ? e : b._k5.height();
      b._w3 && (b.isFullscreen || b.st.thumbs.fitInViewport) && (b._e3 ? b._c4 = b._w6 - b._k5.outerHeight() : b._b4 = b._w6 - b._k5.outerWidth());
      b._z3 && (b._o3 = -(b._y3 - b._z3) - b.st.thumbs.firstMargin, b._n3 = b.st.thumbs.firstMargin, b._u6 = Math.floor(b._z3 / b._t6), b._y3 < b._z3 ? (b.st.thumbs.autoCenter ? b._q3((b._z3 - b._y3) / 2) : b._q3(b._n3), b.st.thumbs.arrows && b._r6 && (b._r6.addClass("rsThumbsArrowDisabled"), b._s6.addClass("rsThumbsArrowDisabled")), b._l6 = !1, b._m5 = !1, b._k5.off(b._j1)) : b.st.thumbs.navigation && !b._l6 && (b._l6 = !0, !b.hasTouch && b.st.thumbs.drag || b.hasTouch && b.st.thumbs.touch) && (b._m5 = !0, b._k5.on(b._j1, function (a) {
        b._g2(a, !0)
      })), b._s3.css(f), a && e && b._m6(b.currSlideId, !0))
    },
    setThumbsOrientation: function (a, e) {
      this._w3 && (this.st.thumbs.orientation = a, this._k5.remove(), this.slider.removeClass("rsWithThumbsHor rsWithThumbsVer"), this._k6(), this._k5.off(this._j1), e || this.updateSliderSize(!0))
    },
    _q3: function (a) {
      this._i3 = a;
      this._e ? this._s3.css(this._x1, this._y1 + (this._e3 ? a + this._z1 + 0 : 0 + this._z1 + a) + this._a2) : this._s3.css(this._e3 ? this._x1 : this._w1, a)
    },
    _a4: function (a, e, b, c, g) {
      var d = this;
      if (d._l6) {
        e || (e = d.st.thumbs.transitionSpeed);
        d._i3 = a;
        d._x6 && clearTimeout(d._x6);
        d._p6 && (d._e || d._s3.stop(), b = !0);
        var h = {};
        d._p6 = !0;
        d._e ? (h[d._g + "transition-duration"] = e + "ms", h[d._g + "transition-timing-function"] = b ? f.rsCSS3Easing[d.st.easeOut] : f.rsCSS3Easing[d.st.easeInOut], d._s3.css(h), d._q3(a)) : (h[d._e3 ? d._x1 : d._w1] = a + "px", d._s3.animate(h, e, b ? "easeOutCubic" : d.st.easeInOut));
        c && (d._i3 = c);
        d._y6();
        d._x6 = setTimeout(function () {
          d._p6 = !1;
          g && (d._a4(c, g, !0), g = null)
        }, e)
      }
    },
    _y6: function () {
      this._q6 && (this._i3 === this._n3 ? this._r6.addClass("rsThumbsArrowDisabled") : this._r6.removeClass("rsThumbsArrowDisabled"), this._i3 === this._o3 ? this._s6.addClass("rsThumbsArrowDisabled") : this._s6.removeClass("rsThumbsArrowDisabled"))
    },
    _m6: function (a, e) {
      var b = 0,
          c, f = a * this._t6 + 2 * this._t6 - this._v6 + this._n3,
          d = Math.floor(this._i3 / this._t6);
      this._l6 && (this._j6 && (e = !0, this._j6 = !1), f + this._i3 > this._z3 ? (a === this.numSlides - 1 && (b = 1), d = -a + this._u6 - 2 + b, c = d * this._t6 + this._z3 % this._t6 + this._v6 - this._n3) : 0 !== a ? (a - 1) * this._t6 <= -this._i3 + this._n3 && a - 1 <= this.numSlides - this._u6 && (c = (-a + 1) * this._t6 + this._n3) : c = this._n3, c !== this._i3 && (b = void 0 === c ? this._i3 : c, b > this._n3 ? this._q3(this._n3) : b < this._o3 ? this._q3(this._o3) : void 0 !== c && (e ? this._q3(c) : this._a4(c))), this._y6())
    }
  });
  f.rsModules.thumbnails = f.rsProto._h6
})(jQuery);
// jquery.rs.tabs v1.0.2
(function (e) {
  e.extend(e.rsProto, {
    _f6: function () {
      var a = this;
      "tabs" === a.st.controlNavigation && (a.ev.on("rsBeforeParseNode", function (a, d, b) {
        d = e(d);
        b.thumbnail = d.find(".rsTmb").remove();
        b.thumbnail.length ? b.thumbnail = e(document.createElement("div")).append(b.thumbnail).html() : (b.thumbnail = d.attr("data-rsTmb"), b.thumbnail || (b.thumbnail = d.find(".rsImg").attr("data-rsTmb")), b.thumbnail = b.thumbnail ? '<img src="' + b.thumbnail + '"/>' : "")
      }), a.ev.one("rsAfterPropsSetup", function () {
        a._g6()
      }), a.ev.on("rsOnAppendSlide", function (c, d, b) {
        b >= a.numSlides ? a._k5.append('<div class="rsNavItem rsTab">' + d.thumbnail + "</div>") : a._l5.eq(b).before('<div class="rsNavItem rsTab">' + item.thumbnail + "</div>");
        a._l5 = a._k5.children()
      }), a.ev.on("rsOnRemoveSlide", function (c, d) {
        var b = a._l5.eq(d);
        b && (b.remove(), a._l5 = a._k5.children())
      }), a.ev.on("rsOnUpdateNav", function () {
        var c = a.currSlideId;
        a._n5 && a._n5.removeClass("rsNavSelected");
        c = a._l5.eq(c);
        c.addClass("rsNavSelected");
        a._n5 = c
      }))
    },
    _g6: function () {
      var a = this,
          c;
      a._j5 = !0;
      c = '<div class="rsNav rsTabs">';
      for (var d = 0; d < a.numSlides; d++) c += '<div class="rsNavItem rsTab">' + a.slides[d].thumbnail + "</div>";
      c = e(c + "</div>");
      a._k5 = c;
      a._l5 = c.children(".rsNavItem");
      a.slider.append(c);
      a._k5.click(function (b) {
        b = e(b.target).closest(".rsNavItem");
        b.length && a.goTo(b.index())
      })
    }
  });
  e.rsModules.tabs = e.rsProto._f6
})(jQuery);
// jquery.rs.fullscreen v1.0.6
(function (c) {
  c.extend(c.rsProto, {
    _q5: function () {
      var a = this;
      a._r5 = {
        enabled: !1,
        keyboardNav: !0,
        buttonFS: !0,
        nativeFS: !1,
        doubleTap: !0
      };
      a.st.fullscreen = c.extend({}, a._r5, a.st.fullscreen);
      if (a.st.fullscreen.enabled) a.ev.one("rsBeforeSizeSet", function () {
        a._s5()
      })
    },
    _s5: function () {
      var a = this;
      a._t5 = !a.st.keyboardNavEnabled && a.st.fullscreen.keyboardNav;
      if (a.st.fullscreen.nativeFS) {
        var b = {
          supportsFullScreen: !1,
          isFullScreen: function () {
            return !1
          },
          requestFullScreen: function () {},
          cancelFullScreen: function () {},
          fullScreenEventName: "",
          prefix: ""
        },
            d = ["webkit", "moz", "o", "ms", "khtml"];
        if ("undefined" != typeof document.cancelFullScreen) b.supportsFullScreen = !0;
        else for (var e = 0, f = d.length; e < f; e++) if (b.prefix = d[e], "undefined" != typeof document[b.prefix + "CancelFullScreen"]) {
          b.supportsFullScreen = !0;
          break
        }
        b.supportsFullScreen ? (a.nativeFS = !0, b.fullScreenEventName = b.prefix + "fullscreenchange" + a.ns, b.isFullScreen = function () {
          switch (this.prefix) {
          case "":
            return document.fullScreen;
          case "webkit":
            return document.webkitIsFullScreen;
          default:
            return document[this.prefix + "FullScreen"]
          }
        }, b.requestFullScreen = function (a) {
          return "" === this.prefix ? a.requestFullScreen() : a[this.prefix + "RequestFullScreen"]()
        }, b.cancelFullScreen = function (a) {
          return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
        }, a._u5 = b) : a._u5 = !1
      }
      a.st.fullscreen.buttonFS && (a._v5 = c('<div class="rsFullscreenBtn"><div class="rsFullscreenIcn"></div></div>').appendTo(a._o1).on("click.rs", function () {
        a.isFullscreen ? a.exitFullscreen() : a.enterFullscreen()
      }))
    },
    enterFullscreen: function (a) {
      var b =
      this;
      if (b._u5) if (a) b._u5.requestFullScreen(c("html")[0]);
      else {
        b._b.on(b._u5.fullScreenEventName, function (a) {
          b._u5.isFullScreen() ? b.enterFullscreen(!0) : b.exitFullscreen(!0)
        });
        b._u5.requestFullScreen(c("html")[0]);
        return
      }
      if (!b._w5) {
        b._w5 = !0;
        b._b.on("keyup" + b.ns + "fullscreen", function (a) {
          27 === a.keyCode && b.exitFullscreen()
        });
        b._t5 && b._b2();
        a = c(window);
        b._x5 = a.scrollTop();
        b._y5 = a.scrollLeft();
        b._z5 = c("html").attr("style");
        b._a6 = c("body").attr("style");
        b._b6 = b.slider.attr("style");
        c("body, html").css({
          overflow: "hidden",
          height: "100%",
          width: "100%",
          margin: "0",
          padding: "0"
        });
        b.slider.addClass("rsFullscreen");
        var d;
        for (d = 0; d < b.numSlides; d++) a = b.slides[d], a.isRendered = !1, a.bigImage && (a.isBig = !0, a.isMedLoaded = a.isLoaded, a.isMedLoading = a.isLoading, a.medImage = a.image, a.medIW = a.iW, a.medIH = a.iH, a.slideId = -99, a.bigImage !== a.medImage && (a.sizeType = "big"), a.isLoaded = a.isBigLoaded, a.isLoading = !1, a.image = a.bigImage, a.images[0] = a.bigImage, a.iW = a.bigIW, a.iH = a.bigIH, a.isAppended = a.contentAdded = !1, b._c6(a));
        b.isFullscreen = !0;
        b._w5 = !1;
        b.updateSliderSize();
        b.ev.trigger("rsEnterFullscreen")
      }
    },
    exitFullscreen: function (a) {
      var b = this;
      if (b._u5) {
        if (!a) {
          b._u5.cancelFullScreen(c("html")[0]);
          return
        }
        b._b.off(b._u5.fullScreenEventName)
      }
      if (!b._w5) {
        b._w5 = !0;
        b._b.off("keyup" + b.ns + "fullscreen");
        b._t5 && b._b.off("keydown" + b.ns);
        c("html").attr("style", b._z5 || "");
        c("body").attr("style", b._a6 || "");
        var d;
        for (d = 0; d < b.numSlides; d++) a = b.slides[d], a.isRendered = !1, a.bigImage && (a.isBig = !1, a.slideId = -99, a.isBigLoaded = a.isLoaded, a.isBigLoading = a.isLoading, a.bigImage =
        a.image, a.bigIW = a.iW, a.bigIH = a.iH, a.isLoaded = a.isMedLoaded, a.isLoading = !1, a.image = a.medImage, a.images[0] = a.medImage, a.iW = a.medIW, a.iH = a.medIH, a.isAppended = a.contentAdded = !1, b._c6(a, !0), a.bigImage !== a.medImage && (a.sizeType = "med"));
        b.isFullscreen = !1;
        a = c(window);
        a.scrollTop(b._x5);
        a.scrollLeft(b._y5);
        b._w5 = !1;
        b.slider.removeClass("rsFullscreen");
        b.updateSliderSize();
        setTimeout(function () {
          b.updateSliderSize()
        }, 1);
        b.ev.trigger("rsExitFullscreen")
      }
    },
    _c6: function (a, b) {
      var d = a.isLoaded || a.isLoading ? '<img class="rsImg rsMainSlideImage" src="' + a.image + '"/>' : '<a class="rsImg rsMainSlideImage" href="' + a.image + '"></a>';
      a.content.hasClass("rsImg") ? a.content = c(d) : a.content.find(".rsImg").eq(0).replaceWith(d);
      a.isLoaded || a.isLoading || !a.holder || a.holder.html(a.content)
    }
  });
  c.rsModules.fullscreen = c.rsProto._q5
})(jQuery);
// jquery.rs.autoplay v1.0.5
(function (b) {
  b.extend(b.rsProto, {
    _x4: function () {
      var a = this,
          d;
      a._y4 = {
        enabled: !1,
        stopAtAction: !0,
        pauseOnHover: !0,
        delay: 2E3
      };
      !a.st.autoPlay && a.st.autoplay && (a.st.autoPlay = a.st.autoplay);
      a.st.autoPlay = b.extend({}, a._y4, a.st.autoPlay);
      a.st.autoPlay.enabled && (a.ev.on("rsBeforeParseNode", function (a, c, f) {
        c = b(c);
        if (d = c.attr("data-rsDelay")) f.customDelay = parseInt(d, 10)
      }), a.ev.one("rsAfterInit", function () {
        a._z4()
      }), a.ev.on("rsBeforeDestroy", function () {
        a.stopAutoPlay();
        a.slider.off("mouseenter mouseleave");
        b(window).off("blur" + a.ns + " focus" + a.ns)
      }))
    },
    _z4: function () {
      var a = this;
      a.startAutoPlay();
      a.ev.on("rsAfterContentSet", function (b, e) {
        a._l2 || a._r2 || !a._a5 || e !== a.currSlide || a._b5()
      });
      a.ev.on("rsDragRelease", function () {
        a._a5 && a._c5 && (a._c5 = !1, a._b5())
      });
      a.ev.on("rsAfterSlideChange", function () {
        a._a5 && a._c5 && (a._c5 = !1, a.currSlide.isLoaded && a._b5())
      });
      a.ev.on("rsDragStart", function () {
        a._a5 && (a.st.autoPlay.stopAtAction ? a.stopAutoPlay() : (a._c5 = !0, a._d5()))
      });
      a.ev.on("rsBeforeMove", function (b, e, c) {
        a._a5 && (c && a.st.autoPlay.stopAtAction ? a.stopAutoPlay() : (a._c5 = !0, a._d5()))
      });
      a._e5 = !1;
      a.ev.on("rsVideoStop", function () {
        a._a5 && (a._e5 = !1, a._b5())
      });
      a.ev.on("rsVideoPlay", function () {
        a._a5 && (a._c5 = !1, a._d5(), a._e5 = !0)
      });
      b(window).on("blur" + a.ns, function () {
        a._a5 && (a._c5 = !0, a._d5())
      }).on("focus" + a.ns, function () {
        a._a5 && a._c5 && (a._c5 = !1, a._b5())
      });
      a.st.autoPlay.pauseOnHover && (a._f5 = !1, a.slider.hover(function () {
        a._a5 && (a._c5 = !1, a._d5(), a._f5 = !0)
      }, function () {
        a._a5 && (a._f5 = !1, a._b5())
      }))
    },
    toggleAutoPlay: function () {
      this._a5 ? this.stopAutoPlay() : this.startAutoPlay()
    },
    startAutoPlay: function () {
      this._a5 = !0;
      this.currSlide.isLoaded && this._b5()
    },
    stopAutoPlay: function () {
      this._e5 = this._f5 = this._c5 = this._a5 = !1;
      this._d5()
    },
    _b5: function () {
      var a = this;
      a._f5 || a._e5 || (a._g5 = !0, a._h5 && clearTimeout(a._h5), a._h5 = setTimeout(function () {
        var b;
        a._z || a.st.loopRewind || (b = !0, a.st.loopRewind = !0);
        a.next(!0);
        b && (a.st.loopRewind = !1)
      }, a.currSlide.customDelay ? a.currSlide.customDelay : a.st.autoPlay.delay))
    },
    _d5: function () {
      this._f5 || this._e5 || (this._g5 = !1, this._h5 && (clearTimeout(this._h5), this._h5 = null))
    }
  });
  b.rsModules.autoplay = b.rsProto._x4
})(jQuery);
// jquery.rs.video v1.1.3
(function (f) {
  f.extend(f.rsProto, {
    _z6: function () {
      var a = this;
      a._a7 = {
        autoHideArrows: !0,
        autoHideControlNav: !1,
        autoHideBlocks: !1,
        autoHideCaption: !1,
        disableCSS3inFF: !0,
        youTubeCode: '<iframe src="//www.youtube.com/embed/%id%?rel=1&showinfo=0&autoplay=1&wmode=transparent" frameborder="no"></iframe>',
        vimeoCode: '<iframe src="//player.vimeo.com/video/%id%?byline=0&portrait=0&autoplay=1" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
      };
      a.st.video = f.extend({}, a._a7, a.st.video);
      a.ev.on("rsBeforeSizeSet", function () {
        a._b7 && setTimeout(function () {
          var b = a._r1,
              b = b.hasClass("rsVideoContainer") ? b : b.find(".rsVideoContainer");
          a._c7 && a._c7.css({
            width: b.width(),
            height: b.height()
          })
        }, 32)
      });
      var d = a._a.mozilla;
      a.ev.on("rsAfterParseNode", function (b, c, e) {
        b = f(c);
        if (e.videoURL) {
          a.st.video.disableCSS3inFF && d && (a._e = a._f = !1);
          c = f('<div class="rsVideoContainer"></div>');
          var g = f('<div class="rsBtnCenterer"><div class="rsPlayBtn"><div class="rsPlayBtnIcon"></div></div></div>');
          b.hasClass("rsImg") ? e.content = c.append(b).append(g) : e.content.find(".rsImg").wrap(c).after(g)
        }
      });
      a.ev.on("rsAfterSlideChange", function () {
        a.stopVideo()
      })
    },
    toggleVideo: function () {
      return this._b7 ? this.stopVideo() : this.playVideo()
    },
    playVideo: function () {
      var a = this;
      if (!a._b7) {
        var d = a.currSlide;
        if (!d.videoURL) return !1;
        a._d7 = d;
        var b = a._e7 = d.content,
            d = d.videoURL,
            c, e;
        d.match(/youtu\.be/i) || d.match(/youtube\.com/i) ? (e = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/, (e = d.match(e)) && 11 == e[7].length && (c = e[7]), void 0 !== c && (a._c7 = a.st.video.youTubeCode.replace("%id%", c))) : d.match(/vimeo\.com/i) && (e = /(www\.)?vimeo.com\/(\d+)($|\/)/, (e = d.match(e)) && (c = e[2]), void 0 !== c && (a._c7 = a.st.video.vimeoCode.replace("%id%", c)));
        a.videoObj = f(a._c7);
        a.ev.trigger("rsOnCreateVideoElement", [d]);
        a.videoObj.length && (a._c7 = f('<div class="rsVideoFrameHolder"><div class="rsPreloader"></div><div class="rsCloseVideoBtn"><div class="rsCloseVideoIcn"></div></div></div>'), a._c7.find(".rsPreloader").after(a.videoObj), b = b.hasClass("rsVideoContainer") ? b : b.find(".rsVideoContainer"), a._c7.css({
          width: b.width(),
          height: b.height()
        }).find(".rsCloseVideoBtn").off("click.rsv").on("click.rsv", function (b) {
          a.stopVideo();
          b.preventDefault();
          b.stopPropagation();
          return !1
        }), b.append(a._c7), a.isIPAD && b.addClass("rsIOSVideo"), a._f7(!1), setTimeout(function () {
          a._c7.addClass("rsVideoActive")
        }, 10), a.ev.trigger("rsVideoPlay"), a._b7 = !0);
        return !0
      }
      return !1
    },
    stopVideo: function () {
      var a = this;
      return a._b7 ? (a.isIPAD && a.slider.find(".rsCloseVideoBtn").remove(), a._f7(!0), setTimeout(function () {
        a.ev.trigger("rsOnDestroyVideoElement", [a.videoObj]);
        var d = a._c7.find("iframe");
        if (d.length) try {
          d.attr("src", "")
        } catch (b) {}
        a._c7.remove();
        a._c7 = null
      }, 16), a.ev.trigger("rsVideoStop"), a._b7 = !1, !0) : !1
    },
    _f7: function (a, d) {
      var b = [],
          c = this.st.video;
      c.autoHideArrows && (this._c2 && (b.push(this._c2, this._d2), this._e2 = !a), this._v5 && b.push(this._v5));
      c.autoHideControlNav && this._k5 && b.push(this._k5);
      c.autoHideBlocks && this._d7.animBlocks && b.push(this._d7.animBlocks);
      c.autoHideCaption && this.globalCaption && b.push(this.globalCaption);
      this.slider[a ? "removeClass" : "addClass"]("rsVideoPlaying");
      if (b.length) for (c = 0; c < b.length; c++) a ? b[c].removeClass("rsHidden") : b[c].addClass("rsHidden")
    }
  });
  f.rsModules.video = f.rsProto._z6
})(jQuery);
// jquery.rs.animated-blocks v1.0.7
(function (l) {
  l.extend(l.rsProto, {
    _p4: function () {
      function m() {
        var g = a.currSlide;
        if (a.currSlide && a.currSlide.isLoaded && a._t4 !== g) {
          if (0 < a._s4.length) {
            for (b = 0; b < a._s4.length; b++) clearTimeout(a._s4[b]);
            a._s4 = []
          }
          if (0 < a._r4.length) {
            var f;
            for (b = 0; b < a._r4.length; b++) if (f = a._r4[b]) a._e ? (f.block.css(a._g + a._u1, "0s"), f.block.css(f.css)) : f.block.stop(!0).css(f.css), a._t4 = null, g.animBlocksDisplayed = !1;
            a._r4 = []
          }
          g.animBlocks && (g.animBlocksDisplayed = !0, a._t4 = g, a._u4(g.animBlocks))
        }
      }
      var a = this,
          b;
      a._q4 = {
        fadeEffect: !0,
        moveEffect: "top",
        moveOffset: 20,
        speed: 400,
        easing: "easeOutSine",
        delay: 200
      };
      a.st.block = l.extend({}, a._q4, a.st.block);
      a._r4 = [];
      a._s4 = [];
      a.ev.on("rsAfterInit", function () {
        m()
      });
      a.ev.on("rsBeforeParseNode", function (a, b, d) {
        b = l(b);
        d.animBlocks = b.find(".rsABlock").css("display", "none");
        d.animBlocks.length || (b.hasClass("rsABlock") ? d.animBlocks = b.css("display", "none") : d.animBlocks = !1)
      });
      a.ev.on("rsAfterContentSet", function (b, f) {
        f.id === a.slides[a.currSlideId].id && setTimeout(function () {
          m()
        }, a.st.fadeinLoadedSlide ? 300 : 0)
      });
      a.ev.on("rsAfterSlideChange", function () {
        m()
      })
    },
    _v4: function (l, a) {
      setTimeout(function () {
        l.css(a)
      }, 6)
    },
    _u4: function (m) {
      var a = this,
          b, g, f, d, h, e, n;
      a._s4 = [];
      m.each(function (m) {
        b = l(this);
        g = {};
        f = {};
        d = null;
        var c = b.attr("data-move-offset"),
            c = c ? parseInt(c, 10) : a.st.block.moveOffset;
        if (0 < c && ((e = b.data("move-effect")) ? (e = e.toLowerCase(), "none" === e ? e = !1 : "left" !== e && "top" !== e && "bottom" !== e && "right" !== e && (e = a.st.block.moveEffect, "none" === e && (e = !1))) : e = a.st.block.moveEffect, e && "none" !== e)) {
          var p;
          p = "right" === e || "left" === e ? !0 : !1;
          var k;
          n = !1;
          a._e ? (k = 0, h = a._x1) : (p ? isNaN(parseInt(b.css("right"), 10)) ? h = "left" : (h = "right", n = !0) : isNaN(parseInt(b.css("bottom"), 10)) ? h = "top" : (h = "bottom", n = !0), h = "margin-" + h, n && (c = -c), a._e ? k = parseInt(b.css(h), 10) : (k = b.data("rs-start-move-prop"), void 0 === k && (k = parseInt(b.css(h), 10), isNaN(k) && (k = 0), b.data("rs-start-move-prop", k))));
          f[h] = a._m4("top" === e || "left" === e ? k - c : k + c, p);
          g[h] = a._m4(k, p)
        }
        c = b.attr("data-fade-effect");
        if (!c) c = a.st.block.fadeEffect;
        else if ("none" === c.toLowerCase() || "false" === c.toLowerCase()) c = !1;
        c && (f.opacity = 0, g.opacity = 1);
        if (c || e) d = {}, d.hasFade = Boolean(c), Boolean(e) && (d.moveProp = h, d.hasMove = !0), d.speed = b.data("speed"), isNaN(d.speed) && (d.speed = a.st.block.speed), d.easing = b.data("easing"), d.easing || (d.easing = a.st.block.easing), d.css3Easing = l.rsCSS3Easing[d.easing], d.delay = b.data("delay"), isNaN(d.delay) && (d.delay = a.st.block.delay * m);
        c = {};
        a._e && (c[a._g + a._u1] = "0ms");
        c.moveProp = g.moveProp;
        c.opacity = g.opacity;
        c.display = "none";
        a._r4.push({
          block: b,
          css: c
        });
        a._v4(b, f);
        a._s4.push(setTimeout(function (b, d, c, e) {
          return function () {
            b.css("display", "block");
            if (c) {
              var g = {};
              if (a._e) {
                var f = "";
                c.hasMove && (f += c.moveProp);
                c.hasFade && (c.hasMove && (f += ", "), f += "opacity");
                g[a._g + a._t1] = f;
                g[a._g + a._u1] = c.speed + "ms";
                g[a._g + a._v1] = c.css3Easing;
                b.css(g);
                setTimeout(function () {
                  b.css(d)
                }, 24)
              } else setTimeout(function () {
                b.animate(d, c.speed, c.easing)
              }, 16)
            }
            delete a._s4[e]
          }
        }(b, g, d, m), 6 >= d.delay ? 12 : d.delay))
      })
    }
  });
  l.rsModules.animatedBlocks = l.rsProto._p4
})(jQuery);
// jquery.rs.auto-height v1.0.3
(function (b) {
  b.extend(b.rsProto, {
    _w4: function () {
      var a = this;
      if (a.st.autoHeight) {
        var b, c, e, f = !0,
            d = function (d) {
            e = a.slides[a.currSlideId];
            (b = e.holder) && (c = b.height()) && void 0 !== c && c > (a.st.minAutoHeight || 30) && (a._c4 = c, a._e || !d ? a._e1.css("height", c) : a._e1.stop(!0, !0).animate({
              height: c
            }, a.st.transitionSpeed), a.ev.trigger("rsAutoHeightChange", c), f && (a._e && setTimeout(function () {
              a._e1.css(a._g + "transition", "height " + a.st.transitionSpeed + "ms ease-in-out")
            }, 16), f = !1))
            };
        a.ev.on("rsMaybeSizeReady.rsAutoHeight", function (a, b) {
          e === b && d()
        });
        a.ev.on("rsAfterContentSet.rsAutoHeight", function (a, b) {
          e === b && d()
        });
        a.slider.addClass("rsAutoHeight");
        a.ev.one("rsAfterInit", function () {
          setTimeout(function () {
            d(!1);
            setTimeout(function () {
              a.slider.append('<div style="clear:both; float: none;"></div>')
            }, 16)
          }, 16)
        });
        a.ev.on("rsBeforeAnimStart", function () {
          d(!0)
        });
        a.ev.on("rsBeforeSizeSet", function () {
          setTimeout(function () {
            d(!1)
          }, 16)
        })
      }
    }
  });
  b.rsModules.autoHeight = b.rsProto._w4
})(jQuery);
// jquery.rs.global-caption v1.0
(function (b) {
  b.extend(b.rsProto, {
    _d6: function () {
      var a = this;
      a.st.globalCaption && (a.ev.on("rsAfterInit", function () {
        a.globalCaption = b('<div class="rsGCaption"></div>').appendTo(a.st.globalCaptionInside ? a._e1 : a.slider);
        a.globalCaption.html(a.currSlide.caption)
      }), a.ev.on("rsBeforeAnimStart", function () {
        a.globalCaption.html(a.currSlide.caption)
      }))
    }
  });
  b.rsModules.globalCaption = b.rsProto._d6
})(jQuery);
// jquery.rs.active-class v1.0.1
(function (c) {
  c.rsProto._o4 = function () {
    var b, a = this;
    if (a.st.addActiveClass) a.ev.on("rsOnUpdateNav", function () {
      b && clearTimeout(b);
      b = setTimeout(function () {
        a._g4 && a._g4.removeClass("rsActiveSlide");
        a._r1 && a._r1.addClass("rsActiveSlide");
        b = null
      }, 50)
    })
  };
  c.rsModules.activeClass = c.rsProto._o4
})(jQuery);
// jquery.rs.deeplinking v1.0.6 + jQuery hashchange plugin v1.3 Copyright (c) 2010 Ben Alman
(function (b) {
  b.extend(b.rsProto, {
    _o5: function () {
      var a = this,
          h, d, f;
      a._p5 = {
        enabled: !1,
        change: !1,
        prefix: ""
      };
      a.st.deeplinking = b.extend({}, a._p5, a.st.deeplinking);
      if (a.st.deeplinking.enabled) {
        var g = a.st.deeplinking.change,
            e = a.st.deeplinking.prefix,
            c = "#" + e,
            k = function () {
            var a = window.location.hash;
            return a && 0 < a.indexOf(e) && (a = parseInt(a.substring(c.length), 10), 0 <= a) ? a - 1 : -1
            },
            p = k(); - 1 !== p && (a.st.startSlideId = p);
        g && (b(window).on("hashchange" + a.ns, function (b) {
          h || (b = k(), 0 > b || (b > a.numSlides - 1 && (b = a.numSlides - 1), a.goTo(b)))
        }), a.ev.on("rsBeforeAnimStart", function () {
          d && clearTimeout(d);
          f && clearTimeout(f)
        }), a.ev.on("rsAfterSlideChange", function () {
          d && clearTimeout(d);
          f && clearTimeout(f);
          f = setTimeout(function () {
            h = !0;
            window.location.replace(("" + window.location).split("#")[0] + c + (a.currSlideId + 1));
            d = setTimeout(function () {
              h = !1;
              d = null
            }, 60)
          }, 400)
        }));
        a.ev.on("rsBeforeDestroy", function () {
          d = f = null;
          g && b(window).off("hashchange" + a.ns)
        })
      }
    }
  });
  b.rsModules.deeplinking = b.rsProto._o5
})(jQuery);
(function (b, a, h) {
  function d(a) {
    a = a || location.href;
    return "#" + a.replace(/^[^#]*#?(.*)$/, "$1")
  }
  "$:nomunge";
  var f = document,
      g, e = b.event.special,
      c = f.documentMode,
      k = "onhashchange" in a && (c === h || 7 < c);
  b.fn.hashchange = function (a) {
    return a ? this.bind("hashchange", a) : this.trigger("hashchange")
  };
  b.fn.hashchange.delay = 50;
  e.hashchange = b.extend(e.hashchange, {
    setup: function () {
      if (k) return !1;
      b(g.start)
    },
    teardown: function () {
      if (k) return !1;
      b(g.stop)
    }
  });
  g = function () {
    function g() {
      var f = d(),
          e = q(l);
      f !== l ? (m(l = f, e), b(a).trigger("hashchange")) : e !== l && (location.href = location.href.replace(/#.*/, "") + e);
      c = setTimeout(g, b.fn.hashchange.delay)
    }
    var e = {},
        c, l = d(),
        n = function (a) {
        return a
        },
        m = n,
        q = n;
    e.start = function () {
      c || g()
    };
    e.stop = function () {
      c && clearTimeout(c);
      c = h
    };
    a.attachEvent && !a.addEventListener && !k &&
    function () {
      var a, c;
      e.start = function () {
        a || (c = (c = b.fn.hashchange.src) && c + d(), a = b('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
          c || m(d());
          g()
        }).attr("src", c || "javascript:0").insertAfter("body")[0].contentWindow, f.onpropertychange =

        function () {
          try {
            "title" === event.propertyName && (a.document.title = f.title)
          } catch (b) {}
        })
      };
      e.stop = n;
      q = function () {
        return d(a.location.href)
      };
      m = function (c, e) {
        var d = a.document,
            g = b.fn.hashchange.domain;
        c !== e && (d.title = f.title, d.open(), g && d.write('<script>document.domain="' + g + '"\x3c/script>'), d.close(), a.location.hash = c)
      }
    }();
    return e
  }()
})(jQuery, this);
// jquery.rs.visible-nearby v1.0.2
(function (d) {
  d.rsProto._g7 = function () {
    var a = this;
    a.st.visibleNearby && a.st.visibleNearby.enabled && (a._h7 = {
      enabled: !0,
      centerArea: .6,
      center: !0,
      breakpoint: 0,
      breakpointCenterArea: .8,
      hiddenOverflow: !0,
      navigateByCenterClick: !1
    }, a.st.visibleNearby = d.extend({}, a._h7, a.st.visibleNearby), a.ev.one("rsAfterPropsSetup", function () {
      a._i7 = a._e1.css("overflow", "visible").wrap('<div class="rsVisibleNearbyWrap"></div>').parent();
      a.st.visibleNearby.hiddenOverflow || a._i7.css("overflow", "visible");
      a._o1 = a.st.controlsInside ? a._i7 : a.slider
    }), a.ev.on("rsAfterSizePropSet", function () {
      var b, c = a.st.visibleNearby;
      b = c.breakpoint && a.width < c.breakpoint ? c.breakpointCenterArea : c.centerArea;
      a._h ? (a._b4 *= b, a._i7.css({
        height: a._c4,
        width: a._b4 / b
      }), a._d = a._b4 * (1 - b) / 2 / b) : (a._c4 *= b, a._i7.css({
        height: a._c4 / b,
        width: a._b4
      }), a._d = a._c4 * (1 - b) / 2 / b);
      c.navigateByCenterClick || (a._q = a._h ? a._b4 : a._c4);
      c.center && a._e1.css("margin-" + (a._h ? "left" : "top"), a._d)
    }))
  };
  d.rsModules.visibleNearby = d.rsProto._g7
})(jQuery);

/* --- ROYALSLIDER end --- */

(function ($, undefined) {
  /**
   * Shared variables
   */
  var ua = navigator.userAgent.toLowerCase(),
      platform = navigator.platform.toLowerCase(),
      $window = $(window),
      $document = $(document),
      $html = $('html'),
      $body = $('body'),
      
      
      android_ancient = (ua.indexOf('mozilla/5.0') !== -1 && ua.indexOf('android') !== -1 && ua.indexOf('applewebKit') !== -1) && ua.indexOf('chrome') === -1,
      apple = ua.match(/(iPad|iPhone|iPod|Macintosh)/i),
      webkit = ua.indexOf('webkit') != -1,
      
      
      isiPhone = false,
      isiPod = false,
      isAndroidPhone = false,
      android = false,
      iOS = false,
      isIE = false,
      ieMobile = false,
      isSafari = false,
      isMac = false,
      
      
      firefox = ua.indexOf('gecko') != -1,
      safari = ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1,
      
      
      is_small = $('.js-nav-trigger').is(':visible');

  windowHeight = $window.height(), windowWidth = $window.width(), documentHeight = $document.height(), orientation = windowWidth > windowHeight ? 'portrait' : 'landscape',

  latestKnownScrollY = window.scrollY, ticking = false,

  globalDebug = false;;
  // Platform Detection


  function getIOSVersion(ua) {
    ua = ua || navigator.userAgent;
    return parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(ua) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) || false;
  }

  function getAndroidVersion(ua) {
    var matches;
    ua = ua || navigator.userAgent;
    matches = ua.match(/[A|a]ndroid\s([0-9\.]*)/);
    return matches ? matches[1] : false;
  }

  function platformDetect() {

    var navUA = navigator.userAgent.toLowerCase(),
        navPlat = navigator.platform.toLowerCase();

    isiPhone = navPlat.indexOf("iphone");
    isiPod = navPlat.indexOf("ipod");
    isAndroidPhone = navPlat.indexOf("android");
    isSafari = navUA.indexOf('safari') != -1 && navUA.indexOf('chrome') == -1;
    isIE = typeof(is_ie) !== "undefined" || (!(window.ActiveXObject) && "ActiveXObject" in window);
    ieMobile = ua.match(/Windows Phone/i) ? true : false;
    iOS = getIOSVersion();
    android = getAndroidVersion();
    isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

    if (Modernizr.touch) {
      $html.addClass('touch');
    }

    if (iOS && iOS < 8) {
      $html.addClass('no-scroll-fx')
    }

    if (isIE) {
      $html.addClass('is--ie');
    }

    if (ieMobile) {
      $html.addClass('is--ie-mobile')
    }
  }
  var Portfolio = (function () {

    var $film, filmstripWidth, $grid, $fullview = $('.fullview'),
        $first, start, $last, end, current = 0,
        $currentFoto,
        
        init = function () {

        if (!$('.single-jetpack-portfolio').length) {
          placehold();
          return;
        }

        $film = $('.js-portfolio');
        $grid = $film.clone().insertBefore($film);

        var scroller = new Scroller($film, function () {
          var x = scroller.get('x'),
              y = scroller.get('y');

          if ($('.single-jetpack-portfolio').length) {
            Portfolio.updateCurrent(x, y);
          }
        });

        $film.addClass('portfolio--filmstrip portfolio--visible');
        $grid.addClass('portfolio--grid');

        placehold();

        getMiddlePoints();

        filmstripWidth = $film.width();
        $first = $film.find('.js-portfolio-item').first();
        start = getMiddle($first) + (getMiddle($first.next()) - getMiddle($first)) / 2;
        $last = $film.find('.js-portfolio-item').last();
        end = $('.site-content').width() - $('.site-sidebar').width() - filmstripWidth + getMiddle($last.prev()) + (getMiddle($last) - getMiddle($last.prev())) / 2;

        if (start > end) {
          end = $('.site-content').width() / 2 - $('.site-sidebar').width();
          start = end - 10;
        }

        $currentFoto = $first.addClass('portfolio__item--active');
        // setCurrent($currentFoto);
        bindEvents();
        },
        
        
        getMiddlePoints = function () {
        $('.portfolio').each(function (i, portfolio) {
          $(portfolio).find('.js-portfolio-item').each(function (i, obj) {
            var $obj = $(obj);
            $obj.data('middle', getMiddle($obj));
            $obj.data('count', i);
          });
        });
        },
        
        
        bindEvents = function () {
        $('body').on('click', '.js-show-thumbnails', showThumbnails);
        $('.portfolio--grid').on('click', '.js-portfolio-item', showFilmstrip);
        $('.portfolio--filmstrip').on('click', '.js-portfolio-item', showFullView);
        $('.fullview__close').on('click', hideFullView);

        $('.js-details').on('mouseenter', function () {
          $film.addClass('portfolio--details');
        });

        $('.js-details').on('mouseleave', function () {
          $film.removeClass('portfolio--details');
        });
        },
        
        
        showThumbnails = function (e) {
        var $active = $('.portfolio__item--active'),
            $target = $grid.find('.js-portfolio-item').eq($active.data('count'));


        $grid.addClass('portfolio--visible');
        morph($active, $target);

        TweenMax.to($('.site-content__mask'), .3, {
          width: '100%',
          onComplete: function () {
            $film.removeClass('portfolio--visible');
            $('.site-content__mask').css('width', '');
          }
        });

        $(window).one('pxg:morph-end', function () {

        });

        $('html').addClass('scroll-x').removeClass('scroll-y');
        },
        
        
        showFilmstrip = function (e) {
        var $clicked = $(this),
            $target = $film.find('.js-portfolio-item').eq($clicked.data('count'));

        $('html').addClass('scroll-x').removeClass('scroll-y');

        var newx = $target.data('middle') - $('.site-content').width() / 2 + $('.site-sidebar').width();
        scroller.set('x', newx);

        $grid.removeClass('portfolio--visible');
        $film.addClass('portfolio--visible');

        morph($clicked, $target);
        },
        
        
        showFullView = function () {
        $fullview.addClass('fullview--visible');
        },
        
        
        hideFullView = function () {
        $fullview.removeClass('fullview--visible');
        },
        
        
        morph = function ($source, $target) {
        var sourceOffset = $source.offset(),
            sourceWidth = $source.width(),
            sourceHeight = $source.height(),
            targetOffset = $target.offset(),
            targetWidth = $target.width(),
            targetHeight = $target.height(),
            $clone = $source.clone();

        $clone.css({
          position: 'absolute',
          top: sourceOffset.top - targetOffset.top,
          left: sourceOffset.left - targetOffset.left,
          width: $source.width(),
          height: $source.height(),
          background: 'none'
        });

        $target.css({
          position: 'relative',
          'z-index': 10000,
          transition: 'none',
          opacity: 1
        });

        $clone.appendTo($target);

        TweenMax.to($clone, .3, {
          x: targetOffset.left - sourceOffset.left + (targetWidth - sourceWidth) / 2,
          y: targetOffset.top - sourceOffset.top + (targetHeight - sourceHeight) / 2,
          scale: targetWidth / sourceWidth,
          force3D: true,
          ease: Quad.easeOut,
          onComplete: function () {
            $clone.remove();
            $target.css({
              position: '',
              'z-index': '',
              opacity: '',
              transition: ''
            });
          }
        });
        $(window).trigger('pxg:morph-end');
        },
        
        
        placehold = function () {
        $('.js-portfolio').each(function (i, obj) {
          var $portfolio = $(obj),
              newHeight = $portfolio.height();
          $portfolio.find('.js-portfolio-item').each(function (i, obj) {
            placeholdImage($(obj), 'srcfull');
          });
        });
        },
        
        
        placeholdImage = function ($item, src) {
        var src = typeof src === "undefined" ? 'srcfull' : src,
            width = $item.data('width'),
            height = $item.data('height'),
            newHeight = $item.height(),
            newWidth = newHeight * $item.data('width') / $item.data('height'),
            $image = $(document.createElement('img'));
        $item.width(newWidth).height(newHeight);
        $image.width(newWidth).height(newHeight).attr('src', $item.data('srcfull')).prependTo($item);
        },
        
        
        getMiddle = function ($image) {
        return $image.offset().left + $image.width() / 2 - $film.offset().left;
        },
        
        
        updateCurrent = function (x, y) {

        var width = end - start,
            reference = start + width * x / (filmstripWidth - $('.site-content').width()) + x,
            compare, $next;

        $('.js-reference').css('left', reference + 'px').text(parseInt(reference));

        if (reference >= current) {
          $next = $currentFoto.nextAll('.js-portfolio-item').first();
        } else {
          $next = $currentFoto.prevAll('.js-portfolio-item').first();;
        }

        compare = $next.data('middle');
        $('.js-compare').css('left', compare).text(parseInt(compare));

        if (Math.abs(compare - reference) <= Math.abs(reference - current)) {
          setCurrent($next);
        }
        },
        
        
        setCurrent = function ($next) {
        $currentFoto = $next;
        $film.find('.js-portfolio-item').removeClass('portfolio__item--active');
        $currentFoto.addClass('portfolio__item--active');
        $('.portfolio__position').text($next.data('count') + 1 + ' of ' + $film.find('.js-portfolio-item').length);
        current = $currentFoto.data('middle');
        $('.js-last').css('left', current).text(parseInt(current));

        // prepare current for fullview
        var width = $currentFoto.data('width'),
            height = $currentFoto.data('height'),
            newWidth = $fullview.width(),
            newHeight = $fullview.height(),
            scaleX = newWidth / width,
            scaleY = newHeight / height,
            scale = Math.max(scaleX, scaleY),
            $image = $(document.createElement('img'));

        $image.css({
          'max-width': 'none',
          width: width * scale,
          height: height * scale
        });

        $fullview.find('.fullview__image').empty();
        $image.attr('src', $currentFoto.data('srcfull')).prependTo($fullview.find('.fullview__image'));
        }
        
        
        
        return {
        init: init,
        updateCurrent: updateCurrent
        }
  })(); /* --- Royal Slider Init --- */

  function royalSliderInit($container) {
    $container = typeof $container !== 'undefined' ? $container : $('body');

    // Find and initialize each slider
    $container.find('.js-pixslider').each(function () {

      sliderInit($(this));

      var slider = $(this).data('royalSlider');

      if (!slider.slides.length) {
        return;
      }

      var firstSlide = slider.slides[0],
          firstSlideContent = $(firstSlide.content),
          $video = firstSlideContent.hasClass('video') ? firstSlideContent : firstSlideContent.find('.video'),
          firstSlideAutoPlay = typeof $video.data('video_autoplay') !== "undefined";

      if (firstSlideAutoPlay || ieMobile || iOS || android) {
        firstSlide.holder.on('rsAfterContentSet', function () {
          slider.playVideo();
        });
      }

      slider.ev.on('rsBeforeAnimStart', function (event) {
        slider.stopVideo();
      });

      // auto play video sliders if is set so
      slider.ev.on('rsAfterSlideChange', function (event) {

        var $slide_content = $(slider.currSlide.content),
            $video = $slide_content.hasClass('video') ? $slide_content : $slide_content.find('.video'),
            rs_videoAutoPlay = typeof $video.data('video_autoplay') !== "undefined";

        if (rs_videoAutoPlay || ieMobile || iOS || android) {
          slider.stopVideo();
          slider.playVideo();
        }

      });

      // after destroying a video remove the autoplay class (this way the image gets visible)
      slider.ev.on('rsOnDestroyVideoElement', function (i, el) {

        var $slide_content = $(this.currSlide.content),
            $video = $slide_content.hasClass('video') ? $slide_content : $slide_content.find('.video');

        $video.removeClass('video_autoplay');

      });

    });

  }

/*
 * Slider Initialization
 */

  function sliderInit($slider) {
    if (globalDebug) {
      console.log("Royal Slider Init");
    }

    $slider.find('img').removeClass('invisible');

    var $children = $(this).children(),
        rs_arrows = typeof $slider.data('arrows') !== "undefined",
        rs_bullets = typeof $slider.data('bullets') !== "undefined" ? "bullets" : "none",
        rs_autoheight = typeof $slider.data('autoheight') !== "undefined",
        rs_autoScaleSlider = false,
        rs_autoScaleSliderWidth = typeof $slider.data('autoscalesliderwidth') !== "undefined" && $slider.data('autoscalesliderwidth') != '' ? $slider.data('autoscalesliderwidth') : false,
        rs_autoScaleSliderHeight = typeof $slider.data('autoscalesliderheight') !== "undefined" && $slider.data('autoscalesliderheight') != '' ? $slider.data('autoscalesliderheight') : false,
        rs_customArrows = typeof $slider.data('customarrows') !== "undefined",
        rs_slidesSpacing = typeof $slider.data('slidesspacing') !== "undefined" ? parseInt($slider.data('slidesspacing')) : 0,
        rs_imageScale = $slider.data('imagescale'),
        rs_keyboardNav = typeof $slider.data('keyboardnav') !== "undefined",
        rs_visibleNearby = typeof $slider.data('visiblenearby') !== "undefined",
        rs_nearbyCenter = typeof $slider.data('nearbycenter') !== "undefined",
        rs_imageAlignCenter = typeof $slider.data('imagealigncenter') !== "undefined",
        rs_transition = typeof $slider.data('slidertransition') !== "undefined" && $slider.data('slidertransition') != '' ? $slider.data('slidertransition') : 'fade',
        rs_transitionSpeed = typeof $slider.data('slidertransitionspeed') !== "undefined" && $slider.data('slidertransitionspeed') != '' ? $slider.data('slidertransitionspeed') : 600,
        rs_autoPlay = typeof $slider.data('sliderautoplay') !== "undefined",
        rs_delay = typeof $slider.data('sliderdelay') !== "undefined" && $slider.data('sliderdelay') != '' ? $slider.data('sliderdelay') : '1000',
        rs_drag = true,
        rs_globalCaption = typeof $slider.data('showcaptions') !== "undefined",
        hoverArrows = typeof $slider.data('hoverarrows') !== "undefined";

    if (rs_autoheight) {
      rs_autoScaleSlider = false;
    } else {
      rs_autoScaleSlider = true;
    }

    // Single slide case
    if ($children.length == 1) {
      rs_arrows = false;
      rs_bullets = 'none';
      rs_keyboardNav = false;
      rs_drag = false;
      rs_transition = 'fade';
      rs_customArrows = false;
    }

    // make sure default arrows won't appear if customArrows is set
    if (rs_customArrows) rs_arrows = false;

    //the main params for Royal Slider
    var royalSliderParams = {
      autoHeight: rs_autoheight,
      autoScaleSlider: rs_autoScaleSlider,
      loop: true,
      autoScaleSliderWidth: rs_autoScaleSliderWidth,
      autoScaleSliderHeight: rs_autoScaleSliderHeight,
      imageScaleMode: rs_imageScale,
      imageAlignCenter: rs_imageAlignCenter,
      slidesSpacing: rs_slidesSpacing,
      arrowsNav: rs_arrows,
      controlNavigation: rs_bullets,
      keyboardNavEnabled: rs_keyboardNav,
      arrowsNavAutoHide: false,
      sliderDrag: rs_drag,
      transitionType: rs_transition,
      transitionSpeed: rs_transitionSpeed,
      imageScalePadding: 0,
      autoPlay: {
        enabled: rs_autoPlay,
        stopAtAction: true,
        pauseOnHover: true,
        delay: rs_delay
      },
      addActiveClass: true,
      globalCaption: rs_globalCaption,
      numImagesToPreload: 2
    };

    var rs_centerArea = rs_nearbyCenter == true ? 0.90 : 0.95;

    if (rs_visibleNearby) {
      royalSliderParams['visibleNearby'] = {
        enabled: rs_visibleNearby,
        centerArea: rs_centerArea,
        center: rs_nearbyCenter,
        breakpoint: 650,
        breakpointCenterArea: 0.64,
        navigateByCenterClick: true
      }
    }

    //lets fire it up
    $slider.royalSlider(royalSliderParams);

    var royalSlider = $slider.data('royalSlider'),
        slidesNumber = royalSlider.numSlides;

    // create the markup for the customArrows
    //don't need it if we have only one slide
    if (royalSlider && rs_customArrows && slidesNumber > 1) {

      var classes = '';

      if (hoverArrows && !Modernizr.touch) classes += ' arrows--hover ';

      var $gallery_control = $('<div class="' + classes + '">' + '<div class="rsArrow rsArrowLeft js-arrow-left" style="display: block;"><div class="rsArrowIcn"></div></div>' + '<div class="rsArrow rsArrowRight js-arrow-right" style="display: block;"><div class="rsArrowIcn"></div></div>' + '</div>');

      if ($slider.data('customarrows') == "left") {
        $gallery_control.addClass('gallery-control--left');
      }

      $gallery_control.insertBefore($slider);

      $gallery_control.on('click', '.js-arrow-left', function (event) {
        event.preventDefault();
        royalSlider.prev();
      });

      $gallery_control.on('click', '.js-arrow-right', function (event) {
        event.preventDefault();
        royalSlider.next();
      });

      if (hoverArrows && !Modernizr.touch) {
        hoverArrow($('.slider-arrows-header .rsArrow'));
      }

      $slider.parent().children('.slider-arrows-header').addClass('slider-arrows--loaded');
    }

    if (slidesNumber == 1) {
      $slider.addClass('single-slide');
    }

    $slider.addClass('slider--loaded');
  }





/*
 Get slider arrows to hover, following the cursor
 */

  function hoverArrow($arrow) {
    var $mouseX = 0,
        $mouseY = 0;
    var $arrowH = 35,
        $arrowW = 35;

    $arrow.mouseenter(function (e) {
      $(this).addClass('visible');

      moveArrow($(this));
    });

    var $loop;

    function moveArrow($arrow) {
      var $mouseX;
      var $mouseY;

      $arrow.mousemove(function (e) {
        $mouseX = e.pageX - $arrow.offset().left - 40;
        $mouseY = e.pageY - $arrow.offset().top - 40;

        var $arrowIcn = $arrow.find('.rsArrowIcn');
        TweenMax.to($arrowIcn, 0, {
          x: $mouseX,
          y: $mouseY,
          z: 0.01
        });
      });

      $arrow.mouseleave(function (e) {
        $(this).removeClass('visible').removeClass('is--scrolled');
        clearInterval($loop);
      });

      $(window).scroll(function () {
        if ($arrow.hasClass('visible')) {

          $arrow.addClass('is--scrolled');

          clearTimeout($.data(this, 'scrollTimer'));
          $.data(this, 'scrollTimer', setTimeout(function () {
            $arrow.removeClass('is--scrolled');
          }, 100));
        }
      });
    }
  }

  function Scroller(selector, callback) {

    var instance = this,
        undefined, x, y,
        
        update = function () {
        x = $(selector).scrollLeft();
        y = $(selector).scrollTop();
        };

    if (selector === undefined) {
      selector = window;
    }

    update();

    this.get = function (attribute) {
      if (attribute == "x") return x;
      if (attribute == "y") return y;
      return null;
    }

    this.set = function (attribute, value) {
      if (attribute == "x") {
        $(selector).scrollLeft(value);
      }
      if (attribute == "y") {
        $(selector).scrollTop(value);
      }
    }

    $(selector).on('scroll', function () {
      update();
      if (callback !== undefined) {
        requestAnimationFrame(callback);
      }
    });
  }
  console.log('modules compiled');
  // /* ====== ON DOCUMENT READY ====== */
  $(document).ready(function () {
    init();
  });

  window.scroller = new Scroller(window, function () {
    var x = scroller.get('x'),
        y = scroller.get('y');

    if ($('.single-jetpack-portfolio').length) {
      Portfolio.updateCurrent(x, y);
    }
  });

  function init() {
    // jQuery('.portfolio__item--text').each(function(i, obj) {
    //   jQuery(obj).width(jQuery(obj).getColumnsWidth());
    // });
    platformDetect();
    Portfolio.init();

    // setTimeout(function() {
    // }, 10);
  }

  // /* ====== ON WINDOW LOAD ====== */
  $window.load(function () {
    //browserSize();
    //Sidebar.init();
    //navigation.init();
    //scrollToTop();
    //moveFeaturedImage();
    //magnificPopupInit();
    //logoAnimation.init();
    //logoAnimation.update();
    royalSliderInit();
  });

  // /* ====== ON RESIZE ====== */

  function onResize() {
    //browserSize();
    //masonry.refresh();
    //Sidebar.init();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }

  function update() {
    ticking = false;
  }

  $window.on('debouncedresize', onResize);

  $window.on('scroll', function () {
    latestKnownScrollY = window.scrollY;
    requestTick();
  }); /* ====== HELPER FUNCTIONS ====== */



  /**
   * Detect what platform are we on (browser, mobile, etc)
   */

  function platformDetect() {
    $.support.touch = 'ontouchend' in document;
    $.support.svg = (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) ? true : false;
    $.support.transform = getSupportedTransform();

    $html.addClass($.support.touch ? 'touch' : 'no-touch').addClass($.support.svg ? 'svg' : 'no-svg').addClass( !! $.support.transform ? 'transform' : 'no-transform');
  }



  function browserSize() {
    windowHeight = $window.height();
    windowWidth = $window.width();
    documentHeight = $document.height();
    orientation = windowWidth > windowHeight ? 'portrait' : 'landscape';
  }



  function getSupportedTransform() {
    var prefixes = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
    for (var i = 0; i < prefixes.length; i++) {
      if (document.createElement('div').style[prefixes[i]] !== undefined) {
        return prefixes[i];
      }
    }
    return false;
  }

  /**
   * Handler for the back to top button
   */

  function scrollToTop() {
    $('a[href=#top]').click(function (event) {
      event.preventDefault();
      event.stopPropagation();

      $('html').velocity("scroll", 1000);
    });
  }

  /**
   * function similar to PHP's empty function
   */

  function empty(data) {
    if (typeof(data) == 'number' || typeof(data) == 'boolean') {
      return false;
    }
    if (typeof(data) == 'undefined' || data === null) {
      return true;
    }
    if (typeof(data.length) != 'undefined') {
      return data.length === 0;
    }
    var count = 0;
    for (var i in data) {
      // if(data.hasOwnProperty(i))
      //
      // This doesn't work in ie8/ie9 due the fact that hasOwnProperty works only on native objects.
      // http://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
      //
      // for hosts objects we do this
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        count++;
      }
    }
    return count === 0;
  }

  /**
   * function to add/modify a GET parameter
   */

  function setQueryParameter(uri, key, value) {
    var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
    separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
      return uri + separator + key + "=" + value;
    }
  }

  function is_touch() {
    return $.support.touch;
  }
})(jQuery);