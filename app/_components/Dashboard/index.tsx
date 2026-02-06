import Chart from '../Chart';
import { ChartData } from '../Chart/types';
import { Box, Typography, Container, useTheme } from '@mui/material';

interface PropTypes {
  dashboardData: ChartData;
  dashboardTitle: string;
}

const Dashboard = ({ dashboardData, dashboardTitle }: PropTypes) => {
  const theme = useTheme();

  const chartData = Object.entries(dashboardData).map(([key, value]) => {
    return {
      [key]: value,
    };
  });

  return (
    <Box sx={{ py: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: theme.palette.primary.main,
          }}
        >
          {dashboardTitle}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          {chartData.map((_chartData) => {
            return (
              <Box
                key={`${Date.now}-${Object.keys(_chartData)[0]}`}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  p: 3,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                  },
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <Chart chartData={_chartData} />
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
