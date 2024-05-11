import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Grid, Link} from '@mui/material';
import {InfoOutlined} from '@mui/icons-material';
import dayjs from 'dayjs';
import {MessageSegmentType} from '../interface/feed.interface';

type BasicCardProps = {
  createDate: string;
  content: MessageSegmentType[];
};

export default function BasicCard(props: BasicCardProps) {
  const {createDate, content} = props;
  return (
    <Card sx={{minWidth: 275, margin: '1rem 0'}}>
      <CardContent sx={{flexDirection: 'row', display: 'flex'}}>
        <Grid container columns={10}>
          <Grid item xs={1} sx={{display: 'flex', alignItems: 'start', justifyContent: 'center'}}>
            <Box
              sx={{
                backgroundColor: '#CCF2FF',
                padding: '.5rem',
                aspectRatio: 1,
                color: '#0069DB',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '1rem',
              }}
            >
              <InfoOutlined />
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h6' component='h5' sx={{color: '#26272B', fontWeight: 700}}>
              {dayjs(createDate).format('DD MMMM YYYY')}
            </Typography>
            <Typography sx={{fontSize: 14, color: '#70707B'}} gutterBottom>
              {content.map((detail) => {
                let label: string | React.ReactElement = '';
                if (detail.type === 'Text') {
                  label = detail.text;
                } else if (detail.type === 'Link') {
                  label = (
                    <Link href={detail.url} target='_blank' rel='noopener'>
                      {detail.text}
                    </Link>
                  );
                }
                return label;
              })}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
