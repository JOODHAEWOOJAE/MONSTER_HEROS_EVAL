import template from './template.js'

export default class Monster {
  constructor(monster) {
    this.monster = monster
  }

  render() {
    return template(this.monster)
  }
}