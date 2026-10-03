import template from './template.js'
import DB from '../../services/DB.js'

export default class Monster {
  constructor(monster) {
    this.monster = monster
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

      const monster = {
        name,
        type,
        dangerLevel,
        year
      }

      // Mettre à jour le monstre dans l'API
      await this.db.update(this.monster.id, monster)

      window.location.reload()
    })

    // Supprimer le monstre
    btnDelete.addEventListener('click', async () => {
      await this.db.delete(this.monster.id)

      window.location.reload()
    })
  }
}