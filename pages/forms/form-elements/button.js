import React from 'react';

import { Grid } from '@mui/material';

import DefaultButtons from '../../../src/components/forms/button/DefaultButtons';
import ColorButtons from '../../../src/components/forms/button/ColorButtons';
import IconLoadingButtons from '../../../src/components/forms/button/IconLoadingButtons';
import SizeButton from '../../../src/components/forms/button/SizeButton';

import OutlinedDefaultButtons from '../../../src/components/forms/button/OutlinedDefaultButtons';
import OutlinedColorButtons from '../../../src/components/forms/button/OutlinedColorButtons';
import OutlinedIconLoadingButtons from '../../../src/components/forms/button/OutlinedIconLoadingButtons';
import OutlinedSizeButton from '../../../src/components/forms/button/OutlinedSizeButton';

import TextDefaultButtons from '../../../src/components/forms/button/TextDefaultButtons';
import TextColorButtons from '../../../src/components/forms/button/TextColorButtons';
import TextIconLoadingButtons from '../../../src/components/forms/button/TextIconLoadingButtons';
import TextSizeButton from '../../../src/components/forms/button/TextSizeButton';

import IconColorButtons from '../../../src/components/forms/button/IconColorButtons';
import IconSizeButtons from '../../../src/components/forms/button/IconSizeButtons';

import FabDefaultButton from '../../../src/components/forms/button/FabDefaultButton';
import FabColorButtons from '../../../src/components/forms/button/FabColorButtons';
import FabSizeButtons from '../../../src/components/forms/button/FabSizeButtons';

import DefaultButtonGroup from '../../../src/components/forms/button/DefaultButtonGroup';
import SizeButtonGroup from '../../../src/components/forms/button/SizeButtonGroup';
import VerticalButtonGroup from '../../../src/components/forms/button/VerticalButtonGroup';
import ColorButtonGroup from '../../../src/components/forms/button/ColorButtonGroup';

const ExButton = () => (
  // 2

    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <DefaultButtons />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <ColorButtons />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <IconLoadingButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <SizeButton />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <OutlinedDefaultButtons />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <OutlinedColorButtons />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <OutlinedIconLoadingButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <OutlinedSizeButton />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <TextDefaultButtons />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <TextColorButtons />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <TextIconLoadingButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <TextSizeButton />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <IconColorButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <IconSizeButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <FabDefaultButton />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <FabColorButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <FabSizeButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <DefaultButtonGroup />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <SizeButtonGroup />
      </Grid>

      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <VerticalButtonGroup />
      </Grid>

      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={12} display="flex" alignItems="stretch">
        <ColorButtonGroup />
      </Grid>
    </Grid>
);
export default ExButton;
