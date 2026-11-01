import template from './template.js'
import DB from '../../services/DB.js'

export default class Monster {
  constructor(monster, monsters, onDelete) {
    this.monster = monster
    this.monsters = monsters
    this.onDelete = onDelete
    this.db = new DB()
  }

  // Afficher un monstre
  render() {
    return template(this.monster)
  }

  // Initialiser les événements du composant
  init() {
    const row = document.querySelector(
      `.monster-row[data-id="${this.monster.id}"]`
    )

    const btnEdit = row.querySelector('.btn-edit')
    const btnCheck = row.querySelector('.btn-check')
    const btnDelete = row.querySelector('.btn-delete')

    // Activer le mode édition
    btnEdit.addEventListener('click', () => {
      row.classList.add('isEditing')
    })

    // Enregistrer les modifications du monstre
    btnCheck.addEventListener('click', async () => {
      const name = row.querySelector('.input-name').value
      const type = row.querySelector('.input-type').value

      const dangerLevel = Number(
        row.querySelector('.input-danger').value
      )

      const year = Number(
        row.querySelector('.input-year').value
      )

      if (
        name.trim() === '' ||
        type.trim() === '' ||
        !Number.isInteger(dangerLevel) ||
        dangerLevel < 1 ||
        dangerLevel > 5 ||
        !Number.isInteger(year) ||
        year < 1950 ||
        year > 1969
      ) {
        alert('Veuillez vérifier les données du monstre.')
        return
      }

      const monster = {
        name,
        type,
        dangerLevel,
        year
      }

      // Enregistrer les modifications dans l'API
      const updatedMonster = await this.db.update(this.monster.id, monster)

      // Mettre à jour les données du composant
      this.monster = updatedMonster

      // Mettre à jour le monstre dans le tableau
      const index = this.monsters.findIndex(
        monster => monster.id === this.monster.id
      )

      if (index !== -1) {
        this.monsters[index] = updatedMonster
      }

      // Créer la nouvelle ligne HTML
      const newRow = document.createElement('tbody')
      newRow.innerHTML = this.render()

      // Remplacer l'ancienne ligne
      row.replaceWith(newRow.firstElementChild)

      // Réinitialiser les événements du monstre
      this.init()

      // Actualiser la recherche
      document.querySelector('.input-search')
        .dispatchEvent(new Event('input'))
    })

    // Supprimer le monstre
    // Supprimer le monstre dans l'API
    btnDelete.addEventListener('click', async () => {
      await this.db.delete(this.monster.id)

      // Informer la liste de la suppression
      this.onDelete(this.monster.id)

      // Supprimer le monstre du tableau
      const index = this.monsters.findIndex(
        monster => monster.id === this.monster.id
      )

      if (index !== -1) {
        this.monsters.splice(index, 1)
      }

      // Supprimer la ligne du tableau HTML
      row.remove()

      // Mettre à jour le compteur
      const count = document.querySelector('.monster-count')
      count.textContent = Number(count.textContent) - 1
    })
  }
}