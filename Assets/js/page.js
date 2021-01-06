
function addLine(){
    let abc = document.getElementById("appendInputs")
var element = document.createElement("div");
 element.innerHTML = `<div class="text-center color-primary colr">
    <h3 class="font-weigt">Pessoas authoriadas a retirar a(o) estudante</h3>
</div>
<div class="text-center color-primary colr1 pb-4">
    <h4 class="font-weigt">Educação infantil</h4>
</div>
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-0 pr-0">
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1"  required>
      </div>
</div>

<div class="row">
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="RG" aria-label="Username" aria-describedby="basic-addon1"  required>
          </div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0 padding-left">
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Grau de parentesco" aria-label="Username" aria-describedby="basic-addon1"  required>
          </div>
    </div> 
</div>
<hr>`;
abc.appendChild(element);
console.log(element);
}