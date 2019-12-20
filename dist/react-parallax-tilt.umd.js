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
      i = function() {
        return (i =
          Object.assign ||
          function(e) {
            for (var t, n = 1, i = arguments.length; n < i; n++)
              for (var r in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e;
          }).apply(this, arguments);
      },
      r = i(
        i(
          {
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
    function a(e, t, n, i, r) {
      return (
        void 0 === r && (r = null),
        r && clearTimeout(r),
        (e.style.transition = t + ' ' + n + 'ms ' + i),
        setTimeout(function() {
          e.style.transition = '';
        }, n)
      );
    }
    function l(e, t, n) {
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
            var i = t.yPercentage,
              r = n.tiltMaxAngleY;
            (e.tiltAngleX = (t.xPercentage * n.tiltMaxAngleX) / 100),
              (e.tiltAngleY = ((i * r) / 100) * -1);
          }),
          (this.updateTiltManualInput = function(t, n) {
            var i = n.tiltAngleXManual,
              r = n.tiltAngleYManual,
              a = n.tiltMaxAngleX,
              l = n.tiltMaxAngleY;
            (null === i && null === r) ||
              ((e.tiltAngleX = null !== i ? i : 0),
              (e.tiltAngleY = null !== r ? r : 0),
              (t.xPercentage = (100 * e.tiltAngleX) / a),
              (t.yPercentage = (100 * e.tiltAngleY) / l));
          }),
          (this.updateTiltReverse = function(t) {
            var n = t.tiltReverse ? -1 : 1;
            (e.tiltAngleX = n * e.tiltAngleX), (e.tiltAngleY = n * e.tiltAngleY);
          }),
          (this.updateTiltLimits = function(t) {
            var n = t.tiltAxis;
            (e.tiltAngleX = l(e.tiltAngleX, -o, o)),
              (e.tiltAngleY = l(e.tiltAngleY, -o, o)),
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
      c = function(e) {
        var t = this;
        (this.glareAngle = 0),
          (this.glareOpacity = 0),
          (this.calculateGlareSize = function(e) {
            return { width: e.width * p, height: e.height * p };
          }),
          (this.setSize = function(e) {
            var n = t.calculateGlareSize(e);
            (t.glareEl.style.width = n.width + 'px'), (t.glareEl.style.height = n.height + 'px');
          }),
          (this.update = function(e, n, i, r) {
            t.updateAngle(e, n.glareReverse), t.updateOpacity(e, n, i, r);
          }),
          (this.updateAngle = function(e, n) {
            var i = e.xPercentage,
              r = 180 / Math.PI,
              a = i ? Math.atan2(e.yPercentage, -i) * r : 0;
            t.glareAngle = a - (n ? 180 : 0);
          }),
          (this.updateOpacity = function(e, n, i, r) {
            var a,
              o = e.xPercentage,
              s = e.yPercentage,
              p = n.glareReverse,
              c = n.glareMaxOpacity,
              g = i ? -1 : 1,
              u = r ? -1 : 1;
            switch (n.glarePosition) {
              case 'top':
                a = -o * g;
                break;
              case 'right':
                a = s * u;
                break;
              case 'bottom':
                a = o * g;
                break;
              case 'left':
                a = -s * u;
                break;
              case 'all':
                a = Math.hypot(o, s);
                break;
              default:
                a = o * g;
            }
            var d = l((a = p ? -a : a), 0, 100);
            t.glareOpacity = (d * c) / 100;
          }),
          (this.render = function(e) {
            var n = e.glareColor;
            (t.glareEl.style.transform = 'rotate(' + t.glareAngle + 'deg) translate(-50%, -50%)'),
              (t.glareEl.style.opacity = t.glareOpacity.toString()),
              (t.glareEl.style.background =
                'linear-gradient(0deg, rgba(255,255,255,0) 0%, ' + n + ' 100%)');
          }),
          (this.glareWrapperEl = document.createElement('div')),
          (this.glareEl = document.createElement('div')),
          this.glareWrapperEl.appendChild(this.glareEl),
          (this.glareWrapperEl.className = 'glare-wrapper'),
          (this.glareEl.className = 'glare');
        var n = this.calculateGlareSize(e),
          i = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            'transform-origin': '0% 0%',
            'pointer-events': 'none',
            width: n.width + 'px',
            height: n.height + 'px',
          };
        Object.assign(this.glareWrapperEl.style, {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }),
          Object.assign(this.glareEl.style, i);
      };
    return (function(e) {
      function i() {
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
              i = 0,
              r = 0;
            t.glare && ((i = t.glare.glareAngle), (r = t.glare.glareOpacity)),
              n &&
                n(
                  t.tilt.tiltAngleX,
                  t.tilt.tiltAngleY,
                  t.tilt.tiltAngleXPercentage,
                  t.tilt.tiltAngleYPercentage,
                  i,
                  r,
                  e.type,
                );
          }),
          (t.onLeave = function(e) {
            var n = t.props.onLeave;
            if ((t.setTransition(), n && n(e.type), t.props.reset)) {
              var i = new CustomEvent('autoreset');
              t.onMove(i);
            }
          }),
          (t.processInput = function(e) {
            var n = t.props.scale;
            switch (e.type) {
              case 'mousemove':
                (t.wrapperEl.clientPosition.x = e.pageX),
                  (t.wrapperEl.clientPosition.y = e.pageY),
                  (t.wrapperEl.scale = n);
                break;
              case 'touchmove':
                (t.wrapperEl.clientPosition.x = e.touches[0].pageX),
                  (t.wrapperEl.clientPosition.y = e.touches[0].pageY),
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
                i = n.tiltMaxAngleY,
                r = e.gamma;
              (t.wrapperEl.clientPosition.xPercentage = (e.beta / n.tiltMaxAngleX) * 100),
                (t.wrapperEl.clientPosition.yPercentage = (r / i) * 100),
                (t.wrapperEl.clientPosition.xPercentage = l(
                  t.wrapperEl.clientPosition.xPercentage,
                  -100,
                  100,
                )),
                (t.wrapperEl.clientPosition.yPercentage = l(
                  t.wrapperEl.clientPosition.yPercentage,
                  -100,
                  100,
                ));
            }
          }),
          (t.update = function(e) {
            var n = t.props,
              i = n.tiltEnable,
              r = n.flipVertically,
              a = n.flipHorizontally;
            t.updateClientInput(e),
              i && t.tilt.update(t.wrapperEl.clientPosition, t.props),
              t.updateFlip(),
              t.tilt.updateTiltAnglesPercentage(t.props),
              t.glare && t.glare.update(t.wrapperEl.clientPosition, t.props, r, a);
          }),
          (t.updateClientInput = function(e) {
            if ('autoreset' !== e && 'deviceorientation' !== e) {
              var n, i;
              if (t.props.trackOnWindow) {
                var r = t.wrapperEl.clientPosition,
                  a = r.x;
                (n = (r.y / window.innerHeight) * 200 - 100),
                  (i = (a / window.innerWidth) * 200 - 100);
              } else {
                var o = t.wrapperEl,
                  s = o.size,
                  p = o.clientPosition;
                (n = ((p.y - s.top) / s.height) * 200 - 100),
                  (i = (((a = p.x) - s.left) / s.width) * 200 - 100);
              }
              (t.wrapperEl.clientPosition.xPercentage = l(n, -100, 100)),
                (t.wrapperEl.clientPosition.yPercentage = l(i, -100, 100));
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
          function i() {
            this.constructor = e;
          }
          n(e, t),
            (e.prototype = null === t ? Object.create(t) : ((i.prototype = t.prototype), new i()));
        })(i, e),
        (i.prototype.componentDidMount = function() {
          this.loadWrapperAndChildElements(),
            (this.tilt = new s()),
            this.initGlare(),
            this.addEventListeners();
          var e = new CustomEvent('autoreset');
          this.mainLoop(e);
        }),
        (i.prototype.componentWillUnmount = function() {
          clearTimeout(this.wrapperEl.transitionTimeoutId),
            null !== this.wrapperEl.updateAnimationId &&
              cancelAnimationFrame(this.wrapperEl.updateAnimationId),
            this.removeEventListeners();
        }),
        (i.prototype.componentDidUpdate = function() {
          var e = this.props;
          if (!(e.onMove || e.onEnter || e.onLeave)) {
            var t = new CustomEvent('propchange');
            this.mainLoop(t);
          }
        }),
        (i.prototype.addEventListeners = function() {
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
        (i.prototype.removeEventListeners = function() {
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
        (i.prototype.setWrapperElSize = function() {
          var e = this.wrapperEl.node.getBoundingClientRect();
          (this.wrapperEl.size.width = this.wrapperEl.node.offsetWidth),
            (this.wrapperEl.size.height = this.wrapperEl.node.offsetHeight),
            (this.wrapperEl.size.left = e.left + window.scrollX),
            (this.wrapperEl.size.top = e.top + window.scrollY);
        }),
        (i.prototype.initGlare = function() {
          this.props.glareEnable &&
            ((this.glare = new c(this.wrapperEl.size)),
            this.wrapperEl.node.appendChild(this.glare.glareWrapperEl));
        }),
        (i.prototype.resetWrapperElTransform = function() {
          this.wrapperEl.node.style.transform = '';
        }),
        (i.prototype.renderPerspective = function() {
          this.wrapperEl.node.style.transform += 'perspective(' + this.props.perspective + 'px) ';
        }),
        (i.prototype.renderScale = function() {
          var e = this.wrapperEl.scale;
          this.wrapperEl.node.style.transform += 'scale3d(' + e + ',' + e + ',' + e + ')';
        }),
        (i.prototype.setTransition = function() {
          var e = this.props,
            t = e.transitionSpeed,
            n = e.transitionEasing;
          (this.wrapperEl.transitionTimeoutId = a(
            this.wrapperEl.node,
            'all',
            t,
            n,
            this.wrapperEl.transitionTimeoutId,
          )),
            this.glare &&
              (this.glare.transitionTimeoutId = a(
                this.glare.glareEl,
                'opacity',
                t,
                n,
                this.glare.transitionTimeoutId,
              ));
        }),
        (i.prototype.render = function() {
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
        (i.defaultProps = r),
        i
      );
    })(e.PureComponent);
  }),
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t(require('react')))
    : 'function' == typeof define && define.amd
    ? define(['react'], t)
    : ((e = e || self)['react-parallax-tilt'] = t(e.React));
//# sourceMappingURL=react-parallax-tilt.umd.js.map
