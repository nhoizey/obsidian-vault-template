const extractCompanyName = (company) => (company.key?.path || "").replace(/^.*\/([^\/]+)\.md/, '$1');

const companies = dv.pages('"03. Rolodex/People"').where(p => p.file.name != "People").groupBy(p => p.company).sort((a, b) => extractCompanyName(a).localeCompare(extractCompanyName(b)));

for (const company of companies) {
	dv.header(2, company.key);
	dv.table(["Photo", "Name", "Team", "Title"],
		company.rows
			.sort(k => k.file.name, 'asc')
			.map(k => [k.photo, k.file.link, k.team, k.title]))
}
