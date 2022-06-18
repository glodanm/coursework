const TableTimes = (props) => {
    const { items } = props;
    return (
        <table className="mt-50">
            <tr>
                <th>Id</th>
                <th>Times</th>
            </tr>
            {items.map((item) => (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.times}</td>
                </tr>
            ))}
        </table>
    );
};

export default TableTimes;
