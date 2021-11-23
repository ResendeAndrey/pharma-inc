import React from 'react';

//material-ui
import { TextField, InputAdornment } from '@material-ui/core';
import { PersonSearch } from '@mui/icons-material';

//styles
import styles from './input.module.scss';


const Input = ({handleSearch}) => {
  return (
    <div className={styles.input}>
        <TextField fullWidth label="Searching" id="searching" onChange={(event) => handleSearch(event.target.value)}  InputProps={{
          endAdornment: (
            <InputAdornment position="end"><PersonSearch /></InputAdornment>
          )
        }}/>
    </div>
  );
}

export default Input;