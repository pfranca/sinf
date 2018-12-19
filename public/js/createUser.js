
function createUser(){
   var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var nif = document.getElementById('nif').value;
    //var username = (firstName+lastName).toUpperCase();
    alert(token);
 /* var options = {
        method: 'POST',
        url: url + 'Base/Clientes/Actualiza',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
               body:
                {
                    "Cliente": "SMITHJ",
                    "Nome": "John Smith",
                    "Descricao": "WebStoreUserJohnSmith",
                    "Morada": "Random Street n 123",
                    "Localidade": "PORTO",
                    "CodigoPostal": "4200",
                    "LocalidadeCodigoPostal": "PORTO",
                    "NumContribuinte": "123456789",
                    "Pais": "PT",
                    "Moeda": "EUR"
                }
                
        };
        */
        alert("chegou");
    /*request(options, (error, response, body) => {
            if(error){
    
                console.error("erro" + error);
                return;
            }
            console.log("suecesso\n");
        });

 alert("hello!");*/
    }