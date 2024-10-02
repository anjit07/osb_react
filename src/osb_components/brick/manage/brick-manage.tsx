import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,TablePagination, TableSortLabel, Box, Tooltip, IconButton ,useTheme, Card, CardHeader, Grid2, Stack, Button, CardActions} from "@mui/material";
import React from "react";
import { visuallyHidden } from '@mui/utils';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { NavLink } from "react-router-dom";
import { BrickType, mockBrickTypeData } from "src/models/brick/brick-type-interface";
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Helmet } from "react-helmet-async";
  const rows :BrickType[]= mockBrickTypeData

  interface HeadCell {
    disablePadding: boolean;
    id: keyof BrickType;
    label: string;
    numeric: boolean;
  }
  
const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'rateType',
    numeric: false,
    disablePadding: false,
    label: 'Rate On',
  },
  {
    id: 'rate',
    numeric: true,
    disablePadding: false,
    label: 'Rate',
  }
];


type Order = 'asc' | 'desc';


function BrickManage() {

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof BrickType>('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof BrickType,
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const createSortHandler =
    (property: keyof BrickType) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };


  // Sorting function
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (a: { [key in Key]: number | string | undefined}, b: { [key in Key]: number | string | undefined }) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const paginatedRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );


  const theme = useTheme();

    return <>
    <Helmet>
        <title>Manage Brick</title>
    </Helmet>
    <Box sx={{ width: '100%',padding: 2}}>
     <Card>
     <CardActions disableSpacing  sx={{
          alignSelf: "stretch",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          p: 2,
        }}>
       <Button to="/brick/add" component={NavLink}
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        > Add Type of Brick
        </Button>

      </CardActions>
      <Divider />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headCells.map((headCell)=>(
                   <TableCell
                   key={headCell.id}
                   align={headCell.numeric ? 'right' : 'left'}
                  
                   sortDirection={orderBy === headCell.id ? order : false}
                 >
                   <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : 'asc'}
                     onClick={createSortHandler(headCell.id)}
                   >
                     {headCell.label}
                     {orderBy === headCell.id ? (
                       <Box component="span" sx={visuallyHidden}>
                         {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                       </Box>
                     ) : null}
                   </TableSortLabel>
                 </TableCell>
                ))}
                 <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody   >
              {paginatedRows.map((row) => {
                return(<TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.rateType}</TableCell>
                    <TableCell align="right">{row.rate}</TableCell>
                    <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton  to="/brick/add" component={NavLink}
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  </TableRow>)
              })}
            </TableBody>
          </Table>
          <Divider />
          <TablePagination
              rowsPerPageOptions={[3,5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage} />
        </TableContainer>
      </Card>
    </Box>
      </>
      
}

export default BrickManage;