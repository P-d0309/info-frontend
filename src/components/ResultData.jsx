import { TableCell, TableRow } from '@mui/material';
import React from 'react'

const ResultData = (props) => {
  const { result } = props
  
  return (
    <TableRow>
      <TableCell>{result.student ? result.student.name : null}</TableCell>
      <TableCell>{result.english}</TableCell>
      <TableCell>{result.maths}</TableCell>
      <TableCell>{result.science}</TableCell>
      <TableCell>{result.gujarati}</TableCell>
    </TableRow>
  );
}

export default ResultData