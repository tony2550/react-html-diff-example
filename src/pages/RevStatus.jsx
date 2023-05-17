import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const tableData = [
  {
    id: 1,
    revno: 0,
    date: "2022.01.01",
    revstatus: [
      {
        chapter: ["제정"],
        summary: ["ALL"],
      },
    ],
    classification: "enact",
    remarks: "DCN10001",
    lan: "k",
  },
  {
    id: 2,
    revno: 0,
    date: "2022.01.01",
    revstatus: [
      {
        chapter: ["M1", "M1-1", "M1-2"],
        summary: ["엠원 변경변경", "사명변경으로 전체 변경", "변경변경변경"],
      },
      {
        chapter: ["M1", "M1-1", "M1-2"],
        summary: ["엠원 변경변경", "사명변경으로 전체 변경", "변경변경변경"],
      },
    ],
    classification: "amend",
    remarks: "DCN10002",
    lan: "k",
  },
  {
    id: 3,
    revno: 0,
    date: "2022.01.01",
    revstatus: [
      {
        chapter: ["M1", "M1-1", "M1-2"],
        summary: ["엠원 변경변경", "사명변경으로 전체 변경", "변경변경변경"],
      },
      {
        chapter: ["M1", "M1-1", "M1-2"],
        summary: ["엠원 변경변경", "사명변경으로 전체 변경", "변경변경변경"],
      },
    ],
    classification: "amend",
    remarks: "DCN10003",
    lan: "k",
  },
  {
    id: 4,
    revno: 1,
    date: "2022.01.01",
    revstatus: [
      {
        chapter: ["전면개정"],
        summary: ["ALL"],
      },
    ],
    classification: "enact",
    remarks: "DCN10004",
    lan: "k",
  },
];

const Tr = ({ one }) => {
  if (one.revstatus.length === 0) {
    return (
      <tr>
        <td>{one.revno}</td>
        <td>{one.date}</td>
        <td>''</td>
        <td>''</td>
        <td>{one.remarks}</td>
      </tr>
    );
  }

  if (one.revstatus.length === 1) {
    return (
      <tr>
        <td>{one.revno}</td>
        <td>{one.date}</td>
        {one.revstatus.map((rev) => (
          <>
            {parse(`<td>${rev.chapter}</td>`)}
            {parse(`<td>${rev.summary}</td>`)}
          </>
        ))}
        <td>{one.remarks}</td>
      </tr>
    );
  }

  const rownum = one.revstatus.length;
  return (
    <>
      <tr>
        <td rowSpan={rownum}>{one.revno}</td>
        <td rowSpan={rownum}>{one.date}</td>
        {parse(`<td>${one.revstatus[0].chapter}</td>`)}
        {parse(`<td>${one.revstatus[0].summary}</td>`)}
        <td rowSpan={rownum}>{one.remarks}</td>
      </tr>
      {one.revstatus.slice(1).map((rev) => (
        <tr>
          {parse(`<td>${rev.chapter}</td>`)}
          {parse(`<td>${rev.summary}</td>`)}
        </tr>
      ))}
    </>
  );
};

const RevStatus = () => {
  // colspan 동적으로 바꾸기 = revstatus 개수

  // revNo | date | chapter | revision summary | remarks

  // chapter : 'm1,m2,m3' summary : ['-djdjdj','-dkdkdk']
  const [parsedata, setParseData] = useState([]);
  useEffect(() => {
    const datacopy = tableData.map((el) => ({
      id: el.id,
      revno: el.revno,
      date: el.date,
      revstatus: el.revstatus.map((x) => ({
        chapter: x.chapter.map((sum) => `<pre>${sum}</pre>`).join(""),
        summary: x.summary.map((sum) => `<pre>${sum}</pre>`).join(""),
      })),
      classification: el.classification,
      remarks: el.remarks,
      lan: el.lan,
    }));
    setParseData(datacopy);
  }, []);
  console.log(parsedata);
  return (
    <div className="revstatus">
      <table className="revstatus__table">
        <thead>
          <tr>
            <th width="10%">revNo</th>
            <th width="20%">date</th>
            <th width="20%">chapter</th>
            <th width="40%">revision summary</th>
            <th width="10%">remarks</th>
          </tr>
        </thead>
        <tbody>
          {parsedata.map((one) => (
            <Tr key={one.id} one={one} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevStatus;
