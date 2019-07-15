

export const navbar = (element) => {
  
   
   const navbar = document.createElement('div')
    navbar.innerHTML= `<nav class="navbar navbar-expand-lg  bg-primary navbar-dark nav-bar justify-content-center">
    <a class="navbar-brand" href="#"> <i class="fas fa-utensils logo-text" width="50" height="80" ></i> <span class="logo-text">Eat<span class="me">.Me</span></span>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
    <div class="collapse navbar-collapse flex-grow-0" id="navbarNav">
      
    </div>
</nav>
`
  element.appendChild(navbar)
}

//width="50" height="80" 