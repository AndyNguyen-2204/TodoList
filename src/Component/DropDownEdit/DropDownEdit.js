import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisVertical,
  faPencil,
  faDownload,
  faUserLock,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useRef, useState } from "react";
import "./DropDownEdit.css"

function DropDownEdit({
  handleEdit,
  handleDelete,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowEdit(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleClickEdit = () => {
    handleEdit();
    setShowEdit(false);
  };

  const handleClickDelete = () => {
    handleDelete();
    setShowEdit(false);
  };

  return (
    <div
      className="dropdown dropdown-action"
      ref={ref}
    >
      <div
        className="action-icon dropdown-toggle"
        onClick={() => setShowEdit(!showEdit)}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      {showEdit && <Fragment>
        <div
          className="dropdown-menu dropdown-menu-right show"
        >
          <div
            className="dropdown-item dropdown-item-custom"
            onClick={handleClickEdit}
          >
            <FontAwesomeIcon icon={faPencil} /> Edit
          </div>
          <div
            className="dropdown-item dropdown-item-custom"
            onClick={handleClickDelete}
          >
            <FontAwesomeIcon icon={faTrashCan} /> Delete
          </div>
        </div>
      </Fragment>}
    </div>
  );
}

export default DropDownEdit;
