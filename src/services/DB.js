export default class DB {
    constructor() {
        this.url = 'https://6abe4311c4d5ac548302567e.mockapi.io/monsters'
    }

    async findAll() {
        const response = await fetch(this.url)
        const data = await response.json()

        return data
    }

    async store(monster) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(monster)
        })

        return await response.json()
    }

    async delete(id) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE'
        })

        return await response.json()
    }
}