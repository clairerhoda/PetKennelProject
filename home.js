const xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:3000/api/pets')
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const body = document.getElementsByTagName('body')[0]
        const center = document.createElement('div')
        center.setAttribute('class', 'center')
        if (this.response.length === 0) {
            const petInfoBox = document.createElement('div');
            petInfoBox.setAttribute('id', 'pet-info-box');

            const petDetails = document.createElement('div');
            petDetails.setAttribute('id', 'pet-details'); 
            petDetails.appendChild(document.createTextNode("No pets in the kennel at this time"))
            petDetails.style.alignItems = "center"
            petDetails.style.width = "100%"
            petDetails.style.fontSize = "22px"
            petDetails.style.color = "grey"

            petInfoBox.appendChild(petDetails)
            center.appendChild(petInfoBox)
            document.getElementById("body").appendChild(center);
            petInfoBox.setAttribute('class', 'center');
            return
        }
        for (const s of this.response) {
            if (Date.now() < s.checkOut) {
                const petInfoBox = document.createElement('div');
                petInfoBox.setAttribute('id', 'pet-info-box');        

                const petImage = document.createElement('img');
                petImage.setAttribute('id', 'pet-photo');  
                if (`${s.type}` === "cat") {
                    petImage.src = "media/cat.jpeg"
                } else {
                    petImage.src = "media/dog.jpeg"

                }
                petInfoBox.appendChild(petImage)

               
                const petDetails = document.createElement('div');
                petDetails.setAttribute('id', 'pet-details'); 
                const name = document.createElement('div')
                name.appendChild(document.createTextNode(`Name: ${s.petName}`))
                petDetails.appendChild(name)
                const breed = document.createElement('div')
                breed.appendChild(document.createTextNode(`Breed: ${s.breed}`))
                petDetails.appendChild(breed)
                const checkIn = document.createElement('div')
                checkIn.appendChild(document.createTextNode(`Check In Time: ${new Date(s.checkIn).toLocaleString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }`))
                petDetails.appendChild(checkIn)
                const checkOut = document.createElement('div')
                checkOut.appendChild(document.createTextNode(`Check Out Time: ${new Date(s.checkOut).toLocaleString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }`))
                petDetails.appendChild(checkOut)
                const ownerName = document.createElement('div')
                ownerName.appendChild(document.createTextNode(`Owner Name: ${s.ownerName}`))
                petDetails.appendChild(ownerName)
                petInfoBox.appendChild(petDetails)

                const buttonRow = document.createElement('div')
                buttonRow.setAttribute('id', 'button-row')
                const moreDetails = document.createElement("div")
                moreDetails.setAttribute('id', 'more-details')
                moreDetails.appendChild(document.createTextNode("More Details"))
                moreDetails.style.cursor = "pointer"
                moreDetails.addEventListener("click", (e) => {
                    const petImageMore = document.getElementById("pet-photo-more-details");
                    if (`${s.type}` === "cat") {
                        petImageMore.src = "media/cat.jpeg"
                    } else {
                        petImageMore.src = "media/dog.jpeg"

                    }
                    document.querySelector('#details').style.display= 'flex';
                    document.querySelector("#details-pet-name").textContent = `Pet Name: ${s.petName}`
                    document.querySelector("#details-breed").textContent = `Breed: ${s.breed}`
                    document.querySelector("#details-checkIn").textContent = `Check In: ${new Date(s.checkIn).toLocaleString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }`
                    document.querySelector("#details-checkOut").textContent = `Check Out: ${new Date(s.checkOut).toLocaleString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }`
                    document.querySelector("#details-owner-name").textContent =  `Owner Name: ${s.ownerName}`
                    document.querySelector("#details-email").textContent = `Email: ${s.email}`
                    document.querySelector("#details-phone-number").textContent = `Phone Number: ${s.phoneNumber}`
                    if (`${s.notes}` === "") {
                        document.querySelector("#details-notes").textContent = `Notes: No notes listed`

                    } else {
                    document.querySelector("#details-notes").textContent = `Notes: ${s.notes}`
                    }
                })

                buttonRow.appendChild(moreDetails)
                const sendPhoto = document.createElement("div")
                sendPhoto.setAttribute('id', 'send-photo')
                sendPhoto.appendChild(document.createTextNode("Send Photo"))
                sendPhoto.style.cursor = "pointer"
                sendPhoto.addEventListener("click", (e) => {
                    console.log("hit")
                    window.location.href = `mailto: ${s.email}`;
                })

                buttonRow.appendChild(sendPhoto)
                petDetails.appendChild(buttonRow)

                center.appendChild(petInfoBox)
                document.getElementById("body").appendChild(center);
                petInfoBox.setAttribute('class', 'center');
            }
        }

    }
}

xhr.send()