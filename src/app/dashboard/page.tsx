"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("", 10, 6.0, 24, 4.0)];

interface CardProps {
  _id: string;

  deviceID: string;
}

const page = () => {
  // get data from server and put it in rows array using axios

  const [data, setData] = useState<CardProps[]>([]);
  const [page, setPage] = useState(1);
  const [phoneNumberQuery, setPhoneNumberQuery] = useState("");

  // on page load get data from server http://localhost:3000/api/v1/dashboard get request
  useEffect(() => {
    // use axios to get data from server
    axios.get("http://localhost:3000/api/v1/dashboard").then((res) => {
      console.log(res.data.devices);
      setData(res.data.devices);
    });
  }, []);

  return (
    <div className="flex flex-col">
      {/* make a head line left and create table for content */}
      <h1 className="text-3xl font-bold">Android Rat List</h1>

      {/* table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Device Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Last Check In</TableCell>
              <TableCell align="right">Integrity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) &&
              data.map((item, index) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link href={`/ratprofile/${item._id}`}>{item._id}</Link>
                  </TableCell>
                  <TableCell align="right">{item.deviceID}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
            {/* {data.map((row) => (
             
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default page;
