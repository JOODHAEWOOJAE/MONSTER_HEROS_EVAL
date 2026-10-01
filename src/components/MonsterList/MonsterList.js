import template from './template.js'
import Monster from '../Monster/Monster.js'

export default class MonsterList {
  constructor(monsters) {
    this.monsters = monsters
  }

  render() {
    const monstersHTML = this.monsters
      .map(monster => new Monster(monster).render())
      .join('')

    return template(monstersHTML)
  }
}