class TestCtrl {
  constructor($state, $scope) {
    "ngInject";
    this._$state = $state;

    console.log("entra en test component");
    $scope.sumar = function(event) { 
      /*console.log(event);
      console.log(event.target.defaultValue);
      console.log("entra"+event.target.checked);*/

      let suma = 0;
      let total = document.getElementById('txtValor');
      let num = parseFloat(event.target.defaultValue);
    
      try {
          if (total != null) {
              if (isNaN(total.value)) total.value = 0;
              
              suma = parseFloat(total.value);
          }
      } catch (ex) {
          console.log('No existe el campo de la suma.');
      }
    
      if (event.target.checked == true) parseFloat(suma = suma + num);
      else parseFloat(suma = suma - num);
      
      total.value = parseFloat(suma);
    
      if(suma===4.9) alert("Acertaste!!");
      
    }

    /* function memoria colores */
    var cnt = 0;
    var last;
    var cont = 0;
    var cont_acierto = 0;
    //window.addEventListener('load',$scope.colorMemory);
    $scope.colorMemory = function colorMemory() {
      console.log("entra en color memory");
      let myArray = ['0','1','2','3','4','5','6','7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19' ];

      let i,j,k,l;
      for (i = myArray.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = myArray[i - 1];
        myArray[i - 1] = myArray[j];
        myArray[j] = k;
      }

      let array = ["cardRed", "cardRed", "cardBlue", "cardBlue", "cardPink", "cardPink", "cardPurple", "cardPurple", "cardGreen", "cardGreen", "cardOrange", "cardOrange", "cardYellow", "cardYellow", "cardBrown", "cardBrown", "cardGrey", "cardGrey", "cardTurquesa", "cardTurquesa" ];
      
      array.map(function(currentValue, index, array) {
        document.getElementById('cardList').innerHTML+="<div class='cardBlack' cl='"+array[myArray[index]]+"'></div>";

      });


      var list = document.querySelectorAll('div[cl^="card"]');
      for(l=0;l<list.length;l++)
        list[l].addEventListener('click', function() {
          if(this.className == 'cardBlack') {
            this.className = this.getAttribute('cl');

            if(cnt == 1)
              if(last.className == this.className) {
                cont_acierto++;
                //console.log(cont_acierto);
                if (cont_acierto==10) document.getElementById('text').innerHTML='Has ganado la partida!';

              }else{
                cont++;
                setTimeout(function() {
                  last.className = this.className = "cardBlack";

                }.bind(this), 500);
                document.getElementById('test').innerHTML=cont; 

                if (cont>=20) {
                  cont_acierto = 0;
                  document.getElementById('text-game-over').innerHTML='GAME OVER';
                  //location.reload();
                  
                }

              }
            else
              last = this;
            cnt = 1 - cnt;
          }
        }, false);

    }

  }
  
}

let TestComponent = {
  bindings: {
    info: "="
  },
    controller: TestCtrl,
  templateUrl: "components/Test/test.html"
};

export default TestComponent;
