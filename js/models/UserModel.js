class User{
    #idUser = 0
    #type = ""
    #name = ''
    #email = ''
    #city = ''
    #password = ''
    #birthDate = ''
    #sex = ''
    #avatars = []
    #medals = []
    #totalPoints = 0


    constructor(idUser, type, name, email, city, password, birthDate, sex, avatars, medals, totalPoints) {
        
        this.#idUser = idUser;
        this.#type = type;
        this.#name = name
        this.#email = email
        this.#city = city
        this.#password = password
        this.#birthDate = birthDate
        this.#sex = sex
        this.#avatars = avatars
        this.#medals = medals
        this.#totalPoints = totalPoints
    }

}


// let users = [{
//     idUser : 0,
//     type: 'user',
//     name: "tomas",
//     email:"tomas@gmail.com",
//     city:"Porto",
//     password:"123",
//     birthDate: "20-05-2002",
//     sex:"male",
//     avatars:[1],
//     medals: [0], 
//     totalPoints:0
// }]
