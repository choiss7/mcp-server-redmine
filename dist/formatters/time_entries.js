/**
 * Format a single time entry
 */
export function formatTimeEntry(entry) {
    var _a;
    return `<time_entry>
  <id>${entry.id}</id>
  <project>
    <id>${entry.project.id}</id>
    <name>${entry.project.name}</name>
  </project>
  ${entry.issue ? `
  <issue>
    <id>${entry.issue.id}</id>
  </issue>` : ''}
  <user>
    <id>${entry.user.id}</id>
    <name>${entry.user.name}</name>
  </user>
  <activity>
    <id>${entry.activity.id}</id>
    <name>${entry.activity.name}</name>
  </activity>
  <hours>${entry.hours}</hours>
  <comments>${entry.comments || ""}</comments>
  <spent_on>${entry.spent_on}</spent_on>
  <created_on>${entry.created_on}</created_on>
  <updated_on>${entry.updated_on}</updated_on>
  ${((_a = entry.custom_fields) === null || _a === void 0 ? void 0 : _a.length) ? `
  <custom_fields>
    ${entry.custom_fields.map(field => `
    <field>
      <name>${field.name}</name>
      <value>${Array.isArray(field.value) ? field.value.join(", ") : field.value}</value>
    </field>`).join('')}
  </custom_fields>` : ''}
</time_entry>`;
}
/**
 * Format list of time entries
 */
export function formatTimeEntries(response) {
    if (!Array.isArray(response.time_entries) || response.time_entries.length === 0) {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<time_entries />";
    }
    // Calculate total hours
    const totalHours = response.time_entries.reduce((sum, entry) => sum + entry.hours, 0);
    const entries = response.time_entries.map(formatTimeEntry).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>
<time_entries total_count="${response.total_count}" offset="${response.offset}" limit="${response.limit}" total_hours="${totalHours.toFixed(2)}">
${entries}
</time_entries>`;
}
/**
 * Format time entry create/update result
 */
export function formatTimeEntryResult(entry, action) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>Time entry was successfully ${action}.</message>
  ${formatTimeEntry(entry)}
</response>`;
}
/**
 * Format time entry deletion result
 */
export function formatTimeEntryDeleted(id) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>Time entry #${id} was successfully deleted.</message>
</response>`;
}
//# sourceMappingURL=time_entries.js.map