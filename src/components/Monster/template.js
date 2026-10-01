export default function template(monster) {
  return `
    <tr class="monster-row" data-id="${monster.id}">
      <td class="p-3 font-semibold">${monster.name}</td>
      <td class="p-3">${monster.type}</td>
      <td class="p-3">${monster.dangerLevel}</td>
      <td class="p-3">${monster.year}</td>
      <td class="p-3 text-right">
      <button
        class="btn-delete btn btn-ghost px-3 py-2"
        title="Delete"
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
    </tr>
  `
}