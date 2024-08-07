export function formatDataSheet(
    data: Record<string, any>[],
  ) {
    const headers = data[0];
  
    const formattedData = [];
  
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const formattedRow: any = {};
      for (let j = 2; j < headers.length; j++) {
        const field = headers[j].toLowerCase().replace(" ", "_");
        formattedRow[field] = row[j];
      }
  
      formattedData.push(formattedRow);
    }
  
    return formattedData
  }