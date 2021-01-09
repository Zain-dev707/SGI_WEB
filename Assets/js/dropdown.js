function populateSelect() {
    // THE JSON ARRAY.
    var Categoria = [
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
        dropdo += '<option  value="' + Categoria[i]['categoria'] + '">' + Categoria[i]['categoria'] + '</option>';
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

    var val1 = document.getElementById('checkelement');
    let dropdocursar = "";

    for (var i = 0; i < Curso.length; i++) {
        dropdocursar += '<option  value="' + Curso[i]['curso'] + '">' + Curso[i]['curso'] + '</option>';
    }

    // console.log(val1)
    cusorelement.innerHTML = dropdocursar;

    // ele.innerHTML = ele.innerHTML +
    //         '<option value="">' + Categoria[i]['categoria'] + '</option>';                // }
}
populateSelt()
function populatevalue(cursoelement) {
    let fundamental = [{

        "fundamental": "FUNDAMENTAL II"
    },
    {

        "fundamental": "fundamental"
    },]
    let INFANTIL = [{

        "Infantil": "INFANTIL II"
    },
    {

        "Infantil": "INFANTIL"
    },]
    let FUNDAMENTALII = [{

        "fundamental11": "FUNDAMENTAL II"
    },
    {

        "fundamental11": "FUNDAMENTAL II"
    },]

    var fundamentalelement = document.getElementById('sel-3');
    let allelement = "";



    // alert(element.value)
    if (cursoelement.value === "FUNDAMENTAL I") {
        for (var i = 0; i < fundamental.length; i++) {
            allelement += '<option  value="' + fundamental[i]['fundamental'] + '">' + fundamental[i]['fundamental'] + '</option>';
        }
        fundamentalelement.innerHTML = allelement;
    } else if (cursoelement.value === "INFANTIL") {
        for (var i = 0; i < INFANTIL.length; i++) {
            allelement += '<option  value="' + INFANTIL[i]['Infantil'] + '">' + INFANTIL[i]['Infantil'] + '</option>';
        }
        fundamentalelement.innerHTML = allelement;
    } else if(cursoelement.value === "FUNDAMENTAL II" ){
        for (var i = 0; i < FUNDAMENTALII.length; i++) {
            allelement += '<option  value="' + FUNDAMENTALII[i]['fundamental11'] + '">' + FUNDAMENTALII[i]['fundamental11'] + '</option>';
        }
        fundamentalelement.innerHTML = allelement;
    }
}
// function populatedropdoserie() {
//     // THE JSON ARRAY.
//     var Serie = [
//         {
//             "serie": "INFANTIL"
//         },
//         {

//             "serie": "FUNDAMENTAL I"
//         },
//         {

//             "serie": "FUNDAMENTAL II"
//         },
//         {

//             "serie": "MÉDIO"
//         },
//     ];


//     let dropdoserie = "";
//     let fundamental = "";
//     for (var i = 0; i < Serie.length; i++) {
//         dropdoserie += '<option  value="' + Serie[i]['serie'] + '">' + Serie[i]['serie'] + '</option>';
//     }

//     serieelement.innerHTML = dropdoserie;
//     // ele.innerHTML = ele.innerHTML +
//     //         '<option value="">' + Categoria[i]['categoria'] + '</option>';                // }
// }
// populatedropdoserie();
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
        Trumaserie += '<option  value="' + Truma[i]['truma'] + '">' + Truma[i]['truma'] + '</option>';
    }
    Trumaelement.innerHTML = Trumaserie;
    // ele.innerHTML = ele.innerHTML +
    //         '<option value="">' + Categoria[i]['categoria'] + '</option>';                // }
}
populatedropTurma();
function populatedropDisplia() {
    // THE JSON ARRAY.
    var Disciplinaelement = [
        {

            "disciplina": "Arte Musical e Cênica "
        },
        {

            "disciplina": "Arte Plástica"
        },
        {

            "disciplina": "Ciências"
        },
        {

            "disciplina": "Educação Digital"
        },
        {

            "disciplina": "Educação Física"
        },
        {

            "disciplina": "Ensino Religioso"
        },
        {

            "disciplina": "Geografia"
        },
        {

            "disciplina": "História"
        },
        {

            "disciplina": "Inglês"
        },
        {

            "disciplina": "Língua Portuguesa"
        },
        {

            "disciplina": "Matemática"
        },
    ];
    var disciplinaelement = document.getElementById('sel-5');
    let disciplina = "";

    for (var i = 0; i < Disciplinaelement.length; i++) {
        disciplina += '<option  value="' + Disciplinaelement[i]['disciplina'] + '">' + Disciplinaelement[i]['disciplina'] + '</option>';
    }
    disciplinaelement.innerHTML = disciplina;
    // ele.innerHTML = ele.innerHTML +
    //         '<option value="">' + Categoria[i]['categoria'] + '</option>';                // }
}
populatedropDisplia();
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