var e, t;
(e = this),
  (t = function(e) {
    'use strict';
    var t = 'default' in e ? e.default : e,
      n = function(e, t) {
        return (n =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, t) {
              e.__proto__ = t;
            }) ||
          function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          })(e, t);
      },
      r = function() {
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
            t.style.transform +=
              'rotateX(' + e.tiltAngleX + 'deg) rotateY(' + e.tiltAngleY + 'deg) ';
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
      };
    return (function(e) {
      function r() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (
          (t.wrapperEl = {
            node: null,
            size: { width: 0, height: 0, left: 0, top: 0 },
            clientPosition: { x: null, y: null, xPercentage: 0, yPercentage: 0 },
            transitionTimeoutId: void 0,
            updateAnimationId: null,
            childrenImgsCounter: 0,
            childrenImgsLength: 0,
            scale: 1,
          }),
          (t.tilt = null),
          (t.glare = null),
          (t.loadWrapperAndChildElements = function() {
            var e = Array.from(t.wrapperEl.node.getElementsByTagName('img'));
            (t.wrapperEl.childrenImgsLength = e.length),
              0 !== t.wrapperEl.childrenImgsLength
                ? e.forEach(function(e) {
                    e.complete
                      ? t.allImagesLoaded()
                      : e.addEventListener('load', t.allImagesLoaded);
                  })
                : t.setSize();
          }),
          (t.allImagesLoaded = function() {
            t.wrapperEl.childrenImgsCounter++,
              t.wrapperEl.childrenImgsCounter === t.wrapperEl.childrenImgsLength && t.setSize();
          }),
          (t.setSize = function() {
            t.setWrapperElSize(), t.glare && t.glare.setSize(t.wrapperEl.size);
          }),
          (t.mainLoop = function(e) {
            null !== t.wrapperEl.updateAnimationId &&
              cancelAnimationFrame(t.wrapperEl.updateAnimationId),
              t.processInput(e),
              t.update(e.type),
              (t.wrapperEl.updateAnimationId = requestAnimationFrame(t.renderFrame));
          }),
          (t.onEnter = function(e) {
            var n = t.props.onEnter;
            (t.wrapperEl.node.style.willChange = 'transform'), t.setTransition(), n && n(e.type);
          }),
          (t.onMove = function(e) {
            t.mainLoop(e);
            var n = t.props.onMove,
              r = 0,
              i = 0;
            t.glare && ((r = t.glare.glareAngle), (i = t.glare.glareOpacity)),
              n &&
                n(
                  t.tilt.tiltAngleX,
                  t.tilt.tiltAngleY,
                  t.tilt.tiltAngleXPercentage,
                  t.tilt.tiltAngleYPercentage,
                  r,
                  i,
                  e.type,
                );
          }),
          (t.onLeave = function(e) {
            var n = t.props.onLeave;
            if ((t.setTransition(), n && n(e.type), t.props.reset)) {
              var r = new CustomEvent('autoreset');
              t.onMove(r);
            }
          }),
          (t.processInput = function(e) {
            var n = t.props.scale;
            switch (e.type) {
              case 'mousemove':
                (t.wrapperEl.clientPosition.x = e[t.props.fixed ? 'clientX' : 'pageX']),
                  (t.wrapperEl.clientPosition.y = e[t.props.fixed ? 'clientY' : 'pageY']),
                  (t.wrapperEl.scale = n);
                break;
              case 'touchmove':
                (t.wrapperEl.clientPosition.x = e.touches[0][t.props.fixed ? 'clientX' : 'pageX']),
                  (t.wrapperEl.clientPosition.y =
                    e.touches[0][t.props.fixed ? 'clientY' : 'pageY']),
                  (t.wrapperEl.scale = n);
                break;
              case 'deviceorientation':
                t.processInputDeviceOrientation(e), (t.wrapperEl.scale = n);
                break;
              case 'autoreset':
                (t.wrapperEl.clientPosition.xPercentage = 0),
                  (t.wrapperEl.clientPosition.yPercentage = 0),
                  (t.wrapperEl.scale = 1);
            }
          }),
          (t.processInputDeviceOrientation = function(e) {
            if (e.gamma && e.beta && t.props.gyroscope) {
              var n = t.props,
                r = n.tiltMaxAngleY,
                i = e.gamma;
              (t.wrapperEl.clientPosition.xPercentage = (e.beta / n.tiltMaxAngleX) * 100),
                (t.wrapperEl.clientPosition.yPercentage = (i / r) * 100),
                (t.wrapperEl.clientPosition.xPercentage = a(
                  t.wrapperEl.clientPosition.xPercentage,
                  -100,
                  100,
                )),
                (t.wrapperEl.clientPosition.yPercentage = a(
                  t.wrapperEl.clientPosition.yPercentage,
                  -100,
                  100,
                ));
            }
          }),
          (t.update = function(e) {
            var n = t.props,
              r = n.tiltEnable,
              i = n.flipVertically,
              l = n.flipHorizontally;
            t.updateClientInput(e),
              r && t.tilt.update(t.wrapperEl.clientPosition, t.props),
              t.updateFlip(),
              t.tilt.updateTiltAnglesPercentage(t.props),
              t.glare && t.glare.update(t.wrapperEl.clientPosition, t.props, i, l);
          }),
          (t.updateClientInput = function(e) {
            if ('autoreset' !== e && 'deviceorientation' !== e) {
              var n, r;
              if (t.props.trackOnWindow) {
                var i = t.wrapperEl.clientPosition,
                  l = i.x;
                (n = (i.y / window.innerHeight) * 200 - 100),
                  (r = (l / window.innerWidth) * 200 - 100);
              } else {
                var o = t.wrapperEl,
                  s = o.size,
                  p = o.clientPosition;
                (n = ((p.y - s.top) / s.height) * 200 - 100),
                  (r = (((l = p.x) - s.left) / s.width) * 200 - 100);
              }
              (t.wrapperEl.clientPosition.xPercentage = a(n, -100, 100)),
                (t.wrapperEl.clientPosition.yPercentage = a(r, -100, 100));
            }
          }),
          (t.updateFlip = function() {
            var e = t.props,
              n = e.flipHorizontally;
            e.flipVertically && ((t.tilt.tiltAngleX += 180), (t.tilt.tiltAngleY *= -1)),
              n && (t.tilt.tiltAngleY += 180);
          }),
          (t.renderFrame = function() {
            t.resetWrapperElTransform(),
              t.renderPerspective(),
              t.tilt.render(t.wrapperEl.node),
              t.renderScale(),
              t.glare && t.glare.render(t.props);
          }),
          t
        );
      }
      return (
        (function(e, t) {
          function r() {
            this.constructor = e;
          }
          n(e, t),
            (e.prototype = null === t ? Object.create(t) : ((r.prototype = t.prototype), new r()));
        })(r, e),
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
          var e = this,
            n = this.props;
          return t.createElement(
            'div',
            {
              ref: function(t) {
                return (e.wrapperEl.node = t);
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
    })(e.PureComponent);
  }),
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t(require('react')))
    : 'function' == typeof define && define.amd
    ? define(['react'], t)
    : ((e = e || self)['react-parallax-tilt'] = t(e.React));
//# sourceMappingURL=react-parallax-tilt.umd.js.map
