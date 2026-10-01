import template from './template.js'
import DB from '../../services/DB.js'

export default class Monster {
  constructor(monster) {
    this.monster = monster
    this.db = new DB()
  }

  render() {
    return template(this.monster)
  }

  init() {
    const row = document.querySelector(
      `.monster-row[data-id="${this.monster.id}"]`
    )

    const btnDelete = row.querySelector('.btn-delete')

    btnDelete.addEventListener('click', async () => {
      await this.db.delete(this.monster.id)

      window.location.reload()
    })
  }
}