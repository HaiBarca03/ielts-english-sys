import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { fetchContentByProgram, deleteContent } from '../../stores/contents/contentAPI';
import { getProgramById } from '../../stores/programs/programAPI';
import ContentNew from '../../components/Content/ContentNew';
import ContentUpdate from '../../components/Content/ContentUpdate';
import ContentShow from '../../components/Content/ContentShow';
import ActionBar from "../../components/ActionBar.JSX";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContentPage = () => {
  const { programId } = useParams();
  const dispatch = useDispatch();
  const { contentsList, loading, error } = useSelector((state) => state.content);
  const { programDetails, error: programError } = useSelector((state) => state.program);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const contentsPerPage = 6;

  const debouncedFetchContent = useCallback(
    debounce((programId, page, pageSize, filter) => {
      dispatch(fetchContentByProgram(programId, page, pageSize, filter));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    if (programId) {
      debouncedFetchContent(programId, currentPage, contentsPerPage, filterType);
      dispatch(getProgramById(programId));
    }
  }, [programId, currentPage, contentsPerPage, filterType, debouncedFetchContent, dispatch]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFetchContent.cancel();
    };
  }, [debouncedFetchContent]);

  // Error handling
  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to load contents');
    }
    if (programError) {
      toast.error(programError.message || 'Failed to load program details');
    }
  }, [error, programError]);

  const handleAdd = () => setShowModal(true);
  
  const handleEdit = () => {
    if (selectedItems.length === 1) {
      setSelectedContent(selectedItems[0]);
      setShowUpdateModal(true);
    }
  };

  const handleDelete = async (contentIds) => {
    try {
      await Promise.all(contentIds.map(id => dispatch(deleteContent(id))));
      toast.success('Content deleted successfully');
      debouncedFetchContent(programId, currentPage, contentsPerPage, filterType);
      setSelectedItems([]);
    } catch (err) {
      toast.error(err.message || 'Failed to delete content');
    }
  };

  const items = Array.isArray(contentsList?.items) ? contentsList.items : [];
  const pagination = {
    current: currentPage,
    pageSize: contentsPerPage,
    total: contentsList?.totalItems || 0,
  };

  return (
    <div className="container p-4 d-flex flex-column" style={{ width: '100%' }}>
      <ActionBar 
        title={`${programDetails?.brand_name || ''}`}
        linkText="Khóa học" 
        to="/programs"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={() => handleDelete(selectedItems.map(item => item.content_id))}
        selectedCount={selectedItems.length}
        disableEdit={selectedItems.length !== 1}
        disableDelete={selectedItems.length === 0}
        showAttendance={false}
        showScoreEntry={false}
        showSave = {false}
      />

      <ContentShow
        items={items}
        loading={loading}
        onSelectItems={setSelectedItems}
        onRowClick={setSelectedContent}
        pagination={pagination}
        onPageChange={setCurrentPage}
        onFilterChange={setFilterType}
      />

      <ContentNew
        show={showModal}
        programId={programId}
        onClose={() => setShowModal(false)}
        onSuccess={() => debouncedFetchContent(programId, currentPage, contentsPerPage, filterType)}
      />

      {selectedContent && (
        <ContentUpdate
          show={showUpdateModal}
          content={selectedContent}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedContent(null);
          }}
          onSuccess={() => debouncedFetchContent(programId, currentPage, contentsPerPage, filterType)}
        />
      )}
    </div>
  );
};

export default ContentPage;