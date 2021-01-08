function populateSelect() {
    // THE JSON ARRAY.
    var Categoria = [
        {
            "categoria": "Categoria"
        },
        {

            "categoria": "Feriado"
        },
        {

            "categoria": "Fim DO Ano Letivo"
        },
        {

            "categoria": "Férias escolares"
        },
        {

            "categoria": "Recesso"
        },
        {

            "categoria": "Recuperação"
        },
    ];
    var ele = document.getElementById('sel');
    let dropdo = "";

    for (var i = 0; i < Categoria.length; i++) {
        dropdo  += '<option  value="'+Categoria[i]['categoria']+'">' + Categoria[i]['categoria'] + '</option>';
    }
    ele.innerHTML = dropdo;
        // ele.innerHTML = ele.innerHTML +
    //         '<option value="">' + Categoria[i]['categoria'] + '</option>';                // }
}
populateSelect();




function populateSelt() {
    // THE JSON ARRAY.
    var Curso = [
        {
            "curso": "INFANTIL"
        },
        {

            "curso": "FUNDAMENTAL I"
        },
        {

            "curso": "FUNDAMENTAL II"
        },
        {

            "curso": "MÉDIO"
        },
     
    ];
    var cusorelement = document.getElementById('sel-2');
    let dropdocursar = "";

    for (var i = 0; i < Curso.length; i++) {
        dropdocursar  += '<option  value="'+Curso[i]['curso']+'">' + Curso[i]['curso'] + '</option>';
    }
    cusorelement.innerHTML = dropdocursar;
        // ele.innerHTML = ele.innerHTML +
    //         '<option value="">' + Categoria[i]['categoria'] + '</option>';                // }
}
populateSelt()
function populatedropdoserie() {
    // THE JSON ARRAY.
    var Serie = [
        {
            "serie": "serie"
        },
        {

            "serie": "ajflsj"
        },
        {

            "serie": "Fim DO Ano Letivo"
        },
        {

            "serie": "Férias escolares"
        },
        {

            "serie": "Recesso"
        },
        {

            "serie": "Recuperação"
        },
    ];
    var serieelement = document.getElementById('sel-3');
    let dropdoserie = "";

    for (var i = 0; i < Serie.length; i++) {
        dropdoserie  += '<option  value="'+Serie[i]['serie']+'">' + Serie[i]['serie'] + '</option>';
    }
    serieelement.innerHTML = dropdoserie;
        // ele.innerHTML = ele.innerHTML +
    //         '<option value="">' + Categoria[i]['categoria'] + '</option>';                // }
}
populatedropdoserie();
function populatedropTurma() {
    // THE JSON ARRAY.
    var Truma = [
        {
            "truma": "A"
        },
        {

            "truma": "B"
        },
        {

            "truma": "C"
        },
       
    ];
    var Trumaelement = document.getElementById('sel-4');
    let Trumaserie = "";

    for (var i = 0; i < Truma.length; i++) {
        Trumaserie  += '<option  value="'+Truma[i]['truma']+'">' + Truma[i]['truma'] + '</option>';
    }
    Trumaelement.innerHTML = Trumaserie;
        // ele.innerHTML = ele.innerHTML +
    //         '<option value="">' + Categoria[i]['categoria'] + '</option>';                // }
}
populatedropTurma();
function populatedropTurma() {
    // THE JSON ARRAY.
    var Truma = [
        {
            "truma": "serie"
        },
        {

            "truma": "ajflsj"
        },
        {

            "truma": "Fim DO Ano Letivo"
        },
        {

            "truma": "Férias escolares"
        },
        {

            "truma": "Recesso"
        },
        {

            "truma": "Recuperação"
        },
    ];
    var Trumaelement = document.getElementById('sel-4');
    let Trumaserie = "";

    for (var i = 0; i < Truma.length; i++) {
        Trumaserie  += '<option  value="'+Truma[i]['truma']+'">' + Truma[i]['truma'] + '</option>';
    }
    Trumaelement.innerHTML = Trumaserie;
        // ele.innerHTML = ele.innerHTML +
    //         '<option value="">' + Categoria[i]['categoria'] + '</option>';                // }
}
populatedropTurma();
jscolor.presets.default = {
    position: 'right',
    palette: [
        '#000000', '#7d7d7d', '#870014', '#ec1c23', '#ff7e26',
        '#fef100', '#22b14b', '#00a1e7', '#3f47cc', '#a349a4',
        '#ffffff', '#c3c3c3', '#b87957', '#feaec9', '#ffc80d',
        '#eee3af', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7',
    ],
    //paletteCols: 12,
    //hideOnPaletteClick: true,
};