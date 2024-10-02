import { Box, Card, CardContent, CardHeader, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import CountCard from "../dashboard-components/count-card/count-card";
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { brickSaleData, otherExpanceDataList, otherIncomeDataList } from "src/mockData/client-dashboard-mockdata";
import { Helmet } from "react-helmet-async";





function ClientDashboard() {

  const theme = useTheme();

  const cardDataList = [
    { isLoading: false, total: 500, label: 'TOTAL PAYMENT RECEIVED', icon: <StorefrontTwoToneIcon fontSize="inherit" />, background: theme.palette.info.dark, avtrbgcolor: theme.palette.info.light },
    { isLoading: false, total: 300, label: 'TOTAL PAYMENT DUE', icon: <StorefrontTwoToneIcon fontSize="inherit" />, background: theme.palette.error.dark, avtrbgcolor: theme.palette.error.light },
    { isLoading: false, total: 200, label: 'TOTAL ORDER', icon: <StorefrontTwoToneIcon fontSize="inherit" />, background: theme.palette.success.dark, avtrbgcolor: theme.palette.success.light },
    { isLoading: false, total: 200, label: 'TOTAL ORDER PLACE ', icon: <StorefrontTwoToneIcon fontSize="inherit" />, background: theme.palette.warning.dark, avtrbgcolor: theme.palette.warning.light },
    { isLoading: false, total: 200, label: 'TOTAL ORDER PENDING ', icon: <StorefrontTwoToneIcon fontSize="inherit" />, background: theme.palette.warning.dark, avtrbgcolor: theme.palette.warning.light },
    { isLoading: false, total: 200, label: 'OTHER INCOME ', icon: <StorefrontTwoToneIcon fontSize="inherit" />, background: theme.palette.warning.dark, avtrbgcolor: theme.palette.warning.light },
    { isLoading: false, total: 954, label: 'OTHER EXPENSE', icon: <StorefrontTwoToneIcon fontSize="inherit" />, background: theme.palette.warning.dark, avtrbgcolor: theme.palette.warning.light }
  ]

  return <>
    <Helmet>
        <title>Client Dashboard</title>
    </Helmet>
    <Grid2 container spacing={3} padding={3}>
      {cardDataList.map((cardData, index) => (
        <Grid2 key={index} size={3}>
          <CountCard icon={cardData.icon} label={cardData.label} total={cardData.total} background={cardData.background} isloading={cardData.isLoading} avtrbgcolor={cardData.avtrbgcolor} />
        </Grid2>
      ))}
    </Grid2>

    <Grid2 container size={12} p={2} spacing={2}>
      <Grid2 size={6}>
        <Box sx={{ width: '100%' }}>
          <Card >
            <CardHeader title="Brick sales" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell >BRICK</TableCell>
                      <TableCell >TOTAL ORDER</TableCell>
                      <TableCell >TOTAL ORDER PLACE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brickSaleData.map((brickSales) => (
                      <TableRow key={brickSales.brickName}>
                        <TableCell>{brickSales.brickName}</TableCell>
                        <TableCell>{brickSales.orderCount}</TableCell>
                        <TableCell >{brickSales.deliverCount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Grid2>
      <Grid2 size={6} container direction="column" >
        <Grid2 size={6} sx={{ width: '100%' }}>
          <Box>
            <Card >
              <CardHeader title="Other Income" />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell >Income Type</TableCell>
                        <TableCell >Income</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {otherIncomeDataList.map((otherIncome) => (
                        <TableRow key={otherIncome.typeName}>
                          <TableCell>{otherIncome.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </Grid2>
        <Grid2 size={6} sx={{ width: '100%' }}>
          <Box >
            <Card >
              <CardHeader title="Other Expense" />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell >Expense Type</TableCell>
                        <TableCell >Expense</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {otherExpanceDataList.map((otherExpance) => (
                        <TableRow key={otherExpance.typeName}>
                          <TableCell>{otherExpance.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </Grid2>
      </Grid2>
    </Grid2>

  </>
}

export default ClientDashboard;