import template from './template.js'
import Monster from '../Monster/Monster.js'
import DB from '../../services/DB.js'

export default class MonsterList {
  constructor(monsters) {
    this.monsters = monsters
    this.db = new DB()
    this.monsterComponents = this.monsters.map(
      monster => new Monster(monster)
    )
  }

  render() {
    const monstersHTML = this.monsterComponents
      .map(monster => monster.render())
      .join('')

    return template(monstersHTML, this.monsters.length)
  }

  init() {
    const btnAdd = document.querySelector('.btn-add')

    btnAdd.addEventListener('click', async () => {
      const name = document.querySelector('.input-name').value
      const type = document.querySelector('.input-type').value

      const dangerLevel = Number(
        document.querySelector('.input-danger').value
      )

      const year = Number(
        document.querySelector('.input-year').value
      )

      const monster = {
        name,
        type,
        dangerLevel,
        year
      }

      await this.db.store(monster)

      window.location.reload()
    })

    this.monsterComponents.forEach(monster => {
      monster.init()
    })
  }
}