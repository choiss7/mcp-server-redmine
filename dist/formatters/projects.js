/**
 * Convert project status to string
 */
function formatStatus(status) {
    switch (status) {
        case 1:
            return "active";
        case 5:
            return "archived";
        case 9:
            return "closed";
        default:
            return "unknown";
    }
}
/**
 * Format a single project
 */
export function formatProject(project) {
    var _a, _b, _c, _d, _e;
    return `<project>
  <id>${project.id}</id>
  <name>${project.name}</name>
  <identifier>${project.identifier}</identifier>
  <status>${formatStatus(project.status)}</status>
  <is_public>${project.is_public ? "yes" : "no"}</is_public>
  ${project.parent ? `<parent>${project.parent.name}</parent>` : ''}
  <created_on>${project.created_on}</created_on>
  ${project.homepage ? `<homepage>${project.homepage}</homepage>` : ''}
  ${project.description ? `<description>${project.description}</description>` : ''}
  ${((_a = project.enabled_modules) === null || _a === void 0 ? void 0 : _a.length) ? `
  <enabled_modules>
    ${project.enabled_modules.map(module => `<module>${module}</module>`).join('\n    ')}
  </enabled_modules>` : ''}
  ${((_b = project.trackers) === null || _b === void 0 ? void 0 : _b.length) ? `
  <trackers>
    ${project.trackers.map(tracker => `<tracker>${tracker.name}</tracker>`).join('\n    ')}
  </trackers>` : ''}
  ${((_c = project.issue_categories) === null || _c === void 0 ? void 0 : _c.length) ? `
  <categories>
    ${project.issue_categories.map(category => `<category>${category.name}</category>`).join('\n    ')}
  </categories>` : ''}
  ${((_d = project.time_entry_activities) === null || _d === void 0 ? void 0 : _d.length) ? `
  <time_entry_activities>
    ${project.time_entry_activities.map(activity => `<activity${activity.is_default ? ' default="true"' : ''}${!activity.active ? ' active="false"' : ''}>${activity.name}</activity>`).join('\n    ')}
  </time_entry_activities>` : ''}
  ${((_e = project.custom_fields) === null || _e === void 0 ? void 0 : _e.length) ? `
  <custom_fields>
    ${project.custom_fields.map(field => `
    <field>
      <name>${field.name}</name>
      <value>${Array.isArray(field.value) ? field.value.join(", ") : field.value}</value>
    </field>`).join('')}
  </custom_fields>` : ''}
</project>`;
}
/**
 * Format list of projects
 */
export function formatProjects(response) {
    if (!Array.isArray(response.projects) || response.projects.length === 0) {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<projects />";
    }
    const projects = response.projects.map(formatProject).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>
<projects total_count="${response.total_count}" offset="${response.offset}" limit="${response.limit}">
${projects}
</projects>`;
}
/**
 * Format project create/update result
 */
export function formatProjectResult(project, action) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>Project "${project.name}" was successfully ${action}.</message>
  ${formatProject(project)}
</response>`;
}
/**
 * Format project deletion result
 */
export function formatProjectDeleted(id) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>Project "${id}" was successfully deleted.</message>
</response>`;
}
/**
 * Format project archive status change result
 */
export function formatProjectArchiveStatus(id, archived) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>Project "${id}" was successfully ${archived ? "archived" : "unarchived"}.</message>
</response>`;
}
//# sourceMappingURL=projects.js.map