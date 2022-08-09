import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card, Container, Box, Button, Paper, CardMedia, CardContent, Typography, TextField,
} from '@mui/material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers';
import { BookingInputContext } from '../context/globalContext';
import { resetInput, updateData } from '../reducer/bookingInput';

export default function NewBooking() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const { bookingInput, bookingInputDispatch } = useContext(BookingInputContext);

  useEffect(() => {
    (async () => {
      let gotCar;
      try {
        gotCar = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cars/getOne/${carId}`);
      } catch (err) {
        navigate('/');
      }
      setCar(gotCar.data.data);
    })();
  }, []);

  return (
    <Paper>
      <Container maxWidth="md">
        <Box sx={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <Card sx={{ width: '50%', m: 2 }}>
            <CardMedia component="img" height="300px" image={car.carImage} />
            <CardContent>
              <Typography variant="h1">
                {car.carManufacturer}
                {' '}
                {car.carModel}
              </Typography>
              <br />
              <Typography variant="h3">
                Daily Rate: $
                {car.carDailyRate}
              </Typography>
              <br />
              <Typography variant="h4">
                Car Seats:
                {' '}
                {car.carSeats}
              </Typography>
              <br />
              <Typography variant="h4">
                Fuel Type:
                {' '}
                {car.carFuel}
              </Typography>
              <br />
              <Typography variant="h4">
                Transmission:
                {' '}
                {car.carIsManual ? 'Manual' : 'Automatic'}
              </Typography>
              <br />
              <Typography variant="h4">
                VRM:
                {' '}
                {car.carVrm}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: '50%', m: 2, p: 2 }}>
            <DatePicker
              label="Start Date"
              value={bookingInput.startDate}
              onChange={(e) => {
                bookingInputDispatch(updateData('startDate', e));
              }}
              renderInput={(params) => <TextField fullWidth sx={{ my: 1 }} {...params} />}
            />
            <DatePicker
              label="End Date"
              value={bookingInput.endDate}
              onChange={(e) => bookingInputDispatch(updateData('endDate', e))}
              renderInput={(params) => <TextField fullWidth sx={{ my: 1 }} {...params} />}
            />
            <TextField
              fullWidth
              sx={{ my: 1 }}
              value={bookingInput.userEmail}
              label="Email"
              onChange={(e) => {
                bookingInputDispatch(updateData('userEmail', e.currentTarget.value));
              }}
            />
            <TextField
              fullWidth
              sx={{ my: 1 }}
              value={bookingInput.userFname}
              label="First Name"
              onChange={(e) => {
                bookingInputDispatch(updateData('userFname', e.currentTarget.value));
              }}
            />
            <TextField
              fullWidth
              sx={{ my: 1 }}
              value={bookingInput.userLname}
              label="Last Name"
              onChange={(e) => {
                bookingInputDispatch(updateData('userLname', e.currentTarget.value));
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ my: 1 }}
              onClick={async () => {
                let result;
                try {
                  result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/newBooking`, { ...bookingInput, carId });
                } catch (err) {
                  return alert(err.response.data.status);
                }
                bookingInputDispatch(resetInput());
                return navigate(`/bookings/${result.data.data.bookingId}`);
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              sx={{ my: 1 }}
              onClick={() => {
                bookingInputDispatch(resetInput());
                navigate('/');
              }}
            >
              Cancel
            </Button>
          </Card>
        </Box>
      </Container>
    </Paper>
  );
}
