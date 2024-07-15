import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { isEmpty, map, head, keys, filter } from "lodash-es";
import { AiFillFilter, AiOutlineFilter } from "react-icons/ai";
import "./table.css";
import Spinner from "./Spinner";

const TableContext = createContext();

function Header({ children, header }) {
  if (!isEmpty(children)) {
    return (
      <thead>
        <Row header>{children}</Row>
      </thead>
    );
  }

  if (!isEmpty(header)) {
    const headerTitles = header.split(" ");

    return (
      <thead>
        <Row header>
          {map(headerTitles, (title) => (
            <th key={title}>{title}</th>
          ))}
        </Row>
      </thead>
    );
  }

  return null;
}

function SortableHeaderCell({ children, onClick, active }) {
  return (
    <th className="sortable" onClick={onClick}>
      <span className="sortable-div">
        {active ? (
          <AiFillFilter className="icon" />
        ) : (
          <AiOutlineFilter className="icon" />
        )}
      </span>
      <span>{children}</span>
    </th>
  );
}

function Row({ children, header, className }) {
  const { columns } = useContext(TableContext);

  return (
    <tr
      className={`common-row row border-bottom border-cust-grey-50 border-[1px]  ${
        header ? "bg-cust-grey-200 " : "bg-cust-grey-0"
      } ${className}`}
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </tr>
  );
}

function Empty({ children }) {
  return <tbody className="empty">{children}</tbody>;
}

function Body({ data, render }) {
  const { columns } = useContext(TableContext);

  if (isEmpty(data)) return <Empty>No data !</Empty>;

  const columnNames = filter(keys(head(data)), (column) => column !== "id");
  return (
    <tbody
      className="body min-h-screen rounded-lg"
      style={{ gridTemplateColumns: columns }}
    >
      {render
        ? map(data, render)
        : map(data, (item) => (
            <Row key={item.id}>
              {map(columnNames, (columnName) => (
                <Cell key={columnName}>{item[columnName]}</Cell>
              ))}
            </Row>
          ))}
    </tbody>
  );
}

function Footer({ children, className }) {
  return (
    <tfoot className="bg-cust-grey-200">
      <Table.Row className={`${className}`}>{children}</Table.Row>
    </tfoot>
  );
}

function Cell({ children, align, bold, className }) {
  const boldCell = bold ? "bold" : "";

  return (
    <td align={align} className={`${boldCell} ${className}`}>
      {children}
    </td>
  );
}

function Table({ columns, children, className, loading }) {
  if (loading) return <Spinner />;

  return (
    <TableContext.Provider value={{ columns }}>
      <table className={`table shadow-md rounded-lg   ${className}`}>
        {children}
      </table>
    </TableContext.Provider>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Cell = Cell;
Table.Body = Body;
Table.Footer = Footer;
Table.SortableHeaderCell = SortableHeaderCell;

export default Table;

Table.propTypes = {
  children: PropTypes.array,
  columns: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
};

Cell.propTypes = {
  align: PropTypes.string,
  className: PropTypes.string,
  bold: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
};

Body.propTypes = {
  data: PropTypes.array,
  render: PropTypes.func,
};

Empty.propTypes = {
  children: PropTypes.array,
};

Row.propTypes = {
  children: PropTypes.array,
  header: PropTypes.bool,
  className: PropTypes.string,
};

Header.propTypes = {
  children: PropTypes.array,
  header: PropTypes.string,
};

SortableHeaderCell.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
  active: PropTypes.bool,
};

Cell.defaultProps = {
  align: "center",
};

Footer.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
};
