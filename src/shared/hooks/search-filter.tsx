import { useState, useMemo } from 'react';

type SearchableField = string | number | Date;
type Path = string;

// to get nested properties 
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
      return current ? current[key] : undefined;
  }, obj);
}

export function useSearch<T>(
  items: T[],
  searchableFields: Path[],
  initialQuery: string = ''
) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    const lowercaseQuery = searchQuery.toLowerCase().trim();

    return items.filter((item) => {
      return searchableFields.some((path) => {
        const value = getNestedValue(item, path);
        if (value === null || value === undefined) {
          return false;
        }

        // Handle different types of values
        if (value instanceof Date) {
          return value.toLocaleDateString().toLowerCase().includes(lowercaseQuery);
        }

        if (typeof value === 'object') {
          // Handle nested objects (customize as needed)
          const nestedValue = Object.values(value).join(' ').toLowerCase();
          return nestedValue.includes(lowercaseQuery);
        }

        return String(value).toLowerCase().includes(lowercaseQuery);
      });
    });
  }, [items, searchQuery, searchableFields]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
  };
}
