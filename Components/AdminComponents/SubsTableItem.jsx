

const SubsTableItem = ({ email, mongoId, date, deleteHandler }) => {
  const emailDate = new Date(date);

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
      >
        {email ? email : "Email Yok"}
      </th>
      <td className="px-6 py-4 hidden sm:block text-left">
        {emailDate.toDateString()}
      </td>
      <td
        onClick={() => deleteHandler(mongoId)}
        className="px-6 py-4 cursor-pointer text-center"
      >
        X
      </td>
    </tr>
  );
};

export default SubsTableItem;
