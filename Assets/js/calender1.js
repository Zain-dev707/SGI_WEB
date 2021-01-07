var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var date = now.getDate();


var data = [{
    date: year + '-' + month + '-' + (date - 1),
    value: 'hello'
}, {
    date: year + '-' + month + '-' + date,
    value: '上班'
}, {
    date: new Date(year, month - 1, date + 1),
    value: '吃饭睡觉打豆豆'
}, {
    date: '2020-09-1',
    value: '2020-09-1'
}];
var monthArray1 = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// inline
var $ca = $('#one').calendar({
    // view: 'month',
    width: 320,
    height: 320,
    // startWeek: 0,
    // selectedRang: [new Date(), null],
    data: data,
    monthArray: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    date: new Date(2020, 12, 1),
    onSelected: function (view, date, data) {
        console.log('view:' + view)
        console.log('date:' + date)
        console.log('data:' + (data || '无'));
        window.setTimeout(function(){
            var getm = $(".getmonth").text();
          
            
            $(".push-date-formte").html('<span class="m">'+monthArray1[Number(getm)]+'</span>');
            },300);
    },
    viewChange: function (view, y, m) {
        console.log(view, y, m)

    }
});

// picker
$('#two').calendar({
    trigger: '#dt',
    // offset: [0, 1],
    zIndex: 999,
    data: data,
    onSelected: function (view, date, data) {
        console.log('event: onSelected')
    },
    onClose: function (view, date, data) {
        console.log('event: onClose')
        console.log('view:' + view)
        console.log('date:' + date)
        console.log('data:' + (data || '无'));
    }
});

// Dynamic elements
var $demo = $('#demo');
var UID = 1;
$('#add').click(function () {
    $demo.append('<input id="input-' + UID + '"><div id="ca-' + UID + '"></div>');
    $('#ca-' + UID).calendar({
        trigger: '#input-' + UID++
    })
})