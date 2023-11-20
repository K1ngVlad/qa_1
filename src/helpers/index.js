const getFrequency = (arr, value) =>
  arr.reduce((accum, e) => {
    if (e === value) return accum + 1;
    return accum;
  }, 0);

const getRelativeFrequency = (arr, frequency) => (frequency / arr.length) * 100;

const roundedNumber = (num, val) => Math.round(num * 10 ** val) / 10 ** val;

const getData = (str) => {
  const arr = str.split(' ').map((e) => Number(e));

  const set = new Set(arr);

  const max = Math.max(...set);
  const min = Math.min(...set);

  let data = [];

  let accumFrequency = 0;
  let accumRelativeFrequency = 0;

  Array.from(set)
    .sort((a, b) => {
      if (a > b) return 1;
      if (a == b) return 0;
      if (a < b) return -1;
    })
    .forEach((value) => {
      const col = [];

      const frequency = getFrequency(arr, value);
      const relativeFrequency = getRelativeFrequency(arr, frequency);

      accumFrequency += frequency;
      accumRelativeFrequency += relativeFrequency;

      col.push(value);
      col.push(frequency);
      col.push(relativeFrequency);
      col.push(accumFrequency);
      col.push(accumRelativeFrequency);

      data.push(col);
    });

  data = data.map((col) =>
    col.map((num) => String(roundedNumber(num, 2)).replace('.', ','))
  );

  return {
    data,
    max,
    min,
  };
};

const getTableText = (table) => {
  let tableData = '';
  for (var i = 0; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++) {
      tableData += table.rows[i].cells[j].innerText;
      if (j < table.rows[i].cells.length - 1) {
        tableData += '\t';
      }
    }
    tableData += '\n';
  }

  return tableData;
};

export { getData, getTableText };
