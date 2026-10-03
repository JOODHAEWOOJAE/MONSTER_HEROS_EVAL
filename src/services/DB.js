export default class DB {
    constructor() {
        // URL de l'API MockAPI
        this.url = 'https://6abe4311c4d5ac548302567e.mockapi.io/monsters'
    }

    // Récupérer tous les monstres
    async findAll() {
        const response = await fetch(this.url)
        const data = await response.json()

        return data
    }

    // Ajouter un nouveau monstre
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

    // Supprimer un monstre par son ID
    async delete(id) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE'
        })

        return await response.json()
    }

    // Modifier un monstre existant
    async update(id, monster) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(monster)
        })

        return await response.json()
    }
}