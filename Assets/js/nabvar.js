var header = document.getElementById("NavCode");
header.innerHTML = `<!-- navbar start  -->
<nav class="navbar navbar-expand-xl navbar-light pb-0">
  <a class="navbar-brand" href="#"><img src="./Assets/icon/logo.png" class="mainlogo-portal"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="ml-4">
    <form class="form-inline w-218-Z">
      <Span class="fa fa-search text-dark ml-3 " style="z-index: 1;position: absolute;"></Span>
      <input class="form-control w-218-Z pl-5 z-border-none" type="search" placeholder="Busca"
        aria-label="Search">

    </form>
  </div>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  
    <ul class="navbar-nav ml-auto mt-1 ">
      <li class="nav-item active ml-2 mt-2">
        <button class="z-button-white " href="#"> <span class="fa fa-bell-o  font-size-bell-icon-portal bg-transparent"></span><Span
            class="z-circle-yellow"></Span></button>
      </li>
      <li class="nav-item ml-2">
        <a class="nav-link" href="#"><img src="./Assets/icon/icon 2.png" class="z-w-icons"></a>
      </li>

      <li class="nav-item ml-2">
        <a class="nav-link disabled" href="#"><img src="./Assets/icon/icon-01.png" class="z-w-icons-001"></a>
      </li>
      <li class="nav-item ml-2">
        <a class="nav-link disabled" href="#"><img src="./Assets/icon//face-01.png" class="z-w-icons-001"></a>
      </li>
      <li class="nav-item dropdown ml-2">
        <a class="nav-link dropdown-toggle mt-2" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <b> Galante</b>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>

  </div>
</nav>

<div class="container-fluid">
  
  
  <div class="row mb-2 mt-4">
    <div class="col-md-6 pt-2 pl-0">
      <div class="d-flex">
        <h4 class="text-dark">Tarefas de hoje</h4>
        <div class="badge badge-warning z-badge ml-5  mt-2  mb-2 set-z-top"><i>6</i></div>
      </div>
    </div>
    <div class="col-md-6 pt-2 text-end ">
    <a class="text-decoration" href="/index.html">  <button type="button" class="btn btn-light border"><i class="fa fa-backward" aria-hidden="true"></i>&nbsp; Voltar</button></a>
    
    </div>
  </div>
</div>
<!-- navbar end  -->`;