import { useEffect, useState } from "react";
import DetailRow from "./DetailRow";
import Table from "./Table";

function Details() {
  const [data, setData] = useState([null]);
  console.log(data, "kakka");
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:80/ceric/api/players");
      // const data1 = await res.json();
      const data1 = await res.json();
      console.log(data1, "data");
      setData(data1);
    }

    fetchData();
  }, []);

  return (
    <>
      <div>top</div>
      <div className="w-full">
        {/* <Table columns="1rem auto 2rem 4rem auto">
          <Table.Header header="# Ime Dob Odrađeno Postotak" />

          <Table.Body
            data={data}
            render={(item) => <DetailRow item={item} />}
          />
        </Table> */}
      </div>
    </>
  );
}

export default Details;
