"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

interface contactsProps {
  _id: string;
  name: string;
  number: string;
}

interface CardProps {
  _id: string;
  deviceID: string;
}

function extractLastPart(item: string) {
  const parts = item.split(".");
  if (parts.length > 0) {
    return parts[parts.length - 1];
  } else {
    return "Invalid input.";
  }
}

const page = () => {
  // get data from server and put it in rows array using axios

  const [data, setData] = useState<CardProps[]>([]);
  const [deviceApps, setDeviceApps] = useState<[]>([]);
  const [deviceContacts, setDeviceContacts] = useState<contactsProps[]>([]);
  const [deviceEmails, setDeviceEmails] = useState<CardProps[]>([]);
  const [page, setPage] = useState(1);

  const pathname = usePathname();
  const userId = pathname.split("/")[2];

  // on page load get data from server http://localhost:3000/api/v1/dashboard get request
  useEffect(() => {
    axios.get(`${process.env.API_URL}/dashboard/${userId}`).then((res) => {
      console.log(res.data);

      // handle null values
      // setData(res.data.devices);
      // setDeviceApps(res.data.deviceApps.appList);
      // setDeviceContacts(res.data.deviceContacts.contacts);
      // setDeviceEmails(res.data.deviceEmails);

      // handle null values
      setData(res.data?.devices ? res.data.devices : []);

      setDeviceApps(res.data?.deviceApps ? res.data.deviceApps.appList : []);

      setDeviceContacts(
        res.data?.deviceContacts ? res.data.deviceContacts.contacts : []
      );
      setDeviceEmails(res.data.deviceEmails ? res.data.deviceEmails : []);
    });
  }, []);

  return (
    <div className="flex flex-col">
      {/* make a head line left and create table for content */}
      <div className="mb-20">
        <h1 className="text-3xl font-bold">Contact List</h1>

        {/* table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(deviceContacts) &&
                deviceContacts.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index}
                    </TableCell>

                    <TableCell>{item.name ? item.name : "No Name"}</TableCell>
                    <TableCell>
                      {item.number ? item.number : "No Number"}
                    </TableCell>
                  </TableRow>
                ))}
              {/* {data.map((row) => (
             
            ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="mb-20">
        {/* email list */}
        <h1 className="text-3xl font-bold">Email List</h1>
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
              {Array.isArray(deviceEmails) &&
                deviceEmails?.map((item, index) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link href={`/ratprofile/${item?._id}`}>{item?._id}</Link>
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

      {/* app list */}
      <div>
        <h1 className="text-3xl font-bold">Application List</h1>
        {/* table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Com Name</TableCell>
                <TableCell align="right">Application Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(deviceApps) &&
                deviceApps.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item ? extractLastPart(item) : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default page;
