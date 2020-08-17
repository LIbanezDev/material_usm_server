const users = [
    {id: 1, name: 'Lucas', age: 19, love:['Codes', 'Eaten', 'Loves his kitten']},
    {id: 2, name: 'My kitten', age: 3, love:['Loves me', 'Sleeps', 'Eat']}
]

class User {
    constructor(identifier) {
        const filteredUser = users.find(u => u.id === identifier)
        this.Name = filteredUser.name
        this.Age = filteredUser.age
        this.Love = filteredUser.love
    }
    name() {
        return this.Name
    }
    age() {
        return this.Age
    }
    love() {
        return this.Love
    }
}

module.exports = User
