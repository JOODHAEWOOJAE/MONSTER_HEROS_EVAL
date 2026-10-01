import './style.css'
import DB from './services/DB.js'
import MonsterList from './components/MonsterList/MonsterList.js'

const db = new DB()

const monsters = await db.findAll()

const monsterList = new MonsterList(monsters)

document.querySelector('#app').innerHTML = monsterList.render()

monsterList.init()