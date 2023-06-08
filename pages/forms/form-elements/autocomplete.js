import React from 'react';
import { Grid } from '@mui/material';

import ComboBoxAutocomplete from '../../../src/components/forms/autoComplete/ComboBoxAutocomplete';
import CountrySelectAutocomplete from '../../../src/components/forms/autoComplete/CountrySelectAutocomplete';
import ControlledStateAutocomplete from '../../../src/components/forms/autoComplete/ControlledStateAutocomplete';
import FreeSoloAutocomplete from '../../../src/components/forms/autoComplete/FreeSoloAutocomplete';
import MultipleValuesAutocomplete from '../../../src/components/forms/autoComplete/MultipleValuesAutocomplete';
import CheckboxesAutocomplete from '../../../src/components/forms/autoComplete/CheckboxesAutocomplete';
import SizesAutocomplete from '../../../src/components/forms/autoComplete/SizesAutocomplete';

const ExAutoComplete = () => (
  // 2

  
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <ComboBoxAutocomplete />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <CountrySelectAutocomplete />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <ControlledStateAutocomplete />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <FreeSoloAutocomplete />
      </Grid>
      {/* ------------------------- row 5 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <MultipleValuesAutocomplete />
      </Grid>
      {/* ------------------------- row 6 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <CheckboxesAutocomplete />
      </Grid>
      {/* ------------------------- row 7 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <SizesAutocomplete />
      </Grid>
    </Grid>
);
export default ExAutoComplete;
