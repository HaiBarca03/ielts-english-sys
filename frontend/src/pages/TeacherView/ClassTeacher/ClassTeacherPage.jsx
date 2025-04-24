import React, { useCallback, useEffect, useState } from 'react';
import ClassData from '../../../components/Class/ClassData';
import ClassByIdTeacher from '../../../components/Class/ClassByIdTeacher';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchClasses } from '../../../stores/classes/classAPI';

const ClassTeacherPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classesList, loading } = useSelector((state) => state.class);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  const contentsPerPage = 6;

  const handleRowClick = useCallback(
    (classData) => {
      if (classData?.class_id) {
        navigate(`/classes/${classData.class_id}`);
      } else {
        console.error('Invalid class data:', classData);
      }
    },
    [navigate]
  );


  const fetchClassesCallback = useCallback(() => {
    dispatch(fetchClasses(currentPage, contentsPerPage));
  }, [dispatch, currentPage, contentsPerPage]);


  useEffect(() => {
    fetchClassesCallback();
  }, [fetchClassesCallback]);


  const classes = Array.isArray(classesList?.classes) ? classesList.classes : [];
  const pagination = {
    current: currentPage,
    pageSize: contentsPerPage,
    total: classesList?.totalItems || 0,
    onChange: (page) => setCurrentPage(page),
  };

  return (
    <div className="container p-4 d-flex flex-column" style={{ width: '100%' }}>
      <ClassByIdTeacher
        items={classes}
        loading={loading}
        onSelectItems={setSelectedItems}
        onRowClick={handleRowClick}
        pagination={pagination}
      />
    </div>
  );
};

export default ClassTeacherPage;