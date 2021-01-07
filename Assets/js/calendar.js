/*!
 * @authors TB
 * @date    2020-11-12 21:34:19
  */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('calendar', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }
}(this, function ($) {

    // default config
    var monthArray1 = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var defaults = {

        // 宽度
        width: 280,
        // 高度, 不包含头部，头部固定高度
        height: 280,

        zIndex: 1,

        // selector
        // 设置触发显示的元素，为null时默认显示
        trigger: null,

        // 偏移位置，可设正负值
        // trigger 设置时生效
        offset: [0, 1],

        // 自定义类，用于重写样式
        customClass: '',

        // 显示视图
        // 可选：date, month
        view: 'date',

        // 默认日期为当前日期
        date: new Date(),
        format: 'yyyy/mm/dd',

        // 一周的第一天
        // 0表示周日，依次类推
        startWeek: 0,

        // 星期格式
        weekArray: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sexta', 'Dom'],

        // 月份格式
    monthArray: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
       
        // 设置选择范围
        // 格式：[开始日期, 结束日期]
        // 开始日期为空，则无上限；结束日期为空，则无下限
        // 如设置2015年11月23日以前不可选：[new Date(), null] or ['2020/11/23']
        selectedRang: null,

        // 日期关联数据 [{ date: string, value: object }, ... ]
        // 日期格式与 format 一致
        // 如 [ {date: '2020/11/23', value: '面试'} ]
        data: null,

        // 展示关联数据
        // 格式化参数：{m}视图，{d}日期，{v}value
        // 设置 false 表示不显示
        label: '{d}\n{v}',

        // 切换字符
        prev: '&lt;',
        next: '&gt;',

        // 切换视图
        // 参数：view, y, m
        viewChange: $.noop,

        // view: 视图
        // date: 不同视图返回不同的值
        // value: 日期关联数据
        onSelected: function (view, date, value) {
            // body...
        },

        // 参数同上
        onMouseenter: $.noop,

        onClose: $.noop
    },

        // static variable

        ACTION_NAMESPACE = 'data-calendar-',

        DISPLAY_VD = '[' + ACTION_NAMESPACE + 'display-date]',
        DISPLAY_VM = '[' + ACTION_NAMESPACE + 'display-month]',

        ARROW_DATE = '[' + ACTION_NAMESPACE + 'arrow-date]',
        ARROW_MONTH = '[' + ACTION_NAMESPACE + 'arrow-month]',

        ITEM_DAY = ACTION_NAMESPACE + 'day',
        ITEM_MONTH = ACTION_NAMESPACE + 'month',

        DISABLED = 'disabled',
        MARK_DATA = 'markData',

        VIEW_CLASS = {
            date: 'calendar-d',
            month: 'calendar-m'
        },
        
        
        OLD_DAY_CLASS = 'old',
        NEW_DAY_CLASS = 'new',
        TODAY_CLASS = 'now',
        SELECT_CLASS = 'selected',
        MARK_DAY_HTML = '<i class="dot"></i>',
        DATE_DIS_TPL = '<span style="display:none" class="m getmonth">{month}</span>/{year}',

        ITEM_STYLE = 'style="width:{w}px;height:{h}px;line-height:{h}px; font-size:12px;" ',
        WEEK_ITEM_TPL = '<li ' + ITEM_STYLE + '>{wk}</li>',
        DAY_ITEM_TPL = '<li ' + ITEM_STYLE + ' class="{class}" {action}="{date}">{value}</li>',
        MONTH_ITEM_TPL = '<li ' + ITEM_STYLE + ' ' + ITEM_MONTH + '>{m}</li>',

        TEMPLATE = [
            '<div class="calendar-inner">',
            '<div class="calendar-views">',
            '<div class="view view-date">',
            '<div class="calendar-hd">',
            '<a href="javascript:;"  class="calendar-display" onclick="to_view_change()"><span class="push-date-formte"></span></a>',
            '<a href="javascript:;" data-calendar-display-date class="calendar-display display-new">',
            '<span class="m">{mm}</span>/{yyyy}',
            '</a>',
            
            '<div class="calendar-arrow">',
            '<span class="prev" data-calendar-arrow-date>{prev}</span>',
            '<span class="next" data-calendar-arrow-date>{next}</span>',
            '</div>',
            '</div>',
            '<div class="calendar-ct">',
            '<ol class="week">{week}</ol>',
            '<ul class="date-items"></ul>',
            '</div>',
            '</div>',
            '<div class="view view-month">',
            '<div class="calendar-hd">',
            '<a href="javascript:;" data-calendar-display-month class="calendar-display">{yyyy}</a>',
            '<div class="calendar-arrow">',
            '<span class="prev" data-calendar-arrow-month>{prev}</span>',
            '<span class="next" data-calendar-arrow-month>{next}</span>',
            '</div>',
            '</div>',
            '<ol class="calendar-ct month-items">{month}</ol>',
            '</div>',
            '</div>',
            '</div>',
            '<div class="calendar-label"><p>HelloWorld</p><i></i></div>'
        ],
        OS = Object.prototype.toString;

    // utils

    function isDate(obj) {
        return OS.call(obj) === '[object Date]';
    }

    function isString(obj) {
        return OS.call(obj) === '[object String]';
    }


    function getClass(el) {
        return el.getAttribute('class') || el.getAttribute('className');
    }

    // extension methods

    String.prototype.repeat = function (data) {
        return this.replace(/\{\w+\}/g, function (str) {
            var prop = str.replace(/\{|\}/g, '');
            return data[prop] || '';
        });
    }

    String.prototype.toDate = function () {
        var dt = new Date(),
            dot = this.replace(/\d/g, '').charAt(0),
            arr = this.split(dot);

        return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
    }

    Date.prototype.format = function (exp) {
        var y = this.getFullYear(),
            m = this.getMonth() + 1,
            d = this.getDate();

        return exp.replace('yyyy', y).replace('mm', m).replace('dd', d);
    }

    Date.prototype.isSame = function (y, m, d) {
        if (isDate(y)) {
            var dt = y;
            y = dt.getFullYear();
            m = dt.getMonth() + 1;
            d = dt.getDate();
        }
        return this.getFullYear() === y && this.getMonth() + 1 === m && this.getDate() === d;
    }

    Date.prototype.add = function (n) {
        this.setDate(this.getDate() + n);
    }

    Date.prototype.minus = function (n) {
        this.setDate(this.getDate() - n);
    }

    Date.prototype.clearTime = function (n) {
        this.setHours(0);
        this.setSeconds(0);
        this.setMinutes(0);
        this.setMilliseconds(0);
        return this;
    }

    Date.isLeap = function (y) {
        return (y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0);
    }

    Date.getDaysNum = function (y, m) {
        var num = 31;

        switch (m) {
            case 2:
                num = this.isLeap(y) ? 29 : 28;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                num = 30;
                break;
        }
        return num;
    }

    Date.getSiblingsMonth = function (y, m, n) {
        var d = new Date(y, m - 1);
        d.setMonth(m - 1 + n);
        return {
            y: d.getFullYear(),
            m: d.getMonth() + 1
        };
    }

    Date.getPrevMonth = function (y, m, n) {
        return this.getSiblingsMonth(y, m, 0 - (n || 1));
    }

    Date.getNextMonth = function (y, m, n) {
        return this.getSiblingsMonth(y, m, n || 1);
    }

    Date.tryParse = function (obj) {
        if (!obj) {
            return obj;
        }
        return isDate(obj) ? obj : obj.toDate();
    }


    // Calendar class

    function Calendar(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.calendar.defaults, options);
        this.$element.addClass('calendar ' + this.options.customClass);
        this.width = this.options.width;
        this.height = this.options.height;
        this.date = this.options.date;
        this.selectedRang = this.options.selectedRang;
        this.data = this.options.data;
        this.init();
    }

    Calendar.prototype = {
        constructor: Calendar,
        getDayAction: function (day) {
            var action = ITEM_DAY;
            if (this.selectedRang) {
                var start = Date.tryParse(this.selectedRang[0]),
                    end = Date.tryParse(this.selectedRang[1]);

                if ((start && day < start.clearTime()) || (end && day > end.clearTime())) {
                    action = DISABLED;
                }
            }

            return action;
        },
        getDayData: function (day) {
            var ret, data = this.data;

            if (data) {

                for (var i = 0, len = data.length; i < len; i++) {
                    var item = data[i];

                    if (day.isSame(Date.tryParse(item.date))) {
                        ret = item.value;
                    }
                }
            }

            return ret;
        },
        getDayItem: function (y, m, d, f) {
            var dt = this.date,
                idt = new Date(y, m - 1, d),
                data = {
                    w: this.width / 7,
                    h: this.height / 7,
                    value: d
                },
                markData,
                $item;

            var selected = dt.isSame(y, m, d) ? SELECT_CLASS : '';
            if (f === 1) {
                data['class'] = OLD_DAY_CLASS;
            } else if (f === 3) {
                data['class'] = NEW_DAY_CLASS;
            } else {
                data['class'] = '';
            }

            if (dt.isSame(y, m, d)) {
                data['class'] += ' ' + TODAY_CLASS;
            }

            data.date = idt.format(this.options.format);
            data.action = this.getDayAction(idt);
            markData = this.getDayData(idt);

            $item = $(DAY_ITEM_TPL.repeat(data));

            if (markData) {
                $item.data(MARK_DATA, markData);
                $item.html(d + MARK_DAY_HTML);
            }

            return $item;
        },
        getDaysHtml: function (y, m) {
            var year, month, firstWeek, daysNum, prevM, prevDiff,
                dt = this.date,
                $days = $('<ol class="days"></ol>');

            if (isDate(y)) {
                year = y.getFullYear();
                month = y.getMonth() + 1;
            } else {
                year = Number(y);
                month = Number(m);
            }

            firstWeek = new Date(year, month - 1, 1).getDay() || 7;
            prevDiff = firstWeek - this.options.startWeek;
            daysNum = Date.getDaysNum(year, month);
            prevM = Date.getPrevMonth(year, month);
            prevDaysNum = Date.getDaysNum(year, prevM.m);
            nextM = Date.getNextMonth(year, month);
            // month flag
            var PREV_FLAG = 1,
                CURR_FLAG = 2,
                NEXT_FLAG = 3,
                count = 0;

            for (var p = prevDaysNum - prevDiff + 1; p <= prevDaysNum; p++ , count++) {

                $days.append(this.getDayItem(prevM.y, prevM.m, p, PREV_FLAG));
            }

            for (var c = 1; c <= daysNum; c++ , count++) {
                $days.append(this.getDayItem(year, month, c, CURR_FLAG));
            }

            for (var n = 1, nl = 42 - count; n <= nl; n++) {

                $days.append(this.getDayItem(nextM.y, nextM.m, n, NEXT_FLAG));
            }

            return $('<li></li>').width(this.options.width).append($days);
        },
        getWeekHtml: function () {
            var week = [],
                weekArray = this.options.weekArray,
                start = this.options.startWeek,
                len = weekArray.length,
                w = this.width / 7,
                h = this.height / 7;

            for (var i = start; i < len; i++) {
                week.push(WEEK_ITEM_TPL.repeat({
                    w: w,
                    h: h,
                    wk: weekArray[i]
                }));
            }

            for (var j = 0; j < start; j++) {
                week.push(WEEK_ITEM_TPL.repeat({
                    w: w,
                    h: h,
                    wk: weekArray[j]
                }));
            }

            return week.join('');
        },
        getMonthHtml: function () {
            var monthArray = this.options.monthArray,
                month = [],
                w = this.width / 4,
                h = this.height / 4,
                i = 0;

            for (i=0; i < 12; i++) {
               // console.log(monthArray[i]);
                month.push(MONTH_ITEM_TPL.repeat({
                    w: w,
                    h: h,
                    m: monthArray[i]
                }));
            }

            return month.join('');
        },
        setMonthAction: function (y) {
            var m = this.date.getMonth() + 1;

            this.$monthItems.children().removeClass(TODAY_CLASS);
            if (y === this.date.getFullYear()) {
                this.$monthItems.children().eq(m - 1).addClass(TODAY_CLASS);
            }
        },
        fillStatic: function () {
            var staticData = {
                prev: this.options.prev,
                next: this.options.next,
                week: this.getWeekHtml(),
                month: this.getMonthHtml()
            };
           
            this.$element.html(TEMPLATE.join('').repeat(staticData));
            window.setTimeout(function(){
            var getm = $(".getmonth").text();
           /* if(getm!="1" || getm!=1){
                getm = Number(getm)-1; 
            }*/
            
            $(".push-date-formte").html('<span class="m">'+monthArray1[Number(getm)]+'</span>');
            },300);
            
        },
        updateDisDate: function (y, m) {
            this.$disDate.html(DATE_DIS_TPL.repeat({
                year: y,
                month: m
            }));
        },
        updateDisMonth: function (y) {
            this.$disMonth.html(y);
        },
        fillDateItems: function (y, m) {
            var ma = [
                Date.getPrevMonth(y, m), {
                    y: y,
                    m: m
                },
                Date.getNextMonth(y, m)
            ];

            this.$dateItems.html('');
            for (var i = 0; i < 3; i++) {
                var $item = this.getDaysHtml(ma[i].y, ma[i].m);
                //console.log($item);
                this.$dateItems.append($item);
            }

        },
        hide: function (view, date, data) {
            this.$trigger.val(date.format(this.options.format));
            this.options.onClose.call(this, view, date, data);
            this.$element.hide();
        },
        setPosition: function () {
            var post = this.$trigger.offset();
            var offs = this.options.offset;

            this.$element.css({
                left: (post.left + offs[0]) + 'px',
                top: (post.top + this.$trigger.outerHeight() + offs[1]) + 'px'
            })
        },
        trigger: function () {

            this.$trigger = $(this.options.trigger);

            var _this = this,
                $this = _this.$element;

            $this.addClass('calendar-modal').css('zIndex', _this.options.zIndex);

            $(document).click(function (e) {
                if (_this.$trigger[0] != e.target && !$.contains($this[0], e.target)) {
                    $this.hide();
                }
            }).on('click', this.options.trigger, function () {
                this.$trigger = $(this);
                _this.setPosition();
                $this.show();
            })

            $(window).resize(function () {
                _this.setPosition();
            });
        },
        render: function () {
            this.$week = this.$element.find('.week');
            this.$dateItems = this.$element.find('.date-items');
            this.$monthItems = this.$element.find('.month-items');
            this.$label = this.$element.find('.calendar-label');
            this.$disDate = this.$element.find(DISPLAY_VD);
            this.$disMonth = this.$element.find(DISPLAY_VM);

            var y = this.date.getFullYear(),
                m = this.date.getMonth() + 1;

            this.updateDisDate(y, m);
            this.updateMonthView(y);

            this.fillDateItems(y, m);

            this.options.trigger && this.trigger();
            

        },
        setView: function (view) {
            this.$element.removeClass(VIEW_CLASS.date + ' ' + VIEW_CLASS.month)
                .addClass(VIEW_CLASS[view]);
            this.view = view;
        },
        updateDateView: function (y, m, dirc, cb) {
            m = m || this.date.getMonth() + 1;

            var _this = this,
                $dis = this.$dateItems,
                exec = {
                    prev: function () {
                        var pm = Date.getPrevMonth(y, m),
                            ppm = Date.getPrevMonth(y, m, 2),
                            $prevItem = _this.getDaysHtml(ppm.y, ppm.m);

                        m = pm.m;
                        y = pm.y;

                        $dis.animate({
                            marginLeft: 0
                        }, 300, 'swing', function () {
                            $dis.children(':last').remove();
                            $dis.prepend($prevItem).css('margin-left', '-100%');

                            $.isFunction(cb) && cb.call(_this);
                        });
                    },
                    next: function () {
                        var nm = Date.getNextMonth(y, m),
                            nnm = Date.getNextMonth(y, m, 2),
                            $nextItem = _this.getDaysHtml(nnm.y, nnm.m);

                        m = nm.m;
                        y = nm.y;

                        $dis.animate({
                            marginLeft: '-200%'
                        }, 300, 'swing', function () {
                            $dis.children(':first').remove();
                            $dis.append($nextItem).css('margin-left', '-100%');

                            $.isFunction(cb) && cb.call(_this);
                        });

                    }
                };


            if (dirc) {
                exec[dirc]();
            } else {
                this.fillDateItems(y, m);
            }

            this.updateDisDate(y, m);

            this.setView('date');

            return {
                y: y,
                m: m
            };
        },
        updateMonthView: function (y) {
            this.updateDisMonth(y);
            this.setMonthAction(y);
            this.setView('month');
            
        },
        getDisDateValue: function () {
            var arr = this.$disDate.html().split('/'),
                m = Number(arr[0].match(/\d{1,2}/)[0]),
                y = Number(arr[2]);
                
               // m = monthArray[m];
                console.log(arr);
                console.log(m+"----"+y);
               
                console.log($(".calendar-display").html());
               // $(".push-date-formte").html('<span class="m">'+monthArray1[m]+'</span>');
                window.setTimeout(function(){
                    var getm = $(".getmonth").text();
                  
                    
                    $(".push-date-formte").html('<span class="m">'+monthArray1[Number(getm)]+'</span>');
                    },300);

            return [y, m];
        },
        selectedDay: function (d, type) {
            var arr = this.getDisDateValue(),
                y = arr[0],
                m = arr[1],
                toggleClass = function () {
                    this.$dateItems.children(':eq(1)')
                        .find('[' + ITEM_DAY + ']:not(.' + NEW_DAY_CLASS + ', .' + OLD_DAY_CLASS + ')')
   ?e:null;if((i||!/destroy|hide/.test(e))&&(i||(i=new p(this,s),t(this).data(n,i)),"string"==typeof e)){if("undefined"==typeof i[e])throw new TypeError('No method named "'+e+'"');i[e]()}})},s(p,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return l}},{key:"NAME",get:function(){return e}},{key:"DATA_KEY",get:function(){return n}},{key:"Event",get:function(){return _}},{key:"EVENT_KEY",get:function(){return i}},{key:"DefaultType",get:function(){return h}}]),p}(U);return t.fn[e]=g._jQueryInterface,t.fn[e].Constructor=g,t.fn[e].noConflict=function(){return t.fn[e]=o,g._jQueryInterface},g}(e),K=function(t){var e="scrollspy",n="bs.scrollspy",i="."+n,o=t.fn[e],a={offset:10,method:"auto",target:""},l={offset:"number",method:"string",target:"(string|element)"},h={ACTIVATE:"activate"+i,SCROLL:"scroll"+i,LOAD_DATA_API:"load"+i+".data-api"},c="dropdown-item",u="active",f={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV_LINKS:".nav-link",NAV_ITEMS:".nav-item",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},d="offset",_="position",g=function(){function o(e,n){var i=this;this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(n),this._selector=this._config.target+" "+f.NAV_LINKS+","+this._config.target+" "+f.LIST_ITEMS+","+this._config.target+" "+f.DROPDOWN_ITEMS,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,t(this._scrollElement).on(h.SCROLL,function(t){return i._process(t)}),this.refresh(),this._process()}var g=o.prototype;return g.refresh=function(){var e=this,n=this._scrollElement===this._scrollElement.window?d:_,i="auto"===this._config.method?n:this._config.method,s=i===_?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),t.makeArray(t(this._selector)).map(function(e){var n,r=P.getSelectorFromElement(e);if(r&&(n=t(r)[0]),n){var o=n.getBoundingClientRect();if(o.width||o.height)return[t(n)[i]().top+s,r]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})},g.dispose=function(){t.removeData(this._element,n),t(this._scrollElement).off(i),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},g._getConfig=function(n){if("string"!=typeof(n=r({},a,n)).target){var i=t(n.target).attr("id");i||(i=P.getUID(e),t(n.target).attr("id",i)),n.target="#"+i}return P.typeCheckConfig(e,n,l),n},g._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},g._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},g._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},g._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var s=this._offsets.length;s--;){this._activeTarget!==this._targets[s]&&t>=this._offsets[s]&&("undefined"==typeof this._offsets[s+1]||t<this._offsets[s+1])&&this._activate(this._targets[s])}}},g._activate=function(e){this._activeTarget=e,this._clear();var n=this._selector.split(",");n=n.map(function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'});var i=t(n.join(","));i.hasClass(c)?(i.closest(f.DROPDOWN).find(f.DROPDOWN_TOGGLE).addClass(u),i.addClass(u)):(i.addClass(u),i.parents(f.NAV_LIST_GROUP).prev(f.NAV_LINKS+", "+f.LIST_ITEMS).addClass(u),i.parents(f.NAV_LIST_GROUP).prev(f.NAV_ITEMS).children(f.NAV_LINKS).addClass(u)),t(this._scrollElement).trigger(h.ACTIVATE,{relatedTarget:e})},g._clear=function(){t(this._selector).filter(f.ACTIVE).removeClass(u)},o._jQueryInterface=function(e){return this.each(function(){var i=t(this).data(n);if(i||(i=new o(this,"object"==typeof e&&e),t(this).data(n,i)),"string"==typeof e){if("undefined"==typeof i[e])throw new TypeError('No method named "'+e+'"');i[e]()}})},s(o,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return a}}]),o}();return t(window).on(h.LOAD_DATA_API,function(){for(var e=t.makeArray(t(f.DATA_SPY)),n=e.length;n--;){var i=t(e[n]);g._jQueryInterface.call(i,i.data())}}),t.fn[e]=g._jQueryInterface,t.fn[e].Constructor=g,t.fn[e].noConflict=function(){return t.fn[e]=o,g._jQueryInterface},g}(e),V=function(t){var e="bs.tab",n="."+e,i=t.fn.tab,r={HIDE:"hide"+n,HIDDEN:"hidden"+n,SHOW:"show"+n,SHOWN:"shown"+n,CLICK_DATA_API:"click.bs.tab.data-api"},o="dropdown-menu",a="active",l="disabled",h="fade",c="show",u=".dropdown",f=".nav, .list-group",d=".active",_="> li > .active",g='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',p=".dropdown-toggle",m="> .dropdown-menu .active",v=function(){function n(t){this._element=t}var i=n.prototype;return i.show=function(){var e=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&t(this._element).hasClass(a)||t(this._element).hasClass(l))){var n,i,s=t(this._element).closest(f)[0],o=P.getSelectorFromElement(this._element);if(s){var h="UL"===s.nodeName?_:d;i=(i=t.makeArray(t(s).find(h)))[i.length-1]}var c=t.Event(r.HIDE,{relatedTarget:this._element}),u=t.Event(r.SHOW,{relatedTarget:i});if(i&&t(i).trigger(c),t(this._element).trigger(u),!u.isDefaultPrevented()&&!c.isDefaultPrevented()){o&&(n=t(o)[0]),this._activate(this._element,s);var g=function(){var n=t.Event(r.HIDDEN,{relatedTarget:e._element}),s=t.Event(r.SHOWN,{relatedTarget:i});t(i).trigger(n),t(e.