import React from 'react';
import { storiesOf } from '@storybook/react';

import Scrollbar from '.';

storiesOf('Scrollbar', module).add('horizontal', () => (
  <div
    style={{
      border: '1px solid #ccc',
      height: '50vh',
      transform: 'translate(50%, 50%)',
      width: '50vw',
    }}
  >
    <Scrollbar color="dark">
      <div>
        <p style={{ marginBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus
          erat libero, a ullamcorper tellus sagittis at. Duis et nisl neque.
          Mauris vitae quam lectus. Mauris sodales eu velit id finibus. Quisque
          tincidunt feugiat odio interdum tempus. Mauris dui sapien, ultricies
          vel ligula et, ultricies semper tellus. Maecenas molestie ante sed est
          tempus, eu dictum nibh feugiat.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Curabitur at semper velit. Fusce ligula tortor, congue at eleifend eu,
          gravida id orci. Cras pharetra viverra ex at condimentum. Donec
          laoreet mattis elit at fermentum. Etiam accumsan sodales imperdiet.
          Nulla sit amet lacus tellus. Fusce gravida vel leo nec fermentum.
        </p>
        <p>
          In sollicitudin ac eros posuere scelerisque. Nam magna tellus,
          scelerisque vitae nibh non, vehicula suscipit justo. Phasellus commodo
          diam laoreet tortor dapibus lobortis. Aenean iaculis pulvinar gravida.
          Morbi tempor enim diam, ut euismod velit maximus et. Nunc varius quis
          mauris nec vulputate. Nam non lectus faucibus, sodales turpis id,
          rutrum tortor. Aliquam ut justo et tortor blandit molestie at sagittis
          justo. In hac habitasse platea dictumst. Sed eu sagittis elit, in
          semper ante. Vivamus nec laoreet urna, vitae dictum magna. Integer
          diam massa, ultrices eget consequat sed, tincidunt eget odio. Etiam
          ultrices, urna sed fringilla laoreet, massa ante suscipit risus, quis
          posuere turpis tortor et tortor. Aliquam erat volutpat.
        </p>
      </div>
    </Scrollbar>
  </div>
));
