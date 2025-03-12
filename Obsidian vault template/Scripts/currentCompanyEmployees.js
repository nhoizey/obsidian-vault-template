const thisCompanyEmployees = dv.current().file.inlinks.values.map(employee => employee.path);

const teams = dv.pages('"03. Rolodex/People"').where(p => thisCompanyEmployees.includes(p.file.path)).groupBy(p => p.team || "_Unknown team").sort();

for (const team of teams) {
	dv.header(2, team.key);
	dv.table(["Photo", "Name", "Title"],
		team.rows
			.sort(k => k.file.name, 'asc')
			.map(k => [k.photo, k.file.link, k.title]))
}