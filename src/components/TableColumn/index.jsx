const TableColumn = ({ data }) => {
  if (data) {
    return (
      <tr>
        {data.map((e, i) => (
          <td key={i}>{e}</td>
        ))}
      </tr>
    );
  } else {
    <></>;
  }
};

export { TableColumn };
