import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { CarContext } from '../context/globalContext';
import { getData } from '../reducer/carList';

export default function Home() {
  const [startBooking, setStartBooking] = useState();
  const [endBooking, setEndBooking] = useState();

  const { carList, carListDispatch } = useContext(CarContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      carListDispatch(await getData());
    })();
  }, []);

  return (
    <Paper>
      <Container maxWidth="md">
        <Button variant="outlined" onClick={() => { navigate('/bookings'); }}>Go to Bookings</Button>
        <Box sx={{ minHeight: '100vh' }}>
          <Grid
            container
            item
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            xs={12}
          >
            <h1>Car Rental!</h1>
          </Grid>
          <Grid
            container
            item
            spacing={0}
            alignItems="center"
            justifyContent="center"
            xs={12}
          >
            <Grid
              container
              item
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              xs={5}
            >
              <DatePicker
                label="Start booking date"
                value={startBooking}
                onChange={(newValue) => setStartBooking(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid
              container
              item
              spacing={0}
              alignItems="center"
              justifyContent="center"
              xs={5}
            >
              <DatePicker
                label="End booking date"
                value={endBooking}
                onChange={(newValue) => setEndBooking(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid
              container
              item
              spacing={0}
              alignItems="center"
              justifyContent="center"
              xs={2}
            >
              <Button variant="contained"> Search! </Button>
            </Grid>
          </Grid>

          {carList.map((car) => (
            <Grid
              key={car.carId}
              container
              item
              direction="column"
              spacing={0}
              alignItems="center"
              justifyContent="center"
              xs={12}
            >
              <Card sx={{ maxWidth: 250, m: 1 }}>
                <CardActionArea onClick={() => { navigate(`./book/${car.carId}`); }}>
                  <CardMedia component="img" height="250" image={car.carImage} />
                  <CardContent>
                    <Typography
                      variant="h2"
                    >
                      {car.carManufacturer}
                      {' '}
                      {car.carModel}
                    </Typography>
                    <Typography variant="h5">
                      Daily Rate: $
                      {car.carDailyRate}
                    </Typography>
                    <Typography variant="subtitle1">
                      Car Seats:
                      {' '}
                      {car.carSeats}
                    </Typography>
                    <Typography variant="subtitle1">
                      Fuel Type:
                      {' '}
                      {car.carFuel}
                    </Typography>
                    <Typography variant="subtitle1">
                      Transmission:
                      {' '}
                      {car.carIsManual ? 'Manual' : 'Automatic'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

          ))}
        </Box>
      </Container>
    </Paper>
  );
}
