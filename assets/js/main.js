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
/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {


  /**
   * Class for managing events.
   * Can be extended to provide event functionality in other classes.
   *
   * @class EventEmitter Manages event registering and emitting.
   */

  function EventEmitter() {}

  // Shortcuts to improve speed and size
  var proto = EventEmitter.prototype;
  var exports = this;
  var originalGlobalValue = exports.EventEmitter;

  /**
   * Finds the index of the listener for the event in it's storage array.
   *
   * @param {Function[]} listeners Array of listeners to search through.
   * @param {Function} listener Method to look for.
   * @return {Number} Index of the specified listener, -1 if not found
   * @api private
   */

  function indexOfListener(listeners, listener) {
    var i = listeners.length;
    while (i--) {
      if (listeners[i].listener === listener) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Alias a method while keeping the context correct, to allow for overwriting of target method.
   *
   * @param {String} name The name of the target method.
   * @return {Function} The aliased method
   * @api private
   */

  function alias(name) {
    return function aliasClosure() {
      return this[name].apply(this, arguments);
    };
  }

  /**
   * Returns the listener array for the specified event.
   * Will initialise the event object and listener arrays if required.
   * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
   * Each property in the object response is an array of listener functions.
   *
   * @param {String|RegExp} evt Name of the event to return the listeners from.
   * @return {Function[]|Object} All listener functions for the event.
   */
  proto.getListeners = function getListeners(evt) {
    var events = this._getEvents();
    var response;
    var key;

    // Return a concatenated array of all matching events if
    // the selector is a regular expression.
    if (typeof evt === 'object') {
      response = {};
      for (key in events) {
        if (events.hasOwnProperty(key) && evt.test(key)) {
          response[key] = events[key];
        }
      }
    }
    else {
      response = events[evt] || (events[evt] = []);
    }

    return response;
  };

  /**
   * Takes a list of listener objects and flattens it into a list of listener functions.
   *
   * @param {Object[]} listeners Raw listener objects.
   * @return {Function[]} Just the listener functions.
   */
  proto.flattenListeners = function flattenListeners(listeners) {
    var flatListeners = [];
    var i;

    for (i = 0; i < listeners.length; i += 1) {
      flatListeners.push(listeners[i].listener);
    }

    return flatListeners;
  };

  /**
   * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
   *
   * @param {String|RegExp} evt Name of the event to return the listeners from.
   * @return {Object} All listener functions for an event in an object.
   */
  proto.getListenersAsObject = function getListenersAsObject(evt) {
    var listeners = this.getListeners(evt);
    var response;

    if (listeners instanceof Array) {
      response = {};
      response[evt] = listeners;
    }

    return response || listeners;
  };

  /**
   * Adds a listener function to the specified event.
   * The listener will not be added if it is a duplicate.
   * If the listener returns true then it will be removed after it is called.
   * If you pass a regular expression as the event name then the listener will be added to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to attach the listener to.
   * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.addListener = function addListener(evt, listener) {
    var listeners = this.getListenersAsObject(evt);
    var listenerIsWrapped = typeof listener === 'object';
    var key;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
        listeners[key].push(listenerIsWrapped ? listener : {
          listener: listener,
          once: false
        });
      }
    }

    return this;
  };

  /**
   * Alias of addListener
   */
  proto.on = alias('addListener');

  /**
   * Semi-alias of addListener. It will add a listener that will be
   * automatically removed after it's first execution.
   *
   * @param {String|RegExp} evt Name of the event to attach the listener to.
   * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.addOnceListener = function addOnceListener(evt, listener) {
    return this.addListener(evt, {
      listener: listener,
      once: true
    });
  };

  /**
   * Alias of addOnceListener.
   */
  proto.once = alias('addOnceListener');

  /**
   * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
   * You need to tell it what event names should be matched by a regex.
   *
   * @param {String} evt Name of the event to create.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.defineEvent = function defineEvent(evt) {
    this.getListeners(evt);
    return this;
  };

  /**
   * Uses defineEvent to define multiple events.
   *
   * @param {String[]} evts An array of event names to define.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.defineEvents = function defineEvents(evts) {
    for (var i = 0; i < evts.length; i += 1) {
      this.defineEvent(evts[i]);
    }
    return this;
  };

  /**
   * Removes a listener function from the specified event.
   * When passed a regular expression as the event name, it will remove the listener from all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to remove the listener from.
   * @param {Function} listener Method to remove from the event.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.removeListener = function removeListener(evt, listener) {
    var listeners = this.getListenersAsObject(evt);
    var index;
    var key;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        index = indexOfListener(listeners[key], listener);

        if (index !== -1) {
          listeners[key].splice(index, 1);
        }
      }
    }

    return this;
  };

  /**
   * Alias of removeListener
   */
  proto.off = alias('removeListener');

  /**
   * Adds listeners in bulk using the manipulateListeners method.
   * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
   * You can also pass it a regular expression to add the array of listeners to all events that match it.
   * Yeah, this function does quite a bit. That's probably a bad thing.
   *
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to add.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.addListeners = function addListeners(evt, listeners) {
    // Pass through to manipulateListeners
    return this.manipulateListeners(false, evt, listeners);
  };

  /**
   * Removes listeners in bulk using the manipulateListeners method.
   * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
   * You can also pass it an event name and an array of listeners to be removed.
   * You can also pass it a regular expression to remove the listeners from all events that match it.
   *
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to remove.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.removeListeners = function removeListeners(evt, listeners) {
    // Pass through to manipulateListeners
    return this.manipulateListeners(true, evt, listeners);
  };

  /**
   * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
   * The first argument will determine if the listeners are removed (true) or added (false).
   * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
   * You can also pass it an event name and an array of listeners to be added/removed.
   * You can also pass it a regular expression to manipulate the listeners of all events that match it.
   *
   * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
    var i;
    var value;
    var single = remove ? this.removeListener : this.addListener;
    var multiple = remove ? this.removeListeners : this.addListeners;

    // If evt is an object then pass each of it's properties to this method
    if (typeof evt === 'object' && !(evt instanceof RegExp)) {
      for (i in evt) {
        if (evt.hasOwnProperty(i) && (value = evt[i])) {
          // Pass the single listener straight through to the singular method
          if (typeof value === 'function') {
            single.call(this, i, value);
          }
          else {
            // Otherwise pass back to the multiple function
            multiple.call(this, i, value);
          }
        }
      }
    }
    else {
      // So evt must be a string
      // And listeners must be an array of listeners
      // Loop over it and pass each one to the multiple method
      i = listeners.length;
      while (i--) {
        single.call(this, evt, listeners[i]);
      }
    }

    return this;
  };

  /**
   * Removes all listeners from a specified event.
   * If you do not specify an event then all listeners will be removed.
   * That means every event will be emptied.
   * You can also pass a regex to remove all events that match it.
   *
   * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.removeEvent = function removeEvent(evt) {
    var type = typeof evt;
    var events = this._getEvents();
    var key;

    // Remove different things depending on the state of evt
    if (type === 'string') {
      // Remove all listeners for the specified event
      delete events[evt];
    }
    else if (type === 'object') {
      // Remove all events matching the regex.
      for (key in events) {
        if (events.hasOwnProperty(key) && evt.test(key)) {
          delete events[key];
        }
      }
    }
    else {
      // Remove all listeners in all events
      delete this._events;
    }

    return this;
  };

  /**
   * Alias of removeEvent.
   *
   * Added to mirror the node API.
   */
  proto.removeAllListeners = alias('removeEvent');

  /**
   * Emits an event of your choice.
   * When emitted, every listener attached to that event will be executed.
   * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
   * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
   * So they will not arrive within the array on the other side, they will be separate.
   * You can also pass a regular expression to emit to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
   * @param {Array} [args] Optional array of arguments to be passed to each listener.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.emitEvent = function emitEvent(evt, args) {
    var listeners = this.getListenersAsObject(evt);
    var listener;
    var i;
    var key;
    var response;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        i = listeners[key].length;

        while (i--) {
          // If the listener returns true then it shall be removed from the event
          // The function is executed either with a basic call or an apply if there is an args array
          listener = listeners[key][i];

          if (listener.once === true) {
            this.removeListener(evt, listener.listener);
          }

          response = listener.listener.apply(this, args || []);

          if (response === this._getOnceReturnValue()) {
            this.removeListener(evt, listener.listener);
          }
        }
      }
    }

    return this;
  };

  /**
   * Alias of emitEvent
   */
  proto.trigger = alias('emitEvent');

  /**
   * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
   * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
   * @param {...*} Optional additional arguments to be passed to each listener.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.emit = function emit(evt) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(evt, args);
  };

  /**
   * Sets the current value to check against when executing listeners. If a
   * listeners return value matches the one set here then it will be removed
   * after execution. This value defaults to true.
   *
   * @param {*} value The new value to check for when executing listeners.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.setOnceReturnValue = function setOnceReturnValue(value) {
    this._onceReturnValue = value;
    return this;
  };

  /**
   * Fetches the current value to check against when executing listeners. If
   * the listeners return value matches this one then it should be removed
   * automatically. It will return true by default.
   *
   * @return {*|Boolean} The current value to check for or the default, true.
   * @api private
   */
  proto._getOnceReturnValue = function _getOnceReturnValue() {
    if (this.hasOwnProperty('_onceReturnValue')) {
      return this._onceReturnValue;
    }
    else {
      return true;
    }
  };

  /**
   * Fetches the events object and creates one if required.
   *
   * @return {Object} The events storage object.
   * @api private
   */
  proto._getEvents = function _getEvents() {
    return this._events || (this._events = {});
  };

  /**
   * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
   *
   * @return {Function} Non conflicting EventEmitter class.
   */
  EventEmitter.noConflict = function noConflict() {
    exports.EventEmitter = originalGlobalValue;
    return EventEmitter;
  };

  // Expose the class either via AMD, CommonJS or the global object
  if (typeof define === 'function' && define.amd) {
    define('eventEmitter/EventEmitter', [], function () {
      return EventEmitter;
    });
  }
  else if (typeof module === 'object' && module.exports) {
    module.exports = EventEmitter;
  }
  else {
    this.EventEmitter = EventEmitter;
  }
}.call(this));

/*!
 * eventie v1.0.4
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

(function (window) {



  var docElem = document.documentElement;

  var bind = function () {};

  function getIEEvent(obj) {
    var event = window.event;
    // add event.target
    event.target = event.target || event.srcElement || obj;
    return event;
  }

  if (docElem.addEventListener) {
    bind = function (obj, type, fn) {
      obj.addEventListener(type, fn, false);
    };
  } else if (docElem.attachEvent) {
    bind = function (obj, type, fn) {
      obj[type + fn] = fn.handleEvent ?
      function () {
        var event = getIEEvent(obj);
        fn.handleEvent.call(fn, event);
      } : function () {
        var event = getIEEvent(obj);
        fn.call(obj, event);
      };
      obj.attachEvent("on" + type, obj[type + fn]);
    };
  }

  var unbind = function () {};

  if (docElem.removeEventListener) {
    unbind = function (obj, type, fn) {
      obj.removeEventListener(type, fn, false);
    };
  } else if (docElem.detachEvent) {
    unbind = function (obj, type, fn) {
      obj.detachEvent("on" + type, obj[type + fn]);
      try {
        delete obj[type + fn];
      } catch (err) {
        // can't delete window object properties
        obj[type + fn] = undefined;
      }
    };
  }

  var eventie = {
    bind: bind,
    unbind: unbind
  };

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD
    define('eventie/eventie', eventie);
  } else {
    // browser global
    window.eventie = eventie;
  }

})(this);

/*!
 * imagesLoaded v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function (window, factory) {
  // universal module definition
  /*global define: false, module: false, require: false */

  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['eventEmitter/EventEmitter', 'eventie/eventie'], function (EventEmitter, eventie) {
      return factory(window, EventEmitter, eventie);
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(
    window, require('wolfy87-eventemitter'), require('eventie'));
  } else {
    // browser global
    window.imagesLoaded = factory(
    window, window.EventEmitter, window.eventie);
  }

})(window,

// --------------------------  factory -------------------------- //

function factory(window, EventEmitter, eventie) {



  var $ = window.jQuery;
  var console = window.console;
  var hasConsole = typeof console !== 'undefined';

  // -------------------------- helpers -------------------------- //
  // extend objects


  function extend(a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }
    return a;
  }

  var objToString = Object.prototype.toString;

  function isArray(obj) {
    return objToString.call(obj) === '[object Array]';
  }

  // turn element or nodeList into an array


  function makeArray(obj) {
    var ary = [];
    if (isArray(obj)) {
      // use object if already an array
      ary = obj;
    } else if (typeof obj.length === 'number') {
      // convert nodeList to array
      for (var i = 0, len = obj.length; i < len; i++) {
        ary.push(obj[i]);
      }
    } else {
      // array of single index
      ary.push(obj);
    }
    return ary;
  }

  // -------------------------- imagesLoaded -------------------------- //
  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */

  function ImagesLoaded(elem, options, onAlways) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if (!(this instanceof ImagesLoaded)) {
      return new ImagesLoaded(elem, options);
    }
    // use elem as selector string
    if (typeof elem === 'string') {
      elem = document.querySelectorAll(elem);
    }

    this.elements = makeArray(elem);
    this.options = extend({}, this.options);

    if (typeof options === 'function') {
      onAlways = options;
    } else {
      extend(this.options, options);
    }

    if (onAlways) {
      this.on('always', onAlways);
    }

    this.getImages();

    if ($) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout(function () {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function () {
    this.images = [];

    // filter & find items if we have an item selector
    for (var i = 0, len = this.elements.length; i < len; i++) {
      var elem = this.elements[i];
      // filter siblings
      if (elem.nodeName === 'IMG') {
        this.addImage(elem);
      }
      // find children
      // no non-element nodes, #143
      var nodeType = elem.nodeType;
      if (!nodeType || !(nodeType === 1 || nodeType === 9 || nodeType === 11)) {
        continue;
      }
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for (var j = 0, jLen = childElems.length; j < jLen; j++) {
        var img = childElems[j];
        this.addImage(img);
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function (img) {
    var loadingImage = new LoadingImage(img);
    this.images.push(loadingImage);
  };

  ImagesLoaded.prototype.check = function () {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if (!length) {
      this.complete();
      return;
    }

    function onConfirm(image, message) {
      if (_this.options.debug && hasConsole) {
        console.log('confirm', image, message);
      }

      _this.progress(image);
      checkedCount++;
      if (checkedCount === length) {
        _this.complete();
      }
      return true; // bind once
    }

    for (var i = 0; i < length; i++) {
      var loadingImage = this.images[i];
      loadingImage.on('confirm', onConfirm);
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function (image) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout(function () {
      _this.emit('progress', _this, image);
      if (_this.jqDeferred && _this.jqDeferred.notify) {
        _this.jqDeferred.notify(_this, image);
      }
    });
  };

  ImagesLoaded.prototype.complete = function () {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout(function () {
      _this.emit(eventName, _this);
      _this.emit('always', _this);
      if (_this.jqDeferred) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[jqMethod](_this);
      }
    });
  };

  // -------------------------- jquery -------------------------- //
  if ($) {
    $.fn.imagesLoaded = function (options, callback) {
      var instance = new ImagesLoaded(this, options, callback);
      return instance.jqDeferred.promise($(this));
    };
  }


  // --------------------------  -------------------------- //

  function LoadingImage(img) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function () {
    // first check cached any previous images that have same src
    var resource = cache[this.img.src] || new Resource(this.img.src);
    if (resource.isConfirmed) {
      this.confirm(resource.isLoaded, 'cached was confirmed');
      return;
    }

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if (this.img.complete && this.img.naturalWidth !== undefined) {
      // report based on naturalWidth
      this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var _this = this;
    resource.on('confirm', function (resrc, message) {
      _this.confirm(resrc.isLoaded, message);
      return true;
    });

    resource.check();
  };

  LoadingImage.prototype.confirm = function (isLoaded, message) {
    this.isLoaded = isLoaded;
    this.emit('confirm', this, message);
  };

  // -------------------------- Resource -------------------------- //
  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115
  var cache = {};

  function Resource(src) {
    this.src = src;
    // add to cache
    cache[src] = this;
  }

  Resource.prototype = new EventEmitter();

  Resource.prototype.check = function () {
    // only trigger checking once
    if (this.isChecked) {
      return;
    }
    // simulate loading on detached element
    var proxyImage = new Image();
    eventie.bind(proxyImage, 'load', this);
    eventie.bind(proxyImage, 'error', this);
    proxyImage.src = this.src;
    // set flag
    this.isChecked = true;
  };

  // ----- events ----- //
  // trigger specified handler for event type
  Resource.prototype.handleEvent = function (event) {
    var method = 'on' + event.type;
    if (this[method]) {
      this[method](event);
    }
  };

  Resource.prototype.onload = function (event) {
    this.confirm(true, 'onload');
    this.unbindProxyEvents(event);
  };

  Resource.prototype.onerror = function (event) {
    this.confirm(false, 'onerror');
    this.unbindProxyEvents(event);
  };

  // ----- confirm ----- //
  Resource.prototype.confirm = function (isLoaded, message) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit('confirm', this, message);
  };

  Resource.prototype.unbindProxyEvents = function (event) {
    eventie.unbind(event.target, 'load', this);
    eventie.unbind(event.target, 'error', this);
  };

  // -----  ----- //
  return ImagesLoaded;

});
/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.6
 */
(function ($) {
  var selectors = [];

  var check_binded = false;
  var check_lock = false;
  var defaults = {
    interval: 250,
    force_process: false
  };
  var $window = $(window);

  var $prior_appeared = [];

  function process() {
    check_lock = false;
    for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
      var $appeared = $(selectors[index]).filter(function () {
        return $(this).is(':appeared');
      });

      $appeared.trigger('appear', [$appeared]);

      if ($prior_appeared[index]) {
        var $disappeared = $prior_appeared[index].not($appeared);
        $disappeared.trigger('disappear', [$disappeared]);
      }
      $prior_appeared[index] = $appeared;
    }
  };

  function add_selector(selector) {
    selectors.push(selector);
    $prior_appeared.push();
  }

  // "appeared" custom filter
  $.expr[':']['appeared'] = function (element) {
    var $element = $(element);
    if (!$element.is(':visible')) {
      return false;
    }

    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;

    if (top + $element.height() >= window_top && top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() && left + $element.width() >= window_left && left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
      return true;
    } else {
      return false;
    }
  };

  $.fn.extend({
    // watching for element's appearance in browser viewport
    appear: function (options) {
      var opts = $.extend({}, defaults, options || {});
      var selector = this.selector || this;
      if (!check_binded) {
        var on_check = function () {
          if (check_lock) {
            return;
          }
          check_lock = true;

          setTimeout(process, opts.interval);
        };

        $(window).scroll(on_check).resize(on_check);
        check_binded = true;
      }

      if (opts.force_process) {
        setTimeout(process, opts.interval);
      }
      add_selector(selector);
      return $(selector);
    }
  });

  $.extend({
    // force elements's appearance check
    force_appear: function () {
      if (check_binded) {
        process();
        return true;
      }
      return false;
    }
  });
})(function () {
  if (typeof module !== 'undefined') {
    // Node
    return require('jquery');
  } else {
    return jQuery;
  }
}());


/* --- $DJAX --- */

/*
 * jQuery djax
 *
 * @version v0.122
 *
 * Copyright 2012, Brian Zeligson
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Homepage:
 *   http://beezee.github.com/djax.html
 *
 * Authors:
 *   Brian Zeligson
 *
 * Contributors:
 *  Gary Jones @GaryJones
 *
 * Maintainer:
 *   Brian Zeligson github @beezee
 *
 */

/*jslint browser: true, indent: 4, maxerr: 50, sub: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, noarg:true, noempty:true, nomen:true, nonew:true, onevar:true, plusplus:true, regexp:true, smarttabs:true, strict:true, trailing:true, undef:true, white:true, browser:true, jquery:true, indent:4, maxerr:50, */
/*global jQuery */

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name jquery.djax.js
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/jquery-1.7.js
// ==/ClosureCompiler==
// http://closure-compiler.appspot.com/home
(function ($, exports) {
  'use strict';

  $.support.cors = true;

  $.fn.djax = function (selector, exceptions, replaceBlockWithFunc) {

    // If browser doesn't support pushState, abort now
    if (!history.pushState) {
      return $(this);
    }

    var self = this,
        blockSelector = selector,
        excludes = (exceptions && exceptions.length) ? exceptions : [],
        replaceBlockWith = (replaceBlockWithFunc) ? replaceBlockWithFunc : $.fn.replaceWith,
        djaxing = false;

    // Ensure that the history is correct when going from 2nd page to 1st
    window.history.replaceState({
      'url': window.location.href,
      'title': $('title').text()
    }, $('title').text(), window.location.href);

    //if (globalDebug) {console.log("djax::replaceState url:" + window.location.href);}
    self.clearDjaxing = function () {
      self.djaxing = false;
    }

    // Exclude the link exceptions
    self.attachClick = function (element, event) {

      var link = $(element),
          exception = false;

      $.each(excludes, function (index, exclusion) {
        if (link.attr('href').indexOf(exclusion) !== -1) {
          exception = true;
        }
        if (window.location.href.indexOf(exclusion) !== -1) {
          exception = true;
        }
      });

      // If the link is one of the exceptions, return early so that
      // the link can be clicked and a full page load as normal
      if (exception) {
        return $(element);
      }

      // From this point on, we handle the behaviour
      event.preventDefault();

      // If we're already doing djaxing, return now and silently fail
      if (self.djaxing) {
        setTimeout(self.clearDjaxing, 1000);
        return $(element);
      }

      $(window).trigger('djaxClick', [element]);
      self.reqUrl = link.attr('href');
      self.triggered = false;
      self.navigate(link.attr('href'), true);
    };

    // Handle the navigation
    self.navigate = function (url, add) {

      var blocks = $(blockSelector);

      self.djaxing = true;

      // Get the new page
      $(window).trigger('djaxLoading', [{
        'url': url
      }]);

      var replaceBlocks = function (response) {
        if (url !== self.reqUrl) {
          self.navigate(self.reqUrl, false);
          return true;
        }

        var result = $(response),
            newBlocks = $(result).find(blockSelector);

        if (add === true) {
          window.history.pushState({
            'url': url,
            'title': $(result).filter('title').text()
          }, $(result).filter('title').text(), url);

          //if (globalDebug) {console.log("djax::pushState url:" + url);}
        }

        // Set page title as new page title
        // Set title cross-browser:
        // - $('title').text(title_text); returns an error on IE7
        //
        document.title = $(result).filter('title').text();

        // Loop through each block and find new page equivalent
        blocks.each(function () {

          var id = '#' + $(this).attr('id'),
              newBlock = newBlocks.filter(id),
              block = $(this);

          $('a', newBlock).filter(function () {
            return this.hostname === location.hostname;
          }).addClass('dJAX_internal').on('click', function (event) {
            return self.attachClick(this, event);
          });

          if (newBlock.length) {
            if (block.html() !== newBlock.html()) {
              replaceBlockWith.call(block, newBlock);

            }
          } else {
            block.remove();
          }

        });

        // Loop through new page blocks and add in as needed
        $.each(newBlocks, function () {

          var newBlock = $(this),
              id = '#' + $(this).attr('id'),
              $previousSibling;

          // If there is a new page block without an equivalent block
          // in the old page, we need to find out where to insert it
          if (!$(id).length) {

            // Find the previous sibling
            $previousSibling = $(result).find(id).prev();

            if ($previousSibling.length) {
              // Insert after the previous element
              newBlock.insertAfter('#' + $previousSibling.attr('id'));
            } else {
              // There's no previous sibling, so prepend to parent instead
              newBlock.prependTo('#' + newBlock.parent().attr('id'));
            }

            // Only add a class to internal links
            $('a', newBlock).filter(function () {
              return this.hostname === location.hostname;
            }).addClass('dJAX_internal').on('click', function (event) {
              return self.attachClick(this, event);
            });
          }

        });


        // Trigger djaxLoad event as a pseudo ready()
        if (!self.triggered) {
          $(window).trigger('djaxLoad', [{
            'url': url,
            'title': $(result).filter('title').text(),
            'response': response
          }]);
          self.triggered = true;
          self.djaxing = false;
        }

        // Trigger a djaxLoaded event when done
        $(window).trigger('djaxLoaded', [{
          'url': url,
          'title': $(result).filter('title').text(),
          'response': response
        }]);
      };

      $.ajax({
        'url': url,
        'success': function (response) {
          replaceBlocks(response);
        },
        'error': function (response, textStatus, errorThrown) {
          // handle error
          console.log('error', response, textStatus, errorThrown);
          replaceBlocks(response['responseText']);
        }
      });
    }; /* End self.navigate */

    // Only add a class to internal links
    $(this).find('a').filter(function () {
      return this.hostname === location.hostname;
    }).addClass('dJAX_internal').on('click', function (event) {
      return self.attachClick(this, event);
    });

    // On new page load
    $(window).bind('popstate', function (event) {
      self.triggered = false;
      if (event.originalEvent.state) {
        self.reqUrl = event.originalEvent.state.url;
        self.navigate(event.originalEvent.state.url, false);
      }
    });

  };

}(jQuery, window));
/**!
 * MixItUp v2.1.8
 *
 * @copyright Copyright 2015 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://mixitup.kunkalabs.com
 *
 * @license   Commercial use requires a commercial license.
 *            https://mixitup.kunkalabs.com/licenses/
 *
 *            Non-commercial use permitted under terms of CC-BY-NC license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */

(function ($, undf) {

  /**
   * MixItUp Constructor Function
   * @constructor
   * @extends jQuery
   */

  $.MixItUp = function () {
    var self = this;

    self._execAction('_constructor', 0);

    $.extend(self, {

/* Public Properties
            ---------------------------------------------------------------------- */

      selectors: {
        target: '.mix',
        filter: '.filter',
        sort: '.sort'
      },

      animation: {
        enable: true,
        effects: 'fade scale',
        duration: 600,
        easing: 'ease',
        perspectiveDistance: '3000',
        perspectiveOrigin: '50% 50%',
        queue: true,
        queueLimit: 1,
        animateChangeLayout: false,
        animateResizeContainer: true,
        animateResizeTargets: false,
        staggerSequence: false,
        reverseOut: false
      },

      callbacks: {
        onMixLoad: false,
        onMixStart: false,
        onMixBusy: false,
        onMixEnd: false,
        onMixFail: false,
        _user: false
      },

      controls: {
        enable: true,
        live: false,
        toggleFilterButtons: false,
        toggleLogic: 'or',
        activeClass: 'active'
      },

      layout: {
        display: 'inline-block',
        containerClass: '',
        containerClassFail: 'fail'
      },

      load: {
        filter: 'all',
        sort: false
      },

/* Private Properties
            ---------------------------------------------------------------------- */

      _$body: null,
      _$container: null,
      _$targets: null,
      _$parent: null,
      _$sortButtons: null,
      _$filterButtons: null,

      _suckMode: false,
      _mixing: false,
      _sorting: false,
      _clicking: false,
      _loading: true,
      _changingLayout: false,
      _changingClass: false,
      _changingDisplay: false,

      _origOrder: [],
      _startOrder: [],
      _newOrder: [],
      _activeFilter: null,
      _toggleArray: [],
      _toggleString: '',
      _activeSort: 'default:asc',
      _newSort: null,
      _startHeight: null,
      _newHeight: null,
      _incPadding: true,
      _newDisplay: null,
      _newClass: null,
      _targetsBound: 0,
      _targetsDone: 0,
      _queue: [],

      _$show: $(),
      _$hide: $()
    });

    self._execAction('_constructor', 1);
  };

  /**
   * MixItUp Prototype
   * @override
   */

  $.MixItUp.prototype = {
    constructor: $.MixItUp,

/* Static Properties
        ---------------------------------------------------------------------- */

    _instances: {},
    _handled: {
      _filter: {},
      _sort: {}
    },
    _bound: {
      _filter: {},
      _sort: {}
    },
    _actions: {},
    _filters: {},

/* Static Methods
        ---------------------------------------------------------------------- */

    /**
     * Extend
     * @since 2.1.0
     * @param {object} new properties/methods
     * @extends {object} prototype
     */

    extend: function (extension) {
      for (var key in extension) {
        $.MixItUp.prototype[key] = extension[key];
      }
    },

    /**
     * Add Action
     * @since 2.1.0
     * @param {string} hook name
     * @param {string} namespace
     * @param {function} function to execute
     * @param {number} priority
     * @extends {object} $.MixItUp.prototype._actions
     */

    addAction: function (hook, name, func, priority) {
      $.MixItUp.prototype._addHook('_actions', hook, name, func, priority);
    },

    /**
     * Add Filter
     * @since 2.1.0
     * @param {string} hook name
     * @param {string} namespace
     * @param {function} function to execute
     * @param {number} priority
     * @extends {object} $.MixItUp.prototype._filters
     */

    addFilter: function (hook, name, func, priority) {
      $.MixItUp.prototype._addHook('_filters', hook, name, func, priority);
    },

    /**
     * Add Hook
     * @since 2.1.0
     * @param {string} type of hook
     * @param {string} hook name
     * @param {function} function to execute
     * @param {number} priority
     * @extends {object} $.MixItUp.prototype._filters
     */

    _addHook: function (type, hook, name, func, priority) {
      var collection = $.MixItUp.prototype[type],
          obj = {};

      priority = (priority === 1 || priority === 'post') ? 'post' : 'pre';

      obj[hook] = {};
      obj[hook][priority] = {};
      obj[hook][priority][name] = func;

      $.extend(true, collection, obj);
    },


/* Private Methods
        ---------------------------------------------------------------------- */

    /**
     * Initialise
     * @since 2.0.0
     * @param {object} domNode
     * @param {object} config
     */

    _init: function (domNode, config) {
      var self = this;

      self._execAction('_init', 0, arguments);

      config && $.extend(true, self, config);

      self._$body = $('body');
      self._domNode = domNode;
      self._$container = $(domNode);
      self._$container.addClass(self.layout.containerClass);
      self._id = domNode.id;

      self._platformDetect();

      self._brake = self._getPrefixedCSS('transition', 'none');

      self._refresh(true);

      self._$parent = self._$targets.parent().length ? self._$targets.parent() : self._$container;

      if (self.load.sort) {
        self._newSort = self._parseSort(self.load.sort);
        self._newSortString = self.load.sort;
        self._activeSort = self.load.sort;
        self._sort();
        self._printSort();
      }

      self._activeFilter = self.load.filter === 'all' ? self.selectors.target : self.load.filter === 'none' ? '' : self.load.filter;

      self.controls.enable && self._bindHandlers();

      if (self.controls.toggleFilterButtons) {
        self._buildToggleArray();

        for (var i = 0; i < self._toggleArray.length; i++) {
          self._updateControls({
            filter: self._toggleArray[i],
            sort: self._activeSort
          }, true);
        };
      } else if (self.controls.enable) {
        self._updateControls({
          filter: self._activeFilter,
          sort: self._activeSort
        });
      }

      self._filter();

      self._init = true;

      self._$container.data('mixItUp', self);

      self._execAction('_init', 1, arguments);

      self._buildState();

      self._$targets.css(self._brake);

      self._goMix(self.animation.enable);
    },

    /**
     * Platform Detect
     * @since 2.0.0
     */

    _platformDetect: function () {
      var self = this,
          vendorsTrans = ['Webkit', 'Moz', 'O', 'ms'],
          vendorsRAF = ['webkit', 'moz'],
          chrome = window.navigator.appVersion.match(/Chrome\/(\d+)\./) || false,
          ff = typeof InstallTrigger !== 'undefined',
          prefix = function (el) {
          for (var i = 0; i < vendorsTrans.length; i++) {
            if (vendorsTrans[i] + 'Transition' in el.style) {
              return {
                prefix: '-' + vendorsTrans[i].toLowerCase() + '-',
                vendor: vendorsTrans[i]
              };
            };
          };
          return 'transition' in el.style ? '' : false;
          },
          transPrefix = prefix(self._domNode);

      self._execAction('_platformDetect', 0);

      self._chrome = chrome ? parseInt(chrome[1], 10) : false;
      self._ff = ff ? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]) : false;
      self._prefix = transPrefix.prefix;
      self._vendor = transPrefix.vendor;
      self._suckMode = window.atob && self._prefix ? false : true;

      self._suckMode && (self.animation.enable = false);
      (self._ff && self._ff <= 4) && (self.animation.enable = false);

/* Polyfills
            ---------------------------------------------------------------------- */

      /**
       * window.requestAnimationFrame
       */

      for (var x = 0; x < vendorsRAF.length && !window.requestAnimationFrame; x++) {
        window.requestAnimationFrame = window[vendorsRAF[x] + 'RequestAnimationFrame'];
      }

      /**
       * Object.getPrototypeOf
       */

      if (typeof Object.getPrototypeOf !== 'function') {
        if (typeof 'test'.__proto__ === 'object') {
          Object.getPrototypeOf = function (object) {
            return object.__proto__;
          };
        } else {
          Object.getPrototypeOf = function (object) {
            return object.constructor.prototype;
          };
        }
      }

      /**
       * Element.nextElementSibling
       */

      if (self._domNode.nextElementSibling === undf) {
        Object.defineProperty(Element.prototype, 'nextElementSibling', {
          get: function () {
            var el = this.nextSibling;

            while (el) {
              if (el.nodeType === 1) {
                return el;
              }
              el = el.nextSibling;
            }
            return null;
          }
        });
      }

      self._execAction('_platformDetect', 1);
    },

    /**
     * Refresh
     * @since 2.0.0
     * @param {boolean} init
     * @param {boolean} force
     */

    _refresh: function (init, force) {
      var self = this;

      self._execAction('_refresh', 0, arguments);

      self._$targets = self._$container.find(self.selectors.target);

      for (var i = 0; i < self._$targets.length; i++) {
        var target = self._$targets[i];

        if (target.dataset === undf || force) {

          target.dataset = {};

          for (var j = 0; j < target.attributes.length; j++) {

            var attr = target.attributes[j],
                name = attr.name,
                val = attr.value;

            if (name.indexOf('data-') > -1) {
              var dataName = self._helpers._camelCase(name.substring(5, name.length));
              target.dataset[dataName] = val;
            }
          }
        }

        if (target.mixParent === undf) {
          target.mixParent = self._id;
        }
      }

      if ((self._$targets.length && init) || (!self._origOrder.length && self._$targets.length)) {
        self._origOrder = [];

        for (var i = 0; i < self._$targets.length; i++) {
          var target = self._$targets[i];

          self._origOrder.push(target);
        }
      }

      self._execAction('_refresh', 1, arguments);
    },

    /**
     * Bind Handlers
     * @since 2.0.0
     */

    _bindHandlers: function () {
      var self = this,
          filters = $.MixItUp.prototype._bound._filter,
          sorts = $.MixItUp.prototype._bound._sort;

      self._execAction('_bindHandlers', 0);

      if (self.controls.live) {
        self._$body.on('click.mixItUp.' + self._id, self.selectors.sort, function () {
          self._processClick($(this), 'sort');
        }).on('click.mixItUp.' + self._id, self.selectors.filter, function () {
          self._processClick($(this), 'filter');
        });
      } else {
        self._$sortButtons = $(self.selectors.sort);
        self._$filterButtons = $(self.selectors.filter);

        self._$sortButtons.on('click.mixItUp.' + self._id, function () {
          self._processClick($(this), 'sort');
        });

        self._$filterButtons.on('click.mixItUp.' + self._id, function () {
          self._processClick($(this), 'filter');
        });
      }

      filters[self.selectors.filter] = (filters[self.selectors.filter] === undf) ? 1 : filters[self.selectors.filter] + 1;
      sorts[self.selectors.sort] = (sorts[self.selectors.sort] === undf) ? 1 : sorts[self.selectors.sort] + 1;

      self._execAction('_bindHandlers', 1);
    },

    /**
     * Process Click
     * @since 2.0.0
     * @param {object} $button
     * @param {string} type
     */

    _processClick: function ($button, type) {
      var self = this,
          trackClick = function ($button, type, off) {
          var proto = $.MixItUp.prototype;

          proto._handled['_' + type][self.selectors[type]] = (proto._handled['_' + type][self.selectors[type]] === undf) ? 1 : proto._handled['_' + type][self.selectors[type]] + 1;

          if (proto._handled['_' + type][self.selectors[type]] === proto._bound['_' + type][self.selectors[type]]) {
            $button[(off ? 'remove' : 'add') + 'Class'](self.controls.activeClass);
            delete proto._handled['_' + type][self.selectors[type]];
          }
          };

      self._execAction('_processClick', 0, arguments);

      if (!self._mixing || (self.animation.queue && self._queue.length < self.animation.queueLimit)) {
        self._clicking = true;

        if (type === 'sort') {
          var sort = $button.attr('data-sort');

          if (!$button.hasClass(self.controls.activeClass) || sort.indexOf('random') > -1) {
            $(self.selectors.sort).removeClass(self.controls.activeClass);
            trackClick($button, type);
            self.sort(sort);
          }
        }

        if (type === 'filter') {
          var filter = $button.attr('data-filter'),
              ndx, seperator = self.controls.toggleLogic === 'or' ? ',' : '';

          if (!self.controls.toggleFilterButtons) {
            if (!$button.hasClass(self.controls.activeClass)) {
              $(self.selectors.filter).removeClass(self.controls.activeClass);
              trackClick($button, type);
              self.filter(filter);
            }
          } else {
            self._buildToggleArray();

            if (!$button.hasClass(self.controls.activeClass)) {
              trackClick($button, type);

              self._toggleArray.push(filter);
            } else {
              trackClick($button, type, true);
              ndx = self._toggleArray.indexOf(filter);
              self._toggleArray.splice(ndx, 1);
            }

            self._toggleArray = $.grep(self._toggleArray, function (n) {
              return (n);
            });

            self._toggleString = self._toggleArray.join(seperator);

            self.filter(self._toggleString);
          }
        }

        self._execAction('_processClick', 1, arguments);
      } else {
        if (typeof self.callbacks.onMixBusy === 'function') {
          self.callbacks.onMixBusy.call(self._domNode, self._state, self);
        }
        self._execAction('_processClickBusy', 1, arguments);
      }
    },

    /**
     * Build Toggle Array
     * @since 2.0.0
     */

    _buildToggleArray: function () {
      var self = this,
          activeFilter = self._activeFilter.replace(/\s/g, '');

      self._execAction('_buildToggleArray', 0, arguments);

      if (self.controls.toggleLogic === 'or') {
        self._toggleArray = activeFilter.split(',');
      } else {
        self._toggleArray = activeFilter.split('.');

        !self._toggleArray[0] && self._toggleArray.shift();

        for (var i = 0, filter; filter = self._toggleArray[i]; i++) {
          self._toggleArray[i] = '.' + filter;
        }
      }

      self._execAction('_buildToggleArray', 1, arguments);
    },

    /**
     * Update Controls
     * @since 2.0.0
     * @param {object} command
     * @param {boolean} multi
     */

    _updateControls: function (command, multi) {
      var self = this,
          output = {
          filter: command.filter,
          sort: command.sort
          },
          update = function ($el, filter) {
          try {
            (multi && type === 'filter' && !(output.filter === 'none' || output.filter === '')) ? $el.filter(filter).addClass(self.controls.activeClass) : $el.removeClass(self.controls.activeClass).filter(filter).addClass(self.controls.activeClass);
          } catch (e) {}
          },
          type = 'filter',
          $el = null;

      self._execAction('_updateControls', 0, arguments);

      (command.filter === undf) && (output.filter = self._activeFilter);
      (command.sort === undf) && (output.sort = self._activeSort);
      (output.filter === self.selectors.target) && (output.filter = 'all');

      for (var i = 0; i < 2; i++) {
        $el = self.controls.live ? $(self.selectors[type]) : self['_$' + type + 'Buttons'];
        $el && update($el, '[data-' + type + '="' + output[type] + '"]');
        type = 'sort';
      }

      self._execAction('_updateControls', 1, arguments);
    },

    /**
     * Filter (private)
     * @since 2.0.0
     */

    _filter: function () {
      var self = this;

      self._execAction('_filter', 0);

      for (var i = 0; i < self._$targets.length; i++) {
        var $target = $(self._$targets[i]);

        if ($target.is(self._activeFilter)) {
          self._$show = self._$show.add($target);
        } else {
          self._$hide = self._$hide.add($target);
        }
      }

      self._execAction('_filter', 1);
    },

    /**
     * Sort (private)
     * @since 2.0.0
     */

    _sort: function () {
      var self = this,
          arrayShuffle = function (oldArray) {
          var newArray = oldArray.slice(),
              len = newArray.length,
              i = len;

          while (i--) {
            var p = parseInt(Math.random() * len);
            var t = newArray[i];
            newArray[i] = newArray[p];
            newArray[p] = t;
          };
          return newArray;
          };

      self._execAction('_sort', 0);

      self._startOrder = [];

      for (var i = 0; i < self._$targets.length; i++) {
        var target = self._$targets[i];

        self._startOrder.push(target);
      }

      switch (self._newSort[0].sortBy) {
      case 'default':
        self._newOrder = self._origOrder;
        break;
      case 'random':
        self._newOrder = arrayShuffle(self._startOrder);
        break;
      case 'custom':
        self._newOrder = self._newSort[0].order;
        break;
      default:
        self._newOrder = self._startOrder.concat().sort(function (a, b) {
          return self._compare(a, b);
        });
      }

      self._execAction('_sort', 1);
    },

    /**
     * Compare Algorithm
     * @since 2.0.0
     * @param {string|number} a
     * @param {string|number} b
     * @param {number} depth (recursion)
     * @return {number}
     */

    _compare: function (a, b, depth) {
      depth = depth ? depth : 0;

      var self = this,
          order = self._newSort[depth].order,
          getData = function (el) {
          return el.dataset[self._newSort[depth].sortBy] || 0;
          },
          attrA = isNaN(getData(a) * 1) ? getData(a).toLowerCase() : getData(a) * 1,
          attrB = isNaN(getData(b) * 1) ? getData(b).toLowerCase() : getData(b) * 1;

      if (attrA < attrB) return order === 'asc' ? -1 : 1;
      if (attrA > attrB) return order === 'asc' ? 1 : -1;
      if (attrA === attrB && self._newSort.length > depth + 1) return self._compare(a, b, depth + 1);

      return 0;
    },

    /**
     * Print Sort
     * @since 2.0.0
     * @param {boolean} reset
     */

    _printSort: function (reset) {
      var self = this,
          order = reset ? self._startOrder : self._newOrder,
          targets = self._$parent[0].querySelectorAll(self.selectors.target),
          nextSibling = targets.length ? targets[targets.length - 1].nextElementSibling : null,
          frag = document.createDocumentFragment();

      self._execAction('_printSort', 0, arguments);

      for (var i = 0; i < targets.length; i++) {
        var target = targets[i],
            whiteSpace = target.nextSibling;

        if (target.style.position === 'absolute') continue;

        if (whiteSpace && whiteSpace.nodeName === '#text') {
          self._$parent[0].removeChild(whiteSpace);
        }

        self._$parent[0].removeChild(target);
      }

      for (var i = 0; i < order.length; i++) {
        var el = order[i];

        if (self._newSort[0].sortBy === 'default' && self._newSort[0].order === 'desc' && !reset) {
          var firstChild = frag.firstChild;
          frag.insertBefore(el, firstChild);
          frag.insertBefore(document.createTextNode(' '), el);
        } else {
          frag.appendChild(el);
          frag.appendChild(document.createTextNode(' '));
        }
      }

      nextSibling ? self._$parent[0].insertBefore(frag, nextSibling) : self._$parent[0].appendChild(frag);

      self._execAction('_printSort', 1, arguments);
    },

    /**
     * Parse Sort
     * @since 2.0.0
     * @param {string} sortString
     * @return {array} newSort
     */

    _parseSort: function (sortString) {
      var self = this,
          rules = typeof sortString === 'string' ? sortString.split(' ') : [sortString],
          newSort = [];

      for (var i = 0; i < rules.length; i++) {
        var rule = typeof sortString === 'string' ? rules[i].split(':') : ['custom', rules[i]],
            ruleObj = {
            sortBy: self._helpers._camelCase(rule[0]),
            order: rule[1] || 'asc'
            };

        newSort.push(ruleObj);

        if (ruleObj.sortBy === 'default' || ruleObj.sortBy === 'random') break;
      }

      return self._execFilter('_parseSort', newSort, arguments);
    },

    /**
     * Parse Effects
     * @since 2.0.0
     * @return {object} effects
     */

    _parseEffects: function () {
      var self = this,
          effects = {
          opacity: '',
          transformIn: '',
          transformOut: '',
          filter: ''
          },
          parse = function (effect, extract, reverse) {
          if (self.animation.effects.indexOf(effect) > -1) {
            if (extract) {
              var propIndex = self.animation.effects.indexOf(effect + '(');
              if (propIndex > -1) {
                var str = self.animation.effects.substring(propIndex),
                    match = /\(([^)]+)\)/.exec(str),
                    val = match[1];

                return {
                  val: val
                };
              }
            }
            return true;
          } else {
            return false;
          }
          },
          negate = function (value, invert) {
          if (invert) {
            return value.charAt(0) === '-' ? value.substr(1, value.length) : '-' + value;
          } else {
            return value;
          }
          },
          buildTransform = function (key, invert) {
          var transforms = [
            ['scale', '.01'],
            ['translateX', '20px'],
            ['translateY', '20px'],
            ['translateZ', '20px'],
            ['rotateX', '90deg'],
            ['rotateY', '90deg'],
            ['rotateZ', '180deg'], ];

          for (var i = 0; i < transforms.length; i++) {
            var prop = transforms[i][0],
                def = transforms[i][1],
                inverted = invert && prop !== 'scale';

            effects[key] += parse(prop) ? prop + '(' + negate(parse(prop, true).val || def, inverted) + ') ' : '';
          }
          };

      effects.opacity = parse('fade') ? parse('fade', true).val || '0' : '1';

      buildTransform('transformIn');

      self.animation.reverseOut ? buildTransform('transformOut', true) : (effects.transformOut = effects.transformIn);

      effects.transition = {};

      effects.transition = self._getPrefixedCSS('transition', 'all ' + self.animation.duration + 'ms ' + self.animation.easing + ', opacity ' + self.animation.duration + 'ms linear');

      self.animation.stagger = parse('stagger') ? true : false;
      self.animation.staggerDuration = parseInt(parse('stagger') ? (parse('stagger', true).val ? parse('stagger', true).val : 100) : 100);

      return self._execFilter('_parseEffects', effects);
    },

    /**
     * Build State
     * @since 2.0.0
     * @param {boolean} future
     * @return {object} futureState
     */

    _buildState: function (future) {
      var self = this,
          state = {};

      self._execAction('_buildState', 0);

      state = {
        activeFilter: self._activeFilter === '' ? 'none' : self._activeFilter,
        activeSort: future && self._newSortString ? self._newSortString : self._activeSort,
        fail: !self._$show.length && self._activeFilter !== '',
        $targets: self._$targets,
        $show: self._$show,
        $hide: self._$hide,
        totalTargets: self._$targets.length,
        totalShow: self._$show.length,
        totalHide: self._$hide.length,
        display: future && self._newDisplay ? self._newDisplay : self.layout.display
      };

      if (future) {
        return self._execFilter('_buildState', state);
      } else {
        self._state = state;

        self._execAction('_buildState', 1);
      }
    },

    /**
     * Go Mix
     * @since 2.0.0
     * @param {boolean} animate
     */

    _goMix: function (animate) {
      var self = this,
          phase1 = function () {
          if (self._chrome && (self._chrome === 31)) {
            chromeFix(self._$parent[0]);
          }

          self._setInter();

          phase2();
          },
          phase2 = function () {
          var scrollTop = window.pageYOffset,
              scrollLeft = window.pageXOffset,
              docHeight = document.documentElement.scrollHeight;

          self._getInterMixData();

          self._setFinal();

          self._getFinalMixData();

          (window.pageYOffset !== scrollTop) && window.scrollTo(scrollLeft, scrollTop);

          self._prepTargets();

          if (window.requestAnimationFrame) {
            requestAnimationFrame(phase3);
          } else {
            setTimeout(function () {
              phase3();
            }, 20);
          }
          },
          phase3 = function () {
          self._animateTargets();

          if (self._targetsBound === 0) {
            self._cleanUp();
          }
          },
          chromeFix = function (grid) {
          var parent = grid.parentElement,
              placeholder = document.createElement('div'),
              frag = document.createDocumentFragment();

          parent.insertBefore(placeholder, grid);
          frag.appendChild(grid);
          parent.replaceChild(grid, placeholder);
          },
          futureState = self._buildState(true);

      self._execAction('_goMix', 0, arguments);

      !self.animation.duration && (animate = false);

      self._mixing = true;

      self._$container.removeClass(self.layout.containerClassFail);

      if (typeof self.callbacks.onMixStart === 'function') {
        self.callbacks.onMixStart.call(self._domNode, self._state, futureState, self);
      }

      self._$container.trigger('mixStart', [self._state, futureState, self]);

      self._getOrigMixData();

      if (animate && !self._suckMode) {

        window.requestAnimationFrame ? requestAnimationFrame(phase1) : phase1();

      } else {
        self._cleanUp();
      }

      self._execAction('_goMix', 1, arguments);
    },

    /**
     * Get Target Data
     * @since 2.0.0
     */

    _getTargetData: function (el, stage) {
      var self = this,
          elStyle;

      el.dataset[stage + 'PosX'] = el.offsetLeft;
      el.dataset[stage + 'PosY'] = el.offsetTop;

      if (self.animation.animateResizeTargets) {
        elStyle = !self._suckMode ? window.getComputedStyle(el) : {
          marginBottom: '',
          marginRight: ''
        };

        el.dataset[stage + 'MarginBottom'] = parseInt(elStyle.marginBottom);
        el.dataset[stage + 'MarginRight'] = parseInt(elStyle.marginRight);
        el.dataset[stage + 'Width'] = el.offsetWidth;
        el.dataset[stage + 'Height'] = el.offsetHeight;
      }
    },

    /**
     * Get Original Mix Data
     * @since 2.0.0
     */

    _getOrigMixData: function () {
      var self = this,
          parentStyle = !self._suckMode ? window.getComputedStyle(self._$parent[0]) : {
          boxSizing: ''
          },
          parentBS = parentStyle.boxSizing || parentStyle[self._vendor + 'BoxSizing'];

      self._incPadding = (parentBS === 'border-box');

      self._execAction('_getOrigMixData', 0);

      !self._suckMode && (self.effects = self._parseEffects());

      self._$toHide = self._$hide.filter(':visible');
      self._$toShow = self._$show.filter(':hidden');
      self._$pre = self._$targets.filter(':visible');

      self._startHeight = self._incPadding ? self._$parent.outerHeight() : self._$parent.height();

      for (var i = 0; i < self._$pre.length; i++) {
        var el = self._$pre[i];

        self._getTargetData(el, 'orig');
      }

      self._execAction('_getOrigMixData', 1);
    },

    /**
     * Set Intermediate Positions
     * @since 2.0.0
     */

    _setInter: function () {
      var self = this;

      self._execAction('_setInter', 0);

      if (self._changingLayout && self.animation.animateChangeLayout) {
        self._$toShow.css('display', self._newDisplay);

        if (self._changingClass) {
          self._$container.removeClass(self.layout.containerClass).addClass(self._newClass);
        }
      } else {
        self._$toShow.css('display', self.layout.display);
      }

      self._execAction('_setInter', 1);
    },

    /**
     * Get Intermediate Mix Data
     * @since 2.0.0
     */

    _getInterMixData: function () {
      var self = this;

      self._execAction('_getInterMixData', 0);

      for (var i = 0; i < self._$toShow.length; i++) {
        var el = self._$toShow[i];

        self._getTargetData(el, 'inter');
      }

      for (var i = 0; i < self._$pre.length; i++) {
        var el = self._$pre[i];

        self._getTargetData(el, 'inter');
      }

      self._execAction('_getInterMixData', 1);
    },

    /**
     * Set Final Positions
     * @since 2.0.0
     */

    _setFinal: function () {
      var self = this;

      self._execAction('_setFinal', 0);

      self._sorting && self._printSort();

      self._$toHide.removeStyle('display');

      if (self._changingLayout && self.animation.animateChangeLayout) {
        self._$pre.css('display', self._newDisplay);
      }

      self._execAction('_setFinal', 1);
    },

    /**
     * Get Final Mix Data
     * @since 2.0.0
     */

    _getFinalMixData: function () {
      var self = this;

      self._execAction('_getFinalMixData', 0);

      for (var i = 0; i < self._$toShow.length; i++) {
        var el = self._$toShow[i];

        self._getTargetData(el, 'final');
      }

      for (var i = 0; i < self._$pre.length; i++) {
        var el = self._$pre[i];

        self._getTargetData(el, 'final');
      }

      self._newHeight = self._incPadding ? self._$parent.outerHeight() : self._$parent.height();

      self._sorting && self._printSort(true);

      self._$toShow.removeStyle('display');

      self._$pre.css('display', self.layout.display);

      if (self._changingClass && self.animation.animateChangeLayout) {
        self._$container.removeClass(self._newClass).addClass(self.layout.containerClass);
      }

      self._execAction('_getFinalMixData', 1);
    },

    /**
     * Prepare Targets
     * @since 2.0.0
     */

    _prepTargets: function () {
      var self = this,
          transformCSS = {
          _in: self._getPrefixedCSS('transform', self.effects.transformIn),
          _out: self._getPrefixedCSS('transform', self.effects.transformOut)
          };

      self._execAction('_prepTargets', 0);

      if (self.animation.animateResizeContainer) {
        self._$parent.css('height', self._startHeight + 'px');
      }

      for (var i = 0; i < self._$toShow.length; i++) {
        var el = self._$toShow[i],
            $el = $(el);

        el.style.opacity = self.effects.opacity;
        el.style.display = (self._changingLayout && self.animation.animateChangeLayout) ? self._newDisplay : self.layout.display;

        $el.css(transformCSS._in);

        if (self.animation.animateResizeTargets) {
          el.style.width = el.dataset.finalWidth + 'px';
          el.style.height = el.dataset.finalHeight + 'px';
          el.style.marginRight = -(el.dataset.finalWidth - el.dataset.interWidth) + (el.dataset.finalMarginRight * 1) + 'px';
          el.style.marginBottom = -(el.dataset.finalHeight - el.dataset.interHeight) + (el.dataset.finalMarginBottom * 1) + 'px';
        }
      }

      for (var i = 0; i < self._$pre.length; i++) {
        var el = self._$pre[i],
            $el = $(el),
            translate = {
            x: el.dataset.origPosX - el.dataset.interPosX,
            y: el.dataset.origPosY - el.dataset.interPosY
            },
            transformCSS = self._getPrefixedCSS('transform', 'translate(' + translate.x + 'px,' + translate.y + 'px)');

        $el.css(transformCSS);

        if (self.animation.animateResizeTargets) {
          el.style.width = el.dataset.origWidth + 'px';
          el.style.height = el.dataset.origHeight + 'px';

          if (el.dataset.origWidth - el.dataset.finalWidth) {
            el.style.marginRight = -(el.dataset.origWidth - el.dataset.interWidth) + (el.dataset.origMarginRight * 1) + 'px';
          }

          if (el.dataset.origHeight - el.dataset.finalHeight) {
            el.style.marginBottom = -(el.dataset.origHeight - el.dataset.interHeight) + (el.dataset.origMarginBottom * 1) + 'px';
          }
        }
      }

      self._execAction('_prepTargets', 1);
    },

    /**
     * Animate Targets
     * @since 2.0.0
     */

    _animateTargets: function () {
      var self = this;

      self._execAction('_animateTargets', 0);

      self._targetsDone = 0;
      self._targetsBound = 0;

      self._$parent.css(self._getPrefixedCSS('perspective', self.animation.perspectiveDistance + 'px')).css(self._getPrefixedCSS('perspective-origin', self.animation.perspectiveOrigin));

      if (self.animation.animateResizeContainer) {
        self._$parent.css(self._getPrefixedCSS('transition', 'height ' + self.animation.duration + 'ms ease')).css('height', self._newHeight + 'px');
      }

      for (var i = 0; i < self._$toShow.length; i++) {
        var el = self._$toShow[i],
            $el = $(el),
            translate = {
            x: el.dataset.finalPosX - el.dataset.interPosX,
            y: el.dataset.finalPosY - el.dataset.interPosY
            },
            delay = self._getDelay(i),
            toShowCSS = {};

        el.style.opacity = '';

        for (var j = 0; j < 2; j++) {
          var a = j === 0 ? a = self._prefix : '';

          if (self._ff && self._ff <= 20) {
            toShowCSS[a + 'transition-property'] = 'all';
            toShowCSS[a + 'transition-timing-function'] = self.animation.easing + 'ms';
            toShowCSS[a + 'transition-duration'] = self.animation.duration + 'ms';
          }

          toShowCSS[a + 'transition-delay'] = delay + 'ms';
          toShowCSS[a + 'transform'] = 'translate(' + translate.x + 'px,' + translate.y + 'px)';
        }

        if (self.effects.transform || self.effects.opacity) {
          self._bindTargetDone($el);
        }

        (self._ff && self._ff <= 20) ? $el.css(toShowCSS) : $el.css(self.effects.transition).css(toShowCSS);
      }

      for (var i = 0; i < self._$pre.length; i++) {
        var el = self._$pre[i],
            $el = $(el),
            translate = {
            x: el.dataset.finalPosX - el.dataset.interPosX,
            y: el.dataset.finalPosY - el.dataset.interPosY
            },
            delay = self._getDelay(i);

        if (!(
        el.dataset.finalPosX === el.dataset.origPosX && el.dataset.finalPosY === el.dataset.origPosY)) {
          self._bindTargetDone($el);
        }

        $el.css(self._getPrefixedCSS('transition', 'all ' + self.animation.duration + 'ms ' + self.animation.easing + ' ' + delay + 'ms'));
        $el.css(self._getPrefixedCSS('transform', 'translate(' + translate.x + 'px,' + translate.y + 'px)'));

        if (self.animation.animateResizeTargets) {
          if (el.dataset.origWidth - el.dataset.finalWidth && el.dataset.finalWidth * 1) {
            el.style.width = el.dataset.finalWidth + 'px';
            el.style.marginRight = -(el.dataset.finalWidth - el.dataset.interWidth) + (el.dataset.finalMarginRight * 1) + 'px';
          }

          if (el.dataset.origHeight - el.dataset.finalHeight && el.dataset.finalHeight * 1) {
            el.style.height = el.dataset.finalHeight + 'px';
            el.style.marginBottom = -(el.dataset.finalHeight - el.dataset.interHeight) + (el.dataset.finalMarginBottom * 1) + 'px';
          }
        }
      }

      if (self._changingClass) {
        self._$container.removeClass(self.layout.containerClass).addClass(self._newClass);
      }

      for (var i = 0; i < self._$toHide.length; i++) {
        var el = self._$toHide[i],
            $el = $(el),
            delay = self._getDelay(i),
            toHideCSS = {};

        for (var j = 0; j < 2; j++) {
          var a = j === 0 ? a = self._prefix : '';

          toHideCSS[a + 'transition-delay'] = delay + 'ms';
          toHideCSS[a + 'transform'] = self.effects.transformOut;
          toHideCSS.opacity = self.effects.opacity;
        }

        $el.css(self.effects.transition).css(toHideCSS);

        if (self.effects.transform || self.effects.opacity) {
          self._bindTargetDone($el);
        };
      }

      self._execAction('_animateTargets', 1);

    },

    /**
     * Bind Targets TransitionEnd
     * @since 2.0.0
     * @param {object} $el
     */

    _bindTargetDone: function ($el) {
      var self = this,
          el = $el[0];

      self._execAction('_bindTargetDone', 0, arguments);

      if (!el.dataset.bound) {

        el.dataset.bound = true;
        self._targetsBound++;

        $el.on('webkitTransitionEnd.mixItUp transitionend.mixItUp', function (e) {
          if ((e.originalEvent.propertyName.indexOf('transform') > -1 || e.originalEvent.propertyName.indexOf('opacity') > -1) && $(e.originalEvent.target).is(self.selectors.target)) {
            $el.off('.mixItUp');
            delete el.dataset.bound;
            self._targetDone();
          }
        });
      }

      self._execAction('_bindTargetDone', 1, arguments);
    },

    /**
     * Target Done
     * @since 2.0.0
     */

    _targetDone: function () {
      var self = this;

      self._execAction('_targetDone', 0);

      self._targetsDone++;

      (self._targetsDone === self._targetsBound) && self._cleanUp();

      self._execAction('_targetDone', 1);
    },

    /**
     * Clean Up
     * @since 2.0.0
     */

    _cleanUp: function () {
      var self = this,
          targetStyles = self.animation.animateResizeTargets ? 'transform opacity width height margin-bottom margin-right' : 'transform opacity';
      unBrake = function () {
        self._$targets.removeStyle('transition', self._prefix);
      };

      self._execAction('_cleanUp', 0);

      !self._changingLayout ? self._$show.css('display', self.layout.display) : self._$show.css('display', self._newDisplay);

      self._$targets.css(self._brake);

      self._$targets.removeStyle(targetStyles, self._prefix).removeAttr('data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom');

      self._$hide.removeStyle('display');

      self._$parent.removeStyle('height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin', self._prefix);

      if (self._sorting) {
        self._printSort();
        self._activeSort = self._newSortString;
        self._sorting = false;
      }

      if (self._changingLayout) {
        if (self._changingDisplay) {
          self.layout.display = self._newDisplay;
          self._changingDisplay = false;
        }

        if (self._changingClass) {
          self._$parent.removeClass(self.layout.containerClass).addClass(self._newClass);
          self.layout.containerClass = self._newClass;
          self._changingClass = false;
        }

        self._changingLayout = false;
      }

      self._refresh();

      self._buildState();

      if (self._state.fail) {
        self._$container.addClass(self.layout.containerClassFail);
      }

      self._$show = $();
      self._$hide = $();

      if (window.requestAnimationFrame) {
        requestAnimationFrame(unBrake);
      }

      self._mixing = false;

      if (typeof self.callbacks._user === 'function') {
        self.callbacks._user.call(self._domNode, self._state, self);
      }

      if (typeof self.callbacks.onMixEnd === 'function') {
        self.callbacks.onMixEnd.call(self._domNode, self._state, self);
      }

      self._$container.trigger('mixEnd', [self._state, self]);

      if (self._state.fail) {
        (typeof self.callbacks.onMixFail === 'function') && self.callbacks.onMixFail.call(self._domNode, self._state, self);
        self._$container.trigger('mixFail', [self._state, self]);
      }

      if (self._loading) {
        (typeof self.callbacks.onMixLoad === 'function') && self.callbacks.onMixLoad.call(self._domNode, self._state, self);
        self._$container.trigger('mixLoad', [self._state, self]);
      }

      if (self._queue.length) {
        self._execAction('_queue', 0);

        self.multiMix(self._queue[0][0], self._queue[0][1], self._queue[0][2]);
        self._queue.splice(0, 1);
      }

      self._execAction('_cleanUp', 1);

      self._loading = false;
    },

    /**
     * Get Prefixed CSS
     * @since 2.0.0
     * @param {string} property
     * @param {string} value
     * @param {boolean} prefixValue
     * @return {object} styles
     */

    _getPrefixedCSS: function (property, value, prefixValue) {
      var self = this,
          styles = {};

      for (i = 0; i < 2; i++) {
        var prefix = i === 0 ? self._prefix : '';
        prefixValue ? styles[prefix + property] = prefix + value : styles[prefix + property] = value;
      }

      return self._execFilter('_getPrefixedCSS', styles, arguments);
    },

    /**
     * Get Delay
     * @since 2.0.0
     * @param {number} i
     * @return {number} delay
     */

    _getDelay: function (i) {
      var self = this,
          n = typeof self.animation.staggerSequence === 'function' ? self.animation.staggerSequence.call(self._domNode, i, self._state) : i,
          delay = self.animation.stagger ? n * self.animation.staggerDuration : 0;

      return self._execFilter('_getDelay', delay, arguments);
    },

    /**
     * Parse MultiMix Arguments
     * @since 2.0.0
     * @param {array} args
     * @return {object} output
     */

    _parseMultiMixArgs: function (args) {
      var self = this,
          output = {
          command: null,
          animate: self.animation.enable,
          callback: null
          };

      for (var i = 0; i < args.length; i++) {
        var arg = args[i];

        if (arg !== null) {
          if (typeof arg === 'object' || typeof arg === 'string') {
            output.command = arg;
          } else if (typeof arg === 'boolean') {
            output.animate = arg;
          } else if (typeof arg === 'function') {
            output.callback = arg;
          }
        }
      }

      return self._execFilter('_parseMultiMixArgs', output, arguments);
    },

    /**
     * Parse Insert Arguments
     * @since 2.0.0
     * @param {array} args
     * @return {object} output
     */

    _parseInsertArgs: function (args) {
      var self = this,
          output = {
          index: 0,
          $object: $(),
          multiMix: {
            filter: self._state.activeFilter
          },
          callback: null
          };

      for (var i = 0; i < args.length; i++) {
        var arg = args[i];

        if (typeof arg === 'number') {
          output.index = arg;
        } else if (typeof arg === 'object' && arg instanceof $) {
          output.$object = arg;
        } else if (typeof arg === 'object' && self._helpers._isElement(arg)) {
          output.$object = $(arg);
        } else if (typeof arg === 'object' && arg !== null) {
          output.multiMix = arg;
        } else if (typeof arg === 'boolean' && !arg) {
          output.multiMix = false;
        } else if (typeof arg === 'function') {
          output.callback = arg;
        }
      }

      return self._execFilter('_parseInsertArgs', output, arguments);
    },

    /**
     * Execute Action
     * @since 2.0.0
     * @param {string} methodName
     * @param {boolean} isPost
     * @param {array} args
     */

    _execAction: function (methodName, isPost, args) {
      var self = this,
          context = isPost ? 'post' : 'pre';

      if (!self._actions.isEmptyObject && self._actions.hasOwnProperty(methodName)) {
        for (var key in self._actions[methodName][context]) {
          self._actions[methodName][context][key].call(self, args);
        }
      }
    },

    /**
     * Execute Filter
     * @since 2.0.0
     * @param {string} methodName
     * @param {mixed} value
     * @return {mixed} value
     */

    _execFilter: function (methodName, value, args) {
      var self = this;

      if (!self._filters.isEmptyObject && self._filters.hasOwnProperty(methodName)) {
        for (var key in self._filters[methodName]) {
          return self._filters[methodName][key].call(self, args);
        }
      } else {
        return value;
      }
    },

/* Helpers
        ---------------------------------------------------------------------- */

    _helpers: {

      /**
       * CamelCase
       * @since 2.0.0
       * @param {string}
       * @return {string}
       */

      _camelCase: function (string) {
        return string.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase();
        });
      },

      /**
       * Is Element
       * @since 2.1.3
       * @param {object} element to test
       * @return {boolean}
       */

      _isElement: function (el) {
        if (window.HTMLElement) {
          return el instanceof HTMLElement;
        } else {
          return (
          el !== null && el.nodeType === 1 && el.nodeName === 'string');
        }
      }
    },

/* Public Methods
        ---------------------------------------------------------------------- */

    /**
     * Is Mixing
     * @since 2.0.0
     * @return {boolean}
     */

    isMixing: function () {
      var self = this;

      return self._execFilter('isMixing', self._mixing);
    },

    /**
     * Filter (public)
     * @since 2.0.0
     * @param {array} arguments
     */

    filter: function () {
      var self = this,
          args = self._parseMultiMixArgs(arguments);

      self._clicking && (self._toggleString = '');

      self.multiMix({
        filter: args.command
      }, args.animate, args.callback);
    },

    /**
     * Sort (public)
     * @since 2.0.0
     * @param {array} arguments
     */

    sort: function () {
      var self = this,
          args = self._parseMultiMixArgs(arguments);

      self.multiMix({
        sort: args.command
      }, args.animate, args.callback);
    },

    /**
     * Change Layout (public)
     * @since 2.0.0
     * @param {array} arguments
     */

    changeLayout: function () {
      var self = this,
          args = self._parseMultiMixArgs(arguments);

      self.multiMix({
        changeLayout: args.command
      }, args.animate, args.callback);
    },

    /**
     * MultiMix
     * @since 2.0.0
     * @param {array} arguments
     */

    multiMix: function () {
      var self = this,
          args = self._parseMultiMixArgs(arguments);

      self._execAction('multiMix', 0, arguments);

      if (!self._mixing) {
        if (self.controls.enable && !self._clicking) {
          self.controls.toggleFilterButtons && self._buildToggleArray();
          self._updateControls(args.command, self.controls.toggleFilterButtons);
        }

        (self._queue.length < 2) && (self._clicking = false);

        delete self.callbacks._user;
        if (args.callback) self.callbacks._user = args.callback;

        var sort = args.command.sort,
            filter = args.command.filter,
            changeLayout = args.command.changeLayout;

        self._refresh();

        if (sort) {
          self._newSort = self._parseSort(sort);
          self._newSortString = sort;

          self._sorting = true;
          self._sort();
        }

        if (filter !== undf) {
          filter = (filter === 'all') ? self.selectors.target : filter;

          self._activeFilter = filter;
        }

        self._filter();

        if (changeLayout) {
          self._newDisplay = (typeof changeLayout === 'string') ? changeLayout : changeLayout.display || self.layout.display;
          self._newClass = changeLayout.containerClass || '';

          if (
          self._newDisplay !== self.layout.display || self._newClass !== self.layout.containerClass) {
            self._changingLayout = true;

            self._changingClass = (self._newClass !== self.layout.containerClass);
            self._changingDisplay = (self._newDisplay !== self.layout.display);
          }
        }

        self._$targets.css(self._brake);

        self._goMix(args.animate ^ self.animation.enable ? args.animate : self.animation.enable);

        self._execAction('multiMix', 1, arguments);

      } else {
        if (self.animation.queue && self._queue.length < self.animation.queueLimit) {
          self._queue.push(arguments);

          (self.controls.enable && !self._clicking) && self._updateControls(args.command);

          self._execAction('multiMixQueue', 1, arguments);

        } else {
          if (typeof self.callbacks.onMixBusy === 'function') {
            self.callbacks.onMixBusy.call(self._domNode, self._state, self);
          }
          self._$container.trigger('mixBusy', [self._state, self]);

          self._execAction('multiMixBusy', 1, arguments);
        }
      }
    },

    /**
     * Insert
     * @since 2.0.0
     * @param {array} arguments
     */

    insert: function () {
      var self = this,
          args = self._parseInsertArgs(arguments),
          callback = (typeof args.callback === 'function') ? args.callback : null,
          frag = document.createDocumentFragment(),
          target = (function () {
          self._refresh();

          if (self._$targets.length) {
            return (args.index < self._$targets.length || !self._$targets.length) ? self._$targets[args.index] : self._$targets[self._$targets.length - 1].nextElementSibling;
          } else {
            return self._$parent[0].children[0];
          }
        })();

      self._execAction('insert', 0, arguments);

      if (args.$object) {
        for (var i = 0; i < args.$object.length; i++) {
          var el = args.$object[i];

          frag.appendChild(el);
          frag.appendChild(document.createTextNode(' '));
        }

        self._$parent[0].insertBefore(frag, target);
      }

      self._execAction('insert', 1, arguments);

      if (typeof args.multiMix === 'object') {
        self.multiMix(args.multiMix, callback);
      }
    },

    /**
     * Prepend
     * @since 2.0.0
     * @param {array} arguments
     */

    prepend: function () {
      var self = this,
          args = self._parseInsertArgs(arguments);

      self.insert(0, args.$object, args.multiMix, args.callback);
    },

    /**
     * Append
     * @since 2.0.0
     * @param {array} arguments
     */

    append: function () {
      var self = this,
          args = self._parseInsertArgs(arguments);

      self.insert(self._state.totalTargets, args.$object, args.multiMix, args.callback);
    },

    /**
     * Get Option
     * @since 2.0.0
     * @param {string} string
     * @return {mixed} value
     */

    getOption: function (string) {
      var self = this,
          getProperty = function (obj, prop) {
          var parts = prop.split('.'),
              last = parts.pop(),
              l = parts.length,
              i = 1,
              current = parts[0] || prop;

          while ((obj = obj[current]) && i < l) {
            current = parts[i];
            i++;
          }

          if (obj !== undf) {
            return obj[last] !== undf ? obj[last] : obj;
          }
          };

      return string ? self._execFilter('getOption', getProperty(self, string), arguments) : self;
    },

    /**
     * Set Options
     * @since 2.0.0
     * @param {object} config
     */

    setOptions: function (config) {
      var self = this;

      self._execAction('setOptions', 0, arguments);

      typeof config === 'object' && $.extend(true, self, config);

      self._execAction('setOptions', 1, arguments);
    },

    /**
     * Get State
     * @since 2.0.0
     * @return {object} state
     */

    getState: function () {
      var self = this;

      return self._execFilter('getState', self._state, self);
    },

    /**
     * Force Refresh
     * @since 2.1.2
     */

    forceRefresh: function () {
      var self = this;

      self._refresh(false, true);
    },

    /**
     * Destroy
     * @since 2.0.0
     * @param {boolean} hideAll
     */

    destroy: function (hideAll) {
      var self = this,
          filters = $.MixItUp.prototype._bound._filter,
          sorts = $.MixItUp.prototype._bound._sort;

      self._execAction('destroy', 0, arguments);

      self._$body.add($(self.selectors.sort)).add($(self.selectors.filter)).off('.mixItUp');

      for (var i = 0; i < self._$targets.length; i++) {
        var target = self._$targets[i];

        hideAll && (target.style.display = '');

        delete target.mixParent;
      }

      self._execAction('destroy', 1, arguments);

      if (filters[self.selectors.filter] && filters[self.selectors.filter] > 1) {
        filters[self.selectors.filter]--;
      } else if (filters[self.selectors.filter] === 1) {
        delete filters[self.selectors.filter];
      }

      if (sorts[self.selectors.sort] && sorts[self.selectors.sort] > 1) {
        sorts[self.selectors.sort]--;
      } else if (sorts[self.selectors.sort] === 1) {
        delete sorts[self.selectors.sort];
      }

      delete $.MixItUp.prototype._instances[self._id];
    }

  };

/* jQuery Methods
    ---------------------------------------------------------------------- */

  /**
   * jQuery .mixItUp() method
   * @since 2.0.0
   * @extends $.fn
   */

  $.fn.mixItUp = function () {
    var args = arguments,
        dataReturn = [],
        eachReturn, _instantiate = function (domNode, settings) {
        var instance = new $.MixItUp(),
            rand = function () {
            return ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase();
            };

        instance._execAction('_instantiate', 0, arguments);

        domNode.id = !domNode.id ? 'MixItUp' + rand() : domNode.id;

        if (!instance._instances[domNode.id]) {
          instance._instances[domNode.id] = instance;
          instance._init(domNode, settings);
        }

        instance._execAction('_instantiate', 1, arguments);
        };

    eachReturn = this.each(function () {
      if (args && typeof args[0] === 'string') {
        var instance = $.MixItUp.prototype._instances[this.id];
        if (args[0] === 'isLoaded') {
          dataReturn.push(instance ? true : false);
        } else {
          var data = instance[args[0]](args[1], args[2], args[3]);
          if (data !== undf) dataReturn.push(data);
        }
      } else {
        _instantiate(this, args[0]);
      }
    });

    if (dataReturn.length) {
      return dataReturn.length > 1 ? dataReturn : dataReturn[0];
    } else {
      return eachReturn;
    }
  };

  /**
   * jQuery .removeStyle() method
   * @since 2.0.0
   * @extends $.fn
   */

  $.fn.removeStyle = function (style, prefix) {
    prefix = prefix ? prefix : '';

    return this.each(function () {
      var el = this,
          styles = style.split(' ');

      for (var i = 0; i < styles.length; i++) {
        for (var j = 0; j < 4; j++) {
          switch (j) {
          case 0:
            var prop = styles[i];
            break;
          case 1:
            var prop = $.MixItUp.prototype._helpers._camelCase(prop);
            break;
          case 2:
            var prop = prefix + styles[i];
            break;
          case 3:
            var prop = $.MixItUp.prototype._helpers._camelCase(prefix + styles[i]);
          }

          if (
          el.style[prop] !== undf && typeof el.style[prop] !== 'unknown' && el.style[prop].length > 0) {
            el.style[prop] = '';
          }

          if (!prefix && j === 1) break;
        }
      }

      if (el.attributes && el.attributes.style && el.attributes.style !== undf && el.attributes.style.value === '') {
        el.attributes.removeNamedItem('style');
      }
    });
  };

})(jQuery);
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-flexbox-flexboxlegacy-shiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;
window.Modernizr = function (a, b, c) {
  function z(a) {
    j.cssText = a
  }
  function A(a, b) {
    return z(m.join(a + ";") + (b || ""))
  }
  function B(a, b) {
    return typeof a === b
  }
  function C(a, b) {
    return !!~ ("" + a).indexOf(b)
  }
  function D(a, b) {
    for (var d in a) {
      var e = a[d];
      if (!C(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
    }
    return !1
  }
  function E(a, b, d) {
    for (var e in a) {
      var f = b[a[e]];
      if (f !== c) return d === !1 ? a[e] : B(f, "function") ? f.bind(d || b) : f
    }
    return !1
  }
  function F(a, b, c) {
    var d = a.charAt(0).toUpperCase() + a.slice(1),
        e = (a + " " + o.join(d + " ") + d).split(" ");
    return B(b, "string") || B(b, "undefined") ? D(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), E(e, b, c))
  }
  var d = "2.8.3",
      e = {},
      f = !0,
      g = b.documentElement,
      h = "modernizr",
      i = b.createElement(h),
      j = i.style,
      k, l = {}.toString,
      m = " -webkit- -moz- -o- -ms- ".split(" "),
      n = "Webkit Moz O ms",
      o = n.split(" "),
      p = n.toLowerCase().split(" "),
      q = {},
      r = {},
      s = {},
      t = [],
      u = t.slice,
      v, w = function (a, c, d, e) {
      var f, i, j, k, l = b.createElement("div"),
          m = b.body,
          n = m || b.createElement("body");
      if (parseInt(d, 10)) while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
      return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !! i
      },
      x = {}.hasOwnProperty,
      y;
  !B(x, "undefined") && !B(x.call, "undefined") ? y = function (a, b) {
    return x.call(a, b)
  } : y = function (a, b) {
    return b in a && B(a.constructor.prototype[b], "undefined")
  }, Function.prototype.bind || (Function.prototype.bind = function (b) {
    var c = this;
    if (typeof c != "function") throw new TypeError;
    var d = u.call(arguments, 1),
        e = function () {
        if (this instanceof e) {
          var a = function () {};
          a.prototype = c.prototype;
          var f = new a,
              g = c.apply(f, d.concat(u.call(arguments)));
          return Object(g) === g ? g : f
        }
        return c.apply(b, d.concat(u.call(arguments)))
        };
    return e
  }), q.flexbox = function () {
    return F("flexWrap")
  }, q.flexboxlegacy = function () {
    return F("boxDirection")
  };
  for (var G in q) y(q, G) && (v = G.toLowerCase(), e[v] = q[G](), t.push((e[v] ? "" : "no-") + v));
  return e.addTest = function (a, b) {
    if (typeof a == "object") for (var d in a) y(a, d) && e.addTest(d, a[d]);
    else {
      a = a.toLowerCase();
      if (e[a] !== c) return e;
      b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
    }
    return e
  }, z(""), i = k = null, function (a, b) {
    function l(a, b) {
      var c = a.createElement("p"),
          d = a.getElementsByTagName("head")[0] || a.documentElement;
      return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
    }
    function m() {
      var a = s.elements;
      return typeof a == "string" ? a.split(" ") : a
    }
    function n(a) {
      var b = j[a[h]];
      return b || (b = {}, i++, a[h] = i, j[i] = b), b
    }
    function o(a, c, d) {
      c || (c = b);
      if (k) return c.createElement(a);
      d || (d = n(c));
      var g;
      return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g
    }
    function p(a, c) {
      a || (a = b);
      if (k) return a.createDocumentFragment();
      c = c || n(a);
      var d = c.frag.cloneNode(),
          e = 0,
          f = m(),
          g = f.length;
      for (; e < g; e++) d.createElement(f[e]);
      return d
    }
    function q(a, b) {
      b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) {
        return s.shivMethods ? o(c, a, b) : b.createElem(c)
      }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function (a) {
        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
      }) + ");return n}")(s, b.frag)
    }
    function r(a) {
      a || (a = b);
      var c = n(a);
      return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !! l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a
    }
    var c = "3.7.0",
        d = a.html5 || {},
        e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        g, h = "_html5shiv",
        i = 0,
        j = {},
        k;
    (function () {
      try {
        var a = b.createElement("a");
        a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 ||
        function () {
          b.createElement("a");
          var a = b.createDocumentFragment();
          return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
        }()
      } catch (c) {
        g = !0, k = !0
      }
    })();
    var s = {
      elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
      version: c,
      shivCSS: d.shivCSS !== !1,
      supportsUnknownElements: k,
      shivMethods: d.shivMethods !== !1,
      type: "default",
      shivDocument: r,
      createElement: o,
      createDocumentFragment: p
    };
    a.html5 = s, r(b)
  }(this, b), e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, e.testProp = function (a) {
    return D([a])
  }, e.testAllProps = F, e.testStyles = w, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + t.join(" ") : ""), e
}(this, this.document), function (a, b, c) {
  function d(a) {
    return "[object Function]" == o.call(a)
  }
  function e(a) {
    return "string" == typeof a
  }
  function f() {}
  function g(a) {
    return !a || "loaded" == a || "complete" == a || "uninitialized" == a
  }
  function h() {
    var a = p.shift();
    q = 1, a ? a.t ? m(function () {
      ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
    }, 0) : (a(), h()) : q = 0
  }
  function i(a, c, d, e, f, i, j) {
    function k(b) {
      if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
        "img" != a && m(function () {
          t.removeChild(l)
        }, 50);
        for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
      }
    }
    var j = j || B.errorTimeout,
        l = b.createElement(a),
        o = 0,
        r = 0,
        u = {
        t: d,
        s: c,
        e: f,
        a: i,
        x: j
        };
    1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
      k.call(this, r)
    }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
  }
  function j(a, b, c, d, f) {
    return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
  }
  function k() {
    var a = B;
    return a.loader = {
      load: j,
      i: 0
    }, a
  }
  var l = b.documentElement,
      m = a.setTimeout,
      n = b.getElementsByTagName("script")[0],
      o = {}.toString,
      p = [],
      q = 0,
      r = "MozAppearance" in l.style,
      s = r && !! b.createRange().compareNode,
      t = s ? l : n.parentNode,
      l = a.opera && "[object Opera]" == o.call(a.opera),
      l = !! b.attachEvent && !l,
      u = r ? "object" : l ? "script" : "img",
      v = l ? "script" : u,
      w = Array.isArray ||
      function (a) {
      return "[object Array]" == o.call(a)
      },
      x = [],
      y = {},
      z = {
      timeout: function (a, b) {
        return b.length && (a.timeout = b[0]), a
      }
      },
      A, B;
  B = function (a) {
    function b(a) {
      var a = a.split("!"),
          b = x.length,
          c = a.pop(),
          d = a.length,
          c = {
          url: c,
          origUrl: c,
          prefixes: a
          },
          e, f, g;
      for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
      for (f = 0; f < b; f++) c = x[f](c);
      return c
    }
    function g(a, e, f, g, h) {
      var i = b(a),
          j = i.autoCallback;
      i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
        k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
      })))
    }
    function h(a, b) {
      function c(a, c) {
        if (a) {
          if (e(a)) c || (j = function () {
            var a = [].slice.call(arguments);
            k.apply(this, a), l()
          }), g(a, j, b, 0, h);
          else if (Object(a) === a) for (n in m = function () {
            var b = 0,
                c;
            for (c in a) a.hasOwnProperty(c) && b++;
            return b
          }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () {
            var a = [].slice.call(arguments);
            k.apply(this, a), l()
          } : j[n] = function (a) {
            return function () {
              var b = [].slice.call(arguments);
              a && a.apply(this, b), l()
            }
          }(k[n])), g(a[n], j, b, n, h))
        } else!c && l()
      }
      var h = !! a.test,
          i = a.load || a.both,
          j = a.callback || f,
          k = j,
          l = a.complete || f,
          m, n;
      c(h ? a.yep : a.nope, !! i), i && c(i)
    }
    var i, j, l = this.yepnope.loader;
    if (e(a)) g(a, 0, l, 0);
    else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
    else Object(a) === a && h(a, l)
  }, B.addPrefix = function (a, b) {
    z[a] = b
  }, B.addFilter = function (a) {
    x.push(a)
  }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () {
    b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
  }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
    var k = b.createElement("script"),
        l, o, e = e || B.errorTimeout;
    k.src = a;
    for (o in d) k.setAttribute(o, d[o]);
    c = j ? h : c || f, k.onreadystatechange = k.onload = function () {
      !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
    }, m(function () {
      l || (l = 1, c(1))
    }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
  }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
    var e = b.createElement("link"),
        j, c = i ? h : c || f;
    e.href = a, e.rel = "stylesheet", e.type = "text/css";
    for (j in d) e.setAttribute(j, d[j]);
    g || (n.parentNode.insertBefore(e, n), m(c, 0))
  }
}(this, document), Modernizr.load = function () {
  yepnope.apply(window, [].slice.call(arguments, 0))
}; /* --- ORGANIC TABS --- */

// --- MODIFIED
// https://github.com/CSS-Tricks/jQuery-Organic-Tabs
(function ($) {

  $.organicTabs = function (el, options) {
    var base = this;
    base.$el = $(el);
    base.$nav = base.$el.find(".tabs__nav");
    base.init = function () {
      base.options = $.extend({}, $.organicTabs.defaultOptions, options);
      var $allListWrap = base.$el.find(".tabs__content"),
          curList = base.$el.find("a.current").attr("href").substring(1);
      $allListWrap.height(base.$el.find("#" + curList).height());
      base.$nav.find("li > a").click(function (event) {

        var curList = base.$el.find("a.current").attr("href").substring(1),
            $newList = $(this),
            listID = $newList.attr("href").substring(1);
        if ((listID != curList) && (base.$el.find(":animated").length == 0)) {
          base.$el.find("#" + curList).css({
            opacity: 0,
            "z-index": 10,
            "pointer-events": "none"
          });
          var newHeight = base.$el.find("#" + listID).height();
          $allListWrap.css({
            height: newHeight
          });
          setTimeout(function () {
            base.$el.find("#" + curList);
            base.$el.find("#" + listID).css({
              opacity: 1,
              "z-index": 100,
              "pointer-events": "auto"
            });
            base.$el.find(".tabs__nav li a").removeClass("current");
            $newList.addClass("current");
          }, 250);
        }
        event.preventDefault();
      });
    };
    base.init();
  };
  $.organicTabs.defaultOptions = {
    speed: 300
  };
  $.fn.organicTabs = function (options) {
    return this.each(function () {
      (new $.organicTabs(this, options));
    });
  };

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

// Snap.svg 0.4.1
//
// Copyright (c) 2013 – 2015 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// build: 2015-04-13
// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ┌────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.4.2 - JavaScript Events Library                      │ \\
// ├────────────────────────────────────────────────────────────┤ \\
// │ Author Dmitry Baranovskiy (http://dmitry.baranovskiy.com/) │ \\
// └────────────────────────────────────────────────────────────┘ \\
(function (glob) {
  var version = "0.4.2",
      has = "hasOwnProperty",
      separator = /[\.\/]/,
      comaseparator = /\s*,\s*/,
      wildcard = "*",
      fun = function () {},
      numsort = function (a, b) {
      return a - b;
      },
      current_event, stop, events = {
      n: {}
      },
      firstDefined = function () {
      for (var i = 0, ii = this.length; i < ii; i++) {
        if (typeof this[i] != "undefined") {
          return this[i];
        }
      }
      },
      lastDefined = function () {
      var i = this.length;
      while (--i) {
        if (typeof this[i] != "undefined") {
          return this[i];
        }
      }
      },
      
      /*\
     * eve
     [ method ]

     * Fires event with given `name`, given scope and other parameters.

     > Arguments

     - name (string) name of the *event*, dot (`.`) or slash (`/`) separated
     - scope (object) context for the event handlers
     - varargs (...) the rest of arguments will be sent to event handlers

     = (object) array of returned values from the listeners. Array has two methods `.firstDefined()` and `.lastDefined()` to get first or last not `undefined` value.
    \*/
      
      eve = function (name, scope) {
      name = String(name);
      var e = events,
          oldstop = stop,
          args = Array.prototype.slice.call(arguments, 2),
          listeners = eve.listeners(name),
          z = 0,
          f = false,
          l, indexed = [],
          queue = {},
          out = [],
          ce = current_event,
          errors = [];
      out.firstDefined = firstDefined;
      out.lastDefined = lastDefined;
      current_event = name;
      stop = 0;
      for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
        indexed.push(listeners[i].zIndex);
        if (listeners[i].zIndex < 0) {
          queue[listeners[i].zIndex] = listeners[i];
        }
      }
      indexed.sort(numsort);
      while (indexed[z] < 0) {
        l = queue[indexed[z++]];
        out.push(l.apply(scope, args));
        if (stop) {
          stop = oldstop;
          return out;
        }
      }
      for (i = 0; i < ii; i++) {
        l = listeners[i];
        if ("zIndex" in l) {
          if (l.zIndex == indexed[z]) {
            out.push(l.apply(scope, args));
            if (stop) {
              break;
            }
            do {
              z++;
              l = queue[indexed[z]];
              l && out.push(l.apply(scope, args));
              if (stop) {
                break;
              }
            } while (l)
          } else {
            queue[l.zIndex] = l;
          }
        } else {
          out.push(l.apply(scope, args));
          if (stop) {
            break;
          }
        }
      }
      stop = oldstop;
      current_event = ce;
      return out;
      };
  // Undocumented. Debug only.
  eve._events = events;
/*\
     * eve.listeners
     [ method ]

     * Internal method which gives you array of all event handlers that will be triggered by the given `name`.

     > Arguments

     - name (string) name of the event, dot (`.`) or slash (`/`) separated

     = (array) array of event handlers
    \*/
  eve.listeners = function (name) {
    var names = name.split(separator),
        e = events,
        item, items, k, i, ii, j, jj, nes, es = [e],
        out = [];
    for (i = 0, ii = names.length; i < ii; i++) {
      nes = [];
      for (j = 0, jj = es.length; j < jj; j++) {
        e = es[j].n;
        items = [e[names[i]], e[wildcard]];
        k = 2;
        while (k--) {
          item = items[k];
          if (item) {
            nes.push(item);
            out = out.concat(item.f || []);
          }
        }
      }
      es = nes;
    }
    return out;
  };

/*\
     * eve.on
     [ method ]
     **
     * Binds given event handler with a given name. You can use wildcards “`*`” for the names:
     | eve.on("*.under.*", f);
     | eve("mouse.under.floor"); // triggers f
     * Use @eve to trigger the listener.
     **
     > Arguments
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     = (function) returned function accepts a single numeric parameter that represents z-index of the handler. It is an optional feature and only used when you need to ensure that some subset of handlers will be invoked in a given order, despite of the order of assignment.
     > Example:
     | eve.on("mouse", eatIt)(2);
     | eve.on("mouse", scream);
     | eve.on("mouse", catchIt)(1);
     * This will ensure that `catchIt` function will be called before `eatIt`.
     *
     * If you want to put your handler before non-indexed handlers, specify a negative value.
     * Note: I assume most of the time you don’t need to worry about z-index, but it’s nice to have this feature “just in case”.
    \*/
  eve.on = function (name, f) {
    name = String(name);
    if (typeof f != "function") {
      return function () {};
    }
    var names = name.split(comaseparator);
    for (var i = 0, ii = names.length; i < ii; i++) {
      (function (name) {
        var names = name.split(separator),
            e = events,
            exist;
        for (var i = 0, ii = names.length; i < ii; i++) {
          e = e.n;
          e = e.hasOwnProperty(names[i]) && e[names[i]] || (e[names[i]] = {
            n: {}
          });
        }
        e.f = e.f || [];
        for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
          exist = true;
          break;
        }!exist && e.f.push(f);
      }(names[i]));
    }
    return function (zIndex) {
      if (+zIndex == +zIndex) {
        f.zIndex = +zIndex;
      }
    };
  };
/*\
     * eve.f
     [ method ]
     **
     * Returns function that will fire given event with optional arguments.
     * Arguments that will be passed to the result function will be also
     * concated to the list of final arguments.
     | el.onclick = eve.f("click", 1, 2);
     | eve.on("click", function (a, b, c) {
     |     console.log(a, b, c); // 1, 2, [event object]
     | });
     > Arguments
     - event (string) event name
     - varargs (…) and any other arguments
     = (function) possible event handler function
    \*/
  eve.f = function (event) {
    var attrs = [].slice.call(arguments, 1);
    return function () {
      eve.apply(null, [event, null].concat(attrs).concat([].slice.call(arguments, 0)));
    };
  };
/*\
     * eve.stop
     [ method ]
     **
     * Is used inside an event handler to stop the event, preventing any subsequent listeners from firing.
    \*/
  eve.stop = function () {
    stop = 1;
  };
/*\
     * eve.nt
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     > Arguments
     **
     - subname (string) #optional subname of the event
     **
     = (string) name of the event, if `subname` is not specified
     * or
     = (boolean) `true`, if current event’s name contains `subname`
    \*/
  eve.nt = function (subname) {
    if (subname) {
      return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(current_event);
    }
    return current_event;
  };
/*\
     * eve.nts
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     **
     = (array) names of the event
    \*/
  eve.nts = function () {
    return current_event.split(separator);
  };
/*\
     * eve.off
     [ method ]
     **
     * Removes given function from the list of event listeners assigned to given name.
     * If no arguments specified all the events will be cleared.
     **
     > Arguments
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
    \*/
/*\
     * eve.unbind
     [ method ]
     **
     * See @eve.off
    \*/
  eve.off = eve.unbind = function (name, f) {
    if (!name) {
      eve._events = events = {
        n: {}
      };
      return;
    }
    var names = name.split(comaseparator);
    if (names.length > 1) {
      for (var i = 0, ii = names.length; i < ii; i++) {
        eve.off(names[i], f);
      }
      return;
    }
    names = name.split(separator);
    var e, key, splice, i, ii, j, jj, cur = [events];
    for (i = 0, ii = names.length; i < ii; i++) {
      for (j = 0; j < cur.length; j += splice.length - 2) {
        splice = [j, 1];
        e = cur[j].n;
        if (names[i] != wildcard) {
          if (e[names[i]]) {
            splice.push(e[names[i]]);
          }
        } else {
          for (key in e) if (e[has](key)) {
            splice.push(e[key]);
          }
        }
        cur.splice.apply(cur, splice);
      }
    }
    for (i = 0, ii = cur.length; i < ii; i++) {
      e = cur[i];
      while (e.n) {
        if (f) {
          if (e.f) {
            for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
              e.f.splice(j, 1);
              break;
            }!e.f.length && delete e.f;
          }
          for (key in e.n) if (e.n[has](key) && e.n[key].f) {
            var funcs = e.n[key].f;
            for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
              funcs.splice(j, 1);
              break;
            }!funcs.length && delete e.n[key].f;
          }
        } else {
          delete e.f;
          for (key in e.n) if (e.n[has](key) && e.n[key].f) {
            delete e.n[key].f;
          }
        }
        e = e.n;
      }
    }
  };
/*\
     * eve.once
     [ method ]
     **
     * Binds given event handler with a given name to only run once then unbind itself.
     | eve.once("login", f);
     | eve("login"); // triggers f
     | eve("login"); // no listeners
     * Use @eve to trigger the listener.
     **
     > Arguments
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     = (function) same return function as @eve.on
    \*/
  eve.once = function (name, f) {
    var f2 = function () {
      eve.unbind(name, f2);
      return f.apply(this, arguments);
    };
    return eve.on(name, f2);
  };
/*\
     * eve.version
     [ property (string) ]
     **
     * Current version of the library.
    \*/
  eve.version = version;
  eve.toString = function () {
    return "You are running Eve " + version;
  };
  (typeof module != "undefined" && module.exports) ? (module.exports = eve) : (typeof define === "function" && define.amd ? (define("eve", [], function () {
    return eve;
  })) : (glob.eve = eve));
})(this);

(function (glob, factory) {
  // AMD support
  if (typeof define == "function" && define.amd) {
    // Define as an anonymous module
    define(["eve"], function (eve) {
      return factory(glob, eve);
    });
  } else if (typeof exports != 'undefined') {
    // Next for Node.js or CommonJS
    var eve = require('eve');
    module.exports = factory(glob, eve);
  } else {
    // Browser globals (glob is window)
    // Snap adds itself to window
    factory(glob, glob.eve);
  }
}(window || this, function (window, eve) {

  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  var mina = (function (eve) {
    var animations = {},
        requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
        setTimeout(callback, 16);
        },
        isArray = Array.isArray ||
        function (a) {
        return a instanceof Array || Object.prototype.toString.call(a) == "[object Array]";
        },
        idgen = 0,
        idprefix = "M" + (+new Date).toString(36),
        ID = function () {
        return idprefix + (idgen++).toString(36);
        },
        diff = function (a, b, A, B) {
        if (isArray(a)) {
          res = [];
          for (var i = 0, ii = a.length; i < ii; i++) {
            res[i] = diff(a[i], b, A[i], B);
          }
          return res;
        }
        var dif = (A - a) / (B - b);
        return function (bb) {
          return a + dif * (bb - b);
        };
        },
        timer = Date.now ||
        function () {
        return +new Date;
        },
        sta = function (val) {
        var a = this;
        if (val == null) {
          return a.s;
        }
        var ds = a.s - val;
        a.b += a.dur * ds;
        a.B += a.dur * ds;
        a.s = val;
        },
        speed = function (val) {
        var a = this;
        if (val == null) {
          return a.spd;
        }
        a.spd = val;
        },
        duration = function (val) {
        var a = this;
        if (val == null) {
          return a.dur;
        }
        a.s = a.s * val / a.dur;
        a.dur = val;
        },
        stopit = function () {
        var a = this;
        delete animations[a.id];
        a.update();
        eve("mina.stop." + a.id, a);
        },
        pause = function () {
        var a = this;
        if (a.pdif) {
          return;
        }
        delete animations[a.id];
        a.update();
        a.pdif = a.get() - a.b;
        },
        resume = function () {
        var a = this;
        if (!a.pdif) {
          return;
        }
        a.b = a.get() - a.pdif;
        delete a.pdif;
        animations[a.id] = a;
        },
        update = function () {
        var a = this,
            res;
        if (isArray(a.start)) {
          res = [];
          for (var j = 0, jj = a.start.length; j < jj; j++) {
            res[j] = +a.start[j] + (a.end[j] - a.start[j]) * a.easing(a.s);
          }
        } else {
          res = +a.start + (a.end - a.start) * a.easing(a.s);
        }
        a.set(res);
        },
        frame = function () {
        var len = 0;
        for (var i in animations) if (animations.hasOwnProperty(i)) {
          var a = animations[i],
              b = a.get(),
              res;
          len++;
          a.s = (b - a.b) / (a.dur / a.spd);
          if (a.s >= 1) {
            delete animations[i];
            a.s = 1;
            len--;
            (function (a) {
              setTimeout(function () {
                eve("mina.finish." + a.id, a);
              });
            }(a));
          }
          a.update();
        }
        len && requestAnimFrame(frame);
        },
        
        /*\
     * mina
     [ method ]
     **
     * Generic animation of numbers
     **
     - a (number) start _slave_ number
     - A (number) end _slave_ number
     - b (number) start _master_ number (start time in general case)
     - B (number) end _master_ number (end time in gereal case)
     - get (function) getter of _master_ number (see @mina.time)
     - set (function) setter of _slave_ number
     - easing (function) #optional easing function, default is @mina.linear
     = (object) animation descriptor
     o {
     o         id (string) animation id,
     o         start (number) start _slave_ number,
     o         end (number) end _slave_ number,
     o         b (number) start _master_ number,
     o         s (number) animation status (0..1),
     o         dur (number) animation duration,
     o         spd (number) animation speed,
     o         get (function) getter of _master_ number (see @mina.time),
     o         set (function) setter of _slave_ number,
     o         easing (function) easing function, default is @mina.linear,
     o         status (function) status getter/setter,
     o         speed (function) speed getter/setter,
     o         duration (function) duration getter/setter,
     o         stop (function) animation stopper
     o         pause (function) pauses the animation
     o         resume (function) resumes the animation
     o         update (function) calles setter with the right value of the animation
     o }
    \*/
        
        mina = function (a, A, b, B, get, set, easing) {
        var anim = {
          id: ID(),
          start: a,
          end: A,
          b: b,
          s: 0,
          dur: B - b,
          spd: 1,
          get: get,
          set: set,
          easing: easing || mina.linear,
          status: sta,
          speed: speed,
          duration: duration,
          stop: stopit,
          pause: pause,
          resume: resume,
          update: update
        };
        animations[anim.id] = anim;
        var len = 0,
            i;
        for (i in animations) if (animations.hasOwnProperty(i)) {
          len++;
          if (len == 2) {
            break;
          }
        }
        len == 1 && requestAnimFrame(frame);
        return anim;
        };
/*\
     * mina.time
     [ method ]
     **
     * Returns the current time. Equivalent to:
     | function () {
     |     return (new Date).getTime();
     | }
    \*/
    mina.time = timer;
/*\
     * mina.getById
     [ method ]
     **
     * Returns an animation by its id
     - id (string) animation's id
     = (object) See @mina
    \*/
    mina.getById = function (id) {
      return animations[id] || null;
    };

/*\
     * mina.linear
     [ method ]
     **
     * Default linear easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
    mina.linear = function (n) {
      return n;
    };
/*\
     * mina.easeout
     [ method ]
     **
     * Easeout easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
    mina.easeout = function (n) {
      return Math.pow(n, 1.7);
    };
/*\
     * mina.easein
     [ method ]
     **
     * Easein easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
    mina.easein = function (n) {
      return Math.pow(n, .48);
    };
/*\
     * mina.easeinout
     [ method ]
     **
     * Easeinout easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
    mina.easeinout = function (n) {
      if (n == 1) {
        return 1;
      }
      if (n == 0) {
        return 0;
      }
      var q = .48 - n / 1.04,
          Q = Math.sqrt(.1734 + q * q),
          x = Q - q,
          X = Math.pow(Math.abs(x), 1 / 3) * (x < 0 ? -1 : 1),
          y = -Q - q,
          Y = Math.pow(Math.abs(y), 1 / 3) * (y < 0 ? -1 : 1),
          t = X + Y + .5;
      return (1 - t) * 3 * t * t + t * t * t;
    };
/*\
     * mina.backin
     [ method ]
     **
     * Backin easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
    mina.backin = function (n) {
      if (n == 1) {
        return 1;
      }
      var s = 1.70158;
      return n * n * ((s + 1) * n - s);
    };
/*\
     * mina.backout
     [ method ]
     **
     * Backout easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
    mina.backout = function (n) {
      if (n == 0) {
        return 0;
      }
      n = n - 1;
      var s = 1.70158;
      return n * n * ((s + 1) * n + s) + 1;
    };
/*\
     * mina.elastic
     [ method ]
     **
     * Elastic easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
    mina.elastic = function (n) {
      if (n == !! n) {
        return n;
      }
      return Math.pow(2, -10 * n) * Math.sin((n - .075) * (2 * Math.PI) / .3) + 1;
    };
/*\
     * mina.bounce
     [ method ]
     **
     * Bounce easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
    mina.bounce = function (n) {
      var s = 7.5625,
          p = 2.75,
          l;
      if (n < (1 / p)) {
        l = s * n * n;
      } else {
        if (n < (2 / p)) {
          n -= (1.5 / p);
          l = s * n * n + .75;
        } else {
          if (n < (2.5 / p)) {
            n -= (2.25 / p);
            l = s * n * n + .9375;
          } else {
            n -= (2.625 / p);
            l = s * n * n + .984375;
          }
        }
      }
      return l;
    };
    window.mina = mina;
    return mina;
  })(typeof eve == "undefined" ?
  function () {} : eve);
  // Copyright (c) 2013 - 2015 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  var Snap = (function (root) {
    Snap.version = "0.4.0";
/*\
 * Snap
 [ method ]
 **
 * Creates a drawing surface or wraps existing SVG element.
 **
 - width (number|string) width of surface
 - height (number|string) height of surface
 * or
 - DOM (SVGElement) element to be wrapped into Snap structure
 * or
 - array (array) array of elements (will return set of elements)
 * or
 - query (string) CSS query selector
 = (object) @Element
\*/

    function Snap(w, h) {
      if (w) {
        if (w.nodeType) {
          return wrap(w);
        }
        if (is(w, "array") && Snap.set) {
          return Snap.set.apply(Snap, w);
        }
        if (w instanceof Element) {
          return w;
        }
        if (h == null) {
          w = glob.doc.querySelector(String(w));
          return wrap(w);
        }
      }
      w = w == null ? "100%" : w;
      h = h == null ? "100%" : h;
      return new Paper(w, h);
    }
    Snap.toString = function () {
      return "Snap v" + this.version;
    };
    Snap._ = {};
    var glob = {
      win: root.window,
      doc: root.window.document
    };
    Snap._.glob = glob;
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        toInt = parseInt,
        math = Math,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        pow = math.pow,
        PI = math.PI,
        round = math.round,
        E = "",
        S = " ",
        objectToString = Object.prototype.toString,
        ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
        bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        reURLValue = /^url\(#?([^)]+)\)$/,
        separator = Snap._.separator = /[,\s]+/,
        whitespace = /[\s]/g,
        commaSpaces = /[\s]*,[\s]*/,
        hsrg = {
        hs: 1,
        rg: 1
        },
        pathCommand = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/ig,
        tCommand = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/ig,
        pathValues = /(-?\d*\.?\d*(?:e[\-+]?\\d+)?)[\s]*,?[\s]*/ig,
        idgen = 0,
        idprefix = "S" + (+new Date).toString(36),
        ID = function (el) {
        return (el && el.type ? el.type : E) + idprefix + (idgen++).toString(36);
        },
        xlink = "http://www.w3.org/1999/xlink",
        xmlns = "http://www.w3.org/2000/svg",
        hub = {},
        URL = Snap.url = function (url) {
        return "url('#" + url + "')";
        };

    function $(el, attr) {
      if (attr) {
        if (el == "#text") {
          el = glob.doc.createTextNode(attr.text || attr["#text"] || "");
        }
        if (el == "#comment") {
          el = glob.doc.createComment(attr.text || attr["#text"] || "");
        }
        if (typeof el == "string") {
          el = $(el);
        }
        if (typeof attr == "string") {
          if (el.nodeType == 1) {
            if (attr.substring(0, 6) == "xlink:") {
              return el.getAttributeNS(xlink, attr.substring(6));
            }
            if (attr.substring(0, 4) == "xml:") {
              return el.getAttributeNS(xmlns, attr.substring(4));
            }
            return el.getAttribute(attr);
          } else if (attr == "text") {
            return el.nodeValue;
          } else {
            return null;
          }
        }
        if (el.nodeType == 1) {
          for (var key in attr) if (attr[has](key)) {
            var val = Str(attr[key]);
            if (val) {
              if (key.substring(0, 6) == "xlink:") {
                el.setAttributeNS(xlink, key.substring(6), val);
              } else if (key.substring(0, 4) == "xml:") {
                el.setAttributeNS(xmlns, key.substring(4), val);
              } else {
                el.setAttribute(key, val);
              }
            } else {
              el.removeAttribute(key);
            }
          }
        } else if ("text" in attr) {
          el.nodeValue = attr.text;
        }
      } else {
        el = glob.doc.createElementNS(xmlns, el);
      }
      return el;
    }
    Snap._.$ = $;
    Snap._.id = ID;

    function getAttrs(el) {
      var attrs = el.attributes,
          name, out = {};
      for (var i = 0; i < attrs.length; i++) {
        if (attrs[i].namespaceURI == xlink) {
          name = "xlink:";
        } else {
          name = "";
        }
        name += attrs[i].name;
        out[name] = attrs[i].textContent;
      }
      return out;
    }

    function is(o, type) {
      type = Str.prototype.toLowerCase.call(type);
      if (type == "finite") {
        return isFinite(o);
      }
      if (type == "array" && (o instanceof Array || Array.isArray && Array.isArray(o))) {
        return true;
      }
      return (type == "null" && o === null) || (type == typeof o && o !== null) || (type == "object" && o === Object(o)) || objectToString.call(o).slice(8, -1).toLowerCase() == type;
    }
/*\
 * Snap.format
 [ method ]
 **
 * Replaces construction of type `{<name>}` to the corresponding argument
 **
 - token (string) string to format
 - json (object) object which properties are used as a replacement
 = (string) formatted string
 > Usage
 | // this draws a rectangular shape equivalent to "M10,20h40v50h-40z"
 | paper.path(Snap.format("M{x},{y}h{dim.width}v{dim.height}h{dim['negative width']}z", {
 |     x: 10,
 |     y: 20,
 |     dim: {
 |         width: 40,
 |         height: 50,
 |         "negative width": -40
 |     }
 | }));
\*/
    Snap.format = (function () {
      var tokenRegex = /\{([^\}]+)\}/g,
          objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
           // matches .xxxxx or ["xxxxx"] to run over object properties
          replacer = function (all, key, obj) {
          var res = obj;
          key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
            name = name || quotedName;
            if (res) {
              if (name in res) {
                res = res[name];
              }
              typeof res == "function" && isFunc && (res = res());
            }
          });
          res = (res == null || res == obj ? all : res) + "";
          return res;
          };
      return function (str, obj) {
        return Str(str).replace(tokenRegex, function (all, key) {
          return replacer(all, key, obj);
        });
      };
    })();

    function clone(obj) {
      if (typeof obj == "function" || Object(obj) !== obj) {
        return obj;
      }
      var res = new obj.constructor;
      for (var key in obj) if (obj[has](key)) {
        res[key] = clone(obj[key]);
      }
      return res;
    }
    Snap._.clone = clone;

    function repush(array, item) {
      for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) {
        return array.push(array.splice(i, 1)[0]);
      }
    }

    function cacher(f, scope, postprocessor) {
      function newf() {
        var arg = Array.prototype.slice.call(arguments, 0),
            args = arg.join("\u2400"),
            cache = newf.cache = newf.cache || {},
            count = newf.count = newf.count || [];
        if (cache[has](args)) {
          repush(count, args);
          return postprocessor ? postprocessor(cache[args]) : cache[args];
        }
        count.length >= 1e3 && delete cache[count.shift()];
        count.push(args);
        cache[args] = f.apply(scope, arg);
        return postprocessor ? postprocessor(cache[args]) : cache[args];
      }
      return newf;
    }
    Snap._.cacher = cacher;

    function angle(x1, y1, x2, y2, x3, y3) {
      if (x3 == null) {
        var x = x1 - x2,
            y = y1 - y2;
        if (!x && !y) {
          return 0;
        }
        return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
      } else {
        return angle(x1, y1, x3, y3) - angle(x2, y2, x3, y3);
      }
    }

    function rad(deg) {
      return deg % 360 * PI / 180;
    }

    function deg(rad) {
      return rad * 180 / PI % 360;
    }

    function x_y() {
      return this.x + S + this.y;
    }

    function x_y_w_h() {
      return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
    }

/*\
 * Snap.rad
 [ method ]
 **
 * Transform angle to radians
 - deg (number) angle in degrees
 = (number) angle in radians
\*/
    Snap.rad = rad;
/*\
 * Snap.deg
 [ method ]
 **
 * Transform angle to degrees
 - rad (number) angle in radians
 = (number) angle in degrees
\*/
    Snap.deg = deg;
/*\
 * Snap.sin
 [ method ]
 **
 * Equivalent to `Math.sin()` only works with degrees, not radians.
 - angle (number) angle in degrees
 = (number) sin
\*/
    Snap.sin = function (angle) {
      return math.sin(Snap.rad(angle));
    };
/*\
 * Snap.tan
 [ method ]
 **
 * Equivalent to `Math.tan()` only works with degrees, not radians.
 - angle (number) angle in degrees
 = (number) tan
\*/
    Snap.tan = function (angle) {
      return math.tan(Snap.rad(angle));
    };
/*\
 * Snap.cos
 [ method ]
 **
 * Equivalent to `Math.cos()` only works with degrees, not radians.
 - angle (number) angle in degrees
 = (number) cos
\*/
    Snap.cos = function (angle) {
      return math.cos(Snap.rad(angle));
    };
/*\
 * Snap.asin
 [ method ]
 **
 * Equivalent to `Math.asin()` only works with degrees, not radians.
 - num (number) value
 = (number) asin in degrees
\*/
    Snap.asin = function (num) {
      return Snap.deg(math.asin(num));
    };
/*\
 * Snap.acos
 [ method ]
 **
 * Equivalent to `Math.acos()` only works with degrees, not radians.
 - num (number) value
 = (number) acos in degrees
\*/
    Snap.acos = function (num) {
      return Snap.deg(math.acos(num));
    };
/*\
 * Snap.atan
 [ method ]
 **
 * Equivalent to `Math.atan()` only works with degrees, not radians.
 - num (number) value
 = (number) atan in degrees
\*/
    Snap.atan = function (num) {
      return Snap.deg(math.atan(num));
    };
/*\
 * Snap.atan2
 [ method ]
 **
 * Equivalent to `Math.atan2()` only works with degrees, not radians.
 - num (number) value
 = (number) atan2 in degrees
\*/
    Snap.atan2 = function (num) {
      return Snap.deg(math.atan2(num));
    };
/*\
 * Snap.angle
 [ method ]
 **
 * Returns an angle between two or three points
 > Parameters
 - x1 (number) x coord of first point
 - y1 (number) y coord of first point
 - x2 (number) x coord of second point
 - y2 (number) y coord of second point
 - x3 (number) #optional x coord of third point
 - y3 (number) #optional y coord of third point
 = (number) angle in degrees
\*/
    Snap.angle = angle;
/*\
 * Snap.len
 [ method ]
 **
 * Returns distance between two points
 > Parameters
 - x1 (number) x coord of first point
 - y1 (number) y coord of first point
 - x2 (number) x coord of second point
 - y2 (number) y coord of second point
 = (number) distance
\*/
    Snap.len = function (x1, y1, x2, y2) {
      return Math.sqrt(Snap.len2(x1, y1, x2, y2));
    };
/*\
 * Snap.len2
 [ method ]
 **
 * Returns squared distance between two points
 > Parameters
 - x1 (number) x coord of first point
 - y1 (number) y coord of first point
 - x2 (number) x coord of second point
 - y2 (number) y coord of second point
 = (number) distance
\*/
    Snap.len2 = function (x1, y1, x2, y2) {
      return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    };
/*\
 * Snap.closestPoint
 [ method ]
 **
 * Returns closest point to a given one on a given path.
 > Parameters
 - path (Element) path element
 - x (number) x coord of a point
 - y (number) y coord of a point
 = (object) in format
 {
    x (number) x coord of the point on the path
    y (number) y coord of the point on the path
    length (number) length of the path to the point
    distance (number) distance from the given point to the path
 }
\*/
    // Copied from http://bl.ocks.org/mbostock/8027637
    Snap.closestPoint = function (path, x, y) {
      function distance2(p) {
        var dx = p.x - x,
            dy = p.y - y;
        return dx * dx + dy * dy;
      }
      var pathNode = path.node,
          pathLength = pathNode.getTotalLength(),
          precision = pathLength / pathNode.pathSegList.numberOfItems * .125,
          best, bestLength, bestDistance = Infinity;

      // linear scan for coarse approximation
      for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
        if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
          best = scan, bestLength = scanLength, bestDistance = scanDistance;
        }
      }

      // binary search for precise estimate
      precision *= .5;
      while (precision > .5) {
        var before, after, beforeLength, afterLength, beforeDistance, afterDistance;
        if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
          best = before, bestLength = beforeLength, bestDistance = beforeDistance;
        } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
          best = after, bestLength = afterLength, bestDistance = afterDistance;
        } else {
          precision *= .5;
        }
      }

      best = {
        x: best.x,
        y: best.y,
        length: bestLength,
        distance: Math.sqrt(bestDistance)
      };
      return best;
    }
/*\
 * Snap.is
 [ method ]
 **
 * Handy replacement for the `typeof` operator
 - o (…) any object or primitive
 - type (string) name of the type, e.g., `string`, `function`, `number`, etc.
 = (boolean) `true` if given value is of given type
\*/
    Snap.is = is;
/*\
 * Snap.snapTo
 [ method ]
 **
 * Snaps given value to given grid
 - values (array|number) given array of values or step of the grid
 - value (number) value to adjust
 - tolerance (number) #optional maximum distance to the target value that would trigger the snap. Default is `10`.
 = (number) adjusted value
\*/
    Snap.snapTo = function (values, value, tolerance) {
      tolerance = is(tolerance, "finite") ? tolerance : 10;
      if (is(values, "array")) {
        var i = values.length;
        while (i--) if (abs(values[i] - value) <= tolerance) {
          return values[i];
        }
      } else {
        values = +values;
        var rem = value % values;
        if (rem < tolerance) {
          return value - rem;
        }
        if (rem > values - tolerance) {
          return value - rem + values;
        }
      }
      return value;
    };
    // Colour
/*\
 * Snap.getRGB
 [ method ]
 **
 * Parses color string as RGB object
 - color (string) color string in one of the following formats:
 # <ul>
 #     <li>Color name (<code>red</code>, <code>green</code>, <code>cornflowerblue</code>, etc)</li>
 #     <li>#••• — shortened HTML color: (<code>#000</code>, <code>#fc0</code>, etc.)</li>
 #     <li>#•••••• — full length HTML color: (<code>#000000</code>, <code>#bd2300</code>)</li>
 #     <li>rgb(•••, •••, •••) — red, green and blue channels values: (<code>rgb(200,&nbsp;100,&nbsp;0)</code>)</li>
 #     <li>rgba(•••, •••, •••, •••) — also with opacity</li>
 #     <li>rgb(•••%, •••%, •••%) — same as above, but in %: (<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>)</li>
 #     <li>rgba(•••%, •••%, •••%, •••%) — also with opacity</li>
 #     <li>hsb(•••, •••, •••) — hue, saturation and brightness values: (<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>)</li>
 #     <li>hsba(•••, •••, •••, •••) — also with opacity</li>
 #     <li>hsb(•••%, •••%, •••%) — same as above, but in %</li>
 #     <li>hsba(•••%, •••%, •••%, •••%) — also with opacity</li>
 #     <li>hsl(•••, •••, •••) — hue, saturation and luminosity values: (<code>hsb(0.5,&nbsp;0.25,&nbsp;0.5)</code>)</li>
 #     <li>hsla(•••, •••, •••, •••) — also with opacity</li>
 #     <li>hsl(•••%, •••%, •••%) — same as above, but in %</li>
 #     <li>hsla(•••%, •••%, •••%, •••%) — also with opacity</li>
 # </ul>
 * Note that `%` can be used any time: `rgb(20%, 255, 50%)`.
 = (object) RGB object in the following format:
 o {
 o     r (number) red,
 o     g (number) green,
 o     b (number) blue,
 o     hex (string) color in HTML/CSS format: #••••••,
 o     error (boolean) true if string can't be parsed
 o }
\*/
    Snap.getRGB = cacher(function (colour) {
      if (!colour || !! ((colour = Str(colour)).indexOf("-") + 1)) {
        return {
          r: -1,
          g: -1,
          b: -1,
          hex: "none",
          error: 1,
          toString: rgbtoString
        };
      }
      if (colour == "none") {
        return {
          r: -1,
          g: -1,
          b: -1,
          hex: "none",
          toString: rgbtoString
        };
      }!(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
      if (!colour) {
        return {
          r: -1,
          g: -1,
          b: -1,
          hex: "none",
          error: 1,
          toString: rgbtoString
        };
      }
      var res, red, green, blue, opacity, t, values, rgb = colour.match(colourRegExp);
      if (rgb) {
        if (rgb[2]) {
          blue = toInt(rgb[2].substring(5), 16);
          green = toInt(rgb[2].substring(3, 5), 16);
          red = toInt(rgb[2].substring(1, 3), 16);
        }
        if (rgb[3]) {
          blue = toInt((t = rgb[3].charAt(3)) + t, 16);
          green = toInt((t = rgb[3].charAt(2)) + t, 16);
          red = toInt((t = rgb[3].charAt(1)) + t, 16);
        }
        if (rgb[4]) {
          values = rgb[4].split(commaSpaces);
          red = toFloat(values[0]);
          values[0].slice(-1) == "%" && (red *= 2.55);
          green = toFloat(values[1]);
          values[1].slice(-1) == "%" && (green *= 2.55);
          blue = toFloat(values[2]);
          values[2].slice(-1) == "%" && (blue *= 2.55);
          rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
          values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
        }
        if (rgb[5]) {
          values = rgb[5].split(commaSpaces);
          red = toFloat(values[0]);
          values[0].slice(-1) == "%" && (red /= 100);
          green = toFloat(values[1]);
          values[1].slice(-1) == "%" && (green /= 100);
          blue = toFloat(values[2]);
          values[2].slice(-1) == "%" && (blue /= 100);
          (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
          rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
          values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
          return Snap.hsb2rgb(red, green, blue, opacity);
        }
        if (rgb[6]) {
          values = rgb[6].split(commaSpaces);
          red = toFloat(values[0]);
          values[0].slice(-1) == "%" && (red /= 100);
          green = toFloat(values[1]);
          values[1].slice(-1) == "%" && (green /= 100);
          blue = toFloat(values[2]);
          values[2].slice(-1) == "%" && (blue /= 100);
          (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
          rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
          values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
          return Snap.hsl2rgb(red, green, blue, opacity);
        }
        red = mmin(math.round(red), 255);
        green = mmin(math.round(green), 255);
        blue = mmin(math.round(blue), 255);
        opacity = mmin(mmax(opacity, 0), 1);
        rgb = {
          r: red,
          g: green,
          b: blue,
          toString: rgbtoString
        };
        rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
        rgb.opacity = is(opacity, "finite") ? opacity : 1;
        return rgb;
      }
      return {
        r: -1,
        g: -1,
        b: -1,
        hex: "none",
        error: 1,
        toString: rgbtoString
      };
    }, Snap);
/*\
 * Snap.hsb
 [ method ]
 **
 * Converts HSB values to a hex representation of the color
 - h (number) hue
 - s (number) saturation
 - b (number) value or brightness
 = (string) hex representation of the color
\*/
    Snap.hsb = cacher(function (h, s, b) {
      return Snap.hsb2rgb(h, s, b).hex;
    });
/*\
 * Snap.hsl
 [ method ]
 **
 * Converts HSL values to a hex representation of the color
 - h (number) hue
 - s (number) saturation
 - l (number) luminosity
 = (string) hex representation of the color
\*/
    Snap.hsl = cacher(function (h, s, l) {
      return Snap.hsl2rgb(h, s, l).hex;
    });
/*\
 * Snap.rgb
 [ method ]
 **
 * Converts RGB values to a hex representation of the color
 - r (number) red
 - g (number) green
 - b (number) blue
 = (string) hex representation of the color
\*/
    Snap.rgb = cacher(function (r, g, b, o) {
      if (is(o, "finite")) {
        var round = math.round;
        return "rgba(" + [round(r), round(g), round(b), +o.toFixed(2)] + ")";
      }
      return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
    });
    var toHex = function (color) {
      var i = glob.doc.getElementsByTagName("head")[0] || glob.doc.getElementsByTagName("svg")[0],
          red = "rgb(255, 0, 0)";
      toHex = cacher(function (color) {
        if (color.toLowerCase() == "red") {
          return red;
        }
        i.style.color = red;
        i.style.color = color;
        var out = glob.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
        return out == red ? null : out;
      });
      return toHex(color);
    },
        hsbtoString = function () {
        return "hsb(" + [this.h, this.s, this.b] + ")";
        },
        hsltoString = function () {
        return "hsl(" + [this.h, this.s, this.l] + ")";
        },
        rgbtoString = function () {
        return this.opacity == 1 || this.opacity == null ? this.hex : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")";
        },
        prepareRGB = function (r, g, b) {
        if (g == null && is(r, "object") && "r" in r && "g" in r && "b" in r) {
          b = r.b;
          g = r.g;
          r = r.r;
        }
        if (g == null && is(r, string)) {
          var clr = Snap.getRGB(r);
          r = clr.r;
          g = clr.g;
          b = clr.b;
        }
        if (r > 1 || g > 1 || b > 1) {
          r /= 255;
          g /= 255;
          b /= 255;
        }

        return [r, g, b];
        },
        packageRGB = function (r, g, b, o) {
        r = math.round(r * 255);
        g = math.round(g * 255);
        b = math.round(b * 255);
        var rgb = {
          r: r,
          g: g,
          b: b,
          opacity: is(o, "finite") ? o : 1,
          hex: Snap.rgb(r, g, b),
          toString: rgbtoString
        };
        is(o, "finite") && (rgb.opacity = o);
        return rgb;
        };
/*\
 * Snap.color
 [ method ]
 **
 * Parses the color string and returns an object featuring the color's component values
 - clr (string) color string in one of the supported formats (see @Snap.getRGB)
 = (object) Combined RGB/HSB object in the following format:
 o {
 o     r (number) red,
 o     g (number) green,
 o     b (number) blue,
 o     hex (string) color in HTML/CSS format: #••••••,
 o     error (boolean) `true` if string can't be parsed,
 o     h (number) hue,
 o     s (number) saturation,
 o     v (number) value (brightness),
 o     l (number) lightness
 o }
\*/
    Snap.color = function (clr) {
      var rgb;
      if (is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
        rgb = Snap.hsb2rgb(clr);
        clr.r = rgb.r;
        clr.g = rgb.g;
        clr.b = rgb.b;
        clr.opacity = 1;
        clr.hex = rgb.hex;
      } else if (is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
        rgb = Snap.hsl2rgb(clr);
        clr.r = rgb.r;
        clr.g = rgb.g;
        clr.b = rgb.b;
        clr.opacity = 1;
        clr.hex = rgb.hex;
      } else {
        if (is(clr, "string")) {
          clr = Snap.getRGB(clr);
        }
        if (is(clr, "object") && "r" in clr && "g" in clr && "b" in clr && !("error" in clr)) {
          rgb = Snap.rgb2hsl(clr);
          clr.h = rgb.h;
          clr.s = rgb.s;
          clr.l = rgb.l;
          rgb = Snap.rgb2hsb(clr);
          clr.v = rgb.b;
        } else {
          clr = {
            hex: "none"
          };
          clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
          clr.error = 1;
        }
      }
      clr.toString = rgbtoString;
      return clr;
    };
/*\
 * Snap.hsb2rgb
 [ method ]
 **
 * Converts HSB values to an RGB object
 - h (number) hue
 - s (number) saturation
 - v (number) value or brightness
 = (object) RGB object in the following format:
 o {
 o     r (number) red,
 o     g (number) green,
 o     b (number) blue,
 o     hex (string) color in HTML/CSS format: #••••••
 o }
\*/
    Snap.hsb2rgb = function (h, s, v, o) {
      if (is(h, "object") && "h" in h && "s" in h && "b" in h) {
        v = h.b;
        s = h.s;
        o = h.o;
        h = h.h;
      }
      h *= 360;
      var R, G, B, X, C;
      h = (h % 360) / 60;
      C = v * s;
      X = C * (1 - abs(h % 2 - 1));
      R = G = B = v - C;

      h = ~~h;
      R += [C, X, 0, 0, X, C][h];
      G += [X, C, C, X, 0, 0][h];
      B += [0, 0, X, C, C, X][h];
      return packageRGB(R, G, B, o);
    };
/*\
 * Snap.hsl2rgb
 [ method ]
 **
 * Converts HSL values to an RGB object
 - h (number) hue
 - s (number) saturation
 - l (number) luminosity
 = (object) RGB object in the following format:
 o {
 o     r (number) red,
 o     g (number) green,
 o     b (number) blue,
 o     hex (string) color in HTML/CSS format: #••••••
 o }
\*/
    Snap.hsl2rgb = function (h, s, l, o) {
      if (is(h, "object") && "h" in h && "s" in h && "l" in h) {
        l = h.l;
        s = h.s;
        h = h.h;
      }
      if (h > 1 || s > 1 || l > 1) {
        h /= 360;
        s /= 100;
        l /= 100;
      }
      h *= 360;
      var R, G, B, X, C;
      h = (h % 360) / 60;
      C = 2 * s * (l < .5 ? l : 1 - l);
      X = C * (1 - abs(h % 2 - 1));
      R = G = B = l - C / 2;

      h = ~~h;
      R += [C, X, 0, 0, X, C][h];
      G += [X, C, C, X, 0, 0][h];
      B += [0, 0, X, C, C, X][h];
      return packageRGB(R, G, B, o);
    };
/*\
 * Snap.rgb2hsb
 [ method ]
 **
 * Converts RGB values to an HSB object
 - r (number) red
 - g (number) green
 - b (number) blue
 = (object) HSB object in the following format:
 o {
 o     h (number) hue,
 o     s (number) saturation,
 o     b (number) brightness
 o }
\*/
    Snap.rgb2hsb = function (r, g, b) {
      b = prepareRGB(r, g, b);
      r = b[0];
      g = b[1];
      b = b[2];

      var H, S, V, C;
      V = mmax(r, g, b);
      C = V - mmin(r, g, b);
      H = (C == 0 ? null : V == r ? (g - b) / C : V == g ? (b - r) / C + 2 : (r - g) / C + 4);
      H = ((H + 360) % 6) * 60 / 360;
      S = C == 0 ? 0 : C / V;
      return {
        h: H,
        s: S,
        b: V,
        toString: hsbtoString
      };
    };
/*\
 * Snap.rgb2hsl
 [ method ]
 **
 * Converts RGB values to an HSL object
 - r (number) red
 - g (number) green
 - b (number) blue
 = (object) HSL object in the following format:
 o {
 o     h (number) hue,
 o     s (number) saturation,
 o     l (number) luminosity
 o }
\*/
    Snap.rgb2hsl = function (r, g, b) {
      b = prepareRGB(r, g, b);
      r = b[0];
      g = b[1];
      b = b[2];

      var H, S, L, M, m, C;
      M = mmax(r, g, b);
      m = mmin(r, g, b);
      C = M - m;
      H = (C == 0 ? null : M == r ? (g - b) / C : M == g ? (b - r) / C + 2 : (r - g) / C + 4);
      H = ((H + 360) % 6) * 60 / 360;
      L = (M + m) / 2;
      S = (C == 0 ? 0 : L < .5 ? C / (2 * L) : C / (2 - 2 * L));
      return {
        h: H,
        s: S,
        l: L,
        toString: hsltoString
      };
    };

    // Transformations
/*\
 * Snap.parsePathString
 [ method ]
 **
 * Utility method
 **
 * Parses given path string into an array of arrays of path segments
 - pathString (string|array) path string or array of segments (in the last case it is returned straight away)
 = (array) array of segments
\*/
    Snap.parsePathString = function (pathString) {
      if (!pathString) {
        return null;
      }
      var pth = Snap.path(pathString);
      if (pth.arr) {
        return Snap.path.clone(pth.arr);
      }

      var paramCounts = {
        a: 7,
        c: 6,
        o: 2,
        h: 1,
        l: 2,
        m: 2,
        r: 4,
        q: 4,
        s: 4,
        t: 2,
        v: 1,
        u: 3,
        z: 0
      },
          data = [];
      if (is(pathString, "array") && is(pathString[0], "array")) { // rough assumption
        data = Snap.path.clone(pathString);
      }
      if (!data.length) {
        Str(pathString).replace(pathCommand, function (a, b, c) {
          var params = [],
              name = b.toLowerCase();
          c.replace(pathValues, function (a, b) {
            b && params.push(+b);
          });
          if (name == "m" && params.length > 2) {
            data.push([b].concat(params.splice(0, 2)));
            name = "l";
            b = b == "m" ? "l" : "L";
          }
          if (name == "o" && params.length == 1) {
            data.push([b, params[0]]);
          }
          if (name == "r") {
            data.push([b].concat(params));
          } else while (params.length >= paramCounts[name]) {
            data.push([b].concat(params.splice(0, paramCounts[name])));
            if (!paramCounts[name]) {
              break;
            }
          }
        });
      }
      data.toString = Snap.path.toString;
      pth.arr = Snap.path.clone(data);
      return data;
    };
/*\
 * Snap.parseTransformString
 [ method ]
 **
 * Utility method
 **
 * Parses given transform string into an array of transformations
 - TString (string|array) transform string or array of transformations (in the last case it is returned straight away)
 = (array) array of transformations
\*/
    var parseTransformString = Snap.parseTransformString = function (TString) {
      if (!TString) {
        return null;
      }
      var paramCounts = {
        r: 3,
        s: 4,
        t: 2,
        m: 6
      },
          data = [];
      if (is(TString, "array") && is(TString[0], "array")) { // rough assumption
        data = Snap.path.clone(TString);
      }
      if (!data.length) {
        Str(TString).replace(tCommand, function (a, b, c) {
          var params = [],
              name = b.toLowerCase();
          c.replace(pathValues, function (a, b) {
            b && params.push(+b);
          });
          data.push([b].concat(params));
        });
      }
      data.toString = Snap.path.toString;
      return data;
    };

    function svgTransform2string(tstr) {
      var res = [];
      tstr = tstr.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function (all, name, params) {
        params = params.split(/\s*,\s*|\s+/);
        if (name == "rotate" && params.length == 1) {
          params.push(0, 0);
        }
        if (name == "scale") {
          if (params.length > 2) {
            params = params.slice(0, 2);
          } else if (params.length == 2) {
            params.push(0, 0);
          }
          if (params.length == 1) {
            params.push(params[0], 0, 0);
          }
        }
        if (name == "skewX") {
          res.push(["m", 1, 0, math.tan(rad(params[0])), 1, 0, 0]);
        } else if (name == "skewY") {
          res.push(["m", 1, math.tan(rad(params[0])), 0, 1, 0, 0]);
        } else {
          res.push([name.charAt(0)].concat(params));
        }
        return all;
      });
      return res;
    }
    Snap._.svgTransform2string = svgTransform2string;
    Snap._.rgTransform = /^[a-z][\s]*-?\.?\d/i;

    function transform2matrix(tstr, bbox) {
      var tdata = parseTransformString(tstr),
          m = new Snap.Matrix;
      if (tdata) {
        for (var i = 0, ii = tdata.length; i < ii; i++) {
          var t = tdata[i],
              tlen = t.length,
              command = Str(t[0]).toLowerCase(),
              absolute = t[0] != command,
              inver = absolute ? m.invert() : 0,
              x1, y1, x2, y2, bb;
          if (command == "t" && tlen == 2) {
            m.translate(t[1], 0);
          } else if (command == "t" && tlen == 3) {
            if (absolute) {
              x1 = inver.x(0, 0);
              y1 = inver.y(0, 0);
              x2 = inver.x(t[1], t[2]);
              y2 = inver.y(t[1], t[2]);
              m.translate(x2 - x1, y2 - y1);
            } else {
              m.translate(t[1], t[2]);
            }
          } else if (command == "r") {
            if (tlen == 2) {
              bb = bb || bbox;
              m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
            } else if (tlen == 4) {
              if (absolute) {
                x2 = inver.x(t[2], t[3]);
                y2 = inver.y(t[2], t[3]);
                m.rotate(t[1], x2, y2);
              } else {
                m.rotate(t[1], t[2], t[3]);
              }
            }
          } else if (command == "s") {
            if (tlen == 2 || tlen == 3) {
              bb = bb || bbox;
              m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
            } else if (tlen == 4) {
              if (absolute) {
                x2 = inver.x(t[2], t[3]);
                y2 = inver.y(t[2], t[3]);
                m.scale(t[1], t[1], x2, y2);
              } else {
                m.scale(t[1], t[1], t[2], t[3]);
              }
            } else if (tlen == 5) {
              if (absolute) {
                x2 = inver.x(t[3], t[4]);
                y2 = inver.y(t[3], t[4]);
                m.scale(t[1], t[2], x2, y2);
              } else {
                m.scale(t[1], t[2], t[3], t[4]);
              }
            }
          } else if (command == "m" && tlen == 7) {
            m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
          }
        }
      }
      return m;
    }
    Snap._.transform2matrix = transform2matrix;
    Snap._unit2px = unit2px;
    var contains = glob.doc.contains || glob.doc.compareDocumentPosition ?
    function (a, b) {
      var adown = a.nodeType == 9 ? a.documentElement : a,
          bup = b && b.parentNode;
      return a == bup || !! (bup && bup.nodeType == 1 && (
      adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
    } : function (a, b) {
      if (b) {
        while (b) {
          b = b.parentNode;
          if (b == a) {
            return true;
          }
        }
      }
      return false;
    };

    function getSomeDefs(el) {
      var p = (el.node.ownerSVGElement && wrap(el.node.ownerSVGElement)) || (el.node.parentNode && wrap(el.node.parentNode)) || Snap.select("svg") || Snap(0, 0),
          pdefs = p.select("defs"),
          defs = pdefs == null ? false : pdefs.node;
      if (!defs) {
        defs = make("defs", p.node).node;
      }
      return defs;
    }

    function getSomeSVG(el) {
      return el.node.ownerSVGElement && wrap(el.node.ownerSVGElement) || Snap.select("svg");
    }
    Snap._.getSomeDefs = getSomeDefs;
    Snap._.getSomeSVG = getSomeSVG;

    function unit2px(el, name, value) {
      var svg = getSomeSVG(el).node,
          out = {},
          mgr = svg.querySelector(".svg---mgr");
      if (!mgr) {
        mgr = $("rect");
        $(mgr, {
          x: -9e9,
          y: -9e9,
          width: 10,
          height: 10,
          "class": "svg---mgr",
          fill: "none"
        });
        svg.appendChild(mgr);
      }

      function getW(val) {
        if (val == null) {
          return E;
        }
        if (val == +val) {
          return val;
        }
        $(mgr, {
          width: val
        });
        try {
          return mgr.getBBox().width;
        } catch (e) {
          return 0;
        }
      }

      function getH(val) {
        if (val == null) {
          return E;
        }
        if (val == +val) {
          return val;
        }
        $(mgr, {
          height: val
        });
        try {
          return mgr.getBBox().height;
        } catch (e) {
          return 0;
        }
      }

      function set(nam, f) {
        if (name == null) {
          out[nam] = f(el.attr(nam) || 0);
        } else if (nam == name) {
          out = f(value == null ? el.attr(nam) || 0 : value);
        }
      }
      switch (el.type) {
      case "rect":
        set("rx", getW);
        set("ry", getH);
      case "image":
        set("width", getW);
        set("height", getH);
      case "text":
        set("x", getW);
        set("y", getH);
        break;
      case "circle":
        set("cx", getW);
        set("cy", getH);
        set("r", getW);
        break;
      case "ellipse":
        set("cx", getW);
        set("cy", getH);
        set("rx", getW);
        set("ry", getH);
        break;
      case "line":
        set("x1", getW);
        set("x2", getW);
        set("y1", getH);
        set("y2", getH);
        break;
      case "marker":
        set("refX", getW);
        set("markerWidth", getW);
        set("refY", getH);
        set("markerHeight", getH);
        break;
      case "radialGradient":
        set("fx", getW);
        set("fy", getH);
        break;
      case "tspan":
        set("dx", getW);
        set("dy", getH);
        break;
      default:
        set(name, getW);
      }
      svg.removeChild(mgr);
      return out;
    }
/*\
 * Snap.select
 [ method ]
 **
 * Wraps a DOM element specified by CSS selector as @Element
 - query (string) CSS selector of the element
 = (Element) the current element
\*/
    Snap.select = function (query) {
      query = Str(query).replace(/([^\\]):/g, "$1\\:");
      return wrap(glob.doc.querySelector(query));
    };
/*\
 * Snap.selectAll
 [ method ]
 **
 * Wraps DOM elements specified by CSS selector as set or array of @Element
 - query (string) CSS selector of the element
 = (Element) the current element
\*/
    Snap.selectAll = function (query) {
      var nodelist = glob.doc.querySelectorAll(query),
          set = (Snap.set || Array)();
      for (var i = 0; i < nodelist.length; i++) {
        set.push(wrap(nodelist[i]));
      }
      return set;
    };

    function add2group(list) {
      if (!is(list, "array")) {
        list = Array.prototype.slice.call(arguments, 0);
      }
      var i = 0,
          j = 0,
          node = this.node;
      while (this[i]) delete this[i++];
      for (i = 0; i < list.length; i++) {
        if (list[i].type == "set") {
          list[i].forEach(function (el) {
            node.appendChild(el.node);
          });
        } else {
          node.appendChild(list[i].node);
        }
      }
      var children = node.childNodes;
      for (i = 0; i < children.length; i++) {
        this[j++] = wrap(children[i]);
      }
      return this;
    }
    // Hub garbage collector every 10s
    setInterval(function () {
      for (var key in hub) if (hub[has](key)) {
        var el = hub[key],
            node = el.node;
        if (el.type != "svg" && !node.ownerSVGElement || el.type == "svg" && (!node.parentNode || "ownerSVGElement" in node.parentNode && !node.ownerSVGElement)) {
          delete hub[key];
        }
      }
    }, 1e4);

    function Element(el) {
      if (el.snap in hub) {
        return hub[el.snap];
      }
      var svg;
      try {
        svg = el.ownerSVGElement;
      } catch (e) {}
/*\
     * Element.node
     [ property (object) ]
     **
     * Gives you a reference to the DOM object, so you can assign event handlers or just mess around.
     > Usage
     | // draw a circle at coordinate 10,10 with radius of 10
     | var c = paper.circle(10, 10, 10);
     | c.node.onclick = function () {
     |     c.attr("fill", "red");
     | };
    \*/
      this.node = el;
      if (svg) {
        this.paper = new Paper(svg);
      }
/*\
     * Element.type
     [ property (string) ]
     **
     * SVG tag name of the given element.
    \*/
      this.type = el.tagName || el.nodeName;
      var id = this.id = ID(this);
      this.anims = {};
      this._ = {
        transform: []
      };
      el.snap = id;
      hub[id] = this;
      if (this.type == "g") {
        this.add = add2group;
      }
      if (this.type in {
        g: 1,
        mask: 1,
        pattern: 1,
        symbol: 1
      }) {
        for (var method in Paper.prototype) if (Paper.prototype[has](method)) {
          this[method] = Paper.prototype[method];
        }
      }
    }
/*\
     * Element.attr
     [ method ]
     **
     * Gets or sets given attributes of the element.
     **
     - params (object) contains key-value pairs of attributes you want to set
     * or
     - param (string) name of the attribute
     = (Element) the current element
     * or
     = (string) value of attribute
     > Usage
     | el.attr({
     |     fill: "#fc0",
     |     stroke: "#000",
     |     strokeWidth: 2, // CamelCase...
     |     "fill-opacity": 0.5, // or dash-separated names
     |     width: "*=2" // prefixed values
     | });
     | console.log(el.attr("fill")); // #fc0
     * Prefixed values in format `"+=10"` supported. All four operations
     * (`+`, `-`, `*` and `/`) could be used. Optionally you can use units for `+`
     * and `-`: `"+=2em"`.
    \*/
    Element.prototype.attr = function (params, value) {
      var el = this,
          node = el.node;
      if (!params) {
        if (node.nodeType != 1) {
          return {
            text: node.nodeValue
          };
        }
        var attr = node.attributes,
            out = {};
        for (var i = 0, ii = attr.length; i < ii; i++) {
          out[attr[i].nodeName] = attr[i].nodeValue;
        }
        return out;
      }
      if (is(params, "string")) {
        if (arguments.length > 1) {
          var json = {};
          json[params] = value;
          params = json;
        } else {
          return eve("snap.util.getattr." + params, el).firstDefined();
        }
      }
      for (var att in params) {
        if (params[has](att)) {
          eve("snap.util.attr." + att, el, params[att]);
        }
      }
      return el;
    };
/*\
 * Snap.parse
 [ method ]
 **
 * Parses SVG fragment and converts it into a @Fragment
 **
 - svg (string) SVG string
 = (Fragment) the @Fragment
\*/
    Snap.parse = function (svg) {
      var f = glob.doc.createDocumentFragment(),
          full = true,
          div = glob.doc.createElement("div");
      svg = Str(svg);
      if (!svg.match(/^\s*<\s*svg(?:\s|>)/)) {
        svg = "<svg>" + svg + "</svg>";
        full = false;
      }
      div.innerHTML = svg;
      svg = div.getElementsByTagName("svg")[0];
      if (svg) {
        if (full) {
          f = svg;
        } else {
          while (svg.firstChild) {
            f.appendChild(svg.firstChild);
          }
        }
      }
      return new Fragment(f);
    };

    function Fragment(frag) {
      this.node = frag;
    }
/*\
 * Snap.fragment
 [ method ]
 **
 * Creates a DOM fragment from a given list of elements or strings
 **
 - varargs (…) SVG string
 = (Fragment) the @Fragment
\*/
    Snap.fragment = function () {
      var args = Array.prototype.slice.call(arguments, 0),
          f = glob.doc.createDocumentFragment();
      for (var i = 0, ii = args.length; i < ii; i++) {
        var item = args[i];
        if (item.node && item.node.nodeType) {
          f.appendChild(item.node);
        }
        if (item.nodeType) {
          f.appendChild(item);
        }
        if (typeof item == "string") {
          f.appendChild(Snap.parse(item).node);
        }
      }
      return new Fragment(f);
    };

    function make(name, parent) {
      var res = $(name);
      parent.appendChild(res);
      var el = wrap(res);
      return el;
    }

    function Paper(w, h) {
      var res, desc, defs, proto = Paper.prototype;
      if (w && w.tagName == "svg") {
        if (w.snap in hub) {
          return hub[w.snap];
        }
        var doc = w.ownerDocument;
        res = new Element(w);
        desc = w.getElementsByTagName("desc")[0];
        defs = w.getElementsByTagName("defs")[0];
        if (!desc) {
          desc = $("desc");
          desc.appendChild(doc.createTextNode("Created with Snap"));
          res.node.appendChild(desc);
        }
        if (!defs) {
          defs = $("defs");
          res.node.appendChild(defs);
        }
        res.defs = defs;
        for (var key in proto) if (proto[has](key)) {
          res[key] = proto[key];
        }
        res.paper = res.root = res;
      } else {
        res = make("svg", glob.doc.body);
        $(res.node, {
          height: h,
          version: 1.1,
          width: w,
          xmlns: xmlns
        });
      }
      return res;
    }

    function wrap(dom) {
      if (!dom) {
        return dom;
      }
      if (dom instanceof Element || dom instanceof Fragment) {
        return dom;
      }
      if (dom.tagName && dom.tagName.toLowerCase() == "svg") {
        return new Paper(dom);
      }
      if (dom.tagName && dom.tagName.toLowerCase() == "object" && dom.type == "image/svg+xml") {
        return new Paper(dom.contentDocument.getElementsByTagName("svg")[0]);
      }
      return new Element(dom);
    }

    Snap._.make = make;
    Snap._.wrap = wrap;
/*\
 * Paper.el
 [ method ]
 **
 * Creates an element on paper with a given name and no attributes
 **
 - name (string) tag name
 - attr (object) attributes
 = (Element) the current element
 > Usage
 | var c = paper.circle(10, 10, 10); // is the same as...
 | var c = paper.el("circle").attr({
 |     cx: 10,
 |     cy: 10,
 |     r: 10
 | });
 | // and the same as
 | var c = paper.el("circle", {
 |     cx: 10,
 |     cy: 10,
 |     r: 10
 | });
\*/
    Paper.prototype.el = function (name, attr) {
      var el = make(name, this.node);
      attr && el.attr(attr);
      return el;
    };
/*\
 * Element.children
 [ method ]
 **
 * Returns array of all the children of the element.
 = (array) array of Elements
\*/
    Element.prototype.children = function () {
      var out = [],
          ch = this.node.childNodes;
      for (var i = 0, ii = ch.length; i < ii; i++) {
        out[i] = Snap(ch[i]);
      }
      return out;
    };

    function jsonFiller(root, o) {
      for (var i = 0, ii = root.length; i < ii; i++) {
        var item = {
          type: root[i].type,
          attr: root[i].attr()
        },
            children = root[i].children();
        o.push(item);
        if (children.length) {
          jsonFiller(children, item.childNodes = []);
        }
      }
    }
/*\
 * Element.toJSON
 [ method ]
 **
 * Returns object representation of the given element and all its children.
 = (object) in format
 o {
 o     type (string) this.type,
 o     attr (object) attributes map,
 o     childNodes (array) optional array of children in the same format
 o }
\*/
    Element.prototype.toJSON = function () {
      var out = [];
      jsonFiller([this], out);
      return out[0];
    };
    // default
    eve.on("snap.util.getattr", function () {
      var att = eve.nt();
      att = att.substring(att.lastIndexOf(".") + 1);
      var css = att.replace(/[A-Z]/g, function (letter) {
        return "-" + letter.toLowerCase();
      });
      if (cssAttr[has](css)) {
        return this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(css);
      } else {
        return $(this.node, att);
      }
    });
    var cssAttr = {
      "alignment-baseline": 0,
      "baseline-shift": 0,
      "clip": 0,
      "clip-path": 0,
      "clip-rule": 0,
      "color": 0,
      "color-interpolation": 0,
      "color-interpolation-filters": 0,
      "color-profile": 0,
      "color-rendering": 0,
      "cursor": 0,
      "direction": 0,
      "display": 0,
      "dominant-baseline": 0,
      "enable-background": 0,
      "fill": 0,
      "fill-opacity": 0,
      "fill-rule": 0,
      "filter": 0,
      "flood-color": 0,
      "flood-opacity": 0,
      "font": 0,
      "font-family": 0,
      "font-size": 0,
      "font-size-adjust": 0,
      "font-stretch": 0,
      "font-style": 0,
      "font-variant": 0,
      "font-weight": 0,
      "glyph-orientation-horizontal": 0,
      "glyph-orientation-vertical": 0,
      "image-rendering": 0,
      "kerning": 0,
      "letter-spacing": 0,
      "lighting-color": 0,
      "marker": 0,
      "marker-end": 0,
      "marker-mid": 0,
      "marker-start": 0,
      "mask": 0,
      "opacity": 0,
      "overflow": 0,
      "pointer-events": 0,
      "shape-rendering": 0,
      "stop-color": 0,
      "stop-opacity": 0,
      "stroke": 0,
      "stroke-dasharray": 0,
      "stroke-dashoffset": 0,
      "stroke-linecap": 0,
      "stroke-linejoin": 0,
      "stroke-miterlimit": 0,
      "stroke-opacity": 0,
      "stroke-width": 0,
      "text-anchor": 0,
      "text-decoration": 0,
      "text-rendering": 0,
      "unicode-bidi": 0,
      "visibility": 0,
      "word-spacing": 0,
      "writing-mode": 0
    };

    eve.on("snap.util.attr", function (value) {
      var att = eve.nt(),
          attr = {};
      att = att.substring(att.lastIndexOf(".") + 1);
      attr[att] = value;
      var style = att.replace(/-(\w)/gi, function (all, letter) {
        return letter.toUpperCase();
      }),
          css = att.replace(/[A-Z]/g, function (letter) {
          return "-" + letter.toLowerCase();
        });
      if (cssAttr[has](css)) {
        this.node.style[style] = value == null ? E : value;
      } else {
        $(this.node, attr);
      }
    });
    (function (proto) {}(Paper.prototype));

    // simple ajax
/*\
 * Snap.ajax
 [ method ]
 **
 * Simple implementation of Ajax
 **
 - url (string) URL
 - postData (object|string) data for post request
 - callback (function) callback
 - scope (object) #optional scope of callback
 * or
 - url (string) URL
 - callback (function) callback
 - scope (object) #optional scope of callback
 = (XMLHttpRequest) the XMLHttpRequest object, just in case
\*/
    Snap.ajax = function (url, postData, callback, scope) {
      var req = new XMLHttpRequest,
          id = ID();
      if (req) {
        if (is(postData, "function")) {
          scope = callback;
          callback = postData;
          postData = null;
        } else if (is(postData, "object")) {
          var pd = [];
          for (var key in postData) if (postData.hasOwnProperty(key)) {
            pd.push(encodeURIComponent(key) + "=" + encodeURIComponent(postData[key]));
          }
          postData = pd.join("&");
        }
        req.open((postData ? "POST" : "GET"), url, true);
        if (postData) {
          req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        if (callback) {
          eve.once("snap.ajax." + id + ".0", callback);
          eve.once("snap.ajax." + id + ".200", callback);
          eve.once("snap.ajax." + id + ".304", callback);
        }
        req.onreadystatechange = function () {
          if (req.readyState != 4) return;
          eve("snap.ajax." + id + "." + req.status, scope, req);
        };
        if (req.readyState == 4) {
          return req;
        }
        req.send(postData);
        return req;
      }
    };
/*\
 * Snap.load
 [ method ]
 **
 * Loads external SVG file as a @Fragment (see @Snap.ajax for more advanced AJAX)
 **
 - url (string) URL
 - callback (function) callback
 - scope (object) #optional scope of callback
\*/
    Snap.load = function (url, callback, scope) {
      Snap.ajax(url, function (req) {
        var f = Snap.parse(req.responseText);
        scope ? callback.call(scope, f) : callback(f);
      });
    };
    var getOffset = function (elem) {
      var box = elem.getBoundingClientRect(),
          doc = elem.ownerDocument,
          body = doc.body,
          docElem = doc.documentElement,
          clientTop = docElem.clientTop || body.clientTop || 0,
          clientLeft = docElem.clientLeft || body.clientLeft || 0,
          top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop) - clientTop,
          left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
      return {
        y: top,
        x: left
      };
    };
/*\
 * Snap.getElementByPoint
 [ method ]
 **
 * Returns you topmost element under given point.
 **
 = (object) Snap element object
 - x (number) x coordinate from the top left corner of the window
 - y (number) y coordinate from the top left corner of the window
 > Usage
 | Snap.getElementByPoint(mouseX, mouseY).attr({stroke: "#f00"});
\*/
    Snap.getElementByPoint = function (x, y) {
      var paper = this,
          svg = paper.canvas,
          target = glob.doc.elementFromPoint(x, y);
      if (glob.win.opera && target.tagName == "svg") {
        var so = getOffset(target),
            sr = target.createSVGRect();
        sr.x = x - so.x;
        sr.y = y - so.y;
        sr.width = sr.height = 1;
        var hits = target.getIntersectionList(sr, null);
        if (hits.length) {
          target = hits[hits.length - 1];
        }
      }
      if (!target) {
        return null;
      }
      return wrap(target);
    };
/*\
 * Snap.plugin
 [ method ]
 **
 * Let you write plugins. You pass in a function with five arguments, like this:
 | Snap.plugin(function (Snap, Element, Paper, global, Fragment) {
 |     Snap.newmethod = function () {};
 |     Element.prototype.newmethod = function () {};
 |     Paper.prototype.newmethod = function () {};
 | });
 * Inside the function you have access to all main objects (and their
 * prototypes). This allow you to extend anything you want.
 **
 - f (function) your plugin body
\*/
    Snap.plugin = function (f) {
      f(Snap, Element, Paper, glob, Fragment);
    };
    glob.win.Snap = Snap;
    return Snap;
  }(window || this));

  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
    var elproto = Element.prototype,
        is = Snap.is,
        Str = String,
        unit2px = Snap._unit2px,
        $ = Snap._.$,
        make = Snap._.make,
        getSomeDefs = Snap._.getSomeDefs,
        has = "hasOwnProperty",
        wrap = Snap._.wrap;
/*\
     * Element.getBBox
     [ method ]
     **
     * Returns the bounding box descriptor for the given element
     **
     = (object) bounding box descriptor:
     o {
     o     cx: (number) x of the center,
     o     cy: (number) x of the center,
     o     h: (number) height,
     o     height: (number) height,
     o     path: (string) path command for the box,
     o     r0: (number) radius of a circle that fully encloses the box,
     o     r1: (number) radius of the smallest circle that can be enclosed,
     o     r2: (number) radius of the largest circle that can be enclosed,
     o     vb: (string) box as a viewbox command,
     o     w: (number) width,
     o     width: (number) width,
     o     x2: (number) x of the right side,
     o     x: (number) x of the left side,
     o     y2: (number) y of the bottom edge,
     o     y: (number) y of the top edge
     o }
    \*/
    elproto.getBBox = function (isWithoutTransform) {
      if (!Snap.Matrix || !Snap.path) {
        return this.node.getBBox();
      }
      var el = this,
          m = new Snap.Matrix;
      if (el.removed) {
        return Snap._.box();
      }
      while (el.type == "use") {
        if (!isWithoutTransform) {
          m = m.add(el.transform().localMatrix.translate(el.attr("x") || 0, el.attr("y") || 0));
        }
        if (el.original) {
          el = el.original;
        } else {
          var href = el.attr("xlink:href");
          el = el.original = el.node.ownerDocument.getElementById(href.substring(href.indexOf("#") + 1));
        }
      }
      var _ = el._,
          pathfinder = Snap.path.get[el.type] || Snap.path.get.deflt;
      try {
        if (isWithoutTransform) {
          _.bboxwt = pathfinder ? Snap.path.getBBox(el.realPath = pathfinder(el)) : Snap._.box(el.node.getBBox());
          return Snap._.box(_.bboxwt);
        } else {
          el.realPath = pathfinder(el);
          el.matrix = el.transform().localMatrix;
          _.bbox = Snap.path.getBBox(Snap.path.map(el.realPath, m.add(el.matrix)));
          return Snap._.box(_.bbox);
        }
      } catch (e) {
        // Firefox doesn’t give you bbox of hidden element
        return Snap._.box();
      }
    };
    var propString = function () {
      return this.string;
    };

    function extractTransform(el, tstr) {
      if (tstr == null) {
        var doReturn = true;
        if (el.type == "linearGradient" || el.type == "radialGradient") {
          tstr = el.node.getAttribute("gradientTransform");
        } else if (el.type == "pattern") {
          tstr = el.node.getAttribute("patternTransform");
        } else {
          tstr = el.node.getAttribute("transform");
        }
        if (!tstr) {
          return new Snap.Matrix;
        }
        tstr = Snap._.svgTransform2string(tstr);
      } else {
        if (!Snap._.rgTransform.test(tstr)) {
          tstr = Snap._.svgTransform2string(tstr);
        } else {
          tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || "");
        }
        if (is(tstr, "array")) {
          tstr = Snap.path ? Snap.path.toString.call(tstr) : Str(tstr);
        }
        el._.transform = tstr;
      }
      var m = Snap._.transform2matrix(tstr, el.getBBox(1));
      if (doReturn) {
        return m;
      } else {
        el.matrix = m;
      }
    }
/*\
     * Element.transform
     [ method ]
     **
     * Gets or sets transformation of the element
     **
     - tstr (string) transform string in Snap or SVG format
     = (Element) the current element
     * or
     = (object) transformation descriptor:
     o {
     o     string (string) transform string,
     o     globalMatrix (Matrix) matrix of all transformations applied to element or its parents,
     o     localMatrix (Matrix) matrix of transformations applied only to the element,
     o     diffMatrix (Matrix) matrix of difference between global and local transformations,
     o     global (string) global transformation as string,
     o     local (string) local transformation as string,
     o     toString (function) returns `string` property
     o }
    \*/
    elproto.transform = function (tstr) {
      var _ = this._;
      if (tstr == null) {
        var papa = this,
            global = new Snap.Matrix(this.node.getCTM()),
            local = extractTransform(this),
            ms = [local],
            m = new Snap.Matrix,
            i, localString = local.toTransformString(),
            string = Str(local) == Str(this.matrix) ? Str(_.transform) : localString;
        while (papa.type != "svg" && (papa = papa.parent())) {
          ms.push(extractTransform(papa));
        }
        i = ms.length;
        while (i--) {
          m.add(ms[i]);
        }
        return {
          string: string,
          globalMatrix: global,
          totalMatrix: m,
          localMatrix: local,
          diffMatrix: global.clone().add(local.invert()),
          global: global.toTransformString(),
          total: m.toTransformString(),
          local: localString,
          toString: propString
        };
      }
      if (tstr instanceof Snap.Matrix) {
        this.matrix = tstr;
        this._.transform = tstr.toTransformString();
      } else {
        extractTransform(this, tstr);
      }

      if (this.node) {
        if (this.type == "linearGradient" || this.type == "radialGradient") {
          $(this.node, {
            gradientTransform: this.matrix
          });
        } else if (this.type == "pattern") {
          $(this.node, {
            patternTransform: this.matrix
          });
        } else {
          $(this.node, {
            transform: this.matrix
          });
        }
      }

      return this;
    };
/*\
     * Element.parent
     [ method ]
     **
     * Returns the element's parent
     **
     = (Element) the parent element
    \*/
    elproto.parent = function () {
      return wrap(this.node.parentNode);
    };
/*\
     * Element.append
     [ method ]
     **
     * Appends the given element to current one
     **
     - el (Element|Set) element to append
     = (Element) the parent element
    \*/
/*\
     * Element.add
     [ method ]
     **
     * See @Element.append
    \*/
    elproto.append = elproto.add = function (el) {
      if (el) {
        if (el.type == "set") {
          var it = this;
          el.forEach(function (el) {
            it.add(el);
          });
          return this;
        }
        el = wrap(el);
        this.node.appendChild(el.node);
        el.paper = this.paper;
      }
      return this;
    };
/*\
     * Element.appendTo
     [ method ]
     **
     * Appends the current element to the given one
     **
     - el (Element) parent element to append to
     = (Element) the child element
    \*/
    elproto.appendTo = function (el) {
      if (el) {
        el = wrap(el);
        el.append(this);
      }
      return this;
    };
/*\
     * Element.prepend
     [ method ]
     **
     * Prepends the given element to the current one
     **
     - el (Element) element to prepend
     = (Element) the parent element
    \*/
    elproto.prepend = function (el) {
      if (el) {
        if (el.type == "set") {
          var it = this,
              first;
          el.forEach(function (el) {
            if (first) {
              first.after(el);
            } else {
              it.prepend(el);
            }
            first = el;
          });
          return this;
        }
        el = wrap(el);
        var parent = el.parent();
        this.node.insertBefore(el.node, this.node.firstChild);
        this.add && this.add();
        el.paper = this.paper;
        this.parent() && this.parent().add();
        parent && parent.add();
      }
      return this;
    };
/*\
     * Element.prependTo
     [ method ]
     **
     * Prepends the current element to the given one
     **
     - el (Element) parent element to prepend to
     = (Element) the child element
    \*/
    elproto.prependTo = function (el) {
      el = wrap(el);
      el.prepend(this);
      return this;
    };
/*\
     * Element.before
     [ method ]
     **
     * Inserts given element before the current one
     **
     - el (Element) element to insert
     = (Element) the parent element
    \*/
    elproto.before = function (el) {
      if (el.type == "set") {
        var it = this;
        el.forEach(function (el) {
          var parent = el.parent();
          it.node.parentNode.insertBefore(el.node, it.node);
          parent && parent.add();
        });
        this.parent().add();
        return this;
      }
      el = wrap(el);
      var parent = el.parent();
      this.node.parentNode.insertBefore(el.node, this.node);
      this.parent() && this.parent().add();
      parent && parent.add();
      el.paper = this.paper;
      return this;
    };
/*\
     * Element.after
     [ method ]
     **
     * Inserts given element after the current one
     **
     - el (Element) element to insert
     = (Element) the parent element
    \*/
    elproto.after = function (el) {
      el = wrap(el);
      var parent = el.parent();
      if (this.node.nextSibling) {
        this.node.parentNode.insertBefore(el.node, this.node.nextSibling);
      } else {
        this.node.parentNode.appendChild(el.node);
      }
      this.parent() && this.parent().add();
      parent && parent.add();
      el.paper = this.paper;
      return this;
    };
/*\
     * Element.insertBefore
     [ method ]
     **
     * Inserts the element after the given one
     **
     - el (Element) element next to whom insert to
     = (Element) the parent element
    \*/
    elproto.insertBefore = function (el) {
      el = wrap(el);
      var parent = this.parent();
      el.node.parentNode.insertBefore(this.node, el.node);
      this.paper = el.paper;
      parent && parent.add();
      el.parent() && el.parent().add();
      return this;
    };
/*\
     * Element.insertAfter
     [ method ]
     **
     * Inserts the element after the given one
     **
     - el (Element) element next to whom insert to
     = (Element) the parent element
    \*/
    elproto.insertAfter = function (el) {
      el = wrap(el);
      var parent = this.parent();
      el.node.parentNode.insertBefore(this.node, el.node.nextSibling);
      this.paper = el.paper;
      parent && parent.add();
      el.parent() && el.parent().add();
      return this;
    };
/*\
     * Element.remove
     [ method ]
     **
     * Removes element from the DOM
     = (Element) the detached element
    \*/
    elproto.remove = function () {
      var parent = this.parent();
      this.node.parentNode && this.node.parentNode.removeChild(this.node);
      delete this.paper;
      this.removed = true;
      parent && parent.add();
      return this;
    };
/*\
     * Element.select
     [ method ]
     **
     * Gathers the nested @Element matching the given set of CSS selectors
     **
     - query (string) CSS selector
     = (Element) result of query selection
    \*/
    elproto.select = function (query) {
      return wrap(this.node.querySelector(query));
    };
/*\
     * Element.selectAll
     [ method ]
     **
     * Gathers nested @Element objects matching the given set of CSS selectors
     **
     - query (string) CSS selector
     = (Set|array) result of query selection
    \*/
    elproto.selectAll = function (query) {
      var nodelist = this.node.querySelectorAll(query),
          set = (Snap.set || Array)();
      for (var i = 0; i < nodelist.length; i++) {
        set.push(wrap(nodelist[i]));
      }
      return set;
    };
/*\
     * Element.asPX
     [ method ]
     **
     * Returns given attribute of the element as a `px` value (not %, em, etc.)
     **
     - attr (string) attribute name
     - value (string) #optional attribute value
     = (Element) result of query selection
    \*/
    elproto.asPX = function (attr, value) {
      if (value == null) {
        value = this.attr(attr);
      }
      return +unit2px(this, attr, value);
    };
    // SIERRA Element.use(): I suggest adding a note about how to access the original element the returned <use> instantiates. It's a part of SVG with which ordinary web developers may be least familiar.
/*\
     * Element.use
     [ method ]
     **
     * Creates a `<use>` element linked to the current element
     **
     = (Element) the `<use>` element
    \*/
    elproto.use = function () {
      var use, id = this.node.id;
      if (!id) {
        id = this.id;
        $(this.node, {
          id: id
        });
      }
      if (this.type == "linearGradient" || this.type == "radialGradient" || this.type == "pattern") {
        use = make(this.type, this.node.parentNode);
      } else {
        use = make("use", this.node.parentNode);
      }
      $(use.node, {
        "xlink:href": "#" + id
      });
      use.original = this;
      return use;
    };

    function fixids(el) {
      var els = el.selectAll("*"),
          it, url = /^\s*url\(("|'|)(.*)\1\)\s*$/,
          ids = [],
          uses = {};

      function urltest(it, name) {
        var val = $(it.node, name);
        val = val && val.match(url);
        val = val && val[2];
        if (val && val.charAt() == "#") {
          val = val.substring(1);
        } else {
          return;
        }
        if (val) {
          uses[val] = (uses[val] || []).concat(function (id) {
            var attr = {};
            attr[name] = URL(id);
            $(it.node, attr);
          });
        }
      }

      function linktest(it) {
        var val = $(it.node, "xlink:href");
        if (val && val.charAt() == "#") {
          val = val.substring(1);
        } else {
          return;
        }
        if (val) {
          uses[val] = (uses[val] || []).concat(function (id) {
            it.attr("xlink:href", "#" + id);
          });
        }
      }
      for (var i = 0, ii = els.length; i < ii; i++) {
        it = els[i];
        urltest(it, "fill");
        urltest(it, "stroke");
        urltest(it, "filter");
        urltest(it, "mask");
        urltest(it, "clip-path");
        linktest(it);
        var oldid = $(it.node, "id");
        if (oldid) {
          $(it.node, {
            id: it.id
          });
          ids.push({
            old: oldid,
            id: it.id
          });
        }
      }
      for (i = 0, ii = ids.length; i < ii; i++) {
        var fs = uses[ids[i].old];
        if (fs) {
          for (var j = 0, jj = fs.length; j < jj; j++) {
            fs[j](ids[i].id);
          }
        }
      }
    }
/*\
     * Element.clone
     [ method ]
     **
     * Creates a clone of the element and inserts it after the element
     **
     = (Element) the clone
    \*/
    elproto.clone = function () {
      var clone = wrap(this.node.cloneNode(true));
      if ($(clone.node, "id")) {
        $(clone.node, {
          id: clone.id
        });
      }
      fixids(clone);
      clone.insertAfter(this);
      return clone;
    };
/*\
     * Element.toDefs
     [ method ]
     **
     * Moves element to the shared `<defs>` area
     **
     = (Element) the element
    \*/
    elproto.toDefs = function () {
      var defs = getSomeDefs(this);
      defs.appendChild(this.node);
      return this;
    };
/*\
     * Element.toPattern
     [ method ]
     **
     * Creates a `<pattern>` element from the current element
     **
     * To create a pattern you have to specify the pattern rect:
     - x (string|number)
     - y (string|number)
     - width (string|number)
     - height (string|number)
     = (Element) the `<pattern>` element
     * You can use pattern later on as an argument for `fill` attribute:
     | var p = paper.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
     |         fill: "none",
     |         stroke: "#bada55",
     |         strokeWidth: 5
     |     }).pattern(0, 0, 10, 10),
     |     c = paper.circle(200, 200, 100);
     | c.attr({
     |     fill: p
     | });
    \*/
    elproto.pattern = elproto.toPattern = function (x, y, width, height) {
      var p = make("pattern", getSomeDefs(this));
      if (x == null) {
        x = this.getBBox();
      }
      if (is(x, "object") && "x" in x) {
        y = x.y;
        width = x.width;
        height = x.height;
        x = x.x;
      }
      $(p.node, {
        x: x,
        y: y,
        width: width,
        height: height,
        patternUnits: "userSpaceOnUse",
        id: p.id,
        viewBox: [x, y, width, height].join(" ")
      });
      p.node.appendChild(this.node);
      return p;
    };
    // SIERRA Element.marker(): clarify what a reference point is. E.g., helps you offset the object from its edge such as when centering it over a path.
    // SIERRA Element.marker(): I suggest the method should accept default reference point values.  Perhaps centered with (refX = width/2) and (refY = height/2)? Also, couldn't it assume the element's current _width_ and _height_? And please specify what _x_ and _y_ mean: offsets? If so, from where?  Couldn't they also be assigned default values?
/*\
     * Element.marker
     [ method ]
     **
     * Creates a `<marker>` element from the current element
     **
     * To create a marker you have to specify the bounding rect and reference point:
     - x (number)
     - y (number)
     - width (number)
     - height (number)
     - refX (number)
     - refY (number)
     = (Element) the `<marker>` element
     * You can specify the marker later as an argument for `marker-start`, `marker-end`, `marker-mid`, and `marker` attributes. The `marker` attribute places the marker at every point along the path, and `marker-mid` places them at every point except the start and end.
    \*/
    // TODO add usage for markers
    elproto.marker = function (x, y, width, height, refX, refY) {
      var p = make("marker", getSomeDefs(this));
      if (x == null) {
        x = this.getBBox();
      }
      if (is(x, "object") && "x" in x) {
        y = x.y;
        width = x.width;
        height = x.height;
        refX = x.refX || x.cx;
        refY = x.refY || x.cy;
        x = x.x;
      }
      $(p.node, {
        viewBox: [x, y, width, height].join(" "),
        markerWidth: width,
        markerHeight: height,
        orient: "auto",
        refX: refX || 0,
        refY: refY || 0,
        id: p.id
      });
      p.node.appendChild(this.node);
      return p;
    };
    // animation


    function slice(from, to, f) {
      return function (arr) {
        var res = arr.slice(from, to);
        if (res.length == 1) {
          res = res[0];
        }
        return f ? f(res) : res;
      };
    }
    var Animation = function (attr, ms, easing, callback) {
      if (typeof easing == "function" && !easing.length) {
        callback = easing;
        easing = mina.linear;
      }
      this.attr = attr;
      this.dur = ms;
      easing && (this.easing = easing);
      callback && (this.callback = callback);
    };
    Snap._.Animation = Animation;
/*\
     * Snap.animation
     [ method ]
     **
     * Creates an animation object
     **
     - attr (object) attributes of final destination
     - duration (number) duration of the animation, in milliseconds
     - easing (function) #optional one of easing functions of @mina or custom one
     - callback (function) #optional callback function that fires when animation ends
     = (object) animation object
    \*/
    Snap.animation = function (attr, ms, easing, callback) {
      return new Animation(attr, ms, easing, callback);
    };
/*\
     * Element.inAnim
     [ method ]
     **
     * Returns a set of animations that may be able to manipulate the current element
     **
     = (object) in format:
     o {
     o     anim (object) animation object,
     o     mina (object) @mina object,
     o     curStatus (number) 0..1 — status of the animation: 0 — just started, 1 — just finished,
     o     status (function) gets or sets the status of the animation,
     o     stop (function) stops the animation
     o }
    \*/
    elproto.inAnim = function () {
      var el = this,
          res = [];
      for (var id in el.anims) if (el.anims[has](id)) {
        (function (a) {
          res.push({
            anim: new Animation(a._attrs, a.dur, a.easing, a._callback),
            mina: a,
            curStatus: a.status(),
            status: function (val) {
              return a.status(val);
            },
            stop: function () {
              a.stop();
            }
          });
        }(el.anims[id]));
      }
      return res;
    };
/*\
     * Snap.animate
     [ method ]
     **
     * Runs generic animation of one number into another with a caring function
     **
     - from (number|array) number or array of numbers
     - to (number|array) number or array of numbers
     - setter (function) caring function that accepts one number argument
     - duration (number) duration, in milliseconds
     - easing (function) #optional easing function from @mina or custom
     - callback (function) #optional callback function to execute when animation ends
     = (object) animation object in @mina format
     o {
     o     id (string) animation id, consider it read-only,
     o     duration (function) gets or sets the duration of the animation,
     o     easing (function) easing,
     o     speed (function) gets or sets the speed of the animation,
     o     status (function) gets or sets the status of the animation,
     o     stop (function) stops the animation
     o }
     | var rect = Snap().rect(0, 0, 10, 10);
     | Snap.animate(0, 10, function (val) {
     |     rect.attr({
     |         x: val
     |     });
     | }, 1000);
     | // in given context is equivalent to
     | rect.animate({x: 10}, 1000);
    \*/
    Snap.animate = function (from, to, setter, ms, easing, callback) {
      if (typeof easing == "function" && !easing.length) {
        callback = easing;
        easing = mina.linear;
      }
      var now = mina.time(),
          anim = mina(from, to, now, now + ms, mina.time, setter, easing);
      callback && eve.once("mina.finish." + anim.id, callback);
      return anim;
    };
/*\
     * Element.stop
     [ method ]
     **
     * Stops all the animations for the current element
     **
     = (Element) the current element
    \*/
    elproto.stop = function () {
      var anims = this.inAnim();
      for (var i = 0, ii = anims.length; i < ii; i++) {
        anims[i].stop();
      }
      return this;
    };
/*\
     * Element.animate
     [ method ]
     **
     * Animates the given attributes of the element
     **
     - attrs (object) key-value pairs of destination attributes
     - duration (number) duration of the animation in milliseconds
     - easing (function) #optional easing function from @mina or custom
     - callback (function) #optional callback function that executes when the animation ends
     = (Element) the current element
    \*/
    elproto.animate = function (attrs, ms, easing, callback) {
      if (typeof easing == "function" && !easing.length) {
        callback = easing;
        easing = mina.linear;
      }
      if (attrs instanceof Animation) {
        callback = attrs.callback;
        easing = attrs.easing;
        ms = attrs.dur;
        attrs = attrs.attr;
      }
      var fkeys = [],
          tkeys = [],
          keys = {},
          from, to, f, eq, el = this;
      for (var key in attrs) if (attrs[has](key)) {
        if (el.equal) {
          eq = el.equal(key, Str(attrs[key]));
          from = eq.from;
          to = eq.to;
          f = eq.f;
        } else {
          from = +el.attr(key);
          to = +attrs[key];
        }
        var len = is(from, "array") ? from.length : 1;
        keys[key] = slice(fkeys.length, fkeys.length + len, f);
        fkeys = fkeys.concat(from);
        tkeys = tkeys.concat(to);
      }
      var now = mina.time(),
          anim = mina(fkeys, tkeys, now, now + ms, mina.time, function (val) {
          var attr = {};
          for (var key in keys) if (keys[has](key)) {
            attr[key] = keys[key](val);
          }
          el.attr(attr);
        }, easing);
      el.anims[anim.id] = anim;
      anim._attrs = attrs;
      anim._callback = callback;
      eve("snap.animcreated." + el.id, anim);
      eve.once("mina.finish." + anim.id, function () {
        delete el.anims[anim.id];
        callback && callback.call(el);
      });
      eve.once("mina.stop." + anim.id, function () {
        delete el.anims[anim.id];
      });
      return el;
    };
    var eldata = {};
/*\
     * Element.data
     [ method ]
     **
     * Adds or retrieves given value associated with given key. (Don’t confuse
     * with `data-` attributes)
     *
     * See also @Element.removeData
     - key (string) key to store data
     - value (any) #optional value to store
     = (object) @Element
     * or, if value is not specified:
     = (any) value
     > Usage
     | for (var i = 0, i < 5, i++) {
     |     paper.circle(10 + 15 * i, 10, 10)
     |          .attr({fill: "#000"})
     |          .data("i", i)
     |          .click(function () {
     |             alert(this.data("i"));
     |          });
     | }
    \*/
    elproto.data = function (key, value) {
      var data = eldata[this.id] = eldata[this.id] || {};
      if (arguments.length == 0) {
        eve("snap.data.get." + this.id, this, data, null);
        return data;
      }
      if (arguments.length == 1) {
        if (Snap.is(key, "object")) {
          for (var i in key) if (key[has](i)) {
            this.data(i, key[i]);
          }
          return this;
        }
        eve("snap.data.get." + this.id, this, data[key], key);
        return data[key];
      }
      data[key] = value;
      eve("snap.data.set." + this.id, this, value, key);
      return this;
    };
/*\
     * Element.removeData
     [ method ]
     **
     * Removes value associated with an element by given key.
     * If key is not provided, removes all the data of the element.
     - key (string) #optional key
     = (object) @Element
    \*/
    elproto.removeData = function (key) {
      if (key == null) {
        eldata[this.id] = {};
      } else {
        eldata[this.id] && delete eldata[this.id][key];
      }
      return this;
    };
/*\
     * Element.outerSVG
     [ method ]
     **
     * Returns SVG code for the element, equivalent to HTML's `outerHTML`.
     *
     * See also @Element.innerSVG
     = (string) SVG code for the element
    \*/
/*\
     * Element.toString
     [ method ]
     **
     * See @Element.outerSVG
    \*/
    elproto.outerSVG = elproto.toString = toString(1);
/*\
     * Element.innerSVG
     [ method ]
     **
     * Returns SVG code for the element's contents, equivalent to HTML's `innerHTML`
     = (string) SVG code for the element
    \*/
    elproto.innerSVG = toString();

    function toString(type) {
      return function () {
        var res = type ? "<" + this.type : "",
            attr = this.node.attributes,
            chld = this.node.childNodes;
        if (type) {
          for (var i = 0, ii = attr.length; i < ii; i++) {
            res += " " + attr[i].name + '="' + attr[i].value.replace(/"/g, '\\"') + '"';
          }
        }
        if (chld.length) {
          type && (res += ">");
          for (i = 0, ii = chld.length; i < ii; i++) {
            if (chld[i].nodeType == 3) {
              res += chld[i].nodeValue;
            } else if (chld[i].nodeType == 1) {
              res += wrap(chld[i]).toString();
            }
          }
          type && (res += "</" + this.type + ">");
        } else {
          type && (res += "/>");
        }
        return res;
      };
    }
    elproto.toDataURL = function () {
      if (window && window.btoa) {
        var bb = this.getBBox(),
            svg = Snap.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>', {
            x: +bb.x.toFixed(3),
            y: +bb.y.toFixed(3),
            width: +bb.width.toFixed(3),
            height: +bb.height.toFixed(3),
            contents: this.outerSVG()
          });
        return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
      }
    };
/*\
     * Fragment.select
     [ method ]
     **
     * See @Element.select
    \*/
    Fragment.prototype.select = elproto.select;
/*\
     * Fragment.selectAll
     [ method ]
     **
     * See @Element.selectAll
    \*/
    Fragment.prototype.selectAll = elproto.selectAll;
  });

  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
    var objectToString = Object.prototype.toString,
        Str = String,
        math = Math,
        E = "";

    function Matrix(a, b, c, d, e, f) {
      if (b == null && objectToString.call(a) == "[object SVGMatrix]") {
        this.a = a.a;
        this.b = a.b;
        this.c = a.c;
        this.d = a.d;
        this.e = a.e;
        this.f = a.f;
        return;
      }
      if (a != null) {
        this.a = +a;
        this.b = +b;
        this.c = +c;
        this.d = +d;
        this.e = +e;
        this.f = +f;
      } else {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.e = 0;
        this.f = 0;
      }
    }(function (matrixproto) {
/*\
         * Matrix.add
         [ method ]
         **
         * Adds the given matrix to existing one
         - a (number)
         - b (number)
         - c (number)
         - d (number)
         - e (number)
         - f (number)
         * or
         - matrix (object) @Matrix
        \*/
      matrixproto.add = function (a, b, c, d, e, f) {
        var out = [
          [],
          [],
          []
        ],
            m = [
            [this.a, this.c, this.e],
            [this.b, this.d, this.f],
            [0, 0, 1]
            ],
            matrix = [
            [a, c, e],
            [b, d, f],
            [0, 0, 1]
            ],
            x, y, z, res;

        if (a && a instanceof Matrix) {
          matrix = [
            [a.a, a.c, a.e],
            [a.b, a.d, a.f],
            [0, 0, 1]
          ];
        }

        for (x = 0; x < 3; x++) {
          for (y = 0; y < 3; y++) {
            res = 0;
            for (z = 0; z < 3; z++) {
              res += m[x][z] * matrix[z][y];
            }
            out[x][y] = res;
          }
        }
        this.a = out[0][0];
        this.b = out[1][0];
        this.c = out[0][1];
        this.d = out[1][1];
        this.e = out[0][2];
        this.f = out[1][2];
        return this;
      };
/*\
         * Matrix.invert
         [ method ]
         **
         * Returns an inverted version of the matrix
         = (object) @Matrix
        \*/
      matrixproto.invert = function () {
        var me = this,
            x = me.a * me.d - me.b * me.c;
        return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
      };
/*\
         * Matrix.clone
         [ method ]
         **
         * Returns a copy of the matrix
         = (object) @Matrix
        \*/
      matrixproto.clone = function () {
        return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
      };
/*\
         * Matrix.translate
         [ method ]
         **
         * Translate the matrix
         - x (number) horizontal offset distance
         - y (number) vertical offset distance
        \*/
      matrixproto.translate = function (x, y) {
        return this.add(1, 0, 0, 1, x, y);
      };
/*\
         * Matrix.scale
         [ method ]
         **
         * Scales the matrix
         - x (number) amount to be scaled, with `1` resulting in no change
         - y (number) #optional amount to scale along the vertical axis. (Otherwise `x` applies to both axes.)
         - cx (number) #optional horizontal origin point from which to scale
         - cy (number) #optional vertical origin point from which to scale
         * Default cx, cy is the middle point of the element.
        \*/
      matrixproto.scale = function (x, y, cx, cy) {
        y == null && (y = x);
        (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
        this.add(x, 0, 0, y, 0, 0);
        (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
        return this;
      };
/*\
         * Matrix.rotate
         [ method ]
         **
         * Rotates the matrix
         - a (number) angle of rotation, in degrees
         - x (number) horizontal origin point from which to rotate
         - y (number) vertical origin point from which to rotate
        \*/
      matrixproto.rotate = function (a, x, y) {
        a = Snap.rad(a);
        x = x || 0;
        y = y || 0;
        var cos = +math.cos(a).toFixed(9),
            sin = +math.sin(a).toFixed(9);
        this.add(cos, sin, -sin, cos, x, y);
        return this.add(1, 0, 0, 1, -x, -y);
      };
/*\
         * Matrix.x
         [ method ]
         **
         * Returns x coordinate for given point after transformation described by the matrix. See also @Matrix.y
         - x (number)
         - y (number)
         = (number) x
        \*/
      matrixproto.x = function (x, y) {
        return x * this.a + y * this.c + this.e;
      };
/*\
         * Matrix.y
         [ method ]
         **
         * Returns y coordinate for given point after transformation described by the matrix. See also @Matrix.x
         - x (number)
         - y (number)
         = (number) y
        \*/
      matrixproto.y = function (x, y) {
        return x * this.b + y * this.d + this.f;
      };
      matrixproto.get = function (i) {
        return +this[Str.fromCharCode(97 + i)].toFixed(4);
      };
      matrixproto.toString = function () {
        return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")";
      };
      matrixproto.offset = function () {
        return [this.e.toFixed(4), this.f.toFixed(4)];
      };

      function norm(a) {
        return a[0] * a[0] + a[1] * a[1];
      }

      function normalize(a) {
        var mag = math.sqrt(norm(a));
        a[0] && (a[0] /= mag);
        a[1] && (a[1] /= mag);
      }
/*\
         * Matrix.determinant
         [ method ]
         **
         * Finds determinant of the given matrix.
         = (number) determinant
        \*/
      matrixproto.determinant = function () {
        return this.a * this.d - this.b * this.c;
      };
/*\
         * Matrix.split
         [ method ]
         **
         * Splits matrix into primitive transformations
         = (object) in format:
         o dx (number) translation by x
         o dy (number) translation by y
         o scalex (number) scale by x
         o scaley (number) scale by y
         o shear (number) shear
         o rotate (number) rotation in deg
         o isSimple (boolean) could it be represented via simple transformations
        \*/
      matrixproto.split = function () {
        var out = {};
        // translation
        out.dx = this.e;
        out.dy = this.f;

        // scale and shear
        var row = [
          [this.a, this.c],
          [this.b, this.d]
        ];
        out.scalex = math.sqrt(norm(row[0]));
        normalize(row[0]);

        out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
        row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

        out.scaley = math.sqrt(norm(row[1]));
        normalize(row[1]);
        out.shear /= out.scaley;

        if (this.determinant() < 0) {
          out.scalex = -out.scalex;
        }

        // rotation
        var sin = -row[0][1],
            cos = row[1][1];
        if (cos < 0) {
          out.rotate = Snap.deg(math.acos(cos));
          if (sin < 0) {
            out.rotate = 360 - out.rotate;
          }
        } else {
          out.rotate = Snap.deg(math.asin(sin));
        }

        out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
        out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
        out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
        return out;
      };
/*\
         * Matrix.toTransformString
         [ method ]
         **
         * Returns transform string that represents given matrix
         = (string) transform string
        \*/
      matrixproto.toTransformString = function (shorter) {
        var s = shorter || this.split();
        if (!+s.shear.toFixed(9)) {
          s.scalex = +s.scalex.toFixed(4);
          s.scaley = +s.scaley.toFixed(4);
          s.rotate = +s.rotate.toFixed(4);
          return (s.dx || s.dy ? "t" + [+s.dx.toFixed(4), +s.dy.toFixed(4)] : E) + (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) + (s.rotate ? "r" + [+s.rotate.toFixed(4), 0, 0] : E);
        } else {
          return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
        }
      };
    })(Matrix.prototype);
/*\
     * Snap.Matrix
     [ method ]
     **
     * Matrix constructor, extend on your own risk.
     * To create matrices use @Snap.matrix.
    \*/
    Snap.Matrix = Matrix;
/*\
     * Snap.matrix
     [ method ]
     **
     * Utility method
     **
     * Returns a matrix based on the given parameters
     - a (number)
     - b (number)
     - c (number)
     - d (number)
     - e (number)
     - f (number)
     * or
     - svgMatrix (SVGMatrix)
     = (object) @Matrix
    \*/
    Snap.matrix = function (a, b, c, d, e, f) {
      return new Matrix(a, b, c, d, e, f);
    };
  });
  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
    var has = "hasOwnProperty",
        make = Snap._.make,
        wrap = Snap._.wrap,
        is = Snap.is,
        getSomeDefs = Snap._.getSomeDefs,
        reURLValue = /^url\(#?([^)]+)\)$/,
        $ = Snap._.$,
        URL = Snap.url,
        Str = String,
        separator = Snap._.separator,
        E = "";
    // Attributes event handlers
    eve.on("snap.util.attr.mask", function (value) {
      if (value instanceof Element || value instanceof Fragment) {
        eve.stop();
        if (value instanceof Fragment && value.node.childNodes.length == 1) {
          value = value.node.firstChild;
          getSomeDefs(this).appendChild(value);
          value = wrap(value);
        }
        if (value.type == "mask") {
          var mask = value;
        } else {
          mask = make("mask", getSomeDefs(this));
          mask.node.appendChild(value.node);
        }!mask.node.id && $(mask.node, {
          id: mask.id
        });
        $(this.node, {
          mask: URL(mask.id)
        });
      }
    });
    (function (clipIt) {
      eve.on("snap.util.attr.clip", clipIt);
      eve.on("snap.util.attr.clip-path", clipIt);
      eve.on("snap.util.attr.clipPath", clipIt);
    }(function (value) {
      if (value instanceof Element || value instanceof Fragment) {
        eve.stop();
        if (value.type == "clipPath") {
          var clip = value;
        } else {
          clip = make("clipPath", getSomeDefs(this));
          clip.node.appendChild(value.node);
          !clip.node.id && $(clip.node, {
            id: clip.id
          });
        }
        $(this.node, {
          "clip-path": URL(clip.node.id || clip.id)
        });
      }
    }));

    function fillStroke(name) {
      return function (value) {
        eve.stop();
        if (value instanceof Fragment && value.node.childNodes.length == 1 && (value.node.firstChild.tagName == "radialGradient" || value.node.firstChild.tagName == "linearGradient" || value.node.firstChild.tagName == "pattern")) {
          value = value.node.firstChild;
          getSomeDefs(this).appendChild(value);
          value = wrap(value);
        }
        if (value instanceof Element) {
          if (value.type == "radialGradient" || value.type == "linearGradient" || value.type == "pattern") {
            if (!value.node.id) {
              $(value.node, {
                id: value.id
              });
            }
            var fill = URL(value.node.id);
          } else {
            fill = value.attr(name);
          }
        } else {
          fill = Snap.color(value);
          if (fill.error) {
            var grad = Snap(getSomeDefs(this).ownerSVGElement).gradient(value);
            if (grad) {
              if (!grad.node.id) {
                $(grad.node, {
                  id: grad.id
                });
              }
              fill = URL(grad.node.id);
            } else {
              fill = value;
            }
          } else {
            fill = Str(fill);
          }
        }
        var attrs = {};
        attrs[name] = fill;
        $(this.node, attrs);
        this.node.style[name] = E;
      };
    }
    eve.on("snap.util.attr.fill", fillStroke("fill"));
    eve.on("snap.util.attr.stroke", fillStroke("stroke"));
    var gradrg = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
    eve.on("snap.util.grad.parse", function parseGrad(string) {
      string = Str(string);
      var tokens = string.match(gradrg);
      if (!tokens) {
        return null;
      }
      var type = tokens[1],
          params = tokens[2],
          stops = tokens[3];
      params = params.split(/\s*,\s*/).map(function (el) {
        return +el == el ? +el : el;
      });
      if (params.length == 1 && params[0] == 0) {
        params = [];
      }
      stops = stops.split("-");
      stops = stops.map(function (el) {
        el = el.split(":");
        var out = {
          color: el[0]
        };
        if (el[1]) {
          out.offset = parseFloat(el[1]);
        }
        return out;
      });
      return {
        type: type,
        params: params,
        stops: stops
      };
    });

    eve.on("snap.util.attr.d", function (value) {
      eve.stop();
      if (is(value, "array") && is(value[0], "array")) {
        value = Snap.path.toString.call(value);
      }
      value = Str(value);
      if (value.match(/[ruo]/i)) {
        value = Snap.path.toAbsolute(value);
      }
      $(this.node, {
        d: value
      });
    })(-1);
    eve.on("snap.util.attr.#text", function (value) {
      eve.stop();
      value = Str(value);
      var txt = glob.doc.createTextNode(value);
      while (this.node.firstChild) {
        this.node.removeChild(this.node.firstChild);
      }
      this.node.appendChild(txt);
    })(-1);
    eve.on("snap.util.attr.path", function (value) {
      eve.stop();
      this.attr({
        d: value
      });
    })(-1);
    eve.on("snap.util.attr.class", function (value) {
      eve.stop();
      this.node.className.baseVal = value;
    })(-1);
    eve.on("snap.util.attr.viewBox", function (value) {
      var vb;
      if (is(value, "object") && "x" in value) {
        vb = [value.x, value.y, value.width, value.height].join(" ");
      } else if (is(value, "array")) {
        vb = value.join(" ");
      } else {
        vb = value;
      }
      $(this.node, {
        viewBox: vb
      });
      eve.stop();
    })(-1);
    eve.on("snap.util.attr.transform", function (value) {
      this.transform(value);
      eve.stop();
    })(-1);
    eve.on("snap.util.attr.r", function (value) {
      if (this.type == "rect") {
        eve.stop();
        $(this.node, {
          rx: value,
          ry: value
        });
      }
    })(-1);
    eve.on("snap.util.attr.textpath", function (value) {
      eve.stop();
      if (this.type == "text") {
        var id, tp, node;
        if (!value && this.textPath) {
          tp = this.textPath;
          while (tp.node.firstChild) {
            this.node.appendChild(tp.node.firstChild);
          }
          tp.remove();
          delete this.textPath;
          return;
        }
        if (is(value, "string")) {
          var defs = getSomeDefs(this),
              path = wrap(defs.parentNode).path(value);
          defs.appendChild(path.node);
          id = path.id;
          path.attr({
            id: id
          });
        } else {
          value = wrap(value);
          if (value instanceof Element) {
            id = value.attr("id");
            if (!id) {
              id = value.id;
              value.attr({
                id: id
              });
            }
          }
        }
        if (id) {
          tp = this.textPath;
          node = this.node;
          if (tp) {
            tp.attr({
              "xlink:href": "#" + id
            });
          } else {
            tp = $("textPath", {
              "xlink:href": "#" + id
            });
            while (node.firstChild) {
              tp.appendChild(node.firstChild);
            }
            node.appendChild(tp);
            this.textPath = wrap(tp);
          }
        }
      }
    })(-1);
    eve.on("snap.util.attr.text", function (value) {
      if (this.type == "text") {
        var i = 0,
            node = this.node,
            tuner = function (chunk) {
            var out = $("tspan");
            if (is(chunk, "array")) {
              for (var i = 0; i < chunk.length; i++) {
                out.appendChild(tuner(chunk[i]));
              }
            } else {
              out.appendChild(glob.doc.createTextNode(chunk));
            }
            out.normalize && out.normalize();
            return out;
            };
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        var tuned = tuner(value);
        while (tuned.firstChild) {
          node.appendChild(tuned.firstChild);
        }
      }
      eve.stop();
    })(-1);

    function setFontSize(value) {
      eve.stop();
      if (value == +value) {
        value += "px";
      }
      this.node.style.fontSize = value;
    }
    eve.on("snap.util.attr.fontSize", setFontSize)(-1);
    eve.on("snap.util.attr.font-size", setFontSize)(-1);


    eve.on("snap.util.getattr.transform", function () {
      eve.stop();
      return this.transform();
    })(-1);
    eve.on("snap.util.getattr.textpath", function () {
      eve.stop();
      return this.textPath;
    })(-1);
    // Markers
    (function () {
      function getter(end) {
        return function () {
          eve.stop();
          var style = glob.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + end);
          if (style == "none") {
            return style;
          } else {
            return Snap(glob.doc.getElementById(style.match(reURLValue)[1]));
          }
        };
      }

      function setter(end) {
        return function (value) {
          eve.stop();
          var name = "marker" + end.charAt(0).toUpperCase() + end.substring(1);
          if (value == "" || !value) {
            this.node.style[name] = "none";
            return;
          }
          if (value.type == "marker") {
            var id = value.node.id;
            if (!id) {
              $(value.node, {
                id: value.id
              });
            }
            this.node.style[name] = URL(id);
            return;
          }
        };
      }
      eve.on("snap.util.getattr.marker-end", getter("end"))(-1);
      eve.on("snap.util.getattr.markerEnd", getter("end"))(-1);
      eve.on("snap.util.getattr.marker-start", getter("start"))(-1);
      eve.on("snap.util.getattr.markerStart", getter("start"))(-1);
      eve.on("snap.util.getattr.marker-mid", getter("mid"))(-1);
      eve.on("snap.util.getattr.markerMid", getter("mid"))(-1);
      eve.on("snap.util.attr.marker-end", setter("end"))(-1);
      eve.on("snap.util.attr.markerEnd", setter("end"))(-1);
      eve.on("snap.util.attr.marker-start", setter("start"))(-1);
      eve.on("snap.util.attr.markerStart", setter("start"))(-1);
      eve.on("snap.util.attr.marker-mid", setter("mid"))(-1);
      eve.on("snap.util.attr.markerMid", setter("mid"))(-1);
    }());
    eve.on("snap.util.getattr.r", function () {
      if (this.type == "rect" && $(this.node, "rx") == $(this.node, "ry")) {
        eve.stop();
        return $(this.node, "rx");
      }
    })(-1);

    function textExtract(node) {
      var out = [];
      var children = node.childNodes;
      for (var i = 0, ii = children.length; i < ii; i++) {
        var chi = children[i];
        if (chi.nodeType == 3) {
          out.push(chi.nodeValue);
        }
        if (chi.tagName == "tspan") {
          if (chi.childNodes.length == 1 && chi.firstChild.nodeType == 3) {
            out.push(chi.firstChild.nodeValue);
          } else {
            out.push(textExtract(chi));
          }
        }
      }
      return out;
    }
    eve.on("snap.util.getattr.text", function () {
      if (this.type == "text" || this.type == "tspan") {
        eve.stop();
        var out = textExtract(this.node);
        return out.length == 1 ? out[0] : out;
      }
    })(-1);
    eve.on("snap.util.getattr.#text", function () {
      return this.node.textContent;
    })(-1);
    eve.on("snap.util.getattr.viewBox", function () {
      eve.stop();
      var vb = $(this.node, "viewBox");
      if (vb) {
        vb = vb.split(separator);
        return Snap._.box(+vb[0], +vb[1], +vb[2], +vb[3]);
      } else {
        return;
      }
    })(-1);
    eve.on("snap.util.getattr.points", function () {
      var p = $(this.node, "points");
      eve.stop();
      if (p) {
        return p.split(separator);
      } else {
        return;
      }
    })(-1);
    eve.on("snap.util.getattr.path", function () {
      var p = $(this.node, "d");
      eve.stop();
      return p;
    })(-1);
    eve.on("snap.util.getattr.class", function () {
      return this.node.className.baseVal;
    })(-1);

    function getFontSize() {
      eve.stop();
      return this.node.style.fontSize;
    }
    eve.on("snap.util.getattr.fontSize", getFontSize)(-1);
    eve.on("snap.util.getattr.font-size", getFontSize)(-1);
  });

  // Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
    var rgNotSpace = /\S+/g,
        rgBadSpace = /[\t\r\n\f]/g,
        rgTrim = /(^\s+|\s+$)/g,
        Str = String,
        elproto = Element.prototype;
/*\
     * Element.addClass
     [ method ]
     **
     * Adds given class name or list of class names to the element.
     - value (string) class name or space separated list of class names
     **
     = (Element) original element.
    \*/
    elproto.addClass = function (value) {
      var classes = Str(value || "").match(rgNotSpace) || [],
          elem = this.node,
          className = elem.className.baseVal,
          curClasses = className.match(rgNotSpace) || [],
          j, pos, clazz, finalValue;

      if (classes.length) {
        j = 0;
        while ((clazz = classes[j++])) {
          pos = curClasses.indexOf(clazz);
          if (!~pos) {
            curClasses.push(clazz);
          }
        }

        finalValue = curClasses.join(" ");
        if (className != finalValue) {
          elem.className.baseVal = finalValue;
        }
      }
      return this;
    };
/*\
     * Element.removeClass
     [ method ]
     **
     * Removes given class name or list of class names from the element.
     - value (string) class name or space separated list of class names
     **
     = (Element) original element.
    \*/
    elproto.removeClass = function (value) {
      var classes = Str(value || "").match(rgNotSpace) || [],
          elem = this.node,
          className = elem.className.baseVal,
          curClasses = className.match(rgNotSpace) || [],
          j, pos, clazz, finalValue;
      if (curClasses.length) {
        j = 0;
        while ((clazz = classes[j++])) {
          pos = curClasses.indexOf(clazz);
          if (~pos) {
            curClasses.splice(pos, 1);
          }
        }

        finalValue = curClasses.join(" ");
        if (className != finalValue) {
          elem.className.baseVal = finalValue;
        }
      }
      return this;
    };
/*\
     * Element.hasClass
     [ method ]
     **
     * Checks if the element has a given class name in the list of class names applied to it.
     - value (string) class name
     **
     = (boolean) `true` if the element has given class
    \*/
    elproto.hasClass = function (value) {
      var elem = this.node,
          className = elem.className.baseVal,
          curClasses = className.match(rgNotSpace) || [];
      return !!~curClasses.indexOf(value);
    };
/*\
     * Element.toggleClass
     [ method ]
     **
     * Add or remove one or more classes from the element, depending on either
     * the class’s presence or the value of the `flag` argument.
     - value (string) class name or space separated list of class names
     - flag (boolean) value to determine whether the class should be added or removed
     **
     = (Element) original element.
    \*/
    elproto.toggleClass = function (value, flag) {
      if (flag != null) {
        if (flag) {
          return this.addClass(value);
        } else {
          return this.removeClass(value);
        }
      }
      var classes = (value || "").match(rgNotSpace) || [],
          elem = this.node,
          className = elem.className.baseVal,
          curClasses = className.match(rgNotSpace) || [],
          j, pos, clazz, finalValue;
      j = 0;
      while ((clazz = classes[j++])) {
        pos = curClasses.indexOf(clazz);
        if (~pos) {
          curClasses.splice(pos, 1);
        } else {
          curClasses.push(clazz);
        }
      }

      finalValue = curClasses.join(" ");
      if (className != finalValue) {
        elem.className.baseVal = finalValue;
      }
      return this;
    };
  });

  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
    var operators = {
      "+": function (x, y) {
        return x + y;
      },
      "-": function (x, y) {
        return x - y;
      },
      "/": function (x, y) {
        return x / y;
      },
      "*": function (x, y) {
        return x * y;
      }
    },
        Str = String,
        reUnit = /[a-z]+$/i,
        reAddon = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;

    function getNumber(val) {
      return val;
    }

    function getUnit(unit) {
      return function (val) {
        return +val.toFixed(3) + unit;
      };
    }
    eve.on("snap.util.attr", function (val) {
      var plus = Str(val).match(reAddon);
      if (plus) {
        var evnt = eve.nt(),
            name = evnt.substring(evnt.lastIndexOf(".") + 1),
            a = this.attr(name),
            atr = {};
        eve.stop();
        var unit = plus[3] || "",
            aUnit = a.match(reUnit),
            op = operators[plus[1]];
        if (aUnit && aUnit == unit) {
          val = op(parseFloat(a), +plus[2]);
        } else {
          a = this.asPX(name);
          val = op(this.asPX(name), this.asPX(name, plus[2] + unit));
        }
        if (isNaN(a) || isNaN(val)) {
          return;
        }
        atr[name] = val;
        this.attr(atr);
      }
    })(-10);
    eve.on("snap.util.equal", function (name, b) {
      var A, B, a = Str(this.attr(name) || ""),
          el = this,
          bplus = Str(b).match(reAddon);
      if (bplus) {
        eve.stop();
        var unit = bplus[3] || "",
            aUnit = a.match(reUnit),
            op = operators[bplus[1]];
        if (aUnit && aUnit == unit) {
          return {
            from: parseFloat(a),
            to: op(parseFloat(a), +bplus[2]),
            f: getUnit(aUnit)
          };
        } else {
          a = this.asPX(name);
          return {
            from: a,
            to: op(a, this.asPX(name, bplus[2] + unit)),
            f: getNumber
          };
        }
      }
    })(-10);
  });
  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
    var proto = Paper.prototype,
        is = Snap.is;
/*\
     * Paper.rect
     [ method ]
     *
     * Draws a rectangle
     **
     - x (number) x coordinate of the top left corner
     - y (number) y coordinate of the top left corner
     - width (number) width
     - height (number) height
     - rx (number) #optional horizontal radius for rounded corners, default is 0
     - ry (number) #optional vertical radius for rounded corners, default is rx or 0
     = (object) the `rect` element
     **
     > Usage
     | // regular rectangle
     | var c = paper.rect(10, 10, 50, 50);
     | // rectangle with rounded corners
     | var c = paper.rect(40, 40, 50, 50, 10);
    \*/
    proto.rect = function (x, y, w, h, rx, ry) {
      var attr;
      if (ry == null) {
        ry = rx;
      }
      if (is(x, "object") && x == "[object Object]") {
        attr = x;
      } else if (x != null) {
        attr = {
          x: x,
          y: y,
          width: w,
          height: h
        };
        if (rx != null) {
          attr.rx = rx;
          attr.ry = ry;
        }
      }
      return this.el("rect", attr);
    };
/*\
     * Paper.circle
     [ method ]
     **
     * Draws a circle
     **
     - x (number) x coordinate of the centre
     - y (number) y coordinate of the centre
     - r (number) radius
     = (object) the `circle` element
     **
     > Usage
     | var c = paper.circle(50, 50, 40);
    \*/
    proto.circle = function (cx, cy, r) {
      var attr;
      if (is(cx, "object") && cx == "[object Object]") {
        attr = cx;
      } else if (cx != null) {
        attr = {
          cx: cx,
          cy: cy,
          r: r
        };
      }
      return this.el("circle", attr);
    };

    var preload = (function () {
      function onerror() {
        this.parentNode.removeChild(this);
      }
      return function (src, f) {
        var img = glob.doc.createElement("img"),
            body = glob.doc.body;
        img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        img.onload = function () {
          f.call(img);
          img.onload = img.onerror = null;
          body.removeChild(img);
        };
        img.onerror = onerror;
        body.appendChild(img);
        img.src = src;
      };
    }());

/*\
     * Paper.image
     [ method ]
     **
     * Places an image on the surface
     **
     - src (string) URI of the source image
     - x (number) x offset position
     - y (number) y offset position
     - width (number) width of the image
     - height (number) height of the image
     = (object) the `image` element
     * or
     = (object) Snap element object with type `image`
     **
     > Usage
     | var c = paper.image("apple.png", 10, 10, 80, 80);
    \*/
    proto.image = function (src, x, y, width, height) {
      var el = this.el("image");
      if (is(src, "object") && "src" in src) {
        el.attr(src);
      } else if (src != null) {
        var set = {
          "xlink:href": src,
          preserveAspectRatio: "none"
        };
        if (x != null && y != null) {
          set.x = x;
          set.y = y;
        }
        if (width != null && height != null) {
          set.width = width;
          set.height = height;
        } else {
          preload(src, function () {
            Snap._.$(el.node, {
              width: this.offsetWidth,
              height: this.offsetHeight
            });
          });
        }
        Snap._.$(el.node, set);
      }
      return el;
    };
/*\
     * Paper.ellipse
     [ method ]
     **
     * Draws an ellipse
     **
     - x (number) x coordinate of the centre
     - y (number) y coordinate of the centre
     - rx (number) horizontal radius
     - ry (number) vertical radius
     = (object) the `ellipse` element
     **
     > Usage
     | var c = paper.ellipse(50, 50, 40, 20);
    \*/
    proto.ellipse = function (cx, cy, rx, ry) {
      var attr;
      if (is(cx, "object") && cx == "[object Object]") {
        attr = cx;
      } else if (cx != null) {
        attr = {
          cx: cx,
          cy: cy,
          rx: rx,
          ry: ry
        };
      }
      return this.el("ellipse", attr);
    };
    // SIERRA Paper.path(): Unclear from the link what a Catmull-Rom curveto is, and why it would make life any easier.
/*\
     * Paper.path
     [ method ]
     **
     * Creates a `<path>` element using the given string as the path's definition
     - pathString (string) #optional path string in SVG format
     * Path string consists of one-letter commands, followed by comma seprarated arguments in numerical form. Example:
     | "M10,20L30,40"
     * This example features two commands: `M`, with arguments `(10, 20)` and `L` with arguments `(30, 40)`. Uppercase letter commands express coordinates in absolute terms, while lowercase commands express them in relative terms from the most recently declared coordinates.
     *
     # <p>Here is short list of commands available, for more details see <a href="http://www.w3.org/TR/SVG/paths.html#PathData" title="Details of a path's data attribute's format are described in the SVG specification.">SVG path string format</a> or <a href="https://developer.mozilla.org/en/SVG/Tutorial/Paths">article about path strings at MDN</a>.</p>
     # <table><thead><tr><th>Command</th><th>Name</th><th>Parameters</th></tr></thead><tbody>
     # <tr><td>M</td><td>moveto</td><td>(x y)+</td></tr>
     # <tr><td>Z</td><td>closepath</td><td>(none)</td></tr>
     # <tr><td>L</td><td>lineto</td><td>(x y)+</td></tr>
     # <tr><td>H</td><td>horizontal lineto</td><td>x+</td></tr>
     # <tr><td>V</td><td>vertical lineto</td><td>y+</td></tr>
     # <tr><td>C</td><td>curveto</td><td>(x1 y1 x2 y2 x y)+</td></tr>
     # <tr><td>S</td><td>smooth curveto</td><td>(x2 y2 x y)+</td></tr>
     # <tr><td>Q</td><td>quadratic Bézier curveto</td><td>(x1 y1 x y)+</td></tr>
     # <tr><td>T</td><td>smooth quadratic Bézier curveto</td><td>(x y)+</td></tr>
     # <tr><td>A</td><td>elliptical arc</td><td>(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+</td></tr>
     # <tr><td>R</td><td><a href="http://en.wikipedia.org/wiki/Catmull–Rom_spline#Catmull.E2.80.93Rom_spline">Catmull-Rom curveto</a>*</td><td>x1 y1 (x y)+</td></tr></tbody></table>
     * * _Catmull-Rom curveto_ is a not standard SVG command and added to make life easier.
     * Note: there is a special case when a path consists of only three commands: `M10,10R…z`. In this case the path connects back to its starting point.
     > Usage
     | var c = paper.path("M10 10L90 90");
     | // draw a diagonal line:
     | // move to 10,10, line to 90,90
    \*/
    proto.path = function (d) {
      var attr;
      if (is(d, "object") && !is(d, "array")) {
        attr = d;
      } else if (d) {
        attr = {
          d: d
        };
      }
      return this.el("path", attr);
    };
/*\
     * Paper.g
     [ method ]
     **
     * Creates a group element
     **
     - varargs (…) #optional elements to nest within the group
     = (object) the `g` element
     **
     > Usage
     | var c1 = paper.circle(),
     |     c2 = paper.rect(),
     |     g = paper.g(c2, c1); // note that the order of elements is different
     * or
     | var c1 = paper.circle(),
     |     c2 = paper.rect(),
     |     g = paper.g();
     | g.add(c2, c1);
    \*/
/*\
     * Paper.group
     [ method ]
     **
     * See @Paper.g
    \*/
    proto.group = proto.g = function (first) {
      var attr, el = this.el("g");
      if (arguments.length == 1 && first && !first.type) {
        el.attr(first);
      } else if (arguments.length) {
        el.add(Array.prototype.slice.call(arguments, 0));
      }
      return el;
    };
/*\
     * Paper.svg
     [ method ]
     **
     * Creates a nested SVG element.
     - x (number) @optional X of the element
     - y (number) @optional Y of the element
     - width (number) @optional width of the element
     - height (number) @optional height of the element
     - vbx (number) @optional viewbox X
     - vby (number) @optional viewbox Y
     - vbw (number) @optional viewbox width
     - vbh (number) @optional viewbox height
     **
     = (object) the `svg` element
     **
    \*/
    proto.svg = function (x, y, width, height, vbx, vby, vbw, vbh) {
      var attrs = {};
      if (is(x, "object") && y == null) {
        attrs = x;
      } else {
        if (x != null) {
          attrs.x = x;
        }
        if (y != null) {
          attrs.y = y;
        }
        if (width != null) {
          attrs.width = width;
        }
        if (height != null) {
          attrs.height = height;
        }
        if (vbx != null && vby != null && vbw != null && vbh != null) {
          attrs.viewBox = [vbx, vby, vbw, vbh];
        }
      }
      return this.el("svg", attrs);
    };
/*\
     * Paper.mask
     [ method ]
     **
     * Equivalent in behaviour to @Paper.g, except it’s a mask.
     **
     = (object) the `mask` element
     **
    \*/
    proto.mask = function (first) {
      var attr, el = this.el("mask");
      if (arguments.length == 1 && first && !first.type) {
        el.attr(first);
      } else if (arguments.length) {
        el.add(Array.prototype.slice.call(arguments, 0));
      }
      return el;
    };
/*\
     * Paper.ptrn
     [ method ]
     **
     * Equivalent in behaviour to @Paper.g, except it’s a pattern.
     - x (number) @optional X of the element
     - y (number) @optional Y of the element
     - width (number) @optional width of the element
     - height (number) @optional height of the element
     - vbx (number) @optional viewbox X
     - vby (number) @optional viewbox Y
     - vbw (number) @optional viewbox width
     - vbh (number) @optional viewbox height
     **
     = (object) the `pattern` element
     **
    \*/
    proto.ptrn = function (x, y, width, height, vx, vy, vw, vh) {
      if (is(x, "object")) {
        var attr = x;
      } else {
        attr = {
          patternUnits: "userSpaceOnUse"
        };
        if (x) {
          attr.x = x;
        }
        if (y) {
          attr.y = y;
        }
        if (width != null) {
          attr.width = width;
        }
        if (height != null) {
          attr.height = height;
        }
        if (vx != null && vy != null && vw != null && vh != null) {
          attr.viewBox = [vx, vy, vw, vh];
        } else {
          attr.viewBox = [x || 0, y || 0, width || 0, height || 0];
        }
      }
      return this.el("pattern", attr);
    };
/*\
     * Paper.use
     [ method ]
     **
     * Creates a <use> element.
     - id (string) @optional id of element to link
     * or
     - id (Element) @optional element to link
     **
     = (object) the `use` element
     **
    \*/
    proto.use = function (id) {
      if (id != null) {
        if (id instanceof Element) {
          if (!id.attr("id")) {
            id.attr({
              id: Snap._.id(id)
            });
          }
          id = id.attr("id");
        }
        if (String(id).charAt() == "#") {
          id = id.substring(1);
        }
        return this.el("use", {
          "xlink:href": "#" + id
        });
      } else {
        return Element.prototype.use.call(this);
      }
    };
/*\
     * Paper.symbol
     [ method ]
     **
     * Creates a <symbol> element.
     - vbx (number) @optional viewbox X
     - vby (number) @optional viewbox Y
     - vbw (number) @optional viewbox width
     - vbh (number) @optional viewbox height
     = (object) the `symbol` element
     **
    \*/
    proto.symbol = function (vx, vy, vw, vh) {
      var attr = {};
      if (vx != null && vy != null && vw != null && vh != null) {
        attr.viewBox = [vx, vy, vw, vh];
      }

      return this.el("symbol", attr);
    };
/*\
     * Paper.text
     [ method ]
     **
     * Draws a text string
     **
     - x (number) x coordinate position
     - y (number) y coordinate position
     - text (string|array) The text string to draw or array of strings to nest within separate `<tspan>` elements
     = (object) the `text` element
     **
     > Usage
     | var t1 = paper.text(50, 50, "Snap");
     | var t2 = paper.text(50, 50, ["S","n","a","p"]);
     | // Text path usage
     | t1.attr({textpath: "M10,10L100,100"});
     | // or
     | var pth = paper.path("M10,10L100,100");
     | t1.attr({textpath: pth});
    \*/
    proto.text = function (x, y, text) {
      var attr = {};
      if (is(x, "object")) {
        attr = x;
      } else if (x != null) {
        attr = {
          x: x,
          y: y,
          text: text || ""
        };
      }
      return this.el("text", attr);
    };
/*\
     * Paper.line
     [ method ]
     **
     * Draws a line
     **
     - x1 (number) x coordinate position of the start
     - y1 (number) y coordinate position of the start
     - x2 (number) x coordinate position of the end
     - y2 (number) y coordinate position of the end
     = (object) the `line` element
     **
     > Usage
     | var t1 = paper.line(50, 50, 100, 100);
    \*/
    proto.line = function (x1, y1, x2, y2) {
      var attr = {};
      if (is(x1, "object")) {
        attr = x1;
      } else if (x1 != null) {
        attr = {
          x1: x1,
          x2: x2,
          y1: y1,
          y2: y2
        };
      }
      return this.el("line", attr);
    };
/*\
     * Paper.polyline
     [ method ]
     **
     * Draws a polyline
     **
     - points (array) array of points
     * or
     - varargs (…) points
     = (object) the `polyline` element
     **
     > Usage
     | var p1 = paper.polyline([10, 10, 100, 100]);
     | var p2 = paper.polyline(10, 10, 100, 100);
    \*/
    proto.polyline = function (points) {
      if (arguments.length > 1) {
        points = Array.prototype.slice.call(arguments, 0);
      }
      var attr = {};
      if (is(points, "object") && !is(points, "array")) {
        attr = points;
      } else if (points != null) {
        attr = {
          points: points
        };
      }
      return this.el("polyline", attr);
    };
/*\
     * Paper.polygon
     [ method ]
     **
     * Draws a polygon. See @Paper.polyline
    \*/
    proto.polygon = function (points) {
      if (arguments.length > 1) {
        points = Array.prototype.slice.call(arguments, 0);
      }
      var attr = {};
      if (is(points, "object") && !is(points, "array")) {
        attr = points;
      } else if (points != null) {
        attr = {
          points: points
        };
      }
      return this.el("polygon", attr);
    };
    // gradients
    (function () {
      var $ = Snap._.$;
      // gradients' helpers


      function Gstops() {
        return this.selectAll("stop");
      }

      function GaddStop(color, offset) {
        var stop = $("stop"),
            attr = {
            offset: +offset + "%"
            };
        color = Snap.color(color);
        attr["stop-color"] = color.hex;
        if (color.opacity < 1) {
          attr["stop-opacity"] = color.opacity;
        }
        $(stop, attr);
        this.node.appendChild(stop);
        return this;
      }

      function GgetBBox() {
        if (this.type == "linearGradient") {
          var x1 = $(this.node, "x1") || 0,
              x2 = $(this.node, "x2") || 1,
              y1 = $(this.node, "y1") || 0,
              y2 = $(this.node, "y2") || 0;
          return Snap._.box(x1, y1, math.abs(x2 - x1), math.abs(y2 - y1));
        } else {
          var cx = this.node.cx || .5,
              cy = this.node.cy || .5,
              r = this.node.r || 0;
          return Snap._.box(cx - r, cy - r, r * 2, r * 2);
        }
      }

      function gradient(defs, str) {
        var grad = eve("snap.util.grad.parse", null, str).firstDefined(),
            el;
        if (!grad) {
          return null;
        }
        grad.params.unshift(defs);
        if (grad.type.toLowerCase() == "l") {
          el = gradientLinear.apply(0, grad.params);
        } else {
          el = gradientRadial.apply(0, grad.params);
        }
        if (grad.type != grad.type.toLowerCase()) {
          $(el.node, {
            gradientUnits: "userSpaceOnUse"
          });
        }
        var stops = grad.stops,
            len = stops.length,
            start = 0,
            j = 0;

        function seed(i, end) {
          var step = (end - start) / (i - j);
          for (var k = j; k < i; k++) {
            stops[k].offset = +(+start + step * (k - j)).toFixed(2);
          }
          j = i;
          start = end;
        }
        len--;
        for (var i = 0; i < len; i++) if ("offset" in stops[i]) {
          seed(i, stops[i].offset);
        }
        stops[len].offset = stops[len].offset || 100;
        seed(len, stops[len].offset);
        for (i = 0; i <= len; i++) {
          var stop = stops[i];
          el.addStop(stop.color, stop.offset);
        }
        return el;
      }

      function gradientLinear(defs, x1, y1, x2, y2) {
        var el = Snap._.make("linearGradient", defs);
        el.stops = Gstops;
        el.addStop = GaddStop;
        el.getBBox = GgetBBox;
        if (x1 != null) {
          $(el.node, {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
          });
        }
        return el;
      }

      function gradientRadial(defs, cx, cy, r, fx, fy) {
        var el = Snap._.make("radialGradient", defs);
        el.stops = Gstops;
        el.addStop = GaddStop;
        el.getBBox = GgetBBox;
        if (cx != null) {
          $(el.node, {
            cx: cx,
            cy: cy,
            r: r
          });
        }
        if (fx != null && fy != null) {
          $(el.node, {
            fx: fx,
            fy: fy
          });
        }
        return el;
      }
/*\
         * Paper.gradient
         [ method ]
         **
         * Creates a gradient element
         **
         - gradient (string) gradient descriptor
         > Gradient Descriptor
         * The gradient descriptor is an expression formatted as
         * follows: `<type>(<coords>)<colors>`.  The `<type>` can be
         * either linear or radial.  The uppercase `L` or `R` letters
         * indicate absolute coordinates offset from the SVG surface.
         * Lowercase `l` or `r` letters indicate coordinates
         * calculated relative to the element to which the gradient is
         * applied.  Coordinates specify a linear gradient vector as
         * `x1`, `y1`, `x2`, `y2`, or a radial gradient as `cx`, `cy`,
         * `r` and optional `fx`, `fy` specifying a focal point away
         * from the center of the circle. Specify `<colors>` as a list
         * of dash-separated CSS color values.  Each color may be
         * followed by a custom offset value, separated with a colon
         * character.
         > Examples
         * Linear gradient, relative from top-left corner to bottom-right
         * corner, from black through red to white:
         | var g = paper.gradient("l(0, 0, 1, 1)#000-#f00-#fff");
         * Linear gradient, absolute from (0, 0) to (100, 100), from black
         * through red at 25% to white:
         | var g = paper.gradient("L(0, 0, 100, 100)#000-#f00:25-#fff");
         * Radial gradient, relative from the center of the element with radius
         * half the width, from black to white:
         | var g = paper.gradient("r(0.5, 0.5, 0.5)#000-#fff");
         * To apply the gradient:
         | paper.circle(50, 50, 40).attr({
         |     fill: g
         | });
         = (object) the `gradient` element
        \*/
      proto.gradient = function (str) {
        return gradient(this.defs, str);
      };
      proto.gradientLinear = function (x1, y1, x2, y2) {
        return gradientLinear(this.defs, x1, y1, x2, y2);
      };
      proto.gradientRadial = function (cx, cy, r, fx, fy) {
        return gradientRadial(this.defs, cx, cy, r, fx, fy);
      };
/*\
         * Paper.toString
         [ method ]
         **
         * Returns SVG code for the @Paper
         = (string) SVG code for the @Paper
        \*/
      proto.toString = function () {
        var doc = this.node.ownerDocument,
            f = doc.createDocumentFragment(),
            d = doc.createElement("div"),
            svg = this.node.cloneNode(true),
            res;
        f.appendChild(d);
        d.appendChild(svg);
        Snap._.$(svg, {
          xmlns: "http://www.w3.org/2000/svg"
        });
        res = d.innerHTML;
        f.removeChild(f.firstChild);
        return res;
      };
/*\
         * Paper.toDataURL
         [ method ]
         **
         * Returns SVG code for the @Paper as Data URI string.
         = (string) Data URI string
        \*/
      proto.toDataURL = function () {
        if (window && window.btoa) {
          return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this)));
        }
      };
/*\
         * Paper.clear
         [ method ]
         **
         * Removes all child nodes of the paper, except <defs>.
        \*/
      proto.clear = function () {
        var node = this.node.firstChild,
            next;
        while (node) {
          next = node.nextSibling;
          if (node.tagName != "defs") {
            node.parentNode.removeChild(node);
          } else {
            proto.clear.call({
              node: node
            });
          }
          node = next;
        }
      };
    }());
  });

  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob) {
    var elproto = Element.prototype,
        is = Snap.is,
        clone = Snap._.clone,
        has = "hasOwnProperty",
        p2s = /,?([a-z]),?/gi,
        toFloat = parseFloat,
        math = Math,
        PI = math.PI,
        mmin = math.min,
        mmax = math.max,
        pow = math.pow,
        abs = math.abs;

    function paths(ps) {
      var p = paths.ps = paths.ps || {};
      if (p[ps]) {
        p[ps].sleep = 100;
      } else {
        p[ps] = {
          sleep: 100
        };
      }
      setTimeout(function () {
        for (var key in p) if (p[has](key) && key != ps) {
          p[key].sleep--;
          !p[key].sleep && delete p[key];
        }
      });
      return p[ps];
    }

    function box(x, y, width, height) {
      if (x == null) {
        x = y = width = height = 0;
      }
      if (y == null) {
        y = x.y;
        width = x.width;
        height = x.height;
        x = x.x;
      }
      return {
        x: x,
        y: y,
        width: width,
        w: width,
        height: height,
        h: height,
        x2: x + width,
        y2: y + height,
        cx: x + width / 2,
        cy: y + height / 2,
        r1: math.min(width, height) / 2,
        r2: math.max(width, height) / 2,
        r0: math.sqrt(width * width + height * height) / 2,
        path: rectPath(x, y, width, height),
        vb: [x, y, width, height].join(" ")
      };
    }

    function toString() {
      return this.join(",").replace(p2s, "$1");
    }

    function pathClone(pathArray) {
      var res = clone(pathArray);
      res.toString = toString;
      return res;
    }

    function getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
      if (length == null) {
        return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
      } else {
        return findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTotLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
      }
    }

    function getLengthFactory(istotal, subpath) {
      function O(val) {
        return +(+val).toFixed(3);
      }
      return Snap._.cacher(function (path, length, onlystart) {
        if (path instanceof Element) {
          path = path.attr("d");
        }
        path = path2curve(path);
        var x, y, p, l, sp = "",
            subpaths = {},
            point, len = 0;
        for (var i = 0, ii = path.length; i < ii; i++) {
          p = path[i];
          if (p[0] == "M") {
            x = +p[1];
            y = +p[2];
          } else {
            l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
            if (len + l > length) {
              if (subpath && !subpaths.start) {
                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                sp += ["C" + O(point.start.x), O(point.start.y), O(point.m.x), O(point.m.y), O(point.x), O(point.y)];
                if (onlystart) {
                  return sp;
                }
                subpaths.start = sp;
                sp = ["M" + O(point.x), O(point.y) + "C" + O(point.n.x), O(point.n.y), O(point.end.x), O(point.end.y), O(p[5]), O(p[6])].join();
                len += l;
                x = +p[5];
                y = +p[6];
                continue;
              }
              if (!istotal && !subpath) {
                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                return point;
              }
            }
            len += l;
            x = +p[5];
            y = +p[6];
          }
          sp += p.shift() + p;
        }
        subpaths.end = sp;
        point = istotal ? len : subpath ? subpaths : findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
        return point;
      }, null, Snap._.clone);
    }
    var getTotalLength = getLengthFactory(1),
        getPointAtLength = getLengthFactory(),
        getSubpathsAtLength = getLengthFactory(0, 1);

    function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
      var t1 = 1 - t,
          t13 = pow(t1, 3),
          t12 = pow(t1, 2),
          t2 = t * t,
          t3 = t2 * t,
          x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
          y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
          mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
          my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
          nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
          ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
          ax = t1 * p1x + t * c1x,
          ay = t1 * p1y + t * c1y,
          cx = t1 * c2x + t * p2x,
          cy = t1 * c2y + t * p2y,
          alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
      // (mx > nx || my < ny) && (alpha += 180);
      return {
        x: x,
        y: y,
        m: {
          x: mx,
          y: my
        },
        n: {
          x: nx,
          y: ny
        },
        start: {
          x: ax,
          y: ay
        },
        end: {
          x: cx,
          y: cy
        },
        alpha: alpha
      };
    }

    function bezierBBox(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
      if (!Snap.is(p1x, "array")) {
        p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
      }
      var bbox = curveDim.apply(null, p1x);
      return box(
      bbox.min.x, bbox.min.y, bbox.max.x - bbox.min.x, bbox.max.y - bbox.min.y);
    }

    function isPointInsideBBox(bbox, x, y) {
      return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
    }

    function isBBoxIntersect(bbox1, bbox2) {
      bbox1 = box(bbox1);
      bbox2 = box(bbox2);
      return isPointInsideBBox(bbox2, bbox1.x, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
    }

    function base3(t, p1, p2, p3, p4) {
      var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
          t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
      return t * t2 - 3 * p1 + 3 * p2;
    }

    function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
      if (z == null) {
        z = 1;
      }
      z = z > 1 ? 1 : z < 0 ? 0 : z;
      var z2 = z / 2,
          n = 12,
          Tvalues = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816],
          Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
          sum = 0;
      for (var i = 0; i < n; i++) {
        var ct = z2 * Tvalues[i] + z2,
            xbase = base3(ct, x1, x2, x3, x4),
            ybase = base3(ct, y1, y2, y3, y4),
            comb = xbase * xbase + ybase * ybase;
        sum += Cvalues[i] * math.sqrt(comb);
      }
      return z2 * sum;
    }

    function getTotLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
      if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
        return;
      }
      var t = 1,
          step = t / 2,
          t2 = t - step,
          l, e = .01;
      l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
      while (abs(l - ll) > e) {
        step /= 2;
        t2 += (l < ll ? 1 : -1) * step;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
      }
      return t2;
    }

    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
      if (
      mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) {
        return;
      }
      var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
          ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
          denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

      if (!denominator) {
        return;
      }
      var px = nx / denominator,
          py = ny / denominator,
          px2 = +px.toFixed(2),
          py2 = +py.toFixed(2);
      if (
      px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) {
        return;
      }
      return {
        x: px,
        y: py
      };
    }

    function inter(bez1, bez2) {
      return interHelper(bez1, bez2);
    }

    function interCount(bez1, bez2) {
      return interHelper(bez1, bez2, 1);
    }

    function interHelper(bez1, bez2, justCount) {
      var bbox1 = bezierBBox(bez1),
          bbox2 = bezierBBox(bez2);
      if (!isBBoxIntersect(bbox1, bbox2)) {
        return justCount ? 0 : [];
      }
      var l1 = bezlen.apply(0, bez1),
          l2 = bezlen.apply(0, bez2),
          n1 = ~~ (l1 / 8),
          n2 = ~~ (l2 / 8),
          dots1 = [],
          dots2 = [],
          xy = {},
          res = justCount ? 0 : [];
      for (var i = 0; i < n1 + 1; i++) {
        var p = findDotsAtSegment.apply(0, bez1.concat(i / n1));
        dots1.push({
          x: p.x,
          y: p.y,
          t: i / n1
        });
      }
      for (i = 0; i < n2 + 1; i++) {
        p = findDotsAtSegment.apply(0, bez2.concat(i / n2));
        dots2.push({
          x: p.x,
          y: p.y,
          t: i / n2
        });
      }
      for (i = 0; i < n1; i++) {
        for (var j = 0; j < n2; j++) {
          var di = dots1[i],
              di1 = dots1[i + 1],
              dj = dots2[j],
              dj1 = dots2[j + 1],
              ci = abs(di1.x - di.x) < .001 ? "y" : "x",
              cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
              is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
          if (is) {
            if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
              continue;
            }
            xy[is.x.toFixed(4)] = is.y.toFixed(4);
            var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
                t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
            if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
              if (justCount) {
                res++;
              } else {
                res.push({
                  x: is.x,
                  y: is.y,
                  t1: t1,
                  t2: t2
                });
              }
            }
          }
        }
      }
      return res;
    }

    function pathIntersection(path1, path2) {
      return interPathHelper(path1, path2);
    }

    function pathIntersectionNumber(path1, path2) {
      return interPathHelper(path1, path2, 1);
    }

    function interPathHelper(path1, path2, justCount) {
      path1 = path2curve(path1);
      path2 = path2curve(path2);
      var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2, res = justCount ? 0 : [];
      for (var i = 0, ii = path1.length; i < ii; i++) {
        var pi = path1[i];
        if (pi[0] == "M") {
          x1 = x1m = pi[1];
          y1 = y1m = pi[2];
        } else {
          if (pi[0] == "C") {
            bez1 = [x1, y1].concat(pi.slice(1));
            x1 = bez1[6];
            y1 = bez1[7];
          } else {
            bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
            x1 = x1m;
            y1 = y1m;
          }
          for (var j = 0, jj = path2.length; j < jj; j++) {
            var pj = path2[j];
            if (pj[0] == "M") {
              x2 = x2m = pj[1];
              y2 = y2m = pj[2];
            } else {
              if (pj[0] == "C") {
                bez2 = [x2, y2].concat(pj.slice(1));
                x2 = bez2[6];
                y2 = bez2[7];
              } else {
                bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                x2 = x2m;
                y2 = y2m;
              }
              var intr = interHelper(bez1, bez2, justCount);
              if (justCount) {
                res += intr;
              } else {
                for (var k = 0, kk = intr.length; k < kk; k++) {
                  intr[k].segment1 = i;
                  intr[k].segment2 = j;
                  intr[k].bez1 = bez1;
                  intr[k].bez2 = bez2;
                }
                res = res.concat(intr);
              }
            }
          }
        }
      }
      return res;
    }

    function isPointInsidePath(path, x, y) {
      var bbox = pathBBox(path);
      return isPointInsideBBox(bbox, x, y) && interPathHelper(path, [
        ["M", x, y],
        ["H", bbox.x2 + 10]
      ], 1) % 2 == 1;
    }

    function pathBBox(path) {
      var pth = paths(path);
      if (pth.bbox) {
        return clone(pth.bbox);
      }
      if (!path) {
        return box();
      }
      path = path2curve(path);
      var x = 0,
          y = 0,
          X = [],
          Y = [],
          p;
      for (var i = 0, ii = path.length; i < ii; i++) {
        p = path[i];
        if (p[0] == "M") {
          x = p[1];
          y = p[2];
          X.push(x);
          Y.push(y);
        } else {
          var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
          X = X.concat(dim.min.x, dim.max.x);
          Y = Y.concat(dim.min.y, dim.max.y);
          x = p[5];
          y = p[6];
        }
      }
      var xmin = mmin.apply(0, X),
          ymin = mmin.apply(0, Y),
          xmax = mmax.apply(0, X),
          ymax = mmax.apply(0, Y),
          bb = box(xmin, ymin, xmax - xmin, ymax - ymin);
      pth.bbox = clone(bb);
      return bb;
    }

    function rectPath(x, y, w, h, r) {
      if (r) {
        return [["M", +x + (+r), y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
      }
      var res = [
        ["M", x, y],
        ["l", w, 0],
        ["l", 0, h],
        ["l", -w, 0],
        ["z"]
      ];
      res.toString = toString;
      return res;
    }

    function ellipsePath(x, y, rx, ry, a) {
      if (a == null && ry == null) {
        ry = rx;
      }
      x = +x;
      y = +y;
      rx = +rx;
      ry = +ry;
      if (a != null) {
        var rad = Math.PI / 180,
            x1 = x + rx * Math.cos(-ry * rad),
            x2 = x + rx * Math.cos(-a * rad),
            y1 = y + rx * Math.sin(-ry * rad),
            y2 = y + rx * Math.sin(-a * rad),
            res = [
            ["M", x1, y1],
            ["A", rx, rx, 0, +(a - ry > 180), 0, x2, y2]
            ];
      } else {
        res = [
          ["M", x, y],
          ["m", 0, -ry],
          ["a", rx, ry, 0, 1, 1, 0, 2 * ry],
          ["a", rx, ry, 0, 1, 1, 0, -2 * ry],
          ["z"]
        ];
      }
      res.toString = toString;
      return res;
    }
    var unit2px = Snap._unit2px,
        getPath = {
        path: function (el) {
          return el.attr("path");
        },
        circle: function (el) {
          var attr = unit2px(el);
          return ellipsePath(attr.cx, attr.cy, attr.r);
        },
        ellipse: function (el) {
          var attr = unit2px(el);
          return ellipsePath(attr.cx || 0, attr.cy || 0, attr.rx, attr.ry);
        },
        rect: function (el) {
          var attr = unit2px(el);
          return rectPath(attr.x || 0, attr.y || 0, attr.width, attr.height, attr.rx, attr.ry);
        },
        image: function (el) {
          var attr = unit2px(el);
          return rectPath(attr.x || 0, attr.y || 0, attr.width, attr.height);
        },
        line: function (el) {
          return "M" + [el.attr("x1") || 0, el.attr("y1") || 0, el.attr("x2"), el.attr("y2")];
        },
        polyline: function (el) {
          return "M" + el.attr("points");
        },
        polygon: function (el) {
          return "M" + el.attr("points") + "z";
        },
        deflt: function (el) {
          var bbox = el.node.getBBox();
          return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
        }
        };

    function pathToRelative(pathArray) {
      var pth = paths(pathArray),
          lowerCase = String.prototype.toLowerCase;
      if (pth.rel) {
        return pathClone(pth.rel);
      }
      if (!Snap.is(pathArray, "array") || !Snap.is(pathArray && pathArray[0], "array")) {
        pathArray = Snap.parsePathString(pathArray);
      }
      var res = [],
          x = 0,
          y = 0,
          mx = 0,
          my = 0,
          start = 0;
      if (pathArray[0][0] == "M") {
        x = pathArray[0][1];
        y = pathArray[0][2];
        mx = x;
        my = y;
        start++;
        res.push(["M", x, y]);
      }
      for (var i = start, ii = pathArray.length; i < ii; i++) {
        var r = res[i] = [],
            pa = pathArray[i];
        if (pa[0] != lowerCase.call(pa[0])) {
          r[0] = lowerCase.call(pa[0]);
          switch (r[0]) {
          case "a":
            r[1] = pa[1];
            r[2] = pa[2];
            r[3] = pa[3];
            r[4] = pa[4];
            r[5] = pa[5];
            r[6] = +(pa[6] - x).toFixed(3);
            r[7] = +(pa[7] - y).toFixed(3);
            break;
          case "v":
            r[1] = +(pa[1] - y).toFixed(3);
            break;
          case "m":
            mx = pa[1];
            my = pa[2];
          default:
            for (var j = 1, jj = pa.length; j < jj; j++) {
              r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
            }
          }
        } else {
          r = res[i] = [];
          if (pa[0] == "m") {
            mx = pa[1] + x;
            my = pa[2] + y;
          }
          for (var k = 0, kk = pa.length; k < kk; k++) {
            res[i][k] = pa[k];
          }
        }
        var len = res[i].length;
        switch (res[i][0]) {
        case "z":
          x = mx;
          y = my;
          break;
        case "h":
          x += +res[i][len - 1];
          break;
        case "v":
          y += +res[i][len - 1];
          break;
        default:
          x += +res[i][len - 2];
          y += +res[i][len - 1];
        }
      }
      res.toString = toString;
      pth.rel = pathClone(res);
      return res;
    }

    function pathToAbsolute(pathArray) {
      var pth = paths(pathArray);
      if (pth.abs) {
        return pathClone(pth.abs);
      }
      if (!is(pathArray, "array") || !is(pathArray && pathArray[0], "array")) { // rough assumption
        pathArray = Snap.parsePathString(pathArray);
      }
      if (!pathArray || !pathArray.length) {
        return [["M", 0, 0]];
      }
      var res = [],
          x = 0,
          y = 0,
          mx = 0,
          my = 0,
          start = 0,
          pa0;
      if (pathArray[0][0] == "M") {
        x = +pathArray[0][1];
        y = +pathArray[0][2];
        mx = x;
        my = y;
        start++;
        res[0] = ["M", x, y];
      }
      var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
      for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
        res.push(r = []);
        pa = pathArray[i];
        pa0 = pa[0];
        if (pa0 != pa0.toUpperCase()) {
          r[0] = pa0.toUpperCase();
          switch (r[0]) {
          case "A":
            r[1] = pa[1];
            r[2] = pa[2];
            r[3] = pa[3];
            r[4] = pa[4];
            r[5] = pa[5];
            r[6] = +pa[6] + x;
            r[7] = +pa[7] + y;
            break;
          case "V":
            r[1] = +pa[1] + y;
            break;
          case "H":
            r[1] = +pa[1] + x;
            break;
          case "R":
            var dots = [x, y].concat(pa.slice(1));
            for (var j = 2, jj = dots.length; j < jj; j++) {
              dots[j] = +dots[j] + x;
              dots[++j] = +dots[j] + y;
            }
            res.pop();
            res = res.concat(catmullRom2bezier(dots, crz));
            break;
          case "O":
            res.pop();
            dots = ellipsePath(x, y, pa[1], pa[2]);
            dots.push(dots[0]);
            res = res.concat(dots);
            break;
          case "U":
            res.pop();
            res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
            r = ["U"].concat(res[res.length - 1].slice(-2));
            break;
          case "M":
            mx = +pa[1] + x;
            my = +pa[2] + y;
          default:
            for (j = 1, jj = pa.length; j < jj; j++) {
              r[j] = +pa[j] + ((j % 2) ? x : y);
            }
          }
        } else if (pa0 == "R") {
          dots = [x, y].concat(pa.slice(1));
          res.pop();
          res = res.concat(catmullRom2bezier(dots, crz));
          r = ["R"].concat(pa.slice(-2));
        } else if (pa0 == "O") {
          res.pop();
          dots = ellipsePath(x, y, pa[1], pa[2]);
          dots.push(dots[0]);
          res = res.concat(dots);
        } else if (pa0 == "U") {
          res.pop();
          res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
          r = ["U"].concat(res[res.length - 1].slice(-2));
        } else {
          for (var k = 0, kk = pa.length; k < kk; k++) {
            r[k] = pa[k];
          }
        }
        pa0 = pa0.toUpperCase();
        if (pa0 != "O") {
          switch (r[0]) {
          case "Z":
            x = +mx;
            y = +my;
            break;
          case "H":
            x = r[1];
            break;
          case "V":
            y = r[1];
            break;
          case "M":
            mx = r[r.length - 2];
            my = r[r.length - 1];
          default:
            x = r[r.length - 2];
            y = r[r.length - 1];
          }
        }
      }
      res.toString = toString;
      pth.abs = pathClone(res);
      return res;
    }

    function l2c(x1, y1, x2, y2) {
      return [x1, y1, x2, y2, x2, y2];
    }

    function q2c(x1, y1, ax, ay, x2, y2) {
      var _13 = 1 / 3,
          _23 = 2 / 3;
      return [
      _13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2];
    }

    function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
      // for more information of where this math came from visit:
      // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
      var _120 = PI * 120 / 180,
          rad = PI / 180 * (+angle || 0),
          res = [],
          xy, rotate = Snap._.cacher(function (x, y, rad) {
          var X = x * math.cos(rad) - y * math.sin(rad),
              Y = x * math.sin(rad) + y * math.cos(rad);
          return {
            x: X,
            y: Y
          };
        });
      if (!recursive) {
        xy = rotate(x1, y1, -rad);
        x1 = xy.x;
        y1 = xy.y;
        xy = rotate(x2, y2, -rad);
        x2 = xy.x;
        y2 = xy.y;
        var cos = math.cos(PI / 180 * angle),
            sin = math.sin(PI / 180 * angle),
            x = (x1 - x2) / 2,
            y = (y1 - y2) / 2;
        var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
        if (h > 1) {
          h = math.sqrt(h);
          rx = h * rx;
          ry = h * ry;
        }
        var rx2 = rx * rx,
            ry2 = ry * ry,
            k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
            cx = k * rx * y / ry + (x1 + x2) / 2,
            cy = k * -ry * x / rx + (y1 + y2) / 2,
            f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
            f2 = math.asin(((y2 - cy) / ry).toFixed(9));

        f1 = x1 < cx ? PI - f1 : f1;
        f2 = x2 < cx ? PI - f2 : f2;
        f1 < 0 && (f1 = PI * 2 + f1);
        f2 < 0 && (f2 = PI * 2 + f2);
        if (sweep_flag && f1 > f2) {
          f1 = f1 - PI * 2;
        }
        if (!sweep_flag && f2 > f1) {
          f2 = f2 - PI * 2;
        }
      } else {
        f1 = recursive[0];
        f2 = recursive[1];
        cx = recursive[2];
        cy = recursive[3];
      }
      var df = f2 - f1;
      if (abs(df) > _120) {
        var f2old = f2,
            x2old = x2,
            y2old = y2;
        f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
        x2 = cx + rx * math.cos(f2);
        y2 = cy + ry * math.sin(f2);
        res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
      }
      df = f2 - f1;
      var c1 = math.cos(f1),
          s1 = math.sin(f1),
          c2 = math.cos(f2),
          s2 = math.sin(f2),
          t = math.tan(df / 4),
          hx = 4 / 3 * rx * t,
          hy = 4 / 3 * ry * t,
          m1 = [x1, y1],
          m2 = [x1 + hx * s1, y1 - hy * c1],
          m3 = [x2 + hx * s2, y2 - hy * c2],
          m4 = [x2, y2];
      m2[0] = 2 * m1[0] - m2[0];
      m2[1] = 2 * m1[1] - m2[1];
      if (recursive) {
        return [m2, m3, m4].concat(res);
      } else {
        res = [m2, m3, m4].concat(res).join().split(",");
        var newres = [];
        for (var i = 0, ii = res.length; i < ii; i++) {
          newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
        }
        return newres;
      }
    }

    function findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
      var t1 = 1 - t;
      return {
        x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
        y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
      };
    }

    // Returns bounding box of cubic bezier curve.
    // Source: http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
    // Original version: NISHIO Hirokazu
    // Modifications: https://github.com/timo22345


    function curveDim(x0, y0, x1, y1, x2, y2, x3, y3) {
      var tvalues = [],
          bounds = [
          [],
          []
          ],
          a, b, c, t, t1, t2, b2ac, sqrtb2ac;
      for (var i = 0; i < 2; ++i) {
        if (i == 0) {
          b = 6 * x0 - 12 * x1 + 6 * x2;
          a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
          c = 3 * x1 - 3 * x0;
        } else {
          b = 6 * y0 - 12 * y1 + 6 * y2;
          a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
          c = 3 * y1 - 3 * y0;
        }
        if (abs(a) < 1e-12) {
          if (abs(b) < 1e-12) {
            continue;
          }
          t = -c / b;
          if (0 < t && t < 1) {
            tvalues.push(t);
          }
          continue;
        }
        b2ac = b * b - 4 * c * a;
        sqrtb2ac = math.sqrt(b2ac);
        if (b2ac < 0) {
          continue;
        }
        t1 = (-b + sqrtb2ac) / (2 * a);
        if (0 < t1 && t1 < 1) {
          tvalues.push(t1);
        }
        t2 = (-b - sqrtb2ac) / (2 * a);
        if (0 < t2 && t2 < 1) {
          tvalues.push(t2);
        }
      }

      var x, y, j = tvalues.length,
          jlen = j,
          mt;
      while (j--) {
        t = tvalues[j];
        mt = 1 - t;
        bounds[0][j] = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
        bounds[1][j] = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
      }

      bounds[0][jlen] = x0;
      bounds[1][jlen] = y0;
      bounds[0][jlen + 1] = x3;
      bounds[1][jlen + 1] = y3;
      bounds[0].length = bounds[1].length = jlen + 2;


      return {
        min: {
          x: mmin.apply(0, bounds[0]),
          y: mmin.apply(0, bounds[1])
        },
        max: {
          x: mmax.apply(0, bounds[0]),
          y: mmax.apply(0, bounds[1])
        }
      };
    }

    function path2curve(path, path2) {
      var pth = !path2 && paths(path);
      if (!path2 && pth.curve) {
        return pathClone(pth.curve);
      }
      var p = pathToAbsolute(path),
          p2 = path2 && pathToAbsolute(path2),
          attrs = {
          x: 0,
          y: 0,
          bx: 0,
          by: 0,
          X: 0,
          Y: 0,
          qx: null,
          qy: null
          },
          attrs2 = {
          x: 0,
          y: 0,
          bx: 0,
          by: 0,
          X: 0,
          Y: 0,
          qx: null,
          qy: null
          },
          processPath = function (path, d, pcom) {
          var nx, ny;
          if (!path) {
            return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
          }!(path[0] in {
            T: 1,
            Q: 1
          }) && (d.qx = d.qy = null);
          switch (path[0]) {
          case "M":
            d.X = path[1];
            d.Y = path[2];
            break;
          case "A":
            path = ["C"].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
            break;
          case "S":
            if (pcom == "C" || pcom == "S") { // In "S" case we have to take into account, if the previous command is C/S.
              nx = d.x * 2 - d.bx; // And reflect the previous
              ny = d.y * 2 - d.by; // command's control point relative to the current point.
            }
            else { // or some else or nothing
              nx = d.x;
              ny = d.y;
            }
            path = ["C", nx, ny].concat(path.slice(1));
            break;
          case "T":
            if (pcom == "Q" || pcom == "T") { // In "T" case we have to take into account, if the previous command is Q/T.
              d.qx = d.x * 2 - d.qx; // And make a reflection similar
              d.qy = d.y * 2 - d.qy; // to case "S".
            }
            else { // or something else or nothing
              d.qx = d.x;
              d.qy = d.y;
            }
            path = ["C"].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
            break;
          case "Q":
            d.qx = path[1];
            d.qy = path[2];
            path = ["C"].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
            break;
          case "L":
            path = ["C"].concat(l2c(d.x, d.y, path[1], path[2]));
            break;
          case "H":
            path = ["C"].concat(l2c(d.x, d.y, path[1], d.y));
            break;
          case "V":
            path = ["C"].concat(l2c(d.x, d.y, d.x, path[1]));
            break;
          case "Z":
            path = ["C"].concat(l2c(d.x, d.y, d.X, d.Y));
            break;
          }
          return path;
          },
          fixArc = function (pp, i) {
          if (pp[i].length > 7) {
            pp[i].shift();
            var pi = pp[i];
            while (pi.length) {
              pcoms1[i] = "A"; // if created multiple C:s, their original seg is saved
              p2 && (pcoms2[i] = "A"); // the same as above
              pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
            }
            pp.splice(i, 1);
            ii = mmax(p.length, p2 && p2.length || 0);
          }
          },
          fixM = function (path1, path2, a1, a2, i) {
          if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
            path2.splice(i, 0, ["M", a2.x, a2.y]);
            a1.bx = 0;
            a1.by = 0;
            a1.x = path1[i][1];
            a1.y = path1[i][2];
            ii = mmax(p.length, p2 && p2.length || 0);
          }
          },
          pcoms1 = [],
           // path commands of original path p
          pcoms2 = [],
           // path commands of original path p2
          pfirst = "",
           // temporary holder for original path command
          pcom = ""; // holder for previous path command of original path
      for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
        p[i] && (pfirst = p[i][0]); // save current path command
        if (pfirst != "C") // C is not saved yet, because it may be result of conversion
        {
          pcoms1[i] = pfirst; // Save current path command
          i && (pcom = pcoms1[i - 1]); // Get previous path command pcom
        }
        p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath
        if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
        // which may produce multiple C:s
        // so we have to make sure that C is also C in original path
        fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1
        if (p2) { // the same procedures is done to p2
          p2[i] && (pfirst = p2[i][0]);
          if (pfirst != "C") {
            pcoms2[i] = pfirst;
            i && (pcom = pcoms2[i - 1]);
          }
          p2[i] = processPath(p2[i], attrs2, pcom);

          if (pcoms2[i] != "A" && pfirst == "C") {
            pcoms2[i] = "C";
          }

          fixArc(p2, i);
        }
        fixM(p, p2, attrs, attrs2, i);
        fixM(p2, p, attrs2, attrs, i);
        var seg = p[i],
            seg2 = p2 && p2[i],
            seglen = seg.length,
            seg2len = p2 && seg2.length;
        attrs.x = seg[seglen - 2];
        attrs.y = seg[seglen - 1];
        attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
        attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
        attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
        attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
        attrs2.x = p2 && seg2[seg2len - 2];
        attrs2.y = p2 && seg2[seg2len - 1];
      }
      if (!p2) {
        pth.curve = pathClone(p);
      }
      return p2 ? [p, p2] : p;
    }

    function mapPath(path, matrix) {
      if (!matrix) {
        return path;
      }
      var x, y, i, j, ii, jj, pathi;
      path = path2curve(path);
      for (i = 0, ii = path.length; i < ii; i++) {
        pathi = path[i];
        for (j = 1, jj = pathi.length; j < jj; j += 2) {
          x = matrix.x(pathi[j], pathi[j + 1]);
          y = matrix.y(pathi[j], pathi[j + 1]);
          pathi[j] = x;
          pathi[j + 1] = y;
        }
      }
      return path;
    }

    // http://schepers.cc/getting-to-the-point


    function catmullRom2bezier(crp, z) {
      var d = [];
      for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
        var p = [{
          x: +crp[i - 2],
          y: +crp[i - 1]
        },
        {
          x: +crp[i],
          y: +crp[i + 1]
        },
        {
          x: +crp[i + 2],
          y: +crp[i + 3]
        },
        {
          x: +crp[i + 4],
          y: +crp[i + 5]
        }];
        if (z) {
          if (!i) {
            p[0] = {
              x: +crp[iLen - 2],
              y: +crp[iLen - 1]
            };
          } else if (iLen - 4 == i) {
            p[3] = {
              x: +crp[0],
              y: +crp[1]
            };
          } else if (iLen - 2 == i) {
            p[2] = {
              x: +crp[0],
              y: +crp[1]
            };
            p[3] = {
              x: +crp[2],
              y: +crp[3]
            };
          }
        } else {
          if (iLen - 4 == i) {
            p[3] = p[2];
          } else if (!i) {
            p[0] = {
              x: +crp[i],
              y: +crp[i + 1]
            };
          }
        }
        d.push(["C", (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y]);
      }

      return d;
    }

    // export
    Snap.path = paths;

/*\
     * Snap.path.getTotalLength
     [ method ]
     **
     * Returns the length of the given path in pixels
     **
     - path (string) SVG path string
     **
     = (number) length
    \*/
    Snap.path.getTotalLength = getTotalLength;
/*\
     * Snap.path.getPointAtLength
     [ method ]
     **
     * Returns the coordinates of the point located at the given length along the given path
     **
     - path (string) SVG path string
     - length (number) length, in pixels, from the start of the path, excluding non-rendering jumps
     **
     = (object) representation of the point:
     o {
     o     x: (number) x coordinate,
     o     y: (number) y coordinate,
     o     alpha: (number) angle of derivative
     o }
    \*/
    Snap.path.getPointAtLength = getPointAtLength;
/*\
     * Snap.path.getSubpath
     [ method ]
     **
     * Returns the subpath of a given path between given start and end lengths
     **
     - path (string) SVG path string
     - from (number) length, in pixels, from the start of the path to the start of the segment
     - to (number) length, in pixels, from the start of the path to the end of the segment
     **
     = (string) path string definition for the segment
    \*/
    Snap.path.getSubpath = function (path, from, to) {
      if (this.getTotalLength(path) - to < 1e-6) {
        return getSubpathsAtLength(path, from).end;
      }
      var a = getSubpathsAtLength(path, to, 1);
      return from ? getSubpathsAtLength(a, from).end : a;
    };
/*\
     * Element.getTotalLength
     [ method ]
     **
     * Returns the length of the path in pixels (only works for `path` elements)
     = (number) length
    \*/
    elproto.getTotalLength = function () {
      if (this.node.getTotalLength) {
        return this.node.getTotalLength();
      }
    };
    // SIERRA Element.getPointAtLength()/Element.getTotalLength(): If a <path> is broken into different segments, is the jump distance to the new coordinates set by the _M_ or _m_ commands calculated as part of the path's total length?
/*\
     * Element.getPointAtLength
     [ method ]
     **
     * Returns coordinates of the point located at the given length on the given path (only works for `path` elements)
     **
     - length (number) length, in pixels, from the start of the path, excluding non-rendering jumps
     **
     = (object) representation of the point:
     o {
     o     x: (number) x coordinate,
     o     y: (number) y coordinate,
     o     alpha: (number) angle of derivative
     o }
    \*/
    elproto.getPointAtLength = function (length) {
      return getPointAtLength(this.attr("d"), length);
    };
    // SIERRA Element.getSubpath(): Similar to the problem for Element.getPointAtLength(). Unclear how this would work for a segmented path. Overall, the concept of _subpath_ and what I'm calling a _segment_ (series of non-_M_ or _Z_ commands) is unclear.
/*\
     * Element.getSubpath
     [ method ]
     **
     * Returns subpath of a given element from given start and end lengths (only works for `path` elements)
     **
     - from (number) length, in pixels, from the start of the path to the start of the segment
     - to (number) length, in pixels, from the start of the path to the end of the segment
     **
     = (string) path string definition for the segment
    \*/
    elproto.getSubpath = function (from, to) {
      return Snap.path.getSubpath(this.attr("d"), from, to);
    };
    Snap._.box = box;
/*\
     * Snap.path.findDotsAtSegment
     [ method ]
     **
     * Utility method
     **
     * Finds dot coordinates on the given cubic beziér curve at the given t
     - p1x (number) x of the first point of the curve
     - p1y (number) y of the first point of the curve
     - c1x (number) x of the first anchor of the curve
     - c1y (number) y of the first anchor of the curve
     - c2x (number) x of the second anchor of the curve
     - c2y (number) y of the second anchor of the curve
     - p2x (number) x of the second point of the curve
     - p2y (number) y of the second point of the curve
     - t (number) position on the curve (0..1)
     = (object) point information in format:
     o {
     o     x: (number) x coordinate of the point,
     o     y: (number) y coordinate of the point,
     o     m: {
     o         x: (number) x coordinate of the left anchor,
     o         y: (number) y coordinate of the left anchor
     o     },
     o     n: {
     o         x: (number) x coordinate of the right anchor,
     o         y: (number) y coordinate of the right anchor
     o     },
     o     start: {
     o         x: (number) x coordinate of the start of the curve,
     o         y: (number) y coordinate of the start of the curve
     o     },
     o     end: {
     o         x: (number) x coordinate of the end of the curve,
     o         y: (number) y coordinate of the end of the curve
     o     },
     o     alpha: (number) angle of the curve derivative at the point
     o }
    \*/
    Snap.path.findDotsAtSegment = findDotsAtSegment;
/*\
     * Snap.path.bezierBBox
     [ method ]
     **
     * Utility method
     **
     * Returns the bounding box of a given cubic beziér curve
     - p1x (number) x of the first point of the curve
     - p1y (number) y of the first point of the curve
     - c1x (number) x of the first anchor of the curve
     - c1y (number) y of the first anchor of the curve
     - c2x (number) x of the second anchor of the curve
     - c2y (number) y of the second anchor of the curve
     - p2x (number) x of the second point of the curve
     - p2y (number) y of the second point of the curve
     * or
     - bez (array) array of six points for beziér curve
     = (object) bounding box
     o {
     o     x: (number) x coordinate of the left top point of the box,
     o     y: (number) y coordinate of the left top point of the box,
     o     x2: (number) x coordinate of the right bottom point of the box,
     o     y2: (number) y coordinate of the right bottom point of the box,
     o     width: (number) width of the box,
     o     height: (number) height of the box
     o }
    \*/
    Snap.path.bezierBBox = bezierBBox;
/*\
     * Snap.path.isPointInsideBBox
     [ method ]
     **
     * Utility method
     **
     * Returns `true` if given point is inside bounding box
     - bbox (string) bounding box
     - x (string) x coordinate of the point
     - y (string) y coordinate of the point
     = (boolean) `true` if point is inside
    \*/
    Snap.path.isPointInsideBBox = isPointInsideBBox;
    Snap.closest = function (x, y, X, Y) {
      var r = 100,
          b = box(x - r / 2, y - r / 2, r, r),
          inside = [],
          getter = X[0].hasOwnProperty("x") ?
          function (i) {
          return {
            x: X[i].x,
            y: X[i].y
          };
          } : function (i) {
          return {
            x: X[i],
            y: Y[i]
          };
          },
          found = 0;
      while (r <= 1e6 && !found) {
        for (var i = 0, ii = X.length; i < ii; i++) {
          var xy = getter(i);
          if (isPointInsideBBox(b, xy.x, xy.y)) {
            found++;
            inside.push(xy);
            break;
          }
        }
        if (!found) {
          r *= 2;
          b = box(x - r / 2, y - r / 2, r, r)
        }
      }
      if (r == 1e6) {
        return;
      }
      var len = Infinity,
          res;
      for (i = 0, ii = inside.length; i < ii; i++) {
        var l = Snap.len(x, y, inside[i].x, inside[i].y);
        if (len > l) {
          len = l;
          inside[i].len = l;
          res = inside[i];
        }
      }
      return res;
    };
/*\
     * Snap.path.isBBoxIntersect
     [ method ]
     **
     * Utility method
     **
     * Returns `true` if two bounding boxes intersect
     - bbox1 (string) first bounding box
     - bbox2 (string) second bounding box
     = (boolean) `true` if bounding boxes intersect
    \*/
    Snap.path.isBBoxIntersect = isBBoxIntersect;
/*\
     * Snap.path.intersection
     [ method ]
     **
     * Utility method
     **
     * Finds intersections of two paths
     - path1 (string) path string
     - path2 (string) path string
     = (array) dots of intersection
     o [
     o     {
     o         x: (number) x coordinate of the point,
     o         y: (number) y coordinate of the point,
     o         t1: (number) t value for segment of path1,
     o         t2: (number) t value for segment of path2,
     o         segment1: (number) order number for segment of path1,
     o         segment2: (number) order number for segment of path2,
     o         bez1: (array) eight coordinates representing beziér curve for the segment of path1,
     o         bez2: (array) eight coordinates representing beziér curve for the segment of path2
     o     }
     o ]
    \*/
    Snap.path.intersection = pathIntersection;
    Snap.path.intersectionNumber = pathIntersectionNumber;
/*\
     * Snap.path.isPointInside
     [ method ]
     **
     * Utility method
     **
     * Returns `true` if given point is inside a given closed path.
     *
     * Note: fill mode doesn’t affect the result of this method.
     - path (string) path string
     - x (number) x of the point
     - y (number) y of the point
     = (boolean) `true` if point is inside the path
    \*/
    Snap.path.isPointInside = isPointInsidePath;
/*\
     * Snap.path.getBBox
     [ method ]
     **
     * Utility method
     **
     * Returns the bounding box of a given path
     - path (string) path string
     = (object) bounding box
     o {
     o     x: (number) x coordinate of the left top point of the box,
     o     y: (number) y coordinate of the left top point of the box,
     o     x2: (number) x coordinate of the right bottom point of the box,
     o     y2: (number) y coordinate of the right bottom point of the box,
     o     width: (number) width of the box,
     o     height: (number) height of the box
     o }
    \*/
    Snap.path.getBBox = pathBBox;
    Snap.path.get = getPath;
/*\
     * Snap.path.toRelative
     [ method ]
     **
     * Utility method
     **
     * Converts path coordinates into relative values
     - path (string) path string
     = (array) path string
    \*/
    Snap.path.toRelative = pathToRelative;
/*\
     * Snap.path.toAbsolute
     [ method ]
     **
     * Utility method
     **
     * Converts path coordinates into absolute values
     - path (string) path string
     = (array) path string
    \*/
    Snap.path.toAbsolute = pathToAbsolute;
/*\
     * Snap.path.toCubic
     [ method ]
     **
     * Utility method
     **
     * Converts path to a new path where all segments are cubic beziér curves
     - pathString (string|array) path string or array of segments
     = (array) array of segments
    \*/
    Snap.path.toCubic = path2curve;
/*\
     * Snap.path.map
     [ method ]
     **
     * Transform the path string with the given matrix
     - path (string) path string
     - matrix (object) see @Matrix
     = (string) transformed path string
    \*/
    Snap.path.map = mapPath;
    Snap.path.toString = toString;
    Snap.path.clone = pathClone;
  });

  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob) {
    var mmax = Math.max,
        mmin = Math.min;

    // Set
    var Set = function (items) {
      this.items = [];
      this.bindings = {};
      this.length = 0;
      this.type = "set";
      if (items) {
        for (var i = 0, ii = items.length; i < ii; i++) {
          if (items[i]) {
            this[this.items.length] = this.items[this.items.length] = items[i];
            this.length++;
          }
        }
      }
    },
        setproto = Set.prototype;
/*\
     * Set.push
     [ method ]
     **
     * Adds each argument to the current set
     = (object) original element
    \*/
    setproto.push = function () {
      var item, len;
      for (var i = 0, ii = arguments.length; i < ii; i++) {
        item = arguments[i];
        if (item) {
          len = this.items.length;
          this[len] = this.items[len] = item;
          this.length++;
        }
      }
      return this;
    };
/*\
     * Set.pop
     [ method ]
     **
     * Removes last element and returns it
     = (object) element
    \*/
    setproto.pop = function () {
      this.length && delete this[this.length--];
      return this.items.pop();
    };
/*\
     * Set.forEach
     [ method ]
     **
     * Executes given function for each element in the set
     *
     * If the function returns `false`, the loop stops running.
     **
     - callback (function) function to run
     - thisArg (object) context object for the callback
     = (object) Set object
    \*/
    setproto.forEach = function (callback, thisArg) {
      for (var i = 0, ii = this.items.length; i < ii; i++) {
        if (callback.call(thisArg, this.items[i], i) === false) {
          return this;
        }
      }
      return this;
    };
/*\
     * Set.animate
     [ method ]
     **
     * Animates each element in set in sync.
     *
     **
     - attrs (object) key-value pairs of destination attributes
     - duration (number) duration of the animation in milliseconds
     - easing (function) #optional easing function from @mina or custom
     - callback (function) #optional callback function that executes when the animation ends
     * or
     - animation (array) array of animation parameter for each element in set in format `[attrs, duration, easing, callback]`
     > Usage
     | // animate all elements in set to radius 10
     | set.animate({r: 10}, 500, mina.easein);
     | // or
     | // animate first element to radius 10, but second to radius 20 and in different time
     | set.animate([{r: 10}, 500, mina.easein], [{r: 20}, 1500, mina.easein]);
     = (Element) the current element
    \*/
    setproto.animate = function (attrs, ms, easing, callback) {
      if (typeof easing == "function" && !easing.length) {
        callback = easing;
        easing = mina.linear;
      }
      if (attrs instanceof Snap._.Animation) {
        callback = attrs.callback;
        easing = attrs.easing;
        ms = easing.dur;
        attrs = attrs.attr;
      }
      var args = arguments;
      if (Snap.is(attrs, "array") && Snap.is(args[args.length - 1], "array")) {
        var each = true;
      }
      var begin, handler = function () {
        if (begin) {
          this.b = begin;
        } else {
          begin = this.b;
        }
      },
          cb = 0,
          set = this,
          callbacker = callback &&
          function () {
          if (++cb == set.length) {
            callback.call(this);
          }
          };
      return this.forEach(function (el, i) {
        eve.once("snap.animcreated." + el.id, handler);
        if (each) {
          args[i] && el.animate.apply(el, args[i]);
        } else {
          el.animate(attrs, ms, easing, callbacker);
        }
      });
    };
    setproto.remove = function () {
      while (this.length) {
        this.pop().remove();
      }
      return this;
    };
/*\
     * Set.bind
     [ method ]
     **
     * Specifies how to handle a specific attribute when applied
     * to a set.
     *
     **
     - attr (string) attribute name
     - callback (function) function to run
     * or
     - attr (string) attribute name
     - element (Element) specific element in the set to apply the attribute to
     * or
     - attr (string) attribute name
     - element (Element) specific element in the set to apply the attribute to
     - eattr (string) attribute on the element to bind the attribute to
     = (object) Set object
    \*/
    setproto.bind = function (attr, a, b) {
      var data = {};
      if (typeof a == "function") {
        this.bindings[attr] = a;
      } else {
        var aname = b || attr;
        this.bindings[attr] = function (v) {
          data[aname] = v;
          a.attr(data);
        };
      }
      return this;
    };
    setproto.attr = function (value) {
      var unbound = {};
      for (var k in value) {
        if (this.bindings[k]) {
          this.bindings[k](value[k]);
        } else {
          unbound[k] = value[k];
        }
      }
      for (var i = 0, ii = this.items.length; i < ii; i++) {
        this.items[i].attr(unbound);
      }
      return this;
    };
/*\
     * Set.clear
     [ method ]
     **
     * Removes all elements from the set
    \*/
    setproto.clear = function () {
      while (this.length) {
        this.pop();
      }
    };
/*\
     * Set.splice
     [ method ]
     **
     * Removes range of elements from the set
     **
     - index (number) position of the deletion
     - count (number) number of element to remove
     - insertion… (object) #optional elements to insert
     = (object) set elements that were deleted
    \*/
    setproto.splice = function (index, count, insertion) {
      index = index < 0 ? mmax(this.length + index, 0) : index;
      count = mmax(0, mmin(this.length - index, count));
      var tail = [],
          todel = [],
          args = [],
          i;
      for (i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      for (i = 0; i < count; i++) {
        todel.push(this[index + i]);
      }
      for (; i < this.length - index; i++) {
        tail.push(this[index + i]);
      }
      var arglen = args.length;
      for (i = 0; i < arglen + tail.length; i++) {
        this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
      }
      i = this.items.length = this.length -= count - arglen;
      while (this[i]) {
        delete this[i++];
      }
      return new Set(todel);
    };
/*\
     * Set.exclude
     [ method ]
     **
     * Removes given element from the set
     **
     - element (object) element to remove
     = (boolean) `true` if object was found and removed from the set
    \*/
    setproto.exclude = function (el) {
      for (var i = 0, ii = this.length; i < ii; i++) if (this[i] == el) {
        this.splice(i, 1);
        return true;
      }
      return false;
    };
    setproto.insertAfter = function (el) {
      var i = this.items.length;
      while (i--) {
        this.items[i].insertAfter(el);
      }
      return this;
    };
    setproto.getBBox = function () {
      var x = [],
          y = [],
          x2 = [],
          y2 = [];
      for (var i = this.items.length; i--;) if (!this.items[i].removed) {
        var box = this.items[i].getBBox();
        x.push(box.x);
        y.push(box.y);
        x2.push(box.x + box.width);
        y2.push(box.y + box.height);
      }
      x = mmin.apply(0, x);
      y = mmin.apply(0, y);
      x2 = mmax.apply(0, x2);
      y2 = mmax.apply(0, y2);
      return {
        x: x,
        y: y,
        x2: x2,
        y2: y2,
        width: x2 - x,
        height: y2 - y,
        cx: x + (x2 - x) / 2,
        cy: y + (y2 - y) / 2
      };
    };
    setproto.clone = function (s) {
      s = new Set;
      for (var i = 0, ii = this.items.length; i < ii; i++) {
        s.push(this.items[i].clone());
      }
      return s;
    };
    setproto.toString = function () {
      return "Snap\u2018s set";
    };
    setproto.type = "set";
    // export
    Snap.Set = Set;
    Snap.set = function () {
      var set = new Set;
      if (arguments.length) {
        set.push.apply(set, Array.prototype.slice.call(arguments, 0));
      }
      return set;
    };
  });

  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob) {
    var names = {},
        reUnit = /[a-z]+$/i,
        Str = String;
    names.stroke = names.fill = "colour";

    function getEmpty(item) {
      var l = item[0];
      switch (l.toLowerCase()) {
      case "t":
        return [l, 0, 0];
      case "m":
        return [l, 1, 0, 0, 1, 0, 0];
      case "r":
        if (item.length == 4) {
          return [l, 0, item[2], item[3]];
        } else {
          return [l, 0];
        }
      case "s":
        if (item.length == 5) {
          return [l, 1, 1, item[3], item[4]];
        } else if (item.length == 3) {
          return [l, 1, 1];
        } else {
          return [l, 1];
        }
      }
    }

    function equaliseTransform(t1, t2, getBBox) {
      t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
      t1 = Snap.parseTransformString(t1) || [];
      t2 = Snap.parseTransformString(t2) || [];
      var maxlength = Math.max(t1.length, t2.length),
          from = [],
          to = [],
          i = 0,
          j, jj, tt1, tt2;
      for (; i < maxlength; i++) {
        tt1 = t1[i] || getEmpty(t2[i]);
        tt2 = t2[i] || getEmpty(tt1);
        if ((tt1[0] != tt2[0]) || (tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) || (tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))) {
          t1 = Snap._.transform2matrix(t1, getBBox());
          t2 = Snap._.transform2matrix(t2, getBBox());
          from = [
            ["m", t1.a, t1.b, t1.c, t1.d, t1.e, t1.f]
          ];
          to = [
            ["m", t2.a, t2.b, t2.c, t2.d, t2.e, t2.f]
          ];
          break;
        }
        from[i] = [];
        to[i] = [];
        for (j = 0, jj = Math.max(tt1.length, tt2.length); j < jj; j++) {
          j in tt1 && (from[i][j] = tt1[j]);
          j in tt2 && (to[i][j] = tt2[j]);
        }
      }
      return {
        from: path2array(from),
        to: path2array(to),
        f: getPath(from)
      };
    }

    function getNumber(val) {
      return val;
    }

    function getUnit(unit) {
      return function (val) {
        return +val.toFixed(3) + unit;
      };
    }

    function getViewBox(val) {
      return val.join(" ");
    }

    function getColour(clr) {
      return Snap.rgb(clr[0], clr[1], clr[2]);
    }

    function getPath(path) {
      var k = 0,
          i, ii, j, jj, out, a, b = [];
      for (i = 0, ii = path.length; i < ii; i++) {
        out = "[";
        a = ['"' + path[i][0] + '"'];
        for (j = 1, jj = path[i].length; j < jj; j++) {
          a[j] = "val[" + (k++) + "]";
        }
        out += a + "]";
        b[i] = out;
      }
      return Function("val", "return Snap.path.toString.call([" + b + "])");
    }

    function path2array(path) {
      var out = [];
      for (var i = 0, ii = path.length; i < ii; i++) {
        for (var j = 1, jj = path[i].length; j < jj; j++) {
          out.push(path[i][j]);
        }
      }
      return out;
    }

    function isNumeric(obj) {
      return isFinite(parseFloat(obj));
    }

    function arrayEqual(arr1, arr2) {
      if (!Snap.is(arr1, "array") || !Snap.is(arr2, "array")) {
        return false;
      }
      return arr1.toString() == arr2.toString();
    }
    Element.prototype.equal = function (name, b) {
      return eve("snap.util.equal", this, name, b).firstDefined();
    };
    eve.on("snap.util.equal", function (name, b) {
      var A, B, a = Str(this.attr(name) || ""),
          el = this;
      if (isNumeric(a) && isNumeric(b)) {
        return {
          from: parseFloat(a),
          to: parseFloat(b),
          f: getNumber
        };
      }
      if (names[name] == "colour") {
        A = Snap.color(a);
        B = Snap.color(b);
        return {
          from: [A.r, A.g, A.b, A.opacity],
          to: [B.r, B.g, B.b, B.opacity],
          f: getColour
        };
      }
      if (name == "viewBox") {
        A = this.attr(name).vb.split(" ").map(Number);
        B = b.split(" ").map(Number);
        return {
          from: A,
          to: B,
          f: getViewBox
        };
      }
      if (name == "transform" || name == "gradientTransform" || name == "patternTransform") {
        if (b instanceof Snap.Matrix) {
          b = b.toTransformString();
        }
        if (!Snap._.rgTransform.test(b)) {
          b = Snap._.svgTransform2string(b);
        }
        return equaliseTransform(a, b, function () {
          return el.getBBox(1);
        });
      }
      if (name == "d" || name == "path") {
        A = Snap.path.toCubic(a, b);
        return {
          from: path2array(A[0]),
          to: path2array(A[1]),
          f: getPath(A[0])
        };
      }
      if (name == "points") {
        A = Str(a).split(Snap._.separator);
        B = Str(b).split(Snap._.separator);
        return {
          from: A,
          to: B,
          f: function (val) {
            return val;
          }
        };
      }
      var aUnit = a.match(reUnit),
          bUnit = Str(b).match(reUnit);
      if (aUnit && arrayEqual(aUnit, bUnit)) {
        return {
          from: parseFloat(a),
          to: parseFloat(b),
          f: getUnit(aUnit)
        };
      } else {
        return {
          from: this.asPX(name),
          to: this.asPX(name, b),
          f: getNumber
        };
      }
    });
  });

  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob) {
    var elproto = Element.prototype,
        has = "hasOwnProperty",
        supportsTouch = "createTouch" in glob.doc,
        events = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"],
        touchMap = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
        },
        getScroll = function (xy, el) {
        var name = xy == "y" ? "scrollTop" : "scrollLeft",
            doc = el && el.node ? el.node.ownerDocument : glob.doc;
        return doc[name in doc.documentElement ? "documentElement" : "body"][name];
        },
        preventDefault = function () {
        this.returnValue = false;
        },
        preventTouch = function () {
        return this.originalEvent.preventDefault();
        },
        stopPropagation = function () {
        this.cancelBubble = true;
        },
        stopTouch = function () {
        return this.originalEvent.stopPropagation();
        },
        addEvent = function (obj, type, fn, element) {
        var realName = supportsTouch && touchMap[type] ? touchMap[type] : type,
            f = function (e) {
            var scrollY = getScroll("y", element),
                scrollX = getScroll("x", element);
            if (supportsTouch && touchMap[has](type)) {
              for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                if (e.targetTouches[i].target == obj || obj.contains(e.targetTouches[i].target)) {
                  var olde = e;
                  e = e.targetTouches[i];
                  e.originalEvent = olde;
                  e.preventDefault = preventTouch;
                  e.stopPropagation = stopTouch;
                  break;
                }
              }
            }
            var x = e.clientX + scrollX,
                y = e.clientY + scrollY;
            return fn.call(element, e, x, y);
            };

        if (type !== realName) {
          obj.addEventListener(type, f, false);
        }

        obj.addEventListener(realName, f, false);

        return function () {
          if (type !== realName) {
            obj.removeEventListener(type, f, false);
          }

          obj.removeEventListener(realName, f, false);
          return true;
        };
        },
        drag = [],
        dragMove = function (e) {
        var x = e.clientX,
            y = e.clientY,
            scrollY = getScroll("y"),
            scrollX = getScroll("x"),
            dragi, j = drag.length;
        while (j--) {
          dragi = drag[j];
          if (supportsTouch) {
            var i = e.touches && e.touches.length,
                touch;
            while (i--) {
              touch = e.touches[i];
              if (touch.identifier == dragi.el._drag.id || dragi.el.node.contains(touch.target)) {
                x = touch.clientX;
                y = touch.clientY;
                (e.originalEvent ? e.originalEvent : e).preventDefault();
                break;
              }
            }
          } else {
            e.preventDefault();
          }
          var node = dragi.el.node,
              o, next = node.nextSibling,
              parent = node.parentNode,
              display = node.style.display;
          // glob.win.opera && parent.removeChild(node);
          // node.style.display = "none";
          // o = dragi.el.paper.getElementByPoint(x, y);
          // node.style.display = display;
          // glob.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
          // o && eve("snap.drag.over." + dragi.el.id, dragi.el, o);
          x += scrollX;
          y += scrollY;
          eve("snap.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
        }
        },
        dragUp = function (e) {
        Snap.unmousemove(dragMove).unmouseup(dragUp);
        var i = drag.length,
            dragi;
        while (i--) {
          dragi = drag[i];
          dragi.el._drag = {};
          eve("snap.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
          eve.off("snap.drag.*." + dragi.el.id);
        }
        drag = [];
        };
/*\
     * Element.click
     [ method ]
     **
     * Adds a click event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.unclick
     [ method ]
     **
     * Removes a click event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

/*\
     * Element.dblclick
     [ method ]
     **
     * Adds a double click event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.undblclick
     [ method ]
     **
     * Removes a double click event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

/*\
     * Element.mousedown
     [ method ]
     **
     * Adds a mousedown event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.unmousedown
     [ method ]
     **
     * Removes a mousedown event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

/*\
     * Element.mousemove
     [ method ]
     **
     * Adds a mousemove event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.unmousemove
     [ method ]
     **
     * Removes a mousemove event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

/*\
     * Element.mouseout
     [ method ]
     **
     * Adds a mouseout event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.unmouseout
     [ method ]
     **
     * Removes a mouseout event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

/*\
     * Element.mouseover
     [ method ]
     **
     * Adds a mouseover event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.unmouseover
     [ method ]
     **
     * Removes a mouseover event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

/*\
     * Element.mouseup
     [ method ]
     **
     * Adds a mouseup event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.unmouseup
     [ method ]
     **
     * Removes a mouseup event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

/*\
     * Element.touchstart
     [ method ]
     **
     * Adds a touchstart event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.untouchstart
     [ method ]
     **
     * Removes a touchstart event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

/*\
     * Element.touchmove
     [ method ]
     **
     * Adds a touchmove event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.untouchmove
     [ method ]
     **
     * Removes a touchmove event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

/*\
     * Element.touchend
     [ method ]
     **
     * Adds a touchend event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.untouchend
     [ method ]
     **
     * Removes a touchend event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

/*\
     * Element.touchcancel
     [ method ]
     **
     * Adds a touchcancel event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
/*\
     * Element.untouchcancel
     [ method ]
     **
     * Removes a touchcancel event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
    for (var i = events.length; i--;) {
      (function (eventName) {
        Snap[eventName] = elproto[eventName] = function (fn, scope) {
          if (Snap.is(fn, "function")) {
            this.events = this.events || [];
            this.events.push({
              name: eventName,
              f: fn,
              unbind: addEvent(this.node || document, eventName, fn, scope || this)
            });
          } else {
            for (var i = 0, ii = this.events.length; i < ii; i++) if (this.events[i].name == eventName) {
              try {
                this.events[i].f.call(this);
              } catch (e) {}
            }
          }
          return this;
        };
        Snap["un" + eventName] =
        elproto["un" + eventName] = function (fn) {
          var events = this.events || [],
              l = events.length;
          while (l--) if (events[l].name == eventName && (events[l].f == fn || !fn)) {
            events[l].unbind();
            events.splice(l, 1);
            !events.length && delete this.events;
            return this;
          }
          return this;
        };
      })(events[i]);
    }
/*\
     * Element.hover
     [ method ]
     **
     * Adds hover event handlers to the element
     - f_in (function) handler for hover in
     - f_out (function) handler for hover out
     - icontext (object) #optional context for hover in handler
     - ocontext (object) #optional context for hover out handler
     = (object) @Element
    \*/
    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
      return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
    };
/*\
     * Element.unhover
     [ method ]
     **
     * Removes hover event handlers from the element
     - f_in (function) handler for hover in
     - f_out (function) handler for hover out
     = (object) @Element
    \*/
    elproto.unhover = function (f_in, f_out) {
      return this.unmouseover(f_in).unmouseout(f_out);
    };
    var draggable = [];
    // SIERRA unclear what _context_ refers to for starting, ending, moving the drag gesture.
    // SIERRA Element.drag(): _x position of the mouse_: Where are the x/y values offset from?
    // SIERRA Element.drag(): much of this member's doc appears to be duplicated for some reason.
    // SIERRA Unclear about this sentence: _Additionally following drag events will be triggered: drag.start.<id> on start, drag.end.<id> on end and drag.move.<id> on every move._ Is there a global _drag_ object to which you can assign handlers keyed by an element's ID?
/*\
     * Element.drag
     [ method ]
     **
     * Adds event handlers for an element's drag gesture
     **
     - onmove (function) handler for moving
     - onstart (function) handler for drag start
     - onend (function) handler for drag end
     - mcontext (object) #optional context for moving handler
     - scontext (object) #optional context for drag start handler
     - econtext (object) #optional context for drag end handler
     * Additionaly following `drag` events are triggered: `drag.start.<id>` on start,
     * `drag.end.<id>` on end and `drag.move.<id>` on every move. When element is dragged over another element
     * `drag.over.<id>` fires as well.
     *
     * Start event and start handler are called in specified context or in context of the element with following parameters:
     o x (number) x position of the mouse
     o y (number) y position of the mouse
     o event (object) DOM event object
     * Move event and move handler are called in specified context or in context of the element with following parameters:
     o dx (number) shift by x from the start point
     o dy (number) shift by y from the start point
     o x (number) x position of the mouse
     o y (number) y position of the mouse
     o event (object) DOM event object
     * End event and end handler are called in specified context or in context of the element with following parameters:
     o event (object) DOM event object
     = (object) @Element
    \*/
    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
      var el = this;
      if (!arguments.length) {
        var origTransform;
        return el.drag(function (dx, dy) {
          this.attr({
            transform: origTransform + (origTransform ? "T" : "t") + [dx, dy]
          });
        }, function () {
          origTransform = this.transform().local;
        });
      }

      function start(e, x, y) {
        (e.originalEvent || e).preventDefault();
        el._drag.x = x;
        el._drag.y = y;
        el._drag.id = e.identifier;
        !drag.length && Snap.mousemove(dragMove).mouseup(dragUp);
        drag.push({
          el: el,
          move_scope: move_scope,
          start_scope: start_scope,
          end_scope: end_scope
        });
        onstart && eve.on("snap.drag.start." + el.id, onstart);
        onmove && eve.on("snap.drag.move." + el.id, onmove);
        onend && eve.on("snap.drag.end." + el.id, onend);
        eve("snap.drag.start." + el.id, start_scope || move_scope || el, x, y, e);
      }

      function init(e, x, y) {
        eve("snap.draginit." + el.id, el, e, x, y);
      }
      eve.on("snap.draginit." + el.id, start);
      el._drag = {};
      draggable.push({
        el: el,
        start: start,
        init: init
      });
      el.mousedown(init);
      return el;
    };
/*
     * Element.onDragOver
     [ method ]
     **
     * Shortcut to assign event handler for `drag.over.<id>` event, where `id` is the element's `id` (see @Element.id)
     - f (function) handler for event, first argument would be the element you are dragging over
    \*/
    // elproto.onDragOver = function (f) {
    //     f ? eve.on("snap.drag.over." + this.id, f) : eve.unbind("snap.drag.over." + this.id);
    // };
/*\
     * Element.undrag
     [ method ]
     **
     * Removes all drag event handlers from the given element
    \*/
    elproto.undrag = function () {
      var i = draggable.length;
      while (i--) if (draggable[i].el == this) {
        this.unmousedown(draggable[i].init);
        draggable.splice(i, 1);
        eve.unbind("snap.drag.*." + this.id);
        eve.unbind("snap.draginit." + this.id);
      }!draggable.length && Snap.unmousemove(dragMove).unmouseup(dragUp);
      return this;
    };
  });

  // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob) {
    var elproto = Element.prototype,
        pproto = Paper.prototype,
        rgurl = /^\s*url\((.+)\)/,
        Str = String,
        $ = Snap._.$;
    Snap.filter = {};
/*\
     * Paper.filter
     [ method ]
     **
     * Creates a `<filter>` element
     **
     - filstr (string) SVG fragment of filter provided as a string
     = (object) @Element
     * Note: It is recommended to use filters embedded into the page inside an empty SVG element.
     > Usage
     | var f = paper.filter('<feGaussianBlur stdDeviation="2"/>'),
     |     c = paper.circle(10, 10, 10).attr({
     |         filter: f
     |     });
    \*/
    pproto.filter = function (filstr) {
      var paper = this;
      if (paper.type != "svg") {
        paper = paper.paper;
      }
      var f = Snap.parse(Str(filstr)),
          id = Snap._.id(),
          width = paper.node.offsetWidth,
          height = paper.node.offsetHeight,
          filter = $("filter");
      $(filter, {
        id: id,
        filterUnits: "userSpaceOnUse"
      });
      filter.appendChild(f.node);
      paper.defs.appendChild(filter);
      return new Element(filter);
    };

    eve.on("snap.util.getattr.filter", function () {
      eve.stop();
      var p = $(this.node, "filter");
      if (p) {
        var match = Str(p).match(rgurl);
        return match && Snap.select(match[1]);
      }
    });
    eve.on("snap.util.attr.filter", function (value) {
      if (value instanceof Element && value.type == "filter") {
        eve.stop();
        var id = value.node.id;
        if (!id) {
          $(value.node, {
            id: value.id
          });
          id = value.id;
        }
        $(this.node, {
          filter: Snap.url(id)
        });
      }
      if (!value || value == "none") {
        eve.stop();
        this.node.removeAttribute("filter");
      }
    });
/*\
     * Snap.filter.blur
     [ method ]
     **
     * Returns an SVG markup string for the blur filter
     **
     - x (number) amount of horizontal blur, in pixels
     - y (number) #optional amount of vertical blur, in pixels
     = (string) filter representation
     > Usage
     | var f = paper.filter(Snap.filter.blur(5, 10)),
     |     c = paper.circle(10, 10, 10).attr({
     |         filter: f
     |     });
    \*/
    Snap.filter.blur = function (x, y) {
      if (x == null) {
        x = 2;
      }
      var def = y == null ? x : [x, y];
      return Snap.format('\<feGaussianBlur stdDeviation="{def}"/>', {
        def: def
      });
    };
    Snap.filter.blur.toString = function () {
      return this();
    };
/*\
     * Snap.filter.shadow
     [ method ]
     **
     * Returns an SVG markup string for the shadow filter
     **
     - dx (number) #optional horizontal shift of the shadow, in pixels
     - dy (number) #optional vertical shift of the shadow, in pixels
     - blur (number) #optional amount of blur
     - color (string) #optional color of the shadow
     - opacity (number) #optional `0..1` opacity of the shadow
     * or
     - dx (number) #optional horizontal shift of the shadow, in pixels
     - dy (number) #optional vertical shift of the shadow, in pixels
     - color (string) #optional color of the shadow
     - opacity (number) #optional `0..1` opacity of the shadow
     * which makes blur default to `4`. Or
     - dx (number) #optional horizontal shift of the shadow, in pixels
     - dy (number) #optional vertical shift of the shadow, in pixels
     - opacity (number) #optional `0..1` opacity of the shadow
     = (string) filter representation
     > Usage
     | var f = paper.filter(Snap.filter.shadow(0, 2, 3)),
     |     c = paper.circle(10, 10, 10).attr({
     |         filter: f
     |     });
    \*/
    Snap.filter.shadow = function (dx, dy, blur, color, opacity) {
      if (typeof blur == "string") {
        color = blur;
        opacity = color;
        blur = 4;
      }
      if (typeof color != "string") {
        opacity = color;
        color = "#000";
      }
      color = color || "#000";
      if (blur == null) {
        blur = 4;
      }
      if (opacity == null) {
        opacity = 1;
      }
      if (dx == null) {
        dx = 0;
        dy = 2;
      }
      if (dy == null) {
        dy = dx;
      }
      color = Snap.color(color);
      return Snap.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
        color: color,
        dx: dx,
        dy: dy,
        blur: blur,
        opacity: opacity
      });
    };
    Snap.filter.shadow.toString = function () {
      return this();
    };
/*\
     * Snap.filter.grayscale
     [ method ]
     **
     * Returns an SVG markup string for the grayscale filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
    Snap.filter.grayscale = function (amount) {
      if (amount == null) {
        amount = 1;
      }
      return Snap.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
        a: 0.2126 + 0.7874 * (1 - amount),
        b: 0.7152 - 0.7152 * (1 - amount),
        c: 0.0722 - 0.0722 * (1 - amount),
        d: 0.2126 - 0.2126 * (1 - amount),
        e: 0.7152 + 0.2848 * (1 - amount),
        f: 0.0722 - 0.0722 * (1 - amount),
        g: 0.2126 - 0.2126 * (1 - amount),
        h: 0.0722 + 0.9278 * (1 - amount)
      });
    };
    Snap.filter.grayscale.toString = function () {
      return this();
    };
/*\
     * Snap.filter.sepia
     [ method ]
     **
     * Returns an SVG markup string for the sepia filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
    Snap.filter.sepia = function (amount) {
      if (amount == null) {
        amount = 1;
      }
      return Snap.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
        a: 0.393 + 0.607 * (1 - amount),
        b: 0.769 - 0.769 * (1 - amount),
        c: 0.189 - 0.189 * (1 - amount),
        d: 0.349 - 0.349 * (1 - amount),
        e: 0.686 + 0.314 * (1 - amount),
        f: 0.168 - 0.168 * (1 - amount),
        g: 0.272 - 0.272 * (1 - amount),
        h: 0.534 - 0.534 * (1 - amount),
        i: 0.131 + 0.869 * (1 - amount)
      });
    };
    Snap.filter.sepia.toString = function () {
      return this();
    };
/*\
     * Snap.filter.saturate
     [ method ]
     **
     * Returns an SVG markup string for the saturate filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
    Snap.filter.saturate = function (amount) {
      if (amount == null) {
        amount = 1;
      }
      return Snap.format('<feColorMatrix type="saturate" values="{amount}"/>', {
        amount: 1 - amount
      });
    };
    Snap.filter.saturate.toString = function () {
      return this();
    };
/*\
     * Snap.filter.hueRotate
     [ method ]
     **
     * Returns an SVG markup string for the hue-rotate filter
     **
     - angle (number) angle of rotation
     = (string) filter representation
    \*/
    Snap.filter.hueRotate = function (angle) {
      angle = angle || 0;
      return Snap.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
        angle: angle
      });
    };
    Snap.filter.hueRotate.toString = function () {
      return this();
    };
/*\
     * Snap.filter.invert
     [ method ]
     **
     * Returns an SVG markup string for the invert filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
    Snap.filter.invert = function (amount) {
      if (amount == null) {
        amount = 1;
      }
      //        <feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0" color-interpolation-filters="sRGB"/>
      return Snap.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
        amount: amount,
        amount2: 1 - amount
      });
    };
    Snap.filter.invert.toString = function () {
      return this();
    };
/*\
     * Snap.filter.brightness
     [ method ]
     **
     * Returns an SVG markup string for the brightness filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
    Snap.filter.brightness = function (amount) {
      if (amount == null) {
        amount = 1;
      }
      return Snap.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {
        amount: amount
      });
    };
    Snap.filter.brightness.toString = function () {
      return this();
    };
/*\
     * Snap.filter.contrast
     [ method ]
     **
     * Returns an SVG markup string for the contrast filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
    Snap.filter.contrast = function (amount) {
      if (amount == null) {
        amount = 1;
      }
      return Snap.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
        amount: amount,
        amount2: .5 - amount / 2
      });
    };
    Snap.filter.contrast.toString = function () {
      return this();
    };
  });

  // Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
    var box = Snap._.box,
        is = Snap.is,
        firstLetter = /^[^a-z]*([tbmlrc])/i,
        toString = function () {
        return "T" + this.dx + "," + this.dy;
        };
/*\
     * Element.getAlign
     [ method ]
     **
     * Returns shift needed to align the element relatively to given element.
     * If no elements specified, parent `<svg>` container will be used.
     - el (object) @optional alignment element
     - way (string) one of six values: `"top"`, `"middle"`, `"bottom"`, `"left"`, `"center"`, `"right"`
     = (object|string) Object in format `{dx: , dy: }` also has a string representation as a transformation string
     > Usage
     | el.transform(el.getAlign(el2, "top"));
     * or
     | var dy = el.getAlign(el2, "top").dy;
    \*/
    Element.prototype.getAlign = function (el, way) {
      if (way == null && is(el, "string")) {
        way = el;
        el = null;
      }
      el = el || this.paper;
      var bx = el.getBBox ? el.getBBox() : box(el),
          bb = this.getBBox(),
          out = {};
      way = way && way.match(firstLetter);
      way = way ? way[1].toLowerCase() : "c";
      switch (way) {
      case "t":
        out.dx = 0;
        out.dy = bx.y - bb.y;
        break;
      case "b":
        out.dx = 0;
        out.dy = bx.y2 - bb.y2;
        break;
      case "m":
        out.dx = 0;
        out.dy = bx.cy - bb.cy;
        break;
      case "l":
        out.dx = bx.x - bb.x;
        out.dy = 0;
        break;
      case "r":
        out.dx = bx.x2 - bb.x2;
        out.dy = 0;
        break;
      default:
        out.dx = bx.cx - bb.cx;
        out.dy = 0;
        break;
      }
      out.toString = toString;
      return out;
    };
/*\
     * Element.align
     [ method ]
     **
     * Aligns the element relatively to given one via transformation.
     * If no elements specified, parent `<svg>` container will be used.
     - el (object) @optional alignment element
     - way (string) one of six values: `"top"`, `"middle"`, `"bottom"`, `"left"`, `"center"`, `"right"`
     = (object) this element
     > Usage
     | el.align(el2, "top");
     * or
     | el.align("middle");
    \*/
    Element.prototype.align = function (el, way) {
      return this.transform("..." + this.getAlign(el, way));
    };
  });

  return Snap;
}));

(function ($, undefined) {
  "use strict";
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
      
      
      is_small = $('.js-nav-trigger').is(':visible'),
      
      
      windowHeight = $window.height(),
      windowWidth = $window.width(),
      documentHeight = $document.height(),
      orientation = windowWidth > windowHeight ? 'portrait' : 'landscape',
      
      
      filmWidth, contentWidth, sidebarWidth,
      
      latestKnownScrollY = window.scrollY,
      latestKnownScrollX = window.scrollX,
      
      
      latestKnownMouseX = 0,
      latestKnownMouseY = 0,
      
      
      ticking = false,
      
      
      globalDebug = false;


  // AddThis Init
  window.AddThisIcons = (function () {

    var addThisToolBox = '.addthis_toolbox',
        
        
        init = function () {
        if (window.addthis) {
          bindEvents();

          addthis.init();
        }
        },
        
        
        bindEvents = function () {
        if (globalDebug) {
          console.log("addthis::Load Script");
        }
        // Listen for the ready event
        addthis.addEventListener('addthis.ready', addThisReady);
        },
        
        
         /* --- AddThis On Ready - The API is fully loaded --- */
        
        
        //only fire this the first time we load the AddThis API - even when using ajax
        addThisReady = function () {
        if (globalDebug) {
          console.log("addthis::Ready");
        }
        softInit();
        },
        
        
         /* --- AddThis Init --- */
        
        softInit = function () {
        if (window.addthis) {
          if (globalDebug) {
            console.log("addthis::Toolbox INIT");
          }

          addthis.toolbox(addThisToolBox);

          socialLinks.init();
        }
        }
        
        
        
        return {
        init: init,
        softInit: softInit
        }
  })();


  // Animation logic
  var scl, socialLinks = {
    settings: {
      wrapper: $('.share-box'),
      button: $('.js-share-button'),
      text: $('.share-text'),
      social_links: $('.share-box a'),
      social_links_list: $('.social-links-list'),
      anim: new TimelineMax({
        paused: true,
        onComplete: function () {
          $('.social-links-list').addClass('is-active');
        },
        onReverseComplete: function () {
          $('.social-links-list').removeClass('is-active');
        }
      })
    },

    init: function () {
      if (globalDebug) {
        console.log("Social Links Hover - INIT");
      }

      scl = this.settings;
      this.update();

      if (!empty(scl.wrapper)) {
        //the actual animation
        scl.anim
        //.to(scl.button, 0.2, {backgroundColor:"#1a1717"})
        //.to(scl.social_links_list, 0.2, {opacity: 1})
        .staggerFromTo(scl.social_links, 0.3, {
          opacity: 0,
          x: -20,
          z: 0
        }, {
          opacity: 1,
          x: 0,
          z: 0,
          ease: Circ.easeOut,
          onStart: function () {
            scl.wrapper.addClass('active');
          },
          force3D: true,
          onReverseComplete: function () {
            scl.wrapper.removeClass('active');
          }
        }, 0.025, "-=0.02");

        //toggle play and reverse timeline on hover
        //scl.wrapper.hover(this.over, this.out);
        scl.wrapper.on('mouseenter', this.over);
        scl.wrapper.on('mouseleave', this.out);

      } else {
        if (globalDebug) {
          console.log("Social Links Hover - SHOW STOPPER - No social links wrapper found");
        }
      }
    },

    update: function () {
      if (globalDebug) {
        console.log("Social Links Hover - UPDATE");
      }

      scl.wrapper = $('.share-box');
      scl.button = $('.js-share-button');
      scl.social_links = $('.share-box a');
      scl.social_links_list = $('.social-links-list');
      scl.anim = new TimelineLite({
        paused: true,
        onComplete: function () {
          scl.social_links_list.addClass('is-active');
        },
        onReverseComplete: function () {
          scl.social_links_list.removeClass('is-active');
        }
      });
    },

    over: function () {
      if (globalDebug) {
        console.log("Social Links Hover - OVER");
      }

      scl.anim.play();
    },

    out: function () {
      if (globalDebug) {
        console.log("Social Links Hover - OUT");
      }

      scl.anim.reverse();
    }
  };
  var Blog = (function () {

    var $filmstrip_container, fullviewWidth, fullviewHeight, isFirstFilterClick, isLoadingPosts, filterBy;

    function init() {

      $filmstrip_container = $('.filmstrip');
      fullviewWidth = windowWidth;
      fullviewHeight = windowHeight;
      isFirstFilterClick = true;
      isLoadingPosts = false;
      filterBy = '';

      if (!$filmstrip_container.length) {
        //this is not a blog archive so bail
        return;
      }

      $('.navigation').hide();

      //mixitup init without filtering
      $filmstrip_container.mixItUp({
        animation: {
          effects: 'fade'
        },
        selectors: {
          filter: '.no-real-selector-for-filtering',
          target: '.filmstrip__item'
        }
      });

      bindEvents();

      //if there are not sufficient posts to have scroll - load the next page also (prepending)
      if ($filmstrip_container.children('article').last().offset().left == 0) {
        loadNextPosts();
      }
    }

    function bindEvents() {
      //we will handle the binding of filter links because we need to load all posts on first filter click
      $('.filter').on('click', '.filter__item', (function () {
        filterBy = $(this).data('filter');

        // first make the current filter link active
        $('.filter__item').removeClass('active');
        $(this).addClass('active');

        if (isFirstFilterClick == true) {
          //this is the first time the user has clicked a filter link
          //we need to first load all posts before proceeding
          loadAllPosts();

        } else {
          //just regular filtering from the second click onwards
          $filmstrip_container.mixItUp('filter', filterBy);
        }

        return false;
      }));
    }

    function loadAllPosts() {
      var offset = $filmstrip_container.find('.filmstrip__item').length;

      if (globalDebug) {
        console.log("Loading All Posts - AJAX Offset = " + offset);
      }

      isLoadingPosts = true;

      var args = {
        action: 'timber_load_next_posts',
        nonce: timber_ajax.nonce,
        offset: offset,
        posts_number: 'all'
      };

      if (!empty($filmstrip_container.data('taxonomy'))) {
        args['taxonomy'] = $filmstrip_container.data('taxonomy');
        args['term_id'] = $filmstrip_container.data('termid');
      } else if (!empty($filmstrip_container.data('search'))) {
        args['search'] = $filmstrip_container.data('search');
      }

      $.post(
      timber_ajax.ajax_url, args, function (response_data) {

        if (response_data.success) {
          if (globalDebug) {
            console.log("Loaded all posts");
          }

          var $result = $(response_data.data.posts).filter('article');

          if (globalDebug) {
            console.log("Adding new " + $result.length + " items to the DOM");
          }

          $('.navigation').hide().remove();

          $result.imagesLoaded(function () {
            if (globalDebug) {
              console.log("MixItUp Filtering - Images Loaded");
            }

            $filmstrip_container.mixItUp('append', $result, {
              filter: filterBy
            });

            //next time the user filters we will know
            isFirstFilterClick = false;

            isLoadingPosts = false;

            if (globalDebug) {
              console.log("MixItUp Filtering - Filter by " + filterBy);
            }
          });
        } else {
          //something didn't quite make it - maybe there are no more posts (be optimistic about it)
          //so we will assume that all posts are already loaded and proceed as usual
          if (globalDebug) {
            console.log("MixItUp Filtering - There were no more posts to load - so filter please");
          }

          isFirstFilterClick = false;
          isLoadingPosts = false;

          $filmstrip_container.mixItUp('filter', filterBy);
        }
      });
    }

    function loadNextPosts() {
      var offset = $filmstrip_container.find('.filmstrip__item').length;

      if (globalDebug) {
        console.log("Loading More Posts - AJAX Offset = " + offset);
      }

      isLoadingPosts = true;
      $('.preloader').css('opacity', 1);

      var args = {
        action: 'timber_load_next_posts',
        nonce: timber_ajax.nonce,
        offset: offset
      };

      if (!empty($filmstrip_container.data('taxonomy'))) {
        args['taxonomy'] = $filmstrip_container.data('taxonomy');
        args['term_id'] = $filmstrip_container.data('termid');
      } else if (!empty($filmstrip_container.data('search'))) {
        args['search'] = $filmstrip_container.data('search');
      }

      $.post(
      timber_ajax.ajax_url, args, function (response_data) {

        if (response_data.success) {
          if (globalDebug) {
            console.log("Loaded next posts");
          }

          var $result = $(response_data.data.posts).filter('article');

          if (globalDebug) {
            console.log("Adding new " + $result.length + " items to the DOM");
          }

          $result.imagesLoaded(function () {
            if (globalDebug) {
              console.log("MixItUp Filtering - Images Loaded");
            }
            $filmstrip_container.mixItUp('append', $result);
            isLoadingPosts = false;
          });
        } else {
          //we have failed
          //it's time to call it a day
          if (globalDebug) {
            console.log("It seems that there are no more posts to load");
          }

          $('.navigation').fadeOut();

          //don't make isLoadingPosts true so we won't load any more posts
        }

        $('.preloader').css('opacity', 0);
      });
    }

    function maybeLoadNextPosts() {
      if (!$filmstrip_container.length || isLoadingPosts) {
        return;
      }

      var $lastChild = $filmstrip_container.children('article').last();

      //if the last child is in view then load more posts
      if ($lastChild.is(':appeared')) {
        loadNextPosts();
      }

    }

    return {
      init: init,
      loadAllPosts: loadAllPosts,
      loadNextPosts: loadNextPosts,
      maybeLoadNextPosts: maybeLoadNextPosts
    }
  })();
  var djax = (function () {

    var wait = false,
        loadingTimeout;

    /**
     *
     */

    function init() {

      // if (typeof $body.data('ajaxloading') == "undefined") {
      //     return;
      // }
      var that = this,
          transition = function ($new) {
          var $old = this;
          };

      //$('body').djax( {
      //  'selector': '.djax-updatable',
      //  'ignoreClass' : 'djax-ignore',
      //  'exceptions': ['.pdf', '.doc', '.eps', '.png', '.zip', 'admin', 'wp-', 'wp-admin', 'feed', '#', '?lang=', '&lang=', '&add-to-cart=', '?add-to-cart=', '?remove_item'],
      //  'replaceBlockFunction': transition
      //} );
      var ignored_links = ['.pdf', '.doc', '.eps', '.png', '.zip', 'admin', 'wp-', 'wp-admin', 'feed', '#', '?lang=', '&lang=', '&add-to-cart=', '?add-to-cart=', '?remove_item'];

      // djax_ignored_links is localized in /inc/functions/callbacks/woocommerce.php
      // if there are localized ignored links, add them
      if (typeof djax_ignored_links === "object") {
        ignored_links = ignored_links.concat(djax_ignored_links);
      }

      $('body').djax('.djax-updatable', ignored_links, djaxTransition);

      // $(window).on('djaxClick', onDjaxClick);
      $(window).on('djaxLoading', onDjaxLoading);
      $(window).on('djaxLoad', onDjaxLoad);
    }

    function djaxTransition($new) {
      var $old = this;
      $old.replaceWith($new);
    }

    function onDjaxLoading(e) {
      console.log('loading');
      wait = true;

      loadingTimeout = setTimeout(function () {
        console.log('timeout');
        if (!wait) {
          transitionIn();
        }
        wait = false;
      }, 600);

      Nav.close();
      Overlay.close();

      TweenMax.fromTo('.loader', .6, {
        left: '100%'
      }, {
        left: 0,
        ease: Expo.easeInOut,
      });
      TweenMax.to('.mask--page', .6, {
        left: 0,
        ease: Expo.easeInOut,
        onComplete: function () {}
      });
      Project.destroy();
    }

    function transitionIn() {
      console.log('transition')
      TweenMax.fromTo('.loader', .6, {
        left: 0
      }, {
        left: '-100%',
        ease: Expo.easeInOut,
      });
      TweenMax.to('.mask--page', .6, {
        left: '100%',
        ease: Expo.easeInOut,
        onComplete: function () {
          $('.mask--page').css('left', '-100%');
          // $html.css('overflow', '');
        }
      });
    }

    function onDjaxLoad(e, data) {
      console.log('load');
      // get data and replace the body tag with a nobody tag
      // because jquery strips the body tag when creating objects from data
      data = data.response.replace(/(<\/?)body( .+?)?>/gi, '$1NOTBODY$2>', data);
      // get the nobody tag's classes
      var nobodyClass = $(data).filter('notbody').attr("class");
      // set it to current body tag
      $body.attr('class', nobodyClass);

      $(window).scrollLeft(0);
      $(window).scrollTop(0);
      softInit();

      // Change the toolbar edit button accordingly
      // need to get the id and edit string from the data attributes
      var curPostID = $(data).filter('notbody').data("curpostid"),
          curPostTax = $(data).filter('notbody').data("curtaxonomy"),
          curPostEditString = $(data).filter('notbody').data("curpostedit");

      adminBarEditFix(curPostID, curPostEditString, curPostTax);

      //lets do some Google Analytics Tracking, in case it is there
      if (window._gaq) {
        _gaq.push(['_trackPageview']);
      }

      if (!wait) {
        transitionIn();
      }

      wait = false;
    }

    // here we change the link of the Edit button in the Admin Bar
    // to make sure it reflects the current page


    function adminBarEditFix(id, editString, taxonomy) {
      //get the admin ajax url and clean it
      var baseEditURL = timber_ajax.ajax_url.replace('admin-ajax.php', 'post.php'),
          baseExitTaxURL = timber_ajax.ajax_url.replace('admin-ajax.php', 'edit-tags.php'),
          $editButton = $('#wp-admin-bar-edit a');

      if (!empty($editButton)) {
        if (id !== undefined && editString !== undefined) { //modify the current Edit button
          if (!empty(taxonomy)) { //it seems we need to edit a taxonomy
            $editButton.attr('href', baseExitTaxURL + '?tag_ID=' + id + '&taxonomy=' + taxonomy + '&action=edit');
          } else {
            $editButton.attr('href', baseEditURL + '?post=' + id + '&action=edit');
          }
          $editButton.html(editString);
        } else { //we have found an edit button but right now we don't need it anymore since we have no id
          $('#wp-admin-bar-edit').remove();
        }
      } else { //upss ... no edit button
        //lets see if we need one
        if (id !== undefined && editString !== undefined) { //we do need one after all
          //locate the New button because we need to add stuff after it
          var $newButton = $('#wp-admin-bar-new-content');

          if (!empty($newButton)) {
            if (!empty(taxonomy)) { //it seems we need to generate a taxonomy edit thingy
              $newButton.after('<li id="wp-admin-bar-edit"><a class="ab-item dJAX_internal" href="' + baseExitTaxURL + '?tag_ID=' + id + '&taxonomy=' + taxonomy + '&action=edit">' + editString + '</a></li>');
            } else { //just a regular edit
              $newButton.after('<li id="wp-admin-bar-edit"><a class="ab-item dJAX_internal" href="' + baseEditURL + '?post=' + id + '&action=edit">' + editString + '</a></li>');
            }
          }
        }
      }
    }

    return {
      init: init,
      transition: djaxTransition
    }

  })();

  var Loader = (function () {

    function init() {

      var $svg = $("#loaderSvg"),
          svg, text = '',
          letter = $('body').data('first-letter').toLowerCase();

      svg = Snap("#loaderSvg");
      text = svg.text('50%', '20%', letter).attr({
        'text-anchor': 'middle',
        'id': 'letter',
        'font-size': '180',
        'font-weight': 'bold',
        'dy': '150'
      });

      var patterns = [],
          index = 0;

      $.each(loaderRandomImages, function (i, src) {
        var img = svg.image(src, -75, 0, 300, 300).toPattern();

        img.attr({
          width: 300,
          height: 300,
          viewBox: '0 0 300 300'
        });
        patterns.push(img);
      });

      setInterval(function () {
        if (index == patterns.length) {
          index = 0;
        }
        text.attr('fill', patterns[index]);
        index = index + 1;
      }, 300);
    }

    return {
      init: init
    }

  })()
  var frontpageSlider = (function () {

    var $slider, $content, $prevTrigger, $nextTrigger, $triggers, sliderWidth, sliderHeight, totalWidth, $slides, slidesNumber, $current, $prev, $next, nextWidth;

    function init() {

      $slider = $('.projects-slider');
      $content = $('.project-slide__content');
      $prevTrigger = $('.vertical-title.prev');
      $nextTrigger = $('.vertical-title.next');
      $triggers = $nextTrigger.add($prevTrigger);
      sliderWidth = $slider.width();
      sliderHeight = $slider.height();
      totalWidth = 0;
      $slides = $slider.children();
      slidesNumber = $slides.length;
      $current = $slides.eq(0);
      nextWidth = $nextTrigger.width() - 100;

      var minSlides = 5,
          offset;

      // assure minimum number of slides
      if (slidesNumber < 2) {
        $slider.css({
          opacity: 1,
          margin: 0
        });
        animateContentIn();
        return;
      }

      if (slidesNumber < 3) {
        $slider.css({
          marginLeft: 0
        });
        sliderWidth = $slider.width();
        $prevTrigger.hide();
      }

      if (slidesNumber < minSlides) {
        $slides.clone().appendTo($slider);
        $slides = $slider.children();
      }

      $slides.not($current).width(nextWidth);

      $slider.imagesLoaded(function () {

        $slides.each(function (i, obj) {
          var $slide = $(obj);

          if (i != 0) {
            totalWidth += nextWidth;
            $slide.css('left', sliderWidth + (i - 1) * nextWidth);
          } else {
            totalWidth += sliderWidth;
          }

          scaleImage($slide.find('img'));
        });

        TweenMax.to($slider, .3, {
          opacity: 1
        });

        // balance slides to left and right
        offset = parseInt(($slides.length - 1) / 2, 10);
        $slides.slice(-offset).prependTo($slider).each(function (i, obj) {
          $(obj).css('left', '-=' + totalWidth);
        });

        $slides = $slider.children();

        $prev = $current.prev();
        $next = $current.next();

        createBullets();
        setZindex();
        bindEvents();
        animateContentIn();
      });
    }

    function onResize() {

      var newWidth = $slider.width(),
          $nextSlides = $current.nextAll(),
          difference = newWidth - sliderWidth;

      sliderHeight = $slider.height();
      totalWidth = totalWidth + difference;
      sliderWidth = newWidth;

      $current.width(sliderWidth);

      $nextSlides.each(function (i, obj) {
        $(obj).css('left', '+=' + difference);
      });
    }

    function scaleImage($img) {
      var imageWidth = $img.width(),
          imageHeight = $img.height(),
          scaleX = sliderWidth / imageWidth,
          scaleY = sliderHeight / imageHeight,
          scale = Math.max(scaleX, scaleY);

      $img.width(scale * imageWidth);
      $img.height(scale * imageHeight);
    }

    function createBullets() {
      var $container = $('.projects-slider__bullets');

      for (var i = 0; i < slidesNumber; i++) {
        $container.append('<div class="rsBullet"><span></span></div>');
      }

      $container.children().first().addClass('rsNavSelected');
    }

    function bindEvents() {
      if (nextWidth > 70) {
        $nextTrigger.on('mouseenter', onNextEnter);
        $nextTrigger.on('mouseleave', onNextLeave);
      }
      $nextTrigger.on('click', onNextClick);

      if (nextWidth > 70) {
        $prevTrigger.on('mouseenter', onPrevEnter);
        $prevTrigger.on('mouseleave', onPrevLeave);
      }
      $prevTrigger.on('click', onPrevClick);
    }

    function onNextEnter() {
      TweenMax.to($next.find('.project-slide__image'), .4, {
        opacity: 1,
        ease: Quint.easeOut
      });
      TweenMax.to($next.add($content), .4, {
        x: -60,
        ease: Back.easeOut
      }, '-=.4');
      TweenMax.to($next, .4, {
        width: 160,
        ease: Back.easeOut
      }, '-=.4');
      TweenMax.to($nextTrigger, .4, {
        x: -30,
        ease: Back.easeOut
      }, '-=.4');
    }

    function onPrevEnter() {
      TweenMax.to($prev.find('.project-slide__image'), .4, {
        opacity: 1,
        ease: Quint.easeOut
      });
      TweenMax.to($content, .4, {
        x: 60,
        ease: Back.easeOut
      });
      TweenMax.to($prev, .4, {
        width: 160,
        ease: Back.easeOut
      });
      TweenMax.to($prevTrigger, .4, {
        x: 30,
        ease: Back.easeOut
      });
    }

    function onNextLeave() {
      TweenMax.to($next.find('.project-slide__image'), .4, {
        opacity: 0.6,
        ease: Quint.easeOut
      });
      TweenMax.to($next.add($content), .4, {
        x: 0,
        ease: Quint.easeOut
      })
      TweenMax.to($next, .4, {
        width: nextWidth,
        ease: Quint.easeOut
      })
      TweenMax.to($('.vertical-title.next'), .4, {
        x: 0,
        ease: Quint.easeOut
      });
    }

    function onPrevLeave() {
      TweenMax.to($prev.find('.project-slide__image'), .4, {
        opacity: 0.6,
        ease: Quint.easeOut
      });
      TweenMax.to($prev.add($content), .4, {
        x: 0,
        ease: Quint.easeOut
      })
      TweenMax.to($prev, .4, {
        width: nextWidth,
        ease: Quint.easeOut
      })
      TweenMax.to($('.vertical-title.prev'), .4, {
        x: 0,
        ease: Quint.easeOut
      });
    }

    function onNextClick() {
      var timeline = new TimelineMax({
        paused: true,
        onComplete: onComplete
      });

      timeline.to($next.next().find('.project-slide__image'), 0, {
        opacity: 1,
        ease: Power1.easeOut
      });
      timeline.to($slider, .7, {
        x: '-=' + nextWidth,
        ease: Quint.easeOut
      });
      timeline.to($current, .7, {
        width: nextWidth,
        ease: Quint.easeOut
      }, '-=.7');
      timeline.to($next, .7, {
        width: sliderWidth,
        left: '-=' + (sliderWidth - nextWidth),
        x: 0,
        ease: Quint.easeOut
      }, '-=.7');

      if (nextWidth > 70) {
        timeline.to($next.next(), .4, {
          width: 160,
          x: -60,
          ease: Quint.easeOut
        }, '-=.7');
      } else {
        timeline.to($next.find('.project-slide__image'), .4, {
          opacity: 1,
          ease: Power1.easeOut
        }, '-=.4');
        timeline.to($next.next().find('.project-slide__image'), .4, {
          opacity: 0.6,
          ease: Power1.easeOut
        }, '-=.4');
      }

      timeline.to($current.find('.project-slide__image'), .4, {
        opacity: 0.6,
        ease: Power1.easeOut
      }, '-=.4');

      $prev = $current;
      $current = $next;
      $next = $next.next();

      $nextTrigger.off('click', onNextClick);
      animateContentTo($current);
      timeline.play();

      updateBullets(1);

      function onComplete() {
        $slides.first().appendTo($slider).css('left', '+=' + totalWidth);
        $slides = $slider.children();
        setZindex();
        $nextTrigger.on('click', onNextClick);
      }
    }

    function onPrevClick() {
      var timeline = new TimelineMax({
        paused: true,
        onComplete: onComplete
      });

      timeline.to($prev.prev().find('.project-slide__image'), 0, {
        opacity: 1,
        ease: Quint.easeOut
      });
      timeline.to($slider, .7, {
        x: '+=' + nextWidth,
        ease: Quint.easeOut
      });
      timeline.to($current, .7, {
        width: nextWidth,
        left: '+=' + (sliderWidth - nextWidth),
        ease: Quint.easeOut
      }, '-=.7');
      timeline.to($prev, .7, {
        width: sliderWidth,
        x: 0,
        ease: Quint.easeOut
      }, '-=.7');
      timeline.to($prev.prev(), .4, {
        width: 160,
        ease: Quint.easeOut
      }, '-=.7');
      timeline.to($current.find('.project-slide__image'), .4, {
        opacity: 0.6,
        ease: Quint.easeOut
      }, '-=.4');

      $next = $current;
      $current = $prev;
      $prev = $prev.prev();

      $prevTrigger.off('click', onPrevClick);
      animateContentTo($current);
      timeline.play();

      updateBullets(-1);

      function onComplete() {
        $slides.last().prependTo($slider).css('left', '-=' + totalWidth);
        $slides = $slider.children();
        setZindex();
        $prevTrigger.on('click', onPrevClick);
      }
    }

    function updateBullets(offset) {
      var $selectedBullet = $('.rsNavSelected'),
          count = $selectedBullet.index();

      $selectedBullet.removeClass('rsNavSelected');

      if (count + offset == slidesNumber) {
        $('.rsBullet').eq(0).addClass('rsNavSelected');
      } else if (count + offset == -1) {
        $('.rsBullet').eq(slidesNumber - 1).addClass('rsNavSelected');
      } else {
        $('.rsBullet').eq(count + offset).addClass('rsNavSelected');
      }
    }

    function animateContentIn() {

      $content.find('.project-slide__title h1').text($current.data('title'));
      $content.find('.portfolio_types').html($current.data('types'));
      $content.find('a').attr('href', $current.data('link')).attr('title', $current.data('link-title'));

      $current.find('.project-slide__image').css('opacity', 1);
      TweenMax.fromTo($content.find('.project-slide__title h1'), .7, {
        y: '-100%'
      }, {
        y: '0%',
        delay: .5,
        ease: Expo.easeInOut
      });
      TweenMax.fromTo($content.find('.js-title-mask'), .7, {
        y: '100%'
      }, {
        y: '0%',
        delay: .5,
        ease: Expo.easeInOut
      });
      TweenMax.fromTo($content.find('.portfolio_types'), .3, {
        opacity: 0
      }, {
        opacity: 1,
        delay: .9,
        ease: Quint.easeIn
      });
      TweenMax.fromTo($content.find('.project-slide__text'), .4, {
        x: -10,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        delay: 1,
        ease: Quint.easeOut
      });
      // TweenMax.to($('.site-content__mask'), .6, {scaleX: 0, ease: Expo.easeInOut});
    }

    function animateContentTo($slide) {
      var $clone = $content.clone(),
          $nextTitle = $('.vertical-title.next span'),
          $nextClone = $nextTitle.clone().text($slide.next().data('title')),
          $prevTitle = $('.vertical-title.prev span'),
          $prevClone = $prevTitle.clone().text($slide.prev().data('title')),
          timeline = new TimelineMax({
          paused: true,
          onComplete: function () {
            $prevTitle.remove();
            $nextTitle.remove();
            $content.remove();
            $content = $clone;
            $content.djax('.djax-updatable', [], djax.transition);
          }
        });

      $clone.find('.project-slide__title h1').text($slide.data('title'));
      $clone.find('.portfolio_types').html($slide.data('types'));
      $clone.find('a').attr('href', $slide.data('link')).attr('title', $slide.data('link-title'));

      // les types
      var $fadeOut = $content.find('.portfolio_types').add($nextTitle).add($prevTitle),
          $fadeIn = $clone.find('.portfolio_types').add($nextClone).add($prevClone);

      timeline.fromTo($fadeOut, .3, {
        opacity: 1
      }, {
        opacity: 0,
        ease: Quint.easeIn
      });
      timeline.fromTo($fadeIn, .3, {
        opacity: 0
      }, {
        opacity: 1,
        ease: Quint.easeIn
      }, '-=0.2');

      // le title
      timeline.fromTo($content.find('.project-slide__title h1'), .3, {
        opacity: 1
      }, {
        opacity: 0,
        ease: Quint.easeOut
      }, '-=0.3');
      timeline.fromTo($clone.find('.project-slide__title h1'), .5, {
        y: '-100%'
      }, {
        y: '0%',
        ease: Expo.easeOut
      }, '-=0.2');
      timeline.fromTo($clone.find('.js-title-mask'), .5, {
        y: '100%'
      }, {
        y: '0%',
        ease: Expo.easeOut
      }, '-=0.5');

      $content.find('.project-slide__text').css('opacity', 0);
      $nextClone.insertAfter($nextTitle);
      $prevClone.insertAfter($prevTitle);
      $clone.insertAfter($content);
      timeline.play();

    }

    function setZindex() {
      $current.css('z-index', '');
      $prev.css('z-index', 10).prev().css('z-index', 20);
      $next.css('z-index', 10).next().css('z-index', 20);
    }

    return {
      init: init,
      onResize: onResize
    }

  })();
  var Nav = (function () {

    var isOpen;

    function init() {
      isOpen = false;
      bindEvents();
    }

    function bindEvents() {
      $('.js-nav-toggle').on('click', function () {
        if (isOpen) {
          close();
        } else {
          open();
        }
      });

      $('.site-header').on('click', function (e) {
        e.stopPropagation();
      });

      $body.on('click', function () {
        close();
      });
    }

    function open() {
      $body.addClass('navigation--is-visible');
      isOpen = true;
    }

    function close() {
      $body.removeClass('navigation--is-visible');
      isOpen = false;
    }

    return {
      init: init,
      open: open,
      close: close
    }
  })();
  var Overlay = (function () {

    var $trigger, $overlay, isOpen;

    function init() {
      $trigger = $('.js-overlay-trigger');
      $overlay = $('.overlay');
      isOpen = false;
      bindEvents();
    }

    function bindEvents() {
      // Toggle navigation on click
      $trigger.on('click touchstart', navToggle);

      // Close menu with ESC key
      $(document).on('keydown', function (e) {
        if (e.keyCode == 27 && isOpen) {
          navToggle(e);
        }
      });
    }

    function open() {
      $overlay.css('left', 0);
      TweenMax.to($overlay, 0.3, {
        opacity: 1
      });
      $('html').css('overflow', 'hidden');
      isOpen = true;
    }

    function close() {
      TweenMax.to($overlay, 0.3, {
        opacity: 0,
        onComplete: function () {
          $overlay.css('left', '100%');
        }
      });

      $('html').css('overflow', '');
      isOpen = false;
    }


    function navToggle(e) {
      e.preventDefault();
      e.stopPropagation();

      if (isOpen) {
        close();
      } else {
        open();
      }
    }

    return {
      init: init,
      open: open,
      close: close
    }
  })();
  var Placeholder = (function () {
    var $items;

    function update($container, src) {

      var $container = $container || $('body');

      $items = $container.find('.js-placeholder');

      $items.each(function (i, item) {
        var $item = $(item);
        $item.data('actualHeight', $item.height());
      });

      $items.each(function (i, item) {
        var $item = $(item).data('loaded', false),
            width = $item.data('width'),
            height = $item.data('height'),
            newHeight = $item.height(),
            newWidth = newHeight * $item.data('width') / $item.data('height'),
            $image = $(document.createElement('img')).css('opacity', 0);

        $item.width(newWidth);
        $item.data('image', $image);
      });

      $(window).on('DOMContentLoaded load resize scroll djaxLoad', bindImageLoad);
      $('.portfolio--grid, .site-content').on('scroll', bindImageLoad);

      bindImageLoad();

      $(window).on('djaxClick', function () {
        $(window).off('DOMContentLoaded load resize scroll djaxLoad', bindImageLoad);
        $('.portfolio--grid, .site-content').off('scroll', bindImageLoad);
      });
    }

    function bindImageLoad() {

      $items.each(function (i, item) {
        var $item = $(item),
            $image = $item.data('image'),
            src = $item.data('src');

        if (typeof src == "undefined") {
          src = $item.data('srcsmall');
        }

        if ($item.data('loaded')) return;

        if (isElementInViewport($item)) {
          $item.data('loaded', true).removeClass('js-placeholder');
          $image.attr('src', src);
          $image.prependTo($item);
          $image.imagesLoaded(function () {
            TweenMax.to($image, .3, {
              opacity: 1
            });
          });
        };
      });
    }

    return {
      update: update
    }

  })();
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

    var browser = {
      isIe: function () {
        return navigator.appVersion.indexOf("MSIE") != -1;
      },
      navigator: navigator.appVersion,
      getVersion: function () {
        var version = 999; // we assume a sane browser
        if (navigator.appVersion.indexOf("MSIE") != -1)
        // bah, IE again, lets downgrade version number
        version = parseFloat(navigator.appVersion.split("MSIE")[1]);
        return version;
      }
    };

    if (browser.isIe() && browser.getVersion() == 9) {
      $('html').addClass('is--ie9');
    }
  }
  var Portfolio = (function () {

    var $portfolio_container, isLoadingProjects = false,
        
        
        init = function () {
        $portfolio_container = $('.portfolio-wrapper');

        if (!$portfolio_container.length) {
          return;
        }

        $('.navigation').hide();

        bindEvents();

        //if there are not sufficient projects to have scroll - load the next page also (prepending)
        if ($portfolio_container.children('article').last().offset().top < window.innerHeight) {
          loadNextProjects();
        }
        },
        
        
        bindEvents = function () {

        $('.site-content.portfolio-archive').on('scroll', function () {
          requestTick();
        });

        },
        
        
        loadAllProjects = function () {
        var offset = $portfolio_container.find('.portfolio--project').length;

        if (globalDebug) {
          console.log("Loading All Projects - AJAX Offset = " + offset);
        }

        isLoadingProjects = true;

        $.post(
        timber_ajax.ajax_url, {
          action: 'timber_load_next_projects',
          nonce: timber_ajax.nonce,
          offset: offset,
          posts_number: 'all'
        }, function (response_data) {

          if (response_data.success) {
            if (globalDebug) {
              console.log("Loaded all projects");
            }

            var $result = $(response_data.data.posts).filter('article');

            if (globalDebug) {
              console.log("Adding new " + $result.length + " items to the DOM");
            }

            $('.navigation').hide().remove();

            $result.imagesLoaded(function () {

              $portfolio_container.append($result);

              Placeholder.update();

              isLoadingProjects = false;
            });
          }
        });
        },
        
        
        loadNextProjects = function () {
        var offset = $portfolio_container.find('.portfolio--project').length;

        if (globalDebug) {
          console.log("Loading More Projects - AJAX Offset = " + offset);
        }

        isLoadingProjects = true;

        $.post(
        timber_ajax.ajax_url, {
          action: 'timber_load_next_projects',
          nonce: timber_ajax.nonce,
          offset: offset
        }, function (response_data) {

          if (response_data.success) {
            if (globalDebug) {
              console.log("Loaded next projects");
            }

            var $result = $(response_data.data.posts).filter('article');

            if (globalDebug) {
              console.log("Adding new " + $result.length + " items to the DOM");
            }

            $result.imagesLoaded(function () {

              $portfolio_container.append($result);

              Placeholder.update();

              isLoadingProjects = false;
            });
          } else {
            //we have failed
            //it's time to call it a day
            if (globalDebug) {
              console.log("It seems that there are no more projects to load");
            }

            $('.navigation').fadeOut();

            //don't make isLoadingProjects true so we won't load any more projects
          }
        });
        },
        
        
        maybeloadNextProjects = function () {
        if (!$portfolio_container.length || isLoadingProjects) {
          return;
        }

        var $lastChild = $portfolio_container.children('article').last();

        //if the last child is in view then load more projects
        if ($lastChild.is(':appeared')) {
          loadNextProjects();
        }

        }
        
        
        
        return {
        init: init,
        loadAllProjects: loadAllProjects,
        loadNextProjects: loadNextProjects,
        maybeloadNextProjects: maybeloadNextProjects
        }
  })();
  var Project = (function () {

    var $film, $grid, $fullview, start, end, current, initialized = false,
        fullviewWidth = 0,
        fullviewHeight = 0;

    fullviewWidth = windowWidth;
    fullviewHeight = windowHeight;

    function init() {

      if (!$('.single-jetpack-portfolio').length) {
        return;
      }

      if (initialized) {
        return;
      }

      if ($('.project_layout-filmstrip').length) {

        $film = $('.js-portfolio');
        $grid = $film.clone().addClass('portfolio--grid').insertBefore($film);
        $film.addClass('portfolio--filmstrip').addClass('portfolio--visible');

      } else if ($('.project_layout-thumbnails').length) {

        $grid = $('.js-portfolio');
        $film = $grid.clone().addClass('portfolio--filmstrip').insertAfter($grid);
        $grid.addClass('portfolio--grid').addClass('portfolio--visible');

      } else {
        //this is some project type that we don't handle here - like fullscreen
        return;
      }

      $grid.find('.js-portfolio-item').each(function (i, obj) {
        var $item = $(obj);
        $item.data('src', $item.data('srcsmall'));
      });

      $film.find('.js-portfolio-item').each(function (i, obj) {
        var $item = $(obj);
        $item.data('src', $item.data('srcfull'));
      });

      $fullview = $('.fullview');

      addMetadata();
      bindEvents();

      initialized = true;
    }

    function onResize() {
      if ($('.single-jetpack-portfolio').length) {
        resizeFullView();
        resizeFilmstrip();
        getMiddlePoints();
        getReferenceBounds();
      }
    }

    function resizeFilmstrip() {
      $('.portfolio__item').each(function (i, item) {

        var $item = $(item),
            width = $item.data('width'),
            height = $item.data('height'),
            newHeight = $item.height(),
            newWidth = newHeight * $item.data('width') / $item.data('height');

        $item.width(newWidth);

      });
    }

    function resizeFullView() {
      $document.off('mousemove', panFullview);

      var $target = $('.fullview__image'),
          targetWidth = $target.width(),
          targetHeight = $target.height(),
          newWidth = $fullview.width(),
          newHeight = $fullview.height(),
          scaleX = newWidth / targetWidth,
          scaleY = newHeight / targetHeight,
          scale = Math.max(scaleX, scaleY);

      fullviewWidth = targetWidth * scale;
      fullviewHeight = targetHeight * scale;

      $target.find('img').removeAttr('style');
      $target.css({
        width: fullviewWidth,
        height: fullviewHeight,
        top: (fullviewHeight - newHeight) / -2,
        left: (fullviewWidth - newWidth) / -2
      });

      $document.on('mousemove', panFullview);
    }

    function addMetadata() {
      $film.find('.js-portfolio-item').each(function (i, obj) {
        var $item = $(obj),
            captionText = $item.data('caption'),
            $caption = $('<div class="photometa__caption"></div>').html(captionText),
            descriptionText = $item.data('description'),
            $description = $('<div class="photometa__description"></div>').html('<div>' + descriptionText + '</div>'),
            $exif = $('<ul class="photometa__exif  exif"></ul>'),
            $meta = $('<div class="portfolio__meta  photometa"></div>'),
            exifText = $item.data('exif'),
            $full = $('<button class="button-full js-button-full"></button>');

        if (!empty(exifText)) {
          $.each(exifText, function (key, value) {
            $('<li class="exif__item"><i class="exif__icon exif__icon--' + key + '"></i>' + value + '</li>').appendTo($exif);
          });
        }

        $full.prependTo($item);
        $caption.appendTo($meta);
        $exif.appendTo($meta);
        $description.appendTo($meta);

        $meta.appendTo($item);
      });
    }

    function prepare() {

      if (!$('.project_layout-filmstrip').length && !$('.project_layout-thumbnails').length) {
        //we are not in a single project so bail
        return;
      }

      filmWidth = $film.width();
      contentWidth = $('.site-content').width();
      sidebarWidth = $('.site-sidebar').width();

      getMiddlePoints();
      getReferenceBounds();

      $grid.show();
      var $first = $film.find('.js-portfolio-item').first().addClass('portfolio__item--active');
      setCurrent($first);

      if (!$('.project_layout-filmstrip').length) {
        showThumbnails(null, true);
      }
    }

    function bindEvents() {
      $('body').on('click', '.js-show-thumbnails', showThumbnails);
      $('.portfolio--grid').on('click', '.js-portfolio-item', showFilmstrip);
      $('.portfolio--filmstrip').on('click', '.js-portfolio-item', showFullView);
      $('.fullview__close').on('click', hideFullView);
      $('.fullview .rsArrowRight').on('click', showNext);
      $('.fullview .rsArrowLeft').on('click', showPrev);
      $('.js-details').on('click', toggleDetails);
    }

    function unbindEvents() {
      $('body').off('click', '.js-show-thumbnails', showThumbnails);
      $('.portfolio--grid').off('click', '.js-portfolio-item', showFilmstrip);
      $('.portfolio--filmstrip').off('click', '.js-portfolio-item', showFullView);
      $('.fullview__close').off('click', hideFullView);
      $('.fullview .rsArrowRight').off('click', showNext);
      $('.fullview .rsArrowLeft').off('click', showPrev);
      $('.js-details').off('click', toggleDetails);
    }

    function toggleDetails() {
      $body.toggleClass('portfolio--details');
    }

    function destroy() {
      unbindEvents();
      initialized = false;
    }

    function showPrev() {
      var $items = $film.find('.js-portfolio-item'),
          items = $items.length;

      $items.each(function (i, obj) {
        if ($(obj).hasClass('portfolio__item--active')) {
          if (i == 0) {
            fullViewTransition($items.eq(items - 1));
          } else {
            fullViewTransition($items.eq(i - 1));
          }
          return false;
        }
      });
    }

    function showNext() {
      var $items = $film.find('.js-portfolio-item'),
          items = $items.length;

      $items.each(function (i, obj) {
        if ($(obj).hasClass('portfolio__item--active')) {
          if (i == items - 1) {
            fullViewTransition($items.eq(0));
          } else {
            fullViewTransition($items.eq(i + 1));
          }
          return false;
        }
      });
    }

    function fullViewTransition($source) {
      var $target = addImageToFullView($source),
          $toRemove = $('.fullview__image').not($target);

      setCurrent($source);
      panFullview();

      TweenMax.fromTo($target, .3, {
        opacity: 0
      }, {
        opacity: 1,
        onComplete: function () {
          $toRemove.remove();
          centerFilmToTarget($source);
        }
      });
    }

    // loop through each portfolio item and find the one closest to center


    function getCurrent() {

      if (!$('.single-jetpack-portfolio').length) {
        return;
      }

      if (!initialized) {
        init();
      }

      var current = $('.portfolio__item--active').data('middle'),
          reference = latestKnownScrollX + start + (end - start) * latestKnownScrollX / (filmWidth - contentWidth),
          min = Math.abs(reference - current),
          $next;

      $('.js-reference').css('left', reference).text(parseInt(reference, 10));

      $film.find('.js-portfolio-item').each(function (i, obj) {
        var compare = $(obj).data('middle');

        if (Math.abs(compare - reference) < min) {
          min = Math.abs(compare - reference);
          $next = $(obj);
        }
      });

      if (typeof $next !== "undefined") {
        setCurrent($next);
      }
    }

    function getReferenceBounds() {
      var $items = $film.find('.js-portfolio-item'),
          items = $items.length,
          max;

      if (items < 2) {
        return;
      }

      start = $items.eq(0).data('middle') + ($items.eq(1).data('middle') - $items.eq(0).data('middle')) / 2;
      end = contentWidth - filmWidth + $items.eq(items - 2).data('middle') + ($items.eq(items - 1).data('middle') - $items.eq(items - 2).data('middle')) / 2;

      max = Math.max(contentWidth / 2 - start, end - contentWidth / 2, 10);

      start = contentWidth / 2 - max;
      end = contentWidth / 2 + max;
    }

    function getMiddlePoints() {
      $('.portfolio').each(function (i, portfolio) {
        $(portfolio).find('.js-portfolio-item').each(function (i, obj) {
          var $obj = $(obj);
          $obj.data('middle', getMiddle($obj));
          $obj.data('count', i);
        });
      });
    }

    function showThumbnails(e, initial) {
      var $active = $('.portfolio__item--active'),
          $target = $grid.find('.js-portfolio-item').eq($active.data('count'));

      TweenMax.to('.site-footer, .site-sidebar', .3, {
        opacity: 0
      });
      $('.site-footer, .site-sidebar').css('pointer-events', 'none');
      $grid.css('opacity', 1);

      $('.js-portfolio-item').addClass('no-transition');

      TweenMax.to($('.mask--project'), 0, {
        'transform-origin': '0 100%',
        'z-index': 300,
        scaleX: 0
      });

      $film.css('z-index', 200);
      $grid.css('z-index', 400);

      if (typeof initial == "undefined") {
        morph($active, $target, {
          delay: .3
        });
      }

      $grid.find('.js-portfolio-item img').css('opacity', '');

      setTimeout(function () {
        var $items = $grid.find('.js-portfolio-item img');
        $items.sort(function () {
          return 0.5 - Math.random()
        });

        TweenMax.staggerTo($items, .3, {
          opacity: 1,
          ease: Quad.easeInOut
        }, 0.05);
        $('.js-portfolio-item').removeClass('no-transition');
      }, 600);

      TweenMax.to($('.mask--project'), .6, {
        x: 0,
        scaleX: 1,
        ease: Expo.easeInOut,
        onComplete: function () {
          $('.site-content').css('overflow-x', 'hidden');
          $film.removeClass('portfolio--visible');
          $grid.addClass('portfolio--visible');
          TweenMax.to('.mask--project', 0, {
            scaleX: 0
          });
        }
      });

    }

    function showFilmstrip(e) {

      var $clicked = $(this),
          $target = $film.find('.js-portfolio-item').eq($clicked.data('count'));

      $('.site-content').css('overflow-x', '');

      TweenMax.to('.site-footer, .site-sidebar', .3, {
        opacity: 1,
        delay: .3
      });
      $('.site-footer, .site-sidebar').css('pointer-events', 'auto');

      $('.js-portfolio-item').addClass('no-transition');

      $clicked.css('opacity', 0);
      $film.find('.js-portfolio-item').css('opacity', 0);
      $film.find('.js-portfolio-item img').css('opacity', '');

      $target.addClass('portfolio__item--target');

      $film.addClass('portfolio--visible');

      TweenMax.to($('.mask--project'), 0, {
        'transform-origin': '100% 0',
        'z-index': 300
      });
      $film.css('z-index', 400);
      $grid.css('z-index', 200);

      TweenMax.to($('.mask--project'), .6, {
        scale: 1,
        ease: Expo.easeInOut,
        onComplete: function () {
          $grid.removeClass('portfolio--visible');
          $grid.css('opacity', '');
          TweenMax.to($film.find('.js-portfolio-item'), .3, {
            opacity: 1,
            onComplete: function () {
              $('.js-portfolio-item').removeClass('no-transition');
            }
          });
          $target.removeClass('portfolio__item--target');
          TweenMax.to('.mask--project', 0, {
            scaleX: 0
          });
        }
      });

      centerFilmToTarget($target);
      morph($clicked, $target, {}, function () {
        $target.imagesLoaded(function () {
          $target.find('.portfolio__item--clone').remove();
        });
      });

    }

    function centerFilmToTarget($target) {
      $window.scrollLeft($target.data('middle') - $('.site-content').width() / 2 + $('.site-sidebar').width());
    }

    function addImageToFullView($source) {
      // prepare current for fullview
      var width = $source.data('width'),
          height = $source.data('height'),
          newWidth = $fullview.width(),
          newHeight = $fullview.height(),
          scaleX = newWidth / width,
          scaleY = newHeight / height,
          scale = Math.max(scaleX, scaleY),
          $target = $('<div>').addClass('fullview__image'),
          $image = $(document.createElement('img'));

      fullviewWidth = width * scale;
      fullviewHeight = height * scale;

      setCurrent($source);

      $target.css({
        width: fullviewWidth,
        height: fullviewHeight,
        top: (fullviewHeight - newHeight) / -2,
        left: (fullviewWidth - newWidth) / -2
      });

      $fullview.append($target);

      $image.attr('src', $source.data('srcfull')).prependTo($target);

      return $target;
    }

    function showFullView(e) {

      // prepare current for fullview
      var $source = $(this),
          $target = addImageToFullView($source);

      morph($source, $target);

      setTimeout(function () {
        TweenMax.to($('.fullview__image img'), .5, {
          x: (windowWidth / 2 - latestKnownMouseX) * (fullviewWidth - windowWidth) / windowWidth,
          y: (windowHeight / 2 - latestKnownMouseY) * (fullviewHeight - windowHeight) / windowHeight,
          ease: Back.easeOut,
          onComplete: function () {
            $document.on('mousemove', panFullview);
          }
        });
      }, 500);

      $fullview.addClass('fullview--visible');
    }

    function panFullview() {

      $('.fullview__image img').each(function (i, obj) {
        var $img = $(obj),
            imgWidth = $img.width(),
            imgHeight = $img.height();

        if (imgWidth > windowWidth) {
          TweenMax.to($img, 0, {
            x: (windowWidth / 2 - latestKnownMouseX) * (imgWidth - windowWidth) / windowWidth
          });
        }

        if (imgHeight > windowHeight) {
          TweenMax.to($img, 0, {
            y: (windowHeight / 2 - latestKnownMouseY) * (imgHeight - windowHeight) / windowHeight
          });
        }
      })
    }

    function hideFullView() {
      var $source = $('.fullview__image'),
          $target = $('.portfolio__item--active');

      $document.off('mousemove', panFullview);
      $('.site-content').addClass('site-content--fullview');

      TweenMax.to($('.fullview__image img'), .3, {
        x: 0,
        y: 0,
        onComplete: function () {
          morph($source, $target, {}, function () {
            $('.site-content').removeClass('site-content--fullview');
            // setTimeout(function() {
            // });
          });
          setTimeout(function () {
            $fullview.removeClass('fullview--visible');
            $source.remove();
          });
        }
      });
    }

    function morph($source, $target, options, callback, remove) {
      var sourceOffset = $source.offset(),
          sourceWidth = $source.width(),
          sourceHeight = $source.height(),
          targetOffset = $target.offset(),
          targetWidth = $target.width(),
          targetHeight = $target.height(),
          $clone = $source.clone().addClass('portfolio__item--clone');

      remove = typeof remove == "undefined" ? true : remove;

      $clone.css({
        position: 'absolute',
        top: sourceOffset.top - targetOffset.top,
        left: sourceOffset.left - targetOffset.left,
        width: sourceWidth,
        height: sourceHeight,
        background: 'none'
      });

      $target.css({
        position: 'relative',
        transition: 'none',
        'z-index': '10000',
        opacity: 1,
        background: 'none'
      });

      $clone.css('opacity', 1);
      $clone.find('img').css('opacity', 1);
      $target.find('img').css('opacity', 0);

      var defaults = {
        x: targetOffset.left - sourceOffset.left + (targetWidth - sourceWidth) / 2,
        y: targetOffset.top - sourceOffset.top + (targetHeight - sourceHeight) / 2,
        scale: targetWidth / sourceWidth,
        force3D: true,
        ease: Expo.easeInOut,
        onComplete: function () {
          $target.find('img').css('opacity', 1);
          $target.css({
            background: '',
            position: '',
            'z-index': '',
            transition: '',
            opacity: ''
          });
          TweenMax.fromTo($target.children('.photometa'), .3, {
            opacity: 0
          }, {
            opacity: 1
          });
          $source.css('opacity', '');

          if (remove) {
            $clone.remove();
          }

          if (typeof callback !== "undefined") {
            callback();
          }
        }
      },
          config = $.extend(defaults, options);

      requestAnimationFrame(function () {
        TweenMax.to($target.children('.photometa'), 0, {
          opacity: 0
        });
        $clone.prependTo($target);
        TweenMax.to($clone.children('.photometa'), .3, {
          opacity: 0
        });
        TweenMax.to($clone, .5, config);
      });
    }

    function getMiddle($image) {
      return $image.offset().left + $image.width() / 2 - $film.offset().left;
    }

    function setCurrent($current) {
      $film.find('.js-portfolio-item').removeClass('portfolio__item--active');
      $current.addClass('portfolio__item--active');
      $('.portfolio__position').text($current.data('count') + 1 + ' of ' + $film.find('.js-portfolio-item').not('.portfolio__item--clone').length);
    }

    return {
      init: init,
      prepare: prepare,
      onResize: onResize,
      getCurrent: getCurrent,
      destroy: destroy
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
    // Helper function
    // examples
    // console.log(padLeft(23,5));       //=> '00023'
    // console.log(padLeft(23,5,'>>'));  //=> '>>>>>>23'


    function padLeft(nr, n, str) {
      return Array(n - String(nr).length + 1).join(str || '0') + nr;
    }

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
      numImagesToPreload: 4
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
    // don't need it if we have only one slide
    if (royalSlider && slidesNumber > 1) {

      var $slides_total = $('.js-gallery-slides-total'),
          $decimal = $('.js-decimal'),
          $unit = $('.js-unit');

      //slidesNumber = (slidesNumber < 10) ? padLeft(slidesNumber, 2) : slidesNumber;
      $slides_total.html(slidesNumber);

      royalSlider.ev.on('rsBeforeAnimStart', function (event) {
        var currentSlide = royalSlider.currSlideId + 1;
        $unit.html(currentSlide);
      });
    }

    if (slidesNumber == 1) {
      $slider.addClass('single-slide');
    }

    $slider.addClass('slider--loaded');

    if ($slider.hasClass('pixslider')) {
      var $arrows = $slider.find('.rsArrow');
      $arrows.appendTo($slider);

      var tl = new TimelineLite({
        delay: 0.5,
        paused: true
      });
      tl.to($slider, 0, {
        'overflow': 'visible'
      }).fromTo($arrows, 0.3, {
        opacity: 0
      }, {
        opacity: 1
      });
      tl.play();
    }

  }
  window.videos = (function () {

    function init() {
      if (globalDebug) {
        console.group("videos::init");
      }

      var videos = $('.jetpack-video-wrapper iframe, .youtube-player, .entry-media iframe, .entry-media video, .entry-media embed, .entry-media object, iframe[width][height]');

      // Figure out and save aspect ratio for each video
      videos.each(function () {
        var w = $(this).width(),
            h = $(this).height();

        $(this).attr('data-aspectRatio', w / h)
        // and remove the hard coded width/height
        .removeAttr('height').removeAttr('width');
      });

      resize();

      // Firefox Opacity Video Hack
      $('iframe').each(function () {
        var url = $(this).attr("src");
        if (!empty(url)) $(this).attr("src", setQueryParameter(url, "wmode", "transparent"));
      });

      if (globalDebug) {
        console.groupEnd();
      }
    }

    function resize() {
      if (globalDebug) {
        console.group("videos::resize");
      }

      var videos = $('.jetpack-video-wrapper iframe, .youtube-player, .entry-media iframe, .entry-media video, .entry-media embed, .entry-media object, iframe[data-aspectRatio]');

      videos.each(function () {
        var video = $(this),
            ratio = video.attr('data-aspectRatio'),
            w = video.width(),
            h = w / ratio;

        if (video.closest('.portfolio__item--video').length) {
          if (globalDebug) {
            console.log(w, h, ratio);
          }
          h = video.closest('.portfolio__item--video').height();
          w = h * ratio;
        }

        video.height(h);
        video.width(w);
      });

      if (globalDebug) {
        console.groupEnd();
      }
    }

    return {
      init: init,
      resize: resize
    }
  })();
  // /* ====== ON DOCUMENT READY ====== */
  $(document).ready(function () {
    init();
  });


  function init() {
    browserSupport();
    platformDetect();
    browserSize();
    djax.init();
    scrollToTop();
    Loader.init();
    Nav.init();
    Overlay.init();

    //Loads the addThis script - this should be run just once
    AddThisIcons.init();
  }

  function softInit() {

    sizeColumns();

    if ($('.single-jetpack-portfolio').length) {
      Project.init();
      Placeholder.update();
      Project.prepare();
    } else {
      Placeholder.update();
    }

    Portfolio.init();
    Blog.init();

    frontpageSlider.init();

    AddThisIcons.softInit();
    royalSliderInit();
    videos.init();

    checkProfileImageWidget();

    $('.site-header, #page, .site-footer').css('opacity', 1);

    TweenMax.fromTo('.loader', .6, {
      left: 0
    }, {
      left: '-100%',
      ease: Expo.easeInOut,
    });
    TweenMax.to('.mask--page', .6, {
      left: '100%',
      ease: Expo.easeInOut,
      onComplete: function () {
        $('.mask--page').css('left', '-100%');
        $('.mask--page').removeClass('is-on-top');
      }
    });

    if ($body.hasClass('blog') || $body.hasClass('project_layout-filmstrip') || $body.hasClass('project_layout-thumbnails')) {

      if (!$html.hasClass('is--ie9'))
      // html body are for ie
      $('html, body, *').mousewheel(function (event, delta) {
        // this.scrollLeft -= (delta * 30);
        if ($('.filmstrip').length || $('.portfolio--filmstrip.portfolio--visible').length) {
          this.scrollLeft -= (delta * event.deltaFactor); // delta for macos
          event.preventDefault();
        }
      });
    }

    $(".pixcode--tabs").organicTabs();
  }

  // /* ====== ON WINDOW LOAD ====== */
  $window.load(function () {
    console.log('load');
    softInit();
    eventHandlers();
  });

  // /* ====== ON RESIZE ====== */

  function onResize() {
    browserSize();
    sizeColumns();
    Project.onResize();
    frontpageSlider.onResize();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }

  function update() {
    Project.getCurrent();
    Portfolio.maybeloadNextProjects();
    Blog.maybeLoadNextPosts();
    ticking = false;
  }

  function eventHandlers() {
    $window.on('debouncedresize', onResize);

    $window.on('scroll', function () {
      latestKnownScrollY = window.scrollY;
      latestKnownScrollX = window.scrollX;
      requestTick();
    });

    $document.mousemove(function (e) {
      latestKnownMouseX = e.pageX - latestKnownScrollX;
      latestKnownMouseY = e.pageY - latestKnownScrollY;
    });
  } /* ====== HELPER FUNCTIONS ====== */


  /**
   * Detect what platform are we on (browser, mobile, etc)
   */

  function browserSupport() {
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

      TweenMax.to($(window), 1, {
        scrollTo: {
          y: 0,
          autoKill: true
        },
        ease: Power3.easeOut
      });
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
    var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i"),
        separator = '';
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

  function isElementInViewport(el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) && /*or $(window).width() */
    rect.bottom >= 0 && rect.right >= 0);
  }

  function sizeColumns() {

    $('.portfolio__item--text').each(function (i, obj) {
      var $item = $(obj).css('width', ''),
          itemOffset = $item.offset().left,
          $children, $last, width;

      $children = $(obj).children();

      if (!$children.length) {
        $item.remove();
        return;
      }

      $last = $children.last();
      width = $last.offset().left - itemOffset + $last.outerWidth()

      $item.width(width);
    });

  }

  function checkProfileImageWidget() {
    var $widget_container = $('.overlay__col.col1');
    if ($widget_container.length) {
      //if ($widget_container.find('.widget_timber_image')) {
      if ($widget_container.find('.widget_timber_image').length) {
        $widget_container.addClass('has--widget-profile-image');
      } else {
        $('.overlay').addClass('is--scrollable');
      }
    }
  }

})(jQuery);