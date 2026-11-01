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
      monster => new Monster(
        monster,
        this.monsters,
        id => this.removeMonster(id)
      )
    )
  }

  // Supprimer un composant de la liste
  removeMonster(id) {
    this.monsterComponents = this.monsterComponents.filter(
      component => component.monster.id !== id
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

      // Vérifier les données avant l'ajout
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

      // Enregistrer le monstre dans l'API
      const newMonster = await this.db.store(monster)

      // Ajouter le monstre dans notre tableau
      this.monsters.push(newMonster)

      // Créer le composant du nouveau monstre
      const monsterComponent = new Monster(
        newMonster,
        this.monsters,
        id => this.removeMonster(id)
      )
      this.monsterComponents.push(monsterComponent)

      // Ajouter sa ligne dans le tableau HTML
      const tbody = document.querySelector('.monsters-table tbody')
      tbody.insertAdjacentHTML('beforeend', monsterComponent.render())

      // Activer les boutons Edit et Delete du nouveau monstre
      monsterComponent.init()

      // Actualiser la recherche
      inputSearch.dispatchEvent(new Event('input'))

      // Mettre à jour le compteur
      document.querySelector('.monster-count').textContent = this.monsters.length
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