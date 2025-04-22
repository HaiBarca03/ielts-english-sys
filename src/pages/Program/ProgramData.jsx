import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProgram, fetchPrograms } from "../../stores/programs/programAPI";
import ProgramNew from "../../components/Program/ProgramNew";
import ProgramUpdate from "../../components/Program/ProgramUpdate";
import DeleteProgram from "../../components/Program/DeleteProgram";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProgramData.css";
import ProgramShow from "../../components/Program/ProgramShow";
import ActionBar from "../../components/ActionBar.JSX";


const ProgramData = () => {
  const dispatch = useDispatch();
  const { programsList, loading } = useSelector((state) => state.program);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); 

  const programsPerPage = 10;
  const pagination = {
    current: currentPage,
    pageSize: programsPerPage,
    total: programsList?.totalItems || 0,
  };

  useEffect(() => {
    dispatch(fetchPrograms(currentPage, programsPerPage));
  }, [dispatch, currentPage, programsPerPage]);

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleEdit = () => {
    if (selectedItems.length === 1) {
      setSelectedProgram(selectedItems[0]);
      setShowUpdateModal(true);
    }
  };

  const handleDelete = DeleteProgram(dispatch, deleteProgram, () => {
    dispatch(fetchPrograms(currentPage, programsPerPage));
    setSelectedItems([]); 
  });

  const items = Array.isArray(programsList?.items) ? programsList.items : [];

  return (
    <div
      className="container p-4 d-flex flex-column"
      style={{
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        margin: 0,
      }}
    >
      <ActionBar 
        title="Danh sách khóa học"
        linkText="Trang chủ" 
        to="/dashboard"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={() => handleDelete(selectedItems.map(item => item.program_id))}
        selectedCount={selectedItems.length}
        showAttendance={false}
        showScoreEntry={false}
        showSave = {false}
      />

      <ProgramShow 
          items={items}
          loading={loading}
          onSelectItems={setSelectedItems}
          onRowClick={(program) => setSelectedProgram(program)}
          pagination={pagination}
          onPageChange={(page) => setCurrentPage(page)}
      />

      <ProgramNew 
        show={showModal} 
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          dispatch(fetchPrograms(currentPage, programsPerPage));
          setShowModal(false);
        }} 
      />
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <ProgramUpdate
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        program={selectedProgram}
        onSuccess={() => {
          dispatch(fetchPrograms(currentPage, programsPerPage));
          setShowUpdateModal(false);
          setSelectedItems([]);
        }}
      />
    </div>
  );
};

export default ProgramData;