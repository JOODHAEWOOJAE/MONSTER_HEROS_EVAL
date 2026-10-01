export default function template(monster) {
  return `
    <tr class="monster-row">
      <td class="p-3 font-semibold">${monster.name}</td>
      <td class="p-3">${monster.type}</td>
      <td class="p-3">${monster.dangerLevel}</td>
      <td class="p-3">${monster.year}</td>
      <td class="p-3"></td>
    </tr>
  `
}