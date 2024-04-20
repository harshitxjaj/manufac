import React from "react";
import { Table } from "@mantine/core";

function DisplayTable({ columnHeadings, data, caption }) {
  console.log(data);

  return (
    <Table captionSide="bottom">
      <Table.Caption>{caption}</Table.Caption>
      <Table.Thead>
        <Table.Tr key={"someKey"}>
          {columnHeadings?.map((heading) => {
            return <Table.Th>{heading}</Table.Th>;
          })}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.keys(data).map((key) => {
          return (
            <Table.Tr>
              {columnHeadings.map((heading, index) => {
                if (heading === "Measure") {
                  return <Table.Th>{data[key][heading]}</Table.Th>;
                }
                return (
                  <Table.Th>
                    {data[key][heading.charAt(heading.length - 1)]}
                  </Table.Th>
                );
              })}
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}

export default DisplayTable;
