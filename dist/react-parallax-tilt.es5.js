import e, { PureComponent as t } from 'react';
var n = function(e, t) {
  return (n =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function(e, t) {
        e.__proto__ = t;
      }) ||
    function(e, t) {
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
    })(e, t);
};
var r = function() {
    return (r =
      Object.assign ||
      function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var i in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
      }).apply(this, arguments);
  },
  i = r(
    r(
      {
        fixed: !1,
        scale: 1,
        perspective: 1e3,
        flipVertically: !1,
        flipHorizontally: !1,
        reset: !0,
        transitionEasing: 'cubic-bezier(.03,.98,.52,.99)',
        transitionSpeed: 400,
        trackOnWindow: !1,
        gyroscope: !1,
      },
      {
        tiltEnable: !0,
        tiltReverse: !1,
        tiltMaxAngleX: 20,
        tiltMaxAngleY: 20,
        tiltAxis: null,
        tiltAngleXManual: null,
        tiltAngleYManual: null,
      },
    ),
    {
      glareEnable: !1,
      glareMaxOpacity: 0.7,
      glareColor: '#ffffff',
      glarePosition: 'bottom',
      glareReverse: !1,
    },
  );
function l(e, t, n, r, i) {
  return (
    void 0 === i && (i = null),
    i && clearTimeout(i),
    (e.style.transition = t + ' ' + n + 'ms ' + r),
    setTimeout(function() {
      e.style.transition = '';
    }, n)
  );
}
function a(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
var o = 90,
  s = function() {
    var e = this;
    (this.glareAngle = 0),
      (this.glareOpacity = 0),
      (this.tiltAngleX = 0),
      (this.tiltAngleY = 0),
      (this.tiltAngleXPercentage = 0),
      (this.tiltAngleYPercentage = 0),
      (this.update = function(t, n) {
        e.updateTilt(t, n),
          e.updateTiltManualInput(t, n),
          e.updateTiltReverse(n),
          e.updateTiltLimits(n);
      }),
      (this.updateTilt = function(t, n) {
        var r = t.yPercentage,
          i = n.tiltMaxAngleY;
        (e.tiltAngleX = (t.xPercentage * n.tiltMaxAngleX) / 100),
          (e.tiltAngleY = ((r * i) / 100) * -1);
      }),
      (this.updateTiltManualInput = function(t, n) {
        var r = n.tiltAngleXManual,
          i = n.tiltAngleYManual,
          l = n.tiltMaxAngleX,
          a = n.tiltMaxAngleY;
        (null === r && null === i) ||
          ((e.tiltAngleX = null !== r ? r : 0),
          (e.tiltAngleY = null !== i ? i : 0),
          (t.xPercentage = (100 * e.tiltAngleX) / l),
          (t.yPercentage = (100 * e.tiltAngleY) / a));
      }),
      (this.updateTiltReverse = function(t) {
        var n = t.tiltReverse ? -1 : 1;
        (e.tiltAngleX = n * e.tiltAngleX), (e.tiltAngleY = n * e.tiltAngleY);
      }),
      (this.updateTiltLimits = function(t) {
        var n = t.tiltAxis;
        (e.tiltAngleX = a(e.tiltAngleX, -o, o)),
          (e.tiltAngleY = a(e.tiltAngleY, -o, o)),
          n &&
            ((e.tiltAngleX = 'x' === n ? e.tiltAngleX : 0),
            (e.tiltAngleY = 'y' === n ? e.tiltAngleY : 0));
      }),
      (this.updateTiltAnglesPercentage = function(t) {
        var n = t.tiltMaxAngleY;
        (e.tiltAngleXPercentage = (e.tiltAngleX / t.tiltMaxAngleX) * 100),
          (e.tiltAngleYPercentage = (e.tiltAngleY / n) * 100);
      }),
      (this.render = function(t) {
        t.style.transform += 'rotateX(' + e.tiltAngleX + 'deg) rotateY(' + e.tiltAngleY + 'deg) ';
      });
  },
  p = 2,
  c = function(e, t) {
    var n = this;
    void 0 === t && (t = 1),
      (this.glareElArr = []),
      (this.glareAngle = 0),
      (this.glareOpacity = 0),
      (this.calculateGlareSize = function(e) {
        var t = p * Math.max(e.width, e.height);
        return { width: t, height: t };
      }),
      (this.setSize = function(e) {
        for (var t = n.calculateGlareSize(e), r = 0, i = n.glareElArr.length; r < i; r++)
          (n.glareElArr[r].glareEl.style.width = t.width + 'px'),
            (n.glareElArr[r].glareEl.style.height = t.height + 'px');
      }),
      (this.update = function(e, t, r, i) {
        n.updateAngle(e, t.glareReverse), n.updateOpacity(e, t, r, i);
      }),
      (this.updateAngle = function(e, t) {
        var r = e.xPercentage,
          i = 180 / Math.PI,
          l = r ? Math.atan2(e.yPercentage, -r) * i : 0;
        n.glareAngle = l - (t ? 180 : 0);
      }),
      (this.updateOpacity = function(e, t, r, i) {
        var l,
          o = e.xPercentage,
          s = e.yPercentage,
          p = t.glareReverse,
          c = t.glareMaxOpacity,
          g = r ? -1 : 1,
          d = i ? -1 : 1;
        switch (t.glarePosition) {
          case 'top':
            l = -o * g;
            break;
          case 'right':
            l = s * d;
            break;
          case 'bottom':
            l = o * g;
            break;
          case 'left':
            l = -s * d;
            break;
          case 'all':
            l = Math.hypot(o, s);
            break;
          default:
            l = o * g;
        }
        var u = a((l = p ? -l : l), 0, 100);
        n.glareOpacity = (u * c) / 100;
      }),
      (this.render = function(e) {
        for (
          var t = 'linear-gradient(0deg, rgba(255,255,255,0) 0%, ' + e.glareColor + ' 100%)',
            r = 0,
            i = n.glareElArr.length;
          r < i;
          r++
        )
          (n.glareElArr[r].glareEl.style.transform =
            'rotate(' + n.glareAngle + 'deg) translate(-50%, -50%)'),
            (n.glareElArr[r].glareEl.style.opacity = n.glareOpacity.toString()),
            (n.glareElArr[r].glareEl.style.background = t);
      });
    for (
      var r = {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        },
        i = this.calculateGlareSize(e),
        l = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          'transform-origin': '0% 0%',
          'pointer-events': 'none',
          width: i.width + 'px',
          height: i.height + 'px',
        },
        o = 0;
      o < t;
      o++
    ) {
      var s = document.createElement('div'),
        c = document.createElement('div');
      s.appendChild(c),
        (s.className = 'glare-wrapper'),
        (c.className = 'glare'),
        Object.assign(s.style, r),
        Object.assign(c.style, l),
        this.glareElArr.push({ glareEl: c, glareWrapperEl: s, transitionTimeoutId: void 0 });
    }
  },
  g = (function(t) {
    function r() {
      var e = (null !== t && t.apply(this, arguments)) || this;
      return (
        (e.wrapperEl = {
          node: null,
          size: { width: 0, height: 0, left: 0, top: 0 },
          clientPosition: { x: null, y: null, xPercentage: 0, yPercentage: 0 },
          transitionTimeoutId: void 0,
          updateAnimationId: null,
          childrenImgsCounter: 0,
          childrenImgsLength: 0,
          scale: 1,
        }),
        (e.tilt = null),
        (e.glare = null),
        (e.loadWrapperAndChildElements = function() {
          var t = Array.from(e.wrapperEl.node.getElementsByTagName('img'));
          (e.wrapperEl.childrenImgsLength = t.length),
            0 !== e.wrapperEl.childrenImgsLength
              ? t.forEach(function(t) {
                  t.complete ? e.allImagesLoaded() : t.addEventListener('load', e.allImagesLoaded);
                })
              : e.setSize();
        }),
        (e.allImagesLoaded = function() {
          e.wrapperEl.childrenImgsCounter++,
            e.wrapperEl.childrenImgsCounter === e.wrapperEl.childrenImgsLength && e.setSize();
        }),
        (e.setSize = function() {
          e.setWrapperElSize(), e.glare && e.glare.setSize(e.wrapperEl.size);
        }),
        (e.mainLoop = function(t) {
          null !== e.wrapperEl.updateAnimationId &&
            cancelAnimationFrame(e.wrapperEl.updateAnimationId),
            e.processInput(t),
            e.update(t.type),
            (e.wrapperEl.updateAnimationId = requestAnimationFrame(e.renderFrame));
        }),
        (e.onEnter = function(t) {
          var n = e.props.onEnter;
          (e.wrapperEl.node.style.willChange = 'transform'), e.setTransition(), n && n(t.type);
        }),
        (e.onMove = function(t) {
          e.mainLoop(t);
          var n = e.props.onMove,
            r = 0,
            i = 0;
          e.glare && ((r = e.glare.glareAngle), (i = e.glare.glareOpacity)),
            n &&
              n(
                e.tilt.tiltAngleX,
                e.tilt.tiltAngleY,
                e.tilt.tiltAngleXPercentage,
                e.tilt.tiltAngleYPercentage,
                r,
                i,
                t.type,
              );
        }),
        (e.onLeave = function(t) {
          var n = e.props.onLeave;
          if ((e.setTransition(), n && n(t.type), e.props.reset)) {
            var r = new CustomEvent('autoreset');
            e.onMove(r);
          }
        }),
        (e.processInput = function(t) {
          var n = e.props.scale;
          switch (t.type) {
            case 'mousemove':
              (e.wrapperEl.clientPosition.x = t[e.props.fixed ? 'clientX' : 'pageX']),
                (e.wrapperEl.clientPosition.y = t[e.props.fixed ? 'clientY' : 'pageY']),
                (e.wrapperEl.scale = n);
              break;
            case 'touchmove':
              (e.wrapperEl.clientPosition.x = t.touches[0][e.props.fixed ? 'clientX' : 'pageX']),
                (e.wrapperEl.clientPosition.y = t.touches[0][e.props.fixed ? 'clientY' : 'pageY']),
                (e.wrapperEl.scale = n);
              break;
            case 'deviceorientation':
              e.processInputDeviceOrientation(t), (e.wrapperEl.scale = n);
              break;
            case 'autoreset':
              (e.wrapperEl.clientPosition.xPercentage = 0),
                (e.wrapperEl.clientPosition.yPercentage = 0),
                (e.wrapperEl.scale = 1);
          }
        }),
        (e.processInputDeviceOrientation = function(t) {
          if (t.gamma && t.beta && e.props.gyroscope) {
            var n = e.props,
              r = n.tiltMaxAngleY,
              i = t.gamma;
            (e.wrapperEl.clientPosition.xPercentage = (t.beta / n.tiltMaxAngleX) * 100),
              (e.wrapperEl.clientPosition.yPercentage = (i / r) * 100),
              (e.wrapperEl.clientPosition.xPercentage = a(
                e.wrapperEl.clientPosition.xPercentage,
                -100,
                100,
              )),
              (e.wrapperEl.clientPosition.yPercentage = a(
                e.wrapperEl.clientPosition.yPercentage,
                -100,
                100,
              ));
          }
        }),
        (e.update = function(t) {
          var n = e.props,
            r = n.tiltEnable,
            i = n.flipVertically,
            l = n.flipHorizontally;
          e.updateClientInput(t),
            r && e.tilt.update(e.wrapperEl.clientPosition, e.props),
            e.updateFlip(),
            e.tilt.updateTiltAnglesPercentage(e.props),
            e.glare && e.glare.update(e.wrapperEl.clientPosition, e.props, i, l);
        }),
        (e.updateClientInput = function(t) {
          if ('autoreset' !== t && 'deviceorientation' !== t) {
            var n, r;
            if (e.props.trackOnWindow) {
              var i = e.wrapperEl.clientPosition,
                l = i.x;
              (n = (i.y / window.innerHeight) * 200 - 100),
                (r = (l / window.innerWidth) * 200 - 100);
            } else {
              var o = e.wrapperEl,
                s = o.size,
                p = o.clientPosition;
              (n = ((p.y - s.top) / s.height) * 200 - 100),
                (r = (((l = p.x) - s.left) / s.width) * 200 - 100);
            }
            (e.wrapperEl.clientPosition.xPercentage = a(n, -100, 100)),
              (e.wrapperEl.clientPosition.yPercentage = a(r, -100, 100));
          }
        }),
        (e.updateFlip = function() {
          var t = e.props,
            n = t.flipHorizontally;
          t.flipVertically && ((e.tilt.tiltAngleX += 180), (e.tilt.tiltAngleY *= -1)),
            n && (e.tilt.tiltAngleY += 180);
        }),
        (e.renderFrame = function() {
          e.resetWrapperElTransform(),
            e.renderPerspective(),
            e.tilt.render(e.wrapperEl.node),
            e.renderScale(),
            e.glare && e.glare.render(e.props);
        }),
        e
      );
    }
    return (
      (function(e, t) {
        function r() {
          this.constructor = e;
        }
        n(e, t),
          (e.prototype = null === t ? Object.create(t) : ((r.prototype = t.prototype), new r()));
      })(r, t),
      (r.prototype.componentDidMount = function() {
        this.loadWrapperAndChildElements(),
          (this.tilt = new s()),
          this.initGlare(),
          this.addEventListeners();
        var e = new CustomEvent('autoreset');
        this.mainLoop(e);
      }),
      (r.prototype.componentWillUnmount = function() {
        clearTimeout(this.wrapperEl.transitionTimeoutId),
          null !== this.wrapperEl.updateAnimationId &&
            cancelAnimationFrame(this.wrapperEl.updateAnimationId),
          this.removeEventListeners();
      }),
      (r.prototype.componentDidUpdate = function() {
        var e = this.props;
        if (!(e.onMove || e.onEnter || e.onLeave)) {
          var t = new CustomEvent('propchange');
          this.mainLoop(t);
        }
      }),
      (r.prototype.addEventListeners = function() {
        var e = this.props,
          t = e.trackOnWindow,
          n = e.gyroscope;
        if (
          (window.addEventListener('resize', this.setSize),
          t &&
            (window.addEventListener('mouseenter', this.onEnter),
            window.addEventListener('mousemove', this.onMove),
            window.addEventListener('mouseout', this.onLeave),
            window.addEventListener('touchstart', this.onEnter),
            window.addEventListener('touchmove', this.onMove),
            window.addEventListener('touchend', this.onLeave)),
          n)
        ) {
          if (!window.DeviceOrientationEvent)
            return void console.error("Browser doesn't support Device Orientation.");
          window.addEventListener('deviceorientation', this.onMove);
        }
      }),
      (r.prototype.removeEventListeners = function() {
        var e = this.props,
          t = e.trackOnWindow,
          n = e.gyroscope;
        window.removeEventListener('resize', this.setSize),
          t &&
            (window.removeEventListener('mouseenter', this.onEnter),
            window.removeEventListener('mousemove', this.onMove),
            window.removeEventListener('mouseout', this.onLeave),
            window.removeEventListener('touchstart', this.onEnter),
            window.removeEventListener('touchmove', this.onMove),
            window.removeEventListener('touchend', this.onLeave)),
          n &&
            window.DeviceOrientationEvent &&
            window.removeEventListener('deviceorientation', this.onMove);
      }),
      (r.prototype.setWrapperElSize = function() {
        var e = this.wrapperEl.node.getBoundingClientRect();
        (this.wrapperEl.size.width = this.wrapperEl.node.offsetWidth),
          (this.wrapperEl.size.height = this.wrapperEl.node.offsetHeight),
          (this.wrapperEl.size.left = e.left + (this.props.fixed ? 0 : window.scrollX)),
          (this.wrapperEl.size.top = e.top + (this.props.fixed ? 0 : window.scrollY));
      }),
      (r.prototype.initGlare = function() {
        var e,
          t,
          n = this.props,
          r = n.glareParentEl;
        if (n.glareEnable) {
          var i = !(null === (e = r) || void 0 === e || !e.length);
          if (((this.glare = new c(this.wrapperEl.size, i ? r.length : 1)), i))
            for (var l = 0, a = r.length; l < a; l++)
              null === (t = r[l].current) ||
                void 0 === t ||
                t.appendChild(this.glare.glareElArr[l].glareWrapperEl);
          else this.wrapperEl.node.appendChild(this.glare.glareElArr[0].glareWrapperEl);
        }
      }),
      (r.prototype.resetWrapperElTransform = function() {
        this.wrapperEl.node.style.transform = '';
      }),
      (r.prototype.renderPerspective = function() {
        this.wrapperEl.node.style.transform += 'perspective(' + this.props.perspective + 'px) ';
      }),
      (r.prototype.renderScale = function() {
        var e = this.wrapperEl.scale;
        this.wrapperEl.node.style.transform += 'scale3d(' + e + ',' + e + ',' + e + ')';
      }),
      (r.prototype.setTransition = function() {
        var e = this.props,
          t = e.transitionSpeed,
          n = e.transitionEasing;
        if (
          ((this.wrapperEl.transitionTimeoutId = l(
            this.wrapperEl.node,
            'all',
            t,
            n,
            this.wrapperEl.transitionTimeoutId,
          )),
          this.glare)
        )
          for (var r = 0, i = this.glare.glareElArr.length; r < i; r++)
            this.glare.glareElArr[r].transitionTimeoutId = l(
              this.glare.glareElArr[r].glareEl,
              'opacity',
              t,
              n,
              this.glare.glareElArr[r].transitionTimeoutId,
            );
      }),
      (r.prototype.render = function() {
        var t = this,
          n = this.props;
        return e.createElement(
          'div',
          {
            ref: function(e) {
              return (t.wrapperEl.node = e);
            },
            onMouseEnter: this.onEnter,
            onMouseMove: this.onMove,
            onMouseLeave: this.onLeave,
            onTouchStart: this.onEnter,
            onTouchMove: this.onMove,
            onTouchEnd: this.onLeave,
            className: n.className,
            style: n.style,
          },
          n.children,
        );
      }),
      (r.defaultProps = i),
      r
    );
  })(t);
export default g;
//# sourceMappingURL=react-parallax-tilt.es5.js.map
