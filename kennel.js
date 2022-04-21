// Constructor function 
export function PetDetails(petName, ownerName, phoneNumber, breed, email, checkIn, checkOut, notes, type) {
	this.petName = petName
    this.ownerName = ownerName
    this.phoneNumber = phoneNumber
    this.breed = breed
    this.email = email
    this.checkIn = checkIn
    this.checkOut = checkOut
    this.notes = notes
    this.type = type
}

export function EmployeeDetails(employeeID, password) {
	this.employeeID = employeeID
    this.password = password
}
