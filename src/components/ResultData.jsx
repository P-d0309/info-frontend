import { IconButton, TableCell, TableRow } from '@mui/material';
import React from 'react'
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getDownloadedFile } from "../_helpers/store";

const ResultData = (props) => {
	const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const { result } = props
  const user = useSelector((state) => state.userdetails);

  const getPdf = async () => {
    const pdfUrl = `${baseUrl}/get-pdf/${result._id}`;

    const token = user.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let data = await axios.get(pdfUrl, config);
    getDownloadedFile(data.data.data);
  }
  return (
    <TableRow>
      <TableCell>{result.student ? result.student.name : null}</TableCell>
      <TableCell>{result.english}</TableCell>
      <TableCell>{result.maths}</TableCell>
      <TableCell>{result.science}</TableCell>
      <TableCell>{result.gujarati}</TableCell>
      <TableCell>
      <IconButton onClick={getPdf}>
        <PictureAsPdfIcon/>
      </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default ResultData