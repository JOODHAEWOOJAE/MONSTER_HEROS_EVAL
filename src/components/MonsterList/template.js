export default function template(monsters) {
  return `
    <table class="monsters-table w-full">
      <thead>
        <tr>
          <th class="text-left p-3">Name</th>
          <th class="text-left p-3">Type</th>
          <th class="text-left p-3">Danger</th>
          <th class="text-left p-3">Year</th>
          <th class="text-right p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        ${monsters}
      </tbody>
    </table>
  `
}