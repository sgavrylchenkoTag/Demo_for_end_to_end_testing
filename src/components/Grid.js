import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Sorting,
  FilterPanel,
  FilterBuilder,
  FilterBuilderPopup,
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';

import isPlainObject from 'lodash/isPlainObject';
import { getFields } from 'Actions';
import fetch from '../api/fetch';

const customStoreRequestParams = [
  'skip',
  'take',
  'requireTotalCount',
  'requireGroupCount',
  'sort',
  'filter',
  'totalSummary',
  'group',
  'groupSummary',
];

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== '';
}

function Grid(props) {
  const [dataSource, setDataSource] = React.useState(null);
  const fields = useSelector(state => state.fields.fields);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getFields());
  }, [dispatch]);

  React.useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    createDataSource();
  }, []);

  React.useEffect(() => {
    if (props.refreshCounter > 0) {
      createDataSource();
    }
  }, [props.refreshCounter]);

  function createDataSource() {
    const store = new CustomStore({
      key: 'id',
      load(loadOptions) {
        if (isPlainObject(loadOptions.group)) {
          // eslint-disable-next-line no-param-reassign
          loadOptions.group = [loadOptions.group];
        }

        const params = {};

        customStoreRequestParams.forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params[i] = loadOptions[i];
          }
        });

        return fetch({ method: 'GET', path: 'data' })
          .then(data => {
            return {
              data: data.data,
              totalCount: data.totalCount,
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error('catched error', error);
          });
      },
    });

    setDataSource(store);
  }

  const columns = React.useMemo(() => fields?.map(({
    field,
    displayName,
    type,
  }) => {
    return (
      <Column
        key={field}
        dataField={field}
        caption={displayName}
        dataType={type}
        allowSorting
      />
    );
  }), [dataSource, fields]);

  return (
    <DataGrid
      dataSource={dataSource}
      allowColumnReordering
      allowColumnResizing
      columnResizingMode="widget"
      showBorders
      showRowLines
      showColumnLines
      height="calc(100vh - 220px)"
      width="100%"
      hoverStateEnabled
      highlightChanges
      remoteOperations
      elementAttr={{ 'data-id': 'grid' }}
    >
      <FilterPanel visible />
      <FilterBuilder />
      <FilterBuilderPopup />
      <Sorting mode="multiple" />
      {columns}
      <Column width="auto" showInColumnChooser={false} visibleIndex={9999} />
    </DataGrid>
  );
}

export default Grid;
