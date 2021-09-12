/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { updateSort } from "../../features/notes/notesSlice";

const Toolbar = tw.div`flex flex-row w-full justify-end`;
const DropdownInnerWrapper = tw.div`relative inline-block text-left`;
const SortIcon = tw.button`text-base text-right my-4 p-2 border rounded-md`;
const DropdownPanel = tw.div`origin-top-right absolute right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`;
const Menu = tw.ul`py-1`;
const Item = tw.li`block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer`;

const DropdownMenu = () => {
  const [visible, setVisible] = useState(false);
  const node = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleChange = (e) => {
    setVisible(!visible);
  };

  const handleClick = (e, option) => {
    if (node.current.contains(e.target)) {
      dispatch(updateSort(option));
      return;
    }
    setVisible(false);
  };

  return (
    <DropdownInnerWrapper ref={node}>
      <SortIcon onClick={handleChange}>
        <FontAwesomeIcon icon={faSortAmountUp} size="lg" />
      </SortIcon>
      {visible && (
        <DropdownPanel>
          <Menu
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Item role="menuitem" onClick={(e) => handleClick(e, "newest")}>
              Newest Modified Date
            </Item>
            <Item role="menuitem" onClick={(e) => handleClick(e, "oldest")}>
              Oldest Modified Date
            </Item>
          </Menu>
        </DropdownPanel>
      )}
    </DropdownInnerWrapper>
  );
};

export { DropdownMenu, Toolbar };
