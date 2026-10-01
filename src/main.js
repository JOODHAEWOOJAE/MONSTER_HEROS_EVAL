import './style.css'


import MonsterList from './components/MonsterList/MonsterList.js'

const monsters = [
  {
    id: '1',
    name: 'Krakorr',
    type: 'Deep-sea creature',
    dangerLevel: 5,
    year: 1954
  },
  {
    id: '2',
    name: 'The Moss Men',
    type: 'Mutant',
    dangerLevel: 2,
    year: 1958
  }
]

const monsterList = new MonsterList(monsters)

document.querySelector('#app').innerHTML = monsterList.render()