import template from './template.js'
import Monster from '../Monster/Monster.js'
import DB from '../../services/DB.js'

export default class MonsterList {
  constructor(monsters) {
    this.monsters = monsters
    this.db = new DB()

    // Direction du tri
    this.sortAscending = true

    // Créer un composant pour chaque monstre
    this.monsterComponents = this.monsters.map(
      monster => new Monster(monster)
    )
  }

  // Afficher la liste des monstres
  render() {
    const monstersHTML = this.monsterComponents
      .map(monster => monster.render())
      .join('')

    return template(monstersHTML, this.monsters.length)
  }

  // Initialiser les événements du composant
  init() {
    const btnAdd = document.querySelector('.btn-add')
    const inputSearch = document.querySelector('.input-search')

    // Ajouter un nouveau monstre
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

      // Recharger la page pour afficher les nouvelles données
      window.location.reload()
    })

    // Filtrer les monstres par nom ou par type
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

    // Trier les monstres en cliquant sur les colonnes
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

        // Inverser la direction du prochain tri
        this.sortAscending = !this.sortAscending

        const tbody = document.querySelector('.monsters-table tbody')

        // Réorganiser les lignes du tableau
        this.monsters.forEach(monster => {
          const row = document.querySelector(
            `.monster-row[data-id="${monster.id}"]`
          )

          tbody.appendChild(row)
        })
      })
    })

    // Initialiser chaque composant Monster
    this.monsterComponents.forEach(monster => {
      monster.init()
    })
  }
}