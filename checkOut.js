const xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:3000/api/pets')
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const body = document.getElementsByTagName('body')[0]
        const center = document.createElement('div')
        center.setAttribute('class', 'center')
       
        for (const s of this.response) {
            if (Date.now() >= s.checkOut && s.delete === false) {
                document.getElementById("checkout-details").style.display = "none"
                const checkOutDetails = document.createElement('div');
                checkOutDetails.setAttribute('id', 'checkout-details');        

                const petImage = document.createElement('img');
                petImage.setAttribute('id', 'pet-photo');  
                if (`${s.type}` === "cat") {
                    petImage.src = "media/cat.jpeg"
                } else {
                    petImage.src = "media/dog.jpeg"
                }
                checkOutDetails.appendChild(petImage)
                   

                const checkOutBox = document.createElement('div');
                checkOutBox.setAttribute('id', 'checkout-box');  

                const checkOutText = document.createElement('div');
                checkOutText.setAttribute('id', 'checkout-text');
                checkOutText.textContent = `${s.petName}'s check out time has been reached.`
                checkOutBox.appendChild(checkOutText);

                const checkOutButton = document.createElement('div');
                checkOutButton.setAttribute('id', 'checkout-btn');
                checkOutButton.textContent = `Confirm Check Out`
                checkOutBox.appendChild(checkOutButton);
                checkOutBox.style.cursor = "pointer";

                checkOutButton.addEventListener("click", (e) => {
                    s.delete = true;
                    const objId = s._id;

                    const xhr = new XMLHttpRequest()
                    xhr.open('PUT', `http://localhost:3000/api/pets/${objId}`)

                    const newValues = {delete : true}

                    // JSON encoding 
                    const jsonStr = JSON.stringify(newValues)
                    xhr.setRequestHeader('Content-Type', 'application/json')
                    xhr.responseType = 'json'
                    xhr.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            console.log(this.response)
                            
                        }
                    }
                    xhr.send(jsonStr)
                    location.reload();
                })

                checkOutDetails.appendChild(checkOutBox)

                center.appendChild(checkOutDetails)
                body.appendChild(center)
                document.getElementById("body").appendChild(center);
                checkOutDetails.setAttribute('class', 'center');
                
            }
        }
    }
}

xhr.send()