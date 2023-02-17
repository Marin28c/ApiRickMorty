var app = new Vue({
  el: "#app",
  data: {
    characters: [],
    info: {},
    gender: "",
    selectedCharacter: {},
    subastando: false,
    ofertaActual: 50, //pujamaxi
    oferta: 0,
    showDiv: false,
    money: 600,
    dinero: localStorage.getItem("moneys"),
    buy: [],
    resultado: "",
    date:"",
  },
  methods: {
    // loadCharacters(url) {
    //   fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       this.characters = data.results;
    //       localStorage.setItem("charact", JSON.stringify(this.character));
    //     });
    //     this.updateLocalStorages=(localStorage.setItem("charact", JSON.stringify(this.character)));
    // },

    // updateLocalStorages() {
    //   localStorage.getItem("users", JSON.stringify(this.characters));
    //   console.log(this.updateLocalStorages)
    // },

    async getUsers() {
      const response = await fetch("https://rickandmortyapi.com/api/character")
        .then((response) => response.json())
        .then((data) => {
          this.characters = data.results;
          localStorage.setItem("charact", JSON.stringify(this.characters));

          // this.characters =data.results.map(character =>{
          //   return{
          //     ...character,
          //     ofert:(Math.floor(Math.random() * (91)) + 10)

          //   }
          // })
          // if (this.characters != null) {
          //   this.characters = JSON.parse(localStorage.getItem("charact"));
          // }
        });
    },

    handleBid(character) {
      this.subastando = true;
      this.selectedCharacter = character;
      this.ofertaActual = this.ofertaActual+(Math.floor(Math.random() * (20)) + 10);
      this.oferta = this.ofertaActual + 10;
      this.showDiv = true;
    },

    realizarOferta() {
      if (this.oferta == this.ofertaActual + 10 && this.oferta < this.ofertaActual + 20) {
        swal(
          "opps",
          "la oferta a cambiado ahora tiene un valor de: " + (this.ofertaActual + 20),
          "error"
        );
       
      }else if  (this.oferta <= this.ofertaActual + 9) {
        swal(
          "error",
          "la oferta debe ser mayor a " + (this.ofertaActual + 10),
          "error"
        );
      }  
      else {
        Swal.fire({
          title: "Tu ofertas es de: " + this.oferta,
          text: " ¿Seguro que desea pujar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, pujar!",
        }).then((result) => {
          if (result.isConfirmed) {
            if (this.oferta >= this.ofertaActual) {
              this.ofertaActual = this.oferta;

              localStorage.setItem("moneys", JSON.stringify(this.money));
              this.money = JSON.parse(localStorage.getItem("moneys"));
              this.money = this.money - this.ofertaActual;
              
              localStorage.setItem("moneys", JSON.stringify(this.money))
             
              this.buy = JSON.parse(localStorage.getItem("bougth"));
            if(this.buy==null){
              this.buy=[]
            }
                this.buy.push({
                idcard: this.selectedCharacter.name,
                precioCompra: this.oferta,
                imagen:this.selectedCharacter.image,
                date:this.date,
              });
              console.log(this.buy)
              localStorage.setItem("bougth", JSON.stringify(this.buy));
    
            }
            Swal.fire("Bravo", "Tu puja ha pasado a ser primera", "success");
          }
        });
      }
      this.showDiv = false;
       
    },
  },

  created() {
  },
});
