function Place({
  index,
  name,
  latitude,
  longitude,
}: {
  index: number;
  name: string;
  latitude: number;
  longitude: number;
}) {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {index}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {name}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {latitude}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {longitude}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button className="text-indigo-600 hover:text-indigo-900">View</button>
      </td>
    </tr>
  );
}

export default Place;
