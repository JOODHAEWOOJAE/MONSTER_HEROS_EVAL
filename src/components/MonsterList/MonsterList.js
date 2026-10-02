import template from './template.js'
import Monster from '../Monster/Monster.js'
import DB from '../../services/DB.js'

export default class MonsterList {
  constructor(monsters) {
    this.monsters = monsters
    this.db = new DB()
    this.sortAscending = true

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
    const inputSearch = document.querySelector('.input-search')

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

    inputSearch.addEventListener('input', () => {
      const search = inputSearch.value.toLowerCase()

      document.querySelectorAll('.monster-row').forEach(row => {
        const name = row.dataset.name.toLowerCase()
        const type = row.dataset.type.toLowerCase()

        if (name.includes(search) || type.includes(search)) {
          row.style.display = ''
        } else {
          row.style.display = 'none'
        }
      })
    })

    const sortLinks = document.querySelectorAll('[data-sort]')

    sortLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault()

        const sortBy = link.dataset.sort

        this.monsters.sort((a, b) => {
          if (this.sortAscending) {
            return a[sortBy] > b[sortBy] ? 1 : -1
          } else {
            return a[sortBy] < b[sortBy] ? 1 : -1
          }
        })

        this.sortAscending = !this.sortAscending

        const tbody = document.querySelector('.monsters-table tbody')

        this.monsters.forEach(monster => {
          const row = document.querySelector(
            `.monster-row[data-id="${monster.id}"]`
          )

          tbody.appendChild(row)
        })
      })
    })

    this.monsterComponents.forEach(monster => {
      monster.init()
    })
  }
}