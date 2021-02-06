import { useMemo } from 'react';

export default function() {
  return useMemo(
    () => [
      {
        label: 'cyberpunk 2077',
        value: false,
      },
      {
        label: 'dyling light 2',
        value: 'test',
      },
      {
        label: 'GTA V',
        value: 1,
      },
      {
        label: 'AC origin',
        value: 2,
      },
      {
        label: 'Escape From Tarkov',
        value: 3,
      },
    ],
    []
  );
}
