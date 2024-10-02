import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, styled } from '@mui/material';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard: FC<any> = React.forwardRef(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: 'divider',
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
        {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);


function CountCard({ icon, label, total, background, isloading ,avtrbgcolor }) {

  return <>
    <CardWrapper border={true} content={false} background={background}>
      <Box sx={{ p: 3 }} >
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                sx={{ 
                  bgcolor: avtrbgcolor,
                  color: background,
                  width: 45, height: 45 ,
                }}
              >
                {icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ py: 0, mt: 0.45, mb: 0.45 }}
              primary={<Typography variant="h4">${total}k</Typography>}
              secondary={
                <Typography variant="subtitle2" sx={{ color: 'grey.500', mt: 0.5 }}>
                  {label}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </CardWrapper>
  </>

}

export default CountCard;



const CardWrapper = styled(MainCard)(({ background }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${background} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${background} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));


// Define properties type for countCard component
CountCard.prototype = {
  icon: PropTypes.object,
  label: PropTypes.string,
  total: PropTypes.number,
  background: PropTypes.string,
  avtrbgcolor:PropTypes.string,
  isLoading: PropTypes.bool
}

// Define properties type for main card component
MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};