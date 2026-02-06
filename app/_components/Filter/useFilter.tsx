import { useCallback, useState } from 'react';
import { TFilter } from './_schemas';
import { CriteriaInstance } from './Criteria/types';


export const useFilter = ({
  onChange,
  currentFilter,
}: {
  onChange: (filter: TFilter) => void;
  currentFilter: TFilter;
}) => {

  const [all, setAll] = useState<boolean>(currentFilter.all);

  const currentCriteriaInstances = currentFilter.criteria.map(([key, value, negate]) => {
    return {
      id: `criteria-${Date.now}`,
      key,
      value,
      negate,
    };
  });

  const [criteriaInstances, setCriteriaInstances] = useState<CriteriaInstance[]>(currentCriteriaInstances);

  const updateFilter = useCallback(
    (updatedCriteria: CriteriaInstance[]) => {
      const criteria: [string, unknown, boolean][] = [];
      updatedCriteria.forEach((instance) => {
        criteria.push([instance.key, instance.value, instance.negate]);
      });

      const filter: TFilter = {
        all,
        criteria,
      };

      onChange(filter);
    },
    [all, onChange],
  );

  const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAll = event.target.checked;
    setAll(newAll);

    const criteria: [string, unknown, boolean][] = [];
    criteriaInstances.forEach((instance) => {
      criteria.push([instance.key, instance.value, instance.negate]);
    });

    onChange({
      all: newAll,
      criteria,
    });
  };

  const handleAddCriteria = () => {
    const newInstance: CriteriaInstance = {
      id: `criteria-${Date.now()}`,
      key: '',
      value: undefined,
      negate: false,
    };
    setCriteriaInstances([...criteriaInstances, newInstance]);
  };

  const handleRemoveCriteria = (id: string) => {
    const updated = criteriaInstances.filter((instance) => instance.id !== id);
    setCriteriaInstances(updated);
    updateFilter(updated);
  };

  const handleCriteriaValueChange = (
    id: string,
    key: string,
    value: unknown,
  ) => {
    const updated = criteriaInstances.map((instance) =>
      instance.id === id ? { ...instance, key, value } : instance,
    );
    setCriteriaInstances(updated);
    updateFilter(updated);
  };

  const handleCriteriaNegateChange = (
    id: string,
    key: string,
    negate: boolean,
  ) => {
    const updated = criteriaInstances.map((instance) =>
      instance.id === id ? { ...instance, key, negate } : instance,
    );
    setCriteriaInstances(updated);
    updateFilter(updated);
  };

  return {
    all,
    setAll,
    criteriaInstances,
    setCriteriaInstances,
    handleAllChange,
    handleAddCriteria,
    handleRemoveCriteria,
    handleCriteriaValueChange,
    handleCriteriaNegateChange,
  };
};
