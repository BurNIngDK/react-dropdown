import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { Chip } from '@material-ui/core';
import _ from 'lodash';

function Dropdown({ title, items, onChange, multiSelect = false, children }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [allItems, setAllItems] = useState(items);

  //  close dropdown on click outside the component
  Dropdown.handleClickOutside = () => setOpen(false);

  useEffect(() => {
    const itemsWithKey = items.map((item, index) => {
      return {
        ...item,
        id: index + 1,
      };
    });

    setAllItems(itemsWithKey);

    /* eslint-disable no-unused-expressions */
    onChange && onChange(selection);
  }, [items, selection]);

  const handleToggleDropdown = () => {
    setOpen(prevOpen => !prevOpen);
  };

  //  click item event handler
  const handleOnClick = item => {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  };

  //  select all event handler
  const handleSelectAll = () => {
    setSelection(allItems);
  };

  //  delete item event handler
  const handleOnDelete = data => {
    setSelection(prevSelection =>
      prevSelection.filter(each => each.id !== data.id)
    );
  };

  const renderDropdownLabels = useMemo(() => {
    if (_.isEmpty(selection)) {
      return <p className="dd-header__title--bold">Select an item</p>;
    }

    if (!_.isEmpty(selection) && multiSelect) {
      selection.map(each => each.label).join(',');
      return (
        <>
          {selection.map(each => (
            <li className="dd-header__title--bold chipStyle" key={each.id}>
              <Chip
                label={each.label}
                onDelete={() => handleOnDelete(each)}
                variant="outlined"
              />
            </li>
          ))}
        </>
      );
    }

    return <p className="dd-header__title--bold">{selection[0]?.label}</p>;
  }, [selection]);

  const allAvaliableItems = useMemo(
    () => _.differenceBy(allItems, selection, 'id'),
    [selection, allItems]
  );

  return (
    <div className="dd-wrapper">
      <div className="dd-header__action">
        <p>{title}</p>
      </div>
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={handleToggleDropdown}
        onClick={handleToggleDropdown}
      >
        <div className="dd-header__title">{renderDropdownLabels}</div>
      </div>
      {open && (
        <ul className="dd-list">
          {selection.length !== items.length && multiSelect && (
            <li className="dd-list-item">
              <button type="button" onClick={handleSelectAll}>
                <span>ALL ITEMS</span>
              </button>
            </li>
          )}
          {allAvaliableItems.map(item => (
            <li className="dd-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
          {children}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);

Dropdown.defaultProps = {
  multiSelect: false,
};

Dropdown.propTypes = {
  //  title of the dropdown
  title: PropTypes.string.isRequired,
  //  schema of the dropdown
  items: PropTypes.instanceOf(Array).isRequired,
  //  flag if the dropdown is multiselect
  multiSelect: PropTypes.bool,
};
