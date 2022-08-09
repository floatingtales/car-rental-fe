import {
  Box, Button, Card, CardActionArea, CardContent, Container, Grid, Paper, Typography,
} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { BookingListContext } from '../context/globalContext';
import { getData } from '../reducer/bookingList';

export default function AllBookings() {
  const { bookingList, bookingListDispatch } = useContext(BookingListContext);

  useEffect(() => {
    (async () => {
      bookingListDispatch(await getData());
    })();
  }, []);
  const navigate = useNavigate();
  return (
    <Paper>
      <Container maxWidth="md">
        <Button variant="outlined" onClick={() => { navigate('/'); }}>Go To Home</Button>
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
            <h1>All Bookings!</h1>
          </Grid>
          {!(bookingList.length > 0) ? (
            <Grid
              container
              item
              direction="column"
              spacing={0}
              alignItems="center"
              justifyContent="center"
              xs={12}
            >
              {' '}
              No Bookings Yet!
            </Grid>
          ) : bookingList.map((booking) => (
            <Grid
              key={booking.bookingId}
              container
              item
              direction="column"
              spacing={0}
              alignItems="center"
              justifyContent="center"
              xs={12}
            >
              <Card sx={{ maxwidth: 250, m: 1 }}>
                <CardActionArea onClick={() => { navigate(`/bookings/${booking.bookingId}`); }}>
                  <CardContent>
                    <Typography variant="h2">
                      Booking ID:
                      {' '}
                      {booking.bookingId}
                    </Typography>
                    <Typography variant="h5">
                      Car ID:
                      {' '}
                      {booking.carId}
                    </Typography>
                    <Typography variant="subtitle1">
                      Renting Period:
                      {' '}
                      {moment(booking.startDate).format('DD MMM YYYY')}
                      {' '}
                      -
                      {' '}
                      {moment(booking.endDate).format('DD MMM YYYY')}
                    </Typography>
                    <Typography variant="subtitle1">
                      Renter:
                      {' '}
                      {booking.userFname}
                      {' '}
                      {booking.userLname}
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
