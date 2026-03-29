import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Column<T> {
  key: string;
  header: string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  rowKey?: (item: T) => string;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  emptyMessage = 'No data available',
  rowKey = (item) => item.id || JSON.stringify(item),
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-lg">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <UITable>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={rowKey(item)}>
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.cell ? column.cell(item) : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </UITable>
    </div>
  );
}
