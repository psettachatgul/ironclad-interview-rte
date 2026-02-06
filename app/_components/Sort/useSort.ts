import { useState } from 'react';
import {
  useTheme,
} from '@mui/material';
import { SortCrit, SortInstance } from './types';
import { TSort } from './_schemas';

export const useSort = ({
  onChange,
  currentSort = {},
}: {
  onChange: (sorts: TSort) => void;
  currentSort: TSort;
}) => {

  const theme = useTheme();

  const currentSortInstances = Object.entries(currentSort).map(([key, sortDir]) => {
    return {
      id: `sort-${Date.now}`,
      key,
      sortDir,
    };
  });

  const [sortInstances, setSortInstances] = useState<SortInstance[]>(currentSortInstances);

  const handleAddSort = () => {
    const newInstance: SortInstance = {
      id: `sort-${Date.now()}`,
      key: '',
      sortDir: 1,
    };
    setSortInstances([...sortInstances, newInstance]);
  };

  const handleRemoveSort = (id: string) => {
    const updated = sortInstances.filter((instance) => instance.id !== id);
    setSortInstances(updated);
    const sorts = updated.reduce<TSort>(
      (_sorts, instance) => {
        return {
          ..._sorts,
          [instance.key]: instance.sortDir,
        };
      },
      {},
    );
    onChange(sorts);
  };

  const handleSortChange = (id: string, sort: SortCrit) => {
    const updated = sortInstances.map((instance) =>
      instance.id === id
        ? { ...instance, key: sort.key, sortDir: sort.sortDir }
        : instance,
    );

    setSortInstances(updated);

    const sorts = updated
      .filter((instance) => instance.key)
      .reduce<TSort>(
        (_sorts, instance) => {
          return {
            ..._sorts,
            [instance.key]: instance.sortDir,
          };
        },
        {},
      );

    onChange(sorts);
  };

  return {
    theme,
    sortInstances,
    handleAddSort,
    handleRemoveSort,
    handleSortChange,
  };
};
