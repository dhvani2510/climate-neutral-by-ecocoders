provincialWfficnienyCoefficient = [];

fetch('https://www.canada.ca/en/environment-climate-change/services/climate-change/pricing-pollution-how-it-will-work/output-based-pricing-system/federal-greenhouse-gas-offset-system/emission-factors-reference-values.html#table_6')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(html => {
    // Parse the HTML using DOM methods or libraries like DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const table = doc.getElementById('table_6');
    const rows = table.getElementsByTagName('tr');
    for (let i=1; i<rows.length;i++){
      const cells = rows[i].cells;
      let p =cells[0].innerHTML;
      if(p.indexOf('<') !=-1) {
        p = p.substring(0, p.indexOf('<'));
      }
      let c = cells[1].innerHTML;
      provincialWfficnienyCoefficient.push({p,c});
    }    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
