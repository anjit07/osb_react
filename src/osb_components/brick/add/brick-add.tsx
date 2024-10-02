import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { BrickType } from "src/models/brick/brick-type-interface";
import Grid from '@mui/material/Grid2';
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
function BrickAdd(){

    const { register,formState: { errors }, handleSubmit} = useForm<BrickType>({mode:"all"});
    const navigate = useNavigate(); 
  
    const onSubmit = (data:BrickType) => {
      console.log("Submitted Brick Data:", data);
      //navigate("/dashboards/crypto");
    };
  
    return <>
       <Helmet>
        <title>Add Brick</title>
      </Helmet>
    <Box sx={{ width: '100%',padding: 2}}>
         <Grid size={12}>
            <Card>
              <CardHeader title="Add Brick" />
              <Divider />
              <CardContent>
                <Box  
                  component="form" 
                  sx={{
                    '& .MuiTextField-root': { m: 1}
                  }}
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                >
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    error={!!errors.name}
                    fullWidth
                    label="Brick Name *"
                    type="input"
                    size="small"
                    helperText={errors?.name?.message}
                    {...register("name",
                      {
                        required: "Name is required",
                        maxLength: {
                          value: 20,
                          message: "Namw cannot exceed 20 char",
                        }
                      })}
                  />
                </Grid>
               <Grid size={4}>
                  <FormControl fullWidth sx={{ m: 1}}  size="small" >
                    <InputLabel>Rate On *</InputLabel>
                    <Select
                      error={!!errors.rateType}
                      label="Rate On"
                      {...register("rateType",
                        {
                          required: "this  is required"
                        })}
                    >
                     <MenuItem   value={'C'}>PER CFT</MenuItem >
                     <MenuItem   value={'P'}>PER PIECE</MenuItem >
                    </Select>
                    <FormHelperText>{errors?.rateType?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={4}>
                  <TextField
                    error={!!errors.rate}
                    label="Rate *"
                    type="input"
                    fullWidth
                    size="small"
                    helperText={errors?.rate?.message}
                    {...register("rate",
                      {
                        required: "Rate is required"
                      })}
                  />
                </Grid>
              </Grid>
                  
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                      alignItems="flex-end" >
                       <Stack  spacing={1}  direction="row">  
                          <Button type="submit" variant="contained" color="primary">Save</Button>
                          <Button to="/brick/manage" component={NavLink} variant="contained" color="secondary">Close</Button>
                      </Stack>
                  </Grid>
                  </Box>
              </CardContent>
            </Card>
          </Grid>
      </Box>     
    </>
}

export default BrickAdd;