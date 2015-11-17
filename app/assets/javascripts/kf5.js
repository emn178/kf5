//= require kf5.turbolinks

(function(window, config)
{
    "use strict";

    var 
        script = window.document.getElementById('kf5-provide-supportBox'),
        parts = script.src.split('//'),
        host = parts.length > 1 ? parts[0] + '//' + parts[1].split('/')[0] : '',
        kf5Domain = script.getAttribute('kf5-domain'),
        supportboxConfigURL = '//' + kf5Domain + '/supportbox/buttonconfig',
        _config = {
            btn_name           : '帮助按钮',
            facade             : '1', 
            color              : '#7A88FF', 
            position           : 'right',
            iframeURL          : '//' + kf5Domain + '/supportbox/index',
            btn_icon           : '//assets.kf5.com/supportbox/images/icon2.png',
            styleURL           : '//assets.kf5.com/supportbox/css/btn.css',
            template           : '<div id="kw-tab" class="kf5-support-btn" style="{{bg_color}}"> <img src="{{btn_icon}}" alt=""><span>{{title}}</span> </div> <div id="kw-block" class="kf5-support"> <a id="kw-close" class="kf5-close" title="关闭"><i class="kf5-icon-clear"></i></a> <div id="kw-loading" class="kf5-loading"> </div> <iframe id="kw-widget-iframe" src="" scrolling="no" frameborder="0"></iframe> </div>'
        };

    function KF5SupportBox(config)
    {
        this.config = config || {};

        this.init();
    }

    window.KF5SupportBox = KF5SupportBox;

    KF5SupportBox.prototype = {

        el: null,

        getElement: function(selector)
        {
            return window.document.getElementById(selector.replace('#', ''));
        },

        getOpt: function(key)
        {
            if(this.config.hasOwnProperty(key))
            {
                return this.config[key];
            }
            else
            {
                return _config[key];
            }
        },

        init: function()
        {
            this._prepareStyle();

            return this;
        },

        initElements: function()
        {
            this._prepareElement();
            this.append();

            this._bindEvents();
        },

        append: function()
        {
            window.document.body.appendChild(this.el);

            return this;
        },

        _prepareStyle: function()
        {
            var link = window.document.createElement('link');

            link.rel = 'styleSheet';
            link.type = 'text/css';
            link.href = this.getOpt('styleURL');

            var self = this;
            link.onload = function()
            {
                self.initElements();
                link.onload = null;
            };

            window.document.body.appendChild(link);

            return this;
        },

        _prepareElement: function()
        {
            var className = 'kf5-support-123456789';

            // 位置
            if(this.getOpt('position') === 'left')
            {
                className += ' kf5-left';
            }
            else
            {
                className += ' kf5-right'
            }

            // 外观
            className += ' kf5-style' + (parseInt(this.getOpt('facade')) || 1);

            // 设备
            if(this.getOpt('is_mobile'))
            {
                className += ' kf5-mobile';
            }

            this.el = window.document.createElement('div');
            this.el.setAttribute('class', className);
            this.el.setAttribute('id', 'kf5-support-123456789');
            this.el.innerHTML = this.getOpt('template')
                    .replace('{{title}}', this.getOpt('btn_name') || '获取帮助')
                    .replace('{{btn_icon}}', this.getOpt('btn_icon'))
                    .replace('{{bg_color}}', this.getOpt('color') ? 'background:' + this.getOpt('color') : '');

            return this;
        },

        _bindEvents: function()
        {
            var self = this;
            this.getElement('#kw-tab').onclick = function()
            {
                self.open();
            };

            this.getElement('#kw-close').onclick = function()
            {
                self.close();
            };

            this.getElement('#kw-widget-iframe').onload = function()
            {
                // setTimeout(function()
                // {
                    self.getElement('#kw-loading').style.display = 'none';
                // }, 2000);
                
            };

            if(cookie('kf5-supportBox-autoOpen'))
            {
                this.open();
            }

            return this;
        },

        loadIframe: function()
        {
            var iframe = this.getElement('#kw-widget-iframe');

            if(!iframe.getAttribute('src'))
            {
                iframe.setAttribute('src', this.getOpt('iframeURL'));
            }

            return this;
        },

        // resizeIframe: function(data)
        // {
        //     var elem = this.getElement('#kw-block');

        //     if(elem)
        //     {
        //         elem.style.height = parseFloat(data) + 'px';
        //     }
        // },

        open: function(e)
        {
            if(!this.isOpened)
            {
                var self = this;

                this.loadIframe();
                slideDown(this.getElement('#kw-tab'), {duration: 200, easing: 'swing'});
                slideUp(self.getElement('#kw-block'), {duration: 200, easing: 'swing'});

                cookie('kf5-supportBox-autoOpen', 1, {expires: 3 / 24, path: '/'});

                this.isOpened = true;
            }
        },

        close: function(e)
        {
            // slideDown(this.getElement('#kw-block'), 200);
            // showElement(this.getElement('#kw-tab'));
            var self = this;

            slideDown(
                this.getElement('#kw-block'), 
                {
                    duration: 200, 
                    easing: 'swing', 
                    callback: function()
                    {
                        slideUp(
                            self.getElement('#kw-tab'), 
                            {
                                duration: 200, 
                                easing: 'swing'
                            }
                        );
                    }
                }
            );
            
            cookie('kf5-supportBox-autoOpen', null, {path: '/'});

            this.isOpened = false;
        }
    };

    var supportbox;
    function onload()
    {
        if(supportbox)
        {
            return;
        }

        var script = window.document.createElement('script'),
            configURL = supportboxConfigURL;

        embed(configURL, function(win)
        {
            if(win.KF5_SUPPORTBOX_BUTTON && win.KF5_SUPPORTBOX_BUTTON.show)
            {
                supportbox = new KF5SupportBox(win.KF5_SUPPORTBOX_BUTTON);

                // 延时自动加载iframe
                // setTimeout(function()
                // {
                //     supportbox.loadIframe();
                // }, 30 * 1000);
            }            
        });
    }

    window.addEventListener('load', onload, false);

    if(!window.initializeKF5SupportBox)
    {
        // 暴露初始化方法，以解决特殊情况下load事件无法触发
        window.initializeKF5SupportBox = onload;
    }

    // allow cross origin operation
    window.addEventListener('message', function(e)
    {
        var context, cmd, data;

        if(e.data)
        {
            context = e.data.match(/^([^ ]+)(?: +(.*))?/);
            cmd = context[1];
            data = context[2];
        }

        if(cmd === 'CMD::showSupportbox')
        {
            if(supportbox)
            {
                supportbox.open();
            }
        }
        else if(cmd === 'CMD::hideSupportbox')
        {
            if(supportbox)
            {
                supportbox.close();
            }
        }
        else if(cmd === 'CMD::resizeIframe')
        {
            // supportbox.resizeIframe(data);
        }
    });

    function embed(mainJS, output) 
    {
        var domain, doc, iframeWindow, iframeDoc,
            iframe = window.document.createElement("iframe");

        iframe.src = "javascript:false", 
        iframe.title = "", 
        iframe.role = "presentation", 
        (iframe.frameElement || iframe).style.cssText = "display: none", 
        window.document.body.appendChild(iframe);
        iframeWindow = iframe.contentWindow, 
        iframeDoc = iframeWindow.document;

        try {
            doc = iframeDoc
        } catch (c) {
            domain = window.document.domain, 
            iframe.src = 'javascript:var doc=document.open();doc.domain="' + domain + '";void(0);', 
            doc = iframeDoc
        }

        doc.open().start = function() {
            if(output)
            {
                if(typeof output === 'object')
                {
                    output.iframeWindow = iframeWindow;
                }
                else if(typeof output === 'function')
                {
                    output(iframeWindow);
                }
            }
        }, 

        doc.write('<body onload="document.start();">'), 
        doc.write('<script src="' + mainJS + '""></script>'), 
        doc.close();
    }

    function getStyle(el, style)
    {
        var 
            pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source,
            rmargin = /^margin/,
            rposition = /^(top|right|bottom|left)$/,
            rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" ),

            getStyles, curCSS;

        if ( window.getComputedStyle ) {
            getStyles = function( elem ) {
                return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
            };

            curCSS = function( elem, name, computed ) {
                var width, minWidth, maxWidth, ret,
                    style = elem.style;

                computed = computed || getStyles( elem );

                // getPropertyValue is only needed for .css('filter') in IE9, see #12537
                ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

                if ( computed ) {

                    // if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
                    //     ret = jQuery.style( elem, name );
                    // }

                    // A tribute to the "awesome hack by Dean Edwards"
                    // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
                    // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                    // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                    if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

                        // Remember the original values
                        width = style.width;
                        minWidth = style.minWidth;
                        maxWidth = style.maxWidth;

                        // Put in the new values to get a computed value out
                        style.minWidth = style.maxWidth = style.width = ret;
                        ret = computed.width;

                        // Revert the changed values
                        style.width = width;
                        style.minWidth = minWidth;
                        style.maxWidth = maxWidth;
                    }
                }

                // Support: IE
                // IE returns zIndex value as an integer.
                return ret === undefined ?
                    ret :
                    ret + "";
            };
        } else if ( document.documentElement.currentStyle ) {
            getStyles = function( elem ) {
                return elem.currentStyle;
            };

            curCSS = function( elem, name, computed ) {
                var left, rs, rsLeft, ret,
                    style = elem.style;

                computed = computed || getStyles( elem );
                ret = computed ? computed[ name ] : undefined;

                // Avoid setting ret to empty string here
                // so we don't default to auto
                if ( ret == null && style && style[ name ] ) {
                    ret = style[ name ];
                }

                // From the awesome hack by Dean Edwards
                // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

                // If we're not dealing with a regular pixel number
                // but a number that has a weird ending, we need to convert it to pixels
                // but not position css attributes, as those are proportional to the parent element instead
                // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
                if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

                    // Remember the original values
                    left = style.left;
                    rs = elem.runtimeStyle;
                    rsLeft = rs && rs.left;

                    // Put in the new values to get a computed value out
                    if ( rsLeft ) {
                        rs.left = elem.currentStyle.left;
                    }
                    style.left = name === "fontSize" ? "1em" : ret;
                    ret = style.pixelLeft + "px";

                    // Revert the changed values
                    style.left = left;
                    if ( rsLeft ) {
                        rs.left = rsLeft;
                    }
                }

                // Support: IE
                // IE returns zIndex value as an integer.
                return ret === undefined ?
                    ret :
                    ret + "" || "auto";
            };
        }

        return curCSS && curCSS(el, style);
    }

    var easing = {

        swing: function(p)
        {
            return 0.5 - Math.cos( p * Math.PI ) / 2;
        },

        linear: function(p)
        {
            return p;
        }
    };

    function slideUp(elem, options)
    {
        var originalStyle = elem.getAttribute('style');
        elem.style.display = 'block';
        var originalHeight = parseInt(getStyle(elem, 'height'));

        elem.style.height = '0px';

        var duration = options.duration || 500;
        var tStart = Date.now(),
            percent = 0,
            timer = setInterval(function()
            {
                percent = (Date.now() - tStart) / duration;
                percent = percent > 1 ? 1 : percent;

                elem.style.height = (easing[options.easing || 'swing'](percent) 
                        * originalHeight) + 'px';

                if(percent >= 1)
                {
                    clearInterval(timer);
                    timer = null;
                    
                    if(originalStyle)
                    {
                        elem.setAttribute('style', originalStyle);
                    }
                    else
                    {
                        elem.removeAttribute('style');
                    }
                    elem.style.display = 'block';

                    options.callback && options.callback.call(elem);
                }
            }, 1000 / 60);
    }

    function slideDown(elem, options)
    {
        var originalStyle = elem.getAttribute('style');
        elem.style.display = 'block';

        var originalHeight = parseInt(getStyle(elem, 'height'));

        var duration = options.duration || 500;
        var tStart = Date.now(),
            percent = 0,
            timer = setInterval(function()
            {
                percent = (Date.now() - tStart) / duration;
                percent = percent > 1 ? 1 : percent;

                elem.style.height = (easing[options.easing || 'swing'](1 - percent) 
                        * originalHeight) + 'px';

                if(percent >= 1)
                {
                    clearInterval(timer);
                    timer = null;
                    
                    if(originalStyle)
                    {
                        elem.setAttribute('style', originalStyle);
                    }
                    else
                    {
                        elem.removeAttribute('style');
                    }
                    elem.style.display = 'none';

                    options.callback && options.callback.call(elem);
                }
            }, 1000 / 60);
    }

    function hideElement(el)
    {        
        el.style.display = 'none';
    }

    function showElement(el)
    {
        el.style.display = 'block';
    }

    function cookie(name, value, options) 
    {
        if (typeof value != 'undefined') 
        { // name and value given, set cookie 
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].replace(/^\s+|\s+$/g, '');
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }

    function isPC()
    {
        var userAgentInfo = navigator.userAgent;
        var Agents = ['Android', 'iPhone',
                    'SymbianOS', 'Windows Phone',
                    'iPad', 'iPod'];
        var flag = true;

        for(var i = 0; i < Agents.length; i++)
        {
            if(userAgentInfo.indexOf(Agents[i]) !== -1)
            {
                flag = false;
                break;
            }
        }

        return flag;
    }

})(window);
