const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function fixedImage(){
  var elemC = document.querySelector(".elemContainer");
  var fixedI = document.querySelector("#fixedImage");
  elemC.addEventListener("mouseenter", () => {
    fixedI.style.display = "block";
  });

  elemC.addEventListener("mouseleave", () => {
    fixedI.style.display = "none";
  });

  var elems = document.querySelectorAll(".elem")
    elems.forEach(function (e) {
        e.addEventListener("mouseenter", function () {
            var image = e.getAttribute("data-image")
            fixedI.style.backgroundImage = `url(${image})`
        })
    })

}

function dpe(){
  var elems = document.querySelectorAll(".elem");

  elems.forEach((e) => {
    e.addEventListener("mouseenter", () => {
      var image = e.getAttribute("data-image");
      fixedI.style.backgroundImage = `url(${image})`;
    });
  });

  document.querySelector("#design").addEventListener("click", () => {
    document.querySelector("#dpepara").innerHTML =
      "Our team works with our clients to refine an idea and concept into an executable design. We create a final design that encompasses the brand narrative to bring stories to life and provide end-to-end design solutions from concept, design, and architectural drawings to 3D renderings.";
    document.querySelector('#images').src = "media/img3.jpg";
  });

  document.querySelector("#project").addEventListener("click", () => {
    document.querySelector('#images').src = `media/img4.webp`;
    document.querySelector("#dpepara").innerHTML =
      "Once we have a design, our production team takes the lead in bringing it to life. We manage all stages of the project, from build specifications and technical drawings to site surveys, vendor management, and 2D & 3D production. We have an extensive network of partners to meet each unique design and project need.";
  });

  document.querySelector("#execution").addEventListener("click", () => { 
    document.querySelector('#images').src = `media/img5.webp`; 
    document.querySelector("#dpepara").innerHTML =
      "We’re with you every step of the way, from the project initiation to launch day. Our production and design teams are onsite to direct and guide the process down to the last point of completion, ensuring success across the built space and experience.";
  });


  var dpeH = document.querySelectorAll(".dpeh");
  function changeOpacity(e){
      e.style.opacity = 1;
      dpeH.forEach((ele) =>{
          if(ele != e){
              ele.style.opacity = .4;
          }
      })
  }

  dpeH.forEach((e) => {
      e.addEventListener("click", () => {
          changeOpacity(e);
      })
  })

}

function menuAnimation() {

  var menu = document.querySelector("nav h3")
  var full = document.querySelector("#full-scr")
  var navimg = document.querySelector("nav img")
  var flag = 0
  menu.addEventListener("click", function () {
      if (flag == 0) {
          full.style.top = 0
          full.style.opacity = 1
          navimg.style.opacity = 0
          flag = 1
      } else {
          full.style.opacity = 0;
          navimg.style.opacity = 1;
          flag = 0;
      }
  })
}

function loader(){
  var load = document.querySelector("#loader")
  setTimeout(() => {
    load.style.top = "-100%";
  }, 4000)
}

fixedImage();
menuAnimation();
dpe();
loader();