import React, { useEffect, useState, useCallback } from 'react';
import ActionBar from '../../components/ActionBar';
import ClassData from '../../components/Class/ClassData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses } from '../../stores/classes/classAPI';
import ClassAdd from '../../components/Class/ClassAdd';
import ClassUpdate from '../../components/Class/ClassUpdate';
import ClassDelete from '../../components/Class/ClassDelete';
import { useNavigate } from 'react-router-dom';

const ClassPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classesList, loading } = useSelector((state) => state.class);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const contentsPerPage = 6;

  const fetchClassesCallback = useCallback(() => {
    dispatch(fetchClasses(currentPage, contentsPerPage));
  }, [dispatch, currentPage, contentsPerPage]);

  useEffect(() => {
    fetchClassesCallback();
  }, [fetchClassesCallback]);

  const handleRowClick = useCallback((classData) => {
    navigate(`/classes/${classData.class_id}`);
  }, [navigate]);
  const handleAdd = () => setShowModal(true);

  const handleEdit = () => {
    if (selectedItems.length === 1) {
      setSelectedContent(selectedItems[0]);
      setShowUpdateModal(true);
    }
  };

  const handleDelete = () => {
    if (selectedItems.length > 0) {
      const classIds = selectedItems.map(item => item.class_id);
      classIds.forEach(classId => {
        ClassDelete(dispatch)(classId); 
      });
    }
  };

  const classes = Array.isArray(classesList?.classes) ? classesList.classes : [];
  const pagination = {
    current: currentPage,
    pageSize: contentsPerPage,
    total: classesList?.totalItems || 0,
    onChange: (page) => setCurrentPage(page),
  };

  return (
    <div className="container p-4 d-flex flex-column" style={{ width: '100%' }}>
      <ActionBar
        title="Danh sách lớp học"
        linkText="Trang chủ"
        to="/dashboard"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete} 
        selectedCount={selectedItems.length}
        disableEdit={selectedItems.length !== 1}
        disableDelete={selectedItems.length === 0}
        showAttendance={false}
        showScoreEntry={false}
        showSave = {false}
      />
      <ClassData
        items={classes}
        loading={loading}
        onSelectItems={setSelectedItems}
        onRowClick={handleRowClick}
        pagination={pagination}
      />
      <ClassAdd
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchClassesCallback}
      />
      {selectedContent && (
        <ClassUpdate
          show={showUpdateModal}
          classData={selectedContent}
          schedules={selectedContent.schedules || []}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedContent(null);
          }}
          onSuccess={() => {
            dispatch(fetchClasses(currentPage, contentsPerPage));
            setSelectedItems([]);
          }}
        />
      )}
    </div>
  );
};

export default ClassPage;