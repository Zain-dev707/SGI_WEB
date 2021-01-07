var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var date = now.getDate();


var data = [{
    date: year + '-' + month + '-' + (date - 1),
    value: 'Yesterday'
}, {
    date: year + '-' + month + '-' + date,
    value: 'Today'
}, {
    date: new Date(year, month - 1, date + 1),
    value: 'Tomarrow'
}, {
    //date: '2020-11-1',
    //value: '2020-11-1'
}];

// console.log(date+"  "+month);

var monthArray1 = ['','Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
// inline
$(".selected-change").html(date+" "+ monthArray1[Number(month)]);
var $ca = $('#one').calendar({
    // view: 'month',
    width: 320,
    height: 320,
    // startWeek: 0,
    // selectedRang: [new Date(), null],
    data: data,
    monthArray: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    date: new Date(),
    onSelected: function (view, date, data) {
        console.log('view:' + view)
        console.log('date:' + date)
        console.log('data:' + (data || '无'));
        window.setTimeout(function(){
            var getm = $(".getmonth").text();
          
            
            $(".push-date-formte").html('<span class="m">'+monthArray1[Number(getm)]+'</span>');
            var str = date+' ';
            var getda = str.split(" ");
            // console.log(getda);
            $(".selected-change").html(getda[2]+" "+ monthArray1[Number(getm)]);
            },300);
           
    },
    viewChange: function (view, y, m) {
        console.log(view, y, m)

    },
    
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