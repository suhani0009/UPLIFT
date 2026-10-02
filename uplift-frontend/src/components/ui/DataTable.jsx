function DataTable({
                     columns,
                     rows,
                     loading,
                     error,
                     emptyMessage,
                     onRowClick,
                   })  {
  if (loading) {
    return <div className="muted-panel">Loading…</div>;
  }

  if (error) {
    return <div className="error-panel">{error}</div>;
  }

  if (!rows?.length) {
    return <div className="empty-state">{emptyMessage || "No records yet."}</div>;
  }

  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
              <tr
                  key={row.id ?? index}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? "clickable-row" : ""}
              >
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
