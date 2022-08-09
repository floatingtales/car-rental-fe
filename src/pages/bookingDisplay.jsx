import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {
  Box, Button, Card, CardActions, CardContent, CardMedia, Container, Paper, Typography,
} from '@mui/material';
import { BookingListContext } from '../context/globalContext';
import { deleteListing } from '../reducer/bookingList';

export default function BookingDisplay() {
  const { bookingListDispatch } = useContext(BookingListContext);
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const [currentBooking, setCurrentBooking] = useState({});

  useEffect(() => {
    (async () => {
      let gotBooking;
      try {
        gotBooking = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/getOne/${bookingId}`);
      } catch (err) {
        navigate('/booking');
      }
      setCurrentBooking(gotBooking.data.data);
    })();
  }, []);

  useEffect(() => {
    if (currentBooking.carId) {
      (async () => {
        let gotCar;
        try {
          gotCar = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cars/getOne/${currentBooking.carId}`);
        } catch (err) {
          navigate('/booking');
        }
        setCar(gotCar.data.data);
      })();
    }
  }, [currentBooking]);

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
                Renting Period:
                {' '}
                {moment(currentBooking.startDate).format('DD MMM YYYY')}
                {' '}
                -
                {' '}
                {moment(currentBooking.endDate).format('DD MMM YYYY')}
              </Typography>
              <br />
              <Typography variant="h4">
                Renter:
                {' '}
                {currentBooking.userFname}
                {' '}
                {currentBooking.userLname}
              </Typography>
              <br />
              <Typography variant="h4">
                Renter Email:
                {' '}
                {currentBooking.userEmail}
              </Typography>
              <br />
              <CardActions>
                <Button
                  fullWidth
                  color="warning"
                  variant="contained"
                  onClick={async () => {
                    bookingListDispatch(await deleteListing(currentBooking.bookingId));
                    alert('booking deleted');
                    navigate('/bookings');
                  }}
                >
                  Delete booking

                </Button>
                <Button fullWidth color="secondary" variant="outlined" onClick={() => { navigate('/bookings'); }}>Return</Button>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Paper>
  );
}
