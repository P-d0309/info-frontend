import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useQuery,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ResultData from "../components/ResultData";
import { getDownloadedFile } from "../_helpers/store";

function Result() {
	const baseUrl = import.meta.env.VITE_BASE_API_URL;

  const studentsUrl = `${baseUrl}/get-result`;
  const user = useSelector((state) => state.userdetails);
  
  const queryClient = new QueryClient();
  const getResults = async () => {
    const token = user.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const result = await axios.get(studentsUrl, config);
    return result.data.data;
  }

  const query = useQuery({ queryKey: ["result"], queryFn: getResults });

  const downloadExcel = async () => {
    const excelUrl = `${baseUrl}/get-excel`;

    const token = user.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let data = await axios.get(excelUrl, config);
    getDownloadedFile(data.data.data, "xlsx");
  }
  if (query.isLoading) {
    return "Loading";
  } else {
    return (
      <>
        <Card>
          <CardHeader title="Results"></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item sm={12}>
                <Button onClick={downloadExcel} variant={"contained"}>
                  Export Excel Data
                </Button>
              </Grid>
              <Grid item sm={12}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name of Student</TableCell>
                        <TableCell>English</TableCell>
                        <TableCell>Maths</TableCell>
                        <TableCell>Science</TableCell>
                        <TableCell>Gujarati</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {query.data.map((result) => {
                        return <ResultData result={result} key={result._id} />;
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default Result;
